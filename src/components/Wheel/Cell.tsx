import React, { useMemo } from 'react';
import { describeArc } from './utils/geometry';
import { CellText } from './CellText';
import type { RingNumber } from './utils/textLayout';
import type { SegmentData, CellEvent, ResolvedCellStyle } from '../../types';

interface CellProps {
  segment: SegmentData;
  innerR: number;
  outerR: number;
  style: ResolvedCellStyle;
  rotationRad: number;
  fontSize: number;
  textBias: number;
  ringNumber: RingNumber;
  measure: (text: string, fontSize: number) => number;
  hovered?: boolean;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
  showText?: boolean;
}

export const Cell: React.FC<CellProps> = ({
  segment, innerR, outerR, style, rotationRad, fontSize, textBias, ringNumber, measure, hovered, onClick, onPointerEnter, onPointerLeave, showText = true
}) => {
  const clipId = useMemo(
    () => `dw-${segment.polarity}-${segment.segmentId}-${innerR}`.replace(/[^a-zA-Z0-9-]/g, '_'),
    [segment.polarity, segment.segmentId, innerR]
  );
  const path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);

  const cellEvent: CellEvent = useMemo(() => ({
    segmentId: segment.segmentId,
    polarity: segment.polarity,
    statement: segment.fullText,
    pairWith: segment.pairWith,
    perspectiveIndex: segment.perspectiveIndex,
  }), [segment.segmentId, segment.polarity, segment.fullText, segment.pairWith, segment.perspectiveIndex]);

  const handleClick = () => { if (onClick) onClick(cellEvent); };
  const handlePointerEnter = () => { if (onPointerEnter) onPointerEnter(cellEvent); };
  const handlePointerLeave = () => { if (onPointerLeave) onPointerLeave(cellEvent); };

  const interactive = onClick || onPointerEnter;

  return (
    <g
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path
        d={path}
        fill={style.background}
        stroke={hovered ? style.hoverBorderColor : style.borderColor}
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
            textBias={textBias}
            ringNumber={ringNumber}
            measure={measure}
          />
        </g>
      )}
    </g>
  );
};
