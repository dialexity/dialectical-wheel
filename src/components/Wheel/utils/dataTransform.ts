import type { Perspective, Cell, CellStyle, SegmentData } from '../../../types';

function extractStatement(value: string | Cell): string {
  if (typeof value === 'string') return value;
  return value?.statement || value?.alias || '';
}

function extractAlias(value: string | Cell, fallback: string): string {
  if (typeof value === 'string') return fallback;
  return value?.alias || fallback;
}

function extractCellStyle(value: string | Cell): Partial<CellStyle> | undefined {
  if (typeof value === 'string') return undefined;
  return value?.style;
}

export interface RingData {
  invisible: SegmentData[];
  negative: SegmentData[];
  neutral: SegmentData[];
  positive: SegmentData[];
}

export function transformPerspectives(
  perspectives: Perspective[],
  segmentOrder?: string[]
): RingData {
  if (!perspectives || perspectives.length === 0) {
    return { invisible: [], negative: [], neutral: [], positive: [] };
  }

  type Entry = {
    segmentId: string;
    statement: string;
    positive: string;
    negative: string;
    pairWith: string;
    segmentStyle?: Partial<CellStyle>;
    cellStyles: {
      positive?: Partial<CellStyle>;
      neutral?: Partial<CellStyle>;
      negative?: Partial<CellStyle>;
    };
  };

  const entries: Entry[] = [];

  perspectives.forEach((perspective, i) => {
    const tAlias = extractAlias(perspective.t, `T${i + 1}`);
    const aAlias = extractAlias(perspective.a, `A${i + 1}`);
    entries.push({
      segmentId: tAlias,
      statement: extractStatement(perspective.t),
      positive: extractStatement(perspective.t_plus),
      negative: extractStatement(perspective.t_minus),
      pairWith: aAlias,
      segmentStyle: perspective.style,
      cellStyles: {
        positive: extractCellStyle(perspective.t_plus),
        neutral: extractCellStyle(perspective.t),
        negative: extractCellStyle(perspective.t_minus),
      },
    });
    entries.push({
      segmentId: aAlias,
      statement: extractStatement(perspective.a),
      positive: extractStatement(perspective.a_plus),
      negative: extractStatement(perspective.a_minus),
      pairWith: tAlias,
      segmentStyle: perspective.style,
      cellStyles: {
        positive: extractCellStyle(perspective.a_plus),
        neutral: extractCellStyle(perspective.a),
        negative: extractCellStyle(perspective.a_minus),
      },
    });
  });

  let ordered = entries;
  if (segmentOrder && segmentOrder.length > 0) {
    const byId = new Map(entries.map(e => [e.segmentId, e]));
    ordered = segmentOrder.map(id => byId.get(id)).filter(Boolean) as Entry[];
  }

  const N = ordered.length;
  const segmentAngle = (2 * Math.PI) / N;

  const buildRing = (
    polarity: SegmentData['polarity'],
    getText: (e: Entry) => string,
    getCellStyle: (e: Entry) => Partial<CellStyle> | undefined,
  ): SegmentData[] =>
    ordered.map((entry, i) => ({
      segmentId: entry.segmentId,
      polarity,
      fullText: getText(entry),
      pairWith: entry.pairWith,
      startAngle: i * segmentAngle,
      endAngle: (i + 1) * segmentAngle,
      cellStyle: mergeCellStyles(entry.segmentStyle, getCellStyle(entry)),
    }));

  return {
    invisible: buildRing('invisible', e => e.segmentId, () => undefined),
    positive: buildRing('positive', e => e.positive, e => e.cellStyles.positive),
    neutral: buildRing('neutral', e => e.statement, e => e.cellStyles.neutral),
    negative: buildRing('negative', e => e.negative, e => e.cellStyles.negative),
  };
}

function mergeCellStyles(
  segment?: Partial<CellStyle>,
  cell?: Partial<CellStyle>,
): Partial<CellStyle> | undefined {
  if (!segment && !cell) return undefined;
  if (!segment) return cell;
  if (!cell) return segment;
  return { ...segment, ...cell };
}
