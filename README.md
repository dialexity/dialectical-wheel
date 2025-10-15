# Dialectical Wheel

A React component for creating interactive dialectical wheel visualizations. It wraps the Observable notebook and exposes a simple React API with TypeScript types.

Built on the [ObservableHQ Dialectical Wheel notebook](https://observablehq.com/@dialexity/dialectical-wheel).

## Installation

```bash
npm install dialectical-wheel
```



## Quick Start

```jsx
import React from 'react';
import DialecticalWheel from 'dialectical-wheel';

const sampleWisdomUnits = [
  {
    t_minus: { alias: 'T-', statement: 'Risk group lives', explanation: '' },
    t:       { alias: 'T',  statement: 'Pursue minister elimination', explanation: '' },
    t_plus:  { alias: 'T+', statement: 'Achieve strategic goals', explanation: '' },
    a_plus:  { alias: 'A+', statement: 'Ensure survival peacefully', explanation: '' },
    a:       { alias: 'A',  statement: 'Accept ransom offer', explanation: '' },
    a_minus: { alias: 'A-', statement: 'Compromise core ideals', explanation: '' }
  }
];

export default function App() {
  return (
    <DialecticalWheel
      wisdomUnits={sampleWisdomUnits}
      componentOrder={[]}
      preferences={{ whitesOnly: false, TsOnly: false, isWhiteOutside: false, showFlow: true, graphView: false }}
      colors={{
        userRingColors: { negative: '#F9C6CC', neutral: '#ffffff', positive: '#C6E5B3' },
        userTextColors: { negative: '#8b1538', neutral: '#333', positive: '#2d5a2d', coordinates: '#333' },
        userHubColor: '#ffff7a'
      }}
      arrowConnections={''}
      debug
      onChartReady={(chart) => console.log('Chart ready:', chart)}
      onTopSliceChange={(slice) => console.log('Top slice changed:', slice)}
      onFocusedSliceChange={(slice) => console.log('Focused slice changed:', slice)}
      onClickedCellChange={(cell) => console.log('Clicked cell changed:', cell)}
    />
  );
}
```

## Component

### `DialecticalWheel`

The interactive wheel component that renders wisdom units and optional flow/graph.

**Props**
- `wisdomUnits` (array, required): Array of wisdom unit objects (see Data Format).
- `componentOrder` (array): Order of components in the wheel.
- `preferences` (object): Display preferences.
  - `whitesOnly` (boolean)
  - `TsOnly` (boolean)
  - `isWhiteOutside` (boolean)
  - `showFlow` (boolean)
  - `graphView` (boolean)
- `colors` (object): Custom colors.
  - `userRingColors` { `negative`, `neutral`, `positive` }
  - `userTextColors` { `negative`, `neutral`, `positive`, `coordinates` }
  - `userHubColor` (string)
- `arrowConnections` (string): Newline-delimited connections, e.g. `"T1 -> A1\nT2 -> A2"`.
- `style` (object): Inline styles for the container.
- `debug` (boolean): Show debug info under the chart.
- `onChartReady(chart)` (function)
- `onTopSliceChange(slice)` (function)
- `onFocusedSliceChange(slice)` (function)
- `onClickedCellChange(cell)` (function)

### Preferences

Use `preferences` to control what is rendered and how the wheel is displayed:

- `whitesOnly` (default: `false`): Hides red and green rings, showing only the white ring cells.
- `TsOnly` (default: `false`): Shows only Thesis slices (T, T-, T+). Antithesis slices (A, A-, A+) are hidden.
- `AsOnly` (default: `false`): Shows only Antithesis slices (A, A-, A+). Thesis slices (T, T-, T+) are hidden.
- `isWhiteOutside` (default: `false`): Swaps white and red rings, placing the white ring on the outermost layer.
- `showFlow` (default: `true`): Displays arrow flow on the outer edge to indicate sequence or linkage.
- `graphView` (default: `false`): Renders the graph (Cycle view) instead of the radial wheel. When `true`, the SVG wheel is hidden.

Example:

```jsx
preferences={{ whitesOnly: false, TsOnly: false, isWhiteOutside: false, showFlow: true, graphView: false }}
```

Notes on interactions:

- Set at most one of `TsOnly` or `AsOnly` to `true`. They are mutually exclusive filters.
- When `graphView: true`:
  - The radial wheel SVG is hidden; the graph is shown.
  - `TsOnly` and `AsOnly` still act as filters for which nodes/edges are included in the graph.
  - `showFlow` has no visible effect in graph view (it only applies to the wheel’s outer-edge arrows).

### Colors

Customize ring fills and text colors. All values are CSS color strings.

- `userRingColors`
  - `negative`: Fill color for the negative ring (red)
  - `neutral`: Fill color for the neutral ring (white)
  - `positive`: Fill color for the positive ring (green)
- `userTextColors`
  - `negative`: Text color used on negative ring
  - `neutral`: Text color used on neutral ring
  - `positive`: Text color used on positive ring
  - `coordinates`: Text color for coordinate labels
- `userHubColor`: Fill color for the hub (center) region

Defaults mirror the Storybook example:

```js
colors={{
  userRingColors: { outer: '#F9C6CC', middle: '#ffffff', inner: '#C6E5B3' },
  userTextColors: { outer: '#8b1538', middle: '#333', inner: '#2d5a2d', coordinates: '#333' },
  userHubColor: '#ffff7a'
}}
```

## Data Format

### Wisdom Unit

Each element of `wisdomUnits` includes six fields (thesis/antithesis and +/- variants):

```javascript
const wisdomUnit = {
  t_minus: { alias: 'T-', statement: '...', explanation: '...' },
  t:       { alias: 'T',  statement: '...', explanation: '...' },
  t_plus:  { alias: 'T+', statement: '...', explanation: '...' },
  a_plus:  { alias: 'A+', statement: '...', explanation: '...' },
  a:       { alias: 'A',  statement: '...', explanation: '...' },
  a_minus: { alias: 'A-', statement: '...', explanation: '...' }
};
```

### Arrow Connections

Provide connections as newline-separated pairs:

```javascript
const arrowConnections = `
T1 -> A1
T2 -> A2
`;
```

## Styling

Default fonts are included via `DialecticalWheel-fonts.css` inside the component. You can still override text styles in your app if needed:

```css
.dialectical-wheel-wrapper svg text { font-family: Inter, system-ui, sans-serif; }
```

## Development

```bash
# Clone the repository
git clone https://github.com/dialexity/dialectical-wheel.git
cd dialectical-wheel

# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Storybook (local docs)
npm run storybook
```

### Notebook Development

The core visualization logic comes from an Observable notebook. To modify it:

1. **Edit the source notebook**: Make your changes to `notebook-src/dialectical-wheel-4.html`

This file can also be opened and edited in [Observable Desktop](https://observablehq.com/notebook-kit/desktop).

2. **Convert to JavaScript**: Run the conversion script to extract and compile the Observable code:
   ```bash
   node notebook-src/html2notebook.mjs notebook-src/dialectical-wheel-4.html --out src/notebook/dialectical-wheel.js
   ```

3. **Rebuild the package**: After converting, rebuild the dist files:
   ```bash
   npm run build
   ```

4. **Test your changes**: Run Storybook to see your changes in action:
   ```bash
   npm run storybook
   ```

The `html2notebook.mjs` script extracts Observable JavaScript and markdown cells from the HTML file and compiles them using the `@hpcc-js/observablehq-compiler`.

## TypeScript

Type definitions are included. You can import helper types from `dialectical-wheel` if needed.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and feature requests, please use the GitHub issue tracker.