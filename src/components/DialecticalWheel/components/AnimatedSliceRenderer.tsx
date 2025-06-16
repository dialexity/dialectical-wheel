import React from 'react';
import { motion } from 'motion/react';
import { SliceAtAngle, defaultPairTexts } from '../../../utils/SliceGenerator';
import { COLORS, DIMENSIONS, STROKES } from '../config/wheelConfig';
import type { PairTexts } from '../hooks';
import type { AnimationStage } from './WheelBuildAnimation';

interface AnimatedSliceRendererProps {
  dynamicSlices: any[];
  memoizedSliceData: Map<string, any>;
  handleSliceClick: (pairIndex: number) => void;
  handleSliceTouchStart: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
  handleSliceTouchEnd: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
  rotation: number;
  pairTexts: PairTexts | null;
  currentAnimationStage: AnimationStage;
  isAnimating: boolean;
}

const AnimatedSliceRenderer: React.FC<AnimatedSliceRendererProps> = ({
  dynamicSlices,
  memoizedSliceData,
  handleSliceClick,
  handleSliceTouchStart,
  handleSliceTouchEnd,
  rotation,
  pairTexts,
  currentAnimationStage,
  isAnimating
}) => {

  const shouldShowSlice = (slice: any, stage: AnimationStage, currentTime: number = 0): boolean => {
    if (!isAnimating) return true;
    
    switch (stage) {
      case 'idle':
        return false;
        
      case 'pairs-appear':
        const isBasicSlice = !slice.label.includes('+') && !slice.label.includes('-') && 
                            !slice.label.includes('positive') && !slice.label.includes('negative');
        return isBasicSlice;
        
      case 'sides-sequence':
      case 'arrows-draw':
      case 'complete':
        return true;
        
      default:
        return false;
    }
  };

  const shouldShowLayer = (layerIndex: number, slice: any, stage: AnimationStage): boolean => {
    if (!isAnimating) return true;
    
    switch (stage) {
      case 'idle':
        return false;
        
      case 'pairs-appear':
        return layerIndex === 1;
        
      case 'sides-sequence':
        const isThesis = slice.type === 'thesis';
        const pairIndex = slice.pair;
        
        const baseDelay = pairIndex * 4 * 0.5;
        
        if (layerIndex === 1) {
          return true;
        } else if (layerIndex === 0) {
          const greenDelay = isThesis ? baseDelay : baseDelay + 2 * 0.5;
          return true;
        } else if (layerIndex === 2) {
          const pinkDelay = isThesis ? baseDelay + 3 * 0.5 : baseDelay + 1 * 0.5;
          return true;
        }
        
        return true;
        
      case 'arrows-draw':
      case 'complete':
        return true;
        
      default:
        return false;
    }
  };

  const getSliceAnimationVariants = (slice: any, stage: AnimationStage) => {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    };
  };

  const getLayerAnimationVariants = (layerIndex: number, slice: any, stage: AnimationStage) => {
    if (!isAnimating) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 }
      };
    }

    const isThesis = slice.type === 'thesis';
    const pairIndex = slice.pair;

    if (stage === 'pairs-appear') {
      if (layerIndex === 1) {
        const pairOrder = slice.pair * 2;
        const typeOrder = isThesis ? 0 : 1;
        const totalOrder = pairOrder + typeOrder;
        const delay = totalOrder * 0.4;
        
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { 
            duration: 0.5, 
            delay: delay
          }
        };
      } else {
        return {
          initial: { opacity: 0 },
          animate: { opacity: 0 }
        };
      }
    }

    if (stage === 'sides-sequence') {
      if (layerIndex === 1) {
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 }
        };
      }
      
      let sideOrder = 0;
      
      if (layerIndex === 0) {
        sideOrder = isThesis ? 0 : 2;
      } else if (layerIndex === 2) {
        sideOrder = isThesis ? 3 : 1;
      }
      
      const totalOrder = pairIndex * 4 + sideOrder;
      const delay = totalOrder * 0.5;
      
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { 
          duration: 0.4, 
          delay: delay
        }
      };
    }

    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    };
  };

  return (
    <>
      <g id="slice-container" style={{ display: 'none' }}>
      </g>
      <g id="dynamic-slice-container">
        {dynamicSlices.map((slice) => {
          const shouldShow = shouldShowSlice(slice, currentAnimationStage);
          
          if (!shouldShow && isAnimating) {
            return null;
          }

          if (slice.detailed) {
            const usePairTexts = pairTexts || defaultPairTexts;
            const sliceTexts = usePairTexts[slice.pair as keyof typeof usePairTexts];
            
            if (sliceTexts) {
              const labels = slice.type === 'thesis' ? sliceTexts.thesis : sliceTexts.antithesis;
              
              return (
                <motion.g 
                  key={slice.id} 
                  className={`slice-component ${slice.type}-slice focused-pair`}
                  onClick={() => handleSliceClick(slice.pair)}
                  onTouchStart={(e: React.TouchEvent<SVGGElement>) => handleSliceTouchStart(e, slice.pair)}
                  onTouchEnd={(e: React.TouchEvent<SVGGElement>) => handleSliceTouchEnd(e, slice.pair)}
                  style={{ cursor: 'pointer' }}
                  {...getSliceAnimationVariants(slice, currentAnimationStage)}
                >
                  <SliceAtAngle
                    sliceData={{ labels: labels as [string, string][] }}
                    sliceId={slice.id}
                    angle={slice.angle}
                    sliceAngle={slice.width}
                    pairIndex={slice.pair}
                    sliceType={slice.type}
                    originalSliceIndex={slice.originalIndex}
                  />
                </motion.g>
              );
            }
          }
          
          const sliceData = memoizedSliceData.get(slice.id);
          
          if (!sliceData) {
            console.warn('No memoized slice data found for slice:', slice.id);
            return null;
          }
          
          const textColor = slice.type === 'thesis' ? COLORS.THESIS : COLORS.ANTITHESIS;
          
          return (
            <motion.g 
              key={slice.id} 
              className={`equal-slice ${slice.type}-slice`}
              {...getSliceAnimationVariants(slice, currentAnimationStage)}
            >
              <g transform={`rotate(${slice.angle} ${DIMENSIONS.CENTER_X} ${DIMENSIONS.CENTER_Y})`}>
              {sliceData.layers.map((layer: { pathD: string; fill: string }, layerIndex: number) => {
                const nodeIdBase = slice.originalIndex !== undefined ? `slice-${slice.originalIndex}` : slice.id;
                const nodeId = `${nodeIdBase}-layer-${layerIndex}`;
                
                if (!shouldShowLayer(layerIndex, slice, currentAnimationStage)) {
                  return null;
                }
                
                return (
                  <motion.path
                    key={`${slice.id}-layer-${layerIndex}`}
                    d={layer.pathD}
                    fill={layer.fill}
                    className="clickable-slice layer-node"
                    data-node-id={nodeId}
                    data-slice-id={nodeIdBase}
                    data-pair-index={slice.pair}
                    data-slice-type={slice.type}
                    data-layer-index={layerIndex}
                    data-layer-type={layerIndex === 0 ? 'green' : layerIndex === 1 ? 'white' : 'pink'}
                    onClick={() => handleSliceClick(slice.pair)}
                    onTouchStart={(e: React.TouchEvent<SVGPathElement>) => handleSliceTouchStart(e, slice.pair)}
                    onTouchEnd={(e: React.TouchEvent<SVGPathElement>) => handleSliceTouchEnd(e, slice.pair)}
                    style={{ cursor: 'pointer' }}
                    {...getLayerAnimationVariants(layerIndex, slice, currentAnimationStage)}
                  />
                );
              })}
              </g>
              <line 
                x1={DIMENSIONS.CENTER_X} 
                y1={DIMENSIONS.CENTER_Y} 
                x2={DIMENSIONS.CENTER_X + DIMENSIONS.RADIUS * Math.cos((slice.angle - slice.width/2) * Math.PI / 180)} 
                y2={DIMENSIONS.CENTER_Y + DIMENSIONS.RADIUS * Math.sin((slice.angle - slice.width/2) * Math.PI / 180)} 
                stroke={COLORS.BOUNDARY_LINES} 
                strokeWidth={STROKES.BOUNDARY_WIDTH}
                pointerEvents="none"
              />
              <line 
                x1={DIMENSIONS.CENTER_X} 
                y1={DIMENSIONS.CENTER_Y} 
                x2={DIMENSIONS.CENTER_X + DIMENSIONS.RADIUS * Math.cos((slice.angle + slice.width/2) * Math.PI / 180)} 
                y2={DIMENSIONS.CENTER_Y + DIMENSIONS.RADIUS * Math.sin((slice.angle + slice.width/2) * Math.PI / 180)} 
                stroke={COLORS.BOUNDARY_LINES} 
                strokeWidth={STROKES.BOUNDARY_WIDTH}
                pointerEvents="none"
              />
              <motion.text
                x={sliceData.textX}
                y={sliceData.textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={sliceData.fontSize}
                fontWeight="bold"
                fill={textColor}
                pointerEvents="none"
                transform={`rotate(${-rotation} ${sliceData.textX} ${sliceData.textY})`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {sliceData.label}
              </motion.text>
            </motion.g>
          );
        })}
      </g>
    </>
  );
};

export default AnimatedSliceRenderer; 