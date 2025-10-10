# Observable Notebook

This directory contains the internalized Observable notebook that was previously published as `@dialexity/dialectical-wheel` on npm.

## Files

- **`dialectical-wheel.js`** - Main notebook module (formerly `d86bdf9cb27f6bcf@1569.js`)
- **`a33468b95d0b15b0@817.js`** - Dependency notebook module
- **`runtime.js`** - Observable runtime (if needed)

## Migration

Previously, this notebook was imported as:
```javascript
import notebook from '@dialexity/dialectical-wheel';
```

Now it's imported locally:
```javascript
import notebook from '../../notebook/dialectical-wheel.js';
```

## Source

Original notebook: https://observablehq.com/@dialexity/dialectical-wheel

The notebook was version 1569 when internalized.

## Updating

To update the notebook:

1. Export the latest version from Observable
2. Replace the files in this directory
3. Test the React component to ensure compatibility

## Why Internalized?

The notebook is now part of the repository to:
- Reduce external dependencies
- Have full control over the notebook code
- Simplify the build process
- Enable easier customization and debugging

