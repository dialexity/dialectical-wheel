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

const RADII_MULTI: Radii = {
  synthesis: 30,
  innerStart: 30,
  innerEnd: 100,
  middleStart: 100,
  middleEnd: 150,
  outerStart: 150,
  outerEnd: 200,
  cycleStart: 200,
  cycleEnd: 250,
};

const RADII_SINGLE: Radii = {
  synthesis: 30,
  innerStart: 30,
  innerEnd: 87,
  middleStart: 87,
  middleEnd: 143,
  outerStart: 143,
  outerEnd: 200,
  cycleStart: 200,
  cycleEnd: 250,
};

export function getRadii(perspectiveCount: number): Radii {
  return perspectiveCount <= 1 ? RADII_SINGLE : RADII_MULTI;
}

export const RADII = RADII_MULTI;
