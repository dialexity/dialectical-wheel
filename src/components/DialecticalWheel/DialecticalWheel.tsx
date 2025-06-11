import React, { useMemo } from 'react';
import './DialecticalWheel.css';
import { defaultPairTexts } from '../../utils/SliceGenerator';
import { 
  useWheelSequence, 
  useWheelInteraction, 
  useWheelSlices, 
  useNodeConnections,
  SliceConfig,
  DetailedSlices,
  PairTexts 
} from './hooks';
import { WheelControls, WheelOverlays, RotationHints, SvgMarkers, SliceRenderer } from './components';
import { DIMENSIONS, COLORS, TYPOGRAPHY, LAYOUT, DEFAULTS } from './config/wheelConfig';

// Type definitions
interface DialecticalWheelProps {
  numPairs?: number;
  title?: string;
  centerLabel?: string;
  sliceSequence?: SliceConfig[] | null;
  fullSequence?: any[] | null; // Complete sequence from API (overrides sliceSequence)
  detailedSlices?: DetailedSlices;
  pairTexts?: PairTexts | null;
}

const DialecticalWheel: React.FC<DialecticalWheelProps> = ({ 
  numPairs = DEFAULTS.NUM_PAIRS, 
  title = DEFAULTS.TITLE,
  centerLabel = DEFAULTS.CENTER_LABEL,
  sliceSequence = null,
  fullSequence = null,
  detailedSlices = {},
  pairTexts = null
}) => {
  // Use our custom hooks
  const sequence = useWheelSequence(numPairs, sliceSequence);
  const interaction = useWheelInteraction();
  const slices = useWheelSlices(
    sequence.sequenceWithLabels,
    sequence.normalSliceAngle,
    sequence.focusedSliceAngle,
    sequence.unfocusedSliceAngle,
    interaction.rotation,
    interaction.setRotation,
    pairTexts,
    detailedSlices
  );
  const connections = useNodeConnections(
    slices.dynamicSlices,
    title,
    interaction.recordRef,
    interaction.rotation
  );

  // Log the sequence for debugging (like the original HTML)
  console.log(`Initialized ${title} wheel with sequence:`, sequence.sequenceWithLabels.map(s => s.label).join(', '));

  // Touch handlers for slice clicks
  const handleSliceTouchStart = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchStart(e, pairIndex);
  };

  const handleSliceTouchEnd = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchEnd(e, pairIndex);
  };

  return (
    <div className="dialectical-wheel-container">
      <div className="main-content" style={{ paddingTop: '0' }}>
        <WheelOverlays
          isZoomedToQ2={interaction.isZoomedToQ2}
          onToggleTopHalfZoom={interaction.toggleTopHalfZoom}
        />
        
        <div className="wheel-container">
          <svg 
            className="wheel-svg" 
            viewBox={LAYOUT.SVG_VIEWBOX}
            {...interaction.svgProps}
          >
            <g ref={interaction.recordRef} className="record">
              <SvgMarkers />
              
              <SliceRenderer
                dynamicSlices={slices.dynamicSlices}
                memoizedSliceData={slices.memoizedSliceData}
                handleSliceClick={slices.handleSliceClick}
                handleSliceTouchStart={handleSliceTouchStart}
                handleSliceTouchEnd={handleSliceTouchEnd}
                rotation={interaction.rotation}
                pairTexts={pairTexts}
              />
              
              {/* Rotation hint ripples */}
              <RotationHints />

              {/* Center circle */}
              <circle cx={DIMENSIONS.CENTER_X} cy={DIMENSIONS.CENTER_Y} r={DIMENSIONS.CENTER_CIRCLE_RADIUS} fill={COLORS.CENTER_CIRCLE}/>
              <text 
                x={DIMENSIONS.CENTER_X} 
                y={DIMENSIONS.CENTER_Y} 
                fontSize={TYPOGRAPHY.CENTER_LABEL} 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                {centerLabel}
              </text>
            </g>
          </svg>
        </div>
      </div>
      
      <WheelControls
        showArrows={connections.showArrows}
        onToggleArrows={connections.toggleArrows}
        onReset={slices.reset}
      />
    </div>
  );
};

export default DialecticalWheel; 