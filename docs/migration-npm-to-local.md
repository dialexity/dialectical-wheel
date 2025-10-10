# Migration: npm Package to Local Notebook

This document describes the migration from using `@dialexity/dialectical-wheel` as an npm package to using it as a local notebook file.

## What Changed

### Before (npm package)

```json
// package.json
{
  "dependencies": {
    "@dialexity/dialectical-wheel": "https://api.observablehq.com/@dialexity/dialectical-wheel@1569.tgz?v=3"
  }
}
```

```typescript
// DialecticalWheel.tsx
import notebook from '@dialexity/dialectical-wheel';
```

### After (local file)

```json
// package.json
{
  "dependencies": {
    // @dialexity/dialectical-wheel removed
  }
}
```

```typescript
// DialecticalWheel.tsx
import notebook from '../../notebook/dialectical-wheel.js';
```

## Files Added

```
src/notebook/
├── README.md                      # Documentation for the notebook
├── dialectical-wheel.js           # Main notebook (v1569)
├── a33468b95d0b15b0@817.js       # Dependency notebook
└── runtime.js                     # Observable runtime (if needed)
```

## Migration Steps

1. ✅ **Copied notebook files** from `node_modules/@dialexity/dialectical-wheel/` to `src/notebook/`
2. ✅ **Updated import** in `src/components/DialecticalWheel/DialecticalWheel.tsx`
3. ✅ **Removed dependency** from `package.json`
4. ✅ **Verified rollup config** handles `.js` imports correctly
5. ⏳ **Test** the build and runtime behavior

## Benefits

### 1. **Full Control**
- Can modify the notebook code directly
- No need to republish to npm for changes
- Easier debugging with local source

### 2. **Simplified Dependencies**
- One less external dependency
- No version conflicts
- Faster npm install

### 3. **Better Integration**
- Notebook is part of the repo
- Version controlled with the rest of the code
- Easier to review changes

### 4. **Customization**
- Can add custom features to the notebook
- Can optimize for specific use cases
- Can remove unused code

## Testing Checklist

After migration, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run build` succeeds
- [ ] `npm run dev` works in development mode
- [ ] Storybook renders the component correctly
- [ ] All notebook features work (arrows, interactions, etc.)
- [ ] No console errors in browser
- [ ] TypeScript compilation passes

## Rollback Plan

If issues arise, you can rollback by:

1. Restore the dependency in `package.json`:
   ```json
   "@dialexity/dialectical-wheel": "https://api.observablehq.com/@dialexity/dialectical-wheel@1569.tgz?v=3"
   ```

2. Revert the import in `DialecticalWheel.tsx`:
   ```typescript
   import notebook from '@dialexity/dialectical-wheel';
   ```

3. Run `npm install`

## Updating the Notebook

To update to a newer version of the Observable notebook:

### Option 1: Manual Export (Recommended)

1. Go to https://observablehq.com/@dialexity/dialectical-wheel
2. Click "..." menu → "Download code"
3. Extract the downloaded files
4. Replace files in `src/notebook/` with the new versions
5. Test thoroughly

### Option 2: Using Observable CLI

```bash
# Install Observable CLI
npm install -g @observablehq/cli

# Export the notebook
observable export @dialexity/dialectical-wheel

# Copy the generated files to src/notebook/
```

## Known Issues

### Import Paths

The notebook files may use relative imports like:
```javascript
import define1 from "./a33468b95d0b15b0@817.js";
```

These paths are preserved and should work correctly since all files are in the same directory.

### Runtime Dependencies

The notebook requires `@observablehq/runtime` which remains as a dependency. This is correct - we're only internalizing the notebook code, not the entire Observable ecosystem.

### TypeScript Warnings

The `// @ts-ignore` comment is still needed because the `.js` file doesn't have TypeScript definitions. This is expected and safe.

## Future Improvements

Consider these enhancements:

1. **Add TypeScript definitions** for the notebook exports
2. **Split the notebook** into smaller, more maintainable modules
3. **Remove unused code** from the notebook
4. **Add tests** specifically for notebook functionality
5. **Document the notebook API** in detail

## Questions?

If you encounter issues or have questions about this migration, check:

- `src/notebook/README.md` for notebook-specific documentation
- `docs/arrow-parameters.md` for arrow drawing parameters
- Observable documentation at https://observablehq.com/documentation

## Version History

- **2025-01-10**: Initial migration from npm package v1569 to local files

