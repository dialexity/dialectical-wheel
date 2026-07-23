# Dialectical Wheel

A zero-dependency React + SVG component for rendering interactive dialectical
wheels — theses, antitheses, and their positive/neutral/negative poles arranged
in concentric rings.

Part of [Dialexity](https://dialexity.com). The underlying model and reasoning
engine live in the
[dialectical-framework](https://github.com/dialexity/dialectical-framework) repo.

## Installation

```bash
npm install dialectical-wheel
```

React 16.8+ is a peer dependency.

## Quick Start

```jsx
import { Wheel } from 'dialectical-wheel';

const perspectives = [
  {
    t_minus: { alias: 'T-', statement: 'Risk group lives' },
    t:       { alias: 'T',  statement: 'Pursue minister elimination' },
    t_plus:  { alias: 'T+', statement: 'Achieve strategic goals' },
    a_plus:  { alias: 'A+', statement: 'Ensure survival peacefully' },
    a:       { alias: 'A',  statement: 'Accept ransom offer' },
    a_minus: { alias: 'A-', statement: 'Compromise core ideals' },
  },
];

export default function App() {
  return <Wheel perspectives={perspectives} interactive />;
}
```

Also exported: `Callout` (attach labels to segments), and the tree-shakeable
`exportWheelSVG` / `exportWheelPNG` / `downloadBlob` helpers. TypeScript types
are bundled.

## Development

```bash
git clone https://github.com/dialexity/dialectical-wheel.git
cd dialectical-wheel
npm install

npm run type-check   # tsc --noEmit
npm run lint         # eslint
npm run build        # rollup: src → dist
npm run storybook    # interactive docs / examples
```

Storybook is the living documentation — every prop and mode has a story.

## Links

- [Dialexity](https://dialexity.com)
- [dialectical-framework](https://github.com/dialexity/dialectical-framework) — the model and reasoning engine

## License

MIT
