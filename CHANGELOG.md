# Changelog

All notable changes to the DialecticalWheel component will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING**: Updated color property names from positional to semantic naming:
  - `userRingColors.outer` → `userRingColors.negative` (red ring)
  - `userRingColors.middle` → `userRingColors.neutral` (white ring)  
  - `userRingColors.inner` → `userRingColors.positive` (green ring)
  - `userTextColors.outer` → `userTextColors.negative`
  - `userTextColors.middle` → `userTextColors.neutral`
  - `userTextColors.inner` → `userTextColors.positive`
- Updated TypeScript interface `Colors` to reflect semantic naming
- Updated default color values in component to use semantic naming
- Updated README documentation to reflect new color property names

### Added
- `AsOnly` preference option to show only Antitheses slices
- Enhanced semantic ring architecture with clearer polarity separation

### Fixed
- Improved color property naming for better semantic clarity
- Updated component to use local notebook implementation instead of npm package

## [Previous Versions]

### Migration Notes

If you're upgrading from a version that used the old color naming:

```js
// Old way (deprecated)
colors={{
  userRingColors: { outer: '#F9C6CC', middle: '#ffffff', inner: '#C6E5B3' },
  userTextColors: { outer: '#8b1538', middle: '#333', inner: '#2d5a2d', coordinates: '#333' },
  userHubColor: '#ffff7a'
}}

// New way (current)
colors={{
  userRingColors: { negative: '#F9C6CC', neutral: '#ffffff', positive: '#C6E5B3' },
  userTextColors: { negative: '#8b1538', neutral: '#333', positive: '#2d5a2d', coordinates: '#333' },
  userHubColor: '#ffff7a'
}}
```

The semantic naming better reflects the actual meaning of each ring:
- `negative`: Red ring (antitheses, negative polarity)
- `neutral`: White ring (neutral/synthesis elements)  
- `positive`: Green ring (theses, positive polarity)
