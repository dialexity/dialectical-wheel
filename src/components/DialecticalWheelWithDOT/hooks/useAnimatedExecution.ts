import { useState, useCallback, useRef } from 'react';
import { createShootingStarAnimation } from '../utils/ShootingStarAnimation';
import { parseScriptLines, ParsedLine } from '../utils/ScriptParser';

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
      if (isPaused) {
        await new Promise<void>(resolve => {
          const checkPause = () => {
            if (!isPaused) {
              resolve();
            } else {
              setTimeout(checkPause, 100);
            }
          };
          checkPause();
        });
      }
      
      const line = executableLines[i];
      setCurrentLine(line.index);
      
      console.log(`🎯 Executing line ${line.index}: ${line.cleaned}`);
      
      try {
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
        }
        
        const shootingStarTime = result.success && result.created > 0 ? 1000 + (result.created * 300) : 0;
        await new Promise<void>(resolve => {
          animationTimeoutRef.current = setTimeout(resolve, Math.max(animationSpeed, shootingStarTime + 300));
        });
        
      } catch (error) {
        console.error(`❌ Error executing line ${line.index}:`, error);
      }
    }
    
    setIsAnimating(false);
    setCurrentLine(-1);
    console.log('✅ Animated execution complete');
  }, [animationSpeed, isPaused]);

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