export function polarToCartesian(r: number, angle: number): [number, number] {
  return [r * Math.sin(angle), -r * Math.cos(angle)];
}

export function describeArc(innerR: number, outerR: number, startAngle: number, endAngle: number): string {
  const [ox1, oy1] = polarToCartesian(outerR, startAngle);
  const [ox2, oy2] = polarToCartesian(outerR, endAngle);
  const [ix1, iy1] = polarToCartesian(innerR, endAngle);
  const [ix2, iy2] = polarToCartesian(innerR, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${ox1} ${oy1}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix1} ${iy1}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
    'Z'
  ].join(' ');
}

export function normalizeAngle(angle: number): number {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

export interface Radii {
  synthesis: number;
  innerStart: number;
  innerEnd: number;
  middleStart: number;
  middleEnd: number;
  outerStart: number;
  outerEnd: number;
  cycleStart: number;
  cycleEnd: number;
}

// The inner (positive/green) ring gets the largest radial share because its
// cells sit near the narrow tip of the wedge (smallest radius = narrowest
// chords), making it the hardest ring to fit text in. Radius is zero-sum
// (outerEnd is fixed at 200 by the cycle ring), so bands are sized to EQUALIZE
// the three body rings' fonts rather than give any one a comfortable margin.
//
// The green ring's font degrades faster than the others as perspectives are
// added (its wedge narrows fastest toward the tip), so a single fixed split
// can't stay balanced: at few perspectives green would dominate, at many it
// would be the smallest. Its share therefore GROWS with the count — the
// positive/neutral boundary moves outward from 105 (1-2 PP) to 130 (4 PP).
// Values are tuned so green ≥ the other two rings at every count (spread ≤ 1px).
function buildRadii(innerEnd: number, middleEnd: number): Radii {
  return {
    synthesis: 30,
    innerStart: 30,
    innerEnd,
    middleStart: innerEnd,
    middleEnd,
    outerStart: middleEnd,
    outerEnd: 200,
    cycleStart: 200,
    cycleEnd: 250,
  };
}

// [innerEnd, middleEnd] boundaries per perspective count (clamped to the 1..4
// range that has been tuned; 5+ reuses the 4-PP split).
const RADII_BY_COUNT: Record<number, [number, number]> = {
  1: [105, 152],
  2: [105, 152],
  3: [118, 159],
  4: [130, 164],
};

export function getRadii(perspectiveCount: number): Radii {
  const key = Math.min(4, Math.max(1, perspectiveCount));
  const [innerEnd, middleEnd] = RADII_BY_COUNT[key];
  return buildRadii(innerEnd, middleEnd);
}

export const RADII = buildRadii(118, 159);
