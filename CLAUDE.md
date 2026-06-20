# Dialectical Wheel

## Build & Dev
- `npx rollup -c` — build library (src → dist)
- `npx tsc --noEmit` — type check without emitting (faster than full build for iteration)
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
- Header ring: `header` prop toggles 'wheel' (all segments), 'cycle' (thesis-only), 'none'
- WheelRing = all segment labels (T1,A1..); CycleRing = thesis-only labels (T1,T2..)
- `neutralOutside` accepts `false | true | 'header'` — 'header' merges neutral ring with cycle ring into one taller cell (outerR extends to cycleEnd), no borders by default (only on hover), labels overlay transparently controlled by `header`
- Hover highlights full perspective (both thesis+antithesis segments) across all rings
- SVG z-order: hovered cells render last (separate pass) so borders paint on top of neighbors
- SynthesisRing has no events
- SVG has `userSelect: none` + grab/grabbing cursor for drag UX
- `useRotation` hook: drag (internal) + `focusedSegment` prop (external) both control rotation
- `selectedPerspective` implies focus (rotates thesis to top) — explicit `focusedSegment` takes priority if both set
- `interactive` prop: self-contained click-to-select/focus app; props sync into internal state (commands); without it, fully controlled (no internal state)
- Interactive click cycle: (1) click unselected → select+focus with fade, (2) click selected but displaced → refocus without fade (rotation only), (3) click selected+focused → deselect
- `refocusWithoutFade` in useRotation — rotates to target without phased animation; must manually suppress hover before calling
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
- Styling follows CSS table model: thead (header), tbody (body rings), tfoot (synthesis) × thesis/antithesis columns
- `resolveStyle` in utils/styles.ts is the single resolution point — all rings/components call it with a `StyleContext`
- Ring.tsx takes `rowGroup` prop to tell resolveStyle which section it belongs to
- SynthesisRing renders per-segment wedges when tfoot styles differ per perspective, otherwise a single circle
- Direction arrows render inside each header ring cell's `<g>` — inherit dimming, elevation, opacity transitions
- Arrow geometry: short curved arc following ring radius + chevron tip computed from tangent vector at tip point
- CycleRing has a connecting dotted arc through the empty (antithesis) gap at 50% opacity, with arrowhead
- Arrow visibility: `arrow.color !== 'transparent'` — no separate opacity flag; cascading color controls show/hide
- `InwardSpiralArrows`: quadratic bezier arrows from neg ring into pos ring; skipped for 1 perspective; hidden when `interactive` + selected
- `showInwardSpiral` prop enables inward spiral arrows connecting negative cells to next positive cells (clockwise or per direction)
- Spiral arrows use open chevron arrowhead (same shape as causality arrows) — not filled triangles
- Spiral arrow geometry: start at leading edge of neg cell (30% inward from inner edge), end just inside pos cell outer corner (15% inward), control point at ring boundary midpoint
- `neutralOutside` affects spiral radii: when true, neg ring = middleStart..middleEnd; boundary shared with pos ring at innerEnd

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
- Rotation causes cells to slide under a stationary cursor — suppress hover until real `pointerMove` fires, otherwise selection dimming breaks. The `focusAnimatingIdx` effect handles this for phased animation; imperative rotation (e.g. `refocusWithoutFade`) must suppress manually.
- package.json `exports.source` condition lets Vite/Storybook resolve TypeScript source directly for HMR
- `styles.tbody.synthesis` is deprecated but still works as fallback in resolveStyle when `tfoot` is undefined — don't remove without migration
- `RowScope` uses TypeScript intersection with `{ [n: number]: ... }` — numeric keys alongside named props; pure interfaces can't express this
- Arrow tangent at angle θ: tangentX = cos(θ), tangentY = sin(θ) (because polarToCartesian uses sin/−cos mapping); radialX = sin(θ), radialY = −cos(θ)
- Angular midpoint for spiral arrows must account for CW/CCW wrapping: use `(angle + 2π) % 2π` to get positive delta in travel direction

## Types
- Props: `styles` (Partial<Styles>), `css` (React.CSSProperties) — not "colors"/"style"
- `HeaderRing = 'wheel' | 'cycle' | 'none'` — type for the `header` prop (previously named `headerRing`)
- `WheelDirection = 'left' | 'right'` — type for the `direction` prop (default 'right'); models reading direction ('right' = clockwise, 'left' = counterclockwise); does not affect data order
- `showArrows` prop (default `true`) — prop-level kill switch for all arrows; independent of style system (colors stay intact for when re-enabled)
- `Styles.spiralArrow: { color?, width? }` — global-only (no cascade); color defaults to `#333`, width defaults to 3% of neg cell height
- `CellStyle.arrow: { color, width }` — cascades through style system; color defaults to table-level border color (visible by default), width is CSSValue (px or %) defaulting to `cellRadialHeight * 0.03`; set color to `'transparent'` to hide arrows
- `CellStyle.hoverArrowColor` — arrow color on hover, defaults to hoverBorderColor
- `CellStyle.hoverBorderColor` — cascades through style system like other properties
- Event types: `CellEvent`, `SegmentEvent`, `PerspectiveEvent` — narrowing as they bubble up
- `ClickedCell` is deprecated alias for `CellEvent`
- `SegmentData` carries `perspectiveIndex` and `colType` ('thesis'|'antithesis') for style resolution
- `Styles.dimUnfocused` (0–1, default 0.5) — how much to dim unselected perspectives when one is selected; hovered perspectives undim
- Ring's `headerBehavior` prop makes borders transparent by default (only visible on hover) — used by `neutralOutside='header'`
- `RowScope` = intersection type allowing `Partial<CellStyle>` + `thesis`/`antithesis` + numeric index for nth-perspective
- `StyleContext` = { rowGroup, ring, colType, perspectiveIndex } passed to resolveStyle
- `resolveStyle` builds 7-layer cascade: table → row-group → row → row+colType → row+nth → row+colType+nth → inline
- `styles.tfoot` replaces deprecated `styles.tbody.synthesis` (backward compat fallback exists)
- `styles.thead.neutral` activates only when `neutralOutside='header'`
