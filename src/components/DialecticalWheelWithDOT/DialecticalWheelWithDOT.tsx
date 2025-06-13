import React, { useState, useRef, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
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

export interface WheelWithArrowsRef {
  executeDotScript: (script: string) => { success: boolean; created: number; errors: string[] };
  getAvailableSliceLayerCodes: () => string[];
  clearDotScriptConnections: () => void;
  createDemoConnections: () => void;
  toggleArrows: () => void;
  showArrows: boolean;
  connectNodes?: (fromCode: string, toCode: string, color?: string, strokeWidth?: number, label?: string) => void;
  toggleTopHalfZoom: () => void;
  setRotation: (angle: number) => void;
  rotation: number;
  getDynamicSlices: () => any[];
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
  
  // Create our own interaction hooks to have access to zoom and rotation functions
  const [wheelRotation, setWheelRotation] = useState<number>(270);
  const [wheelScale, setWheelScale] = useState<number>(1);
  const [wheelOffsetX, setWheelOffsetX] = useState<number>(0);
  const [wheelOffsetY, setWheelOffsetY] = useState<number>(0);
  const [isZoomedToTop, setIsZoomedToTop] = useState<boolean>(false);

  // Custom zoom function that matches the wheel's zoom behavior
  const customToggleTopHalfZoom = () => {
    if (isZoomedToTop) {
      // Zoom out to full view
      const targetScale = 1;
      const targetOffsetX = 0;
      const targetOffsetY = 0;
      
      animateToTransform(targetScale, targetOffsetX, targetOffsetY);
      setIsZoomedToTop(false);
    } else {
      // Zoom into top half of wheel
      const targetScale = 1.6;
      const topCenterAngle = 270; // 270° is straight up (top center)
      const topRadius = 90;
      
      const angleRad = topCenterAngle * Math.PI / 180;
      const cx = 200, cy = 200; // Wheel center
      const focusX = cx + topRadius * Math.cos(angleRad);
      const focusY = cy + topRadius * Math.sin(angleRad);
      
      const viewCenterX = 200, viewCenterY = 200;
      const targetOffsetX = (viewCenterX - focusX) * targetScale;
      const targetOffsetY = (viewCenterY - focusY) * targetScale;
      
      animateToTransform(targetScale, targetOffsetX, targetOffsetY);
      setIsZoomedToTop(true);
    }
  };

  // Animation helper for smooth transforms
  const animateToTransform = (targetScale: number, targetOffsetX: number, targetOffsetY: number) => {
    const startTime = Date.now();
    const startScale = wheelScale;
    const startOffsetX = wheelOffsetX;
    const startOffsetY = wheelOffsetY;
    const duration = 400;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentScale = startScale + (targetScale - startScale) * eased;
      const currentOffsetX = startOffsetX + (targetOffsetX - startOffsetX) * eased;
      const currentOffsetY = startOffsetY + (targetOffsetY - startOffsetY) * eased;
      
      setWheelScale(currentScale);
      setWheelOffsetX(currentOffsetX);
      setWheelOffsetY(currentOffsetY);
      
      // Apply transform to the record group
      if (recordRef.current) {
        recordRef.current.setAttribute('transform', 
          `translate(${currentOffsetX} ${currentOffsetY}) translate(200 200) scale(${currentScale}) rotate(${wheelRotation}) translate(-200 -200)`
        );
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Custom rotation function with smooth animation
  const customSetRotation = (targetAngle: number, duration: number = 400) => {
    const startTime = Date.now();
    const startRotation = wheelRotation;
    
    // Find shortest path
    let diff = targetAngle - startRotation;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    const finalTarget = startRotation + diff;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentRotation = startRotation + (finalTarget - startRotation) * eased;
      setWheelRotation(currentRotation);
      // Do NOT set the SVG transform directly here; let React handle it
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Apply transform whenever state changes
  React.useEffect(() => {
    if (recordRef.current) {
      recordRef.current.setAttribute('transform', 
        `translate(${wheelOffsetX} ${wheelOffsetY}) translate(200 200) scale(${wheelScale}) rotate(${wheelRotation}) translate(-200 -200)`
      );
    }
  }, [wheelScale, wheelOffsetX, wheelOffsetY, wheelRotation]);

  // Node connections API
  const nodeConnectionsAPI = useNodeConnections(
    dynamicSlices,
    title,
    recordRef,
    wheelRotation // Use our managed rotation
  );

  // Initialize wheel data
  useEffect(() => {
    setIsReady(true);
  }, []);

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
    connectNodes: nodeConnectionsAPI?.sliceLayerAPI?.connectNodesBySliceLayerCode,
    // Expose zoom and rotation functions
    toggleTopHalfZoom: customToggleTopHalfZoom,
    setRotation: customSetRotation,
    get rotation() {
      return wheelRotation;
    },
    get isZoomedToTop() {
      return isZoomedToTop;
    },
    getDynamicSlices: () => {
      console.log('HERE: dynamicSlices', dynamicSlices);
      return dynamicSlices;
    }
  }));

  return (
    <div ref={wheelContainerRef} className="wheel-with-arrows">
      <DialecticalWheel
        pairTexts={pairTexts}
        numPairs={numPairs}
        title={title}
        centerLabel={centerLabel}
        onDynamicSlicesChange={handleDynamicSlicesChange}
        recordRef={recordRef}
        onSliceClick={handleSliceClick}
        rotation={wheelRotation}
        setRotation={setWheelRotation}
      />
    </div>
  );
});

WheelWithArrows.displayName = 'WheelWithArrows';

// Main component
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
  const [isScriptEditorVisible, setIsScriptEditorVisible] = useState(true);
  
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
      console.log('🔔 Force redraw event received:', event.detail?.reason);
      handleForceRedraw();
    };

    window.addEventListener('forceRedrawArrows', handleForceRedrawEvent);
    return () => {
      window.removeEventListener('forceRedrawArrows', handleForceRedrawEvent);
    };
  }, [handleForceRedraw]);

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
A4 -> T1+ [color=#4CAF50, weight=2, label="pragmatism supports sustainability"]`,

    'Advanced with Zoom & Rotation': `// Dynamic presentation with camera movements
zoom top // Focus on top half of wheel
wait 1000 // Pause for emphasis
T1 -> A1+ [color=#FF6B35, weight=3, label="primary tension"]
wait 500
rotate 90 duration=1000 // Rotate to show different angle
T2 -> A2+ [color=#4CAF50, weight=2, label="secondary flow"]
wait 800
zoom reset // Return to full view
rotate 0 direction=shortest duration=1200 // Return to original position
T3 -> A3+ [color=#9C27B0, weight=2, label="synthesis"]`,

    'Camera Showcase': `// Demonstrate zoom and rotation capabilities
// Initial zoom to focus area
zoom top duration=800
wait 1000
// Show some connections in zoomed view
T1 -> A1+ [color=#FF6B35, weight=3]
wait 600
// Rotate wheel while zoomed
rotate 45 duration=1000 direction=cw
T2 -> A2+ [color=#4CAF50, weight=2]
wait 800
// Return to normal view with smooth transition
zoom reset duration=1000
wait 500
rotate 270 direction=shortest duration=1500
wait 500
// Final connections in normal view
T3 -> A3+ [color=#9C27B0, weight=2]
A3 -> T1+ [color=#FFA726, weight=1]`
  };

  return (
    <div className={`dialectical-wheel-with-dot ${className}`}>
      {showControls && (
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Left Side - Script Editor */}
          <ScriptEditor 
            dotScript={dotScript}
            setDotScript={setDotScript}
            currentLine={animatedExecution.state.currentLine}
            isAnimating={animatedExecution.state.isAnimating}
            isVisible={isScriptEditorVisible}
            onToggleVisibility={() => setIsScriptEditorVisible(!isScriptEditorVisible)}
            position="left"
          />
          
          {/* Right Side - Wheel and Controls */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="wheel-section" style={{ flex: 1 }}>
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
            
            <div className="controls-section" style={{ 
              padding: '15px',
              borderTop: '1px solid #ddd',
              backgroundColor: '#f8f9fa'
            }}>
              <SampleScripts 
                sampleScripts={sampleScripts}
                isAnimating={animatedExecution.state.isAnimating}
                onLoadScript={setDotScript}
              />
              
              <AnimationControls 
                isAnimating={animatedExecution.state.isAnimating}
                isPaused={animatedExecution.state.isPaused}
                currentLine={animatedExecution.state.currentLine}
                animationSpeed={animatedExecution.state.animationSpeed}
                enableAnimation={enableAnimation}
                setIsPaused={animatedExecution.setIsPaused}
                setAnimationSpeed={animatedExecution.setAnimationSpeed}
                onStop={animatedExecution.stopAnimation}
              />
              
              <ExecutionControls 
                isAnimating={animatedExecution.state.isAnimating}
                executionResult={executionResult}
                onExecuteAnimated={executeScriptAnimated}
                onExecuteInstant={handleExecuteScript}
                onForceRedraw={handleForceRedraw}
                onClearArrows={() => wheelRef.current?.clearDotScriptConnections()}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Fallback for when controls are disabled */}
      {!showControls && (
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
      )}
    </div>
  );
};

export default DialecticalWheelWithDOT;
export type { DialecticalWheelWithDOTProps, WisdomData, WisdomUnit }; 