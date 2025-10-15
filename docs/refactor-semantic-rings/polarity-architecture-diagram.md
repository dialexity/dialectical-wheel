# Polarity Architecture Diagram

## Current (Broken) Architecture

```
┌─────────────────────────────────────────┐
│  DOT Script: "A+ -> B-"                 │
│                                         │
│  Parser hardcodes:                      │
│    + → inner ring                       │
│    - → outer ring                       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Connection Object:                     │
│  {                                      │
│    from: "A",                          │
│    to: "B",                            │
│    fromRing: "inner",  ← PROBLEM!      │
│    toRing: "outer"     ← PROBLEM!      │
│  }                                      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Arrow Color Calculation:               │
│                                         │
│  if (inner → inner) → GREEN             │
│  if (inner → outer) → RED               │
│  ❌ Assumes: inner=positive, outer=negative
│                                         │
│  When isWhiteOutside=true:             │
│  ❌ Colors stay same (inner still green)│
│  ❌ Should swap because physical rings  │
│     swapped but semantics didn't       │
└─────────────────────────────────────────┘
```

---

## Proposed (Fixed) Architecture

```
┌───────────────────────────────────────────────────────────┐
│  USER INPUT                                               │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ DOT Script: "A+ -> B-"                              │ │
│  │ Meaning: A(positive) → B(negative)                  │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────┐
│  POLARITY MAPPING (NEW LAYER)                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ polarityMapping(isWhiteOutside)                     │ │
│  │                                                     │ │
│  │ When isWhiteOutside = false (default):             │ │
│  │   positive → 'inner'                               │ │
│  │   negative → 'outer'                               │ │
│  │                                                     │ │
│  │ When isWhiteOutside = true (swapped):              │ │
│  │   positive → 'outer'  ← SWAPPED! ✅                │ │
│  │   negative → 'inner'  ← SWAPPED! ✅                │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────┐
│  ENHANCED CONNECTION OBJECT                                │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ parseArrowConnections(script, data, polarityMapping)│ │
│  │                                                     │ │
│  │ {                                                   │ │
│  │   from: "A",                                        │ │
│  │   to: "B",                                          │ │
│  │   fromPolarity: "positive",  ← SEMANTIC ✅         │ │
│  │   toPolarity: "negative",    ← SEMANTIC ✅         │ │
│  │   fromRing: "inner",         ← PHYSICAL (computed) │ │
│  │   toRing: "outer"            ← PHYSICAL (computed) │ │
│  │ }                                                   │ │
│  │                                                     │ │
│  │ When isWhiteOutside=true, same DOT script becomes: │ │
│  │ {                                                   │ │
│  │   fromPolarity: "positive",  ← Same semantic! ✅   │ │
│  │   toPolarity: "negative",    ← Same semantic! ✅   │ │
│  │   fromRing: "outer",         ← Physical swapped! ✅│ │
│  │   toRing: "inner"            ← Physical swapped! ✅│ │
│  │ }                                                   │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────┐
│  ARROW RENDERING                                           │
│  ┌──────────────────────────────┬──────────────────────┐ │
│  │ COLOR (based on POLARITY)    │ POSITION (ring)      │ │
│  ├──────────────────────────────┼──────────────────────┤ │
│  │ calculateArrowColor(         │ Draw arrow from:     │ │
│  │   fromPolarity,  ← Semantic  │   fromRing position  │ │
│  │   toPolarity     ← Semantic  │ Draw arrow to:       │ │
│  │ )                            │   toRing position    │ │
│  │                              │                      │ │
│  │ if (positive → negative):    │ Respects physical    │ │
│  │   color = RED ✅             │ ring swap ✅         │ │
│  │                              │                      │ │
│  │ if (positive → positive):    │                      │ │
│  │   color = GREEN ✅           │                      │ │
│  └──────────────────────────────┴──────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

---

## State Flow Comparison

### Scenario: User writes "A+ -> B-" then toggles `isWhiteOutside`

#### ❌ CURRENT (BROKEN) BEHAVIOR

```
Initial State (isWhiteOutside = false):
┌──────────────────────────────────────────────┐
│ DOT: "A+ -> B-"                              │
│ Parser: + → inner, - → outer                 │
│ Connection: { fromRing: inner, toRing: outer }│
│ Color: RED (inner→outer = opposite)          │
│ Visual: A(green ring) → B(red ring) with RED arrow
└──────────────────────────────────────────────┘

After Toggle (isWhiteOutside = true):
┌──────────────────────────────────────────────┐
│ DOT: "A+ -> B-" (unchanged)                  │
│ Parser: + → inner, - → outer (STILL!)        │
│ Connection: { fromRing: inner, toRing: outer }│ ← WRONG!
│ Color: RED (inner→outer = opposite)          │ ← WRONG!
│ Visual: A(red ring) → B(green ring) with RED arrow
│ 🔴 PROBLEM: Arrow should be GREEN            │
│    (because A+ and B- swapped rings!)        │
└──────────────────────────────────────────────┘
```

#### ✅ PROPOSED (FIXED) BEHAVIOR

```
Initial State (isWhiteOutside = false):
┌──────────────────────────────────────────────┐
│ DOT: "A+ -> B-"                              │
│ Mapping: positive→inner, negative→outer      │
│ Connection: {                                │
│   fromPolarity: positive, toPolarity: negative
│   fromRing: inner, toRing: outer             │
│ }                                            │
│ Color: RED (positive→negative = opposite) ✅ │
│ Visual: A(green/inner) → B(red/outer) RED arrow
└──────────────────────────────────────────────┘

After Toggle (isWhiteOutside = true):
┌──────────────────────────────────────────────┐
│ DOT: "A+ -> B-" (unchanged)                  │
│ Mapping: positive→outer, negative→inner ✅   │
│ Connection: {                                │
│   fromPolarity: positive, toPolarity: negative ← Preserved!
│   fromRing: outer, toRing: inner ✅          │
│ }                                            │
│ Color: RED (positive→negative = opposite) ✅ │
│ Visual: A(red/outer) → B(green/inner) RED arrow
│ ✅ CORRECT: Semantic meaning preserved!      │
└──────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
                   isWhiteOutside Toggle
                           │
                           ↓
              ┌────────────────────────┐
              │  polarityMapping()     │
              │                        │
              │  Returns mapping of:   │
              │  semantic → physical   │
              └────────────────────────┘
                           │
                           ↓
              ┌────────────────────────┐
              │ parseArrowConnections()│← DOT Script Input
              │                        │
              │ Parses: "A+ -> B-"     │
              │ ↓                      │
              │ Extracts polarities:   │
              │   A = positive (+)     │
              │   B = negative (-)     │
              │ ↓                      │
              │ Maps to rings using    │
              │ polarityMapping        │
              │ ↓                      │
              │ Creates connection:    │
              │ {                      │
              │   polarity: semantic   │
              │   ring: physical       │
              │ }                      │
              └────────────────────────┘
                           │
                  ┌────────┴────────┐
                  ↓                 ↓
    ┌──────────────────┐  ┌──────────────────┐
    │ Color Rendering  │  │ Position Drawing │
    │ (use polarity)   │  │ (use ring)       │
    │                  │  │                  │
    │ calculateColor(  │  │ drawAt(          │
    │   fromPolarity,  │  │   fromRing,      │
    │   toPolarity     │  │   toRing         │
    │ )                │  │ )                │
    └──────────────────┘  └──────────────────┘
```

---

## Key Insight

The fundamental issue is that the codebase conflates two separate concepts:

| Concept | Type | Example | Affected by `isWhiteOutside`? |
|---------|------|---------|-------------------------------|
| **Polarity** | Semantic | "positive", "negative" | ❌ No - meaning is constant |
| **Ring Position** | Physical | "inner", "outer" | ✅ Yes - positions swap |

The refactor separates these concepts:
- **DOT Script symbols** (`+`, `-`) represent **polarity** (semantic)
- **Ring positions** (`inner`, `outer`) represent **physical location**
- **Polarity Mapping** translates semantic → physical based on `isWhiteOutside`

---

## Testing Scenarios

### Test Case 1: Same Polarity Connection

```
DOT: "A+ -> B+"  (positive to positive)

isWhiteOutside = false:
  fromPolarity: positive → fromRing: inner
  toPolarity: positive → toRing: inner
  Expected Color: GREEN (same polarity) ✅

isWhiteOutside = true:
  fromPolarity: positive → fromRing: outer
  toPolarity: positive → toRing: outer
  Expected Color: GREEN (same polarity) ✅
```

### Test Case 2: Opposite Polarity Connection

```
DOT: "A+ -> B-"  (positive to negative)

isWhiteOutside = false:
  fromPolarity: positive → fromRing: inner
  toPolarity: negative → toRing: outer
  Expected Color: RED (opposite polarity) ✅

isWhiteOutside = true:
  fromPolarity: positive → fromRing: outer
  toPolarity: negative → toRing: inner
  Expected Color: RED (opposite polarity) ✅
```

### Test Case 3: Mixed Connection

```
DOT: "A -> B+"  (neutral to positive)

isWhiteOutside = false:
  fromPolarity: neutral → fromRing: middle
  toPolarity: positive → toRing: inner
  Expected Color: PURPLE (mixed) ✅

isWhiteOutside = true:
  fromPolarity: neutral → fromRing: middle
  toPolarity: positive → toRing: outer
  Expected Color: PURPLE (mixed) ✅
```

All test cases maintain semantic correctness regardless of physical ring swap! 🎯

