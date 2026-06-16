import React from 'react';
import { polarToCartesian, normalizeAngle } from './utils/geometry';

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
}

function chordWidth(r: number, halfAngle: number, cellHeight: number): number {
  const chord = 2 * r * Math.sin(halfAngle) * 0.9;
  return Math.min(chord, cellHeight * 1.4);
}

export const CellText: React.FC<CellTextProps> = ({
  innerR, outerR, startAngle, endAngle, text, color, rotationRad, fontSize, padding, textBias
}) => {
  const midAngle = (startAngle + endAngle) / 2;
  const halfAngle = (endAngle - startAngle) / 2;
  const cellHeight = outerR - innerR;
  const biasedR = (innerR + outerR) / 2 + textBias * cellHeight;
  const [cx, cy] = polarToCartesian(biasedR, midAngle);

  const visualAngle = normalizeAngle(midAngle + rotationRad);
  const needsFlip = visualAngle > Math.PI / 2 && visualAngle < (3 * Math.PI) / 2;
  const textRotDeg = (midAngle * 180) / Math.PI + (needsFlip ? 180 : 0);

  const boxHeight = (outerR - innerR) - padding * 2;
  const boxWidth = chordWidth(biasedR, halfAngle, cellHeight);

  return (
    <foreignObject
      x={cx - boxWidth / 2}
      y={cy - boxHeight / 2}
      width={boxWidth}
      height={boxHeight}
      transform={`rotate(${textRotDeg}, ${cx}, ${cy})`}
      style={{ pointerEvents: 'none', overflow: 'hidden' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize,
          fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          color,
          lineHeight: 1.2,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}
      >
        {text}
      </div>
    </foreignObject>
  );
};
