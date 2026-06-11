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

export interface Colors {
  userRingColors: {
    negative: string;
    neutral: string;
    positive: string;
  };
  userTextColors: {
    negative: string;
    neutral: string;
    positive: string;
    coordinates: string;
  };
  userHubColor: string;
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
  colors?: Colors;
  style?: React.CSSProperties;
  onTopSliceChange?: (topSlice: string) => void;
  onClickedCellChange?: (cell: CellInfo | null) => void;
  debug?: boolean;
}
