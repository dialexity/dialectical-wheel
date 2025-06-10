import React from 'react';
import { ANIMATION, DIMENSIONS, COLORS } from '../config/wheelConfig';

const RotationHints: React.FC = () => {
  const ripples = ANIMATION.ROTATION_HINTS;

  return (
    <g className="rotation-hints" opacity="0.8">
      {/* Multiple concentric ripples with different speeds and patterns */}
      {ripples.map((ripple, index) => (
        <circle 
          key={index}
          cx={DIMENSIONS.CENTER_X} 
          cy={DIMENSIONS.CENTER_Y} 
          r={ripple.radius} 
          fill="none" 
          stroke={COLORS.PRIMARY_BLUE} 
          strokeWidth={ripple.strokeWidth} 
          strokeDasharray={ripple.dashArray}
          opacity={ripple.opacity}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 ${DIMENSIONS.CENTER_X} ${DIMENSIONS.CENTER_Y}`}
            to={`${ripple.direction * 360} ${DIMENSIONS.CENTER_X} ${DIMENSIONS.CENTER_Y}`}
            dur={ripple.duration}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
};

export default RotationHints; 