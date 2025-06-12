import React from 'react';

interface ExecutionControlsProps {
  isAnimating: boolean;
  executionResult: any;
  onExecuteAnimated: () => void;
  onExecuteInstant: () => void;
  onForceRedraw: () => void;
  onClearArrows: () => void;
}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  isAnimating,
  executionResult,
  onExecuteAnimated,
  onExecuteInstant,
  onForceRedraw,
  onClearArrows
}) => {
  return (
    <>
      <div className="control-buttons" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button 
          onClick={onExecuteAnimated} 
          disabled={isAnimating}
          style={{
            padding: '10px 16px',
            backgroundColor: isAnimating ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isAnimating ? 0.7 : 1
          }}
        >
          {isAnimating ? 'Animating...' : '🎬 Execute Animated'}
        </button>
        
        <button 
          onClick={onExecuteInstant} 
          disabled={isAnimating}
          style={{
            padding: '10px 16px',
            backgroundColor: isAnimating ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            opacity: isAnimating ? 0.7 : 1
          }}
        >
          Execute Script (No Animation)
        </button>
        
        <button 
          onClick={onForceRedraw}
          style={{
            padding: '10px 16px',
            backgroundColor: '#ff1493',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Force Redraw Arrows
        </button>
        
        <button 
          onClick={onClearArrows}
          style={{
            padding: '10px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Arrows
        </button>
      </div>
      
      {executionResult && (
        <div className="execution-result" style={{ 
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: executionResult.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${executionResult.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          color: executionResult.success ? '#155724' : '#721c24'
        }}>
          <strong>Result:</strong> {executionResult.success ? 
            `✅ Created ${executionResult.created} arrows` : 
            `❌ ${executionResult.errors?.join(', ')}`
          }
        </div>
      )}
    </>
  );
};

export default ExecutionControls; 