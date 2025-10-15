# Implementation Code Templates

Quick copy-paste templates for the semantic rings refactor.

---

## Phase 1: Helper Functions

### Template: `getRingRadii()` Helper

Add this near the top of the chart function, after radii are defined:

```javascript
// Helper: Maps semantic ring types to physical radii based on isWhiteOutside toggle
function getRingRadii(ringType, isWhiteOutside) {
  // Map semantic names to physical positions
  const positionMap = {
    invisible: 'invisible',
    positive: 'inner',  // Green always in inner
    negative: isWhiteOutside ? 'middle' : 'outer',  // Red moves
    neutral: isWhiteOutside ? 'outer' : 'middle'    // White moves
  };
  
  const position = positionMap[ringType];
  
  // Return radii for that physical position
  const radiiConfig = {
    invisible: {
      inner: radii.outerRadius,
      outer: styles.radii.invisible
    },
    outer: {
      inner: radii.innerRadius,
      outer: radii.outerRadius
    },
    middle: {
      inner: radii.innerInnerRadius,
      outer: radii.middleRadius
    },
    inner: {
      inner: 30,  // hub radius
      outer: radii.centerRadius
    }
  };
  
  return radiiConfig[position];
}
```

### Template: `getPhysicalGroupsForSemantics()` Helper

```javascript
// Helper: Maps semantic content to physical SVG groups based on isWhiteOutside toggle
function getPhysicalGroupsForSemantics(isWhiteOutside) {
  return {
    invisible: {
      group: invisibleGroup,
      labelsGroup: invisibleLabelsGroup,
      arc: invisibleArc,
      color: invisibleColor
    },
    positive: {
      group: innerGroup,  // Always inner
      labelsGroup: innerLabelsGroup,
      arc: innerArc,
      color: positiveColor
    },
    negative: isWhiteOutside ? {
      group: middleGroup,  // Middle when swapped
      labelsGroup: middleLabelsGroup,
      arc: middleArc,
      color: negativeColor
    } : {
      group: outerGroup,  // Outer by default
      labelsGroup: outerLabelsGroup,
      arc: outerArc,
      color: negativeColor
    },
    neutral: isWhiteOutside ? {
      group: outerGroup,  // Outer when swapped
      labelsGroup: outerLabelsGroup,
      arc: outerArc,
      color: neutralColor
    } : {
      group: middleGroup,  // Middle by default
      labelsGroup: middleLabelsGroup,
      arc: middleArc,
      color: neutralColor
    }
  };
}
```

---

## Phase 2: Data Structure

### Template: New `transformToNestedPieData()`

Replace lines 3909-3949 with:

```javascript
transformToNestedPieData = (dialecticalData, whiteOnly = whitesOnly) => {
  const units = Object.keys(dialecticalData);
  
  return {
    invisible: units.map((unit, index) => ({
      name: `${unit}i`,
      fullText: dialecticalData[unit].invisible || "",
      unitId: unit,
      value: whiteOnly ? 0 : 1,
      opacity: whiteOnly ? 0 : 1,
      polarity: 'invisible'  // Add polarity metadata
    })),
    
    negative: units.map(unit => ({
      name: `${unit}-`,
      fullText: dialecticalData[unit].negative,
      unitId: unit,
      value: 1,
      opacity: 1,
      polarity: 'negative'  // Add polarity metadata
    })),
    
    neutral: units.map(unit => ({
      name: unit,
      fullText: dialecticalData[unit].statement,
      unitId: unit,
      value: whiteOnly ? 0 : 1,
      opacity: whiteOnly ? 0 : 1,
      polarity: 'neutral'  // Add polarity metadata
    })),
    
    positive: units.map(unit => ({
      name: `${unit}+`,
      fullText: dialecticalData[unit].positive,
      unitId: unit,
      value: 1,
      opacity: 1,
      polarity: 'positive'  // Add polarity metadata
    }))
  };
}
```

### Template: Update `updateAllRings()` in makeRings

Replace lines 145-151 with:

```javascript
function updateAllRings() {
  const dataToUse = getDataToUse();
  const physicalGroups = getPhysicalGroupsForSemantics(isWhiteOutside);
  
  // Map semantic data to physical groups
  updateRing(
    physicalGroups.invisible.group,
    physicalGroups.invisible.labelsGroup,
    dataToUse.invisible,
    physicalGroups.invisible.arc,
    "invisible",
    physicalGroups.invisible.color
  );
  
  updateRing(
    physicalGroups.positive.group,
    physicalGroups.positive.labelsGroup,
    dataToUse.positive,  // ✅ Semantic key
    physicalGroups.positive.arc,
    "positive",  // ✅ Semantic name
    physicalGroups.positive.color
  );
  
  updateRing(
    physicalGroups.negative.group,
    physicalGroups.negative.labelsGroup,
    dataToUse.negative,  // ✅ Semantic key
    physicalGroups.negative.arc,
    "negative",  // ✅ Semantic name
    physicalGroups.negative.color
  );
  
  updateRing(
    physicalGroups.neutral.group,
    physicalGroups.neutral.labelsGroup,
    dataToUse.neutral,  // ✅ Semantic key
    physicalGroups.neutral.arc,
    "neutral",  // ✅ Semantic name
    physicalGroups.neutral.color
  );
}
```

---

## Phase 3: Arrows

### Template: Update `parseArrowConnections()`

Replace lines 3677-3689 with:

```javascript
const parseUnit = (unit) => {
  if (unit.endsWith('+')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'positive' } : null;  // ✅ Semantic
  } else if (unit.endsWith('-')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'negative' } : null;  // ✅ Semantic
  } else if (unit.endsWith('i')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
  } else {
    return dialecticalData[unit] ? { unitId: unit, ringType: 'neutral' } : null;  // ✅ Semantic
  }
};
```

### Template: Update `getCellCentroid()` switches

Replace the switch statement (lines 640-660) with helper usage:

```javascript
function getCellCentroid(unitId, ringType = "neutral") {  // Default to neutral
  const dataToUse = nestedData;
  const ringRadii = getRingRadii(ringType, isWhiteOutside);
  
  // Get data for this semantic ring type
  const pieData = pie(dataToUse[ringType]);  // Direct semantic key access
  const arcGenerator = d3.arc()
    .innerRadius(ringRadii.inner)
    .outerRadius(ringRadii.outer);
  
  const cellData = pieData.find(d => d.data.unitId === unitId);
  if (!cellData) return null;
  
  const centroid = arcGenerator.centroid(cellData);
  
  // Continue with rest of function...
}
```

---

## Phase 4: Styling

### Template: Update stroke style (line 116)

```javascript
// OLD:
.attr("stroke", ringType === "middle" ? styles.colors.strokes.middleRing : styles.colors.strokes.default)

// NEW:
.attr("stroke", ringType === "neutral" ? styles.colors.strokes.neutralRing : styles.colors.strokes.default)
```

### Template: Update opacity (lines 123, 138)

```javascript
// OLD:
const baseOpacity = ringType === "outer" || ringType === "invisible" ? 1 : ringType === "middle" ? 0.9 : 0.8;

// NEW:
const opacityMap = {
  invisible: 1,
  negative: 1,
  neutral: 0.9,
  positive: 0.8
};
const baseOpacity = opacityMap[ringType] || 1;
```

### Template: Update font size (line 2760)

```javascript
// OLD:
`${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`

// NEW:
const fontSizeMap = {
  invisible: baseSizes.negative,  // Use same as outermost
  negative: baseSizes.negative,
  neutral: baseSizes.neutral,
  positive: baseSizes.positive
};
`${fontSizeMap[ringType]}px`
```

---

## Phase 5: Colors

### Template: Update color destructuring (line 2047)

```javascript
// OLD:
const { invisibleColor, outerColor, middleColor, innerColor } = colorScales;

// NEW:
const { invisibleColor, negativeColor, neutralColor, positiveColor } = colorScales;
```

You'll also need to update the color scale definitions earlier in the code.

---

## Phase 6: Step Mode

### Template: Update `cellVisibility` initialization

```javascript
// OLD:
cellVisibility[cell] = { invisible: true, outer: false, middle: true, inner: false };

// NEW:
cellVisibility[cell] = { invisible: true, negative: false, neutral: true, positive: false };
```

### Template: Update `executeStep` - showGreen/showRed (lines 1686-1691)

```javascript
// OLD:
case 'showGreen':
  ctx.showCell(step.unitId, "inner");
  break;
case 'showRed':
  ctx.showCell(step.unitId, "outer");
  break;

// NEW:
case 'showGreen':
  ctx.showCell(step.unitId, "positive");  // ✅ Semantic
  break;
case 'showRed':
  ctx.showCell(step.unitId, "negative");  // ✅ Semantic
  break;
```

### Template: Update `showCell()` function

```javascript
function showCell(unitId, ringType) {
  if (!cellVisibility[unitId] || cellVisibility[unitId][ringType]) return;

  cellVisibility[unitId][ringType] = true;

  // Use helper to get physical group
  const physicalGroups = getPhysicalGroupsForSemantics(isWhiteOutside);
  const physicalMapping = physicalGroups[ringType];
  
  const group = physicalMapping.group;
  const labelsGroup = physicalMapping.labelsGroup;
  
  // Use helper to get radii
  const ringRadii = getRingRadii(ringType, isWhiteOutside);
  const startRadius = (ringRadii.inner + ringRadii.outer) / 2;  // Start from middle
  const endInnerRadius = ringRadii.inner;
  const endOuterRadius = ringRadii.outer;

  // Show cell with radius animation
  group.selectAll("path")
    .filter(d => d.data.unitId === unitId)
    .classed("hidden", false)
    .transition()
    .duration(styles.durations.stepRotation)
    .ease(d3.easeExpOut)
    .attrTween("d", function(d) {
      const currentData = d;
      return function(t) {
        const newInnerRadius = d3.interpolate(startRadius, endInnerRadius)(t);
        const newOuterRadius = d3.interpolate(startRadius, endOuterRadius)(t);
        const arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        return arcGen(currentData);
      };
    });

  // Similar updates for labels...
}
```

### Template: Update `hideCell()` function

Similar pattern to `showCell()` - use helpers to get physical groups and radii.

### Template: Update `executeStep` - showWhite case arrays

```javascript
// OLD:
["outer","middle","inner"].forEach(ringType => {
  const dataArray = animationData[ringType];
  // ...
});

// NEW:
["negative","neutral","positive"].forEach(ringType => {
  const dataArray = animationData[ringType];
  // ...
});
```

---

## Testing Templates

### Test: Helper Functions

```javascript
// Test getRingRadii
console.log("Testing getRingRadii:");
console.log("positive (always inner):", getRingRadii("positive", false));
console.log("positive (still inner):", getRingRadii("positive", true));
console.log("negative (outer by default):", getRingRadii("negative", false));
console.log("negative (middle when swapped):", getRingRadii("negative", true));
console.log("neutral (middle by default):", getRingRadii("neutral", false));
console.log("neutral (outer when swapped):", getRingRadii("neutral", true));

// Test getPhysicalGroupsForSemantics
console.log("Testing getPhysicalGroupsForSemantics:");
const groups1 = getPhysicalGroupsForSemantics(false);
const groups2 = getPhysicalGroupsForSemantics(true);
console.log("Default state negative group:", groups1.negative.group);
console.log("Swapped state negative group:", groups2.negative.group);
```

### Test: Data Structure

```javascript
// Test transformToNestedPieData
const testData = transformToNestedPieData(dialecticalData);
console.log("Data structure keys:", Object.keys(testData));
console.log("Should be: ['invisible', 'negative', 'neutral', 'positive']");
console.log("Sample negative item:", testData.negative[0]);
console.log("Sample positive item:", testData.positive[0]);
```

### Test: Arrows

```javascript
// Test parseArrowConnections
const testScript = "A+ -> B-\nC -> D+";
const testConnections = parseArrowConnections(testScript, dialecticalData);
console.log("First arrow source:", testConnections[0].source.ringType);
console.log("Should be: 'positive'");
console.log("First arrow target:", testConnections[0].target.ringType);
console.log("Should be: 'negative'");
```

---

## Quick Reference: Semantic Mapping

### Default State (`isWhiteOutside = false`)

| Semantic | Physical Position | Color |
|----------|------------------|-------|
| positive | inner | 🟢 green |
| neutral  | middle | ⚪ white |
| negative | outer | 🔴 red |

### Swapped State (`isWhiteOutside = true`)

| Semantic | Physical Position | Color |
|----------|------------------|-------|
| positive | inner | 🟢 green |
| neutral  | **outer** | ⚪ white |
| negative | **middle** | 🔴 red |

### Immutable Mappings (Never Change)

| Color | Semantic | DOT Suffix |
|-------|----------|------------|
| 🟢 Green | positive | `+` |
| 🔴 Red | negative | `-` |
| ⚪ White | neutral | (none) |

---

## Search & Replace Patterns

Use with caution! Test after each replacement.

### Safe Replacements (in specific contexts)

1. In data structure keys:
   - `dataToUse.outer` → `dataToUse.negative`
   - `dataToUse.middle` → `dataToUse.neutral`
   - `dataToUse.inner` → `dataToUse.positive`

2. In cellVisibility:
   - `cellVisibility[x].outer` → `cellVisibility[x].negative`
   - `cellVisibility[x].middle` → `cellVisibility[x].neutral`
   - `cellVisibility[x].inner` → `cellVisibility[x].positive`

3. In parseArrowConnections return values:
   - `ringType: 'outer'` → `ringType: 'negative'`
   - `ringType: 'middle'` → `ringType: 'neutral'`
   - `ringType: 'inner'` → `ringType: 'positive'`

### DO NOT Replace (These are physical groups)

- `outerGroup` (physical SVG group)
- `middleGroup` (physical SVG group)
- `innerGroup` (physical SVG group)
- `outerLabelsGroup` (physical SVG group)
- `middleLabelsGroup` (physical SVG group)
- `innerLabelsGroup` (physical SVG group)
- `outerArc` (physical arc generator)
- `middleArc` (physical arc generator)
- `innerArc` (physical arc generator)

These stay as position names because they're physical SVG elements.

---

## Common Mistakes to Avoid

1. **Don't rename physical groups** - they're fixed SVG structure
2. **Don't forget to pass `isWhiteOutside`** to helper functions
3. **Don't mix semantic and position names** - be consistent
4. **Don't skip testing** after each phase
5. **Don't forget `cellVisibility`** - it's used everywhere
6. **Don't assume position = semantic** - that's the bug!

---

## Debug Checklist

If something breaks:

- [ ] Are you using semantic names in data structure keys?
- [ ] Are you using helpers to map semantic → physical?
- [ ] Are you passing `isWhiteOutside` to helpers?
- [ ] Did you update ALL instances of position names in data access?
- [ ] Did you update `cellVisibility` structure?
- [ ] Did you test both toggle states?
- [ ] Did you update color scale names?
- [ ] Did you check the browser console for errors?

---

## File Locations

All changes in: `/Users/justintan/dialectical-wheel/notebook-src/dialectical-wheel-4.html`

Key line numbers:
- 145-151: `updateAllRings()` 
- 636-679: `getCellCentroid()`
- 1609-1616: `resetBuildState()`
- 1618-1692: `executeStep()`
- 1719-1730: `resetToFull()`
- 2047: Color scales
- 2055-2112: `hideCell()`
- 2131-2166: `showCell()`
- 2766-2779: `updateLabels()` text
- 3677-3689: `parseArrowConnections()`
- 3909-3949: `transformToNestedPieData()`
- 4083-4127: `getTextConstraints()`

