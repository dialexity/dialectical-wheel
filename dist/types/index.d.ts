import React from 'react';
export type CSSValue = string | number;
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export interface CellStyle {
    background: string;
    color: string;
    fontSize: CSSValue;
    padding: CSSValue;
    verticalAlign: VerticalAlign;
    border: {
        width: CSSValue;
        color: string;
    };
}
export interface Styles extends Partial<CellStyle> {
    thead?: Partial<CellStyle>;
    tbody?: Partial<CellStyle> & {
        positive?: Partial<CellStyle>;
        negative?: Partial<CellStyle>;
        neutral?: Partial<CellStyle>;
        synthesis?: Partial<CellStyle>;
    };
}
export interface Cell {
    statement?: string;
    alias?: string;
    explanation?: string;
    style?: Partial<CellStyle>;
}
export interface Perspective {
    t_minus: string | Cell;
    t: string | Cell;
    t_plus: string | Cell;
    a_plus: string | Cell;
    a: string | Cell;
    a_minus: string | Cell;
    style?: Partial<CellStyle>;
}
export interface SegmentData {
    segmentId: string;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    fullText: string;
    pairWith: string;
    startAngle: number;
    endAngle: number;
    cellStyle?: Partial<CellStyle>;
}
export interface ClickedCell {
    segmentId: string;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    statement: string;
    pairWith: string;
}
export interface ResolvedCellStyle {
    background: string;
    color: string;
    fontSize: number;
    padding: number;
    verticalAlign: VerticalAlign;
    borderWidth: number;
    borderColor: string;
}
export interface WheelProps {
    perspectives: Perspective[];
    neutralOutside?: boolean;
    styles?: Partial<Styles>;
    css?: React.CSSProperties;
    onFocusChanged?: (topSegment: string) => void;
    onCellClicked?: (cell: ClickedCell | null) => void;
    debug?: boolean;
}
//# sourceMappingURL=index.d.ts.map