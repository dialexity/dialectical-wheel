# Dialectical Wheel

A React component library for creating interactive dialectical wheel visualizations. Explore thesis-antithesis relationships through an intuitive, interactive wheel interface built with TypeScript and D3.js.

## Features

- 🎯 **Interactive Dialectical Wheels** - Visualize thesis-antithesis relationships
- 🎨 **Customizable Styling** - Separate layout and font CSS for easy customization
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 🚀 **Zero Build Step** - Direct source imports for instant development
- 🎭 **Observable Integration** - Built on Observable notebooks for powerful data visualization

## Installation

```bash
npm install dialectical-wheel
```

**Note:** This library uses source files directly, so no build step is required for development.

## Quick Start

```jsx
import React from 'react';
import { DialecticalWheel } from 'dialectical-wheel';

function App() {
  const dialecticalData = {
    "T1": {
      "statement": "Invest in renewable energy",
      "positive": "Reduces carbon emissions",
      "negative": "High initial costs"
    },
    "A1": {
      "statement": "Focus on fossil fuels",
      "positive": "Lower immediate costs",
      "negative": "Environmental damage"
    },
    "T2": {
      "statement": "Government regulation",
      "positive": "Ensures compliance",
      "negative": "Reduces innovation"
    },
    "A2": {
      "statement": "Free market approach",
      "positive": "Encourages innovation",
      "negative": "May ignore externalities"
    }
  };

  return (
    <DialecticalWheel 
      dialecticalData={dialecticalData}
      arrowConnections="T1 -> A1\nT2 -> A2"
      style={{ width: '600px', height: '400px' }}
      debug={true}
    />
  );
}
```

## Core Components

### DialecticalWheel

The main interactive wheel component that renders dialectical relationships.

**Props:**
- `dialecticalData` (object): Required. Object containing thesis/antithesis statements with positive/negative points
- `arrowConnections` (string): Optional. Connection notation for linking statements (e.g., "T1 -> A1\nT2 -> A2")
- `style` (object): Optional. CSS styles for the container
- `onChartReady` (function): Optional. Callback when chart is initialized
- `onTopSliceChange` (function): Optional. Callback when top slice changes
- `onFocusedSliceChange` (function): Optional. Callback when focused slice changes
- `debug` (boolean): Optional. Show debug information

**Example:**
```jsx
<DialecticalWheel 
  dialecticalData={{
    "T1": {
      "statement": "Centralized control",
      "positive": "Clear direction",
      "negative": "Bureaucratic overhead"
    },
    "A1": {
      "statement": "Distributed autonomy",
      "positive": "Flexibility",
      "negative": "Coordination challenges"
    },
    "T2": {
      "statement": "Structured planning",
      "positive": "Predictable outcomes",
      "negative": "Rigid approach"
    },
    "A2": {
      "statement": "Emergent strategy",
      "positive": "Adaptive",
      "negative": "Unpredictable"
    }
  }}
  arrowConnections="T1 -> A1\nT2 -> A2"
  onChartReady={(chart) => console.log('Chart ready:', chart)}
  debug={true}
/>
```


## Styling

The components come with default CSS styling that is automatically imported. The styling is split into two files:

- **Layout styles**: `DialecticalWheel.css` - Responsive layout and component styling
- **Font styles**: `DialecticalWheel-fonts.css` - Font family imports and text styling

### Customizing Fonts

To use different fonts, you can override the font CSS:

```css
/* Override the default Ubuntu Mono font */
.dialectical-wheel-container {
  font-family: 'Inter', sans-serif;
}

.dialectical-wheel-container svg text {
  font-family: 'Inter', sans-serif;
}
```

### Custom Styling

```jsx
import { DialecticalWheel } from 'dialectical-wheel';
import './my-custom-styles.css'; // Your overrides
```

## Data Format

### Dialectical Data Structure

```javascript
const dialecticalData = {
  "T1": {
    "statement": "Central thesis statement",
    "positive": "Positive aspect",
    "negative": "Negative aspect"
  },
  "A1": {
    "statement": "Opposing statement",
    "positive": "Positive aspect",
    "negative": "Negative aspect"
  },
  "T2": {
    "statement": "Another thesis",
    "positive": "Positive aspect",
    "negative": "Negative aspect"
  },
  "A2": {
    "statement": "Another antithesis",
    "positive": "Positive aspect",
    "negative": "Negative aspect"
  }
  // ... more statements
};
```

### Arrow Connections

Use connection notation to link statements:

```javascript
// Connect T1 to A1, and T2 to A2
const arrowConnections = "T1 -> A1\nT2 -> A2";

// Multiple connections
const arrowConnections = "T1 -> A1\nT2 -> A2\nA1 -> T2"; // Complex flow
```

## Development

This library uses source files directly, making development much simpler:

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

# Testing
npm test
```

No build step is required - changes are reflected immediately when importing the source files.

## TypeScript Support

TypeScript definitions are included in the package. The library is written in TypeScript and exports source files directly, providing full type safety and IntelliSense support.

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

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