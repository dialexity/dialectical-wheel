import { useMemo, useCallback, useRef, useState, useEffect, forwardRef, Children, isValidElement } from 'react';
import { Ring } from './Ring';
import { SynthesisRing } from './SynthesisRing';
import { InwardSpiralArrows } from './InwardSpiralArrows';
import { WheelRing } from './WheelRing';
import { CycleRing } from './CycleRing';
import { SelectionOverlay } from './SelectionOverlay';
import { CalloutInternal } from './Callout';
import type { CalloutProps } from './Callout';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformPerspectives } from './utils/dataTransform';
import { DEFAULT_STYLES } from './utils/styles';
import { getRadii, polarToCartesian } from './utils/geometry';
import type { WheelProps, Styles, CSSValue, CellEvent, SegmentEvent, PerspectiveEvent, RowScope } from '../../types';

function mergeRowScope(defaults?: RowScope, user?: RowScope): RowScope | undefined {
  if (!defaults && !user) return undefined;
  if (!defaults) return user;
  if (!user) return defaults;
  const merged: any = { ...defaults, ...user };
  if (defaults.thesis || user.thesis) merged.thesis = { ...defaults.thesis, ...user.thesis };
  if (defaults.antithesis || user.antithesis) merged.antithesis = { ...defaults.antithesis, ...user.antithesis };
  return merged;
}

function mergeStyles(user?: Partial<Styles>): Styles {
  if (!user) return DEFAULT_STYLES;
  return {
    ...DEFAULT_STYLES,
    ...user,
    border: { ...DEFAULT_STYLES.border, ...user.border } as { width: CSSValue; color: string },
    thead: mergeRowScope(DEFAULT_STYLES.thead as RowScope, user.thead as RowScope),
    tbody: {
      ...DEFAULT_STYLES.tbody,
      ...user.tbody,
      positive: mergeRowScope(DEFAULT_STYLES.tbody?.positive, user.tbody?.positive),
      negative: mergeRowScope(DEFAULT_STYLES.tbody?.negative, user.tbody?.negative),
      neutral: mergeRowScope(DEFAULT_STYLES.tbody?.neutral, user.tbody?.neutral),
    },
    tfoot: mergeRowScope(DEFAULT_STYLES.tfoot as RowScope, user.tfoot as RowScope),
  };
}

const Wheel = forwardRef<SVGSVGElement, WheelProps>(function Wheel({
  perspectives,
  header = 'wheel',
  direction = 'right',
  showArrows = true,
  showInwardSpiral = false,
  interactive = false,
  selectedPerspective: selectedPerspectiveProp,
  focusedSegment: focusedSegmentProp,
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
  children,
}, ref) {
  const styles = useMemo(() => mergeStyles(userStyles), [userStyles]);
  const radii = useMemo(() => getRadii(perspectives.length), [perspectives.length]);

  const measure = useTextMeasure();
  const ringData = useMemo(
    () => transformPerspectives(perspectives),
    [perspectives]
  );

  const segmentIds = useMemo(() => ringData.neutral.map(s => s.segmentId), [ringData]);

  const [internalSelected, setInternalSelected] = useState<number | null>(selectedPerspectiveProp ?? null);
  const [internalFocused, setInternalFocused] = useState<string | null>(focusedSegmentProp ?? null);

  useEffect(() => {
    if (!interactive) return;
    if (selectedPerspectiveProp !== undefined) setInternalSelected(selectedPerspectiveProp);
  }, [interactive, selectedPerspectiveProp]);

  useEffect(() => {
    if (!interactive) return;
    if (focusedSegmentProp !== undefined) setInternalFocused(focusedSegmentProp);
  }, [interactive, focusedSegmentProp]);

  const selectedPerspective = interactive ? internalSelected : (selectedPerspectiveProp ?? null);
  const focusedSegment = interactive ? internalFocused : (focusedSegmentProp ?? null);

  const effectiveFocusedSegment = useMemo(() => {
    if (focusedSegment != null) return focusedSegment;
    if (selectedPerspective != null && segmentIds.length > 0) return segmentIds[selectedPerspective];
    return null;
  }, [focusedSegment, selectedPerspective, segmentIds]);

  const { rotationDeg, rotationRad, isDragging, isRotationPaused, focusAnimatingIdx, isSegmentAtFocusTarget, refocusWithoutFade, svgRef, pointerHandlers } = useRotation({
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

  const callouts = useMemo(() => {
    const result: CalloutProps[] = [];
    Children.forEach(children, child => {
      if (isValidElement(child) && (child.type as any)?._isWheelCallout) {
        result.push(child.props as CalloutProps);
      }
    });
    return result;
  }, [children]);


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
    if (interactive) {
      if (internalSelected === cell.perspectiveIndex) {
        if (isSegmentAtFocusTarget(cell.segmentId)) {
          setInternalSelected(null);
          setInternalFocused(null);
        } else {
          hoverSuppressedRef.current = true;
          suppressPointerPos.current = null;
          hoveredSegmentRef.current = null;
          hoveredPerspectiveRef.current = null;
          lastCellEventRef.current = null;
          setHoveredSegmentId(null);
          setHoveredPerspectiveIdx(null);
          refocusWithoutFade(cell.segmentId);
        }
      } else {
        setInternalSelected(cell.perspectiveIndex);
        setInternalFocused(cell.segmentId);
      }
    }
    if (onCellClicked) onCellClicked(cell);
    if (onSegmentClicked) onSegmentClicked(deriveSegmentEvent(cell));
    if (onPerspectiveClicked) onPerspectiveClicked(derivePerspectiveEvent(cell));
  }, [interactive, internalSelected, isSegmentAtFocusTarget, refocusWithoutFade, onCellClicked, onSegmentClicked, onPerspectiveClicked, deriveSegmentEvent, derivePerspectiveEvent]);

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
        viewBox={callouts.length > 0 ? "-420 -420 840 840" : "-250 -250 500 500"}
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
            rowGroup={stitched ? 'thead' : 'tbody'}
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
            rowGroup="tbody"
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
            rowGroup="tbody"
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
          <SynthesisRing styles={styles} radii={radii} segments={ringData.positive} />
          {showInwardSpiral && !(interactive && selectedPerspective != null) && (
            <InwardSpiralArrows
              segments={{ negative: ringData.negative, positive: ringData.positive }}
              radii={radii}
              neutralOutside={neutralOutside}
              direction={direction}
              styles={styles}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
              focusAnimatingIdx={focusAnimatingIdx}
            />
          )}
          {header === 'wheel' && (
            <WheelRing
              segments={ringData.invisible}
              innerR={radii.cycleStart}
              outerR={radii.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              transparent={stitched}
              direction={direction}
              showArrows={showArrows}
              hoveredPerspectiveIdx={hoveredPerspectiveIdx}
              selectedPerspectiveIdx={selectedPerspective}
              focusAnimatingIdx={focusAnimatingIdx}
              onClick={handleCellClick}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          )}
          {header === 'cycle' && (
            <CycleRing
              segments={ringData.invisible}
              innerR={radii.cycleStart}
              outerR={radii.cycleEnd}
              rotationRad={rotationRad}
              styles={styles}
              transparent={stitched}
              direction={direction}
              showArrows={showArrows}
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
              header={header}
              stitched={stitched}
              styles={styles}
              radii={radii}
            />
          )}
          {callouts.map((callout, ci) => {
            const segId = callout.segment || callout.rightEdge;
            const seg = ringData.negative.find(s => s.segmentId === segId);
            if (!seg) return null;

            const isEdge = !!callout.rightEdge;
            const negInnerR = neutralOutside ? radii.middleStart : radii.outerStart;
            const negOuterR = neutralOutside ? radii.middleEnd : radii.outerEnd;
            const spiralsVisible = showInwardSpiral && !(interactive && selectedPerspective != null);
            const cw = direction !== 'left';
            const isSinglePP = perspectives.length === 1;

            let tipR: number;
            let tipAngle: number;
            let midAngle: number;
            let boxEndR = radii.cycleEnd + 15;

            if (isSinglePP && !isEdge) {
              // 1-PP segment mode: attach to outer ring edge at cell center (same as multi-PP)
              midAngle = (seg.startAngle + seg.endAngle) / 2;
              tipR = radii.cycleEnd;
              tipAngle = midAngle;
            } else if (isSinglePP && isEdge) {
              // 1-PP rightEdge: callout sits in the spacer zone, connects to spiral arrow midpoint
              const posOuter = radii.innerEnd;
              const startR = negInnerR + (negOuterR - negInnerR) * 0.3;
              const spiralEndR = posOuter - (posOuter - radii.innerStart) * 0.15;
              const cpR = (negInnerR + posOuter) / 2;

              const segSpan = seg.endAngle - seg.startAngle;
              const sAngle = cw
                ? seg.endAngle - segSpan * 0.1
                : seg.startAngle + segSpan * 0.1;

              const negSegs = ringData.negative.filter(s => s.perspectiveIndex !== -1);
              const posSegs = ringData.positive.filter(s => s.perspectiveIndex !== -1);
              const segIdx = negSegs.indexOf(seg);
              const nextIdx = cw ? (segIdx + 1) % posSegs.length : (segIdx - 1 + posSegs.length) % posSegs.length;
              const posSeg = posSegs[nextIdx];
              const posSpan = posSeg.endAngle - posSeg.startAngle;
              const eAngle = cw
                ? posSeg.startAngle + posSpan * 0.1
                : posSeg.endAngle - posSpan * 0.1;

              let angleDelta = cw
                ? ((eAngle - sAngle + 2 * Math.PI) % (2 * Math.PI))
                : ((sAngle - eAngle + 2 * Math.PI) % (2 * Math.PI));
              const cpAngle = cw
                ? sAngle + angleDelta * 0.5
                : sAngle - angleDelta * 0.5;

              const [sx, sy] = polarToCartesian(startR, sAngle);
              const [cx, cy] = polarToCartesian(cpR, cpAngle);
              const [ex, ey] = polarToCartesian(spiralEndR, eAngle);

              // t=0.5 → midpoint of the bezier
              const t = 0.5;
              const it = 1 - t;
              const bx = it * it * sx + 2 * it * t * cx + t * t * ex;
              const by = it * it * sy + 2 * it * t * cy + t * t * ey;
              tipR = Math.sqrt(bx * bx + by * by);
              tipAngle = Math.atan2(bx, -by);

              // Box positioned in the spacer zone, close to tip
              midAngle = cw ? seg.endAngle + Math.PI * 0.25 : seg.startAngle - Math.PI * 0.25;
              boxEndR = tipR + 25;
            } else if (!isEdge) {
              // segment mode: attach to the outer ring edge at cell center
              midAngle = (seg.startAngle + seg.endAngle) / 2;
              tipR = radii.cycleEnd;
              tipAngle = midAngle;
            } else if (spiralsVisible) {
              // rightEdge + spiral: attach to bezier-edge intersection
              midAngle = seg.endAngle;
              const posOuter = radii.innerEnd;
              const startR = negInnerR + (negOuterR - negInnerR) * 0.3;
              const spiralEndR = posOuter - (posOuter - radii.innerStart) * 0.15;
              const cpR = (negInnerR + posOuter) / 2;

              const segSpan = seg.endAngle - seg.startAngle;
              const sAngle = cw
                ? seg.endAngle - segSpan * 0.1
                : seg.startAngle + segSpan * 0.1;

              const negSegs = ringData.negative.filter(s => s.perspectiveIndex !== -1);
              const posSegs = ringData.positive.filter(s => s.perspectiveIndex !== -1);
              const segIdx = negSegs.indexOf(seg);
              const nextIdx = cw ? (segIdx + 1) % posSegs.length : (segIdx - 1 + posSegs.length) % posSegs.length;
              const posSeg = posSegs[nextIdx];
              const posSpan = posSeg.endAngle - posSeg.startAngle;
              const eAngle = cw
                ? posSeg.startAngle + posSpan * 0.1
                : posSeg.endAngle - posSpan * 0.1;

              let angleDelta = cw
                ? ((eAngle - sAngle + 2 * Math.PI) % (2 * Math.PI))
                : ((sAngle - eAngle + 2 * Math.PI) % (2 * Math.PI));
              const cpAngle = cw
                ? sAngle + angleDelta * 0.5
                : sAngle - angleDelta * 0.5;

              const [sx, sy] = polarToCartesian(startR, sAngle);
              const [cx, cy] = polarToCartesian(cpR, cpAngle);
              const [ex, ey] = polarToCartesian(spiralEndR, eAngle);

              const edgeAngle = seg.endAngle;
              const perpX = Math.cos(edgeAngle);
              const perpY = Math.sin(edgeAngle);

              const ax2 = sx - 2 * cx + ex;
              const bx2 = 2 * (cx - sx);
              const cx2 = sx;
              const ay2 = sy - 2 * cy + ey;
              const by2 = 2 * (cy - sy);
              const cy2 = sy;

              const a = perpX * ax2 + perpY * ay2;
              const b = perpX * bx2 + perpY * by2;
              const c = perpX * cx2 + perpY * cy2;

              const disc = b * b - 4 * a * c;
              let t = 0.5;
              if (disc >= 0) {
                const sqrtDisc = Math.sqrt(disc);
                const t1 = (-b + sqrtDisc) / (2 * a);
                const t2 = (-b - sqrtDisc) / (2 * a);
                if (t1 >= 0 && t1 <= 1) t = t1;
                else if (t2 >= 0 && t2 <= 1) t = t2;
                else t = (Math.abs(t1 - 0.5) < Math.abs(t2 - 0.5)) ? t1 : t2;
              }

              const it = 1 - t;
              const bx = it * it * sx + 2 * it * t * cx + t * t * ex;
              const by = it * it * sy + 2 * it * t * cy + t * t * ey;
              tipR = Math.sqrt(bx * bx + by * by);
              tipAngle = Math.atan2(bx, -by);
            } else {
              // rightEdge without spiral: attach to outer edge at segment boundary
              midAngle = seg.endAngle;
              tipR = negOuterR;
              tipAngle = seg.endAngle;
            }

            const resolvedBorder = {
              width: Number(callout.border?.width ?? styles.border?.width ?? 0.5),
              color: callout.border?.color ?? styles.border?.color ?? '#ccc',
            };
            const tailShape: 'triangle' | 'line' = callout.header ? 'line' : (callout.tail ?? 'triangle');

            return (
              <CalloutInternal
                key={segId! + ci}
                midAngle={midAngle}
                anchorR={tipR}
                anchorAngle={tipAngle}
                endR={boxEndR}
                rotationDeg={rotationDeg}
                border={resolvedBorder}
                tail={tailShape}
                header={callout.header}
              >
                {callout.children}
              </CalloutInternal>
            );
          })}
        </g>
      </svg>
    </div>
  );
});

export default Wheel;
