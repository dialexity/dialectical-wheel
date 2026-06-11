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
    measure: (text: string, fontSize: number) => number;
}
export declare function layoutText(text: string, params: LayoutParams): TextLayoutResult;
export {};
//# sourceMappingURL=textLayout.d.ts.map