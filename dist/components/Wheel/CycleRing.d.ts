import React from 'react';
import type { SegmentData, CellEvent, Styles, WheelDirection } from '../../types';
interface CycleRingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    rotationRad: number;
    styles: Styles;
    transparent?: boolean;
    direction?: WheelDirection;
    showArrows?: boolean;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    focusAnimatingIdx?: number | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
}
export declare const CycleRing: React.FC<CycleRingProps>;
export {};
//# sourceMappingURL=CycleRing.d.ts.map