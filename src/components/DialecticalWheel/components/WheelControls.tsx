import React from 'react';

interface WheelControlsProps {
  showArrows: boolean;
  onToggleArrows: () => void;
  onReset: () => void;
  onEnrich?: () => void;
}

const WheelControls: React.FC<WheelControlsProps> = ({
  showArrows,
  onToggleArrows,
  onReset,
  onEnrich
}) => {
  return (
    <div className="bottom-bar">
      <button className="bottom-btn" onClick={onEnrich}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        Enrich
      </button>

      <button className="bottom-btn" onClick={onToggleArrows}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={showArrows ? "#0074d9" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="7" x2="17" y2="17"/>
          <polyline points="17,7 17,17 7,17"/>
        </svg>
        {showArrows ? 'Hide' : 'Show'} Arrows
      </button>
      
      <button className="bottom-btn" onClick={onReset}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0074d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Reset
      </button>
    </div>
  );
};

export default WheelControls; 