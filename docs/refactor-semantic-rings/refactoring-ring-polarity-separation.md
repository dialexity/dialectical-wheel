# Refactoring Plan: Ring Position vs. Polarity Separation

## Problem Statement

The current codebase conflates **ring position** (inner/middle/outer/invisible) with **polarity semantics** (positive/negative/neutral). This creates issues when the `isWhiteOutside` toggle is used to swap the red and white rings, because:

1. **Wheel data structure** (`transformToNestedPieData`) hardcodes positive → `inner` and negative → `outer`
2. **DOT Script parsing** assumes `+` always maps to `inner` and `-` always maps to `outer`
3. **Arrow color calculation** assumes `inner` = positive and `outer` = negative
4. The `isWhiteOutside` toggle only swaps visual colors and outerKey/middleKey, **not the actual data-to-ring mapping**

### Current Assumptions Baked Into Code

```javascript
// 1. In transformToNestedPieData (Line 3909-3948) - THE ROOT PROBLEM
transformToNestedPieData = (dialecticalData, whiteOutside = isWhiteOutside) => {
  const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];
  
  return {
    [outerKey]: units.map(unit => ({
      fullText: dialecticalData[unit].negative,  // ❌ "negative" always goes to outerKey
    })),
    inner: units.map(unit => ({
      fullText: dialecticalData[unit].positive,  // ❌ "positive" ALWAYS goes to inner ring!
    }))
  }
}
// ❌ PROBLEM: When whiteOutside=true, outerKey becomes 'middle', but:
//    - positive STILL goes to inner (should go to outer!)
//    - negative goes to 'middle' instead of 'outer' (totally wrong!)

// 2. In parseArrowConnections (Line 3677-3682)
if (unit.endsWith('+')) {
  return { unitId, ringType: 'inner' };  // ❌ Hardcoded: + → inner
}
if (unit.endsWith('-')) {
  return { unitId, ringType: 'outer' };  // ❌ Hardcoded: - → outer
}

// 3. In calculateArrowColor (Line 4173-4179)
if ((fromRing === 'inner' && toRing === 'inner') || ...) {
  color = "#16a34a"; // ❌ Assumes: inner-to-inner = same polarity
}
if ((fromRing === 'inner' && toRing === 'outer') || ...) {
  color = "#dc2626"; // ❌ Assumes: inner-to-outer = opposite polarity
}
```

**The Core Issue**: `transformToNestedPieData` has a hack with `[outerKey, middleKey]` swap, but it NEVER touches the `inner` ring! This means:
- When `whiteOutside=true`, `negative` goes to `middle` ring (wrong!)
- `positive` ALWAYS goes to `inner` ring (wrong when swapped!)
- The entire wheel structure doesn't actually swap, just the colors do!

---

## Proposed Solution: Polarity Layer

Introduce a **polarity layer** that separates semantic meaning from physical ring position.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  USER INPUT LAYER                                        │
│  - DOT Script: "A+ -> B-"  (semantic: positive/negative)│
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  POLARITY MAPPING LAYER (NEW)                           │
│  - Maps polarity symbols to ring positions              │
│  - Respects isWhiteOutside toggle                       │
│  - { '+': getRingForPositive(), '-': getRingForNegative() }
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  CONNECTION LAYER                                        │
│  - Connections store BOTH polarity AND ring position    │
│  - { from, to, fromPolarity, toPolarity, fromRing, toRing }
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  RENDERING LAYER                                         │
│  - Calculates colors based on POLARITY, not ring        │
│  - Draws arrows at physical ring POSITION               │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 0: Fix `transformToNestedPieData` (CRITICAL!)

**This is the root cause!** The wheel data structure itself needs to respect the polarity mapping.

**Current** (Lines 3909-3949):
```javascript
transformToNestedPieData = (dialecticalData, whiteOutside = isWhiteOutside) => {
  const units = Object.keys(dialecticalData);
  const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];

  return {
    invisible: units.map(...),
    [outerKey]: units.map(unit => ({
      name: `${unit}-`,
      fullText: dialecticalData[unit].negative,  // ❌ Wrong!
    })),
    [middleKey]: units.map(unit => ({
      name: unit,
      fullText: dialecticalData[unit].statement,
    })),
    inner: units.map(unit => ({
      name: `${unit}+`,
      fullText: dialecticalData[unit].positive,  // ❌ Wrong!
    }))
  }
}
```

**Problems**:
1. When `whiteOutside=true`:
   - `outerKey` becomes `'middle'`, so negative text goes to MIDDLE ring (should go to INNER!)
   - `inner` is hardcoded, so positive text STILL goes to INNER ring (should go to OUTER!)
2. The hack only swaps the keys between `outer` and `middle`, leaving `inner` untouched
3. This means the wheel never actually structurally swaps

**Refactored**:
```javascript
transformToNestedPieData = (dialecticalData, polarityMapping) => {
  const units = Object.keys(dialecticalData);
  
  // Use polarity mapping to determine which ring gets which content
  const positiveRing = polarityMapping.polarityToRing.positive;  // 'inner' or 'outer'
  const negativeRing = polarityMapping.polarityToRing.negative;  // 'outer' or 'inner'
  const neutralRing = polarityMapping.polarityToRing.neutral;    // always 'middle'
  const invisibleRing = 'invisible';                              // always 'invisible'

  return {
    [invisibleRing]: units.map((unit, index) => ({
      name: `${unit}i`,
      unitId: unit,
      polarity: 'invisible',
      value: 1,
      opacity: 1,
      fullText: `${unit}`,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    [negativeRing]: units.map(unit => ({
      name: `${unit}-`,
      unitId: unit,
      polarity: 'negative',
      value: whitesOnly ? 0 : 1,
      opacity: whitesOnly ? 0 : 1,
      fullText: dialecticalData[unit].negative,  // ✅ Correctly placed based on polarity
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    [neutralRing]: units.map(unit => ({
      name: unit,
      unitId: unit,
      polarity: 'neutral',
      value: 1,
      opacity: 1,
      fullText: dialecticalData[unit].statement,
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    })),
    [positiveRing]: units.map(unit => ({
      name: `${unit}+`,
      unitId: unit,
      polarity: 'positive',
      value: whitesOnly ? 0 : 1,
      opacity: whitesOnly ? 0 : 1,
      fullText: dialecticalData[unit].positive,  // ✅ Correctly placed based on polarity
      pairWith: dialecticalData[unit].pairWith,
      pairId: dialecticalData[unit].pairId
    }))
  };
}
```

**Key Changes**:
1. Use `polarityMapping` to determine which physical ring gets each polarity
2. Add `polarity` field to each data point for tracking
3. No more hardcoded `inner`/`outer` assignments
4. No more `[outerKey, middleKey]` hack
5. When `isWhiteOutside` changes, `polarityMapping` updates, and the entire structure rebuilds correctly

**Dependencies**: Must be done AFTER Phase 1 (polarityMapping creation)

---

### Phase 1: Create Polarity Mapping Module

**File**: New cell `polarityMapping`

```javascript
polarityMapping = (isWhiteOutside) => {
  // Maps polarity symbols to their corresponding ring positions
  const mapping = {
    positive: 'inner',  // Always inner (green never moves)
    negative: isWhiteOutside ? 'middle' : 'outer',  // Red moves: outer → middle
    neutral: isWhiteOutside ? 'outer' : 'middle',   // White moves: middle → outer
    invisible: 'invisible'
  };
  
  // Reverse mapping: ring → polarity
  const ringToPolarity = {
    inner: 'positive',  // Inner always has positive (green)
    outer: isWhiteOutside ? 'neutral' : 'negative',  // Outer has neutral when swapped, negative by default
    middle: isWhiteOutside ? 'negative' : 'neutral', // Middle has negative when swapped, neutral by default
    invisible: 'invisible'
  };
  
  return {
    polarityToRing: mapping,
    ringToPolarity: ringToPolarity,
    
    // Helper: Get ring for polarity symbol
    getRingFor(symbol) {
      const polarityMap = {
        '+': 'positive',
        '-': 'negative',
        '': 'neutral',
        'i': 'invisible'
      };
      return mapping[polarityMap[symbol]];
    },
    
    // Helper: Get polarity from ring
    getPolarityOf(ring) {
      return ringToPolarity[ring];
    }
  };
};
```

**Dependencies**: `isWhiteOutside`  
**Used by**: `parseArrowConnections`, `calculateArrowColor`

---

### Phase 2: Update Connection Data Structure

**Current Structure**:
```javascript
{
  from: "A",
  to: "B",
  fromRing: "inner",
  toRing: "outer"
}
```

**New Structure**:
```javascript
{
  from: "A",
  to: "B",
  fromPolarity: "positive",    // NEW: semantic meaning
  toPolarity: "negative",      // NEW: semantic meaning
  fromRing: "inner",           // Physical position (derived from polarity + isWhiteOutside)
  toRing: "outer"              // Physical position (derived from polarity + isWhiteOutside)
}
```

---

### Phase 3: Refactor `parseArrowConnections`

**Current** (Lines 3663-3706):
```javascript
parseArrowConnections = (dotScript, dialecticalData) => {
  // ...
  const parseUnit = (unit) => {
    if (unit.endsWith('+')) {
      return { unitId, ringType: 'inner' };  // ❌ Hardcoded
    }
    // ...
  };
  // ...
  connections.push({ 
    from: fromParsed.unitId, 
    to: toParsed.unitId,
    fromRing: fromParsed.ringType,
    toRing: toParsed.ringType
  });
};
```

**Refactored**:
```javascript
parseArrowConnections = (dotScript, dialecticalData, polarityMapping) => {
  const connections = [];
  const lines = dotScript.split('\n');

  for (let line of lines) {
    line = line.split('//')[0].trim();
    if (!line) continue;

    const match = line.match(/(\w+[+-i]?)\s*->\s*(\w+[+-i]?)/);
    if (match) {
      const [, from, to] = match;

      const parseUnit = (unit) => {
        let unitId, polaritySymbol, polarity, ring;
        
        if (unit.endsWith('+')) {
          unitId = unit.slice(0, -1);
          polaritySymbol = '+';
          polarity = 'positive';
        } else if (unit.endsWith('-')) {
          unitId = unit.slice(0, -1);
          polaritySymbol = '-';
          polarity = 'negative';
        } else if (unit.endsWith('i')) {
          unitId = unit.slice(0, -1);
          polaritySymbol = 'i';
          polarity = 'invisible';
        } else {
          unitId = unit;
          polaritySymbol = '';
          polarity = 'neutral';
        }
        
        if (!dialecticalData[unitId]) return null;
        
        // Get physical ring from polarity using mapping
        ring = polarityMapping.getRingFor(polaritySymbol);
        
        return { unitId, polarity, ring };
      };

      const fromParsed = parseUnit(from);
      const toParsed = parseUnit(to);

      if (fromParsed && toParsed) {
        connections.push({ 
          from: fromParsed.unitId, 
          to: toParsed.unitId,
          fromPolarity: fromParsed.polarity,    // NEW
          toPolarity: toParsed.polarity,        // NEW
          fromRing: fromParsed.ring,
          toRing: toParsed.ring
        });
      }
    }
  }

  return connections;
};
```

**Changes Required**:
- Add `polarityMapping` parameter
- Parse polarity separately from ring position
- Store both polarity and ring in connection object
- Update all callsites (5 locations)

---

### Phase 4: Refactor `calculateArrowColor`

**Current** (Lines 4167-4197):
```javascript
function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
  let color = "#666";
  
  if (fromRing !== 'middle' || toRing !== 'middle') {
    if ((fromRing === 'inner' && toRing === 'inner') || ...) {
      color = "#16a34a"; // ❌ Assumes inner = positive
    }
    if ((fromRing === 'inner' && toRing === 'outer') || ...) {
      color = "#dc2626"; // ❌ Assumes opposite polarity
    }
    // ...
  }
  // ...
}
```

**Refactored**:
```javascript
function calculateArrowColor(fromPolarity, toPolarity, fromUnitId, toUnitId) {
  let color = "#666"; // Default gray
  
  // Check if it's a polarity-specific connection
  if (fromPolarity !== 'neutral' || toPolarity !== 'neutral') {
    // Same polarity connections
    if (fromPolarity === toPolarity) {
      if (fromPolarity === 'invisible') {
        color = "#16a34a"; // Green for same invisible
      } else {
        color = "#16a34a"; // Green for same polarity (+ to + or - to -)
      }
    }
    // Opposite polarity connections
    else if (
      (fromPolarity === 'positive' && toPolarity === 'negative') ||
      (fromPolarity === 'negative' && toPolarity === 'positive')
    ) {
      color = "#dc2626"; // Red for opposite polarity
    }
    // Invisible connections
    else if (fromPolarity === 'invisible' || toPolarity === 'invisible') {
      color = "#ff9500"; // Orange for invisible connections
    }
    // Mixed neutral-polarity connections
    else {
      color = "#8b5cf6"; // Purple for statement to +/- connections
    }
  } else {
    // Neutral-level (statement) connections
    const fromIsThesis = isThesisType(fromUnitId);
    const toIsThesis = isThesisType(toUnitId);
    if (fromIsThesis === toIsThesis) {
      color = "#2563eb"; // Blue for same type
    } else {
      color = "#dc2626"; // Red for opposition
    }
  }
  
  return color;
}
```

**Changes Required**:
- Change parameters from `(fromRing, toRing, ...)` to `(fromPolarity, toPolarity, ...)`
- Update logic to check polarity instead of ring position
- Update all callsites (3 locations in arrowUtilities, 2 in arrowControls)

---

### Phase 5: Update All Arrow Drawing Callsites

#### Locations to Update:

1. **`arrowControls.drawArrowsUpToStep`** (Lines 289-325)
   - Pass `conn.fromPolarity, conn.toPolarity` instead of `conn.fromRing, conn.toRing`

2. **`arrowControls.drawNextArrow`** (Lines 327-363)
   - Pass polarity to color calculation

3. **`arrowUtilities.calculateArrowColor` calls** (Line 871)
   ```javascript
   const color = arrowUtilities.calculateArrowColor(
     conn.fromPolarity, conn.toPolarity,  // Use polarity
     conn.from, conn.to
   );
   ```

4. **`drawAllArrows`** (Lines 2969-2987)
   - Update `parseArrowConnections(arrowConnections, dialecticalData, polarityMapping)`

5. **`drawFlow`** (Lines 2989-3028)
   - Update `parseArrowConnections(flowConnections, dialecticalData, polarityMapping)`

6. **DOT Script Editor** (Line 3753)
   - Update custom arrow parsing

---

### Phase 6: Add Reactive Redraw on `isWhiteOutside` Change

**File**: Add back cell `1211` (was removed in user's changes)

```javascript
// Cell 1211: Redraw arrows when ring swap changes
{
  if (typeof viewof chart !== 'undefined' && viewof chart.drawAllArrows) {
    viewof chart.drawAllArrows();
  }
  if (typeof viewof chart !== 'undefined' && viewof chart.redrawFlowArrows && showFlow) {
    viewof chart.redrawFlowArrows();
  }
  return isWhiteOutside;
}
```

This ensures arrows are redrawn with correct ring positions when the toggle changes.

---

## Migration Checklist

### Step 0: Create Infrastructure (FIRST!)
- [ ] Create `polarityMapping` cell/module
- [ ] Test mapping functions with both `isWhiteOutside` states

### Step 1: Fix Wheel Data Structure (CRITICAL!)
- [ ] Refactor `transformToNestedPieData` to use polarity mapping
- [ ] Add `polarity` field to all data points
- [ ] Remove `[outerKey, middleKey]` hack
- [ ] Test wheel rebuilds correctly when `isWhiteOutside` toggles
- [ ] Verify positive/negative content appears in correct rings

### Step 2: Update Arrow Data Layer
- [ ] Refactor `parseArrowConnections` signature
- [ ] Update connection object structure
- [ ] Add backward compatibility for old connection objects

### Step 3: Update Arrow Rendering Layer
- [ ] Refactor `calculateArrowColor` to use polarity
- [ ] Update `arrowUtilities` module
- [ ] Update `arrowControls` module

### Step 4: Update All Callsites
- [ ] Update `transformToNestedPieData` call in chart (line 1989)
- [ ] Find all calls to `parseArrowConnections` (5 locations)
- [ ] Find all calls to `calculateArrowColor` (5 locations)
- [ ] Update each to pass polarity mapping

### Step 5: Testing
- [ ] Test with `isWhiteOutside = false` (default)
  - [ ] Verify positive text in inner ring (green)
  - [ ] Verify neutral/statement text in middle ring (white)
  - [ ] Verify negative text in outer ring (red)
- [ ] Test with `isWhiteOutside = true` (swapped)
  - [ ] Verify positive text STILL in inner ring (green - doesn't move)
  - [ ] Verify neutral/statement text in outer ring (white - moved out)
  - [ ] Verify negative text in middle ring (red - moved in)
- [ ] Verify arrow colors change correctly
- [ ] Verify DOT script parsing respects swap
- [ ] Test all arrow types: +/+, -/-, +/-, neutral, invisible

### Step 6: Documentation
- [ ] Update DOT script syntax documentation
- [ ] Update arrow color legend
- [ ] Add comments explaining polarity vs ring separation
- [ ] Document the wheel data structure changes

---

## Benefits of This Refactor

1. **Correctness**: Arrow semantics now respect the `isWhiteOutside` toggle
2. **Maintainability**: Clear separation between semantic (polarity) and physical (ring position)
3. **Flexibility**: Easy to add new polarity types or ring configurations
4. **Clarity**: Code explicitly shows when using semantic vs physical properties
5. **Testability**: Polarity mapping can be tested independently

---

## Backward Compatibility

To support existing code that may not have polarity information:

```javascript
// In connection processing
const fromPolarity = conn.fromPolarity || polarityMapping.getPolarityOf(conn.fromRing);
const toPolarity = conn.toPolarity || polarityMapping.getPolarityOf(conn.toRing);
```

This allows gradual migration and ensures old connection objects still work.

---

## Example Usage After Refactor

```javascript
// User toggles "Swap red and white layer"
isWhiteOutside = true;

// Polarity mapping updates
polarityMapping.polarityToRing.positive → 'outer' (was 'inner')
polarityMapping.polarityToRing.negative → 'inner' (was 'outer')

// DOT Script: "A+ -> B-"
parseArrowConnections("A+ -> B-", data, polarityMapping)
// Returns:
{
  from: "A", to: "B",
  fromPolarity: "positive",  // Semantic meaning preserved
  toPolarity: "negative",    // Semantic meaning preserved
  fromRing: "outer",         // Physical position SWAPPED ✅
  toRing: "inner"            // Physical position SWAPPED ✅
}

// Color calculation
calculateArrowColor("positive", "negative", "A", "B")
// Returns: "#dc2626" (red - opposite polarity) ✅
// Previously would have been wrong because inner/outer were hardcoded
```

---

## Files to Modify

1. `/notebook-src/dialectical-wheel-4.html`
   - Add `polarityMapping` cell (new) - **PRIORITY 1**
   - Update `transformToNestedPieData` (line 3909) - **PRIORITY 2** (fixes wheel structure!)
   - Update `parseArrowConnections` (line 3663)
   - Update `arrowUtilities.calculateArrowColor` (line 4167)
   - Update `arrowControls.drawArrowsUpToStep` (line 289)
   - Update `arrowControls.drawNextArrow` (line 327)
   - Update `drawAllArrows` (line 2969)
   - Update `drawFlow` (line 2989)
   - Update DOT script editor (line 3709)
   - Update `chart` to call `transformToNestedPieData` with polarityMapping (line 1989)
   - Re-add reactive cell for `isWhiteOutside` (line 1211)

2. `/notebook-src/dialectical-wheel-4.js`
   - Mirror all changes from HTML file

---

## Estimated Effort

- **Phase 0** (Infrastructure): ~1 hour
- **Phase 1** (Wheel data structure - CRITICAL): ~2 hours
- **Phase 2** (Arrow data layer): ~1 hour
- **Phase 3** (Arrow rendering): ~1 hour
- **Phase 4** (Update callsites): ~2 hours
- **Phase 5** (Testing & fixes): ~3 hours
- **Total**: ~10 hours (up from 6 due to wheel structure refactoring)

---

## Notes

- The refactor maintains the existing DOT script syntax (`+`, `-`, `i`)
- Visual appearance is unchanged, only semantic correctness improves
- Can be done incrementally with backward compatibility layer
- Consider adding unit tests for polarity mapping

