export declare function polarToCartesian(r: number, angle: number): [number, number];
export declare function describeArc(innerR: number, outerR: number, startAngle: number, endAngle: number): string;
export declare function normalizeAngle(angle: number): number;
export interface Radii {
    synthesis: number;
    innerStart: number;
    innerEnd: number;
    middleStart: number;
    middleEnd: number;
    outerStart: number;
    outerEnd: number;
    cycleStart: number;
    cycleEnd: number;
}
export declare function getRadii(perspectiveCount: number): Radii;
export declare const RADII: Radii;
//# sourceMappingURL=geometry.d.ts.map