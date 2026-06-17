import React from 'react';
import type { SegmentData, CellEvent, Styles, WheelDirection } from '../../types';
interface WheelRingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    rotationRad: number;
    styles: Styles;
    transparent?: boolean;
    direction?: WheelDirection;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    focusAnimatingIdx?: number | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
}
export declare const WheelRing: React.FC<WheelRingProps>;
export {};
//# sourceMappingURL=WheelRing.d.ts.map