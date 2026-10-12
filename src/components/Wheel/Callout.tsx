import React from 'react';
import { polarToCartesian } from './utils/geometry';
import type { CSSValue } from '../../types';

export interface CalloutProps {
  segment?: string;
  rightEdge?: string;
  border?: { width?: CSSValue; color?: string };
  tail?: 'triangle' | 'line';
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function Callout(_props: CalloutProps): React.ReactElement | null {
  return null;
}
Callout._isWheelCallout = true;

interface CalloutInternalProps {
  midAngle: number;
  anchorR: number;
  anchorAngle: number;
  endR: number;
  rotationDeg: number;
  border: { width: number; color: string };
  tail: 'triangle' | 'line';
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const FO_SIZE = 400;

export function CalloutInternal({
  midAngle,
  anchorR,
  anchorAngle,
  endR,
  rotationDeg,
  border,
  tail,
  header,
  children,
}: CalloutInternalProps) {
  const { width: borderWidth, color: borderColor } = border;
  const [tipX, tipY] = polarToCartesian(anchorR, anchorAngle);
  const [endX, endY] = polarToCartesian(endR, midAngle);
  // Extend tail past endpoint so it always reaches into the box regardless of rotation
  const TAIL_OVERSHOOT = 20;
  const [tailBaseX, tailBaseY] = polarToCartesian(endR + TAIL_OVERSHOOT, midAngle);

  // Outward direction in screen space after counter-rotation
  // Push box so its inner edge/corner sits at the endpoint, never intruding toward wheel center
  const rotRad = rotationDeg * Math.PI / 180;
  const effectiveAngle = midAngle + rotRad;
  const normX = Math.sin(effectiveAngle);
  const normY = -Math.cos(effectiveAngle);
  const maxAbs = Math.max(Math.abs(normX), Math.abs(normY), 0.001);
  // Fraction of the box's own size that sits on the wheel side of the
  // endpoint along each axis: 0.5 = centred on it, 0 = inner edge at it
  const kx = 0.5 - 0.5 * normX / maxAbs;
  const ky = 0.5 - 0.5 * normY / maxAbs;

  let tailElement: React.ReactNode;
  if (tail === 'triangle') {
    const tailWidth = 8;
    const tangentX = Math.cos(midAngle);
    const tangentY = Math.sin(midAngle);
    const leftX = tailBaseX + tailWidth * tangentX;
    const leftY = tailBaseY + tailWidth * tangentY;
    const rightX = tailBaseX - tailWidth * tangentX;
    const rightY = tailBaseY - tailWidth * tangentY;
    tailElement = (
      <path
        d={`M ${tipX} ${tipY} L ${leftX} ${leftY} L ${rightX} ${rightY} Z`}
        fill={borderColor}
        opacity={0.8}
      />
    );
  } else {
    tailElement = (
      <line
        x1={tipX}
        y1={tipY}
        x2={tailBaseX}
        y2={tailBaseY}
        stroke={borderColor}
        strokeWidth={borderWidth * 2}
      />
    );
  }

  // No CSS transform (or anything else that gives the HTML its own layer)
  // may sit inside the foreignObject: WebKit composites such an element
  // outside the SVG, so it ignores the viewBox scale and the rotated group —
  // in Safari the box drew at page scale, unrotated, away from its anchor.
  // So the push-away is done by layout, not translate(%): the foreignObject
  // is placed so the endpoint sits kx/ky of the way across it, and grid
  // fractions split the space around the box in the same kx/ky ratio, which
  // puts the endpoint kx/ky of the way across the box whatever its size.
  // The position likewise goes in the group's transform, not the
  // foreignObject's own x/y, which Safari also misplaced inside the rotation.
  const originX = endX - FO_SIZE * kx;
  const originY = endY - FO_SIZE * ky;

  return (
    <g>
      {tailElement}
      <g transform={`rotate(${-rotationDeg}, ${endX}, ${endY}) translate(${originX}, ${originY})`}>
        <foreignObject
          x={0}
          y={0}
          width={FO_SIZE}
          height={FO_SIZE}
          overflow="visible"
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `${kx}fr auto ${1 - kx}fr`,
              gridTemplateRows: `${ky}fr auto ${1 - ky}fr`,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                pointerEvents: 'auto',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 180,
                width: 'fit-content',
                gridColumn: 2,
                gridRow: 2,
              }}
            >
              {header && (
                <div style={{ fontSize: 11, lineHeight: 1.3, marginBottom: 2 }}>
                  {header}
                </div>
              )}
              <div
                style={{
                  background: borderColor,
                  border: `${borderWidth}px solid ${borderColor}`,
                  borderRadius: 4,
                  padding: '4px 8px',
                  fontSize: 11,
                  lineHeight: 1.3,
                  width: 'fit-content',
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </foreignObject>
      </g>
    </g>
  );
}
