import React from 'react';

// Type definitions
interface LayerNode {
  nodeId: string;
  sliceId: string;
  pairIndex?: number;
  sliceType?: 'thesis' | 'antithesis';
  layerIndex: number;
  layerType: 'green' | 'white' | 'pink';
}

interface SliceData {
  labels: [string, string][];
}

interface SliceProps {
  sliceData: SliceData;
  sliceId: string;
  angle?: number;
  cx?: number;
  cy?: number;
  radius?: number;
  sliceAngle?: number;
  layerColors?: string[] | null;
  fontSizes?: number[] | null;
  showBoundaries?: boolean;
  pairIndex?: number | null;
  sliceType?: 'thesis' | 'antithesis' | null;
  originalSliceIndex?: number | null;
}

// Utility functions
const wrapTextForArc = (text: string, arcLength: number, fontSize: number): string[] => {
  if (!text) return [''];
  
  const avgCharWidth = fontSize * 0.6;
  const maxCharsPerLine = Math.floor(arcLength / avgCharWidth);
  
  if (text.length <= maxCharsPerLine) {
    return [text];
  }
  
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        lines.push(word.substring(0, maxCharsPerLine));
        currentLine = word.substring(maxCharsPerLine);
      }
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines.slice(0, 3); // Max 3 lines
};

const calculateOptimalFontSize = (text: string, arcLength: number, maxFontSize: number, minFontSize: number = 4): number => {
  if (!text) return maxFontSize;
  
  let fontSize = maxFontSize;
  while (fontSize >= minFontSize) {
    const avgCharWidth = fontSize * 0.6;
    const maxCharsPerLine = Math.floor(arcLength / avgCharWidth);
    
    const lines = wrapTextForArc(text, arcLength, fontSize);
    const longestLine = Math.max(...lines.map(line => line.length));
    
    if (longestLine <= maxCharsPerLine) {
      return fontSize;
    }
    
    fontSize -= 0.5;
  }
  
  return minFontSize;
};

const toRadians = (deg: number): number => deg * Math.PI / 180;

// React component for slice at a specific angle
export const SliceAtAngle: React.FC<SliceProps> = ({
  sliceData,
  sliceId,
  angle = 0,
  cx = 200,
  cy = 200,
  radius = 150,
  sliceAngle = 120,
  layerColors = null,
  fontSizes = null,
  showBoundaries = true,
  pairIndex = null,
  sliceType = null,
  originalSliceIndex = null
}) => {
  const { labels } = sliceData;
  const nLabels = labels.length;
  
  const defaultLayerColors = ['#C6E5B3', '#FFFFFF', '#F9C6CC']; // green, white, pink
  const defaultFontSizes = [8, 10, 14];
  const colors = layerColors || defaultLayerColors;
  const fonts = fontSizes || defaultFontSizes;
  
  const halfAngle = sliceAngle / 2;
  
  // Generate layer elements (rings)
  const layerElements: JSX.Element[] = [];
  
  for (let layer = 0; layer < nLabels; layer++) {
    const innerRadius = radius * (0.3 + 0.7 * layer / nLabels);
    const outerRadius = radius * (0.3 + 0.7 * (layer + 1) / nLabels);
    const color = colors[layer % colors.length];
    
    const startAngleRad = toRadians(angle - halfAngle);
    const endAngleRad = toRadians(angle + halfAngle);
    
    const innerX1 = cx + innerRadius * Math.cos(startAngleRad);
    const innerY1 = cy + innerRadius * Math.sin(startAngleRad);
    const innerX2 = cx + innerRadius * Math.cos(endAngleRad);
    const innerY2 = cy + innerRadius * Math.sin(endAngleRad);
    
    const outerX1 = cx + outerRadius * Math.cos(startAngleRad);
    const outerY1 = cy + outerRadius * Math.sin(startAngleRad);
    const outerX2 = cx + outerRadius * Math.cos(endAngleRad);
    const outerY2 = cy + outerRadius * Math.sin(endAngleRad);
    
    const largeArc = sliceAngle > 180 ? 1 : 0;
    
    const pathD = `M ${outerX1},${outerY1} 
                   A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${outerX2},${outerY2} 
                   L ${innerX2},${innerY2} 
                   A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${innerX1},${innerY1} Z`;
    
    // Generate node attributes for data
    const layerType = layer === 0 ? 'green' : layer === 1 ? 'white' : 'pink';
    const nodeId = `${sliceId}-layer-${layer}`;
    
    layerElements.push(
      <path
        key={`${sliceId}-layer-${layer}`}
        d={pathD}
        fill={color}
        className="layer-node"
        data-node-id={nodeId}
        data-slice-id={sliceId}
        data-pair-index={pairIndex ?? undefined}
        data-slice-type={sliceType ?? undefined}
        data-layer-index={layer}
        data-layer-type={layerType}
      />
    );
  }
  
  // Generate text elements
  const textElements: JSX.Element[] = [];
  
  for (let j = 0; j < labels.length; j++) {
    const [label, color] = labels[j];
    
    // Calculate radius for this layer with better clearance from edges
    const innerRadius = radius * (0.3 + 0.7 * j / nLabels);
    const outerRadius = radius * (0.3 + 0.7 * (j + 1) / nLabels);
    
    // Use weighted average closer to inner edge for outer layers to avoid edge proximity
    const clearanceFactor = j === (nLabels - 1) ? 0.3 : 0.5; // 30% from inner for outermost, 50% for others
    const textRadius = innerRadius + (outerRadius - innerRadius) * clearanceFactor;
    const maxFontSize = fonts[j % fonts.length];
    
    // Calculate arc length for this text layer
    const arcLengthRadians = (sliceAngle * Math.PI) / 180;
    const arcLength = textRadius * arcLengthRadians;
    
    // Calculate optimal font size
    const optimalFontSize = calculateOptimalFontSize(label, arcLength, maxFontSize);
    
    // Wrap text if needed
    const wrappedLines = wrapTextForArc(label, arcLength, optimalFontSize);
    
    // Create arc path for text
    const startAngleRad = toRadians(angle - halfAngle);
    const endAngleRad = toRadians(angle + halfAngle);
    
    // For multiple lines, adjust radius for each line
    const lineSpacing = optimalFontSize * 1.2;
    const totalHeight = (wrappedLines.length - 1) * lineSpacing;
    const startRadius = textRadius - totalHeight / 2;
    
    wrappedLines.forEach((line, lineIndex) => {
      // Reverse line order: first line gets largest radius (farthest from center)
      const currentRadius = startRadius + ((wrappedLines.length - 1 - lineIndex) * lineSpacing);
      
      // Skip if radius is out of bounds
      if (currentRadius < radius * 0.3 || currentRadius > radius) {
        return;
      }
      
      const arcStartX = cx + currentRadius * Math.cos(startAngleRad);
      const arcStartY = cy + currentRadius * Math.sin(startAngleRad);
      const arcEndX = cx + currentRadius * Math.cos(endAngleRad);
      const arcEndY = cy + currentRadius * Math.sin(endAngleRad);
      
      const arcId = `${sliceId}-arc-${j}-line-${lineIndex}`;
      const largeArc = sliceAngle > 180 ? 1 : 0;
      const arcPath = `M ${arcStartX},${arcStartY} A ${currentRadius},${currentRadius} 0 ${largeArc},1 ${arcEndX},${arcEndY}`;
      
      textElements.push(
        <defs key={`${arcId}-def`}>
          <path id={arcId} d={arcPath} fill="none" />
        </defs>
      );
      
      textElements.push(
        <text key={`${arcId}-text`} fontSize={optimalFontSize} fill={color}>
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {line}
          </textPath>
        </text>
      );
    });
  }
  
  // Generate boundary lines
  const boundaryElements: JSX.Element[] = [];
  
  if (showBoundaries) {
    const startAngleRad = toRadians(angle - halfAngle);
    const endAngleRad = toRadians(angle + halfAngle);
    
    const boundaryX1 = cx + radius * Math.cos(startAngleRad);
    const boundaryY1 = cy + radius * Math.sin(startAngleRad);
    const boundaryX2 = cx + radius * Math.cos(endAngleRad);
    const boundaryY2 = cy + radius * Math.sin(endAngleRad);
    
    boundaryElements.push(
      <line
        key={`${sliceId}-boundary-1`}
        x1={cx}
        y1={cy}
        x2={boundaryX1}
        y2={boundaryY1}
        stroke="#888"
        strokeWidth="1"
      />,
      <line
        key={`${sliceId}-boundary-2`}
        x1={cx}
        y1={cy}
        x2={boundaryX2}
        y2={boundaryY2}
        stroke="#888"
        strokeWidth="1"
      />
    );
  }
  
  return (
    <g>
      {layerElements}
      {boundaryElements}
      {textElements}
    </g>
  );
};

// React component for detailed slice (fixed position)
export const DetailedSlice: React.FC<{
  texts: string[];
  sliceId: string;
  debugColor?: string;
}> = ({ texts, sliceId, debugColor = '#888' }) => {
  const centerX = 200, centerY = 200;
  const startAngle = -60;
  const endAngle = 60;
  
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);
  
  const ringRadii = [
    { inner: 45, outer: 80, fill: '#C6E5B3' },   // Inner ring - green
    { inner: 80, outer: 115, fill: '#FFFFFF' },  // Middle ring - white  
    { inner: 115, outer: 150, fill: '#F9C6CC' }  // Outer ring - pink
  ];
  
  const pathElements: JSX.Element[] = [];
  const textElements: JSX.Element[] = [];
  
  // Generate ring paths
  ringRadii.forEach((ring, index) => {
    const inner1X = centerX + ring.inner * Math.cos(startRad);
    const inner1Y = centerY + ring.inner * Math.sin(startRad);
    const inner2X = centerX + ring.inner * Math.cos(endRad);
    const inner2Y = centerY + ring.inner * Math.sin(endRad);
    
    const outer1X = centerX + ring.outer * Math.cos(startRad);
    const outer1Y = centerY + ring.outer * Math.sin(startRad);
    const outer2X = centerX + ring.outer * Math.cos(endRad);
    const outer2Y = centerY + ring.outer * Math.sin(endRad);
    
    const largeArc = 0; // 120° is less than 180°
    
    const pathD = `M ${outer1X},${outer1Y} 
                   A ${ring.outer},${ring.outer} 0 ${largeArc},1 ${outer2X},${outer2Y} 
                   L ${inner2X},${inner2Y} 
                   A ${ring.inner},${ring.inner} 0 ${largeArc},0 ${inner1X},${inner1Y} 
                   L ${outer1X},${outer1Y} Z`;
    
    pathElements.push(
      <path
        key={`${sliceId}-ring-${index}`}
        d={pathD}
        fill={ring.fill}
        stroke={debugColor}
        strokeWidth="2"
      />
    );
    
    // Add text if available
    if (texts[index]) {
      const textRadius = (ring.inner + ring.outer) / 2;
      const arcId = `${sliceId}-arc-${index}`;
      
      const textStartX = centerX + textRadius * Math.cos(startRad);
      const textStartY = centerY + textRadius * Math.sin(startRad);
      const textEndX = centerX + textRadius * Math.cos(endRad);
      const textEndY = centerY + textRadius * Math.sin(endRad);
      
      const textArcPath = `M ${textStartX},${textStartY} A ${textRadius},${textRadius} 0 ${largeArc},1 ${textEndX},${textEndY}`;
      
      const maxFontSize = index === 0 ? 8 : index === 1 ? 10 : 14;
      const arcLengthRadians = (120 * Math.PI) / 180;
      const arcLength = textRadius * arcLengthRadians;
      const optimalFontSize = calculateOptimalFontSize(texts[index], arcLength, maxFontSize);
      
      const color = index === 0 ? 'green' : index === 1 ? 'black' : 'red';
      
      textElements.push(
        <defs key={`${arcId}-def`}>
          <path id={arcId} d={textArcPath} fill="none" />
        </defs>
      );
      
      textElements.push(
        <text key={`${arcId}-text`} fontSize={optimalFontSize} fill={color}>
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {texts[index]}
          </textPath>
        </text>
      );
    }
  });
  
  // Add boundary lines
  const boundaryElements = [
    <line
      key={`${sliceId}-boundary-1`}
      x1={centerX}
      y1={centerY}
      x2={centerX + 150 * Math.cos(startRad)}
      y2={centerY + 150 * Math.sin(startRad)}
      stroke={debugColor}
      strokeWidth="3"
    />,
    <line
      key={`${sliceId}-boundary-2`}
      x1={centerX}
      y1={centerY}
      x2={centerX + 150 * Math.cos(endRad)}
      y2={centerY + 150 * Math.sin(endRad)}
      stroke={debugColor}
      strokeWidth="3"
    />
  ];
  
  return (
    <g>
      {pathElements}
      {textElements}
      {boundaryElements}
    </g>
  );
};

// Function to generate pair texts from WisdomUnits (for compatibility with existing code)
export const generatePairTextsFromWisdomUnits = (wisdomUnits: any[]) => {
  const pairTexts: Record<number, any> = {};
  
  wisdomUnits.forEach((wu, index) => {
    // Generate thesis labels
    const thesisLabels = [];
    if (wu.tPlus && wu.tPlus.statement) thesisLabels.push([wu.tPlus.statement, 'green']);
    if (wu.t && wu.t.statement) thesisLabels.push([wu.t.statement, 'black']);
    if (wu.tMinus && wu.tMinus.statement) thesisLabels.push([wu.tMinus.statement, 'red']);
    
    // Generate antithesis labels
    const antithesisLabels = [];
    if (wu.aPlus && wu.aPlus.statement) antithesisLabels.push([wu.aPlus.statement, 'green']);
    if (wu.a && wu.a.statement) antithesisLabels.push([wu.a.statement, 'black']);
    if (wu.aMinus && wu.aMinus.statement) antithesisLabels.push([wu.aMinus.statement, 'red']);
    
    // Only add if we have both sides
    if (thesisLabels.length > 0 && antithesisLabels.length > 0) {
      pairTexts[index] = {
        thesis: thesisLabels,
        antithesis: antithesisLabels
      };
    }
  });
  
  return pairTexts;
};

// Default pair texts data (moved here to avoid circular dependencies)
export const defaultPairTexts = {
  0: {
    thesis: [
      ['Strategic power projection', 'green'],
      ['Putin initiates war', 'black'], 
      ['Destructive aggression', 'red']
    ],
    antithesis: [
      ['Mutual understanding', 'green'],
      ['Peace negotiations', 'black'],
      ['Passive submission', 'red']
    ]
  },
  1: {
    thesis: [
      ['Liberation and sovereignty protected', 'green'],
      ['Ukraine resists invasion', 'black'],
      ['Endless conflict and destruction', 'red']
    ],
    antithesis: [
      ['Immediate peace achieved', 'green'],
      ['Ukraine surrenders to invasion', 'black'],
      ['Freedom and independence lost', 'red']
    ]
  },
  2: {
    thesis: [
      ['Ukrainian victory approaches', 'green'],
      ['Russian offensive weakens', 'black'],
      ['Military resources drain rapidly', 'red']
    ],
    antithesis: [
      ['Strategic military strength maintained', 'green'],
      ['Russian military dominance persists', 'black'],
      ['Total defeat inevitable', 'red']
    ]
  },
  3: {
    thesis: [
      ['Freedom restored', 'green'],
      ['Ukrainian victory approaches', 'black'],
      ['Vengeance intensifies', 'red']
    ],
    antithesis: [
      ['Stability maintained', 'green'],
      ['Russian dominance persists', 'black'],
      ['Oppression deepens', 'red']
    ]
  }
}; 