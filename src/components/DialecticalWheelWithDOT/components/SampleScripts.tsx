import React from 'react';

interface SampleScriptsProps {
  sampleScripts: Record<string, string>;
  isAnimating: boolean;
  onLoadScript: (script: string) => void;
}

const SampleScripts: React.FC<SampleScriptsProps> = ({
  sampleScripts,
  isAnimating,
  onLoadScript
}) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        Sample Scripts:
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {Object.entries(sampleScripts).map(([name, script]) => (
          <button
            key={name}
            onClick={() => onLoadScript(script)}
            disabled={isAnimating}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: isAnimating ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.7 : 1
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleScripts; 