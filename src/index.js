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

// Export all utilities
export { 
  createSliceAtAngle,
  generateWheelFromWisdomUnits,
  createThesisAntithesisWheel,
  createWisdomUnit,
  createComponent,
  generatePairTextsFromWisdomUnits,
  generateDetailedSlice,
  defaultPairTexts
} from './utils';

// Default export for convenience
export { DialecticalWheel as default } from './components'; 