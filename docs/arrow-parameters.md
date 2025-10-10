# Arrow Drawing Parameters

Comprehensive documentation for the dialectical wheel arrow drawing system, inspired by [perfect-arrows](https://github.com/steveruizok/perfect-arrows).

## Table of Contents

- [Overview](#overview)
- [Parameter Reference](#parameter-reference)
- [Adaptive Systems](#adaptive-systems)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)

---

## Overview

The arrow drawing system uses a sophisticated set of parameters to create visually appealing, curved arrows that connect labels on the dialectical wheel. The system includes:

- **Curvature control** (bow, stretch)
- **Adaptive padding** (pixel-based with percentage caps)
- **Length-based scaling** (automatic adjustments based on arrow distance)
- **Separate styling** for main arrows vs. flow arrows

---

## Parameter Reference

### Curvature Parameters

#### `bow` (0-2, default: 0.3 for main, 0.1 for flow)

Controls the natural curvature of arrows.

- **0**: Straight lines (no curve)
- **0.3**: Gentle curve (recommended for main arrows)
- **0.5**: Moderate curve
- **1.0+**: Strong curve

**Adaptive Behavior**: Automatically scales with arrow length using inverse relationship:
- Short arrows (< 100px): Get **more** bow (up to 1.5× multiplier)
- Medium arrows (200px): Get **normal** bow (1.0× multiplier)
- Long arrows (> 400px): Get **less** bow (down to 0.3× multiplier)

```javascript
// Reference length for bow scaling
const bowReferenceLength = 100;
const bowLengthScale = Math.max(0.3, Math.min(1.5, bowReferenceLength / distance));
effectiveBow = bow * bowLengthScale;
```

**Why**: Short arrows need more curve to avoid overlapping with labels; long arrows look better with gentle curves.

---

#### `stretch` (0-1, default: 0.5)

Controls how much the arrow's length affects its curvature.

- **0**: Length has no effect on bow
- **0.5**: Moderate length-based adjustment (recommended)
- **1.0**: Maximum length-based adjustment

Works in conjunction with `minStretch` and `maxStretch` to create smooth transitions.

```javascript
// Stretch effect calculation
if (distance > minStretch) {
  const stretchRange = maxStretch - minStretch;
  const distanceInRange = Math.min(distance - minStretch, stretchRange);
  stretchEffect = 1 - (distanceInRange / stretchRange);
}
effectiveBow = bow * (1 + stretchEffect * stretch) * bowLengthScale;
```

---

#### `minStretch` (pixels, default: 0)

The arrow length where stretch effect starts.

- Arrows shorter than this: No stretch effect
- Arrows longer than this: Gradually increasing stretch effect

**Typical values**: 0-200px

---

#### `maxStretch` (pixels, default: 420)

The arrow length where stretch effect stops.

- Arrows longer than this: Maximum stretch effect applied
- Creates a smooth transition zone between `minStretch` and `maxStretch`

**Typical values**: 200-800px

---

### Padding Parameters

#### `padStart` (pixels, default: 5 for main, 60 for flow)

Distance (in pixels) to inset the arrow from the **source** intersection point.

- Creates a gap between the arrow start and the source label
- Uses adaptive scaling (see below)

**Typical values**: 0-100px

---

#### `padEnd` (pixels, default: 5 for main, 60 for flow)

Distance (in pixels) to inset the arrow from the **target** intersection point.

- Creates a gap between the arrow end and the target label
- Uses adaptive scaling (see below)

**Typical values**: 0-100px

---

#### `maxPadPercent` (0-1, default: 0.25 for main, 0.35 for flow)

Maximum padding as a percentage of the total arrow path length.

- **Safety limit** to prevent short arrows from disappearing
- Works with `padStart`/`padEnd` to create adaptive behavior

**Typical values**: 0.15-0.5 (15%-50%)

**Adaptive Padding Algorithm**:
```javascript
// Convert pixel padding to percentage
const padStartPercent = padStart / totalLength;

// Use whichever is SMALLER: pixel value OR max percentage
const actualPad = Math.min(padStartPercent, maxPadPercent);
```

**Example**:
| Arrow Length | padEnd=20px | As % | maxPadPercent=25% | Actual Used |
|-------------|-------------|------|-------------------|-------------|
| 50px | 20px | 40% | 25% | **25%** (capped) |
| 100px | 20px | 20% | 25% | **20%** (uses px) |
| 200px | 20px | 10% | 25% | **10%** (uses px) |
| 500px | 20px | 4% | 25% | **4%** (uses px) |

---

### Style Parameters

#### `flip` (boolean, default: false)

Flips the direction of the arrow's bow.

- **false**: Bow curves outward (away from origin)
- **true**: Bow curves in opposite direction

---

#### `straights` (boolean, default: true)

Uses straight lines for arrows at 45° angles.

- **true**: Arrows at 0°, 45°, 90° angles are rendered as straight lines
- **false**: All arrows use curves (respecting bow parameter)

Checks if angle is within 2° of 0°, 45°, or 90°.

---

## Adaptive Systems

### 1. Bow Length Scaling (Inverse)

**Goal**: Short arrows get more curve, long arrows get less.

```javascript
const bowReferenceLength = 100; // Reference: typical short arrow
const bowLengthScale = bowReferenceLength / distance;
// Clamp to 0.3× - 1.5× range
const clampedScale = Math.max(0.3, Math.min(1.5, bowLengthScale));
```

**Effect**:
- 50px arrow: 1.5× bow (highly curved)
- 100px arrow: 1.0× bow (normal)
- 300px arrow: 0.33× bow (gentle curve)

---

### 2. Adaptive Padding (Hybrid Pixel/Percentage)

**Goal**: Consistent pixel gaps on long arrows, protected short arrows.

```javascript
// Step 1: Convert pixels to percentage
const padPercent = padPixels / totalLength;

// Step 2: Cap at maximum percentage
const actualPad = Math.min(padPercent, maxPadPercent);
```

**Effect**:
- Long arrows: Get consistent ~20px gaps (if padEnd=20)
- Short arrows: Protected by maxPadPercent cap (e.g., never more than 25%)

---

## Usage Examples

### Example 1: Main Arrows (Default Settings)

```javascript
const mainArrowOptions = {
  bow: 0.3,           // Gentle curve
  stretch: 0.5,       // Moderate stretch effect
  minStretch: 0,      // Start stretch immediately
  maxStretch: 420,    // Full stretch by 420px
  padStart: 5,        // 5px gap at start
  padEnd: 5,          // 5px gap at end
  maxPadPercent: 0.25,// Max 25% padding
  flip: false,        // Curve outward
  straights: true     // Use straight lines at 45°
};

viewof_chart.drawLabelLinks(connections, mainArrowOptions);
```

**Result**: Clean, gently curved arrows with small gaps, suitable for dense diagrams.

---

### Example 2: Flow Arrows (Emphasized)

```javascript
const flowArrowOptions = {
  bow: 0.1,           // Very gentle curve
  stretch: 0.5,       // Moderate stretch effect
  minStretch: 0,      // Start stretch immediately
  maxStretch: 420,    // Full stretch by 420px
  padStart: 60,       // Large 60px gap at start
  padEnd: 60,         // Large 60px gap at end
  maxPadPercent: 0.35,// Max 35% padding (more tolerant)
  flip: false,        // Curve outward
  straights: true     // Use straight lines at 45°
};

viewof_chart.drawLabelLinks(connections, { 
  ...flowArrowOptions, 
  klass: "flow-arrows" 
});
```

**Result**: Nearly straight arrows with large gaps, visually distinct from main arrows.

---

### Example 3: Custom Styling

```javascript
// Highly curved, short-gap arrows for compact layouts
const compactOptions = {
  bow: 0.8,           // Strong curve
  stretch: 0.3,       // Less stretch effect
  padStart: 2,        // Minimal gap
  padEnd: 2,          // Minimal gap
  maxPadPercent: 0.15 // Tight cap (15%)
};

// Straight, wide-gap arrows for clarity
const clearOptions = {
  bow: 0,             // No curve
  stretch: 0,         // No stretch
  padStart: 30,       // Large gap
  padEnd: 30,         // Large gap
  maxPadPercent: 0.4, // Generous cap (40%)
  straights: false    // Force straight even at angles
};
```

---

## API Reference

### `drawLabelLinks(connections, options)`

Main function for drawing arrows between labels.

**Parameters**:
- `connections` (Array): Array of connection objects with `from`, `to`, `fromRing`, `toRing`
- `options` (Object): Arrow styling options (see Parameter Reference above)

**Returns**: void

**Example**:
```javascript
const connections = [
  { from: "A", to: "B", fromRing: "middle", toRing: "outer" },
  { from: "B", to: "C", fromRing: "outer", toRing: "inner" }
];

arrows.drawLabelLinks(connections, {
  bow: 0.3,
  padEnd: 20,
  maxPadPercent: 0.25
});
```

---

### `drawAllArrows()`

Draws all main arrows using the current `arrowOptions` from the UI controls.

**Example**:
```javascript
viewof_chart.drawAllArrows();
```

---

### `drawFlow()`

Draws flow arrows using the current `flowArrowOptions` from the UI controls.

**Example**:
```javascript
viewof_chart.drawFlow();
```

---

### `clearArrows()`

Removes all arrows from the diagram.

**Example**:
```javascript
viewof_chart.clearArrows();
```

---

## Best Practices

### 1. **Start with Defaults**
The default values are tuned for most use cases. Adjust incrementally.

### 2. **Balance Bow and Padding**
- High bow → Use smaller padding (arrows already avoid labels)
- Low bow → Use larger padding (straight arrows need more gap)

### 3. **Match Arrow Purpose**
- **Main arrows** (relationships): Subtle curves, small gaps
- **Flow arrows** (process): Straighter, larger gaps for clarity

### 4. **Test with Different Arrow Lengths**
Use the anchor point visualization to see how parameters affect short vs. long arrows.

### 5. **Adjust maxPadPercent for Layout Density**
- Dense layouts: Lower maxPadPercent (0.15-0.20)
- Sparse layouts: Higher maxPadPercent (0.30-0.40)

---

## Troubleshooting

### Arrows disappearing on short connections
- **Increase** `maxPadPercent` (e.g., from 0.25 to 0.35)
- **Decrease** `padStart` and `padEnd` pixel values

### Arrows too curved on long connections
- **Decrease** `bow` value
- **Increase** `maxStretch` to reduce stretch effect range

### Inconsistent gaps between arrows
- **Adjust** `maxPadPercent` to find the right balance
- **Consider** using different values for `padStart` vs `padEnd`

### Arrows overlapping with labels
- **Increase** `padStart` and `padEnd` pixel values
- **Verify** ellipse intersection detection is working (use anchor point visualization)

---

## Technical Notes

### Ellipse Intersection Detection

Arrows are clipped to the inscribed ellipses of text label bounding boxes using binary search:

1. Generate full curve from source centroid to target centroid
2. Binary search to find where path exits source ellipse
3. Binary search to find where path enters target ellipse
4. Apply adaptive padding from intersection points
5. Reconstruct curve with clipped endpoints

**Precision**: ε = 0.0001 (binary search threshold)

### Path Reconstruction

After finding intersection points, the original curve control points are preserved:

```javascript
// For quadratic Bezier curves
clippedPath = `M${startPoint.x},${startPoint.y} Q ${cx},${cy} ${endPoint.x},${endPoint.y}`;
```

This maintains the curve shape while adjusting the endpoints.

---

## Version History

- **v1.0** (2025-01): Initial implementation with perfect-arrows inspired API
- **v1.1** (2025-01): Added adaptive bow length scaling
- **v1.2** (2025-01): Switched from percentage to hybrid pixel/percentage padding
- **v1.3** (2025-01): Added separate flow arrow controls

---

## References

- [perfect-arrows](https://github.com/steveruizok/perfect-arrows) - Original inspiration for API design
- [D3.js](https://d3js.org/) - SVG manipulation and transitions
- [Observable](https://observablehq.com/) - Reactive notebook environment

