import React, { useMemo } from 'react';
import { Cell } from './Cell';
import { computeUniformFontSize } from './utils/textLayout';
import type { RingNumber } from './utils/textLayout';
import { resolveStyle } from './utils/styles';
import type { SegmentData, CellEvent, Styles, StyleContext, ResolvedCellStyle } from '../../types';

type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';

interface RingProps {
  segments: SegmentData[];
  innerR: number;
  outerR: number;
  ringName: RingName;
  ringNumber: RingNumber;
  rowGroup: 'thead' | 'tbody' | 'tfoot';
  styles: Styles;
  rotationRad: number;
  measure: (text: string, fontSize: number) => number;
  perspectiveCount: number;
  hoveredSegmentId?: string | null;
  hoveredPerspectiveIdx?: number | null;
  selectedPerspectiveIdx?: number | null;
  focusAnimatingIdx?: number | null;
  onClick?: (event: CellEvent) => void;
  onPointerEnter?: (event: CellEvent) => void;
  onPointerLeave?: (event: CellEvent) => void;
  showText?: boolean;
  headerBehavior?: boolean;
}

function computeTextBias(ringName: RingName, perspectiveCount: number): number {
  if (ringName === 'positive' && perspectiveCount === 3) return 0.10;
  if (ringName === 'positive' && perspectiveCount >= 4) return 0.15;
  return 0;
}

export const Ring: React.FC<RingProps> = ({
  segments, innerR, outerR, ringName, ringNumber, rowGroup, styles, rotationRad, measure, perspectiveCount, hoveredSegmentId, hoveredPerspectiveIdx, selectedPerspectiveIdx, focusAnimatingIdx, onClick, onPointerEnter, onPointerLeave, showText = true, headerBehavior
}) => {
  const cellRadialHeight = outerR - innerR;
  const cellAngle = segments.length > 0 ? segments[0].endAngle - segments[0].startAngle : 0;

  const resolvedStyles = useMemo((): ResolvedCellStyle[] =>
    segments.map(seg => {
      const ctx: StyleContext = {
        rowGroup,
        ring: ringName,
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex,
      };
      const s = resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
      if (headerBehavior) return { ...s, borderColor: 'transparent' };
      return s;
    }),
    [segments, styles, ringName, rowGroup, cellRadialHeight, headerBehavior]
  );

  const baseFontSize = resolvedStyles.length > 0 ? resolvedStyles[0].fontSize : 12;
  const basePadding = resolvedStyles.length > 0 ? resolvedStyles[0].padding / cellRadialHeight : 0.05;

  const textBias = computeTextBias(ringName, perspectiveCount);

  const textOuterR = headerBehavior ? innerR + (outerR - innerR) * 0.65 : outerR;

  const uniformFontSize = useMemo(() => {
    if (segments.length === 0) return baseFontSize;
    const texts = segments.map(s => s.fullText).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    return computeUniformFontSize(texts, { innerR, outerR: textOuterR, cellAngle, baseFontSize, padding: basePadding, measure, textBias, ring: ringNumber });
  }, [segments, innerR, textOuterR, cellAngle, baseFontSize, basePadding, measure, textBias, ringNumber]);

  const isSpacer = (segment: SegmentData) => segment.perspectiveIndex === -1;

  const isElevated = (segment: SegmentData) =>
    segment.segmentId === hoveredSegmentId || segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;

  const dimUnfocused = styles.dimUnfocused ?? 0.5;

  const cellOpacity = (segment: SegmentData) => {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null
      && segment.perspectiveIndex !== selectedPerspectiveIdx
      && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };

  return (
    <g>
      {segments.map((segment, i) =>
        isSpacer(segment) || isElevated(segment) ? null : (
          <g
            key={segment.segmentId}
            opacity={cellOpacity(segment)}
            style={{ transition: 'opacity 200ms ease-in' }}
          >
            <Cell
              segment={segment}
              innerR={innerR}
              outerR={outerR}
              textOuterR={headerBehavior ? textOuterR : undefined}
              style={resolvedStyles[i]}
              rotationRad={rotationRad}
              fontSize={uniformFontSize}
              textBias={textBias}
              ringNumber={ringNumber}
              measure={measure}
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
        isSpacer(segment) || !isElevated(segment) ? null : (
          <g
            key={segment.segmentId}
            opacity={cellOpacity(segment)}
            style={{ transition: 'opacity 200ms ease-in' }}
          >
            <Cell
              segment={segment}
              innerR={innerR}
              outerR={outerR}
              textOuterR={headerBehavior ? textOuterR : undefined}
              style={resolvedStyles[i]}
              rotationRad={rotationRad}
              fontSize={uniformFontSize}
              textBias={textBias}
              ringNumber={ringNumber}
              measure={measure}
              hovered={segment.segmentId === hoveredSegmentId || segment.perspectiveIndex === hoveredPerspectiveIdx}
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
