import React, { useState, useRef, useEffect, useMemo } from 'react';
import './DialecticalWheel.css';
import { defaultPairTexts } from '../../utils/sliceGenerator';
import { SliceAtAngle } from '../../utils/SliceGenerator';

// Type definitions
interface SliceConfig {
  pair: number;
  type: 'thesis' | 'antithesis';
}

interface SequenceWithLabels {
  label: string;
  pair: number;
  type: 'thesis' | 'antithesis';
}

interface DynamicSlice {
  id: string;
  angle: number;
  width: number;
  label: string;
  pair: number;
  type: 'thesis' | 'antithesis';
  focused?: boolean;
  detailed?: boolean;
  originalIndex?: number;
  svgContent?: string;
}

interface DetailedSlices {
  [key: number]: {
    thesis: string;
    antithesis: string;
  };
}

interface PairTexts {
  [key: number]: {
    thesis: string[][];
    antithesis: string[][];
  };
}

interface DialecticalWheelProps {
  numPairs?: number;
  title?: string;
  centerLabel?: string;
  sliceSequence?: SliceConfig[] | null;
  fullSequence?: SequenceWithLabels[] | null;
  detailedSlices?: DetailedSlices;
  pairTexts?: PairTexts | null;
}

const DialecticalWheel: React.FC<DialecticalWheelProps> = ({ 
  numPairs = 4, 
  title = "Win-Win",
  centerLabel = "Core",
  sliceSequence = null, // Custom slice sequence for first half
  fullSequence = null, // Complete sequence from API (overrides sliceSequence)
  detailedSlices = {}, // { 0: { thesis: "<g>...</g>", antithesis: "<g>...</g>" }, ... }
  pairTexts = null // Custom pair texts data from API
}) => {
  // State matching the JavaScript variables
  const [rotation, setRotation] = useState<number>(270); // Start with first slice at top center
  const [scale, setScale] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [focusedPair, setFocusedPair] = useState<number | null>(null);
  const [dynamicSlices, setDynamicSlices] = useState<DynamicSlice[]>([]);
  const [showArrows, setShowArrows] = useState<boolean>(true);
  
  const recordRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startAngleRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);

  // Constants from the JavaScript class
  const normalSliceAngle = 360 / (2 * numPairs);
  const focusedSliceAngle = 120;
  const unfocusedSliceAngle = (360 - 2 * focusedSliceAngle) / (2 * numPairs - 2);

  // Wheel sequence (matches the JavaScript generateSequence function)
  const wheelSequence = useMemo(() => {
    const sequence = [];
    
    // Handle custom slice sequence or use default
    let firstHalf;
    if (sliceSequence === null) {
      // Default sequence: T1, T2, ..., TN, A1, A2, ..., AN
      firstHalf = [];
      for (let i = 0; i < numPairs; i++) {
        firstHalf.push({ pair: i, type: 'thesis' });
      }
    } else {
      // Validate and use custom sequence
      if (sliceSequence.length !== numPairs) {
        console.error(`sliceSequence must contain exactly ${numPairs} elements for the first half`);
        // Fall back to default
        firstHalf = [];
        for (let i = 0; i < numPairs; i++) {
          firstHalf.push({ pair: i, type: 'thesis' });
        }
      } else {
        firstHalf = [...sliceSequence];
      }
      }
      
      // Create full sequence: first N as specified, next N as opposites
      const secondHalf = firstHalf.map(slice => ({
        pair: slice.pair,
        type: slice.type === 'thesis' ? 'antithesis' : 'thesis'
      }));

    sequence.push(...firstHalf, ...secondHalf);
    return sequence;
  }, [numPairs, sliceSequence]);
  
  const sequenceWithLabels = useMemo((): SequenceWithLabels[] => {
    return wheelSequence.map((slice, index) => ({
      label: `${slice.type === 'thesis' ? 'T' : 'A'}${slice.pair + 1}`,
      pair: slice.pair,
      type: slice.type as 'thesis' | 'antithesis'
    }));
  }, [wheelSequence]);

  // Log the sequence for debugging (like the original HTML)
  console.log(`Initialized ${title} wheel with sequence:`, sequenceWithLabels.map(s => s.label).join(', '));

  // Transform function (matches the HTML setTransform)
  const setTransform = () => {
    if (recordRef.current) {
      recordRef.current.setAttribute('transform', 
        `translate(${offsetX} ${offsetY}) translate(200 200) scale(${scale}) rotate(${rotation}) translate(-200 -200)`
      );
    }
  };

  useEffect(() => {
    setTransform();
  }, [rotation, scale, offsetX, offsetY]);

  // Create equal slices function (matches the JavaScript createEqualSlices)
  const createEqualSlices = (): void => {
    const slices: DynamicSlice[] = [];
    sequenceWithLabels.forEach((slice, index) => {
      const angle = index * normalSliceAngle;
      slices.push({
        id: `slice-${index}`,
        angle,
        width: normalSliceAngle,
        label: slice.label,
        pair: slice.pair,
        type: slice.type
      });
    });
    setDynamicSlices(slices);
  };

  // Initialize with equal slices
  useEffect(() => {
    createEqualSlices();
  }, [numPairs, sliceSequence, pairTexts]);

  // Reset focused pair when wheel data changes (different wheel selected)
  useEffect(() => {
    setFocusedPair(null);
  }, [numPairs, sliceSequence, pairTexts]);

  // Helper functions from HTML
  const getCenter = (el: Element): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  // Create clickable slice function (matches the JavaScript createClickableSlice)
  const createClickableSlice = (
    centerAngle: number, 
    sliceWidth: number, 
    label: string, 
    pairIndex: number, 
    sliceType: 'thesis' | 'antithesis'
  ) => {
    console.log(`🔥 EXPENSIVE: createClickableSlice called for ${label} (angle: ${centerAngle}°)`);
    const cx = 200, cy = 200, radius = 150;
    const halfAngle = sliceWidth / 2;
    const startAngle = centerAngle - halfAngle;
    const endAngle = centerAngle + halfAngle;
    
    const toRadians = (deg: number): number => deg * Math.PI / 180;
    
    // Create layered rings like detailed slices
    const layerColors = ["#C6E5B3", "#FFFFFF", "#F9C6CC"]; // green, white, pink
    const layers = [];
    
    // Create three concentric ring layers
    for (let layer = 0; layer < 3; layer++) {
      const innerRadius = radius * (0.3 + 0.7 * layer / 3);
      const outerRadius = radius * (0.3 + 0.7 * (layer + 1) / 3);
      
      const startAngleRad = toRadians(startAngle);
      const endAngleRad = toRadians(endAngle);
      
      const innerX1 = cx + innerRadius * Math.cos(startAngleRad);
      const innerY1 = cy + innerRadius * Math.sin(startAngleRad);
      const innerX2 = cx + innerRadius * Math.cos(endAngleRad);
      const innerY2 = cy + innerRadius * Math.sin(endAngleRad);
      
      const outerX1 = cx + outerRadius * Math.cos(startAngleRad);
      const outerY1 = cy + outerRadius * Math.sin(startAngleRad);
      const outerX2 = cx + outerRadius * Math.cos(endAngleRad);
      const outerY2 = cy + outerRadius * Math.sin(endAngleRad);
      
      const largeArc = sliceWidth > 180 ? 1 : 0;
      
      const pathD = `M ${outerX1},${outerY1} 
                     A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${outerX2},${outerY2} 
                     L ${innerX2},${innerY2} 
                     A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${innerX1},${innerY1} Z`;
      
      layers.push({
        pathD,
        fill: layerColors[layer]
      });
    }
    
    // Calculate text position (center of the layered slice)
    const textRadius = (radius * 0.3 + radius) / 2;
    const textAngle = centerAngle * Math.PI / 180;
    const textX = cx + textRadius * Math.cos(textAngle);
    const textY = cy + textRadius * Math.sin(textAngle);
    
    // Dynamic font sizing
    const fontSize = sliceWidth >= normalSliceAngle ? Math.min(20, sliceWidth / 3) : Math.min(14, sliceWidth / 2);
    
    return {
      layers,
      textX,
      textY,
      fontSize,
      label,
      pairIndex,
      sliceType
    };
  };

  // Memoize slice data to prevent recalculation on every render
  const memoizedSliceData = useMemo(() => {
    console.log(`🚀 MEMOIZATION: Recalculating slice data for ${dynamicSlices.length} slices`);
    const sliceDataMap = new Map();
    
    dynamicSlices.forEach(slice => {
      if (!slice.detailed) {
        const key = `${slice.angle}-${slice.width}-${slice.label}-${slice.pair}-${slice.type}`;
        sliceDataMap.set(slice.id, createClickableSlice(slice.angle, slice.width, slice.label, slice.pair, slice.type));
      }
    });
    
    console.log(`✅ MEMOIZATION: Created ${sliceDataMap.size} memoized slice data entries`);
    return sliceDataMap;
  }, [dynamicSlices, normalSliceAngle]);

  // Handle slice click (matches the JavaScript click handlers)
  const handleSliceClick = (pairIndex: number): void => {
    console.log(`Clicked pair ${pairIndex}`);
    if (focusedPair === pairIndex) {
      // Unfocus: find the clicked focused slice and preserve its visual position
      const clickedFocusedSlice = dynamicSlices.find(s => s.pair === pairIndex);
      if (clickedFocusedSlice) {
        // Current visual angle where the focused slice appears
        const currentVisualAngle = (clickedFocusedSlice.angle + rotation) % 360;
        console.log(`Unfocusing slice at visual angle: ${currentVisualAngle}°`);
        
        // Reset to equal slices first
        setFocusedPair(null);
        createEqualSlices();
        
        // Calculate where this slice will be in the equal layout
        const sliceInEqualLayout = sequenceWithLabels.find(s => s.pair === pairIndex && s.type === clickedFocusedSlice.type);
        if (sliceInEqualLayout) {
          const sliceIndexInEqual = sequenceWithLabels.indexOf(sliceInEqualLayout);
          const equalLayoutAngle = sliceIndexInEqual * normalSliceAngle;
          
          // Calculate rotation to put the equal slice at the same visual angle
          // We want: equalLayoutAngle + newRotation = currentVisualAngle
          const newRotation = (currentVisualAngle - equalLayoutAngle + 360) % 360;
          console.log(`Setting rotation to ${newRotation}° to keep slice at visual angle ${currentVisualAngle}°`);
          setRotation(newRotation);
        }
      } else {
        // Fallback to simple unfocus
        setFocusedPair(null);
        createEqualSlices();
      }
    } else {
      // Find any slice from this pair to get its current visual position
      const pairSlice = dynamicSlices.find(s => s.pair === pairIndex);
      if (pairSlice) {
        // Current visual angle where the slice appears (this is what we want to preserve)
        const clickedVisualAngle = (pairSlice.angle + rotation) % 360;
        console.log(`Slice clicked at visual angle: ${clickedVisualAngle}°`);
        
        // Focus on clicked pair, positioning it at the same visual angle
        focusOnPair(pairIndex, pairSlice.type, clickedVisualAngle);
      } else {
        // Fallback to old behavior if slice not found
        focusOnPair(pairIndex);
      }
    }
  };

  // Focus on pair function (simplified version of the JavaScript focusOnPair)
  const focusOnPair = (pairIndex: number, clickedSliceType: 'thesis' | 'antithesis' | null = null, targetVisualAngle: number | null = null): void => {
    setFocusedPair(pairIndex);
    
    // Find the thesis index - needed throughout the function
    const focusedThesisIndex = sequenceWithLabels.findIndex(s => s.pair === pairIndex && s.type === 'thesis');
    
    // Calculate rotation to position the clicked slice at the same visual angle
    if (clickedSliceType && targetVisualAngle !== null) {
      // Determine where the clicked slice will be positioned in the focused layout  
      let focusedPosition;
      if (clickedSliceType === 'thesis') {
        focusedPosition = 0; // Thesis goes to 0° in focused layout
      } else {
        focusedPosition = 180; // Antithesis goes to 180° in focused layout
      }
      
      // We want: focusedPosition + newRotation = targetVisualAngle
      // Therefore: newRotation = targetVisualAngle - focusedPosition
      const newRotation = (targetVisualAngle - focusedPosition + 360) % 360;
      console.log(`Setting rotation to ${newRotation}° to keep ${clickedSliceType} at visual angle ${targetVisualAngle}°`);
      setRotation(newRotation);
    } else {
      // Fallback to old behavior
      const originalThesisAngle = focusedThesisIndex * normalSliceAngle;
      setRotation(rotation + originalThesisAngle);
    }
    
    // Calculate gap positions for unfocused slices
    const halfFocused = focusedSliceAngle / 2;
    const gap1Start = halfFocused;
    const gap1End = 180 - halfFocused;
    const gap1Size = gap1End - gap1Start;
    
    const gap2Start = 180 + halfFocused;
    const gap2End = 360 - halfFocused;
    const gap2Size = gap2End - gap2Start;
    
    const numUnfocused = 2 * numPairs - 2;
    const slicesPerGap = Math.floor(numUnfocused / 2);
    const extraSlices = numUnfocused % 2;
    
    const positions = [];
    
    // Distribute slices in gap 1
    for (let i = 0; i < slicesPerGap + extraSlices; i++) {
      const position = gap1Start + (gap1Size / (slicesPerGap + extraSlices)) * (i + 0.5);
      positions.push(position);
    }
    
    // Distribute slices in gap 2
    for (let i = 0; i < slicesPerGap; i++) {
      const position = gap2Start + (gap2Size / slicesPerGap) * (i + 0.5);
      positions.push(position);
    }
    
    // Create new slice configuration
    const newSlices: DynamicSlice[] = [];
    
    // Find the antithesis index (needed for unfocused slices logic)
    const focusedAntithesisIndex = sequenceWithLabels.findIndex(s => s.pair === pairIndex && s.type === 'antithesis');
    
    // Always generate detailed slices when focusing (using defaultPairTexts)
    const usePairTexts = pairTexts || defaultPairTexts;
    
    // Only use provided detailed slices if they exist for this specific pair
    const hasProvidedDetailedSlices = detailedSlices[pairIndex] && 
                                     detailedSlices[pairIndex].thesis && 
                                     detailedSlices[pairIndex].antithesis;
    
    if (hasProvidedDetailedSlices) {
      // Use provided detailed slices (SVG strings from prop)
      console.log('Using provided detailed slices for pair', pairIndex);
      // Add logic here if needed for provided detailed slices
    } else if (usePairTexts[pairIndex as keyof typeof usePairTexts]) {
      // Generate detailed slices using defaultPairTexts and React components
      console.log('Generating detailed slices for pair', pairIndex, 'using defaultPairTexts');
      
      // Find the original slice IDs to preserve identity
      const originalThesisSlice = sequenceWithLabels[focusedThesisIndex];
      const originalAntithesisSlice = sequenceWithLabels[focusedAntithesisIndex];
      const originalThesisSliceId = `slice-${focusedThesisIndex}`;
      const originalAntithesisSliceId = `slice-${focusedAntithesisIndex}`;
      
      // Use detailed slices at 0° and 180° to match original HTML pattern
      newSlices.push({
        id: originalThesisSliceId, // Preserve original ID
        angle: 0,
        width: focusedSliceAngle,
        label: originalThesisSlice.label,
        pair: pairIndex,
        type: 'thesis' as const,
        focused: true,
        detailed: true,
        originalIndex: focusedThesisIndex, // Track original position
        // No more svgContent - we'll use React component directly
      });
      
      newSlices.push({
        id: originalAntithesisSliceId, // Preserve original ID
        angle: 180,
        width: focusedSliceAngle,
        label: originalAntithesisSlice.label,
        pair: pairIndex,
        type: 'antithesis' as const,
        focused: true,
        detailed: true,
        originalIndex: focusedAntithesisIndex, // Track original position
        // No more svgContent - we'll use React component directly
      });
      
      console.log('Created detailed slices for pair', pairIndex, ':', newSlices.filter(s => s.detailed));
    } else {
      // Fallback to simple focused slices if no text data available
      console.log('No text data available for pair', pairIndex, ', using simple slices');
      sequenceWithLabels.forEach((slice, index) => {
      if (slice.pair === pairIndex) {
        const originalSliceId = `slice-${index}`;
        if (slice.type === 'thesis') {
          newSlices.push({
            id: originalSliceId, // Preserve original ID
            angle: 0,
            width: focusedSliceAngle,
            label: slice.label,
            pair: slice.pair,
            type: slice.type as 'thesis',
            focused: true,
            originalIndex: index
          });
        } else {
          newSlices.push({
            id: originalSliceId, // Preserve original ID
            angle: 180,
            width: focusedSliceAngle,
            label: slice.label,
            pair: slice.pair,
            type: slice.type as 'antithesis',
            focused: true,
            originalIndex: index
          });
        }
      }
    });
    }
    
    // Add unfocused slices maintaining sequence order (like HTML version)
    let currentGapIndex = 0;
    
    // Walk around the circle starting from the focused thesis
    for (let offset = 1; offset < sequenceWithLabels.length && currentGapIndex < positions.length; offset++) {
      const checkIndex = (focusedThesisIndex + offset) % sequenceWithLabels.length;
      
      // Skip the focused antithesis
      if (checkIndex === focusedAntithesisIndex) continue;
      
      // Place this unfocused slice maintaining original sequence order
      const slice = sequenceWithLabels[checkIndex];
      const position = positions[currentGapIndex];
      const originalSliceId = `slice-${checkIndex}`; // Preserve original ID
      
        newSlices.push({
        id: originalSliceId, // Use original slice ID
        angle: position,
          width: unfocusedSliceAngle,
          label: slice.label,
          pair: slice.pair,
          type: slice.type as 'thesis' | 'antithesis',
          focused: false,
          originalIndex: checkIndex // Track original position
      });
      
      currentGapIndex++;
    }
    
    console.log('Final dynamic slices:', newSlices);
    setDynamicSlices(newSlices);
  };

  // Mouse event handlers (from HTML)
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>): void => {
    if ((e.target as SVGElement).classList.contains('clickable-slice')) return;
    
    isDraggingRef.current = true;
    const center = getCenter(svgRef.current!);
    startAngleRef.current = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    startRotationRef.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>): void => {
    if (!isDraggingRef.current) return;
    const center = getCenter(svgRef.current!);
    const currentAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    let angleDiff = currentAngle - startAngleRef.current;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    setRotation(startRotationRef.current + (angleDiff * (180 / Math.PI)));
  };

  const handleMouseUp = (): void => {
    isDraggingRef.current = false;
  };

  // Touch event handlers for mobile support
  const isPinchingRef = useRef<boolean>(false);
  const pinchStartDistRef = useRef<number>(0);
  const startScaleRef = useRef<number>(1);
  const startOffsetXRef = useRef<number>(0);
  const startOffsetYRef = useRef<number>(0);
  const pinchMidStartRef = useRef<{ x: number; y: number }>({ x: 200, y: 200 });

  const clientToSvg = (svg: SVGSVGElement, clientX: number, clientY: number): SVGPoint => {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>): void => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Two finger pinch
      isPinchingRef.current = true;
      isDraggingRef.current = false;
      pinchStartDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startScaleRef.current = scale;
      const svg = svgRef.current!;
      const midClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midClientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      pinchMidStartRef.current = clientToSvg(svg, midClientX, midClientY);
      startOffsetXRef.current = offsetX;
      startOffsetYRef.current = offsetY;
    } else if (e.touches.length === 1) {
      // Single finger rotation
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains('clickable-slice')) return;
      
      isDraggingRef.current = true;
      isPinchingRef.current = false;
      const center = getCenter(svgRef.current!);
      startAngleRef.current = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
      startRotationRef.current = rotation;
    }
    document.body.style.userSelect = 'none';
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>): void => {
    e.preventDefault();
    if (isPinchingRef.current && e.touches.length === 2) {
      // Handle pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      let newScale = startScaleRef.current * (dist / pinchStartDistRef.current);
      newScale = Math.max(1, Math.min(newScale, 3));
      const center = { x: 200, y: 200 };
      const newOffsetX = startOffsetXRef.current + (pinchMidStartRef.current.x - center.x) * (1 - newScale / startScaleRef.current);
      const newOffsetY = startOffsetYRef.current + (pinchMidStartRef.current.y - center.y) * (1 - newScale / startScaleRef.current);
      
      if (newScale === 1) {
        setOffsetX(0);
        setOffsetY(0);
      } else {
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      }
      setScale(newScale);
    } else if (isDraggingRef.current && e.touches.length === 1) {
      // Handle rotation
      const touch = e.touches[0];
      const center = getCenter(svgRef.current!);
      const currentAngle = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
      let angleDiff = currentAngle - startAngleRef.current;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      setRotation(startRotationRef.current + (angleDiff * (180 / Math.PI)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>): void => {
    if (e.touches.length === 0) {
      isDraggingRef.current = false;
      isPinchingRef.current = false;
      document.body.style.userSelect = '';
    }
  };

  // Touch handlers for slice clicks
  const handleSliceTouchStart = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    e.stopPropagation();
    const touch = e.touches[0];
    const touchStartTime = Date.now();
    const touchStartPos = { x: touch.clientX, y: touch.clientY };
    
    // Store touch data on the target element for tracking
    (e.target as any)._touchData = { startTime: touchStartTime, startPos: touchStartPos, pairIndex };
  };

  const handleSliceTouchEnd = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!(e.target as any)._touchData) return;
    
    const touchDuration = Date.now() - (e.target as any)._touchData.startTime;
    const touch = e.changedTouches[0];
    const touchEndPos = { x: touch.clientX, y: touch.clientY };
    
    const distance = Math.sqrt(
      Math.pow(touchEndPos.x - (e.target as any)._touchData.startPos.x, 2) + 
      Math.pow(touchEndPos.y - (e.target as any)._touchData.startPos.y, 2)
    );

    // If it's a quick tap with minimal movement, treat as click
    if (touchDuration < 300 && distance < 20) {
      console.log(`Touch clicked ${(e.target as any)._touchData.pairIndex}`);
      handleSliceClick((e.target as any)._touchData.pairIndex);
    }
    
    delete (e.target as any)._touchData;
  };

  // Helper functions for layer node management and arrow connections
  const getAllLayerNodes = () => {
    return document.querySelectorAll('.layer-node');
  };

  const getLayerNodeById = (nodeId: string): Element | null => {
    return document.querySelector(`[data-node-id="${nodeId}"]`);
  };

  const getLayerNodesForPair = (pairIndex: number): NodeListOf<Element> => {
    return document.querySelectorAll(`[data-pair-index="${pairIndex}"].layer-node`);
  };

  const getLayerNodesByType = (layerType: string): NodeListOf<Element> => {
    return document.querySelectorAll(`[data-layer-type="${layerType}"].layer-node`);
  };

  const getLayerNodeInfo = (nodeElement: HTMLElement | null) => {
    if (!nodeElement || !nodeElement.dataset) return null;
    
    return {
      nodeId: nodeElement.dataset.nodeId!,
      sliceId: nodeElement.dataset.sliceId!,
      pairIndex: parseInt(nodeElement.dataset.pairIndex!),
      sliceType: nodeElement.dataset.sliceType!, // thesis or antithesis
      layerIndex: parseInt(nodeElement.dataset.layerIndex!),
      layerType: nodeElement.dataset.layerType! // green, white, or pink
    };
  };

  const getNodeCenter = (nodeElement: HTMLElement | null) => {
    if (!nodeElement) return null;
    
    // Get the node's data attributes to calculate position geometrically
    const nodeId = nodeElement.dataset.nodeId;
    const sliceId = nodeElement.dataset.sliceId;
    const layerIndex = parseInt(nodeElement.dataset.layerIndex);
    
    // Validate required data attributes
    if (!nodeId || !sliceId || isNaN(layerIndex)) {
      console.warn('Missing or invalid data attributes on node:', nodeElement);
      return null;
    }
    
    // Find the corresponding slice to get its angle
    const slice = dynamicSlices.find(s => s.id === sliceId);
    if (!slice) {
      console.warn('Could not find slice for node:', nodeId);
      return null;
    }
    
    // Validate layer index
    if (isNaN(layerIndex) || layerIndex < 0 || layerIndex > 2) {
      console.warn('Invalid layer index:', layerIndex);
      return null;
    }
    
    // Calculate the center based on the slice geometry
    const cx = 200, cy = 200, radius = 150;
    const layerRadii = [
      radius * (0.3 + 0.7 * 0.5 / 3), // Green layer center
      radius * (0.3 + 0.7 * 1.5 / 3), // White layer center  
      radius * (0.3 + 0.7 * 2.5 / 3)  // Pink layer center
    ];
    
    const layerRadius = layerRadii[layerIndex];
    const angleRad = slice.angle * Math.PI / 180;
    
    return {
      x: cx + layerRadius * Math.cos(angleRad),
      y: cy + layerRadius * Math.sin(angleRad)
    };
  };

  // Example function to demonstrate connecting two nodes
  const connectNodes = (fromId: string, toId: string, color = '#0074d9', strokeWidth = 2) => {
    const fromNode = getLayerNodeById(fromId) as HTMLElement | null;
    const toNode = getLayerNodeById(toId) as HTMLElement | null;
    
    if (!fromNode || !toNode) {
      console.warn(`Cannot connect nodes: ${fromId} or ${toId} not found`);
      return null;
    }
    
    const fromCenter = getNodeCenter(fromNode);
    const toCenter = getNodeCenter(toNode);
    
    // Check if centers were calculated successfully
    if (!fromCenter || !toCenter) {
      console.warn(`Cannot calculate centers for nodes: ${fromId} -> ${toId}`);
      return null;
    }
    
    // Calculate control point for a curved arrow
    const midX = (fromCenter.x + toCenter.x) / 2;
    const midY = (fromCenter.y + toCenter.y) / 2;
    
    // Calculate the center of the wheel and distance from it
    const wheelCenterX = 200;
    const wheelCenterY = 200;
    const distanceFromCenter = Math.sqrt(
      Math.pow(midX - wheelCenterX, 2) + Math.pow(midY - wheelCenterY, 2)
    );
    
    // Create control point that curves away from the center
    const curveFactor = 0.3; // Adjust this to control curve intensity
    const curveDirection = distanceFromCenter < 100 ? 1 : -1; // Curve outward if close to center, inward if far
    
    // Calculate perpendicular vector for the curve
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return null; // Same point
    
    // Perpendicular vector (rotated 90 degrees)
    const perpX = -dy / length;
    const perpY = dx / length;
    
    // Control point offset from midpoint
    const curveOffset = length * curveFactor * curveDirection;
    const controlX = midX + perpX * curveOffset;
    const controlY = midY + perpY * curveOffset;
    
    // Create curved arrow path using quadratic Bezier curve
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathD = `M ${fromCenter.x},${fromCenter.y} Q ${controlX},${controlY} ${toCenter.x},${toCenter.y}`;
    
    arrow.setAttribute('d', pathD);
    arrow.setAttribute('stroke', color);
    arrow.setAttribute('stroke-width', strokeWidth);
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke-dasharray', '4 3'); // Dotted line pattern
    arrow.setAttribute('stroke-linecap', 'round'); // Rounded line caps for better dotted appearance
    
    // Select appropriate arrow marker based on color
    let markerUrl = 'url(#arrowhead)'; // default blue
    if (color === '#FF6B35') markerUrl = 'url(#arrowhead-orange)';
    else if (color === '#2196F3') markerUrl = 'url(#arrowhead-blue)';
    else if (color === '#9C27B0') markerUrl = 'url(#arrowhead-purple)';
    else if (color === '#4CAF50') markerUrl = 'url(#arrowhead-green)';
    
    arrow.setAttribute('marker-end', markerUrl);
    arrow.classList.add('node-connection');
    
    // Add to SVG
    recordRef.current?.appendChild(arrow);
    
    return arrow;
  };

  // Expose helper functions for external use (if needed)
  // You can access these through a ref or by making the component a forwardRef
  const nodeAPI = {
    getAllLayerNodes,
    getLayerNodeById,
    getLayerNodesForPair,
    getLayerNodesByType,
    getLayerNodeInfo,
    getNodeCenter,
    connectNodes
  };

  // Log the API for debugging (can be removed in production)
  console.log('Layer Node API:', nodeAPI);

  // Store demo connections to recreate them when slices move
  interface DemoConnection {
    fromId: string;
    toId: string;
    color: string;
    strokeWidth: number;
    label: string;
  }
  const [demoConnections, setDemoConnections] = useState<DemoConnection[]>([]);
  const [isZoomedToQ2, setIsZoomedToQ2] = useState(false);
  
    // Function to toggle zoom on top half of wheel
  const toggleTopHalfZoom = () => {
    if (isZoomedToQ2) {
      // Zoom out to full view
      const targetScale = 1;
      const targetOffsetX = 0;
      const targetOffsetY = 0;
      
      animateToTransform(targetScale, targetOffsetX, targetOffsetY);
      setIsZoomedToQ2(false);
    } else {
      // Zoom into top half of wheel
      const targetScale = 1.6; // Reduced zoom to show entire top semicircle
      const topCenterAngle = 270; // 270° is straight up (top center)
      const topRadius = 90; // Distance from center to focus point (closer since we want the whole top half)
      
      // Calculate the center point of the top half (FIXED position, not following rotation)
      const angleRad = topCenterAngle * Math.PI / 180; // Use absolute angle, not relative to rotation
      const cx = 200, cy = 200; // Wheel center
      const focusX = cx + topRadius * Math.cos(angleRad);
      const focusY = cy + topRadius * Math.sin(angleRad);
      
      // Calculate offset to center this point in the view
      const viewCenterX = 200, viewCenterY = 200;
      const targetOffsetX = (viewCenterX - focusX) * targetScale;
      const targetOffsetY = (viewCenterY - focusY) * targetScale;
      
      animateToTransform(targetScale, targetOffsetX, targetOffsetY);
      setIsZoomedToQ2(true);
    }
  };
  
  // Helper function for smooth animation
  const animateToTransform = (targetScale: number, targetOffsetX: number, targetOffsetY: number) => {
    const startTime = Date.now();
    const startScale = scale;
    const startOffsetX = offsetX;
    const startOffsetY = offsetY;
    const duration = 400;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setScale(startScale + (targetScale - startScale) * eased);
      setOffsetX(startOffsetX + (targetOffsetX - startOffsetX) * eased);
      setOffsetY(startOffsetY + (targetOffsetY - startOffsetY) * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Function to toggle arrow visibility
  const toggleArrows = () => {
    setShowArrows(!showArrows);
    
    // If hiding arrows, remove all existing connections immediately
    if (showArrows) {
      const existingConnections = document.querySelectorAll('.demo-connection, .node-connection');
      existingConnections.forEach(conn => conn.remove());
    }
  };
  
  // Demo function to create sample arrow connections
  const createDemoConnections = () => {
    // Give the DOM a moment to render the nodes
    setTimeout(() => {
      if (!title.includes("Node System Demo")) return; // Only for demo wheel
      
      // Clear any existing demo connections
      const existingConnections = document.querySelectorAll('.demo-connection');
      existingConnections.forEach(conn => conn.remove());
      
      // Don't create arrows if they should be hidden
      if (!showArrows) return;
      
      console.log('Creating demo arrow connections...');
      console.log('Current dynamicSlices:', dynamicSlices);
      
      // Get all available nodes first
      const allNodes = getAllLayerNodes();
      console.log('Available nodes:', Array.from(allNodes).map(n => ({
        id: n.dataset.nodeId,
        sliceId: n.dataset.sliceId,
        layerType: n.dataset.layerType,
        layerIndex: n.dataset.layerIndex
      })));
      
      if (allNodes.length === 0) {
        console.warn('No layer nodes found for demo connections');
        return;
      }
      
      // If we have stored demo connections, recreate them
      if (demoConnections.length > 0) {
        console.log('Recreating stored demo connections:', demoConnections);
        demoConnections.forEach(conn => {
          const arrow = connectNodes(conn.fromId, conn.toId, conn.color, conn.strokeWidth);
          if (arrow) {
            arrow.classList.add('demo-connection');
            arrow.setAttribute('data-demo-label', conn.label);
            console.log(`Recreated connection: ${conn.label}`);
          } else {
            console.warn(`Failed to recreate connection: ${conn.label}`);
          }
        });
        return;
      }
      
      // Create initial demo connections and store them
      const newDemoConnections = [];
      const nodeArray = Array.from(allNodes);
      
      // Example 1: Connect first green layer to first pink layer if they exist
      const greenNodes = nodeArray.filter(n => n.dataset.layerType === 'green');
      const pinkNodes = nodeArray.filter(n => n.dataset.layerType === 'pink');
      
      console.log('Green nodes found:', greenNodes.length);
      console.log('Pink nodes found:', pinkNodes.length);
      
      if (greenNodes.length > 0 && pinkNodes.length > 0) {
        const fromId = greenNodes[0].dataset.nodeId;
        const toId = pinkNodes[0].dataset.nodeId;
        console.log('Attempting to connect:', fromId, 'to', toId);
        const connection1 = connectNodes(fromId, toId, '#FF6B35', 3);
        if (connection1) {
          connection1.classList.add('demo-connection');
          connection1.setAttribute('data-demo-label', 'Green → Pink Layer');
          newDemoConnections.push({ fromId, toId, color: '#FF6B35', strokeWidth: 3, label: 'Green → Pink Layer' });
          console.log('Successfully created connection 1');
        } else {
          console.warn('Failed to create connection 1');
        }
      }
      
      // Example 2: Connect white layers if multiple exist
      const whiteNodes = nodeArray.filter(n => n.dataset.layerType === 'white');
      console.log('White nodes found:', whiteNodes.length);
      
      if (whiteNodes.length >= 2) {
        const fromId = whiteNodes[0].dataset.nodeId;
        const toId = whiteNodes[1].dataset.nodeId;
        console.log('Attempting to connect white nodes:', fromId, 'to', toId);
        const connection2 = connectNodes(fromId, toId, '#2196F3', 2);
        if (connection2) {
          connection2.classList.add('demo-connection');
          connection2.setAttribute('data-demo-label', 'White → White Cross-Connection');
          newDemoConnections.push({ fromId, toId, color: '#2196F3', strokeWidth: 2, label: 'White → White Cross-Connection' });
          console.log('Successfully created connection 2');
        } else {
          console.warn('Failed to create connection 2');
        }
      }
      
      // Example 3: Connect thesis to antithesis if both exist
      const thesisNodes = nodeArray.filter(n => n.dataset.sliceType === 'thesis');
      const antithesisNodes = nodeArray.filter(n => n.dataset.sliceType === 'antithesis');
      
      console.log('Thesis nodes found:', thesisNodes.length);
      console.log('Antithesis nodes found:', antithesisNodes.length);
      
      if (thesisNodes.length > 0 && antithesisNodes.length > 0) {
        // Connect pink layer of thesis to green layer of antithesis
        const thesisPink = thesisNodes.find(n => n.dataset.layerType === 'pink');
        const antithesisGreen = antithesisNodes.find(n => n.dataset.layerType === 'green');
        
        if (thesisPink && antithesisGreen) {
          const fromId = thesisPink.dataset.nodeId;
          const toId = antithesisGreen.dataset.nodeId;
          console.log('Attempting to connect thesis pink to antithesis green:', fromId, 'to', toId);
          const connection3 = connectNodes(fromId, toId, '#9C27B0', 2);
          if (connection3) {
            connection3.classList.add('demo-connection');
            connection3.setAttribute('data-demo-label', 'Thesis Pink → Antithesis Green');
            newDemoConnections.push({ fromId, toId, color: '#9C27B0', strokeWidth: 2, label: 'Thesis Pink → Antithesis Green' });
            console.log('Successfully created connection 3');
          } else {
            console.warn('Failed to create connection 3');
          }
        }
      }
      
      // Store the demo connections for recreation later
      setDemoConnections(newDemoConnections);
      
      console.log('Demo connections creation completed');
      
      // Log some example node information
      if (nodeArray.length > 0) {
        const sampleNode = nodeArray[0];
        console.log('Sample node info:', getLayerNodeInfo(sampleNode));
        console.log('Sample node center:', getNodeCenter(sampleNode));
      }
      
    }, 2000); // Wait even longer for rendering
  };

  // Create demo connections when component mounts or when slices change
  useEffect(() => {
    createDemoConnections();
  }, [dynamicSlices, title, showArrows]);

  return (
    <div className="dialectical-wheel-container">
      {/* Header with buttons - HIDDEN
      <div className="header">
        <button className="icon" aria-label="Menu">&#9776;</button>
        <span className="header-title">{title}</span>
        <div>
          <button className="icon" aria-label="Help">&#x2753;</button>
          <button className="icon" aria-label="Zoom">&#128269;</button>
          <button className="icon" aria-label="Close">&#10006;</button>
        </div>
      </div>
      */}
      
      <div className="main-content" style={{ paddingTop: '0' }}>
        <div className="controls-overlay">
          Drag to rotate • Pinch to zoom • Tap thesis/antithesis pairs to see opposition clearly
        </div>
        
        {/* Floating top half zoom toggle button */}
        <button className={`floating-q2-btn ${isZoomedToQ2 ? 'zoomed' : ''}`} onClick={toggleTopHalfZoom}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            {isZoomedToQ2 ? (
              <path d="M8 13l2-2-2-2"/>
            ) : (
              <path d="M8 9l-2 2 2 2"/>
            )}
          </svg>
          {isZoomedToQ2 ? 'Out' : 'Top'}
        </button>
        
        <div className="wheel-container">
          <svg 
            ref={svgRef}
            className="wheel-svg" 
            viewBox="0 0 400 400"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
          >
            <g ref={recordRef} className="record">
              <defs>
                {/* Rotation hint arrowheads */}
                <marker
                  id="rotation-arrow"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 8 3, 0 6"
                    fill="#007AFF"
                    fillOpacity="0.6"
                  />
                </marker>
                
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="4"
                  refX="6"
                  refY="2"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2, 0 4"
                    fill="#0074d9"
                  />
                </marker>
                <marker
                  id="arrowhead-orange"
                  markerWidth="6"
                  markerHeight="4"
                  refX="6"
                  refY="2"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2, 0 4"
                    fill="#FF6B35"
                  />
                </marker>
                <marker
                  id="arrowhead-blue"
                  markerWidth="6"
                  markerHeight="4"
                  refX="6"
                  refY="2"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2, 0 4"
                    fill="#2196F3"
                  />
                </marker>
                <marker
                  id="arrowhead-purple"
                  markerWidth="6"
                  markerHeight="4"
                  refX="6"
                  refY="2"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2, 0 4"
                    fill="#9C27B0"
                  />
                </marker>
                <marker
                  id="arrowhead-green"
                  markerWidth="6"
                  markerHeight="4"
                  refX="6"
                  refY="2"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2, 0 4"
                    fill="#4CAF50"
                  />
                </marker>
              </defs>
              
              {/* Static slice components from Python-generated SVG (hidden when dynamic slices active) */}
              <g id="slice-container" style={{ display: 'none' }}>
                {/* These would be the detailed slices from the Python SVG output */}
              </g>
              
              {/* Dynamic slices (like the JavaScript createClickableSlice output) */}
              <g id="dynamic-slice-container">
                {dynamicSlices.map((slice) => {
                  console.log('Rendering slice:', slice.id, 'type:', slice.type, 'detailed:', slice.detailed, 'angle:', slice.angle);
                  
                  // Handle detailed slices differently - use React component directly
                  if (slice.detailed) {
                    console.log('Detailed slice transform:', `rotate(${slice.angle} 200 200)`);
                    console.log('Detailed slice pair:', slice.pair, 'type:', slice.type);
                    
                    // Extract text data from defaultPairTexts for this slice
                    const usePairTexts = pairTexts || defaultPairTexts;
                    const sliceTexts = usePairTexts[slice.pair as keyof typeof usePairTexts];
                    
                    if (sliceTexts) {
                      const labels = slice.type === 'thesis' ? sliceTexts.thesis : sliceTexts.antithesis;
                      
                      return (
                        <g 
                          key={slice.id} 
                          className={`slice-component ${slice.type}-slice focused-pair`}
                          onClick={() => handleSliceClick(slice.pair)}
                          onTouchStart={(e) => handleSliceTouchStart(e, slice.pair)}
                          onTouchEnd={(e) => handleSliceTouchEnd(e, slice.pair)}
                          style={{ cursor: 'pointer' }}
                        >
                          <SliceAtAngle
                            sliceData={{ labels: labels as [string, string][] }}
                            sliceId={slice.id}
                            angle={slice.angle}
                            sliceAngle={slice.width}
                            pairIndex={slice.pair}
                            sliceType={slice.type}
                            originalSliceIndex={slice.originalIndex}
                          />
                        </g>
                      );
                    }
                  }
                  
                  // Handle simple slices (now with layered rings) - use memoized data
                  console.log(`📋 RENDER: Using memoized data for slice ${slice.id} (${slice.label})`);
                  const sliceData = memoizedSliceData.get(slice.id);
                  
                  if (!sliceData) {
                    console.warn('No memoized slice data found for slice:', slice.id);
                    return null;
                  }
                  
                  // Text color based on slice type (thesis = green, antithesis = red)
                  const textColor = slice.type === 'thesis' ? '#4CAF50' : '#F44336';
                  
                  return (
                    <g key={slice.id} className={`equal-slice ${slice.type}-slice`}>
                      {/* Render layered rings */}
                      {sliceData.layers.map((layer, layerIndex) => {
                        // Use original index for node IDs if available, otherwise use current slice ID
                        const nodeIdBase = slice.originalIndex !== undefined ? `slice-${slice.originalIndex}` : slice.id;
                        const nodeId = `${nodeIdBase}-layer-${layerIndex}`;
                        
                        return (
                          <path
                            key={`${slice.id}-layer-${layerIndex}`}
                            d={layer.pathD}
                            fill={layer.fill}
                            className="clickable-slice layer-node"
                            data-node-id={nodeId}
                            data-slice-id={nodeIdBase}
                            data-pair-index={slice.pair}
                            data-slice-type={slice.type}
                            data-layer-index={layerIndex}
                            data-layer-type={layerIndex === 0 ? 'green' : layerIndex === 1 ? 'white' : 'pink'}
                            onClick={() => handleSliceClick(slice.pair)}
                            onTouchStart={(e) => handleSliceTouchStart(e, slice.pair)}
                            onTouchEnd={(e) => handleSliceTouchEnd(e, slice.pair)}
                            style={{ cursor: 'pointer' }}
                          />
                        );
                      })}
                      {/* Slice boundary lines */}
                      <line 
                        x1="200" 
                        y1="200" 
                        x2={200 + 150 * Math.cos((slice.angle - slice.width/2) * Math.PI / 180)} 
                        y2={200 + 150 * Math.sin((slice.angle - slice.width/2) * Math.PI / 180)} 
                        stroke="#888" 
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                      <line 
                        x1="200" 
                        y1="200" 
                        x2={200 + 150 * Math.cos((slice.angle + slice.width/2) * Math.PI / 180)} 
                        y2={200 + 150 * Math.sin((slice.angle + slice.width/2) * Math.PI / 180)} 
                        stroke="#888" 
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                      {/* Text label with thesis/antithesis color */}
                      <text
                        x={sliceData.textX}
                        y={sliceData.textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={sliceData.fontSize}
                        fontWeight="bold"
                        fill={textColor}
                        pointerEvents="none"
                        transform={`rotate(${-rotation} ${sliceData.textX} ${sliceData.textY})`}
                      >
                        {sliceData.label}
                      </text>
                    </g>
                  );
                })}
              </g>
              
              {/* Rotation hint ripples */}
              <g className="rotation-hints" opacity="0.8">
                {/* Multiple concentric ripples with different speeds and patterns */}
                {[
                  { radius: 160, opacity: 0.7, strokeWidth: 2, dashArray: "8 4", duration: "6s", direction: 1 },
                  { radius: 170, opacity: 0.6, strokeWidth: 1.5, dashArray: "4 8", duration: "8s", direction: 1 },
                  { radius: 180, opacity: 0.5, strokeWidth: 2, dashArray: "2 4", duration: "12s", direction: -1 },
                  { radius: 190, opacity: 0.4, strokeWidth: 1, dashArray: "6 3", duration: "10s", direction: 1 },
                  { radius: 200, opacity: 0.3, strokeWidth: 1.5, dashArray: "3 6", duration: "15s", direction: -1 },
                  { radius: 210, opacity: 0.2, strokeWidth: 1, dashArray: "5 2", duration: "18s", direction: 1 }
                ].map((ripple, index) => (
                  <circle 
                    key={index}
                    cx="200" 
                    cy="200" 
                    r={ripple.radius} 
                    fill="none" 
                    stroke="#007AFF" 
                    strokeWidth={ripple.strokeWidth} 
                    strokeDasharray={ripple.dashArray}
                    opacity={ripple.opacity}
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0 200 200"
                      to={`${ripple.direction * 360} 200 200`}
                      dur={ripple.duration}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>

              {/* Center circle */}
              <circle cx="200" cy="200" r="30" fill="#FFC107"/>
              <text 
                x="200" 
                y="200" 
                fontSize="16" 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                {centerLabel}
              </text>
            </g>
          </svg>
        </div>
      </div>
      
      <div className="bottom-bar">
        <button className="bottom-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Enrich
        </button>

        <button className="bottom-btn" onClick={toggleArrows}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={showArrows ? "#0074d9" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="7" x2="17" y2="17"/>
            <polyline points="17,7 17,17 7,17"/>
          </svg>
          {showArrows ? 'Hide' : 'Show'} Arrows
        </button>
        <button className="bottom-btn" onClick={() => {
          setFocusedPair(null);
          createEqualSlices();
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
};

export default DialecticalWheel; 