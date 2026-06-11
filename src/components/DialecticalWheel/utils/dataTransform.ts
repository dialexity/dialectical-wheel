import type { WisdomUnit, SliceData } from '../../../types';

function extractStatement(value: string | { statement?: string; alias?: string }): string {
  if (typeof value === 'string') return value;
  return value?.statement || value?.alias || '';
}

function extractAlias(value: string | { alias?: string }, fallback: string): string {
  if (typeof value === 'string') return fallback;
  return value?.alias || fallback;
}

export interface RingData {
  invisible: SliceData[];
  negative: SliceData[];
  neutral: SliceData[];
  positive: SliceData[];
}

export function transformWisdomUnits(
  wisdomUnits: WisdomUnit[],
  componentOrder?: string[]
): RingData {
  if (!wisdomUnits || wisdomUnits.length === 0) {
    return { invisible: [], negative: [], neutral: [], positive: [] };
  }

  type Entry = { unitId: string; statement: string; positive: string; negative: string; pairWith: string };
  const entries: Entry[] = [];

  wisdomUnits.forEach((unit, i) => {
    const tAlias = extractAlias(unit.t, `T${i + 1}`);
    const aAlias = extractAlias(unit.a, `A${i + 1}`);
    entries.push({
      unitId: tAlias,
      statement: extractStatement(unit.t),
      positive: extractStatement(unit.t_plus),
      negative: extractStatement(unit.t_minus),
      pairWith: aAlias,
    });
    entries.push({
      unitId: aAlias,
      statement: extractStatement(unit.a),
      positive: extractStatement(unit.a_plus),
      negative: extractStatement(unit.a_minus),
      pairWith: tAlias,
    });
  });

  let ordered = entries;
  if (componentOrder && componentOrder.length > 0) {
    const byId = new Map(entries.map(e => [e.unitId, e]));
    ordered = componentOrder.map(id => byId.get(id)).filter(Boolean) as Entry[];
  }

  const N = ordered.length;
  const sliceAngle = (2 * Math.PI) / N;

  const buildRing = (polarity: SliceData['polarity'], getText: (e: Entry) => string): SliceData[] =>
    ordered.map((entry, i) => ({
      unitId: entry.unitId,
      polarity,
      fullText: getText(entry),
      pairWith: entry.pairWith,
      startAngle: i * sliceAngle,
      endAngle: (i + 1) * sliceAngle,
    }));

  return {
    invisible: buildRing('invisible', e => e.unitId),
    positive: buildRing('positive', e => e.positive),
    neutral: buildRing('neutral', e => e.statement),
    negative: buildRing('negative', e => e.negative),
  };
}
