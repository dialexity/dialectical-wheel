import React from 'react';
import DialecticalWheel from './DialecticalWheel';

function App() {
  // Example: Default sequence (T1, T2, T3, T4, A1, A2, A3, A4)
  const defaultWheel = (
    <DialecticalWheel 
      numPairs={4}
      title="Default Sequence"
      centerLabel="Core"
    />
  );

  // Example: Custom sequence (T2, T1, T3, T4, A2, A1, A3, A4)
  const customSequence = [
    { pair: 1, type: 'thesis' },   // T2
    { pair: 0, type: 'thesis' },   // T1
    { pair: 2, type: 'thesis' },   // T3
    { pair: 3, type: 'thesis' }    // T4
  ];
  const customWheel = (
    <DialecticalWheel 
      numPairs={4}
      sliceSequence={customSequence}
      title="Custom Sequence"
      centerLabel="Reordered"
    />
  );

  // Example: Mixed sequence (T1, A2, T3, A4, A1, T2, A3, T4)
  const mixedSequence = [
    { pair: 0, type: 'thesis' },     // T1
    { pair: 1, type: 'antithesis' }, // A2
    { pair: 2, type: 'thesis' },     // T3
    { pair: 3, type: 'antithesis' }  // A4
  ];
  const mixedWheel = (
    <DialecticalWheel 
      numPairs={4}
      sliceSequence={mixedSequence}
      title="Mixed Sequence"
      centerLabel="Mixed"
    />
  );

  // Example: Smaller wheel with 3 pairs
  const smallWheel = (
    <DialecticalWheel 
      numPairs={3}
      title="3-Pair Wheel"
      centerLabel="Small"
    />
  );

  // You can switch between different wheels by uncommenting the one you want
  return (
    <div className="App">
      {/* Default wheel */}
      {defaultWheel}
      
      {/* Uncomment these to try different configurations */}
      {/* {customWheel} */}
      {/* {mixedWheel} */}
      {/* {smallWheel} */}
    </div>
  );
}

export default App; 