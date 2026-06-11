import { useState, useRef, useCallback } from 'react';

interface UseRotationOptions {
  onTopSliceChange?: (topSlice: string) => void;
  sliceIds: string[];
}

export function useRotation({ onTopSliceChange, sliceIds }: UseRotationOptions) {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ angle: number; rotation: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getAngleFromEvent = useCallback((e: React.PointerEvent): number => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientX - cx, -(e.clientY - cy));
  }, []);

  const reportTopSlice = useCallback((deg: number) => {
    if (!onTopSliceChange || sliceIds.length === 0) return;
    const N = sliceIds.length;
    const sliceAngle = 360 / N;
    const normalized = ((deg % 360) + 360) % 360;
    const index = Math.round(normalized / sliceAngle) % N;
    onTopSliceChange(sliceIds[index]);
  }, [onTopSliceChange, sliceIds]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const angle = getAngleFromEvent(e);
    dragStart.current = { angle, rotation: rotationDeg };
    setIsDragging(true);
  }, [getAngleFromEvent, rotationDeg]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const angle = getAngleFromEvent(e);
    const delta = (angle - dragStart.current.angle) * (180 / Math.PI);
    setRotationDeg(dragStart.current.rotation + delta);
  }, [getAngleFromEvent]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (dragStart.current) {
      const angle = getAngleFromEvent(e);
      const delta = (angle - dragStart.current.angle) * (180 / Math.PI);
      const finalDeg = dragStart.current.rotation + delta;
      setRotationDeg(finalDeg);
      reportTopSlice(finalDeg);
    }
    dragStart.current = null;
    setIsDragging(false);
  }, [getAngleFromEvent, reportTopSlice]);

  const rotationRad = (rotationDeg * Math.PI) / 180;

  return {
    rotationDeg,
    rotationRad,
    isDragging,
    svgRef,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp },
  };
}
