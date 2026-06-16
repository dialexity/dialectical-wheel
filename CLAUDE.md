# Dialectical Wheel

## Build & Dev
- `npx rollup -c` — build library (src → dist)
- `npm run storybook` — dev server with hot reload (Storybook v9, no --open flag)
- Zero runtime dependencies; React is peer dep only

## Architecture
- Pure React+SVG component, no D3/Observable
- Text rendering uses `<foreignObject>` with native browser word-wrap, NOT SVG <text>+tspan
- Clip paths on each arc cell prevent text bleeding — IDs must be deterministic (no useId() colons)
- `computeUniformFontSize` in Ring.tsx ensures all cells in a ring share one font size
- Canvas measureText (with 1.05x factor) used only for font size search, not rendering
- Bubbling event model: Cell → Segment → Perspective (like td → tr → table)
- Segment/Perspective over/out only fire when identity changes (ref-tracked), not on every cell boundary
- Header ring: `headerRing` prop toggles 'wheel' (all segments), 'cycle' (thesis-only), 'none'
- WheelRing = all segment labels (T1,A1..); CycleRing = thesis-only labels (T1,T2..)
- Hover highlights full perspective (both thesis+antithesis segments) across all rings
- SVG z-order: hovered cells render last (separate pass) so borders paint on top of neighbors
- SynthesisRing has no events
- SVG has `userSelect: none` + grab/grabbing cursor for drag UX

## Key Gotchas
- SVG clip path IDs with colons (React useId) silently fail in some renderers
- Inner ring chords are very narrow — use textBias to shift text outward
- The cell shape is a trapezoid (wider at outer radius); midR chord is the safe wrap width
- When tryFit rejects, layoutTextFixed must NOT shrink individually or ring uniformity breaks
- Filtering segments by alias prefix (startsWith('A')) is fragile if aliases are overridden
- `hoveredPerspectiveIdx` uses `!= null` not `&&` because index 0 is falsy

## Types
- Props: `styles` (Partial<Styles>), `css` (React.CSSProperties) — not "colors"/"style"
- `HeaderRing = 'wheel' | 'cycle' | 'none'` — controls outermost ring visibility
- `CellStyle.hoverBorderColor` — cascades through style system like other properties
- Event types: `CellEvent`, `SegmentEvent`, `PerspectiveEvent` — narrowing as they bubble up
- `ClickedCell` is deprecated alias for `CellEvent`
- `SegmentData` carries `perspectiveIndex` for event derivation
