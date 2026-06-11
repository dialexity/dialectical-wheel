import React from 'react';
import { RADII } from './utils/geometry';

interface HubProps {
  color: string;
}

export const Hub: React.FC<HubProps> = ({ color }) => (
  <circle cx={0} cy={0} r={RADII.hub} fill={color} />
);
