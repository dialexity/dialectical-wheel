import React from 'react';
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
export interface RingStyle {
    maxFontSize: number;
    padding: number;
    textBias: number;
}
export interface Styles {
    ringColors: {
        negative: string;
        neutral: string;
        positive: string;
    };
    textColors: {
        negative: string;
        neutral: string;
        positive: string;
        coordinates: string;
    };
    hubColor: string;
    maxFontSize: number;
    ringStyles?: {
        positive?: Partial<RingStyle>;
        neutral?: Partial<RingStyle>;
        negative?: Partial<RingStyle>;
    };
    coordinateLabelSize: number;
    strokeWidth: number;
    strokeColor: string;
}
export interface CellInfo {
    unitId: string;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    statement: string;
    pairWith: string;
}
export interface SliceData {
    unitId: string;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    fullText: string;
    pairWith: string;
    startAngle: number;
    endAngle: number;
}
export interface DialecticalWheelProps {
    wisdomUnits: WisdomUnit[];
    componentOrder?: string[];
    isWhiteOutside?: boolean;
    styles?: Partial<Styles>;
    css?: React.CSSProperties;
    onTopSliceChange?: (topSlice: string) => void;
    onClickedCellChange?: (cell: CellInfo | null) => void;
    debug?: boolean;
}
//# sourceMappingURL=index.d.ts.map