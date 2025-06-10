import React from 'react';

const SvgMarkers: React.FC = () => {
  return (
    <defs>
      {/* Rotation hint arrowheads */}
      <marker
        id="rotation-arrow"
        markerWidth="8"
        markerHeight="6"
        refX="8"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="#007AFF"
          fillOpacity="0.6"
        />
      </marker>
      
      <marker
        id="arrowhead"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
      >
        <polygon
          points="0 0, 6 2, 0 4"
          fill="#0074d9"
        />
      </marker>
      <marker
        id="arrowhead-orange"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
      >
        <polygon
          points="0 0, 6 2, 0 4"
          fill="#FF6B35"
        />
      </marker>
      <marker
        id="arrowhead-blue"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
      >
        <polygon
          points="0 0, 6 2, 0 4"
          fill="#2196F3"
        />
      </marker>
      <marker
        id="arrowhead-purple"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
      >
        <polygon
          points="0 0, 6 2, 0 4"
          fill="#9C27B0"
        />
      </marker>
      <marker
        id="arrowhead-green"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
      >
        <polygon
          points="0 0, 6 2, 0 4"
          fill="#4CAF50"
        />
      </marker>
    </defs>
  );
};

export default SvgMarkers; 