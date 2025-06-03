// Helper function to wrap text into multiple lines that fit in the arc
const wrapTextForArc = (text, arcLength, fontSize) => {
  const charWidthRatio = 0.5;
  const maxCharsPerLine = Math.floor(arcLength / (fontSize * charWidthRatio));
  
  // If text fits in one line, return as is
  if (text.length <= maxCharsPerLine) {
    return [text];
  }
  
  // Split text into words and wrap
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      // If current line has content, push it and start new line
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Single word is too long, force break it
        if (word.length > maxCharsPerLine) {
          lines.push(word.substring(0, maxCharsPerLine - 3) + '...');
          currentLine = '';
        } else {
          currentLine = word;
        }
      }
    }
  }
  
  // Add the last line if it has content
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Limit to maximum of 2-3 lines to avoid overcrowding
  return lines.slice(0, 3);
};

// Helper function to calculate optimal font size for text to fit in arc
const calculateOptimalFontSize = (text, arcLength, maxFontSize, minFontSize = 4) => {
  // More accurate character width estimation: each character takes about 0.5 * fontSize pixels in width
  const charWidthRatio = 0.5;
  
  // Use more of the arc length (90% instead of 80%)
  const usableArcLength = arcLength * 0.9;
  
  // Calculate required width for the text at max font size
  const estimatedTextWidth = text.length * maxFontSize * charWidthRatio;
  
  // If text fits at max size, use max size
  if (estimatedTextWidth <= usableArcLength) {
    return maxFontSize;
  }
  
  // Calculate required font size to fit
  const requiredFontSize = usableArcLength / (text.length * charWidthRatio);
  
  // Return the font size, but not smaller than minimum
  const finalSize = Math.max(minFontSize, Math.min(maxFontSize, requiredFontSize));
  
  // Additional check: if text is extremely long, use an even smaller minimum
  if (text.length > 40 && finalSize === minFontSize) {
    return Math.max(3, finalSize); // Allow font as small as 3px for very long text
  }
  
  return finalSize;
};

// JavaScript equivalent of Python's create_slice_at_angle function
export const createSliceAtAngle = (sliceData, sliceId, angle = 0, cx = 200, cy = 200, radius = 150, 
                            sliceAngle = 120, layerColors = null, fontSizes = null, 
                            showBoundaries = true, pairIndex = null, sliceType = null, originalSliceIndex = null) => {
  // Default values matching Python generator
  if (!layerColors) {
    layerColors = ["#C6E5B3", "#FFFFFF", "#F9C6CC", "#FFFF99"]; // green, white, pink, yellow
  }
  if (!fontSizes) {
    fontSizes = [8, 10, 14];
  }
  
  const labels = sliceData.labels;
  const nLabels = labels.length;
  const halfAngle = sliceAngle / 2;
  
  const toRadians = (deg) => deg * Math.PI / 180;
  
  const svgElements = [];
  
  // Create background sectors for each layer within the slice
  for (let layer = 0; layer < nLabels; layer++) {
    const innerRadius = radius * (0.3 + 0.7 * layer / nLabels);
    const outerRadius = radius * (0.3 + 0.7 * (layer + 1) / nLabels);
    
    // Calculate sector points positioned at the specified angle
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
    
    const color = layerColors[layer % layerColors.length];
    const largeArc = sliceAngle > 180 ? 1 : 0;
    
    // Create sector path matching the original HTML structure
    const pathD = `M ${outerX1},${outerY1} ` +
                 `A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${outerX2},${outerY2} ` +
                 `L ${innerX2},${innerY2} ` +
                 `A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${innerX1},${innerY1} Z`;
    
    // Add node identification attributes for arrow connections
    const nodeId = `${sliceId}-layer-${layer}`;
    const layerType = layer === 0 ? 'green' : layer === 1 ? 'white' : 'pink';
    
    const nodeAttributes = [
      `class="layer-node"`,
      `data-node-id="${nodeId}"`,
      `data-slice-id="${sliceId}"`,
      pairIndex !== null ? `data-pair-index="${pairIndex}"` : '',
      sliceType !== null ? `data-slice-type="${sliceType}"` : '',
      `data-layer-index="${layer}"`,
      `data-layer-type="${layerType}"`
    ].filter(attr => attr !== '').join(' ');
    
    svgElements.push(`<path d="${pathD}" fill="${color}" ${nodeAttributes}/>`);
  }
  
  // Add text labels along arcs within the slice
  for (let j = 0; j < labels.length; j++) {
    const [label, color] = labels[j];
    
    // Calculate radius for this layer (matching original HTML structure)
    const textRadius = radius * (0.3 + 0.7 * (j + 0.5) / nLabels);
    const maxFontSize = fontSizes[j % fontSizes.length];
    
    // Calculate arc length for this text layer
    const arcLengthRadians = (sliceAngle * Math.PI) / 180;
    const arcLength = textRadius * arcLengthRadians;
    
    // Calculate optimal font size based on text length and available space
    const optimalFontSize = calculateOptimalFontSize(label, arcLength, maxFontSize);
    
    // Wrap text if it's too long
    const wrappedLines = wrapTextForArc(label, arcLength, optimalFontSize);
    
    // Create arc path for text positioned at the specified angle
    const startAngleRad = toRadians(angle - halfAngle);
    const endAngleRad = toRadians(angle + halfAngle);
    
    // For multiple lines, we need to adjust the radius for each line
    const lineSpacing = optimalFontSize * 1.2; // 120% of font size for line spacing
    const totalHeight = (wrappedLines.length - 1) * lineSpacing;
    const startRadius = textRadius - totalHeight / 2;
    
    wrappedLines.forEach((line, lineIndex) => {
      const currentRadius = startRadius + (lineIndex * lineSpacing);
      
      // Skip if radius becomes too small or too large
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
      
      svgElements.push(`<path id="${arcId}" d="${arcPath}" fill="none"/>`);
      svgElements.push(`<text font-size="${optimalFontSize}" fill="${color}"><textPath href="#${arcId}" startOffset="50%" text-anchor="middle">${line}</textPath></text>`);
    });
  }
  
  // Add slice boundaries matching original HTML
  if (showBoundaries) {
    const startAngleRad = toRadians(angle - halfAngle);
    const endAngleRad = toRadians(angle + halfAngle);
    
    const boundaryX1 = cx + radius * Math.cos(startAngleRad);
    const boundaryY1 = cy + radius * Math.sin(startAngleRad);
    const boundaryX2 = cx + radius * Math.cos(endAngleRad);
    const boundaryY2 = cy + radius * Math.sin(endAngleRad);
    
    svgElements.push(`<line x1="${cx}" y1="${cy}" x2="${boundaryX1}" y2="${boundaryY1}" stroke="#888" stroke-width="1"/>`);
    svgElements.push(`<line x1="${cx}" y1="${cy}" x2="${boundaryX2}" y2="${boundaryY2}" stroke="#888" stroke-width="1"/>`);
  }
  
  return svgElements.join('\n');
};

// JavaScript equivalent of Python's svg_dialectical_wheel_wisdom function
export const generateWheelFromWisdomUnits = (wisdomUnits, options = {}) => {
  const {
    centerLabel = "Core",
    radius = 150,
    width = 400,
    height = 400,
    sliceAngle = 120,
    layerColors = null,
    fontSizes = null
  } = options;

  const thesisAntithesisPairs = [];

  for (const wu of wisdomUnits) {
    // Thesis slice: T+, T, T- (green, black, red)
    const thesisLabels = [];
    const thesisAttrs = [
      { attr: 'tPlus', color: 'green' },
      { attr: 't', color: 'black' },
      { attr: 'tMinus', color: 'red' }
    ];

    for (const { attr, color } of thesisAttrs) {
      const comp = wu[attr];
      if (comp && comp.statement) {
        thesisLabels.push([comp.statement, color]);
      }
    }

    // Antithesis slice: A+, A, A- (green, black, red)
    const antithesisLabels = [];
    const antithesisAttrs = [
      { attr: 'aPlus', color: 'green' },
      { attr: 'a', color: 'black' },
      { attr: 'aMinus', color: 'red' }
    ];

    for (const { attr, color } of antithesisAttrs) {
      const comp = wu[attr];
      if (comp && comp.statement) {
        antithesisLabels.push([comp.statement, color]);
      }
    }

    // Only add pairs where we have at least one label for each side
    if (thesisLabels.length > 0 && antithesisLabels.length > 0) {
      thesisAntithesisPairs.push({
        thesis: { labels: thesisLabels },
        antithesis: { labels: antithesisLabels }
      });
    }
  }

  return createThesisAntithesisWheel(thesisAntithesisPairs, {
    centerLabel,
    radius,
    width,
    height,
    sliceAngle,
    layerColors,
    fontSizes
  });
};

// JavaScript equivalent of Python's create_thesis_antithesis_wheel function
export const createThesisAntithesisWheel = (thesisAntithesisPairs, options = {}) => {
  const {
    centerLabel = "Core",
    radius = 150,
    width = 400,
    height = 400,
    sliceAngle = 120,
    layerColors = null,
    fontSizes = null
  } = options;

  const nPairs = thesisAntithesisPairs.length;
  
  // Create slices list with proper positioning
  const slices = [];
  const slicePositioning = []; // Track which slice is thesis/antithesis and its pair
  
  for (let i = 0; i < nPairs; i++) {
    const pair = thesisAntithesisPairs[i];
    
    // Thesis angle
    const thesisAngle = i * (360 / nPairs);
    // Antithesis angle (opposite side)
    const antithesisAngle = (thesisAngle + 180) % 360;
    
    // Add to positioning tracking
    slicePositioning.push({
      type: 'thesis',
      pairIndex: i,
      angle: thesisAngle,
      partnerAngle: antithesisAngle
    });
    slicePositioning.push({
      type: 'antithesis',
      pairIndex: i,
      angle: antithesisAngle,
      partnerAngle: thesisAngle
    });
  }
  
  // Sort by angle to get proper slice order
  slicePositioning.sort((a, b) => a.angle - b.angle);
  
  // Build slices list in angle order
  for (const posInfo of slicePositioning) {
    const currentPair = thesisAntithesisPairs[posInfo.pairIndex];
    if (posInfo.type === 'thesis') {
      slices.push(currentPair.thesis);
    } else {
      slices.push(currentPair.antithesis);
    }
  }

  // Return the processed data structure for use in React component
  return {
    slices,
    slicePositioning,
    numPairs: nPairs,
    options: {
      centerLabel,
      radius,
      width,
      height,
      sliceAngle,
      layerColors,
      fontSizes
    }
  };
};

// Utility function to create a WisdomUnit-like object structure
export const createWisdomUnit = (thesisComponents = {}, antithesisComponents = {}) => {
  return {
    // Thesis components
    tPlus: thesisComponents.tPlus || null,
    t: thesisComponents.t || null,
    tMinus: thesisComponents.tMinus || null,
    
    // Antithesis components
    aPlus: antithesisComponents.aPlus || null,
    a: antithesisComponents.a || null,
    aMinus: antithesisComponents.aMinus || null
  };
};

// Helper function to create component with statement
export const createComponent = (statement) => {
  return { statement };
};

// Function to generate pair texts from WisdomUnits (for compatibility with existing code)
export const generatePairTextsFromWisdomUnits = (wisdomUnits) => {
  const pairTexts = {};
  
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

// Function to generate detailed slice content with custom text (position-agnostic)
export const generateDetailedSlice = (texts, sliceId, debugColor = '#888') => {
  const centerX = 200, centerY = 200;
  const startAngle = -60; // Start 60° before 0° to center the slice at 0°
  const endAngle = 60;   // End 60° after 0° to center the slice at 0°
  
  const toRadians = (deg) => deg * Math.PI / 180;
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);
  
  // Define the radii for the three rings (matching original design)
  const ringRadii = [
    { inner: 45, outer: 80, fill: '#C6E5B3' },   // Inner ring - green
    { inner: 80, outer: 115, fill: '#FFFFFF' },  // Middle ring - white  
    { inner: 115, outer: 150, fill: '#F9C6CC' }  // Outer ring - pink
  ];
  
  const paths = [];
  const textPaths = [];
  
  // Generate the three ring paths
  ringRadii.forEach((ring, index) => {
    // Calculate points in the correct order for proper winding
    const inner1X = centerX + ring.inner * Math.cos(startRad);
    const inner1Y = centerY + ring.inner * Math.sin(startRad);
    const inner2X = centerX + ring.inner * Math.cos(endRad);
    const inner2Y = centerY + ring.inner * Math.sin(endRad);
    
    const outer1X = centerX + ring.outer * Math.cos(startRad);
    const outer1Y = centerY + ring.outer * Math.sin(startRad);
    const outer2X = centerX + ring.outer * Math.cos(endRad);
    const outer2Y = centerY + ring.outer * Math.sin(endRad);
    
    const largeArc = 0; // 120° is less than 180°
    
    // Create path with proper winding order (outer arc clockwise, inner arc counter-clockwise)
    const pathD = `M ${outer1X},${outer1Y} 
                   A ${ring.outer},${ring.outer} 0 ${largeArc},1 ${outer2X},${outer2Y} 
                   L ${inner2X},${inner2Y} 
                   A ${ring.inner},${ring.inner} 0 ${largeArc},0 ${inner1X},${inner1Y} 
                   L ${outer1X},${outer1Y} Z`;
    
    paths.push(`<path d="${pathD}" fill="${ring.fill}" stroke="${debugColor}" stroke-width="2"/>`);
    
    // Add text path for this ring
    if (texts[index]) {
      const textRadius = (ring.inner + ring.outer) / 2;
      const arcId = `${sliceId}-arc-${index}`;
      
      // Create text path that follows the middle of the ring
      const textStartX = centerX + textRadius * Math.cos(startRad);
      const textStartY = centerY + textRadius * Math.sin(startRad);
      const textEndX = centerX + textRadius * Math.cos(endRad);
      const textEndY = centerY + textRadius * Math.sin(endRad);
      
      const textArcPath = `M ${textStartX},${textStartY} A ${textRadius},${textRadius} 0 ${largeArc},1 ${textEndX},${textEndY}`;
      
      textPaths.push(`<path id="${arcId}" d="${textArcPath}" fill="none"/>`);
      
      const maxFontSize = index === 0 ? 8 : index === 1 ? 10 : 14;
      
      // Calculate arc length for this text layer (120° slice)
      const arcLengthRadians = (120 * Math.PI) / 180;
      const arcLength = textRadius * arcLengthRadians;
      
      // Calculate optimal font size based on text length and available space
      const optimalFontSize = calculateOptimalFontSize(texts[index], arcLength, maxFontSize);
      
      const color = index === 0 ? 'green' : index === 1 ? 'black' : 'red';
      textPaths.push(`<text font-size="${optimalFontSize}" fill="${color}"><textPath href="#${arcId}" startOffset="50%" text-anchor="middle">${texts[index]}</textPath></text>`);
    }
  });
  
  // Add boundary lines
  const boundaryLines = [
    `<line x1="${centerX}" y1="${centerY}" x2="${centerX + 150 * Math.cos(startRad)}" y2="${centerY + 150 * Math.sin(startRad)}" stroke="${debugColor}" stroke-width="3"/>`,
    `<line x1="${centerX}" y1="${centerY}" x2="${centerX + 150 * Math.cos(endRad)}" y2="${centerY + 150 * Math.sin(endRad)}" stroke="${debugColor}" stroke-width="3"/>`
  ];
  
  return [
    ...paths,
    ...textPaths,
    ...boundaryLines
  ].join('\n');
};

// Default pair texts data
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