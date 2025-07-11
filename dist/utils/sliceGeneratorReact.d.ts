import React from 'react';
interface SliceData {
    labels: [string, string][];
}
interface SliceProps {
    sliceData: SliceData;
    sliceId: string;
    angle?: number;
    cx?: number;
    cy?: number;
    radius?: number;
    sliceAngle?: number;
    layerColors?: string[] | null;
    fontSizes?: number[] | null;
    showBoundaries?: boolean;
    pairIndex?: number | null;
    sliceType?: 'thesis' | 'antithesis' | null;
    originalSliceIndex?: number | null;
}
export declare const SliceAtAngle: React.FC<SliceProps>;
export declare const DetailedSlice: React.FC<{
    texts: string[];
    sliceId: string;
    debugColor?: string;
}>;
export { defaultPairTexts } from './sliceGenerator.js';
//# sourceMappingURL=sliceGeneratorReact.d.ts.map