export interface ParsedLine {
  index: number;
  original: string;
  cleaned: string;
  isComment: boolean;
  isExecutable: boolean;
}

export interface HistoryEntry {
  fromId: string;
  toId: string;
  color: string;
  strokeWidth: number;
  label: string;
}

/**
 * Parse DOT script into executable lines
 */
export const parseScriptLines = (script: string): ParsedLine[] => {
  return script
    .split('\n')
    .map((line, index) => ({
      index,
      original: line,
      cleaned: line.replace(/\/\/.*$/, '').trim(),
      isComment: line.trim().startsWith('//') || line.replace(/\/\/.*$/, '').trim() === '',
      isExecutable: /([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)/.test(line.replace(/\/\/.*$/, '').trim())
    }))
    .filter(line => line.cleaned.length > 0 || line.isComment);
};

/**
 * Parse DOT script lines to extract connection history
 */
export const parseScriptToHistory = (dotScript: string): HistoryEntry[] => {
  const scriptLines = dotScript.split('\n');
  const history: HistoryEntry[] = [];
  
  scriptLines.forEach(line => {
    const cleaned = line.replace(/\/\/.*$/, '').trim();
    const match = cleaned.match(/([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)\s*\[([^\]]*)\]/);
    if (match) {
      const [, from, to, attributes] = match;
      
      // Parse attributes
      let color = '#0074d9';
      let strokeWidth = 2;
      let label = '';
      
      const colorMatch = attributes.match(/color\s*=\s*([#\w]+)/);
      if (colorMatch) color = colorMatch[1];
      
      const weightMatch = attributes.match(/weight\s*=\s*(\d+)/);
      if (weightMatch) strokeWidth = parseInt(weightMatch[1]);
      
      const labelMatch = attributes.match(/label\s*=\s*["']([^"']+)["']/);
      if (labelMatch) label = labelMatch[1];
      
      history.push({
        fromId: from,
        toId: to,
        color,
        strokeWidth,
        label
      });
    }
  });
  
  return history;
}; 