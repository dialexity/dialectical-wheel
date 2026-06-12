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

// The cell is a trapezoid: wider at the outer radius, narrower at the inner.
// Each line of text sits at a specific radius and gets width = chord at that radius.
// Lines are stacked from outer edge inward (top line = outermost = widest).

function chordAt(r: number, halfAngle: number): number {
  return 2 * r * Math.sin(halfAngle) * 0.9;
}

function tryFit(text: string, fontSize: number, params: LayoutParams): string[] | null {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure } = params;
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const pad = (outerR - innerR) * paddingFrac;
  const topR = outerR - pad;
  const botR = innerR + pad;
  const usableHeight = topR - botR;
  const maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return null;

  // Use chord at 60% between inner and outer (biased outward where there's more space)
  // Clip path handles any overflow on inner lines
  const wrapR = innerR + (outerR - innerR) * 0.6;
  const wrapWidth = chordAt(wrapR, halfAngle);

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

  // Check that each line fits — reject if any line exceeds wrapWidth
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

export function layoutText(text: string, params: LayoutParams): TextLayoutResult {
  return layoutTextFixed(text, params.baseFontSize, params);
}

export function layoutTextFixed(text: string, fontSize: number, params: LayoutParams): TextLayoutResult {
  const result = tryFit(text, fontSize, params);
  if (result) {
    return { lines: result, fontSize, lineHeight: fontSize * 1.3 };
  }
  // tryFit failed — wrap at this size without verification (clip path handles overflow).
  // This ensures uniform sizing within a ring even if verification is slightly off.
  return wrapAtSize(text, fontSize, params);
}

function wrapAtSize(text: string, fontSize: number, params: LayoutParams): TextLayoutResult {
  const { innerR, outerR, cellAngle, padding: paddingFrac, measure } = params;
  const lineHeight = fontSize * 1.3;
  const halfAngle = cellAngle / 2;
  const pad = (outerR - innerR) * paddingFrac;
  const usableHeight = (outerR - pad) - (innerR + pad);
  const maxLines = Math.max(1, Math.floor(usableHeight / lineHeight));
  const wrapR = innerR + (outerR - innerR) * 0.6;
  const wrapWidth = chordAt(wrapR, halfAngle);

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
