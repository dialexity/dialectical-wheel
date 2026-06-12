import React, { useMemo } from 'react';
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
  padding: number;
  textBias: number;
  strokeWidth: number;
  strokeColor: string;
  onClick?: (cell: CellInfo) => void;
  showText?: boolean;
}

export const ArcCell: React.FC<ArcCellProps> = ({
  slice, innerR, outerR, fillColor, textColor, rotationRad, measure, baseFontSize, padding, textBias, strokeWidth, strokeColor, onClick, showText = true
}) => {
  const clipId = useMemo(
    () => `dw-${slice.polarity}-${slice.unitId}-${innerR}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    [slice.polarity, slice.unitId, innerR]
  );
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
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path
        d={path}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      {showText && slice.fullText && (
        <g clipPath={`url(#${clipId})`}>
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
            padding={padding}
            textBias={textBias}
          />
        </g>
      )}
    </g>
  );
};
