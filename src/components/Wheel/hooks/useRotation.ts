import { useState, useRef, useCallback, useEffect } from 'react';

interface UseRotationOptions {
  onFocusChanged?: (topSegment: string) => void;
  segmentIds: string[];
  focusedSegment?: string | null;
}

const DRAG_THRESHOLD = 3;
const FADE_OUT_MS = 200;
const ROTATE_MS = 300;

function defaultRotation(segmentCount: number): number {
  if (segmentCount === 0) return 0;
  return -(360 / segmentCount / 2);
}

export function useRotation({ onFocusChanged, segmentIds, focusedSegment }: UseRotationOptions) {
  const [rotationDeg, setRotationDeg] = useState(() => defaultRotation(segmentIds.length));
  const rotationDegRef = useRef(rotationDeg);
  rotationDegRef.current = rotationDeg;
  const [isDragging, setIsDragging] = useState(false);
  const [focusAnimatingIdx, setFocusAnimatingIdx] = useState<number | null>(null);
  const [isRotationPaused, setIsRotationPaused] = useState(false);
  const dragStart = useRef<{ angle: number; rotation: number; x: number; y: number } | null>(null);
  const didDrag = useRef(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    animTimers.current.forEach(t => clearTimeout(t));
    animTimers.current = [];
  };

  useEffect(() => {
    if (focusedSegment == null || segmentIds.length === 0) return;
    const idx = segmentIds.indexOf(focusedSegment);
    if (idx === -1) return;
    const N = segmentIds.length;
    const segmentAngle = 360 / N;
    const midAngle = idx * segmentAngle + segmentAngle / 2;
    const isAntithesis = idx >= N / 2;

    const targetPosition = isAntithesis ? 180 : 0;
    const targetRaw = targetPosition - midAngle;

    const perspectiveIdx = idx < N / 2 ? idx : idx - N / 2;

    clearTimers();

    // If segment is already at focus position, skip phased animation (no flicker)
    const delta = ((targetRaw - rotationDegRef.current) % 360 + 540) % 360 - 180;
    if (Math.abs(delta) < 1) {
      setFocusAnimatingIdx(null);
      setIsRotationPaused(false);
      return;
    }

    // Phase 1: fade out others (pause rotation transition)
    setIsRotationPaused(true);
    setFocusAnimatingIdx(perspectiveIdx);

    // Phase 2: after fade-out, start rotation
    const t1 = setTimeout(() => {
      setIsRotationPaused(false);
      setRotationDeg(current => {
        let delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
        if (delta === 180) delta = isAntithesis ? 180 : -180;
        return current + delta;
      });
    }, FADE_OUT_MS);

    // Phase 3: after rotation, fade back in
    const t2 = setTimeout(() => {
      setFocusAnimatingIdx(null);
    }, FADE_OUT_MS + ROTATE_MS);

    animTimers.current = [t1, t2];

    return () => clearTimers();
  }, [focusedSegment, segmentIds]);

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
    const normalized = ((-deg % 360) + 360) % 360;
    const index = Math.round((normalized - segmentAngle / 2) / segmentAngle + N) % N;
    const id = segmentIds[index];
    if (!id.startsWith('__')) onFocusChanged(id);
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

  const isSegmentAtFocusTarget = useCallback((segmentId: string): boolean => {
    const idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return false;
    const N = segmentIds.length;
    const segmentAngle = 360 / N;
    const midAngle = idx * segmentAngle + segmentAngle / 2;
    const isAntithesis = idx >= N / 2;
    const targetPosition = isAntithesis ? 180 : 0;
    const currentVisualAngle = ((midAngle + rotationDegRef.current + 360) % 360);
    const diff = Math.abs(((currentVisualAngle - targetPosition + 540) % 360) - 180);
    return diff < 1;
  }, [segmentIds]);

  const refocusWithoutFade = useCallback((segmentId: string) => {
    const idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return;
    const N = segmentIds.length;
    const segmentAngle = 360 / N;
    const midAngle = idx * segmentAngle + segmentAngle / 2;
    const isAntithesis = idx >= N / 2;

    const targetPosition = isAntithesis ? 180 : 0;
    const targetRaw = targetPosition - midAngle;
    clearTimers();
    setRotationDeg(current => {
      let delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
      if (delta === 180) delta = isAntithesis ? 180 : -180;
      return current + delta;
    });
  }, [segmentIds]);

  const rotationRad = (rotationDeg * Math.PI) / 180;

  return {
    rotationDeg,
    rotationRad,
    isDragging,
    isRotationPaused,
    focusAnimatingIdx,
    isSegmentAtFocusTarget,
    refocusWithoutFade,
    svgRef,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp },
  };
}
