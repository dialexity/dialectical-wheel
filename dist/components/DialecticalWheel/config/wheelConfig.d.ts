export declare const WHEEL_CONFIG: {
    readonly DIMENSIONS: {
        readonly CENTER_X: 200;
        readonly CENTER_Y: 200;
        readonly RADIUS: 150;
        readonly CENTER_CIRCLE_RADIUS: 30;
        readonly SLICE_INNER_RADIUS_RATIO: 0.3;
        readonly SLICE_OUTER_RADIUS_RATIO: 1;
    };
    readonly COLORS: {
        readonly THESIS: "#4CAF50";
        readonly ANTITHESIS: "#F44336";
        readonly LAYER_COLORS: readonly ["#C6E5B3", "#FFFFFF", "#F9C6CC"];
        readonly PRIMARY_BLUE: "#007AFF";
        readonly ACCENT_BLUE: "#0074d9";
        readonly CENTER_CIRCLE: "#FFC107";
        readonly BOUNDARY_LINES: "#888";
        readonly ARROWS: {
            readonly DEFAULT: "#0074d9";
            readonly ORANGE: "#FF6B35";
            readonly BLUE: "#2196F3";
            readonly PURPLE: "#9C27B0";
            readonly GREEN: "#4CAF50";
        };
        readonly BACKGROUND: "#f7f7f7";
        readonly WHITE: "#FFFFFF";
        readonly BLACK: "#000000";
    };
    readonly TYPOGRAPHY: {
        readonly CENTER_LABEL: 16;
        readonly SLICE_LAYERS: readonly [8, 10, 14];
        readonly DEFAULT_FONT_FAMILY: "'Arial Rounded MT Bold', Arial, sans-serif";
    };
    readonly SLICES: {
        readonly DEFAULT_ANGLE: 120;
        readonly LAYER_COUNT: 3;
        readonly LAYER_RATIOS: readonly [{
            readonly inner: 0.3;
            readonly outer: 0.55;
        }, {
            readonly inner: 0.55;
            readonly outer: 0.775;
        }, {
            readonly inner: 0.775;
            readonly outer: 1;
        }];
    };
    readonly STROKES: {
        readonly BOUNDARY_WIDTH: 1;
        readonly HOVER_WIDTH: 2;
        readonly FOCUS_WIDTH: 3;
        readonly ARROW_WIDTH: 2;
        readonly DEBUG_WIDTH: 2;
    };
    readonly ANIMATION: {
        readonly ROTATION_HINTS: readonly [{
            readonly radius: 160;
            readonly opacity: 0.7;
            readonly strokeWidth: 2;
            readonly dashArray: "8 4";
            readonly duration: "6s";
            readonly direction: 1;
        }, {
            readonly radius: 170;
            readonly opacity: 0.6;
            readonly strokeWidth: 1.5;
            readonly dashArray: "4 8";
            readonly duration: "8s";
            readonly direction: 1;
        }, {
            readonly radius: 180;
            readonly opacity: 0.5;
            readonly strokeWidth: 2;
            readonly dashArray: "2 4";
            readonly duration: "12s";
            readonly direction: -1;
        }, {
            readonly radius: 190;
            readonly opacity: 0.4;
            readonly strokeWidth: 1;
            readonly dashArray: "6 3";
            readonly duration: "10s";
            readonly direction: 1;
        }, {
            readonly radius: 200;
            readonly opacity: 0.3;
            readonly strokeWidth: 1.5;
            readonly dashArray: "3 6";
            readonly duration: "15s";
            readonly direction: -1;
        }, {
            readonly radius: 210;
            readonly opacity: 0.2;
            readonly strokeWidth: 1;
            readonly dashArray: "5 2";
            readonly duration: "18s";
            readonly direction: 1;
        }];
        readonly TRANSITION_DURATION: "0.3s";
        readonly OPACITY_TRANSITION: "0.2s";
    };
    readonly MARKERS: {
        readonly ROTATION_ARROW: {
            readonly id: "rotation-arrow";
            readonly width: 8;
            readonly height: 6;
            readonly refX: 8;
            readonly refY: 3;
            readonly color: "#007AFF";
            readonly opacity: 0.6;
        };
        readonly ARROWHEADS: readonly [{
            readonly id: "arrowhead";
            readonly color: "#0074d9";
        }, {
            readonly id: "arrowhead-orange";
            readonly color: "#FF6B35";
        }, {
            readonly id: "arrowhead-blue";
            readonly color: "#2196F3";
        }, {
            readonly id: "arrowhead-purple";
            readonly color: "#9C27B0";
        }, {
            readonly id: "arrowhead-green";
            readonly color: "#4CAF50";
        }];
        readonly ARROWHEAD_DIMENSIONS: {
            readonly width: 6;
            readonly height: 4;
            readonly refX: 6;
            readonly refY: 2;
        };
    };
    readonly INTERACTION: {
        readonly HOVER_OPACITY: 0.8;
        readonly SELECTED_OPACITY: 0.9;
        readonly FOCUS_BRIGHTNESS: 1.2;
        readonly PAIR_HIGHLIGHT_BRIGHTNESS: 1.1;
        readonly TOUCH_THRESHOLD: 10;
        readonly DOUBLE_TAP_DELAY: 300;
    };
    readonly LAYOUT: {
        readonly SVG_VIEWBOX: "0 0 400 400";
        readonly BREAKPOINTS: {
            readonly MOBILE: 768;
            readonly SMALL_MOBILE: 480;
        };
        readonly CONTROLS_OVERLAY: {
            readonly top: 60;
            readonly left: 20;
            readonly fontSize: 12;
            readonly padding: 8;
        };
    };
    readonly DEFAULTS: {
        readonly NUM_PAIRS: 4;
        readonly TITLE: "Win-Win";
        readonly CENTER_LABEL: "Core";
        readonly SHOW_BOUNDARIES: true;
        readonly ENABLE_ARROWS: false;
    };
};
export declare const DIMENSIONS: {
    readonly CENTER_X: 200;
    readonly CENTER_Y: 200;
    readonly RADIUS: 150;
    readonly CENTER_CIRCLE_RADIUS: 30;
    readonly SLICE_INNER_RADIUS_RATIO: 0.3;
    readonly SLICE_OUTER_RADIUS_RATIO: 1;
}, COLORS: {
    readonly THESIS: "#4CAF50";
    readonly ANTITHESIS: "#F44336";
    readonly LAYER_COLORS: readonly ["#C6E5B3", "#FFFFFF", "#F9C6CC"];
    readonly PRIMARY_BLUE: "#007AFF";
    readonly ACCENT_BLUE: "#0074d9";
    readonly CENTER_CIRCLE: "#FFC107";
    readonly BOUNDARY_LINES: "#888";
    readonly ARROWS: {
        readonly DEFAULT: "#0074d9";
        readonly ORANGE: "#FF6B35";
        readonly BLUE: "#2196F3";
        readonly PURPLE: "#9C27B0";
        readonly GREEN: "#4CAF50";
    };
    readonly BACKGROUND: "#f7f7f7";
    readonly WHITE: "#FFFFFF";
    readonly BLACK: "#000000";
}, TYPOGRAPHY: {
    readonly CENTER_LABEL: 16;
    readonly SLICE_LAYERS: readonly [8, 10, 14];
    readonly DEFAULT_FONT_FAMILY: "'Arial Rounded MT Bold', Arial, sans-serif";
}, SLICES: {
    readonly DEFAULT_ANGLE: 120;
    readonly LAYER_COUNT: 3;
    readonly LAYER_RATIOS: readonly [{
        readonly inner: 0.3;
        readonly outer: 0.55;
    }, {
        readonly inner: 0.55;
        readonly outer: 0.775;
    }, {
        readonly inner: 0.775;
        readonly outer: 1;
    }];
}, STROKES: {
    readonly BOUNDARY_WIDTH: 1;
    readonly HOVER_WIDTH: 2;
    readonly FOCUS_WIDTH: 3;
    readonly ARROW_WIDTH: 2;
    readonly DEBUG_WIDTH: 2;
}, ANIMATION: {
    readonly ROTATION_HINTS: readonly [{
        readonly radius: 160;
        readonly opacity: 0.7;
        readonly strokeWidth: 2;
        readonly dashArray: "8 4";
        readonly duration: "6s";
        readonly direction: 1;
    }, {
        readonly radius: 170;
        readonly opacity: 0.6;
        readonly strokeWidth: 1.5;
        readonly dashArray: "4 8";
        readonly duration: "8s";
        readonly direction: 1;
    }, {
        readonly radius: 180;
        readonly opacity: 0.5;
        readonly strokeWidth: 2;
        readonly dashArray: "2 4";
        readonly duration: "12s";
        readonly direction: -1;
    }, {
        readonly radius: 190;
        readonly opacity: 0.4;
        readonly strokeWidth: 1;
        readonly dashArray: "6 3";
        readonly duration: "10s";
        readonly direction: 1;
    }, {
        readonly radius: 200;
        readonly opacity: 0.3;
        readonly strokeWidth: 1.5;
        readonly dashArray: "3 6";
        readonly duration: "15s";
        readonly direction: -1;
    }, {
        readonly radius: 210;
        readonly opacity: 0.2;
        readonly strokeWidth: 1;
        readonly dashArray: "5 2";
        readonly duration: "18s";
        readonly direction: 1;
    }];
    readonly TRANSITION_DURATION: "0.3s";
    readonly OPACITY_TRANSITION: "0.2s";
}, MARKERS: {
    readonly ROTATION_ARROW: {
        readonly id: "rotation-arrow";
        readonly width: 8;
        readonly height: 6;
        readonly refX: 8;
        readonly refY: 3;
        readonly color: "#007AFF";
        readonly opacity: 0.6;
    };
    readonly ARROWHEADS: readonly [{
        readonly id: "arrowhead";
        readonly color: "#0074d9";
    }, {
        readonly id: "arrowhead-orange";
        readonly color: "#FF6B35";
    }, {
        readonly id: "arrowhead-blue";
        readonly color: "#2196F3";
    }, {
        readonly id: "arrowhead-purple";
        readonly color: "#9C27B0";
    }, {
        readonly id: "arrowhead-green";
        readonly color: "#4CAF50";
    }];
    readonly ARROWHEAD_DIMENSIONS: {
        readonly width: 6;
        readonly height: 4;
        readonly refX: 6;
        readonly refY: 2;
    };
}, INTERACTION: {
    readonly HOVER_OPACITY: 0.8;
    readonly SELECTED_OPACITY: 0.9;
    readonly FOCUS_BRIGHTNESS: 1.2;
    readonly PAIR_HIGHLIGHT_BRIGHTNESS: 1.1;
    readonly TOUCH_THRESHOLD: 10;
    readonly DOUBLE_TAP_DELAY: 300;
}, LAYOUT: {
    readonly SVG_VIEWBOX: "0 0 400 400";
    readonly BREAKPOINTS: {
        readonly MOBILE: 768;
        readonly SMALL_MOBILE: 480;
    };
    readonly CONTROLS_OVERLAY: {
        readonly top: 60;
        readonly left: 20;
        readonly fontSize: 12;
        readonly padding: 8;
    };
}, DEFAULTS: {
    readonly NUM_PAIRS: 4;
    readonly TITLE: "Win-Win";
    readonly CENTER_LABEL: "Core";
    readonly SHOW_BOUNDARIES: true;
    readonly ENABLE_ARROWS: false;
};
export type WheelConfig = typeof WHEEL_CONFIG;
export type WheelDimensions = typeof DIMENSIONS;
export type WheelColors = typeof COLORS;
export type WheelTypography = typeof TYPOGRAPHY;
//# sourceMappingURL=wheelConfig.d.ts.map