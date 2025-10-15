# Dialectical Wheel Structure: The Polarity Problem

## The Bug Explained Visually

### What SHOULD Happen When Toggling `isWhiteOutside`

```
╔═══════════════════════════════════════════════════════════════════╗
║  DEFAULT STATE (isWhiteOutside = false)                           ║
╚═══════════════════════════════════════════════════════════════════╝

                    dialecticalData = {
                      A: {
                        statement: "Thesis A",
                        positive: "Support A+",
                        negative: "Critique A-"
                      }
                    }
                              ↓
                    transformToNestedPieData()
                              ↓
        ┌─────────────────────────────────────────────┐
        │         WHEEL DATA STRUCTURE                │
        ├─────────────────────────────────────────────┤
        │  outer (RED ring):                          │
        │    └─ "Critique A-" (negative content)      │
        │                                             │
        │  middle (WHITE ring):                       │
        │    └─ "Thesis A" (statement)                │
        │                                             │
        │  inner (GREEN ring):                        │
        │    └─ "Support A+" (positive content)       │
        └─────────────────────────────────────────────┘
                              ↓
                    ┌──────────────────────┐
                    │   VISUAL RENDER      │
                    │                      │
                    │   ┌────────────┐     │
                    │   │   outer    │     │  RED circle
                    │   │  (RED)     │     │  shows "Critique A-"
                    │   │ ┌────────┐ │     │
                    │   │ │ middle │ │     │  WHITE circle
                    │   │ │(WHITE) │ │     │  shows "Thesis A"
                    │   │ │ ┌────┐ │ │     │
                    │   │ │ │inner││ │     │  GREEN circle
                    │   │ │ │(GRN)││ │     │  shows "Support A+"
                    │   │ │ └────┘ │ │     │
                    │   │ └────────┘ │     │
                    │   └────────────┘     │
                    └──────────────────────┘

═══════════════════════════════════════════════════════════════════════

╔═══════════════════════════════════════════════════════════════════╗
║  SWAPPED STATE (isWhiteOutside = true)                            ║
║  EXPECTED: Positive and Negative swap physical positions          ║
╚═══════════════════════════════════════════════════════════════════╝

                    Same dialecticalData
                              ↓
                    transformToNestedPieData()
                    (with isWhiteOutside = true)
                              ↓
        ┌─────────────────────────────────────────────┐
        │    EXPECTED WHEEL DATA STRUCTURE            │
        ├─────────────────────────────────────────────┤
        │  outer (now GREEN ring):                    │
        │    └─ "Support A+" (positive content) ✅    │
        │                                             │
        │  middle (still WHITE ring):                 │
        │    └─ "Thesis A" (statement) ✅             │
        │                                             │
        │  inner (now RED ring):                      │
        │    └─ "Critique A-" (negative content) ✅   │
        └─────────────────────────────────────────────┘
                              ↓
                    ┌──────────────────────┐
                    │  EXPECTED VISUAL     │
                    │                      │
                    │   ┌────────────┐     │
                    │   │   outer    │     │  GREEN circle (swapped!)
                    │   │  (GREEN)   │     │  shows "Support A+"
                    │   │ ┌────────┐ │     │
                    │   │ │ middle │ │     │  WHITE circle (same)
                    │   │ │(WHITE) │ │     │  shows "Thesis A"
                    │   │ │ ┌────┐ │ │     │
                    │   │ │ │inner││ │     │  RED circle (swapped!)
                    │   │ │ │(RED)││ │     │  shows "Critique A-"
                    │   │ │ └────┘ │ │     │
                    │   │ └────────┘ │     │
                    │   └────────────┘     │
                    └──────────────────────┘
```

---

### What ACTUALLY Happens (THE BUG!)

```
╔═══════════════════════════════════════════════════════════════════╗
║  ACTUAL SWAPPED STATE (isWhiteOutside = true)                     ║
║  BUG: Only colors swap, not the content placement!                ║
╚═══════════════════════════════════════════════════════════════════╝

                    Same dialecticalData
                              ↓
                    transformToNestedPieData()
                    (with isWhiteOutside = true)
                              ↓
        ┌─────────────────────────────────────────────┐
        │    ACTUAL (BROKEN) WHEEL DATA STRUCTURE     │
        ├─────────────────────────────────────────────┤
        │  middle (mapped to 'outer' key):            │  ❌ WRONG!
        │    └─ "Critique A-" (negative) in MIDDLE!   │  Should be INNER!
        │                                             │
        │  outer (mapped to 'middle' key):            │  ❌ WRONG!
        │    └─ "Thesis A" (statement) in OUTER!      │  Should be MIDDLE!
        │                                             │
        │  inner (HARDCODED):                         │  ❌ WRONG!
        │    └─ "Support A+" (positive) still INNER!  │  Should be OUTER!
        └─────────────────────────────────────────────┘
                              ↓
                    ┌──────────────────────┐
                    │   ACTUAL VISUAL      │
                    │   (BROKEN!)          │
                    │                      │
                    │   ┌────────────┐     │
                    │   │   middle   │     │  GREEN circle (color swapped)
                    │   │  (GREEN)   │     │  shows "Critique A-" ❌
                    │   │ ┌────────┐ │     │  (should show "Support A+")
                    │   │ │  outer │ │     │
                    │   │ │(WHITE) │ │     │  WHITE circle
                    │   │ │ ┌────┐ │ │     │  shows "Thesis A" ❌
                    │   │ │ │inner││ │     │  (should be in middle!)
                    │   │ │ │(RED)││ │     │  RED circle (color swapped)
                    │   │ │ └────┘ │ │     │  shows "Support A+" ❌
                    │   │ └────────┘ │     │  (should show "Critique A-")
                    │   └────────────┘     │
                    └──────────────────────┘

                    🔴 COMPLETELY BROKEN! 🔴
```

---

## The Root Cause Code

### Current `transformToNestedPieData` (BROKEN)

```javascript
transformToNestedPieData = (dialecticalData, whiteOutside = isWhiteOutside) => {
  const units = Object.keys(dialecticalData);
  
  // ❌ This hack only swaps between 'outer' and 'middle', leaving 'inner' alone!
  const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];

  return {
    invisible: units.map(...),
    
    [outerKey]: units.map(unit => ({
      name: `${unit}-`,
      fullText: dialecticalData[unit].negative,  
    })),
    // When whiteOutside=true:
    //   outerKey = 'middle', so negative goes to MIDDLE ring! ❌
    
    [middleKey]: units.map(unit => ({
      name: unit,
      fullText: dialecticalData[unit].statement,
    })),
    // When whiteOutside=true:
    //   middleKey = 'outer', so statement goes to OUTER ring! ❌
    
    inner: units.map(unit => ({
      name: `${unit}+`,
      fullText: dialecticalData[unit].positive,
    }))
    // ALWAYS goes to 'inner' regardless of whiteOutside! ❌
  }
}
```

### The Hack Explained

```
DEFAULT (whiteOutside = false):
  [outerKey, middleKey] = ['outer', 'middle']
  
  Result:
    outer ring ← negative ✅
    middle ring ← statement ✅
    inner ring ← positive ✅

SWAPPED (whiteOutside = true):
  [outerKey, middleKey] = ['middle', 'outer']
  
  Result:
    middle ring ← negative ❌ (should go to inner!)
    outer ring ← statement ❌ (should stay in middle!)
    inner ring ← positive ❌ (should go to outer!)
```

**The hack assumes**:
- Swapping only affects outer ↔ middle
- Inner ring never needs to change
- But this is WRONG! When polarity swaps:
  - Positive should move: inner → outer
  - Negative should move: outer → inner
  - Statement stays in middle

---

## Data Flow Comparison

### DEFAULT STATE

```
dialecticalData.A.positive ("Support A+")
         ↓
    inner ring (physical position)
         ↓
    GREEN color applied
         ↓
    ✅ "Support A+" appears in green inner ring
```

### SWAPPED STATE (Current Bug)

```
dialecticalData.A.positive ("Support A+")
         ↓
    inner ring (HARDCODED! ❌)
         ↓
    GREEN color applied (green stays in inner)
         ↓
    ✅ "Support A+" appears in GREEN inner ring
       (Actually correct by accident! But statements and negatives are wrong)
```

### SWAPPED STATE (Fixed)

```
dialecticalData.A.positive ("Support A+")
         ↓
    polarityMapping.positive → 'inner' (always! ✅)
         ↓
    inner ring (physical position)
         ↓
    GREEN color applied (polarity-based)
         ↓
    ✅ "Support A+" appears in GREEN inner ring (correct!)
```

---

## Why This Matters

The bug affects:

1. **Visual Correctness**: Content appears in wrong rings
2. **Semantic Correctness**: Positive/negative meanings are confused
3. **Arrow Rendering**: Arrows point to wrong locations
4. **User Understanding**: The wheel's dialectical logic breaks down
5. **DOT Script**: `A+` and `A-` symbols no longer mean what they should

### Example: Educational Use Case

```
Dialectical Data:
  Capitalism:
    positive: "Economic growth"
    negative: "Inequality"
    statement: "Market economy"

DEFAULT (isWhiteOutside = false):
  ✅ Inner (green): "Economic growth"
  ✅ Middle (white): "Market economy"
  ✅ Outer (red): "Inequality"
  → Correct! Green=support, Red=critique

SWAPPED (isWhiteOutside = true):
  ❌ Inner (green): "Economic growth" (WRONG! Still shows support in green)
  ❌ Outer (white): "Market economy" (WRONG! Statement in outer ring)
  ❌ Middle (red): "Inequality" (WRONG! Critique in middle ring)
  → Completely backwards! Confusing for students!

EXPECTED (isWhiteOutside = true):
  ✅ Inner (green): "Economic growth" (support stays in green)
  ✅ Middle (red): "Inequality" (critique moves to red middle)
  ✅ Outer (white): "Market economy" (statement moves to white outer)
  → Correct! Color-to-content mapping maintained
```

---

## The Fix: Polarity-Based Mapping

Instead of swapping keys, determine ring placement by polarity:

```javascript
transformToNestedPieData = (dialecticalData, polarityMapping) => {
  // Get physical ring for each polarity
  const positiveRing = polarityMapping.polarityToRing.positive;  // 'inner' or 'outer'
  const negativeRing = polarityMapping.polarityToRing.negative;  // 'outer' or 'inner'
  const neutralRing = 'middle';  // always 'middle'
  
  return {
    [positiveRing]: units.map(unit => ({
      polarity: 'positive',
      fullText: dialecticalData[unit].positive,
    })),
    [neutralRing]: units.map(unit => ({
      polarity: 'neutral',
      fullText: dialecticalData[unit].statement,
    })),
    [negativeRing]: units.map(unit => ({
      polarity: 'negative',
      fullText: dialecticalData[unit].negative,
    }))
  };
}
```

Now:
- When `isWhiteOutside = false`: `positiveRing = 'inner'`, `negativeRing = 'outer'` ✅
- When `isWhiteOutside = true`: `positiveRing = 'outer'`, `negativeRing = 'inner'` ✅
- Content follows polarity, not hardcoded positions ✅

---

## Testing the Fix

### Test 1: Default State
```javascript
isWhiteOutside = false
polarityMapping.polarityToRing = { positive: 'inner', negative: 'outer', neutral: 'middle' }

transformToNestedPieData(data, polarityMapping)
// Should return:
{
  inner: [{ polarity: 'positive', fullText: "Support A+" }],
  middle: [{ polarity: 'neutral', fullText: "Thesis A" }],
  outer: [{ polarity: 'negative', fullText: "Critique A-" }]
}
✅ Correct!
```

### Test 2: Swapped State
```javascript
isWhiteOutside = true
polarityMapping.polarityToRing = { positive: 'outer', negative: 'inner', neutral: 'middle' }

transformToNestedPieData(data, polarityMapping)
// Should return:
{
  outer: [{ polarity: 'positive', fullText: "Support A+" }],  ✅
  middle: [{ polarity: 'neutral', fullText: "Thesis A" }],    ✅
  inner: [{ polarity: 'negative', fullText: "Critique A-" }]  ✅
}
✅ Correct!
```

### Test 3: Toggle Back
```javascript
// Toggle back to default
isWhiteOutside = false
polarityMapping.polarityToRing = { positive: 'inner', negative: 'outer', neutral: 'middle' }

transformToNestedPieData(data, polarityMapping)
// Should return original structure
✅ Content returns to original positions
```

---

## Summary

**The Problem**: `transformToNestedPieData` uses a `[outerKey, middleKey]` hack that:
- Only swaps between `outer` and `middle` keys
- Leaves `inner` ring hardcoded
- Causes content to appear in wrong rings when `isWhiteOutside = true`

**The Solution**: 
- Use `polarityMapping` to dynamically determine physical ring for each polarity
- Store `polarity` field in data for semantic tracking
- Remove the `[outerKey, middleKey]` hack entirely
- Build the wheel structure correctly based on polarity-to-ring mapping

**Impact**: Fixes the entire wheel structure, not just arrows! 🎯

