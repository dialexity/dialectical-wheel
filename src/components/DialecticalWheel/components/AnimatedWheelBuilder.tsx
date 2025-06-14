import React, { useState, useEffect } from 'react';
import { DIMENSIONS, COLORS, SLICES, STROKES } from '../config/wheelConfig';
import { SliceAtAngle } from '../../../utils/SliceGenerator';

interface AnimatedWheelBuilderProps {
  pairTexts: Record<number, any>;
  numPairs: number;
  onComplete?: () => void;
}

export const AnimatedWheelBuilder: React.FC<AnimatedWheelBuilderProps> = ({
  pairTexts,
  numPairs,
  onComplete
}) => {
  const [isPulsing, setIsPulsing] = useState(true);
  const [showDividingLine, setShowDividingLine] = useState(false);
  const [lineRotation, setLineRotation] = useState(0);
  const [currentPairIndex, setCurrentPairIndex] = useState(-1); // -1 means no pairs shown yet
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cx = DIMENSIONS.CENTER_X;
  const cy = DIMENSIONS.CENTER_Y;
  const radius = DIMENSIONS.RADIUS;

  // Animation sequence for progressive pair addition
  useEffect(() => {
    const sequence = async () => {
      // 1. Start with pulsing empty circles for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsPulsing(false);
      
      // 2. Show horizontal dividing line
      setShowDividingLine(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 3. Add pairs progressively
      for (let pairIndex = 0; pairIndex < numPairs; pairIndex++) {
        await addNextPair(pairIndex);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between pairs
      }
      
      // Animation complete
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
    };
    
    sequence();
  }, [numPairs, onComplete]);

  // Function to add the next pair with progressive squishing
  const addNextPair = async (pairIndex: number) => {
    const totalPairs = pairIndex + 1;
    const rotationAngle = 180 / totalPairs; // Each new pair gets smaller rotation
    
    setCurrentPairIndex(pairIndex);
    setIsAnimating(true);
    setLineRotation(0); // Reset rotation for new pair
    
    // Animate rotation over 2 seconds
    const rotationDuration = 2000;
    const startTime = Date.now();
    
    return new Promise<void>((resolve) => {
      const animateRotation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / rotationDuration, 1);
        
        // Smooth easing function
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedProgress = easeInOut(progress);
        
        setLineRotation(easedProgress * -rotationAngle);
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          setIsAnimating(false);
          resolve();
        }
      };
      
      animateRotation();
    });
  };

  // Create concentric circles (base layers)
  const createConcentricCircles = () => {
    const circles = [];
    const layerCount = 3;
    
    for (let layer = 0; layer < layerCount; layer++) {
      const innerRadius = radius * (DIMENSIONS.SLICE_INNER_RADIUS_RATIO + (DIMENSIONS.SLICE_OUTER_RADIUS_RATIO - DIMENSIONS.SLICE_INNER_RADIUS_RATIO) * layer / layerCount);
      const outerRadius = radius * (DIMENSIONS.SLICE_INNER_RADIUS_RATIO + (DIMENSIONS.SLICE_OUTER_RADIUS_RATIO - DIMENSIONS.SLICE_INNER_RADIUS_RATIO) * (layer + 1) / layerCount);
      const color = COLORS.LAYER_COLORS[layer];
      
      circles.push(
        <circle
          key={`circle-${layer}`}
          cx={cx}
          cy={cy}
          r={(innerRadius + outerRadius) / 2}
          fill="none"
          stroke={color}
          strokeWidth={outerRadius - innerRadius}
          opacity={0.7}
          style={{
            animation: isPulsing ? 'pulse 0.8s ease-in-out infinite' : 'none',
            transformOrigin: `${cx}px ${cy}px`
          }}
        />
      );
    }
    
    return circles;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: scaleX(0); }
            to { opacity: 1; transform: scaleX(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .dividing-line-enter {
            animation: slideIn 0.5s ease-out;
            transform-origin: center;
          }
        `}
      </style>
      
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="max-w-full max-h-full"
      >
        <defs>
          {/* Clipping mask for progressive reveal */}
          <mask id="revealMask">
            <rect width="400" height="400" fill="black" />
            {/* White area reveals the content that has been swept over */}
            {isAnimating && currentPairIndex >= 0 && (
              <g>
                {/* Create a sector that grows from 0° to current rotation (counterclockwise) */}
                <path
                  d={`M ${cx} ${cy} 
                      L ${cx + radius} ${cy} 
                      A ${radius} ${radius} 0 ${Math.abs(lineRotation) >= 90 ? 1 : 0} 0 
                      ${cx + radius * Math.cos((lineRotation * Math.PI) / 180)} ${cy + radius * Math.sin((lineRotation * Math.PI) / 180)} 
                      Z`}
                  fill="white"
                />
                {/* Also reveal the opposite sector (180° offset) to show both thesis and antithesis */}
                <path
                  d={`M ${cx} ${cy} 
                      L ${cx - radius} ${cy} 
                      A ${radius} ${radius} 0 ${Math.abs(lineRotation) >= 90 ? 1 : 0} 0 
                      ${cx + radius * Math.cos(((lineRotation + 180) * Math.PI) / 180)} ${cy + radius * Math.sin(((lineRotation + 180) * Math.PI) / 180)} 
                      Z`}
                  fill="white"
                />
              </g>
            )}
            {/* Show all completed pairs */}
            {currentPairIndex >= 0 && !isAnimating && (
              <rect width="400" height="400" fill="white" />
            )}
          </mask>
        </defs>

        {/* Background concentric circles */}
        {createConcentricCircles()}
        
        {/* Center circle */}
        <circle
          cx={cx}
          cy={cy}
          r={DIMENSIONS.CENTER_CIRCLE_RADIUS}
          fill={COLORS.CENTER_CIRCLE}
          style={{
            animation: isPulsing ? 'pulse 0.8s ease-in-out infinite' : 'none',
            transformOrigin: `${cx}px ${cy}px`
          }}
        />
        
        {/* Center label */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
          fill={COLORS.BLACK}
          style={{
            animation: isPulsing ? 'pulse 0.8s ease-in-out infinite' : 'none',
            transformOrigin: `${cx}px ${cy}px`
          }}
        >
          Car Decision
        </text>
        
        {/* All pairs with progressive squishing */}
        {currentPairIndex >= 0 && (
          <g mask="url(#revealMask)">
            {Array.from({ length: currentPairIndex + 1 }, (_, pairIndex) => {
              const totalPairs = currentPairIndex + 1;
              const sliceAngle = 180 / totalPairs; // Each pair gets equal slice
              const pairData = pairTexts[pairIndex];
              
              if (!pairData) return null;
              
              // Calculate angles to maintain thesis/antithesis opposition
              let thesisStartAngle, antithesisStartAngle;
              
              if (totalPairs === 1) {
                // Single pair: thesis at top, antithesis at bottom (180° apart)
                thesisStartAngle = 270;
                antithesisStartAngle = 90;
              } 
              else {
                // Multiple pairs: each pair has thesis/antithesis 180° apart
                // Center each pair in its slice, starting from left side
                thesisStartAngle = 180 + sliceAngle/2 + (pairIndex * sliceAngle);
                antithesisStartAngle = 0 + sliceAngle/2 + (pairIndex * sliceAngle);
              }
              
              return (
                <g key={`pair-${pairIndex}`}>
                  {/* Thesis slice (top semicircle) */}
                  <SliceAtAngle
                    sliceData={{ labels: pairData.thesis }}
                    sliceId={`thesis-${pairIndex}`}
                    angle={thesisStartAngle}
                    cx={cx}
                    cy={cy}
                    radius={radius}
                    sliceAngle={sliceAngle}
                    pairIndex={pairIndex}
                    sliceType="thesis"
                    showBoundaries={false}
                  />
                  
                  {/* Antithesis slice (bottom semicircle) */}
                  <SliceAtAngle
                    sliceData={{ labels: pairData.antithesis }}
                    sliceId={`antithesis-${pairIndex}`}
                    angle={antithesisStartAngle}
                    cx={cx}
                    cy={cy}
                    radius={radius}
                    sliceAngle={sliceAngle}
                    pairIndex={pairIndex}
                    sliceType="antithesis"
                    showBoundaries={false}
                  />
                </g>
              );
            })}
          </g>
        )}
        
        {/* Static horizontal dividing line */}
        {showDividingLine && (
          <line
            x1={cx - radius}
            y1={cy}
            x2={cx + radius}
            y2={cy}
            stroke={COLORS.BOUNDARY_LINES}
            strokeWidth={STROKES.BOUNDARY_WIDTH * 2}
            className="dividing-line-enter"
          />
        )}
        
        {/* Rotating sweep line */}
        {isAnimating && (
          <g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${lineRotation}deg)`
            }}
          >
            <line
              x1={cx - radius}
              y1={cy}
              x2={cx + radius}
              y2={cy}
              stroke={COLORS.BOUNDARY_LINES}
              strokeWidth={STROKES.BOUNDARY_WIDTH * 3}
              opacity={0.8}
            />
          </g>
        )}
      </svg>
    </div>
  );
}; 