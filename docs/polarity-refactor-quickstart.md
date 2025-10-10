# Polarity Refactor: Quick Implementation Guide

## TL;DR

The DOT script parser hardcodes `+` to `inner` and `-` to `outer`, but when `isWhiteOutside` toggles, these should swap. We need a polarity layer that separates semantic meaning from physical position.

---

## Implementation in 3 Steps

### Step 1: Add Polarity Mapping (5 min)

Add this new cell after line 508 (after `isWhiteOutside` definition):

```javascript
// Cell: polarityMapping
polarityMapping = {
  // Get ring position for a polarity symbol
  getRingFor(symbol, isWhiteOutside) {
    const polarityToRing = {
      '+': isWhiteOutside ? 'outer' : 'inner',
      '-': isWhiteOutside ? 'inner' : 'outer',
      '': 'middle',
      'i': 'invisible'
    };
    return polarityToRing[symbol];
  },
  
  // Get polarity from ring position
  getPolarityFrom(ring, isWhiteOutside) {
    const ringToPolarity = {
      'inner': isWhiteOutside ? 'negative' : 'positive',
      'outer': isWhiteOutside ? 'positive' : 'negative',
      'middle': 'neutral',
      'invisible': 'invisible'
    };
    return ringToPolarity[ring];
  },
  
  // Get semantic polarity name from symbol
  getPolarity(symbol) {
    const map = {
      '+': 'positive',
      '-': 'negative',
      '': 'neutral',
      'i': 'invisible'
    };
    return map[symbol];
  }
};
```

### Step 2: Update `parseArrowConnections` (10 min)

**Location**: Line 3663

**Change signature** from:
```javascript
parseArrowConnections = (dotScript, dialecticalData) => {
```

**To**:
```javascript
parseArrowConnections = (dotScript, dialecticalData, isWhiteOutside) => {
```

**Update the `parseUnit` function** (lines 3676-3689) from:
```javascript
const parseUnit = (unit) => {
  if (unit.endsWith('+')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'inner' } : null;
  } else if (unit.endsWith('-')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'outer' } : null;
  } else if (unit.endsWith('i')) {
    const unitId = unit.slice(0, -1);
    return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
  } else {
    return dialecticalData[unit] ? { unitId: unit, ringType: 'middle' } : null;
  }
};
```

**To**:
```javascript
const parseUnit = (unit) => {
  let unitId, symbol, polarity, ring;
  
  if (unit.endsWith('+')) {
    unitId = unit.slice(0, -1);
    symbol = '+';
  } else if (unit.endsWith('-')) {
    unitId = unit.slice(0, -1);
    symbol = '-';
  } else if (unit.endsWith('i')) {
    unitId = unit.slice(0, -1);
    symbol = 'i';
  } else {
    unitId = unit;
    symbol = '';
  }
  
  if (!dialecticalData[unitId]) return null;
  
  polarity = polarityMapping.getPolarity(symbol);
  ring = polarityMapping.getRingFor(symbol, isWhiteOutside);
  
  return { unitId, polarity, ring };
};
```

**Update connection object** (lines 3694-3700) from:
```javascript
connections.push({ 
  from: fromParsed.unitId, 
  to: toParsed.unitId,
  fromRing: fromParsed.ringType,
  toRing: toParsed.ringType
});
```

**To**:
```javascript
connections.push({ 
  from: fromParsed.unitId, 
  to: toParsed.unitId,
  fromPolarity: fromParsed.polarity,
  toPolarity: toParsed.polarity,
  fromRing: fromParsed.ring,
  toRing: toParsed.ring
});
```

### Step 3: Update `calculateArrowColor` (10 min)

**Location**: Line 4267 (in `arrowUtilities`)

**Change signature** from:
```javascript
function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
```

**To**:
```javascript
function calculateArrowColor(fromPolarity, toPolarity, fromUnitId, toUnitId) {
```

**Update the logic** (lines 4270-4285) from:
```javascript
if (fromRing !== 'middle' || toRing !== 'middle') {
  if ((fromRing === 'inner' && toRing === 'inner') || 
      (fromRing === 'outer' && toRing === 'outer') ||
      (fromRing === 'invisible' && toRing === 'invisible')) {
    color = "#16a34a"; // Green for same polarity
  } else if ((fromRing === 'inner' && toRing === 'outer') || 
             (fromRing === 'outer' && toRing === 'inner')) {
    color = "#dc2626"; // Red for opposite polarity
  } else if (fromRing === 'invisible' || toRing === 'invisible') {
    color = "#ff9500"; // Orange for invisible ring connections
  } else {
    color = "#8b5cf6"; // Purple for mixed connections
  }
}
```

**To**:
```javascript
if (fromPolarity !== 'neutral' || toPolarity !== 'neutral') {
  if (fromPolarity === toPolarity) {
    color = "#16a34a"; // Green for same polarity
  } else if ((fromPolarity === 'positive' && toPolarity === 'negative') || 
             (fromPolarity === 'negative' && toPolarity === 'positive')) {
    color = "#dc2626"; // Red for opposite polarity
  } else if (fromPolarity === 'invisible' || toPolarity === 'invisible') {
    color = "#ff9500"; // Orange for invisible ring connections
  } else {
    color = "#8b5cf6"; // Purple for mixed connections
  }
}
```

---

## Step 4: Update All Callsites (15 min)

### 4.1 Update `parseArrowConnections` calls

Find and replace these 5 locations:

#### Location 1: Line 239 (arrowControls)
```javascript
// OLD
parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData);

// NEW
parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData, isWhiteOutside);
```

#### Location 2: Line 2978 (drawAllArrows)
```javascript
// OLD
const connections = parseArrowConnections(arrowConnections, dialecticalData);

// NEW
const connections = parseArrowConnections(arrowConnections, dialecticalData, isWhiteOutside);
```

#### Location 3: Line 2998 (drawFlow)
```javascript
// OLD
const connections = parseArrowConnections(flowConnections, dialecticalData);

// NEW
const connections = parseArrowConnections(flowConnections, dialecticalData, isWhiteOutside);
```

#### Location 4: Line 3753 (dotScriptEditor)
```javascript
// OLD
const connections = parseArrowConnections(customConnections, dialecticalData);

// NEW
const connections = parseArrowConnections(customConnections, dialecticalData, isWhiteOutside);
```

#### Location 5: Line 378 (arrowControls - updateArrowConnections)
```javascript
// OLD
parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData);

// NEW
parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData, isWhiteOutside);
```

### 4.2 Update `calculateArrowColor` calls

Find and replace these 3 locations:

#### Location 1: Line 871 (makeArrowsModule - drawLabelLinks)
```javascript
// OLD
const color = arrowUtilities.calculateArrowColor(fromRing, toRing, conn.from, conn.to);

// NEW
const color = arrowUtilities.calculateArrowColor(conn.fromPolarity, conn.toPolarity, conn.from, conn.to);
```

#### Location 2: Lines 296-319 (arrowControls - drawArrowsUpToStep)
Replace the color calculation logic:
```javascript
// OLD
let color = "#666";
if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
  if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
      (conn.fromRing === 'outer' && conn.toRing === 'outer') ||
      (conn.fromRing === 'invisible' && conn.toRing === 'invisible')) {
    color = "#16a34a";
  } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
             (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
    color = "#dc2626";
  } // ... etc
}

// NEW
const color = arrowUtilities.calculateArrowColor(
  conn.fromPolarity, conn.toPolarity, conn.from, conn.to
);
```

#### Location 3: Lines 332-352 (arrowControls - drawNextArrow)
Same replacement as above.

---

## Step 5: Re-add Reactive Cell (2 min)

**Location**: After line 509 (after `isWhiteOutside` definition)

Add this cell back (it was removed):

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

---

## Testing Checklist

After making all changes, test these scenarios:

### Test 1: Default State (isWhiteOutside = false)
- [ ] Create arrow: `A+ -> B+` → Should be GREEN (same polarity)
- [ ] Create arrow: `A+ -> B-` → Should be RED (opposite polarity)
- [ ] Create arrow: `A -> B+` → Should be PURPLE (mixed)

### Test 2: Swapped State (isWhiteOutside = true)
- [ ] Toggle "Swap red and white layer"
- [ ] Same arrows should maintain their colors
- [ ] Arrows should physically move to new ring positions
- [ ] `A+` should now be on outer ring (was inner)
- [ ] `B-` should now be on inner ring (was outer)

### Test 3: Dynamic Update
- [ ] Write `A+ -> B-` with default colors
- [ ] Toggle swap → Arrow should stay RED
- [ ] Toggle back → Arrow should stay RED
- [ ] Edit DOT script to `A+ -> A+` → Should be GREEN

---

## Summary of Changes

| File | Lines Changed | Description |
|------|--------------|-------------|
| New cell | After 508 | Add `polarityMapping` helper |
| Cell 21 (parseArrowConnections) | 3663-3706 | Add polarity to connections |
| arrowUtilities | 4267-4285 | Use polarity for color |
| arrowControls | 239, 296-319, 332-352 | Update color calculation |
| drawAllArrows | 2978 | Pass isWhiteOutside |
| drawFlow | 2998 | Pass isWhiteOutside |
| dotScriptEditor | 3753 | Pass isWhiteOutside |
| New cell | After 509 | Re-add reactive redraw |

**Total**: ~8 locations, ~50 lines of code changed

---

## Before/After Example

### Before (Broken):
```javascript
// DOT: "A+ -> B-"
parseArrowConnections("A+ -> B-", data)
// Returns: { fromRing: 'inner', toRing: 'outer' }
// ❌ Hardcoded! Won't change when isWhiteOutside toggles

calculateArrowColor('inner', 'outer', 'A', 'B')
// Returns: RED
// ❌ When isWhiteOutside=true, this is wrong!
```

### After (Fixed):
```javascript
// DOT: "A+ -> B-"
parseArrowConnections("A+ -> B-", data, isWhiteOutside)
// Returns: { 
//   fromPolarity: 'positive', toPolarity: 'negative',
//   fromRing: 'inner', toRing: 'outer'  // or swapped if isWhiteOutside=true
// }
// ✅ Ring position adapts to toggle!

calculateArrowColor('positive', 'negative', 'A', 'B')
// Returns: RED
// ✅ Always correct regardless of isWhiteOutside!
```

---

## Troubleshooting

### Issue: Arrows don't update when toggling isWhiteOutside
**Fix**: Make sure cell 1211 (reactive redraw) is added and `isWhiteOutside` is passed to `parseArrowConnections`.

### Issue: Colors are still wrong after refactor
**Fix**: Check that `calculateArrowColor` is using `fromPolarity/toPolarity` instead of `fromRing/toRing`.

### Issue: Connection objects missing polarity fields
**Fix**: Verify `parseArrowConnections` is creating both `fromPolarity` and `fromRing` fields.

### Issue: Arrows disappear when toggling
**Fix**: Check that `polarityMapping.getRingFor()` handles all symbols: `+`, `-`, ``, `i`.

