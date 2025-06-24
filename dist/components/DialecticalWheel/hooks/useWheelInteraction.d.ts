export declare const useWheelInteraction: () => {
    rotation: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    isZoomedToQ2: boolean;
    recordRef: import("react").RefObject<SVGGElement>;
    svgRef: import("react").RefObject<SVGSVGElement>;
    handleMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
    handleMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
    handleMouseUp: () => void;
    handleTouchStart: (e: React.TouchEvent<SVGSVGElement>) => void;
    handleTouchMove: (e: React.TouchEvent<SVGSVGElement>) => void;
    handleTouchEnd: (e: React.TouchEvent<SVGSVGElement>) => void;
    setRotation: import("react").Dispatch<import("react").SetStateAction<number>>;
    toggleTopHalfZoom: () => void;
    svgProps: {
        ref: import("react").RefObject<SVGSVGElement>;
        onMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
        onMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
        onMouseUp: () => void;
        onTouchStart: (e: React.TouchEvent<SVGSVGElement>) => void;
        onTouchMove: (e: React.TouchEvent<SVGSVGElement>) => void;
        onTouchEnd: (e: React.TouchEvent<SVGSVGElement>) => void;
        style: {
            touchAction: string;
        };
    };
};
//# sourceMappingURL=useWheelInteraction.d.ts.map