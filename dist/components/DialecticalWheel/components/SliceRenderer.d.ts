import React from 'react';
import type { PairTexts } from '../hooks';
interface SliceRendererProps {
    dynamicSlices: any[];
    memoizedSliceData: Map<string, any>;
    handleSliceClick: (pairIndex: number) => void;
    handleSliceTouchStart: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
    handleSliceTouchEnd: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
    rotation: number;
    pairTexts: PairTexts | null;
}
declare const SliceRenderer: React.FC<SliceRendererProps>;
export default SliceRenderer;
//# sourceMappingURL=SliceRenderer.d.ts.map