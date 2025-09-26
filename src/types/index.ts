import React from 'react';

// Core types for dialectical wheel components

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
  whitesOnly: boolean; //white ring only, hides red and green rings when true
  TsOnly: boolean; //Theses slices only, hides Antitheses slices when true (pending behavior on Ac/Re)
  AsOnly: boolean; //Antitheses slices only, hides Theses slices when true (pending behavior on Ac/Re)
  isWhiteOutside: boolean; //swap red and white rings, white ring on the outermost layer when true
  showFlow: boolean; //show arrows on the outermost edge of the wheel when true
  graphView: boolean; //show graph view (Cycle view) when true
}

export interface Colors {
  userRingColors: {
    outer: string;
    middle: string;
    inner: string;
  };
  userTextColors: {
    outer: string;
    middle: string;
    inner: string;
    coordinates: string;
  };
  userHubColor: string;
}
export interface DialecticalWheelProps {
  wisdomUnits: WisdomUnit[];
  componentOrder: string[];
  preferences?: Preferences;
  colors?: Colors;
  arrowConnections?: string;
  style?: React.CSSProperties;
  onChartReady?: (chart: any) => void;
  onTopSliceChange?: (topSlice: string) => void;
  onFocusedSliceChange?: (focusedSlice: string) => void;
  onClickedCellChange?: (clickedCellObject: any) => void;
  debug?: boolean;
}

