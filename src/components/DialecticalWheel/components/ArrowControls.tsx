import React, { useState } from 'react';

interface ArrowControlsProps {
  chart: any;
  dialecticalData: any;
}

export default function ArrowControls({ chart, dialecticalData }: ArrowControlsProps) {
  const [arrowsVisible, setArrowsVisible] = useState(true);
  const [arrowConnections, setArrowConnections] = useState(`# Basic dialectical connections
T1 -> A1
T2 -> A2  
T3 -> A3
T4 -> A4

# Opposition arrows (thesis to antithesis)
T1 -> T2
A1 -> A2

# Ring-specific connections (examples)
T1+ -> A1-
T2- -> A2+`);

  const handleToggleArrows = () => {
    if (chart) {
      try {
        if (arrowsVisible) {
          chart.clearArrows();
        } else {
          chart.drawAllArrows();
        }
        setArrowsVisible(!arrowsVisible);
      } catch (error) {
        console.error('Error toggling arrows:', error);
      }
    }
  };

  const handleRedrawArrows = () => {
    if (chart && chart.drawAllArrows) {
      try {
        chart.drawAllArrows();
        setArrowsVisible(true);
      } catch (error) {
        console.error('Error redrawing arrows:', error);
      }
    }
  };

  const handleUpdateConnections = () => {
    if (chart) {
      try {
        // For now, just redraw with existing logic
        // The arrow connections would need to be passed through module.redefine
        chart.drawAllArrows();
        setArrowsVisible(true);
      } catch (error) {
        console.error('Error updating connections:', error);
      }
    }
  };

  const availableUnits = dialecticalData ? Object.keys(dialecticalData).join(', ') : '';

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: 'white'
    }}>
      <h3 style={{ marginTop: 0 }}>Arrow Connections</h3>
      
      {/* Basic Arrow Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '15px', 
        alignItems: 'center' 
      }}>
        <button 
          onClick={handleToggleArrows}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: arrowsVisible ? '#dc3545' : '#28a745',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {arrowsVisible ? 'Hide Arrows' : 'Show Arrows'}
        </button>
        
        <button 
          onClick={handleRedrawArrows}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Redraw Arrows
        </button>
      </div>
      
      {/* DOT Script Editor */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="connections-editor" style={{ fontWeight: 'bold' }}>
          Edit Connections (DOT syntax):
        </label>
      </div>
      
      <textarea 
        id="connections-editor"
        value={arrowConnections}
        onChange={(e) => setArrowConnections(e.target.value)}
        style={{
          width: '400px',
          height: '150px',
          fontFamily: 'monospace',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px'
        }}
      />
      
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={handleUpdateConnections}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#28a745',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Update Arrows
        </button>
      </div>
      
      <div style={{ 
        marginTop: '15px', 
        fontSize: '12px', 
        color: '#666', 
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <strong>Syntax:</strong> Use "A → B" format. Available units: {availableUnits}<br/>
        <strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>
        <strong>Colors:</strong> 🔴Red for oppositions, 🔵Blue for same type, 🟢Green for same polarity, 🟣Purple for mixed
      </div>
    </div>
  );
} 