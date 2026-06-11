import React from 'react';
import type { SliceData, CellInfo } from '../../types';
interface ArcCellProps {
    slice: SliceData;
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
export declare const ArcCell: React.FC<ArcCellProps>;
export {};
//# sourceMappingURL=ArcCell.d.ts.map