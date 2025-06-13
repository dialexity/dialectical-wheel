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
  
  const highlightSyntax = (text: string) => {
    // Handle comments
    text = text.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
    
    // Handle DOT arrow syntax with attributes
    text = text.replace(
      /([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)\s*(\[[^\]]*\])?/g, 
      '<span class="node">$1</span> <span class="arrow">-></span> <span class="node">$2</span><span class="attributes">$3</span>'
    );
    
    // Handle zoom commands
    text = text.replace(
      /^(\s*)(zoom)\s+(top|in|out|reset)(\s+.*)?$/gm,
      '$1<span class="zoom-command">$2</span> <span class="zoom-action">$3</span><span class="command-params">$4</span>'
    );
    
    // Handle rotate commands
    text = text.replace(
      /^(\s*)(rotate)\s+(-?\d+(?:\.\d+)?)(\s+.*)?$/gm,
      '$1<span class="rotate-command">$2</span> <span class="rotate-angle">$3</span><span class="command-params">$4</span>'
    );
    
    // Handle wait commands
    text = text.replace(
      /^(\s*)(wait)\s+(\d+)$/gm,
      '$1<span class="wait-command">$2</span> <span class="wait-duration">$3</span>'
    );
    
    // Handle attribute keywords within brackets
    text = text.replace(
      /\[((?:[^=\]]+=[^=\]]+(?:,\s*)?)*)\]/g,
      (match, attributes) => {
        const highlighted = attributes.replace(
          /(color|weight|label|style|duration|direction|scale)(\s*=\s*)([^,\]]+)/g,
          '<span class="attr-name">$1</span><span class="attr-equals">$2</span><span class="attr-value">$3</span>'
        );
        return `[${highlighted}]`;
      }
    );
    
    return text;
  };
  
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
                                         <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || ' ' }} />
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