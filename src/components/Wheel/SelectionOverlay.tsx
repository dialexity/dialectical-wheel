import React from 'react';
import { describeArc } from './utils/geometry';
import type { Radii } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { SegmentData, Styles, HeaderRing } from '../../types';

interface SelectionOverlayProps {
  segments: SegmentData[];
  selectedPerspectiveIdx: number;
  headerRing: HeaderRing;
  styles: Styles;
  radii: Radii;
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
  segments, selectedPerspectiveIdx, headerRing, styles, radii
}) => {
  const selected = segments.filter(s => s.perspectiveIndex === selectedPerspectiveIdx);
  if (selected.length === 0) return null;

  const style = resolveStyle(styles, 'neutral', radii.outerEnd - radii.innerStart);

  return (
    <g style={{ pointerEvents: 'none' }}>
      {selected.map(seg => {
        const isThesis = !seg.segmentId.startsWith('A');
        const includeHeader = headerRing === 'wheel' || (headerRing === 'cycle' && isThesis);
        const outerR = includeHeader ? radii.cycleEnd : radii.outerEnd;
        const path = describeArc(radii.innerStart, outerR, seg.startAngle, seg.endAngle);

        return (
          <path
            key={seg.segmentId}
            d={path}
            fill="none"
            stroke={style.selectedBorderColor}
            strokeWidth={style.selectedBorderWidth}
          />
        );
      })}
    </g>
  );
};
