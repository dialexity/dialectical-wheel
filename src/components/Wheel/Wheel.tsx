import { useMemo, useCallback, useRef, useState, useEffect, forwardRef } from 'react';
import { Ring } from './Ring';
import { SynthesisRing } from './SynthesisRing';
import { WheelRing } from './WheelRing';
import { CycleRing } from './CycleRing';
import { SelectionOverlay } from './SelectionOverlay';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformPerspectives } from './utils/dataTransform';
import { DEFAULT_STYLES } from './utils/styles';
import { getRadii } from './utils/geometry';
import type { WheelProps, Styles, CSSValue, CellEvent, SegmentEvent, PerspectiveEvent } from '../../types';

function mergeStyles(user?: Partial<Styles>): Styles {
  if (!user) return DEFAULT_STYLES;
  return {
    ...DEFAULT_STYLES,
    ...user,
    border: { ...DEFAULT_STYLES.border, ...user.border } as { width: CSSValue; color: string },
    thead: { ...DEFAULT_STYLES.thead, ...user.thead },
    tbody: {
      ...DEFAULT_STYLES.tbody,
      ...user.tbody,
      positive: { ...DEFAULT_STYLES.tbody?.positive, ...user.tbody?.positive },
      negative: { ...DEFAULT_STYLES.tbody?.negative, ...user.tbody?.negative },
      neutral: { ...DEFAULT_STYLES.tbody?.neutral, ...user.tbody?.neutral },
      synthesis: { ...DEFAULT_STYLES.tbody?.synthesis, ...user.tbody?.synthesis },
    },
  };
}

const Wheel = forwardRef<SVGSVGElement, WheelProps>(function Wheel({
  perspectives,
  headerRing = 'wheel',
  selectedPerspective,
  focusedSegment,
  neutralOutside: neutralOutsideProp = false,
  styles: userStyles,
  css,
  onFocusChanged,
  onCellOver,
  onCellOut,
  onCellClicked,
  onSegmentOver,
  onSegmentOut,
  onSegmentClicked,
  onPerspectiveOver,
  onPerspectiveOut,
  onPerspectiveClicked,
}, ref) {
  const styles = useMemo(() => mergeStyles(userStyles), [userStyles]);
  const radii = useMemo(() => getRadii(perspectives.length), [perspectives.length]);

  const measure = useTextMeasure();
  const ringData = useMemo(
    () => transformPerspectives(perspectives),
    [perspectives]
  );

  const segmentIds = useMemo(() => ringData.neutral.map(s => s.segmentId), [ringData]);

  const effectiveFocusedSegment = useMemo(() => {
    if (focusedSegment != null) return focusedSegment;
    if (selectedPerspective != null && segmentIds.length > 0) return segmentIds[selectedPerspective];
    return null;
  }, [focusedSegment, selectedPerspective, segmentIds]);

  const { rotationDeg, rotationRad, isDragging, isRotationPaused, focusAnimatingIdx, svgRef, pointerHandlers } = useRotation({
    onFocusChanged,
    segmentIds,
    focusedSegment: effectiveFocusedSegment,
  });

  const setSvgRef = useCallback((el: SVGSVGElement | null) => {
    svgRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  }, [ref, svgRef]);

  const neutralOutside = !!neutralOutsideProp;
  const stitched = neutralOutsideProp === 'header';
  const outerRing: 'neutral' | 'negative' = neutralOutside ? 'neutral' : 'negative';
  const middleRing: 'neutral' | 'negative' = neutralOutside ? 'negative' : 'neutral';

  const derivePerspectiveEvent = useCallback((cell: CellEvent): PerspectiveEvent => {
    const p = perspectives[cell.perspectiveIndex];
    const thesis = typeof p.t === 'string' ? p.t : (p.t.statement || p.t.alias || '');
    const antithesis = typeof p.a === 'string' ? p.a : (p.a.statement || p.a.alias || '');
    return { perspectiveIndex: cell.perspectiveIndex, thesis, antithesis };
  }, [perspectives]);

  const deriveSegmentEvent = useCallback((cell: CellEvent): SegmentEvent => ({
    segmentId: cell.segmentId,
    pairWith: cell.pairWith,
    perspectiveIndex: cell.perspectiveIndex,
  }), []);

  const hoveredSegmentRef = useRef<string | null>(null);
  const hoveredPerspectiveRef = useRef<number | null>(null);
  const lastCellEventRef = useRef<CellEvent | null>(null);
  const hoverSuppressedRef = useRef(false);
  const suppressPointerPos = useRef<{ x: number; y: number } | null>(null);
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const [hoveredPerspectiveIdx, setHoveredPerspectiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (focusAnimatingIdx != null) {
      hoverSuppressedRef.current = true;
      suppressPointerPos.current = null;
      hoveredSegmentRef.current = null;
      hoveredPerspectiveRef.current = null;
      lastCellEventRef.current = null;
      setHoveredSegmentId(null);
      setHoveredPerspectiveIdx(null);
    }
  }, [focusAnimatingIdx]);

  const handleCellClick = useCallback((cell: CellEvent) => {
    if (onCellClicked) onCellClicked(cell);
    if (onSegmentClicked) onSegmentClicked(deriveSegmentEvent(cell));
    if (onPerspectiveClicked) onPerspectiveClicked(derivePerspectiveEvent(cell));
  }, [onCellClicked, onSegmentClicked, onPerspectiveClicked, deriveSegmentEvent, derivePerspectiveEvent]);

  const handlePointerEnter = useCallback((cell: CellEvent) => {
    if (hoverSuppressedRef.current) return;

    if (onCellOver) onCellOver(cell);

    if (hoveredSegmentRef.current !== cell.segmentId) {
      if (hoveredSegmentRef.current !== null && onSegmentOut && lastCellEventRef.current) {
        onSegmentOut(deriveSegmentEvent(lastCellEventRef.current));
      }
      hoveredSegmentRef.current = cell.segmentId;
      setHoveredSegmentId(cell.segmentId);
      if (onSegmentOver) onSegmentOver(deriveSegmentEvent(cell));
    }

    if (hoveredPerspectiveRef.current !== cell.perspectiveIndex) {
      if (hoveredPerspectiveRef.current !== null && onPerspectiveOut && lastCellEventRef.current) {
        onPerspectiveOut(derivePerspectiveEvent(lastCellEventRef.current));
      }
      hoveredPerspectiveRef.current = cell.perspectiveIndex;
      setHoveredPerspectiveIdx(cell.perspectiveIndex);
      if (onPerspectiveOver) onPerspectiveOver(derivePerspectiveEvent(cell));
    }

    lastCellEventRef.current = cell;
  }, [onCellOver, onSegmentOver, onSegmentOut, onPerspectiveOver, onPerspectiveOut, deriveSegmentEvent, derivePerspectiveEvent]);

  const handlePointerLeave = useCallback((cell: CellEvent) => {
    if (onCellOut) onCellOut(cell);
  }, [onCellOut]);

  const handleSvgPointerMove = useCallback((e: React.PointerEvent) => {
    if (!hoverSuppressedRef.current) return;
    const pos = suppressPointerPos.current;
    if (pos == null) {
      suppressPointerPos.current = { x: e.clientX, y: e.clientY };
      return;
    }
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    if (dx * dx + dy * dy > 9) {
      hoverSuppressedRef.current = false;
      suppressPointerPos.current = null;
    }
  }, []);

  const handleWheelPointerLeave = useCallback(() => {
    hoverSuppressedRef.current = false;
    const last = lastCellEventRef.current;
    if (hoveredSegmentRef.current !== null && onSegmentOut && last) {
      onSegmentOut(deriveSegmentEvent(last));
    }
    if (hoveredPerspectiveRef.current !== null && onPerspectiveOut && last) {
      onPerspectiveOut(derivePerspectiveEvent(last));
    }
    hoveredSegmentRef.current = null;
    hoveredPerspectiveRef.current = null;
    lastCellEventRef.current = null;
    setHoveredSegmentId(null);
    setHoveredPerspectiveIdx(null);
  }, [onSegmentOut, onPerspectiveOut, deriveSegmentEvent, derivePerspectiveEvent]);

  return (
    <div style={{ background: 'white', borderRadius: 8, ...css }}>
      <svg
        ref={setSvgRef}
        viewBox="-250 -250 500 500"
        style={{
          width: '100%',
          height: 'auto',
          touchAction: 'none',
          userSelect: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerLeave={handleWheelPointerLeave}
        {...pointerHandlers}
        onPointerMove={(e: React.PointerEvent<SVGSVGElement>) => { handleSvgPointerMove(e); pointerHandlers.onPointerMove(e); }}
      >
        <g
          transform={`rotate(${rotationDeg})`}
          style={{ transition: (isDragging || isRotationPaused) ? 'none' : 'transform 300ms ease-out' }}
        >
          <Ring
            segments={ringData[outerRing]}
            innerR={radii.outerStart}
            outerR={stitched ? radii.cycleEnd : radii.outerEnd}
            ringName={outerRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            perspectiveCount={perspectives.length}
            hoveredSegmentId={hoveredSegmentId}
            hoveredPerspectiveIdx={hoveredPerspectiveIdx}
            selectedPerspectiveIdx={selectedPerspective}
            focusAnimatingIdx={focusAnimatingIdx}
            headerBehavior={stitched}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <Ring
            segments={ringData[middleRing]}
            innerR={radii.middleStart}
            outerR={radii.middleEnd}
            ringName={middleRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            perspectiveCount={perspectives.length}
            hoveredSegmentId={hoveredSegmentId}
            hoveredPerspectiveIdx={hoveredPerspectiveIdx}
            selectedPerspectiveIdx={selectedPerspective}
            focusAnimatingIdx={focusAnimatingIdx}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <Ring
            segments={ringData.positive}
            innerR={radii.innerStart}
            outerR={radii.innerEnd}
            ringName="positive"
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            perspectiveCount={perspectives.length}
            hoveredSegmentId={hoveredSegmentId}
            hoveredPerspectiveIdx={hoveredPerspectiveIdx}
            selectedPerspectiveIdx={selectedPerspective}
            focusAnimatingIdx={focusAnimatingIdx}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <SynthesisRing styles={styles} radii={radii} />
          {headerRing === 'wheel' && (
            <WheelRing
              segments={ringData.invisible}
              innerR={radii.cycleStart}
              outerR={radii.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              transparent={stitched}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
              focusAnimatingIdx={focusAnimatingIdx}
              onClick={handleCellClick}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          )}
          {headerRing === 'cycle' && (
            <CycleRing
              segments={ringData.invisible}
              innerR={radii.cycleStart}
              outerR={radii.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              transparent={stitched}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
              focusAnimatingIdx={focusAnimatingIdx}
              onClick={handleCellClick}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          )}
          {selectedPerspective != null && (
            <SelectionOverlay
              segments={ringData.positive}
              selectedPerspectiveIdx={selectedPerspective}
              headerRing={headerRing}
              stitched={stitched}
              styles={styles}
              radii={radii}
            />
          )}
        </g>
      </svg>
    </div>
  );
});

export default Wheel;
