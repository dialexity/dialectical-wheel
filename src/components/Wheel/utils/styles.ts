import type { CSSValue, CellStyle, Styles, ResolvedCellStyle, VerticalAlign } from '../../../types';

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

function resolveVerticalAlign(value: VerticalAlign | undefined): VerticalAlign {
  return value || 'middle';
}

type RingName = 'positive' | 'negative' | 'neutral' | 'synthesis';

export function resolveStyle(
  styles: Styles,
  ring: RingName | 'cycle',
  cellRadialHeight: number,
  cellOverride?: Partial<CellStyle>,
  segmentOverride?: Partial<CellStyle>,
): ResolvedCellStyle {
  const wheel = styles as Partial<CellStyle>;
  const section = ring === 'cycle' ? styles.thead : styles.tbody;
  const ringLevel = ring !== 'cycle' ? (styles.tbody as any)?.[ring] as Partial<CellStyle> | undefined : undefined;

  // Cascade: wheel -> section (thead/tbody) -> ring -> segment -> cell
  const layers: (Partial<CellStyle> | undefined)[] = [wheel, section, ringLevel, segmentOverride, cellOverride];

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

  return {
    background: (get('background') as string) || '#ffffff',
    color: (get('color') as string) || '#333333',
    fontSize: resolveCSSValue(get('fontSize'), cellRadialHeight, 12),
    padding: resolveCSSValue(get('padding'), cellRadialHeight, cellRadialHeight * 0.05),
    verticalAlign: resolveVerticalAlign(get('verticalAlign')),
    borderWidth: resolveCSSValue(getBorder('width'), cellRadialHeight, 0.5),
    borderColor: (getBorder('color') as string) || '#ddd',
    hoverBorderColor: (get('hoverBorderColor') as string) || '#999',
    selectedBorderWidth: resolveCSSValue(getSelectedBorder('width'), cellRadialHeight, 1),
    selectedBorderColor: (getSelectedBorder('color') as string) || '#666',
  };
}

export const DEFAULT_STYLES: Styles = {
  fontSize: 12,
  border: { width: 0.5, color: '#ddd' },
  thead: {
    color: '#333333',
    fontSize: 12,
    border: { width: 0.5, color: 'transparent' },
  },
  tbody: {
    positive: { background: '#C6E5B3', color: '#2d5a2d', verticalAlign: 'top' },
    negative: { background: '#F9C6CC', color: '#8b1538' },
    neutral: { background: '#ffffff', color: '#333333' },
    synthesis: { background: '#ffff7a' },
  },
};
