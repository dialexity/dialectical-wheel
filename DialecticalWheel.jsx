import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DialecticalWheel.css';

const DialecticalWheel = ({ 
  numPairs = 4, 
  sliceSequence = null,
  title = "Win-Win",
  centerLabel = "Core" 
}) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [focusedPair, setFocusedPair] = useState(null);
  const [equalSlices, setEqualSlices] = useState([]);
  
  const recordRef = useRef(null);
  const svgRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isPinchingRef = useRef(false);
  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);
  const startScaleRef = useRef(1);
  const pinchStartDistRef = useRef(0);
  const startOffsetXRef = useRef(0);
  const startOffsetYRef = useRef(0);
  const pinchMidStartRef = useRef({ x: 200, y: 200 });

  // Initialize slice sequence
  const initializeSliceSequence = useCallback(() => {
    let fullSequence;
    
    if (sliceSequence === null) {
      fullSequence = [];
      // First N slices: all thesis
      for (let i = 0; i < numPairs; i++) {
        fullSequence.push({ pair: i, type: 'thesis' });
      }
      // Next N slices: all antithesis (opposites)
      for (let i = 0; i < numPairs; i++) {
        fullSequence.push({ pair: i, type: 'antithesis' });
      }
    } else {
      // Validate and complete the sequence
      if (sliceSequence.length !== numPairs) {
        throw new Error(`sliceSequence must contain exactly ${numPairs} elements for the first half`);
      }
      
      // Create full sequence: first N as specified, next N as opposites
      const firstHalf = [...sliceSequence];
      const secondHalf = firstHalf.map(slice => ({
        pair: slice.pair,
        type: slice.type === 'thesis' ? 'antithesis' : 'thesis'
      }));
      fullSequence = [...firstHalf, ...secondHalf];
    }
    
    return fullSequence.map((slice, index) => ({
      label: `${slice.type === 'thesis' ? 'T' : 'A'}${slice.pair + 1}`,
      pair: slice.pair,
      type: slice.type
    }));
  }, [numPairs, sliceSequence]);

  const wheelSequence = initializeSliceSequence();

  // Calculate angles
  const normalSliceAngle = 360 / (2 * numPairs);
  const focusedSliceAngle = 120;
  const unfocusedSliceAngle = (360 - 2 * focusedSliceAngle) / (2 * numPairs - 2);

  // Helper functions
  const radians = (degrees) => degrees * Math.PI / 180;

  const getCenter = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const clientToSvg = (svg, clientX, clientY) => {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const setTransform = useCallback(() => {
    if (recordRef.current) {
      recordRef.current.setAttribute('transform', 
        `translate(${offsetX} ${offsetY}) translate(200 200) scale(${scale}) rotate(${rotation}) translate(-200 -200)`
      );
    }
  }, [rotation, scale, offsetX, offsetY]);

  useEffect(() => {
    setTransform();
  }, [setTransform]);

  // Create equal slices
  const createEqualSlices = useCallback(() => {
    const slices = [];
    
    wheelSequence.forEach((slice, index) => {
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
    
    setEqualSlices(slices);
  }, [wheelSequence, normalSliceAngle]);

  // Focus on pair
  const focusOnPair = useCallback((pairIndex) => {
    setFocusedPair(pairIndex);
    
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
    const newSlices = [];
    
    // Add focused slices at 0° and 180°
    wheelSequence.forEach((slice, index) => {
      if (slice.pair === pairIndex) {
        if (slice.type === 'thesis') {
          newSlices.push({
            id: `focused-thesis-${slice.pair}`,
            angle: 0,
            width: focusedSliceAngle,
            label: slice.label,
            pair: slice.pair,
            type: slice.type,
            focused: true
          });
        } else {
          newSlices.push({
            id: `focused-antithesis-${slice.pair}`,
            angle: 180,
            width: focusedSliceAngle,
            label: slice.label,
            pair: slice.pair,
            type: slice.type,
            focused: true
          });
        }
      }
    });
    
    // Add unfocused slices
    let positionIndex = 0;
    wheelSequence.forEach((slice, index) => {
      if (slice.pair !== pairIndex && positionIndex < positions.length) {
        newSlices.push({
          id: `unfocused-${index}`,
          angle: positions[positionIndex],
          width: unfocusedSliceAngle,
          label: slice.label,
          pair: slice.pair,
          type: slice.type,
          focused: false
        });
        positionIndex++;
      }
    });
    
    setEqualSlices(newSlices);
  }, [wheelSequence, focusedSliceAngle, unfocusedSliceAngle, numPairs]);

  // Reset slices
  const resetSlices = useCallback(() => {
    setFocusedPair(null);
    createEqualSlices();
  }, [createEqualSlices]);

  // Initialize equal slices on mount
  useEffect(() => {
    createEqualSlices();
  }, [createEqualSlices]);

  // Handle slice click
  const handleSliceClick = useCallback((pairIndex) => {
    if (focusedPair === pairIndex) {
      resetSlices();
    } else {
      focusOnPair(pairIndex);
    }
  }, [focusedPair, resetSlices, focusOnPair]);

  // Mouse/touch event handlers
  const handleMouseDown = useCallback((e) => {
    if (e.touches && e.touches.length > 1) return;
    if (e.target.classList.contains('clickable-slice')) return;
    
    isDraggingRef.current = true;
    const center = getCenter(svgRef.current);
    startAngleRef.current = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    startRotationRef.current = rotation;
  }, [rotation]);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || isPinchingRef.current) return;
    const center = getCenter(svgRef.current);
    const currentAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
    let angleDiff = currentAngle - startAngleRef.current;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    setRotation(startRotationRef.current + (angleDiff * (180 / Math.PI)));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      isPinchingRef.current = true;
      isDraggingRef.current = false;
      pinchStartDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startScaleRef.current = scale;
      const midClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midClientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      pinchMidStartRef.current = clientToSvg(svgRef.current, midClientX, midClientY);
      startOffsetXRef.current = offsetX;
      startOffsetYRef.current = offsetY;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains('clickable-slice')) return;
      
      isDraggingRef.current = true;
      isPinchingRef.current = false;
      const center = getCenter(svgRef.current);
      startAngleRef.current = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
      startRotationRef.current = rotation;
    }
  }, [scale, offsetX, offsetY, rotation]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    if (isPinchingRef.current && e.touches.length === 2) {
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
      const touch = e.touches[0];
      const center = getCenter(svgRef.current);
      const currentAngle = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
      let angleDiff = currentAngle - startAngleRef.current;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      setRotation(startRotationRef.current + (angleDiff * (180 / Math.PI)));
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      isDraggingRef.current = false;
      isPinchingRef.current = false;
    }
  }, []);

  // Create SVG slice
  const createSVGSlice = (slice) => {
    const cx = 200, cy = 200, radius = 150;
    const halfAngle = slice.width / 2;
    const startAngle = slice.angle - halfAngle;
    const endAngle = slice.angle + halfAngle;
    
    const outerRadius = radius;
    const innerRadius = radius * 0.3;
    
    const outer1X = cx + outerRadius * Math.cos(radians(startAngle));
    const outer1Y = cy + outerRadius * Math.sin(radians(startAngle));
    const outer2X = cx + outerRadius * Math.cos(radians(endAngle));
    const outer2Y = cy + outerRadius * Math.sin(radians(endAngle));
    
    const inner1X = cx + innerRadius * Math.cos(radians(startAngle));
    const inner1Y = cy + innerRadius * Math.sin(radians(startAngle));
    const inner2X = cx + innerRadius * Math.cos(radians(endAngle));
    const inner2Y = cy + innerRadius * Math.sin(radians(endAngle));
    
    const largeArc = slice.width > 180 ? 1 : 0;
    
    const pathD = `M ${outer1X},${outer1Y} 
                   A ${outerRadius},${outerRadius} 0 ${largeArc},1 ${outer2X},${outer2Y} 
                   L ${inner2X},${inner2Y} 
                   A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${inner1X},${inner1Y} Z`;
    
    const textRadius = (outerRadius + innerRadius) / 2;
    const textAngle = slice.angle * Math.PI / 180;
    const textX = cx + textRadius * Math.cos(textAngle);
    const textY = cy + textRadius * Math.sin(textAngle);
    
    let fontSize;
    if (slice.width >= normalSliceAngle) {
      fontSize = Math.min(20, slice.width / 3);
    } else {
      fontSize = Math.min(14, slice.width / 2);
    }
    
    return (
      <g key={slice.id} className={`equal-slice ${slice.type}-slice`}>
        <path
          d={pathD}
          fill={slice.type === 'thesis' ? 'rgba(76, 175, 80, 0.6)' : 'rgba(244, 67, 54, 0.6)'}
          stroke="#888"
          strokeWidth="1"
          className="clickable-slice"
          onClick={(e) => {
            e.stopPropagation();
            handleSliceClick(slice.pair);
          }}
          onMouseEnter={(e) => {
            e.target.setAttribute('fill', slice.type === 'thesis' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)');
          }}
          onMouseLeave={(e) => {
            e.target.setAttribute('fill', slice.type === 'thesis' ? 'rgba(76, 175, 80, 0.6)' : 'rgba(244, 67, 54, 0.6)');
          }}
        />
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight="bold"
          fill="white"
          pointerEvents="none"
        >
          {slice.label}
        </text>
      </g>
    );
  };

  return (
    <div className="dialectical-wheel-container">
      <div className="header">
        <button className="icon" aria-label="Menu">&#9776;</button>
        <span className="header-title">{title}</span>
        <div>
          <button className="icon" aria-label="Help">&#x2753;</button>
          <button className="icon" aria-label="Zoom">&#128269;</button>
          <button className="icon" aria-label="Close">&#10006;</button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="controls-overlay">
          Drag to rotate • Pinch to zoom • Click thesis/antithesis pairs to see opposition clearly
        </div>
        
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
          >
            <g ref={recordRef} className="record">
              <defs></defs>
              <g id="slice-container">
                {equalSlices.map(slice => createSVGSlice(slice))}
              </g>
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
        <button className="bottom-btn" onClick={resetSlices}>
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