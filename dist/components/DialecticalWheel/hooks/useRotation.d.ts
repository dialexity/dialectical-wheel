interface UseRotationOptions {
    onTopSliceChange?: (topSlice: string) => void;
    sliceIds: string[];
}
export declare function useRotation({ onTopSliceChange, sliceIds }: UseRotationOptions): {
    rotationDeg: number;
    rotationRad: number;
    isDragging: boolean;
    svgRef: import("react").MutableRefObject<SVGSVGElement | null>;
    pointerHandlers: {
        onPointerDown: (e: React.PointerEvent) => void;
        onPointerMove: (e: React.PointerEvent) => void;
        onPointerUp: (e: React.PointerEvent) => void;
    };
};
export {};
//# sourceMappingURL=useRotation.d.ts.map