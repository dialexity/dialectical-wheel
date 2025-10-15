# 5-Minute Quickstart

For AI assistants or developers who want to start immediately.

---

## The Problem (1 min read)

**Bug**: When `isWhiteOutside` toggle is switched, arrows don't follow the swapped ring positions.

**Root Cause**: The codebase uses position names (`outer`, `middle`, `inner`) everywhere instead of semantic names (`positive`, `negative`, `neutral`). A bandaid hack in `transformToNestedPieData` swaps keys for content display, but arrow code bypasses this hack and hardcodes positions.

**Fix**: Replace all position names with semantic names, use helper functions to map semantics → physical positions based on `isWhiteOutside`.

---

## The Files (30 sec read)

Everything is in this directory (`docs/refactor-semantic-rings/`):

1. **README.md** - Full implementation guide with checklist
2. **00-COMPLETE-AUDIT.md** - All 50+ instances documented with line numbers
3. **01-VISUAL-GUIDE.md** - Architecture diagrams and visual examples
4. **02-IMPLEMENTATION-TEMPLATE.md** - Copy-paste code for every phase
5. **QUICKSTART.md** - This file!

**Main file to modify**: `/Users/justintan/dialectical-wheel/notebook-src/dialectical-wheel-4.html`

---

## The Key Insight (30 sec read)

```
Physical Positions (Fixed)     Semantic Content (Moves)
─────────────────────────      ────────────────────────
outerGroup, middleGroup,       positive, negative,
innerGroup (SVG elements)      neutral (data content)

Helper function maps semantic → physical based on isWhiteOutside toggle
```

---

## Implementation Order (1 min read)

### Phase 1: Create Helpers (3 hours)
- `getRingRadii(ringType, isWhiteOutside)` - Maps semantic → radii
- `getPhysicalGroupsForSemantics(isWhiteOutside)` - Maps semantic → SVG groups

### Phase 2: Fix Data Structure (3 hours) ⚠️ CRITICAL
- Update `transformToNestedPieData` to return `{positive, negative, neutral}` keys
- Remove `[outerKey, middleKey]` bandaid hack

### Phase 3: Fix Arrows (2 hours)
- Update `parseArrowConnections` to return semantic ringTypes
- Arrows now work with toggle!

### Phase 4-7: Polish (9 hours)
- Styling, colors, step mode, cleanup

**Total**: ~21 hours

---

## Start Implementing Now

```bash
# 1. Open the full guide
open README.md

# 2. Open the audit for reference
open 00-COMPLETE-AUDIT.md

# 3. Open templates for copy-paste
open 02-IMPLEMENTATION-TEMPLATE.md

# 4. Open the main file
open /Users/justintan/dialectical-wheel/notebook-src/dialectical-wheel-4.html

# 5. Start with Phase 1 helper functions (see 02-IMPLEMENTATION-TEMPLATE.md)
```

---

## Test After Each Phase

```javascript
// Quick test in browser console after Phase 1
console.log(getRingRadii("positive", false));  // Should return inner radii
console.log(getRingRadii("negative", true));   // Should return middle radii

// Quick test after Phase 2
console.log(Object.keys(nestedData));  // Should be: ['invisible', 'positive', 'negative', 'neutral']

// Quick test after Phase 3
// Draw arrow "A+ -> B-", toggle isWhiteOutside, verify arrow updates position
```

---

## Key Line Numbers to Change

From **00-COMPLETE-AUDIT.md**:

- Lines 145-151: `updateAllRings()` - Data to groups mapping
- Lines 636-679: `getCellCentroid()` - Switch to helper
- Lines 1618-1692: `executeStep()` - Step mode logic
- Lines 2055-2112: `hideCell()` - Animation function
- Lines 2131-2166: `showCell()` - Animation function
- Lines 3677-3689: `parseArrowConnections()` - THE BUG FIX
- Lines 3909-3949: `transformToNestedPieData()` - ROOT CAUSE FIX

---

## Success = These All Pass

- [ ] Content in correct rings when `isWhiteOutside = false`
- [ ] Content in correct rings when `isWhiteOutside = true`
- [ ] Arrows point to correct rings in default state
- [ ] Arrows point to correct rings in swapped state ⭐ **THE FIX**
- [ ] Arrow colors stay correct (semantic, not position-based)
- [ ] Step mode works in both toggle states
- [ ] No console errors

---

## If You Get Stuck

1. Check you're using semantic names in **data structure keys** (not just variables)
2. Check you're passing `isWhiteOutside` to **all helper functions**
3. Check you updated **cellVisibility structure** (it's everywhere!)
4. Check browser console for errors
5. Re-read the phase you're on in **README.md**

---

## One More Thing

This refactor changes the **data structure keys**, which is a breaking change. Make sure to:

- Test thoroughly after Phase 2 (data structure change)
- Don't mix semantic and position names
- Keep physical SVG group names as-is (they're fixed structure)
- Use helpers to translate semantic → physical

---

**Ready? Go read README.md and start with Phase 1!** 🚀

