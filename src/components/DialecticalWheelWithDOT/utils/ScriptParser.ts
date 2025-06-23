export interface ParsedLine {
  index: number;
  original: string;
  cleaned: string;
  isComment: boolean;
  isExecutable: boolean;
  commandType: 'arrow' | 'zoom' | 'rotate' | 'wait' | 'click' | 'unknown';
}

export interface HistoryEntry {
  fromId: string;
  toId: string;
  color: string;
  strokeWidth: number;
  label: string;
}

export interface ZoomCommand {
  type: 'zoom';
  action: 'in' | 'out' | 'top' | 'reset';
  scale?: number;
  duration?: number;
}

export interface RotateCommand {
  type: 'rotate';
  angle?: number;
  targetSlice?: string;
  duration?: number;
  direction?: 'cw' | 'ccw' | 'shortest';
}

export interface WaitCommand {
  type: 'wait';
  duration: number;
}

export interface ClickCommand {
  type: 'click';
  sliceId: string;
}

export type ScriptCommand = HistoryEntry | ZoomCommand | RotateCommand | WaitCommand | ClickCommand;

/**
 * Parse DOT script into executable lines with command type detection
 */
export const parseScriptLines = (script: string): ParsedLine[] => {
  return script
    .split('\n')
    .map((line, index) => {
      const cleaned = line.replace(/\/\/.*$/, '').trim();
      const isComment = line.trim().startsWith('//') || cleaned === '';
      
      let commandType: ParsedLine['commandType'] = 'unknown';
      let isExecutable = false;
      
      if (!isComment && cleaned.length > 0) {
        // Check for arrow command
        if (/([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)\s*(?:\[([^\]]*)\])?/.test(cleaned)) {
          commandType = 'arrow';
          isExecutable = true;
        }
        // Check for zoom commands
        else if (/^zoom\s+(in|out|top|reset)/.test(cleaned.toLowerCase())) {
          commandType = 'zoom';
          isExecutable = true;
        }
        // Check for rotate commands
        else if (/^rotate\s+/.test(cleaned.toLowerCase())) {
          commandType = 'rotate';
          isExecutable = true;
        }
        // Check for wait commands
        else if (/^wait\s+\d+/.test(cleaned.toLowerCase())) {
          commandType = 'wait';
          isExecutable = true;
        }
        // Check for click commands
        else if (/^click\s+[a-z]\d+[+\-]?/i.test(cleaned)) {
          commandType = 'click';
          isExecutable = true;
        }
      }
      
      return {
        index,
        original: line,
        cleaned,
        isComment,
        isExecutable,
        commandType
      };
    })
    .filter(line => line.cleaned.length > 0 || line.isComment);
};

/**
 * Parse a single script line into a command object
 */
export const parseScriptCommand = (line: string): ScriptCommand | null => {
  const cleaned = line.replace(/\/\/.*$/, '').trim().toLowerCase();
  
  // Parse arrow commands
  const arrowMatch = line.match(/([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)\s*(?:\[([^\]]*)\])?/);
  if (arrowMatch) {
    const [, from, to, attributes = ''] = arrowMatch;
    
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
    
    return {
      fromId: from,
      toId: to,
      color,
      strokeWidth,
      label
    };
  }
  
  // Parse zoom commands
  const zoomMatch = cleaned.match(/^zoom\s+(in|out|top|reset)(?:\s+scale\s*=\s*([0-9.]+))?(?:\s+duration\s*=\s*(\d+))?/);
  if (zoomMatch) {
    const [, action, scaleStr, durationStr] = zoomMatch;
    return {
      type: 'zoom',
      action: action as 'in' | 'out' | 'top' | 'reset',
      scale: scaleStr ? parseFloat(scaleStr) : undefined,
      duration: durationStr ? parseInt(durationStr) : 400
    };
  }
  
  // Parse rotate commands
  const rotateMatch = cleaned.match(/^rotate\s+(-?\d+(?:\.\d+)?)(?:\s+duration\s*=\s*(\d+))?(?:\s+direction\s*=\s*(cw|ccw|shortest))?/);
  if (rotateMatch) {
    const [, angleStr, durationStr, direction] = rotateMatch;
    return {
      type: 'rotate',
      angle: parseFloat(angleStr),
      duration: durationStr ? parseInt(durationStr) : 400,
      direction: direction as 'cw' | 'ccw' | 'shortest' || 'shortest'
    };
  }

  // Parse rotate commands with semantic slice codes
  const rotateSliceMatch = cleaned.match(/^rotate\s+([a-z]\d+[+\-]?)(?:\s+duration\s*=\s*(\d+))?(?:\s+direction\s*=\s*(cw|ccw|shortest))?/i);
  if (rotateSliceMatch) {
    const [, sliceCode, durationStr, direction] = rotateSliceMatch;
    return {
      type: 'rotate',
      targetSlice: sliceCode,
      duration: durationStr ? parseInt(durationStr) : 400,
      direction: direction as 'cw' | 'ccw' | 'shortest' || 'shortest'
    };
  }
  
  // Parse wait commands
  const waitMatch = cleaned.match(/^wait\s+(\d+)/);
  if (waitMatch) {
    const [, durationStr] = waitMatch;
    return {
      type: 'wait',
      duration: parseInt(durationStr)
    };
  }
  
  // Parse click commands
  const clickMatch = cleaned.match(/^click\s+([a-z]\d+[+\-]?)/i);
  if (clickMatch) {
    const [, sliceId] = clickMatch;
    return {
      type: 'click',
      sliceId
    };
  }
  
  return null;
};

/**
 * Parse DOT script lines to extract connection history
 */
export const parseScriptToHistory = (dotScript: string): HistoryEntry[] => {
  const scriptLines = dotScript.split('\n');
  const history: HistoryEntry[] = [];
  
  scriptLines.forEach(line => {
    const command = parseScriptCommand(line);
    if (command && 'fromId' in command) {
      history.push(command);
    }
  });
  
  return history;
};

export type LayerType = 'green' | 'white' | 'pink';
export type SliceType = 'thesis' | 'antithesis';
export interface SliceLayerMapping {
  pairIndex: number;
  sliceType: SliceType;
  layerType: LayerType;
  layerIndex: number;
}

export function parseSliceLayerCode(code: string): SliceLayerMapping | null {
  // Examples: "T1" -> Thesis pair 1, white layer
  //           "T1+" -> Thesis pair 1, green layer  
  //           "T1-" -> Thesis pair 1, pink layer
  //           "A2" -> Antithesis pair 2, white layer
  //           "A2+" -> Antithesis pair 2, green layer
  //           "A2-" -> Antithesis pair 2, pink layer
  const match = code.match(/^([TA])(\d+)([+\-]?)$/i);
  if (!match) return null;
  const [, typeChar, pairNum, modifier] = match;
  const sliceType: SliceType = typeChar.toUpperCase() === 'T' ? 'thesis' : 'antithesis';
  const pairIndex = parseInt(pairNum) - 1;
  let layerType: LayerType;
  let layerIndex: number;
  if (modifier === '+') {
    layerType = 'green';
    layerIndex = 0;
  } else if (modifier === '-') {
    layerType = 'pink';
    layerIndex = 2;
  } else {
    layerType = 'white';
    layerIndex = 1;
  }
  return { pairIndex, sliceType, layerType, layerIndex };
}

export function getNodeIdFromSliceLayerCode(code: string, dynamicSlices: any[]): string | null {
  const mapping = parseSliceLayerCode(code);
  console.log("HERE: parseSliceLayerCode result for", code, ":", mapping);
  if (!mapping) return null;
  
  // Construct the expected label from the mapping
  const expectedLabel = (mapping.sliceType === 'thesis' ? 'T' : 'A') + (mapping.pairIndex + 1);
  console.log("HERE: Expected label:", expectedLabel);
  console.log("HERE:Available slice labels:", dynamicSlices.map(s => s.label));
  
  // Find the slice by matching the label
  const slice = dynamicSlices.find(s => s.label === expectedLabel);
  console.log("HERE: Found slice:", slice);
  if (!slice) return null;
  
  // Use the slice's id to construct the node id
  const nodeId = `${slice.id}-layer-${mapping.layerIndex}`;
  console.log("HERE: Generated nodeId:", nodeId);
  return nodeId;
}

export function getRotationAngleForSlice(sliceCode: string, dynamicSlices: any[]): number | null {
  const mapping = parseSliceLayerCode(sliceCode);
  if (!mapping) return null;
  
  // Construct the expected label from the mapping
  const expectedLabel = (mapping.sliceType === 'thesis' ? 'T' : 'A') + (mapping.pairIndex + 1);
  
  // Find the slice by matching the label
  const slice = dynamicSlices.find(s => s.label === expectedLabel);
  if (!slice) return null;
  
  // Calculate the angle needed to bring this slice to the top center (270°)
  // The slice's current angle is slice.angle, we want it at 270°
  const targetAngle = 270 - slice.angle;
  
  // Normalize to 0-360 range
  return ((targetAngle % 360) + 360) % 360;
} 