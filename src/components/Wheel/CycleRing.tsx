import React, { useMemo } from 'react';
import { polarToCartesian, normalizeAngle, describeArc } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, CellEvent, Styles } from '../../types';

interface CycleRingProps {
  segments: SegmentData[];
  innerR: number;
  outerR: number;
  rotationRad: number;
  styles: Styles;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
}

export const CycleRing: React.FC<CycleRingProps> = ({
  segments, innerR, outerR, rotationRad, styles, onClick, onPointerEnter, onPointerLeave
}) => {
  const resolved = resolveStyle(styles, 'cycle', outerR - innerR);
  const radius = (innerR + outerR) / 2;

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

  return (
    <g>
      {segments.map((segment, i) => {
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
            <path d={path} fill="transparent" />
            <text
              x={x}
              y={y}
              transform={`rotate(${textRotDeg}, ${x}, ${y})`}
              textAnchor="middle"
              dominantBaseline="central"
              fill={resolved.color}
              fontSize={resolved.fontSize}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              {segment.segmentId}
            </text>
          </g>
        );
      })}
    </g>
  );
};
