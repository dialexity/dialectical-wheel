'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function polarToCartesian(r, angle) {
  return [r * Math.sin(angle), -r * Math.cos(angle)];
}
function describeArc(innerR, outerR, startAngle, endAngle) {
  var _polarToCartesian = polarToCartesian(outerR, startAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    ox1 = _polarToCartesian2[0],
    oy1 = _polarToCartesian2[1];
  var _polarToCartesian3 = polarToCartesian(outerR, endAngle),
    _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
    ox2 = _polarToCartesian4[0],
    oy2 = _polarToCartesian4[1];
  var _polarToCartesian5 = polarToCartesian(innerR, endAngle),
    _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
    ix1 = _polarToCartesian6[0],
    iy1 = _polarToCartesian6[1];
  var _polarToCartesian7 = polarToCartesian(innerR, startAngle),
    _polarToCartesian8 = _slicedToArray(_polarToCartesian7, 2),
    ix2 = _polarToCartesian8[0],
    iy2 = _polarToCartesian8[1];
  var largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return ["M ".concat(ox1, " ").concat(oy1), "A ".concat(outerR, " ").concat(outerR, " 0 ").concat(largeArc, " 1 ").concat(ox2, " ").concat(oy2), "L ".concat(ix1, " ").concat(iy1), "A ".concat(innerR, " ").concat(innerR, " 0 ").concat(largeArc, " 0 ").concat(ix2, " ").concat(iy2), 'Z'].join(' ');
}
function normalizeAngle(angle) {
  return (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
}
var RADII_MULTI = {
  synthesis: 30,
  innerStart: 30,
  innerEnd: 100,
  middleStart: 100,
  middleEnd: 150,
  outerStart: 150,
  outerEnd: 200,
  cycleStart: 200,
  cycleEnd: 250
};
var RADII_SINGLE = {
  synthesis: 30,
  innerStart: 30,
  innerEnd: 87,
  middleStart: 87,
  middleEnd: 143,
  outerStart: 143,
  outerEnd: 200,
  cycleStart: 200,
  cycleEnd: 250
};
function getRadii(perspectiveCount) {
  return perspectiveCount <= 1 ? RADII_SINGLE : RADII_MULTI;
}

function chordWidth(r, halfAngle, cellHeight) {
  var chord = 2 * r * Math.sin(halfAngle) * 0.9;
  return Math.min(chord, cellHeight * 1.4);
}
var CellText = function CellText(_ref) {
  var innerR = _ref.innerR,
    outerR = _ref.outerR,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    text = _ref.text,
    color = _ref.color,
    rotationRad = _ref.rotationRad,
    fontSize = _ref.fontSize,
    padding = _ref.padding,
    textBias = _ref.textBias;
  var midAngle = (startAngle + endAngle) / 2;
  var halfAngle = (endAngle - startAngle) / 2;
  var cellHeight = outerR - innerR;
  var biasedR = (innerR + outerR) / 2 + textBias * cellHeight;
  var _polarToCartesian = polarToCartesian(biasedR, midAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    cx = _polarToCartesian2[0],
    cy = _polarToCartesian2[1];
  var visualAngle = normalizeAngle(midAngle + rotationRad);
  var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
  var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
  var boxHeight = outerR - innerR - padding * 2;
  var boxWidth = chordWidth(biasedR, halfAngle, cellHeight);
  return jsxRuntime.jsx("foreignObject", {
    x: cx - boxWidth / 2,
    y: cy - boxHeight / 2,
    width: boxWidth,
    height: boxHeight,
    transform: "rotate(".concat(textRotDeg, ", ").concat(cx, ", ").concat(cy, ")"),
    style: {
      pointerEvents: 'none',
      overflow: 'hidden'
    },
    children: jsxRuntime.jsx("div", {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: fontSize,
        fontWeight: 600,
        fontFamily: 'system-ui, sans-serif',
        color: color,
        lineHeight: 1.2,
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        overflow: 'hidden'
      },
      children: text
    })
  });
};

var Cell = function Cell(_ref) {
  var segment = _ref.segment,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    style = _ref.style,
    rotationRad = _ref.rotationRad,
    fontSize = _ref.fontSize,
    textBias = _ref.textBias,
    hovered = _ref.hovered,
    onClick = _ref.onClick,
    onPointerEnter = _ref.onPointerEnter,
    onPointerLeave = _ref.onPointerLeave,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var clipId = react.useMemo(function () {
    return "dw-".concat(segment.polarity, "-").concat(segment.segmentId, "-").concat(innerR).replace(/[^a-zA-Z0-9-]/g, '_');
  }, [segment.polarity, segment.segmentId, innerR]);
  var path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);
  var cellEvent = react.useMemo(function () {
    return {
      segmentId: segment.segmentId,
      polarity: segment.polarity,
      statement: segment.fullText,
      pairWith: segment.pairWith,
      perspectiveIndex: segment.perspectiveIndex
    };
  }, [segment.segmentId, segment.polarity, segment.fullText, segment.pairWith, segment.perspectiveIndex]);
  var handleClick = function handleClick() {
    if (onClick) onClick(cellEvent);
  };
  var handlePointerEnter = function handlePointerEnter() {
    if (onPointerEnter) onPointerEnter(cellEvent);
  };
  var handlePointerLeave = function handlePointerLeave() {
    if (onPointerLeave) onPointerLeave(cellEvent);
  };
  var interactive = onClick || onPointerEnter;
  return jsxRuntime.jsxs("g", {
    onClick: handleClick,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    style: {
      cursor: interactive ? 'pointer' : 'default'
    },
    children: [jsxRuntime.jsx("defs", {
      children: jsxRuntime.jsx("clipPath", {
        id: clipId,
        children: jsxRuntime.jsx("path", {
          d: path
        })
      })
    }), jsxRuntime.jsx("path", {
      d: path,
      fill: style.background,
      stroke: hovered ? style.hoverBorderColor : style.borderColor,
      strokeWidth: style.borderWidth
    }), showText && segment.fullText && jsxRuntime.jsx("g", {
      clipPath: "url(#".concat(clipId, ")"),
      children: jsxRuntime.jsx(CellText, {
        innerR: innerR,
        outerR: outerR,
        startAngle: segment.startAngle,
        endAngle: segment.endAngle,
        text: segment.fullText,
        color: style.color,
        rotationRad: rotationRad,
        fontSize: fontSize,
        padding: style.padding,
        textBias: textBias
      })
    })]
  });
};

function chordAt(r, halfAngle, cellHeight) {
  var chord = 2 * r * Math.sin(halfAngle) * 0.9;
  return Math.min(chord, cellHeight * 1.4);
}
function tryFit(text, fontSize, params) {
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    paddingFrac = params.padding,
    measure = params.measure;
  var lineHeight = fontSize * 1.3;
  var halfAngle = cellAngle / 2;
  var cellHeight = outerR - innerR;
  var pad = cellHeight * paddingFrac;
  var topR = outerR - pad;
  var botR = innerR + pad;
  var usableHeight = topR - botR;
  var maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return null;
  var wrapR = innerR + cellHeight * 0.6;
  var wrapWidth = chordAt(wrapR, halfAngle, cellHeight);
  var words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];
  var lines = [];
  var currentLine = '';
  var _iterator = _createForOfIteratorHelper(words),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;
      var candidate = currentLine ? "".concat(currentLine, " ").concat(word) : word;
      if (measure(candidate, fontSize) <= wrapWidth) {
        currentLine = candidate;
      } else if (currentLine) {
        lines.push(currentLine);
        if (lines.length >= maxLines) return null;
        currentLine = word;
      } else {
        currentLine = word;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length > maxLines) return null;
  for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
    var line = _lines[_i];
    if (measure(line, fontSize) > wrapWidth) return null;
  }
  return lines;
}
function computeUniformFontSize(texts, params) {
  var baseFontSize = params.baseFontSize;
  var _loop = function _loop(fs) {
      if (texts.every(function (t) {
        return tryFit(t, fs, params) !== null;
      })) return {
        v: fs
      };
    },
    _ret;
  for (var fs = baseFontSize; fs >= 3; fs -= 0.5) {
    _ret = _loop(fs);
    if (_ret) return _ret.v;
  }
  return 3;
}

function resolveCSSValue(value, relativeTo, fallback) {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  var str = value.trim();
  if (str.endsWith('%')) {
    return parseFloat(str) / 100 * relativeTo;
  }
  if (str.endsWith('px')) {
    return parseFloat(str);
  }
  return parseFloat(str) || fallback;
}
function resolveStyle(styles, ring, cellRadialHeight, cellOverride, segmentOverride) {
  var _styles$tbody;
  var wheel = styles;
  var section = ring === 'cycle' ? styles.thead : styles.tbody;
  var ringLevel = ring !== 'cycle' ? (_styles$tbody = styles.tbody) === null || _styles$tbody === void 0 ? void 0 : _styles$tbody[ring] : undefined;
  // Cascade: wheel -> section (thead/tbody) -> ring -> segment -> cell
  var layers = [wheel, section, ringLevel, segmentOverride, cellOverride];
  var get = function get(key) {
    for (var i = layers.length - 1; i >= 0; i--) {
      var _layers$i;
      var v = (_layers$i = layers[i]) === null || _layers$i === void 0 ? void 0 : _layers$i[key];
      if (v !== undefined) return v;
    }
    return undefined;
  };
  var getBorder = function getBorder(prop) {
    for (var i = layers.length - 1; i >= 0; i--) {
      var _layers$i2;
      var b = (_layers$i2 = layers[i]) === null || _layers$i2 === void 0 ? void 0 : _layers$i2.border;
      if (b && b[prop] !== undefined) return b[prop];
    }
    return undefined;
  };
  var getSelectedBorder = function getSelectedBorder(prop) {
    for (var i = layers.length - 1; i >= 0; i--) {
      var _layers$i3;
      var b = (_layers$i3 = layers[i]) === null || _layers$i3 === void 0 ? void 0 : _layers$i3.selectedBorder;
      if (b && b[prop] !== undefined) return b[prop];
    }
    return undefined;
  };
  return {
    background: get('background') || '#ffffff',
    color: get('color') || '#333333',
    fontSize: resolveCSSValue(get('fontSize'), cellRadialHeight, 12),
    padding: resolveCSSValue(get('padding'), cellRadialHeight, cellRadialHeight * 0.05),
    borderWidth: resolveCSSValue(getBorder('width'), cellRadialHeight, 0.5),
    borderColor: getBorder('color') || '#ddd',
    hoverBorderColor: get('hoverBorderColor') || '#999',
    selectedBorderWidth: resolveCSSValue(getSelectedBorder('width'), cellRadialHeight, 1),
    selectedBorderColor: getSelectedBorder('color') || '#666'
  };
}
var DEFAULT_STYLES = {
  fontSize: 12,
  border: {
    width: 0.5,
    color: '#ddd'
  },
  thead: {
    color: '#333333',
    fontSize: 12,
    border: {
      width: 0.5,
      color: 'transparent'
    }
  },
  tbody: {
    positive: {
      background: '#C6E5B3',
      color: '#2d5a2d'
    },
    negative: {
      background: '#F9C6CC',
      color: '#8b1538'
    },
    neutral: {
      background: '#ffffff',
      color: '#333333'
    },
    synthesis: {
      background: '#ffff7a'
    }
  }
};

function computeTextBias(ringName, perspectiveCount) {
  if (ringName === 'positive' && perspectiveCount === 3) return 0.10;
  if (ringName === 'positive' && perspectiveCount >= 4) return 0.15;
  return 0;
}
var Ring = function Ring(_ref) {
  var _styles$dimUnfocused;
  var segments = _ref.segments,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    ringName = _ref.ringName,
    styles = _ref.styles,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    perspectiveCount = _ref.perspectiveCount,
    hoveredSegmentId = _ref.hoveredSegmentId,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx,
    onClick = _ref.onClick,
    onPointerEnter = _ref.onPointerEnter,
    onPointerLeave = _ref.onPointerLeave,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText,
    headerBehavior = _ref.headerBehavior;
  var cellRadialHeight = outerR - innerR;
  var cellAngle = segments.length > 0 ? segments[0].endAngle - segments[0].startAngle : 0;
  var resolvedStyles = react.useMemo(function () {
    return segments.map(function (seg) {
      var s = resolveStyle(styles, ringName, cellRadialHeight, seg.cellStyle);
      if (headerBehavior) return _objectSpread2(_objectSpread2({}, s), {}, {
        borderColor: 'transparent'
      });
      return s;
    });
  }, [segments, styles, ringName, cellRadialHeight, headerBehavior]);
  var baseFontSize = resolvedStyles.length > 0 ? resolvedStyles[0].fontSize : 12;
  var basePadding = resolvedStyles.length > 0 ? resolvedStyles[0].padding / cellRadialHeight : 0.05;
  var uniformFontSize = react.useMemo(function () {
    if (segments.length === 0) return baseFontSize;
    var texts = segments.map(function (s) {
      return s.fullText;
    }).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    return computeUniformFontSize(texts, {
      innerR: innerR,
      outerR: outerR,
      cellAngle: cellAngle,
      baseFontSize: baseFontSize,
      padding: basePadding,
      measure: measure
    });
  }, [segments, innerR, outerR, cellAngle, baseFontSize, basePadding, measure]);
  var textBias = computeTextBias(ringName, perspectiveCount);
  var isSpacer = function isSpacer(segment) {
    return segment.perspectiveIndex === -1;
  };
  var isElevated = function isElevated(segment) {
    return segment.segmentId === hoveredSegmentId || segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;
  };
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var cellOpacity = function cellOpacity(segment) {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null && segment.perspectiveIndex !== selectedPerspectiveIdx && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };
  return jsxRuntime.jsxs("g", {
    children: [segments.map(function (segment, i) {
      return isSpacer(segment) || isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: jsxRuntime.jsx(Cell, {
          segment: segment,
          innerR: innerR,
          outerR: outerR,
          style: resolvedStyles[i],
          rotationRad: rotationRad,
          fontSize: uniformFontSize,
          textBias: textBias,
          hovered: false,
          onClick: onClick,
          onPointerEnter: onPointerEnter,
          onPointerLeave: onPointerLeave,
          showText: showText
        })
      }, segment.segmentId);
    }), segments.map(function (segment, i) {
      return isSpacer(segment) || !isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: jsxRuntime.jsx(Cell, {
          segment: segment,
          innerR: innerR,
          outerR: outerR,
          style: resolvedStyles[i],
          rotationRad: rotationRad,
          fontSize: uniformFontSize,
          textBias: textBias,
          hovered: segment.segmentId === hoveredSegmentId || segment.perspectiveIndex === hoveredPerspectiveIdx,
          onClick: onClick,
          onPointerEnter: onPointerEnter,
          onPointerLeave: onPointerLeave,
          showText: showText
        })
      }, segment.segmentId);
    })]
  });
};

var SynthesisRing = function SynthesisRing(_ref) {
  var styles = _ref.styles,
    radii = _ref.radii;
  var resolved = resolveStyle(styles, 'synthesis', radii.innerEnd - radii.innerStart);
  return jsxRuntime.jsx("circle", {
    cx: 0,
    cy: 0,
    r: radii.synthesis,
    fill: resolved.background,
    stroke: resolved.borderColor,
    strokeWidth: resolved.borderWidth
  });
};

var WheelRing = function WheelRing(_ref) {
  var _styles$dimUnfocused;
  var segments = _ref.segments,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    rotationRad = _ref.rotationRad,
    styles = _ref.styles,
    transparent = _ref.transparent,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx,
    _onClick = _ref.onClick,
    _onPointerEnter = _ref.onPointerEnter,
    _onPointerLeave = _ref.onPointerLeave;
  var cellRadialHeight = outerR - innerR;
  var radius = (innerR + outerR) / 2;
  var resolvedStyles = react.useMemo(function () {
    return segments.map(function (seg) {
      return resolveStyle(styles, 'cycle', cellRadialHeight, seg.cellStyle);
    });
  }, [segments, styles, cellRadialHeight]);
  var cellEvents = react.useMemo(function () {
    return segments.map(function (segment) {
      return {
        segmentId: segment.segmentId,
        polarity: segment.polarity,
        statement: segment.fullText,
        pairWith: segment.pairWith,
        perspectiveIndex: segment.perspectiveIndex
      };
    });
  }, [segments]);
  var interactive = _onClick || _onPointerEnter;
  var isSpacer = function isSpacer(segment) {
    return segment.perspectiveIndex === -1;
  };
  var isElevated = function isElevated(segment) {
    return segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;
  };
  var renderSegment = function renderSegment(segment, i, isHovered) {
    var style = resolvedStyles[i];
    var midAngle = (segment.startAngle + segment.endAngle) / 2;
    var _polarToCartesian = polarToCartesian(radius, midAngle),
      _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
      x = _polarToCartesian2[0],
      y = _polarToCartesian2[1];
    var visualAngle = normalizeAngle(midAngle + rotationRad);
    var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
    var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
    var path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);
    return jsxRuntime.jsxs("g", {
      onClick: function onClick() {
        return _onClick === null || _onClick === void 0 ? void 0 : _onClick(cellEvents[i]);
      },
      onPointerEnter: function onPointerEnter() {
        return _onPointerEnter === null || _onPointerEnter === void 0 ? void 0 : _onPointerEnter(cellEvents[i]);
      },
      onPointerLeave: function onPointerLeave() {
        return _onPointerLeave === null || _onPointerLeave === void 0 ? void 0 : _onPointerLeave(cellEvents[i]);
      },
      style: {
        cursor: interactive ? 'pointer' : 'default'
      },
      children: [jsxRuntime.jsx("path", {
        d: path,
        fill: transparent ? 'none' : style.background,
        stroke: transparent ? 'none' : isHovered ? style.hoverBorderColor : style.borderColor,
        strokeWidth: style.borderWidth
      }), jsxRuntime.jsx("text", {
        x: x,
        y: y,
        transform: "rotate(".concat(textRotDeg, ", ").concat(x, ", ").concat(y, ")"),
        textAnchor: "middle",
        dominantBaseline: "central",
        fill: style.color,
        fontSize: style.fontSize,
        fontWeight: "bold",
        fontFamily: "system-ui, sans-serif",
        children: segment.segmentId
      })]
    }, segment.segmentId);
  };
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var cellOpacity = function cellOpacity(segment) {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null && segment.perspectiveIndex !== selectedPerspectiveIdx && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };
  return jsxRuntime.jsxs("g", {
    children: [segments.map(function (segment, i) {
      return isSpacer(segment) || isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, false)
      }, "wrap-".concat(segment.segmentId));
    }), segments.map(function (segment, i) {
      return isSpacer(segment) || !isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, segment.perspectiveIndex === hoveredPerspectiveIdx)
      }, "wrap-".concat(segment.segmentId));
    })]
  });
};

var CycleRing = function CycleRing(_ref) {
  var _styles$dimUnfocused;
  var segments = _ref.segments,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    rotationRad = _ref.rotationRad,
    styles = _ref.styles,
    transparent = _ref.transparent,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx,
    _onClick = _ref.onClick,
    _onPointerEnter = _ref.onPointerEnter,
    _onPointerLeave = _ref.onPointerLeave;
  var cellRadialHeight = outerR - innerR;
  var radius = (innerR + outerR) / 2;
  var thesisSegments = react.useMemo(function () {
    return segments.filter(function (s) {
      return !s.segmentId.startsWith('A') && s.perspectiveIndex !== -1;
    });
  }, [segments]);
  var resolvedStyles = react.useMemo(function () {
    return thesisSegments.map(function (seg) {
      return resolveStyle(styles, 'cycle', cellRadialHeight, seg.cellStyle);
    });
  }, [thesisSegments, styles, cellRadialHeight]);
  var cellEvents = react.useMemo(function () {
    return thesisSegments.map(function (segment) {
      return {
        segmentId: segment.segmentId,
        polarity: segment.polarity,
        statement: segment.fullText,
        pairWith: segment.pairWith,
        perspectiveIndex: segment.perspectiveIndex
      };
    });
  }, [thesisSegments]);
  var interactive = _onClick || _onPointerEnter;
  var isElevated = function isElevated(segment) {
    return segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;
  };
  var renderSegment = function renderSegment(segment, i, isHovered) {
    var style = resolvedStyles[i];
    var midAngle = (segment.startAngle + segment.endAngle) / 2;
    var _polarToCartesian = polarToCartesian(radius, midAngle),
      _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
      x = _polarToCartesian2[0],
      y = _polarToCartesian2[1];
    var visualAngle = normalizeAngle(midAngle + rotationRad);
    var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
    var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
    var path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);
    return jsxRuntime.jsxs("g", {
      onClick: function onClick() {
        return _onClick === null || _onClick === void 0 ? void 0 : _onClick(cellEvents[i]);
      },
      onPointerEnter: function onPointerEnter() {
        return _onPointerEnter === null || _onPointerEnter === void 0 ? void 0 : _onPointerEnter(cellEvents[i]);
      },
      onPointerLeave: function onPointerLeave() {
        return _onPointerLeave === null || _onPointerLeave === void 0 ? void 0 : _onPointerLeave(cellEvents[i]);
      },
      style: {
        cursor: interactive ? 'pointer' : 'default'
      },
      children: [jsxRuntime.jsx("path", {
        d: path,
        fill: transparent ? 'none' : style.background,
        stroke: transparent ? 'none' : isHovered ? style.hoverBorderColor : style.borderColor,
        strokeWidth: style.borderWidth
      }), jsxRuntime.jsx("text", {
        x: x,
        y: y,
        transform: "rotate(".concat(textRotDeg, ", ").concat(x, ", ").concat(y, ")"),
        textAnchor: "middle",
        dominantBaseline: "central",
        fill: style.color,
        fontSize: style.fontSize,
        fontWeight: "bold",
        fontFamily: "system-ui, sans-serif",
        children: segment.segmentId
      })]
    }, segment.segmentId);
  };
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var cellOpacity = function cellOpacity(segment) {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null && segment.perspectiveIndex !== selectedPerspectiveIdx && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };
  return jsxRuntime.jsxs("g", {
    children: [thesisSegments.map(function (segment, i) {
      return isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, false)
      }, "wrap-".concat(segment.segmentId));
    }), thesisSegments.map(function (segment, i) {
      return !isElevated(segment) ? null : jsxRuntime.jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, segment.perspectiveIndex === hoveredPerspectiveIdx)
      }, "wrap-".concat(segment.segmentId));
    })]
  });
};

var SelectionOverlay = function SelectionOverlay(_ref) {
  var segments = _ref.segments,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    headerRing = _ref.headerRing,
    stitched = _ref.stitched,
    styles = _ref.styles,
    radii = _ref.radii;
  var selected = segments.filter(function (s) {
    return s.perspectiveIndex === selectedPerspectiveIdx;
  });
  if (selected.length === 0) return null;
  var style = resolveStyle(styles, 'neutral', radii.outerEnd - radii.innerStart);
  return jsxRuntime.jsx("g", {
    style: {
      pointerEvents: 'none'
    },
    children: selected.map(function (seg) {
      var isThesis = !seg.segmentId.startsWith('A');
      var includeHeader = stitched || headerRing === 'wheel' || headerRing === 'cycle' && isThesis;
      var outerR = includeHeader ? radii.cycleEnd : radii.outerEnd;
      var path = describeArc(radii.innerStart, outerR, seg.startAngle, seg.endAngle);
      return jsxRuntime.jsx("path", {
        d: path,
        fill: "none",
        stroke: style.selectedBorderColor,
        strokeWidth: style.selectedBorderWidth
      }, seg.segmentId);
    })
  });
};

function useTextMeasure() {
  var fontFamily = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'system-ui, sans-serif';
  var ctxRef = react.useRef(null);
  var measure = react.useCallback(function (text, fontSize) {
    if (!ctxRef.current) {
      var canvas = document.createElement('canvas');
      ctxRef.current = canvas.getContext('2d');
    }
    var ctx = ctxRef.current;
    ctx.font = "600 ".concat(fontSize, "px ").concat(fontFamily);
    return ctx.measureText(text).width * 1.05;
  }, [fontFamily]);
  return measure;
}

var DRAG_THRESHOLD = 3;
var FADE_OUT_MS = 200;
var ROTATE_MS = 300;
function defaultRotation(segmentCount) {
  if (segmentCount === 0) return 0;
  return -(360 / segmentCount / 2);
}
function useRotation(_ref) {
  var onFocusChanged = _ref.onFocusChanged,
    segmentIds = _ref.segmentIds,
    focusedSegment = _ref.focusedSegment;
  var _useState = react.useState(function () {
      return defaultRotation(segmentIds.length);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    rotationDeg = _useState2[0],
    setRotationDeg = _useState2[1];
  var rotationDegRef = react.useRef(rotationDeg);
  rotationDegRef.current = rotationDeg;
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isDragging = _useState4[0],
    setIsDragging = _useState4[1];
  var _useState5 = react.useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    focusAnimatingIdx = _useState6[0],
    setFocusAnimatingIdx = _useState6[1];
  var _useState7 = react.useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isRotationPaused = _useState8[0],
    setIsRotationPaused = _useState8[1];
  var dragStart = react.useRef(null);
  var didDrag = react.useRef(false);
  var svgRef = react.useRef(null);
  var animTimers = react.useRef([]);
  var clearTimers = function clearTimers() {
    animTimers.current.forEach(function (t) {
      return clearTimeout(t);
    });
    animTimers.current = [];
  };
  react.useEffect(function () {
    if (focusedSegment == null || segmentIds.length === 0) return;
    var idx = segmentIds.indexOf(focusedSegment);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var isAntithesis = idx >= N / 2;
    var targetPosition = isAntithesis ? 180 : 0;
    var currentVisualAngle = (midAngle + rotationDegRef.current + 360) % 360;
    if (currentVisualAngle < segmentAngle || currentVisualAngle > 360 - segmentAngle) {
      targetPosition = 0;
    } else if (Math.abs(currentVisualAngle - 180) < segmentAngle) {
      targetPosition = 180;
    }
    var targetRaw = targetPosition - midAngle;
    var perspectiveIdx = idx < N / 2 ? idx : idx - N / 2;
    clearTimers();
    // Phase 1: fade out others (pause rotation transition)
    setIsRotationPaused(true);
    setFocusAnimatingIdx(perspectiveIdx);
    // Phase 2: after fade-out, start rotation
    var t1 = setTimeout(function () {
      setIsRotationPaused(false);
      setRotationDeg(function (current) {
        var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
        if (delta === 180) delta = isAntithesis ? 180 : -180;
        return current + delta;
      });
    }, FADE_OUT_MS);
    // Phase 3: after rotation, fade back in
    var t2 = setTimeout(function () {
      setFocusAnimatingIdx(null);
    }, FADE_OUT_MS + ROTATE_MS);
    animTimers.current = [t1, t2];
    return function () {
      return clearTimers();
    };
  }, [focusedSegment, segmentIds]);
  var getAngleFromEvent = react.useCallback(function (e) {
    var svg = svgRef.current;
    if (!svg) return 0;
    var rect = svg.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientX - cx, -(e.clientY - cy));
  }, []);
  var reportTopSegment = react.useCallback(function (deg) {
    if (!onFocusChanged || segmentIds.length === 0) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var normalized = (-deg % 360 + 360) % 360;
    var index = Math.round((normalized - segmentAngle / 2) / segmentAngle + N) % N;
    var id = segmentIds[index];
    if (!id.startsWith('__')) onFocusChanged(id);
  }, [onFocusChanged, segmentIds]);
  var onPointerDown = react.useCallback(function (e) {
    var angle = getAngleFromEvent(e);
    dragStart.current = {
      angle: angle,
      rotation: rotationDeg,
      x: e.clientX,
      y: e.clientY
    };
    didDrag.current = false;
  }, [getAngleFromEvent, rotationDeg]);
  var onPointerMove = react.useCallback(function (e) {
    if (!dragStart.current) return;
    if (!didDrag.current) {
      var dx = e.clientX - dragStart.current.x;
      var dy = e.clientY - dragStart.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
      didDrag.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
    }
    var angle = getAngleFromEvent(e);
    var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
    setRotationDeg(dragStart.current.rotation + delta);
  }, [getAngleFromEvent]);
  var onPointerUp = react.useCallback(function (e) {
    if (!dragStart.current) return;
    if (didDrag.current) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      var angle = getAngleFromEvent(e);
      var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
      var finalDeg = dragStart.current.rotation + delta;
      setRotationDeg(finalDeg);
      reportTopSegment(finalDeg);
      setIsDragging(false);
    }
    dragStart.current = null;
  }, [getAngleFromEvent, reportTopSegment]);
  var rotationRad = rotationDeg * Math.PI / 180;
  return {
    rotationDeg: rotationDeg,
    rotationRad: rotationRad,
    isDragging: isDragging,
    isRotationPaused: isRotationPaused,
    focusAnimatingIdx: focusAnimatingIdx,
    svgRef: svgRef,
    pointerHandlers: {
      onPointerDown: onPointerDown,
      onPointerMove: onPointerMove,
      onPointerUp: onPointerUp
    }
  };
}

function extractStatement(value) {
  if (typeof value === 'string') return value;
  return (value === null || value === void 0 ? void 0 : value.statement) || (value === null || value === void 0 ? void 0 : value.alias) || '';
}
function extractAlias(value, fallback) {
  if (typeof value === 'string') return fallback;
  return (value === null || value === void 0 ? void 0 : value.alias) || fallback;
}
function extractCellStyle(value) {
  if (typeof value === 'string') return undefined;
  return value === null || value === void 0 ? void 0 : value.style;
}
function transformPerspectives(perspectives) {
  if (!perspectives || perspectives.length === 0) {
    return {
      invisible: [],
      negative: [],
      neutral: [],
      positive: []
    };
  }
  var theses = [];
  var antitheses = [];
  perspectives.forEach(function (perspective, i) {
    var tAlias = extractAlias(perspective.t, "T".concat(i + 1));
    var aAlias = extractAlias(perspective.a, "A".concat(i + 1));
    theses.push({
      segmentId: tAlias,
      perspectiveIndex: i,
      statement: extractStatement(perspective.t),
      positive: extractStatement(perspective.t_plus),
      negative: extractStatement(perspective.t_minus),
      pairWith: aAlias,
      segmentStyle: perspective.style,
      cellStyles: {
        positive: extractCellStyle(perspective.t_plus),
        neutral: extractCellStyle(perspective.t),
        negative: extractCellStyle(perspective.t_minus)
      }
    });
    antitheses.push({
      segmentId: aAlias,
      perspectiveIndex: i,
      statement: extractStatement(perspective.a),
      positive: extractStatement(perspective.a_plus),
      negative: extractStatement(perspective.a_minus),
      pairWith: tAlias,
      segmentStyle: perspective.style,
      cellStyles: {
        positive: extractCellStyle(perspective.a_plus),
        neutral: extractCellStyle(perspective.a),
        negative: extractCellStyle(perspective.a_minus)
      }
    });
  });
  var entries;
  if (perspectives.length === 1) {
    // 1-PP: hourglass layout — thesis at top, antithesis at bottom, spacers on sides
    var spacer = {
      segmentId: '__spacer__',
      perspectiveIndex: -1,
      statement: '',
      positive: '',
      negative: '',
      pairWith: '',
      cellStyles: {}
    };
    entries = [theses[0], spacer, antitheses[0], _objectSpread2(_objectSpread2({}, spacer), {}, {
      segmentId: '__spacer2__'
    })];
  } else {
    entries = [].concat(theses, antitheses);
  }
  var N = entries.length;
  var segmentAngle = 2 * Math.PI / N;
  var buildRing = function buildRing(polarity, getText, getCellStyle) {
    return entries.map(function (entry, i) {
      return {
        segmentId: entry.segmentId,
        perspectiveIndex: entry.perspectiveIndex,
        polarity: polarity,
        fullText: getText(entry),
        pairWith: entry.pairWith,
        startAngle: i * segmentAngle,
        endAngle: (i + 1) * segmentAngle,
        cellStyle: mergeCellStyles(entry.segmentStyle, getCellStyle(entry))
      };
    });
  };
  return {
    invisible: buildRing('invisible', function (e) {
      return e.segmentId;
    }, function () {
      return undefined;
    }),
    positive: buildRing('positive', function (e) {
      return e.positive;
    }, function (e) {
      return e.cellStyles.positive;
    }),
    neutral: buildRing('neutral', function (e) {
      return e.statement;
    }, function (e) {
      return e.cellStyles.neutral;
    }),
    negative: buildRing('negative', function (e) {
      return e.negative;
    }, function (e) {
      return e.cellStyles.negative;
    })
  };
}
function mergeCellStyles(segment, cell) {
  if (!segment && !cell) return undefined;
  if (!segment) return cell;
  if (!cell) return segment;
  return _objectSpread2(_objectSpread2({}, segment), cell);
}

function mergeStyles(user) {
  var _DEFAULT_STYLES$tbody, _user$tbody, _DEFAULT_STYLES$tbody2, _user$tbody2, _DEFAULT_STYLES$tbody3, _user$tbody3, _DEFAULT_STYLES$tbody4, _user$tbody4;
  if (!user) return DEFAULT_STYLES;
  return _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_STYLES), user), {}, {
    border: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.border), user.border),
    thead: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.thead), user.thead),
    tbody: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_STYLES.tbody), user.tbody), {}, {
      positive: _objectSpread2(_objectSpread2({}, (_DEFAULT_STYLES$tbody = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody === void 0 ? void 0 : _DEFAULT_STYLES$tbody.positive), (_user$tbody = user.tbody) === null || _user$tbody === void 0 ? void 0 : _user$tbody.positive),
      negative: _objectSpread2(_objectSpread2({}, (_DEFAULT_STYLES$tbody2 = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody2 === void 0 ? void 0 : _DEFAULT_STYLES$tbody2.negative), (_user$tbody2 = user.tbody) === null || _user$tbody2 === void 0 ? void 0 : _user$tbody2.negative),
      neutral: _objectSpread2(_objectSpread2({}, (_DEFAULT_STYLES$tbody3 = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody3 === void 0 ? void 0 : _DEFAULT_STYLES$tbody3.neutral), (_user$tbody3 = user.tbody) === null || _user$tbody3 === void 0 ? void 0 : _user$tbody3.neutral),
      synthesis: _objectSpread2(_objectSpread2({}, (_DEFAULT_STYLES$tbody4 = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody4 === void 0 ? void 0 : _DEFAULT_STYLES$tbody4.synthesis), (_user$tbody4 = user.tbody) === null || _user$tbody4 === void 0 ? void 0 : _user$tbody4.synthesis)
    })
  });
}
var Wheel = /*#__PURE__*/react.forwardRef(function Wheel(_ref, ref) {
  var perspectives = _ref.perspectives,
    _ref$headerRing = _ref.headerRing,
    headerRing = _ref$headerRing === void 0 ? 'wheel' : _ref$headerRing,
    _ref$interactive = _ref.interactive,
    interactive = _ref$interactive === void 0 ? false : _ref$interactive,
    selectedPerspectiveProp = _ref.selectedPerspective,
    focusedSegmentProp = _ref.focusedSegment,
    _ref$neutralOutside = _ref.neutralOutside,
    neutralOutsideProp = _ref$neutralOutside === void 0 ? false : _ref$neutralOutside,
    userStyles = _ref.styles,
    css = _ref.css,
    onFocusChanged = _ref.onFocusChanged,
    onCellOver = _ref.onCellOver,
    onCellOut = _ref.onCellOut,
    onCellClicked = _ref.onCellClicked,
    onSegmentOver = _ref.onSegmentOver,
    onSegmentOut = _ref.onSegmentOut,
    onSegmentClicked = _ref.onSegmentClicked,
    onPerspectiveOver = _ref.onPerspectiveOver,
    onPerspectiveOut = _ref.onPerspectiveOut,
    onPerspectiveClicked = _ref.onPerspectiveClicked;
  var styles = react.useMemo(function () {
    return mergeStyles(userStyles);
  }, [userStyles]);
  var radii = react.useMemo(function () {
    return getRadii(perspectives.length);
  }, [perspectives.length]);
  var measure = useTextMeasure();
  var ringData = react.useMemo(function () {
    return transformPerspectives(perspectives);
  }, [perspectives]);
  var segmentIds = react.useMemo(function () {
    return ringData.neutral.map(function (s) {
      return s.segmentId;
    });
  }, [ringData]);
  var _useState = react.useState(selectedPerspectiveProp !== null && selectedPerspectiveProp !== void 0 ? selectedPerspectiveProp : null),
    _useState2 = _slicedToArray(_useState, 2),
    internalSelected = _useState2[0],
    setInternalSelected = _useState2[1];
  var _useState3 = react.useState(focusedSegmentProp !== null && focusedSegmentProp !== void 0 ? focusedSegmentProp : null),
    _useState4 = _slicedToArray(_useState3, 2),
    internalFocused = _useState4[0],
    setInternalFocused = _useState4[1];
  react.useEffect(function () {
    if (!interactive) return;
    if (selectedPerspectiveProp !== undefined) setInternalSelected(selectedPerspectiveProp);
  }, [interactive, selectedPerspectiveProp]);
  react.useEffect(function () {
    if (!interactive) return;
    if (focusedSegmentProp !== undefined) setInternalFocused(focusedSegmentProp);
  }, [interactive, focusedSegmentProp]);
  var selectedPerspective = interactive ? internalSelected : selectedPerspectiveProp !== null && selectedPerspectiveProp !== void 0 ? selectedPerspectiveProp : null;
  var focusedSegment = interactive ? internalFocused : focusedSegmentProp !== null && focusedSegmentProp !== void 0 ? focusedSegmentProp : null;
  var effectiveFocusedSegment = react.useMemo(function () {
    if (focusedSegment != null) return focusedSegment;
    if (selectedPerspective != null && segmentIds.length > 0) return segmentIds[selectedPerspective];
    return null;
  }, [focusedSegment, selectedPerspective, segmentIds]);
  var _useRotation = useRotation({
      onFocusChanged: onFocusChanged,
      segmentIds: segmentIds,
      focusedSegment: effectiveFocusedSegment
    }),
    rotationDeg = _useRotation.rotationDeg,
    rotationRad = _useRotation.rotationRad,
    isDragging = _useRotation.isDragging,
    isRotationPaused = _useRotation.isRotationPaused,
    focusAnimatingIdx = _useRotation.focusAnimatingIdx,
    svgRef = _useRotation.svgRef,
    pointerHandlers = _useRotation.pointerHandlers;
  var setSvgRef = react.useCallback(function (el) {
    svgRef.current = el;
    if (typeof ref === 'function') ref(el);else if (ref) ref.current = el;
  }, [ref, svgRef]);
  var neutralOutside = !!neutralOutsideProp;
  var stitched = neutralOutsideProp === 'header';
  var outerRing = neutralOutside ? 'neutral' : 'negative';
  var middleRing = neutralOutside ? 'negative' : 'neutral';
  var derivePerspectiveEvent = react.useCallback(function (cell) {
    var p = perspectives[cell.perspectiveIndex];
    var thesis = typeof p.t === 'string' ? p.t : p.t.statement || p.t.alias || '';
    var antithesis = typeof p.a === 'string' ? p.a : p.a.statement || p.a.alias || '';
    return {
      perspectiveIndex: cell.perspectiveIndex,
      thesis: thesis,
      antithesis: antithesis
    };
  }, [perspectives]);
  var deriveSegmentEvent = react.useCallback(function (cell) {
    return {
      segmentId: cell.segmentId,
      pairWith: cell.pairWith,
      perspectiveIndex: cell.perspectiveIndex
    };
  }, []);
  var hoveredSegmentRef = react.useRef(null);
  var hoveredPerspectiveRef = react.useRef(null);
  var lastCellEventRef = react.useRef(null);
  var hoverSuppressedRef = react.useRef(false);
  var suppressPointerPos = react.useRef(null);
  var _useState5 = react.useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    hoveredSegmentId = _useState6[0],
    setHoveredSegmentId = _useState6[1];
  var _useState7 = react.useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    hoveredPerspectiveIdx = _useState8[0],
    setHoveredPerspectiveIdx = _useState8[1];
  react.useEffect(function () {
    if (focusAnimatingIdx != null) {
      hoverSuppressedRef.current = true;
      suppressPointerPos.current = null;
      hoveredSegmentRef.current = null;
      hoveredPerspectiveRef.current = null;
      lastCellEventRef.current = null;
      setHoveredSegmentId(null);
      setHoveredPerspectiveIdx(null);
    }
  }, [focusAnimatingIdx]);
  var handleCellClick = react.useCallback(function (cell) {
    if (interactive) {
      var toggle = internalSelected === cell.perspectiveIndex ? null : cell.perspectiveIndex;
      setInternalSelected(toggle);
      setInternalFocused(toggle != null ? cell.segmentId : null);
    }
    if (onCellClicked) onCellClicked(cell);
    if (onSegmentClicked) onSegmentClicked(deriveSegmentEvent(cell));
    if (onPerspectiveClicked) onPerspectiveClicked(derivePerspectiveEvent(cell));
  }, [interactive, internalSelected, onCellClicked, onSegmentClicked, onPerspectiveClicked, deriveSegmentEvent, derivePerspectiveEvent]);
  var handlePointerEnter = react.useCallback(function (cell) {
    if (hoverSuppressedRef.current) return;
    if (onCellOver) onCellOver(cell);
    if (hoveredSegmentRef.current !== cell.segmentId) {
      if (hoveredSegmentRef.current !== null && onSegmentOut && lastCellEventRef.current) {
        onSegmentOut(deriveSegmentEvent(lastCellEventRef.current));
      }
      hoveredSegmentRef.current = cell.segmentId;
      setHoveredSegmentId(cell.segmentId);
      if (onSegmentOver) onSegmentOver(deriveSegmentEvent(cell));
    }
    if (hoveredPerspectiveRef.current !== cell.perspectiveIndex) {
      if (hoveredPerspectiveRef.current !== null && onPerspectiveOut && lastCellEventRef.current) {
        onPerspectiveOut(derivePerspectiveEvent(lastCellEventRef.current));
      }
      hoveredPerspectiveRef.current = cell.perspectiveIndex;
      setHoveredPerspectiveIdx(cell.perspectiveIndex);
      if (onPerspectiveOver) onPerspectiveOver(derivePerspectiveEvent(cell));
    }
    lastCellEventRef.current = cell;
  }, [onCellOver, onSegmentOver, onSegmentOut, onPerspectiveOver, onPerspectiveOut, deriveSegmentEvent, derivePerspectiveEvent]);
  var handlePointerLeave = react.useCallback(function (cell) {
    if (onCellOut) onCellOut(cell);
  }, [onCellOut]);
  var handleSvgPointerMove = react.useCallback(function (e) {
    if (!hoverSuppressedRef.current) return;
    var pos = suppressPointerPos.current;
    if (pos == null) {
      suppressPointerPos.current = {
        x: e.clientX,
        y: e.clientY
      };
      return;
    }
    var dx = e.clientX - pos.x;
    var dy = e.clientY - pos.y;
    if (dx * dx + dy * dy > 9) {
      hoverSuppressedRef.current = false;
      suppressPointerPos.current = null;
    }
  }, []);
  var handleWheelPointerLeave = react.useCallback(function () {
    hoverSuppressedRef.current = false;
    var last = lastCellEventRef.current;
    if (hoveredSegmentRef.current !== null && onSegmentOut && last) {
      onSegmentOut(deriveSegmentEvent(last));
    }
    if (hoveredPerspectiveRef.current !== null && onPerspectiveOut && last) {
      onPerspectiveOut(derivePerspectiveEvent(last));
    }
    hoveredSegmentRef.current = null;
    hoveredPerspectiveRef.current = null;
    lastCellEventRef.current = null;
    setHoveredSegmentId(null);
    setHoveredPerspectiveIdx(null);
  }, [onSegmentOut, onPerspectiveOut, deriveSegmentEvent, derivePerspectiveEvent]);
  return jsxRuntime.jsx("div", {
    style: _objectSpread2({
      background: 'white',
      borderRadius: 8
    }, css),
    children: jsxRuntime.jsx("svg", _objectSpread2(_objectSpread2({
      ref: setSvgRef,
      viewBox: "-250 -250 500 500",
      style: {
        width: '100%',
        height: 'auto',
        touchAction: 'none',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
      },
      onPointerLeave: handleWheelPointerLeave
    }, pointerHandlers), {}, {
      onPointerMove: function onPointerMove(e) {
        handleSvgPointerMove(e);
        pointerHandlers.onPointerMove(e);
      },
      children: jsxRuntime.jsxs("g", {
        transform: "rotate(".concat(rotationDeg, ")"),
        style: {
          transition: isDragging || isRotationPaused ? 'none' : 'transform 300ms ease-out'
        },
        children: [jsxRuntime.jsx(Ring, {
          segments: ringData[outerRing],
          innerR: radii.outerStart,
          outerR: stitched ? radii.cycleEnd : radii.outerEnd,
          ringName: outerRing,
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          perspectiveCount: perspectives.length,
          hoveredSegmentId: hoveredSegmentId,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          headerBehavior: stitched,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), jsxRuntime.jsx(Ring, {
          segments: ringData[middleRing],
          innerR: radii.middleStart,
          outerR: radii.middleEnd,
          ringName: middleRing,
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          perspectiveCount: perspectives.length,
          hoveredSegmentId: hoveredSegmentId,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), jsxRuntime.jsx(Ring, {
          segments: ringData.positive,
          innerR: radii.innerStart,
          outerR: radii.innerEnd,
          ringName: "positive",
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          perspectiveCount: perspectives.length,
          hoveredSegmentId: hoveredSegmentId,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), jsxRuntime.jsx(SynthesisRing, {
          styles: styles,
          radii: radii
        }), headerRing === 'wheel' && jsxRuntime.jsx(WheelRing, {
          segments: ringData.invisible,
          innerR: radii.cycleStart,
          outerR: radii.cycleEnd,
          rotationRad: rotationRad,
          styles: styles,
          transparent: stitched,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), headerRing === 'cycle' && jsxRuntime.jsx(CycleRing, {
          segments: ringData.invisible,
          innerR: radii.cycleStart,
          outerR: radii.cycleEnd,
          rotationRad: rotationRad,
          styles: styles,
          transparent: stitched,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), selectedPerspective != null && jsxRuntime.jsx(SelectionOverlay, {
          segments: ringData.positive,
          selectedPerspectiveIdx: selectedPerspective,
          headerRing: headerRing,
          stitched: stitched,
          styles: styles,
          radii: radii
        })]
      })
    }))
  });
});

function exportWheelSVG(svg) {
  var clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  var serializer = new XMLSerializer();
  var str = serializer.serializeToString(clone);
  return new Blob([str], {
    type: 'image/svg+xml;charset=utf-8'
  });
}
function exportWheelPNG(svg) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$width = options.width,
    width = _options$width === void 0 ? 1024 : _options$width,
    _options$background = options.background,
    background = _options$background === void 0 ? 'white' : _options$background;
  var height = options.height || width;
  return new Promise(function (resolve, reject) {
    var clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(clone);
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);else reject(new Error('Canvas toBlob returned null'));
      }, 'image/png');
    };
    img.onerror = function () {
      return reject(new Error('Failed to load SVG as image'));
    };
    img.src = url;
  });
}
function downloadBlob(blob, filename) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

exports.Wheel = Wheel;
exports.default = Wheel;
exports.downloadBlob = downloadBlob;
exports.exportWheelPNG = exportWheelPNG;
exports.exportWheelSVG = exportWheelSVG;
//# sourceMappingURL=index.js.map
