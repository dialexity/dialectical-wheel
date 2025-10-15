# Semantic Rings Refactor - Implementation Guide

## 🎯 Goal

Replace all `outer/middle/inner` (position-based) with `positive/negative/neutral` (semantic-based) to fix the `isWhiteOutside` toggle bug.

---

## 📖 Read These In Order

### 1. **00-COMPLETE-AUDIT.md** ⭐ START HERE
**What**: Complete inventory of all 50+ instances where `outer/middle/inner` is used  
**Why**: You need to know exactly what to change  
**Time**: 30 min read  

**Key sections**:
- Executive summary (lines 3-32)
- Category A-I breakdowns (lines 34-699)
- Helper functions (lines 701-797)
- Migration strategy (lines 801-861)

### 2. **01-VISUAL-GUIDE.md** ⭐ UNDERSTAND THE ARCHITECTURE
**What**: Before/after diagrams, data flow, visual examples  
**Why**: See how the refactor fixes the bug  
**Time**: 20 min read  

**Key sections**:
- Current vs. Proposed architecture (lines 5-125)
- Data flow comparison (lines 129-192)
- Ring mapping visuals (lines 196-260)
- Testing scenarios (lines 312-367)

---

## 🚀 Quick Start for Implementation

### Step 1: Read the Audit (30 min)
```bash
open docs/refactor-semantic-rings/00-COMPLETE-AUDIT.md
```

Focus on:
- [ ] Executive summary
- [ ] Category A (Data Structure Lookups) - CRITICAL
- [ ] Category D (transformToNestedPieData) - ROOT CAUSE
- [ ] Category H (Step Mode) - MOST COMPLEX
- [ ] Helper functions section

### Step 2: Review Visual Guide (20 min)
```bash
open docs/refactor-semantic-rings/01-VISUAL-GUIDE.md
```

Focus on:
- [ ] Current vs. Proposed architecture diagrams
- [ ] Data flow showing the bug
- [ ] Testing scenarios

### Step 3: Implement Phase by Phase

Follow the migration strategy from 00-COMPLETE-AUDIT.md:

#### Phase 1: Create Helper Functions (3 hours)
**Files to create/modify**:
- Add `getRingRadii(ringType, isWhiteOutside)` helper
- Add `getPhysicalGroupsForSemantics(isWhiteOutside)` helper

**Test**: Verify helpers return correct values for both toggle states

---

#### Phase 2: Update Data Structure (3 hours) ⚠️ CRITICAL
**Files to modify**:
- `transformToNestedPieData` (lines 3909-3949)
- Remove `[outerKey, middleKey]` hack
- Return `{positive, negative, neutral}` keys instead

**Test**: Verify `nestedData` has semantic keys

---

#### Phase 3: Update Arrows (2 hours)
**Files to modify**:
- `parseArrowConnections` (lines 3677-3689)
- Return semantic ringTypes

**Test**: Draw arrows, toggle `isWhiteOutside`, verify arrows point to correct rings

---

#### Phase 4: Update Styling (2 hours)
**Files to modify**:
- Stroke styles (lines 116-117)
- Base opacity (lines 123, 138)
- Font sizes (lines 2760, 2762)

**Test**: Visual inspection of styles in both toggle states

---

#### Phase 5: Update Colors (1 hour)
**Files to modify**:
- Color scale destructuring (line 2047)

**Test**: Colors render correctly

---

#### Phase 6: Update Step Mode (5 hours) ⚠️ MOST COMPLEX
**Files to modify**:
- `executeStep` (lines 1618-1692)
- `showCell` (lines 2131-2166)
- `hideCell` (lines 2055-2082)
- `resetBuildState` (lines 1609-1616)
- `resetToFull` (lines 1719-1730)
- `cellVisibility` structure (everywhere)

**Test**: Run through all step mode animations in both toggle states

---

#### Phase 7: Cleanup (1 hour)
**Tasks**:
- Update comments
- Remove old position-based code
- Update any remaining hardcoded assumptions

**Test**: Full regression test suite

---

## 📋 Implementation Checklist

Copy this to track your progress:

### Phase 1: Helpers
- [ ] Create `getRingRadii()` function
- [ ] Create `getPhysicalGroupsForSemantics()` function
- [ ] Test helpers with both toggle states
- [ ] Document helper APIs

### Phase 2: Data Structure
- [ ] Update `transformToNestedPieData` signature
- [ ] Remove `[outerKey, middleKey]` swap
- [ ] Return semantic keys: `{positive, negative, neutral, invisible}`
- [ ] Update all `dataToUse.outer/middle/inner` to semantic names
- [ ] Test data structure in both toggle states

### Phase 3: Arrows
- [ ] Update `parseArrowConnections` to return semantic ringTypes
- [ ] Test arrow parsing
- [ ] Verify arrow positioning in default state
- [ ] Verify arrow positioning in toggled state
- [ ] Test arrow colors remain correct

### Phase 4: Styling
- [ ] Update stroke style logic
- [ ] Update opacity calculations
- [ ] Update font size selection
- [ ] Visual test both toggle states

### Phase 5: Colors
- [ ] Rename `outerColor` → `negativeColor`
- [ ] Rename `middleColor` → `neutralColor`
- [ ] Rename `innerColor` → `positiveColor`
- [ ] Update all references
- [ ] Test color rendering

### Phase 6: Step Mode
- [ ] Update `cellVisibility` structure to use semantic keys
- [ ] Update `executeStep` - showWhite case
- [ ] Update `executeStep` - showGreen case
- [ ] Update `executeStep` - showRed case
- [ ] Update `showCell` function
- [ ] Update `hideCell` function
- [ ] Update `resetBuildState`
- [ ] Update `resetToFull`
- [ ] Update context object group passing
- [ ] Test each step type individually
- [ ] Test step mode in default state
- [ ] Test step mode in toggled state

### Phase 7: Cleanup
- [ ] Update comments to reflect semantic approach
- [ ] Remove any leftover position-based code
- [ ] Run linter
- [ ] Update any related documentation

### Final Testing
- [ ] Load wheel in default state
- [ ] Verify all rings show correct content
- [ ] Draw various arrows
- [ ] Verify arrow positions and colors
- [ ] Toggle `isWhiteOutside`
- [ ] Verify content moved to correct rings
- [ ] Verify arrows updated positions
- [ ] Test step mode in both states
- [ ] Test all arrow types (+→+, +→-, -→-, etc.)
- [ ] Toggle multiple times
- [ ] Test edge cases

---

## 🎯 Expected Outcomes

### Before (Broken)
```
isWhiteOutside = true:
  Content: ✅ Follows colors (due to hack)
  Arrows:  ❌ Don't follow (hardcoded positions)
```

### After (Fixed)
```
isWhiteOutside = true:
  Content: ✅ Follows colors (proper mapping)
  Arrows:  ✅ Follow colors (use semantic names)
```

---

## 📊 Effort Estimate

- **Phase 1** (Helpers): 3 hours
- **Phase 2** (Data structure): 3 hours ⚠️
- **Phase 3** (Arrows): 2 hours
- **Phase 4** (Styling): 2 hours
- **Phase 5** (Colors): 1 hour
- **Phase 6** (Step Mode): 5 hours ⚠️
- **Phase 7** (Cleanup): 1 hour
- **Testing**: 4 hours
- **Total**: ~21 hours

---

## 🔍 Key Files to Modify

All in `/Users/justintan/dialectical-wheel/notebook-src/dialectical-wheel-4.html`:

1. **`transformToNestedPieData`** (lines 3909-3949) - ROOT FIX
2. **`makeRings` / `updateAllRings`** (lines 145-151) - Data→Groups mapping
3. **`parseArrowConnections`** (lines 3677-3689) - Arrow positions
4. **`getCellCentroid`** (lines 636-679) - Geometry lookups
5. **`getTextConstraints`** (lines 4083-4127) - Text layout
6. **`executeStep`** (lines 1618-1692) - Step animations
7. **`showCell`** (lines 2131-2166) - Show animations
8. **`hideCell`** (lines 2055-2112) - Hide animations
9. **`updateLabels`** (lines 2766-2779) - Label rendering
10. **Color scales** (line 2047) - Color naming

---

## ⚠️ Breaking Changes

This is a **BREAKING CHANGE** to the data structure:

### Data keys change:
```javascript
// Before
nestedData = { outer: [...], middle: [...], inner: [...] }

// After
nestedData = { negative: [...], neutral: [...], positive: [...] }
```

### Visibility keys change:
```javascript
// Before
cellVisibility = { "A": { outer: true, middle: true, inner: true } }

// After
cellVisibility = { "A": { negative: true, neutral: true, positive: true } }
```

---

## 🧪 Testing Strategy

### Unit Tests
1. Test `getRingRadii()` with all semantic names and both toggle states
2. Test `getPhysicalGroupsForSemantics()` returns correct mappings
3. Test `transformToNestedPieData()` returns semantic keys
4. Test `parseArrowConnections()` returns semantic ringTypes

### Integration Tests
1. Load wheel, verify rendering
2. Toggle `isWhiteOutside`, verify ring swaps
3. Draw arrows, verify positions
4. Toggle, verify arrows update

### Visual Tests
1. Check colors in both states
2. Check arrow positions in both states
3. Check step mode animations in both states
4. Check all polarity combinations

---

## 💡 Key Insights

1. **Physical positions are FIXED**: `outerGroup`, `middleGroup`, `innerGroup` are SVG groups that don't move
2. **Semantic content MOVES**: `positive`, `negative`, `neutral` move between groups based on toggle
3. **Helper functions do the mapping**: They translate semantic→physical based on `isWhiteOutside`
4. **No more hacks needed**: Direct semantic naming eliminates the `[outerKey, middleKey]` bandaid

---

## 🆘 Troubleshooting

### If arrows still point to wrong rings:
- Check `parseArrowConnections` returns semantic names
- Check arrow rendering uses helper to get radii
- Check `isWhiteOutside` is passed to helpers

### If content appears in wrong rings:
- Check `transformToNestedPieData` returns semantic keys
- Check `updateAllRings` uses `getPhysicalGroupsForSemantics()`
- Check all data accessors use semantic keys

### If step mode breaks:
- Check `cellVisibility` uses semantic keys
- Check `showCell`/`hideCell` use helpers to map semantics→groups
- Check `executeStep` cases use semantic names

---

## 📞 Reference Documents

Located in parent directory (`docs/`):

- `polarity-conflation-audit.md` - Earlier arrow-focused audit
- `POLARITY_REFACTOR_SUMMARY.md` - Executive summary of the bug
- `wheel-structure-polarity-problem.md` - Visual problem explanation
- `polarity-architecture-diagram.md` - Architecture diagrams
- `refactoring-ring-polarity-separation.md` - Earlier refactor plan
- `polarity-refactor-quickstart.md` - Quick implementation guide

These provide additional context but **start with this directory** for implementation.

---

## ✅ Success Criteria

- [ ] Content appears in correct rings in both toggle states
- [ ] Arrows point to correct rings in both toggle states
- [ ] Arrow colors remain correct (semantic, not position-based)
- [ ] Step mode works in both toggle states
- [ ] No hardcoded position assumptions in code
- [ ] Code is self-documenting with semantic names
- [ ] All tests pass

---

## 🚀 Ready to Start?

1. Read `00-COMPLETE-AUDIT.md` (30 min)
2. Read `01-VISUAL-GUIDE.md` (20 min)
3. Copy the Implementation Checklist above
4. Start with Phase 1: Create helper functions
5. Test after each phase
6. Track progress in checklist

**Good luck!** 🎉

