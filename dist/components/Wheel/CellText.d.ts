import React from 'react';
import type { VerticalAlign } from '../../types';
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
    verticalAlign: VerticalAlign;
}
export declare const CellText: React.FC<CellTextProps>;
export {};
//# sourceMappingURL=CellText.d.ts.map