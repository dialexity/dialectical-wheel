import type { Perspective, SegmentData } from '../../../types';
export interface RingData {
    invisible: SegmentData[];
    negative: SegmentData[];
    neutral: SegmentData[];
    positive: SegmentData[];
}
export declare function transformPerspectives(perspectives: Perspective[], segmentOrder?: string[]): RingData;
//# sourceMappingURL=dataTransform.d.ts.map