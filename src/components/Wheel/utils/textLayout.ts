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
  useGeometricInset: boolean;
}

function getRingConfig(ring: RingNumber): RingConfig {
  switch (ring) {
    case 1:
      return { chordShrink: 0.9, chordCap: 1.4, useGeometricInset: true };
    case 2:
      return { chordShrink: 0.9, chordCap: Infinity, useGeometricInset: true };
    case 3:
      return { chordShrink: 0.9, chordCap: Infinity, useGeometricInset: true };
  }
}

function chordAt(r: number, halfAngle: number, cellHeight: number, lineHeight: number, config: RingConfig, innerR?: number, outerR?: number): number {
  const inset = config.useGeometricInset
    ? lineHeight / (2 * Math.tan(halfAngle))
    : lineHeight / 2;
  const effectiveR = r - inset;
  if (effectiveR <= 0) return 0;
  const chord = 2 * effectiveR * Math.sin(halfAngle) * config.chordShrink;
  let maxW = Math.min(chord, cellHeight * config.chordCap);
  if (outerR !== undefined && r > 0) {
    const arcLimit = 2 * Math.sqrt(Math.max(0, outerR * outerR - r * r));
    maxW = Math.min(maxW, arcLimit * config.chordShrink);
  }
  if (innerR !== undefined && r > innerR) {
    const arcLimit = 2 * Math.sqrt(Math.max(0, r * r - innerR * innerR));
    maxW = Math.min(maxW, arcLimit * config.chordShrink);
  }
  return maxW;
}

function lineWidths(
  n: number,
  fontSize: number,
  centerR: number,
  halfAngle: number,
  cellHeight: number,
  flipped: boolean,
  config: RingConfig,
  innerR?: number,
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
    widths.push(chordAt(Math.max(lineR, 1), halfAngle, cellHeight, lineHeight, config, innerR, outerR));
  }
  return widths;
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

  if (ring === 1) {
    const wrapWidth = chordAt(midR, halfAngle, cellHeight, lineHeight, config);
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (measure(candidate, fontSize) <= wrapWidth) {
        currentLine = candidate;
      } else if (currentLine) {
        lines.push(currentLine);
        if (lines.length >= maxLines) return false;
        currentLine = word;
      } else {
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    if (lines.length > maxLines) return false;
    for (const line of lines) {
      if (measure(line, fontSize) > wrapWidth) return false;
    }
    return true;
  }

  for (let n = 1; n <= maxLines; n++) {
    const cR = clampCenter(n, lineHeight, topR, botR, midR);
    const normalW = lineWidths(n, fontSize, cR, halfAngle, cellHeight, false, config, innerR, outerR);
    const flippedW = lineWidths(n, fontSize, cR, halfAngle, cellHeight, true, config, innerR, outerR);
    const safeWidths = normalW.map((w, i) => Math.min(w, flippedW[i]));
    const result = tryWrap(words, safeWidths, fontSize, measure);
    if (result && result.length <= n) return true;
  }
  return false;
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
    if (ring === 1) {
      const widths = lineWidths(n, fontSize, cR, halfAngle, cellHeight, flipped, config);
      const result = tryWrap(words, widths, fontSize, measure);
      if (result && result.length <= n) {
        return { lines: result, fontSize, lineHeight, centerR: cR };
      }
      if (!flipped && n > 1) {
        const flippedWidths = lineWidths(n, fontSize, cR, halfAngle, cellHeight, true, config);
        const flippedResult = tryWrap(words, flippedWidths, fontSize, measure);
        if (flippedResult && flippedResult.length <= n) {
          return { lines: flippedResult.reverse(), fontSize, lineHeight, centerR: cR };
        }
      }
    } else {
      const normalW = lineWidths(n, fontSize, cR, halfAngle, cellHeight, false, config, innerR, outerR);
      const flippedW = lineWidths(n, fontSize, cR, halfAngle, cellHeight, true, config, innerR, outerR);
      const safeWidths = normalW.map((w, i) => Math.min(w, flippedW[i]));
      const result = tryWrap(words, safeWidths, fontSize, measure);
      if (result && result.length <= n) {
        return { lines: result, fontSize, lineHeight, centerR: cR };
      }
    }
  }

  const cR = clampCenter(maxLines, lineHeight, topR, botR, midR);
  const widths = lineWidths(maxLines, fontSize, cR, halfAngle, cellHeight, flipped, config);
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
