# Dialectical Wheel

A React component library for creating interactive dialectical wheel visualizations. Explore thesis-antithesis relationships through an intuitive, interactive wheel interface.

## Installation

```bash
npm install dialectical-wheel
```

## Quick Start

```jsx
import React from 'react';
import { DialecticalWheel } from 'dialectical-wheel';

function App() {
  return (
    <DialecticalWheel 
      numPairs={4}
      title="Win-Win"
      centerLabel="Core"
    />
  );
}
```

## Components

### DialecticalWheel

The main interactive wheel component.

**Props:**
- `numPairs` (number): Number of thesis/antithesis pairs (default: 4)
- `title` (string): Wheel title (default: "Win-Win")
- `centerLabel` (string): Center circle label (default: "Core")
- `sliceSequence` (array): Custom slice sequence for first half
- `pairTexts` (object): Custom pair text data
- `detailedSlices` (object): SVG content for detailed slices

**Example:**
```jsx
import { DialecticalWheel } from 'dialectical-wheel';

<DialecticalWheel 
  numPairs={3}
  title="Decision Analysis"
  centerLabel="Choice"
  sliceSequence={[
    { pair: 0, type: 'thesis' },
    { pair: 1, type: 'antithesis' },
    { pair: 2, type: 'thesis' }
  ]}
/>
```

### ExploreComponent

Component for exploring wisdom unit data with card-based UI.

**Props:**
- `userMessage` (string): Original user message
- `wisdomUnits` (array): Array of wisdom unit objects
- `currentApiCycle` (object): Current API cycle data
- `onEdit` (function): Edit callback function

## Hooks

### useDialecticalWheelWithCycles

React hook for complete API workflow with cycles support.

```jsx
import { useDialecticalWheelWithCycles } from 'dialectical-wheel';

function MyComponent() {
  const {
    sessionId,
    wheels,
    wisdomUnits,
    cycles,
    loading,
    error,
    createNew,
    clearSession
  } = useDialecticalWheelWithCycles(
    "Should we invest in renewable energy?",
    3, // numberOfThoughts
    7  // componentLength
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DialecticalWheel 
      numPairs={wisdomUnits.length}
      pairTexts={pairTexts}
    />
  );
}
```

### useDialecticalWheel

Basic wheel management hook without cycles.

### useManualWheel

Hook for manual wheel creation with custom data.

## Services

### WisdomService

Static class with API methods for session management and wheel creation.

```jsx
import { WisdomService } from 'dialectical-wheel';

// Create session
const session = await WisdomService.createSession("Your question");

// Auto-build wheel
const wheel = await WisdomService.autoBuildWheel(
  session.session_id, 
  3, // numberOfThoughts
  7  // componentLength
);

// Get wisdom units
const wisdomUnits = WisdomService.transformApiWisdomUnits(
  wheel.wheels[0].wisdom_units
);
```

## Utilities

### Wisdom Unit Creation

```jsx
import { createWisdomUnit, createComponent } from 'dialectical-wheel';

const wisdomUnit = createWisdomUnit(
  {
    tPlus: createComponent("Positive thesis"),
    t: createComponent("Central thesis"),
    tMinus: createComponent("Negative thesis")
  },
  {
    aPlus: createComponent("Positive antithesis"),
    a: createComponent("Central antithesis"),
    aMinus: createComponent("Negative antithesis")
  }
);
```

### Slice Generation

```jsx
import { createSliceAtAngle, generatePairTextsFromWisdomUnits } from 'dialectical-wheel';

// Generate SVG slice
const slice = createSliceAtAngle(sliceData, 'slice-0', 45);

// Convert wisdom units to pair texts
const pairTexts = generatePairTextsFromWisdomUnits(wisdomUnits);
```

## Styling

The components come with default CSS styling. You can override styles by importing your own CSS after the component styles:

```jsx
import 'dialectical-wheel/dist/index.css'; // Component styles
import './my-custom-styles.css'; // Your overrides
```

## API Integration

The library includes built-in API integration for dialectical analysis services:

```jsx
// Complete workflow
const result = await WisdomService.createSessionAndAutoBuildWheelWithCycles(
  "Your dialectical question",
  3, // number of thoughts
  7  // component length
);
```

## TypeScript Support

TypeScript definitions are included in the package.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/dialexity/dialectical-wheel/issues). 