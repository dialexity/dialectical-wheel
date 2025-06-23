import React, { useState, useEffect } from 'react';
import { DIMENSIONS, COLORS, SLICES, STROKES } from '../config/wheelConfig';
import { SliceAtAngle } from '../../../utils/SliceGenerator';

// Gas vs Electric car data
const gasElectricData = {
  "user_message": "I am going to buy a car. I am choosing between an electric car and a gas car. The country I am living in doesn't have a an extensive charging infrastructure yet. Also, the current generation of electric cars are still not the more advanced solid state batteries, which make take up to 5 years to launch.",
  "wheels": [
    {
      "wisdom_units": [
        {
          "t_minus": {
            "alias": "T1-",
            "statement": "Dependence on limited charging infrastructure.",
            "explanation": "The negative aspect was derived by recognizing a critical drawback associated with electric vehicles, as highlighted in the context."
          },
          "t": {
            "alias": "T1",
            "statement": "Decision to adopt electric or gas vehicle.",
            "explanation": "Identified by the subject's expressed concern over choosing vehicle type."
          },
          "t_plus": {
            "alias": "T1+",
            "statement": "Environmental sustainability.",
            "explanation": "The positive aspect was identified as it represents a constructive outcome encouraged by the decision to adopt a specific vehicle type."
          },
          "a_plus": {
            "alias": "A1+",
            "statement": "Practicality in current conditions.",
            "explanation": "The positive aspect of the antithesis was recognized as it contradicts the exaggerated focus on charging issues and offers a constructive perspective on choosing based on available resources."
          },
          "a": {
            "alias": "A1",
            "statement": "Preference for current convenience over future innovation.",
            "explanation": "The antithesis was derived as it semantically opposes the forward-looking decision-making process of adopting a specific technology."
          },
          "a_minus": {
            "alias": "A1-",
            "statement": "Resistance to adapting new technologies.",
            "explanation": "The negative aspect of the antithesis was inferred as it directly opposes environmental sustainability, representing an exaggerated negative stance."
          }
        },
        {
          "t_minus": {
            "alias": "T2-",
            "statement": "Paralysis by overanalysis.",
            "explanation": "Identified as the exaggerated downside of the thesis since excessive focus on infrastructure analysis may lead to inaction or indecision."
          },
          "t": {
            "alias": "T2",
            "statement": "Analysis of existing infrastructure.",
            "explanation": "Derived from the importance placed on the country's charging facilities."
          },
          "t_plus": {
            "alias": "T2+",
            "statement": "Informed decision-making.",
            "explanation": "Derived from the thesis as proper analysis supports rational evaluation and choice between options like electric or gas cars."
          },
          "a_plus": {
            "alias": "A2+",
            "statement": "Optimism for innovation.",
            "explanation": "Formulated as the positive aspect of the antithesis since belief in forthcoming advancements can counterbalance excessive infrastructural focus and paralysis."
          },
          "a": {
            "alias": "A2",
            "statement": "Reliance on technological advancements.",
            "explanation": "Derived as the antithesis since it contrasts the thesis by focusing not on existing conditions but the promise of future technology such as solid-state batteries."
          },
          "a_minus": {
            "alias": "A2-",
            "statement": "Unrealistic expectations.",
            "explanation": "This was derived as the exaggerated downside of the antithesis since placing blind faith in future technology might underestimate current challenges and lead to flawed decisions."
          }
        },
        {
          "t_minus": {
            "alias": "T3-",
            "statement": "Hindered adoption.",
            "explanation": "This negative aspect reflects how focusing on limitations can discourage or hinder the uptake of innovative solutions."
          },
          "t": {
            "alias": "T3",
            "statement": "Impact of technological limitations.",
            "explanation": "Reflected in the statement about non-availability of solid-state batteries."
          },
          "t_plus": {
            "alias": "T3+",
            "statement": "Balanced technological assessment.",
            "explanation": "The positive aspect of focusing on limitations emerges as the ability to assess and navigate technological barriers effectively."
          },
          "a_plus": {
            "alias": "A3+",
            "statement": "Optimistic innovation focus.",
            "explanation": "The positive aspect of overlooking limitations arises when an optimistic perspective drives innovation, which challenges the idea of hindered adoption."
          },
          "a": {
            "alias": "A3",
            "statement": "Overlooked technological factors.",
            "explanation": "Derived as the antithesis because overlooking limitations opposes focusing on them."
          },
          "a_minus": {
            "alias": "A3-",
            "statement": "Overconfidence pitfalls.",
            "explanation": "The negative aspect reveals that overlooking limitations can lead to overestimating readiness and negatively impact decision-making, opposing balanced assessment."
          }
        },
        {
          "t_minus": {
            "alias": "T4-",
            "statement": "Obsession over speculative advancements.",
            "explanation": "Derived as it represents the negative aspect of over-prioritizing uncertain technological progress and ignoring present limitations."
          },
          "t": {
            "alias": "T4",
            "statement": "Consideration of future readiness.",
            "explanation": "Based on the delay until more advanced technologies launch."
          },
          "t_plus": {
            "alias": "T4+",
            "statement": "Technological and environmental adaptability.",
            "explanation": "Derived as it emphasizes the positive potential of planning ahead for advancements and sustainability."
          },
          "a_plus": {
            "alias": "A4+",
            "statement": "Practical problem-solving.",
            "explanation": "Derived as it highlights the constructive side of prioritizing current needs and resolving issues effectively, which counters the negative aspect of speculative obsession."
          },
          "a": {
            "alias": "A4",
            "statement": "Focus on immediate pragmatism.",
            "explanation": "Selected as the antithesis because it centers on addressing current practical challenges, contrasting focus on future readiness."
          },
          "a_minus": {
            "alias": "A4-",
            "statement": "Resistance to change.",
            "explanation": "Derived as it embodies the exaggeration of immediate pragmatism, opposing adaptability, which characterizes technological and environmental adaptability."
          }
        }
      ]
    }
  ]
};

// Transform wisdom units to pair texts format
const transformWisdomUnitsToPairTexts = (wisdomUnits: any[]) => {
  const pairTexts: Record<number, any> = {};
  
  wisdomUnits.forEach((unit, index) => {
    pairTexts[index] = {
      thesis: [
        [unit.t_plus.statement, 'green'],
        [unit.t.statement, 'black'], 
        [unit.t_minus.statement, 'red']
      ],
      antithesis: [
        [unit.a_plus.statement, 'green'],
        [unit.a.statement, 'black'],
        [unit.a_minus.statement, 'red']
      ]
    };
  });
  
  return pairTexts;
};

interface AnimatedWheelBuilderProps {
  pairTexts?: Record<number, any>;
  numPairs?: number;
  onComplete?: () => void;
}

export const AnimatedWheelBuilder: React.FC<AnimatedWheelBuilderProps> = ({
  pairTexts: providedPairTexts,
  numPairs: providedNumPairs,
  onComplete
}) => {
  // Use gas vs electric data by default
  const wisdomUnits = gasElectricData.wheels[0].wisdom_units;
  const defaultPairTexts = transformWisdomUnitsToPairTexts(wisdomUnits);
  const defaultNumPairs = wisdomUnits.length;
  
  const pairTexts = providedPairTexts || defaultPairTexts;
  const numPairs = providedNumPairs || defaultNumPairs;
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
            animation: isPulsing ? `pulse 0.8s ease-in-out infinite` : 'none',
            animationDelay: isPulsing ? `${layer * 0.15}s` : '0s',
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
          {/* Clipping mask for progressive reveal of new pair only */}
          <mask id="newPairRevealMask">
            <rect width="400" height="400" fill="black" />
            {/* White area reveals only the new pair being swept over */}
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
            animationDelay: isPulsing ? '0s' : '0s', // Center starts first
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
          🚗 GAS vs ELECTRIC 🔋
        </text>
        
        {/* All pairs with smooth transformation */}
        {currentPairIndex >= 0 && (
          <g>
            {Array.from({ length: currentPairIndex + 1 }, (_, pairIndex) => {
              const totalPairs = currentPairIndex + 1;
              
              // Calculate slice angles based on animation state
              let currentSliceAngle, targetSliceAngle;
                             if (isAnimating) {
                 // During animation: interpolate between old and new slice sizes
                 const pairsBeforeAnimation = currentPairIndex; // Pairs that were already visible before this animation
                 const pairsAfterAnimation = currentPairIndex + 1; // Including the new pair being added
                 const oldSliceAngle = pairsBeforeAnimation > 0 ? 180 / pairsBeforeAnimation : 180; // Handle first pair case
                 const newSliceAngle = 180 / pairsAfterAnimation;
                 const totalRotationNeeded = 180 / pairsAfterAnimation; // How much the line needs to rotate
                 const progress = Math.abs(lineRotation) / totalRotationNeeded;
                 currentSliceAngle = oldSliceAngle + (newSliceAngle - oldSliceAngle) * progress;
              } else {
                currentSliceAngle = 180 / totalPairs;
              }
              
              const pairData = pairTexts[pairIndex];
              if (!pairData) return null;
              
              // Calculate angles with smooth transformation
              const thesisStartAngle = 180 + currentSliceAngle/2 + (pairIndex * currentSliceAngle);
              const antithesisStartAngle = 0 + currentSliceAngle/2 + (pairIndex * currentSliceAngle);
              
              // Only mask the new pair being revealed
              const shouldMask = isAnimating && pairIndex === currentPairIndex;
              // Show boundaries for all pairs except the one currently being revealed
              const shouldShowBoundaries = !shouldMask;
              
              return (
                <g key={`pair-${pairIndex}`} mask={shouldMask ? "url(#newPairRevealMask)" : undefined}>
                  {/* Thesis slice (top semicircle) */}
                  <SliceAtAngle
                    sliceData={{ labels: pairData.thesis }}
                    sliceId={`thesis-${pairIndex}`}
                    angle={thesisStartAngle}
                    cx={cx}
                    cy={cy}
                    radius={radius}
                    sliceAngle={currentSliceAngle}
                    pairIndex={pairIndex}
                    sliceType="thesis"
                    showBoundaries={shouldShowBoundaries}
                  />
                  
                  {/* Antithesis slice (bottom semicircle) */}
                  <SliceAtAngle
                    sliceData={{ labels: pairData.antithesis }}
                    sliceId={`antithesis-${pairIndex}`}
                    angle={antithesisStartAngle}
                    cx={cx}
                    cy={cy}
                    radius={radius}
                    sliceAngle={currentSliceAngle}
                    pairIndex={pairIndex}
                    sliceType="antithesis"
                    showBoundaries={shouldShowBoundaries}
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