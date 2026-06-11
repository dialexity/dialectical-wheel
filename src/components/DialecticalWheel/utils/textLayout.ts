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
  measure: (text: string, fontSize: number) => number;
}

function chordWidth(lineIndex: number, lineHeight: number, outerR: number, innerR: number, cellAngle: number): number {
  const r = outerR - (lineIndex + 0.5) * lineHeight;
  if (r <= innerR) return innerR * cellAngle * 0.8;
  const halfAngle = Math.min(cellAngle / 2, Math.acos(Math.max(-1, Math.min(1, innerR / r))));
  return 2 * r * Math.sin(halfAngle) * 0.8;
}

function tryWrap(
  text: string,
  fontSize: number,
  params: LayoutParams
): string[] | null {
  const { innerR, outerR, cellAngle, measure } = params;
  const lineHeight = fontSize * 1.4;
  const maxLines = Math.floor((outerR - innerR) * 0.8 / lineHeight);
  if (maxLines < 1) return null;

  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';
  let lineIdx = 0;

  for (const word of words) {
    const width = chordWidth(lineIdx, lineHeight, outerR, innerR, cellAngle);
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const candidateWidth = measure(candidate, fontSize);

    if (candidateWidth <= width) {
      currentLine = candidate;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        lineIdx++;
        if (lineIdx >= maxLines) return null;
        const newWidth = chordWidth(lineIdx, lineHeight, outerR, innerR, cellAngle);
        if (measure(word, fontSize) <= newWidth) {
          currentLine = word;
        } else {
          const hyphenated = hyphenate(word, fontSize, newWidth, measure);
          if (!hyphenated) return null;
          lines.push(hyphenated[0]);
          lineIdx++;
          if (lineIdx >= maxLines) return null;
          currentLine = hyphenated[1];
        }
      } else {
        const hyphenated = hyphenate(word, fontSize, width, measure);
        if (!hyphenated) return null;
        lines.push(hyphenated[0]);
        lineIdx++;
        if (lineIdx >= maxLines) return null;
        currentLine = hyphenated[1];
      }
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length <= maxLines ? lines : null;
}

function hyphenate(
  word: string,
  fontSize: number,
  maxWidth: number,
  measure: (text: string, fontSize: number) => number
): [string, string] | null {
  if (word.length < 4) return null;
  for (let i = word.length - 1; i >= 2; i--) {
    const part = word.slice(0, i) + '-';
    if (measure(part, fontSize) <= maxWidth) {
      return [part, word.slice(i)];
    }
  }
  return null;
}

export function layoutText(text: string, params: LayoutParams): TextLayoutResult {
  const { baseFontSize } = params;
  const minFontSize = Math.max(4, baseFontSize * 0.5);

  for (let fs = baseFontSize; fs >= minFontSize; fs -= 0.5) {
    const lines = tryWrap(text, fs, { ...params, baseFontSize: fs });
    if (lines) {
      return { lines, fontSize: fs, lineHeight: fs * 1.4 };
    }
  }

  // Last resort: truncate at min font size
  const fs = minFontSize;
  const lineHeight = fs * 1.4;
  const { innerR, outerR, cellAngle, measure } = params;
  const width = chordWidth(0, lineHeight, outerR, innerR, cellAngle);
  let truncated = text;
  while (measure(truncated + '…', fs) > width && truncated.length > 1) {
    truncated = truncated.slice(0, -1).trimEnd();
  }
  return { lines: [truncated + '…'], fontSize: fs, lineHeight };
}
