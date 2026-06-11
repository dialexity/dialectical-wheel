import React from 'react';
import { describeArc } from './utils/geometry';
import { CellText } from './CellText';
import type { SliceData, CellInfo } from '../../types';

interface ArcCellProps {
  slice: SliceData;
  innerR: number;
  outerR: number;
  fillColor: string;
  textColor: string;
  rotationRad: number;
  measure: (text: string, fontSize: number) => number;
  baseFontSize: number;
  onClick?: (cell: CellInfo) => void;
  showText?: boolean;
}

export const ArcCell: React.FC<ArcCellProps> = ({
  slice, innerR, outerR, fillColor, textColor, rotationRad, measure, baseFontSize, onClick, showText = true
}) => {
  const path = describeArc(innerR, outerR, slice.startAngle, slice.endAngle);

  const handleClick = () => {
    if (onClick) {
      onClick({
        unitId: slice.unitId,
        polarity: slice.polarity,
        statement: slice.fullText,
        pairWith: slice.pairWith,
      });
    }
  };

  return (
    <g onClick={handleClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <path
        d={path}
        fill={fillColor}
        stroke="#000"
        strokeWidth={1}
      />
      {showText && slice.fullText && (
        <CellText
          innerR={innerR}
          outerR={outerR}
          startAngle={slice.startAngle}
          endAngle={slice.endAngle}
          text={slice.fullText}
          color={textColor}
          rotationRad={rotationRad}
          measure={measure}
          baseFontSize={baseFontSize}
        />
      )}
    </g>
  );
};
