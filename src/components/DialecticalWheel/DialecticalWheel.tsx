import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore - Import the fixed version from package.json
import notebook from '@dialexity/dialectical-wheel';
//import './DialecticalWheel.css';
import './DialecticalWheel-fonts.css';

export interface DialecticalWheelProps {
  dialecticalData: Record<string, any>;
  arrowConnections?: string;
  style?: React.CSSProperties;
  onChartReady?: (chart: any) => void;
  onTopSliceChange?: (topSlice: string) => void;
  onFocusedSliceChange?: (focusedSlice: string) => void;
  debug?: boolean;
}

export default function DialecticalWheel({
  dialecticalData,
  arrowConnections = '',
  style = {},
  onChartReady,
  onTopSliceChange,
  onFocusedSliceChange,
  debug = false
}: DialecticalWheelProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [module, setModule] = useState<any>(null);
  //const [chart, setChart] = useState<any>(null);
  //const [runtime, setRuntime] = useState<any>(null);
  
  useEffect(() => {
    console.log('Loading Observable notebook from local npm package...');
    
    const runtime = new Runtime();
    //setRuntime(runtime);
    
    const main = runtime.module(notebook, (name: string) => {
      if (name === 'viewof chart') {
        return new class extends Inspector {
          constructor(node: any) {
            super(node);
          }
          fulfilled(value: any) {
            // The chart value IS the SVG node with methods attached
            //setChart(value);
            if (onChartReady) onChartReady(value);
            return super.fulfilled(value);
          }
        }(chartRef.current);
      }
      if (name === 'topSlice') {
        return {
          fulfilled(value: any) {
            console.log('topSlice updated:', value);
            if (onTopSliceChange) onTopSliceChange(value);
          }
        };
      }
      if (name === 'focusedSlice') {
        return {
          fulfilled(value: any) {
            console.log('focusedSlice updated:', value);
            if (onFocusedSliceChange) onFocusedSliceChange(value);
          }
        };
      }
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });

    setModule(main);
    
    return () => {
      setModule(null);
      //setChart(null);
      //setRuntime(null);
      runtime.dispose();
    };
  }, []);

  // Separate useEffect for redefining data - this follows the Observable examples pattern
  useEffect(() => {
    if (module) {
      try {
        module.redefine('dialecticalData', dialecticalData);
        module.redefine('arrowConnections', arrowConnections);
      } catch (error) {
        console.warn('Could not redefine variables in notebook:', error);
      }
    }
  }, [dialecticalData, arrowConnections, module]);

  return (
    <div className="dialectical-wheel-wrapper">
      <div 
        ref={chartRef} 
        className="chart-container"
        style={{
          borderRadius: '8px',
          background: 'white',
          ...style
        }}
      />
      
      {/* Debug info */}
      {debug && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          background: '#f8f9fa', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }}>
          Debug: {Object.keys(dialecticalData).length} entries passed: {Object.keys(dialecticalData).join(', ')}<br/>
          Using local npm package: @dialexity/dialectical-wheel
        </div>
      )}
    </div>
  );
} 