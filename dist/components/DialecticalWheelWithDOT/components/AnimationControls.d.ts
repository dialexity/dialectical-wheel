import React from 'react';
interface AnimationControlsProps {
    isAnimating: boolean;
    isPaused: boolean;
    currentLine: number;
    animationSpeed: number;
    enableAnimation: boolean;
    setIsPaused: (paused: boolean) => void;
    setAnimationSpeed: (speed: number) => void;
    onStop: () => void;
}
declare const AnimationControls: React.FC<AnimationControlsProps>;
export default AnimationControls;
//# sourceMappingURL=AnimationControls.d.ts.map