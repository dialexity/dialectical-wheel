import DialecticalWheel from 'dialectical-wheel';
import StepControls from 'dialectical-wheel';
import ArrowControls from 'dialectical-wheel';
import React, { useState } from 'react';
//import './App.css';

function exampleApp() {
  const [dialecticalData, setDialecticalData] = useState<any>({
    T1: {
      statement: "Sample thesis 1",
      positive: "Positive point 1",
      negative: "Negative point 1"
    },
    T2: {
      statement: "Sample thesis 2",
      positive: "Positive point 2",
      negative: "Negative point 2"
    },
    A1: {
      statement: "Sample antithesis 1",
      positive: "Positive point A1",
      negative: "Negative point A1"
    },
    A2: {
      statement: "Sample antithesis 2",
      positive: "Positive point A2",
      negative: "Negative point A2"
    }
  });
  const [arrowConnections, setArrowConnections] = useState<string>("T1 -> A1\nT2 -> A2");
  const [chart, setChart] = useState<any>(null);

  // TODO: Load initial dialecticalData from external source or props.

  return (
    <div className="App">
      <h1>Dialectical Wheel</h1>
      <DialecticalWheel 
        dialecticalData={dialecticalData}
        arrowConnections={arrowConnections}
        onChartReady={setChart}
      />

      {/* External Controls */}
      <StepControls chart={chart} />
      <ArrowControls 
        chart={chart}
        dialecticalData={dialecticalData}
        arrowConnections={arrowConnections}
        setArrowConnections={setArrowConnections}
      />
    </div>
  );
}

export default exampleApp;