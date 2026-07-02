import React from 'react';
import type { RingNumber } from './utils/textLayout';
import type { SegmentData, CellEvent, ResolvedCellStyle } from '../../types';
interface CellProps {
    segment: SegmentData;
    innerR: number;
    outerR: number;
    style: ResolvedCellStyle;
    rotationRad: number;
    fontSize: number;
    textBias: number;
    ringNumber: RingNumber;
    measure: (text: string, fontSize: number) => number;
    hovered?: boolean;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
    showText?: boolean;
}
export declare const Cell: React.FC<CellProps>;
export {};
//# sourceMappingURL=Cell.d.ts.map