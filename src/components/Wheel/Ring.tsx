import React, { useMemo } from 'react';
import { Cell } from './Cell';
import { computeUniformFontSize } from './utils/textLayout';
import { resolveStyle } from './utils/styles';
import type { SegmentData, CellEvent, Styles, ResolvedCellStyle } from '../../types';

type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';

interface RingProps {
  segments: SegmentData[];
  innerR: number;
  outerR: number;
  ringName: RingName;
  styles: Styles;
  rotationRad: number;
  measure: (text: string, fontSize: number) => number;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
  showText?: boolean;
}

export const Ring: React.FC<RingProps> = ({
  segments, innerR, outerR, ringName, styles, rotationRad, measure, onClick, onPointerEnter, onPointerLeave, showText = true
}) => {
  const cellRadialHeight = outerR - innerR;
  const cellAngle = segments.length > 0 ? segments[0].endAngle - segments[0].startAngle : 0;

  const resolvedStyles = useMemo((): ResolvedCellStyle[] =>
    segments.map(seg => resolveStyle(styles, ringName, cellRadialHeight, seg.cellStyle)),
    [segments, styles, ringName, cellRadialHeight]
  );

  const baseFontSize = resolvedStyles.length > 0 ? resolvedStyles[0].fontSize : 12;
  const basePadding = resolvedStyles.length > 0 ? resolvedStyles[0].padding / cellRadialHeight : 0.05;

  const uniformFontSize = useMemo(() => {
    if (segments.length === 0) return baseFontSize;
    const texts = segments.map(s => s.fullText).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    return computeUniformFontSize(texts, { innerR, outerR, cellAngle, baseFontSize, padding: basePadding, measure });
  }, [segments, innerR, outerR, cellAngle, baseFontSize, basePadding, measure]);

  return (
    <g>
      {segments.map((segment, i) => (
        <Cell
          key={segment.segmentId}
          segment={segment}
          innerR={innerR}
          outerR={outerR}
          style={resolvedStyles[i]}
          rotationRad={rotationRad}
          fontSize={uniformFontSize}
          onClick={onClick}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          showText={showText}
        />
      ))}
    </g>
  );
};
