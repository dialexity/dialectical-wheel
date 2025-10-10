# Polarity Conflation Audit

## Complete List of Code Locations Where Ring Position is Conflated with Semantic Meaning

This document catalogs **every location** in the codebase where ring positions (`inner`, `middle`, `outer`) are assumed to have semantic meaning (positive, neutral, negative) instead of being treated as physical positions.

---

## Category 1: DOT Script Parsing

### 1.1 `parseArrowConnections` - Line 3663
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

**Problem**: 
- `+` always maps to `inner` (should respect `isWhiteOutside`)
- `-` always maps to `outer` (should map to `middle` when swapped)
- No suffix always maps to `middle` (should map to `outer` when swapped)

**Impact**: Arrows point to wrong rings when `isWhiteOutside = true`

---

## Category 2: Arrow Color Calculation

### 2.1 `calculateArrowColor` in `arrowUtilities` - Line 4267
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
  let color = "#666";
  
  if (fromRing !== 'middle' || toRing !== 'middle') {
    if ((fromRing === 'inner' && toRing === 'inner') || 
        (fromRing === 'outer' && toRing === 'outer') ||
        (fromRing === 'invisible' && toRing === 'invisible')) {
      color = "#16a34a"; // ❌ Assumes: inner=positive, outer=negative
    } else if ((fromRing === 'inner' && toRing === 'outer') || 
               (fromRing === 'outer' && toRing === 'inner')) {
      color = "#dc2626"; // ❌ Assumes: inner↔outer = opposite polarity
    } else if (fromRing === 'invisible' || toRing === 'invisible') {
      color = "#ff9500";
    } else {
      color = "#8b5cf6"; // ❌ Assumes: middle↔inner/outer = mixed
    }
  }
  // ... thesis/antithesis logic
}
```

**Problem**:
- Assumes `inner` = positive polarity
- Assumes `outer` = negative polarity
- Assumes `middle` = neutral
- When `isWhiteOutside = true`, these assumptions break

**Impact**: Arrow colors don't reflect actual semantic relationships

---

## Category 3: Arrow Controls - Step-by-Step Drawing

### 3.1 `drawArrowsUpToStep` - Line 289
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function drawArrowsUpToStep(step) {
  for (let i = 0; i < Math.min(step, parsedArrowConnections.length); i++) {
    const conn = parsedArrowConnections[i];
    
    let color = "#666";
    if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
      if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
          (conn.fromRing === 'outer' && conn.toRing === 'outer') ||
          (conn.fromRing === 'invisible' && conn.toRing === 'invisible')) {
        color = "#16a34a"; // ❌ Same assumption as calculateArrowColor
      } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                 (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
        color = "#dc2626"; // ❌ Same assumption
      }
      // ...
    }
  }
}
```

**Problem**: Duplicate color logic with same hardcoded assumptions

**Impact**: Step-by-step arrow animation uses wrong colors when swapped

---

### 3.2 `drawNextArrow` - Line 327
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
function drawNextArrow() {
  const conn = parsedArrowConnections[currentArrowStep];
  
  let color = "#666";
  if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
    if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
        (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
      color = "#16a34a"; // ❌ Same assumption
    } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
               (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
      color = "#dc2626"; // ❌ Same assumption
    }
    // ...
  }
}
```

**Problem**: Another duplicate of the same hardcoded logic

**Impact**: Individual arrow drawing uses wrong colors

---

## Category 4: Documentation & Comments

### 4.1 Comments in `calculateArrowColor` - Line 4176
```javascript
color = "#16a34a"; // Green for same polarity (+ to + or - to - or i to i)
```

**Problem**: Comment conflates ring position with polarity

---

### 4.2 Comments in `calculateArrowColor` - Line 4179
```javascript
color = "#dc2626"; // Red for opposite polarity (+ to - or - to +)
```

**Problem**: Comment assumes `+` is always inner and `-` is always outer

---

### 4.3 DOT Script Editor Help Text - Line 3722
```javascript
<strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>
```

**Problem**: Documentation says `+` = positives and `-` = negatives, but doesn't mention these map to physical rings that can swap

---

## Category 5: Wheel Data Structure (Has Bandaid Hack)

### 5.1 `transformToNestedPieData` - Line 3909
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
transformToNestedPieData = (dialecticalData, whiteOutside = isWhiteOutside, whiteOnly = whitesOnly) => {
  const units = Object.keys(dialecticalData);
  const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];
  
  return {
    invisible: units.map((unit,index)=> ({
      name: `${unit}i`,
      unitId: unit,
      value: 1,
      opacity: 1,
      fullText: `${unit}`,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    [outerKey]: units.map(unit => ({
      name: `${unit}-`,  // ❌ Name assumes - = outer
      unitId: unit,
      value: whiteOnly ? 0: 1,
      opacity: whiteOnly ? 0: 1,
      fullText: dialecticalData[unit].negative,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    [middleKey]: units.map(unit => ({
      name: unit,
      unitId: unit,
      value: 1,
      opacity: 1,
      fullText: dialecticalData[unit].statement,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    inner: units.map(unit => ({
      name: `${unit}+`,  // ❌ Name assumes + = inner
      unitId: unit,
      value: whiteOnly ? 0: 1,
      opacity: whiteOnly ? 0: 1,
      fullText: dialecticalData[unit].positive,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    }))
  }
}
```

**Status**: ✅ Has bandaid hack that works via `[outerKey, middleKey]`

**Problem**: 
- Names still use `+` and `-` suffixes that imply fixed ring positions
- Hack is not extensible or maintainable
- Other code can't easily determine which ring has which content

**Impact**: Works for wheel display, but creates confusion for arrow system

---

## Category 6: Axis Module (Potential Issues)

### 6.1 Axis Symbol Positioning
**File**: `notebook-src/dialectical-wheel-4.html` (around line 2018-2026)

```javascript
const ringRadii = [
  centerRadius,    // Inner ring center
  middleRadius,    // Middle ring center
  outerRadius      // Outer ring center
];

const axisColors = [
  styles.colors.text.inner,   // ❌ May assume inner = positive
  styles.colors.text.middle,  // ❌ May assume middle = neutral
  styles.colors.text.outer    // ❌ May assume outer = negative
];
```

**Problem**: Axis colors may be tied to ring positions rather than content

**Impact**: Axis symbols may show wrong colors when swapped (needs verification)

---

## Category 7: Color Scales

### 7.1 Ring Color Assignment - Line 530
**File**: `notebook-src/dialectical-wheel-4.html`

```javascript
ringColors = isWhiteOutside
  ? { outer: userRingColors.middle, middle: userRingColors.outer, inner: userRingColors.inner }
  : { outer: userRingColors.outer, middle: userRingColors.middle, inner: userRingColors.inner }
```

**Status**: ✅ This correctly swaps colors

**Note**: This is part of the working bandaid hack

---

### 7.2 User Ring Colors - Line 512
```javascript
userRingColors = ({
  outer: "#F9C6CC",    // Outer ring background color (red/pink)
  middle: "#ffffff",   // Middle ring background color (white)
  inner: "#C6E5B3"     // Inner ring background color (green)
})
```

**Status**: ✅ These are just color definitions, not assumptions

---

## Category 8: Implicit Assumptions in Variable Names

### 8.1 Throughout Codebase
Many variable names imply semantic meaning:
- `outerColor` / `innerColor` - Imply outer=negative, inner=positive
- Ring-specific label groups: `outerLabelsGroup`, `innerLabelsGroup`
- These are physical positions but names suggest semantic roles

**Problem**: Makes code harder to reason about when meanings swap

---

## Summary by Priority

### 🔴 Critical (Breaks Functionality)
1. **`parseArrowConnections`** (Line 3663) - Arrows point to wrong rings
2. **`calculateArrowColor`** (Line 4267) - Arrow colors wrong
3. **`drawArrowsUpToStep`** (Line 289) - Step animation colors wrong
4. **`drawNextArrow`** (Line 327) - Individual arrow colors wrong

### 🟡 Important (Maintainability)
5. **`transformToNestedPieData`** (Line 3909) - Bandaid hack needs replacement
6. **Comments and documentation** - Misleading explanations
7. **Variable naming** - Implies semantic meaning

### 🟢 Low Priority (Verification Needed)
8. **Axis module** - May have color assumptions (needs testing)

---

## Refactoring Strategy

### Phase 1: Create Shared Abstraction
Create `polarityMapping` module that both wheel and arrows use:
```javascript
polarityMapping = (isWhiteOutside) => ({
  polarityToRing: {
    positive: 'inner',
    negative: isWhiteOutside ? 'middle' : 'outer',
    neutral: isWhiteOutside ? 'outer' : 'middle',
    invisible: 'invisible'
  },
  ringToPolarity: {
    inner: 'positive',
    outer: isWhiteOutside ? 'neutral' : 'negative',
    middle: isWhiteOutside ? 'negative' : 'neutral',
    invisible: 'invisible'
  }
})
```

### Phase 2: Update All Critical Locations
1. `parseArrowConnections` - Use `polarityMapping.polarityToRing`
2. `calculateArrowColor` - Use polarity instead of ring
3. `drawArrowsUpToStep` - Use `calculateArrowColor` (DRY)
4. `drawNextArrow` - Use `calculateArrowColor` (DRY)

### Phase 3: Replace Bandaid Hack
5. `transformToNestedPieData` - Use `polarityMapping` instead of `[outerKey, middleKey]`

### Phase 4: Clean Up
6. Update comments and documentation
7. Consider renaming variables for clarity

---

## Testing Checklist

After refactoring, verify:

- [ ] **Default state** (`isWhiteOutside = false`)
  - [ ] Wheel: positive in inner (green), neutral in middle (white), negative in outer (red)
  - [ ] Arrows: `A+` points to inner, `A` to middle, `A-` to outer
  - [ ] Colors: `A+ -> B+` is green, `A+ -> B-` is red

- [ ] **Swapped state** (`isWhiteOutside = true`)
  - [ ] Wheel: positive in inner (green), negative in middle (red), neutral in outer (white)
  - [ ] Arrows: `A+` points to inner, `A-` to middle, `A` to outer
  - [ ] Colors: `A+ -> B+` is green, `A- -> B-` is green, `A+ -> B-` is red

- [ ] **Toggle back and forth**
  - [ ] Content follows colors correctly
  - [ ] Arrows update to new positions
  - [ ] Colors remain semantically correct

---

## Estimated Effort

- **Phase 1**: 1 hour (create abstraction)
- **Phase 2**: 3 hours (update 4 critical locations + testing)
- **Phase 3**: 2 hours (replace bandaid hack)
- **Phase 4**: 1 hour (cleanup)
- **Total**: ~7 hours

---

## Notes

- The bandaid hack in `transformToNestedPieData` actually works correctly for the wheel
- The real bug is that arrows don't use this hack - they have their own hardcoded assumptions
- The solution is to create a shared abstraction that replaces the hack and fixes the arrows
- This is a **separation of concerns** issue: physical position vs semantic meaning

