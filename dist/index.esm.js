import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useRef, useCallback, useState } from 'react';

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
    fontSize = _ref.fontSize,
    padding = _ref.padding,
    topMargin = _ref.topMargin;
  var midAngle = (startAngle + endAngle) / 2;
  var halfAngle = (endAngle - startAngle) / 2;
  // topMargin: negative shifts text toward outer edge (like negative CSS top margin)
  var biasedR = (innerR + outerR) / 2 - topMargin;
  var _polarToCartesian = polarToCartesian(biasedR, midAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    cx = _polarToCartesian2[0],
    cy = _polarToCartesian2[1];
  var visualAngle = normalizeAngle(midAngle + rotationRad);
  var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
  var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
  var boxHeight = outerR - innerR - padding * 2;
  var boxWidth = chordWidth(biasedR, halfAngle);
  return jsx("foreignObject", {
    x: cx - boxWidth / 2,
    y: cy - boxHeight / 2,
    width: boxWidth,
    height: boxHeight,
    transform: "rotate(".concat(textRotDeg, ", ").concat(cx, ", ").concat(cy, ")"),
    style: {
      pointerEvents: 'none',
      overflow: 'hidden'
    },
    children: jsx("div", {
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
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var clipId = useMemo(function () {
    return "dw-".concat(segment.polarity, "-").concat(segment.segmentId, "-").concat(innerR).replace(/[^a-zA-Z0-9-]/g, '_');
  }, [segment.polarity, segment.segmentId, innerR]);
  var path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);
  var handleClick = function handleClick() {
    if (onClick) {
      onClick({
        segmentId: segment.segmentId,
        polarity: segment.polarity,
        statement: segment.fullText,
        pairWith: segment.pairWith
      });
    }
  };
  return jsxs("g", {
    onClick: handleClick,
    style: {
      cursor: onClick ? 'pointer' : 'default'
    },
    children: [jsx("defs", {
      children: jsx("clipPath", {
        id: clipId,
        children: jsx("path", {
          d: path
        })
      })
    }), jsx("path", {
      d: path,
      fill: style.background,
      stroke: style.borderColor,
      strokeWidth: style.borderWidth
    }), showText && segment.fullText && jsx("g", {
      clipPath: "url(#".concat(clipId, ")"),
      children: jsx(CellText, {
        innerR: innerR,
        outerR: outerR,
        startAngle: segment.startAngle,
        endAngle: segment.endAngle,
        text: segment.fullText,
        color: style.color,
        rotationRad: rotationRad,
        fontSize: fontSize,
        padding: style.padding,
        topMargin: style.topMargin
      })
    })]
  });
};

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
  var wrapR = innerR + (outerR - innerR) * 0.6;
  var wrapWidth = chordAt(wrapR, halfAngle);
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
  return {
    background: get('background') || '#ffffff',
    color: get('color') || '#333333',
    fontSize: resolveCSSValue(get('fontSize'), cellRadialHeight, 12),
    padding: resolveCSSValue(get('padding'), cellRadialHeight, cellRadialHeight * 0.05),
    topMargin: resolveCSSValue(get('topMargin'), cellRadialHeight, 0),
    borderWidth: resolveCSSValue(getBorder('width'), cellRadialHeight, 0.5),
    borderColor: getBorder('color') || '#ccc'
  };
}
var DEFAULT_STYLES = {
  fontSize: 12,
  border: {
    width: 0.5,
    color: '#ccc'
  },
  thead: {
    color: '#333333',
    fontSize: 12
  },
  tbody: {
    positive: {
      background: '#C6E5B3',
      color: '#2d5a2d',
      topMargin: '-25%'
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

var Ring = function Ring(_ref) {
  var segments = _ref.segments,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    ringName = _ref.ringName,
    styles = _ref.styles,
    rotationRad = _ref.rotationRad,
    measure = _ref.measure,
    onClick = _ref.onClick,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var cellRadialHeight = outerR - innerR;
  var cellAngle = segments.length > 0 ? segments[0].endAngle - segments[0].startAngle : 0;
  var resolvedStyles = useMemo(function () {
    return segments.map(function (seg) {
      return resolveStyle(styles, ringName, cellRadialHeight, seg.cellStyle);
    });
  }, [segments, styles, ringName, cellRadialHeight]);
  var baseFontSize = resolvedStyles.length > 0 ? resolvedStyles[0].fontSize : 12;
  var basePadding = resolvedStyles.length > 0 ? resolvedStyles[0].padding / cellRadialHeight : 0.05;
  var uniformFontSize = useMemo(function () {
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
  return jsx("g", {
    children: segments.map(function (segment, i) {
      return jsx(Cell, {
        segment: segment,
        innerR: innerR,
        outerR: outerR,
        style: resolvedStyles[i],
        rotationRad: rotationRad,
        fontSize: uniformFontSize,
        onClick: onClick,
        showText: showText
      }, segment.segmentId);
    })
  });
};

var SynthesisRing = function SynthesisRing(_ref) {
  var styles = _ref.styles;
  var resolved = resolveStyle(styles, 'synthesis', RADII.innerEnd - RADII.innerStart);
  return jsx("circle", {
    cx: 0,
    cy: 0,
    r: RADII.synthesis,
    fill: resolved.background,
    stroke: resolved.borderColor,
    strokeWidth: resolved.borderWidth
  });
};

var CycleRing = function CycleRing(_ref) {
  var segments = _ref.segments,
    radius = _ref.radius,
    rotationRad = _ref.rotationRad,
    styles = _ref.styles;
  var resolved = resolveStyle(styles, 'cycle', 50);
  return jsx("g", {
    children: segments.map(function (segment) {
      var midAngle = (segment.startAngle + segment.endAngle) / 2;
      var _polarToCartesian = polarToCartesian(radius, midAngle),
        _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
        x = _polarToCartesian2[0],
        y = _polarToCartesian2[1];
      var visualAngle = normalizeAngle(midAngle + rotationRad);
      var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
      var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
      return jsx("text", {
        x: x,
        y: y,
        transform: "rotate(".concat(textRotDeg, ", ").concat(x, ", ").concat(y, ")"),
        textAnchor: "middle",
        dominantBaseline: "central",
        fill: resolved.color,
        fontSize: resolved.fontSize,
        fontWeight: "bold",
        fontFamily: "system-ui, sans-serif",
        style: {
          pointerEvents: 'none'
        },
        children: segment.segmentId
      }, segment.segmentId);
    })
  });
};

function useTextMeasure() {
  var fontFamily = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'system-ui, sans-serif';
  var ctxRef = useRef(null);
  var measure = useCallback(function (text, fontSize) {
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
  var onFocusChanged = _ref.onFocusChanged,
    segmentIds = _ref.segmentIds;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    rotationDeg = _useState2[0],
    setRotationDeg = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isDragging = _useState4[0],
    setIsDragging = _useState4[1];
  var dragStart = useRef(null);
  var svgRef = useRef(null);
  var getAngleFromEvent = useCallback(function (e) {
    var svg = svgRef.current;
    if (!svg) return 0;
    var rect = svg.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientX - cx, -(e.clientY - cy));
  }, []);
  var reportTopSegment = useCallback(function (deg) {
    if (!onFocusChanged || segmentIds.length === 0) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var normalized = (deg % 360 + 360) % 360;
    var index = Math.round(normalized / segmentAngle) % N;
    onFocusChanged(segmentIds[index]);
  }, [onFocusChanged, segmentIds]);
  var onPointerDown = useCallback(function (e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    var angle = getAngleFromEvent(e);
    dragStart.current = {
      angle: angle,
      rotation: rotationDeg
    };
    setIsDragging(true);
  }, [getAngleFromEvent, rotationDeg]);
  var onPointerMove = useCallback(function (e) {
    if (!dragStart.current) return;
    var angle = getAngleFromEvent(e);
    var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
    setRotationDeg(dragStart.current.rotation + delta);
  }, [getAngleFromEvent]);
  var onPointerUp = useCallback(function (e) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (dragStart.current) {
      var angle = getAngleFromEvent(e);
      var delta = (angle - dragStart.current.angle) * (180 / Math.PI);
      var finalDeg = dragStart.current.rotation + delta;
      setRotationDeg(finalDeg);
      reportTopSegment(finalDeg);
    }
    dragStart.current = null;
    setIsDragging(false);
  }, [getAngleFromEvent, reportTopSegment]);
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
  var entries = [].concat(theses, antitheses);
  var N = entries.length;
  var segmentAngle = 2 * Math.PI / N;
  var buildRing = function buildRing(polarity, getText, getCellStyle) {
    return entries.map(function (entry, i) {
      return {
        segmentId: entry.segmentId,
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
function Wheel(_ref) {
  var perspectives = _ref.perspectives,
    _ref$isWhiteOutside = _ref.isWhiteOutside,
    isWhiteOutside = _ref$isWhiteOutside === void 0 ? false : _ref$isWhiteOutside,
    userStyles = _ref.styles,
    css = _ref.css,
    onFocusChanged = _ref.onFocusChanged,
    onCellClicked = _ref.onCellClicked,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
  var styles = useMemo(function () {
    return mergeStyles(userStyles);
  }, [userStyles]);
  var measure = useTextMeasure();
  var ringData = useMemo(function () {
    return transformPerspectives(perspectives);
  }, [perspectives]);
  var segmentIds = useMemo(function () {
    return ringData.neutral.map(function (s) {
      return s.segmentId;
    });
  }, [ringData]);
  var _useRotation = useRotation({
      onFocusChanged: onFocusChanged,
      segmentIds: segmentIds
    }),
    rotationDeg = _useRotation.rotationDeg,
    rotationRad = _useRotation.rotationRad,
    isDragging = _useRotation.isDragging,
    svgRef = _useRotation.svgRef,
    pointerHandlers = _useRotation.pointerHandlers;
  var outerRing = isWhiteOutside ? 'neutral' : 'negative';
  var middleRing = isWhiteOutside ? 'negative' : 'neutral';
  var handleCellClick = function handleCellClick(cell) {
    if (onCellClicked) onCellClicked(cell);
  };
  return jsxs("div", {
    style: _objectSpread2({
      background: 'white',
      borderRadius: 8
    }, css),
    children: [jsx("svg", _objectSpread2(_objectSpread2({
      ref: svgRef,
      viewBox: "-250 -250 500 500",
      style: {
        width: '100%',
        height: 'auto',
        touchAction: 'none'
      }
    }, pointerHandlers), {}, {
      children: jsxs("g", {
        transform: "rotate(".concat(rotationDeg, ")"),
        style: {
          transition: isDragging ? 'none' : 'transform 300ms ease-out'
        },
        children: [jsx(Ring, {
          segments: ringData[outerRing],
          innerR: RADII.outerStart,
          outerR: RADII.outerEnd,
          ringName: outerRing,
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          onClick: handleCellClick
        }), jsx(Ring, {
          segments: ringData[middleRing],
          innerR: RADII.middleStart,
          outerR: RADII.middleEnd,
          ringName: middleRing,
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          onClick: handleCellClick
        }), jsx(Ring, {
          segments: ringData.positive,
          innerR: RADII.innerStart,
          outerR: RADII.innerEnd,
          ringName: "positive",
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          onClick: handleCellClick
        }), jsx(SynthesisRing, {
          styles: styles
        }), jsx(CycleRing, {
          segments: ringData.invisible,
          radius: (RADII.cycleStart + RADII.cycleEnd) / 2,
          rotationRad: rotationRad,
          styles: styles
        })]
      })
    })), debug && jsxs("div", {
      style: {
        marginTop: 8,
        padding: 8,
        background: '#f8f9fa',
        borderRadius: 4,
        fontSize: 12,
        color: '#666'
      },
      children: [perspectives.length, " perspectives, ", segmentIds.length, " segments, rotation: ", rotationDeg.toFixed(1), "\xB0"]
    })]
  });
}

export { Wheel, Wheel as default };
//# sourceMappingURL=index.esm.js.map
