interface UseRotationOptions {
    onTopSegmentChange?: (topSegment: string) => void;
    segmentIds: string[];
}
export declare function useRotation({ onTopSegmentChange, segmentIds }: UseRotationOptions): {
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