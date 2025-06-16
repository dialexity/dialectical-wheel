import React, { useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import './DialecticalWheel.css';
import {
  useWheelSequence,
  useWheelInteraction,
  useWheelSlices,
  SliceConfig,
  DetailedSlices,
  PairTexts
} from './hooks';
import {
  WheelControls,
  WheelOverlays,
  SvgMarkers,
  AnimatedSliceRenderer,
  AnimatedArrows,
  WheelBuildAnimation,
  AnimationStage
} from './components';
import { DIMENSIONS, COLORS, TYPOGRAPHY, LAYOUT, DEFAULTS } from './config/wheelConfig';

// Type definitions
interface ArrowTransition {
  from: string;
  to: string;
  label: string;
  color: string;
}

interface DialecticalWheelProps {
  numPairs?: number;
  title?: string;
  centerLabel?: string;
  sliceSequence?: SliceConfig[] | null;
  fullSequence?: any[] | null; // Complete sequence from API (overrides sliceSequence)
  detailedSlices?: DetailedSlices;
  pairTexts?: PairTexts | null;
  enableBuildAnimation?: boolean;
  onDynamicSlicesChange?: (slices: any[]) => void;
  onSliceClick?: (pairIndex: number) => void;
  recordRef?: React.RefObject<SVGGElement | null>;
  rotation?: number;
  setRotation?: Dispatch<SetStateAction<number>>;
  onAnimationComplete?: () => void;
  arrows?: ArrowTransition[];
}

const DialecticalWheel: React.FC<DialecticalWheelProps> = ({
  numPairs = DEFAULTS.NUM_PAIRS,
  title = DEFAULTS.TITLE,
  centerLabel = DEFAULTS.CENTER_LABEL,
  sliceSequence = null,
  fullSequence = null,
  detailedSlices = {},
  pairTexts = null,
  enableBuildAnimation = true,
  onDynamicSlicesChange = undefined,
  onSliceClick = undefined,
  recordRef: externalRecordRef,
  rotation,
  setRotation,
  onAnimationComplete,
  arrows = [],
}) => {
  // Use a local ref if not provided
  const localRecordRef = useRef<SVGGElement | null>(null);
  const recordRef = externalRecordRef || localRecordRef;

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimationStage, setCurrentAnimationStage] = useState<AnimationStage>('idle');
  const [animationKey, setAnimationKey] = useState(0);
  const [showCustomArrows, setShowCustomArrows] = useState(false);
  const hasAnimationCompletedRef = useRef(false);

  // Initialize wheel data
  const sequence = useWheelSequence(numPairs, sliceSequence);
  const interaction = useWheelInteraction(recordRef);
  const slices = useWheelSlices(
    sequence.sequenceWithLabels,
    sequence.normalSliceAngle,
    sequence.focusedSliceAngle,
    sequence.unfocusedSliceAngle,
    rotation !== undefined ? rotation : interaction.rotation,
    interaction.setRotation,
    pairTexts,
    detailedSlices,
    onDynamicSlicesChange,
    onSliceClick
  );

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setCurrentAnimationStage('complete');
    hasAnimationCompletedRef.current = true;
    // Call parent callback if provided
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  }, [onAnimationComplete]);

  const handleStageChange = useCallback((stage: AnimationStage) => {
    console.log(`🎭 Stage changed to: ${stage}`);
    setCurrentAnimationStage(stage);

    if (stage === 'arrows-draw' && arrows && arrows.length > 0) {
      console.log('🎯 Enabling arrows for animation stage');
      setShowCustomArrows(true);
    }
  }, [arrows]);

  const handleReplayAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentAnimationStage('idle');
    setAnimationKey(prev => prev + 1);

    setShowCustomArrows(false);
    hasAnimationCompletedRef.current = false; 
  }, []);

  // Touch handlers for slice clicks
  const handleSliceTouchStart = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchStart(e, pairIndex);
  };

  const handleSliceTouchEnd = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchEnd(e, pairIndex);
  };

  // Auto-start animation when component mounts
  React.useEffect(() => {
    if (enableBuildAnimation && !hasAnimationCompletedRef.current) {
      console.log('🎭 Auto-starting animation (first time only)');
      // Start animation after a short delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (hasAnimationCompletedRef.current) {
      console.log('🎭 Animation already completed, skipping auto-start');
    }
  }, [enableBuildAnimation]);

  return (
    <div className="dialectical-wheel-container">
      <div className="main-content" style={{ paddingTop: '0' }}>
        <WheelOverlays
          isZoomedToQ2={interaction.isZoomedToQ2}
          onToggleTopHalfZoom={interaction.toggleTopHalfZoom}
        />
        <WheelBuildAnimation
          isAnimating={isAnimating}
          onAnimationComplete={handleAnimationComplete}
          onStageChange={handleStageChange}
          numPairs={numPairs}
        >
          <div className="wheel-container">
            <svg
              className="wheel-svg"
              viewBox={LAYOUT.SVG_VIEWBOX}
              {...interaction.svgProps}
              key={animationKey} // Force re-render on animation replay
            >
              <g ref={recordRef} className="record">
                <SvgMarkers />

                <AnimatedSliceRenderer
                  dynamicSlices={slices.dynamicSlices}
                  memoizedSliceData={slices.memoizedSliceData}
                  handleSliceClick={slices.handleSliceClick}
                  handleSliceTouchStart={handleSliceTouchStart}
                  handleSliceTouchEnd={handleSliceTouchEnd}
                  rotation={rotation !== undefined ? rotation : interaction.rotation}
                  pairTexts={pairTexts}
                  currentAnimationStage={currentAnimationStage}
                  isAnimating={isAnimating}
                />

                <circle
                  cx={DIMENSIONS.CENTER_X}
                  cy={DIMENSIONS.CENTER_Y}
                  r={DIMENSIONS.CENTER_CIRCLE_RADIUS}
                  fill={COLORS.CENTER_CIRCLE}
                  style={{
                    opacity: isAnimating && ['idle', 'pairs-appear'].includes(currentAnimationStage) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                <text
                  x={DIMENSIONS.CENTER_X}
                  y={DIMENSIONS.CENTER_Y}
                  fontSize={TYPOGRAPHY.CENTER_LABEL}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    opacity: isAnimating && ['idle', 'pairs-appear'].includes(currentAnimationStage) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  {centerLabel}
                </text>
                <AnimatedArrows
                  arrows={arrows}
                  dynamicSlices={slices.dynamicSlices}
                  currentAnimationStage={currentAnimationStage}
                  showArrows={showCustomArrows}
                  animationDelay={800}
                />
              </g>
            </svg>
          </div>
        </WheelBuildAnimation>
      </div>

      <WheelControls
        showArrows={showCustomArrows}
        onToggleArrows={() => setShowCustomArrows(!showCustomArrows)}
        onReset={slices.reset}
        onReplay={handleReplayAnimation}
        isAnimating={isAnimating}
      />
    </div>
  );
};

export default DialecticalWheel;
export type { ArrowTransition }; 