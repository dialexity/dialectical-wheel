import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type AnimationStage = 
  | 'idle'
  | 'pairs-appear'
  | 'sides-sequence'
  | 'arrows-draw'
  | 'complete';

interface WheelBuildAnimationProps {
  isAnimating: boolean;
  onAnimationComplete: () => void;
  onStageChange: (stage: AnimationStage) => void;
  numPairs: number;
  duration?: number;
  children: React.ReactNode;
}

const WheelBuildAnimation: React.FC<WheelBuildAnimationProps> = ({
  isAnimating,
  onAnimationComplete,
  onStageChange,
  numPairs,
  duration = 4000,
  children,
}) => {
  const [currentStage, setCurrentStage] = useState<AnimationStage>('idle');
  const isRunningRef = useRef(false);
  
  const onAnimationCompleteRef = useRef(onAnimationComplete);
  const onStageChangeRef = useRef(onStageChange);
  
  useEffect(() => {
    onAnimationCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);
  
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  }, [onStageChange]);

  const stageDurations = {
    'idle': 300,
    'pairs-appear': Math.max(2000, numPairs * 2 * 0.4 * 1000 + 500),
    'sides-sequence': Math.max(4000, numPairs * 4 * 0.5 * 1000 + 1000),
    'arrows-draw': Math.max(4000, numPairs * 800 + 1200 + 500),
    'complete': 300
  };

  useEffect(() => {
    if (!isAnimating) {
      setCurrentStage('idle');
      isRunningRef.current = false;
      return;
    }

    if (isRunningRef.current) {
      return;
    }

    isRunningRef.current = true;
    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;
    
    const stages: AnimationStage[] = [
      'pairs-appear',
      'sides-sequence',
      'arrows-draw',
      'complete'
    ];

    const runStages = async () => {
      for (const stage of stages) {
        if (isCancelled || !isAnimating) {
          isRunningRef.current = false;
          return;
        }

        setCurrentStage(stage);
        onStageChangeRef.current(stage);
        
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            if (!isCancelled) {
              resolve(undefined);
            }
          }, stageDurations[stage]);
        });
      }
      
      if (!isCancelled) {
        isRunningRef.current = false;
        onAnimationCompleteRef.current();
      }
    };

    runStages();

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      isRunningRef.current = false;
    };
  }, [isAnimating, numPairs]);

  const getStageVariants = (stage: AnimationStage) => {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    };
  };

  if (!isAnimating) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStage}
        {...getStageVariants(currentStage)}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default WheelBuildAnimation; 