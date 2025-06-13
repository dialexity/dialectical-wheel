import { useState, useCallback, useRef } from 'react';
import { createShootingStarAnimation } from '../utils/ShootingStarAnimation';
import { parseScriptLines, parseScriptCommand, ScriptCommand, ParsedLine, getNodeIdFromSliceLayerCode, getRotationAngleForSlice } from '../utils/ScriptParser';

interface AnimatedExecutionState {
  isAnimating: boolean;
  isPaused: boolean;
  currentLine: number;
  animationSpeed: number;
  animationHistory: any[];
}

interface AnimatedExecutionControls {
  state: AnimatedExecutionState;
  setIsAnimating: (animating: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setCurrentLine: (line: number) => void;
  setAnimationSpeed: (speed: number) => void;
  setAnimationHistory: (history: any[]) => void;
  executeScriptAnimated: (dotScript: string, wheelRef: React.RefObject<any>) => Promise<void>;
  stopAnimation: () => void;
}

export const useAnimatedExecution = (): AnimatedExecutionControls => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [animationHistory, setAnimationHistory] = useState<any[]>([]);
  
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    setIsPaused(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, []);

  // Helper function to wait for pause state
  const waitForUnpause = useCallback(async () => {
    return new Promise<void>(resolve => {
      const checkPause = () => {
        if (!isPaused) {
          resolve();
        } else {
          setTimeout(checkPause, 100);
        }
      };
      checkPause();
    });
  }, [isPaused]);

  // Helper function to execute zoom commands
  const executeZoomCommand = useCallback(async (command: any, wheelRef: React.RefObject<any>) => {
    console.log(`🔍 Executing zoom command:`, command);
    
    if (!wheelRef.current?.toggleTopHalfZoom) {
      console.warn('Zoom functionality not available on wheel');
      return;
    }
    
    // Get current zoom state if available
    const isCurrentlyZoomed = wheelRef.current.isZoomedToTop || false;
    
    switch (command.action) {
      case 'top':
        // Zoom to top half - only if not already zoomed
        if (!isCurrentlyZoomed) {
          wheelRef.current.toggleTopHalfZoom();
        }
        break;
      case 'reset':
      case 'out':
        // Reset to normal view - only if currently zoomed
        if (isCurrentlyZoomed) {
          wheelRef.current.toggleTopHalfZoom();
        }
        break;
      case 'in':
        // Custom zoom in with scale (not implemented yet, fallback to top zoom)
        if (!isCurrentlyZoomed) {
          wheelRef.current.toggleTopHalfZoom();
        }
        break;
    }
    
    // Wait for zoom animation to complete
    await new Promise(resolve => setTimeout(resolve, command.duration || 400));
  }, []);

  // Helper function to execute rotation commands
  const executeRotateCommand = useCallback(async (command: any, wheelRef: React.RefObject<any>) => {
    console.log(`🔄 Executing rotate command:`, command);
    
    if (!wheelRef.current?.setRotation) {
      console.warn('Rotation functionality not available on wheel');
      return;
    }
    
    const currentRotation = wheelRef.current.rotation || 270;
    let targetRotation: number;
    
    // Handle semantic slice codes vs numeric angles
    if (command.targetSlice) {
      // Semantic slice code (e.g., "rotate A1")
      const dynamicSlices = wheelRef.current?.getDynamicSlices?.() || [];
      const calculatedAngle = getRotationAngleForSlice(command.targetSlice, dynamicSlices);
      
      if (calculatedAngle === null) {
        console.warn(`Could not calculate rotation angle for slice: ${command.targetSlice}`);
        return;
      }
      
      targetRotation = calculatedAngle;
      console.log(`🎯 Rotating to bring ${command.targetSlice} to top center (${targetRotation}°)`);
    } else {
      // Numeric angle
      targetRotation = command.angle;
      
      // Handle relative vs absolute rotation
      if (command.direction === 'cw' || command.direction === 'ccw') {
        // Relative rotation
        if (command.direction === 'cw') {
          targetRotation = currentRotation + command.angle;
        } else {
          targetRotation = currentRotation - command.angle;
        }
      } else if (command.direction === 'shortest') {
        // Find shortest path to target angle (this is handled in setRotation)
        targetRotation = command.angle;
      }
      // else: absolute rotation (use targetRotation as-is)
    }
    
    // Execute rotation with duration
    wheelRef.current.setRotation(targetRotation, command.duration || 400);
    
    // Wait for rotation animation to complete
    await new Promise(resolve => setTimeout(resolve, command.duration || 400));
  }, []);

  // Helper function to execute wait commands
  const executeWaitCommand = useCallback(async (command: any) => {
    console.log(`⏱️ Waiting for ${command.duration}ms`);
    await new Promise(resolve => setTimeout(resolve, command.duration));
  }, []);

  // Helper function to execute click commands
  const executeClickCommand = useCallback(async (command: any, wheelRef: React.RefObject<any>) => {
    console.log(`🖱️ Executing click command:`, command);
    // Use dynamicSlices from the wheelRef if available
    const dynamicSlices = wheelRef.current?.getDynamicSlices?.() || [];
    const nodeId = getNodeIdFromSliceLayerCode(command.sliceId, dynamicSlices);
    const selector = `[data-node-id='${nodeId}']`;
    const el = document.querySelector(selector);
    console.log("Click nodeId:", nodeId, "Selector:", selector, "Element:", el);
    if (nodeId) {
      if (el) {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        (el as HTMLElement).classList.add('dot-script-clicked');
        setTimeout(() => {
          (el as HTMLElement).classList.remove('dot-script-clicked');
        }, 400);
      } else {
        console.warn(`Could not find element for click: ${command.sliceId} (nodeId: ${nodeId})`);
      }
    } else {
      console.warn(`Could not map slice code to node id: ${command.sliceId}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }, []);

  const executeScriptAnimated = useCallback(async (dotScript: string, wheelRef: React.RefObject<any>) => {
    if (!wheelRef.current?.executeDotScript) return;
    
    console.log('🎬 Starting animated DOT script execution');
    
    const lines = parseScriptLines(dotScript);
    const executableLines = lines.filter(line => line.isExecutable);
    
    if (executableLines.length === 0) {
      console.warn('No executable lines found in script');
      return;
    }
    
    // Clear existing user-generated arrows (NOT demo arrows)
    const userScriptArrows = document.querySelectorAll('.dot-script-connection:not(.initial-demo)');
    userScriptArrows.forEach(arrow => arrow.remove());
    
    setIsAnimating(true);
    setIsPaused(false);
    setCurrentLine(-1);
    setAnimationHistory([]);
    
    for (let i = 0; i < executableLines.length; i++) {
      // Check for pause
      if (isPaused) {
        await waitForUnpause();
      }
      
      const line = executableLines[i];
      setCurrentLine(line.index);
      
      console.log(`🎯 Executing line ${line.index}: ${line.cleaned} (${line.commandType})`);
      
      try {
        const command = parseScriptCommand(line.cleaned);
        
        if (!command) {
          console.warn(`Could not parse command: ${line.cleaned}`);
          continue;
        }
        
        // Execute based on command type
        if ('fromId' in command) {
          // Arrow command
          const result = wheelRef.current.executeDotScript(line.cleaned, false);
          
          if (result.success && result.created > 0) {
            setTimeout(() => {
              const newArrows = document.querySelectorAll('.dot-script-connection:not(.initial-demo):not(.user-generated):not(.animated)');
              newArrows.forEach((arrow, arrowIndex) => {
                arrow.classList.add('animated', 'user-generated');
                arrow.setAttribute('data-animation-step', i.toString());
                arrow.setAttribute('data-line-index', line.index.toString());
                
                (arrow as HTMLElement).style.opacity = '0.2';
                
                setTimeout(() => {
                  createShootingStarAnimation(arrow as SVGPathElement, () => {
                    (arrow as HTMLElement).style.opacity = '1';
                    (arrow as HTMLElement).style.filter = 'drop-shadow(0 0 4px currentColor)';
                    setTimeout(() => {
                      (arrow as HTMLElement).style.filter = 'none';
                    }, 500);
                  });
                }, arrowIndex * 300);
              });
              
              setAnimationHistory(prev => [...prev, {
                step: i,
                lineIndex: line.index,
                line: line.cleaned,
                created: result.created,
                timestamp: Date.now()
              }]);
            }, 50);
            
            const shootingStarTime = 1000 + (result.created * 300);
            await new Promise<void>(resolve => {
              animationTimeoutRef.current = setTimeout(resolve, Math.max(animationSpeed, shootingStarTime + 300));
            });
          } else {
            // Wait normal animation speed for failed arrow commands
            await new Promise<void>(resolve => {
              animationTimeoutRef.current = setTimeout(resolve, animationSpeed);
            });
          }
        } else if (command.type === 'zoom') {
          // Zoom command
          await executeZoomCommand(command, wheelRef);
          
          // Additional wait based on animation speed
          await new Promise<void>(resolve => {
            animationTimeoutRef.current = setTimeout(resolve, Math.max(animationSpeed / 2, 200));
          });
        } else if (command.type === 'rotate') {
          // Rotate command
          await executeRotateCommand(command, wheelRef);
          
          // Additional wait based on animation speed
          await new Promise<void>(resolve => {
            animationTimeoutRef.current = setTimeout(resolve, Math.max(animationSpeed / 2, 200));
          });
        } else if (command.type === 'wait') {
          // Wait command
          await executeWaitCommand(command);
        } else if (command.type === 'click') {
          await executeClickCommand(command, wheelRef);
        }
        
      } catch (error) {
        console.error(`❌ Error executing line ${line.index}:`, error);
        // Wait a bit even on error
        await new Promise<void>(resolve => {
          animationTimeoutRef.current = setTimeout(resolve, animationSpeed / 2);
        });
      }
    }
    
    setIsAnimating(false);
    setCurrentLine(-1);
    console.log('✅ Animated execution complete');
  }, [animationSpeed, isPaused, waitForUnpause, executeZoomCommand, executeRotateCommand, executeWaitCommand, executeClickCommand]);

  return {
    state: {
      isAnimating,
      isPaused,
      currentLine,
      animationSpeed,
      animationHistory
    },
    setIsAnimating,
    setIsPaused,
    setCurrentLine,
    setAnimationSpeed,
    setAnimationHistory,
    executeScriptAnimated,
    stopAnimation
  };
}; 