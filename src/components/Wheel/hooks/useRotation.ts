import { useState, useRef, useCallback } from 'react';

interface UseRotationOptions {
  onFocusChanged?: (topSegment: string) => void;
  segmentIds: string[];
}

const DRAG_THRESHOLD = 3; // pixels before we consider it a drag

export function useRotation({ onFocusChanged, segmentIds }: UseRotationOptions) {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ angle: number; rotation: number; x: number; y: number } | null>(null);
  const didDrag = useRef(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getAngleFromEvent = useCallback((e: React.PointerEvent): number => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientX - cx, -(e.clientY - cy));
  }, []);

  const reportTopSegment = useCallback((deg: number) => {
    if (!onFocusChanged || segmentIds.length === 0) return;
    const N = segmentIds.length;
    const segmentAngle = 360 / N;
    const normalized = ((deg % 360) + 360) % 360;
    const index = Math.round(normalized / segmentAngle) % N;
    onFocusChanged(segmentIds[index]);
  }, [onFocusChanged, segmentIds]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const angle = getAngleFromEvent(e);
    dragStart.current = { angle, rotation: rotationDeg, x: e.clientX, y: e.clientY };
    didDrag.current = false;
  }, [getAngleFromEvent, rotationDeg]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;

    if (!didDrag.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
      didDrag.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
    }

    const angle = getAngleFromEvent(e);
    const delta = (angle - dragStart.current.angle) * (180 / Math.PI);
    setRotationDeg(dragStart.current.rotation + delta);
  }, [getAngleFromEvent]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;

    if (didDrag.current) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      const angle = getAngleFromEvent(e);
      const delta = (angle - dragStart.current.angle) * (180 / Math.PI);
      const finalDeg = dragStart.current.rotation + delta;
      setRotationDeg(finalDeg);
      reportTopSegment(finalDeg);
      setIsDragging(false);
    }

    dragStart.current = null;
  }, [getAngleFromEvent, reportTopSegment]);

  const rotationRad = (rotationDeg * Math.PI) / 180;

  return {
    rotationDeg,
    rotationRad,
    isDragging,
    svgRef,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp },
  };
}
