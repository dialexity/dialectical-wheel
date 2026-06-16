export interface TextLayoutResult {
  lines: string[];
  fontSize: number;
  lineHeight: number;
}

interface LayoutParams {
  innerR: number;
  outerR: number;
  cellAngle: number;
  baseFontSize: number;
  padding: number;
  measure: (text: string, fontSize: number) => number;
}

function chordAt(r: number, halfAngle: number, cellHeight: number): number {
  const chord = 2 * r * Math.sin(halfAngle) * 0.9;
  return Math.min(chord, cellHeight * 1.4);
}

function tryFit(text: string, fontSize: number, params: LayoutParams): string[] | null {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure } = params;
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const topR = outerR - pad;
  const botR = innerR + pad;
  const usableHeight = topR - botR;
  const maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return null;

  const wrapR = innerR + cellHeight * 0.6;
  const wrapWidth = chordAt(wrapR, halfAngle, cellHeight);

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (measure(candidate, fontSize) <= wrapWidth) {
      currentLine = candidate;
    } else if (currentLine) {
      lines.push(currentLine);
      if (lines.length >= maxLines) return null;
      currentLine = word;
    } else {
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length > maxLines) return null;

  for (const line of lines) {
    if (measure(line, fontSize) > wrapWidth) return null;
  }

  return lines;
}

export function computeUniformFontSize(
  texts: string[],
  params: LayoutParams
): number {
  const { baseFontSize } = params;
  for (let fs = baseFontSize; fs >= 3; fs -= 0.5) {
    if (texts.every(t => tryFit(t, fs, params) !== null)) return fs;
  }
  return 3;
}

export function layoutTextFixed(text: string, fontSize: number, params: LayoutParams): TextLayoutResult {
  const result = tryFit(text, fontSize, params);
  if (result) {
    return { lines: result, fontSize, lineHeight: fontSize * 1.3 };
  }
  return wrapAtSize(text, fontSize, params);
}

function wrapAtSize(text: string, fontSize: number, params: LayoutParams): TextLayoutResult {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure } = params;
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const cellHeight = outerR - innerR;
  const pad = cellHeight * paddingFrac;
  const usableHeight = (outerR - pad) - (innerR + pad);
  const maxLines = Math.max(1, Math.floor(usableHeight / lineHeight));
  const wrapR = innerR + cellHeight * 0.6;
  const wrapWidth = chordAt(wrapR, halfAngle, cellHeight);

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lines: [''], fontSize, lineHeight };

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (measure(candidate, fontSize) <= wrapWidth) {
      currentLine = candidate;
    } else if (currentLine) {
      lines.push(currentLine);
      if (lines.length >= maxLines) break;
      currentLine = word;
    } else {
      currentLine = word;
    }
  }
  if (currentLine && lines.length < maxLines) lines.push(currentLine);

  return { lines, fontSize, lineHeight };
}
