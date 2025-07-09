export interface SliceSequenceItem {
    pair: number;
    type: 'thesis' | 'antithesis';
}
export interface WheelSequenceItem extends SliceSequenceItem {
    label: string;
}
export interface DetailedSlice {
    thesis: string;
    antithesis: string;
}
export interface PairTexts {
    [pairIndex: number]: {
        thesis: string;
        antithesis: string;
    };
}
export interface DynamicSlice {
    id: string;
    angle: number;
    width: number;
    label: string;
    pair: number;
    type: 'thesis' | 'antithesis';
    detailed?: boolean;
    svgContent?: string;
    originalIndex?: number;
}
export interface SliceLayer {
    pathD: string;
    fill: string;
}
export interface ClickableSliceData {
    layers: SliceLayer[];
    textX: number;
    textY: number;
    fontSize: number;
    label: string;
    pairIndex: number;
    sliceType: 'thesis' | 'antithesis';
}
export interface DialecticalWheelProps {
    numPairs?: number;
    title?: string;
    centerLabel?: string;
    sliceSequence?: SliceSequenceItem[] | null;
    fullSequence?: SliceSequenceItem[] | null;
    detailedSlices?: {
        [key: number]: DetailedSlice;
    };
    pairTexts?: PairTexts | null;
}
export interface WisdomUnit {
    id: string;
    thesis: string;
    antithesis: string;
    synthesis?: string;
    tags?: string[];
    source?: string;
}
export interface WheelConfiguration {
    numPairs: number;
    title: string;
    centerLabel: string;
    pairTexts: PairTexts;
}
export interface NodeConnection {
    fromId: string;
    toId: string;
    color?: string;
    strokeWidth?: number;
}
export interface LayerNode {
    id: string;
    element: Element;
    sliceId: string;
    pairIndex: number;
    sliceType: 'thesis' | 'antithesis';
    layerIndex: number;
    layerType: 'green' | 'white' | 'pink';
}
export interface Point {
    x: number;
    y: number;
}
export interface Transform {
    scale: number;
    offsetX: number;
    offsetY: number;
    rotation: number;
}
export interface ApiSession {
    session_id: string;
    user_message: string;
}
export interface ApiWisdomUnitComponent {
    statement: string;
    alias?: string;
}
export interface ApiWisdomUnit {
    t_plus: ApiWisdomUnitComponent;
    t: ApiWisdomUnitComponent;
    t_minus: ApiWisdomUnitComponent;
    a_plus: ApiWisdomUnitComponent;
    a: ApiWisdomUnitComponent;
    a_minus: ApiWisdomUnitComponent;
}
export interface ApiWheelResponse {
    wheels: Array<{
        wisdom_units: ApiWisdomUnit[];
    }>;
}
export interface ApiCycle {
    sequence: string[];
    probability: number;
    causality_direction: string;
    reasoning: string;
    argumentation: string;
    concepts: string[];
}
export interface ApiCyclesResponse {
    cycles: ApiCycle[];
}
export interface ApiSessionData {
    session_id: string;
    user_message: string;
    wheels: Array<{
        wisdom_units: ApiWisdomUnit[];
    }>;
    cycles?: ApiCycle[];
}
export interface WisdomUnitComponent {
    statement: string;
}
export interface TransformedWisdomUnit {
    tPlus: WisdomUnitComponent;
    t: WisdomUnitComponent;
    tMinus: WisdomUnitComponent;
    aPlus: WisdomUnitComponent;
    a: WisdomUnitComponent;
    aMinus: WisdomUnitComponent;
}
export interface CycleSequence {
    sequence: SliceSequenceItem[];
    probability: number;
    causality_direction: string;
    reasoning: string;
    argumentation: string;
    concepts: string[];
    rawSequence: string[];
    firstHalf: string[];
}
export interface UseDialecticalWheelState {
    sessionId: string | null;
    wisdomUnits: TransformedWisdomUnit[];
    pairTexts: PairTexts | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}
export interface UseDialecticalWheelWithCyclesState extends UseDialecticalWheelState {
    currentApiCycle: CycleSequence | null;
    cyclesData: ApiCyclesResponse | null;
}
export interface UseManualWheelState {
    loading: boolean;
    error: string | null;
    success: boolean;
    wheelData: any | null;
}
export interface ComponentCard {
    id: string;
    text: string;
    label: string;
    color: string;
    textColor: string;
    type: 'thesis' | 'antithesis';
}
export interface ExploreComponentProps {
    userMessage: string;
    wisdomUnits: TransformedWisdomUnit[];
    currentApiCycle: CycleSequence | null;
    onEdit: () => void;
}
//# sourceMappingURL=index.d.ts.map