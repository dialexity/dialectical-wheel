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
function arcCentroid(innerR, outerR, startAngle, endAngle) {
  var midAngle = (startAngle + endAngle) / 2;
  var midR = (innerR + outerR) / 2;
  return polarToCartesian(midR, midAngle);
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

function chordWidth(lineIndex, lineHeight, outerR, innerR, cellAngle) {
  var r = outerR - (lineIndex + 0.5) * lineHeight;
  if (r <= innerR) return innerR * cellAngle * 0.8;
  var halfAngle = Math.min(cellAngle / 2, Math.acos(Math.max(-1, Math.min(1, innerR / r))));
  return 2 * r * Math.sin(halfAngle) * 0.8;
}
function tryWrap(text, fontSize, params) {
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    measure = params.measure;
  var lineHeight = fontSize * 1.4;
  var maxLines = Math.floor((outerR - innerR) * 0.8 / lineHeight);
  if (maxLines < 1) return null;
  var words = text.split(/\s+/).filter(Boolean);
  var lines = [];
  var currentLine = '';
  var lineIdx = 0;
  var _iterator = _createForOfIteratorHelper(words),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;
      var width = chordWidth(lineIdx, lineHeight, outerR, innerR, cellAngle);
      var candidate = currentLine ? "".concat(currentLine, " ").concat(word) : word;
      var candidateWidth = measure(candidate, fontSize);
      if (candidateWidth <= width) {
        currentLine = candidate;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          lineIdx++;
          if (lineIdx >= maxLines) return null;
          var newWidth = chordWidth(lineIdx, lineHeight, outerR, innerR, cellAngle);
          if (measure(word, fontSize) <= newWidth) {
            currentLine = word;
          } else {
            var hyphenated = hyphenate(word, fontSize, newWidth, measure);
            if (!hyphenated) return null;
            lines.push(hyphenated[0]);
            lineIdx++;
            if (lineIdx >= maxLines) return null;
            currentLine = hyphenated[1];
          }
        } else {
          var _hyphenated = hyphenate(word, fontSize, width, measure);
          if (!_hyphenated) return null;
          lines.push(_hyphenated[0]);
          lineIdx++;
          if (lineIdx >= maxLines) return null;
          currentLine = _hyphenated[1];
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length <= maxLines ? lines : null;
}
function hyphenate(word, fontSize, maxWidth, measure) {
  if (word.length < 4) return null;
  for (var i = word.length - 1; i >= 2; i--) {
    var part = word.slice(0, i) + '-';
    if (measure(part, fontSize) <= maxWidth) {
      return [part, word.slice(i)];
    }
  }
  return null;
}
function layoutText(text, params) {
  var baseFontSize = params.baseFontSize;
  var minFontSize = Math.max(4, baseFontSize * 0.5);
  for (var _fs = baseFontSize; _fs >= minFontSize; _fs -= 0.5) {
    var lines = tryWrap(text, _fs, _objectSpread2(_objectSpread2({}, params), {}, {
      baseFontSize: _fs
    }));
    if (lines) {
      return {
        lines: lines,
        fontSize: _fs,
        lineHeight: _fs * 1.4
      };
    }
  }
  // Last resort: truncate at min font size
  var fs = minFontSize;
  var lineHeight = fs * 1.4;
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    measure = params.measure;
  var width = chordWidth(0, lineHeight, outerR, innerR, cellAngle);
  var truncated = text;
  while (measure(truncated + '…', fs) > width && truncated.length > 1) {
    truncated = truncated.slice(0, -1).trimEnd();
  }
  return {
    lines: [truncated + '…'],
    fontSize: fs,
    lineHeight: lineHeight
  };
}

var CellText = function CellText(_ref) {
  var innerR = _ref.innerR,
    outerR = _ref.outerR,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    text = _ref.text,
    color = _ref.color,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    baseFontSize = _ref.baseFontSize;
  var _arcCentroid = arcCentroid(innerR, outerR, startAngle, endAngle),
    _arcCentroid2 = _slicedToArray(_arcCentroid, 2),
    cx = _arcCentroid2[0],
    cy = _arcCentroid2[1];
  var cellAngle = endAngle - startAngle;
  var layout = react.useMemo(function () {
    return layoutText(text, {
      innerR: innerR,
      outerR: outerR,
      cellAngle: cellAngle,
      baseFontSize: baseFontSize,
      measure: measure
    });
  }, [text, innerR, outerR, cellAngle, baseFontSize, measure]);
  var midAngle = (startAngle + endAngle) / 2;
  var visualAngle = normalizeAngle(midAngle + rotationRad);
  var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
  var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
  var totalHeight = layout.lines.length * layout.lineHeight;
  var startY = -totalHeight / 2 + layout.lineHeight * 0.7;
  return jsxRuntime.jsx("text", {
    transform: "translate(".concat(cx, ", ").concat(cy, ") rotate(").concat(textRotDeg, ")"),
    textAnchor: "middle",
    fill: color,
    fontSize: layout.fontSize,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    style: {
      pointerEvents: 'none'
    },
    children: layout.lines.map(function (line, i) {
      return jsxRuntime.jsx("tspan", {
        x: 0,
        dy: i === 0 ? startY : layout.lineHeight,
        children: line
      }, i);
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
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
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
    children: [jsxRuntime.jsx("path", {
      d: path,
      fill: fillColor,
      stroke: "#000",
      strokeWidth: 1
    }), showText && slice.fullText && jsxRuntime.jsx(CellText, {
      innerR: innerR,
      outerR: outerR,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle,
      text: slice.fullText,
      color: textColor,
      rotationRad: rotationRad,
      measure: measure,
      baseFontSize: baseFontSize
    })]
  });
};

var Ring = function Ring(_ref) {
  var slices = _ref.slices,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    fillColor = _ref.fillColor,
    textColor = _ref.textColor,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    baseFontSize = _ref.baseFontSize,
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
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
        baseFontSize: baseFontSize,
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
    color = _ref.color;
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
        fontSize: 12,
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
    return ctx.measureText(text).width;
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

var DEFAULT_COLORS = {
  userRingColors: {
    negative: '#F9C6CC',
    neutral: '#ffffff',
    positive: '#C6E5B3'
  },
  userTextColors: {
    negative: '#8b1538',
    neutral: '#333333',
    positive: '#2d5a2d',
    coordinates: '#333333'
  },
  userHubColor: '#ffff7a'
};
function DialecticalWheel(_ref) {
  var wisdomUnits = _ref.wisdomUnits,
    componentOrder = _ref.componentOrder,
    _ref$isWhiteOutside = _ref.isWhiteOutside,
    isWhiteOutside = _ref$isWhiteOutside === void 0 ? false : _ref$isWhiteOutside,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? DEFAULT_COLORS : _ref$colors,
    style = _ref.style,
    onTopSliceChange = _ref.onTopSliceChange,
    onClickedCellChange = _ref.onClickedCellChange,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
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
  var outerFill = isWhiteOutside ? colors.userRingColors.neutral : colors.userRingColors.negative;
  var outerText = isWhiteOutside ? colors.userTextColors.neutral : colors.userTextColors.negative;
  var middleFill = isWhiteOutside ? colors.userRingColors.negative : colors.userRingColors.neutral;
  var middleText = isWhiteOutside ? colors.userTextColors.negative : colors.userTextColors.neutral;
  var handleCellClick = function handleCellClick(cell) {
    if (onClickedCellChange) onClickedCellChange(cell);
  };
  return jsxRuntime.jsxs("div", {
    style: _objectSpread2({
      background: 'white',
      borderRadius: 8
    }, style),
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
          baseFontSize: 10,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Ring, {
          slices: ringData[middleSemantic],
          innerR: RADII.middleStart,
          outerR: RADII.middleEnd,
          fillColor: middleFill,
          textColor: middleText,
          rotationRad: rotationRad,
          measure: measure,
          baseFontSize: 10,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Ring, {
          slices: ringData.positive,
          innerR: RADII.innerStart,
          outerR: RADII.innerEnd,
          fillColor: colors.userRingColors.positive,
          textColor: colors.userTextColors.positive,
          rotationRad: rotationRad,
          measure: measure,
          baseFontSize: 10,
          onClick: handleCellClick
        }), jsxRuntime.jsx(Hub, {
          color: colors.userHubColor
        }), jsxRuntime.jsx(CoordinateLabels, {
          slices: ringData.invisible,
          radius: (RADII.invisibleStart + RADII.invisibleEnd) / 2,
          rotationRad: rotationRad,
          color: colors.userTextColors.coordinates
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
