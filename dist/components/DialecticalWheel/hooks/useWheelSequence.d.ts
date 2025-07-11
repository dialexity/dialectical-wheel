interface SliceConfig {
    pair: number;
    type: 'thesis' | 'antithesis';
}
interface SequenceWithLabels {
    label: string;
    pair: number;
    type: 'thesis' | 'antithesis';
}
export declare const useWheelSequence: (numPairs: number, sliceSequence?: SliceConfig[] | null) => {
    wheelSequence: {
        pair: number;
        type: string;
    }[];
    sequenceWithLabels: SequenceWithLabels[];
    normalSliceAngle: number;
    focusedSliceAngle: number;
    unfocusedSliceAngle: number;
};
export type { SliceConfig, SequenceWithLabels };
//# sourceMappingURL=useWheelSequence.d.ts.map