import React from 'react';
export interface GenerationSettings {
    component_length: number;
    causality_type: string;
    reasoning_mode?: string;
}
export interface Component {
    statement?: string;
    alias?: string;
    explanation?: string;
}
export interface WisdomUnit {
    t_minus: string | Component;
    t: string | Component;
    t_plus: string | Component;
    a_plus: string | Component;
    a: string | Component;
    a_minus: string | Component;
}
export interface WheelStructure {
    session_id: string;
    cardinality: number;
    user_message: string;
    cycle: {
        dialectical_components: Component[];
        argumentation: string;
        probability: number;
        causality_direction: string;
        reasoning_explanation: string;
    };
    wisdom_units: WisdomUnit[];
    creation_metadata: {
        created_at: string;
        generation_settings: GenerationSettings;
        original_text: string;
    };
}
export interface Preferences {
    whitesOnly: boolean;
    TsOnly: boolean;
    isWhiteOutside: boolean;
    showFlow: boolean;
    graphView: boolean;
}
export interface DialecticalWheelProps {
    wisdomUnits: WisdomUnit[];
    componentOrder: string[];
    preferences: Preferences;
    arrowConnections?: string;
    style?: React.CSSProperties;
    onChartReady?: (chart: any) => void;
    onTopSliceChange?: (topSlice: string) => void;
    onFocusedSliceChange?: (focusedSlice: string) => void;
    onClickedCellChange?: (clickedCellObject: any) => void;
    debug?: boolean;
}
//# sourceMappingURL=index.d.ts.map