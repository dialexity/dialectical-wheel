import React from 'react';

const RotationHints: React.FC = () => {
  const ripples = [
    { radius: 160, opacity: 0.7, strokeWidth: 2, dashArray: "8 4", duration: "6s", direction: 1 },
    { radius: 170, opacity: 0.6, strokeWidth: 1.5, dashArray: "4 8", duration: "8s", direction: 1 },
    { radius: 180, opacity: 0.5, strokeWidth: 2, dashArray: "2 4", duration: "12s", direction: -1 },
    { radius: 190, opacity: 0.4, strokeWidth: 1, dashArray: "6 3", duration: "10s", direction: 1 },
    { radius: 200, opacity: 0.3, strokeWidth: 1.5, dashArray: "3 6", duration: "15s", direction: -1 },
    { radius: 210, opacity: 0.2, strokeWidth: 1, dashArray: "5 2", duration: "18s", direction: 1 }
  ];

  return (
    <g className="rotation-hints" opacity="0.8">
      {/* Multiple concentric ripples with different speeds and patterns */}
      {ripples.map((ripple, index) => (
        <circle 
          key={index}
          cx="200" 
          cy="200" 
          r={ripple.radius} 
          fill="none" 
          stroke="#007AFF" 
          strokeWidth={ripple.strokeWidth} 
          strokeDasharray={ripple.dashArray}
          opacity={ripple.opacity}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 200 200"
            to={`${ripple.direction * 360} 200 200`}
            dur={ripple.duration}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
};

export default RotationHints; 