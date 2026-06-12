import React from 'react';
import { RADII } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { Styles } from '../../types';

interface SynthesisRingProps {
  styles: Styles;
}

export const SynthesisRing: React.FC<SynthesisRingProps> = ({ styles }) => {
  const resolved = resolveStyle(styles, 'synthesis', RADII.innerEnd - RADII.innerStart);
  return (
    <circle
      cx={0}
      cy={0}
      r={RADII.synthesis}
      fill={resolved.background}
      stroke={resolved.borderColor}
      strokeWidth={resolved.borderWidth}
    />
  );
};
