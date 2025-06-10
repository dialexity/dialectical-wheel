import React from 'react';
import { MARKERS } from '../config/wheelConfig';

const SvgMarkers: React.FC = () => {
  const { ROTATION_ARROW, ARROWHEADS, ARROWHEAD_DIMENSIONS } = MARKERS;
  
  return (
    <defs>
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