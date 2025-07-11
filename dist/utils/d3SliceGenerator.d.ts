export interface D3SliceConfig {
    cx: number;
    cy: number;
    radius: number;
    sliceAngle: number;
    layerCount: number;
}
export declare class D3SliceGenerator {
    private arc;
    private config;
    constructor(config: D3SliceConfig);
    /**
     * Generate SVG path for a slice layer using D3's arc generator
     */
    generateLayerPath(layerIndex: number, angle?: number): string;
    /**
     * Generate text arc path for curved text positioning
     */
    generateTextArc(layerIndex: number, angle?: number): {
        path: string;
        radius: number;
        arcLength: number;
    };
    /**
     * Calculate optimal font size using D3 scales
     */
    calculateOptimalFontSize(text: string, arcLength: number, maxFontSize: number, minFontSize?: number): number;
    /**
     * Advanced text wrapping using D3 utilities
     */
    wrapTextForArc(text: string, arcLength: number, fontSize: number): string[];
    /**
     * Generate boundary lines using D3 calculations
     */
    generateBoundaryLines(angle?: number): Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }>;
    /**
     * Create a coordinate transformation matrix using D3
     */
    createTransform(angle: number, scale?: number, translateX?: number, translateY?: number): string;
}
export declare const createD3SliceGenerator: (cx?: number, cy?: number, radius?: number, sliceAngle?: number, layerCount?: number) => D3SliceGenerator;
//# sourceMappingURL=d3SliceGenerator.d.ts.map