import React from 'react';
import './DialecticalWheel-fonts.css';
export interface DialecticalWheelProps {
    dialecticalData: Record<string, any>;
    arrowConnections?: string;
    style?: React.CSSProperties;
    onChartReady?: (chart: any) => void;
    onTopSliceChange?: (topSlice: string) => void;
    onFocusedSliceChange?: (focusedSlice: string) => void;
    debug?: boolean;
}
export default function DialecticalWheel({ dialecticalData, arrowConnections, style, onChartReady, onTopSliceChange, onFocusedSliceChange, debug }: DialecticalWheelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DialecticalWheel.d.ts.map