import React from 'react';
import type { SegmentData, CellEvent, Styles } from '../../types';
type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';
interface RingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    ringName: RingName;
    styles: Styles;
    rotationRad: number;
    measure: (text: string, fontSize: number) => number;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
    showText?: boolean;
}
export declare const Ring: React.FC<RingProps>;
export {};
//# sourceMappingURL=Ring.d.ts.map