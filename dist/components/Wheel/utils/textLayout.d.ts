export interface TextLayoutResult {
    lines: string[];
    fontSize: number;
    lineHeight: number;
}
interface LayoutParams {
    innerR: number;
    outerR: number;
    cellAngle: number;
    baseFontSize: number;
    padding: number;
    measure: (text: string, fontSize: number) => number;
}
export declare function computeUniformFontSize(texts: string[], params: LayoutParams): number;
export declare function layoutTextFixed(text: string, fontSize: number, params: LayoutParams): TextLayoutResult;
export {};
//# sourceMappingURL=textLayout.d.ts.map