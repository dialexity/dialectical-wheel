import { useMemo } from 'react';
import { SLICES } from '../config/wheelConfig';

// Type definitions
interface SliceConfig {
  pair: number;
  type: 'thesis' | 'antithesis';
}

interface SequenceWithLabels {
  label: string;
  pair: number;
  type: 'thesis' | 'antithesis';
}

export const useWheelSequence = (
  numPairs: number,
  sliceSequence: SliceConfig[] | null = null
) => {
  // Wheel sequence (matches the JavaScript generateSequence function)
  const wheelSequence = useMemo(() => {
    const sequence = [];
    
    // Handle custom slice sequence or use default
    let firstHalf;
    if (sliceSequence === null) {
      // Default sequence: T1, T2, ..., TN, A1, A2, ..., AN
      firstHalf = [];
      for (let i = 0; i < numPairs; i++) {
        firstHalf.push({ pair: i, type: 'thesis' });
      }
    } else {
      // Validate and use custom sequence
      if (sliceSequence.length !== numPairs) {
        console.error(`sliceSequence must contain exactly ${numPairs} elements for the first half`);
        // Fall back to default
        firstHalf = [];
        for (let i = 0; i < numPairs; i++) {
          firstHalf.push({ pair: i, type: 'thesis' });
        }
      } else {
        firstHalf = [...sliceSequence];
      }
    }
    
    // Create full sequence: first N as specified, next N as opposites
    const secondHalf = firstHalf.map(slice => ({
      pair: slice.pair,
      type: slice.type === 'thesis' ? 'antithesis' : 'thesis'
    }));

    sequence.push(...firstHalf, ...secondHalf);
    return sequence;
  }, [numPairs, sliceSequence]);
  
  const sequenceWithLabels = useMemo((): SequenceWithLabels[] => {
    return wheelSequence.map((slice, index) => ({
      label: `${slice.type === 'thesis' ? 'T' : 'A'}${slice.pair + 1}`,
      pair: slice.pair,
      type: slice.type as 'thesis' | 'antithesis'
    }));
  }, [wheelSequence]);

  // Constants from the JavaScript class
  const normalSliceAngle = 360 / (2 * numPairs);
  const focusedSliceAngle = SLICES.DEFAULT_ANGLE;
  const unfocusedSliceAngle = (360 - 2 * focusedSliceAngle) / (2 * numPairs - 2);

  return {
    wheelSequence,
    sequenceWithLabels,
    normalSliceAngle,
    focusedSliceAngle,
    unfocusedSliceAngle
  };
};

export type { SliceConfig, SequenceWithLabels }; 