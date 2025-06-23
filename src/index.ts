// Main entry point for dialectical-wheel npm module

// Export all components
export { DialecticalWheel, DialecticalWheelWithDOT, ExploreComponent } from './components';
export { AnimatedWheelBuilder } from './components/DialecticalWheel/components/AnimatedWheelBuilder';
export { FramerMotionWheelBuilder } from './components/DialecticalWheel/components/FramerMotionWheelBuilder';
export { FramerMotionDemo } from './examples/FramerMotionDemo';
export type { DialecticalWheelWithDOTProps, WisdomData, WisdomUnit } from './components';

// Export all services and hooks
export { 
  WisdomService, 
  useDialecticalWheel, 
  useDialecticalWheelWithCycles, 
  useManualWheel 
} from './services';

// Export specialized hooks
export { useNodeConnections } from './components/DialecticalWheel/hooks/useNodeConnections';
export { useWheelSlices } from './components/DialecticalWheel/hooks/useWheelSlices';

// Export all utilities
export { 
  SliceAtAngle,
  generatePairTextsFromWisdomUnits,
  defaultPairTexts
} from './utils';

// Export types
export * from './types';

// Default export for convenience
export { DialecticalWheel as default } from './components'; 