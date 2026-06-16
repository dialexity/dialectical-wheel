import React from 'react';
import type { Radii } from './utils/geometry';
import { resolveStyle } from './utils/styles';
import type { Styles } from '../../types';

interface SynthesisRingProps {
  styles: Styles;
  radii: Radii;
}

export const SynthesisRing: React.FC<SynthesisRingProps> = ({ styles, radii }) => {
  const resolved = resolveStyle(styles, 'synthesis', radii.innerEnd - radii.innerStart);
  return (
    <circle
      cx={0}
      cy={0}
      r={radii.synthesis}
      fill={resolved.background}
      stroke={resolved.borderColor}
      strokeWidth={resolved.borderWidth}
    />
  );
};
