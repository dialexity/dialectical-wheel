import React from 'react';
import type { SegmentData, CellEvent, Styles } from '../../types';
interface CycleRingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    rotationRad: number;
    styles: Styles;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
}
export declare const CycleRing: React.FC<CycleRingProps>;
export {};
//# sourceMappingURL=CycleRing.d.ts.map