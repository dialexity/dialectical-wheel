import React, { useMemo } from 'react';
import { polarToCartesian, normalizeAngle, describeArc } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, CellEvent, ArrowEvent, Styles, StyleContext, WheelDirection } from '../../types';

interface CycleRingProps {
  segments: SegmentData[];
  innerR: number;
  outerR: number;
  rotationRad: number;
  styles: Styles;
  transparent?: boolean;
  direction?: WheelDirection;
  showArrows?: boolean;
  hoveredPerspectiveIdx?: number | null;
  selectedPerspectiveIdx?: number | null;
  focusAnimatingIdx?: number | null;
  hoveredArrowId?: string | null;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
  onArrowOver?: (event: ArrowEvent) => void;
  onArrowOut?: (event: ArrowEvent) => void;
  onArrowClicked?: (event: ArrowEvent) => void;
}

export const CycleRing: React.FC<CycleRingProps> = ({
  segments, innerR, outerR, rotationRad, styles, transparent, direction, showArrows = true, hoveredPerspectiveIdx, selectedPerspectiveIdx, focusAnimatingIdx, hoveredArrowId, onClick, onPointerEnter, onPointerLeave, onArrowOver, onArrowOut, onArrowClicked
}) => {
  const cellRadialHeight = outerR - innerR;
  const radius = (innerR + outerR) / 2;

  const thesisSegments = useMemo(() =>
    segments.filter(s => !s.segmentId.startsWith('A') && s.perspectiveIndex !== -1),
    [segments]
  );

  const resolvedStyles = useMemo(() =>
    thesisSegments.map(seg => {
      const ctx: StyleContext = {
        rowGroup: 'thead',
        ring: 'cycle',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex,
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    }),
    [thesisSegments, styles, cellRadialHeight]
  );

  const cellEvents = useMemo(() =>
    thesisSegments.map(segment => ({
      segmentId: segment.segmentId,
      polarity: segment.polarity,
      statement: segment.fullText,
      pairWith: segment.pairWith,
      perspectiveIndex: segment.perspectiveIndex,
    } as CellEvent)),
    [thesisSegments]
  );

  const arrowEvents = useMemo(() =>
    thesisSegments.map(segment => ({
      segmentId: segment.segmentId,
      perspectiveIndex: segment.perspectiveIndex,
    } as ArrowEvent)),
    [thesisSegments]
  );

  const interactive = onClick || onPointerEnter;
  const arrowInteractive = onArrowOver || onArrowClicked;

  const isElevated = (segment: SegmentData) =>
    segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;

  const arrowSize = (outerR - innerR) * 0.15;

  const renderSegment = (segment: SegmentData, i: number, isHovered: boolean) => {
    const style = resolvedStyles[i];
    const midAngle = (segment.startAngle + segment.endAngle) / 2;
    const [x, y] = polarToCartesian(radius, midAngle);
    const visualAngle = normalizeAngle(midAngle + rotationRad);
    const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
    const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);
    const path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);

    const cellSpan = segment.endAngle - segment.startAngle;
    const cw = direction !== 'left';
    const tipAngle = cw
      ? segment.endAngle - cellSpan * 0.08
      : segment.startAngle + cellSpan * 0.08;
    const tailAngle = cw
      ? tipAngle - cellSpan * 0.07
      : tipAngle + cellSpan * 0.07;
    const [sx, sy] = polarToCartesian(radius, tailAngle);
    const [ex, ey] = polarToCartesian(radius, tipAngle);
    const tangentX = Math.cos(tipAngle) * (cw ? 1 : -1);
    const tangentY = Math.sin(tipAngle) * (cw ? 1 : -1);
    const radialX = Math.sin(tipAngle);
    const radialY = -Math.cos(tipAngle);
    const hl = arrowSize * 0.35;
    const [tx, ty] = [ex - tangentX * hl + radialX * hl * 0.5, ey - tangentY * hl + radialY * hl * 0.5];
    const [tx2, ty2] = [ex - tangentX * hl - radialX * hl * 0.5, ey - tangentY * hl - radialY * hl * 0.5];

    return (
      <g
        key={segment.segmentId}
        onClick={() => onClick?.(cellEvents[i])}
        onPointerEnter={() => onPointerEnter?.(cellEvents[i])}
        onPointerLeave={() => onPointerLeave?.(cellEvents[i])}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <path
          d={path}
          fill={transparent ? 'none' : style.background}
          stroke={transparent ? 'none' : (isHovered ? style.hoverBorderColor : style.borderColor)}
          strokeWidth={style.borderWidth}
        />
        <text
          x={x}
          y={y}
          transform={`rotate(${textRotDeg}, ${x}, ${y})`}
          textAnchor="middle"
          dominantBaseline="central"
          fill={style.color}
          fontSize={style.fontSize}
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          {segment.segmentId}
        </text>
        {showArrows && style.arrowColor !== 'transparent' && (() => {
          const directArrowHover = hoveredArrowId === segment.segmentId;
          const arrowHovered = directArrowHover || isHovered;
          const strokeColor = directArrowHover ? '#333' : isHovered ? style.arrowHoverColor : style.arrowColor;
          return (
            <g
              onClick={(e) => { e.stopPropagation(); onArrowClicked?.(arrowEvents[i]); }}
              onPointerEnter={(e) => { e.stopPropagation(); onArrowOver?.(arrowEvents[i]); }}
              onPointerLeave={(e) => { e.stopPropagation(); onArrowOut?.(arrowEvents[i]); }}
              style={{ cursor: arrowInteractive ? 'pointer' : 'default' }}
            >
              <path
                d={`M${sx},${sy} A${radius},${radius} 0 0 ${cw ? 1 : 0} ${ex},${ey}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth}
                strokeLinecap="round"
              />
              <path
                d={`M${tx},${ty} L${ex},${ey} L${tx2},${ty2}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M${sx},${sy} A${radius},${radius} 0 0 ${cw ? 1 : 0} ${ex},${ey}`}
                fill="none"
                stroke="transparent"
                strokeWidth={Math.max(style.arrowWidth * 10, 20)}
                style={{ pointerEvents: 'stroke' }}
              />
            </g>
          );
        })()}
      </g>
    );
  };

  const dimUnfocused = styles.dimUnfocused ?? 0.5;

  const cellOpacity = (segment: SegmentData) => {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null
      && segment.perspectiveIndex !== selectedPerspectiveIdx
      && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };

  const hasVisibleArrows = showArrows && resolvedStyles[0]?.arrowColor !== 'transparent';

  const connectingArc = useMemo(() => {
    if (!hasVisibleArrows || thesisSegments.length < 2) return null;
    const last = thesisSegments[thesisSegments.length - 1];
    const first = thesisSegments[0];
    const cellSpan = last.endAngle - last.startAngle;
    const pad = cellSpan * 0.08;
    const cw = direction !== 'left';
    const gapStart = last.endAngle;
    const gapEnd = first.startAngle + 2 * Math.PI;
    if (gapEnd - gapStart < 0.1) return null;
    const arcStart = gapStart + pad;
    const arcEnd = gapEnd - pad;
    const [s1x, s1y] = polarToCartesian(radius, cw ? arcStart : arcEnd);
    const [s2x, s2y] = polarToCartesian(radius, cw ? arcEnd : arcStart);
    const largeArc = (arcEnd - arcStart) > Math.PI ? 1 : 0;
    const tipAngle = cw ? arcEnd : arcStart;
    const tangentX = Math.cos(tipAngle) * (cw ? 1 : -1);
    const tangentY = Math.sin(tipAngle) * (cw ? 1 : -1);
    const radialX = Math.sin(tipAngle);
    const radialY = -Math.cos(tipAngle);
    const hl = arrowSize * 0.5;
    const [tx, ty] = [s2x - tangentX * hl + radialX * hl * 0.4, s2y - tangentY * hl + radialY * hl * 0.4];
    const [tx2, ty2] = [s2x - tangentX * hl - radialX * hl * 0.4, s2y - tangentY * hl - radialY * hl * 0.4];
    return {
      d: `M${s1x},${s1y} A${radius},${radius} 0 ${largeArc} ${cw ? 1 : 0} ${s2x},${s2y}`,
      head: `M${tx},${ty} L${s2x},${s2y} L${tx2},${ty2}`,
    };
  }, [hasVisibleArrows, thesisSegments, radius, direction, arrowSize]);

  return (
    <g>
      {connectingArc && (
        <g opacity={0.5}>
          <path
            d={connectingArc.d}
            fill="none"
            stroke={resolvedStyles[0]?.arrowColor ?? '#666'}
            strokeWidth={(resolvedStyles[0]?.arrowWidth ?? arrowSize * 0.2) * 0.75}
            strokeDasharray={`${arrowSize * 0.3} ${arrowSize * 0.3}`}
            strokeLinecap="round"
          />
          <path
            d={connectingArc.head}
            fill="none"
            stroke={resolvedStyles[0]?.arrowColor ?? '#666'}
            strokeWidth={resolvedStyles[0]?.arrowWidth ?? arrowSize * 0.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {thesisSegments.map((segment, i) =>
        isElevated(segment) ? null : (
          <g key={`wrap-${segment.segmentId}`} opacity={cellOpacity(segment)} style={{ transition: 'opacity 200ms ease-in' }}>
            {renderSegment(segment, i, false)}
          </g>
        )
      )}
      {thesisSegments.map((segment, i) =>
        !isElevated(segment) ? null : (
          <g key={`wrap-${segment.segmentId}`} opacity={cellOpacity(segment)} style={{ transition: 'opacity 200ms ease-in' }}>
            {renderSegment(segment, i, segment.perspectiveIndex === hoveredPerspectiveIdx)}
          </g>
        )
      )}
    </g>
  );
};
