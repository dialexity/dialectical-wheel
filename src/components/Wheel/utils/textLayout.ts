export interface TextLayoutResult {
  lines: string[];
  fontSize: number;
  lineHeight: number;
  centerR: number;
}

export type RingNumber = 1 | 2 | 3;

export interface LayoutParams {
  innerR: number;
  // The true outer arc of the cell. Drives the cell HEIGHT and the PADDING
  // basis. In non-header rings it is also the vertical band cap and the width
  // arc (the two params below default to it).
  outerR: number;
  // Caps ONLY the vertical text band (its top radius); defaults to outerR.
  // In header mode the merged neutral+cycle cell reaches outerR (the cycle
  // arc), but text must sit below the cycle label, so placementOuterR < outerR.
  placementOuterR?: number;
  // The arc radius used as the outer-corner WIDTH limit in chordAt; defaults to
  // outerR. In header mode this is capped BELOW outerR (but above
  // placementOuterR) so wide top lines don't fan their corners out into the
  // direction arrows sitting at the cell's outer corners — while still letting
  // the font breathe into the angular gap between the centered label and the
  // arrows. Feeding placementOuterR here instead (the old bug) clamped top-line
  // widths toward zero and starved the font.
  widthArcR?: number;
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
  const { innerR, outerR, placementOuterR = outerR, widthArcR = outerR, cellAngle, padding: paddingFrac, measure, textBias, ring } = params;
  const config = getRingConfig(ring);
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const topR = placementOuterR - pad;
  const botR = innerR + pad;
  const usableHeight = topR - botR;
  const maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return false;

  const midR = (topR + botR) / 2 + textBias * cellHeight;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;

  const fitsNormal = fitsOrientation(words, fontSize, halfAngle, cellHeight, config, widthArcR, topR, botR, midR, maxLines, false, measure);
  if (config.stable) return fitsNormal;
  // Trapezoid rings re-wrap when rotated past vertical, so both orientations
  // must fit independently or text would overflow at some rotation angle.
  if (!fitsNormal) return false;
  return fitsOrientation(words, fontSize, halfAngle, cellHeight, config, widthArcR, topR, botR, midR, maxLines, true, measure);
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

/** One body ring's inputs to the balanced-layout solver. */
export interface BalanceRingInput {
  texts: string[];
  ring: RingNumber;
  /** Optical/fit bias for this ring (from computeTextBias). */
  textBias: number;
}

export interface BalanceLayoutResult {
  /** Single font size shared by every balanced body-ring cell. */
  fontSize: number;
  /**
   * The internal radial boundaries between consecutive balanced rings, absolute
   * from the core (length = rings.length − 1). For the default 3-ring wheel this
   * is [innerEnd, middleEnd]; in header mode only positive+negative balance, so
   * it is [innerEnd].
   */
  bounds: number[];
}

/**
 * Smallest outer radius (stepping 0.5u from `innerR`, capped at `hardCap`) at
 * which every text in the ring fits at `fontSize`. Null if none fits by hardCap.
 * Ring fit improves as the band moves OUTWARD (wider wedge), so the minimal
 * outward extent leaves the most room for the rings beyond it — greedy-optimal
 * for the inner→outer partition below.
 */
function minOuterForFont(
  texts: string[],
  fontSize: number,
  ring: RingNumber,
  textBias: number,
  innerR: number,
  hardCap: number,
  cellAngle: number,
  padding: number,
  measure: (text: string, fontSize: number) => number
): number | null {
  const floor = innerR + Math.max(4, fontSize * 1.3 + 1);
  for (let outerR = floor; outerR <= hardCap + 1e-6; outerR += 0.5) {
    const params: LayoutParams = { innerR, outerR, cellAngle, baseFontSize: fontSize, padding, measure, textBias, ring };
    if (texts.every(t => tryFitUniform(t, fontSize, params))) return outerR;
  }
  return null;
}

/**
 * BALANCE sizing: find the largest single font that fits EVERY balanced ring,
 * then partition the fixed radial budget (core..outerEnd) so each ring gets the
 * band it needs at that font — the text-heavy ring grows, the short ones give
 * space back. A per-ring growth clamp (`maxGrowth` × the default band) keeps the
 * wheel from ballooning into a lopsided shape when one cell's text is far longer
 * than the rest; when the clamp binds, the largest common font can't grow
 * further so fonts come out near-equal rather than exactly equal. Each ring
 * keeps at least a one-line floor. Rings are ordered inner→outer.
 *
 * Works for any ring count: the default wheel balances 3 rings across the full
 * body budget; header mode balances only positive+negative (2 rings) across the
 * budget below the self-sizing merged neutral+cycle ring. `rings`,
 * `defaultBands`, and the returned `bounds` (internal boundaries, length =
 * rings.length − 1) all share that ordering and length.
 *
 * Returns null when no font ≥3px fits within the clamped budget — caller then
 * falls back to fixed radii + per-ring shrink.
 */
export function computeBalancedLayout(
  rings: BalanceRingInput[],
  core: number,
  outerEnd: number,
  defaultBands: number[],
  cellAngle: number,
  baseFontSize: number,
  padding: number,
  maxGrowth: number,
  measure: (text: string, fontSize: number) => number
): BalanceLayoutResult | null {
  const n = rings.length;
  if (n === 0 || defaultBands.length !== n) return null;
  const budget = outerEnd - core;
  const cap = defaultBands.map(b => b * maxGrowth);

  for (let fs = baseFontSize; fs >= 3; fs -= 0.5) {
    // Greedy inner→outer: minimal outward extent per ring within its cap.
    let inner = core;
    const min: number[] = [];
    let feasible = true;
    for (let i = 0; i < n; i++) {
      const hi = Math.min(inner + cap[i], outerEnd);
      const outerR = minOuterForFont(rings[i].texts, fs, rings[i].ring, rings[i].textBias, inner, hi, cellAngle, padding, measure);
      if (outerR == null) { feasible = false; break; }
      min.push(outerR - inner);
      inner = outerR;
    }
    if (!feasible) continue;
    const used = min.reduce((a, b) => a + b, 0);
    if (used > budget + 1e-6) continue;

    // Distribute the remaining budget toward the DEFAULT proportions so the
    // wheel keeps its familiar shape; never push a band past its cap.
    const band = min.slice();
    let slack = budget - used;
    for (let iter = 0; iter < 8 && slack > 1e-6; iter++) {
      const room = band.map((b, i) => cap[i] - b);
      const openWeight = room.reduce((a, r, i) => a + (r > 1e-6 ? defaultBands[i] : 0), 0);
      if (openWeight <= 1e-6) break;
      let placed = 0;
      for (let i = 0; i < n; i++) {
        if (room[i] <= 1e-6) continue;
        const give = Math.min(room[i], slack * defaultBands[i] / openWeight);
        band[i] += give;
        placed += give;
      }
      slack -= placed;
    }

    // Cumulative internal boundaries (drop the last, which is outerEnd).
    const bounds: number[] = [];
    let acc = core;
    for (let i = 0; i < n - 1; i++) {
      acc += band[i];
      bounds.push(Math.round(acc));
    }
    return { fontSize: fs, bounds };
  }
  return null;
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
  const { innerR, outerR, placementOuterR = outerR, widthArcR = outerR, cellAngle, padding: paddingFrac, measure, textBias, ring } = params;
  const config = getRingConfig(ring);
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const topR = placementOuterR - pad;
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
    const widths = widthsForOrientation(n, fontSize, cR, halfAngle, cellHeight, config, widthArcR, flipped);
    const result = tryWrap(words, widths, fontSize, measure);
    if (result && result.length <= n) {
      return { lines: result, fontSize, lineHeight, centerR: cR };
    }
  }

  const cR = clampCenter(maxLines, lineHeight, topR, botR, midR);
  const widths = widthsForOrientation(maxLines, fontSize, cR, halfAngle, cellHeight, config, widthArcR, flipped);
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
