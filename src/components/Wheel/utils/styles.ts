import type { CSSValue, CellStyle, Styles, StyleContext, RowScope, ResolvedCellStyle } from '../../../types';

function resolveCSSValue(value: CSSValue | undefined, relativeTo: number, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const str = value.trim();
  if (str.endsWith('%')) {
    return (parseFloat(str) / 100) * relativeTo;
  }
  if (str.endsWith('px')) {
    return parseFloat(str);
  }
  return parseFloat(str) || fallback;
}

export function resolveStyle(
  styles: Styles,
  ctx: StyleContext,
  cellRadialHeight: number,
  cellOverride?: Partial<CellStyle>,
): ResolvedCellStyle {
  const layers: (Partial<CellStyle> | undefined)[] = [];

  // 1. Table level
  layers.push(styles as Partial<CellStyle>);

  // 2. Row-group level
  const group = styles[ctx.rowGroup];
  layers.push(group as Partial<CellStyle> | undefined);

  // 3. Row level (ring within row-group)
  let row: RowScope | undefined;
  if (ctx.rowGroup === 'tbody' && ctx.ring !== 'cycle' && ctx.ring !== 'synthesis') {
    row = (group as Styles['tbody'])?.[ctx.ring as 'positive' | 'negative' | 'neutral'];
    layers.push(row as Partial<CellStyle> | undefined);
  } else if (ctx.rowGroup === 'thead' && ctx.ring === 'neutral') {
    row = (group as Styles['thead'])?.neutral;
    layers.push(row as Partial<CellStyle> | undefined);
  } else if (ctx.rowGroup === 'tfoot') {
    // tfoot IS the row — no sub-ring. Backward compat: fall back to tbody.synthesis
    if (!group && (styles.tbody as any)?.synthesis) {
      layers.push((styles.tbody as any).synthesis as Partial<CellStyle>);
    }
    row = group as RowScope | undefined;
  }

  // 4. Row + col-type (e.g. tbody.positive.thesis)
  if (row) {
    const colScope = row[ctx.colType];
    layers.push(colScope as Partial<CellStyle> | undefined);
  }

  // 5. Row + nth (e.g. tbody.positive[2])
  if (row && ctx.perspectiveIndex >= 0) {
    layers.push(row[ctx.perspectiveIndex] as Partial<CellStyle> | undefined);
  }

  // 6. Row + col-type + nth (e.g. tbody.positive.thesis[2])
  if (row && ctx.perspectiveIndex >= 0) {
    const colScope = row[ctx.colType];
    if (colScope) {
      layers.push(colScope[ctx.perspectiveIndex] as Partial<CellStyle> | undefined);
    }
  }

  // 7. Cell inline (from data object — highest priority)
  layers.push(cellOverride);

  const get = <K extends keyof CellStyle>(key: K): CellStyle[K] | undefined => {
    for (let i = layers.length - 1; i >= 0; i--) {
      const v = layers[i]?.[key];
      if (v !== undefined) return v;
    }
    return undefined;
  };

  const getBorder = (prop: 'width' | 'color'): string | CSSValue | undefined => {
    for (let i = layers.length - 1; i >= 0; i--) {
      const b = layers[i]?.border;
      if (b && b[prop] !== undefined) return b[prop];
    }
    return undefined;
  };

  const getSelectedBorder = (prop: 'width' | 'color'): string | CSSValue | undefined => {
    for (let i = layers.length - 1; i >= 0; i--) {
      const b = layers[i]?.selectedBorder;
      if (b && b[prop] !== undefined) return b[prop];
    }
    return undefined;
  };

  const getArrow = (prop: 'width' | 'color'): string | CSSValue | undefined => {
    for (let i = layers.length - 1; i >= 0; i--) {
      const a = layers[i]?.arrow;
      if (a && a[prop] !== undefined) return a[prop];
    }
    return undefined;
  };

  const resolvedBorderColor = (getBorder('color') as string) || '#ddd';
  const resolvedHoverBorderColor = (get('hoverBorderColor') as string) || '#999';

  return {
    background: (get('background') as string) || '#ffffff',
    color: (get('color') as string) || '#333333',
    fontSize: resolveCSSValue(get('fontSize'), cellRadialHeight, 12),
    padding: resolveCSSValue(get('padding'), cellRadialHeight, cellRadialHeight * 0.06),
    borderWidth: resolveCSSValue(getBorder('width'), cellRadialHeight, 0.5),
    borderColor: resolvedBorderColor,
    hoverBorderColor: resolvedHoverBorderColor,
    selectedBorderWidth: resolveCSSValue(getSelectedBorder('width'), cellRadialHeight, 1),
    selectedBorderColor: (getSelectedBorder('color') as string) || '#666',
    // Arrows default to a visible gray rather than tracking the table border
    // color: the border defaults to white (#fff) for hairline cell separators,
    // which would render header-ring arrows invisibly white-on-white. #999
    // matches the hover-border/arrow-hover default so segment-hover reads as a
    // width change, not a color shift. An explicit arrow.color still wins.
    arrowColor: (getArrow('color') as string) || '#999',
    arrowHoverColor: (get('hoverArrowColor') as string) || resolvedHoverBorderColor,
    arrowWidth: resolveCSSValue(getArrow('width'), cellRadialHeight, cellRadialHeight * 0.03),
  };
}

export const DEFAULT_STYLES: Styles = {
  fontSize: 12,
  border: { width: 0.5, color: '#fff' },
  thead: {
    color: '#333333',
    fontSize: 12,
    border: { width: 0.5, color: 'transparent' },
  },
  tbody: {
    positive: { background: '#C6E5B3', color: '#2d5a2d' },
    negative: { background: '#F9C6CC', color: '#8b1538' },
    neutral: { background: '#ffffff', color: '#333333' },
  },
  tfoot: { background: '#ffff7a' },
};
