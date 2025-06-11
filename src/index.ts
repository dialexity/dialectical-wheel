// Main entry point for dialectical-wheel npm module

// Export all components
export { DialecticalWheel, ExploreComponent } from './components';

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