import React from 'react';
import { MARKERS } from '../config/wheelConfig';

const SvgMarkers: React.FC = () => {
  const { ROTATION_ARROW, ARROWHEADS, ARROWHEAD_DIMENSIONS } = MARKERS;
  
  return (
    <defs>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.12)" />
      </filter>
      

      <radialGradient id="arrowGradient-orange" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#FF6B35" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#FF6B35" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FF6B35" stopOpacity="1" />
      </radialGradient>
      
      <radialGradient id="arrowGradient-blue" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#2196F3" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#2196F3" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#2196F3" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#2196F3" stopOpacity="1" />
      </radialGradient>
      
      <radialGradient id="arrowGradient-purple" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#9C27B0" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#9C27B0" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#9C27B0" stopOpacity="1" />
      </radialGradient>
      
      <radialGradient id="arrowGradient-green" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#4CAF50" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#4CAF50" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#4CAF50" stopOpacity="1" />
      </radialGradient>
      
      <radialGradient id="arrowGradient-default" cx="0%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#666" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#666" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#666" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#666" stopOpacity="1" />
      </radialGradient>
      
      {/* Rotation hint arrowheads */}
      <marker
        id={ROTATION_ARROW.id}
        markerWidth={ROTATION_ARROW.width}
        markerHeight={ROTATION_ARROW.height}
        refX={ROTATION_ARROW.refX}
        refY={ROTATION_ARROW.refY}
        orient="auto"
      >
        <polygon
          points={`0 0, ${ROTATION_ARROW.width} ${ROTATION_ARROW.refY}, 0 ${ROTATION_ARROW.height}`}
          fill={ROTATION_ARROW.color}
          fillOpacity={ROTATION_ARROW.opacity}
        />
      </marker>
      
      {/* Dynamic arrowhead markers */}
      {ARROWHEADS.map((arrow) => (
        <marker
          key={arrow.id}
          id={arrow.id}
          markerWidth={ARROWHEAD_DIMENSIONS.width}
          markerHeight={ARROWHEAD_DIMENSIONS.height}
          refX={ARROWHEAD_DIMENSIONS.refX}
          refY={ARROWHEAD_DIMENSIONS.refY}
          orient="auto"
        >
          <polygon
            points={`0 0, ${ARROWHEAD_DIMENSIONS.width} ${ARROWHEAD_DIMENSIONS.refY}, 0 ${ARROWHEAD_DIMENSIONS.height}`}
            fill={arrow.color}
          />
        </marker>
      ))}
    </defs>
  );
};

export default SvgMarkers; 