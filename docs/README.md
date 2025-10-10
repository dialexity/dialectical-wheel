# Dialectical Wheel Documentation

## 📚 Documentation Index

### 🔴 Critical Issue: Polarity Refactoring

**Problem**: The `isWhiteOutside` toggle is broken - it only swaps colors, not the actual wheel structure or arrow logic!

#### Start Here:
1. **[POLARITY_REFACTOR_SUMMARY.md](./POLARITY_REFACTOR_SUMMARY.md)** ⭐ **START HERE**
   - Quick overview of the bug
   - Visual examples
   - Implementation checklist
   - Success criteria

#### Deep Dives:
2. **[wheel-structure-polarity-problem.md](./wheel-structure-polarity-problem.md)**
   - Visual diagrams showing the bug
   - Root cause in `transformToNestedPieData`
   - Before/after comparisons
   - Educational impact

3. **[polarity-architecture-diagram.md](./polarity-architecture-diagram.md)**
   - Architecture diagrams
   - Data flow visualizations
   - State transitions
   - Testing scenarios

4. **[refactoring-ring-polarity-separation.md](./refactoring-ring-polarity-separation.md)**
   - Complete technical refactoring plan
   - Phase-by-phase implementation
   - Code examples
   - Migration checklist

5. **[polarity-refactor-quickstart.md](./polarity-refactor-quickstart.md)**
   - Step-by-step implementation guide
   - Exact code changes with line numbers
   - Testing procedures
   - Troubleshooting

---

### Arrow System Documentation

6. **[arrow-parameters.md](./arrow-parameters.md)**
   - Arrow drawing API
   - Perfect-arrows inspired parameters
   - Adaptive padding system
   - Bow scaling

7. **[arrow-click-handlers.md](./arrow-click-handlers.md)**
   - Clickable arrows feature
   - Event handlers
   - Usage examples
   - Visual feedback

8. **[CLICKABLE_ARROWS_SUMMARY.md](../CLICKABLE_ARROWS_SUMMARY.md)**
   - Implementation summary
   - API reference

---

### Migration Guides

9. **[migration-npm-to-local.md](./migration-npm-to-local.md)**
   - NPM package to local files migration
   - File structure changes
   - Import updates

10. **[MIGRATION_SUMMARY.md](../MIGRATION_SUMMARY.md)**
    - Migration overview

---

## 🚀 Quick Start

### If You Want to Fix the Polarity Bug:

```bash
# 1. Read the summary
open docs/POLARITY_REFACTOR_SUMMARY.md

# 2. Understand the problem visually
open docs/wheel-structure-polarity-problem.md

# 3. Follow the implementation guide
open docs/polarity-refactor-quickstart.md

# 4. Reference the full technical plan
open docs/refactoring-ring-polarity-separation.md
```

### If You Want to Understand Arrows:

```bash
# 1. API reference
open docs/arrow-parameters.md

# 2. Click handlers
open docs/arrow-click-handlers.md
```

---

## 📊 Issue Priority

### 🔴 Critical (Do First)
- **Polarity Refactoring**: Wheel structure is fundamentally broken when `isWhiteOutside = true`

### 🟡 Important (Enhancement)
- Arrow parameter improvements (already implemented)
- Click handlers (already implemented)

### 🟢 Maintenance
- Migration to local files (already done)

---

## 🎯 The Core Problem Explained

The codebase conflates two separate concepts:

| Concept | Type | Example | Should Change with `isWhiteOutside`? |
|---------|------|---------|-------------------------------------|
| **Polarity** | Semantic | "positive", "negative" | ❌ No - meaning is constant |
| **Ring Position** | Physical | "inner", "outer" | ✅ Yes - positions swap |

**Current State**: 
- Only colors swap (green ↔ red)
- Content stays in hardcoded rings
- Result: Green ring shows negative content! 🔴

**Solution**:
- Add polarity mapping layer
- Determine ring position from polarity + toggle state
- Rebuild wheel structure correctly

---

## 🛠 Technical Stack

- **D3.js**: SVG manipulation and transitions
- **Observable**: Reactive notebook cells
- **React**: Component integration
- **Rollup**: Module bundling

---

## 📈 Refactoring Impact

### What Gets Fixed

✅ **Wheel Structure**
- Content appears in correct rings
- Polarity-to-ring mapping respects toggle

✅ **Arrow System**
- Colors based on polarity (semantic)
- Positions based on actual content location
- DOT script works correctly

✅ **Visual Consistency**
- Polarity-to-color mapping maintained
- No semantic confusion

### Estimated Effort

- **Infrastructure**: 1 hour
- **Wheel Structure**: 2 hours ⚠️ Critical
- **Arrow Updates**: 2 hours
- **Integration**: 2 hours
- **Testing**: 3 hours
- **Total**: ~10 hours

---

## 🧪 Testing Checklist

### Visual Test
- [ ] Load wheel with default state
- [ ] Toggle `isWhiteOutside`
- [ ] Verify content moved to correct rings
- [ ] Verify colors updated correctly

### Functional Test
- [ ] Create various arrow types
- [ ] Toggle `isWhiteOutside`
- [ ] Verify arrows maintain semantic colors
- [ ] Verify arrows connect to new positions

### Edge Cases
- [ ] All polarity combinations (+→+, +→-, -→-, etc.)
- [ ] Neutral connections
- [ ] Invisible ring connections
- [ ] Toggle multiple times

---

## 📝 Documentation Structure

```
docs/
├── README.md (this file)
│
├── Polarity Refactoring (Critical Issue)
│   ├── POLARITY_REFACTOR_SUMMARY.md        ⭐ Start here
│   ├── wheel-structure-polarity-problem.md  (Visual explanation)
│   ├── polarity-architecture-diagram.md     (Architecture)
│   ├── refactoring-ring-polarity-separation.md (Full plan)
│   └── polarity-refactor-quickstart.md      (Implementation guide)
│
├── Arrow System
│   ├── arrow-parameters.md
│   └── arrow-click-handlers.md
│
└── Migration
    └── migration-npm-to-local.md
```

---

## 🤝 Contributing

When making changes:

1. **Update relevant docs** if changing functionality
2. **Add to polarity refactoring docs** if touching wheel structure or arrows
3. **Test with both toggle states** (`isWhiteOutside = true/false`)
4. **Document breaking changes** in the appropriate guide

---

## 📞 Support

For questions about:

- **Polarity bug**: See `POLARITY_REFACTOR_SUMMARY.md`
- **Arrow system**: See `arrow-parameters.md`
- **Architecture**: See `polarity-architecture-diagram.md`
- **Implementation**: See `polarity-refactor-quickstart.md`

---

## 🔗 External Resources

- [D3.js Documentation](https://d3js.org/)
- [Observable Notebooks](https://observablehq.com/)
- [Perfect Arrows Library](https://github.com/steveruizok/perfect-arrows) (inspiration for arrow parameters)

---

## 📅 Change Log

### Latest Updates

- **2024-10**: Discovered and documented polarity bug
- **2024-10**: Created comprehensive refactoring documentation
- **2024-10**: Implemented clickable arrows with callbacks
- **2024-10**: Migrated from npm package to local files
- **2024-10**: Added perfect-arrows inspired parameters

---

## ⚠️ Known Issues

1. **🔴 CRITICAL: Polarity Bug**
   - `isWhiteOutside` toggle breaks wheel structure
   - Content appears in wrong rings
   - See `POLARITY_REFACTOR_SUMMARY.md` for fix

2. **Arrow hover effects**
   - Z-order may interfere with clicks
   - See `arrow-click-handlers.md` for workarounds

---

## 🎓 Learning Path

If you're new to this codebase:

1. **Understand the bug** → `POLARITY_REFACTOR_SUMMARY.md`
2. **See it visually** → `wheel-structure-polarity-problem.md`
3. **Learn the architecture** → `polarity-architecture-diagram.md`
4. **Study the fix** → `refactoring-ring-polarity-separation.md`
5. **Implement it** → `polarity-refactor-quickstart.md`

This will give you a complete understanding of both the problem and the solution! 🚀

