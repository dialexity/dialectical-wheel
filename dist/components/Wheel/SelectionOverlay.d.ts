import React from 'react';
import type { Radii } from './utils/geometry';
import type { SegmentData, Styles, HeaderRing } from '../../types';
interface SelectionOverlayProps {
    segments: SegmentData[];
    selectedPerspectiveIdx: number;
    header: HeaderRing;
    stitched?: boolean;
    styles: Styles;
    radii: Radii;
}
export declare const SelectionOverlay: React.FC<SelectionOverlayProps>;
export {};
//# sourceMappingURL=SelectionOverlay.d.ts.map