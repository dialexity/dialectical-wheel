import React from 'react';
import type { SegmentData, ClickedCell, Styles } from '../../types';
type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';
interface RingProps {
    segments: SegmentData[];
    innerR: number;
    outerR: number;
    ringName: RingName;
    styles: Styles;
    rotationRad: number;
    measure: (text: string, fontSize: number) => number;
    onClick?: (cell: ClickedCell) => void;
    showText?: boolean;
}
export declare const Ring: React.FC<RingProps>;
export {};
//# sourceMappingURL=Ring.d.ts.map