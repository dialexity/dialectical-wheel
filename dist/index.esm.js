import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useMemo, useRef, useCallback, useState, useEffect, forwardRef, Children, isValidElement } from 'react';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
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
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
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
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
// The inner (positive/green) ring gets the largest radial share because its
// cells sit near the narrow tip of the wedge (smallest radius = narrowest
// chords), making it the hardest ring to fit text in. Radius is zero-sum
// (outerEnd is fixed at 200 by the cycle ring), so bands are sized to EQUALIZE
// the three body rings' fonts rather than give any one a comfortable margin.
//
// The green ring's font degrades faster than the others as perspectives are
// added (its wedge narrows fastest toward the tip), so a single fixed split
// can't stay balanced: at few perspectives green would dominate, at many it
// would be the smallest. Its share therefore GROWS with the count — the
// positive/neutral boundary moves outward from 105 (1-2 PP) to 130 (4 PP).
// Values are tuned so green ≥ the other two rings at every count (spread ≤ 1px).
function buildRadii(innerEnd, middleEnd) {
  return {
    synthesis: 30,
    innerStart: 30,
    innerEnd: innerEnd,
    middleStart: innerEnd,
    middleEnd: middleEnd,
    outerStart: middleEnd,
    outerEnd: 200,
    cycleStart: 200,
    cycleEnd: 250
  };
}
// [innerEnd, middleEnd] boundaries per perspective count (clamped to the 1..4
// range that has been tuned; 5+ reuses the 4-PP split).
var RADII_BY_COUNT = {
  1: [105, 152],
  2: [105, 152],
  3: [118, 159],
  4: [130, 164]
};
function getRadii(perspectiveCount) {
  var key = Math.min(4, Math.max(1, perspectiveCount));
  var _RADII_BY_COUNT$key = _slicedToArray(RADII_BY_COUNT[key], 2),
    innerEnd = _RADII_BY_COUNT$key[0],
    middleEnd = _RADII_BY_COUNT$key[1];
  return buildRadii(innerEnd, middleEnd);
}

function getRingConfig(ring) {
  switch (ring) {
    // Ring 1 (innermost, positive) is a small central cell: reflow-on-rotation
    // is barely noticeable, and its narrow wedge needs every pixel of the
    // trapezoid, so it opts out of the stable profile for a bigger font.
    case 1:
      return {
        chordShrink: 0.9,
        chordCap: 1.4,
        stable: false
      };
    case 2:
      return {
        chordShrink: 0.9,
        chordCap: Infinity,
        stable: true
      };
    case 3:
      return {
        chordShrink: 0.9,
        chordCap: Infinity,
        stable: true
      };
  }
}
/**
 * Usable width for a single horizontal text line whose vertical center sits at
 * radius `lineR` in the (rotated) cell frame.
 *
 * A line is a STRAIGHT rectangle (width w, height lineHeight) centered on the
 * cell's mid-radial, so it is bounded by exactly two real walls:
 *   - the two radial wedge edges (±halfAngle) — the line's INNER corners are
 *     closest, at radius rInner = lineR − lineHeight/2, giving half-width
 *     rInner·tan(halfAngle);
 *   - the outer arc — the line's OUTER corners are closest, at radius
 *     rOuter = lineR + lineHeight/2, giving half-width √(outerR² − rOuter²).
 * The inner arc is never a constraint: a straight chord's minimum radius is at
 * its midpoint, which always stays ≥ innerR.
 */
function chordAt(lineR, halfAngle, cellHeight, lineHeight, config, outerR) {
  var rInner = lineR - lineHeight / 2;
  if (rInner <= 0) return 0;
  var half = rInner * Math.tan(halfAngle);
  if (outerR !== undefined) {
    var rOuter = lineR + lineHeight / 2;
    var outerHalf = Math.sqrt(Math.max(0, outerR * outerR - rOuter * rOuter));
    half = Math.min(half, outerHalf);
  }
  var maxW = 2 * half * config.chordShrink;
  maxW = Math.min(maxW, cellHeight * config.chordCap);
  return Math.max(0, maxW);
}
function lineWidths(n, fontSize, centerR, halfAngle, cellHeight, flipped, config, outerR) {
  var lineHeight = fontSize * 1.3;
  var widths = [];
  for (var i = 0; i < n; i++) {
    var lineR = void 0;
    if (flipped) {
      lineR = centerR - ((n - 1) / 2 - i) * lineHeight;
    } else {
      lineR = centerR + ((n - 1) / 2 - i) * lineHeight;
    }
    widths.push(chordAt(Math.max(lineR, 1), halfAngle, cellHeight, lineHeight, config, outerR));
  }
  return widths;
}
/**
 * Per-line widths that hold regardless of the cell's rotation. Because rotating
 * the cell past a pole swaps inner↔outer line order, we take the element-wise
 * min of the normal and flipped width profiles. The result is symmetric
 * top-to-bottom, so the wrapped text is identical in both orientations and
 * never reflows as the wheel turns.
 */
function stableWidths(n, fontSize, centerR, halfAngle, cellHeight, config, outerR) {
  var normalW = lineWidths(n, fontSize, centerR, halfAngle, cellHeight, false, config, outerR);
  var flippedW = lineWidths(n, fontSize, centerR, halfAngle, cellHeight, true, config, outerR);
  return normalW.map(function (w, i) {
    return Math.min(w, flippedW[i]);
  });
}
function tryWrap(words, widths, fontSize, measure) {
  if (widths.length === 0) return null;
  if (words.length === 0) return [''];
  var lines = [];
  var currentLine = '';
  var slotIdx = 0;
  var _iterator = _createForOfIteratorHelper(words),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;
      var candidate = currentLine ? "".concat(currentLine, " ").concat(word) : word;
      if (measure(candidate, fontSize) <= widths[slotIdx]) {
        currentLine = candidate;
      } else if (currentLine) {
        lines.push(currentLine);
        slotIdx++;
        if (slotIdx >= widths.length) return null;
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
  if (currentLine) {
    lines.push(currentLine);
  }
  if (lines.length > widths.length) return null;
  for (var i = 0; i < lines.length; i++) {
    if (measure(lines[i], fontSize) > widths[i]) return null;
  }
  return lines;
}
/**
 * Widths used to wrap the text at a given orientation. Stable rings use the
 * symmetric (rotation-invariant) profile; trapezoid rings use the true
 * orientation-specific profile so long words fall on the wide (outer) lines.
 */
function widthsForOrientation(n, fontSize, centerR, halfAngle, cellHeight, config, outerR, flipped) {
  if (config.stable) {
    return stableWidths(n, fontSize, centerR, halfAngle, cellHeight, config, outerR);
  }
  return lineWidths(n, fontSize, centerR, halfAngle, cellHeight, flipped, config, outerR);
}
/** True if `words` wrap within `maxLines` for the given orientation at `fontSize`. */
function fitsOrientation(words, fontSize, halfAngle, cellHeight, config, outerR, topR, botR, midR, maxLines, flipped, measure) {
  var lineHeight = fontSize * 1.3;
  for (var n = 1; n <= maxLines; n++) {
    var cR = clampCenter(n, lineHeight, topR, botR, midR);
    var widths = widthsForOrientation(n, fontSize, cR, halfAngle, cellHeight, config, outerR, flipped);
    var result = tryWrap(words, widths, fontSize, measure);
    if (result && result.length <= n) return true;
  }
  return false;
}
function tryFitUniform(text, fontSize, params) {
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    paddingFrac = params.padding,
    measure = params.measure,
    textBias = params.textBias,
    ring = params.ring;
  var config = getRingConfig(ring);
  var lineHeight = fontSize * 1.3;
  var halfAngle = cellAngle / 2;
  var cellHeight = outerR - innerR;
  var pad = cellHeight * paddingFrac;
  var topR = outerR - pad;
  var botR = innerR + pad;
  var usableHeight = topR - botR;
  var maxLines = Math.floor(usableHeight / lineHeight);
  if (maxLines < 1) return false;
  var midR = (topR + botR) / 2 + textBias * cellHeight;
  var words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  var fitsNormal = fitsOrientation(words, fontSize, halfAngle, cellHeight, config, outerR, topR, botR, midR, maxLines, false, measure);
  if (config.stable) return fitsNormal;
  // Trapezoid rings re-wrap when rotated past vertical, so both orientations
  // must fit independently or text would overflow at some rotation angle.
  if (!fitsNormal) return false;
  return fitsOrientation(words, fontSize, halfAngle, cellHeight, config, outerR, topR, botR, midR, maxLines, true, measure);
}
function computeUniformFontSize(texts, params) {
  var baseFontSize = params.baseFontSize;
  var _loop = function _loop(fs) {
      if (texts.every(function (t) {
        return tryFitUniform(t, fs, params);
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
function clampCenter(n, lineHeight, topR, botR, midR) {
  if (n <= 1) return midR;
  var blockH = n * lineHeight;
  var margin = lineHeight * 0.5;
  var maxC = topR - blockH / 2 - margin;
  var minC = botR + blockH / 2 + margin;
  if (minC > maxC) return (topR + botR) / 2;
  return Math.max(minC, Math.min(midR, maxC));
}
function layoutTextVariable(text, fontSize, params, flipped) {
  var innerR = params.innerR,
    outerR = params.outerR,
    cellAngle = params.cellAngle,
    paddingFrac = params.padding,
    measure = params.measure,
    textBias = params.textBias,
    ring = params.ring;
  var config = getRingConfig(ring);
  var lineHeight = fontSize * 1.3;
  var halfAngle = cellAngle / 2;
  var cellHeight = outerR - innerR;
  var pad = cellHeight * paddingFrac;
  var topR = outerR - pad;
  var botR = innerR + pad;
  var usableHeight = topR - botR;
  var maxLines = Math.max(1, Math.floor(usableHeight / lineHeight));
  var midR = (topR + botR) / 2 + textBias * cellHeight;
  var words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return {
      lines: [''],
      fontSize: fontSize,
      lineHeight: lineHeight,
      centerR: midR
    };
  }
  for (var n = 1; n <= maxLines; n++) {
    var _cR = clampCenter(n, lineHeight, topR, botR, midR);
    var _widths = widthsForOrientation(n, fontSize, _cR, halfAngle, cellHeight, config, outerR, flipped);
    var result = tryWrap(words, _widths, fontSize, measure);
    if (result && result.length <= n) {
      return {
        lines: result,
        fontSize: fontSize,
        lineHeight: lineHeight,
        centerR: _cR
      };
    }
  }
  var cR = clampCenter(maxLines, lineHeight, topR, botR, midR);
  var widths = widthsForOrientation(maxLines, fontSize, cR, halfAngle, cellHeight, config, outerR, flipped);
  var lenient = wrapLenient(words, widths, fontSize, measure);
  return {
    lines: lenient,
    fontSize: fontSize,
    lineHeight: lineHeight,
    centerR: cR
  };
}
function wrapLenient(words, widths, fontSize, measure) {
  if (widths.length === 0 || words.length === 0) return [''];
  var lines = [];
  var currentLine = '';
  var slotIdx = 0;
  var _iterator2 = _createForOfIteratorHelper(words),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var word = _step2.value;
      var w = slotIdx < widths.length ? widths[slotIdx] : widths[widths.length - 1];
      var candidate = currentLine ? "".concat(currentLine, " ").concat(word) : word;
      if (measure(candidate, fontSize) <= w) {
        currentLine = candidate;
      } else if (currentLine) {
        lines.push(currentLine);
        slotIdx++;
        currentLine = word;
      } else {
        currentLine = word;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
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
    textBias = _ref.textBias,
    ringNumber = _ref.ringNumber,
    measure = _ref.measure;
  var midAngle = (startAngle + endAngle) / 2;
  var cellHeight = outerR - innerR;
  var cellAngle = endAngle - startAngle;
  var paddingFrac = padding / cellHeight;
  var visualAngle = normalizeAngle(midAngle + rotationRad);
  var needsFlip = visualAngle > Math.PI / 2 && visualAngle < 3 * Math.PI / 2;
  var textRotDeg = midAngle * 180 / Math.PI + (needsFlip ? 180 : 0);
  var layout = layoutTextVariable(text, fontSize, {
    innerR: innerR,
    outerR: outerR,
    cellAngle: cellAngle,
    padding: paddingFrac,
    measure: measure,
    textBias: textBias,
    ring: ringNumber
  }, needsFlip);
  if (layout.lines.length === 0) return null;
  var lineHeight = layout.lineHeight;
  var n = layout.lines.length;
  var blockCenterR = layout.centerR;
  var _polarToCartesian = polarToCartesian(blockCenterR, midAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    cx = _polarToCartesian2[0],
    cy = _polarToCartesian2[1];
  var firstLineOffset = -(n - 1) * lineHeight / 2;
  return jsx("text", {
    transform: "translate(".concat(cx, ",").concat(cy, ") rotate(").concat(textRotDeg, ")"),
    textAnchor: "middle",
    dominantBaseline: "central",
    fill: color,
    fontSize: fontSize,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    style: {
      pointerEvents: 'none'
    },
    children: layout.lines.map(function (line, i) {
      return jsx("tspan", {
        x: "0",
        dy: i === 0 ? firstLineOffset : lineHeight,
        children: line
      }, i);
    })
  });
};

var Cell = function Cell(_ref) {
  var segment = _ref.segment,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    textOuterR = _ref.textOuterR,
    style = _ref.style,
    rotationRad = _ref.rotationRad,
    fontSize = _ref.fontSize,
    textBias = _ref.textBias,
    ringNumber = _ref.ringNumber,
    measure = _ref.measure,
    hovered = _ref.hovered,
    onClick = _ref.onClick,
    onPointerEnter = _ref.onPointerEnter,
    onPointerLeave = _ref.onPointerLeave,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? true : _ref$showText;
  var clipId = useMemo(function () {
    return "dw-".concat(segment.polarity, "-").concat(segment.segmentId, "-").concat(innerR).replace(/[^a-zA-Z0-9-]/g, '_');
  }, [segment.polarity, segment.segmentId, innerR]);
  var path = describeArc(innerR, outerR, segment.startAngle, segment.endAngle);
  var cellEvent = useMemo(function () {
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
  return jsxs("g", {
    onClick: handleClick,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    style: {
      cursor: interactive ? 'pointer' : 'default'
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
      stroke: hovered ? style.hoverBorderColor : style.borderColor,
      strokeWidth: style.borderWidth
    }), showText && segment.fullText && jsx("g", {
      clipPath: "url(#".concat(clipId, ")"),
      children: jsx(CellText, {
        innerR: innerR,
        outerR: textOuterR !== null && textOuterR !== void 0 ? textOuterR : outerR,
        startAngle: segment.startAngle,
        endAngle: segment.endAngle,
        text: segment.fullText,
        color: style.color,
        rotationRad: rotationRad,
        fontSize: fontSize,
        padding: style.padding,
        textBias: textBias,
        ringNumber: ringNumber,
        measure: measure
      })
    })]
  });
};

function resolveCSSValue$1(value, relativeTo, fallback) {
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
function resolveStyle(styles, ctx, cellRadialHeight, cellOverride) {
  var layers = [];
  // 1. Table level
  layers.push(styles);
  // 2. Row-group level
  var group = styles[ctx.rowGroup];
  layers.push(group);
  // 3. Row level (ring within row-group)
  var row;
  if (ctx.rowGroup === 'tbody' && ctx.ring !== 'cycle' && ctx.ring !== 'synthesis') {
    row = group === null || group === void 0 ? void 0 : group[ctx.ring];
    layers.push(row);
  } else if (ctx.rowGroup === 'thead' && ctx.ring === 'neutral') {
    row = group === null || group === void 0 ? void 0 : group.neutral;
    layers.push(row);
  } else if (ctx.rowGroup === 'tfoot') {
    var _styles$tbody;
    // tfoot IS the row — no sub-ring. Backward compat: fall back to tbody.synthesis
    if (!group && (_styles$tbody = styles.tbody) !== null && _styles$tbody !== void 0 && _styles$tbody.synthesis) {
      layers.push(styles.tbody.synthesis);
    }
    row = group;
  }
  // 4. Row + col-type (e.g. tbody.positive.thesis)
  if (row) {
    var colScope = row[ctx.colType];
    layers.push(colScope);
  }
  // 5. Row + nth (e.g. tbody.positive[2])
  if (row && ctx.perspectiveIndex >= 0) {
    layers.push(row[ctx.perspectiveIndex]);
  }
  // 6. Row + col-type + nth (e.g. tbody.positive.thesis[2])
  if (row && ctx.perspectiveIndex >= 0) {
    var _colScope = row[ctx.colType];
    if (_colScope) {
      layers.push(_colScope[ctx.perspectiveIndex]);
    }
  }
  // 7. Cell inline (from data object — highest priority)
  layers.push(cellOverride);
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
  var getArrow = function getArrow(prop) {
    for (var i = layers.length - 1; i >= 0; i--) {
      var _layers$i4;
      var a = (_layers$i4 = layers[i]) === null || _layers$i4 === void 0 ? void 0 : _layers$i4.arrow;
      if (a && a[prop] !== undefined) return a[prop];
    }
    return undefined;
  };
  var resolvedBorderColor = getBorder('color') || '#ddd';
  var resolvedHoverBorderColor = get('hoverBorderColor') || '#999';
  return {
    background: get('background') || '#ffffff',
    color: get('color') || '#333333',
    fontSize: resolveCSSValue$1(get('fontSize'), cellRadialHeight, 12),
    padding: resolveCSSValue$1(get('padding'), cellRadialHeight, cellRadialHeight * 0.06),
    borderWidth: resolveCSSValue$1(getBorder('width'), cellRadialHeight, 0.5),
    borderColor: resolvedBorderColor,
    hoverBorderColor: resolvedHoverBorderColor,
    selectedBorderWidth: resolveCSSValue$1(getSelectedBorder('width'), cellRadialHeight, 1),
    selectedBorderColor: getSelectedBorder('color') || '#666',
    // Arrows default to a visible gray rather than tracking the table border
    // color: the border defaults to white (#fff) for hairline cell separators,
    // which would render header-ring arrows invisibly white-on-white. #999
    // matches the hover-border/arrow-hover default so segment-hover reads as a
    // width change, not a color shift. An explicit arrow.color still wins.
    arrowColor: getArrow('color') || '#999',
    arrowHoverColor: get('hoverArrowColor') || resolvedHoverBorderColor,
    arrowWidth: resolveCSSValue$1(getArrow('width'), cellRadialHeight, cellRadialHeight * 0.03)
  };
}
var DEFAULT_STYLES = {
  fontSize: 12,
  border: {
    width: 0.5,
    color: '#fff'
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
    }
  },
  tfoot: {
    background: '#ffff7a'
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
    ringNumber = _ref.ringNumber,
    rowGroup = _ref.rowGroup,
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
    headerBehavior = _ref.headerBehavior,
    maxFontSize = _ref.maxFontSize;
  var cellRadialHeight = outerR - innerR;
  var cellAngle = segments.length > 0 ? segments[0].endAngle - segments[0].startAngle : 0;
  var resolvedStyles = useMemo(function () {
    return segments.map(function (seg) {
      var ctx = {
        rowGroup: rowGroup,
        ring: ringName,
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex
      };
      var s = resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
      if (headerBehavior) return _objectSpread2(_objectSpread2({}, s), {}, {
        borderColor: 'transparent'
      });
      return s;
    });
  }, [segments, styles, ringName, rowGroup, cellRadialHeight, headerBehavior]);
  var baseFontSize = resolvedStyles.length > 0 ? resolvedStyles[0].fontSize : 12;
  var basePadding = resolvedStyles.length > 0 ? resolvedStyles[0].padding / cellRadialHeight : 0.05;
  var textBias = computeTextBias(ringName, perspectiveCount);
  var textOuterR = headerBehavior ? innerR + (outerR - innerR) * 0.65 : outerR;
  var uniformFontSize = useMemo(function () {
    if (segments.length === 0) return baseFontSize;
    var texts = segments.map(function (s) {
      return s.fullText;
    }).filter(Boolean);
    if (texts.length === 0) return baseFontSize;
    var startFs = maxFontSize != null ? Math.min(baseFontSize, maxFontSize) : baseFontSize;
    return computeUniformFontSize(texts, {
      innerR: innerR,
      outerR: textOuterR,
      cellAngle: cellAngle,
      baseFontSize: startFs,
      padding: basePadding,
      measure: measure,
      textBias: textBias,
      ring: ringNumber
    });
  }, [segments, innerR, textOuterR, cellAngle, baseFontSize, basePadding, measure, textBias, ringNumber, maxFontSize]);
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
  return jsxs("g", {
    children: [segments.map(function (segment, i) {
      return isSpacer(segment) || isElevated(segment) ? null : jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: jsx(Cell, {
          segment: segment,
          innerR: innerR,
          outerR: outerR,
          textOuterR: headerBehavior ? textOuterR : undefined,
          style: resolvedStyles[i],
          rotationRad: rotationRad,
          fontSize: uniformFontSize,
          textBias: textBias,
          ringNumber: ringNumber,
          measure: measure,
          hovered: false,
          onClick: onClick,
          onPointerEnter: onPointerEnter,
          onPointerLeave: onPointerLeave,
          showText: showText
        })
      }, segment.segmentId);
    }), segments.map(function (segment, i) {
      return isSpacer(segment) || !isElevated(segment) ? null : jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: jsx(Cell, {
          segment: segment,
          innerR: innerR,
          outerR: outerR,
          textOuterR: headerBehavior ? textOuterR : undefined,
          style: resolvedStyles[i],
          rotationRad: rotationRad,
          fontSize: uniformFontSize,
          textBias: textBias,
          ringNumber: ringNumber,
          measure: measure,
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
    radii = _ref.radii,
    segments = _ref.segments;
  var cellRadialHeight = radii.innerEnd - radii.innerStart;
  var resolvedStyles = useMemo(function () {
    return segments.map(function (seg) {
      var ctx = {
        rowGroup: 'tfoot',
        ring: 'synthesis',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    });
  }, [segments, styles, cellRadialHeight]);
  var allSameBackground = resolvedStyles.length > 0 && resolvedStyles.every(function (s) {
    return s.background === resolvedStyles[0].background;
  });
  if (segments.length === 0 || allSameBackground) {
    var _resolvedStyles$;
    var resolved = (_resolvedStyles$ = resolvedStyles[0]) !== null && _resolvedStyles$ !== void 0 ? _resolvedStyles$ : resolveStyle(styles, {
      rowGroup: 'tfoot',
      ring: 'synthesis',
      colType: 'thesis',
      perspectiveIndex: 0
    }, cellRadialHeight);
    return jsx("circle", {
      cx: 0,
      cy: 0,
      r: radii.synthesis,
      fill: resolved.background,
      stroke: resolved.borderColor,
      strokeWidth: resolved.borderWidth
    });
  }
  return jsx("g", {
    children: segments.map(function (seg, i) {
      if (seg.perspectiveIndex === -1) return null;
      var s = resolvedStyles[i];
      var path = describeArc(0, radii.synthesis, seg.startAngle, seg.endAngle);
      return jsx("path", {
        d: path,
        fill: s.background,
        stroke: s.borderColor,
        strokeWidth: s.borderWidth
      }, seg.segmentId);
    })
  });
};

function resolveCSSValue(value, relativeTo, fallback) {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  var str = value.trim();
  if (str.endsWith('%')) return parseFloat(str) / 100 * relativeTo;
  if (str.endsWith('px')) return parseFloat(str);
  return parseFloat(str) || fallback;
}
var InwardSpiralArrows = function InwardSpiralArrows(_ref) {
  var _styles$spiralArrow$c, _styles$spiralArrow, _styles$spiralArrow2, _styles$dimUnfocused;
  var segments = _ref.segments,
    radii = _ref.radii,
    neutralOutside = _ref.neutralOutside,
    direction = _ref.direction,
    styles = _ref.styles,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx;
  var arrows = useMemo(function () {
    var neg = segments.negative.filter(function (s) {
      return s.perspectiveIndex !== -1;
    });
    var pos = segments.positive.filter(function (s) {
      return s.perspectiveIndex !== -1;
    });
    if (neg.length === 0 || pos.length === 0 || neg.length === 1) return [];
    var cw = direction !== 'left';
    // Negative ring boundaries (outer = red/pink ring)
    var negInner = neutralOutside ? radii.middleStart : radii.outerStart;
    var negOuter = neutralOutside ? radii.middleEnd : radii.outerEnd;
    // Positive ring boundaries (inner = green ring)
    var posInner = radii.innerStart;
    var posOuter = radii.innerEnd;
    var arrowSize = (negOuter - negInner) * 0.15;
    // Arrow spans from inside neg ring to just inside pos ring corner
    // Start: 30% inward from neg inner edge
    var startR = negInner + (negOuter - negInner) * 0.3;
    // End: just inside the outer edge of the pos cell (15% inward)
    var endR = posOuter - (posOuter - posInner) * 0.15;
    // Control point at the boundary between the two rings
    var cpR = (negInner + posOuter) / 2;
    var result = [];
    for (var i = 0; i < neg.length; i++) {
      var nextIdx = cw ? (i + 1) % pos.length : (i - 1 + pos.length) % pos.length;
      var negSeg = neg[i];
      var posSeg = pos[nextIdx];
      // Start angle: leading edge of neg cell (where it borders the next segment)
      var negSpan = negSeg.endAngle - negSeg.startAngle;
      var sAngle = cw ? negSeg.endAngle - negSpan * 0.1 : negSeg.startAngle + negSpan * 0.1;
      // End angle: trailing edge of pos cell (where it borders the previous segment)
      var posSpan = posSeg.endAngle - posSeg.startAngle;
      var eAngle = cw ? posSeg.startAngle + posSpan * 0.1 : posSeg.endAngle - posSpan * 0.1;
      var _polarToCartesian = polarToCartesian(startR, sAngle),
        _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
        sx = _polarToCartesian2[0],
        sy = _polarToCartesian2[1];
      var _polarToCartesian3 = polarToCartesian(endR, eAngle),
        _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
        ex = _polarToCartesian4[0],
        ey = _polarToCartesian4[1];
      // Angular midpoint — go in the direction of travel (CW or CCW)
      var angleDelta = cw ? (eAngle - sAngle + 2 * Math.PI) % (2 * Math.PI) : (sAngle - eAngle + 2 * Math.PI) % (2 * Math.PI);
      var cpAngle = cw ? sAngle + angleDelta * 0.5 : sAngle - angleDelta * 0.5;
      var _polarToCartesian5 = polarToCartesian(cpR, cpAngle),
        _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
        cx = _polarToCartesian6[0],
        cy = _polarToCartesian6[1];
      var path = "M".concat(sx, ",").concat(sy, " Q").concat(cx, ",").concat(cy, " ").concat(ex, ",").concat(ey);
      // Open chevron arrowhead (matching causality arrows)
      // Tangent at t=1: tangent = 2*(E - CP)
      var tx = 2 * (ex - cx);
      var ty = 2 * (ey - cy);
      var tLen = Math.sqrt(tx * tx + ty * ty);
      var ux = tx / tLen;
      var uy = ty / tLen;
      var px = -uy;
      var py = ux;
      var hl = arrowSize * 0.35;
      var h1x = ex - ux * hl + px * hl * 0.5;
      var h1y = ey - uy * hl + py * hl * 0.5;
      var h2x = ex - ux * hl - px * hl * 0.5;
      var h2y = ey - uy * hl - py * hl * 0.5;
      var head = "M".concat(h1x, ",").concat(h1y, " L").concat(ex, ",").concat(ey, " L").concat(h2x, ",").concat(h2y);
      result.push({
        fromIdx: negSeg.perspectiveIndex,
        toIdx: posSeg.perspectiveIndex,
        path: path,
        head: head
      });
    }
    return result;
  }, [segments, radii, neutralOutside, direction]);
  var negCellHeight = neutralOutside ? radii.middleEnd - radii.middleStart : radii.outerEnd - radii.outerStart;
  var spiralColor = (_styles$spiralArrow$c = (_styles$spiralArrow = styles.spiralArrow) === null || _styles$spiralArrow === void 0 ? void 0 : _styles$spiralArrow.color) !== null && _styles$spiralArrow$c !== void 0 ? _styles$spiralArrow$c : '#333';
  var spiralWidth = resolveCSSValue((_styles$spiralArrow2 = styles.spiralArrow) === null || _styles$spiralArrow2 === void 0 ? void 0 : _styles$spiralArrow2.width, negCellHeight, negCellHeight * 0.03);
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var arrowOpacity = function arrowOpacity(fromIdx, toIdx) {
    if (focusAnimatingIdx != null) {
      if (fromIdx !== focusAnimatingIdx && toIdx !== focusAnimatingIdx) return 0;
    }
    if (selectedPerspectiveIdx != null) {
      if (fromIdx !== selectedPerspectiveIdx && toIdx !== selectedPerspectiveIdx && fromIdx !== hoveredPerspectiveIdx && toIdx !== hoveredPerspectiveIdx) {
        return 1 - dimUnfocused;
      }
    }
    return 1;
  };
  return jsx("g", {
    children: arrows.map(function (arrow, i) {
      return jsxs("g", {
        opacity: arrowOpacity(arrow.fromIdx, arrow.toIdx),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: [jsx("path", {
          d: arrow.path,
          fill: "none",
          stroke: spiralColor,
          strokeWidth: spiralWidth,
          strokeLinecap: "round"
        }), jsx("path", {
          d: arrow.head,
          fill: "none",
          stroke: spiralColor,
          strokeWidth: spiralWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }, i);
    })
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
    direction = _ref.direction,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx,
    hoveredArrowId = _ref.hoveredArrowId,
    _onClick = _ref.onClick,
    _onPointerEnter = _ref.onPointerEnter,
    _onPointerLeave = _ref.onPointerLeave,
    onArrowOver = _ref.onArrowOver,
    onArrowOut = _ref.onArrowOut,
    onArrowClicked = _ref.onArrowClicked;
  var cellRadialHeight = outerR - innerR;
  var radius = (innerR + outerR) / 2;
  var resolvedStyles = useMemo(function () {
    return segments.map(function (seg) {
      var ctx = {
        rowGroup: 'thead',
        ring: 'cycle',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    });
  }, [segments, styles, cellRadialHeight]);
  var cellEvents = useMemo(function () {
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
  var arrowEvents = useMemo(function () {
    return segments.map(function (segment) {
      return {
        segmentId: segment.segmentId,
        perspectiveIndex: segment.perspectiveIndex
      };
    });
  }, [segments]);
  var interactive = _onClick || _onPointerEnter;
  var isSpacer = function isSpacer(segment) {
    return segment.perspectiveIndex === -1;
  };
  var isSinglePerspective = segments.filter(function (s) {
    return s.perspectiveIndex !== -1;
  }).length === 2;
  var isElevated = function isElevated(segment) {
    return segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;
  };
  var arrowSize = (outerR - innerR) * 0.15;
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
    var cellSpan = segment.endAngle - segment.startAngle;
    var cw = direction !== 'left';
    var isDoubleHeaded = segment.perspectiveIndex === selectedPerspectiveIdx || isSinglePerspective;
    var tipAngle = cw ? segment.endAngle - cellSpan * 0.08 : segment.startAngle + cellSpan * 0.08;
    var singleSpan = cellSpan * 0.07;
    var arrowSpan = isDoubleHeaded ? singleSpan * 0.4 : singleSpan;
    var tailAngle = cw ? tipAngle - arrowSpan : tipAngle + arrowSpan;
    var _polarToCartesian3 = polarToCartesian(radius, tailAngle),
      _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
      sx = _polarToCartesian4[0],
      sy = _polarToCartesian4[1];
    var _polarToCartesian5 = polarToCartesian(radius, tipAngle),
      _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
      ex = _polarToCartesian6[0],
      ey = _polarToCartesian6[1];
    var tangentX = Math.cos(tipAngle) * (cw ? 1 : -1);
    var tangentY = Math.sin(tipAngle) * (cw ? 1 : -1);
    var radialX = Math.sin(tipAngle);
    var radialY = -Math.cos(tipAngle);
    var hl = arrowSize * 0.35;
    var tx = ex - tangentX * hl + radialX * hl * 0.5,
      ty = ey - tangentY * hl + radialY * hl * 0.5;
    var tx2 = ex - tangentX * hl - radialX * hl * 0.5,
      ty2 = ey - tangentY * hl - radialY * hl * 0.5;
    var gap = singleSpan * 0.2;
    var tip2Angle = cw ? tailAngle - gap : tailAngle + gap;
    var tail2Angle = cw ? tip2Angle - arrowSpan : tip2Angle + arrowSpan;
    var _polarToCartesian7 = polarToCartesian(radius, tail2Angle),
      _polarToCartesian8 = _slicedToArray(_polarToCartesian7, 2),
      sx2 = _polarToCartesian8[0],
      sy2 = _polarToCartesian8[1];
    var _polarToCartesian9 = polarToCartesian(radius, tip2Angle),
      _polarToCartesian0 = _slicedToArray(_polarToCartesian9, 2),
      ex2 = _polarToCartesian0[0],
      ey2 = _polarToCartesian0[1];
    var tangent2X = Math.cos(tip2Angle) * (cw ? 1 : -1);
    var tangent2Y = Math.sin(tip2Angle) * (cw ? 1 : -1);
    var radial2X = Math.sin(tip2Angle);
    var radial2Y = -Math.cos(tip2Angle);
    var tx3 = ex2 - tangent2X * hl + radial2X * hl * 0.5,
      ty3 = ey2 - tangent2Y * hl + radial2Y * hl * 0.5;
    var tx4 = ex2 - tangent2X * hl - radial2X * hl * 0.5,
      ty4 = ey2 - tangent2Y * hl - radial2Y * hl * 0.5;
    return jsxs("g", {
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
      children: [jsx("path", {
        d: path,
        fill: transparent ? 'none' : style.background,
        stroke: transparent ? 'none' : isHovered ? style.hoverBorderColor : style.borderColor,
        strokeWidth: style.borderWidth
      }), jsx("text", {
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
      }), showArrows && style.arrowColor !== 'transparent' && function () {
        var directArrowHover = hoveredArrowId === segment.segmentId;
        var arrowHovered = directArrowHover || isHovered;
        var strokeColor = directArrowHover ? '#333' : isHovered ? style.arrowHoverColor : style.arrowColor;
        var hitTail = isDoubleHeaded ? tail2Angle : tailAngle;
        var hitStartAngle = cw ? hitTail - cellSpan * 0.08 : segment.startAngle;
        var hitEndAngle = cw ? segment.endAngle : hitTail + cellSpan * 0.08;
        var hitPath = describeArc(innerR, outerR, hitStartAngle, hitEndAngle);
        return jsxs("g", {
          style: {
            pointerEvents: 'none'
          },
          children: [jsx("path", {
            d: "M".concat(sx, ",").concat(sy, " A").concat(radius, ",").concat(radius, " 0 0 ").concat(cw ? 1 : 0, " ").concat(ex, ",").concat(ey),
            fill: "none",
            stroke: strokeColor,
            strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
            strokeLinecap: "round"
          }), jsx("path", {
            d: "M".concat(tx, ",").concat(ty, " L").concat(ex, ",").concat(ey, " L").concat(tx2, ",").concat(ty2),
            fill: "none",
            stroke: strokeColor,
            strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), isDoubleHeaded && jsxs(Fragment, {
            children: [jsx("path", {
              d: "M".concat(sx2, ",").concat(sy2, " A").concat(radius, ",").concat(radius, " 0 0 ").concat(cw ? 1 : 0, " ").concat(ex2, ",").concat(ey2),
              fill: "none",
              stroke: strokeColor,
              strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
              strokeLinecap: "round"
            }), jsx("path", {
              d: "M".concat(tx3, ",").concat(ty3, " L").concat(ex2, ",").concat(ey2, " L").concat(tx4, ",").concat(ty4),
              fill: "none",
              stroke: strokeColor,
              strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })]
          }), jsx("path", {
            d: hitPath,
            fill: directArrowHover ? '#000' : 'transparent',
            fillOpacity: directArrowHover ? 0.04 : 0,
            stroke: "none",
            onClick: directArrowHover ? function (e) {
              e.stopPropagation();
              onArrowClicked === null || onArrowClicked === void 0 || onArrowClicked(arrowEvents[i]);
            } : undefined,
            onPointerEnter: function onPointerEnter() {
              onArrowOver === null || onArrowOver === void 0 || onArrowOver(arrowEvents[i]);
            },
            onPointerLeave: function onPointerLeave() {
              onArrowOut === null || onArrowOut === void 0 || onArrowOut(arrowEvents[i]);
            },
            style: {
              cursor: directArrowHover ? 'pointer' : 'default',
              pointerEvents: 'fill'
            }
          })]
        });
      }()]
    }, segment.segmentId);
  };
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var cellOpacity = function cellOpacity(segment) {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null && segment.perspectiveIndex !== selectedPerspectiveIdx && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };
  return jsxs("g", {
    children: [segments.map(function (segment, i) {
      return isSpacer(segment) || isElevated(segment) ? null : jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, false)
      }, "wrap-".concat(segment.segmentId));
    }), segments.map(function (segment, i) {
      return isSpacer(segment) || !isElevated(segment) ? null : jsx("g", {
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
  var _styles$dimUnfocused, _resolvedStyles$;
  var segments = _ref.segments,
    innerR = _ref.innerR,
    outerR = _ref.outerR,
    rotationRad = _ref.rotationRad,
    styles = _ref.styles,
    transparent = _ref.transparent,
    direction = _ref.direction,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    hoveredPerspectiveIdx = _ref.hoveredPerspectiveIdx,
    selectedPerspectiveIdx = _ref.selectedPerspectiveIdx,
    focusAnimatingIdx = _ref.focusAnimatingIdx,
    hoveredArrowId = _ref.hoveredArrowId,
    _onClick = _ref.onClick,
    _onPointerEnter = _ref.onPointerEnter,
    _onPointerLeave = _ref.onPointerLeave,
    onArrowOver = _ref.onArrowOver,
    onArrowOut = _ref.onArrowOut,
    onArrowClicked = _ref.onArrowClicked;
  var cellRadialHeight = outerR - innerR;
  var radius = (innerR + outerR) / 2;
  var thesisSegments = useMemo(function () {
    return segments.filter(function (s) {
      return s.perspectiveIndex !== -1 && (s.swapped ? s.colType === 'antithesis' : s.colType === 'thesis');
    });
  }, [segments]);
  var resolvedStyles = useMemo(function () {
    return thesisSegments.map(function (seg) {
      var ctx = {
        rowGroup: 'thead',
        ring: 'cycle',
        colType: seg.colType,
        perspectiveIndex: seg.perspectiveIndex
      };
      return resolveStyle(styles, ctx, cellRadialHeight, seg.cellStyle);
    });
  }, [thesisSegments, styles, cellRadialHeight]);
  var cellEvents = useMemo(function () {
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
  var arrowEvents = useMemo(function () {
    return thesisSegments.map(function (segment) {
      return {
        segmentId: segment.segmentId,
        perspectiveIndex: segment.perspectiveIndex
      };
    });
  }, [thesisSegments]);
  var interactive = _onClick || _onPointerEnter;
  var isElevated = function isElevated(segment) {
    return segment.perspectiveIndex === hoveredPerspectiveIdx || segment.perspectiveIndex === selectedPerspectiveIdx;
  };
  var arrowSize = (outerR - innerR) * 0.15;
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
    var cellSpan = segment.endAngle - segment.startAngle;
    var cw = direction !== 'left';
    var isDoubleHeaded = segment.perspectiveIndex === selectedPerspectiveIdx || thesisSegments.length === 1;
    var tipAngle = cw ? segment.endAngle - cellSpan * 0.08 : segment.startAngle + cellSpan * 0.08;
    var singleSpan = cellSpan * 0.07;
    var arrowSpan = isDoubleHeaded ? singleSpan * 0.4 : singleSpan;
    var tailAngle = cw ? tipAngle - arrowSpan : tipAngle + arrowSpan;
    var _polarToCartesian3 = polarToCartesian(radius, tailAngle),
      _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
      sx = _polarToCartesian4[0],
      sy = _polarToCartesian4[1];
    var _polarToCartesian5 = polarToCartesian(radius, tipAngle),
      _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
      ex = _polarToCartesian6[0],
      ey = _polarToCartesian6[1];
    var tangentX = Math.cos(tipAngle) * (cw ? 1 : -1);
    var tangentY = Math.sin(tipAngle) * (cw ? 1 : -1);
    var radialX = Math.sin(tipAngle);
    var radialY = -Math.cos(tipAngle);
    var hl = arrowSize * 0.35;
    var tx = ex - tangentX * hl + radialX * hl * 0.5,
      ty = ey - tangentY * hl + radialY * hl * 0.5;
    var tx2 = ex - tangentX * hl - radialX * hl * 0.5,
      ty2 = ey - tangentY * hl - radialY * hl * 0.5;
    var gap = singleSpan * 0.2;
    var tip2Angle = cw ? tailAngle - gap : tailAngle + gap;
    var tail2Angle = cw ? tip2Angle - arrowSpan : tip2Angle + arrowSpan;
    var _polarToCartesian7 = polarToCartesian(radius, tail2Angle),
      _polarToCartesian8 = _slicedToArray(_polarToCartesian7, 2),
      sx2 = _polarToCartesian8[0],
      sy2 = _polarToCartesian8[1];
    var _polarToCartesian9 = polarToCartesian(radius, tip2Angle),
      _polarToCartesian0 = _slicedToArray(_polarToCartesian9, 2),
      ex2 = _polarToCartesian0[0],
      ey2 = _polarToCartesian0[1];
    var tangent2X = Math.cos(tip2Angle) * (cw ? 1 : -1);
    var tangent2Y = Math.sin(tip2Angle) * (cw ? 1 : -1);
    var radial2X = Math.sin(tip2Angle);
    var radial2Y = -Math.cos(tip2Angle);
    var tx3 = ex2 - tangent2X * hl + radial2X * hl * 0.5,
      ty3 = ey2 - tangent2Y * hl + radial2Y * hl * 0.5;
    var tx4 = ex2 - tangent2X * hl - radial2X * hl * 0.5,
      ty4 = ey2 - tangent2Y * hl - radial2Y * hl * 0.5;
    return jsxs("g", {
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
      children: [jsx("path", {
        d: path,
        fill: transparent ? 'none' : style.background,
        stroke: transparent ? 'none' : isHovered ? style.hoverBorderColor : style.borderColor,
        strokeWidth: style.borderWidth
      }), jsx("text", {
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
      }), showArrows && style.arrowColor !== 'transparent' && function () {
        var directArrowHover = hoveredArrowId === segment.segmentId;
        var arrowHovered = directArrowHover || isHovered;
        var strokeColor = directArrowHover ? '#333' : isHovered ? style.arrowHoverColor : style.arrowColor;
        var hitTail = isDoubleHeaded ? tail2Angle : tailAngle;
        var hitStartAngle = cw ? hitTail - cellSpan * 0.08 : segment.startAngle;
        var hitEndAngle = cw ? segment.endAngle : hitTail + cellSpan * 0.08;
        var hitPath = describeArc(innerR, outerR, hitStartAngle, hitEndAngle);
        return jsxs("g", {
          style: {
            pointerEvents: 'none'
          },
          children: [jsx("path", {
            d: "M".concat(sx, ",").concat(sy, " A").concat(radius, ",").concat(radius, " 0 0 ").concat(cw ? 1 : 0, " ").concat(ex, ",").concat(ey),
            fill: "none",
            stroke: strokeColor,
            strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
            strokeLinecap: "round"
          }), jsx("path", {
            d: "M".concat(tx, ",").concat(ty, " L").concat(ex, ",").concat(ey, " L").concat(tx2, ",").concat(ty2),
            fill: "none",
            stroke: strokeColor,
            strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), isDoubleHeaded && jsxs(Fragment, {
            children: [jsx("path", {
              d: "M".concat(sx2, ",").concat(sy2, " A").concat(radius, ",").concat(radius, " 0 0 ").concat(cw ? 1 : 0, " ").concat(ex2, ",").concat(ey2),
              fill: "none",
              stroke: strokeColor,
              strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
              strokeLinecap: "round"
            }), jsx("path", {
              d: "M".concat(tx3, ",").concat(ty3, " L").concat(ex2, ",").concat(ey2, " L").concat(tx4, ",").concat(ty4),
              fill: "none",
              stroke: strokeColor,
              strokeWidth: arrowHovered ? style.arrowWidth * 1.5 : style.arrowWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })]
          }), jsx("path", {
            d: hitPath,
            fill: directArrowHover ? '#000' : 'transparent',
            fillOpacity: directArrowHover ? 0.04 : 0,
            stroke: "none",
            onClick: directArrowHover ? function (e) {
              e.stopPropagation();
              onArrowClicked === null || onArrowClicked === void 0 || onArrowClicked(arrowEvents[i]);
            } : undefined,
            onPointerEnter: function onPointerEnter() {
              onArrowOver === null || onArrowOver === void 0 || onArrowOver(arrowEvents[i]);
            },
            onPointerLeave: function onPointerLeave() {
              onArrowOut === null || onArrowOut === void 0 || onArrowOut(arrowEvents[i]);
            },
            style: {
              cursor: directArrowHover ? 'pointer' : 'default',
              pointerEvents: 'fill'
            }
          })]
        });
      }()]
    }, segment.segmentId);
  };
  var dimUnfocused = (_styles$dimUnfocused = styles.dimUnfocused) !== null && _styles$dimUnfocused !== void 0 ? _styles$dimUnfocused : 0.5;
  var cellOpacity = function cellOpacity(segment) {
    if (focusAnimatingIdx != null && segment.perspectiveIndex !== focusAnimatingIdx) return 0;
    if (selectedPerspectiveIdx != null && segment.perspectiveIndex !== selectedPerspectiveIdx && segment.perspectiveIndex !== hoveredPerspectiveIdx) return 1 - dimUnfocused;
    return 1;
  };
  var hasVisibleArrows = showArrows && ((_resolvedStyles$ = resolvedStyles[0]) === null || _resolvedStyles$ === void 0 ? void 0 : _resolvedStyles$.arrowColor) !== 'transparent';
  var connectingArcs = useMemo(function () {
    if (!hasVisibleArrows || thesisSegments.length < 2) return null;
    var sorted = _toConsumableArray(thesisSegments).sort(function (a, b) {
      return a.startAngle - b.startAngle;
    });
    var cellSpan = sorted[0].endAngle - sorted[0].startAngle;
    var pad = cellSpan * 0.08;
    var cw = direction !== 'left';
    var arcs = [];
    for (var i = 0; i < sorted.length; i++) {
      var curr = sorted[i];
      var next = sorted[(i + 1) % sorted.length];
      var gapStart = curr.endAngle;
      var gapEnd = i < sorted.length - 1 ? next.startAngle : next.startAngle + 2 * Math.PI;
      if (gapEnd - gapStart < 0.1) continue;
      var arcStart = gapStart + pad;
      var arcEnd = gapEnd - pad;
      var _polarToCartesian1 = polarToCartesian(radius, cw ? arcStart : arcEnd),
        _polarToCartesian10 = _slicedToArray(_polarToCartesian1, 2),
        s1x = _polarToCartesian10[0],
        s1y = _polarToCartesian10[1];
      var _polarToCartesian11 = polarToCartesian(radius, cw ? arcEnd : arcStart),
        _polarToCartesian12 = _slicedToArray(_polarToCartesian11, 2),
        s2x = _polarToCartesian12[0],
        s2y = _polarToCartesian12[1];
      var largeArc = arcEnd - arcStart > Math.PI ? 1 : 0;
      var tipAngle = cw ? arcEnd : arcStart;
      var tangentX = Math.cos(tipAngle) * (cw ? 1 : -1);
      var tangentY = Math.sin(tipAngle) * (cw ? 1 : -1);
      var radialX = Math.sin(tipAngle);
      var radialY = -Math.cos(tipAngle);
      var hl = arrowSize * 0.5;
      var tx = s2x - tangentX * hl + radialX * hl * 0.4,
        ty = s2y - tangentY * hl + radialY * hl * 0.4;
      var tx2 = s2x - tangentX * hl - radialX * hl * 0.4,
        ty2 = s2y - tangentY * hl - radialY * hl * 0.4;
      arcs.push({
        d: "M".concat(s1x, ",").concat(s1y, " A").concat(radius, ",").concat(radius, " 0 ").concat(largeArc, " ").concat(cw ? 1 : 0, " ").concat(s2x, ",").concat(s2y),
        head: "M".concat(tx, ",").concat(ty, " L").concat(s2x, ",").concat(s2y, " L").concat(tx2, ",").concat(ty2)
      });
    }
    return arcs.length > 0 ? arcs : null;
  }, [hasVisibleArrows, thesisSegments, radius, direction, arrowSize]);
  return jsxs("g", {
    children: [connectingArcs === null || connectingArcs === void 0 ? void 0 : connectingArcs.map(function (arc, i) {
      var _resolvedStyles$0$arr, _resolvedStyles$2, _resolvedStyles$0$arr2, _resolvedStyles$3, _resolvedStyles$0$arr3, _resolvedStyles$4, _resolvedStyles$0$arr4, _resolvedStyles$5;
      return jsxs("g", {
        opacity: 0.5,
        children: [jsx("path", {
          d: arc.d,
          fill: "none",
          stroke: (_resolvedStyles$0$arr = (_resolvedStyles$2 = resolvedStyles[0]) === null || _resolvedStyles$2 === void 0 ? void 0 : _resolvedStyles$2.arrowColor) !== null && _resolvedStyles$0$arr !== void 0 ? _resolvedStyles$0$arr : '#666',
          strokeWidth: ((_resolvedStyles$0$arr2 = (_resolvedStyles$3 = resolvedStyles[0]) === null || _resolvedStyles$3 === void 0 ? void 0 : _resolvedStyles$3.arrowWidth) !== null && _resolvedStyles$0$arr2 !== void 0 ? _resolvedStyles$0$arr2 : arrowSize * 0.2) * 0.75,
          strokeDasharray: "".concat(arrowSize * 0.3, " ").concat(arrowSize * 0.3),
          strokeLinecap: "round"
        }), jsx("path", {
          d: arc.head,
          fill: "none",
          stroke: (_resolvedStyles$0$arr3 = (_resolvedStyles$4 = resolvedStyles[0]) === null || _resolvedStyles$4 === void 0 ? void 0 : _resolvedStyles$4.arrowColor) !== null && _resolvedStyles$0$arr3 !== void 0 ? _resolvedStyles$0$arr3 : '#666',
          strokeWidth: (_resolvedStyles$0$arr4 = (_resolvedStyles$5 = resolvedStyles[0]) === null || _resolvedStyles$5 === void 0 ? void 0 : _resolvedStyles$5.arrowWidth) !== null && _resolvedStyles$0$arr4 !== void 0 ? _resolvedStyles$0$arr4 : arrowSize * 0.2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }, "arc-".concat(i));
    }), thesisSegments.map(function (segment, i) {
      return isElevated(segment) ? null : jsx("g", {
        opacity: cellOpacity(segment),
        style: {
          transition: 'opacity 200ms ease-in'
        },
        children: renderSegment(segment, i, false)
      }, "wrap-".concat(segment.segmentId));
    }), thesisSegments.map(function (segment, i) {
      return !isElevated(segment) ? null : jsx("g", {
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
    header = _ref.header,
    stitched = _ref.stitched,
    styles = _ref.styles,
    radii = _ref.radii;
  var selected = segments.filter(function (s) {
    return s.perspectiveIndex === selectedPerspectiveIdx;
  });
  if (selected.length === 0) return null;
  var ctx = {
    rowGroup: 'tbody',
    ring: 'neutral',
    colType: 'thesis',
    perspectiveIndex: selectedPerspectiveIdx
  };
  var style = resolveStyle(styles, ctx, radii.outerEnd - radii.innerStart);
  return jsx("g", {
    style: {
      pointerEvents: 'none'
    },
    children: selected.map(function (seg) {
      var isThesis = seg.colType === 'thesis';
      var includeHeader = stitched || header === 'wheel' || header === 'cycle' && isThesis;
      var outerR = includeHeader ? radii.cycleEnd : radii.outerEnd;
      var path = describeArc(radii.innerStart, outerR, seg.startAngle, seg.endAngle);
      return jsx("path", {
        d: path,
        fill: "none",
        stroke: style.selectedBorderColor,
        strokeWidth: style.selectedBorderWidth
      }, seg.segmentId);
    })
  });
};

function Callout(_props) {
  return null;
}
Callout._isWheelCallout = true;
var FO_SIZE = 400;
function CalloutInternal(_ref) {
  var midAngle = _ref.midAngle,
    anchorR = _ref.anchorR,
    anchorAngle = _ref.anchorAngle,
    endR = _ref.endR,
    rotationDeg = _ref.rotationDeg,
    border = _ref.border,
    tail = _ref.tail,
    header = _ref.header,
    children = _ref.children;
  var borderWidth = border.width,
    borderColor = border.color;
  var _polarToCartesian = polarToCartesian(anchorR, anchorAngle),
    _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
    tipX = _polarToCartesian2[0],
    tipY = _polarToCartesian2[1];
  var _polarToCartesian3 = polarToCartesian(endR, midAngle),
    _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
    endX = _polarToCartesian4[0],
    endY = _polarToCartesian4[1];
  // Extend tail past endpoint so it always reaches into the box regardless of rotation
  var TAIL_OVERSHOOT = 20;
  var _polarToCartesian5 = polarToCartesian(endR + TAIL_OVERSHOOT, midAngle),
    _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
    tailBaseX = _polarToCartesian6[0],
    tailBaseY = _polarToCartesian6[1];
  // Outward direction in screen space after counter-rotation
  // Push box so its inner edge/corner sits at the endpoint, never intruding toward wheel center
  var rotRad = rotationDeg * Math.PI / 180;
  var effectiveAngle = midAngle + rotRad;
  var normX = Math.sin(effectiveAngle);
  var normY = -Math.cos(effectiveAngle);
  var maxAbs = Math.max(Math.abs(normX), Math.abs(normY), 0.001);
  // 50% = half the box's own size along each axis, placing inner edge exactly at the endpoint
  var tx = 50 * normX / maxAbs;
  var ty = 50 * normY / maxAbs;
  var tailElement;
  if (tail === 'triangle') {
    var tailWidth = 8;
    var tangentX = Math.cos(midAngle);
    var tangentY = Math.sin(midAngle);
    var leftX = tailBaseX + tailWidth * tangentX;
    var leftY = tailBaseY + tailWidth * tangentY;
    var rightX = tailBaseX - tailWidth * tangentX;
    var rightY = tailBaseY - tailWidth * tangentY;
    tailElement = jsx("path", {
      d: "M ".concat(tipX, " ").concat(tipY, " L ").concat(leftX, " ").concat(leftY, " L ").concat(rightX, " ").concat(rightY, " Z"),
      fill: borderColor,
      opacity: 0.8
    });
  } else {
    tailElement = jsx("line", {
      x1: tipX,
      y1: tipY,
      x2: tailBaseX,
      y2: tailBaseY,
      stroke: borderColor,
      strokeWidth: borderWidth * 2
    });
  }
  return jsxs("g", {
    children: [tailElement, jsx("g", {
      transform: "rotate(".concat(-rotationDeg, ", ").concat(endX, ", ").concat(endY, ")"),
      children: jsx("foreignObject", {
        x: endX - FO_SIZE / 2,
        y: endY - FO_SIZE / 2,
        width: FO_SIZE,
        height: FO_SIZE,
        overflow: "visible",
        style: {
          pointerEvents: 'none'
        },
        children: jsx("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          },
          children: jsxs("div", {
            style: {
              pointerEvents: 'auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 180,
              width: 'fit-content',
              transform: "translate(".concat(tx, "%, ").concat(ty, "%)")
            },
            children: [header && jsx("div", {
              style: {
                fontSize: 11,
                lineHeight: 1.3,
                marginBottom: 2
              },
              children: header
            }), jsx("div", {
              style: {
                background: borderColor,
                border: "".concat(borderWidth, "px solid ").concat(borderColor),
                borderRadius: 4,
                padding: '4px 8px',
                fontSize: 11,
                lineHeight: 1.3,
                width: 'fit-content'
              },
              children: children
            })]
          })
        })
      })
    })]
  });
}

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
  var _useState = useState(function () {
      if (focusedSegment != null && segmentIds.length > 0) {
        var idx = segmentIds.indexOf(focusedSegment);
        if (idx !== -1) {
          var N = segmentIds.length;
          var segmentAngle = 360 / N;
          var midAngle = idx * segmentAngle + segmentAngle / 2;
          var defRot = defaultRotation(N);
          var visualAngle = ((midAngle + defRot) % 360 + 360) % 360;
          var distToTop = Math.min(visualAngle, 360 - visualAngle);
          var distToBottom = Math.abs(visualAngle - 180);
          var targetPosition = distToTop <= distToBottom ? 0 : 180;
          return targetPosition - midAngle;
        }
      }
      return defaultRotation(segmentIds.length);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    rotationDeg = _useState2[0],
    setRotationDeg = _useState2[1];
  var rotationDegRef = useRef(rotationDeg);
  rotationDegRef.current = rotationDeg;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isDragging = _useState4[0],
    setIsDragging = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    focusAnimatingIdx = _useState6[0],
    setFocusAnimatingIdx = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isRotationPaused = _useState8[0],
    setIsRotationPaused = _useState8[1];
  var dragStart = useRef(null);
  var didDrag = useRef(false);
  var svgRef = useRef(null);
  var animTimers = useRef([]);
  var clearTimers = function clearTimers() {
    animTimers.current.forEach(function (t) {
      return clearTimeout(t);
    });
    animTimers.current = [];
  };
  useEffect(function () {
    if (focusedSegment == null || segmentIds.length === 0) return;
    var idx = segmentIds.indexOf(focusedSegment);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var currentVisualAngle = ((midAngle + rotationDegRef.current) % 360 + 360) % 360;
    var distToTop = Math.min(currentVisualAngle, 360 - currentVisualAngle);
    var distToBottom = Math.abs(currentVisualAngle - 180);
    var targetPosition = distToTop <= distToBottom ? 0 : 180;
    var targetRaw = targetPosition - midAngle;
    var perspectiveIdx = idx < N / 2 ? idx : idx - N / 2;
    clearTimers();
    // If segment is already at either pole, skip phased animation
    var topDiff = Math.abs((currentVisualAngle + 540) % 360 - 180);
    var bottomDiff = Math.abs((currentVisualAngle - 180 + 540) % 360 - 180);
    if (topDiff < 1 || bottomDiff < 1) {
      setFocusAnimatingIdx(null);
      setIsRotationPaused(false);
      return;
    }
    // Phase 1: fade out others (pause rotation transition)
    setIsRotationPaused(true);
    setFocusAnimatingIdx(perspectiveIdx);
    // Phase 2: after fade-out, start rotation
    var t1 = setTimeout(function () {
      setIsRotationPaused(false);
      setRotationDeg(function (current) {
        var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
        if (delta === 180 || delta === -180) delta = -180;
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
    var normalized = (-deg % 360 + 360) % 360;
    var index = Math.round((normalized - segmentAngle / 2) / segmentAngle + N) % N;
    var id = segmentIds[index];
    if (!id.startsWith('__')) onFocusChanged(id);
  }, [onFocusChanged, segmentIds]);
  var onPointerDown = useCallback(function (e) {
    var angle = getAngleFromEvent(e);
    dragStart.current = {
      angle: angle,
      rotation: rotationDeg,
      x: e.clientX,
      y: e.clientY
    };
    didDrag.current = false;
  }, [getAngleFromEvent, rotationDeg]);
  var onPointerMove = useCallback(function (e) {
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
  var onPointerUp = useCallback(function (e) {
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
  var isSegmentAtFocusTarget = useCallback(function (segmentId) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return false;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var isAntithesis = idx >= N / 2;
    var targetPosition = isAntithesis ? 180 : 0;
    var currentVisualAngle = (midAngle + rotationDegRef.current + 360) % 360;
    var diff = Math.abs((currentVisualAngle - targetPosition + 540) % 360 - 180);
    return diff < 1;
  }, [segmentIds]);
  var isSegmentAtPole = useCallback(function (segmentId) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return null;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var currentVisualAngle = ((midAngle + rotationDegRef.current) % 360 + 360) % 360;
    var halfSeg = segmentAngle / 2;
    var topDiff = Math.abs((currentVisualAngle + 540) % 360 - 180);
    if (topDiff < halfSeg) return 'top';
    var bottomDiff = Math.abs((currentVisualAngle - 180 + 540) % 360 - 180);
    if (bottomDiff < halfSeg) return 'bottom';
    return null;
  }, [segmentIds]);
  var refocusWithoutFade = useCallback(function (segmentId) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var currentVisualAngle = ((midAngle + rotationDegRef.current) % 360 + 360) % 360;
    var distToTop = Math.min(currentVisualAngle, 360 - currentVisualAngle);
    var distToBottom = Math.abs(currentVisualAngle - 180);
    var targetPosition = distToTop <= distToBottom ? 0 : 180;
    var targetRaw = targetPosition - midAngle;
    clearTimers();
    setRotationDeg(function (current) {
      var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
      if (delta === 180 || delta === -180) delta = -180;
      return current + delta;
    });
  }, [segmentIds]);
  var focusSegmentToPosition = useCallback(function (segmentId, targetPosition, clockwise) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var targetRaw = targetPosition - midAngle;
    clearTimers();
    setRotationDeg(function (current) {
      var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
      if (delta === 180 || delta === -180) delta = clockwise ? 180 : -180;
      return current + delta;
    });
  }, [segmentIds]);
  var focusSegmentToNextPole = useCallback(function (segmentId, clockwise) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var visualAngle = ((midAngle + rotationDegRef.current) % 360 + 360) % 360;
    var targetPosition = clockwise ? visualAngle > 0 && visualAngle <= 180 ? 180 : 0 : visualAngle >= 180 && visualAngle < 360 ? 180 : 0;
    var targetRaw = targetPosition - midAngle;
    clearTimers();
    setRotationDeg(function (current) {
      var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
      if (delta === 180 || delta === -180) delta = clockwise ? 180 : -180;
      return current + delta;
    });
  }, [segmentIds]);
  var focusSegmentToNearestPole = useCallback(function (segmentId) {
    var idx = segmentIds.indexOf(segmentId);
    if (idx === -1) return;
    var N = segmentIds.length;
    var segmentAngle = 360 / N;
    var midAngle = idx * segmentAngle + segmentAngle / 2;
    var visualAngle = ((midAngle + rotationDegRef.current) % 360 + 360) % 360;
    var distToTop = Math.min(visualAngle, 360 - visualAngle);
    var distToBottom = Math.abs(visualAngle - 180);
    var targetPosition = distToTop <= distToBottom ? 0 : 180;
    var targetRaw = targetPosition - midAngle;
    clearTimers();
    setRotationDeg(function (current) {
      var delta = ((targetRaw - current) % 360 + 540) % 360 - 180;
      if (delta === 180 || delta === -180) delta = -180;
      return current + delta;
    });
  }, [segmentIds]);
  var rotateBySegments = useCallback(function (count) {
    if (segmentIds.length === 0) return;
    var segmentAngle = 360 / segmentIds.length;
    clearTimers();
    setRotationDeg(function (current) {
      return current - segmentAngle * count;
    });
  }, [segmentIds]);
  var rotationRad = rotationDeg * Math.PI / 180;
  return {
    rotationDeg: rotationDeg,
    rotationRad: rotationRad,
    isDragging: isDragging,
    isRotationPaused: isRotationPaused,
    focusAnimatingIdx: focusAnimatingIdx,
    isSegmentAtFocusTarget: isSegmentAtFocusTarget,
    isSegmentAtPole: isSegmentAtPole,
    refocusWithoutFade: refocusWithoutFade,
    focusSegmentToPosition: focusSegmentToPosition,
    focusSegmentToNextPole: focusSegmentToNextPole,
    focusSegmentToNearestPole: focusSegmentToNearestPole,
    rotateBySegments: rotateBySegments,
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
      isThesis: true,
      swapped: perspective.swapped,
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
      isThesis: false,
      swapped: perspective.swapped,
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
      isThesis: true,
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
        colType: entry.isThesis ? 'thesis' : 'antithesis',
        swapped: entry.swapped,
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

function mergeRowScope(defaults, user) {
  if (!defaults && !user) return undefined;
  if (!defaults) return user;
  if (!user) return defaults;
  var merged = _objectSpread2(_objectSpread2({}, defaults), user);
  if (defaults.thesis || user.thesis) merged.thesis = _objectSpread2(_objectSpread2({}, defaults.thesis), user.thesis);
  if (defaults.antithesis || user.antithesis) merged.antithesis = _objectSpread2(_objectSpread2({}, defaults.antithesis), user.antithesis);
  return merged;
}
function mergeStyles(user) {
  var _DEFAULT_STYLES$tbody, _user$tbody, _DEFAULT_STYLES$tbody2, _user$tbody2, _DEFAULT_STYLES$tbody3, _user$tbody3;
  if (!user) return DEFAULT_STYLES;
  return _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_STYLES), user), {}, {
    border: _objectSpread2(_objectSpread2({}, DEFAULT_STYLES.border), user.border),
    thead: mergeRowScope(DEFAULT_STYLES.thead, user.thead),
    tbody: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_STYLES.tbody), user.tbody), {}, {
      positive: mergeRowScope((_DEFAULT_STYLES$tbody = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody === void 0 ? void 0 : _DEFAULT_STYLES$tbody.positive, (_user$tbody = user.tbody) === null || _user$tbody === void 0 ? void 0 : _user$tbody.positive),
      negative: mergeRowScope((_DEFAULT_STYLES$tbody2 = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody2 === void 0 ? void 0 : _DEFAULT_STYLES$tbody2.negative, (_user$tbody2 = user.tbody) === null || _user$tbody2 === void 0 ? void 0 : _user$tbody2.negative),
      neutral: mergeRowScope((_DEFAULT_STYLES$tbody3 = DEFAULT_STYLES.tbody) === null || _DEFAULT_STYLES$tbody3 === void 0 ? void 0 : _DEFAULT_STYLES$tbody3.neutral, (_user$tbody3 = user.tbody) === null || _user$tbody3 === void 0 ? void 0 : _user$tbody3.neutral)
    }),
    tfoot: mergeRowScope(DEFAULT_STYLES.tfoot, user.tfoot)
  });
}
var Wheel = /*#__PURE__*/forwardRef(function Wheel(_ref, ref) {
  var perspectives = _ref.perspectives,
    _ref$header = _ref.header,
    header = _ref$header === void 0 ? 'wheel' : _ref$header,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'right' : _ref$direction,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    _ref$showInwardSpiral = _ref.showInwardSpiral,
    showInwardSpiral = _ref$showInwardSpiral === void 0 ? false : _ref$showInwardSpiral,
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
    onPerspectiveClicked = _ref.onPerspectiveClicked,
    onArrowOver = _ref.onArrowOver,
    onArrowOut = _ref.onArrowOut,
    onArrowClicked = _ref.onArrowClicked,
    children = _ref.children;
  var styles = useMemo(function () {
    return mergeStyles(userStyles);
  }, [userStyles]);
  var radii = useMemo(function () {
    return getRadii(perspectives.length);
  }, [perspectives.length]);
  var measure = useTextMeasure();
  var ringData = useMemo(function () {
    return transformPerspectives(perspectives);
  }, [perspectives]);
  var segmentIds = useMemo(function () {
    return ringData.neutral.map(function (s) {
      return s.segmentId;
    });
  }, [ringData]);
  var _useState = useState(selectedPerspectiveProp !== null && selectedPerspectiveProp !== void 0 ? selectedPerspectiveProp : null),
    _useState2 = _slicedToArray(_useState, 2),
    internalSelected = _useState2[0],
    setInternalSelected = _useState2[1];
  var _useState3 = useState(focusedSegmentProp !== null && focusedSegmentProp !== void 0 ? focusedSegmentProp : null),
    _useState4 = _slicedToArray(_useState3, 2),
    internalFocused = _useState4[0],
    setInternalFocused = _useState4[1];
  useEffect(function () {
    if (!interactive) return;
    if (selectedPerspectiveProp !== undefined) setInternalSelected(selectedPerspectiveProp);
  }, [interactive, selectedPerspectiveProp]);
  useEffect(function () {
    if (!interactive) return;
    if (focusedSegmentProp !== undefined) setInternalFocused(focusedSegmentProp);
  }, [interactive, focusedSegmentProp]);
  var selectedPerspective = interactive ? internalSelected : selectedPerspectiveProp !== null && selectedPerspectiveProp !== void 0 ? selectedPerspectiveProp : null;
  var focusedSegment = interactive ? internalFocused : focusedSegmentProp !== null && focusedSegmentProp !== void 0 ? focusedSegmentProp : null;
  var effectiveFocusedSegment = useMemo(function () {
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
    isSegmentAtPole = _useRotation.isSegmentAtPole,
    refocusWithoutFade = _useRotation.refocusWithoutFade,
    focusSegmentToPosition = _useRotation.focusSegmentToPosition,
    focusSegmentToNextPole = _useRotation.focusSegmentToNextPole,
    rotateBySegments = _useRotation.rotateBySegments,
    svgRef = _useRotation.svgRef,
    pointerHandlers = _useRotation.pointerHandlers;
  var setSvgRef = useCallback(function (el) {
    svgRef.current = el;
    if (typeof ref === 'function') ref(el);else if (ref) ref.current = el;
  }, [ref, svgRef]);
  var neutralOutside = !!neutralOutsideProp;
  var stitched = neutralOutsideProp === 'header';
  var outerRing = neutralOutside ? 'neutral' : 'negative';
  var middleRing = neutralOutside ? 'negative' : 'neutral';
  var callouts = useMemo(function () {
    var result = [];
    Children.forEach(children, function (child) {
      var _child$type;
      if (/*#__PURE__*/isValidElement(child) && (_child$type = child.type) !== null && _child$type !== void 0 && _child$type._isWheelCallout) {
        result.push(child.props);
      }
    });
    return result;
  }, [children]);
  var derivePerspectiveEvent = useCallback(function (cell) {
    var p = perspectives[cell.perspectiveIndex];
    var thesis = typeof p.t === 'string' ? p.t : p.t.statement || p.t.alias || '';
    var antithesis = typeof p.a === 'string' ? p.a : p.a.statement || p.a.alias || '';
    return {
      perspectiveIndex: cell.perspectiveIndex,
      thesis: thesis,
      antithesis: antithesis
    };
  }, [perspectives]);
  var deriveSegmentEvent = useCallback(function (cell) {
    return {
      segmentId: cell.segmentId,
      pairWith: cell.pairWith,
      perspectiveIndex: cell.perspectiveIndex
    };
  }, []);
  var hoveredSegmentRef = useRef(null);
  var hoveredPerspectiveRef = useRef(null);
  var lastCellEventRef = useRef(null);
  var hoverSuppressedRef = useRef(false);
  var suppressPointerPos = useRef(null);
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    hoveredSegmentId = _useState6[0],
    setHoveredSegmentId = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    hoveredPerspectiveIdx = _useState8[0],
    setHoveredPerspectiveIdx = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    hoveredArrowId = _useState0[0],
    setHoveredArrowId = _useState0[1];
  useEffect(function () {
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
  var handleCellClick = useCallback(function (cell) {
    if (interactive) {
      if (internalSelected === cell.perspectiveIndex) {
        if (isSegmentAtPole(cell.segmentId) != null) {
          setInternalSelected(null);
          setInternalFocused(null);
        } else {
          hoverSuppressedRef.current = true;
          suppressPointerPos.current = null;
          hoveredSegmentRef.current = null;
          hoveredPerspectiveRef.current = null;
          lastCellEventRef.current = null;
          setHoveredSegmentId(null);
          setHoveredPerspectiveIdx(null);
          refocusWithoutFade(cell.segmentId);
        }
      } else {
        setInternalSelected(cell.perspectiveIndex);
        setInternalFocused(cell.segmentId);
      }
    }
    if (onCellClicked) onCellClicked(cell);
    if (onSegmentClicked) onSegmentClicked(deriveSegmentEvent(cell));
    if (onPerspectiveClicked) onPerspectiveClicked(derivePerspectiveEvent(cell));
  }, [interactive, internalSelected, isSegmentAtPole, refocusWithoutFade, onCellClicked, onSegmentClicked, onPerspectiveClicked, deriveSegmentEvent, derivePerspectiveEvent]);
  var handlePointerEnter = useCallback(function (cell) {
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
  var handlePointerLeave = useCallback(function (cell) {
    if (onCellOut) onCellOut(cell);
  }, [onCellOut]);
  var handleSvgPointerMove = useCallback(function (e) {
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
  var handleArrowOver = useCallback(function (event) {
    setHoveredArrowId(event.segmentId);
    if (onArrowOver) onArrowOver(event);
  }, [onArrowOver]);
  var handleArrowOut = useCallback(function (event) {
    setHoveredArrowId(null);
    if (onArrowOut) onArrowOut(event);
  }, [onArrowOut]);
  var handleArrowClicked = useCallback(function (event) {
    if (interactive) {
      var N = segmentIds.length;
      var idx = segmentIds.indexOf(event.segmentId);
      var isAntithesis = idx >= N / 2;
      var clockwise = direction !== 'left';
      var pole = isSegmentAtPole(event.segmentId);
      var suppressHover = function suppressHover() {
        hoverSuppressedRef.current = true;
        suppressPointerPos.current = null;
        hoveredSegmentRef.current = null;
        hoveredPerspectiveRef.current = null;
        lastCellEventRef.current = null;
        setHoveredSegmentId(null);
        setHoveredPerspectiveIdx(null);
      };
      if (internalSelected === event.perspectiveIndex && pole != null) {
        // Case 1: arrow on selected segment at pole → flip to opposite pole in arrow direction
        var oppositeIdx = isAntithesis ? idx - N / 2 : idx + N / 2;
        var oppositeSegment = segmentIds[oppositeIdx];
        var targetPosition = pole === 'top' ? 0 : 180;
        suppressHover();
        setInternalFocused(oppositeSegment);
        focusSegmentToPosition(oppositeSegment, targetPosition, clockwise);
      } else if (pole != null && internalSelected !== event.perspectiveIndex && perspectives.length === 1) {
        // 1-PP: only one perspective, so flip to opposite (same as Case 1)
        var _oppositeIdx = isAntithesis ? idx - N / 2 : idx + N / 2;
        var _oppositeSegment = segmentIds[_oppositeIdx];
        var _targetPosition = pole === 'top' ? 0 : 180;
        suppressHover();
        setInternalFocused(_oppositeSegment);
        focusSegmentToPosition(_oppositeSegment, _targetPosition, clockwise);
      } else if (pole != null && internalSelected !== event.perspectiveIndex) {
        // Case 2: arrow at pole, not the selected perspective → rotate one segment in arrow direction
        rotateBySegments(clockwise ? -1 : 1);
      } else {
        // Case 3: arrow not at pole → focus to next pole in arrow direction; select if something was already selected
        suppressHover();
        if (internalSelected != null) {
          setInternalSelected(event.perspectiveIndex);
          if (onPerspectiveClicked) {
            var p = perspectives[event.perspectiveIndex];
            var thesis = typeof p.t === 'string' ? p.t : p.t.statement || p.t.alias || '';
            var antithesis = typeof p.a === 'string' ? p.a : p.a.statement || p.a.alias || '';
            onPerspectiveClicked({
              perspectiveIndex: event.perspectiveIndex,
              thesis: thesis,
              antithesis: antithesis
            });
          }
        }
        setInternalFocused(event.segmentId);
        focusSegmentToNextPole(event.segmentId, clockwise);
      }
    }
    if (onArrowClicked) onArrowClicked(event);
  }, [interactive, segmentIds, direction, internalSelected, isSegmentAtPole, focusSegmentToPosition, focusSegmentToNextPole, rotateBySegments, onArrowClicked, perspectives, onPerspectiveClicked]);
  var handleWheelPointerLeave = useCallback(function () {
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
    setHoveredArrowId(null);
  }, [onSegmentOut, onPerspectiveOut, deriveSegmentEvent, derivePerspectiveEvent]);
  var ring2FontSize = useMemo(function () {
    var segs = ringData[middleRing];
    if (segs.length === 0) return undefined;
    var texts = segs.map(function (s) {
      return s.fullText;
    }).filter(Boolean);
    if (texts.length === 0) return undefined;
    var cellAngle = segs[0].endAngle - segs[0].startAngle;
    var cellHeight = radii.middleEnd - radii.middleStart;
    var ctx = {
      rowGroup: 'tbody',
      ring: middleRing,
      colType: segs[0].colType,
      perspectiveIndex: segs[0].perspectiveIndex
    };
    var s = resolveStyle(styles, ctx, cellHeight);
    var baseFontSize = s.fontSize;
    var padding = s.padding / cellHeight;
    return computeUniformFontSize(texts, {
      innerR: radii.middleStart,
      outerR: radii.middleEnd,
      cellAngle: cellAngle,
      baseFontSize: baseFontSize,
      padding: padding,
      measure: measure,
      textBias: 0,
      ring: 2
    });
  }, [ringData, middleRing, radii, styles, measure]);
  return jsx("div", {
    style: _objectSpread2({
      background: 'white',
      borderRadius: 8
    }, css),
    children: jsx("svg", _objectSpread2(_objectSpread2({
      ref: setSvgRef,
      viewBox: callouts.length > 0 ? "-420 -420 840 840" : "-250 -250 500 500",
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
      children: jsxs("g", {
        transform: "rotate(".concat(rotationDeg, ")"),
        style: {
          transition: isDragging || isRotationPaused ? 'none' : 'transform 300ms ease-out'
        },
        children: [jsx(Ring, {
          segments: ringData[outerRing],
          innerR: radii.outerStart,
          outerR: stitched ? radii.cycleEnd : radii.outerEnd,
          ringName: outerRing,
          ringNumber: 3,
          rowGroup: stitched ? 'thead' : 'tbody',
          styles: styles,
          rotationRad: rotationRad,
          measure: measure,
          perspectiveCount: perspectives.length,
          hoveredSegmentId: hoveredSegmentId,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          headerBehavior: stitched,
          maxFontSize: stitched ? undefined : ring2FontSize,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave
        }), jsx(Ring, {
          segments: ringData[middleRing],
          innerR: radii.middleStart,
          outerR: radii.middleEnd,
          ringName: middleRing,
          ringNumber: 2,
          rowGroup: "tbody",
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
        }), jsx(Ring, {
          segments: ringData.positive,
          innerR: radii.innerStart,
          outerR: radii.innerEnd,
          ringName: "positive",
          ringNumber: 1,
          rowGroup: "tbody",
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
        }), jsx(SynthesisRing, {
          styles: styles,
          radii: radii,
          segments: ringData.positive
        }), showInwardSpiral && !(interactive && selectedPerspective != null) && jsx(InwardSpiralArrows, {
          segments: {
            negative: ringData.negative,
            positive: ringData.positive
          },
          radii: radii,
          neutralOutside: neutralOutside,
          direction: direction,
          styles: styles,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx
        }), header === 'wheel' && jsx(WheelRing, {
          segments: ringData.invisible,
          innerR: radii.cycleStart,
          outerR: radii.cycleEnd,
          rotationRad: rotationRad,
          styles: styles,
          transparent: stitched,
          direction: direction,
          showArrows: showArrows,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          hoveredArrowId: hoveredArrowId,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onArrowOver: handleArrowOver,
          onArrowOut: handleArrowOut,
          onArrowClicked: handleArrowClicked
        }), header === 'cycle' && jsx(CycleRing, {
          segments: ringData.invisible,
          innerR: radii.cycleStart,
          outerR: radii.cycleEnd,
          rotationRad: rotationRad,
          styles: styles,
          transparent: stitched,
          direction: direction,
          showArrows: showArrows,
          hoveredPerspectiveIdx: hoveredPerspectiveIdx,
          selectedPerspectiveIdx: selectedPerspective,
          focusAnimatingIdx: focusAnimatingIdx,
          hoveredArrowId: hoveredArrowId,
          onClick: handleCellClick,
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onArrowOver: handleArrowOver,
          onArrowOut: handleArrowOut,
          onArrowClicked: handleArrowClicked
        }), selectedPerspective != null && jsx(SelectionOverlay, {
          segments: ringData.positive,
          selectedPerspectiveIdx: selectedPerspective,
          header: header,
          stitched: stitched,
          styles: styles,
          radii: radii
        }), callouts.map(function (callout, ci) {
          var _ref2, _callout$border$width, _callout$border, _styles$border, _ref3, _callout$border$color, _callout$border2, _styles$border2, _callout$tail;
          var segId = callout.segment || callout.rightEdge;
          var seg = ringData.negative.find(function (s) {
            return s.segmentId === segId;
          });
          if (!seg) return null;
          var isEdge = !!callout.rightEdge;
          var negInnerR = neutralOutside ? radii.middleStart : radii.outerStart;
          var negOuterR = neutralOutside ? radii.middleEnd : radii.outerEnd;
          var spiralsVisible = showInwardSpiral && !(interactive && selectedPerspective != null);
          var cw = direction !== 'left';
          var isSinglePP = perspectives.length === 1;
          var tipR;
          var tipAngle;
          var midAngle;
          var boxEndR = radii.cycleEnd + 25;
          if (isSinglePP && !isEdge) {
            // 1-PP segment mode: attach to outer ring edge at cell center (same as multi-PP)
            midAngle = (seg.startAngle + seg.endAngle) / 2;
            tipR = radii.cycleEnd;
            tipAngle = midAngle;
          } else if (isSinglePP && isEdge) {
            // 1-PP rightEdge: callout sits in the spacer zone, connects to spiral arrow midpoint
            var posOuter = radii.innerEnd;
            var startR = negInnerR + (negOuterR - negInnerR) * 0.3;
            var spiralEndR = posOuter - (posOuter - radii.innerStart) * 0.15;
            var cpR = (negInnerR + posOuter) / 2;
            var segSpan = seg.endAngle - seg.startAngle;
            var sAngle = cw ? seg.endAngle - segSpan * 0.1 : seg.startAngle + segSpan * 0.1;
            var negSegs = ringData.negative.filter(function (s) {
              return s.perspectiveIndex !== -1;
            });
            var posSegs = ringData.positive.filter(function (s) {
              return s.perspectiveIndex !== -1;
            });
            var segIdx = negSegs.indexOf(seg);
            var nextIdx = cw ? (segIdx + 1) % posSegs.length : (segIdx - 1 + posSegs.length) % posSegs.length;
            var posSeg = posSegs[nextIdx];
            var posSpan = posSeg.endAngle - posSeg.startAngle;
            var eAngle = cw ? posSeg.startAngle + posSpan * 0.1 : posSeg.endAngle - posSpan * 0.1;
            var angleDelta = cw ? (eAngle - sAngle + 2 * Math.PI) % (2 * Math.PI) : (sAngle - eAngle + 2 * Math.PI) % (2 * Math.PI);
            var cpAngle = cw ? sAngle + angleDelta * 0.5 : sAngle - angleDelta * 0.5;
            var _polarToCartesian = polarToCartesian(startR, sAngle),
              _polarToCartesian2 = _slicedToArray(_polarToCartesian, 2),
              sx = _polarToCartesian2[0],
              sy = _polarToCartesian2[1];
            var _polarToCartesian3 = polarToCartesian(cpR, cpAngle),
              _polarToCartesian4 = _slicedToArray(_polarToCartesian3, 2),
              cx = _polarToCartesian4[0],
              cy = _polarToCartesian4[1];
            var _polarToCartesian5 = polarToCartesian(spiralEndR, eAngle),
              _polarToCartesian6 = _slicedToArray(_polarToCartesian5, 2),
              ex = _polarToCartesian6[0],
              ey = _polarToCartesian6[1];
            // Box direction first — then find where bezier crosses this radial
            midAngle = cw ? seg.endAngle + Math.PI * 0.25 : seg.startAngle - Math.PI * 0.25;
            // Solve for t where bezier crosses the radial line at midAngle
            // Radial line direction: perpendicular dot product = 0
            var perpX = Math.cos(midAngle);
            var perpY = Math.sin(midAngle);
            var ax2 = sx - 2 * cx + ex;
            var bx2 = 2 * (cx - sx);
            var cx2 = sx;
            var ay2 = sy - 2 * cy + ey;
            var by2 = 2 * (cy - sy);
            var cy2 = sy;
            var a = perpX * ax2 + perpY * ay2;
            var b = perpX * bx2 + perpY * by2;
            var c = perpX * cx2 + perpY * cy2;
            var disc = b * b - 4 * a * c;
            var t = 0.5;
            if (disc >= 0) {
              var sqrtDisc = Math.sqrt(disc);
              var t1 = (-b + sqrtDisc) / (2 * a);
              var t2 = (-b - sqrtDisc) / (2 * a);
              if (t1 >= 0 && t1 <= 1) t = t1;else if (t2 >= 0 && t2 <= 1) t = t2;
            }
            var it = 1 - t;
            var bx = it * it * sx + 2 * it * t * cx + t * t * ex;
            var by = it * it * sy + 2 * it * t * cy + t * t * ey;
            tipR = Math.sqrt(bx * bx + by * by);
            tipAngle = Math.atan2(bx, -by);
            boxEndR = tipR + 50;
          } else if (!isEdge) {
            // segment mode: attach to the outer ring edge at cell center
            midAngle = (seg.startAngle + seg.endAngle) / 2;
            tipR = radii.cycleEnd;
            tipAngle = midAngle;
          } else if (spiralsVisible) {
            // rightEdge + spiral: attach to bezier-edge intersection
            midAngle = seg.endAngle;
            var _posOuter = radii.innerEnd;
            var _startR = negInnerR + (negOuterR - negInnerR) * 0.3;
            var _spiralEndR = _posOuter - (_posOuter - radii.innerStart) * 0.15;
            var _cpR = (negInnerR + _posOuter) / 2;
            var _segSpan = seg.endAngle - seg.startAngle;
            var _sAngle = cw ? seg.endAngle - _segSpan * 0.1 : seg.startAngle + _segSpan * 0.1;
            var _negSegs = ringData.negative.filter(function (s) {
              return s.perspectiveIndex !== -1;
            });
            var _posSegs = ringData.positive.filter(function (s) {
              return s.perspectiveIndex !== -1;
            });
            var _segIdx = _negSegs.indexOf(seg);
            var _nextIdx = cw ? (_segIdx + 1) % _posSegs.length : (_segIdx - 1 + _posSegs.length) % _posSegs.length;
            var _posSeg = _posSegs[_nextIdx];
            var _posSpan = _posSeg.endAngle - _posSeg.startAngle;
            var _eAngle = cw ? _posSeg.startAngle + _posSpan * 0.1 : _posSeg.endAngle - _posSpan * 0.1;
            var _angleDelta = cw ? (_eAngle - _sAngle + 2 * Math.PI) % (2 * Math.PI) : (_sAngle - _eAngle + 2 * Math.PI) % (2 * Math.PI);
            var _cpAngle = cw ? _sAngle + _angleDelta * 0.5 : _sAngle - _angleDelta * 0.5;
            var _polarToCartesian7 = polarToCartesian(_startR, _sAngle),
              _polarToCartesian8 = _slicedToArray(_polarToCartesian7, 2),
              _sx = _polarToCartesian8[0],
              _sy = _polarToCartesian8[1];
            var _polarToCartesian9 = polarToCartesian(_cpR, _cpAngle),
              _polarToCartesian0 = _slicedToArray(_polarToCartesian9, 2),
              _cx = _polarToCartesian0[0],
              _cy = _polarToCartesian0[1];
            var _polarToCartesian1 = polarToCartesian(_spiralEndR, _eAngle),
              _polarToCartesian10 = _slicedToArray(_polarToCartesian1, 2),
              _ex = _polarToCartesian10[0],
              _ey = _polarToCartesian10[1];
            var edgeAngle = seg.endAngle;
            var _perpX = Math.cos(edgeAngle);
            var _perpY = Math.sin(edgeAngle);
            var _ax = _sx - 2 * _cx + _ex;
            var _bx = 2 * (_cx - _sx);
            var _cx2 = _sx;
            var _ay = _sy - 2 * _cy + _ey;
            var _by = 2 * (_cy - _sy);
            var _cy2 = _sy;
            var _a = _perpX * _ax + _perpY * _ay;
            var _b = _perpX * _bx + _perpY * _by;
            var _c = _perpX * _cx2 + _perpY * _cy2;
            var _disc = _b * _b - 4 * _a * _c;
            var _t = 0.5;
            if (_disc >= 0) {
              var _sqrtDisc = Math.sqrt(_disc);
              var _t2 = (-_b + _sqrtDisc) / (2 * _a);
              var _t3 = (-_b - _sqrtDisc) / (2 * _a);
              if (_t2 >= 0 && _t2 <= 1) _t = _t2;else if (_t3 >= 0 && _t3 <= 1) _t = _t3;else _t = Math.abs(_t2 - 0.5) < Math.abs(_t3 - 0.5) ? _t2 : _t3;
            }
            var _it = 1 - _t;
            var _bx2 = _it * _it * _sx + 2 * _it * _t * _cx + _t * _t * _ex;
            var _by2 = _it * _it * _sy + 2 * _it * _t * _cy + _t * _t * _ey;
            tipR = Math.sqrt(_bx2 * _bx2 + _by2 * _by2);
            tipAngle = Math.atan2(_bx2, -_by2);
          } else {
            // rightEdge without spiral: attach to outer edge at segment boundary
            midAngle = seg.endAngle;
            tipR = negOuterR;
            tipAngle = seg.endAngle;
          }
          var resolvedBorder = {
            width: Number((_ref2 = (_callout$border$width = (_callout$border = callout.border) === null || _callout$border === void 0 ? void 0 : _callout$border.width) !== null && _callout$border$width !== void 0 ? _callout$border$width : (_styles$border = styles.border) === null || _styles$border === void 0 ? void 0 : _styles$border.width) !== null && _ref2 !== void 0 ? _ref2 : 0.5),
            color: (_ref3 = (_callout$border$color = (_callout$border2 = callout.border) === null || _callout$border2 === void 0 ? void 0 : _callout$border2.color) !== null && _callout$border$color !== void 0 ? _callout$border$color : (_styles$border2 = styles.border) === null || _styles$border2 === void 0 ? void 0 : _styles$border2.color) !== null && _ref3 !== void 0 ? _ref3 : '#ccc'
          };
          var tailShape = callout.header ? 'line' : (_callout$tail = callout.tail) !== null && _callout$tail !== void 0 ? _callout$tail : 'triangle';
          var pIdx = seg.perspectiveIndex;
          var calloutOpacity = 1;
          if (focusAnimatingIdx != null && pIdx !== focusAnimatingIdx) calloutOpacity = 0;else if (selectedPerspective != null && pIdx !== selectedPerspective && pIdx !== hoveredPerspectiveIdx) calloutOpacity = 0;
          return jsx("g", {
            style: {
              opacity: calloutOpacity,
              transition: 'opacity 200ms ease-in'
            },
            children: jsx(CalloutInternal, {
              midAngle: midAngle,
              anchorR: tipR,
              anchorAngle: tipAngle,
              endR: boxEndR,
              rotationDeg: rotationDeg,
              border: resolvedBorder,
              tail: tailShape,
              header: callout.header,
              children: callout.children
            })
          }, segId + ci);
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

export { Callout, Wheel, Wheel as default, downloadBlob, exportWheelPNG, exportWheelSVG };
//# sourceMappingURL=index.esm.js.map
