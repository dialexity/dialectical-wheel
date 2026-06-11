import React, { useMemo } from 'react';
import { arcCentroid, normalizeAngle } from './utils/geometry';
import { layoutText, TextLayoutResult } from './utils/textLayout';

interface CellTextProps {
  innerR: number;
  outerR: number;
  startAngle: number;
  endAngle: number;
  text: string;
  color: string;
  rotationRad: number;
  measure: (text: string, fontSize: number) => number;
  baseFontSize: number;
}

export const CellText: React.FC<CellTextProps> = ({
  innerR, outerR, startAngle, endAngle, text, color, rotationRad, measure, baseFontSize
}) => {
  const [cx, cy] = arcCentroid(innerR, outerR, startAngle, endAngle);
  const cellAngle = endAngle - startAngle;

  const layout: TextLayoutResult = useMemo(
    () => layoutText(text, { innerR, outerR, cellAngle, baseFontSize, measure }),
    [text, innerR, outerR, cellAngle, baseFontSize, measure]
  );

  const midAngle = (startAngle + endAngle) / 2;
  const visualAngle = normalizeAngle(midAngle + rotationRad);
  const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
  const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);

  const totalHeight = layout.lines.length * layout.lineHeight;
  const startY = -totalHeight / 2 + layout.lineHeight * 0.7;

  return (
    <text
      transform={`translate(${cx}, ${cy}) rotate(${textRotDeg})`}
      textAnchor="middle"
      fill={color}
      fontSize={layout.fontSize}
      fontWeight={600}
      fontFamily="system-ui, sans-serif"
      style={{ pointerEvents: 'none' }}
    >
      {layout.lines.map((line, i) => (
        <tspan key={i} x={0} dy={i === 0 ? startY : layout.lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
};
