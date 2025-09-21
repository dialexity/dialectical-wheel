import { Runtime } from '@observablehq/runtime';
export interface NotebookCell {
    id: number;
    mode: string;
    value: string;
    output?: string;
    hidden?: boolean;
}
export interface NotebookLoaderOptions {
    resolveFiles?: boolean;
}
/**
 * Extract cells from an Observable HTML notebook
 */
export declare function extractCellsFromHtml(html: string): NotebookCell[];
/**
 * Load and create a Runtime module from notebook HTML
 */
export declare function loadNotebookFromHtml(html: string, _runtime: Runtime, options?: NotebookLoaderOptions): any;
/**
 * Load notebook from a URL
 */
export declare function loadNotebookFromUrl(url: string, runtime: Runtime, options?: NotebookLoaderOptions): Promise<any>;
/**
 * Load notebook from a file path (Node.js only)
 */
export declare function loadNotebookFromFile(_filePath: string, _runtime: Runtime, _options?: NotebookLoaderOptions): any;
//# sourceMappingURL=notebookLoader.d.ts.map