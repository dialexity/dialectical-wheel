import React from 'react';
import { polarToCartesian, normalizeAngle } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, Styles } from '../../types';

interface CycleRingProps {
  segments: SegmentData[];
  radius: number;
  rotationRad: number;
  styles: Styles;
}

export const CycleRing: React.FC<CycleRingProps> = ({
  segments, radius, rotationRad, styles
}) => {
  const resolved = resolveStyle(styles, 'cycle', 50);

  return (
    <g>
      {segments.map(segment => {
        const midAngle = (segment.startAngle + segment.endAngle) / 2;
        const [x, y] = polarToCartesian(radius, midAngle);
        const visualAngle = normalizeAngle(midAngle + rotationRad);
        const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
        const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);

        return (
          <text
            key={segment.segmentId}
            x={x}
            y={y}
            transform={`rotate(${textRotDeg}, ${x}, ${y})`}
            textAnchor="middle"
            dominantBaseline="central"
            fill={resolved.color}
            fontSize={resolved.fontSize}
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {segment.segmentId}
          </text>
        );
      })}
    </g>
  );
};
