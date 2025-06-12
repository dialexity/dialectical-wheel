import React from 'react';

interface AnimationControlsProps {
  isAnimating: boolean;
  isPaused: boolean;
  currentLine: number;
  animationSpeed: number;
  enableAnimation: boolean;
  setIsPaused: (paused: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  onStop: () => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isAnimating,
  isPaused,
  currentLine,
  animationSpeed,
  enableAnimation,
  setIsPaused,
  setAnimationSpeed,
  onStop
}) => {
  return (
    <>
      {/* Animation Status Display */}
      {isAnimating && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '12px', 
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <strong>🎬 Animation in Progress</strong>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Line {currentLine + 1} | Speed: {animationSpeed}ms
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: '#007bff', 
              backgroundColor: 'rgba(0,123,255,0.1)', 
              padding: '2px 6px', 
              borderRadius: '3px' 
            }}>
              ⭐ Shooting star...
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!isPaused ? (
              <button 
                onClick={() => setIsPaused(true)} 
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  backgroundColor: '#ffc107', 
                  border: 'none', 
                  borderRadius: '3px', 
                  cursor: 'pointer' 
                }}
              >
                ⏸️ Pause
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(false)} 
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '3px', 
                  cursor: 'pointer' 
                }}
              >
                ▶️ Resume
              </button>
            )}
            <button 
              onClick={onStop}
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px', 
                cursor: 'pointer' 
              }}
            >
              ⏹️ Stop
            </button>
          </div>
        </div>
      )}

      {/* Animation Speed Control */}
      {enableAnimation && (
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Animation Speed:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="range"
              min="200"
              max="3000"
              step="200"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              style={{ flex: 1 }}
              disabled={isAnimating}
            />
            <span style={{ fontSize: '12px', color: '#666', minWidth: '60px' }}>
              {animationSpeed}ms
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
            200ms = Fast • 1000ms = Normal • 3000ms = Slow
          </div>
        </div>
      )}
    </>
  );
};

export default AnimationControls; 