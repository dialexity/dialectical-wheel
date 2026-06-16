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
  hoveredSegmentId?: string | null;
  selectedPerspectiveIdx?: number | null;
  focusAnimatingIdx?: number | null;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
  showText?: boolean;
}

export const Ring: React.FC<RingProps> = ({
  segments, innerR, outerR, ringName, styles, rotationRad, measure, hoveredSegmentId, selectedPerspectiveIdx, focusAnimatingIdx, onClick, onPointerEnter, onPointerLeave, showText = true
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

  const isElevated = (segment: SegmentData) =>
    segment.segmentId === hoveredSegmentId || segment.perspectiveIndex === selectedPerspectiveIdx;

  const cellOpacity = (segment: SegmentData) =>
    focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx ? 0 : 1;

  return (
    <g>
      {segments.map((segment, i) =>
        isElevated(segment) ? null : (
          <g
            key={segment.segmentId}
            opacity={cellOpacity(segment)}
            style={{ transition: 'opacity 200ms ease-in' }}
          >
            <Cell
              segment={segment}
              innerR={innerR}
              outerR={outerR}
              style={resolvedStyles[i]}
              rotationRad={rotationRad}
              fontSize={uniformFontSize}
              hovered={false}
              onClick={onClick}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              showText={showText}
            />
          </g>
        )
      )}
      {segments.map((segment, i) =>
        !isElevated(segment) ? null : (
          <g
            key={segment.segmentId}
            opacity={cellOpacity(segment)}
            style={{ transition: 'opacity 200ms ease-in' }}
          >
            <Cell
              segment={segment}
              innerR={innerR}
              outerR={outerR}
              style={resolvedStyles[i]}
              rotationRad={rotationRad}
              fontSize={uniformFontSize}
              hovered={segment.segmentId === hoveredSegmentId}
              onClick={onClick}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              showText={showText}
            />
          </g>
        )
      )}
    </g>
  );
};
