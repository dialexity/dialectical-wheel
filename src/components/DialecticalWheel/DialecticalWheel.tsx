import React, { useMemo } from 'react';
import './DialecticalWheel.css';
import { defaultPairTexts, SliceAtAngle } from '../../utils/SliceGenerator';
import { 
  useWheelSequence, 
  useWheelInteraction, 
  useWheelSlices, 
  useNodeConnections,
  SliceConfig,
  DetailedSlices,
  PairTexts 
} from './hooks';
import { WheelControls, WheelOverlays, RotationHints } from './components';

// Type definitions
interface DialecticalWheelProps {
  numPairs?: number;
  title?: string;
  centerLabel?: string;
  sliceSequence?: SliceConfig[] | null;
  fullSequence?: any[] | null; // Complete sequence from API (overrides sliceSequence)
  detailedSlices?: DetailedSlices;
  pairTexts?: PairTexts | null;
}

const DialecticalWheel: React.FC<DialecticalWheelProps> = ({ 
  numPairs = 4, 
  title = "Win-Win",
  centerLabel = "Core",
  sliceSequence = null,
  fullSequence = null,
  detailedSlices = {},
  pairTexts = null
}) => {
  // Use our custom hooks
  const sequence = useWheelSequence(numPairs, sliceSequence);
  const interaction = useWheelInteraction();
  const slices = useWheelSlices(
    sequence.sequenceWithLabels,
    sequence.normalSliceAngle,
    sequence.focusedSliceAngle,
    sequence.unfocusedSliceAngle,
    interaction.rotation,
    interaction.setRotation,
    pairTexts,
    detailedSlices
  );
  const connections = useNodeConnections(
    slices.dynamicSlices,
    title,
    interaction.recordRef
  );

  // Log the sequence for debugging (like the original HTML)
  console.log(`Initialized ${title} wheel with sequence:`, sequence.sequenceWithLabels.map(s => s.label).join(', '));

  // Touch handlers for slice clicks
  const handleSliceTouchStart = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchStart(e, pairIndex);
  };

  const handleSliceTouchEnd = (e: React.TouchEvent<SVGElement>, pairIndex: number): void => {
    slices.handleSliceTouchEnd(e, pairIndex);
  };

  return (
    <div className="dialectical-wheel-container">
      <div className="main-content" style={{ paddingTop: '0' }}>
        <WheelOverlays
          isZoomedToQ2={interaction.isZoomedToQ2}
          onToggleTopHalfZoom={interaction.toggleTopHalfZoom}
        />
        
        <div className="wheel-container">
          <svg 
            className="wheel-svg" 
            viewBox="0 0 400 400"
            {...interaction.svgProps}
          >
            <g ref={interaction.recordRef} className="record">
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
              
              {/* Static slice components from Python-generated SVG (hidden when dynamic slices active) */}
              <g id="slice-container" style={{ display: 'none' }}>
                {/* These would be the detailed slices from the Python SVG output */}
              </g>
              
              {/* Dynamic slices (like the JavaScript createClickableSlice output) */}
              <g id="dynamic-slice-container">
                {slices.dynamicSlices.map((slice) => {
                  console.log('Rendering slice:', slice.id, 'type:', slice.type, 'detailed:', slice.detailed, 'angle:', slice.angle);
                  
                  // Handle detailed slices differently - use React component directly
                  if (slice.detailed) {
                    console.log('Detailed slice transform:', `rotate(${slice.angle} 200 200)`);
                    console.log('Detailed slice pair:', slice.pair, 'type:', slice.type);
                    
                    // Extract text data from defaultPairTexts for this slice
                    const usePairTexts = pairTexts || defaultPairTexts;
                    const sliceTexts = usePairTexts[slice.pair as keyof typeof usePairTexts];
                    
                    if (sliceTexts) {
                      const labels = slice.type === 'thesis' ? sliceTexts.thesis : sliceTexts.antithesis;
                      
                      return (
                        <g 
                          key={slice.id} 
                          className={`slice-component ${slice.type}-slice focused-pair`}
                          onClick={() => slices.handleSliceClick(slice.pair)}
                          onTouchStart={(e) => handleSliceTouchStart(e, slice.pair)}
                          onTouchEnd={(e) => handleSliceTouchEnd(e, slice.pair)}
                          style={{ cursor: 'pointer' }}
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
                        </g>
                      );
                    }
                  }
                  
                  // Handle simple slices (now with layered rings) - use memoized data
                  console.log(`📋 RENDER: Using memoized data for slice ${slice.id} (${slice.label})`);
                  const sliceData = slices.memoizedSliceData.get(slice.id);
                  
                  if (!sliceData) {
                    console.warn('No memoized slice data found for slice:', slice.id);
                    return null;
                  }
                  
                  // Text color based on slice type (thesis = green, antithesis = red)
                  const textColor = slice.type === 'thesis' ? '#4CAF50' : '#F44336';
                  
                  return (
                    <g key={slice.id} className={`equal-slice ${slice.type}-slice`}>
                      {/* Render layered rings */}
                                             {sliceData.layers.map((layer: { pathD: string; fill: string }, layerIndex: number) => {
                        // Use original index for node IDs if available, otherwise use current slice ID
                        const nodeIdBase = slice.originalIndex !== undefined ? `slice-${slice.originalIndex}` : slice.id;
                        const nodeId = `${nodeIdBase}-layer-${layerIndex}`;
                        
                        return (
                          <path
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
                            onClick={() => slices.handleSliceClick(slice.pair)}
                            onTouchStart={(e) => handleSliceTouchStart(e, slice.pair)}
                            onTouchEnd={(e) => handleSliceTouchEnd(e, slice.pair)}
                            style={{ cursor: 'pointer' }}
                          />
                        );
                      })}
                      {/* Slice boundary lines */}
                      <line 
                        x1="200" 
                        y1="200" 
                        x2={200 + 150 * Math.cos((slice.angle - slice.width/2) * Math.PI / 180)} 
                        y2={200 + 150 * Math.sin((slice.angle - slice.width/2) * Math.PI / 180)} 
                        stroke="#888" 
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                      <line 
                        x1="200" 
                        y1="200" 
                        x2={200 + 150 * Math.cos((slice.angle + slice.width/2) * Math.PI / 180)} 
                        y2={200 + 150 * Math.sin((slice.angle + slice.width/2) * Math.PI / 180)} 
                        stroke="#888" 
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                      {/* Text label with thesis/antithesis color */}
                      <text
                        x={sliceData.textX}
                        y={sliceData.textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={sliceData.fontSize}
                        fontWeight="bold"
                        fill={textColor}
                        pointerEvents="none"
                        transform={`rotate(${-interaction.rotation} ${sliceData.textX} ${sliceData.textY})`}
                      >
                        {sliceData.label}
                      </text>
                    </g>
                  );
                })}
              </g>
              
              {/* Rotation hint ripples */}
              <RotationHints />

              {/* Center circle */}
              <circle cx="200" cy="200" r="30" fill="#FFC107"/>
              <text 
                x="200" 
                y="200" 
                fontSize="16" 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                {centerLabel}
              </text>
            </g>
          </svg>
        </div>
      </div>
      
      <WheelControls
        showArrows={connections.showArrows}
        onToggleArrows={connections.toggleArrows}
        onReset={slices.reset}
      />
    </div>
  );
};

export default DialecticalWheel; 