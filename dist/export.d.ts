export interface ExportPNGOptions {
    width?: number;
    height?: number;
    background?: string;
}
export declare function exportWheelSVG(svg: SVGSVGElement): Blob;
export declare function exportWheelPNG(svg: SVGSVGElement, options?: ExportPNGOptions): Promise<Blob>;
export declare function downloadBlob(blob: Blob, filename: string): void;
//# sourceMappingURL=export.d.ts.map