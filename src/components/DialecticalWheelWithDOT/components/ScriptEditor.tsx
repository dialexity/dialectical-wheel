import React from 'react';

interface ScriptEditorProps {
  dotScript: string;
  setDotScript: (script: string) => void;
  currentLine: number;
  isAnimating: boolean;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  position?: 'left' | 'right' | 'bottom';
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({
  dotScript,
  setDotScript,
  currentLine,
  isAnimating,
  isVisible = true,
  onToggleVisibility,
  position = 'bottom'
}) => {
  const isLeftSide = position === 'left';
  
  return (
    <div className={`script-editor script-editor--${position}`} style={{
      position: isLeftSide ? 'relative' : 'static',
      width: isLeftSide ? (isVisible ? '350px' : '40px') : '100%',
      transition: isLeftSide ? 'width 0.3s ease' : 'none',
      borderRight: isLeftSide ? '1px solid #ddd' : 'none',
      backgroundColor: isLeftSide ? '#f8f9fa' : 'transparent',
      height: isLeftSide ? '100%' : 'auto',
      overflow: isLeftSide ? 'hidden' : 'visible'
    }}>
      {/* Toggle button for left side */}
      {isLeftSide && onToggleVisibility && (
        <button
          onClick={onToggleVisibility}
          style={{
            position: 'absolute',
            top: '10px',
            right: isVisible ? '10px' : '5px',
            zIndex: 10,
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
          title={isVisible ? 'Hide Script Editor' : 'Show Script Editor'}
        >
          {isVisible ? '◀ Hide' : '▶'}
        </button>
      )}
      
      {/* Content */}
      {isVisible && (
        <>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold', 
            color: '#333',
            paddingTop: isLeftSide ? '50px' : '0',
            paddingLeft: isLeftSide ? '15px' : '0',
            paddingRight: isLeftSide ? '15px' : '0'
          }}>
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
            height: isLeftSide ? 'calc(100vh - 200px)' : '300px',
            marginBottom: isLeftSide ? '0' : '15px',
            marginLeft: isLeftSide ? '15px' : '0',
            marginRight: isLeftSide ? '15px' : '0'
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
                height: isLeftSide ? '150px' : '120px',
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
        </>
      )}
    </div>
  );
};

export default ScriptEditor; 