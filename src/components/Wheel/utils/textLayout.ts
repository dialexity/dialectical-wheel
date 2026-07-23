export interface TextLayoutResult {
  lines: string[];
  fontSize: number;
  lineHeight: number;
  centerR: number;
}

export type RingNumber = 1 | 2 | 3;

export interface LayoutParams {
  innerR: number;
  outerR: number;
  cellAngle: number;
  baseFontSize: number;
  padding: number;
  measure: (text: string, fontSize: number) => number;
  textBias: number;
  ring: RingNumber;
}

interface RingConfig {
  chordShrink: number;
  chordCap: number;
  // When false, use the true trapezoid width profile (wider toward the outer
  // edge) so long words land on the widest lines — larger font. Text re-wraps
  // when the cell rotates past vertical. When true, use a rotation-stable
  // symmetric profile (never reflows) at the cost of a smaller font.
  stable: boolean;
}

function getRingConfig(ring: RingNumber): RingConfig {
  switch (ring) {
    // Ring 1 (innermost, positive) is a small central cell: reflow-on-rotation
    // is barely noticeable, and its narrow wedge needs every pixel of the
    // trapezoid, so it opts out of the stable profile for a bigger font.
    case 1:
      return { chordShrink: 0.9, chordCap: 1.4, stable: false };
    case 2:
      return { chordShrink: 0.9, chordCap: Infinity, stable: true };
    case 3:
      return { chordShrink: 0.9, chordCap: Infinity, stable: true };
  }
}

/**
 * Usable width for a single horizontal text line whose vertical center sits at
 * radius `lineR` in the (rotated) cell frame.
 *
 * A line is a STRAIGHT rectangle (width w, height lineHeight) centered on the
 * cell's mid-radial, so it is bounded by exactly two real walls:
 *   - the two radial wedge edges (±halfAngle) — the line's INNER corners are
 *     closest, at radius rInner = lineR − lineHeight/2, giving half-width
 *     rInner·tan(halfAngle);
 *   - the outer arc — the line's OUTER corners are closest, at radius
 *     rOuter = lineR + lineHeight/2, giving half-width √(outerR² − rOuter²).
 * The inner arc is never a constraint: a straight chord's minimum radius is at
 * its midpoint, which always stays ≥ innerR.
 */
function chordAt(
  lineR: number,
  halfAngle: number,
  cellHeight: number,
  lineHeight: number,
  config: RingConfig,
  outerR?: number
): number {
  const rInner = lineR - lineHeight / 2;
  if (rInner <= 0) return 0;

  let half = rInner * Math.tan(halfAngle);

  if (outerR !== undefined) {
    const rOuter = lineR + lineHeight / 2;
    const outerHalf = Math.sqrt(Math.max(0, outerR * outerR - rOuter * rOuter));
    half = Math.min(half, outerHalf);
  }

  let maxW = 2 * half * config.chordShrink;
  maxW = Math.min(maxW, cellHeight * config.chordCap);
  return Math.max(0, maxW);
}

function lineWidths(
  n: number,
  fontSize: number,
  centerR: number,
  halfAngle: number,
  cellHeight: number,
  flipped: boolean,
  config: RingConfig,
  outerR?: number
): number[] {
  const lineHeight = fontSize * 1.3;
  const widths: number[] = [];
  for (let i = 0; i < n; i++) {
    let lineR: number;
    if (flipped) {
      lineR = centerR - ((n - 1) / 2 - i) * lineHeight;
    } else {
      lineR = centerR + ((n - 1) / 2 - i) * lineHeight;
    }
    widths.push(chordAt(Math.max(lineR, 1), halfAngle, cellHeight, lineHeight, config, outerR));
  }
  return widths;
}

/**
 * Per-line widths that hold regardless of the cell's rotation. Because rotating
 * the cell past a pole swaps inner↔outer line order, we take the element-wise
 * min of the normal and flipped width profiles. The result is symmetric
 * top-to-bottom, so the wrapped text is identical in both orientations and
 * never reflows as the wheel turns.
 */
function stableWidths(
  n: number,
  fontSize: number,
  centerR: number,
  halfAngle: number,
  cellHeight: number,
  config: RingConfig,
  outerR: number
): number[] {
  const normalW = lineWidths(n, fontSize, centerR, halfAngle, cellHeight, false, config, outerR);
  const flippedW = lineWidths(n, fontSize, centerR, halfAngle, cellHeight, true, config, outerR);
  return normalW.map((w, i) => Math.min(w, flippedW[i]));
}

function tryWrap(
  words: string[],
  widths: number[],
  fontSize: number,
  measure: (text: string, fontSize: number) => number
): string[] | null {
  if (widths.length === 0) return null;
  if (words.length === 0) return [''];

  const lines: string[] = [];
  let currentLine = '';
  let slotIdx = 0;

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (measure(candidate, fontSize) <= widths[slotIdx]) {
      currentLine = candidate;
    } else if (currentLine) {
      lines.push(currentLine);
      slotIdx++;
      if (slotIdx >= widths.length) return null;
      currentLine = word;
    } else {
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length > widths.length) return null;

  for (let i = 0; i < lines.length; i++) {
    if (measure(lines[i], fontSize) > widths[i]) return null;
  }

  return lines;
}

/**
 * Widths used to wrap the text at a given orientation. Stable rings use the
 * symmetric (rotation-invariant) profile; trapezoid rings use the true
 * orientation-specific profile so long words fall on the wide (outer) lines.
 */
function widthsForOrientation(
  n: number,
  fontSize: number,
  centerR: number,
  halfAngle: number,
  cellHeight: number,
  config: RingConfig,
  outerR: number,
  flipped: boolean
): number[] {
  if (config.stable) {
    return stableWidths(n, fontSize, centerR, halfAngle, cellHeight, config, outerR);
  }
  return lineWidths(n, fontSize, centerR, halfAngle, cellHeight, flipped, config, outerR);
}

/** True if `words` wrap within `maxLines` for the given orientation at `fontSize`. */
function fitsOrientation(
  words: string[],
  fontSize: number,
  halfAngle: number,
  cellHeight: number,
  config: RingConfig,
  outerR: number,
  topR: number,
  botR: number,
  midR: number,
  maxLines: number,
  flipped: boolean,
  measure: (text: string, fontSize: number) => number
): boolean {
  const lineHeight = fontSize * 1.3;
  for (let n = 1; n <= maxLines; n++) {
    const cR = clampCenter(n, lineHeight, topR, botR, midR);
    const widths = widthsForOrientation(n, fontSize, cR, halfAngle, cellHeight, config, outerR, flipped);
    const result = tryWrap(words, widths, fontSize, measure);
    if (result && result.length <= n) return true;
  }
  return false;
}

function tryFitUniform(text: string, fontSize: number, params: LayoutParams): boolean {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure, textBias, ring } = params;
  const config = getRingConfig(ring);
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const topR = outerR - pad;
  const botR = innerR + pad;
  const usableHeight = topR - botR;
  const maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return false;

  const midR = (topR + botR) / 2 + textBias * cellHeight;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;

  const fitsNormal = fitsOrientation(words, fontSize, halfAngle, cellHeight, config, outerR, topR, botR, midR, maxLines, false, measure);
  if (config.stable) return fitsNormal;
  // Trapezoid rings re-wrap when rotated past vertical, so both orientations
  // must fit independently or text would overflow at some rotation angle.
  if (!fitsNormal) return false;
  return fitsOrientation(words, fontSize, halfAngle, cellHeight, config, outerR, topR, botR, midR, maxLines, true, measure);
}

export function computeUniformFontSize(
  texts: string[],
  params: LayoutParams
): number {
  const { baseFontSize } = params;
  for (let fs = baseFontSize; fs >= 3; fs -= 0.5) {
    if (texts.every(t => tryFitUniform(t, fs, params))) return fs;
  }
  return 3;
}

function clampCenter(n: number, lineHeight: number, topR: number, botR: number, midR: number): number {
  if (n <= 1) return midR;
  const blockH = n * lineHeight;
  const margin = lineHeight * 0.5;
  const maxC = topR - blockH / 2 - margin;
  const minC = botR + blockH / 2 + margin;
  if (minC > maxC) return (topR + botR) / 2;
  return Math.max(minC, Math.min(midR, maxC));
}

export function layoutTextVariable(
  text: string,
  fontSize: number,
  params: LayoutParams,
  flipped: boolean
): TextLayoutResult {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure, textBias, ring } = params;
  const config = getRingConfig(ring);
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const topR = outerR - pad;
  const botR = innerR + pad;
  const usableHeight = topR - botR;
  const maxLines = Math.max(1, Math.floor(usableHeight / lineHeight));

  const midR = (topR + botR) / 2 + textBias * cellHeight;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return { lines: [''], fontSize, lineHeight, centerR: midR };
  }

  for (let n = 1; n <= maxLines; n++) {
    const cR = clampCenter(n, lineHeight, topR, botR, midR);
    const widths = widthsForOrientation(n, fontSize, cR, halfAngle, cellHeight, config, outerR, flipped);
    const result = tryWrap(words, widths, fontSize, measure);
    if (result && result.length <= n) {
      return { lines: result, fontSize, lineHeight, centerR: cR };
    }
  }

  const cR = clampCenter(maxLines, lineHeight, topR, botR, midR);
  const widths = widthsForOrientation(maxLines, fontSize, cR, halfAngle, cellHeight, config, outerR, flipped);
  const lenient = wrapLenient(words, widths, fontSize, measure);
  return { lines: lenient, fontSize, lineHeight, centerR: cR };
}

function wrapLenient(
  words: string[],
  widths: number[],
  fontSize: number,
  measure: (text: string, fontSize: number) => number
): string[] {
  if (widths.length === 0 || words.length === 0) return [''];

  const lines: string[] = [];
  let currentLine = '';
  let slotIdx = 0;

  for (const word of words) {
    const w = slotIdx < widths.length ? widths[slotIdx] : widths[widths.length - 1];
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (measure(candidate, fontSize) <= w) {
      currentLine = candidate;
    } else if (currentLine) {
      lines.push(currentLine);
      slotIdx++;
      currentLine = word;
    } else {
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
