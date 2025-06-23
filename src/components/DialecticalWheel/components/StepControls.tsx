import React, { useState, useEffect } from 'react';

interface StepControlsProps {
  chart: any;
}

export default function StepControls({ chart }: StepControlsProps) {
  const [stepInfo, setStepInfo] = useState<any>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (chart) {
      // Update step info initially
      updateStepInfo();
    }
  }, [chart]);

  const updateStepInfo = () => {
    if (chart && chart.getCurrentStepInfo) {
      try {
        const info = chart.getCurrentStepInfo();
        setStepInfo(info);
      } catch (error) {
        console.error('Error getting step info:', error);
      }
    }
  };

  const handleStartStepMode = () => {
    if (chart && chart.startStepMode) {
      try {
        chart.startStepMode();
        updateStepInfo();
      } catch (error) {
        console.error('Error starting step mode:', error);
      }
    }
  };

  const handleStepForward = () => {
    if (chart && chart.stepForward) {
      try {
        chart.stepForward();
        updateStepInfo();
      } catch (error) {
        console.error('Error stepping forward:', error);
      }
    }
  };

  const handleResetToFull = () => {
    if (chart && chart.resetToFull) {
      try {
        chart.resetToFull();
        updateStepInfo();
      } catch (error) {
        console.error('Error resetting to full:', error);
      }
    }
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const degrees = parseInt(e.target.value);
    const radians = (degrees * Math.PI) / 180;
    setRotation(degrees);
    if (chart && chart.rotate) {
      try {
        chart.rotate(radians);
      } catch (error) {
        console.error('Error rotating:', error);
      }
    }
  };

  const handleRotationReset = () => {
    setRotation(0);
    if (chart && chart.rotate) {
      try {
        chart.rotate(0);
      } catch (error) {
        console.error('Error resetting rotation:', error);
      }
    }
  };

  const getCounterText = () => {
    if (stepInfo) {
      return `Step ${stepInfo.current} of ${stepInfo.total} (${stepInfo.unit} ${stepInfo.stepType})`;
    }
    return "Full View";
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
      <h3 style={{ marginTop: 0 }}>Step Controls</h3>
      
      {/* Step controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '15px', 
        alignItems: 'center' 
      }}>
        <button 
          onClick={handleStartStepMode}
          disabled={stepInfo !== null}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: stepInfo !== null ? '#e9ecef' : '#007bff',
            color: stepInfo !== null ? '#6c757d' : 'white',
            cursor: stepInfo !== null ? 'not-allowed' : 'pointer'
          }}
        >
          Start Step Mode
        </button>
        
        <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
          {getCounterText()}
        </span>
        
        <button 
          onClick={handleStepForward}
          disabled={!stepInfo || !stepInfo.canStepForward}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: (!stepInfo || !stepInfo.canStepForward) ? '#e9ecef' : '#28a745',
            color: (!stepInfo || !stepInfo.canStepForward) ? '#6c757d' : 'white',
            cursor: (!stepInfo || !stepInfo.canStepForward) ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
        
        <button 
          onClick={handleResetToFull}
          disabled={stepInfo === null}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: stepInfo === null ? '#e9ecef' : '#dc3545',
            color: stepInfo === null ? '#6c757d' : 'white',
            cursor: stepInfo === null ? 'not-allowed' : 'pointer'
          }}
        >
          Show All
        </button>
      </div>
      
      {/* Rotation controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px' 
      }}>
        <label htmlFor="rotation-slider" style={{ fontWeight: 'bold' }}>
          Rotation:
        </label>
        <input 
          type="range" 
          id="rotation-slider" 
          min="0" 
          max="360" 
          value={rotation} 
          step="1"
          onChange={handleRotationChange}
          style={{ width: '200px', cursor: 'pointer' }}
        />
        <span style={{ minWidth: '40px', fontFamily: 'monospace' }}>
          {rotation}°
        </span>
        <button 
          onClick={handleRotationReset}
          style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#f8f9fa',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
} 