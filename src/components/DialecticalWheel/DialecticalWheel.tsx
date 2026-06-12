import { useMemo } from 'react';
import { Ring } from './Ring';
import { Hub } from './Hub';
import { CoordinateLabels } from './CoordinateLabels';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformWisdomUnits } from './utils/dataTransform';
import { RADII } from './utils/geometry';
import type { DialecticalWheelProps, Styles, RingStyle, CellInfo } from '../../types';

const DEFAULT_STYLES: Styles = {
  ringColors: { negative: '#F9C6CC', neutral: '#ffffff', positive: '#C6E5B3' },
  textColors: { negative: '#8b1538', neutral: '#333333', positive: '#2d5a2d', coordinates: '#333333' },
  hubColor: '#ffff7a',
  maxFontSize: 14,
  ringStyles: {
    positive: { padding: 0.05, textBias: 0.25 },
    negative: { padding: 0.05, textBias: 0 },
    neutral: { padding: 0.05, textBias: 0 },
  },
  coordinateLabelSize: 12,
  strokeWidth: 1,
  strokeColor: '#000',
};

function resolveRingStyle(s: Styles, ring: 'positive' | 'negative' | 'neutral'): RingStyle {
  const user = s.ringStyles?.[ring];
  return {
    maxFontSize: user?.maxFontSize ?? s.maxFontSize,
    padding: user?.padding ?? 0.05,
    textBias: user?.textBias ?? 0,
  };
}

export default function DialecticalWheel({
  wisdomUnits,
  componentOrder,
  isWhiteOutside = false,
  styles: userStyles,
  css,
  onTopSliceChange,
  onClickedCellChange,
  debug = false,
}: DialecticalWheelProps) {
  const s: Styles = useMemo(
    () => ({
      ...DEFAULT_STYLES,
      ...userStyles,
      ringColors: { ...DEFAULT_STYLES.ringColors, ...userStyles?.ringColors },
      textColors: { ...DEFAULT_STYLES.textColors, ...userStyles?.textColors },
      ringStyles: {
        positive: { ...DEFAULT_STYLES.ringStyles!.positive, ...userStyles?.ringStyles?.positive },
        negative: { ...DEFAULT_STYLES.ringStyles!.negative, ...userStyles?.ringStyles?.negative },
        neutral: { ...DEFAULT_STYLES.ringStyles!.neutral, ...userStyles?.ringStyles?.neutral },
      },
    }),
    [userStyles]
  );

  const measure = useTextMeasure();
  const ringData = useMemo(
    () => transformWisdomUnits(wisdomUnits, componentOrder),
    [wisdomUnits, componentOrder]
  );

  const sliceIds = useMemo(() => ringData.neutral.map(s => s.unitId), [ringData]);
  const { rotationDeg, rotationRad, isDragging, svgRef, pointerHandlers } = useRotation({
    onTopSliceChange,
    sliceIds,
  });

  const outerSemantic: 'neutral' | 'negative' = isWhiteOutside ? 'neutral' : 'negative';
  const middleSemantic: 'neutral' | 'negative' = isWhiteOutside ? 'negative' : 'neutral';

  const outerFill = s.ringColors[outerSemantic];
  const outerText = s.textColors[outerSemantic];
  const middleFill = s.ringColors[middleSemantic];
  const middleText = s.textColors[middleSemantic];

  const outerRingStyle = resolveRingStyle(s, outerSemantic);
  const middleRingStyle = resolveRingStyle(s, middleSemantic);
  const innerRingStyle = resolveRingStyle(s, 'positive');

  const handleCellClick = (cell: CellInfo) => {
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
            slices={ringData[outerSemantic]}
            innerR={RADII.outerStart}
            outerR={RADII.outerEnd}
            fillColor={outerFill}
            textColor={outerText}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={outerRingStyle.maxFontSize}
            padding={outerRingStyle.padding}
            textBias={outerRingStyle.textBias}
            strokeWidth={s.strokeWidth}
            strokeColor={s.strokeColor}
            onClick={handleCellClick}
          />
          <Ring
            slices={ringData[middleSemantic]}
            innerR={RADII.middleStart}
            outerR={RADII.middleEnd}
            fillColor={middleFill}
            textColor={middleText}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={middleRingStyle.maxFontSize}
            padding={middleRingStyle.padding}
            textBias={middleRingStyle.textBias}
            strokeWidth={s.strokeWidth}
            strokeColor={s.strokeColor}
            onClick={handleCellClick}
          />
          <Ring
            slices={ringData.positive}
            innerR={RADII.innerStart}
            outerR={RADII.innerEnd}
            fillColor={s.ringColors.positive}
            textColor={s.textColors.positive}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={innerRingStyle.maxFontSize}
            padding={innerRingStyle.padding}
            textBias={innerRingStyle.textBias}
            strokeWidth={s.strokeWidth}
            strokeColor={s.strokeColor}
            onClick={handleCellClick}
          />
          <Hub color={s.hubColor} />
          <CoordinateLabels
            slices={ringData.invisible}
            radius={(RADII.invisibleStart + RADII.invisibleEnd) / 2}
            rotationRad={rotationRad}
            color={s.textColors.coordinates}
            fontSize={s.coordinateLabelSize}
          />
        </g>
      </svg>
      {debug && (
        <div style={{ marginTop: 8, padding: 8, background: '#f8f9fa', borderRadius: 4, fontSize: 12, color: '#666' }}>
          {wisdomUnits.length} wisdom units, {sliceIds.length} slices, rotation: {rotationDeg.toFixed(1)}°
        </div>
      )}
    </div>
  );
}
