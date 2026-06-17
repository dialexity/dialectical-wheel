import React, { useMemo } from 'react';
import { polarToCartesian, normalizeAngle, describeArc } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, CellEvent, Styles, StyleContext } from '../../types';

interface WheelRingProps {
  segments: SegmentData[];
  innerR: number;
  outerR: number;
  rotationRad: number;
  styles: Styles;
  transparent?: boolean;
  hoveredPerspectiveIdx?: number | null;
  selectedPerspectiveIdx?: number | null;
  focusAnimatingIdx?: number | null;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
}

export const WheelRing: React.FC<WheelRingProps> = ({
  segments, innerR, outerR, rotationRad, styles, transparent, hoveredPerspectiveIdx, selectedPerspectiveIdx, focusAnimatingIdx, onClick, onPointerEnter, onPointerLeave
}) => {
  const cellRadialHeight = outerR - innerR;
  const radius = (innerR + outerR) / 2;

  const resolvedStyles = useMemo(() =>
    segments.map(seg => {
      const ctx: StyleContext = {
        rowGroup: 'thead',
        ring: 'cycle',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex,
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    }),
    [segments, styles, cellRadialHeight]
  );

  const cellEvents = useMemo(() =>
    segments.map(segment => ({
      segmentId: segment.segmentId,
      polarity: segment.polarity,
      statement: segment.fullText,
      pairWith: segment.pairWith,
      perspectiveIndex: segment.perspectiveIndex,
    } as CellEvent)),
    [segments]
  );

  const interactive = onClick || onPointerEnter;

  const isSpacer = (segment: SegmentData) => segment.perspectiveIndex === -1;

  const isElevated = (segment: SegmentData) =>
    segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;

  const renderSegment = (segment: SegmentData, i: number, isHovered: boolean) => {
    const style = resolvedStyles[i];
    const midAngle = (segment.startAngle + segment.endAngle) / 2;
    const [x, y] = polarToCartesian(radius, midAngle);
    const visualAngle = normalizeAngle(midAngle + rotationRad);
    const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
    const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);
    const path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);

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

  return (
    <g>
      {segments.map((segment, i) =>
        isSpacer(segment) || isElevated(segment) ? null : (
          <g key={`wrap-${segment.segmentId}`} opacity={cellOpacity(segment)} style={{ transition: 'opacity 200ms ease-in' }}>
            {renderSegment(segment, i, false)}
          </g>
        )
      )}
      {segments.map((segment, i) =>
        isSpacer(segment) || !isElevated(segment) ? null : (
          <g key={`wrap-${segment.segmentId}`} opacity={cellOpacity(segment)} style={{ transition: 'opacity 200ms ease-in' }}>
            {renderSegment(segment, i, segment.perspectiveIndex === hoveredPerspectiveIdx)}
          </g>
        )
      )}
    </g>
  );
};
