import React from 'react';

interface ScriptEditorProps {
  dotScript: string;
  setDotScript: (script: string) => void;
  currentLine: number;
  isAnimating: boolean;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({
  dotScript,
  setDotScript,
  currentLine,
  isAnimating
}) => {
  return (
    <div className="script-editor">
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        DOT Script Editor:
      </label>
      
      {/* Line-by-line display with highlighting */}
      <div style={{
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '13px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '300px',
        marginBottom: '15px'
      }}>
        {/* Line numbers and content */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '12px',
          lineHeight: '1.5'
        }}>
          {dotScript.split('\n').map((line, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                backgroundColor: currentLine === index ? '#fff3cd' : 'transparent',
                border: currentLine === index ? '1px solid #ffc107' : '1px solid transparent',
                borderRadius: currentLine === index ? '3px' : '0',
                margin: '1px 0',
                padding: '2px 4px'
              }}
            >
              <span style={{ 
                color: '#999', 
                marginRight: '12px', 
                minWidth: '25px',
                textAlign: 'right',
                userSelect: 'none'
              }}>
                {index + 1}
              </span>
              <span style={{ 
                color: line.trim().startsWith('//') ? '#22863a' : '#333',
                fontWeight: currentLine === index ? 'bold' : 'normal'
              }}>
                {line || ' '}
              </span>
              {currentLine === index && isAnimating && (
                <span style={{ 
                  marginLeft: 'auto', 
                  color: '#856404',
                  fontSize: '11px',
                  fontWeight: 'normal'
                }}>
                  ← executing
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Edit area */}
        <textarea
          value={dotScript}
          onChange={(e) => setDotScript(e.target.value)}
          disabled={isAnimating}
          style={{
            height: '120px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '13px',
            padding: '12px',
            border: 'none',
            borderTop: '1px solid #ddd',
            resize: 'vertical',
            backgroundColor: isAnimating ? '#f0f0f0' : 'white',
            outline: 'none'
          }}
          placeholder="Enter your DOT script here..."
        />
      </div>
    </div>
  );
};

export default ScriptEditor; 