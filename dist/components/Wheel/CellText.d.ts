import React from 'react';
import type { RingNumber } from './utils/textLayout';
interface CellTextProps {
    innerR: number;
    outerR: number;
    startAngle: number;
    endAngle: number;
    text: string;
    color: string;
    rotationRad: number;
    fontSize: number;
    padding: number;
    textBias: number;
    ringNumber: RingNumber;
    measure: (text: string, fontSize: number) => number;
}
export declare const CellText: React.FC<CellTextProps>;
export {};
//# sourceMappingURL=CellText.d.ts.map