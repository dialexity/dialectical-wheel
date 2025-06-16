import React, {useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
interface ArrowTransition {
  from: string;
  to: string;
  label: string;
  color: string;
}

interface AnimatedArrowsProps {
  arrows: ArrowTransition[];
  dynamicSlices: any[];
  currentAnimationStage: string;
  showArrows: boolean;
  animationDelay?: number;
}

interface NodePosition {
  x: number;
  y: number;
  angle: number;
}

interface CachedArrowData {
  fromPos: NodePosition;
  toPos: NodePosition;
  pathD: string;
  markerUrl: string;
  gradientId: string;
  isValid: boolean;
}

const AnimatedArrows: React.FC<AnimatedArrowsProps> = React.memo(({
  arrows,
  dynamicSlices,
  currentAnimationStage,
  showArrows,
  animationDelay = 800
}) => {
  const [visibleArrowsCount, setVisibleArrowsCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationTimeouts, setAnimationTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [hoveredArrow, setHoveredArrow] = useState<number | null>(null);
  const animationStartedRef = useRef(false);
  const animationCompletedRef = useRef(false);

  const nodePositionsCache = useMemo(() => {
    const cache = new Map<string, NodePosition | null>();
    
    const getNodePosition = (sliceLayerCode: string): NodePosition | null => {
      if (cache.has(sliceLayerCode)) {
        return cache.get(sliceLayerCode)!;
      }

      const match = sliceLayerCode.match(/^([TA])(\d+)([+\-]?)$/);
      if (!match) {
        console.warn('Invalid slice layer code:', sliceLayerCode);
        cache.set(sliceLayerCode, null);
        return null;
      }

      const [, typeChar, pairNum, modifier] = match;
      const sliceType = typeChar === 'T' ? 'thesis' : 'antithesis';
      const pairIndex = parseInt(pairNum) - 1;
      
      let layerIndex = 1;
      if (modifier === '+') layerIndex = 0;
      else if (modifier === '-') layerIndex = 2;

      const slice = dynamicSlices.find(s => s.pair === pairIndex && s.type === sliceType);
      if (!slice) {
        if (dynamicSlices.length > 0) {
          console.warn('No slice found for:', { sliceType, pairIndex });
        }
        cache.set(sliceLayerCode, null);
        return null;
      }

      const cx = 200, cy = 200, radius = 150;
      const layerRadii = [
        radius * (0.3 + 0.7 * 0.5 / 3),
        radius * (0.3 + 0.7 * 1.5 / 3),
        radius * (0.3 + 0.7 * 2.5 / 3)
      ];

      const layerRadius = layerRadii[layerIndex];
      const angleRad = slice.angle * Math.PI / 180;

      const position = {
        x: cx + layerRadius * Math.cos(angleRad),
        y: cy + layerRadius * Math.sin(angleRad),
        angle: slice.angle
      };

      cache.set(sliceLayerCode, position);
      return position;
    };

    return getNodePosition;
  }, [dynamicSlices]);

  const cachedArrowsData = useMemo((): CachedArrowData[] => {
    if (dynamicSlices.length === 0) {
      return [];
    }

    return arrows.map((arrow, index) => {
      const fromPos = nodePositionsCache(arrow.from);
      const toPos = nodePositionsCache(arrow.to);

      if (!fromPos || !toPos) {
        return {
          fromPos: { x: 0, y: 0, angle: 0 },
          toPos: { x: 0, y: 0, angle: 0 },
          pathD: '',
          markerUrl: '',
          gradientId: '',
          isValid: false
        };
      }

      if (isNaN(fromPos.x) || isNaN(fromPos.y) || isNaN(toPos.x) || isNaN(toPos.y)) {
        return {
          fromPos,
          toPos,
          pathD: '',
          markerUrl: '',
          gradientId: '',
          isValid: false
        };
      }

      const wheelCenterX = 200;
      const wheelCenterY = 200;
      
      const fromCenterDx = fromPos.x - wheelCenterX;
      const fromCenterDy = fromPos.y - wheelCenterY;
      const fromCenterLength = Math.sqrt(fromCenterDx * fromCenterDx + fromCenterDy * fromCenterDy);
      
      const toCenterDx = toPos.x - wheelCenterX;
      const toCenterDy = toPos.y - wheelCenterY;
      const toCenterLength = Math.sqrt(toCenterDx * toCenterDx + toCenterDy * toCenterDy);
      
      const textOffset = 12;
      
      const adjustedFromX = fromPos.x - (fromCenterDx / fromCenterLength) * textOffset;
      const adjustedFromY = fromPos.y - (fromCenterDy / fromCenterLength) * textOffset;
      
      const adjustedToX = toPos.x - (toCenterDx / toCenterLength) * textOffset;
      const adjustedToY = toPos.y - (toCenterDy / toCenterLength) * textOffset;
      
      const midX = (adjustedFromX + adjustedToX) / 2;
      const midY = (adjustedFromY + adjustedToY) / 2;
      
      const distanceFromCenter = Math.sqrt(
        Math.pow(midX - wheelCenterX, 2) + Math.pow(midY - wheelCenterY, 2)
      );
      
      const curveFactor = 0.25;
      const curveDirection = distanceFromCenter < 100 ? 1 : -1;
      
      const dx = adjustedToX - adjustedFromX;
      const dy = adjustedToY - adjustedFromY;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      if (length === 0) {
        return {
          fromPos,
          toPos,
          pathD: '',
          markerUrl: '',
          gradientId: '',
          isValid: false
        };
      }
      
      const perpX = -dy / length;
      const perpY = dx / length;
      
      const curveOffset = length * curveFactor * curveDirection;
      const controlX = midX + perpX * curveOffset;
      const controlY = midY + perpY * curveOffset;
      
      const pathD = `M ${adjustedFromX},${adjustedFromY} Q ${controlX},${controlY} ${adjustedToX},${adjustedToY}`;

      let markerUrl = 'url(#arrowhead)';
      let gradientId = 'url(#arrowGradient-default)';
      const color = arrow.color;
      
      if (color === '#FF6B35') {
        markerUrl = 'url(#arrowhead-orange)';
        gradientId = 'url(#arrowGradient-orange)';
      } else if (color === '#2196F3') {
        markerUrl = 'url(#arrowhead-blue)';
        gradientId = 'url(#arrowGradient-blue)';
      } else if (color === '#9C27B0') {
        markerUrl = 'url(#arrowhead-purple)';
        gradientId = 'url(#arrowGradient-purple)';
      } else if (color === '#4CAF50') {
        markerUrl = 'url(#arrowhead-green)';
        gradientId = 'url(#arrowGradient-green)';
      } else {
        const colorLower = color.toLowerCase();
        if (colorLower.includes('ff33') || colorLower.includes('f44') || colorLower.includes('red')) {
          markerUrl = 'url(#arrowhead-orange)';
          gradientId = 'url(#arrowGradient-orange)';
        } else if (colorLower.includes('33ff') || colorLower.includes('4caf') || colorLower.includes('green')) {
          markerUrl = 'url(#arrowhead-green)';
          gradientId = 'url(#arrowGradient-green)';
        } else if (colorLower.includes('3377') || colorLower.includes('2196') || colorLower.includes('blue')) {
          markerUrl = 'url(#arrowhead-blue)';
          gradientId = 'url(#arrowGradient-blue)';
        } else if (colorLower.includes('ff77') || colorLower.includes('ff6b') || colorLower.includes('orange')) {
          markerUrl = 'url(#arrowhead-orange)';
          gradientId = 'url(#arrowGradient-orange)';
        }
      }

      return {
        fromPos,
        toPos,
        pathD,
        markerUrl,
        gradientId,
        isValid: !pathD.includes('NaN') && pathD.length > 0
      };
    });
  }, [arrows, nodePositionsCache, dynamicSlices.length]);

  useEffect(() => {
    return () => {
      animationTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [animationTimeouts]);

  useEffect(() => {
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    setAnimationTimeouts([]);

    if (!showArrows || arrows.length === 0 || dynamicSlices.length === 0) {
      setVisibleArrowsCount(0);
      setIsAnimating(false);
      animationStartedRef.current = false;
      animationCompletedRef.current = false;
      return;
    }

    if (currentAnimationStage === 'arrows-draw' && !isAnimating && !animationStartedRef.current) {
      animationStartedRef.current = true;
      animationCompletedRef.current = false;
      setIsAnimating(true);
      setVisibleArrowsCount(0);

      const newTimeouts: NodeJS.Timeout[] = [];

      arrows.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleArrowsCount(prev => {
            const newCount = Math.min(prev + 1, arrows.length);
            return newCount;
          });
        }, index * animationDelay);
        
        newTimeouts.push(timeout);
      });

      const completionTimeout = setTimeout(() => {
        setIsAnimating(false);
        animationCompletedRef.current = true;
      }, (arrows.length - 1) * animationDelay + 100);
      
      newTimeouts.push(completionTimeout);
      setAnimationTimeouts(newTimeouts);
    } else if (currentAnimationStage === 'complete') {
      if (!isAnimating) {
        setVisibleArrowsCount(arrows.length);
      }
    } else if (currentAnimationStage !== 'arrows-draw') {
      setVisibleArrowsCount(0);
      setIsAnimating(false);
      animationStartedRef.current = false;
      animationCompletedRef.current = false;
    }
  }, [showArrows, currentAnimationStage, arrows.length, animationDelay, dynamicSlices.length]);

  if (!showArrows || dynamicSlices.length === 0) {
    return null;
  }

  if (arrows.length === 0) {
    return null;
  }

  return (
    <g className="animated-arrows" style={{ isolation: 'isolate' }}>
      <g className="arrows-paths">
        <AnimatePresence>
          {cachedArrowsData.slice(0, visibleArrowsCount).map((arrowData, index) => {
            if (!arrowData.isValid) {
              console.warn(`Skipping invalid arrow ${index}`);
              return null;
            }

            const arrow = arrows[index];

            return (
              <motion.g
                key={`arrow-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onMouseEnter={() => setHoveredArrow(index)}
                onMouseLeave={() => setHoveredArrow(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.path
                  d={arrowData.pathD}
                  stroke={arrowData.gradientId}
                  strokeWidth={hoveredArrow === index ? "3" : "2"}
                  fill="none"
                  strokeLinecap="round"
                  markerEnd={arrowData.markerUrl}
                  initial={{ 
                    opacity: 0,
                    strokeDasharray: "8 6",
                    strokeDashoffset: 24
                  }}
                  animate={{ 
                    opacity: hoveredArrow === index ? 1 : 0.85,
                    strokeDasharray: "8 6",
                    strokeDashoffset: 0,
                    strokeWidth: hoveredArrow === index ? 3 : 2
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeInOut",
                    strokeDashoffset: { duration: 1.4, ease: "easeInOut" },
                    strokeWidth: { duration: 0.2, ease: "easeOut" }
                  }}
                  style={{
                    strokeDasharray: "8 6",
                    strokeLinecap: "round",
                    filter: hoveredArrow === index ? "drop-shadow(0 3px 6px rgba(0,0,0,0.25))" : "drop-shadow(0 1px 3px rgba(0,0,0,0.15))",
                    pointerEvents: 'none'
                  }}
                />
                
                <motion.path
                  d={arrowData.pathD}
                  stroke="transparent"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  style={{ 
                    cursor: 'pointer',
                    pointerEvents: 'all'
                  }}
                />
              </motion.g>
            );
          })}
        </AnimatePresence>
      </g>
      
      <g className="arrows-labels">
        <AnimatePresence>
          {cachedArrowsData.slice(0, visibleArrowsCount).map((arrowData, index) => {
            if (!arrowData.isValid) {
              return null;
            }

            const arrow = arrows[index];

            return (
              <motion.g key={`label-${index}`}>
                {arrow.label && hoveredArrow === index && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {(() => {
                      const midX = (arrowData.fromPos.x + arrowData.toPos.x) / 2;
                      const midY = (arrowData.fromPos.y + arrowData.toPos.y) / 2;
                      
                      const svgWidth = 400;
                      const svgHeight = 400;
                      
                      const labelWidth = Math.max(arrow.label.length * 7 + 12, 60);
                      const labelHeight = 24;
                      
                      let labelX = midX - labelWidth / 2;
                      let labelY = midY - labelHeight - 12;
                      
                      if (labelX < 10) labelX = 10;
                      if (labelX + labelWidth > svgWidth - 10) labelX = svgWidth - labelWidth - 10;
                      
                      if (labelY < 10) {
                        labelY = midY + 12;
                      }
                      
                      if (labelY + labelHeight > svgHeight - 10) {
                        labelY = midY - labelHeight / 2;
                        if (midX < svgWidth / 2) {
                          labelX = midX + 15;
                        } else {
                          labelX = midX - labelWidth - 15;
                        }
                      }
                      
                      labelX = Math.max(10, Math.min(labelX, svgWidth - labelWidth - 10));
                      labelY = Math.max(10, Math.min(labelY, svgHeight - labelHeight - 10));
                      
                      return (
                        <>
                          <motion.rect
                            x={labelX + 1}
                            y={labelY + 1}
                            width={labelWidth}
                            height={labelHeight}
                            fill="rgba(0, 0, 0, 0.08)"
                            rx="6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                          
                          <motion.rect
                            x={labelX}
                            y={labelY}
                            width={labelWidth}
                            height={labelHeight}
                            fill="rgba(255, 255, 255, 0.95)"
                            stroke={arrow.color}
                            strokeWidth="1"
                            rx="6"
                            filter="url(#dropShadow)"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                          
                          <motion.rect
                            x={labelX}
                            y={labelY}
                            width={labelWidth}
                            height={2}
                            fill={arrow.color}
                            rx="6"
                            opacity={0.7}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          />
                          
                          <motion.text
                            x={labelX + labelWidth / 2}
                            y={labelY + labelHeight / 2 + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fill="#444"
                            fontWeight="500"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                          >
                            {arrow.label}
                          </motion.text>
                          
                          <motion.circle
                            cx={midX}
                            cy={midY}
                            r="2"
                            fill={arrow.color}
                            opacity={0.5}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.25, type: "spring", stiffness: 400 }}
                          />
                          
                          {(Math.abs(midX - (labelX + labelWidth / 2)) > 25 || Math.abs(midY - (labelY + labelHeight / 2)) > 25) && (
                            <motion.line
                              x1={midX}
                              y1={midY}
                              x2={labelX + labelWidth / 2}
                              y2={labelY + (labelY < midY ? labelHeight : 0)}
                              stroke={arrow.color}
                              strokeWidth="0.5"
                              strokeDasharray="1 1"
                              opacity={0.3}
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                            />
                          )}
                        </>
                      );
                    })()}
                  </motion.g>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </g>
    </g>
  );
});

AnimatedArrows.displayName = 'AnimatedArrows';

export default AnimatedArrows; 