# Styling

The wheel's `styles` prop follows a CSS-table-like cascading model. The wheel is conceptually a circular table:

| Table     | Wheel           | Description                              |
|-----------|-----------------|------------------------------------------|
| `table`   | wheel           | Top-level defaults                       |
| `thead`   | header ring(s)  | Segment label ring (cycle/wheel)         |
| `tbody`   | body rings      | Positive, negative, neutral rings        |
| `tfoot`   | synthesis ring  | Center hub                               |
| `tr`      | ring            | A specific ring (row) within a group     |
| `colgroup`| perspective     | Two opposite segments grouped            |
| `col`     | segment         | One vertical slice (thesis or antithesis) |
| `td`      | cell            | Intersection of ring × segment           |

## The `styles` prop

```typescript
type RowScope = Partial<CellStyle> & {
  thesis?: Partial<CellStyle> & { [n: number]: Partial<CellStyle> };
  antithesis?: Partial<CellStyle> & { [n: number]: Partial<CellStyle> };
} & { [n: number]: Partial<CellStyle> };

interface Styles extends Partial<CellStyle> {
  dimUnfocused?: number;
  thead?: RowScope & { neutral?: RowScope };
  tbody?: Partial<CellStyle> & {
    positive?: RowScope;
    negative?: RowScope;
    neutral?: RowScope;
  };
  tfoot?: RowScope;
}
```

## Navigation paths

Every level can hold `CellStyle` properties AND scope further into children:

| Path                              | Targets                                        |
|-----------------------------------|------------------------------------------------|
| `styles.background`              | All cells (table default)                      |
| `styles.thead`                   | All header ring cells                          |
| `styles.thead.neutral`           | Neutral ring when `neutralOutside='header'`    |
| `styles.tbody`                   | All body ring cells                            |
| `styles.tbody.positive`          | All positive ring cells                        |
| `styles.tbody.positive.thesis`   | Thesis-side positive cells                     |
| `styles.tbody.positive.antithesis` | Antithesis-side positive cells               |
| `styles.tbody.positive[0]`       | 1st perspective's positive cells (both T & A)  |
| `styles.tbody.positive.thesis[0]`| 1st perspective's thesis positive cell         |
| `styles.tbody.negative[2]`       | 3rd perspective's negative cells               |
| `styles.tfoot`                   | All synthesis cells                            |
| `styles.tfoot[0]`               | 1st perspective's synthesis wedge              |
| `styles.tfoot.thesis`           | Thesis-side synthesis wedges                   |
| `styles.tfoot.thesis[1]`        | 2nd perspective's thesis synthesis wedge       |

## Cascade (specificity order)

From lowest to highest priority — the last defined value wins:

```
1. styles                          (table)
2. styles.tbody                    (row-group)
3. styles.tbody.positive           (row)
4. styles.tbody.positive.thesis    (row + col-type)
5. styles.tbody.positive[2]        (row + nth)
6. styles.tbody.positive.thesis[2] (row + col-type + nth)
7. cell.style / perspective.style  (inline — from data objects)
```

Numeric index (`[n]`) always adds specificity over col-type alone. This mirrors CSS where a more specific selector wins regardless of source order.

For `thead` and `tfoot`, the cascade is the same pattern but with fewer row levels (they have at most one sub-row like `thead.neutral`).

## `thead.neutral`

The `thead.neutral` scope activates only when `neutralOutside='header'` is set — in that mode, the neutral ring physically merges into the header. Declare `thead.neutral` and it only applies when the neutral ring lives there:

```tsx
<Wheel
  neutralOutside="header"
  styles={{
    thead: {
      neutral: { background: '#E8EAF6', color: '#1A237E' },
    },
  }}
/>
```

## Inline styles (data objects)

Per-item styling on data objects acts as the highest-priority override (layer 7):

```typescript
interface Perspective {
  style?: Partial<CellStyle>;  // applies to all cells in both segments (colgroup)
  // each cell can also have:
  t_plus: { statement: '...', style: { background: '#custom' } };
}
```

## Examples

### Highlight one perspective

```tsx
styles={{
  tbody: {
    positive: { 0: { background: '#8BC34A' } },
    negative: { 0: { background: '#E57373' } },
    neutral:  { 0: { background: '#E3F2FD' } },
  },
}}
```

### Thesis vs antithesis coloring

```tsx
styles={{
  tbody: {
    positive: {
      thesis: { background: '#A8D99C' },
      antithesis: { background: '#D4EDDA' },
    },
  },
}}
```

### Per-perspective synthesis colors

```tsx
styles={{
  tfoot: {
    0: { background: '#FFD54F' },
    1: { background: '#FF8A65' },
    2: { background: '#81C784' },
    3: { background: '#64B5F6' },
  },
}}
```

### Specific cell: 2nd perspective's thesis positive

```tsx
styles={{
  tbody: {
    positive: {
      thesis: { 1: { background: '#FF0', color: '#000' } },
    },
  },
}}
```

## CellStyle properties

```typescript
interface CellStyle {
  background: string;
  color: string;
  fontSize: CSSValue;        // number (px) or string ("14px", "80%", "0.9em")
  padding: CSSValue;
  border: { width: CSSValue; color: string };
  hoverBorderColor: string;
  selectedBorder: { width: CSSValue; color: string };
}
```

All properties cascade — set at any level and they apply to everything below unless overridden.
