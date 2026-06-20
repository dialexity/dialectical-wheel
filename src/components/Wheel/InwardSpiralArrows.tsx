import React, { useMemo } from 'react';
import { polarToCartesian } from './utils/geometry';
import type { CSSValue, SegmentData, Styles, WheelDirection } from '../../types';
import type { Radii } from './utils/geometry';

function resolveCSSValue(value: CSSValue | undefined, relativeTo: number, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const str = value.trim();
  if (str.endsWith('%')) return (parseFloat(str) / 100) * relativeTo;
  if (str.endsWith('px')) return parseFloat(str);
  return parseFloat(str) || fallback;
}

export interface SpiralArrowsProps {
  segments: {
    negative: SegmentData[];
    positive: SegmentData[];
  };
  radii: Radii;
  neutralOutside: boolean;
  direction: WheelDirection;
  styles: Styles;
  hoveredPerspectiveIdx?: number | null;
  selectedPerspectiveIdx?: number | null;
  focusAnimatingIdx?: number | null;
}

export const InwardSpiralArrows: React.FC<SpiralArrowsProps> = ({
  segments, radii, neutralOutside, direction, styles, hoveredPerspectiveIdx, selectedPerspectiveIdx, focusAnimatingIdx,
}) => {
  const arrows = useMemo(() => {
    const neg = segments.negative.filter(s => s.perspectiveIndex !== -1);
    const pos = segments.positive.filter(s => s.perspectiveIndex !== -1);
    if (neg.length === 0 || pos.length === 0 || neg.length === 1) return [];

    const cw = direction !== 'left';

    // Negative ring boundaries (outer = red/pink ring)
    const negInner = neutralOutside ? radii.middleStart : radii.outerStart;
    const negOuter = neutralOutside ? radii.middleEnd : radii.outerEnd;
    // Positive ring boundaries (inner = green ring)
    const posInner = radii.innerStart;
    const posOuter = radii.innerEnd;

    const arrowSize = (negOuter - negInner) * 0.15;

    // Arrow spans from inside neg ring to just inside pos ring corner
    // Start: 30% inward from neg inner edge
    const startR = negInner + (negOuter - negInner) * 0.3;
    // End: just inside the outer edge of the pos cell (15% inward)
    const endR = posOuter - (posOuter - posInner) * 0.15;
    // Control point at the boundary between the two rings
    const cpR = (negInner + posOuter) / 2;

    const result: { fromIdx: number; toIdx: number; path: string; head: string }[] = [];

    for (let i = 0; i < neg.length; i++) {
      const nextIdx = cw ? (i + 1) % pos.length : (i - 1 + pos.length) % pos.length;

      const negSeg = neg[i];
      const posSeg = pos[nextIdx];

      // Start angle: leading edge of neg cell (where it borders the next segment)
      const negSpan = negSeg.endAngle - negSeg.startAngle;
      const sAngle = cw
        ? negSeg.endAngle - negSpan * 0.1
        : negSeg.startAngle + negSpan * 0.1;

      // End angle: trailing edge of pos cell (where it borders the previous segment)
      const posSpan = posSeg.endAngle - posSeg.startAngle;
      const eAngle = cw
        ? posSeg.startAngle + posSpan * 0.1
        : posSeg.endAngle - posSpan * 0.1;

      const [sx, sy] = polarToCartesian(startR, sAngle);
      const [ex, ey] = polarToCartesian(endR, eAngle);

      // Angular midpoint — go in the direction of travel (CW or CCW)
      let angleDelta = cw
        ? ((eAngle - sAngle + 2 * Math.PI) % (2 * Math.PI))
        : ((sAngle - eAngle + 2 * Math.PI) % (2 * Math.PI));
      const cpAngle = cw
        ? sAngle + angleDelta * 0.5
        : sAngle - angleDelta * 0.5;

      const [cx, cy] = polarToCartesian(cpR, cpAngle);

      const path = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;

      // Open chevron arrowhead (matching causality arrows)
      // Tangent at t=1: tangent = 2*(E - CP)
      const tx = 2 * (ex - cx);
      const ty = 2 * (ey - cy);
      const tLen = Math.sqrt(tx * tx + ty * ty);
      const ux = tx / tLen;
      const uy = ty / tLen;
      const px = -uy;
      const py = ux;
      const hl = arrowSize * 0.35;
      const h1x = ex - ux * hl + px * hl * 0.5;
      const h1y = ey - uy * hl + py * hl * 0.5;
      const h2x = ex - ux * hl - px * hl * 0.5;
      const h2y = ey - uy * hl - py * hl * 0.5;
      const head = `M${h1x},${h1y} L${ex},${ey} L${h2x},${h2y}`;

      result.push({ fromIdx: negSeg.perspectiveIndex, toIdx: posSeg.perspectiveIndex, path, head });
    }

    return result;
  }, [segments, radii, neutralOutside, direction]);

  const negCellHeight = neutralOutside
    ? radii.middleEnd - radii.middleStart
    : radii.outerEnd - radii.outerStart;
  const spiralColor = styles.spiralArrow?.color ?? '#333';
  const spiralWidth = resolveCSSValue(styles.spiralArrow?.width, negCellHeight, negCellHeight * 0.03);

  const dimUnfocused = styles.dimUnfocused ?? 0.5;

  const arrowOpacity = (fromIdx: number, toIdx: number) => {
    if (focusAnimatingIdx != null) {
      if (fromIdx !== focusAnimatingIdx && toIdx !== focusAnimatingIdx) return 0;
    }
    if (selectedPerspectiveIdx != null) {
      if (fromIdx !== selectedPerspectiveIdx && toIdx !== selectedPerspectiveIdx
        && fromIdx !== hoveredPerspectiveIdx && toIdx !== hoveredPerspectiveIdx) {
        return 1 - dimUnfocused;
      }
    }
    return 1;
  };

  return (
    <g>
      {arrows.map((arrow, i) => (
        <g
          key={i}
          opacity={arrowOpacity(arrow.fromIdx, arrow.toIdx)}
          style={{ transition: 'opacity 200ms ease-in' }}
        >
          <path
            d={arrow.path}
            fill="none"
            stroke={spiralColor}
            strokeWidth={spiralWidth}
            strokeLinecap="round"
          />
          <path
            d={arrow.head}
            fill="none"
            stroke={spiralColor}
            strokeWidth={spiralWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </g>
  );
};
