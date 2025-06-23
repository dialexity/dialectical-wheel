import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'motion/react';
import { DIMENSIONS, COLORS, SLICES, STROKES } from '../config/wheelConfig';
import { SliceAtAngle } from '../../../utils/SliceGenerator';

// Sample data for demo
const samplePairData = {
  thesis: [
    ['Environmental sustainability', 'green'] as [string, string],
    ['Decision to adopt electric or gas vehicle', 'black'] as [string, string], 
    ['Dependence on limited charging infrastructure', 'red'] as [string, string]
  ],
  antithesis: [
    ['Practicality in current conditions', 'green'] as [string, string],
    ['Preference for current convenience over future innovation', 'white'] as [string, string], // White text for black background
    ['Resistance to adapting new technologies', 'red'] as [string, string]
  ]
};

interface FramerMotionWheelBuilderProps {
  onComplete?: () => void;
}

export const FramerMotionWheelBuilder: React.FC<FramerMotionWheelBuilderProps> = ({
  onComplete
}) => {
  const [showDividingLine, setShowDividingLine] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lineRotation, setLineRotation] = useState(0);
  const [showPairs, setShowPairs] = useState(false);
  const [showGreenLayers, setShowGreenLayers] = useState(false);

  const cx = DIMENSIONS.CENTER_X;
  const cy = DIMENSIONS.CENTER_Y;
  const radius = DIMENSIONS.RADIUS;

  useEffect(() => {
    const sequence = async () => {
      // 1. Wait a moment, then show the horizontal dividing line
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowDividingLine(true);
      
      // 2. Wait for line to appear, then show the white slices and start sweep
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowPairs(true);
      setIsAnimating(true);
      
      // 3. Animate the line rotation from 0° to -180° (counterclockwise)
      const rotationDuration = 3000;
      const startTime = Date.now();
      
      await new Promise<void>((resolve) => {
        const animateRotation = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / rotationDuration, 1);
          
          // Smooth easing function (same as working version)
          const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const easedProgress = easeInOut(progress);
          
          setLineRotation(easedProgress * -180); // Negative for counterclockwise
          
          if (progress < 1) {
            requestAnimationFrame(animateRotation);
          } else {
            setIsAnimating(false);
            resolve();
          }
        };
        
        animateRotation();
      });
      
      // 4. After sweep completes, animate green layers growing from center
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowGreenLayers(true);
      
      // 5. Complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onComplete) {
        onComplete();
      }
    };
    
    sequence();
  }, [onComplete]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="max-w-full max-h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          {/* Mask for progressive reveal (same pattern as working version) */}
          <mask id="progressiveRevealMask">
            <rect width="400" height="400" fill="black" />
            {/* White area reveals the slices being swept over */}
            {isAnimating && (
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

        {/* Wheel circumference border */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#000"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        
        {/* White layer slices - masked by progressive reveal */}
        {showPairs && (
          <g mask={isAnimating ? "url(#progressiveRevealMask)" : undefined}>
            {/* Thesis (upper semicircle) - only middle layer */}
            <SliceAtAngle
              sliceData={{ labels: [samplePairData.thesis[1]] }} // Only middle layer
              sliceId="thesis-demo"
              angle={270} // Top of circle
              cx={cx}
              cy={cy}
              radius={radius}
              sliceAngle={180} // Half circle
              pairIndex={0}
              sliceType="thesis"
              showBoundaries={true}
              layerColors={['#fff']} // Single white layer for thesis
              fontSizes={[18]} // Bigger font size for single layer
            />

            {/* Antithesis (lower semicircle) - only middle layer with inverted colors */}
            <SliceAtAngle
              sliceData={{ labels: [samplePairData.antithesis[1]] }} // Only middle layer
              sliceId="antithesis-demo"
              angle={90} // Bottom of circle
              cx={cx}
              cy={cy}
              radius={radius}
              sliceAngle={180} // Half circle
              pairIndex={0}
              sliceType="antithesis"
              showBoundaries={true}
              layerColors={['#333']} // Single black layer for antithesis
              fontSizes={[18]} // Bigger font size for single layer
            />
          </g>
        )}
        
        {/* Green layers - animated growing from center after sweep */}
        <AnimatePresence>
          {showGreenLayers && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Thesis green layer */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ originX: `${cx}px`, originY: `${cy}px` }}
              >
                <SliceAtAngle
                  sliceData={{ labels: [samplePairData.thesis[0]] }} // Green layer
                  sliceId="thesis-green-demo"
                  angle={270} // Top of circle
                  cx={cx}
                  cy={cy}
                  radius={radius}
                  sliceAngle={180} // Half circle
                  pairIndex={0}
                  sliceType="thesis"
                  showBoundaries={true}
                  layerColors={[COLORS.LAYER_COLORS[0]]} // Green layer color
                  fontSizes={[16]} // Smaller font for green layer
                />
              </motion.g>
              
              {/* Antithesis green layer */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                style={{ originX: `${cx}px`, originY: `${cy}px` }}
              >
                <SliceAtAngle
                  sliceData={{ labels: [samplePairData.antithesis[0]] }} // Green layer
                  sliceId="antithesis-green-demo"
                  angle={90} // Bottom of circle
                  cx={cx}
                  cy={cy}
                  radius={radius}
                  sliceAngle={180} // Half circle
                  pairIndex={0}
                  sliceType="antithesis"
                  showBoundaries={true}
                  layerColors={[COLORS.LAYER_COLORS[0]]} // Green layer color
                  fontSizes={[16]} // Smaller font for green layer
                />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
        
        {/* Static horizontal dividing line */}
        <AnimatePresence>
          {showDividingLine && (
            <motion.line
              x1={cx - radius}
              y1={cy}
              x2={cx + radius}
              y2={cy}
              stroke={COLORS.BOUNDARY_LINES}
              strokeWidth={STROKES.BOUNDARY_WIDTH * 2}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ originX: '50%', originY: '50%' }}
            />
          )}
        </AnimatePresence>
        
        {/* Rotating sweep line (same as working version) */}
        {isAnimating && (
          <g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: `rotate(${lineRotation}deg)`
            }}
          >
            <motion.line
              x1={cx - radius}
              y1={cy}
              x2={cx + radius}
              y2={cy}
              stroke={COLORS.BOUNDARY_LINES}
              strokeWidth={STROKES.BOUNDARY_WIDTH * 3}
              opacity={0.8}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </g>
        )}
        
        {/* Center circle - rendered last to appear on top of sweep line */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius * DIMENSIONS.SLICE_INNER_RADIUS_RATIO} // 45px - fills gap to green layer
          fill={COLORS.CENTER_CIRCLE}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Center label */}
        <motion.text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          🚗 vs 🔋
        </motion.text>
      </motion.svg>
    </div>
  );
};