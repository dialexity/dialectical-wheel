import React from 'react';
import type { SliceData, CellInfo } from '../../types';
interface RingProps {
    slices: SliceData[];
    innerR: number;
    outerR: number;
    fillColor: string;
    textColor: string;
    rotationRad: number;
    measure: (text: string, fontSize: number) => number;
    baseFontSize: number;
    onClick?: (cell: CellInfo) => void;
    showText?: boolean;
}
export declare const Ring: React.FC<RingProps>;
export {};
//# sourceMappingURL=Ring.d.ts.map