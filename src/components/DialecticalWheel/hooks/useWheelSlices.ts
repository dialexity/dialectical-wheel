import { useState, useEffect, useMemo, useCallback } from 'react';
import { defaultPairTexts } from '../../../utils/SliceGenerator';
import { SequenceWithLabels } from './useWheelSequence';

// Type definitions
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

interface SliceClickData {
  textX: number;
  textY: number;
  fontSize: number;
  label: string;
  pairIndex: number;
  sliceType: 'thesis' | 'antithesis';
  layers: Array<{
    pathD: string;
    fill: string;
  }>;
}

export const useWheelSlices = (
  sequenceWithLabels: SequenceWithLabels[],
  normalSliceAngle: number,
  focusedSliceAngle: number,
  unfocusedSliceAngle: number,
  rotation: number,
  setRotation: (rotation: number) => void,
  pairTexts: PairTexts | null = null,
  detailedSlices: DetailedSlices = {}
) => {
  const [focusedPair, setFocusedPair] = useState<number | null>(null);
  const [dynamicSlices, setDynamicSlices] = useState<DynamicSlice[]>([]);

  // Create clickable slice function (matches the JavaScript createClickableSlice)
  const createClickableSlice = useCallback((
    centerAngle: number, 
    sliceWidth: number, 
    label: string, 
    pairIndex: number, 
    sliceType: 'thesis' | 'antithesis'
  ): SliceClickData => {
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
  }, [normalSliceAngle]);

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
  }, [dynamicSlices, createClickableSlice]);

  // Create equal slices function (matches the JavaScript createEqualSlices)
  const createEqualSlices = useCallback((): void => {
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
  }, [sequenceWithLabels, normalSliceAngle]);

  // Focus on pair function (simplified version of the JavaScript focusOnPair)
  const focusOnPair = useCallback((
    pairIndex: number, 
    clickedSliceType: 'thesis' | 'antithesis' | null = null, 
    targetVisualAngle: number | null = null
  ): void => {
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
    
    const numUnfocused = 2 * sequenceWithLabels.length / 2 - 2;
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
  }, [
    sequenceWithLabels, 
    focusedSliceAngle, 
    unfocusedSliceAngle, 
    normalSliceAngle, 
    rotation, 
    setRotation, 
    pairTexts, 
    detailedSlices
  ]);

  // Handle slice click (matches the JavaScript click handlers)
  const handleSliceClick = useCallback((pairIndex: number): void => {
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
  }, [focusedPair, dynamicSlices, rotation, createEqualSlices, sequenceWithLabels, normalSliceAngle, setRotation, focusOnPair]);

  // Touch handlers for slice clicks
  const handleSliceTouchStart = useCallback((e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    e.stopPropagation();
    const touch = e.touches[0];
    const touchStartTime = Date.now();
    const touchStartPos = { x: touch.clientX, y: touch.clientY };
    
    // Store touch data on the target element for tracking
    (e.target as any)._touchData = { startTime: touchStartTime, startPos: touchStartPos, pairIndex };
  }, []);

  const handleSliceTouchEnd = useCallback((e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
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
  }, [handleSliceClick]);

  // Initialize with equal slices
  useEffect(() => {
    createEqualSlices();
  }, [createEqualSlices]);

  // Reset focused pair when wheel data changes (different wheel selected)
  useEffect(() => {
    setFocusedPair(null);
  }, [sequenceWithLabels, pairTexts]);

  const reset = useCallback(() => {
    setFocusedPair(null);
    createEqualSlices();
  }, [createEqualSlices]);

  return {
    // State
    focusedPair,
    dynamicSlices,
    memoizedSliceData,
    
    // Functions
    handleSliceClick,
    handleSliceTouchStart,
    handleSliceTouchEnd,
    createEqualSlices,
    focusOnPair,
    reset
  };
};

export type { DynamicSlice, DetailedSlices, PairTexts, SliceClickData }; 