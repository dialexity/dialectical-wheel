import React, { useMemo } from 'react';
import { ArcCell } from './ArcCell';
import { computeUniformFontSize } from './utils/textLayout';
import type { SliceData, CellInfo } from '../../types';

interface RingProps {
  slices: SliceData[];
  innerR: number;
  outerR: number;
  fillColor: string;
  textColor: string;
  rotationRad: number;
  measure: (text: string, fontSize: number) => number;
  baseFontSize: number;
  padding: number;
  textBias: number;
  strokeWidth: number;
  strokeColor: string;
  onClick?: (cell: CellInfo) => void;
  showText?: boolean;
}

export const Ring: React.FC<RingProps> = ({
  slices, innerR, outerR, fillColor, textColor, rotationRad, measure, baseFontSize, padding, textBias, strokeWidth, strokeColor, onClick, showText = true
}) => {
  const cellAngle = slices.length > 0 ? slices[0].endAngle - slices[0].startAngle : 0;

  const uniformFontSize = useMemo(() => {
    if (slices.length === 0) return baseFontSize;
    const texts = slices.map(s => s.fullText).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    return computeUniformFontSize(texts, { innerR, outerR, cellAngle, baseFontSize, padding, measure });
  }, [slices, innerR, outerR, cellAngle, baseFontSize, padding, measure]);

  return (
    <g>
      {slices.map(slice => (
        <ArcCell
          key={slice.unitId}
          slice={slice}
          innerR={innerR}
          outerR={outerR}
          fillColor={fillColor}
          textColor={textColor}
          rotationRad={rotationRad}
          measure={measure}
          baseFontSize={uniformFontSize}
          padding={padding}
          textBias={textBias}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          onClick={onClick}
          showText={showText}
        />
      ))}
    </g>
  );
};
