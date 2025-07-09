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
export declare const useAnimatedExecution: () => AnimatedExecutionControls;
export {};
//# sourceMappingURL=useAnimatedExecution.d.ts.map