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
declare const ScriptEditor: React.FC<ScriptEditorProps>;
export default ScriptEditor;
//# sourceMappingURL=ScriptEditor.d.ts.map