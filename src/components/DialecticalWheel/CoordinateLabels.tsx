import React from 'react';
import { polarToCartesian, normalizeAngle } from './utils/geometry';
import type { SliceData } from '../../types';

interface CoordinateLabelsProps {
  slices: SliceData[];
  radius: number;
  rotationRad: number;
  color: string;
  fontSize: number;
}

export const CoordinateLabels: React.FC<CoordinateLabelsProps> = ({
  slices, radius, rotationRad, color, fontSize
}) => (
  <g>
    {slices.map(slice => {
      const midAngle = (slice.startAngle + slice.endAngle) / 2;
      const [x, y] = polarToCartesian(radius, midAngle);
      const visualAngle = normalizeAngle(midAngle + rotationRad);
      const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
      const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);

      return (
        <text
          key={slice.unitId}
          x={x}
          y={y}
          transform={`rotate(${textRotDeg}, ${x}, ${y})`}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          {slice.unitId}
        </text>
      );
    })}
  </g>
);
