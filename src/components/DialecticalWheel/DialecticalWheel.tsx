import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef, useState} from 'react';
import { useAppSelector } from '../../store/hooks';
import StepControls from './components/StepControls';
import ArrowControls from './components/ArrowControls';
import DataEditor from './components/DataEditor';
// @ts-ignore - Import the fixed version from package.json
import notebook from '@dialexity/dialectical-wheel';

export default function DialecticalWheel() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [module, setModule] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);
  const [runtime, setRuntime] = useState<any>(null);
  
  // Get dialectical data from Redux store
  const dialecticalData = useAppSelector(state => state.dialectical.data);

  useEffect(() => {
    console.log('Loading Observable notebook from local npm package...');
    
    const runtime = new Runtime();
    setRuntime(runtime);
    
    const main = runtime.module(notebook, (name: string) => {
      if (name === 'chart') {
        return new class extends Inspector {
          constructor(node: any) {
            super(node);
          }
          fulfilled(value: any) {
            // The chart value IS the SVG node with methods attached
            setChart(value);
            return super.fulfilled(value);
          }
        }(chartRef.current);
      }
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });

    setModule(main);
    
    return () => {
      setModule(null);
      setChart(null);
      setRuntime(null);
      runtime.dispose();
    };
  }, []);

  // Separate useEffect for redefining data - this follows the Observable examples pattern
  useEffect(() => {
    if (module && dialecticalData) {
      console.log('Redefining dialecticalData in Observable notebook');
      try {
        module.redefine("dialecticalData", dialecticalData);
        console.log('Successfully redefined dialecticalData from local npm package');
      } catch (error) {
        console.warn('Could not redefine dialecticalData:', error);
      }
    }
  }, [dialecticalData, module]);



  return (
    <div className="dialectical-wheel-wrapper">
      <div 
        ref={chartRef} 
        className="chart-container"
        style={{
          width: '800px',
          height: '800px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          background: 'white'
        }}
      />
      
      <StepControls chart={chart} />
      
      <ArrowControls chart={chart} />
      
      {/* Debug info */}
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        background: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        Debug: {Object.keys(dialecticalData).length} entries in Redux store: {Object.keys(dialecticalData).join(', ')}<br/>
        Using local npm package: @dialexity/dialectical-wheel
      </div>
    </div>
  );
} 