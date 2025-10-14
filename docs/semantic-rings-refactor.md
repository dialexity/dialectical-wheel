# Semantic Rings Refactor: Replacing outer/middle/inner with positive/negative/neutral

## Executive Summary

This document provides a **complete audit** of every instance where `outer`, `middle`, `inner` position names are used in the codebase, and proposes a comprehensive refactor to use semantic polarity names (`positive`, `negative`, `neutral`) instead.

**Total instances found**: 50+ across 9 major categories
**Estimated effort**: ~21 hours
**Most complex area**: Step Mode / Build Animation system

---

## Table of Contents

1. [Core Concept](#core-concept)
2. [Benefits](#benefits)
3. [Complete Inventory](#complete-inventory-of-outermiddleinner-usage)
   - [Category A: Data Structure Lookups](#category-a-data-structure-lookups-critical) (3 instances) ⚠️ CRITICAL
   - [Category B: Radii Calculations](#category-b-radii-calculations-pure-geometry) (2 instances)
   - [Category C: Visual Styling](#category-c-visual-styling-minor-logic) (3 instances)
   - [Category D: transformToNestedPieData](#category-d-transformtonestedpiedata-the-bandaid-hack) (1 instance) ⚠️ ROOT CAUSE
   - [Category E: Arrow Parsing](#category-e-arrow-parsing-currently-broken) (1 instance) ⚠️ THE BUG
   - [Category F: SVG Group Creation](#category-f-svg-group-creation-physical-structure) (1 instance)
   - [Category G: Color Scales](#category-g-color-scales-correctly-semantic) (1 instance)
   - [Category H: Step Mode / Build Animation](#category-h-step-mode--build-animation-critical) (9 instances) ⚠️ MOST COMPLEX
   - [Category I: cellVisibility Data Structure](#category-i-cellvisibility-data-structure-pervasive) (Pervasive)
4. [Helper Functions](#radii-mapping-helper)
5. [Migration Strategy](#migration-strategy)
6. [Testing Checklist](#testing-checklist)
7. [Benefits Summary](#benefits-summary)
8. [Estimated Effort](#estimated-effort)

---

## Core Concept

Instead of using physical position names (`outer`, `middle`, `inner`), use **semantic polarity names** (`positive`, `negative`, `neutral`) everywhere, and assign them radii values that determine their physical ring order based on `isWhiteOutside`.

## Benefits

1. **Eliminates conflation**: No more confusion between physical position and semantic meaning
2. **Removes bandaid hack**: The `[outerKey, middleKey]` swap becomes unnecessary
3. **Fixes arrows automatically**: Arrow code naturally uses semantic names
4. **Self-documenting**: Code clearly shows what content means, not just where it renders
5. **Extensible**: Easy to add new semantic types without renaming physical positions

---

## Complete Inventory of outer/middle/inner Usage

### Category A: Data Structure Lookups (CRITICAL)

These access data using ringType as a key into `nestedData` or `dataToUse`.

#### A1. `getCellCentroid` - Lines 640-660
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function getCellCentroid(unitId, ringType = "middle") {
  const dataToUse = nestedData;
  let pieData, arcGenerator;
  const { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius } = radii;
  switch (ringType) {
    case "invisible":
      pieData = pie(dataToUse.invisible);
      arcGenerator = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
      break;
    case "outer":
      pieData = pie(dataToUse.outer);  // ❌ Uses ringType as data key
      arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      break;
    case "middle":
      pieData = pie(dataToUse.middle);  // ❌ Uses ringType as data key
      arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
      break;
    case "inner":
      pieData = pie(dataToUse.inner);  // ❌ Uses ringType as data key
      arcGenerator = d3.arc().innerRadius(30).outerRadius(centerRadius);
      break;
    default:
      pieData = pie(dataToUse.middle);
      arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
  }
  const cellData = pieData.find(d => d.data.unitId === unitId);
  // ...
}
```

**Problem**: Assumes `dataToUse` has keys matching ringType names
**Solution**: Use semantic names as keys in data structure

---

#### A2. `updateLabels` text wrapping - Lines 2766-2779
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
let pieData, arcGen;
const dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
if (ringType === "invisible") {
  pieData = pie(dataToUse.invisible);
  arcGen = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
} else if (ringType === "outer") {
  pieData = pie(dataToUse.outer);  // ❌ Uses ringType as data key
  arcGen = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
} else if (ringType === "middle") {
  pieData = pie(dataToUse.middle);  // ❌ Uses ringType as data key
  arcGen = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
} else {
  pieData = pie(dataToUse.inner);  // ❌ Uses ringType as data key
  arcGen = d3.arc().innerRadius(30).outerRadius(centerRadius);
}
```

**Problem**: Same as A1
**Solution**: Use semantic names

---

#### A3. `updateAllRings` - Lines 147-150
**File**: `notebook-src/dialectical-wheel-4.js` (makeRings module)

```javascript
function updateAllRings() {
  const dataToUse = getDataToUse();
  updateRing(invisibleGroup, invisibleLabelsGroup, dataToUse.invisible, invisibleArc, "invisible", invisibleColor);
  updateRing(outerGroup, outerLabelsGroup, dataToUse.outer, outerArc, "outer", outerColor);  // ❌
  updateRing(middleGroup, middleLabelsGroup, dataToUse.middle, middleArc, "middle", middleColor);  // ❌
  updateRing(innerGroup, innerLabelsGroup, dataToUse.inner, innerArc, "inner", innerColor);  // ❌
}
```

**Problem**: Hardcoded mapping between data keys and physical groups
**Solution**: Keep physical groups but pass semantic data keys

---

### Category B: Radii Calculations (PURE GEOMETRY)

These switch on ringType only to look up radius values.

#### B1. `getCellCentroid` radii lookup - Lines 666-679
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
let ringInner, ringOuter;
if (ringType === "invisible") {
  ringInner = outerRadius;
  ringOuter = styles.radii.invisible;
} else if (ringType === "outer") {
  ringInner = innerRadius;
  ringOuter = outerRadius;
} else if (ringType === "middle") {
  ringInner = innerInnerRadius;
  ringOuter = middleRadius;
} else if (ringType === "inner") {
  ringInner = 30;
  ringOuter = centerRadius;
}
```

**Problem**: None! Pure geometry lookup
**Solution**: Create a `getRingRadii(ringType, isWhiteOutside)` helper that returns radii for semantic names

---

#### B2. `getTextConstraints` - Lines 4087-4100
**File**: `notebook-src/dialectical-wheel-4.js`

```javascript
let innerRadius, outerRadius;
if (ringType === "invisible") {
  innerRadius = styles.radii.outer; 
  outerRadius = styles.radii.invisible;
} else if (ringType === "outer") {
  innerRadius = styles.radii.middleOuter;
  outerRadius = styles.radii.outer;
} else if (ringType === "middle") {
  innerRadius = styles.radii.middleInner;
  outerRadius = styles.radii.middleOuter;
} else { // inner
  innerRadius = styles.radii.hub;
  outerRadius = styles.radii.middleInner;
}
```

**Problem**: None! Pure geometry
**Solution**: Same helper function as B1

---

### Category C: Visual Styling (MINOR LOGIC)

These have small differences in rendering based on ringType.

#### C1. Stroke style - Lines 116-117
**File**: `notebook-src/dialectical-wheel-4.js` (makeRings module)

```javascript
.attr("stroke", ringType === "middle" ? styles.colors.strokes.middleRing : styles.colors.strokes.default)
.attr("stroke-width", ringType === "middle" ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth)
```

**Problem**: Assumes `middle` ring always has special stroke
**Solution**: 
- Option 1: Check `ringType === "neutral"` (if neutral is always in middle position)
- Option 2: Have `styles.strokes` keyed by semantic name
- Option 3: Determine special stroke based on radii range

**Recommendation**: Option 2 for clarity

---

#### C2. Base opacity - Lines 123, 138
**File**: `notebook-src/dialectical-wheel-4.js` (makeRings module)

```javascript
const baseOpacity = ringType === "outer" || ringType === "invisible" ? 1 : ringType === "middle" ? 0.9 : 0.8;
```

**Problem**: Opacity tied to physical position names
**Solution**: 
- Option 1: Tie to semantic names (`negative`=1, `neutral`=0.9, `positive`=0.8)
- Option 2: Determine by radii (outermost=1, middle=0.9, innermost=0.8)

**Recommendation**: Option 1 (semantic) for clarity

---

#### C3. Font size - Lines 2760, 2762
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
const baseSizes = styles.fonts.labels.baseSize;
textElement.style("font-size", `${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`);
```

**Problem**: Font sizes keyed by position
**Solution**: Have `baseSizes.positive`, `baseSizes.negative`, `baseSizes.neutral`

---

### Category D: transformToNestedPieData (THE BANDAID HACK)

#### D1. Data structure creation - Lines 3909-3949
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
transformToNestedPieData = (dialecticalData, whiteOutside = isWhiteOutside, whiteOnly = whitesOnly) => {
  const units = Object.keys(dialecticalData);
  const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];  // ❌ THE HACK
  
  return {
    invisible: units.map((unit,index)=> ({ ... })),
    [outerKey]: units.map(unit => ({
      name: `${unit}-`,
      fullText: dialecticalData[unit].negative,
      // ...
    })),
    [middleKey]: units.map(unit => ({
      name: unit,
      fullText: dialecticalData[unit].statement,
      // ...
    })),
    inner: units.map(unit => ({
      name: `${unit}+`,
      fullText: dialecticalData[unit].positive,
      // ...
    }))
  }
}
```

**THE CORE PROBLEM**: Using position names as keys, then swapping them

**Solution**: Use semantic names as keys directly:

```javascript
transformToNestedPieData = (dialecticalData, whiteOnly = whitesOnly) => {
  const units = Object.keys(dialecticalData);
  
  return {
    invisible: units.map((unit,index)=> ({ ... })),
    negative: units.map(unit => ({
      name: `${unit}-`,
      polarity: 'negative',
      fullText: dialecticalData[unit].negative,
      // ...
    })),
    neutral: units.map(unit => ({
      name: unit,
      polarity: 'neutral',
      fullText: dialecticalData[unit].statement,
      // ...
    })),
    positive: units.map(unit => ({
      name: `${unit}+`,
      polarity: 'positive',
      fullText: dialecticalData[unit].positive,
      // ...
    }))
  }
}
```

**No more hack needed!** ✅

---

### Category E: Arrow Parsing (CURRENTLY BROKEN)

#### E1. `parseArrowConnections` - Lines 3677-3689
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
const parseUnit = (unit) => {
  if (unit.endsWith('+')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'inner' } : null;  // ❌ Hardcoded
  } else if (unit.endsWith('-')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'outer' } : null;  // ❌ Hardcoded
  } else if (unit.endsWith('i')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
  } else {
    return dialecticalData[unitId] ? { unitId, ringType: 'middle' } : null;  // ❌ Hardcoded
  }
};
```

**Solution**: Return semantic names directly:

```javascript
const parseUnit = (unit) => {
  if (unit.endsWith('+')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'positive' } : null;  // ✅
  } else if (unit.endsWith('-')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'negative' } : null;  // ✅
  } else if (unit.endsWith('i')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
  } else {
    return dialecticalData[unitId] ? { unitId, ringType: 'neutral' } : null;  // ✅
  }
};
```

---

### Category F: SVG Group Creation (PHYSICAL STRUCTURE)

#### F1. Ring group creation - Lines 1942-1945, 1952-1955
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
const invisibleGroup = contentGroup.append("g").attr("class", "invisible-ring");
const outerGroup = contentGroup.append("g").attr("class", "outer-ring");
const middleGroup = contentGroup.append("g").attr("class", "middle-ring");
const innerGroup = contentGroup.append("g").attr("class", "inner-ring");

const invisibleLabelsGroup = contentGroup.append("g").attr("class", "invisible-labels");
const outerLabelsGroup = contentGroup.append("g").attr("class", "outer-labels");
const middleLabelsGroup = contentGroup.append("g").attr("class", "middle-labels");
const innerLabelsGroup = contentGroup.append("g").attr("class", "inner-labels");
```

**Question**: Keep position names for SVG structure or use semantic names?

**Options**:
1. **Keep position names** for CSS classes but map semantics to them dynamically
2. **Use semantic names** everywhere

**Recommendation**: Option 1 - Keep position names for physical SVG structure, but determine which semantic content goes where based on `isWhiteOutside`

---

### Category G: Color Scales (CORRECTLY SEMANTIC)

#### G1. Color scale objects - Lines 2047
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
const { invisibleColor, outerColor, middleColor, innerColor } = colorScales;
```

**Current**: Colors named by position
**Should be**: Colors named by polarity

```javascript
const { invisibleColor, negativeColor, neutralColor, positiveColor } = colorScales;
```

---

### Category H: Step Mode / Build Animation (CRITICAL)

The step mode system has EXTENSIVE use of position-based names throughout. This is one of the most complex areas to refactor.

#### H1. `executeStep` - showWhite case - Lines 1628-1643
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
case 'showWhite': {
  // ...
  function setupFirstOfPair() {
    ["outer","middle","inner"].forEach(ringType => {  // ❌ Hardcoded position names
      const dataArray = animationData[ringType];
      const currentData = dataArray.find(d => d.unitId === step.unitId);
      const pairData = dataArray.find(d => d.unitId === pairId);
      if (currentData) currentData.value = 1;
      if (pairData) pairData.value = 1;
    });
    ctx.cellVisibility[step.unitId].outer = true;   // ❌
    ctx.cellVisibility[step.unitId].inner = true;   // ❌
    ctx.cellVisibility[step.unitId].middle = true;  // ❌
    ctx.cellVisibility[pairId].outer = true;
    ctx.cellVisibility[pairId].inner = true;
    ctx.cellVisibility[pairId].middle = true;
    setTimeout(() => {
      ["outer","middle","inner"].forEach(ringType => {  // ❌
        const dataArray = animationData[ringType];
        // ...
      });
    }, 100);
  }
}
```

**Problem**: 
- Hardcodes position arrays
- `cellVisibility` uses position keys
- `animationData` keyed by position

**Solution**: Use semantic names in data structures

---

#### H2. `executeStep` - showGreen/showRed cases - Lines 1686-1691
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
case 'showGreen':
  ctx.showCell(step.unitId, "inner");  // ❌ Assumes green is always inner
  break;
case 'showRed':
  ctx.showCell(step.unitId, "outer");  // ❌ Assumes red is always outer
  break;
```

**Problem**: Hardcoded assumption that green=inner, red=outer
**Solution**: Use semantic names:

```javascript
case 'showGreen':
  ctx.showCell(step.unitId, "positive");  // ✅ Green is always positive
  break;
case 'showRed':
  ctx.showCell(step.unitId, "negative");  // ✅ Red is always negative
  break;
```

---

#### H3. `executeStep` - hideCell calls - Lines 1677-1678
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
ctx.hideCell(step.unitId, "outer");  // ❌
ctx.hideCell(step.unitId, "inner");  // ❌
setTimeout(() => {
  groups.outerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
  groups.innerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
}, styles.durations.stepRotation + 50);
```

**Problem**: Hardcoded position names and direct group references
**Solution**: Use semantic names, map to physical groups via helper

---

#### H4. `showCell` function - Lines 2131-2166
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function showCell(unitId, ringType) {
  if (!cellVisibility[unitId] || cellVisibility[unitId][ringType]) return;

  cellVisibility[unitId][ringType] = true;

  let group, labelsGroup, startRadius, endInnerRadius, endOuterRadius;
  switch(ringType) {
    case "invisible":
      group = invisibleGroup;
      labelsGroup = invisibleLabelsGroup;
      startRadius = outerRadius;
      endInnerRadius = outerRadius;
      endOuterRadius = styles.radii.invisible;
      break;
    case "outer":  // ❌
      group = outerGroup;
      labelsGroup = outerLabelsGroup;
      startRadius = innerRadius;
      endInnerRadius = innerRadius;
      endOuterRadius = outerRadius;
      break;
    case "middle":  // ❌
      group = middleGroup;
      labelsGroup = middleLabelsGroup;
      startRadius = innerInnerRadius;
      endInnerRadius = innerInnerRadius;
      endOuterRadius = middleRadius;
      break;
    case "inner":  // ❌
      group = innerGroup;
      labelsGroup = innerLabelsGroup;
      startRadius = centerRadius;
      endInnerRadius = styles.radii.hub;
      endOuterRadius = centerRadius;
      break;
  }
  // ... animation code using these values
}
```

**Problem**: 
- Switch on position names
- Direct mapping to physical groups
- `cellVisibility` keyed by position

**Solution**: Use semantic `ringType`, map to physical groups via helper

---

#### H5. `hideCell` function - Lines 2055-2082
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function hideCell(unitId, ringType) {
  if (!cellVisibility[unitId] || !cellVisibility[unitId][ringType]) return;

  cellVisibility[unitId][ringType] = false;

  let group, labelsGroup, targetRadius;
  switch(ringType) {
    case "invisible":
      group = invisibleGroup;
      labelsGroup = invisibleLabelsGroup;
      targetRadius = outerRadius;
      break;
    case "outer":  // ❌
      group = outerGroup;
      labelsGroup = outerLabelsGroup;
      targetRadius = innerRadius;
      break;
    case "middle":  // ❌
      group = middleGroup;
      labelsGroup = middleLabelsGroup;
      targetRadius = innerInnerRadius;
      break;
    case "inner":  // ❌
      group = innerGroup;
      labelsGroup = innerLabelsGroup;
      targetRadius = 0;
      break;
  }
  // ... animation code with more switch statements (lines 2096-2112)
}
```

**Problem**: Same as `showCell`
**Solution**: Same as `showCell`

---

#### H6. `hideCell` animation attrTween - Lines 2096-2112
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
.attrTween("d", function(d) {
  const currentData = d;

  return function(t) {
    let arcGen;
    if (ringType === "invisible") {
      const newInnerRadius = d3.interpolate(outerRadius, targetRadius)(t);
      const newOuterRadius = d3.interpolate(styles.radii.invisible, targetRadius)(t);
      arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
    } else if (ringType === "outer") {  // ❌
      const newInnerRadius = d3.interpolate(innerRadius, targetRadius)(t);
      const newOuterRadius = d3.interpolate(outerRadius, targetRadius)(t);
      arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
    } else if (ringType === "middle") {  // ❌
      const newInnerRadius = d3.interpolate(innerInnerRadius, targetRadius)(t);
      const newOuterRadius = d3.interpolate(middleRadius, targetRadius)(t);
      arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
    } else {  // inner  // ❌
      const newInnerRadius = d3.interpolate(0, targetRadius)(t);
      const newOuterRadius = d3.interpolate(centerRadius, targetRadius)(t);
      arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
    }
    return arcGen(currentData);
  };
})
```

**Problem**: Switch on position within animation
**Solution**: Use `getRingRadii()` helper before animation

---

#### H7. `resetBuildState` - Lines 1609-1616
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function resetBuildState(cellVisibility, updateAllRings) {
  animationData = JSON.parse(JSON.stringify(nestedData));
  Object.keys(cellVisibility).forEach(cell => {
    cellVisibility[cell] = { 
      invisible: true, 
      outer: false,   // ❌
      middle: true,   // ❌
      inner: false    // ❌
    };
  });
  initializeAnimationData();
  updateAllRings();
}
```

**Problem**: `cellVisibility` initialized with position keys
**Solution**: Use semantic keys

---

#### H8. `resetToFull` - Lines 1719-1730
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function resetToFull(ctx) {
  ctx.setIsStepMode(false);
  currentStep = 0;
  animationData = {};
  Object.keys(ctx.cellVisibility).forEach(cell => {
    ctx.cellVisibility[cell] = { 
      invisible: true, 
      outer: true,   // ❌
      middle: true,  // ❌
      inner: true    // ❌
    };
  });
  // ...
  ["invisible","outer","middle","inner"].forEach(ringType => {  // ❌
    ctx.nestedData[ringType].forEach(item => {
      const originalItem = ctx.originalNestedData[ringType].find(orig => orig.unitId === item.unitId);
      item.opacity = originalItem ? originalItem.opacity : 1;
    });
  });
  // ...
}
```

**Problem**: 
- `cellVisibility` uses position keys
- Hardcoded position array iteration
- `nestedData` accessed with position keys

**Solution**: Use semantic keys throughout

---

#### H9. Context object groups - Lines 3111-3112
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function stepForward() { 
  return stepMode.stepForward({ 
    getIsStepMode: () => isStepMode, 
    updateAllRings, 
    cellVisibility, 
    focusPair, 
    showCell, 
    hideCell, 
    getCurrentRotationFromDOM, 
    groups: { outerGroup, middleLabelsGroup, innerGroup },  // ❌ Physical groups
    helpers: { calculateTextTransform, wrapText, getTextConstraints }, 
    styles 
  }); 
}
```

**Problem**: Passes physical groups directly to step mode functions
**Solution**: Pass group mapping helper instead

---

### Category I: cellVisibility Data Structure (PERVASIVE)

The `cellVisibility` object is used throughout the codebase and is keyed by position names.

**Structure**:
```javascript
cellVisibility = {
  "A": { invisible: true, outer: true, middle: true, inner: true },
  "B": { invisible: true, outer: false, middle: true, inner: false },
  // ...
}
```

**Should be**:
```javascript
cellVisibility = {
  "A": { invisible: true, positive: true, negative: true, neutral: true },
  "B": { invisible: true, positive: false, negative: true, neutral: false },
  // ...
}
```

**Impact**: This data structure is used in:
- `getCellCentroid` (implicitly via `nestedData` filtering)
- `updateRing` (checking visibility)
- `updateLabels` (checking visibility) 
- `showCell` (setting visibility)
- `hideCell` (setting visibility)
- `resetBuildState` (initializing visibility)
- `resetToFull` (resetting visibility)
- All step mode functions

---

## Radii Mapping Helper

Create a central helper that maps semantic names to radii based on `isWhiteOutside`:

```javascript
function getRingRadii(ringType, isWhiteOutside, radii, styles) {
  // Map semantic names to physical positions
  const positionMap = {
    invisible: 'invisible',
    positive: 'inner',  // Always inner (green doesn't move)
    negative: isWhiteOutside ? 'middle' : 'outer',
    neutral: isWhiteOutside ? 'outer' : 'middle'
  };
  
  const position = positionMap[ringType];
  
  // Return radii for that physical position
  const radiiMap = {
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
      inner: 30,
      outer: radii.centerRadius
    }
  };
  
  return radiiMap[position];
}
```

---

## Physical Group Mapping

Create a helper that determines which physical SVG group should render which semantic content:

```javascript
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

Then `updateAllRings` becomes:

```javascript
function updateAllRings() {
  const dataToUse = getDataToUse();
  const physicalGroups = getPhysicalGroupsForSemantics(isWhiteOutside);
  
  // Semantic to physical mapping
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

## Migration Strategy

### Phase 1: Create Abstraction Layer
1. Create `getRingRadii(ringType, isWhiteOutside)` helper
2. Create `getPhysicalGroupsForSemantics(isWhiteOutside)` helper
3. Test that these work with current code

### Phase 2: Update Data Structure
1. Change `transformToNestedPieData` to return `{invisible, positive, negative, neutral}` keys
2. Remove `[outerKey, middleKey]` hack
3. Update all `dataToUse.outer/middle/inner` to `dataToUse.positive/negative/neutral`

### Phase 3: Update Arrow System
1. Change `parseArrowConnections` to return semantic ringTypes
2. Verify arrows now point to correct locations
3. Test color calculations work with semantic names

### Phase 4: Update Styling
1. Create `styles.opacity.positive/negative/neutral`
2. Create `styles.strokes.positive/negative/neutral`
3. Create `styles.fonts.labels.baseSize.positive/negative/neutral`
4. Update all styling code to use semantic keys

### Phase 5: Update Color Scales
1. Rename `outerColor` → `negativeColor`
2. Rename `middleColor` → `neutralColor`
3. Rename `innerColor` → `positiveColor`

### Phase 6: Clean Up
1. Update comments and documentation
2. Consider renaming physical SVG class names for clarity (optional)
3. Remove any remaining position-based assumptions

---

## Testing Checklist

### Default State (`isWhiteOutside = false`)
- [ ] Positive content renders in innermost physical ring (green)
- [ ] Neutral content renders in middle physical ring (white)
- [ ] Negative content renders in outer physical ring (red)
- [ ] Arrows: `A+` points to innermost, `A` to middle, `A-` to outer
- [ ] Colors: Green for positive, white for neutral, red for negative

### Swapped State (`isWhiteOutside = true`)
- [ ] Positive content STILL in innermost physical ring (green)
- [ ] Neutral content NOW in outermost physical ring (white moved)
- [ ] Negative content NOW in middle physical ring (red moved)
- [ ] Arrows: `A+` points to innermost, `A` to outermost, `A-` to middle
- [ ] Colors: Green for positive, white for neutral, red for negative

### Toggle Test
- [ ] Toggle back and forth multiple times
- [ ] Content follows colors correctly
- [ ] Arrows update positions
- [ ] No visual glitches

---

## Benefits Summary

**Before** (Position-based):
- Data keys: `outer`, `middle`, `inner`
- Arrow parsing: `+` → `inner`, `-` → `outer`
- Bandaid hack swaps keys in one place
- Every other place assumes position = meaning
- Arrows break when toggle changes

**After** (Semantic-based):
- Data keys: `positive`, `negative`, `neutral`
- Arrow parsing: `+` → `positive`, `-` → `negative`
- No hack needed - semantics never change
- Physical mapping determined by helper function
- Arrows automatically work with toggle

**Code Clarity**: 
- `dataToUse.positive` - instantly clear what this is
- `ringType === 'negative'` - obvious semantic meaning
- No mental translation from position to meaning

**Extensibility**:
- Want to add "synthesis" ring? Just add semantic name
- Want different color schemes? Just remap colors
- Want to rearrange rings? Just update mapping function

---

## Estimated Effort

- **Phase 1** (Helpers): 3 hours
- **Phase 2** (Data structure): 3 hours
- **Phase 3** (Arrows): 2 hours
- **Phase 4** (Styling): 2 hours
- **Phase 5** (Colors): 1 hour
- **Phase 6** (Step Mode refactor): 5 hours ⚠️ (Most complex)
  - `cellVisibility` structure change
  - `showCell` / `hideCell` functions
  - `executeStep` cases
  - `animationData` keying
  - Context object updates
- **Phase 7** (Cleanup): 1 hour
- **Testing**: 4 hours (including step mode tests)
- **Total**: ~21 hours

**Most Critical/Complex Areas**:
1. **Step Mode System** (Category H, I) - 9 functions, pervasive data structure changes
2. **Data Structure** (Category A, D) - Core transformation that everything depends on
3. **makeRings / updateAllRings** (Category A3) - Architectural coupling between data and physical groups

---

## Notes

- This is a more fundamental refactor than the polarity mapping approach
- Eliminates the root cause rather than working around it
- Makes the entire codebase more maintainable
- Self-documenting code that's easier for future developers
- Could potentially be done incrementally with backward compatibility layer

---

## Instance Count by Category

| Category | Instances | Complexity | Impact |
|----------|-----------|------------|--------|
| A. Data Structure Lookups | 3 | High | Critical - breaks everything if wrong |
| B. Radii Calculations | 2 | Low | Easy - pure geometry |
| C. Visual Styling | 3 | Low | Minor logic changes |
| D. transformToNestedPieData | 1 | High | Root cause - must fix first |
| E. Arrow Parsing | 1 | Medium | The main bug we're fixing |
| F. SVG Group Creation | 1 | Low | Naming/CSS only |
| G. Color Scales | 1 | Low | Simple rename |
| H. Step Mode / Build Animation | 9 | Very High | Most complex subsystem |
| I. cellVisibility Data Structure | Pervasive | High | Used everywhere |
| **TOTAL** | **21+** | **High** | **Breaking change** |

**Key Dependencies** (must be done in order):
1. Create helper functions (Phase 1)
2. Update `transformToNestedPieData` (Phase 2 - ROOT FIX)
3. Update data structure consumers (Phase 2-3)
4. Update step mode system (Phase 6 - MOST WORK)
5. Test everything (Phase 7)

