import React, { useMemo } from 'react';
import { describeArc } from './utils/geometry';
import type { Radii } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, Styles, StyleContext } from '../../types';

interface SynthesisRingProps {
  styles: Styles;
  radii: Radii;
  segments: SegmentData[];
}

export const SynthesisRing: React.FC<SynthesisRingProps> = ({ styles, radii, segments }) => {
  const cellRadialHeight = radii.innerEnd - radii.innerStart;

  const resolvedStyles = useMemo(() =>
    segments.map(seg => {
      const ctx: StyleContext = {
        rowGroup: 'tfoot',
        ring: 'synthesis',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex,
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    }),
    [segments, styles, cellRadialHeight]
  );

  const allSameBackground = resolvedStyles.length > 0 &&
    resolvedStyles.every(s => s.background === resolvedStyles[0].background);

  if (segments.length === 0 || allSameBackground) {
    const resolved = resolvedStyles[0] ?? resolveStyle(styles, {
      rowGroup: 'tfoot', ring: 'synthesis', colType: 'thesis', perspectiveIndex: 0,
    }, cellRadialHeight);
    return (
      <circle
        cx={0}
        cy={0}
        r={radii.synthesis}
        fill={resolved.background}
        stroke={resolved.borderColor}
        strokeWidth={resolved.borderWidth}
      />
    );
  }

  return (
    <g>
      {segments.map((seg, i) => {
        if (seg.perspectiveIndex === -1) return null;
        const s = resolvedStyles[i];
        const path = describeArc(0, radii.synthesis, seg.startAngle, seg.endAngle);
        return (
          <path
            key={seg.segmentId}
            d={path}
            fill={s.background}
            stroke={s.borderColor}
            strokeWidth={s.borderWidth}
          />
        );
      })}
    </g>
  );
};
