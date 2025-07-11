export interface ParsedLine {
    index: number;
    original: string;
    cleaned: string;
    isComment: boolean;
    isExecutable: boolean;
    commandType: 'arrow' | 'zoom' | 'rotate' | 'wait' | 'click' | 'unknown';
}
export interface HistoryEntry {
    fromId: string;
    toId: string;
    color: string;
    strokeWidth: number;
    label: string;
}
export interface ZoomCommand {
    type: 'zoom';
    action: 'in' | 'out' | 'top' | 'reset';
    scale?: number;
    duration?: number;
}
export interface RotateCommand {
    type: 'rotate';
    angle?: number;
    targetSlice?: string;
    duration?: number;
    direction?: 'cw' | 'ccw' | 'shortest';
}
export interface WaitCommand {
    type: 'wait';
    duration: number;
}
export interface ClickCommand {
    type: 'click';
    sliceId: string;
}
export type ScriptCommand = HistoryEntry | ZoomCommand | RotateCommand | WaitCommand | ClickCommand;
/**
 * Parse DOT script into executable lines with command type detection
 */
export declare const parseScriptLines: (script: string) => ParsedLine[];
/**
 * Parse a single script line into a command object
 */
export declare const parseScriptCommand: (line: string) => ScriptCommand | null;
/**
 * Parse DOT script lines to extract connection history
 */
export declare const parseScriptToHistory: (dotScript: string) => HistoryEntry[];
export type LayerType = 'green' | 'white' | 'pink';
export type SliceType = 'thesis' | 'antithesis';
export interface SliceLayerMapping {
    pairIndex: number;
    sliceType: SliceType;
    layerType: LayerType;
    layerIndex: number;
}
export declare function parseSliceLayerCode(code: string): SliceLayerMapping | null;
export declare function getNodeIdFromSliceLayerCode(code: string, dynamicSlices: any[]): string | null;
export declare function getRotationAngleForSlice(sliceCode: string, dynamicSlices: any[]): number | null;
//# sourceMappingURL=ScriptParser.d.ts.map