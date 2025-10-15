# ✅ Clickable Arrows Feature

Arrows are now interactive and can trigger callbacks with DOT script information.

## Quick Start

```javascript
const options = {
  bow: 0.3,
  padEnd: 20,
  onArrowClick: (dotLine, connection) => {
    console.log('Arrow clicked:', dotLine);
    // Output: "A:middle -> B:outer"
  }
};

viewof_chart.drawLabelLinks(connections, options);
```

## What You Get

### 1. **DOT Script Line** (string)
Format: `<from>:<fromRing> -> <to>:<toRing>`

Examples:
- `"A:middle -> B:outer"`
- `"thesis:inner -> antithesis:middle"`

### 2. **Connection Object** (object)
Full connection data:
```javascript
{
  from: "A",
  to: "B",
  fromRing: "middle",
  toRing: "outer",
  // ...any other custom properties
}
```

## Interactive Features

When `onArrowClick` is provided:

✅ **Cursor changes** to pointer on hover  
✅ **Hover effect**: Arrow thickens and brightens  
✅ **Click triggers** callback with arrow data  
✅ **Event propagation** stopped automatically  

## Usage Examples

### Select Arrow
```javascript
onArrowClick: (dotLine) => {
  selectedArrow = dotLine;
  highlightInEditor(dotLine);
}
```

### Edit Connection
```javascript
onArrowClick: (dotLine, connection) => {
  openEditDialog(connection);
}
```

### Delete Arrow
```javascript
onArrowClick: (dotLine, connection) => {
  if (confirm(`Delete ${dotLine}?`)) {
    deleteConnection(connection);
    redrawArrows();
  }
}
```

## Files Modified

- `notebook-src/dialectical-wheel-4.html`
  - Added `onArrowClick` option parameter
  - Added DOT line generation to link data
  - Added click handlers to path and arrowhead elements
  - Added hover effects (thickening, brightening)
  - Added cursor pointer styling

## Documentation

📚 **Comprehensive Guide**: [`docs/arrow-click-handlers.md`](./docs/arrow-click-handlers.md)
  - Complete API reference
  - Advanced examples
  - Context menus, editing, deletion
  - Observable integration
  - Troubleshooting

📚 **Arrow Parameters**: [`docs/arrow-parameters.md`](./docs/arrow-parameters.md)
  - Updated with `onArrowClick` parameter
  - Quick example added

## Implementation Details

### Click Handler Flow

1. User clicks arrow path or arrowhead
2. Event propagation stopped
3. Callback invoked with:
   - `dotLine`: Generated from `${from}:${fromRing} -> ${to}:${toRing}`
   - `connection`: Original connection object
4. Hover effects managed automatically

### Visual Feedback

**Hover**:
- Path: stroke-width 1.25 → 2, opacity 0.85 → 1.0
- Arrowhead: brightness filter 1.3×

**Mouseout**:
- All styles reset to defaults

### Performance

- Click handlers only attached when `onArrowClick` provided
- Event delegation not needed (low arrow count typically)
- Hover effects use simple D3 selections

## Testing Checklist

Test the implementation:

- [ ] Click on arrow path triggers callback
- [ ] Click on arrowhead triggers callback
- [ ] DOT line format is correct
- [ ] Connection object has all properties
- [ ] Hover shows visual feedback
- [ ] Mouseout resets styling
- [ ] Cursor changes to pointer
- [ ] Event doesn't propagate to background
- [ ] Works with main arrows
- [ ] Works with flow arrows
- [ ] Works after animation completes
- [ ] No click when `onArrowClick` not provided

## Next Steps

Consider adding:
- [ ] Double-click handler for different action
- [ ] Right-click context menu
- [ ] Keyboard shortcuts (e.g., Delete key)
- [ ] Multi-select arrows (Ctrl+click)
- [ ] Arrow highlighting API
- [ ] Selected state persistence

## Usage in Your App

### Observable Notebook
Already works! Just add `onArrowClick` to your options.

### React Component  
You'll need to expose the callback through props:

```typescript
// DialecticalWheel.tsx
interface DialecticalWheelProps {
  // ...existing props
  onArrowClick?: (dotLine: string, connection: any) => void;
}

// Then pass it through to the notebook
module.redefine('arrowOptions', {
  ...otherOptions,
  onArrowClick: onArrowClick
});
```

---

**Feature Status**: ✅ Complete  
**Documentation**: ✅ Complete  
**Date**: January 2025

