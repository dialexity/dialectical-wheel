import React from 'react';
import type { SegmentData, ClickedCell, ResolvedCellStyle } from '../../types';
interface CellProps {
    segment: SegmentData;
    innerR: number;
    outerR: number;
    style: ResolvedCellStyle;
    rotationRad: number;
    fontSize: number;
    onClick?: (cell: ClickedCell) => void;
    showText?: boolean;
}
export declare const Cell: React.FC<CellProps>;
export {};
//# sourceMappingURL=Cell.d.ts.map