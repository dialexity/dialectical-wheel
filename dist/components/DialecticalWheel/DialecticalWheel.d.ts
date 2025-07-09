import React from 'react';
export interface DialecticalWheelProps {
    dialecticalData: any;
    arrowConnections?: string;
    style?: React.CSSProperties;
    onChartReady?: (chart: any) => void;
    onTopSliceChange?: (topSlice: any) => void;
    onFocusedSliceChange?: (focusedSlice: any) => void;
    debug?: boolean;
}
export default function DialecticalWheel({ dialecticalData, arrowConnections, style, onChartReady, onTopSliceChange, onFocusedSliceChange, debug }: DialecticalWheelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DialecticalWheel.d.ts.map