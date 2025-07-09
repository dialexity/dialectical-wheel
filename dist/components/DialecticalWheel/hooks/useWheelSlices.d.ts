import { SequenceWithLabels } from './useWheelSequence';
interface DynamicSlice {
    id: string;
    angle: number;
    width: number;
    label: string;
    pair: number;
    type: 'thesis' | 'antithesis';
    focused?: boolean;
    detailed?: boolean;
    originalIndex?: number;
    svgContent?: string;
}
interface DetailedSlices {
    [key: number]: {
        thesis: string;
        antithesis: string;
    };
}
interface PairTexts {
    [key: number]: {
        thesis: string[][];
        antithesis: string[][];
    };
}
interface SliceClickData {
    textX: number;
    textY: number;
    fontSize: number;
    label: string;
    pairIndex: number;
    sliceType: 'thesis' | 'antithesis';
    layers: Array<{
        pathD: string;
        fill: string;
    }>;
}
export declare const useWheelSlices: (sequenceWithLabels: SequenceWithLabels[], normalSliceAngle: number, focusedSliceAngle: number, unfocusedSliceAngle: number, rotation: number, setRotation: (rotation: number) => void, pairTexts?: PairTexts | null, detailedSlices?: DetailedSlices) => {
    focusedPair: number | null;
    dynamicSlices: DynamicSlice[];
    memoizedSliceData: Map<any, any>;
    handleSliceClick: (pairIndex: number) => void;
    handleSliceTouchStart: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
    handleSliceTouchEnd: (e: React.TouchEvent<SVGElement>, pairIndex: number) => void;
    createEqualSlices: () => void;
    focusOnPair: (pairIndex: number, clickedSliceType?: "thesis" | "antithesis" | null, targetVisualAngle?: number | null) => void;
    reset: () => void;
};
export type { DynamicSlice, DetailedSlices, PairTexts, SliceClickData };
//# sourceMappingURL=useWheelSlices.d.ts.map