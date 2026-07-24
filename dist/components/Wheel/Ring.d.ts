import React from 'react';
import type { RingNumber } from './utils/textLayout';
import type { SegmentData, CellEvent, Styles } from '../../types';
type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';
interface RingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    ringName: RingName;
    ringNumber: RingNumber;
    rowGroup: 'thead' | 'tbody' | 'tfoot';
    styles: Styles;
    rotationRad: number;
    measure: (text: string, fontSize: number) => number;
    perspectiveCount: number;
    hoveredSegmentId?: string | null;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    focusAnimatingIdx?: number | null;
    onClick?: (event: CellEvent) => void;
    onPointerEnter?: (event: CellEvent) => void;
    onPointerLeave?: (event: CellEvent) => void;
    showText?: boolean;
    headerBehavior?: boolean;
    maxFontSize?: number;
    forcedFontSize?: number;
}
export declare function computeTextBias(ringName: RingName, perspectiveCount: number): number;
export declare const Ring: React.FC<RingProps>;
export {};
//# sourceMappingURL=Ring.d.ts.map