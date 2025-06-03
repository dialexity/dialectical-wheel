# Dialectical Wheel React Component

A fully interactive React component for creating dialectical wheels with thesis-antithesis pairs that can be positioned opposite each other.

## Features

- **Interactive Controls**: Drag to rotate, pinch/scroll to zoom
- **Dynamic Slice Interactions**: Click thesis-antithesis pairs to focus and see opposition clearly
- **Arbitrary Sequence Support**: Customize the order of slices while maintaining dialectical opposition
- **Responsive Design**: Works on desktop and mobile devices
- **Configurable**: Customize number of pairs, titles, and slice sequences

## Installation

```bash
npm install react
```

Copy the following files to your React project:
- `DialecticalWheel.jsx`
- `DialecticalWheel.css`

## Basic Usage

```jsx
import React from 'react';
import DialecticalWheel from './DialecticalWheel';

function App() {
  return (
    <DialecticalWheel 
      numPairs={4}
      title="My Wheel"
      centerLabel="Core"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numPairs` | number | 4 | Number of thesis-antithesis pairs |
| `sliceSequence` | array | null | Custom sequence for first N slices |
| `title` | string | "Win-Win" | Title displayed in header |
| `centerLabel` | string | "Core" | Label in center circle |

## Slice Sequence Configuration

The `sliceSequence` prop allows you to specify the order of the first N slices. The remaining N slices will automatically be positioned as opposites.

### Default Sequence
```jsx
// Creates: T1, T2, T3, T4, A1, A2, A3, A4
<DialecticalWheel numPairs={4} />
```

### Custom Thesis Order
```jsx
// Creates: T2, T1, T3, T4, A2, A1, A3, A4
const customSequence = [
  { pair: 1, type: 'thesis' },   // T2
  { pair: 0, type: 'thesis' },   // T1
  { pair: 2, type: 'thesis' },   // T3
  { pair: 3, type: 'thesis' }    // T4
];

<DialecticalWheel 
  numPairs={4}
  sliceSequence={customSequence}
/>
```

### Mixed Sequence
```jsx
// Creates: T1, A2, T3, A4, A1, T2, A3, T4
const mixedSequence = [
  { pair: 0, type: 'thesis' },     // T1
  { pair: 1, type: 'antithesis' }, // A2
  { pair: 2, type: 'thesis' },     // T3
  { pair: 3, type: 'antithesis' }  // A4
];

<DialecticalWheel 
  numPairs={4}
  sliceSequence={mixedSequence}
/>
```

## Slice Sequence Format

Each element in `sliceSequence` should be an object with:
- `pair`: number (0-based index of the thesis-antithesis pair)
- `type`: string ("thesis" or "antithesis")

## Interaction Guide

- **Drag**: Rotate the wheel
- **Pinch/Scroll**: Zoom in/out (mobile: pinch, desktop: scroll)
- **Click Slice**: Focus on a thesis-antithesis pair to see them prominently positioned opposite each other
- **Click Again**: Reset to equal slice view
- **Reset Button**: Always return to equal slice view

## Key Constraint

No matter what sequence you specify, **thesis and antithesis from the same pair are always positioned exactly opposite each other** (N slices apart) to maintain the dialectical opposition structure.

## Examples

See `App.jsx` for complete examples of different configurations.

## Browser Support

Works in all modern browsers that support:
- React 16.8+ (uses hooks)
- SVG
- CSS transforms
- Touch events (for mobile)

## License

MIT 