import React, { useMemo } from 'react';
import { describeArc } from './utils/geometry';
import { CellText } from './CellText';
import type { SegmentData, ClickedCell, ResolvedCellStyle } from '../../types';

interface CellProps {
  segment: SegmentData;
  innerR: number;
  outerR: number;
  style: ResolvedCellStyle;
  rotationRad: number;
  fontSize: number;
  onClick?: (cell: ClickedCell) => void;
  showText?: boolean;
}

export const Cell: React.FC<CellProps> = ({
  segment, innerR, outerR, style, rotationRad, fontSize, onClick, showText = true
}) => {
  const clipId = useMemo(
    () => `dw-${segment.polarity}-${segment.segmentId}-${innerR}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    [segment.polarity, segment.segmentId, innerR]
  );
  const path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);

  const handleClick = () => {
    if (onClick) {
      onClick({
        segmentId: segment.segmentId,
        polarity: segment.polarity,
        statement: segment.fullText,
        pairWith: segment.pairWith,
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
        fill={style.background}
        stroke={style.borderColor}
        strokeWidth={style.borderWidth}
      />
      {showText && segment.fullText && (
        <g clipPath={`url(#${clipId})`}>
          <CellText
            innerR={innerR}
            outerR={outerR}
            startAngle={segment.startAngle}
            endAngle={segment.endAngle}
            text={segment.fullText}
            color={style.color}
            rotationRad={rotationRad}
            fontSize={fontSize}
            padding={style.padding}
            topMargin={style.topMargin}
          />
        </g>
      )}
    </g>
  );
};
