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

  // Outward direction in screen space after counter-rotation
  const rotRad = rotationDeg * Math.PI / 180;
  const effectiveAngle = midAngle + rotRad;
  const normX = Math.sin(effectiveAngle);
  const normY = -Math.cos(effectiveAngle);
  const pushStrength = 20 + 15 * Math.min(Math.abs(normX), Math.abs(normY)) / 0.707;
  const tx = normX * pushStrength;
  const ty = normY * pushStrength;

  let tailElement: React.ReactNode;
  if (tail === 'triangle') {
    const tailWidth = 8;
    const tangentX = Math.cos(midAngle);
    const tangentY = Math.sin(midAngle);
    const leftX = endX + tailWidth * tangentX;
    const leftY = endY + tailWidth * tangentY;
    const rightX = endX - tailWidth * tangentX;
    const rightY = endY - tailWidth * tangentY;
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
        x2={endX}
        y2={endY}
        stroke={borderColor}
        strokeWidth={borderWidth * 2}
      />
    );
  }

  return (
    <g>
      {tailElement}
      <g transform={`rotate(${-rotationDeg}, ${endX}, ${endY})`}>
        <foreignObject
          x={endX - FO_SIZE / 2}
          y={endY - FO_SIZE / 2}
          width={FO_SIZE}
          height={FO_SIZE}
          overflow="visible"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
                transform: tail === 'triangle' ? `translate(${tx}%, ${ty}%)` : undefined,
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
