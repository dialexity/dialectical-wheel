import {Runtime, Inspector} from '@observablehq/runtime';
import React, {useEffect, useRef, useState} from 'react';
import StepControls from './components/StepControls';
import ArrowControls from './components/ArrowControls';

interface DialecticalEntry {
  statement: string;
  positive: string;
  negative: string;
}

interface DialecticalData {
  [key: string]: DialecticalEntry;
}

interface DialecticalWheelProps {
  dialecticalData: DialecticalData;
}

export default function DialecticalWheel({ dialecticalData }: DialecticalWheelProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [module, setModule] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    async function load() {
      // @ts-ignore - Dynamic import from Observable API
      const {default: notebook} = await import("https://api.observablehq.com/@dialexity/dialectical-wheel.js?v=3");
      const runtime = new Runtime();
      
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
      return runtime;
    }
    
    const promise = load();

    return () => {
      promise.then((runtime) => {
        setModule(null);
        setChart(null);
        runtime.dispose();
      });
    };
  }, []);

  useEffect(() => {
    if (module) {
      module.redefine("dialecticalData", dialecticalData);
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
      
      <ArrowControls chart={chart} dialecticalData={dialecticalData} />
    </div>
  );
} 