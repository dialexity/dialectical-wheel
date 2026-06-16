import React from 'react';
import type { SegmentData, CellEvent, Styles } from '../../types';
interface StitchedRingProps {
    segments: SegmentData[];
    outerSegments: SegmentData[];
    innerR: number;
    outerR: number;
    outerRingName: 'neutral' | 'negative';
    outerRingRadialHeight: number;
    rotationRad: number;
    styles: Styles;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    focusAnimatingIdx?: number | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
}
export declare const StitchedRing: React.FC<StitchedRingProps>;
export {};
//# sourceMappingURL=StitchedRing.d.ts.map