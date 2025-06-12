import React, { useState, useRef, useCallback, useEffect } from 'react';
import DialecticalWheel from '../DialecticalWheel/DialecticalWheel';
import { useNodeConnections } from '../DialecticalWheel/hooks/useNodeConnections';
import { ScriptEditor, AnimationControls, SampleScripts, ExecutionControls } from './components';
import { useAnimatedExecution } from './hooks/useAnimatedExecution';
import { parseScriptToHistory } from './utils/ScriptParser';
import './DialecticalWheelWithDOT.css';

// Types
interface WisdomUnit {
  t_minus: { alias: string; statement: string; explanation: string };
  t: { alias: string; statement: string; explanation: string };
  t_plus: { alias: string; statement: string; explanation: string };
  a_plus: { alias: string; statement: string; explanation: string };
  a: { alias: string; statement: string; explanation: string };
  a_minus: { alias: string; statement: string; explanation: string };
}

interface WisdomData {
  user_message: string;
  wheels: Array<{
    wisdom_units: WisdomUnit[];
  }>;
}

interface TransformedWisdomUnit {
  tPlus: { statement: string };
  t: { statement: string };
  tMinus: { statement: string };
  aPlus: { statement: string };
  a: { statement: string };
  aMinus: { statement: string };
}

interface PairTexts {
  [key: number]: {
    thesis: string[][];
    antithesis: string[][];
  };
}

interface DialecticalWheelWithDOTProps {
  wisdomData: WisdomData;
  title?: string;
  centerLabel?: string;
  defaultDotScript?: string;
  showControls?: boolean;
  enableAnimation?: boolean;
  onScriptExecution?: (result: any) => void;
  className?: string;
}

// Utility functions
const transformWisdomUnits = (apiWisdomUnits: WisdomUnit[]): TransformedWisdomUnit[] => {
  return apiWisdomUnits.map((unit) => ({
    tPlus: { statement: unit.t_plus.statement },
    t: { statement: unit.t.statement },
    tMinus: { statement: unit.t_minus.statement },
    aPlus: { statement: unit.a_plus.statement },
    a: { statement: unit.a.statement },
    aMinus: { statement: unit.a_minus.statement }
  }));
};

const generatePairTextsFromWisdomUnits = (wisdomUnits: TransformedWisdomUnit[]): PairTexts => {
  const pairTexts: PairTexts = {};
  
  wisdomUnits.forEach((wu, index) => {
    // Generate thesis labels
    const thesisLabels: string[][] = [];
    if (wu.tPlus?.statement) thesisLabels.push([wu.tPlus.statement, 'green']);
    if (wu.t?.statement) thesisLabels.push([wu.t.statement, 'black']);
    if (wu.tMinus?.statement) thesisLabels.push([wu.tMinus.statement, 'red']);
    
    // Generate antithesis labels
    const antithesisLabels: string[][] = [];
    if (wu.aPlus?.statement) antithesisLabels.push([wu.aPlus.statement, 'green']);
    if (wu.a?.statement) antithesisLabels.push([wu.a.statement, 'black']);
    if (wu.aMinus?.statement) antithesisLabels.push([wu.aMinus.statement, 'red']);
    
    // Only add if we have both sides
    if (thesisLabels.length > 0 && antithesisLabels.length > 0) {
      pairTexts[index] = {
        thesis: thesisLabels,
        antithesis: antithesisLabels
      };
    }
  });
  
  return pairTexts;
};

// Enhanced wrapper that adds arrow functionality to the DialecticalWheel
const WheelWithArrows = React.forwardRef<any, {
  pairTexts: PairTexts;
  numPairs: number;
  title: string;
  centerLabel: string;
  shouldCreateInitialArrows: boolean;
  setShouldCreateInitialArrows: (value: boolean) => void;
}>(({ pairTexts, numPairs, title, centerLabel, shouldCreateInitialArrows, setShouldCreateInitialArrows }, ref) => {
  const [dynamicSlices, setDynamicSlices] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<SVGGElement>(null);
  
  // Node connections API
  const nodeConnectionsAPI = useNodeConnections(
    dynamicSlices,
    title,
    recordRef,
    0 // rotation
  );

  // Initialize wheel data
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Arrow markers are handled by DialecticalWheel's SvgMarkers component

  // Track when the wheel layout changes to update arrows
  const [lastWheelLayout, setLastWheelLayout] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('🚀 LAYOUT DETECTION useEffect RUNNING');
    
    if (!dynamicSlices || !Array.isArray(dynamicSlices) || dynamicSlices.length === 0) {
      console.log('⚠️ dynamicSlices not available - cannot detect layout changes');
      return;
    }
    
    // Create a layout signature based on slice positions
    const currentLayout = dynamicSlices.map(slice => ({
      id: slice.id,
      angle: slice.angle,
      pair: slice.pair,
      type: slice.type
    }));
    
    const layoutSignature = JSON.stringify(currentLayout);
    
    if (lastWheelLayout && lastWheelLayout !== layoutSignature) {
      console.log('🔄 Wheel layout changed, updating arrows...');
      
      // Check if arrows exist before attempting recreation
      const existingArrows = document.querySelectorAll('.dot-script-connection');
      
      if (existingArrows.length > 0) {
        console.log('🔥 ARROWS NEED REPOSITIONING - dispatching force redraw event');
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('forceRedrawArrows', { detail: { reason: 'layout_change' } }));
        }, 200);
      }
    }
    
    setLastWheelLayout(layoutSignature);
  }, [dynamicSlices, lastWheelLayout]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleDynamicSlicesChange = useCallback((slices: any[]) => {
    console.log('🎯 RECEIVED dynamicSlices from DialecticalWheel:', slices.length, 'slices');
    setDynamicSlices(slices);
  }, []);

  const handleSliceClick = useCallback(() => {
    console.log('🖱️ SLICE CLICKED - triggering manual arrow redraw check');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('forceRedrawArrows', { detail: { reason: 'slice_click' } }));
    }, 300);
  }, []);

  // Expose the arrow API through the ref
  React.useImperativeHandle(ref, () => ({
    executeDotScript: (script: string) => {
      if (nodeConnectionsAPI?.dotScriptAPI?.executeDotScript) {
        return nodeConnectionsAPI.dotScriptAPI.executeDotScript(script, true);
      }
      return { success: false, created: 0, errors: ['API not ready'] };
    },
    getAvailableSliceLayerCodes: () => {
      if (nodeConnectionsAPI?.sliceLayerAPI?.getAvailableSliceLayerCodes) {
        return nodeConnectionsAPI.sliceLayerAPI.getAvailableSliceLayerCodes();
      }
      return [];
    },
    clearDotScriptConnections: () => {
      const connections = document.querySelectorAll('.dot-script-connection, .initial-demo, .user-generated');
      connections.forEach(conn => conn.remove());
      setShouldCreateInitialArrows(false);
      console.log('🗑️ Cleared all arrows and disabled auto-recreation');
    },
    createDemoConnections: () => {
      if (nodeConnectionsAPI?.dotScriptAPI?.createDotScriptDemo) {
        nodeConnectionsAPI.dotScriptAPI.createDotScriptDemo();
      }
    },
    toggleArrows: () => {
      if (nodeConnectionsAPI?.toggleArrows) {
        nodeConnectionsAPI.toggleArrows();
      }
    },
    showArrows: nodeConnectionsAPI?.showArrows ?? true,
    sliceLayerAPI: nodeConnectionsAPI?.sliceLayerAPI,
    connectNodes: nodeConnectionsAPI?.nodeAPI?.connectNodes
  }), [nodeConnectionsAPI, setShouldCreateInitialArrows]);

  return (
    <div ref={wheelContainerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <DialecticalWheel
        recordRef={recordRef}
        numPairs={numPairs}
        title={title}
        centerLabel={centerLabel}
        pairTexts={pairTexts}
        onDynamicSlicesChange={handleDynamicSlicesChange}
        onSliceClick={handleSliceClick}
      />
      
      {/* Arrow styling */}
      <style>
        {`
          .dot-script-connection {
            pointer-events: none;
            z-index: 100;
            transition: opacity 0.3s ease, filter 0.3s ease;
          }
          
          .dot-script-connection.animated {
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          
          .shooting-star {
            z-index: 200;
            pointer-events: none;
          }
          
          .shooting-star-trail {
            z-index: 150;
            pointer-events: none;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          
          .layer-node:hover {
            opacity: 0.8;
            stroke-width: 2;
          }
          
          .dot-script-connection {
            transition: opacity 0.5s ease, filter 0.5s ease;
          }
        `}
      </style>
    </div>
  );
});

const DialecticalWheelWithDOT: React.FC<DialecticalWheelWithDOTProps> = ({
  wisdomData,
  title = "Dialectical Wheel",
  centerLabel = "Core",
  defaultDotScript = "",
  showControls = true,
  enableAnimation = true,
  onScriptExecution,
  className = ""
}) => {
  // Transform wisdom data
  const wisdomUnits = transformWisdomUnits(wisdomData.wheels[0].wisdom_units);
  const pairTexts = generatePairTextsFromWisdomUnits(wisdomUnits);
  const numPairs = wisdomUnits.length;

  // State for DOT script functionality
  const [dotScript, setDotScript] = useState(defaultDotScript);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [shouldCreateInitialArrows, setShouldCreateInitialArrows] = useState(false);
  
  const wheelRef = useRef<any>(null);
  
  // Use the animated execution hook
  const animatedExecution = useAnimatedExecution();

  // Force redraw arrows functionality
  const handleForceRedraw = useCallback(() => {
    console.log('🔄 Force redraw arrows triggered');
    
    // Clear existing arrows
    const connections = document.querySelectorAll('.dot-script-connection, .initial-demo, .user-generated');
    console.log('🗑️ Clearing', connections.length, 'existing arrows');
    connections.forEach(conn => conn.remove());
    
    // Recreate arrows from animation history if available
    if (animatedExecution.state.animationHistory.length > 0) {
      console.log('📚 Recreating arrows from animation history:', animatedExecution.state.animationHistory.length, 'entries');
      animatedExecution.state.animationHistory.forEach((historyEntry: any) => {
        if (wheelRef.current?.connectNodes) {
          try {
            const connection = wheelRef.current.connectNodes(
              historyEntry.fromId, 
              historyEntry.toId, 
              historyEntry.color, 
              historyEntry.strokeWidth
            );
            if (connection) {
              connection.classList.add('dot-script-connection', 'user-generated');
              if (historyEntry.label) {
                connection.setAttribute('data-label', historyEntry.label);
              }
              console.log('✅ Recreated arrow:', historyEntry.fromId, '->', historyEntry.toId);
            }
          } catch (error) {
            console.warn('❌ Failed to recreate arrow:', historyEntry, error);
          }
        }
      });
    } else {
      console.log('📝 No animation history, creating initial demo arrows');
      if (wheelRef.current?.createDemoConnections) {
        wheelRef.current.createDemoConnections();
      }
    }
  }, [animatedExecution.state.animationHistory]);

  // Listen for automatic force redraw events from layout changes
  useEffect(() => {
    const handleForceRedrawEvent = (event: any) => {
      console.log('🎯 Received forceRedrawArrows event:', event.detail);
      handleForceRedraw();
    };
    
    window.addEventListener('forceRedrawArrows', handleForceRedrawEvent);
    console.log('✅ Event listener registered for forceRedrawArrows');
    
    return () => {
      window.removeEventListener('forceRedrawArrows', handleForceRedrawEvent);
      console.log('🗑️ Event listener removed for forceRedrawArrows');
    };
  }, [handleForceRedraw]);

  // Create initial demo arrows when wheel is ready
  useEffect(() => {
    if (wheelRef.current && shouldCreateInitialArrows) {
      const timer = setTimeout(() => {
        console.log('🎯 Creating initial demo arrows...');
        
        const initialScript = `// Gas vs Electric Demo Arrows  
T1+ -> A1+ [color=#4CAF50, weight=3, label="sustainability meets practicality"]
T2+ -> A2+ [color=#4CAF50, weight=3, label="informed optimism"]
T1- -> A1- [color=#FF6B35, style=dashed, label="infrastructure concerns"]`;
        
        console.log('Executing initial script:', initialScript);
        
        if (wheelRef.current && wheelRef.current.executeDotScript) {
          const result = wheelRef.current.executeDotScript(initialScript);
          console.log('✅ Initial arrows result:', result);
          
          // Mark initial arrows
          setTimeout(() => {
            const initialArrows = document.querySelectorAll('.dot-script-connection:not(.user-generated)');
            initialArrows.forEach(arrow => {
              arrow.classList.add('initial-demo');
              (arrow as HTMLElement).style.opacity = '0.7';
            });
            console.log(`🏷️ Marked ${initialArrows.length} initial arrows as .initial-demo`);
          }, 50);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [wheelRef.current, shouldCreateInitialArrows]);

  // Create shooting star animation function with arrowhead
  const createShootingStarAnimation = useCallback((arrow: SVGPathElement, onComplete?: () => void) => {
    const rotatingGroup = arrow.closest('.record') || arrow.parentElement;
    if (!rotatingGroup) return;

    const pathLength = arrow.getTotalLength();
    const arrowColor = arrow.style.stroke || arrow.getAttribute('stroke') || '#0074d9';
    
    // Create shooting arrowhead element
    const shootingArrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    shootingArrow.setAttribute('points', '0,0 8,3 0,6'); // Arrowhead shape pointing right
    shootingArrow.setAttribute('fill', arrowColor);
    shootingArrow.style.filter = 'drop-shadow(0 0 4px rgba(255,215,0,0.8))'; // Golden glow
    shootingArrow.classList.add('shooting-star');

    // Create trail element
    const trail = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
    trail.style.stroke = arrowColor;
    trail.style.strokeWidth = '2';
    trail.style.fill = 'none';
    trail.style.strokeDasharray = '0 ' + pathLength;
    trail.setAttribute('d', arrow.getAttribute('d') || '');
    trail.classList.add('shooting-star-trail');

    rotatingGroup.appendChild(trail);
    rotatingGroup.appendChild(shootingArrow);

    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentLength = easedProgress * pathLength;
      const point = arrow.getPointAtLength(currentLength);
      
      // Calculate the tangent angle at the current point to orient the arrowhead
      let angle = 0;
      if (currentLength > 0 && currentLength < pathLength) {
        const nextLength = Math.min(currentLength + 1, pathLength);
        const nextPoint = arrow.getPointAtLength(nextLength);
        angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
      }
      
      // Position and rotate the arrowhead
      shootingArrow.setAttribute('transform', `translate(${point.x},${point.y}) rotate(${angle}) translate(-4,-3)`);
      (shootingArrow as any).style.opacity = progress < 0.1 ? progress * 10 : (progress > 0.9 ? (1 - progress) * 10 : '1');
      
      const trailLength = currentLength;
      trail.style.strokeDasharray = `${trailLength} ${pathLength - trailLength}`;
      trail.style.opacity = Math.min(easedProgress + 0.3, 0.8).toString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          shootingArrow.remove();
          trail.style.transition = 'opacity 0.5s ease-out';
          trail.style.opacity = '0';
          setTimeout(() => trail.remove(), 500);
          onComplete?.();
        }, 100);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Use the hook's animated execution
  const executeScriptAnimated = useCallback(() => {
    animatedExecution.executeScriptAnimated(dotScript, wheelRef);
  }, [dotScript, animatedExecution]);

  // Execute DOT script (non-animated version)
  const handleExecuteScript = useCallback(() => {
    if (!wheelRef.current) {
      console.warn('Wheel not ready');
      return;
    }

    // Clear existing user-generated arrows (NOT demo arrows)
    const userScriptArrows = document.querySelectorAll('.dot-script-connection:not(.initial-demo)');
    userScriptArrows.forEach(arrow => arrow.remove());

    const result = wheelRef.current.executeDotScript(dotScript);
    setExecutionResult(result);
    
    // Mark new arrows as user-generated
    if (result.success && result.created > 0) {
      setTimeout(() => {
        const newArrows = document.querySelectorAll('.dot-script-connection:not(.initial-demo):not(.user-generated)');
        newArrows.forEach(arrow => {
          arrow.classList.add('user-generated');
        });
      }, 50);
      
      // Update animation history for force redraw functionality
      const newHistory = parseScriptToHistory(dotScript);
      animatedExecution.setAnimationHistory(newHistory);
      console.log('📚 Updated animation history:', newHistory);
    }
    
    if (onScriptExecution) {
      onScriptExecution(result);
    }
    
    console.log('Script execution result:', result);
  }, [dotScript, onScriptExecution, animatedExecution]);

  // Sample DOT scripts based on wisdom data
  const sampleScripts = {
    'Basic Flow': `// ${wisdomData.user_message.substring(0, 50)}...
T1 -> A1+ [color=#FF6B35, weight=3, label="core decision tension"]
T2 -> A2+ [color=#FF6B35, weight=3, label="analysis informing optimism"]`,
    
    'Complex Analysis': `// Multi-factor decision analysis
T1 -> A1+ [color=#FF6B35, weight=3, label="sustainability vs practicality"]
T2- -> A2 [color=#2196F3, style=dashed, label="paralysis to reliance"]
T3 -> A3+ [color=#9C27B0, style=dotted, weight=2, label="limitations drive innovation"]
T4+ -> A4+ [color=#4CAF50, weight=2, label="adaptability meets pragmatism"]
A4 -> T1+ [color=#4CAF50, weight=2, label="pragmatism supports sustainability"]`
  };

  return (
    <div className={`dialectical-wheel-with-dot ${className}`}>
      <div className="wheel-section">
        <WheelWithArrows
          ref={wheelRef}
          pairTexts={pairTexts}
          numPairs={numPairs}
          title={title}
          centerLabel={centerLabel}
          shouldCreateInitialArrows={shouldCreateInitialArrows}
          setShouldCreateInitialArrows={setShouldCreateInitialArrows}
        />
      </div>
      
      {showControls && (
        <div className="controls-section">
          {/* Script Editor with Line Highlighting */}
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
          
          <div className="control-buttons">
            <button onClick={executeScriptAnimated} disabled={isAnimating}>
              {isAnimating ? 'Animating...' : '🎬 Execute Animated'}
            </button>
            <button onClick={handleExecuteScript} disabled={isAnimating}>
              Execute Script (No Animation)
            </button>
            <button onClick={handleForceRedraw}>
              🔄 Force Redraw Arrows
            </button>
            <button onClick={() => wheelRef.current?.clearDotScriptConnections()}>
              Clear Arrows
            </button>
          </div>
          
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
                  onClick={() => {
                    setIsAnimating(false);
                    setIsPaused(false);
                    if (animationTimeoutRef.current) {
                      clearTimeout(animationTimeoutRef.current);
                    }
                  }}
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
          
          {/* Sample Scripts */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Sample Scripts:
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.entries(sampleScripts).map(([name, script]) => (
                <button
                  key={name}
                  onClick={() => setDotScript(script)}
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
          
          {executionResult && (
            <div className="execution-result">
              <strong>Result:</strong> {executionResult.success ? 
                `✅ Created ${executionResult.created} arrows` : 
                `❌ ${executionResult.errors?.join(', ')}`
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DialecticalWheelWithDOT;
export type { DialecticalWheelWithDOTProps, WisdomData, WisdomUnit }; 