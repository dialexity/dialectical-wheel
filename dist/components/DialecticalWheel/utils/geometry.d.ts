export declare function polarToCartesian(r: number, angle: number): [number, number];
export declare function describeArc(innerR: number, outerR: number, startAngle: number, endAngle: number): string;
export declare function arcCentroid(innerR: number, outerR: number, startAngle: number, endAngle: number): [number, number];
export declare function normalizeAngle(angle: number): number;
export declare const RADII: {
    readonly hub: 30;
    readonly innerStart: 30;
    readonly innerEnd: 100;
    readonly middleStart: 100;
    readonly middleEnd: 150;
    readonly outerStart: 150;
    readonly outerEnd: 200;
    readonly invisibleStart: 200;
    readonly invisibleEnd: 250;
};
//# sourceMappingURL=geometry.d.ts.map