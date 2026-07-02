export interface TextLayoutResult {
    lines: string[];
    fontSize: number;
    lineHeight: number;
    centerR: number;
}
export type RingNumber = 1 | 2 | 3;
export interface LayoutParams {
    innerR: number;
    outerR: number;
    cellAngle: number;
    baseFontSize: number;
    padding: number;
    measure: (text: string, fontSize: number) => number;
    textBias: number;
    ring: RingNumber;
}
export declare function computeUniformFontSize(texts: string[], params: LayoutParams): number;
export declare function layoutTextVariable(text: string, fontSize: number, params: LayoutParams, flipped: boolean): TextLayoutResult;
//# sourceMappingURL=textLayout.d.ts.map