import React from 'react';
import { ArcCell } from './ArcCell';
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
  onClick?: (cell: CellInfo) => void;
  showText?: boolean;
}

export const Ring: React.FC<RingProps> = ({
  slices, innerR, outerR, fillColor, textColor, rotationRad, measure, baseFontSize, onClick, showText = true
}) => (
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
        baseFontSize={baseFontSize}
        onClick={onClick}
        showText={showText}
      />
    ))}
  </g>
);
