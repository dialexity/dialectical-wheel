## Ring Order Refactor Plan

Goal: Centralize semantic↔physical ring ordering and radii mapping behind helpers so future arbitrary orders don’t require sweeping edits. Remove direct toggle-driven ternaries from rendering and axis code. The toggle concept is renamed to `neutralOutside` (formerly `isWhiteOutside`).

### New/Existing Helpers
- Add `getRingOrder()` near `getRingRadii` (zero-arg getter returning current order).
  - Returns:
    - `byPhysical`: `[semanticInner, semanticMiddle, semanticOuter]` (index → semantic)
    - `bySemantic`: `{ positive|negative|neutral: 'inner'|'middle'|'outer' }` (semantic → physical)
  - Default order captured from current neutralOutside setting at setup.
- Prefer `getRadiiForSemantic(semantic, radii, styles)` for geometry; it maps semantic → physical via `getRingOrder()` and eliminates boolean flags.

### File: `src/notebook/dialectical-wheel.js`

1) Axis Module: use centralized order
- Function: `_makeAxisModule(d3, getCurrentRingOrder)`
  - Replace color mapping ternaries with `getRingOrder`:
    - Before: `styles.colors.text.positive, (isWhiteOutside ? text.negative : text.neutral), (isWhiteOutside ? text.neutral : text.negative)`
    - After: `styles.colors.text.positive, styles.colors.text[order.byPhysical[1]], styles.colors.text[order.byPhysical[2]]`
  - Clip label lookup (around lines 1715–1721):
    - Map `ringIndex` → semantic:
      - `const semantic = ringIndex === 0 ? 'positive' : order.byPhysical[ringIndex];`
      - Use `pie(dataToUse[semantic])` to resolve label.
  - Clip-path arc generation (around lines 1728–1736):
    - Use the same mapping to select `pieData` per ring index.

2) Rings Update: derive middle/outer from order
- Function: `_makeRings(..., getRingOrder).updateAllRings`
  - Keep positive/inner as-is.
  - Replace negative/neutral swap logic with order-driven mapping:
    - `const middleSemantic = order.byPhysical[1]; const outerSemantic = order.byPhysical[2];`
    - Use semantic-driven color: negative→`negativeColor`, neutral→`neutralColor`.

3) Labels: remove `isWhiteOutside`-based radii
- Sections with local label layout/arc generator using ternaries (approx lines 86–108 and 127–149):
  - For `negative` and `neutral`, compute radii via `getRingRadii('negative'|'neutral', isWhiteOutside, radii, styles)` instead of ternaries.

4) Arrow Module: radii/data selection
- Function: `_makeArrowsModule`
  - Continue using `getRingRadii` for geometry; ensure any data keyed by ring type remains semantic (no order ternaries).

5) Remaining toggle-driven radii in arc/label updates
- Replace patterns like:
  - `innerRadius(isWhiteOutside ? innerInnerRadius : innerRadius)`
  - `outerRadius(isWhiteOutside ? middleRadius : outerRadius)`
- With:
  - `const rr = getRadiiForSemantic('negative'|'neutral', radii, styles); d3.arc().innerRadius(rr.inner).outerRadius(rr.outer)`

### Non-goals (kept as-is for now)
- Data semantics (`dataToUse.positive|negative|neutral`) remain unchanged.
- Visual styles not related to order remain unchanged.

### Acceptance
- Toggling the existing white-outside option must only change the centralized `getRingOrder` outcome; axis labels, clip-paths, rings, and labels update correctly with no per-callsite logic.
- Future arbitrary order (e.g., `['positive','neutral','negative']`) should require only changing `customOrder` at a single entry point.


