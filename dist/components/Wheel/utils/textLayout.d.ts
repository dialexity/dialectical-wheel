export interface TextLayoutResult {
    lines: string[];
    fontSize: number;
    lineHeight: number;
    centerR: number;
}
export type RingNumber = 1 | 2 | 3;
export interface LayoutParams {
    innerR: number;
    outerR: number;
    placementOuterR?: number;
    widthArcR?: number;
    cellAngle: number;
    baseFontSize: number;
    padding: number;
    measure: (text: string, fontSize: number) => number;
    textBias: number;
    ring: RingNumber;
}
export declare function computeUniformFontSize(texts: string[], params: LayoutParams): number;
/** One body ring's inputs to the balanced-layout solver. */
export interface BalanceRingInput {
    texts: string[];
    ring: RingNumber;
    /** Optical/fit bias for this ring (from computeTextBias). */
    textBias: number;
}
export interface BalanceLayoutResult {
    /** Single font size shared by every balanced body-ring cell. */
    fontSize: number;
    /**
     * The internal radial boundaries between consecutive balanced rings, absolute
     * from the core (length = rings.length − 1). For the default 3-ring wheel this
     * is [innerEnd, middleEnd]; in header mode only positive+negative balance, so
     * it is [innerEnd].
     */
    bounds: number[];
}
/**
 * BALANCE sizing: find the largest single font that fits EVERY balanced ring,
 * then partition the fixed radial budget (core..outerEnd) so each ring gets the
 * band it needs at that font — the text-heavy ring grows, the short ones give
 * space back. A per-ring growth clamp (`maxGrowth` × the default band) keeps the
 * wheel from ballooning into a lopsided shape when one cell's text is far longer
 * than the rest; when the clamp binds, the largest common font can't grow
 * further so fonts come out near-equal rather than exactly equal. Each ring
 * keeps at least a one-line floor. Rings are ordered inner→outer.
 *
 * Works for any ring count: the default wheel balances 3 rings across the full
 * body budget; header mode balances only positive+negative (2 rings) across the
 * budget below the self-sizing merged neutral+cycle ring. `rings`,
 * `defaultBands`, and the returned `bounds` (internal boundaries, length =
 * rings.length − 1) all share that ordering and length.
 *
 * Returns null when no font ≥3px fits within the clamped budget — caller then
 * falls back to fixed radii + per-ring shrink.
 */
export declare function computeBalancedLayout(rings: BalanceRingInput[], core: number, outerEnd: number, defaultBands: number[], cellAngle: number, baseFontSize: number, padding: number, maxGrowth: number, measure: (text: string, fontSize: number) => number): BalanceLayoutResult | null;
export declare function layoutTextVariable(text: string, fontSize: number, params: LayoutParams, flipped: boolean): TextLayoutResult;
//# sourceMappingURL=textLayout.d.ts.map