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
        userRingColors: { outer: '#F9C6CC', middle: '#ffffff', inner: '#C6E5B3' },
        userTextColors: { outer: '#8b1538', middle: '#333', inner: '#2d5a2d', coordinates: '#333' },
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
  - `userRingColors` { `outer`, `middle`, `inner` }
  - `userTextColors` { `outer`, `middle`, `inner`, `coordinates` }
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
- `isWhiteOutside` (default: `false`): Swaps white and red rings, placing the white ring on the outermost layer.
- `showFlow` (default: `true`): Displays arrow flow on the outer edge to indicate sequence or linkage.
- `graphView` (default: `false`): Renders the graph (Cycle view) instead of the radial wheel. When `true`, the SVG wheel is hidden.

Example:

```jsx
preferences={{ whitesOnly: false, TsOnly: false, isWhiteOutside: false, showFlow: true, graphView: false }}
```

### Colors

Customize ring fills and text colors. All values are CSS color strings.

- `userRingColors`
  - `outer`: Fill color for the outer ring
  - `middle`: Fill color for the middle ring
  - `inner`: Fill color for the inner ring
- `userTextColors`
  - `outer`: Text color used on outer ring
  - `middle`: Text color used on middle ring
  - `inner`: Text color used on inner ring
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