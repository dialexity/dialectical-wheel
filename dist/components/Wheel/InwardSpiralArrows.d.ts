import React from 'react';
import type { SegmentData, Styles, WheelDirection } from '../../types';
import type { Radii } from './utils/geometry';
export interface SpiralArrowsProps {
    segments: {
        negative: SegmentData[];
        positive: SegmentData[];
    };
    radii: Radii;
    neutralOutside: boolean;
    direction: WheelDirection;
    styles: Styles;
    hoveredPerspectiveIdx?: number | null;
    selectedPerspectiveIdx?: number | null;
    focusAnimatingIdx?: number | null;
}
export declare const InwardSpiralArrows: React.FC<SpiralArrowsProps>;
//# sourceMappingURL=InwardSpiralArrows.d.ts.map