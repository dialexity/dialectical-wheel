import type { WisdomUnit, SliceData } from '../../../types';
export interface RingData {
    invisible: SliceData[];
    negative: SliceData[];
    neutral: SliceData[];
    positive: SliceData[];
}
export declare function transformWisdomUnits(wisdomUnits: WisdomUnit[], componentOrder?: string[]): RingData;
//# sourceMappingURL=dataTransform.d.ts.map