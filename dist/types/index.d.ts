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
    arrow: {
        color: string;
        width: CSSValue;
    };
    hoverArrowColor: string;
}
export type RowScope = Partial<CellStyle> & {
    thesis?: Partial<CellStyle> & {
        [n: number]: Partial<CellStyle> | undefined;
    };
    antithesis?: Partial<CellStyle> & {
        [n: number]: Partial<CellStyle> | undefined;
    };
} & {
    [n: number]: Partial<CellStyle> | undefined;
};
export interface Styles extends Partial<CellStyle> {
    dimUnfocused?: number;
    spiralArrow?: {
        color?: string;
        width?: CSSValue;
    };
    thead?: RowScope & {
        neutral?: RowScope;
    };
    tbody?: Partial<CellStyle> & {
        positive?: RowScope;
        negative?: RowScope;
        neutral?: RowScope;
        /** @deprecated Use tfoot instead */
        synthesis?: Partial<CellStyle>;
    };
    tfoot?: RowScope;
}
export interface StyleContext {
    rowGroup: 'thead' | 'tbody' | 'tfoot';
    ring: 'positive' | 'negative' | 'neutral' | 'synthesis' | 'cycle';
    colType: 'thesis' | 'antithesis';
    perspectiveIndex: number;
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
    swapped?: boolean;
    style?: Partial<CellStyle>;
}
export interface SegmentData {
    segmentId: string;
    perspectiveIndex: number;
    polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
    colType: 'thesis' | 'antithesis';
    swapped?: boolean;
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
export interface ArrowEvent {
    segmentId: string;
    perspectiveIndex: number;
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
    arrowColor: string;
    arrowHoverColor: string;
    arrowWidth: number;
}
export type HeaderRing = 'wheel' | 'cycle' | 'none';
export type WheelDirection = 'left' | 'right';
/**
 * How font size relates to the ring geometry.
 * - `'balance'` (default): one font is shared by every body-ring cell and the
 *   ring bands flex (within a growth clamp) so the text-heavy ring gets more
 *   radial room. Fonts come out equal — or near-equal when one cell's text is
 *   far longer than the rest and the clamp binds — instead of the short cells
 *   reading as "more important" simply because they fit a bigger size.
 * - `'shrink'`: ring bands are fixed; each ring's font shrinks independently to
 *   fit its text, so a long cell renders smaller than a short one in another
 *   ring.
 */
export type WheelSizingMode = 'balance' | 'shrink';
export interface WheelProps {
    perspectives: Perspective[];
    header?: HeaderRing;
    direction?: WheelDirection;
    sizingMode?: WheelSizingMode;
    showArrows?: boolean;
    showInwardSpiral?: boolean;
    interactive?: boolean;
    selectedPerspective?: number | null;
    focusedSegment?: string | null;
    neutralOutside?: boolean | 'header';
    styles?: Partial<Styles>;
    css?: React.CSSProperties;
    children?: React.ReactNode;
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
    onArrowOver?: (event: ArrowEvent) => void;
    onArrowOut?: (event: ArrowEvent) => void;
    onArrowClicked?: (event: ArrowEvent) => void;
}
//# sourceMappingURL=index.d.ts.map