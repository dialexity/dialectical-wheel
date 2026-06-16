import React from 'react';
import type { SegmentData, CellEvent, ResolvedCellStyle } from '../../types';
interface CellProps {
    segment: SegmentData;
    innerR: number;
    outerR: number;
    style: ResolvedCellStyle;
    rotationRad: number;
    fontSize: number;
    hovered?: boolean;
    selected?: boolean;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
    showText?: boolean;
}
export declare const Cell: React.FC<CellProps>;
export {};
//# sourceMappingURL=Cell.d.ts.map