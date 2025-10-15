# Dialectical Wheel Documentation

## 📚 Documentation Index

### 🔴 Critical Issue: Polarity Refactoring

**Problem**: The `isWhiteOutside` toggle is broken - arrows don't follow the swapped ring positions because the codebase conflates physical positions with semantic meanings!

---

## 🚀 **READY TO IMPLEMENT? START HERE:**

### **[📁 refactor-semantic-rings/](./refactor-semantic-rings/)** ⭐⭐⭐ **ALL-IN-ONE IMPLEMENTATION GUIDE**

This directory contains everything you need in one organized place:

1. **[README.md](./refactor-semantic-rings/README.md)** - Start here! Implementation guide with checklist
2. **[00-COMPLETE-AUDIT.md](./refactor-semantic-rings/00-COMPLETE-AUDIT.md)** - All 50+ instances to change
3. **[01-VISUAL-GUIDE.md](./refactor-semantic-rings/01-VISUAL-GUIDE.md)** - Architecture diagrams & data flow
4. **[02-IMPLEMENTATION-TEMPLATE.md](./refactor-semantic-rings/02-IMPLEMENTATION-TEMPLATE.md)** - Copy-paste code templates

**Total time**: ~21 hours | **Files to modify**: 1 main file | **Test coverage**: Full checklist included

---

#### Additional Context (Background Reading):

1. **[polarity-conflation-audit.md](./polarity-conflation-audit.md)** - Earlier audit focused on arrows
2. **[POLARITY_REFACTOR_SUMMARY.md](./POLARITY_REFACTOR_SUMMARY.md)** - Executive summary of the bug
3. **[wheel-structure-polarity-problem.md](./wheel-structure-polarity-problem.md)** - Visual diagrams
4. **[polarity-architecture-diagram.md](./polarity-architecture-diagram.md)** - Architecture diagrams
5. **[refactoring-ring-polarity-separation.md](./refactoring-ring-polarity-separation.md)** - Earlier refactor plan
6. **[polarity-refactor-quickstart.md](./polarity-refactor-quickstart.md)** - Quick guide

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
# Everything you need is in one directory:
cd docs/refactor-semantic-rings

# 1. Start with the README
open README.md

# 2. Read the complete audit (30 min)
open 00-COMPLETE-AUDIT.md

# 3. Understand visually (20 min)
open 01-VISUAL-GUIDE.md

# 4. Use code templates during implementation
open 02-IMPLEMENTATION-TEMPLATE.md
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

- **Phase 1** (Helpers): 3 hours
- **Phase 2** (Data structure): 3 hours ⚠️ Critical
- **Phase 3** (Arrows): 2 hours
- **Phase 4** (Styling): 2 hours
- **Phase 5** (Colors): 1 hour
- **Phase 6** (Step Mode): 5 hours ⚠️ Most complex
- **Phase 7** (Cleanup): 1 hour
- **Testing**: 4 hours
- **Total**: ~21 hours

See [semantic-rings-refactor.md](./semantic-rings-refactor.md) for complete breakdown.

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
├── 📁 refactor-semantic-rings/          ⭐⭐⭐ START HERE FOR IMPLEMENTATION
│   ├── README.md                         Implementation guide + checklist
│   ├── 00-COMPLETE-AUDIT.md              All 50+ instances to change
│   ├── 01-VISUAL-GUIDE.md                Architecture diagrams
│   └── 02-IMPLEMENTATION-TEMPLATE.md     Copy-paste code templates
│
├── Polarity Refactoring (Background Context)
│   ├── polarity-conflation-audit.md
│   ├── POLARITY_REFACTOR_SUMMARY.md
│   ├── wheel-structure-polarity-problem.md
│   ├── polarity-architecture-diagram.md
│   ├── refactoring-ring-polarity-separation.md
│   └── polarity-refactor-quickstart.md
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

1. **Go to refactor directory** → `cd docs/refactor-semantic-rings/` ⭐⭐⭐
2. **Read the README** → `README.md` - Start here!
3. **Complete Audit** → `00-COMPLETE-AUDIT.md` - All instances to change
4. **Visual Guide** → `01-VISUAL-GUIDE.md` - See the architecture
5. **Code Templates** → `02-IMPLEMENTATION-TEMPLATE.md` - Copy-paste helpers
6. **Background context** → Other docs in parent directory (optional)

This gives you everything you need in one place! 🚀

**TLDR**: The codebase uses `outer/middle/inner` (position) everywhere, but should use `positive/negative/neutral` (semantics) to properly support the `isWhiteOutside` toggle. Go to `docs/refactor-semantic-rings/` for the complete implementation guide.

