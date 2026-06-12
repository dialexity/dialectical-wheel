import React from 'react';
interface CellTextProps {
    innerR: number;
    outerR: number;
    startAngle: number;
    endAngle: number;
    text: string;
    color: string;
    rotationRad: number;
    measure: (text: string, fontSize: number) => number;
    baseFontSize: number;
    padding: number;
    textBias: number;
}
export declare const CellText: React.FC<CellTextProps>;
export {};
//# sourceMappingURL=CellText.d.ts.map