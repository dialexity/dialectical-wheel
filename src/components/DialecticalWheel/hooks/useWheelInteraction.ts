import { useState, useRef, useEffect, useCallback } from 'react';

export const useWheelInteraction = () => {
  // State for wheel transformation
  const [rotation, setRotation] = useState<number>(270); // Start with first slice at top center
  const [scale, setScale] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isZoomedToQ2, setIsZoomedToQ2] = useState<boolean>(false);

  // Refs for interaction handling
  const recordRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startAngleRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);

  // Touch/pinch handling refs
  const isPinchingRef = useRef<boolean>(false);
  const pinchStartDistRef = useRef<number>(0);
  const startScaleRef = useRef<number>(1);
  const startOffsetXRef = useRef<number>(0);
  const startOffsetYRef = useRef<number>(0);
  const pinchMidStartRef = useRef<{ x: number; y: number }>({ x: 200, y: 200 });

  // Transform function (matches the HTML setTransform)
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

  // Helper functions
  const getCenter = (el: Element): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const clientToSvg = (svg: SVGSVGElement, clientX: number, clientY: number): SVGPoint => {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  // Mouse event handlers
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

  // Touch event handlers
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

  return {
    // State
    rotation,
    scale,
    offsetX,
    offsetY,
    isZoomedToQ2,
    
    // Refs
    recordRef,
    svgRef,
    
    // Event handlers
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    
    // Functions
    setRotation,
    toggleTopHalfZoom,
    
    // SVG props object for easy spreading
    svgProps: {
      ref: svgRef,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      style: { touchAction: 'none' }
    }
  };
}; 