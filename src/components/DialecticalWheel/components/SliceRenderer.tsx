import React from 'react';
import { SliceAtAngle, defaultPairTexts } from '../../../utils/SliceGenerator';
import type { PairTexts } from '../hooks';

interface SliceRendererProps {
  dynamicSlices: any[];
  memoizedSliceData: Map<string, any>;
  handleSliceClick: (pairIndex: number) => void;
  handleSliceTouchStart: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
  handleSliceTouchEnd: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
  rotation: number;
  pairTexts: PairTexts | null;
}

const SliceRenderer: React.FC<SliceRendererProps> = ({
  dynamicSlices,
  memoizedSliceData,
  handleSliceClick,
  handleSliceTouchStart,
  handleSliceTouchEnd,
  rotation,
  pairTexts
}) => {
  return (
    <>
      {/* Static slice components from Python-generated SVG (hidden when dynamic slices active) */}
      <g id="slice-container" style={{ display: 'none' }}>
        {/* These would be the detailed slices from the Python SVG output */}
      </g>
      
      {/* Dynamic slices (like the JavaScript createClickableSlice output) */}
      <g id="dynamic-slice-container">
        {dynamicSlices.map((slice) => {
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
                  onClick={() => handleSliceClick(slice.pair)}
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
          const sliceData = memoizedSliceData.get(slice.id);
          
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
                    onClick={() => handleSliceClick(slice.pair)}
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
                transform={`rotate(${-rotation} ${sliceData.textX} ${sliceData.textY})`}
              >
                {sliceData.label}
              </text>
            </g>
          );
        })}
      </g>
    </>
  );
};

export default SliceRenderer; 