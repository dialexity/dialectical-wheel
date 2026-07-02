import React from 'react';
import { polarToCartesian, normalizeAngle } from './utils/geometry';
import { layoutTextVariable } from './utils/textLayout';
import type { RingNumber } from './utils/textLayout';

interface CellTextProps {
  innerR: number;
  outerR: number;
  startAngle: number;
  endAngle: number;
  text: string;
  color: string;
  rotationRad: number;
  fontSize: number;
  padding: number;
  textBias: number;
  ringNumber: RingNumber;
  measure: (text: string, fontSize: number) => number;
}

export const CellText: React.FC<CellTextProps> = ({
  innerR, outerR, startAngle, endAngle, text, color, rotationRad, fontSize, padding, textBias, ringNumber, measure
}) => {
  const midAngle = (startAngle + endAngle) / 2;
  const cellHeight = outerR - innerR;
  const cellAngle = endAngle - startAngle;
  const paddingFrac = padding / cellHeight;

  const visualAngle = normalizeAngle(midAngle + rotationRad);
  const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
  const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);

  const layout = layoutTextVariable(text, fontSize, {
    innerR, outerR, cellAngle, baseFontSize: fontSize, padding: paddingFrac, measure, textBias, ring: ringNumber
  }, needsFlip);

  if (layout.lines.length === 0) return null;

  const lineHeight = layout.lineHeight;
  const n = layout.lines.length;
  const blockCenterR = layout.centerR;
  const [cx, cy] = polarToCartesian(blockCenterR, midAngle);

  const firstLineOffset = -(n - 1) * lineHeight / 2;

  return (
    <text
      transform={`translate(${cx},${cy}) rotate(${textRotDeg})`}
      textAnchor="middle"
      dominantBaseline="central"
      fill={color}
      fontSize={fontSize}
      fontWeight={600}
      fontFamily="system-ui, sans-serif"
      style={{ pointerEvents: 'none' }}
    >
      {layout.lines.map((line, i) => (
        <tspan
          key={i}
          x="0"
          dy={i === 0 ? firstLineOffset : lineHeight}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
};
