interface UseRotationOptions {
    onFocusChanged?: (topSegment: string) => void;
    segmentIds: string[];
    focusedSegment?: string | null;
}
export declare function useRotation({ onFocusChanged, segmentIds, focusedSegment }: UseRotationOptions): {
    rotationDeg: number;
    rotationRad: number;
    isDragging: boolean;
    isRotationPaused: boolean;
    focusAnimatingIdx: number | null;
    isSegmentAtFocusTarget: (segmentId: string) => boolean;
    refocusWithoutFade: (segmentId: string) => void;
    svgRef: import("react").MutableRefObject<SVGSVGElement | null>;
    pointerHandlers: {
        onPointerDown: (e: React.PointerEvent) => void;
        onPointerMove: (e: React.PointerEvent) => void;
        onPointerUp: (e: React.PointerEvent) => void;
    };
};
export {};
//# sourceMappingURL=useRotation.d.ts.map