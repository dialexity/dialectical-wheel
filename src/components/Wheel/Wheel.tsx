import { useMemo } from 'react';
import { Ring } from './Ring';
import { SynthesisRing } from './SynthesisRing';
import { CycleRing } from './CycleRing';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformPerspectives } from './utils/dataTransform';
import { DEFAULT_STYLES } from './utils/styles';
import { RADII } from './utils/geometry';
import type { WheelProps, Styles, CSSValue, ClickedCell } from '../../types';

function mergeStyles(user?: Partial<Styles>): Styles {
  if (!user) return DEFAULT_STYLES;
  return {
    ...DEFAULT_STYLES,
    ...user,
    border: { ...DEFAULT_STYLES.border, ...user.border } as { width: CSSValue; color: string },
    thead: { ...DEFAULT_STYLES.thead, ...user.thead },
    tbody: {
      ...DEFAULT_STYLES.tbody,
      ...user.tbody,
      positive: { ...DEFAULT_STYLES.tbody?.positive, ...user.tbody?.positive },
      negative: { ...DEFAULT_STYLES.tbody?.negative, ...user.tbody?.negative },
      neutral: { ...DEFAULT_STYLES.tbody?.neutral, ...user.tbody?.neutral },
      synthesis: { ...DEFAULT_STYLES.tbody?.synthesis, ...user.tbody?.synthesis },
    },
  };
}

export default function Wheel({
  perspectives,
  segmentOrder,
  isWhiteOutside = false,
  styles: userStyles,
  css,
  onTopSegmentChange,
  onClickedCellChange,
  debug = false,
}: WheelProps) {
  const styles = useMemo(() => mergeStyles(userStyles), [userStyles]);

  const measure = useTextMeasure();
  const ringData = useMemo(
    () => transformPerspectives(perspectives, segmentOrder),
    [perspectives, segmentOrder]
  );

  const segmentIds = useMemo(() => ringData.neutral.map(s => s.segmentId), [ringData]);
  const { rotationDeg, rotationRad, isDragging, svgRef, pointerHandlers } = useRotation({
    onTopSegmentChange,
    segmentIds,
  });

  const outerRing: 'neutral' | 'negative' = isWhiteOutside ? 'neutral' : 'negative';
  const middleRing: 'neutral' | 'negative' = isWhiteOutside ? 'negative' : 'neutral';

  const handleCellClick = (cell: ClickedCell) => {
    if (onClickedCellChange) onClickedCellChange(cell);
  };

  return (
    <div style={{ background: 'white', borderRadius: 8, ...css }}>
      <svg
        ref={svgRef}
        viewBox="-250 -250 500 500"
        style={{ width: '100%', height: 'auto', touchAction: 'none' }}
        {...pointerHandlers}
      >
        <g
          transform={`rotate(${rotationDeg})`}
          style={{ transition: isDragging ? 'none' : 'transform 300ms ease-out' }}
        >
          <Ring
            segments={ringData[outerRing]}
            innerR={RADII.outerStart}
            outerR={RADII.outerEnd}
            ringName={outerRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            onClick={handleCellClick}
          />
          <Ring
            segments={ringData[middleRing]}
            innerR={RADII.middleStart}
            outerR={RADII.middleEnd}
            ringName={middleRing}
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            onClick={handleCellClick}
          />
          <Ring
            segments={ringData.positive}
            innerR={RADII.innerStart}
            outerR={RADII.innerEnd}
            ringName="positive"
            styles={styles}
            rotationRad={rotationRad}
            measure={measure}
            onClick={handleCellClick}
          />
          <SynthesisRing styles={styles} />
          <CycleRing
            segments={ringData.invisible}
            radius={(RADII.cycleStart + RADII.cycleEnd) / 2}
            rotationRad={rotationRad}
            styles={styles}
          />
        </g>
      </svg>
      {debug && (
        <div style={{ marginTop: 8, padding: 8, background: '#f8f9fa', borderRadius: 4, fontSize: 12, color: '#666' }}>
          {perspectives.length} perspectives, {segmentIds.length} segments, rotation: {rotationDeg.toFixed(1)}°
        </div>
      )}
    </div>
  );
}
