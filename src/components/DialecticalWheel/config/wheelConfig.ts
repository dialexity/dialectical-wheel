export const WHEEL_CONFIG = {
  // Core wheel dimensions
  DIMENSIONS: {
    CENTER_X: 200,
    CENTER_Y: 200,
    RADIUS: 150,
    CENTER_CIRCLE_RADIUS: 30,
    SLICE_INNER_RADIUS_RATIO: 0.3, // Inner radius is 30% of total radius
    SLICE_OUTER_RADIUS_RATIO: 1.0,  // Outer radius is 100% of total radius
  },

  // Colors
  COLORS: {
    // Slice type colors
    THESIS: '#4CAF50',        // Green for thesis
    ANTITHESIS: '#F44336',    // Red for antithesis
    
    // Layer colors (from inner to outer)
    LAYER_COLORS: ['#C6E5B3', '#FFFFFF', '#F9C6CC'], // green, white, pink
    
    // UI colors
    PRIMARY_BLUE: '#007AFF',
    ACCENT_BLUE: '#0074d9',
    CENTER_CIRCLE: '#FFC107', // Yellow/gold
    BOUNDARY_LINES: '#888',   // Gray
    
    // Arrow marker colors
    ARROWS: {
      DEFAULT: '#0074d9',
      ORANGE: '#FF6B35',
      BLUE: '#2196F3',
      PURPLE: '#9C27B0',
      GREEN: '#4CAF50',
    },
    
    // Background and UI
    BACKGROUND: '#f7f7f7',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
  },

  // Typography
  TYPOGRAPHY: {
    // Font sizes for different elements
    CENTER_LABEL: 16,
    SLICE_LAYERS: [8, 10, 14], // Inner, middle, outer layer font sizes
    DEFAULT_FONT_FAMILY: "'Arial Rounded MT Bold', Arial, sans-serif",
  },

  // Slice configuration
  SLICES: {
    DEFAULT_ANGLE: 120,
    LAYER_COUNT: 3,
    // Layer distribution within slice (as ratios)
    LAYER_RATIOS: [
      { inner: 0.3, outer: 0.55 }, // Inner layer: 30% to 55%
      { inner: 0.55, outer: 0.775 }, // Middle layer: 55% to 77.5%
      { inner: 0.775, outer: 1.0 },  // Outer layer: 77.5% to 100%
    ],
  },

  // Stroke and line properties
  STROKES: {
    BOUNDARY_WIDTH: 1,
    HOVER_WIDTH: 2,
    FOCUS_WIDTH: 3,
    ARROW_WIDTH: 2,
    DEBUG_WIDTH: 2,
  },

  // Animation and interaction
  ANIMATION: {
    // Rotation hints configuration
    ROTATION_HINTS: [
      { radius: 160, opacity: 0.7, strokeWidth: 2, dashArray: "8 4", duration: "6s", direction: 1 },
      { radius: 170, opacity: 0.6, strokeWidth: 1.5, dashArray: "4 8", duration: "8s", direction: 1 },
      { radius: 180, opacity: 0.5, strokeWidth: 2, dashArray: "2 4", duration: "12s", direction: -1 },
      { radius: 190, opacity: 0.4, strokeWidth: 1, dashArray: "6 3", duration: "10s", direction: 1 },
      { radius: 200, opacity: 0.3, strokeWidth: 1.5, dashArray: "3 6", duration: "15s", direction: -1 },
      { radius: 210, opacity: 0.2, strokeWidth: 1, dashArray: "5 2", duration: "18s", direction: 1 }
    ],
    
    // Transition durations
    TRANSITION_DURATION: '0.3s',
    OPACITY_TRANSITION: '0.2s',
  },

  // SVG markers configuration
  MARKERS: {
    ROTATION_ARROW: {
      id: 'rotation-arrow',
      width: 8,
      height: 6,
      refX: 8,
      refY: 3,
      color: '#007AFF',
      opacity: 0.6,
    },
    
    ARROWHEADS: [
      { id: 'arrowhead', color: '#0074d9' },
      { id: 'arrowhead-orange', color: '#FF6B35' },
      { id: 'arrowhead-blue', color: '#2196F3' },
      { id: 'arrowhead-purple', color: '#9C27B0' },
      { id: 'arrowhead-green', color: '#4CAF50' },
    ],
    
    ARROWHEAD_DIMENSIONS: {
      width: 6,
      height: 4,
      refX: 6,
      refY: 2,
    },
  },

  // Interaction zones and thresholds
  INTERACTION: {
    HOVER_OPACITY: 0.8,
    SELECTED_OPACITY: 0.9,
    FOCUS_BRIGHTNESS: 1.2,
    PAIR_HIGHLIGHT_BRIGHTNESS: 1.1,
    
    // Touch and click thresholds
    TOUCH_THRESHOLD: 10, // pixels
    DOUBLE_TAP_DELAY: 300, // milliseconds
  },

  // Layout and responsive design
  LAYOUT: {
    SVG_VIEWBOX: "0 0 400 400",
    
    // Responsive breakpoints (matching CSS)
    BREAKPOINTS: {
      MOBILE: 768,
      SMALL_MOBILE: 480,
    },
    
    // Control overlay positioning
    CONTROLS_OVERLAY: {
      top: 60,
      left: 20,
      fontSize: 12,
      padding: 8,
    },
  },

  // Default wheel configuration
  DEFAULTS: {
    NUM_PAIRS: 4,
    TITLE: "Win-Win",
    CENTER_LABEL: "Core",
    SHOW_BOUNDARIES: true,
    ENABLE_ARROWS: false,
  },
} as const;

// Export individual sections for convenience
export const { DIMENSIONS, COLORS, TYPOGRAPHY, SLICES, STROKES, ANIMATION, MARKERS, INTERACTION, LAYOUT, DEFAULTS } = WHEEL_CONFIG;

// Type definitions for configuration
export type WheelConfig = typeof WHEEL_CONFIG;
export type WheelDimensions = typeof DIMENSIONS;
export type WheelColors = typeof COLORS;
export type WheelTypography = typeof TYPOGRAPHY; 