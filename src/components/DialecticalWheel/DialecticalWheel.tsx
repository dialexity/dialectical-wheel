import { useMemo } from 'react';
import { Ring } from './Ring';
import { Hub } from './Hub';
import { CoordinateLabels } from './CoordinateLabels';
import { useTextMeasure } from './hooks/useTextMeasure';
import { useRotation } from './hooks/useRotation';
import { transformWisdomUnits } from './utils/dataTransform';
import { RADII } from './utils/geometry';
import type { DialecticalWheelProps, CellInfo } from '../../types';

const DEFAULT_COLORS = {
  userRingColors: { negative: '#F9C6CC', neutral: '#ffffff', positive: '#C6E5B3' },
  userTextColors: { negative: '#8b1538', neutral: '#333333', positive: '#2d5a2d', coordinates: '#333333' },
  userHubColor: '#ffff7a',
};

export default function DialecticalWheel({
  wisdomUnits,
  componentOrder,
  isWhiteOutside = false,
  colors = DEFAULT_COLORS,
  style,
  onTopSliceChange,
  onClickedCellChange,
  debug = false,
}: DialecticalWheelProps) {
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

  const outerSemantic = isWhiteOutside ? 'neutral' : 'negative';
  const middleSemantic = isWhiteOutside ? 'negative' : 'neutral';

  const outerFill = isWhiteOutside ? colors.userRingColors.neutral : colors.userRingColors.negative;
  const outerText = isWhiteOutside ? colors.userTextColors.neutral : colors.userTextColors.negative;
  const middleFill = isWhiteOutside ? colors.userRingColors.negative : colors.userRingColors.neutral;
  const middleText = isWhiteOutside ? colors.userTextColors.negative : colors.userTextColors.neutral;

  const handleCellClick = (cell: CellInfo) => {
    if (onClickedCellChange) onClickedCellChange(cell);
  };

  return (
    <div style={{ background: 'white', borderRadius: 8, ...style }}>
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
          {/* Outer ring */}
          <Ring
            slices={ringData[outerSemantic]}
            innerR={RADII.outerStart}
            outerR={RADII.outerEnd}
            fillColor={outerFill}
            textColor={outerText}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={10}
            onClick={handleCellClick}
          />
          {/* Middle ring */}
          <Ring
            slices={ringData[middleSemantic]}
            innerR={RADII.middleStart}
            outerR={RADII.middleEnd}
            fillColor={middleFill}
            textColor={middleText}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={10}
            onClick={handleCellClick}
          />
          {/* Inner ring (positive/green) */}
          <Ring
            slices={ringData.positive}
            innerR={RADII.innerStart}
            outerR={RADII.innerEnd}
            fillColor={colors.userRingColors.positive}
            textColor={colors.userTextColors.positive}
            rotationRad={rotationRad}
            measure={measure}
            baseFontSize={10}
            onClick={handleCellClick}
          />
          {/* Hub */}
          <Hub color={colors.userHubColor} />
          {/* Coordinate labels in invisible ring area */}
          <CoordinateLabels
            slices={ringData.invisible}
            radius={(RADII.invisibleStart + RADII.invisibleEnd) / 2}
            rotationRad={rotationRad}
            color={colors.userTextColors.coordinates}
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
