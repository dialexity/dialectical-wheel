import { useMemo, useCallback, useRef, useState } from 'react';
import { Ring } from './Ring';
import { SynthesisRing } from './SynthesisRing';
import { WheelRing } from './WheelRing';
import { CycleRing } from './CycleRing';
import { SelectionOverlay } from './SelectionOverlay';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformPerspectives } from './utils/dataTransform';
import { DEFAULT_STYLES } from './utils/styles';
import { RADII } from './utils/geometry';
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

export default function Wheel({
  perspectives,
  headerRing = 'wheel',
  selectedPerspective,
  neutralOutside = false,
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
}: WheelProps) {
  const styles = useMemo(() => mergeStyles(userStyles), [userStyles]);

  const measure = useTextMeasure();
  const ringData = useMemo(
    () => transformPerspectives(perspectives),
    [perspectives]
  );

  const segmentIds = useMemo(() => ringData.neutral.map(s => s.segmentId), [ringData]);
  const { rotationDeg, rotationRad, isDragging, svgRef, pointerHandlers } = useRotation({
    onFocusChanged,
    segmentIds,
  });

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
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  const [hoveredPerspectiveIdx, setHoveredPerspectiveIdx] = useState<number | null>(null);

  const handleCellClick = useCallback((cell: CellEvent) => {
    if (onCellClicked) onCellClicked(cell);
    if (onSegmentClicked) onSegmentClicked(deriveSegmentEvent(cell));
    if (onPerspectiveClicked) onPerspectiveClicked(derivePerspectiveEvent(cell));
  }, [onCellClicked, onSegmentClicked, onPerspectiveClicked, deriveSegmentEvent, derivePerspectiveEvent]);

  const handlePointerEnter = useCallback((cell: CellEvent) => {
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

  const handleWheelPointerLeave = useCallback(() => {
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
        ref={svgRef}
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
      >
        <g
          transform={`rotate(${rotationDeg})`}
          style={{ transition: isDragging ? 'none' : 'transform 300ms ease-out' }}
        >
          <Ring
            segments={ringData[outerRing]}
            innerR={RADII.outerStart}
            outerR={RADII.outerEnd}
            ringName={outerRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            hoveredSegmentId={hoveredSegmentId}
            selectedPerspectiveIdx={selectedPerspective}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <Ring
            segments={ringData[middleRing]}
            innerR={RADII.middleStart}
            outerR={RADII.middleEnd}
            ringName={middleRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            hoveredSegmentId={hoveredSegmentId}
            selectedPerspectiveIdx={selectedPerspective}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <Ring
            segments={ringData.positive}
            innerR={RADII.innerStart}
            outerR={RADII.innerEnd}
            ringName="positive"
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            hoveredSegmentId={hoveredSegmentId}
            selectedPerspectiveIdx={selectedPerspective}
            onClick={handleCellClick}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <SynthesisRing styles={styles} />
          {headerRing === 'wheel' && (
            <WheelRing
              segments={ringData.invisible}
              innerR={RADII.cycleStart}
              outerR={RADII.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
              onClick={handleCellClick}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          )}
          {headerRing === 'cycle' && (
            <CycleRing
              segments={ringData.invisible}
              innerR={RADII.cycleStart}
              outerR={RADII.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
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
              styles={styles}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
