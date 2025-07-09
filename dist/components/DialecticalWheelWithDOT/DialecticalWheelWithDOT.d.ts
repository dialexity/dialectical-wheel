import React from 'react';
import './DialecticalWheelWithDOT.css';
interface WisdomUnit {
    t_minus: {
        alias: string;
        statement: string;
        explanation: string;
    };
    t: {
        alias: string;
        statement: string;
        explanation: string;
    };
    t_plus: {
        alias: string;
        statement: string;
        explanation: string;
    };
    a_plus: {
        alias: string;
        statement: string;
        explanation: string;
    };
    a: {
        alias: string;
        statement: string;
        explanation: string;
    };
    a_minus: {
        alias: string;
        statement: string;
        explanation: string;
    };
}
interface WisdomData {
    user_message: string;
    wheels: Array<{
        wisdom_units: WisdomUnit[];
    }>;
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
    executeDotScript: (script: string) => {
        success: boolean;
        created: number;
        errors: string[];
    };
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
declare const DialecticalWheelWithDOT: React.FC<DialecticalWheelWithDOTProps>;
export default DialecticalWheelWithDOT;
export type { DialecticalWheelWithDOTProps, WisdomData, WisdomUnit };
//# sourceMappingURL=DialecticalWheelWithDOT.d.ts.map