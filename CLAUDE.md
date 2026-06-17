# Dialectical Wheel

## Build & Dev
- `npx rollup -c` — build library (src → dist)
- Storybook is already running (user manages it manually) — do NOT launch it
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
- `neutralOutside` accepts `false | true | 'header'` — 'header' merges neutral ring with cycle ring into one taller cell (outerR extends to cycleEnd), no borders by default (only on hover), labels overlay transparently controlled by `headerRing`
- Hover highlights full perspective (both thesis+antithesis segments) across all rings
- SVG z-order: hovered cells render last (separate pass) so borders paint on top of neighbors
- SynthesisRing has no events
- SVG has `userSelect: none` + grab/grabbing cursor for drag UX
- `useRotation` hook: drag (internal) + `focusedSegment` prop (external) both control rotation
- `selectedPerspective` implies focus (rotates thesis to top) — explicit `focusedSegment` takes priority if both set
- `interactive` prop: self-contained click-to-select/focus app; props sync into internal state (commands), clicks always toggle; without it, fully controlled (no internal state)
- Segment order in segmentIds: [...theses, ...antitheses] — first half is thesis, second half antithesis
- Thesis focuses to 12 o'clock (0°), antithesis to 6 o'clock (180°) — same perspective always vertical
- If segment already overlaps top/bottom (any edge in zone), it snaps there regardless of T/A — prevents going the wrong way after manual drag
- Equidistant tie-break: T prefers top (−180°), A prefers bottom (+180°)
- Focus animation is phased: fade-out others (200ms) → rotate (300ms) → fade-in (200ms)
- Hover is suppressed during rotation — `hoverSuppressedRef` clears only on real `pointerMove`, not on cells sliding under the cursor
- `isRotationPaused` suppresses CSS transition on `<g>` during fade-out so rotation doesn't animate early
- `focusAnimatingIdx` drives opacity on non-focused perspective cells across all rings
- Wheel uses `forwardRef<SVGSVGElement>` — internal svgRef merged with forwarded ref via callback ref
- `src/export.ts` provides `exportWheelSVG`, `exportWheelPNG`, `downloadBlob` — tree-shakeable utils, not methods on the component

## Key Gotchas
- SVG clip path IDs with colons (React useId) silently fail in some renderers
- Inner ring chords are very narrow — use textBias to shift text outward
- The cell shape is a trapezoid (wider at outer radius); midR chord is the safe wrap width
- When tryFit rejects, layoutTextFixed must NOT shrink individually or ring uniformity breaks
- Filtering segments by alias prefix (startsWith('A')) is fragile if aliases are overridden
- `hoveredPerspectiveIdx` uses `!= null` not `&&` because index 0 is falsy
- `setRotationDeg` must use functional updater (`current => ...`) since effects don't re-run on rotation changes
- `rotationDegRef` mirrors `rotationDeg` state so the focus effect can read current rotation without depending on it
- `onPointerDown` captures `rotationDeg` in its deps — this is correct; it needs the latest value for drag start
- Rotation causes cells to slide under a stationary cursor — suppress hover until real `pointerMove` fires, otherwise selection dimming breaks
- package.json `exports.source` condition lets Vite/Storybook resolve TypeScript source directly for HMR

## Types
- Props: `styles` (Partial<Styles>), `css` (React.CSSProperties) — not "colors"/"style"
- `HeaderRing = 'wheel' | 'cycle' | 'none'` — controls outermost ring visibility
- `CellStyle.hoverBorderColor` — cascades through style system like other properties
- Event types: `CellEvent`, `SegmentEvent`, `PerspectiveEvent` — narrowing as they bubble up
- `ClickedCell` is deprecated alias for `CellEvent`
- `SegmentData` carries `perspectiveIndex` for event derivation
- `Styles.dimUnfocused` (0–1, default 0.5) — how much to dim unselected perspectives when one is selected; hovered perspectives undim
- Ring's `headerBehavior` prop makes borders transparent by default (only visible on hover) — used by `neutralOutside='header'`
