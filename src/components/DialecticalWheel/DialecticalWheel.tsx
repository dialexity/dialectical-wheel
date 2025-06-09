import React, { useState, useRef, useEffect, useMemo, TouchEvent, MouseEvent } from 'react';
import './DialecticalWheel.css';
import { createSliceAtAngle, defaultPairTexts } from '../../utils/sliceGenerator';
import { 
  DialecticalWheelProps, 
  DynamicSlice, 
  SliceSequenceItem, 
  WheelSequenceItem, 
  ClickableSliceData,
  SliceLayer,
  Point,
  LayerNode
} from '../../types';

const DialecticalWheel: React.FC<DialecticalWheelProps> = ({ 
  numPairs = 4, 
  title = "Win-Win",
  centerLabel = "Core",
  sliceSequence = null,
  fullSequence = null,
  detailedSlices = {},
  pairTexts = null
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
  const normalSliceAngle: number = 360 / (2 * numPairs);
  const focusedSliceAngle: number = 120;
  const unfocusedSliceAngle: number = (360 - 2 * focusedSliceAngle) / (2 * numPairs - 2);

  // Wheel sequence (matches the JavaScript generateSequence function)
  const wheelSequence = useMemo<SliceSequenceItem[]>(() => {
    const sequence: SliceSequenceItem[] = [];
    
    // Handle custom slice sequence or use default
    let firstHalf: SliceSequenceItem[];
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
    const secondHalf: SliceSequenceItem[] = firstHalf.map(slice => ({
      pair: slice.pair,
      type: slice.type === 'thesis' ? 'antithesis' : 'thesis'
    }));

    sequence.push(...firstHalf, ...secondHalf);
    return sequence;
  }, [numPairs, sliceSequence]);
  
  const sequenceWithLabels = useMemo<WheelSequenceItem[]>(() => {
    return wheelSequence.map((slice, index) => ({
      label: `${slice.type === 'thesis' ? 'T' : 'A'}${slice.pair + 1}`,
      pair: slice.pair,
      type: slice.type
    }));
  }, [wheelSequence]);

  // Log the sequence for debugging (like the original HTML)
  console.log(`Initialized ${title} wheel with sequence:`, sequenceWithLabels.map(s => s.label).join(', '));

  // Transform function (matches the HTML setTransform)
  const setTransform = (): void => {
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
  const getCenter = (el: Element): Point => {
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
  ): ClickableSliceData => {
    const cx = 200, cy = 200, radius = 150;
    const halfAngle = sliceWidth / 2;
    const startAngle = centerAngle - halfAngle;
    const endAngle = centerAngle + halfAngle;
    
    const toRadians = (deg: number): number => deg * Math.PI / 180;
    
    // Create layered rings like detailed slices
    const layerColors = ["#C6E5B3", "#FFFFFF", "#F9C6CC"]; // green, white, pink
    const layers: SliceLayer[] = [];
    
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

  // Handle slice click (matches the JavaScript click handlers)
  const handleSliceClick = (pairIndex: number): void => {
    console.log(`Clicked pair ${pairIndex}`);
    if (focusedPair === pairIndex) {
      // Unfocus: find the clicked focused slice and preserve its visual position
      const clickedFocusedSlice = dynamicSlices.find(s => s.pair === pairIndex);
      if (clickedFocusedSlice) {
        const targetAngle = clickedFocusedSlice.angle;
        setFocusedPair(null);
        createEqualSlices();
        
        // Adjust rotation to keep the clicked slice in the same visual position
        setTimeout(() => {
          const newEqualSlice = dynamicSlices.find(s => s.pair === pairIndex);
          if (newEqualSlice) {
            const rotationAdjustment = targetAngle - newEqualSlice.angle;
            setRotation(prev => prev + rotationAdjustment);
          }
        }, 50);
      }
    } else {
      // Focus on this pair
      focusOnPair(pairIndex);
    }
  };

  // Focus on pair function with proper typing
  const focusOnPair = (
    pairIndex: number, 
    clickedSliceType: 'thesis' | 'antithesis' | null = null, 
    targetVisualAngle: number | null = null
  ): void => {
    console.log(`Focusing on pair ${pairIndex}`);
    
    setFocusedPair(pairIndex);
    
    // Find current slices for this pair
    const currentThesis = dynamicSlices.find(s => s.pair === pairIndex && s.type === 'thesis');
    const currentAntithesis = dynamicSlices.find(s => s.pair === pairIndex && s.type === 'antithesis');
    
    if (!currentThesis || !currentAntithesis) {
      console.error('Could not find both thesis and antithesis for pair', pairIndex);
      return;
    }
    
    // Determine which slice was clicked and use its angle as reference
    let referenceSlice: DynamicSlice;
    let targetSliceAngle: number;
    
    if (clickedSliceType === 'thesis') {
      referenceSlice = currentThesis;
      targetSliceAngle = targetVisualAngle !== null ? targetVisualAngle : 90; // Default thesis to top-right
    } else if (clickedSliceType === 'antithesis') {
      referenceSlice = currentAntithesis;
      targetSliceAngle = targetVisualAngle !== null ? targetVisualAngle : 270; // Default antithesis to bottom-left
    } else {
      // No specific slice clicked, use thesis as default
      referenceSlice = currentThesis;
      targetSliceAngle = 90;
    }
    
    console.log(`Reference slice:`, referenceSlice);
    console.log(`Target angle: ${targetSliceAngle}`);
    
    // Calculate rotation needed to position the reference slice at target angle
    const currentAngle = referenceSlice.angle;
    const rotationNeeded = targetSliceAngle - currentAngle;
    
    console.log(`Current angle: ${currentAngle}, rotation needed: ${rotationNeeded}`);
    
    // Apply rotation immediately
    setRotation(prev => {
      const newRotation = prev + rotationNeeded;
      console.log(`Previous rotation: ${prev}, new rotation: ${newRotation}`);
      return newRotation;
    });
    
    // Create focused slices with detailed content if available
    const newSlices: DynamicSlice[] = [];
    
    // Get detailed slice content for this pair if available
    const detailedSlice = detailedSlices[pairIndex];
    let thesisSlice: DynamicSlice, antithesisSlice: DynamicSlice;
    
    if (detailedSlice) {
      console.log(`Using detailed slice for pair ${pairIndex}`);
      
      // Position thesis at target angle (where the clicked slice should be)
      const thesisAngle = targetSliceAngle;
      const antithesisAngle = (thesisAngle + 180) % 360; // Opposite side
      
      thesisSlice = {
        id: `focused-thesis-${pairIndex}`,
        angle: thesisAngle,
        width: focusedSliceAngle,
        label: `T${pairIndex + 1}`,
        pair: pairIndex,
        type: 'thesis',
        detailed: true,
        svgContent: detailedSlice.thesis,
        originalIndex: currentThesis.id.split('-')[1] ? parseInt(currentThesis.id.split('-')[1]) : undefined
      };
      
      antithesisSlice = {
        id: `focused-antithesis-${pairIndex}`,
        angle: antithesisAngle,
        width: focusedSliceAngle,
        label: `A${pairIndex + 1}`,
        pair: pairIndex,
        type: 'antithesis',
        detailed: true,
        svgContent: detailedSlice.antithesis,
        originalIndex: currentAntithesis.id.split('-')[1] ? parseInt(currentAntithesis.id.split('-')[1]) : undefined
      };
    } else {
      console.log(`Using simple slices for pair ${pairIndex}`);
      
      // Position thesis at target angle (where the clicked slice should be)
      const thesisAngle = targetSliceAngle;
      const antithesisAngle = (thesisAngle + 180) % 360; // Opposite side
      
      thesisSlice = {
        id: `focused-thesis-${pairIndex}`,
        angle: thesisAngle,
        width: focusedSliceAngle,
        label: `T${pairIndex + 1}`,
        pair: pairIndex,
        type: 'thesis',
        originalIndex: currentThesis.id.split('-')[1] ? parseInt(currentThesis.id.split('-')[1]) : undefined
      };
      
      antithesisSlice = {
        id: `focused-antithesis-${pairIndex}`,
        angle: antithesisAngle,
        width: focusedSliceAngle,
        label: `A${pairIndex + 1}`,
        pair: pairIndex,
        type: 'antithesis',
        originalIndex: currentAntithesis.id.split('-')[1] ? parseInt(currentAntithesis.id.split('-')[1]) : undefined
      };
    }
    
    newSlices.push(thesisSlice, antithesisSlice);
    
    // Add remaining pairs as smaller slices
    const remainingAngle = 360 - 2 * focusedSliceAngle;
    const remainingPairs = sequenceWithLabels.filter(s => s.pair !== pairIndex);
    const remainingSliceAngle = remainingAngle / remainingPairs.length;
    
    let currentRemainingAngle = (targetSliceAngle + focusedSliceAngle) % 360;
    
    remainingPairs.forEach((slice) => {
      newSlices.push({
        id: `unfocused-${slice.type}-${slice.pair}`,
        angle: currentRemainingAngle,
        width: remainingSliceAngle,
        label: slice.label,
        pair: slice.pair,
        type: slice.type
      });
      currentRemainingAngle = (currentRemainingAngle + remainingSliceAngle) % 360;
    });
    
    console.log('Setting new focused slices:', newSlices);
    setDynamicSlices(newSlices);
  };

  // Mouse event handlers with proper typing
  const handleMouseDown = (e: MouseEvent<SVGSVGElement>): void => {
    if (!svgRef.current) return;
    
    const svgPoint = clientToSvg(svgRef.current, e.clientX, e.clientY);
    const centerX = 200 + offsetX;
    const centerY = 200 + offsetY;
    
    startAngleRef.current = Math.atan2(svgPoint.y - centerY, svgPoint.x - centerX) * 180 / Math.PI;
    startRotationRef.current = rotation;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>): void => {
    if (!isDraggingRef.current || !svgRef.current) return;
    
    const svgPoint = clientToSvg(svgRef.current, e.clientX, e.clientY);
    const centerX = 200 + offsetX;
    const centerY = 200 + offsetY;
    
    const currentAngle = Math.atan2(svgPoint.y - centerY, svgPoint.x - centerX) * 180 / Math.PI;
    const angleDiff = currentAngle - startAngleRef.current;
    setRotation(startRotationRef.current + angleDiff);
  };

  const handleMouseUp = (): void => {
    isDraggingRef.current = false;
  };

  // Touch event handlers with proper typing
  const handleTouchStart = (e: TouchEvent<SVGSVGElement>): void => {
    if (e.touches.length !== 1 || !svgRef.current) return;
    
    const touch = e.touches[0];
    const svgPoint = clientToSvg(svgRef.current, touch.clientX, touch.clientY);
    const centerX = 200 + offsetX;
    const centerY = 200 + offsetY;
    
    startAngleRef.current = Math.atan2(svgPoint.y - centerY, svgPoint.x - centerX) * 180 / Math.PI;
    startRotationRef.current = rotation;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: TouchEvent<SVGSVGElement>): void => {
    if (!isDraggingRef.current || e.touches.length !== 1 || !svgRef.current) return;
    
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const svgPoint = clientToSvg(svgRef.current, touch.clientX, touch.clientY);
    const centerX = 200 + offsetX;
    const centerY = 200 + offsetY;
    
    const currentAngle = Math.atan2(svgPoint.y - centerY, svgPoint.x - centerX) * 180 / Math.PI;
    const angleDiff = currentAngle - startAngleRef.current;
    setRotation(startRotationRef.current + angleDiff);
  };

  const handleTouchEnd = (): void => {
    isDraggingRef.current = false;
  };

  const handleSliceTouchStart = (e: TouchEvent<SVGElement>, pairIndex: number): void => {
    e.stopPropagation();
    isDraggingRef.current = false;
  };

  const handleSliceTouchEnd = (e: TouchEvent<SVGElement>, pairIndex: number): void => {
    e.stopPropagation();
    if (!isDraggingRef.current) {
      setTimeout(() => handleSliceClick(pairIndex), 50);
    }
  };

  // Utility function with proper typing
  const clientToSvg = (svg: SVGSVGElement, clientX: number, clientY: number): Point => {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  // Layer node management functions with proper typing
  const getAllLayerNodes = (): LayerNode[] => {
    if (!svgRef.current) return [];
    const nodes = svgRef.current.querySelectorAll('.layer-node');
    return Array.from(nodes).map(node => getLayerNodeInfo(node)).filter(Boolean) as LayerNode[];
  };

  const getLayerNodeById = (nodeId: string): LayerNode | null => {
    if (!svgRef.current) return null;
    const node = svgRef.current.querySelector(`[data-node-id="${nodeId}"]`);
    return node ? getLayerNodeInfo(node) : null;
  };

  const getLayerNodesForPair = (pairIndex: number): LayerNode[] => {
    if (!svgRef.current) return [];
    const nodes = svgRef.current.querySelectorAll(`[data-pair-index="${pairIndex}"]`);
    return Array.from(nodes).map(node => getLayerNodeInfo(node)).filter(Boolean) as LayerNode[];
  };

  const getLayerNodesByType = (layerType: 'green' | 'white' | 'pink'): LayerNode[] => {
    if (!svgRef.current) return [];
    const nodes = svgRef.current.querySelectorAll(`[data-layer-type="${layerType}"]`);
    return Array.from(nodes).map(node => getLayerNodeInfo(node)).filter(Boolean) as LayerNode[];
  };

  const getLayerNodeInfo = (nodeElement: Element): LayerNode | null => {
    const nodeId = nodeElement.getAttribute('data-node-id');
    const sliceId = nodeElement.getAttribute('data-slice-id');
    const pairIndex = nodeElement.getAttribute('data-pair-index');
    const sliceType = nodeElement.getAttribute('data-slice-type');
    const layerIndex = nodeElement.getAttribute('data-layer-index');
    const layerType = nodeElement.getAttribute('data-layer-type');

    if (!nodeId || !sliceId || pairIndex === null || !sliceType || layerIndex === null || !layerType) {
      return null;
    }

    return {
      id: nodeId,
      element: nodeElement,
      sliceId,
      pairIndex: parseInt(pairIndex),
      sliceType: sliceType as 'thesis' | 'antithesis',
      layerIndex: parseInt(layerIndex),
      layerType: layerType as 'green' | 'white' | 'pink'
    };
  };

  const getNodeCenter = (nodeElement: Element): Point => {
    const bbox = (nodeElement as SVGPathElement).getBBox();
    return {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
  };

  // Connection functions with proper typing
  const connectNodes = (
    fromId: string, 
    toId: string, 
    color: string = '#0074d9', 
    strokeWidth: number = 2
  ): void => {
    const fromNode = getLayerNodeById(fromId);
    const toNode = getLayerNodeById(toId);

    if (!fromNode || !toNode || !svgRef.current) {
      console.error('Could not find nodes for connection:', fromId, toId);
      return;
    }

    const fromCenter = getNodeCenter(fromNode.element);
    const toCenter = getNodeCenter(toNode.element);

    // Create connection line
    const connectionId = `connection-${fromId}-${toId}`;
    
    // Remove existing connection if it exists
    const existingConnection = svgRef.current.querySelector(`#${connectionId}`);
    if (existingConnection) {
      existingConnection.remove();
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', connectionId);
    line.setAttribute('x1', fromCenter.x.toString());
    line.setAttribute('y1', fromCenter.y.toString());
    line.setAttribute('x2', toCenter.x.toString());
    line.setAttribute('y2', toCenter.y.toString());
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', strokeWidth.toString());
    line.setAttribute('marker-end', color === '#4CAF50' ? 'url(#arrowhead-green)' : 'url(#arrowhead)');
    line.setAttribute('class', 'node-connection');
    
    if (showArrows) {
      line.style.opacity = '1';
    } else {
      line.style.opacity = '0';
    }

    // Insert before the dynamic slice container so connections appear behind slices
    // Note: dynamicContainer is inside recordRef, not svgRef
    const recordElement = recordRef.current;
    const dynamicContainer = recordElement?.querySelector('#dynamic-slice-container');
    if (recordElement && dynamicContainer) {
      recordElement.insertBefore(line, dynamicContainer);
    } else if (recordElement) {
      recordElement.appendChild(line);
    } else {
      console.warn('Could not insert connection line: recordRef not available');
    }
  };

  // Utility functions
  const toggleTopHalfZoom = (): void => {
    const targetScale = scale === 1 ? 2 : 1;
    const targetOffsetX = scale === 1 ? 0 : 0;
    const targetOffsetY = scale === 1 ? 100 : 0;
    
    animateToTransform(targetScale, targetOffsetX, targetOffsetY);
  };

  const animateToTransform = (targetScale: number, targetOffsetX: number, targetOffsetY: number): void => {
    const startScale = scale;
    const startOffsetX = offsetX;
    const startOffsetY = offsetY;
    const duration = 300; // ms
    const startTime = Date.now();

    const animate = (): void => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setScale(startScale + (targetScale - startScale) * easedProgress);
      setOffsetX(startOffsetX + (targetOffsetX - startOffsetX) * easedProgress);
      setOffsetY(startOffsetY + (targetOffsetY - startOffsetY) * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  const toggleArrows = (): void => {
    setShowArrows(prev => {
      const newShowArrows = !prev;
      
      // Update existing connections
      if (svgRef.current) {
        const connections = svgRef.current.querySelectorAll('.node-connection');
        connections.forEach(connection => {
          (connection as SVGElement).style.opacity = newShowArrows ? '1' : '0';
        });
      }
      
      return newShowArrows;
    });
  };

  const createDemoConnections = (): void => {
    // Wait for slices to be rendered
    setTimeout(() => {
      const allNodes = getAllLayerNodes();
      console.log('Available nodes for connections:', allNodes.map(n => `${n.id} (${n.layerType})`));
      
      if (allNodes.length > 0) {
        // Create some demo connections between different layer types
        const greenNodes = getLayerNodesByType('green');
        const whiteNodes = getLayerNodesByType('white');
        const pinkNodes = getLayerNodesByType('pink');
        
        // Connect some green to white nodes
        greenNodes.slice(0, 2).forEach((greenNode, index) => {
          if (whiteNodes[index]) {
            connectNodes(greenNode.id, whiteNodes[index].id, '#4CAF50');
          }
        });
        
        // Connect some white to pink nodes
        whiteNodes.slice(0, 2).forEach((whiteNode, index) => {
          if (pinkNodes[index]) {
            connectNodes(whiteNode.id, pinkNodes[index].id, '#FF5722');
          }
        });
        
        console.log('Demo connections created');
      }
    }, 500);
  };

  // Initialize demo connections
  useEffect(() => {
    createDemoConnections();
  }, [dynamicSlices]);

  return (
    <div className="dialectical-wheel-container">
      <div className="top-bar">
        <h2 className="wheel-title">{title}</h2>
        <div className="controls">
          <button className="control-btn" onClick={toggleTopHalfZoom}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button className="control-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="wheel-container">
        <div className="record-container">
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
              <defs>
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
                  
                  // Handle detailed slices differently
                  if (slice.detailed && slice.svgContent) {
                    console.log('Detailed slice transform:', `rotate(${slice.angle} 200 200)`);
                    console.log('Detailed slice SVG length:', slice.svgContent.length);
                    console.log('Detailed slice pair:', slice.pair, 'type:', slice.type);
                    console.log('First 200 chars of SVG:', slice.svgContent.substring(0, 200));
                    
                    return (
                      <g 
                        key={slice.id} 
                        className={`slice-component ${slice.type}-slice focused-pair`}
                        onClick={() => handleSliceClick(slice.pair)}
                        onTouchStart={(e) => handleSliceTouchStart(e, slice.pair)}
                        onTouchEnd={(e) => handleSliceTouchEnd(e, slice.pair)}
                        style={{ cursor: 'pointer' }}
                        dangerouslySetInnerHTML={{ __html: slice.svgContent }}
                      />
                    );
                  }
                  
                  // Handle simple slices (now with layered rings)
                  const sliceData = createClickableSlice(slice.angle, slice.width, slice.label, slice.pair, slice.type);
                  
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