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
var RADII = {
  hub: 30,
  innerStart: 30,
  innerEnd: 100,
  middleStart: 100,
  middleEnd: 150,
  outerStart: 150,
  outerEnd: 200,
  invisibleStart: 200,
  invisibleEnd: 250
};

function chordWidth(r, halfAngle) {
  return 2 * r * Math.sin(halfAngle) * 0.9;
}
var CellText = function CellText(_ref) {
  var innerR = _ref.innerR,
    outerR = _ref.outerR,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    text = _ref.text,
    color = _ref.color,
    rotationRad = _ref.rotationRad,
    baseFontSize = _ref.baseFontSize,
    padding = _ref.padding,
    textBias = _ref.textBias;
  var midAngle = (startAngle + endAngle) / 2;
  var halfAngle = (endAngle - startAngle) / 2;
  // textBias shifts center toward outer edge (positive = outward)
  var biasedR = (innerR + outerR) / 2 + (outerR - innerR) * textBias * 0.5;
  var _polarToCartesian = polarToCartesian(biasedR, midAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    cx = _polarToCartesian2[0],
    cy = _polarToCartesian2[1];
  var visualAngle = normalizeAngle(midAngle + rotationRad);
  var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
  var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
  var pad = (outerR - innerR) * padding;
  var boxHeight = outerR - innerR - pad * 2;
  var boxWidth = chordWidth(biasedR, halfAngle);
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
        fontSize: baseFontSize,
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

var ArcCell = function ArcCell(_ref) {
  var slice = _ref.slice,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    fillColor = _ref.fillColor,
    textColor = _ref.textColor,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    baseFontSize = _ref.baseFontSize,
    padding = _ref.padding,
    textBias = _ref.textBias,
    strokeWidth = _ref.strokeWidth,
    strokeColor = _ref.strokeColor,
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var clipId = react.useMemo(function () {
    return "dw-".concat(slice.polarity, "-").concat(slice.unitId, "-").concat(innerR).replace(/[^a-zA-Z0-9-]/g, '_');
  }, [slice.polarity, slice.unitId, innerR]);
  var path = describeArc(innerR, outerR, slice.startAngle, slice.endAngle);
  var handleClick = function handleClick() {
    if (onClick) {
      onClick({
        unitId: slice.unitId,
        polarity: slice.polarity,
        statement: slice.fullText,
        pairWith: slice.pairWith
      });
    }
  };
  return jsxRuntime.jsxs("g", {
    onClick: handleClick,
    style: {
      cursor: onClick ? 'pointer' : 'default'
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
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    }), showText && slice.fullText && jsxRuntime.jsx("g", {
      clipPath: "url(#".concat(clipId, ")"),
      children: jsxRuntime.jsx(CellText, {
        innerR: innerR,
        outerR: outerR,
        startAngle: slice.startAngle,
        endAngle: slice.endAngle,
        text: slice.fullText,
        color: textColor,
        rotationRad: rotationRad,
        measure: measure,
        baseFontSize: baseFontSize,
        padding: padding,
        textBias: textBias
      })
    })]
  });
};

// The cell is a trapezoid: wider at the outer radius, narrower at the inner.
// Each line of text sits at a specific radius and gets width = chord at that radius.
// Lines are stacked from outer edge inward (top line = outermost = widest).
function chordAt(r, halfAngle) {
  return 2 * r * Math.sin(halfAngle) * 0.9;
}
function tryFit(text, fontSize, params) {
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    paddingFrac = params.padding,
    measure = params.measure;
  var lineHeight = fontSize * 1.3;
  var halfAngle = cellAngle / 2;
  var pad = (outerR - innerR) * paddingFrac;
  var topR = outerR - pad;
  var botR = innerR + pad;
  var usableHeight = topR - botR;
  var maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return null;
  var midR = (innerR + outerR) / 2;
  var wrapWidth = chordAt(midR, halfAngle);
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
  // Check that each line fits — reject if any line exceeds wrapWidth
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

var Ring = function Ring(_ref) {
  var slices = _ref.slices,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    fillColor = _ref.fillColor,
    textColor = _ref.textColor,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    baseFontSize = _ref.baseFontSize,
    padding = _ref.padding,
    textBias = _ref.textBias,
    strokeWidth = _ref.strokeWidth,
    strokeColor = _ref.strokeColor,
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var cellAngle = slices.length > 0 ? slices[0].endAngle - slices[0].startAngle : 0;
  var uniformFontSize = react.useMemo(function () {
    if (slices.length === 0) return baseFontSize;
    var texts = slices.map(function (s) {
      return s.fullText;
    }).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    return computeUniformFontSize(texts, {
      innerR: innerR,
      outerR: outerR,
      cellAngle: cellAngle,
      baseFontSize: baseFontSize,
      padding: padding,
      measure: measure
    });
  }, [slices, innerR, outerR, cellAngle, baseFontSize, padding, measure]);
  return jsxRuntime.jsx("g", {
    children: slices.map(function (slice) {
      return jsxRuntime.jsx(ArcCell, {
        slice: slice,
        innerR: innerR,
        outerR: outerR,
        fillColor: fillColor,
        textColor: textColor,
        rotationRad: rotationRad,
        measure: measure,
        baseFontSize: uniformFontSize,
        padding: padding,
        textBias: textBias,
        strokeWidth: strokeWidth,
        strokeColor: strokeColor,
        onClick: onClick,
        showText: showText
      }, slice.unitId);
    })
  });
};

var Hub = function Hub(_ref) {
  var color = _ref.color;
  return jsxRuntime.jsx("circle", {
    cx: 0,
    cy: 0,
    r: RADII.hub,
    fill: color
  });
};

var CoordinateLabels = function CoordinateLabels(_ref) {
  var slices = _ref.slices,
    radius = _ref.radius,
    rotationRad = _ref.rotationRad,
    color = _ref.color,
    fontSize = _ref.fontSize;
  return jsxRuntime.jsx("g", {
    children: slices.map(function (slice) {
      var midAngle = (slice.startAngle + slice.endAngle) / 2;
      var _polarToCartesian = polarToCartesian(radius, midAngle),
        _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
        x = _polarToCartesian2[0],
        y = _polarToCartesian2[1];
      var visualAngle = normalizeAngle(midAngle + rotationRad);
      var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
      var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
      return jsxRuntime.jsx("text", {
        x: x,
        y: y,
        transform: "rotate(".concat(textRotDeg, ", ").concat(x, ", ").concat(y, ")"),
        textAnchor: "middle",
        dominantBaseline: "central",
        fill: color,
        fontSize: fontSize,
        fontWeight: "bold",
        fontFamily: "system-ui, sans-serif",
        style: {
          pointerEvents: 'none'
        },
        children: slice.unitId
      }, slice.unitId);
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

function useRotation(_ref) {
  var onTopSliceChange = _ref.onTopSliceChange,
    sliceIds = _ref.sliceIds;
  var _useState = react.useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    rotationDeg = _useState2[0],
    setRotationDeg = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isDragging = _useState4[0],
    setIsDragging = _useState4[1];
  var dragStart = react.useRef(null);
  var svgRef = react.useRef(null);
  var getAngleFromEvent = react.useCallback(function (e) {
    var svg = svgRef.current;
    if (!svg) return 0;
    var rect = svg.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientX - cx, -(e.clientY - cy));
  }, []);
  var reportTopSlice = react.useCallback(function (deg) {
    if (!onTopSliceChange || sliceIds.length === 0) return;
    var N = sliceIds.length;
    var sliceAngle = 360 / N;
    var normalized = (deg % 360 + 360) % 360;
    var index = Math.round(normalized / sliceAngle) % N;
    onTopSliceChange(sliceIds[index]);
  }, [onTopSliceChange, sliceIds]);
  var onPointerDown = react.useCallback(function (e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    var angle = getAngleFromEvent(e);
    dragStart.current = {
      angle: angle,
      rotation: rotationDeg
    };
    setIsDragging(true);
  }, [getAngleFromEvent, rotationDeg]);
  var onPointerMove = react.useCallback(function (e) {
    if (!dragStart.current) return;
    var angle = getAngleFromEvent(e);
    var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
    setRotationDeg(dragStart.current.rotation + delta);
  }, [getAngleFromEvent]);
  var onPointerUp = react.useCallback(function (e) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (dragStart.current) {
      var angle = getAngleFromEvent(e);
      var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
      var finalDeg = dragStart.current.rotation + delta;
      setRotationDeg(finalDeg);
      reportTopSlice(finalDeg);
    }
    dragStart.current = null;
    setIsDragging(false);
  }, [getAngleFromEvent, reportTopSlice]);
  var rotationRad = rotationDeg * Math.PI / 180;
  return {
    rotationDeg: rotationDeg,
    rotationRad: rotationRad,
    isDragging: isDragging,
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
function transformWisdomUnits(wisdomUnits, componentOrder) {
  if (!wisdomUnits || wisdomUnits.length === 0) {
    return {
      invisible: [],
      negative: [],
      neutral: [],
      positive: []
    };
  }
  var entries = [];
  wisdomUnits.forEach(function (unit, i) {
    var tAlias = extractAlias(unit.t, "T".concat(i + 1));
    var aAlias = extractAlias(unit.a, "A".concat(i + 1));
    entries.push({
      unitId: tAlias,
      statement: extractStatement(unit.t),
      positive: extractStatement(unit.t_plus),
      negative: extractStatement(unit.t_minus),
      pairWith: aAlias
    });
    entries.push({
      unitId: aAlias,
      statement: extractStatement(unit.a),
      positive: extractStatement(unit.a_plus),
      negative: extractStatement(unit.a_minus),
      pairWith: tAlias
    });
  });
  var ordered = entries;
  if (componentOrder && componentOrder.length > 0) {
    var byId = new Map(entries.map(function (e) {
      return [e.unitId, e];
    }));
    ordered = componentOrder.map(function (id) {
      return byId.get(id);
    }).filter(Boolean);
  }
  var N = ordered.length;
  var sliceAngle = 2 * Math.PI / N;
  var buildRing = function buildRing(polarity, getText) {
    return ordered.map(function (entry, i) {
      return {
        unitId: entry.unitId,
        polarity: polarity,
        fullText: getText(entry),
        pairWith: entry.pairWith,
        startAngle: i * sliceAngle,
        endAngle: (i + 1) * sliceAngle
      };
    });
  };
  return {
    invisible: buildRing('invisible', function (e) {
      return e.unitId;
    }),
    positive: buildRing('positive', function (e) {
      return e.positive;
    }),
    neutral: buildRing('neutral', function (e) {
      return e.statement;
    }),
    negative: buildRing('negative', function (e) {
      return e.negative;
    })
  };
}

var DEFAULT_STYLES = {
  ringColors: {
    negative: '#F9C6CC',
    neutral: '#ffffff',
    positive: '#C6E5B3'
  },
  textColors: {
    negative: '#8b1538',
    neutral: '#333333',
    positive: '#2d5a2d',
    coordinates: '#333333'
  },
  hubColor: '#ffff7a',
  maxFontSize: 14,
  ringStyles: {
    positive: {
      padding: 0.05,
      textBias: 0.25
    },
    negative: {
      padding: 0.05,
      textBias: 0
    },
    neutral: {
      padding: 0.05,
      textBias: 0
    }
  },
  coordinateLabelSize: 12,
  strokeWidth: 1,
  strokeColor: '#000'
};
function resolveRingStyle(s, ring) {
  var _s$ringStyles, _user$maxFontSize, _user$padding, _user$textBias;
  var user = (_s$ringStyles = s.ringStyles) === null || _s$ringStyles === void 0 ? void 0 : _s$ringStyles[ring];
  return {
    maxFontSize: (_user$maxFontSize = user === null || user === void 0 ? void 0 : user.maxFontSize) !== null && _user$maxFontSize !== void 0 ? _user$maxFontSize : s.maxFontSize,
    padding: (_user$padding = user === null || user === void 0 ? void 0 : user.padding) !== null && _user$padding !== void 0 ? _user$padding : 0.05,
    textBias: (_user$textBias = user === null || user === void 0 ? void 0 : user.textBias) !== null && _user$textBias !== void 0 ? _user$textBias : 0
  };
}
function DialecticalWheel(_ref) {
  var wisdomUnits = _ref.wisdomUnits,
    componentOrder = _ref.componentOrder,
    _ref$isWhiteOutside = _ref.isWhiteOutside,
    isWhiteOutside = _ref$isWhiteOutside === void 0 ? false : _ref$isWhiteOutside,
    userStyles = _ref.styles,
    css = _ref.css,
    onTopSliceChange = _ref.onTopSliceChange,
    onClickedCellChange = _ref.onClickedCellChange,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
  var s = react.useMemo(function () {
    var _userStyles$ringStyle, _userStyles$ringStyle2, _userStyles$ringStyle3;
    return _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_STYLES), userStyles), {}, {
      ringColors: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.ringColors), userStyles === null || userStyles === void 0 ? void 0 : userStyles.ringColors),
      textColors: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.textColors), userStyles === null || userStyles === void 0 ? void 0 : userStyles.textColors),
      ringStyles: {
        positive: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.ringStyles.positive), userStyles === null || userStyles === void 0 || (_userStyles$ringStyle = userStyles.ringStyles) === null || _userStyles$ringStyle === void 0 ? void 0 : _userStyles$ringStyle.positive),
        negative: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.ringStyles.negative), userStyles === null || userStyles === void 0 || (_userStyles$ringStyle2 = userStyles.ringStyles) === null || _userStyles$ringStyle2 === void 0 ? void 0 : _userStyles$ringStyle2.negative),
        neutral: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.ringStyles.neutral), userStyles === null || userStyles === void 0 || (_userStyles$ringStyle3 = userStyles.ringStyles) === null || _userStyles$ringStyle3 === void 0 ? void 0 : _userStyles$ringStyle3.neutral)
      }
    });
  }, [userStyles]);
  var measure = useTextMeasure();
  var ringData = react.useMemo(function () {
    return transformWisdomUnits(wisdomUnits, componentOrder);
  }, [wisdomUnits, componentOrder]);
  var sliceIds = react.useMemo(function () {
    return ringData.neutral.map(function (s) {
      return s.unitId;
    });
  }, [ringData]);
  var _useRotation = useRotation({
      onTopSliceChange: onTopSliceChange,
      sliceIds: sliceIds
    }),
    rotationDeg = _useRotation.rotationDeg,
    rotationRad = _useRotation.rotationRad,
    isDragging = _useRotation.isDragging,
    svgRef = _useRotation.svgRef,
    pointerHandlers = _useRotation.pointerHandlers;
  var outerSemantic = isWhiteOutside ? 'neutral' : 'negative';
  var middleSemantic = isWhiteOutside ? 'negative' : 'neutral';
  var outerFill = s.ringColors[outerSemantic];
  var outerText = s.textColors[outerSemantic];
  var middleFill = s.ringColors[middleSemantic];
  var middleText = s.textColors[middleSemantic];
  var outerRingStyle = resolveRingStyle(s, outerSemantic);
  var middleRingStyle = resolveRingStyle(s, middleSemantic);
  var innerRingStyle = resolveRingStyle(s, 'positive');
  var handleCellClick = function handleCellClick(cell) {
    if (onClickedCellChange) onClickedCellChange(cell);
  };
  return jsxRuntime.jsxs("div", {
    style: _objectSpread2({
      background: 'white',
      borderRadius: 8
    }, css),
    children: [jsxRuntime.jsx("svg", _objectSpread2(_objectSpread2({
      ref: svgRef,
      viewBox: "-250 -250 500 500",
      style: {
        width: '100%',
        height: 'auto',
        touchAction: 'none'
      }
    }, pointerHandlers), {}, {
      children: jsxRuntime.jsxs("g", {
        transform: "rotate(".concat(rotationDeg, ")"),
        style: {
          transition: isDragging ? 'none' : 'transform 300ms ease-out'
        },
        children: [jsxRuntime.jsx(Ring, {
          slices: ringData[outerSemantic],
          innerR: RADII.outerStart,
          outerR: RADII.outerEnd,
          fillColor: outerFill,
          textColor: outerText,
          rotationRad: rotationRad,
          measure: measure,
          baseFontSize: outerRingStyle.maxFontSize,
          padding: outerRingStyle.padding,
          textBias: outerRingStyle.textBias,
          strokeWidth: s.strokeWidth,
          strokeColor: s.strokeColor,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Ring, {
          slices: ringData[middleSemantic],
          innerR: RADII.middleStart,
          outerR: RADII.middleEnd,
          fillColor: middleFill,
          textColor: middleText,
          rotationRad: rotationRad,
          measure: measure,
          baseFontSize: middleRingStyle.maxFontSize,
          padding: middleRingStyle.padding,
          textBias: middleRingStyle.textBias,
          strokeWidth: s.strokeWidth,
          strokeColor: s.strokeColor,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Ring, {
          slices: ringData.positive,
          innerR: RADII.innerStart,
          outerR: RADII.innerEnd,
          fillColor: s.ringColors.positive,
          textColor: s.textColors.positive,
          rotationRad: rotationRad,
          measure: measure,
          baseFontSize: innerRingStyle.maxFontSize,
          padding: innerRingStyle.padding,
          textBias: innerRingStyle.textBias,
          strokeWidth: s.strokeWidth,
          strokeColor: s.strokeColor,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Hub, {
          color: s.hubColor
        }), jsxRuntime.jsx(CoordinateLabels, {
          slices: ringData.invisible,
          radius: (RADII.invisibleStart + RADII.invisibleEnd) / 2,
          rotationRad: rotationRad,
          color: s.textColors.coordinates,
          fontSize: s.coordinateLabelSize
        })]
      })
    })), debug && jsxRuntime.jsxs("div", {
      style: {
        marginTop: 8,
        padding: 8,
        background: '#f8f9fa',
        borderRadius: 4,
        fontSize: 12,
        color: '#666'
      },
      children: [wisdomUnits.length, " wisdom units, ", sliceIds.length, " slices, rotation: ", rotationDeg.toFixed(1), "\xB0"]
    })]
  });
}

exports.DialecticalWheel = DialecticalWheel;
exports.default = DialecticalWheel;
//# sourceMappingURL=index.js.map
