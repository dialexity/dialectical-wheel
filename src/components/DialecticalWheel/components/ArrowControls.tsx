import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setArrowsVisible, updateArrowConnections } from '../store/dialecticalSlice';

interface ArrowControlsProps {
  chart: any;
}

// Arrow parsing function (from Observable notebook)
function parseArrowConnections(dotScript: string, dialecticalData: any) {
  const connections = [];
  const lines = dotScript.split('\n');
  
  for (let line of lines) {
    // Remove comments and trim
    line = line.split('//')[0].trim();
    if (!line) continue;
    
    // Parse "A -> B" syntax, supporting + and - suffixes
    const match = line.match(/(\w+[+-]?)\s*->\s*(\w+[+-]?)/);
    if (match) {
      const [, from, to] = match;
      
      // Extract unit ID and ring type
      const parseUnit = (unit: string) => {
        if (unit.endsWith('+')) {
          const unitId = unit.slice(0, -1);
          return dialecticalData[unitId] ? { unitId, ringType: 'inner' } : null;
        } else if (unit.endsWith('-')) {
          const unitId = unit.slice(0, -1);
          return dialecticalData[unitId] ? { unitId, ringType: 'outer' } : null;
        } else {
          return dialecticalData[unit] ? { unitId: unit, ringType: 'middle' } : null;
        }
      };
      
      const fromParsed = parseUnit(from);
      const toParsed = parseUnit(to);
      
      if (fromParsed && toParsed) {
        connections.push({ 
          from: fromParsed.unitId, 
          to: toParsed.unitId,
          fromRing: fromParsed.ringType,
          toRing: toParsed.ringType
        });
      }
    }
  }
  
  return connections;
}

export default function ArrowControls({ chart }: ArrowControlsProps) {
  const dispatch = useAppDispatch();
  const dialecticalData = useAppSelector(state => state.dialectical.data);
  const arrowsVisible = useAppSelector(state => state.dialectical.arrows.visible);
  const arrowConnections = useAppSelector(state => state.dialectical.arrows.connections);
  
  // Step-by-step arrow state (matching Observable notebook)
  const [arrowStepMode, setArrowStepMode] = useState(false);
  const [currentArrowStep, setCurrentArrowStep] = useState(0);
  const [parsedArrowConnections, setParsedArrowConnections] = useState<any[]>([]);
  const [currentArrowInfo, setCurrentArrowInfo] = useState("");

  // Parse connections whenever they change
  useEffect(() => {
    if (chart && arrowConnections) {
      const parsed = parseArrowConnections(arrowConnections, dialecticalData);
      setParsedArrowConnections(parsed);
      console.log('Parsed arrow connections:', parsed);
    }
  }, [arrowConnections, dialecticalData, chart]);

  // Update arrow step UI (matching Observable notebook)
  const updateArrowStepUI = () => {
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    const totalArrows = connections.length;
    
    if (arrowStepMode) {
      console.log(`Arrow step ${currentArrowStep} of ${totalArrows}`);
    } else {
      console.log(`Showing all ${totalArrows} arrows`);
    }
  };

  useEffect(() => {
    updateArrowStepUI();
  }, [arrowStepMode, currentArrowStep, parsedArrowConnections]);

  // Helper function to calculate arrow color based on connection
  const getArrowColor = (conn: any) => {
    let color = "#666"; // Default gray
    
    // Check if either endpoint is NOT middle ring (inner/outer ring connections)
    if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
      if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
          (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
        color = "#16a34a"; // Green for same polarity
      } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                 (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
        color = "#dc2626"; // Red for opposite polarity
      } else {
        color = "#8b5cf6"; // Purple for mixed connections (middle to inner/outer)
      }
    } else {
      // Both are middle ring - check thesis vs antithesis
      const fromIsThesis = conn.from.startsWith('T');
      const toIsThesis = conn.to.startsWith('T');
      if (fromIsThesis === toIsThesis) {
        color = "#2563eb"; // Blue for same type (T->T or A->A)
      } else {
        color = "#dc2626"; // Red for opposition (T->A or A->T)
      }
    }
    
    return color;
  };

  // Draw arrows up to specific step (matching Observable notebook)
  const drawArrowsUpToStep = (step: number) => {
    if (!chart || !chart.clearArrows || !chart.drawArrow) return;
    
    chart.clearArrows();
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    const connectionsToShow = connections.slice(0, step);
    
    connectionsToShow.forEach((conn: any, index: number) => {
      const color = getArrowColor(conn);
      const delay = index * 200;
      chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
    });
  };

  // Draw next arrow (matching Observable notebook)
  const drawNextArrow = () => {
    if (!chart || !chart.drawArrow) return false;
    
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    if (currentArrowStep >= connections.length) {
      return false; // No more arrows to draw
    }
    
    const conn = connections[currentArrowStep];
    const color = getArrowColor(conn);
    
    chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, 0);
    return true;
  };

  // Custom function to draw all arrows based on current connections (replaces chart.drawAllArrows)
  const drawAllCurrentArrows = () => {
    if (!chart || !chart.clearArrows || !chart.drawArrow) return;
    
    chart.clearArrows();
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    console.log('Drawing all current arrows:', connections);
    
    connections.forEach((conn: any, index: number) => {
      const color = getArrowColor(conn);
      const delay = index * 300;
      chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
    });
  };

  // Start arrow step mode (matching Observable notebook)
  const handleStartArrowStepMode = () => {
    const parsed = parseArrowConnections(arrowConnections, dialecticalData);
    setParsedArrowConnections(parsed);
    setArrowStepMode(true);
    setCurrentArrowStep(0);
    
    if (chart && chart.clearArrows) {
      chart.clearArrows();
    }
    
    dispatch(setArrowsVisible(false));
    updateArrowStepUI();
  };

  // Step forward (matching Observable notebook)
  const handleStepForward = () => {
    if (!arrowStepMode) return;
    
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    if (currentArrowStep < connections.length) {
      const success = drawNextArrow();
      if (success) {
        setCurrentArrowStep(prev => prev + 1);
        updateArrowStepUI();
      }
    }
  };

  // Step backward (matching Observable notebook)
  const handleStepBackward = () => {
    if (!arrowStepMode) return;
    
    if (currentArrowStep > 0) {
      const newStep = currentArrowStep - 1;
      setCurrentArrowStep(newStep);
      drawArrowsUpToStep(newStep);
      updateArrowStepUI();
    }
  };

  // Show all arrows (exit step mode)
  const handleShowAllArrows = () => {
    setArrowStepMode(false);
    setCurrentArrowStep(0);
    
    // Use our custom function instead of chart.drawAllArrows
    drawAllCurrentArrows();
    
    dispatch(setArrowsVisible(true));
    updateArrowStepUI();
  };

  // Toggle arrows (matching Observable notebook)
  const handleToggleArrows = () => {
    if (!chart) return;
    
    if (arrowsVisible) {
      if (chart.clearArrows) {
        chart.clearArrows();
      }
      dispatch(setArrowsVisible(false));
    } else {
      if (arrowStepMode) {
        drawArrowsUpToStep(currentArrowStep);
      } else {
        // Use our custom function instead of chart.drawAllArrows
        drawAllCurrentArrows();
      }
      dispatch(setArrowsVisible(true));
    }
  };

  // Redraw arrows
  const handleRedrawArrows = () => {
    if (!chart || !arrowsVisible) return;
    
    if (arrowStepMode) {
      drawArrowsUpToStep(currentArrowStep);
    } else {
      // Use our custom function instead of chart.drawAllArrows
      drawAllCurrentArrows();
    }
  };

  // Update connections (matching Observable notebook)
  const handleUpdateConnections = () => {
    console.log('Update button clicked');
    console.log('Editor value:', arrowConnections);
    
    // Parse the new connections
    const connections = parseArrowConnections(arrowConnections, dialecticalData);
    setParsedArrowConnections(connections);
    console.log('Parsed connections:', connections);
    
    if (arrowStepMode) {
      setCurrentArrowStep(0);
      updateArrowStepUI();
      if (arrowsVisible && chart && chart.clearArrows) {
        chart.clearArrows();
      }
    } else {
      // In normal mode, redraw all arrows using the new connections
      if (arrowsVisible) {
        drawAllCurrentArrows();
      }
    }
  };

  const handleConnectionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateArrowConnections(e.target.value));
  };

  const getArrowCounterText = () => {
    if (arrowStepMode) {
      return `Arrow ${currentArrowStep} of ${parsedArrowConnections.length}`;
    }
    return arrowsVisible ? "All Arrows Visible" : "Ready to start";
  };

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
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Arrow Connections</div>
      
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
            background: '#f8f9fa',
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
            background: '#f8f9fa',
            cursor: 'pointer'
          }}
        >
          Redraw Arrows
        </button>
      </div>
      
      {/* Step-by-Step Arrow Drawing */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '15px', 
        marginBottom: '15px', 
        background: '#f9f9f9',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Step-by-Step Arrow Drawing</div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '10px', 
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button 
            onClick={handleStartArrowStepMode}
            disabled={arrowStepMode}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: arrowStepMode ? '#e9ecef' : '#e7f3ff',
              cursor: arrowStepMode ? 'not-allowed' : 'pointer'
            }}
          >
            Start Step Mode
          </button>
          
          <button 
            onClick={handleStepBackward}
            disabled={!arrowStepMode || currentArrowStep <= 0}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: (!arrowStepMode || currentArrowStep <= 0) ? '#e9ecef' : '#f8f9fa',
              cursor: (!arrowStepMode || currentArrowStep <= 0) ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <span style={{ 
            margin: '0 10px', 
            fontWeight: 'bold', 
            minWidth: '120px',
            textAlign: 'center'
          }}>
            {getArrowCounterText()}
          </span>
          
                      <button 
             onClick={handleStepForward}
             disabled={!arrowStepMode || currentArrowStep >= parseArrowConnections(arrowConnections, dialecticalData).length}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: (!arrowStepMode || currentArrowStep >= parsedArrowConnections.length) ? '#e9ecef' : '#f8f9fa',
              cursor: (!arrowStepMode || currentArrowStep >= parsedArrowConnections.length) ? 'not-allowed' : 'pointer'
            }}
          >
            Next Arrow
          </button>
          
          <button 
            onClick={handleShowAllArrows}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f8f9fa',
              cursor: 'pointer'
            }}
          >
            Show All
          </button>
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          minHeight: '20px', 
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          {currentArrowInfo}
        </div>
      </div>
      
      {/* Connection Editor */}
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="connections-editor" style={{ fontWeight: 'bold' }}>
            Edit Connections (DOT syntax):
          </label>
        </div>
        
        <textarea 
          id="connections-editor"
          value={arrowConnections}
          onChange={handleConnectionsChange}
          style={{
            width: '100%',
            height: '150px',
            fontFamily: 'monospace',
            fontSize: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            resize: 'vertical'
          }}
        />
        
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={handleUpdateConnections}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#007bff',
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
          maxWidth: '500px'
        }}>
          <strong>Syntax:</strong> Use "A → B" format. Available units: {Object.keys(dialecticalData).join(', ')}<br/>
          <strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>
          <strong>Colors:</strong> 🔴Red for oppositions, 🔵Blue for same type, 🟢Green for same polarity, 🟣Purple for mixed
        </div>
      </div>
    </div>
  );
} 