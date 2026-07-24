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
  maxFontSize?: number;
  // Balance sizing: a single font is solved globally across body rings and
  // forced here, bypassing this ring's own fit search. The bands were sized so
  // this font fits, so no per-ring shrink is needed.
  forcedFontSize?: number;
}

// Text sitting at a band's true radial midpoint reads as shifted OUTWARD,
// because each cell is an arc-bounded wedge: the sharper inner arc opens a
// larger empty void toward the core than the outer arc does toward the rim, so
// the eye balances against more inner-side emptiness. A small inward nudge
// (negative bias moves `midR` toward the core) optically re-centers it.
const OPTICAL_INWARD_BIAS = -0.04;

export function computeTextBias(ringName: RingName, perspectiveCount: number): number {
  let bias = OPTICAL_INWARD_BIAS;
  // The positive (inner) ring sits at the narrowest radius; at higher
  // perspective counts its wedge tapers so hard that text must be pushed
  // OUTWARD to land on the wider lines and keep its font. That fit-driven
  // outward term composes with (partially cancels) the optical inward nudge.
  if (ringName === 'positive' && perspectiveCount === 3) bias += 0.10;
  if (ringName === 'positive' && perspectiveCount >= 4) bias += 0.15;
  return bias;
}

export const Ring: React.FC<RingProps> = ({
  segments, innerR, outerR, ringName, ringNumber, rowGroup, styles, rotationRad, measure, perspectiveCount, hoveredSegmentId, hoveredPerspectiveIdx, selectedPerspectiveIdx, focusAnimatingIdx, onClick, onPointerEnter, onPointerLeave, showText = true, headerBehavior, maxFontSize, forcedFontSize
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

  // Header mode: text sits in the lower 65% of the merged neutral+cycle cell
  // (clears the centered cycle label above). Its width, though, may reach out
  // toward the true arc — but not all the way, or wide top lines fan their
  // corners into the direction arrows at the cell's outer corners. Cap the
  // width arc at 85% of cell height: enough to grow the font into the angular
  // gap between label and arrows, short of the arrows themselves.
  const textOuterR = headerBehavior ? innerR + (outerR - innerR) * 0.65 : outerR;
  const textWidthArcR = headerBehavior ? innerR + (outerR - innerR) * 0.85 : outerR;

  const uniformFontSize = useMemo(() => {
    if (forcedFontSize != null) return forcedFontSize;
    if (segments.length === 0) return baseFontSize;
    const texts = segments.map(s => s.fullText).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    const startFs = maxFontSize != null ? Math.min(baseFontSize, maxFontSize) : baseFontSize;
    return computeUniformFontSize(texts, { innerR, outerR, placementOuterR: textOuterR, widthArcR: textWidthArcR, cellAngle, baseFontSize: startFs, padding: basePadding, measure, textBias, ring: ringNumber });
  }, [forcedFontSize, segments, innerR, outerR, textOuterR, textWidthArcR, cellAngle, baseFontSize, basePadding, measure, textBias, ringNumber, maxFontSize]);

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
              textWidthArcR={headerBehavior ? textWidthArcR : undefined}
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
              textWidthArcR={headerBehavior ? textWidthArcR : undefined}
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
