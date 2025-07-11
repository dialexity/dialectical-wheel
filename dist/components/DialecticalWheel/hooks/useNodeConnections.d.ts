import { DynamicSlice } from './useWheelSlices';
interface DemoConnection {
    fromId: string;
    toId: string;
    color: string;
    strokeWidth: number;
    label: string;
}
type SliceLayerCode = string;
type LayerType = 'green' | 'white' | 'pink';
type SliceType = 'thesis' | 'antithesis';
interface SliceLayerMapping {
    pairIndex: number;
    sliceType: SliceType;
    layerType: LayerType;
    layerIndex: number;
}
interface DotEdgeAttributes {
    color?: string;
    weight?: number;
    strokeWidth?: number;
    label?: string;
    style?: 'solid' | 'dashed' | 'dotted';
}
interface DotEdge {
    from: SliceLayerCode;
    to: SliceLayerCode;
    attributes: DotEdgeAttributes;
}
interface DotScriptParseResult {
    edges: DotEdge[];
    errors: string[];
}
export declare const useNodeConnections: (dynamicSlices: DynamicSlice[], title: string, recordRef: React.RefObject<SVGGElement>) => {
    showArrows: boolean;
    demoConnections: DemoConnection[];
    toggleArrows: () => void;
    createDemoConnections: () => void;
    nodeAPI: {
        getAllLayerNodes: () => NodeListOf<Element>;
        getLayerNodeById: (nodeId: string) => Element | null;
        getLayerNodesForPair: (pairIndex: number) => NodeListOf<Element>;
        getLayerNodesByType: (layerType: string) => NodeListOf<Element>;
        getLayerNodeInfo: (nodeElement: HTMLElement | null) => {
            nodeId: string;
            sliceId: string;
            pairIndex: number;
            sliceType: string;
            layerIndex: number;
            layerType: string;
        } | null;
        getNodeCenter: (nodeElement: HTMLElement | null) => {
            x: number;
            y: number;
        } | null;
        connectNodes: (fromId: string, toId: string, color?: string, strokeWidth?: number) => SVGPathElement | null;
    };
    sliceLayerAPI: {
        parseSliceLayerCode: (code: SliceLayerCode) => SliceLayerMapping | null;
        getNodeIdFromSliceLayerCode: (code: SliceLayerCode) => string | null;
        connectNodesBySliceLayerCode: (fromCode: SliceLayerCode, toCode: SliceLayerCode, color?: string, strokeWidth?: number) => SVGPathElement | null;
        getAvailableSliceLayerCodes: () => SliceLayerCode[];
        createSliceLayerMappingDemo: () => void;
    };
    dotScriptAPI: {
        parseDotScript: (dotScript: string) => DotScriptParseResult;
        executeDotScript: (dotScript: string, clearExisting?: boolean) => {
            success: boolean;
            created: number;
            errors: string[];
        };
        createDotScriptDemo: () => void;
    };
};
export type { DemoConnection, SliceLayerCode, SliceLayerMapping, LayerType, SliceType, DotEdgeAttributes, DotEdge, DotScriptParseResult };
//# sourceMappingURL=useNodeConnections.d.ts.map