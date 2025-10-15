# Semantic Rings Refactor: Visual Guide

## Current Architecture (Broken)

```
┌─────────────────────────────────────────────────────────────┐
│                    Input: dialecticalData                    │
│     { A: {positive: "...", negative: "...", statement: "..."}}│
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ transformToNestedPieData │
         │  ⚠️ THE BANDAID HACK     │
         └──────────┬───────────────┘
                    │
      [outerKey, middleKey] = whiteOutside ? ['middle','outer'] : ['outer','middle']
                    │
                    ▼
         ┌─────────────────────┐
         │   nestedData = {    │
         │     outer: [...],   │  ⚠️ Position-based keys
         │     middle: [...],  │
         │     inner: [...]    │
         │   }                 │
         └─────────┬───────────┘
                   │
         ┌─────────┴─────────────────┐
         │                           │
         ▼                           ▼
  ┌──────────────┐          ┌──────────────────┐
  │  makeRings   │          │ parseArrowConnections │
  │  uses swap   │          │  IGNORES swap!    │  ⚠️ THE BUG
  │  ✅ Works    │          │  hardcodes:       │
  │              │          │  + → inner        │
  │              │          │  - → outer        │
  │              │          │  ❌ BROKEN        │
  └──────────────┘          └──────────────────┘
         │                           │
         ▼                           ▼
  Physical rings               Arrow positions
  follow colors               DON'T follow colors
  when toggled                when toggled
```

---

## Proposed Architecture (Fixed)

```
┌─────────────────────────────────────────────────────────────┐
│                    Input: dialecticalData                    │
│     { A: {positive: "...", negative: "...", statement: "..."}}│
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ transformToNestedPieData │
         │  ✅ NO HACK NEEDED      │
         └──────────┬───────────────┘
                    │
                    │ Direct semantic mapping
                    │
                    ▼
         ┌─────────────────────┐
         │   nestedData = {    │
         │     positive: [...],│  ✅ Semantic keys
         │     negative: [...],│
         │     neutral: [...]  │
         │   }                 │
         └─────────┬───────────┘
                   │
         ┌─────────┴─────────────────┐
         │                           │
         ▼                           ▼
  ┌──────────────────┐      ┌──────────────────┐
  │  makeRings       │      │ parseArrowConnections │
  │  uses mapping    │      │  uses semantics   │
  │  helper          │      │                   │
  └────────┬─────────┘      └────────┬──────────┘
           │                         │
           │  ┌──────────────────┐   │
           └──┤  getRingRadii    ├───┘
              │  (semantic,      │
              │   isWhiteOutside)│
              └────────┬─────────┘
                       │
                       │ Maps semantic → physical position
                       │ based on isWhiteOutside toggle
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
  Physical Groups            Arrow Rendering
  (SVG elements)             (Using semantic positions)
         │                           │
         └───────────┬───────────────┘
                     │
                     ▼
            Both correctly respond
            to isWhiteOutside toggle
```

---

## Data Flow Comparison

### Before (Position-based)

```
DOT Script: "A+ -> B-"
      ↓
parseArrowConnections:
  A+ → ringType: "inner"   (hardcoded)
  B- → ringType: "outer"   (hardcoded)
      ↓
When isWhiteOutside = true:
  Content: A+ is in inner (correct)
  Content: B- is in middle (correct, due to hack)
  Arrow:   Points to "outer" ring (WRONG! points to neutral content)
      ↓
BUG: Arrow points to wrong ring
```

### After (Semantic-based)

```
DOT Script: "A+ -> B-"
      ↓
parseArrowConnections:
  A+ → ringType: "positive"   (semantic)
  B- → ringType: "negative"   (semantic)
      ↓
getRingRadii("negative", isWhiteOutside=true):
  Returns: middle ring radii
      ↓
When isWhiteOutside = true:
  Content: positive in inner, negative in middle
  Arrow:   Points to "negative" semantic → middle physical position
      ↓
WORKS: Arrow points to correct ring (middle)
```

---

## Key Data Structures

### Current (Broken)

```javascript
// Data keyed by position
nestedData = {
  outer: [{ name: "A", fullText: "neutral" }, ...],    // When isWhiteOutside=true
  middle: [{ name: "A-", fullText: "negative" }, ...], // When isWhiteOutside=true  
  inner: [{ name: "A+", fullText: "positive" }, ...]
}

// Visibility keyed by position
cellVisibility = {
  "A": { outer: true, middle: true, inner: true }
}

// Arrows hardcode position
arrow.source.ringType = "outer"  // Always, regardless of toggle
```

### Proposed (Fixed)

```javascript
// Data keyed by semantics
nestedData = {
  negative: [{ name: "A-", fullText: "negative", polarity: "negative" }, ...],
  neutral: [{ name: "A", fullText: "neutral", polarity: "neutral" }, ...],
  positive: [{ name: "A+", fullText: "positive", polarity: "positive" }, ...]
}

// Visibility keyed by semantics
cellVisibility = {
  "A": { negative: true, neutral: true, positive: true }
}

// Arrows use semantics
arrow.source.ringType = "negative"  // Semantic, works with toggle

// Helper maps semantic → physical
getRingRadii("negative", isWhiteOutside=true) 
  → returns middle ring radii
```

---

## Visual: Ring Mapping

### isWhiteOutside = false (Default)

```
Physical Position    Semantic Content    Color
─────────────────    ────────────────    ─────
     OUTER      ←──     negative          🔴 RED
                  ╲
     MIDDLE     ←──╲──  neutral           ⚪ WHITE
                     ╲
     INNER      ←─────  positive          🟢 GREEN
```

### isWhiteOutside = true (Toggled)

```
Physical Position    Semantic Content    Color
─────────────────    ────────────────    ─────
     OUTER      ←──     neutral           ⚪ WHITE
                  ╲                       (moved out)
     MIDDLE     ←──╲──  negative          🔴 RED
                     ╲                    (moved in)
     INNER      ←─────  positive          🟢 GREEN
                                          (never moves)
```

**Key Insight**: 
- Physical positions (`outer`, `middle`, `inner`) are **fixed SVG groups**
- Semantic content (`positive`, `negative`, `neutral`) **moves between groups**
- The helper function does the mapping based on `isWhiteOutside`

---

## Color-to-Semantic Mapping (IMMUTABLE)

This mapping NEVER changes:

```
🟢 GREEN  ══════ positive  (A+)
🔴 RED    ══════ negative  (A-)
⚪ WHITE   ══════ neutral   (A)
```

What DOES change with `isWhiteOutside`:

```
When isWhiteOutside = false:
  positive (green) → inner ring
  neutral (white)  → middle ring
  negative (red)   → outer ring

When isWhiteOutside = true:
  positive (green) → inner ring   (unchanged)
  neutral (white)  → outer ring   (moved OUT)
  negative (red)   → middle ring  (moved IN)
```

---

## Migration Path

```
┌──────────────────┐
│ Phase 1: Helpers │ Create getRingRadii(), getPhysicalGroupsForSemantics()
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 2: Data        │ Change nestedData keys to semantic names
│ Structure            │ Remove [outerKey, middleKey] hack
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 3: Arrows      │ Update parseArrowConnections to use semantic names
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 4: Styling     │ Update opacity, strokes, fonts to use semantic names
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 5: Colors      │ Rename color scales to semantic names
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 6: Step Mode   │ ⚠️ MOST COMPLEX
│                      │ Update cellVisibility, showCell, hideCell, executeStep
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Phase 7: Testing     │ Verify everything works with toggle
└──────────────────────┘
```

---

## Testing Scenarios

### Scenario 1: Default State
```
1. Load wheel with isWhiteOutside = false
2. Verify colors: inner=green, middle=white, outer=red
3. Draw arrow: A+ -> B-
4. Verify arrow goes from innermost to outermost
```

### Scenario 2: Toggled State
```
1. Load wheel with isWhiteOutside = false
2. Draw arrow: A+ -> B-
3. Toggle isWhiteOutside to true
4. Verify:
   - Green stays in inner
   - White moves to outer
   - Red moves to middle
   - Arrow A+ -> B- now points from inner to middle (not outer!)
```

### Scenario 3: Step Mode
```
1. Enter step mode
2. Execute "showGreen" step (should show positive content)
3. Execute "showRed" step (should show negative content)
4. Execute "showWhite" step (should show neutral content)
5. Toggle isWhiteOutside
6. Verify all content in correct positions
```

---

## Risk Assessment

| Area | Risk Level | Mitigation |
|------|------------|------------|
| Data structure keys | 🔴 High | Extensive testing, consider backward compat layer |
| Step mode animations | 🟡 Medium | Test each step type individually |
| Arrow rendering | 🟡 Medium | Visual inspection + automated tests |
| Style calculations | 🟢 Low | Deterministic, easy to verify |
| Color scales | 🟢 Low | Simple rename |

---

## Success Criteria

✅ **Content follows colors** when toggle is switched (already works)
✅ **Arrows follow colors** when toggle is switched (currently broken, should be fixed)
✅ **Step mode works** in both toggle states
✅ **No hardcoded position assumptions** anywhere in code
✅ **Self-documenting** semantic names throughout

