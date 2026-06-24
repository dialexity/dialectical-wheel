import React from 'react';
import type { SegmentData, CellEvent, ArrowEvent, Styles, WheelDirection } from '../../types';
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
    hoveredArrowId?: string | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
    onArrowOver?: (event: ArrowEvent) => void;
    onArrowOut?: (event: ArrowEvent) => void;
    onArrowClicked?: (event: ArrowEvent) => void;
}
export declare const CycleRing: React.FC<CycleRingProps>;
export {};
//# sourceMappingURL=CycleRing.d.ts.map