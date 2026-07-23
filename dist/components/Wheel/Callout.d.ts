import React from 'react';
import type { CSSValue } from '../../types';
export interface CalloutProps {
    segment?: string;
    rightEdge?: string;
    border?: {
        width?: CSSValue;
        color?: string;
    };
    tail?: 'triangle' | 'line';
    header?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function Callout(_props: CalloutProps): React.ReactElement | null;
export declare namespace Callout {
    var _isWheelCallout: boolean;
}
interface CalloutInternalProps {
    midAngle: number;
    anchorR: number;
    anchorAngle: number;
    endR: number;
    rotationDeg: number;
    border: {
        width: number;
        color: string;
    };
    tail: 'triangle' | 'line';
    header?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function CalloutInternal({ midAngle, anchorR, anchorAngle, endR, rotationDeg, border, tail, header, children, }: CalloutInternalProps): React.JSX.Element;
export {};
//# sourceMappingURL=Callout.d.ts.map