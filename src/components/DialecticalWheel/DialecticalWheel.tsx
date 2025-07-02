import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef, useState, useCallback} from 'react';
// @ts-ignore - Import the fixed version from package.json
import notebook from '@dialexity/dialectical-wheel';

export interface DialecticalWheelProps {
  dialecticalData: any;
  arrowConnections?: string;
  style?: React.CSSProperties;
  onChartReady?: (chart: any) => void;
  onTopSliceChange?: (topSlice: any) => void;
  onFocusedSliceChange?: (focusedSlice: any) => void;
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
  const [chart, setChart] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const runtimeRef = useRef<any>(null);
  
  // Memoize the inspector factory to prevent recreation
  const createInspector = useCallback((name: string) => {
    if (name === 'viewof chart') {
      return new class extends Inspector {
        constructor(node: any) {
          super(node);
        }
        fulfilled(value: any) {
          setChart(value);
          if (onChartReady) onChartReady(value);
          return super.fulfilled(value);
        }
      }(chartRef.current);
    }
    
    if (name === 'topSlice') {
      return new class extends Inspector {
        constructor() {
          super(document.createElement('div')); // Create dummy element
        }
        fulfilled(value: any) {
          console.log('topSlice updated:', value);
          if (onTopSliceChange) onTopSliceChange(value);
          return super.fulfilled(value);
        }
      }();
    }
    
    if (name === 'focusedSlice') {
      return new class extends Inspector {
        constructor() {
          super(document.createElement('div')); // Create dummy element
        }
        fulfilled(value: any) {
          console.log('focusedSlice updated:', value);
          if (onFocusedSliceChange) onFocusedSliceChange(value);
          return super.fulfilled(value);
        }
      }();
    }
    
    // For other variables, return undefined to hide them
    return undefined;
  }, [onChartReady, onTopSliceChange, onFocusedSliceChange]);

  // Initialize the notebook only once
  useEffect(() => {
    if (!chartRef.current) return;
    
    console.log('Initializing Observable notebook...');
    
    const runtime = new Runtime();
    runtimeRef.current = runtime;
    
    // Create the module with initial data
    const main = runtime.module(notebook, createInspector);
    
    // Set initial data immediately after module creation
    try {
      main.redefine('dialecticalData', dialecticalData);
      main.redefine('arrowConnections', arrowConnections);
    } catch (error) {
      console.warn('Could not set initial data:', error);
    }
    
    setModule(main);
    setIsInitialized(true);
    
    return () => {
      console.log('Cleaning up Observable notebook...');
      setIsInitialized(false);
      setModule(null);
      setChart(null);
      if (runtimeRef.current) {
        runtimeRef.current.dispose();
        runtimeRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once

  // Update data when props change, but only after initialization
  useEffect(() => {
    if (!module || !isInitialized) return;
    
    console.log('Updating notebook data...');
    
    try {
      module.redefine('dialecticalData', dialecticalData);
      module.redefine('arrowConnections', arrowConnections);
    } catch (error) {
      console.error('Failed to update notebook data:', error);
    }
  }, [dialecticalData, arrowConnections, module, isInitialized]);

  return (
    <div className="dialectical-wheel-wrapper">
      <div 
        ref={chartRef} 
        className="chart-container"
        style={{
          borderRadius: '8px',
          background: 'white',
          minHeight: '400px', // Ensure container has some height
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
          <div>Debug Info:</div>
          <div>Initialized: {isInitialized ? 'Yes' : 'No'}</div>
          <div>Chart loaded: {chart ? 'Yes' : 'No'}</div>
          <div>Data entries: {dialecticalData ? Object.keys(dialecticalData).length : 0}</div>
          <div>Data keys: {dialecticalData ? Object.keys(dialecticalData).join(', ') : 'None'}</div>
          <div>Arrow connections: {arrowConnections || 'None'}</div>
          <div>Using package: @dialexity/dialectical-wheel</div>
        </div>
      )}
    </div>
  );
}