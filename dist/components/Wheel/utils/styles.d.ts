import type { CellStyle, Styles, ResolvedCellStyle } from '../../../types';
type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';
export declare function resolveStyle(styles: Styles, ring: RingName | 'cycle', cellRadialHeight: number, cellOverride?: Partial<CellStyle>, segmentOverride?: Partial<CellStyle>): ResolvedCellStyle;
export declare const DEFAULT_STYLES: Styles;
export {};
//# sourceMappingURL=styles.d.ts.map