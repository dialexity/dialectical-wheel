import {Runtime, Inspector} from '@observablehq/runtime';
import {useEffect, useRef, useState} from 'react';
import {toggle} from '@observablehq/inputs';
// @ts-ignore - Import from local notebook file
import notebook from '../../notebook/dialectical-wheel.js';
//import './DialecticalWheel.css';
import './DialecticalWheel-fonts.css';
import type { DialecticalWheelProps } from '../../types';

const DEFAULT_PREFERENCES = {
  whitesOnly: false,
  TsOnly: false,
  AsOnly: false,
  isWhiteOutside: false,
  showFlow: false,
  graphView: false
};

const DEFAULT_COLORS = {
  userRingColors: {
    outer: "#F9C6CC",
    middle: "#ffffff",
    inner: "#C6E5B3"
  },
  userTextColors: {
    outer: "#8b1538",
    middle: "#333",
    inner: "#2d5a2d",
    coordinates: "#333"
  },
  userHubColor: "#ffff7a"
};

export default function DialecticalWheel({
  wisdomUnits,
  componentOrder,
  preferences = DEFAULT_PREFERENCES,
  colors = DEFAULT_COLORS,
  arrowConnections = '',
  style = {},
  onChartReady,
  onTopSliceChange,
  onFocusedSliceChange,
  onClickedCellChange,
  debug = false
}: DialecticalWheelProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [module, setModule] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);
  //const [runtime, setRuntime] = useState<any>(null);
  
  useEffect(() => {
    console.log('Loading Observable notebook from local npm package...');
    
    const runtime = new Runtime();
    //setRuntime(runtime);
    
    const main = runtime.module(notebook, (name: string) => {
      if (name === 'viewof chart') {
        // Only attach an Inspector when the chart container is mounted.
        // When graphView is true, chartRef.current will be null because the ref is assigned to graphRef instead.
        if (!chartRef.current) return undefined;
        return new class extends Inspector {
          constructor(node: any) {
            super(node);
          }
          fulfilled(value: any) {
            // The chart value IS the SVG node with methods attached
            setChart(value);
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
      if (name === "clickedCellObject") {
        return {
          fulfilled(value: any) {
            console.log('clickedCellObject updated:', value);
            if (onClickedCellChange) onClickedCellChange(value);
          }
        };
      }
      if (name === "graph") return graphRef.current ? new Inspector(graphRef.current) : undefined;
      /*if (name === "graph") {
        return new class extends Inspector {
          constructor(node: any) {
            super(node);
          }
          fulfilled(value: any) {
            console.log('graph updated:', value);
            return super.fulfilled(value);
          }
        }(graphRef.current);
      }*/
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });

    setModule(main);
    
    return () => {
      setModule(null);
      setChart(null);
      //setRuntime(null);
      runtime.dispose();
    };
  }, []);

  // Separate useEffect for redefining data - this follows the Observable examples pattern
  useEffect(() => {
    if (module) {
      try {
        //module.redefine('dialecticalData', dialecticalData);
        module.redefine('arrowConnections', arrowConnections);
        module.redefine('wisdomUnits', wisdomUnits);
        module.redefine('componentOrder', componentOrder);
        // Redefine the actual view cells so downstream `Generators.input(viewof ...)` works
        module.redefine('viewof whitesOnly', toggle({label: 'White cells only', value: preferences.whitesOnly}));
        module.redefine('viewof TsOnly', toggle({label: 'Ts only', value: preferences.TsOnly}));
        module.redefine('viewof AsOnly', toggle({label: 'As only', value: preferences.AsOnly}));
        module.redefine('viewof isWhiteOutside', toggle({label: 'Swap red and white layer', value: preferences.isWhiteOutside}));
        //module.redefine('viewof showFlow', toggle({label: 'Show sequential flow', value: preferences.showFlow}));
        module.redefine('userRingColors', (colors.userRingColors));
        module.redefine('userTextColors', (colors.userTextColors));
        module.redefine('userHubColor', (colors.userHubColor));
      } catch (error) {
        console.warn('Could not redefine variables in notebook:', error);
      }
    }
  }, [
    wisdomUnits,
    componentOrder,
    preferences.whitesOnly,
    preferences.TsOnly,
    preferences.AsOnly,
    preferences.isWhiteOutside,
    //preferences.showFlow,
    preferences.graphView,
    colors.userRingColors,
    colors.userTextColors,
    colors.userHubColor,
    arrowConnections,
    module
  ]);

  // Dynamic chart control useEffect - handles real-time flow toggling
  useEffect(() => {
    if (chart) {
      if (preferences.showFlow) {
        chart.toggleFlowArrows(true);
      } else {
        chart.toggleFlowArrows(false);
      }
    }
  }, [chart, preferences.showFlow]);

  return (
    <div className="dialectical-wheel-wrapper">
      <div 
        ref={chartRef} 
        className="chart-container"
        style={{
          borderRadius: '8px',
          background: 'white',
          ...style,
          display: preferences.graphView ? 'none' : 'block'
        }}
      />
      <div 
        ref={graphRef} 
        className="chart-container"
        style={{
          borderRadius: '8px',
          background: 'white',
          ...style,
          display: preferences.graphView ? 'block' : 'none'
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
          Debug: {wisdomUnits.length} entries passed: {componentOrder.join(', ')}<br/>
          Using local notebook: src/notebook/dialectical-wheel.js
        </div>
      )}
    </div>
  );
} 