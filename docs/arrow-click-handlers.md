# Clickable Arrows with Callbacks

This document explains how to make arrows clickable and handle click events that return the DOT script line for the arrow.

## Overview

Arrows can be made interactive by providing an `onArrowClick` callback function in the arrow options. When an arrow is clicked, the callback receives:
1. **DOT script line** (string) - The graph connection definition
2. **Connection object** (object) - Full connection data with metadata

## Basic Usage

### Simple Click Handler

```javascript
const options = {
  bow: 0.3,
  padEnd: 20,
  onArrowClick: (dotLine, connection) => {
    console.log('Arrow clicked:', dotLine);
    // Example output: "A:middle -> B:outer"
  }
};

arrows.drawLabelLinks(connections, options);
```

### With Connection Details

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    console.log('DOT line:', dotLine);
    console.log('From:', connection.from);
    console.log('To:', connection.to);
    console.log('From ring:', connection.fromRing || 'middle');
    console.log('To ring:', connection.toRing || 'middle');
  }
};
```

## DOT Script Line Format

The DOT script line follows this format:

```
<from>:<fromRing> -> <to>:<toRing>
```

**Examples**:
- `A:middle -> B:outer`
- `thesis:inner -> antithesis:middle`
- `concept1:middle -> concept2:middle`

## Connection Object Structure

The connection object contains:

```javascript
{
  from: string,        // Source node ID
  to: string,          // Target node ID
  fromRing?: string,   // Source ring ('invisible', 'outer', 'middle', 'inner')
  toRing?: string,     // Target ring (defaults to 'middle')
  // ... any other custom properties from your connections array
}
```

## Interactive Features

When `onArrowClick` is provided, arrows become interactive:

### Visual Feedback

- **Cursor**: Changes to pointer on hover
- **Hover effect**: 
  - Arrow path thickens (1.25px → 2px)
  - Arrow opacity increases (0.85 → 1.0)
  - Arrowhead brightens (brightness filter 1.3)
- **Click**: Triggers callback with arrow data

### Example with UI Update

```javascript
let selectedArrow = null;

const options = {
  bow: 0.3,
  padEnd: 20,
  onArrowClick: (dotLine, connection) => {
    // Update UI with selected arrow
    selectedArrow = dotLine;
    document.getElementById('selectedArrow').textContent = dotLine;
    
    // Highlight in DOT script editor
    highlightLine(dotLine);
    
    // Show connection details
    showConnectionDetails(connection);
  }
};

viewof_chart.drawLabelLinks(connections, options);
```

## Advanced Examples

### Toggle Selection

```javascript
let selectedArrows = new Set();

const options = {
  onArrowClick: (dotLine, connection) => {
    if (selectedArrows.has(dotLine)) {
      selectedArrows.delete(dotLine);
      console.log('Deselected:', dotLine);
    } else {
      selectedArrows.add(dotLine);
      console.log('Selected:', dotLine);
    }
    
    // Update UI to show selected arrows
    updateSelectedArrowsList(Array.from(selectedArrows));
  }
};
```

### Edit DOT Script

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    // Find the line in the DOT script text editor
    const editor = document.getElementById('dotScriptEditor');
    const lines = editor.value.split('\n');
    const lineIndex = lines.findIndex(line => 
      line.includes(`${connection.from}`) && 
      line.includes(`${connection.to}`)
    );
    
    if (lineIndex >= 0) {
      // Highlight and scroll to the line
      editor.focus();
      editor.setSelectionRange(
        lines.slice(0, lineIndex).join('\n').length,
        lines.slice(0, lineIndex + 1).join('\n').length
      );
    }
  }
};
```

### Delete Arrow

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    const confirmDelete = confirm(`Delete arrow: ${dotLine}?`);
    
    if (confirmDelete) {
      // Remove from connections array
      const newConnections = connections.filter(conn => 
        !(conn.from === connection.from && 
          conn.to === connection.to &&
          (conn.fromRing || 'middle') === (connection.fromRing || 'middle') &&
          (conn.toRing || 'middle') === (connection.toRing || 'middle'))
      );
      
      // Redraw arrows
      viewof_chart.clearArrows();
      viewof_chart.drawLabelLinks(newConnections, options);
      
      // Update the DOT script
      updateDotScript(newConnections);
    }
  }
};
```

### Context Menu

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    // Prevent default context menu
    event.preventDefault();
    
    // Show custom context menu
    showContextMenu(event.clientX, event.clientY, {
      items: [
        { label: 'Copy DOT line', action: () => navigator.clipboard.writeText(dotLine) },
        { label: 'Edit connection', action: () => openEditDialog(connection) },
        { label: 'Delete arrow', action: () => deleteArrow(connection) },
        { label: 'View details', action: () => showDetails(connection) }
      ]
    });
  }
};
```

## Observable Notebook Integration

### Using with Observable Inputs

```javascript
// Create a mutable cell to track selected arrow
viewof selectedArrow = {
  let value = null;
  const node = html`<div>
    <p>Selected arrow: <span id="selected"></span></p>
  </div>`;
  
  Object.defineProperty(node, 'value', {
    get: () => value,
    set: (v) => {
      value = v;
      node.querySelector('#selected').textContent = v || 'none';
      node.dispatchEvent(new CustomEvent('input'));
    }
  });
  
  return node;
}

// Use in arrow options
{
  const options = {
    bow: 0.3,
    onArrowClick: (dotLine) => {
      viewof selectedArrow.value = dotLine;
    }
  };
  
  viewof_chart.drawLabelLinks(connections, options);
}

// React to selection
{
  if (selectedArrow) {
    console.log('Selected arrow changed:', selectedArrow);
    // Do something with the selected arrow
  }
}
```

### Main Arrows vs Flow Arrows

You can have different click handlers for different arrow types:

```javascript
// Main arrows - select for editing
const mainOptions = {
  bow: 0.3,
  padEnd: 5,
  onArrowClick: (dotLine, connection) => {
    selectArrowForEditing(dotLine, connection);
  }
};

// Flow arrows - show process details
const flowOptions = {
  klass: 'flow-arrows',
  bow: 0.1,
  padStart: 60,
  padEnd: 60,
  onArrowClick: (dotLine, connection) => {
    showProcessFlowDetails(dotLine, connection);
  }
};

viewof_chart.drawLabelLinks(mainConnections, mainOptions);
viewof_chart.drawLabelLinks(flowConnections, flowOptions);
```

## Disabling Click Handlers

To disable click handlers (default behavior):

```javascript
const options = {
  bow: 0.3,
  // Don't provide onArrowClick
};

// Or explicitly set to null
const options = {
  bow: 0.3,
  onArrowClick: null
};
```

When no click handler is provided:
- Cursor remains default (not pointer)
- No hover effects
- Arrows are not interactive

## Performance Considerations

### Large Number of Arrows

For diagrams with many arrows (>100), consider:

```javascript
// Debounce click handler
const debouncedHandler = debounce((dotLine, connection) => {
  // Handle click
  processArrowClick(dotLine, connection);
}, 100);

const options = {
  onArrowClick: debouncedHandler
};
```

### Complex Callbacks

If your callback performs heavy operations:

```javascript
const options = {
  onArrowClick: async (dotLine, connection) => {
    // Show loading state
    setLoading(true);
    
    try {
      // Perform async operation
      await fetchArrowMetadata(connection);
      await updateDatabase(dotLine);
    } finally {
      setLoading(false);
    }
  }
};
```

## Styling Clickable Arrows

### CSS for Hover States

```css
/* Optional: Additional styling for clickable arrows */
.label-link-group path[style*="cursor: pointer"] {
  transition: stroke-width 0.2s, opacity 0.2s;
}

.label-link-group polygon[style*="cursor: pointer"] {
  transition: filter 0.2s;
}
```

### Custom Hover Colors

You can customize hover behavior in the callback setup:

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    console.log('Clicked:', dotLine);
  },
  // Add custom CSS class for styling
  klass: 'clickable-arrows'
};
```

Then style with CSS:

```css
.clickable-arrows path:hover {
  stroke: #ff6b35 !important;
  stroke-width: 3px !important;
}
```

## Troubleshooting

### Clicks Not Registering

**Problem**: Arrow clicks don't trigger the callback.

**Solutions**:
- Ensure `onArrowClick` is provided in options
- Check if another element is capturing the click event
- Verify the arrow animation has completed (clicks work after animation)

### Multiple Callbacks Firing

**Problem**: Clicking an arrow triggers multiple callbacks.

**Solution**: The click event already calls `event.stopPropagation()`, but if you're nesting arrow groups, ensure proper event handling:

```javascript
const options = {
  onArrowClick: (dotLine, connection) => {
    // Event is already stopped from propagating
    handleSingleClick(dotLine, connection);
  }
};
```

### Hover Effects Persisting

**Problem**: Hover effects don't reset after mouseout.

**Solution**: This shouldn't happen as mouseout handlers reset styling, but if it does:

```javascript
// Manually reset arrow styling
d3.selectAll('.label-link-group path')
  .attr('stroke-width', 1.25)
  .attr('opacity', 0.85);
```

## API Reference

### `onArrowClick(dotLine, connection)`

**Parameters**:
- `dotLine` (string): DOT script format: `"<from>:<fromRing> -> <to>:<toRing>"`
- `connection` (object): Original connection object with properties:
  - `from` (string): Source node ID
  - `to` (string): Target node ID
  - `fromRing` (string): Source ring type
  - `toRing` (string): Target ring type
  - ...any custom properties

**Returns**: void

**Example**:
```javascript
(dotLine, connection) => {
  console.log(dotLine);        // "A:middle -> B:outer"
  console.log(connection.from); // "A"
  console.log(connection.to);   // "B"
}
```

## See Also

- [Arrow Parameters](./arrow-parameters.md) - Full arrow styling options
- [DOT Script Format](./dot-script-format.md) - DOT language reference (if exists)
- [Observable Integration](./observable-integration.md) - Using with Observable notebooks (if exists)

---

**Version**: 1.0  
**Last Updated**: January 2025

