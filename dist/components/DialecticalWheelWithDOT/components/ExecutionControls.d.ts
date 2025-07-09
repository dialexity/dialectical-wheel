import React from 'react';
interface ExecutionControlsProps {
    isAnimating: boolean;
    executionResult: any;
    onExecuteAnimated: () => void;
    onExecuteInstant: () => void;
    onForceRedraw: () => void;
    onClearArrows: () => void;
}
declare const ExecutionControls: React.FC<ExecutionControlsProps>;
export default ExecutionControls;
//# sourceMappingURL=ExecutionControls.d.ts.map