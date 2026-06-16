import React from 'react';
export type CSSValue = string | number;
export interface CellStyle {
    background: string;
    color: string;
    fontSize: CSSValue;
    padding: CSSValue;
    border: {
        width: CSSValue;
        color: string;
    };
    hoverBorderColor: string;
    selectedBorder: {
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
    perspectiveIndex: number;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    fullText: string;
    pairWith: string;
    startAngle: number;
    endAngle: number;
    cellStyle?: Partial<CellStyle>;
}
export interface CellEvent {
    segmentId: string;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    statement: string;
    pairWith: string;
    perspectiveIndex: number;
}
export interface SegmentEvent {
    segmentId: string;
    pairWith: string;
    perspectiveIndex: number;
}
export interface PerspectiveEvent {
    perspectiveIndex: number;
    thesis: string;
    antithesis: string;
}
/** @deprecated Use CellEvent instead */
export type ClickedCell = CellEvent;
export interface ResolvedCellStyle {
    background: string;
    color: string;
    fontSize: number;
    padding: number;
    borderWidth: number;
    borderColor: string;
    hoverBorderColor: string;
    selectedBorderWidth: number;
    selectedBorderColor: string;
}
export type HeaderRing = 'wheel' | 'cycle' | 'none';
export interface WheelProps {
    perspectives: Perspective[];
    headerRing?: HeaderRing;
    selectedPerspective?: number | null;
    focusedSegment?: string | null;
    neutralOutside?: boolean;
    styles?: Partial<Styles>;
    css?: React.CSSProperties;
    onFocusChanged?: (topSegment: string) => void;
    onCellOver?: (event: CellEvent) => void;
    onCellOut?: (event: CellEvent) => void;
    onCellClicked?: (event: CellEvent) => void;
    onSegmentOver?: (event: SegmentEvent) => void;
    onSegmentOut?: (event: SegmentEvent) => void;
    onSegmentClicked?: (event: SegmentEvent) => void;
    onPerspectiveOver?: (event: PerspectiveEvent) => void;
    onPerspectiveOut?: (event: PerspectiveEvent) => void;
    onPerspectiveClicked?: (event: PerspectiveEvent) => void;
}
//# sourceMappingURL=index.d.ts.map