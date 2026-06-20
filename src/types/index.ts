import React from 'react';

// --- Style types ---

export type CSSValue = string | number; // number = px, string = "14px" | "80%" | "0.9em"

export interface CellStyle {
  background: string;
  color: string;
  fontSize: CSSValue;
  padding: CSSValue;
  border: { width: CSSValue; color: string };
  hoverBorderColor: string;
  selectedBorder: { width: CSSValue; color: string };
  arrow: { color: string; width: CSSValue };
  hoverArrowColor: string;
}

export type RowScope = Partial<CellStyle> & {
  thesis?: Partial<CellStyle> & { [n: number]: Partial<CellStyle> | undefined };
  antithesis?: Partial<CellStyle> & { [n: number]: Partial<CellStyle> | undefined };
} & { [n: number]: Partial<CellStyle> | undefined };

export interface Styles extends Partial<CellStyle> {
  dimUnfocused?: number;
  thead?: RowScope & { neutral?: RowScope };
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

// --- Data types ---

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

// --- Internal types ---

export interface SegmentData {
  segmentId: string;
  perspectiveIndex: number;
  polarity: 'positive' | 'neutral' | 'negative' | 'invisible';
  colType: 'thesis' | 'antithesis';
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

// --- Resolved style (internal, all values concrete) ---

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

// --- Props ---

export type HeaderRing = 'wheel' | 'cycle' | 'none';
export type WheelDirection = 'left' | 'right';

export interface WheelProps {
  perspectives: Perspective[];
  header?: HeaderRing;
  direction?: WheelDirection;
  showArrows?: boolean;
  showInwardSpiral?: boolean;
  interactive?: boolean;
  selectedPerspective?: number | null;
  focusedSegment?: string | null;
  neutralOutside?: boolean | 'header';
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
