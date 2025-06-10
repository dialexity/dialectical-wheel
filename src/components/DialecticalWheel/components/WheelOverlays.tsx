import React from 'react';

interface WheelOverlaysProps {
  isZoomedToQ2: boolean;
  onToggleTopHalfZoom: () => void;
}

const WheelOverlays: React.FC<WheelOverlaysProps> = ({
  isZoomedToQ2,
  onToggleTopHalfZoom,
}) => {
  return (
    <>
      <div className="controls-overlay">
        Drag to rotate • Pinch to zoom • Tap thesis/antithesis pairs to see opposition clearly
      </div>
      
      {/* Floating top half zoom toggle button */}
      <button 
        className={`floating-q2-btn ${isZoomedToQ2 ? 'zoomed' : ''}`} 
        onClick={onToggleTopHalfZoom}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          {isZoomedToQ2 ? (
            <path d="M8 13l2-2-2-2"/>
          ) : (
            <path d="M8 9l-2 2 2 2"/>
          )}
        </svg>
        {isZoomedToQ2 ? 'Out' : 'Top'}
      </button>
    </>
  );
};

export default WheelOverlays; 