'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var define1 = require('https://api.observablehq.com/@d3/color-legend.js?v=3');

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
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
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
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
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
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = false,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = true, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), true), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    if (r) i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n;else {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      o("next", 0), o("throw", 1), o("return", 2);
    }
  }, _regeneratorDefine(e, r, n, t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}
function _superPropGet(t, o, e, r) {
  var p = _get(_getPrototypeOf(t.prototype ), o, e);
  return 2 & r && "function" == typeof p ? function (t) {
    return p.apply(e, t);
  } : p;
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(t)
    }
  }));
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
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function dispatch(node, type, detail) {
  detail = detail || {};
  var document = node.ownerDocument, event = document.defaultView.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, {detail: detail});
  } else {
    event = document.createEvent("Event");
    event.initEvent(type, false, false);
    event.detail = detail;
  }
  node.dispatchEvent(event);
}

// TODO https://twitter.com/mbostock/status/702737065121742848
function isarray(value) {
  return Array.isArray(value)
      || value instanceof Int8Array
      || value instanceof Int16Array
      || value instanceof Int32Array
      || value instanceof Uint8Array
      || value instanceof Uint8ClampedArray
      || value instanceof Uint16Array
      || value instanceof Uint32Array
      || value instanceof Float32Array
      || value instanceof Float64Array;
}

// Non-integer keys in arrays, e.g. [1, 2, 0.5: "value"].
function isindex(key) {
  return key === (key | 0) + "";
}

function inspectName(name) {
  const n = document.createElement("span");
  n.className = "observablehq--cellname";
  n.textContent = `${name} = `;
  return n;
}

const symbolToString = Symbol.prototype.toString;

// Symbols do not coerce to strings; they must be explicitly converted.
function formatSymbol(symbol) {
  return symbolToString.call(symbol);
}

const {getOwnPropertySymbols, prototype: {hasOwnProperty: hasOwnProperty$1}} = Object;
const {toStringTag} = Symbol;

const FORBIDDEN = {};

const symbolsof = getOwnPropertySymbols;

function isown(object, key) {
  return hasOwnProperty$1.call(object, key);
}

function tagof(object) {
  return object[toStringTag]
      || (object.constructor && object.constructor.name)
      || "Object";
}

function valueof$1(object, key) {
  try {
    const value = object[key];
    if (value) value.constructor; // Test for SecurityError.
    return value;
  } catch (ignore) {
    return FORBIDDEN;
  }
}

const SYMBOLS = [
  { symbol: "@@__IMMUTABLE_INDEXED__@@", name: "Indexed", modifier: true },
  { symbol: "@@__IMMUTABLE_KEYED__@@", name: "Keyed", modifier: true },
  { symbol: "@@__IMMUTABLE_LIST__@@", name: "List", arrayish: true },
  { symbol: "@@__IMMUTABLE_MAP__@@", name: "Map" },
  {
    symbol: "@@__IMMUTABLE_ORDERED__@@",
    name: "Ordered",
    modifier: true,
    prefix: true
  },
  { symbol: "@@__IMMUTABLE_RECORD__@@", name: "Record" },
  {
    symbol: "@@__IMMUTABLE_SET__@@",
    name: "Set",
    arrayish: true,
    setish: true
  },
  { symbol: "@@__IMMUTABLE_STACK__@@", name: "Stack", arrayish: true }
];

function immutableName(obj) {
  try {
    let symbols = SYMBOLS.filter(({ symbol }) => obj[symbol] === true);
    if (!symbols.length) return;

    const name = symbols.find(s => !s.modifier);
    const prefix =
      name.name === "Map" && symbols.find(s => s.modifier && s.prefix);

    const arrayish = symbols.some(s => s.arrayish);
    const setish = symbols.some(s => s.setish);

    return {
      name: `${prefix ? prefix.name : ""}${name.name}`,
      symbols,
      arrayish: arrayish && !setish,
      setish
    };
  } catch (e) {
    return null;
  }
}

const {getPrototypeOf, getOwnPropertyDescriptors} = Object;
const objectPrototype = getPrototypeOf({});

function inspectExpanded(object, _, name, proto) {
  let arrayish = isarray(object);
  let tag, fields, next, n;

  if (object instanceof Map) {
    if (object instanceof object.constructor) {
      tag = `Map(${object.size})`;
      fields = iterateMap$1;
    } else { // avoid incompatible receiver error for prototype
      tag = "Map()";
      fields = iterateObject$1;
    }
  } else if (object instanceof Set) {
    if (object instanceof object.constructor) {
      tag = `Set(${object.size})`;
      fields = iterateSet$1;
    } else { // avoid incompatible receiver error for prototype
      tag = "Set()";
      fields = iterateObject$1;
    }
  } else if (arrayish) {
    tag = `${object.constructor.name}(${object.length})`;
    fields = iterateArray$1;
  } else if ((n = immutableName(object))) {
    tag = `Immutable.${n.name}${n.name === "Record" ? "" : `(${object.size})`}`;
    arrayish = n.arrayish;
    fields = n.arrayish
      ? iterateImArray$1
      : n.setish
      ? iterateImSet$1
      : iterateImObject$1;
  } else if (proto) {
    tag = tagof(object);
    fields = iterateProto;
  } else {
    tag = tagof(object);
    fields = iterateObject$1;
  }

  const span = document.createElement("span");
  span.className = "observablehq--expanded";
  if (name) {
    span.appendChild(inspectName(name));
  }
  const a = span.appendChild(document.createElement("a"));
  a.innerHTML = `<svg width=8 height=8 class='observablehq--caret'>
    <path d='M4 7L0 1h8z' fill='currentColor' />
  </svg>`;
  a.appendChild(document.createTextNode(`${tag}${arrayish ? " [" : " {"}`));
  a.addEventListener("mouseup", function(event) {
    event.stopPropagation();
    replace(span, inspectCollapsed(object, null, name, proto));
  });

  fields = fields(object);
  for (let i = 0; !(next = fields.next()).done && i < 20; ++i) {
    span.appendChild(next.value);
  }

  if (!next.done) {
    const a = span.appendChild(document.createElement("a"));
    a.className = "observablehq--field";
    a.style.display = "block";
    a.appendChild(document.createTextNode(`  … more`));
    a.addEventListener("mouseup", function(event) {
      event.stopPropagation();
      span.insertBefore(next.value, span.lastChild.previousSibling);
      for (let i = 0; !(next = fields.next()).done && i < 19; ++i) {
        span.insertBefore(next.value, span.lastChild.previousSibling);
      }
      if (next.done) span.removeChild(span.lastChild.previousSibling);
      dispatch(span, "load");
    });
  }

  span.appendChild(document.createTextNode(arrayish ? "]" : "}"));

  return span;
}

function* iterateMap$1(map) {
  for (const [key, value] of map) {
    yield formatMapField$1(key, value);
  }
  yield* iterateObject$1(map);
}

function* iterateSet$1(set) {
  for (const value of set) {
    yield formatSetField(value);
  }
  yield* iterateObject$1(set);
}

function* iterateImSet$1(set) {
  for (const value of set) {
    yield formatSetField(value);
  }
}

function* iterateArray$1(array) {
  for (let i = 0, n = array.length; i < n; ++i) {
    if (i in array) {
      yield formatField$1(i, valueof$1(array, i), "observablehq--index");
    }
  }
  for (const key in array) {
    if (!isindex(key) && isown(array, key)) {
      yield formatField$1(key, valueof$1(array, key), "observablehq--key");
    }
  }
  for (const symbol of symbolsof(array)) {
    yield formatField$1(
      formatSymbol(symbol),
      valueof$1(array, symbol),
      "observablehq--symbol"
    );
  }
}

function* iterateImArray$1(array) {
  let i1 = 0;
  for (const n = array.size; i1 < n; ++i1) {
    yield formatField$1(i1, array.get(i1), true);
  }
}

function* iterateProto(object) {
  for (const key in getOwnPropertyDescriptors(object)) {
    yield formatField$1(key, valueof$1(object, key), "observablehq--key");
  }
  for (const symbol of symbolsof(object)) {
    yield formatField$1(
      formatSymbol(symbol),
      valueof$1(object, symbol),
      "observablehq--symbol"
    );
  }

  const proto = getPrototypeOf(object);
  if (proto && proto !== objectPrototype) {
    yield formatPrototype(proto);
  }
}

function* iterateObject$1(object) {
  for (const key in object) {
    if (isown(object, key)) {
      yield formatField$1(key, valueof$1(object, key), "observablehq--key");
    }
  }
  for (const symbol of symbolsof(object)) {
    yield formatField$1(
      formatSymbol(symbol),
      valueof$1(object, symbol),
      "observablehq--symbol"
    );
  }

  const proto = getPrototypeOf(object);
  if (proto && proto !== objectPrototype) {
    yield formatPrototype(proto);
  }
}

function* iterateImObject$1(object) {
  for (const [key, value] of object) {
    yield formatField$1(key, value, "observablehq--key");
  }
}

function formatPrototype(value) {
  const item = document.createElement("div");
  const span = item.appendChild(document.createElement("span"));
  item.className = "observablehq--field";
  span.className = "observablehq--prototype-key";
  span.textContent = `  <prototype>`;
  item.appendChild(document.createTextNode(": "));
  item.appendChild(inspect(value, undefined, undefined, undefined, true));
  return item;
}

function formatField$1(key, value, className) {
  const item = document.createElement("div");
  const span = item.appendChild(document.createElement("span"));
  item.className = "observablehq--field";
  span.className = className;
  span.textContent = `  ${key}`;
  item.appendChild(document.createTextNode(": "));
  item.appendChild(inspect(value));
  return item;
}

function formatMapField$1(key, value) {
  const item = document.createElement("div");
  item.className = "observablehq--field";
  item.appendChild(document.createTextNode("  "));
  item.appendChild(inspect(key));
  item.appendChild(document.createTextNode(" => "));
  item.appendChild(inspect(value));
  return item;
}

function formatSetField(value) {
  const item = document.createElement("div");
  item.className = "observablehq--field";
  item.appendChild(document.createTextNode("  "));
  item.appendChild(inspect(value));
  return item;
}

function hasSelection(elem) {
  const sel = window.getSelection();
  return (
    sel.type === "Range" &&
    (sel.containsNode(elem, true) ||
      elem.contains(sel.anchorNode) ||
      elem.contains(sel.focusNode))
  );
}

function inspectCollapsed(object, shallow, name, proto) {
  let arrayish = isarray(object);
  let tag, fields, next, n;

  if (object instanceof Map) {
    if (object instanceof object.constructor) {
      tag = `Map(${object.size})`;
      fields = iterateMap;
    } else { // avoid incompatible receiver error for prototype
      tag = "Map()";
      fields = iterateObject;
    }
  } else if (object instanceof Set) {
    if (object instanceof object.constructor) {
      tag = `Set(${object.size})`;
      fields = iterateSet;
    } else { // avoid incompatible receiver error for prototype
      tag = "Set()";
      fields = iterateObject;
    }
  } else if (arrayish) {
    tag = `${object.constructor.name}(${object.length})`;
    fields = iterateArray;
  } else if ((n = immutableName(object))) {
    tag = `Immutable.${n.name}${n.name === 'Record' ? '' : `(${object.size})`}`;
    arrayish = n.arrayish;
    fields = n.arrayish ? iterateImArray : n.setish ? iterateImSet : iterateImObject;
  } else {
    tag = tagof(object);
    fields = iterateObject;
  }

  if (shallow) {
    const span = document.createElement("span");
    span.className = "observablehq--shallow";
    if (name) {
      span.appendChild(inspectName(name));
    }
    span.appendChild(document.createTextNode(tag));
    span.addEventListener("mouseup", function(event) {
      if (hasSelection(span)) return;
      event.stopPropagation();
      replace(span, inspectCollapsed(object));
    });
    return span;
  }

  const span = document.createElement("span");
  span.className = "observablehq--collapsed";
  if (name) {
    span.appendChild(inspectName(name));
  }
  const a = span.appendChild(document.createElement("a"));
  a.innerHTML = `<svg width=8 height=8 class='observablehq--caret'>
    <path d='M7 4L1 8V0z' fill='currentColor' />
  </svg>`;
  a.appendChild(document.createTextNode(`${tag}${arrayish ? " [" : " {"}`));
  span.addEventListener("mouseup", function(event) {
    if (hasSelection(span)) return;
    event.stopPropagation();
    replace(span, inspectExpanded(object, null, name, proto));
  }, true);

  fields = fields(object);
  for (let i = 0; !(next = fields.next()).done && i < 20; ++i) {
    if (i > 0) span.appendChild(document.createTextNode(", "));
    span.appendChild(next.value);
  }

  if (!next.done) span.appendChild(document.createTextNode(", …"));
  span.appendChild(document.createTextNode(arrayish ? "]" : "}"));

  return span;
}

function* iterateMap(map) {
  for (const [key, value] of map) {
    yield formatMapField(key, value);
  }
  yield* iterateObject(map);
}

function* iterateSet(set) {
  for (const value of set) {
    yield inspect(value, true);
  }
  yield* iterateObject(set);
}

function* iterateImSet(set) {
  for (const value of set) {
    yield inspect(value, true);
  }
}

function* iterateImArray(array) {
  let i0 = -1, i1 = 0;
  for (const n = array.size; i1 < n; ++i1) {
    if (i1 > i0 + 1) yield formatEmpty(i1 - i0 - 1);
    yield inspect(array.get(i1), true);
    i0 = i1;
  }
  if (i1 > i0 + 1) yield formatEmpty(i1 - i0 - 1);
}

function* iterateArray(array) {
  let i0 = -1, i1 = 0;
  for (const n = array.length; i1 < n; ++i1) {
    if (i1 in array) {
      if (i1 > i0 + 1) yield formatEmpty(i1 - i0 - 1);
      yield inspect(valueof$1(array, i1), true);
      i0 = i1;
    }
  }
  if (i1 > i0 + 1) yield formatEmpty(i1 - i0 - 1);
  for (const key in array) {
    if (!isindex(key) && isown(array, key)) {
      yield formatField(key, valueof$1(array, key), "observablehq--key");
    }
  }
  for (const symbol of symbolsof(array)) {
    yield formatField(formatSymbol(symbol), valueof$1(array, symbol), "observablehq--symbol");
  }
}

function* iterateObject(object) {
  for (const key in object) {
    if (isown(object, key)) {
      yield formatField(key, valueof$1(object, key), "observablehq--key");
    }
  }
  for (const symbol of symbolsof(object)) {
    yield formatField(formatSymbol(symbol), valueof$1(object, symbol), "observablehq--symbol");
  }
}

function* iterateImObject(object) {
  for (const [key, value] of object) {
    yield formatField(key, value, "observablehq--key");
  }
}

function formatEmpty(e) {
  const span = document.createElement("span");
  span.className = "observablehq--empty";
  span.textContent = e === 1 ? "empty" : `empty × ${e}`;
  return span;
}

function formatField(key, value, className) {
  const fragment = document.createDocumentFragment();
  const span = fragment.appendChild(document.createElement("span"));
  span.className = className;
  span.textContent = key;
  fragment.appendChild(document.createTextNode(": "));
  fragment.appendChild(inspect(value, true));
  return fragment;
}

function formatMapField(key, value) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(inspect(key, true));
  fragment.appendChild(document.createTextNode(" => "));
  fragment.appendChild(inspect(value, true));
  return fragment;
}

function format(date, fallback) {
  if (!(date instanceof Date)) date = new Date(+date);
  if (isNaN(date)) return typeof fallback === "function" ? fallback(date) : fallback;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();
  return `${formatYear$1(date.getUTCFullYear())}-${pad$1(date.getUTCMonth() + 1, 2)}-${pad$1(date.getUTCDate(), 2)}${
    hours || minutes || seconds || milliseconds ? `T${pad$1(hours, 2)}:${pad$1(minutes, 2)}${
      seconds || milliseconds ? `:${pad$1(seconds, 2)}${
        milliseconds ? `.${pad$1(milliseconds, 3)}` : ``
      }` : ``
    }Z` : ``
  }`;
}

function formatYear$1(year) {
  return year < 0 ? `-${pad$1(-year, 6)}`
    : year > 9999 ? `+${pad$1(year, 6)}`
    : pad$1(year, 4);
}

function pad$1(value, width) {
  return `${value}`.padStart(width, "0");
}

function formatDate$2(date) {
  return format(date, "Invalid Date");
}

var errorToString = Error.prototype.toString;

function formatError(value) {
  return value.stack || errorToString.call(value);
}

var regExpToString = RegExp.prototype.toString;

function formatRegExp(value) {
  return regExpToString.call(value);
}

/* eslint-disable no-control-regex */
const NEWLINE_LIMIT = 20;

function formatString(string, shallow, expanded, name) {
  if (shallow === false) {
    // String has fewer escapes displayed with double quotes
    if (count$1(string, /["\n]/g) <= count$1(string, /`|\${/g)) {
      const span = document.createElement("span");
      if (name) span.appendChild(inspectName(name));
      const textValue = span.appendChild(document.createElement("span"));
      textValue.className = "observablehq--string";
      textValue.textContent = JSON.stringify(string);
      return span;
    }
    const lines = string.split("\n");
    if (lines.length > NEWLINE_LIMIT && !expanded) {
      const div = document.createElement("div");
      if (name) div.appendChild(inspectName(name));
      const textValue = div.appendChild(document.createElement("span"));
      textValue.className = "observablehq--string";
      textValue.textContent = "`" + templatify(lines.slice(0, NEWLINE_LIMIT).join("\n"));
      const splitter = div.appendChild(document.createElement("span"));
      const truncatedCount = lines.length - NEWLINE_LIMIT;
      splitter.textContent = `Show ${truncatedCount} truncated line${truncatedCount > 1 ? "s": ""}`; splitter.className = "observablehq--string-expand";
      splitter.addEventListener("mouseup", function (event) {
        event.stopPropagation();
        replace(div, inspect(string, shallow, true, name));
      });
      return div;
    }
    const span = document.createElement("span");
    if (name) span.appendChild(inspectName(name));
    const textValue = span.appendChild(document.createElement("span"));
    textValue.className = `observablehq--string${expanded ? " observablehq--expanded" : ""}`;
    textValue.textContent = "`" + templatify(string) + "`";
    return span;
  }

  const span = document.createElement("span");
  if (name) span.appendChild(inspectName(name));
  const textValue = span.appendChild(document.createElement("span"));
  textValue.className = "observablehq--string";
  textValue.textContent = JSON.stringify(string.length > 100 ?
    `${string.slice(0, 50)}…${string.slice(-49)}` : string);
  return span;
}

function templatify(string) {
  return string.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g, templatifyChar);
}

function templatifyChar(char) {
  var code = char.charCodeAt(0);
  switch (code) {
    case 0x8: return "\\b";
    case 0x9: return "\\t";
    case 0xb: return "\\v";
    case 0xc: return "\\f";
    case 0xd: return "\\r";
  }
  return code < 0x10 ? "\\x0" + code.toString(16)
      : code < 0x20 ? "\\x" + code.toString(16)
      : "\\" + char;
}

function count$1(string, re) {
  var n = 0;
  while (re.exec(string)) ++n;
  return n;
}

var toString$1 = Function.prototype.toString,
    TYPE_ASYNC = {prefix: "async ƒ"},
    TYPE_ASYNC_GENERATOR = {prefix: "async ƒ*"},
    TYPE_CLASS = {prefix: "class"},
    TYPE_FUNCTION = {prefix: "ƒ"},
    TYPE_GENERATOR = {prefix: "ƒ*"};

function inspectFunction(f, name) {
  var type, m, t = toString$1.call(f);

  switch (f.constructor && f.constructor.name) {
    case "AsyncFunction": type = TYPE_ASYNC; break;
    case "AsyncGeneratorFunction": type = TYPE_ASYNC_GENERATOR; break;
    case "GeneratorFunction": type = TYPE_GENERATOR; break;
    default: type = /^class\b/.test(t) ? TYPE_CLASS : TYPE_FUNCTION; break;
  }

  // A class, possibly named.
  // class Name
  if (type === TYPE_CLASS) {
    return formatFunction(type, "", name);
  }

  // An arrow function with a single argument.
  // foo =>
  // async foo =>
  if ((m = /^(?:async\s*)?(\w+)\s*=>/.exec(t))) {
    return formatFunction(type, "(" + m[1] + ")", name);
  }

  // An arrow function with parenthesized arguments.
  // (…)
  // async (…)
  if ((m = /^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(t))) {
    return formatFunction(type, m[1] ? "(" + m[1].replace(/\s*,\s*/g, ", ") + ")" : "()", name);
  }

  // A function, possibly: async, generator, anonymous, simply arguments.
  // function name(…)
  // function* name(…)
  // async function name(…)
  // async function* name(…)
  if ((m = /^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(t))) {
    return formatFunction(type, m[1] ? "(" + m[1].replace(/\s*,\s*/g, ", ") + ")" : "()", name);
  }

  // Something else, like destructuring, comments or default values.
  return formatFunction(type, "(…)", name);
}

function formatFunction(type, args, cellname) {
  var span = document.createElement("span");
  span.className = "observablehq--function";
  if (cellname) {
    span.appendChild(inspectName(cellname));
  }
  var spanType = span.appendChild(document.createElement("span"));
  spanType.className = "observablehq--keyword";
  spanType.textContent = type.prefix;
  span.appendChild(document.createTextNode(args));
  return span;
}

const {prototype: {toString}} = Object;

function inspect(value, shallow, expand, name, proto) {
  let type = typeof value;
  switch (type) {
    case "boolean":
    case "undefined": { value += ""; break; }
    case "number": { value = value === 0 && 1 / value < 0 ? "-0" : value + ""; break; }
    case "bigint": { value = value + "n"; break; }
    case "symbol": { value = formatSymbol(value); break; }
    case "function": { return inspectFunction(value, name); }
    case "string": { return formatString(value, shallow, expand, name); }
    default: {
      if (value === null) { type = null, value = "null"; break; }
      if (value instanceof Date) { type = "date", value = formatDate$2(value); break; }
      if (value === FORBIDDEN) { type = "forbidden", value = "[forbidden]"; break; }
      switch (toString.call(value)) {
        case "[object RegExp]": { type = "regexp", value = formatRegExp(value); break; }
        case "[object Error]": // https://github.com/lodash/lodash/blob/master/isError.js#L26
        case "[object DOMException]": { type = "error", value = formatError(value); break; }
        default: return (expand ? inspectExpanded : inspectCollapsed)(value, shallow, name, proto);
      }
      break;
    }
  }
  const span = document.createElement("span");
  if (name) span.appendChild(inspectName(name));
  const n = span.appendChild(document.createElement("span"));
  n.className = `observablehq--${type}`;
  n.textContent = value;
  return span;
}

function replace(spanOld, spanNew) {
  if (spanOld.classList.contains("observablehq--inspect")) spanNew.classList.add("observablehq--inspect");
  spanOld.parentNode.replaceChild(spanNew, spanOld);
  dispatch(spanNew, "load");
}

const LOCATION_MATCH = /\s+\(\d+:\d+\)$/m;

class Inspector {
  constructor(node) {
    if (!node) throw new Error("invalid node");
    this._node = node;
    node.classList.add("observablehq");
  }
  pending() {
    const {_node} = this;
    _node.classList.remove("observablehq--error");
    _node.classList.add("observablehq--running");
  }
  fulfilled(value, name) {
    const {_node} = this;
    if (!isnode(value) || (value.parentNode && value.parentNode !== _node)) {
      value = inspect(value, false, _node.firstChild // TODO Do this better.
          && _node.firstChild.classList
          && _node.firstChild.classList.contains("observablehq--expanded"), name);
      value.classList.add("observablehq--inspect");
    }
    _node.classList.remove("observablehq--running", "observablehq--error");
    if (_node.firstChild !== value) {
      if (_node.firstChild) {
        while (_node.lastChild !== _node.firstChild) _node.removeChild(_node.lastChild);
        _node.replaceChild(value, _node.firstChild);
      } else {
        _node.appendChild(value);
      }
    }
    dispatch(_node, "update");
  }
  rejected(error, name) {
    const {_node} = this;
    _node.classList.remove("observablehq--running");
    _node.classList.add("observablehq--error");
    while (_node.lastChild) _node.removeChild(_node.lastChild);
    var div = document.createElement("div");
    div.className = "observablehq--inspect";
    if (name) div.appendChild(inspectName(name));
    div.appendChild(document.createTextNode((error + "").replace(LOCATION_MATCH, "")));
    _node.appendChild(div);
    dispatch(_node, "error", {error: error});
  }
}

Inspector.into = function(container) {
  if (typeof container === "string") {
    container = document.querySelector(container);
    if (container == null) throw new Error("container not found");
  }
  return function() {
    return new Inspector(container.appendChild(document.createElement("div")));
  };
};

// Returns true if the given value is something that should be added to the DOM
// by the inspector, rather than being inspected. This deliberately excludes
// DocumentFragment since appending a fragment “dissolves” (mutates) the
// fragment, and we wish for the inspector to not have side-effects. Also,
// HTMLElement.prototype is an instanceof Element, but not an element!
function isnode(value) {
  return (value instanceof Element || value instanceof Text)
      && (value instanceof value.constructor);
}

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsv$1(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

var csv = dsv$1(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;

var tsv = dsv$1("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;

function autoType(object) {
  for (var key in object) {
    var value = object[key].trim(), number, m;
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number = +value)) value = number;
    else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
      if (fixtz && !!m[4] && !m[7]) value = value.replace(/-/g, "/").replace(/T/, " ");
      value = new Date(value);
    }
    else continue;
    object[key] = value;
  }
  return object;
}

// https://github.com/d3/d3-dsv/issues/45
const fixtz = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();

function dependency(name, version, main) {
  return {
    resolve(path = main) {
      return `${name}@${version}/${path}`;
    }
  };
}

const d3 = dependency("d3", "7.9.0", "dist/d3.min.js");
const inputs = dependency("@observablehq/inputs", "0.11.0", "dist/inputs.min.js");
const plot = dependency("@observablehq/plot", "0.6.16", "dist/plot.umd.min.js");
const graphviz = dependency("@observablehq/graphviz", "0.2.1", "dist/graphviz.min.js");
const highlight = dependency("@observablehq/highlight.js", "2.0.0", "highlight.min.js");
const katex = dependency("@observablehq/katex", "0.11.1", "dist/katex.min.js");
const lodash = dependency("lodash", "4.17.21", "lodash.min.js");
const htl = dependency("htl", "0.3.1", "dist/htl.min.js");
const jszip = dependency("jszip", "3.10.1", "dist/jszip.min.js");
const marked = dependency("marked", "0.3.12", "marked.min.js");
const sql = dependency("sql.js", "1.8.0", "dist/sql-wasm.js");
const vega = dependency("vega", "5.22.1", "build/vega.min.js");
const vegalite = dependency("vega-lite", "5.6.0", "build/vega-lite.min.js");
const vegaliteApi = dependency("vega-lite-api", "5.0.0", "build/vega-lite-api.min.js");
const arrow4 = dependency("apache-arrow", "4.0.1", "Arrow.es2015.min.js");
const arrow9 = dependency("apache-arrow", "9.0.0", "+esm");
const arrow11 = dependency("apache-arrow", "11.0.0", "+esm");
const arquero = dependency("arquero", "4.8.8", "dist/arquero.min.js");
const topojson = dependency("topojson-client", "3.1.0", "dist/topojson-client.min.js");
const exceljs = dependency("exceljs", "4.3.0", "dist/exceljs.min.js");
const mermaid$1 = dependency("mermaid", "9.2.2", "dist/mermaid.min.js");
const leaflet$1 = dependency("leaflet", "1.9.3", "dist/leaflet.js");
const duckdb = dependency("@duckdb/duckdb-wasm", "1.24.0", "+esm");

const metas = new Map;
const queue$1 = [];
const map$2 = queue$1.map;
const some = queue$1.some;
const hasOwnProperty = queue$1.hasOwnProperty;
const identifierRe = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;
const versionRe = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/;
const extensionRe = /(?:\.[^/]*|\/)$/;

class RequireError extends Error {
  constructor(message) {
    super(message);
  }
}

RequireError.prototype.name = RequireError.name;

function parseIdentifier(identifier) {
  const match = identifierRe.exec(identifier);
  return match && {
    name: match[1],
    version: match[2],
    path: match[3]
  };
}

function resolveFrom(origin = "https://cdn.jsdelivr.net/npm/", mains = ["unpkg", "jsdelivr", "browser", "main"]) {
  if (!/\/$/.test(origin)) throw new Error("origin lacks trailing slash");

  function main(meta) {
    for (const key of mains) {
      let value = meta[key];
      if (typeof value === "string") {
        if (value.startsWith("./")) value = value.slice(2);
        return extensionRe.test(value) ? value : `${value}.js`;
      }
    }
  }

  function resolveMeta(target) {
    const url = `${origin}${target.name}${target.version ? `@${target.version}` : ""}/package.json`;
    let meta = metas.get(url);
    if (!meta) metas.set(url, meta = fetch(url).then(response => {
      if (!response.ok) throw new RequireError("unable to load package.json");
      if (response.redirected && !metas.has(response.url)) metas.set(response.url, meta);
      return response.json();
    }));
    return meta;
  }

  return async function resolve(name, base) {
    if (name.startsWith(origin)) name = name.substring(origin.length);
    if (/^(\w+:)|\/\//i.test(name)) return name;
    if (/^[.]{0,2}\//i.test(name)) return new URL(name, base == null ? location : base).href;
    if (!name.length || /^[\s._]/.test(name) || /\s$/.test(name)) throw new RequireError("illegal name");
    const target = parseIdentifier(name);
    if (!target) return `${origin}${name}`;
    if (!target.version && base != null && base.startsWith(origin)) {
      const meta = await resolveMeta(parseIdentifier(base.substring(origin.length)));
      target.version = meta.dependencies && meta.dependencies[target.name] || meta.peerDependencies && meta.peerDependencies[target.name];
    }
    if (target.path && !extensionRe.test(target.path)) target.path += ".js";
    if (target.path && target.version && versionRe.test(target.version)) return `${origin}${target.name}@${target.version}/${target.path}`;
    const meta = await resolveMeta(target);
    return `${origin}${meta.name}@${meta.version}/${target.path || main(meta) || "index.js"}`;
  };
}

var require$1 = requireFrom(resolveFrom());

function requireFrom(resolver) {
  const cache = new Map;
  const requireBase = requireRelative(null);

  function requireAbsolute(url) {
    if (typeof url !== "string") return url;
    let module = cache.get(url);
    if (!module) cache.set(url, module = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.onload = () => {
        try { resolve(queue$1.pop()(requireRelative(url))); }
        catch (error) { reject(new RequireError("invalid module")); }
        script.remove();
      };
      script.onerror = () => {
        reject(new RequireError("unable to load module"));
        script.remove();
      };
      script.async = true;
      script.src = url;
      window.define = define$1;
      document.head.appendChild(script);
    }));
    return module;
  }

  function requireRelative(base) {
    return name => Promise.resolve(resolver(name, base)).then(requireAbsolute);
  }

  function requireAlias(aliases) {
    return requireFrom((name, base) => {
      if (name in aliases) {
        name = aliases[name], base = null;
        if (typeof name !== "string") return name;
      }
      return resolver(name, base);
    });
  }

  function require(name) {
    return arguments.length > 1
        ? Promise.all(map$2.call(arguments, requireBase)).then(merge)
        : requireBase(name);
  }

  require.alias = requireAlias;
  require.resolve = resolver;

  return require;
}

function merge(modules) {
  const o = {};
  for (const m of modules) {
    for (const k in m) {
      if (hasOwnProperty.call(m, k)) {
        if (m[k] == null) Object.defineProperty(o, k, {get: getter(m, k)});
        else o[k] = m[k];
      }
    }
  }
  return o;
}

function getter(object, name) {
  return () => object[name];
}

function isbuiltin(name) {
  name = name + "";
  return name === "exports" || name === "module";
}

function define$1(name, dependencies, factory) {
  const n = arguments.length;
  if (n < 2) factory = name, dependencies = [];
  else if (n < 3) factory = dependencies, dependencies = typeof name === "string" ? [] : name;
  queue$1.push(some.call(dependencies, isbuiltin) ? require => {
    const exports = {};
    const module = {exports};
    return Promise.all(map$2.call(dependencies, name => {
      name = name + "";
      return name === "exports" ? exports : name === "module" ? module : require(name);
    })).then(dependencies => {
      factory.apply(null, dependencies);
      return module.exports;
    });
  } : require => {
    return Promise.all(map$2.call(dependencies, require)).then(dependencies => {
      return typeof factory === "function" ? factory.apply(null, dependencies) : factory;
    });
  });
}

define$1.amd = {};

// TODO Allow this to be overridden using the Library’s resolver.
const cdn = "https://cdn.observableusercontent.com/npm/";

let requireDefault = require$1;

function setDefaultRequire(require) {
  requireDefault = require;
}

function requirer(resolver) {
  return resolver == null ? requireDefault : requireFrom(resolver);
}

async function SQLite(require) {
  const [init, dist] = await Promise.all([require(sql.resolve()), require.resolve(sql.resolve("dist/"))]);
  return init({locateFile: file => `${dist}${file}`});
}

class SQLiteDatabaseClient {
  constructor(db) {
    Object.defineProperties(this, {
      _db: {value: db}
    });
  }
  static async open(source) {
    const [SQL, buffer] = await Promise.all([SQLite(requireDefault), Promise.resolve(source).then(load)]);
    return new SQLiteDatabaseClient(new SQL.Database(buffer));
  }
  async query(query, params) {
    return await exec(this._db, query, params);
  }
  async queryRow(query, params) {
    return (await this.query(query, params))[0] || null;
  }
  async explain(query, params) {
    const rows = await this.query(`EXPLAIN QUERY PLAN ${query}`, params);
    return element$1("pre", {className: "observablehq--inspect"}, [
      text$2(rows.map(row => row.detail).join("\n"))
    ]);
  }
  async describeTables({schema} = {}) {
    return this.query(`SELECT NULLIF(schema, 'main') AS schema, name FROM pragma_table_list() WHERE type = 'table'${schema == null ? "" : ` AND schema = ?`} AND name NOT LIKE 'sqlite_%' ORDER BY schema, name`, schema == null ? [] : [schema]);
  }
  async describeColumns({schema, table} = {}) {
    if (table == null) throw new Error(`missing table`);
    const rows = await this.query(`SELECT name, type, "notnull" FROM pragma_table_info(?${schema == null ? "" : `, ?`}) ORDER BY cid`, schema == null ? [table] : [table, schema]);
    if (!rows.length) throw new Error(`table not found: ${table}`);
    return rows.map(({name, type, notnull}) => ({name, type: sqliteType(type), databaseType: type, nullable: !notnull}));
  }
  async describe(object) {
    const rows = await (object === undefined
      ? this.query(`SELECT name FROM sqlite_master WHERE type = 'table'`)
      : this.query(`SELECT * FROM pragma_table_info(?)`, [object]));
    if (!rows.length) throw new Error("Not found");
    const {columns} = rows;
    return element$1("table", {value: rows}, [
      element$1("thead", [element$1("tr", columns.map(c => element$1("th", [text$2(c)])))]),
      element$1("tbody", rows.map(r => element$1("tr", columns.map(c => element$1("td", [text$2(r[c])])))))
    ]);
  }
  async sql() {
    return this.query(...this.queryTag.apply(this, arguments));
  }
  queryTag(strings, ...params) {
    return [strings.join("?"), params];
  }
}

Object.defineProperty(SQLiteDatabaseClient.prototype, "dialect", {
  value: "sqlite"
});

// https://www.sqlite.org/datatype3.html
function sqliteType(type) {
  switch (type) {
    case "NULL":
      return "null";
    case "INT":
    case "INTEGER":
    case "TINYINT":
    case "SMALLINT":
    case "MEDIUMINT":
    case "BIGINT":
    case "UNSIGNED BIG INT":
    case "INT2":
    case "INT8":
      return "integer";
    case "TEXT":
    case "CLOB":
      return "string";
    case "REAL":
    case "DOUBLE":
    case "DOUBLE PRECISION":
    case "FLOAT":
    case "NUMERIC":
      return "number";
    case "BLOB":
      return "buffer";
    case "DATE":
    case "DATETIME":
      return "string"; // TODO convert strings to Date instances in sql.js
    default:
      return /^(?:(?:(?:VARYING|NATIVE) )?CHARACTER|(?:N|VAR|NVAR)CHAR)\(/.test(type) ? "string"
        : /^(?:DECIMAL|NUMERIC)\(/.test(type) ? "number"
        : "other";
  }
}

function load(source) {
  return typeof source === "string" ? fetch(source).then(load)
    : source instanceof Response || source instanceof Blob ? source.arrayBuffer().then(load)
    : source instanceof ArrayBuffer ? new Uint8Array(source)
    : source;
}

async function exec(db, query, params) {
  const [result] = await db.exec(query, params);
  if (!result) return [];
  const {columns, values} = result;
  const rows = values.map(row => Object.fromEntries(row.map((value, i) => [columns[i], value])));
  rows.columns = columns;
  return rows;
}

function element$1(name, props, children) {
  if (arguments.length === 2) children = props, props = undefined;
  const element = document.createElement(name);
  if (props !== undefined) for (const p in props) element[p] = props[p];
  if (children !== undefined) for (const c of children) element.appendChild(c);
  return element;
}

function text$2(value) {
  return document.createTextNode(value);
}

function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function greatest(values, compare = ascending) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined
          ? ascending(value, maxValue) > 0
          : ascending(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined
          ? compare(value, max) > 0
          : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}

function reverse(values) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  return Array.from(values).reverse();
}

function isArqueroTable(value) {
  // Arquero tables have a `toArrowBuffer` function
  return value && typeof value.toArrowBuffer === "function";
}

// Returns true if the vaue is an Apache Arrow table. This uses a “duck” test
// (instead of strict instanceof) because we want it to work with a range of
// Apache Arrow versions at least 7.0.0 or above.
// https://arrow.apache.org/docs/7.0/js/classes/Arrow_dom.Table.html
function isArrowTable(value) {
  return (
    value &&
    typeof value.getChild === "function" &&
    typeof value.toArray === "function" &&
    value.schema &&
    Array.isArray(value.schema.fields)
  );
}

function getArrowTableSchema(table) {
  return table.schema.fields.map(getArrowFieldSchema);
}

function getArrowFieldSchema(field) {
  return {
    name: field.name,
    type: getArrowType(field.type),
    nullable: field.nullable,
    databaseType: String(field.type)
  };
}

// https://github.com/apache/arrow/blob/89f9a0948961f6e94f1ef5e4f310b707d22a3c11/js/src/enum.ts#L140-L141
function getArrowType(type) {
  switch (type.typeId) {
    case 2: // Int
      return "integer";
    case 3: // Float
    case 7: // Decimal
      return "number";
    case 4: // Binary
    case 15: // FixedSizeBinary
      return "buffer";
    case 5: // Utf8
      return "string";
    case 6: // Bool
      return "boolean";
    case 8: // Date
    case 9: // Time
    case 10: // Timestamp
      return "date";
    case 12: // List
    case 16: // FixedSizeList
      return "array";
    case 13: // Struct
    case 14: // Union
      return "object";
    case 11: // Interval
    case 17: // Map
    default:
      return "other";
  }
}

async function loadArrow() {
  return await import(`${cdn}${arrow11.resolve()}`);
}

// Adapted from https://observablehq.com/@cmudig/duckdb-client
// Copyright 2021 CMU Data Interaction Group
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

let promise;

class DuckDBClient {
  constructor(db) {
    Object.defineProperties(this, {
      _db: {value: db}
    });
  }

  async queryStream(query, params) {
    const connection = await this._db.connect();
    let reader, batch;
    try {
      if (params?.length > 0) {
        const statement = await connection.prepare(query);
        reader = await statement.send(...params);
      } else {
        reader = await connection.send(query);
      }
      batch = await reader.next();
      if (batch.done) throw new Error("missing first batch");
    } catch (error) {
      await connection.close();
      throw error;
    }
    return {
      schema: getArrowTableSchema(batch.value),
      async *readRows() {
        try {
          while (!batch.done) {
            yield batch.value.toArray();
            batch = await reader.next();
          }
        } finally {
          await connection.close();
        }
      }
    };
  }

  async query(query, params) {
    const result = await this.queryStream(query, params);
    const results = [];
    for await (const rows of result.readRows()) {
      for (const row of rows) {
        results.push(row);
      }
    }
    results.schema = result.schema;
    return results;
  }

  async queryRow(query, params) {
    const result = await this.queryStream(query, params);
    const reader = result.readRows();
    try {
      const {done, value} = await reader.next();
      return done || !value.length ? null : value[0];
    } finally {
      await reader.return();
    }
  }

  async sql(strings, ...args) {
    return await this.query(strings.join("?"), args);
  }

  queryTag(strings, ...params) {
    return [strings.join("?"), params];
  }

  escape(name) {
    return `"${name}"`;
  }

  async describeTables() {
    const tables = await this.query(`SHOW TABLES`);
    return tables.map(({name}) => ({name}));
  }

  async describeColumns({table} = {}) {
    const columns = await this.query(`DESCRIBE ${this.escape(table)}`);
    return columns.map(({column_name, column_type, null: nullable}) => ({
      name: column_name,
      type: getDuckDBType(column_type),
      nullable: nullable !== "NO",
      databaseType: column_type
    }));
  }

  static async of(sources = {}, config = {}) {
    const db = await createDuckDB();
    if (config.query?.castTimestampToDate === undefined) {
      config = {...config, query: {...config.query, castTimestampToDate: true}};
    }
    if (config.query?.castBigIntToDouble === undefined) {
      config = {...config, query: {...config.query, castBigIntToDouble: true}};
    }
    await db.open(config);
    await Promise.all(
      Object.entries(sources).map(async ([name, source]) => {
        if (source instanceof FileAttachment) { // bare file
          await insertFile(db, name, source);
        } else if (isArrowTable(source)) { // bare arrow table
          await insertArrowTable(db, name, source);
        } else if (Array.isArray(source)) { // bare array of objects
          await insertArray(db, name, source);
        } else if (isArqueroTable(source)) {
          await insertArqueroTable(db, name, source);
        } else if ("data" in source) { // data + options
          const {data, ...options} = source;
          if (isArrowTable(data)) {
            await insertArrowTable(db, name, data, options);
          } else {
            await insertArray(db, name, data, options);
          }
        } else if ("file" in source) { // file + options
          const {file, ...options} = source;
          await insertFile(db, name, file, options);
        } else {
          throw new Error(`invalid source: ${source}`);
        }
      })
    );
    return new DuckDBClient(db);
  }
}

Object.defineProperty(DuckDBClient.prototype, "dialect", {
  value: "duckdb"
});

async function insertFile(database, name, file, options) {
  const url = await file.url();
  if (url.startsWith("blob:")) {
    const buffer = await file.arrayBuffer();
    await database.registerFileBuffer(file.name, new Uint8Array(buffer));
  } else {
    await database.registerFileURL(file.name, new URL(url, location).href, 4); // duckdb.DuckDBDataProtocol.HTTP
  }
  const connection = await database.connect();
  try {
    switch (file.mimeType) {
      case "text/csv":
      case "text/tab-separated-values": {
        return await connection.insertCSVFromPath(file.name, {
          name,
          schema: "main",
          ...options
        }).catch(async (error) => {
          // If initial attempt to insert CSV resulted in a conversion
          // error, try again, this time treating all columns as strings.
          if (error.toString().includes("Could not convert")) {
            return await insertUntypedCSV(connection, file, name);
          }
          throw error;
        });
      }
      case "application/json":
        return await connection.insertJSONFromPath(file.name, {
          name,
          schema: "main",
          ...options
        });
      default:
        if (/\.arrow$/i.test(file.name)) {
          const buffer = new Uint8Array(await file.arrayBuffer());
          return await connection.insertArrowFromIPCStream(buffer, {
            name,
            schema: "main",
            ...options
          });
        }
        if (/\.parquet$/i.test(file.name)) {
          return await connection.query(
            `CREATE VIEW '${name}' AS SELECT * FROM parquet_scan('${file.name}')`
          );
        }
        throw new Error(`unknown file type: ${file.mimeType}`);
    }
  } finally {
    await connection.close();
  }
}

async function insertUntypedCSV(connection, file, name) {
  const statement = await connection.prepare(
    `CREATE TABLE '${name}' AS SELECT * FROM read_csv_auto(?, ALL_VARCHAR=TRUE)`
  );
  return await statement.send(file.name);
}

async function insertArrowTable(database, name, table, options) {
  const connection = await database.connect();
  try {
    await connection.insertArrowTable(table, {
      name,
      schema: "main",
      ...options
    });
  } finally {
    await connection.close();
  }
}

async function insertArqueroTable(database, name, source) {
  // TODO When we have stdlib versioning and can upgrade Arquero to version 5,
  // we can then call source.toArrow() directly, with insertArrowTable()
  const arrow = await loadArrow();
  const table = arrow.tableFromIPC(source.toArrowBuffer());
  return await insertArrowTable(database, name, table);
}

async function insertArray(database, name, array, options) {
  const arrow = await loadArrow();
  const table = arrow.tableFromJSON(array);
  return await insertArrowTable(database, name, table, options);
}

async function loadDuckDB() {
  const module = await import(`${cdn}${duckdb.resolve()}`);
  const bundle = await module.selectBundle({
    mvp: {
      mainModule: `${cdn}${duckdb.resolve("dist/duckdb-mvp.wasm")}`,
      mainWorker: `${cdn}${duckdb.resolve("dist/duckdb-browser-mvp.worker.js")}`
    },
    eh: {
      mainModule: `${cdn}${duckdb.resolve("dist/duckdb-eh.wasm")}`,
      mainWorker: `${cdn}${duckdb.resolve("dist/duckdb-browser-eh.worker.js")}`
    }
  });
  const logger = new module.ConsoleLogger();
  return {module, bundle, logger};
}

async function createDuckDB() {
  if (promise === undefined) promise = loadDuckDB();
  const {module, bundle, logger} = await promise;
  const worker = await module.createWorker(bundle.mainWorker);
  const db = new module.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db;
}

// https://duckdb.org/docs/sql/data_types/overview
function getDuckDBType(type) {
  switch (type) {
    case "BIGINT":
    case "HUGEINT":
    case "UBIGINT":
      return "bigint";
    case "DOUBLE":
    case "REAL":
    case "FLOAT":
      return "number";
    case "INTEGER":
    case "SMALLINT":
    case "TINYINT":
    case "USMALLINT":
    case "UINTEGER":
    case "UTINYINT":
      return "integer";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "TIMESTAMP":
    case "TIMESTAMP WITH TIME ZONE":
      return "date";
    case "VARCHAR":
    case "UUID":
      return "string";
    // case "BLOB":
    // case "INTERVAL":
    // case "TIME":
    default:
      if (/^DECIMAL\(/.test(type)) return "integer";
      return "other";
  }
}

const nChecks = 20; // number of values to check in each array

// We support two levels of DatabaseClient. The simplest DatabaseClient
// implements only the client.sql tagged template literal. More advanced
// DatabaseClients implement client.query and client.queryStream, which support
// streaming and abort, and the client.queryTag tagged template literal is used
// to translate the contents of a SQL cell or Table cell into the appropriate
// arguments for calling client.query or client.queryStream. For table cells, we
// additionally require client.describeColumns. The client.describeTables method
// is optional.
function isDatabaseClient(value, mode) {
  return (
    value &&
    (typeof value.sql === "function" ||
      (typeof value.queryTag === "function" &&
        (typeof value.query === "function" ||
          typeof value.queryStream === "function"))) &&
    (mode !== "table") &&
    value !== __query // don’t match our internal helper
  );
}

// Returns true if the value is a typed array (for a single-column table), or if
// it’s an array. In the latter case, the elements of the array must be
// consistently typed: either plain objects or primitives or dates.
function isDataArray(value) {
  return (
    (Array.isArray(value) &&
      (isQueryResultSetSchema(value.schema) ||
        isQueryResultSetColumns(value.columns) ||
        arrayContainsObjects(value) ||
        arrayContainsPrimitives(value) ||
        arrayContainsDates(value))) ||
    isTypedArray(value)
  );
}

// Given an array, checks that the given value is an array that does not contain
// any primitive values (at least for the first few values that we check), and
// that the first object contains enumerable keys (see computeSchema for how we
// infer the columns). We assume that the contents of the table are homogenous,
// but we don’t currently enforce this.
// https://observablehq.com/@observablehq/database-client-specification#§1
function arrayContainsObjects(value) {
  const n = Math.min(nChecks, value.length);
  for (let i = 0; i < n; ++i) {
    const v = value[i];
    if (v === null || typeof v !== "object") return false;
  }
  return n > 0 && objectHasEnumerableKeys(value[0]);
}

// Using a for-in loop here means that we can abort after finding at least one
// enumerable key (whereas Object.keys would require materializing the array of
// all keys, which would be considerably slower if the value has many keys!).
// This function assumes that value is an object; see arrayContainsObjects.
function objectHasEnumerableKeys(value) {
  for (const _ in value) return true;
  return false;
}

function isQueryResultSetSchema(schemas) {
  return (
    Array.isArray(schemas) &&
    schemas.every(isColumnSchema)
  );
}

function isQueryResultSetColumns(columns) {
  return (Array.isArray(columns) && columns.every((name) => typeof name === "string"));
}

function isColumnSchema(schema) {
  return schema && typeof schema.name === "string" && typeof schema.type === "string";
}

// Returns true if the value represents an array of primitives (i.e., a
// single-column table). This should only be passed values for which
// isDataArray returns true.
function arrayIsPrimitive(value) {
  return (
    isTypedArray(value) ||
    arrayContainsPrimitives(value) ||
    arrayContainsDates(value)
  );
}

// Given an array, checks that the first n elements are primitives (number,
// string, boolean, bigint) of a consistent type.
function arrayContainsPrimitives(value) {
  const n = Math.min(nChecks, value.length);
  if (!(n > 0)) return false;
  let type;
  let hasPrimitive = false; // ensure we encounter 1+ primitives
  for (let i = 0; i < n; ++i) {
    const v = value[i];
    if (v == null) continue; // ignore null and undefined
    const t = typeof v;
    if (type === undefined) {
      switch (t) {
        case "number":
        case "boolean":
        case "string":
        case "bigint":
          type = t;
          break;
        default:
          return false;
      }
    } else if (t !== type) {
      return false;
    }
    hasPrimitive = true;
  }
  return hasPrimitive;
}

// Given an array, checks that the first n elements are dates.
function arrayContainsDates(value) {
  const n = Math.min(nChecks, value.length);
  if (!(n > 0)) return false;
  let hasDate = false; // ensure we encounter 1+ dates
  for (let i = 0; i < n; ++i) {
    const v = value[i];
    if (v == null) continue; // ignore null and undefined
    if (!(v instanceof Date)) return false;
    hasDate = true;
  }
  return hasDate;
}

function isTypedArray(value) {
  return (
    value instanceof Int8Array ||
    value instanceof Int16Array ||
    value instanceof Int32Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Uint16Array ||
    value instanceof Uint32Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
  );
}

// __query is used by table cells; __query.sql is used by SQL cells.
const __query = Object.assign(
  async (source, operations, invalidation, name) => {
    source = await loadTableDataSource(await source, name);
    if (isDatabaseClient(source)) return evaluateQuery(source, makeQueryTemplate(operations, source), invalidation);
    if (isDataArray(source)) return __table(source, operations);
    if (!source) throw new Error("missing data source");
    throw new Error("invalid data source");
  },
  {
    sql(source, invalidation, name) {
      return async function () {
        return evaluateQuery(await loadSqlDataSource(await source, name), arguments, invalidation);
      };
    }
  }
);

// We use a weak map to cache loaded data sources by key so that we don’t have
// to e.g. create separate SQLiteDatabaseClients every time we’re querying the
// same SQLite file attachment. Since this is a weak map, unused references will
// be garbage collected when they are no longer desired. Note: the name should
// be consistent, as it is not part of the cache key!
function sourceCache(loadSource) {
  const cache = new WeakMap();
  return (source, name) => {
    if (!source || typeof source !== "object") throw new Error("invalid data source");
    let promise = cache.get(source);
    if (!promise || (isDataArray(source) && source.length !== promise._numRows)) {
      // Warning: do not await here! We need to populate the cache synchronously.
      promise = loadSource(source, name);
      promise._numRows = source.length; // This will be undefined for DatabaseClients
      cache.set(source, promise);
    }
    return promise;
  };
}

const loadTableDataSource = sourceCache(async (source, name) => {
  if (source instanceof FileAttachment) {
    switch (source.mimeType) {
      case "text/csv": return source.csv();
      case "text/tab-separated-values": return source.tsv();
      case "application/json": return source.json();
      case "application/x-sqlite3": return source.sqlite();
    }
    if (/\.(arrow|parquet)$/i.test(source.name)) return loadDuckDBClient(source, name);
    throw new Error(`unsupported file type: ${source.mimeType}`);
  }
  if (isArrowTable(source) || isArqueroTable(source)) return loadDuckDBClient(source, name);
  if (isDataArray(source) && arrayIsPrimitive(source))
    return Array.from(source, (value) => ({value}));
  return source;
});

const loadSqlDataSource = sourceCache(async (source, name) => {
  if (source instanceof FileAttachment) {
    switch (source.mimeType) {
      case "text/csv":
      case "text/tab-separated-values":
      case "application/json": return loadDuckDBClient(source, name);
      case "application/x-sqlite3": return source.sqlite();
    }
    if (/\.(arrow|parquet)$/i.test(source.name)) return loadDuckDBClient(source, name);
    throw new Error(`unsupported file type: ${source.mimeType}`);
  }
  if (isDataArray(source)) return loadDuckDBClient(await asArrowTable(source, name), name);
  if (isArrowTable(source) || isArqueroTable(source)) return loadDuckDBClient(source, name);
  return source;
});

async function asArrowTable(array, name) {
  const arrow = await loadArrow();
  return arrayIsPrimitive(array)
    ? arrow.tableFromArrays({[name]: array})
    : arrow.tableFromJSON(array);
}

function loadDuckDBClient(
  source,
  name = source instanceof FileAttachment
    ? getFileSourceName(source)
    : "__table"
) {
  return DuckDBClient.of({[name]: source});
}

function getFileSourceName(file) {
  return file.name
    .replace(/@\d+(?=\.|$)/, "") // strip Observable file version number
    .replace(/\.\w+$/, ""); // strip file extension
}

async function evaluateQuery(source, args, invalidation) {
  if (!source) throw new Error("missing data source");

  // If this DatabaseClient supports abort and streaming, use that.
  if (typeof source.queryTag === "function") {
    const abortController = new AbortController();
    const options = {signal: abortController.signal};
    invalidation.then(() => abortController.abort("invalidated"));
    if (typeof source.queryStream === "function") {
      return accumulateQuery(
        source.queryStream(...source.queryTag.apply(source, args), options)
      );
    }
    if (typeof source.query === "function") {
      return source.query(...source.queryTag.apply(source, args), options);
    }
  }

  // Otherwise, fallback to the basic sql tagged template literal.
  if (typeof source.sql === "function") {
    return source.sql.apply(source, args);
  }

  // TODO: test if source is a file attachment, and support CSV etc.
  throw new Error("source does not implement query, queryStream, or sql");
}

// Generator function that yields accumulated query results client.queryStream
async function* accumulateQuery(queryRequest) {
  let then = performance.now();
  const queryResponse = await queryRequest;
  const values = [];
  values.done = false;
  values.error = null;
  values.schema = queryResponse.schema;
  try {
    for await (const rows of queryResponse.readRows()) {
      if (performance.now() - then > 150 && values.length > 0) {
        yield values;
        then = performance.now();
      }
      for (const value of rows) {
        values.push(value);
      }
    }
    values.done = true;
    yield values;
  } catch (error) {
    values.error = error;
    yield values;
  }
}

/**
 * Returns a SQL query in the form [[parts], ...params] where parts is an array
 * of sub-strings and params are the parameter values to be inserted between each
 * sub-string.
 */
function makeQueryTemplate(operations, source) {
  const escaper =
    typeof source.escape === "function" ? source.escape : (i) => i;
  const {select, from, filter, sort, slice} = operations;
  if (!from.table)
    throw new Error("missing from table");
  if (select.columns && select.columns.length === 0)
    throw new Error("at least one column must be selected");
  const names = new Map(operations.names?.map(({column, name}) => [column, name]));
  const columns = select.columns ? select.columns.map((column) =>  {
    const override = names.get(column);
    return override ? `${escaper(column)} AS ${escaper(override)}` : escaper(column);
  }).join(", ") : "*";
  const args = [
    [`SELECT ${columns} FROM ${formatTable(from.table, escaper)}`]
  ];
  for (let i = 0; i < filter.length; ++i) {
    appendSql(i ? `\nAND ` : `\nWHERE `, args);
    appendWhereEntry(filter[i], args, escaper);
  }
  for (let i = 0; i < sort.length; ++i) {
    appendSql(i ? `, ` : `\nORDER BY `, args);
    appendOrderBy(sort[i], args, escaper);
  }
  if (source.dialect === "mssql" || source.dialect === "oracle") {
    if (slice.to !== null || slice.from !== null) {
      if (!sort.length) {
        if (!select.columns)
          throw new Error(
              "at least one column must be explicitly specified. Received '*'."
          );
        appendSql(`\nORDER BY `, args);
        appendOrderBy(
          {column: select.columns[0], direction: "ASC"},
          args,
          escaper
        );
      }
      appendSql(`\nOFFSET ${slice.from || 0} ROWS`, args);
      appendSql(
        `\nFETCH NEXT ${
          slice.to !== null ? slice.to - (slice.from || 0) : 1e9
        } ROWS ONLY`,
        args
      );
    }
  } else {
    if (slice.to !== null || slice.from !== null) {
      appendSql(
        `\nLIMIT ${slice.to !== null ? slice.to - (slice.from || 0) : 1e9}`,
        args
      );
    }
    if (slice.from !== null) {
      appendSql(` OFFSET ${slice.from}`, args);
    }
  }
  return args;
}

function formatTable(table, escaper) {
  if (typeof table === "object") { // i.e., not a bare string specifier
    let from = "";
    if (table.database != null) from += escaper(table.database) + ".";
    if (table.schema != null) from += escaper(table.schema) + ".";
    from += escaper(table.table);
    return from;
  } else {
    return escaper(table);
  }
}

function appendSql(sql, args) {
  const strings = args[0];
  strings[strings.length - 1] += sql;
}

function appendOrderBy({column, direction}, args, escaper) {
  appendSql(`${escaper(column)} ${direction.toUpperCase()}`, args);
}

function appendWhereEntry({type, operands}, args, escaper) {
  if (operands.length < 1) throw new Error("Invalid operand length");

  // Unary operations
  // We treat `v` and `nv` as `NULL` and `NOT NULL` unary operations in SQL,
  // since the database already validates column types.
  if (operands.length === 1 || type === "v" || type === "nv") {
    appendOperand(operands[0], args, escaper);
    switch (type) {
      case "n":
      case "nv":
        appendSql(` IS NULL`, args);
        return;
      case "nn":
      case "v":
        appendSql(` IS NOT NULL`, args);
        return;
      default:
        throw new Error("Invalid filter operation");
    }
  }

  // Binary operations
  if (operands.length === 2) {
    if (["in", "nin"].includes(type)) ; else if (["c", "nc"].includes(type)) {
      // TODO: Case (in)sensitive?
      appendOperand(operands[0], args, escaper);
      switch (type) {
        case "c":
          appendSql(` LIKE `, args);
          break;
        case "nc":
          appendSql(` NOT LIKE `, args);
          break;
      }
      appendOperand(likeOperand(operands[1]), args, escaper);
      return;
    } else {
      appendOperand(operands[0], args, escaper);
      switch (type) {
        case "eq":
          appendSql(` = `, args);
          break;
        case "ne":
          appendSql(` <> `, args);
          break;
        case "gt":
          appendSql(` > `, args);
          break;
        case "lt":
          appendSql(` < `, args);
          break;
        case "gte":
          appendSql(` >= `, args);
          break;
        case "lte":
          appendSql(` <= `, args);
          break;
        default:
          throw new Error("Invalid filter operation");
      }
      appendOperand(operands[1], args, escaper);
      return;
    }
  }

  // List operations
  appendOperand(operands[0], args, escaper);
  switch (type) {
    case "in":
      appendSql(` IN (`, args);
      break;
    case "nin":
      appendSql(` NOT IN (`, args);
      break;
    default:
      throw new Error("Invalid filter operation");
  }
  appendListOperands(operands.slice(1), args);
  appendSql(")", args);
}

function appendOperand(o, args, escaper) {
  if (o.type === "column") {
    appendSql(escaper(o.value), args);
  } else {
    args.push(o.value);
    args[0].push("");
  }
}

// TODO: Support column operands here?
function appendListOperands(ops, args) {
  let first = true;
  for (const op of ops) {
    if (first) first = false;
    else appendSql(",", args);
    args.push(op.value);
    args[0].push("");
  }
}

function likeOperand(operand) {
  return {...operand, value: `%${operand.value}%`};
}

// Comparator function that moves null values (undefined, null, NaN) to the
// end of the array.
function defined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b));
}

// Comparator function that sorts values in ascending order, with null values at
// the end.
function ascendingDefined(a, b) {
  return defined(a, b) || (a < b ? -1 : a > b ? 1 : 0);
}

// Comparator function that sorts values in descending order, with null values
// at the end.
function descendingDefined(a, b) {
  return defined(a, b) || (a > b ? -1 : a < b ? 1 : 0);
}

// Functions for checking type validity
const isValidNumber = (value) => typeof value === "number" && !Number.isNaN(value);
const isValidInteger = (value) => Number.isInteger(value) && !Number.isNaN(value);
const isValidString = (value) => typeof value === "string";
const isValidBoolean = (value) => typeof value === "boolean";
const isValidBigint = (value) => typeof value === "bigint";
const isValidDate = (value) => value instanceof Date && !isNaN(value);
const isValidBuffer = (value) => value instanceof ArrayBuffer;
const isValidArray = (value) => Array.isArray(value);
const isValidObject = (value) => typeof value === "object" && value !== null;
const isValidOther = (value) => value != null;

// Function to get the correct validity checking function based on type
function getTypeValidator(colType) {
  switch (colType) {
    case "string":
      return isValidString;
    case "bigint":
      return isValidBigint;
    case "boolean":
      return isValidBoolean;
    case "number":
      return isValidNumber;
    case "integer":
      return isValidInteger;
    case "date":
      return isValidDate;
    case "buffer":
      return isValidBuffer;
    case "array":
      return isValidArray;
    case "object":
      return isValidObject;
    case "other":
    default:
      return isValidOther;
  }
}

// Accepts dates in the form of ISOString and LocaleDateString, with or without time
const DATE_TEST = /^(([-+]\d{2})?\d{4}(-\d{2}(-\d{2}))|(\d{1,2})\/(\d{1,2})\/(\d{2,4}))([T ]\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;

function coerceToType(value, type) {
  switch (type) {
    case "string":
      return typeof value === "string" || value == null ? value : String(value);
    case "boolean":
      if (typeof value === "string") {
        const trimValue = value.trim().toLowerCase();
        return trimValue === "true"
          ? true
          : trimValue === "false"
          ? false
          : null;
      }
      return typeof value === "boolean" || value == null
        ? value
        : Boolean(value);
    case "bigint":
      return typeof value === "bigint" || value == null
        ? value
        : Number.isInteger(typeof value === "string" && !value.trim() ? NaN : +value)
        ? BigInt(value) // eslint-disable-line no-undef
        : undefined;
    case "integer": // not a target type for coercion, but can be inferred
    case "number": {
      return typeof value === "number"
        ? value
        : value == null || (typeof value === "string" && !value.trim())
        ? NaN
        : Number(value);
    }
    case "date": {
      if (value instanceof Date || value == null) return value;
      if (typeof value === "number") return new Date(value);
      const trimValue = String(value).trim();
      if (typeof value === "string" && !trimValue) return null;
      return new Date(DATE_TEST.test(trimValue) ? trimValue : NaN);
    }
    case "array":
    case "object":
    case "buffer":
    case "other":
      return value;
    default:
      throw new Error(`Unable to coerce to type: ${type}`);
  }
}

function getSchema(source) {
  const {columns} = source;
  let {schema} = source;
  if (!isQueryResultSetSchema(schema)) {
    schema = inferSchema(source, isQueryResultSetColumns(columns) ? columns : undefined);
    return {schema, inferred: true};
  }
  return {schema, inferred: false};
}

// This function infers a schema from the source data, if one doesn't already
// exist, and merges type assertions into that schema. If the schema was
// inferred or if there are type assertions, it then coerces the rows in the
// source data to the types specified in the schema.
function applyTypes(source, operations) {
  const input = source;
  let {schema, inferred} = getSchema(source);
  const types = new Map(schema.map(({name, type}) => [name, type]));
  if (operations.types) {
    for (const {name, type} of operations.types) {
      types.set(name, type);
      // update schema with user-selected type
      if (schema === input.schema) schema = schema.slice(); // copy on write
      const colIndex = schema.findIndex((col) => col.name === name);
      if (colIndex > -1) schema[colIndex] = {...schema[colIndex], type};
    }
    source = source.map(d => coerceRow(d, types, schema));
  } else if (inferred) {
    // Coerce data according to new schema, unless that happened due to
    // operations.types, above.
    source = source.map(d => coerceRow(d, types, schema));
  }
  return {source, schema};
}

function applyNames(source, operations) {
  if (!operations.names) return source;
  const overridesByName = new Map(operations.names.map((n) => [n.column, n]));
  return source.map((d) =>
    Object.fromEntries(Object.keys(d).map((k) => {
      const override = overridesByName.get(k);
      return [override?.name ?? k, d[k]];
    }))
  );
}

// This function applies table cell operations to an in-memory table (array of
// objects); it should be equivalent to the corresponding SQL query. TODO Use
// DuckDBClient for data arrays, too, and then we wouldn’t need our own __table
// function to do table operations on in-memory data?
function __table(source, operations) {
  const errors = new Map();
  const input = source;
  const typed = applyTypes(source, operations);
  source = typed.source;
  let schema = typed.schema;
  if (operations.derive) {
    // Derived columns may depend on coerced values from the original data source,
    // so we must evaluate derivations after the initial inference and coercion
    // step.
    const derivedSource = [];
    operations.derive.map(({name, value}) => {
      let columnErrors = [];
      // Derived column formulas may reference renamed columns, so we must
      // compute derivations on the renamed source. However, we don't modify the
      // source itself with renamed names until after the other operations are
      // applied, because operations like filter and sort reference original
      // column names.
      // TODO Allow derived columns to reference other derived columns.
      applyNames(source, operations).map((row, index) => {
        let resolved;
        try {
          // TODO Support referencing `index` and `rows` in the derive function.
          resolved = value(row);
        } catch (error) {
          columnErrors.push({index, error});
          resolved = undefined;
        }
        if (derivedSource[index]) {
          derivedSource[index] = {...derivedSource[index], [name]: resolved};
        } else {
          derivedSource.push({[name]: resolved});
        }
      });
      if (columnErrors.length) errors.set(name, columnErrors);
    });
    // Since derived columns are untyped by default, we do a pass of type
    // inference and coercion after computing the derived values.
    const typedDerived = applyTypes(derivedSource, operations);
    // Merge derived source and schema with the source dataset.
    source = source.map((row, i) => ({...row, ...typedDerived.source[i]}));
    schema = [...schema, ...typedDerived.schema];
  }
  for (const {type, operands} of operations.filter) {
    const [{value: column}] = operands;
    const values = operands.slice(1).map(({value}) => value);
    switch (type) {
      // valid (matches the column type)
      case "v": {
        const [colType] = values;
        const isValid = getTypeValidator(colType);
        source = source.filter(d => isValid(d[column]));
        break;
      }
      // not valid (doesn't match the column type)
      case "nv": {
        const [colType] = values;
        const isValid = getTypeValidator(colType);
        source = source.filter(d => !isValid(d[column]));
        break;
      }
      case "eq": {
        const [value] = values;
        if (value instanceof Date) {
          const time = +value; // compare as primitive
          source = source.filter((d) => +d[column] === time);
        } else {
          source = source.filter((d) => d[column] === value);
        }
        break;
      }
      case "ne": {
        const [value] = values;
        source = source.filter((d) => d[column] !== value);
        break;
      }
      case "c": {
        const [value] = values;
        source = source.filter(
          (d) => typeof d[column] === "string" && d[column].includes(value)
        );
        break;
      }
      case "nc": {
        const [value] = values;
        source = source.filter(
          (d) => typeof d[column] === "string" && !d[column].includes(value)
        );
        break;
      }
      case "in": {
        const set = new Set(values); // TODO support dates?
        source = source.filter((d) => set.has(d[column]));
        break;
      }
      case "nin": {
        const set = new Set(values); // TODO support dates?
        source = source.filter((d) => !set.has(d[column]));
        break;
      }
      case "n": {
        source = source.filter((d) => d[column] == null);
        break;
      }
      case "nn": {
        source = source.filter((d) => d[column] != null);
        break;
      }
      case "lt": {
        const [value] = values;
        source = source.filter((d) => d[column] < value);
        break;
      }
      case "lte": {
        const [value] = values;
        source = source.filter((d) => d[column] <= value);
        break;
      }
      case "gt": {
        const [value] = values;
        source = source.filter((d) => d[column] > value);
        break;
      }
      case "gte": {
        const [value] = values;
        source = source.filter((d) => d[column] >= value);
        break;
      }
      default:
        throw new Error(`unknown filter type: ${type}`);
    }
  }
  for (const {column, direction} of reverse(operations.sort)) {
    const compare = direction === "desc" ? descendingDefined : ascendingDefined;
    if (source === input) source = source.slice(); // defensive copy
    source.sort((a, b) => compare(a[column], b[column]));
  }
  let {from, to} = operations.slice;
  from = from == null ? 0 : Math.max(0, from);
  to = to == null ? Infinity : Math.max(0, to);
  if (from > 0 || to < Infinity) {
    source = source.slice(Math.max(0, from), Math.max(0, to));
  }
  // Preserve the schema for all columns.
  let fullSchema = schema.slice();
  if (operations.select.columns) {
    if (schema) {
      const schemaByName = new Map(schema.map((s) => [s.name, s]));
      schema = operations.select.columns.map((c) => schemaByName.get(c));
    }
    source = source.map((d) =>
      Object.fromEntries(operations.select.columns.map((c) => [c, d[c]]))
    );
  }
  if (operations.names) {
    const overridesByName = new Map(operations.names.map((n) => [n.column, n]));
    if (schema) {
      schema = schema.map((s) => {
        const override = overridesByName.get(s.name);
        return ({...s, ...(override ? {name: override.name} : null)});
      });
    }
    if (fullSchema) {
      fullSchema = fullSchema.map((s) => {
        const override = overridesByName.get(s.name);
        return ({...s, ...(override ? {name: override.name} : null)});
      });
    }
    source = applyNames(source, operations);
  }
  if (source !== input) {
    if (schema) source.schema = schema;
  }
  source.fullSchema = fullSchema;
  source.errors = errors;
  return source;
}

function coerceRow(object, types, schema) {
  const coerced = {};
  for (const col of schema) {
    const type = types.get(col.name);
    const value = object[col.name];
    coerced[col.name] = type === "raw" ? value : coerceToType(value, type);
  }
  return coerced;
}

function createTypeCount() {
  return {
    boolean: 0,
    integer: 0,
    number: 0,
    date: 0,
    string: 0,
    array: 0,
    object: 0,
    bigint: 0,
    buffer: 0,
    defined: 0
  };
}

// Caution: the order below matters! 🌶️ The first one that passes the ≥90% test
// should be the one that we chose, and therefore these types should be listed
// from most specific to least specific.
const types = [
  "boolean",
  "integer",
  "number",
  "date",
  "bigint",
  "array",
  "object",
  "buffer"
  // Note: "other" and "string" are intentionally omitted; see below!
];

// We need to show *all* keys present in the array of Objects
function getAllKeys(rows) {
  const keys = new Set();
  for (const row of rows) {
    // avoid crash if row is null or undefined
    if (row) {
      // only enumerable properties
      for (const key in row) {
        // only own properties
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          // unique properties, in the order they appear
          keys.add(key);
        }
      }
    }
  }
  return Array.from(keys);
}

function inferSchema(source, columns = getAllKeys(source)) {
  const schema = [];
  const sampleSize = 100;
  const sample = source.slice(0, sampleSize);
  for (const col of columns) {
    const colCount = createTypeCount();
    for (const d of sample) {
      let value = d[col];
      if (value == null) continue;
      const type = typeof value;
      if (type !== "string") {
        ++colCount.defined;
        if (Array.isArray(value)) ++colCount.array;
        else if (value instanceof Date) ++colCount.date;
        else if (value instanceof ArrayBuffer) ++colCount.buffer;
        else if (type === "number") {
          ++colCount.number;
          if (Number.isInteger(value)) ++colCount.integer;
        }
        // bigint, boolean, or object
        else if (type in colCount) ++colCount[type];
      } else {
        value = value.trim();
        if (!value) continue;
        ++colCount.defined;
        ++colCount.string;
        if (/^(true|false)$/i.test(value)) {
          ++colCount.boolean;
        } else if (value && !isNaN(value)) {
          ++colCount.number;
          if (Number.isInteger(+value)) ++colCount.integer;
        } else if (DATE_TEST.test(value)) ++colCount.date;
      }
    }
    // Chose the non-string, non-other type with the greatest count that is also
    // ≥90%; or if no such type meets that criterion, fallback to string if
    // ≥90%; and lastly fallback to other.
    const minCount = Math.max(1, colCount.defined * 0.9);
    const type =
      greatest(types, (type) =>
        colCount[type] >= minCount ? colCount[type] : NaN
      ) ?? (colCount.string >= minCount ? "string" : "other");
    schema.push({
      name: col,
      type: type,
      inferred: type
    });
  }
  return schema;
}

class Workbook {
  constructor(workbook) {
    Object.defineProperties(this, {
      _: {value: workbook},
      sheetNames: {
        value: workbook.worksheets.map((s) => s.name),
        enumerable: true
      }
    });
  }
  sheet(name, options) {
    const sname =
      typeof name === "number"
        ? this.sheetNames[name]
        : this.sheetNames.includes((name += ""))
        ? name
        : null;
    if (sname == null) throw new Error(`Sheet not found: ${name}`);
    const sheet = this._.getWorksheet(sname);
    return extract(sheet, options);
  }
}

function extract(sheet, {range, headers} = {}) {
  let [[c0, r0], [c1, r1]] = parseRange(range, sheet);
  const headerRow = headers ? sheet._rows[r0++] : null;
  let names = new Set(["#"]);
  for (let n = c0; n <= c1; n++) {
    const value = headerRow ? valueOf(headerRow.findCell(n + 1)) : null;
    let name = (value && value + "") || toColumn(n);
    while (names.has(name)) name += "_";
    names.add(name);
  }
  names = new Array(c0).concat(Array.from(names));

  const output = new Array(r1 - r0 + 1);
  for (let r = r0; r <= r1; r++) {
    const row = (output[r - r0] = Object.create(null, {"#": {value: r + 1}}));
    const _row = sheet.getRow(r + 1);
    if (_row.hasValues)
      for (let c = c0; c <= c1; c++) {
        const value = valueOf(_row.findCell(c + 1));
        if (value != null) row[names[c + 1]] = value;
      }
  }

  output.columns = names.filter(() => true); // Filter sparse columns
  return output;
}

function valueOf(cell) {
  if (!cell) return;
  const {value} = cell;
  if (value && typeof value === "object" && !(value instanceof Date)) {
    if (value.formula || value.sharedFormula) {
      return value.result && value.result.error ? NaN : value.result;
    }
    if (value.richText) {
      return richText(value);
    }
    if (value.text) {
      let {text} = value;
      if (text.richText) text = richText(text);
      return value.hyperlink && value.hyperlink !== text
        ? `${value.hyperlink} ${text}`
        : text;
    }
    return value;
  }
  return value;
}

function richText(value) {
  return value.richText.map((d) => d.text).join("");
}

function parseRange(specifier = ":", {columnCount, rowCount}) {
  specifier += "";
  if (!specifier.match(/^[A-Z]*\d*:[A-Z]*\d*$/))
    throw new Error("Malformed range specifier");
  const [[c0 = 0, r0 = 0], [c1 = columnCount - 1, r1 = rowCount - 1]] =
    specifier.split(":").map(fromCellReference);
  return [
    [c0, r0],
    [c1, r1]
  ];
}

// Returns the default column name for a zero-based column index.
// For example: 0 -> "A", 1 -> "B", 25 -> "Z", 26 -> "AA", 27 -> "AB".
function toColumn(c) {
  let sc = "";
  c++;
  do {
    sc = String.fromCharCode(64 + (c % 26 || 26)) + sc;
  } while ((c = Math.floor((c - 1) / 26)));
  return sc;
}

// Returns the zero-based indexes from a cell reference.
// For example: "A1" -> [0, 0], "B2" -> [1, 1], "AA10" -> [26, 9].
function fromCellReference(s) {
  const [, sc, sr] = s.match(/^([A-Z]*)(\d*)$/);
  let c = 0;
  if (sc)
    for (let i = 0; i < sc.length; i++)
      c += Math.pow(26, sc.length - i - 1) * (sc.charCodeAt(i) - 64);
  return [c ? c - 1 : undefined, sr ? +sr - 1 : undefined];
}

async function remote_fetch(file) {
  const response = await fetch(await file.url());
  if (!response.ok) throw new Error(`Unable to load file: ${file.name}`);
  return response;
}

function enforceSchema(source, schema) {
  const types = new Map(schema.map(({name, type}) => [name, type]));
  return Object.assign(source.map(d => coerceRow(d, types, schema)), {schema});
}

async function dsv(file, delimiter, {array = false, typed = false} = {}) {
  const text = await file.text();
  const parse = (delimiter === "\t"
    ? (array ? tsvParseRows : tsvParse)
    : (array ? csvParseRows : csvParse));
  if (typed === "auto" && !array) {
    const source = parse(text);
    return enforceSchema(source, inferSchema(source, source.columns));
  }
  return parse(text, typed && autoType);
}

class AbstractFile {
  constructor(name, mimeType) {
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    if (mimeType !== undefined) Object.defineProperty(this, "mimeType", {value: mimeType + "", enumerable: true});
  }
  async blob() {
    return (await remote_fetch(this)).blob();
  }
  async arrayBuffer() {
    return (await remote_fetch(this)).arrayBuffer();
  }
  async text() {
    return (await remote_fetch(this)).text();
  }
  async json() {
    return (await remote_fetch(this)).json();
  }
  async stream() {
    return (await remote_fetch(this)).body;
  }
  async csv(options) {
    return dsv(this, ",", options);
  }
  async tsv(options) {
    return dsv(this, "\t", options);
  }
  async image(props) {
    const url = await this.url();
    return new Promise((resolve, reject) => {
      const i = new Image();
      if (new URL(url, document.baseURI).origin !== new URL(location).origin) {
        i.crossOrigin = "anonymous";
      }
      Object.assign(i, props);
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error(`Unable to load file: ${this.name}`));
      i.src = url;
    });
  }
  async arrow({version = 4} = {}) {
    switch (version) {
      case 4: {
        const [Arrow, response] = await Promise.all([requireDefault(arrow4.resolve()), remote_fetch(this)]);
        return Arrow.Table.from(response);
      }
      case 9: {
        const [Arrow, response] = await Promise.all([import(`${cdn}${arrow9.resolve()}`), remote_fetch(this)]);
        return Arrow.tableFromIPC(response);
      }
      case 11: {
        const [Arrow, response] = await Promise.all([import(`${cdn}${arrow11.resolve()}`), remote_fetch(this)]);
        return Arrow.tableFromIPC(response);
      }
      default: throw new Error(`unsupported arrow version: ${version}`);
    }
  }
  async sqlite() {
    return SQLiteDatabaseClient.open(remote_fetch(this));
  }
  async zip() {
    const [JSZip, buffer] = await Promise.all([requireDefault(jszip.resolve()), this.arrayBuffer()]);
    return new ZipArchive(await JSZip.loadAsync(buffer));
  }
  async xml(mimeType = "application/xml") {
    return (new DOMParser).parseFromString(await this.text(), mimeType);
  }
  async html() {
    return this.xml("text/html");
  }
  async xlsx() {
    const [ExcelJS, buffer] = await Promise.all([requireDefault(exceljs.resolve()), this.arrayBuffer()]);
    return new Workbook(await new ExcelJS.Workbook().xlsx.load(buffer));
  }
}

class FileAttachment extends AbstractFile {
  constructor(url, name, mimeType) {
    super(name, mimeType);
    Object.defineProperty(this, "_url", {value: url});
  }
  async url() {
    return (await this._url) + "";
  }
}

function NoFileAttachments(name) {
  throw new Error(`File not found: ${name}`);
}

function FileAttachments(resolve) {
  return Object.assign(
    name => {
      const result = resolve(name += "");
      if (result == null) throw new Error(`File not found: ${name}`);
      if (typeof result === "object" && "url" in result) {
        const {url, mimeType} = result;
        return new FileAttachment(url, name, mimeType);
      }
      return new FileAttachment(result, name);
    },
    {prototype: FileAttachment.prototype} // instanceof
  );
}

class ZipArchive {
  constructor(archive) {
    Object.defineProperty(this, "_", {value: archive});
    this.filenames = Object.keys(archive.files).filter(name => !archive.files[name].dir);
  }
  file(path) {
    const object = this._.file(path += "");
    if (!object || object.dir) throw new Error(`file not found: ${path}`);
    return new ZipArchiveEntry(object);
  }
}

class ZipArchiveEntry extends AbstractFile {
  constructor(object) {
    super(object.name);
    Object.defineProperty(this, "_", {value: object});
    Object.defineProperty(this, "_url", {writable: true});
  }
  async url() {
    return this._url || (this._url = this.blob().then(URL.createObjectURL));
  }
  async blob() {
    return this._.async("blob");
  }
  async arrayBuffer() {
    return this._.async("arraybuffer");
  }
  async text() {
    return this._.async("text");
  }
  async json() {
    return JSON.parse(await this.text());
  }
}

function canvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function context2d(width, height, dpi) {
  if (dpi == null) dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  var context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}

function download(value, name = "untitled", label = "Save") {
  const a = document.createElement("a");
  const b = a.appendChild(document.createElement("button"));
  b.textContent = label;
  a.download = name;

  async function reset() {
    await new Promise(requestAnimationFrame);
    URL.revokeObjectURL(a.href);
    a.removeAttribute("href");
    b.textContent = label;
    b.disabled = false;
  }

  a.onclick = async event => {
    b.disabled = true;
    if (a.href) return reset(); // Already saved.
    b.textContent = "Saving…";
    try {
      const object = await (typeof value === "function" ? value() : value);
      b.textContent = "Download";
      a.href = URL.createObjectURL(object); // eslint-disable-line require-atomic-updates
    } catch (ignore) {
      b.textContent = label;
    }
    if (event.eventPhase) return reset(); // Already downloaded.
    b.disabled = false;
  };

  return a;
}

var namespaces = {
  math: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function element(name, attributes) {
  var prefix = name += "", i = prefix.indexOf(":"), value;
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  var element = namespaces.hasOwnProperty(prefix) // eslint-disable-line no-prototype-builtins
      ? document.createElementNS(namespaces[prefix], name)
      : document.createElement(name);
  if (attributes) for (var key in attributes) {
    prefix = key, i = prefix.indexOf(":"), value = attributes[key];
    if (i >= 0 && (prefix = key.slice(0, i)) !== "xmlns") key = key.slice(i + 1);
    if (namespaces.hasOwnProperty(prefix)) element.setAttributeNS(namespaces[prefix], key, value); // eslint-disable-line no-prototype-builtins
    else element.setAttribute(key, value);
  }
  return element;
}

function input$1(type) {
  var input = document.createElement("input");
  if (type != null) input.type = type;
  return input;
}

function range$1(min, max, step) {
  if (arguments.length === 1) max = min, min = null;
  var input = document.createElement("input");
  input.min = min = min == null ? 0 : +min;
  input.max = max = max == null ? 1 : +max;
  input.step = step == null ? "any" : step = +step;
  input.type = "range";
  return input;
}

function select(values) {
  var select = document.createElement("select");
  Array.prototype.forEach.call(values, function(value) {
    var option = document.createElement("option");
    option.value = option.textContent = value;
    select.appendChild(option);
  });
  return select;
}

function svg$1(width, height) {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", [0, 0, width, height]);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  return svg;
}

function text$1(value) {
  return document.createTextNode(value);
}

var count = 0;

function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};

var DOM = /*#__PURE__*/Object.freeze({
  __proto__: null,
  canvas: canvas,
  context2d: context2d,
  download: download,
  element: element,
  input: input$1,
  range: range$1,
  select: select,
  svg: svg$1,
  text: text$1,
  uid: uid
});

function buffer(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader;
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function text(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader;
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function url(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader;
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

var Files = /*#__PURE__*/Object.freeze({
  __proto__: null,
  buffer: buffer,
  text: text,
  url: url
});

function that() {
  return this;
}

function disposable(value, dispose) {
  let done = false;
  if (typeof dispose !== "function") {
    throw new Error("dispose is not a function");
  }
  return {
    [Symbol.iterator]: that,
    next: () => done ? {done: true} : (done = true, {done: false, value}),
    return: () => (done = true, dispose(value), {done: true}),
    throw: () => ({done: done = true})
  };
}

function* filter(iterator, test) {
  var result, index = -1;
  while (!(result = iterator.next()).done) {
    if (test(result.value, ++index)) {
      yield result.value;
    }
  }
}

function observe(initialize) {
  let stale = false;
  let value;
  let resolve;
  const dispose = initialize(change);

  if (dispose != null && typeof dispose !== "function") {
    throw new Error(typeof dispose.then === "function"
        ? "async initializers are not supported"
        : "initializer returned something, but not a dispose function");
  }

  function change(x) {
    if (resolve) resolve(x), resolve = null;
    else stale = true;
    return value = x;
  }

  function next() {
    return {done: false, value: stale
        ? (stale = false, Promise.resolve(value))
        : new Promise(_ => (resolve = _))};
  }

  return {
    [Symbol.iterator]: that,
    throw: () => ({done: true}),
    return: () => (dispose != null && dispose(), {done: true}),
    next
  };
}

function input(input) {
  return observe(function(change) {
    var event = eventof(input), value = valueof(input);
    function inputted() { change(valueof(input)); }
    input.addEventListener(event, inputted);
    if (value !== undefined) change(value);
    return function() { input.removeEventListener(event, inputted); };
  });
}

function valueof(input) {
  switch (input.type) {
    case "range":
    case "number": return input.valueAsNumber;
    case "date": return input.valueAsDate;
    case "checkbox": return input.checked;
    case "file": return input.multiple ? input.files : input.files[0];
    case "select-multiple": return Array.from(input.selectedOptions, o => o.value);
    default: return input.value;
  }
}

function eventof(input) {
  switch (input.type) {
    case "button":
    case "submit":
    case "checkbox": return "click";
    case "file": return "change";
    default: return "input";
  }
}

function* map$1(iterator, transform) {
  var result, index = -1;
  while (!(result = iterator.next()).done) {
    yield transform(result.value, ++index);
  }
}

function queue(initialize) {
  let resolve;
  const queue = [];
  const dispose = initialize(push);

  if (dispose != null && typeof dispose !== "function") {
    throw new Error(typeof dispose.then === "function"
        ? "async initializers are not supported"
        : "initializer returned something, but not a dispose function");
  }

  function push(x) {
    queue.push(x);
    if (resolve) resolve(queue.shift()), resolve = null;
    return x;
  }

  function next() {
    return {done: false, value: queue.length
        ? Promise.resolve(queue.shift())
        : new Promise(_ => (resolve = _))};
  }

  return {
    [Symbol.iterator]: that,
    throw: () => ({done: true}),
    return: () => (dispose != null && dispose(), {done: true}),
    next
  };
}

function* range(start, stop, step) {
  start = +start;
  stop = +stop;
  step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0;
  while (++i < n) {
    yield start + i * step;
  }
}

function valueAt(iterator, i) {
  if (!isFinite(i = +i) || i < 0 || i !== i | 0) return;
  var result, index = -1;
  while (!(result = iterator.next()).done) {
    if (++index === i) {
      return result.value;
    }
  }
}

function worker(source) {
  const url = URL.createObjectURL(new Blob([source], {type: "text/javascript"}));
  const worker = new Worker(url);
  return disposable(worker, () => {
    worker.terminate();
    URL.revokeObjectURL(url);
  });
}

var Generators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  disposable: disposable,
  filter: filter,
  input: input,
  map: map$1,
  observe: observe,
  queue: queue,
  range: range,
  valueAt: valueAt,
  worker: worker
});

function template(render, wrapper) {
  return function(strings) {
    var string = strings[0],
        parts = [], part,
        root = null,
        node, nodes,
        walker,
        i, n, j, m, k = -1;

    // Concatenate the text using comments as placeholders.
    for (i = 1, n = arguments.length; i < n; ++i) {
      part = arguments[i];
      if (part instanceof Node) {
        parts[++k] = part;
        string += "<!--o:" + k + "-->";
      } else if (Array.isArray(part)) {
        for (j = 0, m = part.length; j < m; ++j) {
          node = part[j];
          if (node instanceof Node) {
            if (root === null) {
              parts[++k] = root = document.createDocumentFragment();
              string += "<!--o:" + k + "-->";
            }
            root.appendChild(node);
          } else {
            root = null;
            string += node;
          }
        }
        root = null;
      } else {
        string += part;
      }
      string += strings[i];
    }

    // Render the text.
    root = render(string);

    // Walk the rendered content to replace comment placeholders.
    if (++k > 0) {
      nodes = new Array(k);
      walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null, false);
      while (walker.nextNode()) {
        node = walker.currentNode;
        if (/^o:/.test(node.nodeValue)) {
          nodes[+node.nodeValue.slice(2)] = node;
        }
      }
      for (i = 0; i < k; ++i) {
        if (node = nodes[i]) {
          node.parentNode.replaceChild(parts[i], node);
        }
      }
    }

    // Is the rendered content
    // … a parent of a single child? Detach and return the child.
    // … a document fragment? Replace the fragment with an element.
    // … some other node? Return it.
    return root.childNodes.length === 1 ? root.removeChild(root.firstChild)
        : root.nodeType === 11 ? ((node = wrapper()).appendChild(root), node)
        : root;
  };
}

const html$1 = template(function(string) {
  var template = document.createElement("template");
  template.innerHTML = string.trim();
  return document.importNode(template.content, true);
}, function() {
  return document.createElement("span");
});

async function leaflet(require) {
  const L = await require(leaflet$1.resolve());
  if (!L._style) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = await require.resolve(leaflet$1.resolve("dist/leaflet.css"));
    L._style = document.head.appendChild(link);
  }
  return L;
}

function md(require) {
  return require(marked.resolve()).then(function(marked) {
    return template(
      function(string) {
        var root = document.createElement("div");
        root.innerHTML = marked(string, {langPrefix: ""}).trim();
        var code = root.querySelectorAll("pre code[class]");
        if (code.length > 0) {
          require(highlight.resolve()).then(function(hl) {
            code.forEach(function(block) {
              function done() {
                hl.highlightBlock(block);
                block.parentNode.classList.add("observablehq--md-pre");
              }
              if (hl.getLanguage(block.className)) {
                done();
              } else {
                require(highlight.resolve("async-languages/index.js"))
                  .then(index => {
                    if (index.has(block.className)) {
                      return require(highlight.resolve("async-languages/" + index.get(block.className))).then(language => {
                        hl.registerLanguage(block.className, language);
                      });
                    }
                  })
                  .then(done, done);
              }
            });
          });
        }
        return root;
      },
      function() {
        return document.createElement("div");
      }
    );
  });
}

async function mermaid(require) {
  const mer = await require(mermaid$1.resolve());
  mer.initialize({securityLevel: "loose", theme: "neutral"});
  return function mermaid() {
    const root = document.createElement("div");
    root.innerHTML = mer.render(uid().id, String.raw.apply(String, arguments));
    return root.removeChild(root.firstChild);
  };
}

function Mutable(value) {
  let change;
  Object.defineProperties(this, {
    generator: {value: observe(_ => void (change = _))},
    value: {get: () => value, set: x => change(value = x)} // eslint-disable-line no-setter-return
  });
  if (value !== undefined) change(value);
}

function* now() {
  while (true) {
    yield Date.now();
  }
}

function delay(duration, value) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value);
    }, duration);
  });
}

var timeouts = new Map;

function timeout(now, time) {
  var t = new Promise(function(resolve) {
    timeouts.delete(time);
    var delay = time - now;
    if (!(delay > 0)) throw new Error("invalid time");
    if (delay > 0x7fffffff) throw new Error("too long to wait");
    setTimeout(resolve, delay);
  });
  timeouts.set(time, t);
  return t;
}

function when(time, value) {
  var now;
  return (now = timeouts.get(time = +time)) ? now.then(() => value)
      : (now = Date.now()) >= time ? Promise.resolve(value)
      : timeout(now, time).then(() => value);
}

function tick(duration, value) {
  return when(Math.ceil((Date.now() + 1) / duration) * duration, value);
}

var Promises = /*#__PURE__*/Object.freeze({
  __proto__: null,
  delay: delay,
  tick: tick,
  when: when
});

function resolve(name, base) {
  if (/^(\w+:)|\/\//i.test(name)) return name;
  if (/^[.]{0,2}\//i.test(name)) return new URL(name, base == null ? location : base).href;
  if (!name.length || /^[\s._]/.test(name) || /\s$/.test(name)) throw new Error("illegal name");
  return "https://unpkg.com/" + name;
}

const svg = template(function(string) {
  var root = document.createElementNS("http://www.w3.org/2000/svg", "g");
  root.innerHTML = string.trim();
  return root;
}, function() {
  return document.createElementNS("http://www.w3.org/2000/svg", "g");
});

var raw = String.raw;

function style(href) {
  return new Promise(function(resolve, reject) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onerror = reject;
    link.onload = resolve;
    document.head.appendChild(link);
  });
}

function tex(require) {
  return Promise.all([
    require(katex.resolve()),
    require.resolve(katex.resolve("dist/katex.min.css")).then(style)
  ]).then(function(values) {
    var katex = values[0], tex = renderer();

    function renderer(options) {
      return function() {
        var root = document.createElement("div");
        katex.render(raw.apply(String, arguments), root, options);
        return root.removeChild(root.firstChild);
      };
    }

    tex.options = renderer;
    tex.block = renderer({displayMode: true});
    return tex;
  });
}

async function vl(require) {
  const [v, vl, api] = await Promise.all([vega, vegalite, vegaliteApi].map(d => require(d.resolve())));
  return api.register(v, vl);
}

function width() {
  return observe(function(change) {
    var width = change(document.body.clientWidth);
    function resized() {
      var w = document.body.clientWidth;
      if (w !== width) change(width = w);
    }
    window.addEventListener("resize", resized);
    return function() {
      window.removeEventListener("resize", resized);
    };
  });
}

const Library = Object.assign(Object.defineProperties(function Library(resolver) {
  const require = requirer(resolver);
  Object.defineProperties(this, properties({
    FileAttachment: () => NoFileAttachments,
    Mutable: () => Mutable,
    now,
    width,

    // Tagged template literals
    dot: () => require(graphviz.resolve()),
    htl: () => require(htl.resolve()),
    html: () => html$1,
    md: () => md(require),
    svg: () => svg,
    tex: () => tex(require),

    // Recommended libraries
    // https://observablehq.com/@observablehq/recommended-libraries
    _: () => require(lodash.resolve()),
    aq: () => require.alias({"apache-arrow": arrow4.resolve()})(arquero.resolve()), // TODO upgrade to apache-arrow@9
    Arrow: () => require(arrow4.resolve()), // TODO upgrade to apache-arrow@9
    d3: () => require(d3.resolve()),
    DuckDBClient: () => DuckDBClient,
    Inputs: () => require(inputs.resolve()).then(Inputs => ({...Inputs, file: Inputs.fileOf(AbstractFile)})),
    L: () => leaflet(require),
    mermaid: () => mermaid(require),
    Plot: () => require(plot.resolve()),
    __query: () => __query,
    require: () => require,
    resolve: () => resolve, // deprecated; use async require.resolve instead
    SQLite: () => SQLite(require),
    SQLiteDatabaseClient: () => SQLiteDatabaseClient,
    topojson: () => require(topojson.resolve()),
    vl: () => vl(require),

    // Sample datasets
    // https://observablehq.com/@observablehq/sample-datasets
    aapl: () => new FileAttachment("https://static.observableusercontent.com/files/3ccff97fd2d93da734e76829b2b066eafdaac6a1fafdec0faf6ebc443271cfc109d29e80dd217468fcb2aff1e6bffdc73f356cc48feb657f35378e6abbbb63b9").csv({typed: true}),
    alphabet: () => new FileAttachment("https://static.observableusercontent.com/files/75d52e6c3130b1cae83cda89305e17b50f33e7420ef205587a135e8562bcfd22e483cf4fa2fb5df6dff66f9c5d19740be1cfaf47406286e2eb6574b49ffc685d").csv({typed: true}),
    cars: () => new FileAttachment("https://static.observableusercontent.com/files/048ec3dfd528110c0665dfa363dd28bc516ffb7247231f3ab25005036717f5c4c232a5efc7bb74bc03037155cb72b1abe85a33d86eb9f1a336196030443be4f6").csv({typed: true}),
    citywages: () => new FileAttachment("https://static.observableusercontent.com/files/39837ec5121fcc163131dbc2fe8c1a2e0b3423a5d1e96b5ce371e2ac2e20a290d78b71a4fb08b9fa6a0107776e17fb78af313b8ea70f4cc6648fad68ddf06f7a").csv({typed: true}),
    diamonds: () => new FileAttachment("https://static.observableusercontent.com/files/87942b1f5d061a21fa4bb8f2162db44e3ef0f7391301f867ab5ba718b225a63091af20675f0bfe7f922db097b217b377135203a7eab34651e21a8d09f4e37252").csv({typed: true}),
    flare: () => new FileAttachment("https://static.observableusercontent.com/files/a6b0d94a7f5828fd133765a934f4c9746d2010e2f342d335923991f31b14120de96b5cb4f160d509d8dc627f0107d7f5b5070d2516f01e4c862b5b4867533000").csv({typed: true}),
    industries: () => new FileAttachment("https://static.observableusercontent.com/files/76f13741128340cc88798c0a0b7fa5a2df8370f57554000774ab8ee9ae785ffa2903010cad670d4939af3e9c17e5e18e7e05ed2b38b848ac2fc1a0066aa0005f").csv({typed: true}),
    miserables: () => new FileAttachment("https://static.observableusercontent.com/files/31d904f6e21d42d4963ece9c8cc4fbd75efcbdc404bf511bc79906f0a1be68b5a01e935f65123670ed04e35ca8cae3c2b943f82bf8db49c5a67c85cbb58db052").json(),
    olympians: () => new FileAttachment("https://static.observableusercontent.com/files/31ca24545a0603dce099d10ee89ee5ae72d29fa55e8fc7c9ffb5ded87ac83060d80f1d9e21f4ae8eb04c1e8940b7287d179fe8060d887fb1f055f430e210007c").csv({typed: true}),
    penguins: () => new FileAttachment("https://static.observableusercontent.com/files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a").csv({typed: true}),
    pizza: () => new FileAttachment("https://static.observableusercontent.com/files/c653108ab176088cacbb338eaf2344c4f5781681702bd6afb55697a3f91b511c6686ff469f3e3a27c75400001a2334dbd39a4499fe46b50a8b3c278b7d2f7fb5").csv({typed: true}),
    weather: () => new FileAttachment("https://static.observableusercontent.com/files/693a46b22b33db0f042728700e0c73e836fa13d55446df89120682d55339c6db7cc9e574d3d73f24ecc9bc7eb9ac9a1e7e104a1ee52c00aab1e77eb102913c1f").csv({typed: true}),

    // Note: these are namespace objects, and thus exposed directly rather than
    // being wrapped in a function. This allows library.Generators to resolve,
    // rather than needing module.value.
    DOM,
    Files,
    Generators,
    Promises
  }));
}, {
  resolve: {
    get: () => requireDefault.resolve,
    enumerable: true,
    configurable: true
  },
  require: {
    get: () => requireDefault,
    set: setDefaultRequire,
    enumerable: true,
    configurable: true
  }
}), {
  resolveFrom,
  requireFrom
});

function properties(values) {
  return Object.fromEntries(Object.entries(values).map(property));
}

function property([key, value]) {
  return [key, ({value, writable: true, enumerable: true})];
}

class RuntimeError extends Error {
  constructor(message, input) {
    super(message);
    this.input = input;
  }
}

RuntimeError.prototype.name = "RuntimeError";

function generatorish(value) {
  return value
      && typeof value.next === "function"
      && typeof value.return === "function";
}

function constant(x) {
  return () => x;
}

function identity(x) {
  return x;
}

function rethrow(error) {
  return () => {
    throw error;
  };
}

const prototype = Array.prototype;
const map = prototype.map;

function noop() {}

const TYPE_NORMAL = 1; // a normal variable
const TYPE_IMPLICIT = 2; // created on reference
const TYPE_DUPLICATE = 3; // created on duplicate definition

const no_observer = Symbol("no-observer");

function Variable(type, module, observer, options) {
  if (!observer) observer = no_observer;
  Object.defineProperties(this, {
    _observer: {value: observer, writable: true},
    _definition: {value: variable_undefined, writable: true},
    _duplicate: {value: undefined, writable: true},
    _duplicates: {value: undefined, writable: true},
    _indegree: {value: NaN, writable: true}, // The number of computing inputs.
    _inputs: {value: [], writable: true},
    _invalidate: {value: noop, writable: true},
    _module: {value: module},
    _name: {value: null, writable: true},
    _outputs: {value: new Set, writable: true},
    _promise: {value: Promise.resolve(undefined), writable: true},
    _reachable: {value: observer !== no_observer, writable: true}, // Is this variable transitively visible?
    _rejector: {value: variable_rejector(this)},
    _shadow: {value: initShadow(module, options)},
    _type: {value: type},
    _value: {value: undefined, writable: true},
    _version: {value: 0, writable: true}
  });
}

Object.defineProperties(Variable.prototype, {
  _pending: {value: variable_pending, writable: true, configurable: true},
  _fulfilled: {value: variable_fulfilled, writable: true, configurable: true},
  _rejected: {value: variable_rejected, writable: true, configurable: true},
  _resolve: {value: variable_resolve, writable: true, configurable: true},
  define: {value: variable_define, writable: true, configurable: true},
  delete: {value: variable_delete, writable: true, configurable: true},
  import: {value: variable_import, writable: true, configurable: true}
});

function initShadow(module, options) {
  if (!options?.shadow) return null;
  return new Map(
    Object.entries(options.shadow)
      .map(([name, definition]) => [name, (new Variable(TYPE_IMPLICIT, module)).define([], definition)])
  );
}

function variable_attach(variable) {
  variable._module._runtime._dirty.add(variable);
  variable._outputs.add(this);
}

function variable_detach(variable) {
  variable._module._runtime._dirty.add(variable);
  variable._outputs.delete(this);
}

function variable_undefined() {
  throw variable_undefined;
}

function variable_stale() {
  throw variable_stale;
}

function variable_rejector(variable) {
  return (error) => {
    if (error === variable_stale) throw error;
    if (error === variable_undefined) throw new RuntimeError(`${variable._name} is not defined`, variable._name);
    if (error instanceof Error && error.message) throw new RuntimeError(error.message, variable._name);
    throw new RuntimeError(`${variable._name} could not be resolved`, variable._name);
  };
}

function variable_duplicate(name) {
  return () => {
    throw new RuntimeError(`${name} is defined more than once`);
  };
}

function variable_define(name, inputs, definition) {
  switch (arguments.length) {
    case 1: {
      definition = name, name = inputs = null;
      break;
    }
    case 2: {
      definition = inputs;
      if (typeof name === "string") inputs = null;
      else inputs = name, name = null;
      break;
    }
  }
  return variable_defineImpl.call(this,
    name == null ? null : String(name),
    inputs == null ? [] : map.call(inputs, this._resolve, this),
    typeof definition === "function" ? definition : constant(definition)
  );
}

function variable_resolve(name) {
  return this._shadow?.get(name) ?? this._module._resolve(name);
}

function variable_defineImpl(name, inputs, definition) {
  const scope = this._module._scope, runtime = this._module._runtime;

  this._inputs.forEach(variable_detach, this);
  inputs.forEach(variable_attach, this);
  this._inputs = inputs;
  this._definition = definition;
  this._value = undefined;

  // Is this an active variable (that may require disposal)?
  if (definition === noop) runtime._variables.delete(this);
  else runtime._variables.add(this);

  // Did the variable’s name change? Time to patch references!
  if (name !== this._name || scope.get(name) !== this) {
    let error, found;

    if (this._name) { // Did this variable previously have a name?
      if (this._outputs.size) { // And did other variables reference this variable?
        scope.delete(this._name);
        found = this._module._resolve(this._name);
        found._outputs = this._outputs, this._outputs = new Set;
        found._outputs.forEach(function(output) { output._inputs[output._inputs.indexOf(this)] = found; }, this);
        found._outputs.forEach(runtime._updates.add, runtime._updates);
        runtime._dirty.add(found).add(this);
        scope.set(this._name, found);
      } else if ((found = scope.get(this._name)) === this) { // Do no other variables reference this variable?
        scope.delete(this._name); // It’s safe to delete!
      } else if (found._type === TYPE_DUPLICATE) { // Do other variables assign this name?
        found._duplicates.delete(this); // This variable no longer assigns this name.
        this._duplicate = undefined;
        if (found._duplicates.size === 1) { // Is there now only one variable assigning this name?
          found = found._duplicates.keys().next().value; // Any references are now fixed!
          error = scope.get(this._name);
          found._outputs = error._outputs, error._outputs = new Set;
          found._outputs.forEach(function(output) { output._inputs[output._inputs.indexOf(error)] = found; });
          found._definition = found._duplicate, found._duplicate = undefined;
          runtime._dirty.add(error).add(found);
          runtime._updates.add(found);
          scope.set(this._name, found);
        }
      } else {
        throw new Error;
      }
    }

    if (this._outputs.size) throw new Error;

    if (name) { // Does this variable have a new name?
      if (found = scope.get(name)) { // Do other variables reference or assign this name?
        if (found._type === TYPE_DUPLICATE) { // Do multiple other variables already define this name?
          this._definition = variable_duplicate(name), this._duplicate = definition;
          found._duplicates.add(this);
        } else if (found._type === TYPE_IMPLICIT) { // Are the variable references broken?
          this._outputs = found._outputs, found._outputs = new Set; // Now they’re fixed!
          this._outputs.forEach(function(output) { output._inputs[output._inputs.indexOf(found)] = this; }, this);
          runtime._dirty.add(found).add(this);
          scope.set(name, this);
        } else { // Does another variable define this name?
          found._duplicate = found._definition, this._duplicate = definition; // Now they’re duplicates.
          error = new Variable(TYPE_DUPLICATE, this._module);
          error._name = name;
          error._definition = this._definition = found._definition = variable_duplicate(name);
          error._outputs = found._outputs, found._outputs = new Set;
          error._outputs.forEach(function(output) { output._inputs[output._inputs.indexOf(found)] = error; });
          error._duplicates = new Set([this, found]);
          runtime._dirty.add(found).add(error);
          runtime._updates.add(found).add(error);
          scope.set(name, error);
        }
      } else {
        scope.set(name, this);
      }
    }

    this._name = name;
  }

  // If this redefined variable was previously evaluated, invalidate it. (If the
  // variable was never evaluated, then the invalidated value could never have
  // been exposed and we can avoid this extra work.)
  if (this._version > 0) ++this._version;

  runtime._updates.add(this);
  runtime._compute();
  return this;
}

function variable_import(remote, name, module) {
  if (arguments.length < 3) module = name, name = remote;
  return variable_defineImpl.call(this, String(name), [module._resolve(String(remote))], identity);
}

function variable_delete() {
  return variable_defineImpl.call(this, null, [], noop);
}

function variable_pending() {
  if (this._observer.pending) this._observer.pending();
}

function variable_fulfilled(value) {
  if (this._observer.fulfilled) this._observer.fulfilled(value, this._name);
}

function variable_rejected(error) {
  if (this._observer.rejected) this._observer.rejected(error, this._name);
}

const variable_variable = Symbol("variable");
const variable_invalidation = Symbol("invalidation");
const variable_visibility = Symbol("visibility");

function Module(runtime, builtins = []) {
  Object.defineProperties(this, {
    _runtime: {value: runtime},
    _scope: {value: new Map},
    _builtins: {value: new Map([
      ["@variable", variable_variable],
      ["invalidation", variable_invalidation],
      ["visibility", variable_visibility],
      ...builtins
    ])},
    _source: {value: null, writable: true}
  });
}

Object.defineProperties(Module.prototype, {
  _resolve: {value: module_resolve, writable: true, configurable: true},
  redefine: {value: module_redefine, writable: true, configurable: true},
  define: {value: module_define, writable: true, configurable: true},
  derive: {value: module_derive, writable: true, configurable: true},
  import: {value: module_import, writable: true, configurable: true},
  value: {value: module_value, writable: true, configurable: true},
  variable: {value: module_variable, writable: true, configurable: true},
  builtin: {value: module_builtin, writable: true, configurable: true}
});

function module_redefine(name) {
  const v = this._scope.get(name);
  if (!v) throw new RuntimeError(`${name} is not defined`);
  if (v._type === TYPE_DUPLICATE) throw new RuntimeError(`${name} is defined more than once`);
  return v.define.apply(v, arguments);
}

function module_define() {
  const v = new Variable(TYPE_NORMAL, this);
  return v.define.apply(v, arguments);
}

function module_import() {
  const v = new Variable(TYPE_NORMAL, this);
  return v.import.apply(v, arguments);
}

function module_variable(observer, options) {
  return new Variable(TYPE_NORMAL, this, observer, options);
}

async function module_value(name) {
  let v = this._scope.get(name);
  if (!v) throw new RuntimeError(`${name} is not defined`);
  if (v._observer === no_observer) {
    v = this.variable(true).define([name], identity);
    try {
      return await module_revalue(this._runtime, v);
    } finally {
      v.delete();
    }
  } else {
    return module_revalue(this._runtime, v);
  }
}

// If the variable is redefined before its value resolves, try again.
async function module_revalue(runtime, variable) {
  await runtime._compute();
  try {
    return await variable._promise;
  } catch (error) {
    if (error === variable_stale) return module_revalue(runtime, variable);
    throw error;
  }
}

function module_derive(injects, injectModule) {
  const map = new Map();
  const modules = new Set();
  const copies = [];

  // Given a module, derives an alias of that module with an initially-empty
  // definition. The variables will be copied later in a second pass below.
  function alias(source) {
    let target = map.get(source);
    if (target) return target;
    target = new Module(source._runtime, source._builtins);
    target._source = source;
    map.set(source, target);
    copies.push([target, source]);
    modules.add(source);
    return target;
  }

  // Inject the given variables as reverse imports into the derived module.
  const derive = alias(this);
  for (const inject of injects) {
    const {alias, name} = typeof inject === "object" ? inject : {name: inject};
    derive.import(name, alias == null ? name : alias, injectModule);
  }

  // Iterate over all the variables (currently) in this module. If any
  // represents an import-with (i.e., an import of a module with a _source), the
  // transitive import-with must be copied, too, as direct injections may affect
  // transitive injections. Note that an import-with can only be created with
  // module.derive and hence it’s not possible for an import-with to be added
  // later; therefore we only need to apply this check once, now.
  for (const module of modules) {
    for (const [name, variable] of module._scope) {
      if (variable._definition === identity) { // import
        if (module === this && derive._scope.has(name)) continue; // overridden by injection
        const importedModule = variable._inputs[0]._module;
        if (importedModule._source) alias(importedModule);
      }
    }
  }

  // Finally, with the modules resolved, copy the variable definitions.
  for (const [target, source] of copies) {
    for (const [name, sourceVariable] of source._scope) {
      const targetVariable = target._scope.get(name);
      if (targetVariable && targetVariable._type !== TYPE_IMPLICIT) continue; // preserve injection
      if (sourceVariable._definition === identity) { // import
        const sourceInput = sourceVariable._inputs[0];
        const sourceModule = sourceInput._module;
        target.import(sourceInput._name, name, map.get(sourceModule) || sourceModule);
      } else { // non-import
        target.define(name, sourceVariable._inputs.map(variable_name), sourceVariable._definition);
      }
    }
  }

  return derive;
}

function module_resolve(name) {
  let variable = this._scope.get(name), value;
  if (!variable) {
    variable = new Variable(TYPE_IMPLICIT, this);
    if (this._builtins.has(name)) {
      variable.define(name, constant(this._builtins.get(name)));
    } else if (this._runtime._builtin._scope.has(name)) {
      variable.import(name, this._runtime._builtin);
    } else {
      try {
        value = this._runtime._global(name);
      } catch (error) {
        return variable.define(name, rethrow(error));
      }
      if (value === undefined) {
        this._scope.set(variable._name = name, variable);
      } else {
        variable.define(name, constant(value));
      }
    }
  }
  return variable;
}

function module_builtin(name, value) {
  this._builtins.set(name, value);
}

function variable_name(variable) {
  return variable._name;
}

const frame = typeof requestAnimationFrame === "function" ? requestAnimationFrame
  : typeof setImmediate === "function" ? setImmediate
  : f => setTimeout(f, 0);

function Runtime(builtins = new Library, global = window_global) {
  const builtin = this.module();
  Object.defineProperties(this, {
    _dirty: {value: new Set},
    _updates: {value: new Set},
    _precomputes: {value: [], writable: true},
    _computing: {value: null, writable: true},
    _init: {value: null, writable: true},
    _modules: {value: new Map},
    _variables: {value: new Set},
    _disposed: {value: false, writable: true},
    _builtin: {value: builtin},
    _global: {value: global}
  });
  if (builtins) for (const name in builtins) {
    (new Variable(TYPE_IMPLICIT, builtin)).define(name, [], builtins[name]);
  }
}

Object.defineProperties(Runtime.prototype, {
  _precompute: {value: runtime_precompute, writable: true, configurable: true},
  _compute: {value: runtime_compute, writable: true, configurable: true},
  _computeSoon: {value: runtime_computeSoon, writable: true, configurable: true},
  _computeNow: {value: runtime_computeNow, writable: true, configurable: true},
  dispose: {value: runtime_dispose, writable: true, configurable: true},
  module: {value: runtime_module, writable: true, configurable: true},
  fileAttachments: {value: FileAttachments, writable: true, configurable: true}
});

function runtime_dispose() {
  this._computing = Promise.resolve();
  this._disposed = true;
  this._variables.forEach(v => {
    v._invalidate();
    v._version = NaN;
  });
}

function runtime_module(define, observer = noop) {
  let module;
  if (define === undefined) {
    if (module = this._init) {
      this._init = null;
      return module;
    }
    return new Module(this);
  }
  module = this._modules.get(define);
  if (module) return module;
  this._init = module = new Module(this);
  this._modules.set(define, module);
  try {
    define(this, observer);
  } finally {
    this._init = null;
  }
  return module;
}

function runtime_precompute(callback) {
  this._precomputes.push(callback);
  this._compute();
}

function runtime_compute() {
  return this._computing || (this._computing = this._computeSoon());
}

function runtime_computeSoon() {
  return new Promise(frame).then(() => this._disposed ? undefined : this._computeNow());
}

async function runtime_computeNow() {
  let queue = [],
      variables,
      variable,
      precomputes = this._precomputes;

  // If there are any paused generators, resume them before computing so they
  // can update (if synchronous) before computing downstream variables.
  if (precomputes.length) {
    this._precomputes = [];
    for (const callback of precomputes) callback();
    await runtime_defer(3);
  }

  // Compute the reachability of the transitive closure of dirty variables.
  // Any newly-reachable variable must also be recomputed.
  // Any no-longer-reachable variable must be terminated.
  variables = new Set(this._dirty);
  variables.forEach(function(variable) {
    variable._inputs.forEach(variables.add, variables);
    const reachable = variable_reachable(variable);
    if (reachable > variable._reachable) {
      this._updates.add(variable);
    } else if (reachable < variable._reachable) {
      variable._invalidate();
    }
    variable._reachable = reachable;
  }, this);

  // Compute the transitive closure of updating, reachable variables.
  variables = new Set(this._updates);
  variables.forEach(function(variable) {
    if (variable._reachable) {
      variable._indegree = 0;
      variable._outputs.forEach(variables.add, variables);
    } else {
      variable._indegree = NaN;
      variables.delete(variable);
    }
  });

  this._computing = null;
  this._updates.clear();
  this._dirty.clear();

  // Compute the indegree of updating variables.
  variables.forEach(function(variable) {
    variable._outputs.forEach(variable_increment);
  });

  do {
    // Identify the root variables (those with no updating inputs).
    variables.forEach(function(variable) {
      if (variable._indegree === 0) {
        queue.push(variable);
      }
    });

    // Compute the variables in topological order.
    while (variable = queue.pop()) {
      variable_compute(variable);
      variable._outputs.forEach(postqueue);
      variables.delete(variable);
    }

    // Any remaining variables are circular, or depend on them.
    variables.forEach(function(variable) {
      if (variable_circular(variable)) {
        variable_error(variable, new RuntimeError("circular definition"));
        variable._outputs.forEach(variable_decrement);
        variables.delete(variable);
      }
    });
  } while (variables.size);

  function postqueue(variable) {
    if (--variable._indegree === 0) {
      queue.push(variable);
    }
  }
}

// We want to give generators, if they’re defined synchronously, a chance to
// update before computing downstream variables. This creates a synchronous
// promise chain of the given depth that we’ll await before recomputing
// downstream variables.
function runtime_defer(depth = 0) {
  let p = Promise.resolve();
  for (let i = 0; i < depth; ++i) p = p.then(() => {});
  return p;
}

function variable_circular(variable) {
  const inputs = new Set(variable._inputs);
  for (const i of inputs) {
    if (i === variable) return true;
    i._inputs.forEach(inputs.add, inputs);
  }
  return false;
}

function variable_increment(variable) {
  ++variable._indegree;
}

function variable_decrement(variable) {
  --variable._indegree;
}

function variable_value(variable) {
  return variable._promise.catch(variable._rejector);
}

function variable_invalidator(variable) {
  return new Promise(function(resolve) {
    variable._invalidate = resolve;
  });
}

function variable_intersector(invalidation, variable) {
  let node = typeof IntersectionObserver === "function" && variable._observer && variable._observer._node;
  let visible = !node, resolve = noop, reject = noop, promise, observer;
  if (node) {
    observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting) && (promise = null, resolve()));
    observer.observe(node);
    invalidation.then(() => (observer.disconnect(), observer = null, reject()));
  }
  return function(value) {
    if (visible) return Promise.resolve(value);
    if (!observer) return Promise.reject();
    if (!promise) promise = new Promise((y, n) => (resolve = y, reject = n));
    return promise.then(() => value);
  };
}

function variable_compute(variable) {
  variable._invalidate();
  variable._invalidate = noop;
  variable._pending();

  const value0 = variable._value;
  const version = ++variable._version;

  // Lazily-constructed invalidation variable; only constructed if referenced as an input.
  let invalidation = null;

  // If the variable doesn’t have any inputs, we can optimize slightly.
  const promise = variable._promise = (variable._inputs.length
      ? Promise.all(variable._inputs.map(variable_value)).then(define)
      : new Promise(resolve => resolve(variable._definition.call(value0))))
    .then(generate);

  // Compute the initial value of the variable.
  function define(inputs) {
    if (variable._version !== version) throw variable_stale;

    // Replace any reference to invalidation with the promise, lazily.
    for (let i = 0, n = inputs.length; i < n; ++i) {
      switch (inputs[i]) {
        case variable_invalidation: {
          inputs[i] = invalidation = variable_invalidator(variable);
          break;
        }
        case variable_visibility: {
          if (!invalidation) invalidation = variable_invalidator(variable);
          inputs[i] = variable_intersector(invalidation, variable);
          break;
        }
        case variable_variable: {
          inputs[i] = variable;
          break;
        }
      }
    }

    return variable._definition.apply(value0, inputs);
  }

  // If the value is a generator, then retrieve its first value, and dispose of
  // the generator if the variable is invalidated. Note that the cell may
  // already have been invalidated here, in which case we need to terminate the
  // generator immediately!
  function generate(value) {
    if (variable._version !== version) throw variable_stale;
    if (generatorish(value)) {
      (invalidation || variable_invalidator(variable)).then(variable_return(value));
      return variable_generate(variable, version, value);
    }
    return value;
  }

  promise.then((value) => {
    variable._value = value;
    variable._fulfilled(value);
  }, (error) => {
    if (error === variable_stale || variable._version !== version) return;
    variable._value = undefined;
    variable._rejected(error);
  });
}

function variable_generate(variable, version, generator) {
  const runtime = variable._module._runtime;
  let currentValue; // so that yield resolves to the yielded value

  // Retrieve the next value from the generator; if successful, invoke the
  // specified callback. The returned promise resolves to the yielded value, or
  // to undefined if the generator is done.
  function compute(onfulfilled) {
    return new Promise(resolve => resolve(generator.next(currentValue))).then(({done, value}) => {
      return done ? undefined : Promise.resolve(value).then(onfulfilled);
    });
  }

  // Retrieve the next value from the generator; if successful, fulfill the
  // variable, compute downstream variables, and schedule the next value to be
  // pulled from the generator at the start of the next animation frame. If not
  // successful, reject the variable, compute downstream variables, and return.
  function recompute() {
    const promise = compute((value) => {
      if (variable._version !== version) throw variable_stale;
      currentValue = value;
      postcompute(value, promise).then(() => runtime._precompute(recompute));
      variable._fulfilled(value);
      return value;
    });
    promise.catch((error) => {
      if (error === variable_stale || variable._version !== version) return;
      postcompute(undefined, promise);
      variable._rejected(error);
    });
  }

  // After the generator fulfills or rejects, set its current value, promise,
  // and schedule any downstream variables for update.
  function postcompute(value, promise) {
    variable._value = value;
    variable._promise = promise;
    variable._outputs.forEach(runtime._updates.add, runtime._updates);
    return runtime._compute();
  }

  // When retrieving the first value from the generator, the promise graph is
  // already established, so we only need to queue the next pull.
  return compute((value) => {
    if (variable._version !== version) throw variable_stale;
    currentValue = value;
    runtime._precompute(recompute);
    return value;
  });
}

function variable_error(variable, error) {
  variable._invalidate();
  variable._invalidate = noop;
  variable._pending();
  ++variable._version;
  variable._indegree = NaN;
  (variable._promise = Promise.reject(error)).catch(noop);
  variable._value = undefined;
  variable._rejected(error);
}

function variable_return(generator) {
  return function() {
    generator.return();
  };
}

function variable_reachable(variable) {
  if (variable._observer !== no_observer) return true; // Directly reachable.
  const outputs = new Set(variable._outputs);
  for (const output of outputs) {
    if (output._observer !== no_observer) return true;
    output._outputs.forEach(outputs.add, outputs);
  }
  return false;
}

function window_global(name) {
  return globalThis[name];
}

function renderHtml(string) {
  const template = document.createElement("template");
  template.innerHTML = string;
  return document.importNode(template.content, true);
}

function renderSvg(string) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = string;
  return g;
}

const html = Object.assign(hypertext(renderHtml, fragment => {
  if (fragment.firstChild === null) return null;
  if (fragment.firstChild === fragment.lastChild) return fragment.removeChild(fragment.firstChild);
  const span = document.createElement("span");
  span.appendChild(fragment);
  return span;
}), {fragment: hypertext(renderHtml, fragment => fragment)});

Object.assign(hypertext(renderSvg, g => {
  if (g.firstChild === null) return null;
  if (g.firstChild === g.lastChild) return g.removeChild(g.firstChild);
  return g;
}), {fragment: hypertext(renderSvg, g => {
  const fragment = document.createDocumentFragment();
  while (g.firstChild) fragment.appendChild(g.firstChild);
  return fragment;
})});

const
CODE_TAB = 9,
CODE_LF = 10,
CODE_FF = 12,
CODE_CR = 13,
CODE_SPACE = 32,
CODE_UPPER_A = 65,
CODE_UPPER_Z = 90,
CODE_LOWER_A = 97,
CODE_LOWER_Z = 122,
CODE_LT = 60,
CODE_GT = 62,
CODE_SLASH = 47,
CODE_DASH = 45,
CODE_BANG = 33,
CODE_EQ = 61,
CODE_DQUOTE = 34,
CODE_SQUOTE = 39,
CODE_QUESTION = 63,
STATE_DATA = 1,
STATE_TAG_OPEN = 2,
STATE_END_TAG_OPEN = 3,
STATE_TAG_NAME = 4,
STATE_BOGUS_COMMENT = 5,
STATE_BEFORE_ATTRIBUTE_NAME = 6,
STATE_AFTER_ATTRIBUTE_NAME = 7,
STATE_ATTRIBUTE_NAME = 8,
STATE_BEFORE_ATTRIBUTE_VALUE = 9,
STATE_ATTRIBUTE_VALUE_DOUBLE_QUOTED = 10,
STATE_ATTRIBUTE_VALUE_SINGLE_QUOTED = 11,
STATE_ATTRIBUTE_VALUE_UNQUOTED = 12,
STATE_AFTER_ATTRIBUTE_VALUE_QUOTED = 13,
STATE_SELF_CLOSING_START_TAG = 14,
STATE_COMMENT_START = 15,
STATE_COMMENT_START_DASH = 16,
STATE_COMMENT = 17,
STATE_COMMENT_LESS_THAN_SIGN = 18,
STATE_COMMENT_LESS_THAN_SIGN_BANG = 19,
STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH = 20,
STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 21,
STATE_COMMENT_END_DASH = 22,
STATE_COMMENT_END = 23,
STATE_COMMENT_END_BANG = 24,
STATE_MARKUP_DECLARATION_OPEN = 25,
STATE_RAWTEXT = 26,
STATE_RAWTEXT_LESS_THAN_SIGN = 27,
STATE_RAWTEXT_END_TAG_OPEN = 28,
STATE_RAWTEXT_END_TAG_NAME = 29,
SHOW_COMMENT = 128,
SHOW_ELEMENT = 1,
TYPE_COMMENT = 8,
TYPE_ELEMENT = 1,
NS_SVG = "http://www.w3.org/2000/svg",
NS_XLINK = "http://www.w3.org/1999/xlink",
NS_XML = "http://www.w3.org/XML/1998/namespace",
NS_XMLNS = "http://www.w3.org/2000/xmlns/";

const svgAdjustAttributes = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(name => [name.toLowerCase(), name]));

const svgForeignAttributes = new Map([
  ["xlink:actuate", NS_XLINK],
  ["xlink:arcrole", NS_XLINK],
  ["xlink:href", NS_XLINK],
  ["xlink:role", NS_XLINK],
  ["xlink:show", NS_XLINK],
  ["xlink:title", NS_XLINK],
  ["xlink:type", NS_XLINK],
  ["xml:lang", NS_XML],
  ["xml:space", NS_XML],
  ["xmlns", NS_XMLNS],
  ["xmlns:xlink", NS_XMLNS]
]);

function hypertext(render, postprocess) {
  return function({raw: strings}) {
    let state = STATE_DATA;
    let string = "";
    let tagNameStart; // either an open tag or an end tag
    let tagName; // only open; beware nesting! used only for rawtext
    let attributeNameStart;
    let attributeNameEnd;
    let nodeFilter = 0;

    for (let j = 0, m = arguments.length; j < m; ++j) {
      const input = strings[j];

      if (j > 0) {
        const value = arguments[j];
        switch (state) {
          case STATE_RAWTEXT: {
            if (value != null) {
              const text = `${value}`;
              if (isEscapableRawText(tagName)) {
                string += text.replace(/[<]/g, entity);
              } else if (new RegExp(`</${tagName}[\\s>/]`, "i").test(string.slice(-tagName.length - 2) + text)) {
                throw new Error("unsafe raw text"); // appropriate end tag
              } else {
                string += text;
              }
            }
            break;
          }
          case STATE_DATA: {
            if (value == null) ; else if (value instanceof Node
                || (typeof value !== "string" && value[Symbol.iterator])
                || (/(?:^|>)$/.test(strings[j - 1]) && /^(?:<|$)/.test(input))) {
              string += "<!--::" + j + "-->";
              nodeFilter |= SHOW_COMMENT;
            } else {
              string += `${value}`.replace(/[<&]/g, entity);
            }
            break;
          }
          case STATE_BEFORE_ATTRIBUTE_VALUE: {
            state = STATE_ATTRIBUTE_VALUE_UNQUOTED;
            let text;
            if (/^[\s>]/.test(input)) {
              if (value == null || value === false) {
                string = string.slice(0, attributeNameStart - strings[j - 1].length);
                break;
              }
              if (value === true || (text = `${value}`) === "") {
                string += "''";
                break;
              }
              const name = strings[j - 1].slice(attributeNameStart, attributeNameEnd);
              if ((name === "style" && isObjectLiteral(value)) || typeof value === "function") {
                string += "::" + j;
                nodeFilter |= SHOW_ELEMENT;
                break;
              }
            }
            if (text === undefined) text = `${value}`;
            if (text === "") throw new Error("unsafe unquoted empty string");
            string += text.replace(/^['"]|[\s>&]/g, entity);
            break;
          }
          case STATE_ATTRIBUTE_VALUE_UNQUOTED: {
            string += `${value}`.replace(/[\s>&]/g, entity);
            break;
          }
          case STATE_ATTRIBUTE_VALUE_SINGLE_QUOTED: {
            string += `${value}`.replace(/['&]/g, entity);
            break;
          }
          case STATE_ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
            string += `${value}`.replace(/["&]/g, entity);
            break;
          }
          case STATE_BEFORE_ATTRIBUTE_NAME: {
            if (isObjectLiteral(value)) {
              string += "::" + j + "=''";
              nodeFilter |= SHOW_ELEMENT;
              break;
            }
            throw new Error("invalid binding");
          }
          case STATE_COMMENT: break;
          default: throw new Error("invalid binding");
        }
      }

      for (let i = 0, n = input.length; i < n; ++i) {
        const code = input.charCodeAt(i);

        switch (state) {
          case STATE_DATA: {
            if (code === CODE_LT) {
              state = STATE_TAG_OPEN;
            }
            break;
          }
          case STATE_TAG_OPEN: {
            if (code === CODE_BANG) {
              state = STATE_MARKUP_DECLARATION_OPEN;
            } else if (code === CODE_SLASH) {
              state = STATE_END_TAG_OPEN;
            } else if (isAsciiAlphaCode(code)) {
              tagNameStart = i, tagName = undefined;
              state = STATE_TAG_NAME, --i;
            } else if (code === CODE_QUESTION) {
              state = STATE_BOGUS_COMMENT, --i;
            } else {
              state = STATE_DATA, --i;
            }
            break;
          }
          case STATE_END_TAG_OPEN: {
            if (isAsciiAlphaCode(code)) {
              state = STATE_TAG_NAME, --i;
            } else if (code === CODE_GT) {
              state = STATE_DATA;
            } else {
              state = STATE_BOGUS_COMMENT, --i;
            }
            break;
          }
          case STATE_TAG_NAME: {
            if (isSpaceCode(code)) {
              state = STATE_BEFORE_ATTRIBUTE_NAME;
              tagName = lower(input, tagNameStart, i);
            } else if (code === CODE_SLASH) {
              state = STATE_SELF_CLOSING_START_TAG;
            } else if (code === CODE_GT) {
              tagName = lower(input, tagNameStart, i);
              state = isRawText(tagName) ? STATE_RAWTEXT : STATE_DATA;
            }
            break;
          }
          case STATE_BEFORE_ATTRIBUTE_NAME: {
            if (isSpaceCode(code)) ; else if (code === CODE_SLASH || code === CODE_GT) {
              state = STATE_AFTER_ATTRIBUTE_NAME, --i;
            } else if (code === CODE_EQ) {
              state = STATE_ATTRIBUTE_NAME;
              attributeNameStart = i + 1, attributeNameEnd = undefined;
            } else {
              state = STATE_ATTRIBUTE_NAME, --i;
              attributeNameStart = i + 1, attributeNameEnd = undefined;
            }
            break;
          }
          case STATE_ATTRIBUTE_NAME: {
            if (isSpaceCode(code) || code === CODE_SLASH || code === CODE_GT) {
              state = STATE_AFTER_ATTRIBUTE_NAME, --i;
              attributeNameEnd = i;
            } else if (code === CODE_EQ) {
              state = STATE_BEFORE_ATTRIBUTE_VALUE;
              attributeNameEnd = i;
            }
            break;
          }
          case STATE_AFTER_ATTRIBUTE_NAME: {
            if (isSpaceCode(code)) ; else if (code === CODE_SLASH) {
              state = STATE_SELF_CLOSING_START_TAG;
            } else if (code === CODE_EQ) {
              state = STATE_BEFORE_ATTRIBUTE_VALUE;
            } else if (code === CODE_GT) {
              state = isRawText(tagName) ? STATE_RAWTEXT : STATE_DATA;
            } else {
              state = STATE_ATTRIBUTE_NAME, --i;
              attributeNameStart = i + 1, attributeNameEnd = undefined;
            }
            break;
          }
          case STATE_BEFORE_ATTRIBUTE_VALUE: {
            if (isSpaceCode(code)) ; else if (code === CODE_DQUOTE) {
              state = STATE_ATTRIBUTE_VALUE_DOUBLE_QUOTED;
            } else if (code === CODE_SQUOTE) {
              state = STATE_ATTRIBUTE_VALUE_SINGLE_QUOTED;
            } else if (code === CODE_GT) {
              state = isRawText(tagName) ? STATE_RAWTEXT : STATE_DATA;
            } else {
              state = STATE_ATTRIBUTE_VALUE_UNQUOTED, --i;
            }
            break;
          }
          case STATE_ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
            if (code === CODE_DQUOTE) {
              state = STATE_AFTER_ATTRIBUTE_VALUE_QUOTED;
            }
            break;
          }
          case STATE_ATTRIBUTE_VALUE_SINGLE_QUOTED: {
            if (code === CODE_SQUOTE) {
              state = STATE_AFTER_ATTRIBUTE_VALUE_QUOTED;
            }
            break;
          }
          case STATE_ATTRIBUTE_VALUE_UNQUOTED: {
            if (isSpaceCode(code)) {
              state = STATE_BEFORE_ATTRIBUTE_NAME;
            } else if (code === CODE_GT) {
              state = isRawText(tagName) ? STATE_RAWTEXT : STATE_DATA;
            }
            break;
          }
          case STATE_AFTER_ATTRIBUTE_VALUE_QUOTED: {
            if (isSpaceCode(code)) {
              state = STATE_BEFORE_ATTRIBUTE_NAME;
            } else if (code === CODE_SLASH) {
              state = STATE_SELF_CLOSING_START_TAG;
            } else if (code === CODE_GT) {
              state = isRawText(tagName) ? STATE_RAWTEXT : STATE_DATA;
            } else {
              state = STATE_BEFORE_ATTRIBUTE_NAME, --i;
            }
            break;
          }
          case STATE_SELF_CLOSING_START_TAG: {
            if (code === CODE_GT) {
              state = STATE_DATA;
            } else {
              state = STATE_BEFORE_ATTRIBUTE_NAME, --i;
            }
            break;
          }
          case STATE_BOGUS_COMMENT: {
            if (code === CODE_GT) {
              state = STATE_DATA;
            }
            break;
          }
          case STATE_COMMENT_START: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_START_DASH;
            } else if (code === CODE_GT) {
              state = STATE_DATA;
            } else {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT_START_DASH: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_END;
            } else if (code === CODE_GT) {
              state = STATE_DATA;
            } else {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT: {
            if (code === CODE_LT) {
              state = STATE_COMMENT_LESS_THAN_SIGN;
            } else if (code === CODE_DASH) {
              state = STATE_COMMENT_END_DASH;
            }
            break;
          }
          case STATE_COMMENT_LESS_THAN_SIGN: {
            if (code === CODE_BANG) {
              state = STATE_COMMENT_LESS_THAN_SIGN_BANG;
            } else if (code !== CODE_LT) {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT_LESS_THAN_SIGN_BANG: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH;
            } else {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
            } else {
              state = STATE_COMMENT_END, --i;
            }
            break;
          }
          case STATE_COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
            state = STATE_COMMENT_END, --i;
            break;
          }
          case STATE_COMMENT_END_DASH: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_END;
            } else {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT_END: {
            if (code === CODE_GT) {
              state = STATE_DATA;
            } else if (code === CODE_BANG) {
              state = STATE_COMMENT_END_BANG;
            } else if (code !== CODE_DASH) {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_COMMENT_END_BANG: {
            if (code === CODE_DASH) {
              state = STATE_COMMENT_END_DASH;
            } else if (code === CODE_GT) {
              state = STATE_DATA;
            } else {
              state = STATE_COMMENT, --i;
            }
            break;
          }
          case STATE_MARKUP_DECLARATION_OPEN: {
            if (code === CODE_DASH && input.charCodeAt(i + 1) === CODE_DASH) {
              state = STATE_COMMENT_START, ++i;
            } else { // Note: CDATA and DOCTYPE unsupported!
              state = STATE_BOGUS_COMMENT, --i;
            }
            break;
          }
          case STATE_RAWTEXT: {
            if (code === CODE_LT) {
              state = STATE_RAWTEXT_LESS_THAN_SIGN;
            }
            break;
          }
          case STATE_RAWTEXT_LESS_THAN_SIGN: {
            if (code === CODE_SLASH) {
              state = STATE_RAWTEXT_END_TAG_OPEN;
            } else {
              state = STATE_RAWTEXT, --i;
            }
            break;
          }
          case STATE_RAWTEXT_END_TAG_OPEN: {
            if (isAsciiAlphaCode(code)) {
              tagNameStart = i;
              state = STATE_RAWTEXT_END_TAG_NAME, --i;
            } else {
              state = STATE_RAWTEXT, --i;
            }
            break;
          }
          case STATE_RAWTEXT_END_TAG_NAME: {
            if (isSpaceCode(code) && tagName === lower(input, tagNameStart, i)) {
              state = STATE_BEFORE_ATTRIBUTE_NAME;
            } else if (code === CODE_SLASH && tagName === lower(input, tagNameStart, i)) {
              state = STATE_SELF_CLOSING_START_TAG;
            } else if (code === CODE_GT && tagName === lower(input, tagNameStart, i)) {
              state = STATE_DATA;
            } else if (!isAsciiAlphaCode(code)) {
              state = STATE_RAWTEXT, --i;
            }
            break;
          }
          default: {
            state = undefined;
            break;
          }
        }
      }

      string += input;
    }

    const root = render(string);

    const walker = document.createTreeWalker(root, nodeFilter, null, false);
    const removeNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      switch (node.nodeType) {
        case TYPE_ELEMENT: {
          const attributes = node.attributes;
          for (let i = 0, n = attributes.length; i < n; ++i) {
            const {name, value: currentValue} = attributes[i];
            if (/^::/.test(name)) {
              const value = arguments[+name.slice(2)];
              removeAttribute(node, name), --i, --n;
              for (const key in value) {
                const subvalue = value[key];
                if (subvalue == null || subvalue === false) ; else if (typeof subvalue === "function") {
                  node[key] = subvalue;
                } else if (key === "style" && isObjectLiteral(subvalue)) {
                  setStyles(node[key], subvalue);
                } else {
                  setAttribute(node, key, subvalue === true ? "" : subvalue);
                }
              }
            } else if (/^::/.test(currentValue)) {
              const value = arguments[+currentValue.slice(2)];
              removeAttribute(node, name), --i, --n;
              if (typeof value === "function") {
                node[name] = value;
              } else { // style
                setStyles(node[name], value);
              }
            }
          }
          break;
        }
        case TYPE_COMMENT: {
          if (/^::/.test(node.data)) {
            const parent = node.parentNode;
            const value = arguments[+node.data.slice(2)];
            if (value instanceof Node) {
              parent.insertBefore(value, node);
            } else if (typeof value !== "string" && value[Symbol.iterator]) {
              if (value instanceof NodeList || value instanceof HTMLCollection) {
                for (let i = value.length - 1, r = node; i >= 0; --i) {
                  r = parent.insertBefore(value[i], r);
                }
              } else {
                for (const subvalue of value) {
                  if (subvalue == null) continue;
                  parent.insertBefore(subvalue instanceof Node ? subvalue : document.createTextNode(subvalue), node);
                }
              }
            } else {
              parent.insertBefore(document.createTextNode(value), node);
            }
            removeNodes.push(node);
          }
          break;
        }
      }
    }

    for (const node of removeNodes) {
      node.parentNode.removeChild(node);
    }

    return postprocess(root);
  };
}

function entity(character) {
  return `&#${character.charCodeAt(0).toString()};`;
}

function isAsciiAlphaCode(code) {
  return (CODE_UPPER_A <= code && code <= CODE_UPPER_Z)
      || (CODE_LOWER_A <= code && code <= CODE_LOWER_Z);
}

function isSpaceCode(code) {
  return code === CODE_TAB
      || code === CODE_LF
      || code === CODE_FF
      || code === CODE_SPACE
      || code === CODE_CR; // normalize newlines
}

function isObjectLiteral(value) {
  return value && value.toString === Object.prototype.toString;
}

function isRawText(tagName) {
  return tagName === "script" || tagName === "style" || isEscapableRawText(tagName);
}

function isEscapableRawText(tagName) {
  return tagName === "textarea" || tagName === "title";
}

function lower(input, start, end) {
  return input.slice(start, end).toLowerCase();
}

function setAttribute(node, name, value) {
  if (node.namespaceURI === NS_SVG) {
    name = name.toLowerCase();
    name = svgAdjustAttributes.get(name) || name;
    if (svgForeignAttributes.has(name)) {
      node.setAttributeNS(svgForeignAttributes.get(name), name, value);
      return;
    }
  }
  node.setAttribute(name, value);
}

function removeAttribute(node, name) {
  if (node.namespaceURI === NS_SVG) {
    name = name.toLowerCase();
    name = svgAdjustAttributes.get(name) || name;
    if (svgForeignAttributes.has(name)) {
      node.removeAttributeNS(svgForeignAttributes.get(name), name);
      return;
    }
  }
  node.removeAttribute(name);
}

// We can’t use Object.assign because custom properties…
function setStyles(style, values) {
  for (const name in values) {
    const value = values[name];
    if (name.startsWith("--")) style.setProperty(name, value);
    else style[name] = value;
  }
}

// @observablehq/inputs v0.12.0 Copyright 2021–2024 Observable, Inc.

let nextId = 0;

function newId() {
  return `inputs-3a86ea-${++nextId}`;
}

function maybeLabel(label, input) {
  if (!label) return;
  label = html`<label>${label}`;
  if (input !== undefined) label.htmlFor = input.id = newId();
  return label;
}

const formatLocaleAuto = localize(locale => {
  const formatNumber = formatLocaleNumber(locale);
  return value => value == null ? ""
    : typeof value === "number" ? formatNumber(value)
    : value instanceof Date ? formatDate$1(value)
    : `${value}`;
});

const formatLocaleNumber = localize(locale => {
  return value => value === 0 ? "0" : value.toLocaleString(locale); // handle negative zero
});

formatLocaleAuto();

formatLocaleNumber();

function formatDate$1(date) {
  return format(date, "Invalid Date");
}

// Memoize the last-returned locale.
function localize(f) {
  let key = localize, value;
  return (locale = "en") => locale === key ? value : (value = f(key = locale));
}

function toggle({label, value, values, disabled} = {}) {
  const input = html`<input class=inputs-3a86ea-input type=checkbox name=input disabled=${disabled}>`;
  const form = html`<form class="inputs-3a86ea inputs-3a86ea-toggle">${maybeLabel(label, input)}${input}`;
  Object.defineProperty(form, "value", {
    get() {
      return values === undefined ? input.checked : values[input.checked ? 0 : 1];
    },
    set(v) {
      input.checked = values === undefined ? !!v : v === values[0];
    }
  });
  if (value !== undefined) form.value = value;
  return form;
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1;
function _1(md) {
  return md(_templateObject || (_templateObject = _taggedTemplateLiteral(["# Dialectical Wheel with Arrows"])));
}
function _getRingOrder(isWhiteOutside) {
  return function () {
    var neutralOutside = isWhiteOutside; // legacy toggle name maps to neutral outside
    var byPhysical = ['positive', neutralOutside ? 'negative' : 'neutral', neutralOutside ? 'neutral' : 'negative'];
    var bySemantic = {
      positive: 'inner',
      negative: byPhysical[1] === 'negative' ? 'middle' : 'outer',
      neutral: byPhysical[1] === 'neutral' ? 'middle' : 'outer'
    };
    return {
      byPhysical: byPhysical,
      bySemantic: bySemantic
    };
  };
}
function _getRadiiForSemantic(getRingOrder) {
  return function (semantic, radii, styles) {
    var order = getRingOrder();
    var physical = semantic === 'positive' ? 'inner' : semantic === 'invisible' ? 'invisible' : order.bySemantic[semantic];
    if (physical === 'outer') return {
      inner: radii.innerRadius,
      outer: radii.outerRadius
    };
    if (physical === 'middle') return {
      inner: radii.innerInnerRadius,
      outer: radii.middleRadius
    };
    if (physical === 'invisible') return {
      inner: radii.outerRadius,
      outer: styles.radii.invisible
    };
    return {
      inner: 30,
      outer: radii.centerRadius
    };
  };
}
function _makeRings(arcTween, getRingOrder, userTextColors, d3, getRadiiForSemantic) {
  return function (_ref) {
    var groups = _ref.groups,
      labels = _ref.labels,
      arcs = _ref.arcs,
      colorScales = _ref.colorScales,
      styles = _ref.styles,
      pie = _ref.pie,
      radii = _ref.radii,
      helpers = _ref.helpers,
      getDataToUse = _ref.getDataToUse,
      getCellVisibility = _ref.getCellVisibility,
      bindCellEvents = _ref.bindCellEvents,
      getIsWhiteOutside = _ref.getIsWhiteOutside;
    var invisibleGroup = groups.invisibleGroup,
      outerGroup = groups.outerGroup,
      middleGroup = groups.middleGroup,
      innerGroup = groups.innerGroup;
    var invisibleLabelsGroup = labels.invisibleLabelsGroup,
      outerLabelsGroup = labels.outerLabelsGroup,
      middleLabelsGroup = labels.middleLabelsGroup,
      innerLabelsGroup = labels.innerLabelsGroup;
    var invisibleArc = arcs.invisibleArc,
      outerArc = arcs.outerArc,
      middleArc = arcs.middleArc,
      innerArc = arcs.innerArc;
    var invisibleColor = colorScales.invisibleColor,
      negativeColor = colorScales.negativeColor,
      neutralColor = colorScales.neutralColor,
      positiveColor = colorScales.positiveColor; // ✅ Semantic colors

    function changeData(ringType, newData, arcGenerator) {
      var group = ringType === "outer" ? outerGroup : ringType === "middle" ? middleGroup : innerGroup;
      var labelsGroup = ringType === "outer" ? outerLabelsGroup : ringType === "middle" ? middleLabelsGroup : innerLabelsGroup;
      var pieData = pie(newData);
      var paths = group.selectAll("path").data(pieData, function (d) {
        return d.data.name;
      });
      paths.transition().duration(styles.durations.normal).attrTween("d", arcTween(arcGenerator)).style("opacity", function (d) {
        if (!getCellVisibility(d.data.unitId, ringType)) return 0;
        var opacityMap = {
          negative: 1,
          neutral: 0.9,
          positive: 0.8
        };
        var baseOpacity = opacityMap[ringType] || 1;
        return d.data.opacity * baseOpacity;
      });
      var labelsSel = labelsGroup.selectAll("text").data(pieData, function (d) {
        return d.data.name;
      });
      labelsSel.transition().duration(styles.durations.normal).attr("transform", function (d) {
        return helpers.calculateTextTransform(d, arcGenerator);
      }).style("opacity", function (d) {
        return d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType) ? 0 : d.data.opacity;
      });
    }
    function updateLabels(labelsGroup, pieData, arcGenerator, ringType) {
      var labelsSel = labelsGroup.selectAll("text").data(pieData, function (d) {
        return d.data.name;
      });
      var labelsEnter = labelsSel.enter().append("text").attr("class", "cell-label").style("opacity", function (d) {
        return d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType) ? 0 : d.data.opacity;
      }).attr("transform", function (d) {
        return helpers.calculateTextTransform(d, arcGenerator);
      }).style("text-anchor", "middle").style("dominant-baseline", "central").style("font-family", styles.fonts.family).style("font-size", function (d) {
        var b = styles.fonts.labels.baseSize;
        // ✅ Semantic font size mapping
        var order = getRingOrder();
        var physical = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];
        var fontSizeMap = {
          invisible: b.outer,
          outer: b.outer,
          middle: b.middle,
          inner: b.inner
        };
        var fontSize = fontSizeMap[physical] || b.middle;
        return "".concat(fontSize, "px");
      }).style("font-weight", styles.fonts.labels.weight).style("fill", function (d) {
        // ✅ Semantic text color mapping - use USER colors directly (not position-based)
        var textColorMap = {
          invisible: 'black',
          positive: userTextColors.positive,
          negative: userTextColors.negative,
          neutral: userTextColors.neutral
        };
        return textColorMap[ringType] || userTextColors.neutral;
      }).style("pointer-events", "none").each(function (d) {
        var textElement = d3.select(this);
        var b = styles.fonts.labels.baseSize;
        // ✅ Semantic font size mapping
        var fontSizeMap = {
          invisible: b.outer,
          negative: b.outer,
          neutral: b.middle,
          positive: b.inner
        };
        textElement.style("font-size", "".concat(fontSizeMap[ringType] || b.middle, "px"));
        var text = d.data.fullText || d.data.name;
        var dataToUse = getDataToUse();
        var pieDataLocal;
        // ✅ Use semantic keys (polarity metadata in data helps identify which data this is)
        getIsWhiteOutside();
        if (ringType === "invisible") {
          pieDataLocal = pie(dataToUse.invisible);
          d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible);
        } else if (ringType === "positive") {
          pieDataLocal = pie(dataToUse.positive);
          d3.arc().innerRadius(30).outerRadius(radii.centerRadius);
        } else if (ringType === "negative") {
          pieDataLocal = pie(dataToUse.negative);
          var rr = getRadiiForSemantic('negative', radii, styles);
          var innerR = rr.inner;
          var outerR = rr.outer;
          d3.arc().innerRadius(innerR).outerRadius(outerR);
        } else if (ringType === "neutral") {
          pieDataLocal = pie(dataToUse.neutral);
          var _rr = getRadiiForSemantic('neutral', radii, styles);
          var _innerR = _rr.inner;
          var _outerR = _rr.outer;
          d3.arc().innerRadius(_innerR).outerRadius(_outerR);
        } else {
          pieDataLocal = pie(dataToUse.neutral);
          var _rr2 = getRadiiForSemantic('neutral', radii, styles);
          var _innerR2 = _rr2.inner;
          var _outerR2 = _rr2.outer;
          d3.arc().innerRadius(_innerR2).outerRadius(_outerR2);
        }
        var arcDatum = pieDataLocal.find(function (p) {
          return p.data.unitId === d.data.unitId;
        });
        var constraints = helpers.getTextConstraints(ringType, arcDatum);
        helpers.wrapText(textElement, text, constraints);
      });
      labelsSel.merge(labelsEnter).transition().duration(styles.durations.normal).attr("transform", function (d) {
        return helpers.calculateTextTransform(d, arcGenerator);
      }).style("opacity", function (d) {
        return d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType) ? 0 : d.data.opacity;
      }).on("end", function (d) {
        if (d && d.data) {
          var textElement = d3.select(this);
          var b = styles.fonts.labels.baseSize;
          // ✅ Semantic font size mapping
          var order = getRingOrder();
          var physical = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];
          var fontSizeMap = {
            invisible: b.outer,
            outer: b.outer,
            middle: b.middle,
            inner: b.inner
          };
          var fontSize = fontSizeMap[physical] || b.middle;
          textElement.style("font-size", "".concat(fontSize, "px"));
          var text = d.data.fullText || d.data.name;
          var dataToUse = getDataToUse();
          var pieDataLocal;
          // ✅ Use semantic keys
          getIsWhiteOutside();
          if (ringType === "invisible") {
            pieDataLocal = pie(dataToUse.invisible);
            d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible);
          } else if (ringType === "positive") {
            pieDataLocal = pie(dataToUse.positive);
            d3.arc().innerRadius(30).outerRadius(radii.centerRadius);
          } else if (ringType === "negative") {
            pieDataLocal = pie(dataToUse.negative);
            var rr = getRadiiForSemantic('negative', radii, styles);
            var innerR = rr.inner;
            var outerR = rr.outer;
            d3.arc().innerRadius(innerR).outerRadius(outerR);
          } else if (ringType === "neutral") {
            pieDataLocal = pie(dataToUse.neutral);
            var _rr3 = getRadiiForSemantic('neutral', radii, styles);
            var _innerR3 = _rr3.inner;
            var _outerR3 = _rr3.outer;
            d3.arc().innerRadius(_innerR3).outerRadius(_outerR3);
          } else {
            pieDataLocal = pie(dataToUse.neutral);
            var _rr4 = getRadiiForSemantic('neutral', radii, styles);
            var _innerR4 = _rr4.inner;
            var _outerR4 = _rr4.outer;
            d3.arc().innerRadius(_innerR4).outerRadius(_outerR4);
          }
          var arcDatum = pieDataLocal.find(function (p) {
            return p.data.unitId === d.data.unitId;
          });
          var constraints = helpers.getTextConstraints(ringType, arcDatum);
          helpers.wrapText(textElement, text, constraints);
        }
      });
      labelsSel.exit().transition().duration(styles.durations.normal).style("opacity", 0).remove();
    }
    function updateRing(group, labelsGroup, data, arcGenerator, ringType, colorScale) {
      var pieData = pie(data);
      var paths = group.selectAll("path").data(pieData, function (d) {
        return d.data.name;
      });
      var pathsEnter = paths.enter().append("path").attr("class", "cell").attr("fill", function (d) {
        return colorScale(d.data.unitId);
      }).attr("stroke", ringType === "neutral" ? styles.colors.strokes.middleRing : styles.colors.strokes["default"]).attr("stroke-width", ringType === "neutral" ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth).attr("stroke-dasharray", "1,3").attr("stroke-linecap", "round").attr("stroke-opacity", 0.3).style("opacity", function (d) {
        if (!getCellVisibility(d.data.unitId, ringType)) return 0;
        // ✅ Semantic opacity mapping
        var opacityMap = {
          invisible: 1,
          negative: 1,
          neutral: 0.9,
          positive: 0.8
        };
        var baseOpacity = opacityMap[ringType] || 1;
        return d.data.opacity * baseOpacity;
      }).attr("d", arcGenerator).each(function (d) {
        this._current = d;
      });
      if (bindCellEvents) {
        bindCellEvents(pathsEnter, ringType);
      }
      paths.merge(pathsEnter).transition().duration(styles.durations.normal).attrTween("d", arcTween(arcGenerator)).style("opacity", function (d) {
        if (!getCellVisibility(d.data.unitId, ringType)) return 0;
        if (ringType === "invisible") return 0;
        // ✅ Semantic opacity mapping
        var opacityMap = {
          negative: 1,
          neutral: 0.9,
          positive: 0.8
        };
        var baseOpacity = opacityMap[ringType] || 1;
        return d.data.opacity * baseOpacity;
      });
      paths.exit().transition().duration(styles.durations.normal).style("opacity", 0).remove();
      updateLabels(labelsGroup, pieData, arcGenerator, ringType);
    }
    function updateAllRings() {
      var dataToUse = getDataToUse();
      var order = getRingOrder();

      // ✅ SEMANTIC MAPPING: Map semantic data to physical groups based on central order
      // Invisible always stays in invisible ring
      updateRing(invisibleGroup, invisibleLabelsGroup, dataToUse.invisible, invisibleArc, "invisible", invisibleColor);

      // Positive (green) always in inner ring - color matches semantic type
      updateRing(innerGroup, innerLabelsGroup, dataToUse.positive, innerArc, "positive", positiveColor);

      // Middle and outer rings determined by central order
      var middleSemantic = order.byPhysical[1];
      var outerSemantic = order.byPhysical[2];
      var middleColor = middleSemantic === "negative" ? negativeColor : neutralColor;
      var outerColor = outerSemantic === "negative" ? negativeColor : neutralColor;
      updateRing(middleGroup, middleLabelsGroup, dataToUse[middleSemantic], middleArc, middleSemantic, middleColor);
      updateRing(outerGroup, outerLabelsGroup, dataToUse[outerSemantic], outerArc, outerSemantic, outerColor);
    }
    return {
      updateAllRings: updateAllRings,
      updateRing: updateRing,
      changeData: changeData
    };
  };
}
function _dialecticalData(transformWisdomUnitsToDialecticalData, wisdomUnits, componentOrder, TsOnly, AsOnly) {
  return transformWisdomUnitsToDialecticalData(wisdomUnits, componentOrder, TsOnly, AsOnly);
}
function _width() {
  return 500;
}
function _styles(userHubColor, ringColors, textColors) {
  return {
    // Dimensions
    width: 500,
    height: 500,
    radii: {
      invisible: 250,
      outer: 200,
      middleOuter: 150,
      middleInner: 100,
      inner: 100,
      hub: 30,
      drag: 280
    },
    // Colors
    colors: {
      hub: userHubColor,
      // Khaki
      rings: ringColors,
      text: textColors,
      strokes: {
        "default": "#000",
        middleRing: "#000",
        zoom: null
      },
      axis: {
        positive: {
          fill: "#C6E5B3",
          stroke: "#2d5a2d"
        },
        neutral: {
          fill: "white",
          stroke: "#333"
        },
        negative: {
          fill: "#F9C6CC",
          stroke: "#8b1538"
        }
      }
    },
    // Fonts
    fonts: {
      labels: {
        baseSize: {
          outer: 10,
          middle: 10,
          inner: 10
        },
        weight: "600",
        zoomBaseSize: 8,
        zoomMinSize: 6,
        zoomMaxSize: 16
      },
      coordinates: {
        size: 12,
        weight: "bold"
      }
    },
    // Strokes
    strokes: {
      defaultWidth: 1,
      middleRingWidth: 1,
      zoomWidth: 0,
      axisCircleWidth: 1.5
    },
    // Animation
    durations: {
      normal: 750,
      stepRotation: 600
    }
  };
}
function _arrowControls(html, parseArrowConnections, arrowConnections, dialecticalData, viewof_chart, isThesisType, arrowUtilities, d3) {
  return function () {
    var container = html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div style=\"display: flex; flex-direction: column; align-items: center; margin: 20px 0;\">\n        <div style=\"margin-bottom: 10px; font-weight: bold;\">Arrow Connections</div>\n\n        <!-- Basic Arrow Controls -->\n        <div style=\"display: flex; gap: 10px; margin-bottom: 15px; align-items: center;\">\n          <button id=\"toggle-arrows\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\">Show Arrows</button>\n          <button id=\"redraw-arrows\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\">Redraw Arrows</button>\n          <button id=\"toggle-anchors\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff3cd; cursor: pointer;\">Show Anchor Points</button>\n        </div>\n\n        <!-- Step-by-Step Arrow Drawing -->\n        <div style=\"border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9;\">\n          <div style=\"font-weight: bold; margin-bottom: 10px;\">Step-by-Step Arrow Drawing</div>\n          <div style=\"display: flex; gap: 10px; margin-bottom: 10px; align-items: center;\">\n            <button id=\"start-arrow-steps\" style=\"padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #e7f3ff; cursor: pointer;\">Start Step Mode</button>\n            <button id=\"prev-arrow\" style=\"padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\" disabled>Previous</button>\n            <span id=\"arrow-counter\" style=\"margin: 0 10px; font-weight: bold; min-width: 120px;\">Ready to start</span>\n            <button id=\"next-arrow\" style=\"padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\" disabled>Next Arrow</button>\n            <button id=\"show-all-arrows\" style=\"padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\">Show All</button>\n          </div>\n          <div id=\"current-arrow-info\" style=\"font-size: 12px; color: #666; min-height: 20px; font-style: italic;\"></div>\n        </div>\n      </div>"])));
    var toggleBtn = container.querySelector('#toggle-arrows');
    var redrawBtn = container.querySelector('#redraw-arrows');
    var toggleAnchorsBtn = container.querySelector('#toggle-anchors');

    // Step-by-step controls
    var startStepsBtn = container.querySelector('#start-arrow-steps');
    var prevArrowBtn = container.querySelector('#prev-arrow');
    var nextArrowBtn = container.querySelector('#next-arrow');
    var showAllBtn = container.querySelector('#show-all-arrows');
    var arrowCounter = container.querySelector('#arrow-counter');
    var arrowInfo = container.querySelector('#current-arrow-info');
    var arrowsVisible = false;
    var arrowStepMode = false;
    var currentArrowStep = 0;
    var parsedArrowConnections = [];

    // Parse current connections for step mode
    function updateArrowConnections() {
      parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData);
    }
    function updateArrowStepUI() {
      if (!arrowStepMode) {
        arrowCounter.textContent = "Ready to start";
        arrowInfo.textContent = "";
        startStepsBtn.disabled = false;
        prevArrowBtn.disabled = true;
        nextArrowBtn.disabled = true;
        showAllBtn.disabled = false;
        return;
      }
      var totalArrows = parsedArrowConnections.length;
      arrowCounter.textContent = "Arrow ".concat(currentArrowStep, " of ").concat(totalArrows);
      if (currentArrowStep === 0) {
        arrowInfo.textContent = "All arrows cleared. Click Next to draw first arrow.";
      } else if (currentArrowStep <= totalArrows) {
        var conn = parsedArrowConnections[currentArrowStep - 1];
        arrowInfo.textContent = "Current: ".concat(conn.from).concat(conn.fromRing !== 'middle' ? conn.fromRing === 'inner' ? '+' : '-' : '', " \u2192 ").concat(conn.to).concat(conn.toRing !== 'middle' ? conn.toRing === 'inner' ? '+' : '-' : '');
      }
      startStepsBtn.disabled = true;
      prevArrowBtn.disabled = currentArrowStep <= 0;
      nextArrowBtn.disabled = currentArrowStep >= totalArrows;
      showAllBtn.disabled = false;
    }
    function drawArrowsUpToStep(step) {
      viewof_chart.clearArrows();
      if (step <= 0) return;
      for (var i = 0; i < Math.min(step, parsedArrowConnections.length); i++) {
        var conn = parsedArrowConnections[i];

        // Calculate color (same logic as drawAllArrows)
        var color = "#666";
        if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
          if (conn.fromRing === 'inner' && conn.toRing === 'inner' || conn.fromRing === 'outer' && conn.toRing === 'outer' || conn.fromRing === 'invisible' && conn.toRing === 'invisible') {
            color = "#16a34a"; // Green for same polarity
          } else if (conn.fromRing === 'inner' && conn.toRing === 'outer' || conn.fromRing === 'outer' && conn.toRing === 'inner') {
            color = "#dc2626"; // Red for opposite polarity
          } else if (conn.fromRing === 'invisible' || conn.toRing === 'invisible') {
            color = "#ff9500"; // Orange for invisible ring connections
          } else {
            color = "#8b5cf6"; // Purple for mixed connections
          }
        } else {
          var fromIsThesis = isThesisType(conn.from);
          var toIsThesis = isThesisType(conn.to);
          if (fromIsThesis === toIsThesis) {
            color = "#2563eb"; // Blue for same type
          } else {
            color = "#dc2626"; // Red for opposition
          }
        }
        drawStaticArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing);
      }
    }
    function drawNextArrow() {
      if (currentArrowStep >= parsedArrowConnections.length) return;
      var conn = parsedArrowConnections[currentArrowStep];

      // Calculate color
      var color = "#666";
      if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
        if (conn.fromRing === 'inner' && conn.toRing === 'inner' || conn.fromRing === 'outer' && conn.toRing === 'outer') {
          color = "#16a34a"; // Green for same polarity
        } else if (conn.fromRing === 'inner' && conn.toRing === 'outer' || conn.fromRing === 'outer' && conn.toRing === 'inner') {
          color = "#dc2626"; // Red for opposite polarity
        } else {
          color = "#8b5cf6"; // Purple for mixed connections
        }
      } else {
        var fromIsThesis = isThesisType(conn.from);
        var toIsThesis = isThesisType(conn.to);
        if (fromIsThesis === toIsThesis) {
          color = "#2563eb"; // Blue for same type
        } else {
          color = "#dc2626"; // Red for opposition
        }
      }

      // Draw this arrow with animation
      viewof_chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, 0);
    }
    function drawStaticArrow(from, to) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#666";
      var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      var fromRing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'middle';
      var toRing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'middle';
      var fromPos = viewof_chart.getCellCentroid(from, fromRing);
      var toPos = viewof_chart.getCellCentroid(to, toRing);
      if (!fromPos || !toPos) return;

      // Get the appropriate arrowhead marker ID for this color
      function getArrowheadId(color) {
        switch (color) {
          case "#16a34a":
            return "arrowhead-green";
          case "#dc2626":
            return "arrowhead-red";
          case "#8b5cf6":
            return "arrowhead-purple";
          case "#2563eb":
            return "arrowhead-blue";
          case "#ff9500":
            return "arrowhead-orange";
          default:
            return "arrowhead-gray";
        }
      }
      var arrowheadId = getArrowheadId(color);

      // Use shared path calculator for consistency
      var arrowPath = arrowUtilities.calculateArrowPath(fromPos, toPos, 10);
      var path = arrowPath.path;

      // Get the arrows group from the chart
      var svg = d3.select(viewof_chart);
      var arrowsGroup = svg.select('.arrows-group');

      // Draw static arrow (no animation)
      arrowsGroup.append("path").attr("d", path).attr("stroke", color).attr("stroke-width", strokeWidth).attr("fill", "none").attr("marker-end", "url(#".concat(arrowheadId, ")")).attr("opacity", 0.7);
    }

    // Basic arrow controls
    toggleBtn.addEventListener('click', function () {
      if (arrowsVisible) {
        viewof_chart.clearArrows();
        toggleBtn.textContent = 'Show Arrows';
        arrowsVisible = false;
      } else {
        if (arrowStepMode) {
          drawArrowsUpToStep(currentArrowStep);
        } else {
          viewof_chart.drawAllArrows();
        }
        toggleBtn.textContent = 'Hide Arrows';
        arrowsVisible = true;
      }
    });
    redrawBtn.addEventListener('click', function () {
      if (arrowsVisible) {
        if (arrowStepMode) {
          drawArrowsUpToStep(currentArrowStep);
        } else {
          viewof_chart.drawAllArrows();
        }
      }
    });

    // Step-by-step arrow controls
    startStepsBtn.addEventListener('click', function () {
      updateArrowConnections();
      arrowStepMode = true;
      currentArrowStep = 0;
      if (arrowsVisible) {
        viewof_chart.clearArrows();
      }
      updateArrowStepUI();
    });
    prevArrowBtn.addEventListener('click', function () {
      if (currentArrowStep > 0) {
        currentArrowStep--;
        if (arrowsVisible) {
          drawArrowsUpToStep(currentArrowStep);
        }
        updateArrowStepUI();
      }
    });
    nextArrowBtn.addEventListener('click', function () {
      if (currentArrowStep < parsedArrowConnections.length) {
        if (arrowsVisible) {
          // Draw only the next arrow with animation
          drawNextArrow();
        }
        currentArrowStep++;
        updateArrowStepUI();
      }
    });
    showAllBtn.addEventListener('click', function () {
      arrowStepMode = false;
      currentArrowStep = 0;
      if (arrowsVisible) {
        viewof_chart.drawAllArrows();
      }
      updateArrowStepUI();
    });

    // Anchor points visualization toggle
    var anchorsVisible = false;
    toggleAnchorsBtn.addEventListener('click', function () {
      var message = viewof_chart.toggleAnchorPoints();
      anchorsVisible = !anchorsVisible;
      toggleAnchorsBtn.textContent = anchorsVisible ? 'Hide Anchor Points' : 'Show Anchor Points';
      toggleAnchorsBtn.style.background = anchorsVisible ? '#ffc107' : '#fff3cd';
      console.log(message);
    });

    // Initialize
    updateArrowConnections();
    updateArrowStepUI();

    // Return the container
    container.value = "arrow-controls";
    return container;
  }();
}
function _2(unFocus, viewof_chart) {
  if (unFocus) {
    viewof_chart.unfocus();
  }
}
function _unFocus(Inputs) {
  return Inputs.toggle({
    label: "Unfocus"
  });
}
function _showFlow(Inputs) {
  return Inputs.toggle({
    label: "Show sequential flow"
  });
}
function _showFlowSubscription(Generators, viewof_showFlow, viewof_chart, invalidation) {
  return Generators.observe(function (notify) {
    var node = viewof_showFlow;
    var handler = function handler() {
      viewof_chart.toggleFlowArrows(node.value);
      notify(node.value);
    };
    node.addEventListener("input", handler);
    invalidation.then(function () {
      return node.removeEventListener("input", handler);
    });
    handler();
  });
}
function _isWhiteOutside(Inputs) {
  return Inputs.toggle({
    label: "Neutral outside"
  });
}
function _userRingColors() {
  return {
    negative: "#F9C6CC",
    // Red ring background color (semantic)
    neutral: "#ffffff",
    // White ring background color (semantic)
    positive: "#C6E5B3" // Green ring background color (semantic)
  };
}
function _userTextColors() {
  return {
    negative: "#8b1538",
    // Red ring text color (semantic)
    neutral: "#333",
    // White ring text color (semantic)
    positive: "#2d5a2d",
    // Green ring text color (semantic)
    coordinates: "#333" // Coordinate text color
  };
}
function _userHubColor() {
  return "#ffff7a";
}
function _ringColors(getRingOrder, userRingColors) {
  return function () {
    var order = getRingOrder();
    var physicalToSemantic = order.byPhysical;
    return {
      outer: physicalToSemantic[2] === 'neutral' ? userRingColors.neutral : userRingColors.negative,
      middle: physicalToSemantic[1] === 'neutral' ? userRingColors.neutral : userRingColors.negative,
      inner: userRingColors.positive
    };
  }();
}
function _textColors(userTextColors) {
  return {
    negative: userTextColors.negative,
    neutral: userTextColors.neutral,
    positive: userTextColors.positive,
    coordinates: userTextColors.coordinates
  };
}
function _whitesOnly(Inputs) {
  return Inputs.toggle({
    label: "White cells only"
  });
}
function _TsOnly(Inputs) {
  return Inputs.toggle({
    label: "Ts only"
  });
}
function _AsOnly(Inputs) {
  return Inputs.toggle({
    label: "As only"
  });
}
function _3(DOM, serialize, viewof_chart) {
  return DOM.download(function () {
    return serialize(viewof_chart);
  }, undefined, "Save as SVG");
}
function _getRingRadii() {
  return function (ringType, whiteOutside, radiiObj, stylesObj) {
    // Map semantic names to physical positions
    var positionMap = {
      invisible: 'invisible',
      positive: 'inner',
      // Green always in inner
      negative: whiteOutside ? 'middle' : 'outer',
      // Red moves
      neutral: whiteOutside ? 'outer' : 'middle' // White moves
    };
    var position = positionMap[ringType];

    // Return radii for that physical position
    var radiiConfig = {
      invisible: {
        inner: radiiObj.outerRadius,
        outer: stylesObj.radii.invisible
      },
      outer: {
        inner: radiiObj.innerRadius,
        outer: radiiObj.outerRadius
      },
      middle: {
        inner: radiiObj.innerInnerRadius,
        outer: radiiObj.middleRadius
      },
      inner: {
        inner: 30,
        // hub radius
        outer: radiiObj.centerRadius
      }
    };
    return radiiConfig[position];
  };
}
function _getPhysicalGroupsForSemantics(getRingOrder) {
  return function (ringType, groups) {
    var order = getRingOrder();
    var physical = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];
    var group = physical === "outer" ? groups.outerGroup : physical === "middle" ? groups.middleGroup : physical === "inner" ? groups.innerGroup : groups.invisibleGroup;
    var labelsGroup = physical === "outer" ? groups.outerLabelsGroup : physical === "middle" ? groups.middleLabelsGroup : physical === "inner" ? groups.innerLabelsGroup : groups.invisibleLabelsGroup;
    return {
      group: group,
      labelsGroup: labelsGroup
    };
  };
}
function _makeArrowsModule(getRadiiForSemantic, d3, getRingOrder, location) {
  return function (_ref2) {
    var defs = _ref2.defs,
      contentGroup = _ref2.contentGroup,
      centerCircle = _ref2.centerCircle,
      nestedData = _ref2.nestedData,
      pie = _ref2.pie,
      radii = _ref2.radii,
      styles = _ref2.styles,
      arrowUtilities = _ref2.arrowUtilities;
    var arrowsGroup = contentGroup.append("g").attr("class", "arrows-group").style("pointer-events", "all"); // Enable pointer events for clickable arrows
    // Ensure yellow circle is beneath arrows
    centerCircle.lower();
    // Ensure arrows are above rings (labels/coordinate can raise after)
    arrowsGroup.raise();
    // Prepare arrowheads
    arrowUtilities.createArrowheadMarker(defs, "#666", "arrowhead-gray");
    arrowUtilities.createArrowheadMarker(defs, "#16a34a", "arrowhead-green");
    arrowUtilities.createArrowheadMarker(defs, "#dc2626", "arrowhead-red");
    arrowUtilities.createArrowheadMarker(defs, "#8b5cf6", "arrowhead-purple");
    arrowUtilities.createArrowheadMarker(defs, "#2563eb", "arrowhead-blue");
    arrowUtilities.createArrowheadMarker(defs, "#ff9500", "arrowhead-orange");
    // Label groups for anchoring arrows to text labels
    var labelGroups = {
      invisible: contentGroup.select('.invisible-labels'),
      outer: contentGroup.select('.outer-labels'),
      middle: contentGroup.select('.middle-labels'),
      inner: contentGroup.select('.inner-labels')
    };
    function getCellCentroid(unitId) {
      var ringType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "neutral";
      // ✅ Default to neutral
      var dataToUse = nestedData;
      radii.outerRadius;
        radii.innerRadius;
        radii.innerInnerRadius;
        radii.middleRadius;
        radii.centerRadius;

      // ✅ SEMANTIC: Use helper to get radii and data key
      var ringRadii = getRadiiForSemantic(ringType, radii, styles);

      // Get pie data using semantic key
      var ringData = dataToUse[ringType];
      if (!ringData) return null;
      var pieData = pie(ringData);
      var arcGenerator = d3.arc().innerRadius(ringRadii.inner).outerRadius(ringRadii.outer);
      var cellData = pieData.find(function (d) {
        return d.data.unitId === unitId;
      });
      if (!cellData) return null;
      var centroid = arcGenerator.centroid(cellData);

      // Use radii from helper
      var ringInner = ringRadii.inner;
      var ringOuter = ringRadii.outer;
      var angleSpan = cellData.endAngle - cellData.startAngle;
      var rCentroid = (ringInner + ringOuter) / 2;
      var thickness = ringOuter - ringInner;
      return {
        x: centroid[0],
        y: centroid[1],
        angle: (cellData.startAngle + cellData.endAngle) / 2,
        ringType: ringType,
        rInner: ringInner,
        rOuter: ringOuter,
        rCentroid: rCentroid,
        thickness: thickness,
        angleSpan: angleSpan
      };
    }
    // Compute label info (center in contentGroup coords and bounding radius from text bbox)
    function getLabelInfo(unitId, ringType) {
      var order = getRingOrder();
      var physical = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];
      var group = labelGroups[physical];
      if (!group || group.empty()) return null;
      var sel = group.selectAll('text.cell-label').filter(function (d) {
        return d && d.data && d.data.unitId === unitId;
      });
      if (sel.empty()) return null;
      var node = sel.node();
      var bbox = node.getBBox();
      // The transform is set as translate(x,y) rotate(...)
      var transformAttr = node.getAttribute('transform') || '';
      var cx = 0,
        cy = 0,
        rotationDeg = 0;
      var match = transformAttr.match(/translate\(([^,\)]+)[, ]+([^\)]+)\)/);
      if (match) {
        cx = parseFloat(match[1]);
        cy = parseFloat(match[2]);
      }
      var rotMatch = transformAttr.match(/rotate\(([-+]?[0-9]*\.?[0-9]+)\)/);
      if (rotMatch) {
        rotationDeg = parseFloat(rotMatch[1]);
      }
      var radius = Math.sqrt(Math.pow(bbox.width / 2, 2) + Math.pow(bbox.height / 2, 2));
      return {
        x: cx,
        y: cy,
        labelWidth: bbox.width,
        labelHeight: bbox.height,
        labelRotationRadians: rotationDeg * Math.PI / 180,
        radius: radius
      };
    }
    function drawArrow(from, to) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#666";
      var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      var fromRing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "middle";
      var toRing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "middle";
      var delay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      // Use centroids only for endpoints
      var fromPos = getCellCentroid(from, fromRing);
      var toPos = getCellCentroid(to, toRing);
      if (!fromPos || !toPos) return;

      // Shorten by scaling toward midpoint
      var shrink = 1;
      var midX = (fromPos.x + toPos.x) / 2;
      var midY = (fromPos.y + toPos.y) / 2;
      var source = {
        x: midX + (fromPos.x - midX) * shrink,
        y: midY + (fromPos.y - midY) * shrink
      };
      var target = {
        x: midX + (toPos.x - midX) * shrink,
        y: midY + (toPos.y - midY) * shrink
      };
      var arrowPath = arrowUtilities.calculateArrowPath(source, target, 0);
      var arrowheadId = arrowUtilities.getArrowheadId(color);
      var staticPath = arrowsGroup.append("path").attr("d", arrowPath.path).attr("stroke", color).attr("stroke-width", strokeWidth).attr("fill", "none").attr("opacity", 0.3).attr("stroke-dasharray", "3,3");
      var animatedHead = arrowsGroup.append("polygon").attr("points", "0,-1.5 4.5,0 0,1.5").attr("fill", color).attr("opacity", 0);
      animatedHead.transition().delay(delay).duration(1200).ease(d3.easeQuadInOut).attrTween("transform", function () {
        return function (t) {
          var p = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, t);
          var nextT = Math.min(t + 0.01, 1);
          var n = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, nextT);
          var ang = Math.atan2(n.y - p.y, n.x - p.x) * 180 / Math.PI;
          return "translate(".concat(p.x, ", ").concat(p.y, ") rotate(").concat(ang, ")");
        };
      }).attr("opacity", 1).on("start", function () {
        staticPath.transition().duration(200).attr("opacity", 0.7);
      }).on("end", function () {
        animatedHead.remove();
        staticPath.attr("marker-end", function () {
          return "url(".concat(new URL("#".concat(arrowheadId), location), ")");
        }).attr("stroke-dasharray", "none").transition().duration(300).attr("opacity", 0.9);
      });
    }
    function clearArrows() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$includeFlow = options.includeFlow,
        includeFlow = _options$includeFlow === void 0 ? true : _options$includeFlow;
      // Only remove label-link groups. Optionally preserve flow arrows (klass: 'flow-arrows').
      var selector = includeFlow ? ".label-link-group" : ".label-link-group:not(.flow-arrows)";
      arrowsGroup.selectAll(selector).remove();
    }
    /**
     * Draw arrows between label nodes using perfect-arrows inspired API.
     * 
     * Based on https://github.com/steveruizok/perfect-arrows
     * 
     * @param {Array} connections - Array of connection objects with from/to/fromRing/toRing
     * @param {Object} options - Arrow styling options
     * @param {string} options.klass - Optional CSS class to tag this batch (e.g., 'flow-arrows')
     * @param {number} options.bow - Natural bow/curvature of the arrow. At 0, all lines will be straight. Default: 0
     * @param {number} options.stretch - The effect that the arrow's length will have on the bow (0-1). 
     *                                    At 0, the stretch will have no effect. Default: 0.5
     * @param {number} options.minStretch - The length of the arrow where the line should be most stretched. 
     *                                       Shorter distances will have no additional effect. Default: 0
     * @param {number} options.maxStretch - The length of the arrow at which the stretch should have no effect. Default: 420
     * @param {number} options.padStart - Padding at arrow start in pixels. Uses adaptive scaling (min of px or max %). Default: 0
     * @param {number} options.padEnd - Padding at arrow end in pixels. Uses adaptive scaling (min of px or max %). Default: 0
     * @param {number} options.maxPadPercent - Maximum padding as percentage of path length (0-1). Default: 0.25
     * @param {boolean} options.flip - Whether to reflect the arrow's bow angle. Default: false
     * @param {boolean} options.straights - Whether to use straight lines at 45 degree angles. Default: true
     * @param {Function} options.onArrowClick - Callback function when arrow is clicked. Receives DOT script line.
     * @param {number} options.shortenBy - DEPRECATED - Use padStart/padEnd instead
     */
    function drawLabelLinks(connections) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var klass = options.klass || "";

      // Arrow style options (perfect-arrows compatible)
      var bow = options.bow !== undefined ? options.bow : 0;
      var stretch = options.stretch !== undefined ? options.stretch : 0.5;
      var minStretch = options.minStretch !== undefined ? options.minStretch : 0;
      var maxStretch = options.maxStretch !== undefined ? options.maxStretch : 420;
      var padStart = options.padStart !== undefined ? options.padStart : 0; // in pixels
      var padEnd = options.padEnd !== undefined ? options.padEnd : 0; // in pixels
      var maxPadPercent = options.maxPadPercent !== undefined ? options.maxPadPercent : 0.25; // max 25% of path
      var flip = options.flip !== undefined ? options.flip : false;
      var straights = options.straights !== undefined ? options.straights : true;
      var onArrowClick = options.onArrowClick || null; // callback for arrow clicks

      // Backward compatibility
      var shortenBy = options.shortenBy || 0;

      // Build node map keyed by unitId:ringType
      var nodeByKey = new Map();
      function ensureNode(unitId, ringType) {
        var key = "".concat(unitId, ":").concat(ringType);
        if (nodeByKey.has(key)) return nodeByKey.get(key);
        var label = getLabelInfo(unitId, ringType);
        var pos = label || getCellCentroid(unitId, ringType);
        if (!pos) return null;
        var padding = 2;
        var hasEllipse = !!label;
        // Use inscribed ellipse: fits inside the bounding box
        var ellipseRx = hasEllipse ? Math.max(1, label.labelWidth / 2) : null;
        var ellipseRy = hasEllipse ? Math.max(1, label.labelHeight / 2) : null;
        var ellipseTheta = hasEllipse ? label.labelRotationRadians || 0 : 0;
        var radius = hasEllipse ? Math.max(ellipseRx, ellipseRy) + padding : Math.max(6, (pos.thickness || 12) * 0.3);
        var node = {
          id: key,
          unitId: unitId,
          ringType: ringType,
          x: pos.x,
          y: pos.y,
          fx: pos.x,
          fy: pos.y,
          radius: radius,
          hasEllipse: hasEllipse,
          ellipseRx: ellipseRx,
          ellipseRy: ellipseRy,
          ellipseTheta: ellipseTheta
        };
        nodeByKey.set(key, node);
        return node;
      }

      // Build links with per-connection color and original connection data
      var links = [];
      connections.forEach(function (conn) {
        var fromRing = conn.fromRing || 'middle';
        var toRing = conn.toRing || 'middle';
        var s = ensureNode(conn.from, fromRing);
        var t = ensureNode(conn.to, toRing);
        if (!s || !t) return;
        var color = arrowUtilities.calculateArrowColor(fromRing, toRing, conn.from, conn.to);

        // Generate DOT script line for this arrow
        var dotLine = "".concat(conn.from, ":").concat(fromRing, " -> ").concat(conn.to, ":").concat(toRing);
        links.push({
          source: s,
          target: t,
          color: color,
          dotLine: dotLine,
          connection: conn
        });
      });

      // Generate arrow path from source center to target center (perfect-arrows inspired)
      function linkArc(d) {
        // Start from centroids (before any padding)
        var startX = d.source.x;
        var startY = d.source.y;
        var endX = d.target.x;
        var endY = d.target.y;
        var dx = endX - startX;
        var dy = endY - startY;
        var distance = Math.hypot(dx, dy) || 1;

        // Calculate bow amount based on stretch (perfect-arrows algorithm)
        var stretchEffect = 0;
        if (stretch > 0 && distance > minStretch) {
          var stretchRange = maxStretch - minStretch;
          var distanceInRange = Math.min(distance - minStretch, stretchRange);
          stretchEffect = 1 - distanceInRange / stretchRange;
        }

        // Apply inverse distance scaling to bow: shorter arrows get more bow, longer arrows get less
        // Reference length for bow scaling (typical medium arrow)
        var bowReferenceLength = 100;
        var bowLengthScale = Math.max(0.3, Math.min(1.5, bowReferenceLength / distance));

        // Combine stretch and distance scaling effects
        var effectiveBow = bow * (1 + stretchEffect * stretch) * bowLengthScale;

        // Check for straight lines at 45° angles if straights enabled
        if (straights && effectiveBow === 0) {
          var angle = Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
          var angleMod = angle % 90;
          if (Math.abs(angleMod - 45) < 2 || Math.abs(angleMod) < 2 || Math.abs(angleMod - 90) < 2) {
            return "M".concat(startX, ",").concat(startY, " L").concat(endX, ",").concat(endY);
          }
        }

        // No bow - straight line
        if (effectiveBow === 0) {
          return "M".concat(startX, ",").concat(startY, " L").concat(endX, ",").concat(endY);
        }

        // Calculate control point for curved arrow
        var midX = (startX + endX) / 2;
        var midY = (startY + endY) / 2;

        // Perpendicular direction
        var perpX = -dy / distance;
        var perpY = dx / distance;

        // Flip if requested
        if (flip) {
          perpX = -perpX;
          perpY = -perpY;
        } else {
          // Default: ensure bend is outward (away from origin)
          var dotOut = perpX * midX + perpY * midY;
          if (dotOut < 0) {
            perpX = -perpX;
            perpY = -perpY;
          }
        }

        // Apply bow
        var curveAmount = effectiveBow * distance;
        var cx = midX + perpX * curveAmount;
        var cy = midY + perpY * curveAmount;
        return "M".concat(startX, ",").concat(startY, " Q ").concat(cx, ",").concat(cy, " ").concat(endX, ",").concat(endY);
      }

      // Helper: Check if a point is inside an ellipse
      function isPointInEllipse(px, py, cx, cy, rx, ry, theta) {
        // Rotate point into ellipse local frame
        var dx = px - cx;
        var dy = py - cy;
        var c = Math.cos(-theta);
        var s = Math.sin(-theta);
        var localX = dx * c - dy * s;
        var localY = dx * s + dy * c;
        // Check if point is inside ellipse
        return localX * localX / (rx * rx) + localY * localY / (ry * ry) <= 1;
      }

      // Helper: Find where path enters target ellipse using binary search
      function findEllipseIntersection(pathData, cx, cy, rx, ry, theta) {
        // Create a temporary path element to sample the FULL path (before masking)
        var tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tempPath.setAttribute("d", pathData);
        var L = tempPath.getTotalLength();

        // Binary search to find intersection point
        var tMin = 0;
        var tMax = 1;
        var epsilon = 0.0001; // precision threshold

        // First check if end point is outside (no intersection)
        var endPoint = tempPath.getPointAtLength(L);
        if (!isPointInEllipse(endPoint.x, endPoint.y, cx, cy, rx, ry, theta)) {
          // Path doesn't intersect ellipse, use end point
          var _p = tempPath.getPointAtLength(Math.max(0, L - 1));
          var _angle = Math.atan2(endPoint.y - _p.y, endPoint.x - _p.x) * 180 / Math.PI;
          return {
            x: endPoint.x,
            y: endPoint.y,
            angle: _angle,
            t: 1
          };
        }

        // Binary search for the intersection point
        while (tMax - tMin > epsilon) {
          var tMid = (tMin + tMax) / 2;
          var p = tempPath.getPointAtLength(tMid * L);
          if (isPointInEllipse(p.x, p.y, cx, cy, rx, ry, theta)) {
            // Point is inside, intersection is earlier
            tMax = tMid;
          } else {
            // Point is outside, intersection is later
            tMin = tMid;
          }
        }

        // Get intersection point and angle
        var tIntersect = (tMin + tMax) / 2;
        var intersectionPoint = tempPath.getPointAtLength(tIntersect * L);

        // Calculate tangent angle at intersection
        var delta = 0.01;
        var p2 = tempPath.getPointAtLength(Math.max(0, (tIntersect - delta) * L));
        var angle = Math.atan2(intersectionPoint.y - p2.y, intersectionPoint.x - p2.x) * 180 / Math.PI;
        return {
          x: intersectionPoint.x,
          y: intersectionPoint.y,
          angle: angle,
          t: tIntersect
        };
      }
      var linkGroup = arrowsGroup.append("g").attr("class", "label-link-group".concat(klass ? " ".concat(klass) : ""));

      // Draw links sequentially with a shooting animation
      function drawNextLink(index) {
        if (index >= links.length) return;
        var d = links[index];

        // Generate full path from source to target center
        var fullPathData = linkArc(d);

        // Create temp path to sample and find intersection points
        var tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tempPath.setAttribute("d", fullPathData);
        var totalLength = tempPath.getTotalLength();

        // Find where path exits source ellipse/circle
        var tStart = 0;
        if (d.source.hasEllipse) {
          // Binary search from start to find where we exit source ellipse
          var tMin = 0,
            tMax = 1;
          var epsilon = 0.0001;
          while (tMax - tMin > epsilon) {
            var tMid = (tMin + tMax) / 2;
            var _p2 = tempPath.getPointAtLength(tMid * totalLength);
            if (isPointInEllipse(_p2.x, _p2.y, d.source.x, d.source.y, d.source.ellipseRx, d.source.ellipseRy, d.source.ellipseTheta)) {
              tMin = tMid; // Still inside, need to go further
            } else {
              tMax = tMid; // Outside, go back
            }
          }
          tStart = (tMin + tMax) / 2;
        } else {
          // For circles, find exit point
          var _tMin = 0,
            _tMax = 1;
          var _epsilon = 0.0001;
          while (_tMax - _tMin > _epsilon) {
            var _tMid = (_tMin + _tMax) / 2;
            var _p3 = tempPath.getPointAtLength(_tMid * totalLength);
            var dist = Math.hypot(_p3.x - d.source.x, _p3.y - d.source.y);
            if (dist < d.source.radius) {
              _tMin = _tMid;
            } else {
              _tMax = _tMid;
            }
          }
          tStart = (_tMin + _tMax) / 2;
        }

        // Find where path enters target ellipse/circle (from the end, going backwards)
        var tEnd = 1;
        if (d.target.hasEllipse) {
          var result = findEllipseIntersection(fullPathData, d.target.x, d.target.y, d.target.ellipseRx, d.target.ellipseRy, d.target.ellipseTheta);
          tEnd = result.t;
        } else {
          // For circles
          var _tMin2 = 0,
            _tMax2 = 1;
          var _epsilon2 = 0.0001;
          while (_tMax2 - _tMin2 > _epsilon2) {
            var _tMid2 = (_tMin2 + _tMax2) / 2;
            var _p4 = tempPath.getPointAtLength(_tMid2 * totalLength);
            var _dist = Math.hypot(_p4.x - d.target.x, _p4.y - d.target.y);
            if (_dist > d.target.radius) {
              _tMin2 = _tMid2; // Still outside, move forward
            } else {
              _tMax2 = _tMid2; // Inside, move back
            }
          }
          tEnd = (_tMin2 + _tMax2) / 2;
        }

        // Apply adaptive padding: use minimum of (fixed pixels OR maximum percentage)
        // This protects short arrows from disappearing while giving consistent gaps on long arrows

        // Convert pixel padding to percentage of path length
        var padStartPercent = (padStart || 0) / totalLength;
        var padEndPercent = (padEnd || 0) / totalLength;

        // Convert shortenBy (px) to percentage for backward compatibility
        var shortenByPercent = (shortenBy || 0) / totalLength;

        // Use whichever is smaller: the pixel-based percentage or the maximum allowed percentage
        // This means: "Use Npx gap, but never more than X% of the arrow"
        var actualPadStart = Math.min(padStartPercent, maxPadPercent) + shortenByPercent;
        var actualPadEnd = Math.min(padEndPercent, maxPadPercent) + shortenByPercent;
        var finalTStart = tStart;
        var finalTEnd = tEnd;
        if (actualPadStart > 0) {
          // Move forward from tStart by actualPadStart (as % of total path length)
          finalTStart = Math.min(1, tStart + actualPadStart);
        }
        if (actualPadEnd > 0) {
          // Move backward from tEnd by actualPadEnd (as % of total path length)
          finalTEnd = Math.max(0, tEnd - actualPadEnd);
        }

        // Get the actual start and end points after padding
        var startPoint = tempPath.getPointAtLength(finalTStart * totalLength);
        var endPoint = tempPath.getPointAtLength(finalTEnd * totalLength);

        // Now create the clipped path using the same curve type but with new endpoints
        var clippedPathData;
        if (fullPathData.includes('Q')) {
          // Quadratic bezier - extract control point and create new path
          var match = fullPathData.match(/M([^ ]+),([^ ]+) Q ([^ ]+),([^ ]+) ([^ ]+),([^ ]+)/);
          if (match) {
            var cx = parseFloat(match[3]);
            var cy = parseFloat(match[4]);
            clippedPathData = "M".concat(startPoint.x, ",").concat(startPoint.y, " Q ").concat(cx, ",").concat(cy, " ").concat(endPoint.x, ",").concat(endPoint.y);
          } else {
            clippedPathData = "M".concat(startPoint.x, ",").concat(startPoint.y, " L").concat(endPoint.x, ",").concat(endPoint.y);
          }
        } else if (fullPathData.includes('A')) {
          // Arc - use same radius
          var _match = fullPathData.match(/A([^ ]+),([^ ]+)/);
          if (_match) {
            var rx = parseFloat(_match[1]);
            var ry = parseFloat(_match[2]);
            clippedPathData = "M".concat(startPoint.x, ",").concat(startPoint.y, " A").concat(rx, ",").concat(ry, " 0 0,1 ").concat(endPoint.x, ",").concat(endPoint.y);
          } else {
            clippedPathData = "M".concat(startPoint.x, ",").concat(startPoint.y, " L").concat(endPoint.x, ",").concat(endPoint.y);
          }
        } else {
          // Straight line
          clippedPathData = "M".concat(startPoint.x, ",").concat(startPoint.y, " L").concat(endPoint.x, ",").concat(endPoint.y);
        }

        // Calculate arrowhead angle using the clipped path
        // Look at the tangent direction by comparing the end point with a point slightly before it
        var clippedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        clippedPath.setAttribute("d", clippedPathData);
        var clippedLength = clippedPath.getTotalLength();
        var p = clippedPath.getPointAtLength(clippedLength);
        var pPrev = clippedPath.getPointAtLength(Math.max(0, clippedLength - 5)); // Look back 5px for better angle
        var arrowheadAngle = Math.atan2(p.y - pPrev.y, p.x - pPrev.x) * 180 / Math.PI;
        var path = linkGroup.append("path").attr("fill", "none").attr("stroke", d.color).attr("stroke-width", 1.25).attr("opacity", 0.3).attr("stroke-dasharray", "3,3").attr("d", clippedPathData).style("pointer-events", "none"); // Don't intercept events, let the invisible path handle it

        var head = linkGroup.append("polygon").attr("points", "0,-1.5 4.5,0 0,1.5").attr("fill", d.color).attr("opacity", 0).style("cursor", onArrowClick ? "pointer" : "default").on("click", function (event) {
          if (onArrowClick) {
            event.stopPropagation();
            onArrowClick(d.dotLine, d.connection);
          }
        }).on("mouseover", function () {
          if (onArrowClick) {
            d3.select(this).style("filter", "brightness(1.5) drop-shadow(0 0 2px rgba(0,0,0,0.5))");
            // Also highlight the path
            path.attr("stroke-width", 2.5).attr("opacity", 1).style("filter", "drop-shadow(0 0 3px rgba(0,0,0,0.3))");
          }
        }).on("mouseout", function () {
          if (onArrowClick) {
            d3.select(this).style("filter", null);
            // Reset path
            path.attr("stroke-width", 1.25).attr("opacity", 0.85).style("filter", null);
          }
        });
        head.transition().duration(900).ease(d3.easeQuadInOut).attrTween("transform", function () {
          // Create temp path for animation using the clipped path
          var animPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          animPath.setAttribute("d", clippedPathData);
          var L = animPath.getTotalLength();
          return function (t) {
            var p = animPath.getPointAtLength(t * L);
            var p2 = animPath.getPointAtLength(Math.min(L, t * L + 1));
            var ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
            return "translate(".concat(p.x, ", ").concat(p.y, ") rotate(").concat(ang, ")");
          };
        }).attr("opacity", 1).on("start", function () {
          path.transition().duration(200).attr("opacity", 0.7);
        }).on("end", function () {
          // Replace animated head with static arrowhead at end point
          head.remove();
          var staticHead = linkGroup.append("polygon").attr("points", "0,-1.5 4.5,0 0,1.5").attr("fill", d.color).attr("transform", "translate(".concat(endPoint.x, ", ").concat(endPoint.y, ") rotate(").concat(arrowheadAngle, ")")).attr("opacity", 0.85).style("cursor", onArrowClick ? "pointer" : "default").on("click", function (event) {
            if (onArrowClick) {
              event.stopPropagation();
              onArrowClick(d.dotLine, d.connection);
            }
          }).on("mouseover", function () {
            if (onArrowClick) {
              d3.select(this).style("filter", "brightness(1.5) drop-shadow(0 0 2px rgba(0,0,0,0.5))");
              // Also highlight the path
              path.attr("stroke-width", 2.5).attr("opacity", 1).style("filter", "drop-shadow(0 0 3px rgba(0,0,0,0.3))");
            }
          }).on("mouseout", function () {
            if (onArrowClick) {
              d3.select(this).style("filter", null);
              // Reset path
              path.attr("stroke-width", 1.25).attr("opacity", 0.85).style("filter", null);
            }
          });

          // Add invisible wider hit area for better interaction
          if (onArrowClick) {
            linkGroup.append("path").attr("fill", "none").attr("stroke", "transparent").attr("stroke-width", 15) // Wide invisible hit area
            .attr("d", clippedPathData).style("cursor", "pointer").on("click", function (event) {
              event.stopPropagation();
              onArrowClick(d.dotLine, d.connection);
            }).on("mouseover", function () {
              path.attr("stroke-width", 2.5).attr("opacity", 1).style("filter", "drop-shadow(0 0 3px rgba(0,0,0,0.3))");
              staticHead.style("filter", "drop-shadow(0 0 2px rgba(0,0,0,0.5))").attr("transform", "translate(".concat(endPoint.x, ", ").concat(endPoint.y, ") rotate(").concat(arrowheadAngle, ") scale(2)"));
            }).on("mouseout", function () {
              path.attr("stroke-width", 1.25).attr("opacity", 0.85).style("filter", null);
              staticHead.style("filter", null).attr("transform", "translate(".concat(endPoint.x, ", ").concat(endPoint.y, ") rotate(").concat(arrowheadAngle, ") scale(1)"));
            });
          }
          path.attr("stroke-dasharray", "none").transition().duration(250).attr("opacity", 0.85);
          drawNextLink(index + 1);
        });
      }
      drawNextLink(0);

      // Ensure arrows stay on top for clickability
      arrowsGroup.raise();
    }

    // Visualize anchor points for all cells
    function visualizeAnchorPoints() {
      var anchorGroup = arrowsGroup.append("g").attr("class", "anchor-points-visualization");

      // For each semantic ring type
      var ringTypes = ['invisible', 'positive', 'negative', 'neutral'];
      var ringColors = {
        invisible: '#999',
        positive: '#16a34a',
        negative: '#dc2626',
        neutral: '#666'
      };

      // Get all unit IDs from nested data
      // ✅ Use semantic key (neutral for center ring)
      var unitIds = nestedData.neutral.map(function (d) {
        return d.unitId;
      });
      unitIds.forEach(function (unitId) {
        ringTypes.forEach(function (ringType) {
          // Check if this unit has data in this ring type
          var hasData = nestedData[ringType] && nestedData[ringType].some(function (d) {
            return d.unitId === unitId;
          });
          if (!hasData) return;
          var cellInfo = getCellCentroid(unitId, ringType);
          if (!cellInfo) return;
          var color = ringColors[ringType];

          // Draw centroid as a circle
          anchorGroup.append("circle").attr("cx", cellInfo.x).attr("cy", cellInfo.y).attr("r", 3).attr("fill", color).attr("stroke", "white").attr("stroke-width", 1).attr("opacity", 0.8);

          // Draw label with unitId and ring type
          anchorGroup.append("text").attr("x", cellInfo.x).attr("y", cellInfo.y - 8).attr("text-anchor", "middle").attr("font-size", "8px").attr("fill", color).attr("stroke", "white").attr("stroke-width", 0.3).attr("paint-order", "stroke").text("".concat(unitId, ":").concat(ringType.charAt(0)));

          // If there's label info (ellipse), draw the bounding box
          var labelInfo = getLabelInfo(unitId, ringType);
          if (labelInfo && labelInfo.labelWidth && labelInfo.labelHeight) {
            var w2 = labelInfo.labelWidth / 2;
            var h2 = labelInfo.labelHeight / 2;
            var theta = labelInfo.labelRotationRadians || 0;

            // Calculate rotated rectangle corners
            var corners = [{
              x: -w2,
              y: -h2
            }, {
              x: w2,
              y: -h2
            }, {
              x: w2,
              y: h2
            }, {
              x: -w2,
              y: h2
            }];
            var rotatedCorners = corners.map(function (c) {
              var cosT = Math.cos(theta);
              var sinT = Math.sin(theta);
              return {
                x: labelInfo.x + (cosT * c.x - sinT * c.y),
                y: labelInfo.y + (sinT * c.x + cosT * c.y)
              };
            });

            // Draw rectangle
            var pathData = "M".concat(rotatedCorners[0].x, ",").concat(rotatedCorners[0].y, " ") + "L".concat(rotatedCorners[1].x, ",").concat(rotatedCorners[1].y, " ") + "L".concat(rotatedCorners[2].x, ",").concat(rotatedCorners[2].y, " ") + "L".concat(rotatedCorners[3].x, ",").concat(rotatedCorners[3].y, " Z");
            anchorGroup.append("path").attr("d", pathData).attr("fill", "none").attr("stroke", color).attr("stroke-width", 1).attr("stroke-dasharray", "2,2").attr("opacity", 0.5);

            // Draw inscribed ellipse: fits inside the bounding box
            var rx = w2;
            var ry = h2;
            anchorGroup.append("ellipse").attr("cx", labelInfo.x).attr("cy", labelInfo.y).attr("rx", rx).attr("ry", ry).attr("transform", "rotate(".concat(theta * 180 / Math.PI, ", ").concat(labelInfo.x, ", ").concat(labelInfo.y, ")")).attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.5).attr("opacity", 0.6);
          }
        });
      });
    }
    function clearAnchorPoints() {
      arrowsGroup.selectAll(".anchor-points-visualization").remove();
    }
    return {
      arrowsGroup: arrowsGroup,
      getCellCentroid: getCellCentroid,
      drawArrow: drawArrow,
      drawLabelLinks: drawLabelLinks,
      clearArrows: clearArrows,
      visualizeAnchorPoints: visualizeAnchorPoints,
      clearAnchorPoints: clearAnchorPoints
    };
  };
}
function _radii(styles) {
  return {
    outerRadius: styles.radii.outer,
    innerRadius: styles.radii.middleOuter,
    middleRadius: styles.radii.middleOuter,
    innerInnerRadius: styles.radii.middleInner,
    centerRadius: styles.radii.inner
  };
}
function _pie(d3) {
  return d3.pie().value(function (d) {
    return d.value;
  }).sort(null);
}
function _arcs(d3, radii, styles) {
  return {
    invisibleArc: d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible),
    outerArc: d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius),
    middleArc: d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius),
    innerArc: d3.arc().innerRadius(styles.radii.hub).outerRadius(radii.centerRadius)
  };
}
function _colorScales(d3, dialecticalData, userRingColors) {
  return {
    invisibleColor: d3.scaleOrdinal().domain(Object.keys(dialecticalData)).range(Object.keys(dialecticalData).map(function () {
      return "transparent";
    })),
    negativeColor: d3.scaleOrdinal() // ✅ Red - semantic
    .domain(Object.keys(dialecticalData)).range(Object.keys(dialecticalData).map(function () {
      return userRingColors.negative;
    })),
    neutralColor: d3.scaleOrdinal() // ✅ White - semantic
    .domain(Object.keys(dialecticalData)).range(Object.keys(dialecticalData).map(function () {
      return userRingColors.neutral;
    })),
    positiveColor: d3.scaleOrdinal() // ✅ Green - semantic
    .domain(Object.keys(dialecticalData)).range(Object.keys(dialecticalData).map(function () {
      return userRingColors.positive;
    }))
  };
}
function _arcTween(d3) {
  return function (arcGenerator) {
    return function (a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return arcGenerator(i(t));
      };
    };
  };
}
function _makeTextTransform() {
  return function (getCurrentRotationFn) {
    return function (d, arcGenerator) {
      var currentRotationRadians = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var centroid = arcGenerator.centroid(d);
      var sliceMiddleAngle = (d.startAngle + d.endAngle) / 2;
      var currentRotation = currentRotationRadians !== null ? currentRotationRadians : getCurrentRotationFn ? getCurrentRotationFn() : 0;
      var currentVisualAngle = sliceMiddleAngle + currentRotation;
      var normalizedAngle = (currentVisualAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      var textRotationDegrees = sliceMiddleAngle * 180 / Math.PI;
      if (normalizedAngle > Math.PI / 2 && normalizedAngle < 3 * Math.PI / 2) {
        textRotationDegrees += 180;
      }
      return "translate(".concat(centroid[0], ", ").concat(centroid[1], ") rotate(").concat(textRotationDegrees, ")");
    };
  };
}
function _makeAxisModule(getRingOrder, d3) {
  return function (_ref3) {
    var coordinateGroup = _ref3.coordinateGroup,
      defs = _ref3.defs,
      pie = _ref3.pie,
      radii = _ref3.radii,
      styles = _ref3.styles,
      getDataToUse = _ref3.getDataToUse,
      getOppositePrefix = _ref3.getOppositePrefix,
      dialecticalData = _ref3.dialecticalData;
    function updateCoordinateNumbersOpacities() {
      var units = Object.keys(dialecticalData);
      var order = getRingOrder();
      var middleSemantic = order.byPhysical[1];
      var middleData = getDataToUse()[middleSemantic];
      coordinateGroup.selectAll("text.coordinate-number").each(function () {
        var sliceIndex = parseInt(d3.select(this).attr("data-slice-index"));
        var unitId = units[sliceIndex];
        if (unitId) {
          var sliceData = middleData.find(function (d) {
            return d.unitId === unitId;
          });
          var opacity = sliceData ? sliceData.opacity : 1;
          d3.select(this).transition().duration(styles.durations.normal).style("opacity", opacity);
        }
      });
    }
    function updateAxisPositions() {
      var focusedUnitId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!focusedUnitId) {
        updateCoordinateNumbersOpacities();
        return;
      }
      coordinateGroup.selectAll(".coordinate-circle").remove();
      coordinateGroup.selectAll(".coordinate-symbol").remove();
      var dataToUse = getDataToUse();
      // ✅ Use semantic key (neutral for middle ring)
      var pieData = pie(dataToUse.neutral);
      var focusedSlice = pieData.find(function (d) {
        return d.data.unitId === focusedUnitId;
      });
      var axisAngle;
      if (focusedSlice) {
        axisAngle = focusedSlice.startAngle - Math.PI / 2;
      } else {
        var units = Object.keys(dialecticalData);
        var numSlices = units.length;
        var angleStep = 2 * Math.PI / numSlices;
        axisAngle = numSlices / 2 * angleStep - Math.PI / 2;
      }
      var axisAngles = [axisAngle, axisAngle + Math.PI];
      var ringRadii = [radii.centerRadius, radii.middleRadius, radii.outerRadius];
      var order = getRingOrder();
      var axisColors = [styles.colors.text.positive, styles.colors.text[order.byPhysical[1]], styles.colors.text[order.byPhysical[2]]];

      // Check if opposite unit exists in current data
      var oppositeUnitId = getOppositePrefix(focusedUnitId);
      // ✅ Use semantic key (neutral)
      var oppositeExists = dataToUse.neutral.some(function (d) {
        return d.unitId === oppositeUnitId;
      });
      axisAngles.forEach(function (angle, sideIndex) {
        // Skip the opposite side if it doesn't exist in the current data
        if (sideIndex === 1 && !oppositeExists) return;
        ringRadii.forEach(function (radius, ringIndex) {
          var angleOffset = 8 / radius;
          var rotatedAngle = angle + angleOffset;
          var x = (radius - 8) * Math.cos(rotatedAngle);
          var y = (radius - 8) * Math.sin(rotatedAngle);
          var x2 = radius * Math.cos(angle);
          var y2 = radius * Math.sin(angle);
          var clipUnitId = sideIndex === 0 ? focusedUnitId : getOppositePrefix(focusedUnitId);
          // Derive display label from cell name (keeps clip id stable with unitId)
          var clipLabel = clipUnitId;
          (function deriveClipLabel() {
            var dataToUse = getDataToUse();
            var pieData;
            // ✅ Map physical ring index to semantic data key
            if (ringIndex === 0) pieData = pie(dataToUse.positive); // Inner ring always has positive
            else if (ringIndex === 1) {
              var semantic = getRingOrder().byPhysical[1];
              pieData = pie(dataToUse[semantic]);
            } else {
              var _semantic = getRingOrder().byPhysical[2];
              pieData = pie(dataToUse[_semantic]);
            }
            var cell = pieData.find(function (d) {
              return d.data.unitId === clipUnitId;
            });
            if (cell && cell.data && cell.data.name) clipLabel = cell.data.name;
          })();
          var clipId = "clip-".concat(clipUnitId, "-").concat(sideIndex, "-").concat(ringIndex);
          var clipPath = defs.append("clipPath").attr("id", clipId);
          clipPath.append("path").attr("d", function () {
            var dataToUse = getDataToUse();
            var pieData, arcGen;
            // ✅ Map physical ring index to semantic data key
            if (ringIndex === 0) {
              // inner ring
              pieData = pie(dataToUse.positive); // Inner ring always has positive
              arcGen = d3.arc().innerRadius(styles.radii.hub).outerRadius(radii.centerRadius);
            } else if (ringIndex === 1) {
              // middle ring
              var semantic = getRingOrder().byPhysical[1];
              pieData = pie(dataToUse[semantic]);
              arcGen = d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius);
            } else {
              // outer ring
              var _semantic2 = getRingOrder().byPhysical[2];
              pieData = pie(dataToUse[_semantic2]);
              arcGen = d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius);
            }
            var cellData = pieData.find(function (d) {
              return d.data.unitId === clipUnitId;
            });
            cellData ? cellData.data.opacity : 1;
            d3.select(null);
            return cellData ? arcGen(cellData) : "";
          });
          coordinateGroup.append("circle").attr("class", "coordinate-circle").attr("cx", x2).attr("cy", y2).attr("r", 0).style("fill", "#000").style("opacity", 0).style("clip-path", "url(#".concat(clipId, ")")).transition().duration(500).attr("r", 20).style("opacity", 0.1);
          coordinateGroup.append("text").attr("class", "coordinate-symbol").attr("x", x).attr("y", y).style("text-anchor", "middle").style("dominant-baseline", "central").style("font-family", "Monaco, monospace").style("font-size", "8px").style("font-weight", styles.fonts.coordinates.weight).style("fill", axisColors[ringIndex]).style("pointer-events", "none").style("opacity", 1).text(clipLabel);
        });
      });
      updateCoordinateNumbersOpacities();
    }
    return {
      updateCoordinateNumbersOpacities: updateCoordinateNumbersOpacities,
      updateAxisPositions: updateAxisPositions
    };
  };
}
function _makeStepMode() {
  return function (_ref4) {
    var dialecticalData = _ref4.dialecticalData,
      transformToNestedPieData = _ref4.transformToNestedPieData,
      initializeBuildSteps = _ref4.initializeBuildSteps;
      _ref4.isThesisType;
      var getOppositePrefix = _ref4.getOppositePrefix;
      _ref4.pie;
      _ref4.radii;
      var styles = _ref4.styles;
      _ref4.groups;
      _ref4.helpers;
    var animationData = {};
    var buildSteps = [];
    var currentStep = 0;
    function initializeAnimationData() {
      animationData = transformToNestedPieData(dialecticalData);
      // ✅ SEMANTIC KEYS - Initialize all to 0 except neutral (which starts visible)
      animationData.invisible.forEach(function (item) {
        item.value = 0;
      });
      animationData.negative.forEach(function (item) {
        item.value = 0;
      });
      animationData.neutral.forEach(function (item) {
        item.value = 0;
      }); // Start at 0, will be shown by showWhite
      animationData.positive.forEach(function (item) {
        item.value = 0;
      });
    }
    function initializeBuildStepsLocal() {
      buildSteps = initializeBuildSteps(dialecticalData);
      currentStep = 0;
    }
    function resetBuildState(cellVisibility, updateAllRings) {
      Object.keys(dialecticalData).forEach(function (cell) {
        // ✅ SEMANTIC KEYS in cellVisibility
        cellVisibility[cell] = {
          invisible: true,
          negative: false,
          neutral: true,
          positive: false
        };
      });
      initializeAnimationData();
      updateAllRings();
    }
    function executeStep(stepIndex, ctx) {
      if (stepIndex < 0 || stepIndex >= buildSteps.length) return;
      var step = buildSteps[stepIndex];
      switch (step.type) {
        case 'showWhite':
          {
            var setupFirstOfPair = function setupFirstOfPair() {
              // ✅ SEMANTIC KEYS - Set value=1 for ALL segments so they exist in DOM
              ["negative", "neutral", "positive"].forEach(function (ringType) {
                var dataArray = animationData[ringType];
                var currentData = dataArray.find(function (d) {
                  return d.unitId === step.unitId;
                });
                var pairData = dataArray.find(function (d) {
                  return d.unitId === pairId;
                });
                if (currentData) currentData.value = 1;
                if (pairData) pairData.value = 1;
              });
              // Make all segments visible in cellVisibility
              ctx.cellVisibility[step.unitId].negative = true;
              ctx.cellVisibility[step.unitId].positive = true;
              ctx.cellVisibility[step.unitId].neutral = true;
              ctx.cellVisibility[pairId].negative = true;
              ctx.cellVisibility[pairId].positive = true;
              ctx.cellVisibility[pairId].neutral = true;
              setTimeout(function () {
                // Hide the pair's segments (but keep them in DOM)
                ["negative", "neutral", "positive"].forEach(function (ringType) {
                  var dataArray = animationData[ringType];
                  var pairData = dataArray.find(function (d) {
                    return d.unitId === pairId;
                  });
                  if (pairData) pairData.opacity = 0;
                });
                ctx.updateAllRings();
              }, 100);
            };
            var setupSecondOfPair = function setupSecondOfPair() {
              // ✅ SEMANTIC KEYS - Restore opacity for all segments of second pair
              ["negative", "neutral", "positive"].forEach(function (ringType) {
                var dataArray = animationData[ringType];
                var currentData = dataArray.find(function (d) {
                  return d.unitId === step.unitId;
                });
                if (currentData) currentData.opacity = 1;
              });
            };
            var pairId = getOppositePrefix(step.unitId);
            var currentCellFirstStep = buildSteps.findIndex(function (s) {
              return s.unitId === step.unitId && s.type === 'showWhite';
            });
            var pairCellFirstStep = buildSteps.findIndex(function (s) {
              return s.unitId === pairId && s.type === 'showWhite';
            });
            var isFirstOfPair = currentCellFirstStep < pairCellFirstStep;
            if (isFirstOfPair) setupFirstOfPair();else setupSecondOfPair();
            ctx.focusPair(step.unitId, styles.durations.stepRotation);
            ctx.updateAllRings();
            // Now hide negative and positive segments (they're in DOM but hidden)
            setTimeout(function () {
              // ✅ SEMANTIC KEYS
              ctx.hideCell(step.unitId, "negative");
              ctx.hideCell(step.unitId, "positive");
              setTimeout(function () {
                // Let updateAllRings handle the opacity restoration
                ctx.updateAllRings();
              }, styles.durations.stepRotation + 50);
            }, 100);
            break;
          }
        case 'showGreen':
          // ✅ SEMANTIC: Green is positive (already in DOM, just hidden)
          ctx.showCell(step.unitId, "positive");
          break;
        case 'showRed':
          // ✅ SEMANTIC: Red is negative (already in DOM, just hidden)
          ctx.showCell(step.unitId, "negative");
          break;
      }
    }
    function startStepMode(ctx) {
      ctx.setIsStepMode(true);
      initializeBuildStepsLocal();
      resetBuildState(ctx.cellVisibility, ctx.updateAllRings);
      ctx.clearFocus();
      ctx.resetZoom();
      ctx.hideCoordinates();
    }
    function stepForward(ctx) {
      if (!ctx.getIsStepMode() || currentStep >= buildSteps.length) return false;
      executeStep(currentStep, ctx);
      currentStep++;
      return true;
    }
    function stepBackward(ctx) {
      if (!ctx.getIsStepMode() || currentStep <= 0) return false;
      currentStep--;
      resetBuildState(ctx.cellVisibility, ctx.updateAllRings);
      for (var i = 0; i < currentStep; i++) executeStep(i, ctx);
      return true;
    }
    function resetToFull(ctx) {
      ctx.setIsStepMode(false);
      currentStep = 0;
      animationData = {};
      Object.keys(ctx.cellVisibility).forEach(function (cell) {
        // ✅ SEMANTIC KEYS
        ctx.cellVisibility[cell] = {
          invisible: true,
          negative: true,
          neutral: true,
          positive: true
        };
      });
      ctx.clearFocus();
      ctx.resetZoom();
      ctx.setRotationDirectly(0);
      // ✅ SEMANTIC KEYS
      ["invisible", "negative", "neutral", "positive"].forEach(function (ringType) {
        ctx.nestedData[ringType].forEach(function (item) {
          var originalItem = ctx.originalNestedData[ringType].find(function (orig) {
            return orig.unitId === item.unitId;
          });
          item.opacity = originalItem ? originalItem.opacity : 1;
        });
      });
      ctx.updateAllRings();
      ctx.showCoordinates();
      ctx.updateAxisPositions(ctx.cells[0]);
      ctx.rotateToSlice(ctx.cells[0], undefined, true);
    }
    function getCurrentStepInfo(ctx) {
      if (!ctx.getIsStepMode()) return null;
      var totalSteps = buildSteps.length;
      if (currentStep === 0) {
        return {
          current: currentStep,
          total: totalSteps,
          unit: "none",
          stepType: "start",
          canStepForward: currentStep < totalSteps,
          canStepBackward: false
        };
      }
      var step = buildSteps[currentStep - 1];
      var stepTypeMap = {
        'showWhite': 'statement',
        'showGreen': 'positive',
        'showRed': 'negative'
      };
      return {
        current: currentStep,
        total: totalSteps,
        unit: step.unitId,
        stepType: stepTypeMap[step.type],
        canStepForward: currentStep < totalSteps,
        canStepBackward: currentStep > 0
      };
    }
    return {
      get animationData() {
        return animationData;
      },
      get buildSteps() {
        return buildSteps;
      },
      startStepMode: startStepMode,
      stepForward: stepForward,
      stepBackward: stepBackward,
      resetToFull: resetToFull,
      getCurrentStepInfo: getCurrentStepInfo
    };
  };
}
function _chart(styles, radii, d3, selectedFont, dialecticalData, arcs, makeTextTransform, pie, transformToNestedPieData, getRingOrder, makeAxisModule, getOppositePrefix, colorScales, getPhysicalGroupsForSemantics, getRadiiForSemantic, getTextConstraints, wrapText, userTextColors, isThesisType, arcTween, makeRings, isWhiteOutside, makeArrowsModule, arrowUtilities, parseArrowConnections, arrowConnections, arrowOptions, viewof_clickedArrowInfo, flowConnections, flowArrowOptions, makeStepMode, initializeBuildSteps) {
  return function () {
    var isTouchDragging = false;
    var touchDragStart = null;
    var TOUCH_DRAG_THRESHOLD = 8;
    var isRotating = false;
    var rotationPromise = null;
    styles.height;
    var outerRadius = radii.outerRadius,
      innerRadius = radii.innerRadius,
      middleRadius = radii.middleRadius,
      innerInnerRadius = radii.innerInnerRadius,
      centerRadius = radii.centerRadius;

    // Create SVG with centered viewBox
    var svg = d3.create("svg").attr("viewBox", [-styles.width / 2, -styles.height / 2, styles.width, styles.height]).style("max-width", "100%").style("height", "auto").style("font-family", "".concat(selectedFont, ", sans-serif"));

    // State variables
    var focusedPair = null;
    var clickedSlice = null;
    var clickedCell = null;
    var cellVisibility = {};
    function updateChartValue() {
      svg.node().value = {
        focusedPair: focusedPair,
        clickedSlice: clickedSlice,
        clickedCell: clickedCell,
        currentRotation: getCurrentRotationFromDOM()
      };
      svg.node().dispatchEvent(new CustomEvent("input"));
    }

    // Double tap detection for zoom reset
    var lastTapTime = 0;
    var DOUBLE_TAP_DELAY = 300; // 300ms window for double tap

    // Helper function to get current rotation from DOM (eliminates state tracking)
    function getCurrentRotationFromDOM() {
      var transform = rotationGroup.attr("transform") || "";
      var rotateMatch = transform.match(/rotate\(([-\d.]+)\)/);
      if (rotateMatch) {
        return parseFloat(rotateMatch[1]) * Math.PI / 180; // Convert to radians
      }
      return 0;
    }

    // Helper function to set rotation directly on DOM (no state tracking)
    function setRotationDirectly(radians) {
      var degrees = radians * 180 / Math.PI;
      rotationGroup.attr("transform", "rotate(".concat(degrees, ")"));
      // Update text positions immediately
      updateTextPositions(degrees);
      // Update chart value and dispatch event
      updateChartValue();
    }

    // Step-by-step animation state
    var isStepMode = false;

    // Initialize cell visibility
    var cells = Object.keys(dialecticalData);
    cells.forEach(function (cell) {
      cellVisibility[cell] = {
        invisible: true,
        // Start visible for normal mode
        negative: true,
        // ✅ SEMANTIC KEYS
        neutral: true,
        positive: true
      };
    });

    // Add background rectangle for reset clicks
    svg.append("rect").attr("class", "background").attr("x", -styles.width / 2).attr("y", -styles.height / 2).attr("width", styles.width).attr("height", styles.height).style("fill", "none").style("pointer-events", "all").on("click", resetZoom);

    // NEW TRANSFORM HIERARCHY:
    // svg (D3 zoom applied here)
    //   zoomGroup (zoom applied FIRST - D3 zoom controls this)
    //     rotationGroup (rotation applied SECOND - rotates the zoomed content)
    //       contentGroup (actual wheel content)
    var zoomGroup = svg.append("g").attr("class", "zoom-group");
    var rotationGroup = zoomGroup.append("g").attr("class", "rotation-group");
    var contentGroup = rotationGroup.append("g").attr("class", "content-group");

    // Add large invisible circle for better mobile touch target (in rotation group so it rotates with wheel)
    rotationGroup.append("circle").attr("cx", 0).attr("cy", 0).attr("r", styles.radii.drag) // Larger than outerRadius for easier touch
    .style("fill", "transparent").style("pointer-events", "none") // FIXED: Don't block clicks - only handle drag
    .style("cursor", "grab");

    // Create zoom behavior (disable panning, only allow programmatic zoom)
    var zoom = d3.zoom().scaleExtent([1, 8]).filter(function (event) {
      return true;
    }) // Disable all zoom interactions
    .on("zoom", zoomed);

    // Apply mobile-friendly styles and drag behavior
    svg.style("touch-action", "none") // Prevent default touch behaviors
    .style("user-select", "none"); // Prevent text selection

    // Track hover state on cells
    function setHoveredCell(cell) {
    }

    // Add wheel event listener for scroll-to-zoom

    // FIXED: Apply drag behavior to the rotationGroup so it scales with zoom
    //rotationGroup.call(drag);

    // ===== TOUCH BEHAVIOR: Focus + Zoom to Slice =====
    // Touch events now simply focus the pair and zoom to the entire slice

    // Create pie generator (from separate cell)
    // uses: pie

    // Arc generators (from separate cell)
    var invisibleArc = arcs.invisibleArc,
      outerArc = arcs.outerArc,
      middleArc = arcs.middleArc,
      innerArc = arcs.innerArc;

    // Simple Text Rotation and Flipping Logic (from separate cell)
    var calculateTextTransform = makeTextTransform(getCurrentRotationFromDOM);

    // Reusable function to rotate wheel to center a slice at the top
    function rotateToSlice(unitId) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : styles.durations.stepRotation;
      var skipAnimation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Choose which data to use based on current mode
      var dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;

      // Calculate rotation needed to center the slice at the top
      // ✅ Use semantic key (neutral for center ring)
      var pieData = pie(dataToUse.neutral);
      var targetSlice = pieData.find(function (d) {
        return d.data.unitId === unitId;
      });
      if (!targetSlice) return;

      // Calculate the current angle of the slice center in the original data
      var sliceAngle = (targetSlice.startAngle + targetSlice.endAngle) / 2;

      // Simple calculation: to center this slice at the top, 
      // we need: sliceAngle + newRotation = 0
      // Therefore: newRotation = -sliceAngle
      var newRotation = -sliceAngle;

      // Get current rotation from DOM
      var startRotation = getCurrentRotationFromDOM();
      var rotationDelta = newRotation - startRotation;

      // Normalize rotation delta to always take the shortest path (-π to π)
      while (rotationDelta > Math.PI) rotationDelta -= 2 * Math.PI;
      while (rotationDelta < -Math.PI) rotationDelta += 2 * Math.PI;

      // If skipAnimation is true, set rotation immediately without transition
      if (skipAnimation) {
        var degrees = newRotation * 180 / Math.PI;
        rotationGroup.attr("transform", "rotate(".concat(degrees, ")"));
        updateTextPositions(degrees);
        updateChartValue();
        return Promise.resolve();
      }

      // Use D3 transition for smooth rotation
      var rotationTransition = d3.transition().duration(duration).ease(d3.easeCubicInOut);
      isRotating = true;
      rotationPromise = new Promise(function (resolve) {
        rotationTransition.tween("rotate", function () {
          return function (t) {
            var currentRotation = startRotation + rotationDelta * t;
            var degrees = currentRotation * 180 / Math.PI;
            rotationGroup.attr("transform", "rotate(".concat(degrees, ")"));
            // Update text positions during transition
            updateTextPositions(degrees);
          };
        }).on("end", function () {
          isRotating = false;
          updateChartValue();
          resolve();
        }).on("interrupt", function () {
          isRotating = false;
          resolve();
        });
      });
      return rotationPromise;
    }

    // Create groups for each ring (in content group)
    var invisibleGroup = contentGroup.append("g").attr("class", "invisible-ring");
    var outerGroup = contentGroup.append("g").attr("class", "outer-ring");
    var middleGroup = contentGroup.append("g").attr("class", "middle-ring");
    var innerGroup = contentGroup.append("g").attr("class", "inner-ring");

    // Initialize data
    var nestedData = transformToNestedPieData(dialecticalData);
    var originalNestedData = JSON.parse(JSON.stringify(nestedData)); // Keep original opacity values

    // Create groups for labels (in content group)
    var invisibleLabelsGroup = contentGroup.append("g").attr("class", "invisible-labels");
    var outerLabelsGroup = contentGroup.append("g").attr("class", "outer-labels");
    var middleLabelsGroup = contentGroup.append("g").attr("class", "middle-labels");
    var innerLabelsGroup = contentGroup.append("g").attr("class", "inner-labels");

    // Add yellow center circle (axle/hub) (in content group)
    var centerCircle = contentGroup.append("circle").attr("cx", 0).attr("cy", 0).attr("r", styles.radii.hub) // Same as inner radius of green ring
    .style("fill", styles.colors.hub);

    // Add coordinate system BACK inside the content group so it gets rotation transforms
    var coordinateGroup = contentGroup.append("g").attr("class", "coordinate-system");

    // Shared <defs> for clip paths and arrow markers
    var defs = svg.append("defs");

    // Add circumference numbers at slice centers
    Object.keys(dialecticalData).length;

    //const symbols = ["T+", "T", "T-"]; // Positive, neutral, negative
    var order = getRingOrder();
    [styles.colors.text.positive, styles.colors.text[order.byPhysical[1]], styles.colors.text[order.byPhysical[2]]];

    // Coordinate number opacity updates now handled inside axis module

    // Function to update axis positions is provided by axis module below

    // Initialize axis module and axes
    var axis = makeAxisModule({
      coordinateGroup: coordinateGroup,
      defs: defs,
      pie: pie,
      radii: {
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        innerInnerRadius: innerInnerRadius,
        middleRadius: middleRadius,
        centerRadius: centerRadius
      },
      styles: styles,
      getDataToUse: function getDataToUse() {
        return isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
      },
      getOppositePrefix: getOppositePrefix,
      dialecticalData: dialecticalData
    });
    var updateAxisPositions = axis.updateAxisPositions;
    axis.updateAxisPositions();

    // Color scales (from separate cell)
    var invisibleColor = colorScales.invisibleColor,
      negativeColor = colorScales.negativeColor,
      neutralColor = colorScales.neutralColor,
      positiveColor = colorScales.positiveColor; // ✅ Semantic colors

    // Initialize data
    //const nestedData = transformToNestedPieData(dialecticalData);

    // arcTween helper from separate cell

    // Function to hide individual cell (sucking into inner ring)
    function hideCell(unitId, ringType) {
      if (!cellVisibility[unitId] || !cellVisibility[unitId][ringType]) return;
      cellVisibility[unitId][ringType] = false;

      // ✅ SEMANTIC: Use helper to map semantic ringType to physical group
      var mapping = getPhysicalGroupsForSemantics(ringType, {
        invisibleGroup: invisibleGroup,
        innerGroup: innerGroup,
        middleGroup: middleGroup,
        outerGroup: outerGroup,
        invisibleLabelsGroup: invisibleLabelsGroup,
        innerLabelsGroup: innerLabelsGroup,
        middleLabelsGroup: middleLabelsGroup,
        outerLabelsGroup: outerLabelsGroup
      });
      var group = mapping.group,
        labelsGroup = mapping.labelsGroup,
        ringRadii = mapping.ringRadii;

      // Target is the inner radius of this ring (collapse inward)
      var targetRadius = ringRadii.inner;

      // Hide cell with radius animation
      group.selectAll("path").filter(function (d) {
        return d.data.unitId === unitId;
      }).classed("hidden", true).transition().duration(styles.durations.stepRotation) // Mismatched name, but using for now
      .ease(d3.easeExpIn).attrTween("d", function (d) {
        var currentData = d;
        return function (t) {
          // ✅ Use pre-calculated ringRadii from helper
          var newInnerRadius = d3.interpolate(ringRadii.inner, targetRadius)(t);
          var newOuterRadius = d3.interpolate(ringRadii.outer, targetRadius)(t);
          var arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
          return arcGen(currentData);
        };
      }).style("opacity", d3.interpolate(1, 0)).on("end", function (d) {
        // Restore data binding after hide animation
        this._current = d;
      });

      // Hide label
      labelsGroup.selectAll("text").filter(function (d) {
        return d.data.unitId === unitId;
      }).transition().duration(styles.durations.stepRotation).style("opacity", 0);
    }

    // Function to show individual cell (expanding from inner ring)
    function showCell(unitId, ringType) {
      if (!cellVisibility[unitId] || cellVisibility[unitId][ringType]) return;
      cellVisibility[unitId][ringType] = true;

      // ✅ SEMANTIC: Use helper to map semantic ringType to physical group
      var mapping = getPhysicalGroupsForSemantics(ringType, {
        invisibleGroup: invisibleGroup,
        innerGroup: innerGroup,
        middleGroup: middleGroup,
        outerGroup: outerGroup,
        invisibleLabelsGroup: invisibleLabelsGroup,
        innerLabelsGroup: innerLabelsGroup,
        middleLabelsGroup: middleLabelsGroup,
        outerLabelsGroup: outerLabelsGroup
      });
      var group = mapping.group,
        labelsGroup = mapping.labelsGroup,
        ringRadii = mapping.ringRadii;

      // ✅ Different animation directions for positive vs negative
      // Positive (green/inner): emanates from outer radius, radiates DOWN (inward)
      // Negative (red/outer): emanates from inner radius, radiates UP (outward)
      var startInnerRadius, startOuterRadius;
      if (ringType === "positive") {
        // Start from outer radius, collapse inward
        startInnerRadius = ringRadii.outer;
        startOuterRadius = ringRadii.outer;
      } else if (ringType === "negative") {
        // Start from inner radius, expand outward
        startInnerRadius = ringRadii.inner;
        startOuterRadius = ringRadii.inner;
      } else {
        // Neutral: use middle point (existing behavior)
        var midRadius = (ringRadii.inner + ringRadii.outer) / 2;
        startInnerRadius = midRadius;
        startOuterRadius = midRadius;
      }
      var endInnerRadius = ringRadii.inner;
      var endOuterRadius = ringRadii.outer;

      // Show cell with radius animation
      var pathSelection = group.selectAll("path").filter(function (d) {
        return d && d.data && d.data.unitId === unitId;
      });

      // If the path doesn't exist yet (e.g., due to stale DOM), regenerate rings once
      var ensuredSelection = pathSelection;
      if (ensuredSelection.empty() && typeof updateAllRings === 'function') {
        updateAllRings();
        ensuredSelection = group.selectAll("path").filter(function (d) {
          return d && d.data && d.data.unitId === unitId;
        });
      }
      if (ensuredSelection.empty()) {
        // As a final fallback, do nothing to avoid errors in Observable Desktop
        return;
      }

      // Prepare starting geometry for a clean animation
      ensuredSelection.classed("hidden", false).attr("d", function (d) {
        var arcGenStart = d3.arc().innerRadius(startInnerRadius).outerRadius(startOuterRadius);
        return arcGenStart(d);
      }).transition().duration(styles.durations.stepRotation).ease(d3.easeExpOut).attrTween("d", function (d) {
        var currentData = d;
        return function (t) {
          var newInnerRadius = d3.interpolate(startInnerRadius, endInnerRadius)(t);
          var newOuterRadius = d3.interpolate(startOuterRadius, endOuterRadius)(t);
          var arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
          return arcGen(currentData);
        };
      }).styleTween("opacity", function () {
        var base = ringType === "invisible" ? 1 : ringType === "negative" ? 1 : ringType === "neutral" ? 0.9 : 0.8;
        return function (t) {
          return String(base * t);
        };
      });

      // Show label with position animation
      // De-duplicate any stray duplicate labels for this unit in this labels group, scoped to this polarity
      (function dedupeLabels() {
        var seen = new Set();
        labelsGroup.selectAll("text.cell-label").filter(function (d) {
          return d && d.data && (d.data.polarity === ringType || !d.data.polarity && ringType === "neutral");
        }).each(function (d) {
          var key = d.data.unitId;
          if (seen.has(key)) {
            d3.select(this).remove();
          } else {
            seen.add(key);
          }
        });
      })();
      var labelsForUnit = labelsGroup.selectAll("text").filter(function (d) {
        return d && d.data && d.data.unitId === unitId && (d.data.polarity === ringType || !d.data.polarity && ringType === "neutral");
      }).interrupt() // cancel any prior transitions that may cause overlaps
      .style("opacity", 0) // start hidden to avoid overlap flicker
      .attr("transform", function (d) {
        // reset transform to current arc geometry before wrapping
        var dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
        var pieData, arcGen;
        if (ringType === "invisible") {
          pieData = pie(dataToUse.invisible);
          arcGen = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
        } else if (ringType === "positive") {
          pieData = pie(dataToUse.positive);
          arcGen = d3.arc().innerRadius(30).outerRadius(centerRadius);
        } else if (ringType === "negative") {
          pieData = pie(dataToUse.negative);
          var rr = getRadiiForSemantic('negative', {
            innerRadius: innerRadius,
            innerInnerRadius: innerInnerRadius,
            middleRadius: middleRadius,
            outerRadius: outerRadius,
            centerRadius: centerRadius
          }, styles);
          arcGen = d3.arc().innerRadius(rr.inner).outerRadius(rr.outer);
        } else {
          pieData = pie(dataToUse.neutral);
          var _rr5 = getRadiiForSemantic('neutral', {
            innerRadius: innerRadius,
            innerInnerRadius: innerInnerRadius,
            middleRadius: middleRadius,
            outerRadius: outerRadius,
            centerRadius: centerRadius
          }, styles);
          arcGen = d3.arc().innerRadius(_rr5.inner).outerRadius(_rr5.outer);
        }
        var datum = pieData.find(function (p) {
          return p.data.unitId === unitId;
        }) || d;
        return calculateTextTransform(datum, arcGen);
      });
      labelsForUnit.style("font-size", function () {
        var baseSizes = styles.fonts.labels.baseSize;
        var fontSizeMap = {
          invisible: baseSizes.outer,
          negative: baseSizes.outer,
          neutral: baseSizes.middle,
          positive: baseSizes.inner
        };
        return "".concat(fontSizeMap[ringType] || baseSizes.middle, "px");
      }).each(function (d) {
        var textElement = d3.select(this);
        var baseSizes = styles.fonts.labels.baseSize;
        var fontSizeMap = {
          invisible: baseSizes.outer,
          negative: baseSizes.outer,
          neutral: baseSizes.middle,
          positive: baseSizes.inner
        };
        textElement.style("font-size", "".concat(fontSizeMap[ringType] || baseSizes.middle, "px"));
        textElement.selectAll("tspan").remove();
        var text = d && d.data ? d.data.fullText || d.data.name : this.textContent || "";
        var dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
        var pieData;
        if (ringType === "invisible") {
          pieData = pie(dataToUse.invisible);
          d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
        } else if (ringType === "positive") {
          pieData = pie(dataToUse.positive);
          d3.arc().innerRadius(30).outerRadius(centerRadius);
        } else if (ringType === "negative") {
          pieData = pie(dataToUse.negative);
          var rr = getRadiiForSemantic('negative', {
            innerRadius: innerRadius,
            innerInnerRadius: innerInnerRadius,
            middleRadius: middleRadius,
            outerRadius: outerRadius,
            centerRadius: centerRadius
          }, styles);
          d3.arc().innerRadius(rr.inner).outerRadius(rr.outer);
        } else {
          pieData = pie(dataToUse.neutral);
          var _rr6 = getRadiiForSemantic('neutral', {
            innerRadius: innerRadius,
            innerInnerRadius: innerInnerRadius,
            middleRadius: middleRadius,
            outerRadius: outerRadius,
            centerRadius: centerRadius
          }, styles);
          d3.arc().innerRadius(_rr6.inner).outerRadius(_rr6.outer);
        }
        var arcDatum = pieData.find(function (p) {
          return p.data.unitId === unitId;
        });
        var constraints = getTextConstraints(ringType, arcDatum);
        wrapText(textElement, text, constraints);
        // Ensure some content exists
        if (textElement.text().trim() === "") {
          textElement.text(text || d.data.name || unitId);
        }
      }).transition().duration(styles.durations.stepRotation).style("opacity", 1).attrTween("transform", function (d) {
        var currentData = d;
        return function () {
          // keep transform in sync with the cell's final arc geometry
          var arcGen = d3.arc().innerRadius(endInnerRadius).outerRadius(endOuterRadius);
          return calculateTextTransform(currentData, arcGen);
        };
      });

      // Ensure a label exists for this polarity; if not, create it
      var labelExists = !labelsForUnit.empty();
      if (!labelExists) {
        var datumFactory = function () {
          var dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
          var pieData;
          if (ringType === "invisible") pieData = pie(dataToUse.invisible);else if (ringType === "positive") pieData = pie(dataToUse.positive);else if (ringType === "negative") pieData = pie(dataToUse.negative);else pieData = pie(dataToUse.neutral);
          return pieData.find(function (p) {
            return p.data.unitId === unitId;
          });
        }();
        if (datumFactory) {
          labelsGroup.append("text").datum(datumFactory).attr("class", "cell-label").style("opacity", 0).style("text-anchor", "middle").style("dominant-baseline", "central").style("font-family", styles.fonts.family).style("font-weight", styles.fonts.labels.weight).style("fill", function (d) {
            // ✅ Semantic text color mapping - use USER colors directly (not position-based)
            var textColorMap = {
              invisible: 'black',
              positive: userTextColors.positive,
              negative: userTextColors.negative,
              neutral: userTextColors.neutral
            };
            return textColorMap[ringType] || userTextColors.neutral;
          });
          labelsForUnit = labelsGroup.selectAll("text").filter(function (d) {
            return d && d.data && d.data.unitId === unitId && (d.data.polarity === ringType || !d.data.polarity && ringType === "neutral");
          });
        }
      }

      // Apply semantic text color to existing labels as well
      labelsForUnit.style("fill", function (d) {
        // ✅ Semantic text color mapping - use USER colors directly (not position-based)
        var textColorMap = {
          invisible: 'black',
          positive: userTextColors.positive,
          negative: userTextColors.negative,
          neutral: userTextColors.neutral
        };
        return textColorMap[ringType] || userTextColors.neutral;
      });
    }

    // Change data moved to makeRings

    function unfocus() {
      // Choose which data to modify
      var dataToModify = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;

      // Reset all opacities to original values
      // ✅ Use semantic keys
      ["invisible", "negative", "neutral", "positive"].forEach(function (ringType) {
        dataToModify[ringType].forEach(function (item) {
          var originalItem = originalNestedData[ringType].find(function (orig) {
            return orig.unitId === item.unitId;
          });
          item.opacity = originalItem ? originalItem.opacity : 1;
        });
      });
      focusedPair = null;
      clickedSlice = null;
      clickedCell = null;
      updateAxisPositions();
      updateAllRings();
      //updateOverlays();
      updateChartValue();
    }

    // Focus pair function
    function focusPair(_x) {
      return _focusPair.apply(this, arguments);
    } // Zoom functions
    // Function to zoom to entire slice (all three rings of a unitId)
    function _focusPair() {
      _focusPair = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(clickedUnitId) {
        var dataToModify, isThesis, pairId, thesis, antithesis, isAlreadyFocused, sliceData, sliceAngle, visualAngle, rotateUnitId, groups, positiveMapping, negativeMapping, neutralMapping, positivePhysicalGroup, negativePhysicalGroup, neutralPhysicalGroup;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(isRotating && rotationPromise)) {
                _context.n = 4;
                break;
              }
              _context.p = 1;
              _context.n = 2;
              return rotationPromise;
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _context.v;
            case 4:
              // Choose which data to modify
              dataToModify = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
              isThesis = isThesisType(clickedUnitId);
              pairId = dialecticalData[clickedUnitId].pairWith;
              thesis = isThesis ? clickedUnitId : pairId;
              antithesis = isThesis ? pairId : clickedUnitId;
              isAlreadyFocused = focusedPair && focusedPair.thesis === thesis && focusedPair.antithesis === antithesis; // Check if clickedUnitId is within 90 degrees of 0 degrees (or 180 degrees)
              // ✅ Use semantic key (neutral for center ring)
              sliceData = pie(dataToModify.neutral).find(function (d) {
                return d.data.unitId === clickedUnitId;
              });
              sliceAngle = (sliceData.startAngle + sliceData.endAngle) / 2;
              visualAngle = (sliceAngle + getCurrentRotationFromDOM()) % (2 * Math.PI);
              rotateUnitId = clickedUnitId; // Round down to the nearest degree (in radians)
              visualAngle = Math.floor(visualAngle * 180 / Math.PI);
              if (!(visualAngle <= 90 || visualAngle >= 270) && !isStepMode) {
                rotateUnitId = pairId;
                //console.log("is not within 90 degrees. visualAngle: " + visualAngle);
              }
              if (!isAlreadyFocused) {
                _context.n = 7;
                break;
              }
              if (!isStepMode) {
                _context.n = 5;
                break;
              }
              rotateToSlice(rotateUnitId);
              clickedSlice = clickedUnitId;
              focusedPair = {
                thesis: thesis,
                antithesis: antithesis
              };
              updateChartValue();
              updateAxisPositions();
              return _context.a(2);
            case 5:
              if (!(clickedUnitId == clickedSlice)) {
                _context.n = 6;
                break;
              }
              focusedPair = {
                thesis: thesis,
                antithesis: antithesis
              };
              updateChartValue();
              updateAxisPositions();
              return _context.a(2);
            case 6:
              focusedPair = null;
              clickedSlice = null;
              // Reset all opacities to original values
              // ✅ Use semantic keys
              ["invisible", "negative", "neutral", "positive"].forEach(function (ringType) {
                dataToModify[ringType].forEach(function (item) {
                  var originalItem = originalNestedData[ringType].find(function (orig) {
                    return orig.unitId === item.unitId;
                  });
                  item.opacity = originalItem ? originalItem.opacity : 1;
                });
              });
              // Reset axes to default positions
              updateAxisPositions();
              _context.n = 8;
              break;
            case 7:
              focusedPair = {
                thesis: thesis,
                antithesis: antithesis
              };

              // Rotate to center the clicked slice at the top
              rotateToSlice(rotateUnitId, styles.durations.stepRotation);

              // Dim all cells first (but only if they were originally visible)
              // ✅ Use semantic keys
              ["invisible", "negative", "neutral", "positive"].forEach(function (ringType) {
                dataToModify[ringType].forEach(function (item) {
                  var originalItem = originalNestedData[ringType].find(function (orig) {
                    return orig.unitId === item.unitId;
                  });

                  // Only dim if originally visible (check value, not opacity)
                  if (originalItem && originalItem.value > 0) {
                    item.opacity = 0.3;
                  } else {
                    item.opacity = 0; // Keep hidden
                  }
                });
              });
              // Highlight the focused pair (restore original opacity)
              // ✅ Use semantic keys
              ["invisible", "negative", "neutral", "positive"].forEach(function (ringType) {
                dataToModify[ringType].forEach(function (item) {
                  if (item.unitId === thesis || item.unitId === antithesis) {
                    var originalItem = originalNestedData[ringType].find(function (orig) {
                      return orig.unitId === item.unitId;
                    });
                    var originalOpacity = originalItem ? originalItem.opacity : 1;
                    item.opacity = originalOpacity; // Restore original, don't force to 1
                  }
                });
              });
              // Update axes to focus on the pair
              updateAxisPositions(clickedUnitId);
            case 8:
              // Re-render with updated opacity
              if (isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0) {
                // ✅ Use helper to map semantic data to physical groups
                groups = {
                  invisibleGroup: invisibleGroup,
                  innerGroup: innerGroup,
                  middleGroup: middleGroup,
                  outerGroup: outerGroup
                };
                rings.changeData("invisible", stepMode.animationData.invisible, invisibleArc);

                // Map semantic data to physical groups using helper
                positiveMapping = getPhysicalGroupsForSemantics("positive", groups);
                negativeMapping = getPhysicalGroupsForSemantics("negative", groups);
                neutralMapping = getPhysicalGroupsForSemantics("neutral", groups); // Determine which physical group each semantic type maps to
                positivePhysicalGroup = positiveMapping.group === innerGroup ? "inner" : "unknown";
                negativePhysicalGroup = negativeMapping.group === middleGroup ? "middle" : "outer";
                neutralPhysicalGroup = neutralMapping.group === outerGroup ? "outer" : "middle";
                rings.changeData(positivePhysicalGroup, stepMode.animationData.positive, innerArc);
                rings.changeData(negativePhysicalGroup, stepMode.animationData.negative, negativePhysicalGroup === "middle" ? middleArc : outerArc);
                rings.changeData(neutralPhysicalGroup, stepMode.animationData.neutral, neutralPhysicalGroup === "outer" ? outerArc : middleArc);
              } else {
                updateAllRings();
              }

              // --- MAKE CHART REACTIVE: update .value and dispatch input event ---
              clickedSlice = clickedUnitId;
              updateChartValue();
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[1, 3]]);
      }));
      return _focusPair.apply(this, arguments);
    }
    function resetZoom() {
      zoomGroup.selectAll("path.cell") // Only apply to pie chart cells, not arrows
      .style("stroke", function () {
        var ringType = d3.select(this.parentNode).attr("class");
        return ringType && ringType.includes("middle") ? styles.colors.strokes.middleRing : styles.colors.strokes["default"];
      }).style("stroke-width", function () {
        var ringType = d3.select(this.parentNode).attr("class");
        return ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
      });

      // FIXED: Apply zoom reset to svg - D3 zoom controls the main element  
      svg.transition().duration(styles.durations.normal).call(zoom.transform, d3.zoomIdentity);
    }
    function updateTextPositions(rotationDegrees) {

      // Convert degrees to radians once
      var currentRotationRadians = rotationDegrees * Math.PI / 180;

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(function () {
        // PERFORMANCE: Update all cell text using the optimized transform function
        // Pass rotation to avoid repeated DOM queries
        var invisibleTexts = invisibleLabelsGroup.selectAll("text");
        var outerTexts = outerLabelsGroup.selectAll("text");
        var middleTexts = middleLabelsGroup.selectAll("text");
        var innerTexts = innerLabelsGroup.selectAll("text");
        invisibleTexts.attr("transform", function (d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, invisibleArc, currentRotationRadians);
        });
        outerTexts.attr("transform", function (d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, outerArc, currentRotationRadians);
        });
        middleTexts.attr("transform", function (d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, middleArc, currentRotationRadians);
        });
        innerTexts.attr("transform", function (d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, innerArc, currentRotationRadians);
        });

        // PERFORMANCE: Optimize coordinate system counter-rotation
        var counterRotationDegrees = -rotationDegrees;

        // Update coordinate numbers (more efficient transform calculation)
        coordinateGroup.selectAll("text.coordinate-number").attr("transform", function () {
          var x = parseFloat(d3.select(this).attr("x"));
          var y = parseFloat(d3.select(this).attr("y"));
          return "translate(".concat(x, ", ").concat(y, ") rotate(").concat(counterRotationDegrees, ") translate(").concat(-x, ", ").concat(-y, ")");
        });

        // Update coordinate symbols (more efficient transform calculation)
        coordinateGroup.selectAll("text.coordinate-symbol").attr("transform", function () {
          var x = parseFloat(d3.select(this).attr("x"));
          var y = parseFloat(d3.select(this).attr("y"));
          return "translate(".concat(x, ", ").concat(y, ") rotate(").concat(counterRotationDegrees, ") translate(").concat(-x, ", ").concat(-y, ")");
        });
      });
    }
    function zoomed(event) {
      var transform = event.transform;

      // NEW: Apply zoom transform to zoomGroup (zoom happens first in hierarchy)
      // D3 applies transform to SVG, we redirect it to zoomGroup
      zoomGroup.attr("transform", transform);

      // Update stroke widths to maintain visual consistency at different zoom levels
      zoomGroup.selectAll("path.cell").style("stroke-width", function () {
        var ringType = d3.select(this.parentNode).attr("class");
        var baseWidth = ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
        return baseWidth / transform.k + "px";
      });
    }

    // Update all rings helper
    var bindCellEvents = function bindCellEvents(selection, ringType) {
      selection.on("click", function (event, d) {
        if (event.metaKey || event.ctrlKey) ; else {
          d3.select(this.ownerSVGElement).selectAll("path.cell").style("stroke-dasharray", "1,3");
          var isCurrentlyZoomed = true;
          if (!focusedPair) {
            focusPair(d.data.unitId);
            clickedCell = d.data;
          } else {
            if (focusedPair.thesis != d.data.unitId && focusedPair.antithesis != d.data.unitId) {
              unfocus();
              clickedCell = null;
            } else {
              clickedCell = d.data;
              d3.select(this).style("stroke-dasharray", "1,0");
              if (clickedCell && clickedCell.name == d.data.name) {
                d3.select(this).style("cursor", "default");
              }
            }
          }
          updateChartValue();
          if (!isCurrentlyZoomed) {
            setTimeout(function () {}, styles.durations.stepRotation + 50);
          }
        }
      }).on("mouseenter", function (event, d) {
        var parentClass = d3.select(this.parentNode).attr("class");
        var ringTypeLocal = parentClass.includes("invisible") ? "invisible" : parentClass.includes("outer") ? "outer" : parentClass.includes("middle") ? "middle" : "inner";
        setHoveredCell({
          unitId: d.data.unitId});
        if (focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
          d3.select(this).style("stroke-dasharray", "1,0");
          if (clickedCell && clickedCell.name != d.data.name) {
            d3.select(this).style("cursor", "pointer");
          } else if (clickedCell && clickedCell.name == d.data.name) {
            d3.select(this).style("cursor", "default");
          }
        } else if (focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId) {
          d3.select(this).style("cursor", "default").style("opacity", ringTypeLocal === "invisible" ? 0.2 : 1);
          var labelsGroup = ringTypeLocal === "invisible" ? invisibleLabelsGroup : ringTypeLocal === "outer" ? outerLabelsGroup : ringTypeLocal === "middle" ? middleLabelsGroup : innerLabelsGroup;
          labelsGroup.selectAll("text").filter(function (text) {
            return text.data.unitId === d.data.unitId;
          }).style("opacity", 1);
        } else {
          d3.select(this.ownerSVGElement).selectAll("path.cell").filter(function (cellD) {
            return cellD && cellD.data && cellD.data.unitId === d.data.unitId;
          }).style("stroke-dasharray", "1,0").style("cursor", "pointer").style("opacity", function () {
            var thisRingType = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null;
            return thisRingType === "invisible" ? 0.2 : null;
          });
        }
      }).on("mouseleave", function (event, d) {
        var parentClass = d3.select(this.parentNode).attr("class");
        var ringTypeLocal = parentClass.includes("invisible") ? "invisible" : parentClass.includes("outer") ? "outer" : parentClass.includes("middle") ? "middle" : "inner";
        if (focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
          if (clickedCell && clickedCell.name != d.data.name) {
            d3.select(this).style("stroke-dasharray", "1,3");
          }
        } else if (focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId) {
          d3.select(this).style("opacity", 0.3);
          var labelsGroup = ringTypeLocal === "invisible" ? invisibleLabelsGroup : ringTypeLocal === "outer" ? outerLabelsGroup : ringTypeLocal === "middle" ? middleLabelsGroup : innerLabelsGroup;
          labelsGroup.selectAll("text").filter(function (text) {
            return text.data.unitId === d.data.unitId;
          }).style("opacity", 0.3);
          if (ringTypeLocal === "invisible") {
            d3.select(this).style("opacity", 0);
          }
        } else {
          d3.select(this.ownerSVGElement).selectAll("path.cell").filter(function (cellD) {
            return cellD && cellD.data && cellD.data.unitId === d.data.unitId;
          }).style("stroke-dasharray", "1,3").style("opacity", function () {
            var t = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null;
            return t === "invisible" ? 0 : null;
          });
        }
      }).on("touchstart", function (event, d) {
        event.preventDefault();
        var touch = event.touches && event.touches[0];
        touchDragStart = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : null;
        isTouchDragging = false;
      }).on("touchmove", function (event, d) {
        if (!touchDragStart) return;
        var touch = event.touches && event.touches[0];
        if (touch) {
          var dx = touch.clientX - touchDragStart.x;
          var dy = touch.clientY - touchDragStart.y;
          if (Math.sqrt(dx * dx + dy * dy) > TOUCH_DRAG_THRESHOLD) {
            isTouchDragging = true;
          }
        }
      }).on("touchend", function (event, d) {
        event.preventDefault();
        if (isTouchDragging) {
          isTouchDragging = false;
          touchDragStart = null;
          return;
        }
        var currentTime = Date.now();
        var timeSinceLastTap = currentTime - lastTapTime;
        if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
          resetZoom();
        } else {
          var isCurrentlyZoomed = true;
          focusPair(d.data.unitId);
          if (!isCurrentlyZoomed) {
            setTimeout(function () {}, styles.durations.stepRotation + 50);
          }
        }
        lastTapTime = currentTime;
        isTouchDragging = false;
        touchDragStart = null;
      }).on("touchcancel", function (event) {
        event.preventDefault();
      });
    };
    var rings = makeRings({
      groups: {
        invisibleGroup: invisibleGroup,
        outerGroup: outerGroup,
        middleGroup: middleGroup,
        innerGroup: innerGroup
      },
      labels: {
        invisibleLabelsGroup: invisibleLabelsGroup,
        outerLabelsGroup: outerLabelsGroup,
        middleLabelsGroup: middleLabelsGroup,
        innerLabelsGroup: innerLabelsGroup
      },
      arcs: {
        invisibleArc: invisibleArc,
        outerArc: outerArc,
        middleArc: middleArc,
        innerArc: innerArc
      },
      colorScales: {
        invisibleColor: invisibleColor,
        negativeColor: negativeColor,
        neutralColor: neutralColor,
        positiveColor: positiveColor
      },
      // ✅ Semantic colors
      styles: styles,
      pie: pie,
      radii: {
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        innerInnerRadius: innerInnerRadius,
        middleRadius: middleRadius,
        centerRadius: centerRadius
      },
      helpers: {
        calculateTextTransform: calculateTextTransform,
        wrapText: wrapText,
        getTextConstraints: getTextConstraints
      },
      getDataToUse: function getDataToUse() {
        return isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
      },
      getCellVisibility: function getCellVisibility(unitId, ringType) {
        return cellVisibility[unitId] && cellVisibility[unitId][ringType];
      },
      bindCellEvents: bindCellEvents,
      getIsWhiteOutside: function getIsWhiteOutside() {
        return isWhiteOutside;
      }
    });
    var updateAllRings = rings.updateAllRings;

    // ===== ARROW DRAWING FUNCTIONALITY (moved to arrows-module cell) =====
    var arrows = makeArrowsModule({
      defs: defs,
      contentGroup: contentGroup,
      centerCircle: centerCircle,
      nestedData: nestedData,
      pie: pie,
      radii: {
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        innerInnerRadius: innerInnerRadius,
        middleRadius: middleRadius,
        centerRadius: centerRadius
      },
      styles: styles,
      arrowUtilities: arrowUtilities
    });
    // Keep label/coordinate groups above arrows
    invisibleLabelsGroup.raise();
    outerLabelsGroup.raise();
    middleLabelsGroup.raise();
    innerLabelsGroup.raise();
    coordinateGroup.raise();
    function clearArrows() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      arrows.clearArrows(options);
    }
    function drawArrow(from, to) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#666";
      var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      var fromRing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "middle";
      var toRing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "middle";
      var delay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      arrows.drawArrow(from, to, color, strokeWidth, fromRing, toRing, delay);
    }
    function getCellCentroid(unitId) {
      var ringType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "middle";
      return arrows.getCellCentroid(unitId, ringType);
    }
    function drawAllArrows() {
      // Preserve flow arrows when redrawing main arrows
      clearArrows({
        includeFlow: false
      });
      var connections = parseArrowConnections(arrowConnections, dialecticalData);

      // Use arrowOptions if available, otherwise use defaults
      var options = typeof arrowOptions !== 'undefined' ? {
        bow: arrowOptions[0],
        stretch: arrowOptions[1],
        minStretch: arrowOptions[2],
        maxStretch: arrowOptions[3],
        padStart: arrowOptions[4],
        padEnd: arrowOptions[5],
        maxPadPercent: arrowOptions[6],
        flip: arrowOptions[7],
        straights: arrowOptions[8],
        onArrowClick: function onArrowClick(dotLine, connection) {
          viewof_clickedArrowInfo.value = {
            dotLine: dotLine,
            connection: connection
          };
        }
      } : {
        bow: 0,
        stretch: 0.5,
        minStretch: 0,
        maxStretch: 420,
        padStart: 0,
        padEnd: 20,
        maxPadPercent: 0.25,
        flip: false,
        straights: true,
        onArrowClick: function onArrowClick(dotLine, connection) {
          if (typeof viewof_clickedArrowInfo !== 'undefined') {
            viewof_clickedArrowInfo.value = {
              dotLine: dotLine,
              connection: connection
            };
          }
        }
      };
      arrows.drawLabelLinks(connections, options);
    }
    function drawFlow() {
      //clearArrows();
      var connections = parseArrowConnections(flowConnections, dialecticalData);

      // Use flowArrowOptions if available, otherwise use defaults
      var options = typeof flowArrowOptions !== 'undefined' ? {
        klass: "flow-arrows",
        bow: flowArrowOptions[0],
        stretch: flowArrowOptions[1],
        minStretch: flowArrowOptions[2],
        maxStretch: flowArrowOptions[3],
        padStart: flowArrowOptions[4],
        padEnd: flowArrowOptions[5],
        maxPadPercent: flowArrowOptions[6],
        flip: flowArrowOptions[7],
        straights: flowArrowOptions[8],
        onArrowClick: function onArrowClick(dotLine, connection) {
          if (typeof viewof_clickedArrowInfo !== 'undefined') {
            viewof_clickedArrowInfo.value = {
              dotLine: dotLine,
              connection: connection
            };
          }
        }
      } : {
        klass: "flow-arrows",
        bow: 0.1,
        stretch: 0.5,
        minStretch: 0,
        maxStretch: 420,
        padStart: 30,
        padEnd: 30,
        maxPadPercent: 0.35,
        flip: false,
        straights: true,
        onArrowClick: function onArrowClick(dotLine, connection) {
          if (typeof viewof_clickedArrowInfo !== 'undefined') {
            viewof_clickedArrowInfo.value = {
              dotLine: dotLine,
              connection: connection
            };
          }
        }
      };
      arrows.drawLabelLinks(connections, options);
    }
    function toggleFlowArrows(show) {
      if (show) {
        drawFlow();
      } else {
        d3.select(svg.node()).selectAll('g.flow-arrows').remove();
      }
    }
    var anchorPointsVisible = false;
    function toggleAnchorPoints() {
      if (anchorPointsVisible) {
        arrows.clearAnchorPoints();
        anchorPointsVisible = false;
        return "Anchor points hidden";
      } else {
        arrows.visualizeAnchorPoints();
        anchorPointsVisible = true;
        return "Anchor points visible";
      }
    }

    // Step mode module wiring
    var stepMode = makeStepMode({
      dialecticalData: dialecticalData,
      transformToNestedPieData: transformToNestedPieData,
      initializeBuildSteps: initializeBuildSteps,
      isThesisType: isThesisType,
      getOppositePrefix: getOppositePrefix,
      pie: pie,
      radii: {
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        innerInnerRadius: innerInnerRadius,
        middleRadius: middleRadius,
        centerRadius: centerRadius
      },
      styles: styles,
      groups: {
        outerGroup: outerGroup,
        middleLabelsGroup: middleLabelsGroup,
        innerGroup: innerGroup,
        outerLabelsGroup: outerLabelsGroup,
        middleGroup: middleGroup
      },
      helpers: {
        calculateTextTransform: calculateTextTransform,
        wrapText: wrapText,
        getTextConstraints: getTextConstraints
      }
    });
    function startStepMode() {
      isStepMode = true;
      stepMode.startStepMode(_objectSpread2({
        cellVisibility: cellVisibility,
        updateAllRings: updateAllRings,
        focusPair: focusPair,
        showCell: showCell,
        hideCell: hideCell,
        clearFocus: function clearFocus() {
          focusedPair = null;
        },
        resetZoom: resetZoom,
        hideCoordinates: function hideCoordinates() {
          return coordinateGroup.style("display", "none");
        },
        getCurrentRotationFromDOM: getCurrentRotationFromDOM,
        setIsStepMode: function setIsStepMode(v) {
          isStepMode = v;
        },
        getIsStepMode: function getIsStepMode() {
          return isStepMode;
        },
        getIsWhiteOutside: function getIsWhiteOutside() {
          return isWhiteOutside;
        },
        nestedData: nestedData,
        originalNestedData: originalNestedData,
        updateAxisPositions: updateAxisPositions,
        rotateToSlice: rotateToSlice,
        setRotationDirectly: setRotationDirectly,
        cells: cells
      }, stepMode));
    }
    function stepForward() {
      return stepMode.stepForward({
        getIsStepMode: function getIsStepMode() {
          return isStepMode;
        },
        updateAllRings: updateAllRings,
        cellVisibility: cellVisibility,
        focusPair: focusPair,
        showCell: showCell,
        hideCell: hideCell,
        getCurrentRotationFromDOM: getCurrentRotationFromDOM,
        groups: {
          outerGroup: outerGroup,
          middleLabelsGroup: middleLabelsGroup,
          innerGroup: innerGroup
        },
        helpers: {
          calculateTextTransform: calculateTextTransform,
          wrapText: wrapText,
          getTextConstraints: getTextConstraints
        },
        styles: styles
      });
    }
    function stepBackward() {
      return stepMode.stepBackward({
        getIsStepMode: function getIsStepMode() {
          return isStepMode;
        },
        updateAllRings: updateAllRings,
        cellVisibility: cellVisibility,
        focusPair: focusPair,
        showCell: showCell,
        hideCell: hideCell,
        getCurrentRotationFromDOM: getCurrentRotationFromDOM,
        groups: {
          outerGroup: outerGroup,
          middleLabelsGroup: middleLabelsGroup,
          innerGroup: innerGroup
        },
        helpers: {
          calculateTextTransform: calculateTextTransform,
          wrapText: wrapText,
          getTextConstraints: getTextConstraints
        },
        styles: styles
      });
    }
    function resetToFull() {
      return stepMode.resetToFull({
        setIsStepMode: function setIsStepMode(v) {
          isStepMode = v;
        },
        cellVisibility: cellVisibility,
        clearFocus: function clearFocus() {
          focusedPair = null;
        },
        resetZoom: resetZoom,
        setRotationDirectly: setRotationDirectly,
        nestedData: nestedData,
        originalNestedData: originalNestedData,
        updateAllRings: updateAllRings,
        showCoordinates: function showCoordinates() {
          return coordinateGroup.style("display", "block");
        },
        updateAxisPositions: updateAxisPositions,
        rotateToSlice: rotateToSlice,
        cells: cells
      });
    }
    function getCurrentStepInfo() {
      return stepMode.getCurrentStepInfo({
        getIsStepMode: function getIsStepMode() {
          return isStepMode;
        }
      });
    }

    // Modified resetToFull that doesn't call updateAxisPositions (for loading animation)
    function resetToFullWithoutAxisUpdate() {
      return stepMode.resetToFull({
        setIsStepMode: function setIsStepMode(v) {
          isStepMode = v;
        },
        cellVisibility: cellVisibility,
        clearFocus: function clearFocus() {
          focusedPair = null;
        },
        resetZoom: resetZoom,
        setRotationDirectly: setRotationDirectly,
        nestedData: nestedData,
        originalNestedData: originalNestedData,
        updateAllRings: updateAllRings,
        showCoordinates: function showCoordinates() {
          return coordinateGroup.style("display", "block");
        },
        updateAxisPositions: function updateAxisPositions() {},
        // No-op function to prevent axis updates
        rotateToSlice: rotateToSlice,
        cells: cells
      });
    }

    // Loading animation function that returns a promise
    function initializeWithLoadingAnimation() {
      return _initializeWithLoadingAnimation.apply(this, arguments);
    } // Initialize with loading animation and wait for it to complete
    function _initializeWithLoadingAnimation() {
      _initializeWithLoadingAnimation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var animationDuration;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              // First, hide all rings, labels, and axes initially
              invisibleGroup.style("opacity", 0);
              outerGroup.style("opacity", 0);
              middleGroup.style("opacity", 0);
              innerGroup.style("opacity", 0);
              invisibleLabelsGroup.style("opacity", 0);
              outerLabelsGroup.style("opacity", 0);
              middleLabelsGroup.style("opacity", 0);
              innerLabelsGroup.style("opacity", 0);
              centerCircle.style("opacity", 0);
              coordinateGroup.style("opacity", 0); // Hide axes labels

              // Initialize the chart data (this will do text wrapping but it's hidden)
              // Use a modified resetToFull that doesn't call updateAxisPositions
              resetToFullWithoutAxisUpdate();
              rotateToSlice(cells[0], undefined, true);

              // Animate rings emanating in sequence and wait for completion
              animationDuration = 300; // ms per ring
              // Start with the center hub
              _context2.n = 1;
              return new Promise(function (resolve) {
                centerCircle.transition().duration(animationDuration).style("opacity", 1).on("end", resolve);
              });
            case 1:
              _context2.n = 2;
              return new Promise(function (resolve) {
                innerGroup.transition().duration(animationDuration).style("opacity", 1).on("end", resolve);
                innerLabelsGroup.transition().duration(animationDuration).style("opacity", 1);
              });
            case 2:
              _context2.n = 3;
              return new Promise(function (resolve) {
                middleGroup.transition().duration(animationDuration).style("opacity", 1).on("end", resolve);
                middleLabelsGroup.transition().duration(animationDuration).style("opacity", 1);
              });
            case 3:
              _context2.n = 4;
              return new Promise(function (resolve) {
                outerGroup.transition().duration(animationDuration).style("opacity", 1).on("end", resolve);
                outerLabelsGroup.transition().duration(animationDuration).style("opacity", 1);
              });
            case 4:
              _context2.n = 5;
              return new Promise(function (resolve) {
                invisibleGroup.transition().duration(animationDuration).style("opacity", 1).on("end", resolve);
                invisibleLabelsGroup.transition().duration(animationDuration).style("opacity", 1);
              });
            case 5:
              // After all rings have finished emanating, show axes and update positions
              coordinateGroup.transition().duration(300).style("opacity", 1);
              updateAxisPositions(cells[0]);
            case 6:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return _initializeWithLoadingAnimation.apply(this, arguments);
    }
    initializeWithLoadingAnimation().then(function () {
      // Ensure labels/layout are computed before drawing arrows to avoid centroid fallback
      // Make chart reactive first so text layout/wrapping runs
      // Then schedule arrow drawing on subsequent frames
      // --- MAKE CHART REACTIVE INITIALLY ---
      updateChartValue();

      // Draw initial arrows after layout settles - use timeout to ensure text wrapping completes
      setTimeout(function () {
        drawAllArrows();
      }, 100);
    });

    // Return the svg node with exposed methods (Observable pattern)
    return Object.assign(svg.node(), {
      focusPair: focusPair,
      unfocus: unfocus,
      get focusedPair() {
        return focusedPair;
      },
      cells: cells,
      resetZoom: resetZoom,
      rotateToSlice: rotateToSlice,
      rotate: function rotate(angle) {
        setRotationDirectly(angle);
      },
      // Step animation methods
      startStepMode: startStepMode,
      stepForward: stepForward,
      stepBackward: stepBackward,
      resetToFull: resetToFull,
      getCurrentStepInfo: getCurrentStepInfo,
      // Arrow control methods
      drawAllArrows: drawAllArrows,
      drawFlow: drawFlow,
      clearArrows: clearArrows,
      drawArrow: drawArrow,
      drawLabelLinks: function drawLabelLinks(connections) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        // Merge current arrowOptions with provided options (provided options take precedence)
        var currentOptions = typeof arrowOptions !== 'undefined' ? {
          bow: arrowOptions[0],
          stretch: arrowOptions[1],
          minStretch: arrowOptions[2],
          maxStretch: arrowOptions[3],
          padStart: arrowOptions[4],
          padEnd: arrowOptions[5],
          maxPadPercent: arrowOptions[6],
          flip: arrowOptions[7],
          straights: arrowOptions[8]
        } : {
          bow: 0,
          stretch: 0.5,
          minStretch: 0,
          maxStretch: 420,
          padStart: 0,
          padEnd: 20,
          maxPadPercent: 0.25,
          flip: false,
          straights: true
        };
        return arrows.drawLabelLinks(connections, _objectSpread2(_objectSpread2({}, currentOptions), options));
      },
      getCellCentroid: getCellCentroid,
      toggleFlowArrows: toggleFlowArrows,
      redrawFlowArrows: function redrawFlowArrows() {
        // Check if flow arrows are currently visible
        var flowVisible = d3.select(svg.node()).selectAll('g.flow-arrows').size() > 0;
        if (flowVisible) {
          // Clear and redraw flow arrows with current options
          d3.select(svg.node()).selectAll('g.flow-arrows').remove();
          drawFlow();
        }
      },
      toggleAnchorPoints: toggleAnchorPoints,
      // Invisible ring utilities (for debugging)
      toggleInvisibleRingBorders: function toggleInvisibleRingBorders() {
        // Toggle the visibility of invisible ring borders (not text)
        var currentStyle = invisibleGroup.style("opacity");
        var newOpacity = currentStyle === "0.2" ? "0" : "0.2";
        invisibleGroup.style("opacity", newOpacity);
        return newOpacity === "0.2" ? "Invisible ring borders are now visible" : "Invisible ring borders are now hidden";
      }
    });
  }();
}
function _stepControls(html, viewof_chart) {
  return function () {
    var container = html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<div style=\"display: flex; flex-direction: column; align-items: center; margin: 20px 0;\">\n        <div style=\"display: flex; justify-content: center; gap: 10px; margin-bottom: 15px; align-items: center;\">\n          <button id=\"start\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\">Start Step Mode</button>\n          <button id=\"prev\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; display: none;\" disabled>Previous</button>\n          <span id=\"counter\" style=\"margin: 0 10px; font-weight: bold;\">Step 0 of 24</span>\n          <button id=\"next\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\" disabled>Next</button>\n          <button id=\"reset\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;\">Show All</button>\n        </div>\n        <div style=\"display: flex; align-items: center; gap: 10px;\">\n          <label for=\"rotation-slider\" style=\"font-weight: bold;\">Rotation:</label>\n          <input type=\"range\" id=\"rotation-slider\" min=\"0\" max=\"360\" value=\"0\" step=\"1\" \n                 style=\"width: 200px; cursor: pointer;\" />\n          <span id=\"rotation-value\" style=\"min-width: 40px; font-family: monospace;\">0\xB0</span>\n          <button id=\"rotation-reset\" style=\"padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 12px;\">Reset</button>\n        </div>\n      </div>"])));
    var startBtn = container.querySelector('#start');
    // const prevBtn = container.querySelector('#prev'); // Hidden - commenting out
    var nextBtn = container.querySelector('#next');
    var resetBtn = container.querySelector('#reset');
    var counter = container.querySelector('#counter');
    var rotationSlider = container.querySelector('#rotation-slider');
    var rotationValue = container.querySelector('#rotation-value');
    var rotationResetBtn = container.querySelector('#rotation-reset');
    function updateUI() {
      var stepInfo = viewof_chart.getCurrentStepInfo();
      if (stepInfo) {
        // In step mode
        counter.textContent = "Step ".concat(stepInfo.current, " of ").concat(stepInfo.total, " (").concat(stepInfo.unit, " ").concat(stepInfo.stepType, ")");
        // prevBtn.disabled = !stepInfo.canStepBackward; // Hidden - commenting out
        nextBtn.disabled = !stepInfo.canStepForward;
        startBtn.disabled = true;
        resetBtn.disabled = false;
      } else {
        // In full mode
        counter.textContent = "Full View";
        // prevBtn.disabled = true; // Hidden - commenting out
        nextBtn.disabled = true;
        startBtn.disabled = false;
        resetBtn.disabled = true;
      }
    }
    startBtn.addEventListener('click', function () {
      viewof_chart.startStepMode();
      updateUI();
    });

    // prevBtn.addEventListener('click', () => {
    //   viewof chart.stepBackward();
    //   updateUI();
    // }); // Hidden - commenting out

    nextBtn.addEventListener('click', function () {
      viewof_chart.stepForward();
      updateUI();
    });
    resetBtn.addEventListener('click', function () {
      viewof_chart.resetToFull();
      updateUI();
    });

    // Rotation slider event listeners
    rotationSlider.addEventListener('input', function (e) {
      var degrees = parseInt(e.target.value);
      var radians = degrees * Math.PI / 180;
      viewof_chart.rotate(radians);
      rotationValue.textContent = "".concat(degrees, "\xB0");
    });
    rotationResetBtn.addEventListener('click', function () {
      rotationSlider.value = 0;
      viewof_chart.rotate(0);
      rotationValue.textContent = '0°';
    });

    // Initialize UI
    updateUI();

    // Return the container with a value property for viewof
    container.value = "step-controls";
    return container;
  }();
}
function _focusedSlice(chart) {
  //console.log(`focusedSlice at ntbk level: ${chart.clickedSlice}`); 

  return chart.clickedSlice;
}
function _arrowOptions(Inputs, htl) {
  return Inputs.form([Inputs.range([0, 2], {
    value: 0.3,
    step: 0.1,
    label: "Bow"
  }), Inputs.range([0, 1], {
    value: 0.5,
    step: 0.05,
    label: "Stretch"
  }), Inputs.range([0, 200], {
    value: 0,
    step: 10,
    label: "Min Stretch"
  }), Inputs.range([100, 800], {
    value: 420,
    step: 20,
    label: "Max Stretch"
  }), Inputs.range([0, 100], {
    value: 5,
    step: 1,
    label: "Pad Start (px)"
  }), Inputs.range([0, 100], {
    value: 5,
    step: 1,
    label: "Pad End (px)"
  }), Inputs.range([0, 0.5], {
    value: 0.25,
    step: 0.05,
    label: "Max Pad (%)"
  }), Inputs.toggle({
    label: "Flip",
    value: false
  }), Inputs.toggle({
    label: "Straights",
    value: true
  })], {
    label: "Main Arrow Options",
    template: function template(inputs) {
      return htl.html(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-width: 600px;\">", "</div>"])), inputs);
    }
  });
}
function _flowArrowOptions(Inputs, htl) {
  return Inputs.form([Inputs.range([0, 2], {
    value: 0.1,
    step: 0.1,
    label: "Bow"
  }), Inputs.range([0, 1], {
    value: 0.5,
    step: 0.05,
    label: "Stretch"
  }), Inputs.range([0, 200], {
    value: 0,
    step: 10,
    label: "Min Stretch"
  }), Inputs.range([100, 800], {
    value: 420,
    step: 20,
    label: "Max Stretch"
  }), Inputs.range([0, 100], {
    value: 60,
    step: 1,
    label: "Pad Start (px)"
  }), Inputs.range([0, 100], {
    value: 60,
    step: 1,
    label: "Pad End (px)"
  }), Inputs.range([0, 0.5], {
    value: 0.35,
    step: 0.05,
    label: "Max Pad (%)"
  }), Inputs.toggle({
    label: "Flip",
    value: false
  }), Inputs.toggle({
    label: "Straights",
    value: true
  })], {
    label: "Flow Arrow Options",
    template: function template(inputs) {
      return htl.html(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-width: 600px;\">", "</div>"])), inputs);
    }
  });
}
function _clickedArrowInfo(htl) {
  var currentValue = {
    dotLine: null,
    connection: null
  };
  var container = htl.html(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["<div style=\"\n          padding: 15px;\n          background: #f8f9fa;\n          border-radius: 8px;\n          border-left: 4px solid #4a90e2;\n          margin: 10px 0;\n          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n        \">\n          <h4 style=\"margin: 0 0 10px 0; color: #2c3e50; font-size: 14px; font-weight: 600;\">\n            Clicked Arrow Info\n          </h4>\n          <div id=\"arrow-info\" style=\"font-size: 13px; color: #555;\">\n            <em style=\"color: #999;\">Click an arrow to see details...</em>\n          </div>\n        </div>"])));
  var infoDiv = container.querySelector('#arrow-info');
  Object.defineProperty(container, 'value', {
    get: function get() {
      return currentValue;
    },
    set: function set(val) {
      currentValue = val;
      var dotLine = val.dotLine,
        connection = val.connection;
      if (dotLine && connection) {
        // Show all connection properties
        var allProps = Object.keys(connection).map(function (key) {
          return "<div style=\"color: #666; font-size: 11px;\"><strong>".concat(key, ":</strong> ").concat(JSON.stringify(connection[key]), "</div>");
        }).join('');
        infoDiv.innerHTML = "\n                <div style=\"background: white; padding: 12px; border-radius: 6px; margin-top: 8px;\">\n                  <div style=\"margin-bottom: 8px;\">\n                    <strong style=\"color: #4a90e2;\">DOT Line:</strong>\n                    <code style=\"\n                      background: #e8f4f8;\n                      padding: 4px 8px;\n                      border-radius: 4px;\n                      color: #2c3e50;\n                      font-family: 'Monaco', 'Courier New', monospace;\n                      font-size: 12px;\n                      display: inline-block;\n                      margin-left: 8px;\n                    \">".concat(dotLine, "</code>\n                  </div>\n                  <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;\">\n                    <div style=\"background: #fff3cd; padding: 8px; border-radius: 4px;\">\n                      <div style=\"font-weight: 600; color: #856404; margin-bottom: 4px;\">From</div>\n                      <div style=\"color: #856404;\">").concat(connection.from, "</div>\n                      <div style=\"color: #856404; font-size: 11px; margin-top: 2px;\">Ring: ").concat(connection.fromRing || 'middle', "</div>\n                    </div>\n                    <div style=\"background: #d4edda; padding: 8px; border-radius: 4px;\">\n                      <div style=\"font-weight: 600; color: #155724; margin-bottom: 4px;\">To</div>\n                      <div style=\"color: #155724;\">").concat(connection.to, "</div>\n                      <div style=\"color: #155724; font-size: 11px; margin-top: 2px;\">Ring: ").concat(connection.toRing || 'middle', "</div>\n                    </div>\n                  </div>\n                  <details style=\"margin-top: 12px;\">\n                    <summary style=\"cursor: pointer; color: #666; font-size: 12px; font-weight: 600;\">All Properties</summary>\n                    <div style=\"margin-top: 8px; padding: 8px; background: #f8f9fa; border-radius: 4px;\">\n                      ").concat(allProps, "\n                    </div>\n                  </details>\n                </div>\n              ");
      } else {
        infoDiv.innerHTML = '<em style="color: #999;">Click an arrow to see details...</em>';
      }
      container.dispatchEvent(new CustomEvent('input'));
    }
  });
  return container;
}
function _4(chart) {
  return chart.focusedPair;
}
function _sliceNumber(Inputs, viewof_chart) {
  return Inputs.range([0, viewof_chart.cells.length - 1], {
    value: 0,
    step: 1,
    label: "slice number"
  });
}
function _5(viewof_chart, sliceNumber) {
  return viewof_chart.focusPair(viewof_chart.cells[sliceNumber]);
}
function _clickedCellObject(chart) {
  return chart.clickedCell;
}
function _clickedCellText(chart) {
  if (chart.clickedCell) return chart.clickedCell.fullText;
  return null;
}
function _topSlice(chart, dialecticalData) {
  // Get current rotation
  var currentRotation = chart.currentRotation;
  //console.log(`topSlice current rotation at ntbk level: ${currentRotation}`)

  // Calculate which slice is at the top (0 degrees)
  var units = Object.keys(dialecticalData);
  var numSlices = units.length;
  var angleStep = 2 * Math.PI / numSlices;

  // The top position is at 0 degrees (top of wheel)
  // We need to find which slice contains this angle
  var topAngle = 0; // 0 degrees
  var adjustedAngle = topAngle - currentRotation;

  // Normalize angle to [0, 2π]
  var normalizedAngle = (adjustedAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

  // Find which slice this angle falls into
  var sliceIndex = Math.floor(normalizedAngle / angleStep);
  var topUnitId = units[sliceIndex];
  return topUnitId;
}
function _topSliceTracker(html, chart, dialecticalData) {
  return function () {
    var container = html(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["<div style=\"display: flex; flex-direction: column; align-items: center; margin: 20px 0;\">\n        <div style=\"margin-bottom: 10px; font-weight: bold;\">Top Slice Tracker</div>\n\n        <div id=\"top-slice-info\" style=\"border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #f9f9f9; min-width: 300px; max-width: 500px;\">\n          <div id=\"top-slice-status\" style=\"font-weight: bold; color: #666; margin-bottom: 10px;\">Calculating...</div>\n          <div id=\"top-slice-details\" style=\"font-size: 14px; line-height: 1.4; color: #333;\"></div>\n        </div>\n\n        <div style=\"margin-top: 10px; font-size: 12px; color: #666;\">\n          Shows the slice currently at the top (0\xB0) position\n        </div>\n      </div>"])));
    var topSliceStatus = container.querySelector('#top-slice-status');
    var topSliceDetails = container.querySelector('#top-slice-details');
    function updateTopSliceDisplay() {
      // Get current rotation
      var currentRotation = chart.currentRotation;

      // Calculate which slice is at the top (0 degrees)
      var units = Object.keys(dialecticalData);
      var numSlices = units.length;
      var angleStep = 2 * Math.PI / numSlices;

      // The top position is at 0 degrees (top of wheel)
      // We need to find which slice contains this angle
      var topAngle = 0; // 0 degrees
      var adjustedAngle = topAngle - currentRotation;

      // Normalize angle to [0, 2π]
      var normalizedAngle = (adjustedAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

      // Find which slice this angle falls into
      var sliceIndex = Math.floor(normalizedAngle / angleStep);
      var topUnitId = units[sliceIndex];
      if (topUnitId) {
        topSliceStatus.textContent = "Top Slice: ".concat(topUnitId);
        topSliceStatus.style.color = '#007bff';

        // Get the data for this unit
        var unitData = dialecticalData[topUnitId];
        if (unitData) {
          var details = "\n              <div style=\"margin-bottom: 10px;\">\n                <div style=\"font-weight: bold; color: #333; margin-bottom: 5px;\">".concat(topUnitId, ":</div>\n                <div style=\"margin-left: 10px; margin-bottom: 8px;\">\n                  <strong>Statement:</strong> ").concat(unitData.statement, "\n                </div>\n                <div style=\"margin-left: 10px; margin-bottom: 8px;\">\n                  <strong>Positive:</strong> ").concat(unitData.positive, "\n                </div>\n                <div style=\"margin-left: 10px;\">\n                  <strong>Negative:</strong> ").concat(unitData.negative, "\n                </div>\n              </div>\n              <div style=\"font-size: 12px; color: #666; margin-top: 10px;\">\n                Rotation: ").concat((currentRotation * 180 / Math.PI).toFixed(1), "\xB0\n              </div>\n            ");
          topSliceDetails.innerHTML = details;
        } else {
          topSliceDetails.innerHTML = '<em>Data not available</em>';
        }
      } else {
        topSliceStatus.textContent = 'No slice at top';
        topSliceStatus.style.color = '#666';
        topSliceDetails.innerHTML = '<em>Could not determine top slice</em>';
      }
    }

    // Set up a simple polling mechanism to check rotation
    function startTracking() {
      // Update immediately
      updateTopSliceDisplay();

      // Update every 100ms to catch rotation changes
      setInterval(updateTopSliceDisplay, 100);
    }

    // Start tracking when the cell is created
    startTracking();

    // Return the container with exposed topUnitId
    container.value = "top-slice-tracker";
    container.topUnitId = null; // Will be updated by the tracking function

    // Update the tracking function to also update the exposed value
    var originalUpdateTopSliceDisplay = updateTopSliceDisplay;
    updateTopSliceDisplay = function updateTopSliceDisplay() {
      originalUpdateTopSliceDisplay();
      // Also update the exposed topUnitId
      var currentRotation = chart.currentRotation;
      var units = Object.keys(dialecticalData);
      var numSlices = units.length;
      var angleStep = 2 * Math.PI / numSlices;
      var topAngle = 0;
      var adjustedAngle = topAngle - currentRotation;
      var normalizedAngle = (adjustedAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      var sliceIndex = Math.floor(normalizedAngle / angleStep);
      container.topUnitId = units[sliceIndex] || null;
    };
    return container;
  }();
}
function _parseArrowConnections() {
  return function (dotScript, dialecticalData) {
    var connections = [];
    var lines = dotScript.split('\n');
    var _iterator = _createForOfIteratorHelper(lines),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        // Remove comments and trim
        line = line.split('//')[0].trim();
        if (!line) continue;

        // Parse "A -> B" syntax, now supporting +, -, and i suffixes
        var match = line.match(/(\w+[+-i]?)\s*->\s*(\w+[+-i]?)/);
        if (match) {
          var _match2 = _slicedToArray(match, 3),
            from = _match2[1],
            to = _match2[2];

          // Extract unit ID and ring type
          // ✅ SEMANTIC NAMES - Return polarity, not physical position
          var parseUnit = function parseUnit(unit) {
            if (unit.endsWith('+')) {
              var unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? {
                unitId: unitId,
                ringType: 'positive'
              } : null; // ✅ Green/positive
            } else if (unit.endsWith('-')) {
              var _unitId = unit.slice(0, -1);
              return dialecticalData[_unitId] ? {
                unitId: _unitId,
                ringType: 'negative'
              } : null; // ✅ Red/negative
            } else if (unit.endsWith('i')) {
              var _unitId2 = unit.slice(0, -1);
              return dialecticalData[_unitId2] ? {
                unitId: _unitId2,
                ringType: 'invisible'
              } : null;
            } else {
              return dialecticalData[unit] ? {
                unitId: unit,
                ringType: 'neutral'
              } : null; // ✅ White/neutral
            }
          };
          var fromParsed = parseUnit(from);
          var toParsed = parseUnit(to);
          if (fromParsed && toParsed) {
            connections.push({
              from: fromParsed.unitId,
              to: toParsed.unitId,
              fromRing: fromParsed.ringType,
              toRing: toParsed.ringType
            });
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return connections;
  };
}
function _dotScriptEditor(html, dialecticalData, arrowConnections, viewof_chart, parseArrowConnections) {
  return function () {
    var container = html(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["<div style=\"display: flex; flex-direction: column; align-items: center; margin: 20px 0;\">\n        <div style=\"margin-bottom: 10px; font-weight: bold;\">DOT Script Editor</div>\n\n        <!-- DOT Script Editor -->\n        <div style=\"margin-bottom: 10px;\">\n          <label for=\"connections-editor\" style=\"font-weight: bold;\">Edit Connections (DOT syntax):</label>\n        </div>\n        <textarea id=\"connections-editor\" style=\"width: 400px; height: 150px; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;\"></textarea>\n        <div style=\"margin-top: 10px;\">\n          <button id=\"update-connections\" style=\"padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #007bff; color: white; cursor: pointer;\">Update Arrows</button>\n        </div>\n        <div style=\"margin-top: 15px; font-size: 12px; color: #666; max-width: 400px;\">\n          <strong>Syntax:</strong> Use \"A -> B\" format. Available units: ", "<br/>\n          <strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>\n          <strong>Colors:</strong> \uD83D\uDD34Red for oppositions, \uD83D\uDD35Blue for same type, \uD83D\uDFE2Green for same polarity, \uD83D\uDFE3Purple for mixed\n        </div>\n      </div>"])), Object.keys(dialecticalData).join(', '));
    var editor = container.querySelector('#connections-editor');
    var updateBtn = container.querySelector('#update-connections');

    // Initialize editor with current connections
    editor.value = arrowConnections;

    // Function to draw arrows from custom connections
    function drawCustomArrows(customConnections) {
      viewof_chart.clearArrows();
      var connections = parseArrowConnections(customConnections, dialecticalData);
      // Use the label-node renderer for consistency with main view
      viewof_chart.drawLabelLinks(connections);
    }
    updateBtn.addEventListener('click', function () {
      console.log('Update button clicked');
      console.log('Editor value:', editor.value);
      console.log('Editor value length:', editor.value.length);

      // Parse and draw the custom connections
      drawCustomArrows(editor.value);
      console.log('Custom arrows drawn');
    });

    // Return the container
    container.value = "dot-script-editor";
    return container;
  }();
}
function _arrowConnections(dialecticalData) {
  return function () {
    var units = Object.keys(dialecticalData);
    var connections = [];

    // Create sequential chain: first -> second -> third -> fourth, etc.
    for (var i = 0; i < units.length; i++) {
      var current = units[i];
      var next = units[(i + 1) % units.length]; // Wrap around to first after last
      connections.push("".concat(current, " -> ").concat(next, "  // Sequential flow"));
    }

    // Add some ring-specific connections for visual interest
    for (var _i = 0; _i < Math.min(units.length, 4); _i++) {
      var _current = units[_i];
      var _next = units[(_i + 1) % units.length];
      if (_current.value == 0 || _next.value == 0) continue;
      connections.push("".concat(_current, "+ -> ").concat(_next, "+  // Positive chain"));
      connections.push("".concat(_current, "- -> ").concat(_next, "-  // Negative chain"));
    }
    return connections.join('\n');
  }();
}
function _flowConnections(dialecticalData) {
  return function () {
    var units = Object.keys(dialecticalData);
    var connections = [];

    // Add invisible ring connections
    for (var i = 0; i < units.length; i++) {
      var current = units[i];
      var target = units[(i + 1) % units.length]; // Skip one for variety
      connections.push("".concat(current, "i -> ").concat(target, "i  // Flow sequence"));
    }
    return connections.join('\n');
  }();
}
function _contraConnections(dialecticalData) {
  return function () {
    var units = Object.keys(dialecticalData);
    var connections = [];

    // Add invisible ring connections
    for (var i = 0; i * 2 < units.length; i++) {
      var current = units[i];
      var target = dialecticalData[units[i]].pairWith;
      connections.push("".concat(current, " -> ").concat(target, "  // Contra sequence"));
    }
    return connections.join('\n');
  }();
}
function _parseArrowConnectionsAsSourceTarget() {
  return function (dotScript, dialecticalData) {
    var connections = [];
    var lines = dotScript.split('\n');
    var _iterator2 = _createForOfIteratorHelper(lines),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var line = _step2.value;
        // Remove comments and trim
        line = line.split('//')[0].trim();
        if (!line) continue;

        // Parse "A -> B" syntax, now supporting +, -, and i suffixes
        var match = line.match(/(\w+[+-i]?)\s*->\s*(\w+[+-i]?)/);
        if (match) {
          var _match3 = _slicedToArray(match, 3),
            from = _match3[1],
            to = _match3[2];

          // Extract unit ID and ring type
          var parseUnit = function parseUnit(unit) {
            if (unit.endsWith('+')) {
              var unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? {
                unitId: unitId,
                ringType: 'positive'
              } : null;
            } else if (unit.endsWith('-')) {
              var _unitId3 = unit.slice(0, -1);
              return dialecticalData[_unitId3] ? {
                unitId: _unitId3,
                ringType: 'negative'
              } : null;
            } else if (unit.endsWith('i')) {
              var _unitId4 = unit.slice(0, -1);
              return dialecticalData[_unitId4] ? {
                unitId: _unitId4,
                ringType: 'invisible'
              } : null;
            } else {
              return dialecticalData[unit] ? {
                unitId: unit,
                ringType: 'statement'
              } : null;
            }
          };
          var fromParsed = parseUnit(from);
          var toParsed = parseUnit(to);
          if (fromParsed && toParsed) {
            // Determine connection type based on the relationship
            var type = 'flow';

            // Same unit connections (statement to its positive/negative)
            if (fromParsed.unitId === toParsed.unitId) {
              if (fromParsed.ringType === 'statement' && toParsed.ringType === 'positive') {
                type = 'support';
              } else if (fromParsed.ringType === 'statement' && toParsed.ringType === 'negative') {
                type = 'opposition';
              } else if (fromParsed.ringType === 'positive' && toParsed.ringType === 'negative') {
                type = 'tension';
              }
            }
            // Different unit connections
            else {
              var fromIsThesis = fromParsed.unitId.startsWith('T');
              var toIsThesis = toParsed.unitId.startsWith('T');

              // Same ring type connections
              if (fromParsed.ringType === toParsed.ringType) {
                if (fromParsed.ringType === 'statement') {
                  type = fromIsThesis === toIsThesis ? 'parallel' : 'dialectical';
                } else if (fromParsed.ringType === 'positive') {
                  type = 'reinforcement';
                } else if (fromParsed.ringType === 'negative') {
                  type = 'amplification';
                } else if (fromParsed.ringType === 'invisible') {
                  type = 'structural';
                }
              }
              // Cross-ring connections
              else {
                if (fromParsed.ringType === 'positive' && toParsed.ringType === 'negative' || fromParsed.ringType === 'negative' && toParsed.ringType === 'positive') {
                  type = 'contradiction';
                } else if (fromParsed.ringType === 'invisible' || toParsed.ringType === 'invisible') {
                  type = 'hidden';
                } else {
                  type = 'synthesis';
                }
              }
            }
            connections.push({
              source: "".concat(fromParsed.unitId, ": ").concat(dialecticalData[fromParsed.unitId].statement),
              target: "".concat(toParsed.unitId, ": ").concat(dialecticalData[toParsed.unitId].statement),
              type: type
            });
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return connections;
  };
}
function _6() {
  return null;
}
function _transformToNestedPieData(whitesOnly) {
  return function (dialecticalData) {
    var whiteOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : whitesOnly;
    var units = Object.keys(dialecticalData);
    // ✅ SEMANTIC KEYS - No more position-based hack!

    return {
      invisible: units.map(function (unit, index) {
        return {
          name: "".concat(unit, "i"),
          unitId: unit,
          value: 1,
          opacity: 1,
          fullText: "".concat(unit),
          polarity: 'invisible',
          pairWith: dialecticalData[unit].pairWith,
          pairId: dialecticalData[unit].pairId
        };
      }),
      negative: units.map(function (unit) {
        return {
          name: "".concat(unit, "-"),
          unitId: unit,
          value: whiteOnly ? 0 : 1,
          opacity: whiteOnly ? 0 : 1,
          fullText: dialecticalData[unit].negative,
          polarity: 'negative',
          pairWith: dialecticalData[unit].pairWith,
          pairId: dialecticalData[unit].pairId
        };
      }),
      neutral: units.map(function (unit) {
        return {
          name: unit,
          unitId: unit,
          value: 1,
          opacity: 1,
          fullText: dialecticalData[unit].statement,
          polarity: 'neutral',
          pairWith: dialecticalData[unit].pairWith,
          pairId: dialecticalData[unit].pairId
        };
      }),
      positive: units.map(function (unit) {
        return {
          name: "".concat(unit, "+"),
          unitId: unit,
          value: whiteOnly ? 0 : 1,
          opacity: whiteOnly ? 0 : 1,
          fullText: dialecticalData[unit].positive,
          polarity: 'positive',
          pairWith: dialecticalData[unit].pairWith,
          pairId: dialecticalData[unit].pairId
        };
      })
    };
  };
}
function _wrapText(getRingOrder, styles, tryWrapWithLineBreaks, truncateWithEllipses) {
  return function (textElement, text, constraints) {
    constraints.midWidth;
      var maxHeight = constraints.maxHeight,
      ringType = constraints.ringType,
      arcData = constraints.arcData;
    // New: also get angle, innerRadius, outerRadius
    var angle = arcData.endAngle - arcData.startAngle;

    // ✅ SEMANTIC SUPPORT: Map semantic names to physical radii via centralized order
    var order = getRingOrder();
    var physicalPosition = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];
    var innerRadius, outerRadius;
    if (physicalPosition === "outer") {
      innerRadius = styles.radii.middleOuter;
      outerRadius = styles.radii.outer;
    } else if (physicalPosition === "middle") {
      innerRadius = styles.radii.middleInner;
      outerRadius = styles.radii.middleOuter;
    } else if (physicalPosition === "invisible") {
      innerRadius = styles.radii.outer;
      outerRadius = styles.radii.invisible;
    } else {
      // inner
      innerRadius = styles.radii.hub;
      outerRadius = styles.radii.middleInner;
    }

    // Clear any existing content
    textElement.selectAll("tspan").remove();
    textElement.text("");

    // Step 1: Try natural line breaks with original font size
    var result = tryWrapWithLineBreaks(textElement, text, maxHeight, angle, innerRadius, outerRadius);
    if (result.success) {
      return result;
    }

    // Step 2: Try font resizing (reduce font size progressively)
    var originalFontSize = parseFloat(textElement.style("font-size"));
    var minFontSize = Math.max(4, originalFontSize * 0.5); // Don't go below 4px or 50% of original
    for (var fontSize = originalFontSize - 0.1; fontSize >= minFontSize; fontSize -= 0.1) {
      textElement.style("font-size", fontSize + "px");
      textElement.selectAll("tspan").remove();
      textElement.text("");
      result = tryWrapWithLineBreaks(textElement, text, maxHeight, angle, innerRadius, outerRadius);
      if (result.success) {
        return result;
      }
    }

    // Step 3: Truncate with ellipses at minimum font size (fallback: use outermost arc length)
    textElement.style("font-size", minFontSize + "px");
    textElement.selectAll("tspan").remove();
    textElement.text("");
    var maxWidth = angle * ((innerRadius + outerRadius) / 2) * 0.85;
    return truncateWithEllipses(textElement, text, maxWidth, maxHeight, false);
  };
}
function _tryWrapWithLineBreaks() {
  return function (textElement, text, maxHeight, angle, innerRadius, outerRadius) {
    var fontSize = parseFloat(textElement.style("font-size"));
    var lineHeight = fontSize * 1.2;
    var maxLines = Math.floor(maxHeight / lineHeight);
    if (maxLines < 1) {
      return {
        success: false
      };
    }

    // Create a temporary tspan to measure text
    var tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);

    // Calculate margin proportional to inner/outer radius
    var margin = 0.8;

    // Helper function to get chord length for a given line index
    var getChordLength = function getChordLength(lineIndex) {
      var radius = outerRadius - (lineIndex + 0.5) * lineHeight;
      if (radius < innerRadius) radius = innerRadius;
      var bestAngle = Math.acos(radius / outerRadius);
      return 2 * radius * Math.sin(Math.min(bestAngle, angle / 2)) * margin;
    };

    // Helper function to measure text
    var measureText = function measureText(txt) {
      tempTspan.text(txt);
      return tempTspan.node().getComputedTextLength();
    };

    // Simple hyphenation - only break long words that don't fit
    var hyphenate = function hyphenate(word) {
      if (word.length < 6) return null; // Don't hyphenate short words

      var syllables = [];
      var current = '';
      var vowels = 'aeiouyAEIOUY';
      var lastWasVowel = false;
      for (var _i2 = 0; _i2 < word.length; _i2++) {
        var _char = word[_i2];
        var isVowel = vowels.includes(_char);
        current += _char;

        // Break after vowel-consonant transitions
        if (_i2 > 1 && _i2 < word.length - 2 && lastWasVowel && !isVowel) {
          syllables.push(current);
          current = '';
        }
        lastWasVowel = isVowel;
      }
      if (current) syllables.push(current);
      return syllables.length > 1 ? syllables : null;
    };

    // ======= GREEDY LINE BREAKING WITH FALLBACK HYPHENATION =======

    var words = text.split(/\s+/);
    var lines = [];
    var lineIdx = 0;
    var i = 0;
    while (i < words.length && lines.length < maxLines) {
      var maxWidth = getChordLength(lineIdx);
      var currentLine = [];
      var currentWidth = 0;

      // Greedily pack words on this line
      while (i < words.length) {
        var word = words[i];
        var spaceWidth = currentLine.length > 0 ? measureText(' ') : 0;
        var wordWidth = measureText(word);
        var testWidth = currentWidth + spaceWidth + wordWidth;
        if (testWidth <= maxWidth) {
          // Word fits, add it
          if (currentLine.length > 0) currentWidth += spaceWidth;
          currentLine.push(word);
          currentWidth += wordWidth;
          i++;
        } else if (currentLine.length === 0) {
          // First word on line doesn't fit - try hyphenating it
          var syllables = hyphenate(word);
          if (!syllables) {
            // Can't hyphenate or word is too short, fail
            tempTspan.remove();
            return {
              success: false
            };
          }

          // Find how many syllables fit with hyphen
          var hyphenWidth = measureText('-');
          var accumulated = '';
          var fitted = 0;
          for (var si = 0; si < syllables.length - 1; si++) {
            var testPart = accumulated + syllables[si];
            var _testWidth = measureText(testPart) + hyphenWidth;
            if (_testWidth <= maxWidth) {
              accumulated = testPart;
              fitted = si + 1;
            } else {
              break;
            }
          }
          if (fitted === 0) {
            // Even one syllable doesn't fit
            tempTspan.remove();
            return {
              success: false
            };
          }

          // Use the fitted syllables with hyphen
          currentLine.push(accumulated + '-');
          currentWidth = measureText(accumulated) + hyphenWidth;

          // Put remaining syllables back for next line
          var remaining = syllables.slice(fitted).join('');
          words[i] = remaining;
          break; // Line is done
        } else {
          // We have words on the line, move to next line
          break;
        }
      }
      if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
        lineIdx++;
      } else {
        break;
      }
    }

    // Check if all words were placed
    if (i < words.length) {
      tempTspan.remove();
      return {
        success: false
      };
    }
    tempTspan.remove();

    // Calculate total text height for centering
    var totalHeight = lines.length * lineHeight;
    var offsetY = -(totalHeight - lineHeight) / 2;

    // Create the actual tspans
    lines.forEach(function (line, index) {
      textElement.append("tspan").attr("x", 0).attr("dy", index === 0 ? offsetY : lineHeight).text(line);
    });
    return {
      success: true,
      lines: lines.length,
      fontSize: fontSize,
      totalHeight: totalHeight
    };
  };
}
function _truncateWithEllipses() {
  return function (textElement, text, maxWidth, maxHeight, isNarrowCell) {
    var fontSize = parseFloat(textElement.style("font-size"));
    var lineHeight = fontSize * 1.2;
    var maxLines = Math.floor(maxHeight / lineHeight);
    if (maxLines < 1) {
      // If we can't fit even one line, just show the first few characters
      var tspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
      var truncated = "";
      for (var i = 0; i < text.length; i++) {
        var testText = text.substring(0, i + 1) + "...";
        tspan.text(testText);
        if (tspan.node().getComputedTextLength() > maxWidth) {
          break;
        }
        truncated = testText;
      }
      tspan.text(truncated || "...");
      return {
        success: true,
        truncated: true,
        totalHeight: fontSize * 1.2
      };
    }
    var words = text.split(/\s+/);
    var lines = [];
    var currentLine = [];
    var tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
    for (var _i3 = 0; _i3 < words.length; _i3++) {
      var word = words[_i3];
      var testLine = [].concat(_toConsumableArray(currentLine), [word]);
      var isLastPossibleLine = lines.length === maxLines - 1;
      var _testText = isLastPossibleLine ? testLine.join(" ") + "..." : testLine.join(" ");
      tempTspan.text(_testText);
      if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 0) {
        // Current line is full
        if (lines.length >= maxLines - 1) {
          // This is the last line we can fit, add ellipses
          var finalLine = currentLine.join(" ") + "...";
          tempTspan.text(finalLine);
          if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 1) {
            // Even with ellipses it's too long, remove words until it fits
            while (currentLine.length > 1) {
              currentLine.pop();
              var shorterLine = currentLine.join(" ") + "...";
              tempTspan.text(shorterLine);
              if (tempTspan.node().getComputedTextLength() <= maxWidth) {
                break;
              }
            }
          }
          lines.push(currentLine.join(" ") + "...");
          break;
        } else {
          lines.push(currentLine.join(" "));
          currentLine = [word];
        }
      } else {
        currentLine.push(word);
      }
    }

    // Add the last line if we haven't hit the limit and there are remaining words
    if (lines.length < maxLines && currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }
    tempTspan.remove();

    // Calculate total text height for centering
    var totalHeight = lines.length * lineHeight;
    var offsetY = -(totalHeight - lineHeight) / 2; // Center the text block

    // Create the actual tspans with proper centering
    lines.forEach(function (line, index) {
      textElement.append("tspan").attr("x", 0).attr("dy", index === 0 ? offsetY : lineHeight).text(line);
    });
    return {
      success: true,
      lines: lines.length,
      truncated: lines.some(function (line) {
        return line.includes("...");
      }),
      totalHeight: totalHeight
    };
  };
}
function _getTextConstraints(getRingOrder, styles) {
  return function (ringType, arcData) {
    var angle = arcData.endAngle - arcData.startAngle;

    // ✅ SEMANTIC SUPPORT: Map semantic names to physical radii via centralized order
    var order = getRingOrder();
    var physicalPosition = ringType === "positive" ? "inner" : ringType === "invisible" ? "invisible" : order.bySemantic[ringType];

    // Calculate actual ring dimensions based on physical position
    var innerRadius, outerRadius;
    if (physicalPosition === "invisible") {
      innerRadius = styles.radii.outer;
      outerRadius = styles.radii.invisible;
    } else if (physicalPosition === "outer") {
      innerRadius = styles.radii.middleOuter; // innerRadius
      outerRadius = styles.radii.outer; // outerRadius
    } else if (physicalPosition === "middle") {
      innerRadius = styles.radii.middleInner; // innerInnerRadius  
      outerRadius = styles.radii.middleOuter; // middleRadius
    } else {
      // inner
      innerRadius = styles.radii.hub; // inner hole radius
      outerRadius = styles.radii.middleInner; // centerRadius
    }

    // Calculate available radial space (height)
    var radialSpace = outerRadius - innerRadius;
    var maxHeight = radialSpace * 0.8; // Use 80% of radial space for safety margin

    // Calculate available angular space (width) at the middle radius
    var middleRadius = (innerRadius + outerRadius) / 2;
    var arcLength = middleRadius * angle;
    var maxWidth = arcLength * 0.85; // Use 85% of arc length for safety margin

    // Ensure minimum readable dimensions
    var minWidth = 30;
    var minHeight = 20;
    return {
      maxWidth: Math.max(maxWidth, minWidth),
      maxHeight: Math.max(maxHeight, minHeight),
      ringType: ringType,
      arcData: arcData,
      // Additional info for debugging
      cellAngle: angle,
      cellAngleDegrees: angle * 180 / Math.PI,
      radialSpace: radialSpace,
      arcLength: arcLength
    };
  };
}
function _arrowUtilities(isThesisType) {
  return function () {
    // Quadratic curve point calculation
    function getPointAlongQuadraticCurve(start, control, end, t) {
      var x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control.x + Math.pow(t, 2) * end.x;
      var y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control.y + Math.pow(t, 2) * end.y;
      return {
        x: x,
        y: y
      };
    }

    // Create arrowhead marker for a specific color
    function createArrowheadMarker(defs, color, id) {
      defs.append("marker").attr("id", id).attr("viewBox", "0 -5 10 10").attr("refX", 6).attr("refY", 0).attr("markerWidth", 3.5).attr("markerHeight", 3.5).attr("orient", "auto").append("path").attr("d", "M0,-5L10,0L0,5").attr("fill", color);
    }

    // Get the appropriate arrowhead marker ID for a color
    function getArrowheadId(color) {
      switch (color) {
        case "#16a34a":
          return "arrowhead-green";
        case "#dc2626":
          return "arrowhead-red";
        case "#8b5cf6":
          return "arrowhead-purple";
        case "#2563eb":
          return "arrowhead-blue";
        case "#ff9500":
          return "arrowhead-orange";
        default:
          return "arrowhead-gray";
      }
    }

    // Calculate arrow color based on connection type
    function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
      var color = "#666"; // Default gray

      // Check if it's a ring-specific connection
      if (fromRing !== 'middle' || toRing !== 'middle') {
        // Ring-specific connections get special colors
        if (fromRing === 'inner' && toRing === 'inner' || fromRing === 'outer' && toRing === 'outer' || fromRing === 'invisible' && toRing === 'invisible') {
          color = "#16a34a"; // Green for same polarity (+ to + or - to - or i to i)
        } else if (fromRing === 'inner' && toRing === 'outer' || fromRing === 'outer' && toRing === 'inner') {
          color = "#dc2626"; // Red for opposite polarity (+ to - or - to +)
        } else if (fromRing === 'invisible' || toRing === 'invisible') {
          color = "#ff9500"; // Orange for invisible ring connections
        } else {
          color = "#8b5cf6"; // Purple for mixed connections (statement to +/-)
        }
      } else {
        // Statement-level connections
        var fromIsThesis = isThesisType(fromUnitId);
        var toIsThesis = isThesisType(toUnitId);
        if (fromIsThesis === toIsThesis) {
          color = "#2563eb"; // Blue for same type (thesis-thesis or antithesis-antithesis)
        } else {
          color = "#dc2626"; // Red for opposition (thesis-antithesis)
        }
      }
      return color;
    }

    // Calculate shortened arrow positions to avoid overlap with cells
    function calculateArrowPath(fromPos, toPos) {
      var shortenBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var curvature = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var dx = toPos.x - fromPos.x;
      var dy = toPos.y - fromPos.y;
      var distance = Math.sqrt(dx * dx + dy * dy) || 1;

      // Compute effective circular radii for source/target cells based on their annular sector geometry
      function computeEffectiveRadius(pos) {
        // Prefer exact label rectangle when available
        if (pos && pos.labelWidth != null && pos.labelHeight != null && pos.labelRotationRadians != null) {
          // Project segment from center to label rectangle edge in the direction of the link
          // Use the rectangle's half extents in its local coordinates, rotated into world
          // We supply world-space direction later; here, just return diagonal-based radius; edge projection is handled below
          var radiusDiag = Math.sqrt(Math.pow(pos.labelWidth / 2, 2) + Math.pow(pos.labelHeight / 2, 2));
          return Math.max(shortenBy, radiusDiag);
        }
        if (!pos || pos.thickness == null || pos.angleSpan == null || pos.rCentroid == null) {
          if (pos && pos.labelRadius != null) return Math.max(shortenBy, pos.labelRadius);
          return shortenBy;
        }
        var halfRadial = pos.thickness / 2;
        var halfArcLength = pos.angleSpan * pos.rCentroid / 2;
        var radius = Math.sqrt(halfRadial * halfRadial + halfArcLength * halfArcLength);
        return Math.max(shortenBy, radius * 0.6);
      }
      var sourceOffset = computeEffectiveRadius(fromPos) + 4;
      var targetOffset = computeEffectiveRadius(toPos) + 4;

      // If offsets are too large for the available distance, scale them down proportionally
      var totalOffset = sourceOffset + targetOffset;
      if (totalOffset > distance - 6) {
        var scale = Math.max(0, (distance - 6) / totalOffset);
        sourceOffset *= scale;
        targetOffset *= scale;
      }

      // Helper: project to label rectangle edge if label geometry exists
      function projectToLabelEdge(pos, dirSign) {
        // dirSign = +1 for source (move forward), -1 for target (move backward)
        if (!(pos && pos.labelWidth != null && pos.labelHeight != null && pos.labelRotationRadians != null)) {
          return {
            x: pos.x + dx / distance * (dirSign * (dirSign > 0 ? sourceOffset : -targetOffset)),
            y: pos.y + dy / distance * (dirSign * (dirSign > 0 ? sourceOffset : -targetOffset))
          };
        }
        var ux = dx / distance;
        var uy = dy / distance;
        var dirx = dirSign > 0 ? ux : -ux;
        var diry = dirSign > 0 ? uy : -uy;

        // Rotate direction into label's local space
        var cosA = Math.cos(pos.labelRotationRadians);
        var sinA = Math.sin(pos.labelRotationRadians);
        var localDx = dirx * cosA + diry * sinA;
        var localDy = -dirx * sinA + diry * cosA;
        var hx = pos.labelWidth / 2;
        var hy = pos.labelHeight / 2;

        // Distances to each side along the ray in local coords
        var tx = localDx !== 0 ? hx / Math.abs(localDx) : Infinity;
        var ty = localDy !== 0 ? hy / Math.abs(localDy) : Infinity;
        var tEdge = Math.min(tx, ty);

        // Edge point in local coords
        var exLocal = localDx * tEdge;
        var eyLocal = localDy * tEdge;

        // Rotate back to world
        var exWorld = exLocal * cosA - eyLocal * sinA;
        var eyWorld = exLocal * sinA + eyLocal * cosA;
        return {
          x: pos.x + exWorld,
          y: pos.y + eyWorld
        };
      }

      // Shorten the arrow to start/end exactly at label rectangle edges when possible
      var fromShortened = projectToLabelEdge(fromPos, 1);
      var toShortened = projectToLabelEdge(toPos, -1);

      // Create curved path for better visibility (dampen curvature for short links)
      var midX = (fromShortened.x + toShortened.x) / 2;
      var midY = (fromShortened.y + toShortened.y) / 2;

      // Recompute based on shortened endpoints
      var dx2 = toShortened.x - fromShortened.x;
      var dy2 = toShortened.y - fromShortened.y;
      var remainingDistance = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;

      // Perpendicular of the shortened segment
      var perpX = -dy2 / remainingDistance;
      var perpY = dx2 / remainingDistance;

      // Simplified curvature: linear with distance, clamped by a cap.
      // If a curvature override is passed, use it directly.
      var CURVE_FACTOR = 0.3;
      var CURVE_CAP = 120;
      var effectiveCurvature = curvature != null ? curvature : Math.min(remainingDistance * CURVE_FACTOR, CURVE_CAP);
      var controlX = midX - perpX * effectiveCurvature;
      var controlY = midY - perpY * effectiveCurvature;
      return {
        path: "M ".concat(fromShortened.x, " ").concat(fromShortened.y, " Q ").concat(controlX, " ").concat(controlY, " ").concat(toShortened.x, " ").concat(toShortened.y),
        start: fromShortened,
        control: {
          x: controlX,
          y: controlY
        },
        end: toShortened
      };
    }
    return {
      getPointAlongQuadraticCurve: getPointAlongQuadraticCurve,
      createArrowheadMarker: createArrowheadMarker,
      getArrowheadId: getArrowheadId,
      calculateArrowColor: calculateArrowColor,
      calculateArrowPath: calculateArrowPath
    };
  }();
}
function _getPointAlongQuadraticCurve(arrowUtilities) {
  return arrowUtilities.getPointAlongQuadraticCurve;
}
function _initializeBuildSteps(getOppositePrefix, isThesisType) {
  return function (dialecticalData) {
    var buildSteps = [];

    // Dynamically generate build sequence based on dialecticalData
    var units = Object.keys(dialecticalData);

    // Create pairs by iterating through first half of units and finding their opposites
    var buildSequence = [];
    var processedUnits = new Set();
    units.forEach(function (unitId) {
      // Skip if we've already processed this unit as part of a pair
      if (processedUnits.has(unitId)) return;

      // Find the opposite unit
      var oppositeUnitId = getOppositePrefix(unitId);

      // Only proceed if the opposite exists in our data
      if (units.includes(oppositeUnitId)) {
        // Determine which is thesis/antithesis for consistent ordering
        var isThesis = isThesisType(unitId);
        var thesis = isThesis ? unitId : oppositeUnitId;
        var antithesis = isThesis ? oppositeUnitId : unitId;
        buildSequence.push([thesis, antithesis]);

        // Mark both units as processed
        processedUnits.add(unitId);
        processedUnits.add(oppositeUnitId);
      }
    });
    buildSequence.forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        thesis = _ref6[0],
        antithesis = _ref6[1];
      // Show thesis (T)
      buildSteps.push({
        type: 'showWhite',
        unitId: thesis,
        description: "Show ".concat(thesis, " (").concat(dialecticalData[thesis].statement.substring(0, 30), "...)")
      });
      buildSteps.push({
        type: 'showGreen',
        unitId: thesis,
        description: "Show ".concat(thesis, " + (").concat(dialecticalData[thesis].positive.substring(0, 30), "...)")
      });
      buildSteps.push({
        type: 'showRed',
        unitId: thesis,
        description: "Show ".concat(thesis, " - (").concat(dialecticalData[thesis].negative.substring(0, 30), "...)")
      });

      // Show antithesis (A)
      buildSteps.push({
        type: 'showWhite',
        unitId: antithesis,
        description: "Show ".concat(antithesis, " (").concat(dialecticalData[antithesis].statement.substring(0, 30), "...)")
      });
      buildSteps.push({
        type: 'showGreen',
        unitId: antithesis,
        description: "Show ".concat(antithesis, " + (").concat(dialecticalData[antithesis].positive.substring(0, 30), "...)")
      });
      buildSteps.push({
        type: 'showRed',
        unitId: antithesis,
        description: "Show ".concat(antithesis, " - (").concat(dialecticalData[antithesis].negative.substring(0, 30), "...)")
      });
    });
    return buildSteps;
  };
}
function _longPressUtilities(d3) {
  return function () {
    // Long press configuration
    var LONG_PRESS_DURATION = 500; // 500ms for long press
    var LONG_PRESS_MOVE_THRESHOLD = 10; // pixels - cancel if finger moves more than this

    // Helper function to detect if device supports touch
    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Create a long press handler factory
    function createLongPressHandler(zoomToCell) {
      // Long press state variables
      var longPressTimer = null;
      var longPressTarget = null;
      var longPressData = null;
      var longPressStartPos = null;
      var isLongPressing = false;

      // Start long press detection
      function startLongPress(element, event, data) {
        // Only on touch devices - reference the outer function
        if (!isTouchDevice()) {
          console.log('startLongPress called but not a touch device');
          return;
        }
        console.log('Starting long press timer for:', data.data.unitId);

        // Clear any existing timer
        clearLongPress();
        longPressTarget = element;
        longPressData = data;
        isLongPressing = false;

        // Store initial touch position for movement tracking
        if (event.touches && event.touches.length > 0) {
          longPressStartPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
          };
        }

        // Add visual feedback - subtle highlight
        d3.select(element).style("stroke", "#ff6b35").style("stroke-width", "3px").style("opacity", "0.8");

        // Set timer for long press
        longPressTimer = setTimeout(function () {
          if (longPressTarget && longPressData) {
            console.log('Long press triggered for:', longPressData.data.unitId);
            isLongPressing = true;

            // Stronger visual feedback for successful long press
            d3.select(longPressTarget).style("stroke", "#ff3300").style("stroke-width", "4px").transition().duration(150).style("transform", "scale(1.05)").on("end", function () {
              // Trigger zoom after visual feedback
              var mockEvent = {
                stopPropagation: function stopPropagation() {},
                metaKey: true,
                // Simulate cmd+click for zoom
                currentTarget: longPressTarget
              };
              zoomToCell(mockEvent, longPressData);

              // Reset visual state
              d3.select(longPressTarget).style("transform", null).style("stroke", null).style("stroke-width", null).style("opacity", null);
            });
          }
        }, LONG_PRESS_DURATION);
      }

      // Clear long press detection
      function clearLongPress() {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
        if (longPressTarget && !isLongPressing) {
          // Reset visual feedback if long press was cancelled
          d3.select(longPressTarget).style("stroke", null).style("stroke-width", null).style("opacity", null);
        }
        longPressTarget = null;
        longPressData = null;
        longPressStartPos = null;
        isLongPressing = false;
      }

      // Check if touch movement should cancel long press
      function checkTouchMovement(event) {
        if (longPressStartPos && event.touches && event.touches.length > 0) {
          var currentPos = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
          };
          var distance = Math.sqrt(Math.pow(currentPos.x - longPressStartPos.x, 2) + Math.pow(currentPos.y - longPressStartPos.y, 2));

          // Return true if movement exceeds threshold (should cancel)
          return distance > LONG_PRESS_MOVE_THRESHOLD;
        }
        return true; // Cancel if no proper touch data
      }
      return {
        startLongPress: startLongPress,
        clearLongPress: clearLongPress,
        checkTouchMovement: checkTouchMovement,
        isTouchDevice: isTouchDevice,
        get isLongPressing() {
          return isLongPressing;
        },
        set isLongPressing(value) {
          isLongPressing = value;
        }
      };
    }
    return {
      createLongPressHandler: createLongPressHandler,
      isTouchDevice: isTouchDevice,
      LONG_PRESS_DURATION: LONG_PRESS_DURATION,
      LONG_PRESS_MOVE_THRESHOLD: LONG_PRESS_MOVE_THRESHOLD
    };
  }();
}
function _selectedFont(Inputs) {
  return Inputs.select(["Source Serif Pro", "Source Sans Pro", "Alegreya", "Inter", "Lato", "Laila", "Merriweather", "PT Serif", "Roboto Slab", "Rubik", "Crimson Text", "Cascadia Mono", "Ubuntu Mono", "Arial"], {
    label: "Desired font",
    // options:,
    value: "Arial"
  });
}
function _parseFont(selectedFont) {
  return selectedFont.split(" ").join("+");
}
function _style(html, parseFont, selectedFont) {
  return html(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=", ":ital@0;1&display=swap\">\n\n    <style>\n      body, svg {\n            font-family: ", ", sans-serif;\n            /* font-size: 48px; */\n     }\n    </style>\n    "])), parseFont, selectedFont);
}
function _fontCDN(parseFont) {
  return "https://fonts.googleapis.com/css2?family=".concat(parseFont, ":ital@0;1&display=swap");
}
function _serialize(NodeFilter) {
  var xmlns = "http://www.w3.org/2000/xmlns/";
  var xlinkns = "http://www.w3.org/1999/xlink";
  var svgns = "http://www.w3.org/2000/svg";
  return function serialize(svg) {
    svg = svg.cloneNode(true);
    var fragment = window.location.href + "#";
    var walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      var _iterator3 = _createForOfIteratorHelper(walker.currentNode.attributes),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var attr = _step3.value;
          if (attr.value.includes(fragment)) {
            attr.value = attr.value.replace(fragment, "#");
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    var serializer = new window.XMLSerializer();
    var string = serializer.serializeToString(svg);
    return new Blob([string], {
      type: "image/svg+xml"
    });
  };
}
function _rasterize(DOM, serialize) {
  return function rasterize(svg) {
    var resolve, reject;
    var promise = new Promise(function (y, n) {
      return resolve = y, reject = n;
    });
    var image = new Image();
    image.onerror = reject;
    image.onload = function () {
      var rect = svg.getBoundingClientRect();
      var context = DOM.context2d(rect.width, rect.height);
      context.drawImage(image, 0, 0, rect.width, rect.height);
      context.canvas.toBlob(resolve);
    };
    image.src = URL.createObjectURL(serialize(svg));
    return promise;
  };
}
function _7(DOM, rasterize, viewof_chart) {
  return DOM.download(function () {
    return rasterize(viewof_chart);
  }, undefined, "Save as PNG");
}
function _fontsize(Inputs) {
  return Inputs.range([8, 30], {
    value: 20,
    step: 1,
    label: "Font Size"
  });
}
function _rotationAngle(Inputs) {
  return Inputs.range([-180, 180], {
    value: 0,
    step: 1,
    label: "Rotation"
  });
}
function _8(rotationAngle) {
  // effect: apply rotation without restarting simulation
  var apply = function apply() {
    var root = document.querySelector('svg .graph-rotate');
    if (!root) return;
    root.setAttribute('transform', "rotate(".concat(rotationAngle, ")"));
    root.querySelectorAll('text').forEach(function (t) {
      return t.setAttribute('transform', "rotate(".concat(-rotationAngle, ")"));
    });
  };
  apply();
}
function _graph(componentOrder, styles, flowSuits, contraSuits, d3, location, drag, fontsize, selectedFont, invalidation) {
  var width = styles.width;
  var height = styles.height;
  // Build link datasets from both flow and contra connections
  var flowLinksData = flowSuits.map(function (d) {
    return Object.assign({}, d, {
      isContra: false
    });
  });
  var contraLinksData = contraSuits.map(function (d) {
    return Object.assign({}, d, {
      isContra: true
    });
  });
  var allLinksData = [].concat(_toConsumableArray(flowLinksData), _toConsumableArray(contraLinksData));
  var types = Array.from(new Set(allLinksData.map(function (d) {
    return d.type;
  })));
  var nodes = Array.from(new Set(allLinksData.flatMap(function (l) {
    return [l.source, l.target];
  })), function (id) {
    return {
      id: id
    };
  });
  var nodeById = new Map(nodes.map(function (d) {
    return [d.id, d];
  }));
  var color = d3.scaleOrdinal(types, d3.schemeCategory10);
  var simulation = d3.forceSimulation(nodes)
  // Only use the flow links to shape the layout so the initial circle is preserved
  .force("link", d3.forceLink(flowLinksData).id(function (d) {
    return d.id;
  }).distance(100)).force("charge", d3.forceManyBody().strength(-800)).force("x", d3.forceX()).force("y", d3.forceY());
  var svg = d3.create("svg").attr("viewBox", [-width / 2, -height / 2, width, height]).attr("width", width).attr("height", height).attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

  // Per-type markers
  svg.append("defs").selectAll("marker").data(types).join("marker").attr("id", function (d) {
    return "arrow-".concat(d);
  }).attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("refY", 0).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto-start-reverse").append("path").attr("fill", color).attr("d", "M0,-5L10,0L0,5");

  // Container to rotate the entire graph while keeping text upright
  var g = svg.append("g").attr("class", "graph-rotate").attr("transform", "rotate(0)");

  // Map link endpoints to node objects for rendering so linkArc can read x/y
  var renderLinksData = allLinksData.map(function (l) {
    var sourceId = typeof l.source === 'string' ? l.source : l.source.id;
    var targetId = typeof l.target === 'string' ? l.target : l.target.id;
    return _objectSpread2(_objectSpread2({}, l), {}, {
      source: nodeById.get(sourceId),
      target: nodeById.get(targetId)
    });
  });
  var link = g.append("g").attr("fill", "none").attr("stroke-width", 1.5).selectAll("path")
  // Render all links (flow + contra), but they won't affect the layout
  .data(renderLinksData).join("path").attr("stroke", function (d) {
    return d.isContra ? "#d62728" : color(d.type);
  }).attr("stroke-dasharray", function (d) {
    return d.isContra ? "4,2" : null;
  }).attr("stroke-width", function (d) {
    return d.isContra ? 2 : 1.5;
  }).attr("marker-start", function (d) {
    return d.isContra ? "url(".concat(new URL("#arrow-".concat(d.type), location), ")") : null;
  }).attr("marker-end", function (d) {
    return "url(".concat(new URL("#arrow-".concat(d.type), location), ")");
  });
  var node = g.append("g").attr("fill", "currentColor").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").selectAll("g").data(nodes).join("g").call(drag(simulation));

  // Function to wrap text and return dimensions
  function wrapText(textElement, text) {
    var maxWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 120;
    text.split(/\s+/);
    var lineHeight = 1.2; // em

    textElement.selectAll("tspan").remove(); // Clear existing tspans

    // For very small widths, just split by character
    if (maxWidth <= 10) {
      var chars = text.split('');
      textElement.selectAll("tspan").data(chars).join("tspan").attr("x", 0).attr("dy", function (d, i) {
        return i === 0 ? "".concat(-((chars.length - 1) * lineHeight * 0.5), "em") : "".concat(lineHeight, "em");
      }).attr("text-anchor", "middle").text(function (d) {
        return d;
      });
      var _bbox = textElement.node().getBBox();
      return {
        width: _bbox.width,
        height: _bbox.height,
        lineCount: chars.length
      };
    }

    // Estimate character width (rough approximation: 0.6 * font-size for average character)
    var avgCharWidth = fontsize * 0.6; // 20px font size
    var maxCharsPerLine = Math.max(1, Math.floor(maxWidth / avgCharWidth));

    // If there's a colon, color the prefix (before the colon) differently
    var colonIndex = text.indexOf(":");
    var hasPrefix = colonIndex >= 0;
    var prefixText = hasPrefix ? text.slice(0, colonIndex + 1) : "";
    var bodyText = hasPrefix ? text.slice(colonIndex + 1).trimStart() : text;
    var lines = [];
    var currentLine = "";
    var bodyWords = bodyText.split(/\s+/);
    for (var i = 0; i < bodyWords.length; i++) {
      var word = bodyWords[i];
      var testLine = currentLine + (currentLine ? " " : "") + word;

      // Simple character count based wrapping
      if (testLine.length > maxCharsPerLine && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    // If still no wrapping happened, force it by character count
    if (lines.length === 1 && bodyText.length > maxCharsPerLine) {
      lines.length = 0;
      for (var _i4 = 0; _i4 < bodyText.length; _i4 += maxCharsPerLine) {
        lines.push(bodyText.slice(_i4, _i4 + maxCharsPerLine));
      }
    }
    var totalLines = Math.max(1, lines.length);

    // Build tspans. If we have a prefix, put it on the first line with a different color.
    if (hasPrefix) {
      // Choose color based on prefix initial
      var initial = prefixText.trim()[0];
      var prefixColor = "#2563eb"; // default blue
      if (initial === 'A') prefixColor = "#dc2626"; // red

      // First line baseline shift
      textElement.append("tspan").attr("x", 0).attr("dy", "".concat(-((totalLines - 1) * lineHeight * 0.5), "em")).attr("text-anchor", "middle").attr("fill", prefixColor).text(prefixText + (lines[0] ? " " : ""));
      if (lines.length > 0) {
        textElement.append("tspan").attr("text-anchor", "middle").text(lines[0]);
      }
      for (var _i5 = 1; _i5 < lines.length; _i5++) {
        textElement.append("tspan").attr("x", 0).attr("dy", "".concat(lineHeight, "em")).attr("text-anchor", "middle").text(lines[_i5]);
      }
    } else {
      // No prefix; regular multi-line tspans
      textElement.selectAll("tspan").data(lines).join("tspan").attr("x", 0).attr("dy", function (d, i) {
        return i === 0 ? "".concat(-((lines.length - 1) * lineHeight * 0.5), "em") : "".concat(lineHeight, "em");
      }).attr("text-anchor", "middle").text(function (d) {
        return d;
      });
    }

    // Calculate actual dimensions
    var bbox = textElement.node().getBBox();
    return {
      width: bbox.width,
      height: bbox.height,
      lineCount: totalLines
    };
  }

  // Create text nodes with wrapping
  node.append("text").attr("font-size", "".concat(fontsize, "px")).attr("font-family", selectedFont).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("cursor", "grab").attr("fill", "black").attr("stroke", "white").attr("stroke-width", 3).attr("paint-order", "stroke").attr("transform", "rotate(0)");

  // Hover behavior: scale entire node and perturb simulation
  var HOVER_SCALE = 1.5;
  function effectiveRadius(n) {
    return n.radius * (n.scale || 1);
  }
  node.on("mouseenter", function (event, d) {
    var start = d.scale || 1;
    var end = HOVER_SCALE;
    simulation.force("collide").radius(function (n) {
      return effectiveRadius(n);
    });
    simulation.alphaTarget(0.25).restart();
    d3.select(this).transition().duration(180).ease(d3.easeCubicOut).tween("scale", function () {
      var i = d3.interpolateNumber(start, end);
      return function (t) {
        d.scale = i(t);
      };
    });
  }).on("mouseleave", function (event, d) {
    var start = d.scale || 1;
    var end = 1;
    simulation.force("collide").radius(function (n) {
      return effectiveRadius(n);
    });
    d3.select(this).transition().duration(180).ease(d3.easeCubicOut).tween("scale", function () {
      var i = d3.interpolateNumber(start, end);
      return function (t) {
        d.scale = i(t);
      };
    }).on("end", function () {
      if (!event.active) simulation.alphaTarget(0);
    });
  });

  // Calculate node dimensions after text wrapping
  node.each(function (d) {
    var textElement = d3.select(this.querySelector('text'));
    var textDimensions = wrapText(textElement, d.id, 120); // Back to reasonable width

    var padding = 10; // Reduced padding since we're using actual text bounds

    // Store actual text dimensions for edge calculations
    d.textWidth = textDimensions.width;
    d.textHeight = textDimensions.height;

    // Make collision radius large enough to fully contain the text with padding
    // Use the diagonal of the text bounding box plus padding for circular collision
    d.radius = Math.sqrt(Math.pow(d.textWidth + padding * 2, 2) + Math.pow(d.textHeight + padding * 2, 2)) / 2;

    // Store rectangular bounds for more precise edge calculations
    d.width = d.textWidth + padding * 2;
    d.height = d.textHeight + padding * 2;
  });

  // Add collision detection after dimensions are calculated
  simulation.force("collide", d3.forceCollide().radius(function (d) {
    return effectiveRadius(d);
  }).strength(1.0).iterations(3)).force("charge", d3.forceManyBody().strength(-2e3)).alpha(1).restart();

  // Function to calculate link path using circular collision radius
  function linkArc(d) {
    var dx = d.target.x - d.source.x;
    var dy = d.target.y - d.source.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return "M0,0L0,0";

    // Use collision radius directly for both source and target
    var buffer = 5; // Small buffer so arrows don't touch the collision boundary
    var sourceEdgeDistance = effectiveRadius(d.source) * 4 + buffer;
    var targetEdgeDistance = effectiveRadius(d.target) * 4 + buffer;
    var startX = d.source.x + dx / distance * sourceEdgeDistance;
    var startY = d.source.y + dy / distance * sourceEdgeDistance;
    var endX = d.target.x - dx / distance * targetEdgeDistance;
    var endY = d.target.y - dy / distance * targetEdgeDistance;

    // Create slight curve for better visibility of multiple links
    var dr = distance * 1;
    return "M".concat(startX, ",").concat(startY, "A").concat(dr, ",").concat(dr, " 0 0,1 ").concat(endX, ",").concat(endY);
  }
  simulation.on("tick", function () {
    link.attr("d", linkArc);
    node.attr("transform", function (d) {
      return "translate(".concat(d.x, ",").concat(d.y, ") scale(").concat(d.scale || 1, ")");
    });
  });
  invalidation.then(function () {
    return simulation.stop();
  });
  return Object.assign(svg.node(), {
    scales: {
      color: color
    }
  });
}
function _drag(d3) {
  return function (simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
  };
}
function _flowSuits(parseArrowConnectionsAsSourceTarget, flowConnections, dialecticalData) {
  return parseArrowConnectionsAsSourceTarget(flowConnections, dialecticalData);
}
function _contraSuits(parseArrowConnectionsAsSourceTarget, contraConnections, dialecticalData) {
  return parseArrowConnectionsAsSourceTarget(contraConnections, dialecticalData);
}
function _suits(flowSuits, contraSuits) {
  return [].concat(_toConsumableArray(flowSuits), _toConsumableArray(contraSuits));
}
function _getOppositePrefix(dialecticalData) {
  return function getOppositePrefix(unitId) {
    var unit = dialecticalData && dialecticalData[unitId];
    if (unit && unit.pairWith) return unit.pairWith;
    return unitId; // fallback when pair not found
  };
}
function _getUnitType() {
  return function getUnitType(unitId) {
    if (unitId.startsWith('T') || unitId.startsWith('Re')) return 'thesis';
    if (unitId.startsWith('A') || unitId.startsWith('Ac')) return 'antithesis';
    return 'unknown'; // fallback for unknown prefixes
  };
}
function _isThesisType() {
  return function isThesisType(unitId) {
    return unitId.startsWith('T') || unitId.startsWith('Re');
  };
}
function _isAntithesisType() {
  return function isAntithesisType(unitId) {
    return unitId.startsWith('A') || unitId.startsWith('Ac');
  };
}
function _wisdomUnits() {
  return [{
    "t_minus": {
      "alias": "T-",
      "statement": "Risk group lives",
      "explanation": "Identified as negative risks in thesis context."
    },
    "t": {
      "alias": "T",
      "statement": "Pursue minister elimination",
      "explanation": "Derived from the original plan outlined in the context."
    },
    "t_plus": {
      "alias": "T+",
      "statement": "Achieve strategic goals",
      "explanation": "Derived from positive aspects of thesis pursuit."
    },
    "a_plus": {
      "alias": "A+",
      "statement": "Ensure survival peacefully",
      "explanation": "Positive aspect constructed to oppose thesis negative."
    },
    "a": {
      "alias": "A",
      "statement": "Accept ransom offer",
      "explanation": "Antithesis derived from opposing choice in scenario."
    },
    "a_minus": {
      "alias": "A-",
      "statement": "Compromise core ideals",
      "explanation": "Negative aspect formed to oppose thesis positive."
    }
  }, {
    "t_minus": {
      "alias": "A4-",
      "statement": "Jeopardize safety",
      "explanation": "Identified as negative aspect of A."
    },
    "t": {
      "alias": "A4",
      "statement": "Pursue mission goals",
      "explanation": "Derived as antithesis of T."
    },
    "t_plus": {
      "alias": "A4+",
      "statement": "Understanding",
      "explanation": "Identified as positive aspect of A."
    },
    "a_plus": {
      "alias": "T4+",
      "statement": "Promote survival",
      "explanation": "Identified as positive aspect of T."
    },
    "a": {
      "alias": "T4",
      "statement": "Ensure group safety",
      "explanation": "Inferred from the choice presented for living."
    },
    "a_minus": {
      "alias": "T4-",
      "statement": "Foster cowardice",
      "explanation": "Identified as negative aspect of T."
    }
  }, {
    "t_minus": {
      "alias": "T2-",
      "statement": "Endanger lives",
      "explanation": "Derived by noting risks of engagement."
    },
    "t": {
      "alias": "T2",
      "statement": "Face soldier threat",
      "explanation": "Extracted from the warning issued by Bouteflika."
    },
    "t_plus": {
      "alias": "T2+",
      "statement": "Maintain integrity",
      "explanation": "Derived by identifying positive aspect of confrontation."
    },
    "a_plus": {
      "alias": "A2+",
      "statement": "Betrayal",
      "explanation": "Derived as constructive side of alternative."
    },
    "a": {
      "alias": "A2",
      "statement": "Take ransom deal",
      "explanation": "Identified as opposing action."
    },
    "a_minus": {
      "alias": "A2-",
      "statement": "Compromise principles",
      "explanation": "Derived as negative side of acceptance."
    }
  }, {
    "t_minus": {
      "alias": "T3-",
      "statement": "Betray allies mission",
      "explanation": "Extracted as the negative aspect from the context's implications of failing allies."
    },
    "t": {
      "alias": "T3",
      "statement": "Take twenty million",
      "explanation": "Identified from the offered alternative in the narrative."
    },
    "t_plus": {
      "alias": "T3+",
      "statement": "Gain safety wealth",
      "explanation": "Derived as the positive aspect by analyzing the benefits of acceptance."
    },
    "a_plus": {
      "alias": "A3+",
      "statement": "Uphold loyalty honor",
      "explanation": "Determined as the positive side that contradicts the negative aspect of the thesis."
    },
    "a": {
      "alias": "A3",
      "statement": "Refuse twenty million",
      "explanation": "Formulated as the antithesis opposing the primary thesis."
    },
    "a_minus": {
      "alias": "A3-",
      "statement": "Risk death failure",
      "explanation": "Ascertained as the negative side that contradicts the positive aspect of the thesis."
    }
  }];
}
function _componentOrder() {
  return [];
}
function _extractStatement() {
  return function (value) {
    if (typeof value === 'string') return value;
    if (_typeof(value) === 'object' && value !== null) {
      return value.statement || value.alias || '';
    }
    return '';
  };
}
function _transformWisdomUnitsToDialecticalData(extractStatement) {
  return function (wisdomUnits, componentOrder) {
    var TOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var AOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (!wisdomUnits || wisdomUnits.length === 0) {
      return {};
    }
    var diabolicalData = {};
    if (!AOnly) {
      wisdomUnits.forEach(function (unit, index) {
        var thesisKey = unit.t.alias || "T".concat(index + 1);
        diabolicalData[thesisKey] = {
          statement: extractStatement(unit.t),
          positive: extractStatement(unit.t_plus),
          negative: extractStatement(unit.t_minus),
          pairWith: unit.a.alias || "A".concat(index + 1),
          pairId: "".concat(unit.t.alias + "_" + unit.a.alias || "T".concat(index + 1, "_A").concat(index + 1))
        };
      });
    }
    if (!TOnly) {
      wisdomUnits.forEach(function (unit, index) {
        var antithesisKey = unit.a.alias || "A".concat(index + 1);
        diabolicalData[antithesisKey] = {
          statement: extractStatement(unit.a),
          positive: extractStatement(unit.a_plus),
          negative: extractStatement(unit.a_minus),
          pairWith: unit.t.alias || "T".concat(index + 1),
          pairId: "".concat(unit.t.alias + "_" + unit.a.alias || "T".concat(index + 1, "_A").concat(index + 1))
        };
      });
    }
    if (!componentOrder || componentOrder.length === 0) {
      return diabolicalData;
    }
    var dialecticalDataOrdered = {};
    componentOrder.forEach(function (component) {
      var key = component;
      dialecticalDataOrdered[key] = diabolicalData[key];
    });
    return dialecticalDataOrdered;
  };
}
function _mermaid_graph(mermaid) {
  return mermaid(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["graph TD\n      W[\"wisdomUnits\"] --> T[\"transformWisdomUnitsToDialecticalData\"]\n      C[\"componentOrder\"] --> T\n      T --> D[\"dialecticalData (Object)\"]\n      D --> FC[\"flowConnections\"]\n      D --> CC[\"contraConnections\"]\n      FC --> P[\"parseArrowConnectionsAsSourceTarget\"]\n      CC --> P\n      D --> P\n      P --> FS[\"flowSuits\"]\n      P --> CS[\"contraSuits\"]\n      FS --> G[\"graph\"]\n      CS --> G\n      FZ[\"fontsize\" ] --> G\n      SF[\"selectedFont\" ] --> G\n      STY[\"styles\" ] --> G\n      D3[\"d3/drag\" ] --> G\n\n      classDef note fill:#fff,stroke:#999,color:#333;\n      N1[\"nodes = Array.from(new Set(links.flatMap(s,t=>[s,t])))\n=> comes from links order, not D's key order\"]:::note\n      FS --> N1\n      CS --> N1"], ["graph TD\n      W[\"wisdomUnits\"] --> T[\"transformWisdomUnitsToDialecticalData\"]\n      C[\"componentOrder\"] --> T\n      T --> D[\"dialecticalData (Object)\"]\n      D --> FC[\"flowConnections\"]\n      D --> CC[\"contraConnections\"]\n      FC --> P[\"parseArrowConnectionsAsSourceTarget\"]\n      CC --> P\n      D --> P\n      P --> FS[\"flowSuits\"]\n      P --> CS[\"contraSuits\"]\n      FS --> G[\"graph\"]\n      CS --> G\n      FZ[\"fontsize\" ] --> G\n      SF[\"selectedFont\" ] --> G\n      STY[\"styles\" ] --> G\n      D3[\"d3/drag\" ] --> G\n\n      classDef note fill:#fff,stroke:#999,color:#333;\n      N1[\"nodes = Array.from(new Set(links.flatMap(s,t=>[s,t])))\\n=> comes from links order, not D's key order\"]:::note\n      FS --> N1\n      CS --> N1"])));
}
function _mermaid_graph_from_suits(mermaid) {
  return function (suits) {
    var types = Array.from(new Set(suits.map(function (d) {
      return d.type;
    })));
    var nodes = Array.from(new Set(suits.flatMap(function (d) {
      return [d.source, d.target];
    })));
    var scheme10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
    var colorForType = function colorForType(type) {
      return scheme10[types.indexOf(type) % scheme10.length];
    };
    var parts = [];
    parts.push("graph TD");
    nodes.forEach(function (id) {
      var safeId = String(id).replace(/[^A-Za-z0-9_]/g, "_");
      parts.push("".concat(safeId, "[\"").concat(id, "\"]"));
    });

    // Edges with labels and per-link styling via linkStyle index
    suits.forEach(function (d, i) {
      var s = String(d.source).replace(/[^A-Za-z0-9_]/g, "_");
      var t = String(d.target).replace(/[^A-Za-z0-9_]/g, "_");
      var label = d.type ? "|".concat(d.type, "|") : "";
      parts.push("".concat(s, " -->").concat(label, " ").concat(t));
      var color = colorForType(d.type || "default");
      parts.push("linkStyle ".concat(i, " stroke:").concat(color, ",stroke-width:2px,opacity:0.85"));
    });
    var def = parts.join("\n");
    return mermaid(_templateObject1 || (_templateObject1 = _taggedTemplateLiteral(["", ""])), def);
  };
}
function define(runtime, observer) {
  var main = runtime.module();
  var fileAttachments = new Map([]);
  main.builtin("FileAttachment", runtime.fileAttachments(function (name) {
    return fileAttachments.get(name);
  }));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("getRingOrder")).define("getRingOrder", ["isWhiteOutside"], _getRingOrder);
  main.variable(observer("getRadiiForSemantic")).define("getRadiiForSemantic", ["getRingOrder"], _getRadiiForSemantic);
  main.variable(observer("makeRings")).define("makeRings", ["arcTween", "getRingOrder", "userTextColors", "d3", "getRadiiForSemantic"], _makeRings);
  main.variable(observer("dialecticalData")).define("dialecticalData", ["transformWisdomUnitsToDialecticalData", "wisdomUnits", "componentOrder", "TsOnly", "AsOnly"], _dialecticalData);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("styles")).define("styles", ["userHubColor", "ringColors", "textColors"], _styles);
  main.variable(observer("arrowControls")).define("arrowControls", ["html", "parseArrowConnections", "arrowConnections", "dialecticalData", "viewof chart", "isThesisType", "arrowUtilities", "d3"], _arrowControls);
  main.variable(observer()).define(["unFocus", "viewof chart"], _2);
  main.variable(observer("viewof unFocus")).define("viewof unFocus", ["Inputs"], _unFocus);
  main.define("unFocus", ["Generators", "viewof unFocus"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof showFlow")).define("viewof showFlow", ["Inputs"], _showFlow);
  main.define("showFlow", ["Generators", "viewof showFlow"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("showFlowSubscription")).define("showFlowSubscription", ["Generators", "viewof showFlow", "viewof chart", "invalidation"], _showFlowSubscription);
  main.variable(observer("viewof isWhiteOutside")).define("viewof isWhiteOutside", ["Inputs"], _isWhiteOutside);
  main.define("isWhiteOutside", ["Generators", "viewof isWhiteOutside"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("userRingColors")).define("userRingColors", _userRingColors);
  main.variable(observer("userTextColors")).define("userTextColors", _userTextColors);
  main.variable(observer("userHubColor")).define("userHubColor", _userHubColor);
  main.variable(observer("ringColors")).define("ringColors", ["getRingOrder", "userRingColors"], _ringColors);
  main.variable(observer("textColors")).define("textColors", ["userTextColors"], _textColors);
  main.variable(observer("viewof whitesOnly")).define("viewof whitesOnly", ["Inputs"], _whitesOnly);
  main.define("whitesOnly", ["Generators", "viewof whitesOnly"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof TsOnly")).define("viewof TsOnly", ["Inputs"], _TsOnly);
  main.define("TsOnly", ["Generators", "viewof TsOnly"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof AsOnly")).define("viewof AsOnly", ["Inputs"], _AsOnly);
  main.define("AsOnly", ["Generators", "viewof AsOnly"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer()).define(["DOM", "serialize", "viewof chart"], _3);
  main.variable(observer("getRingRadii")).define("getRingRadii", _getRingRadii);
  main.variable(observer("getPhysicalGroupsForSemantics")).define("getPhysicalGroupsForSemantics", ["getRingOrder"], _getPhysicalGroupsForSemantics);
  main.variable(observer("makeArrowsModule")).define("makeArrowsModule", ["getRadiiForSemantic", "d3", "getRingOrder", "location"], _makeArrowsModule);
  main.variable(observer("radii")).define("radii", ["styles"], _radii);
  main.variable(observer("pie")).define("pie", ["d3"], _pie);
  main.variable(observer("arcs")).define("arcs", ["d3", "radii", "styles"], _arcs);
  main.variable(observer("colorScales")).define("colorScales", ["d3", "dialecticalData", "userRingColors"], _colorScales);
  main.variable(observer("arcTween")).define("arcTween", ["d3"], _arcTween);
  main.variable(observer("makeTextTransform")).define("makeTextTransform", _makeTextTransform);
  main.variable(observer("makeAxisModule")).define("makeAxisModule", ["getRingOrder", "d3"], _makeAxisModule);
  main.variable(observer("makeStepMode")).define("makeStepMode", _makeStepMode);
  main.variable(observer("viewof chart")).define("viewof chart", ["styles", "radii", "d3", "selectedFont", "dialecticalData", "arcs", "makeTextTransform", "pie", "transformToNestedPieData", "getRingOrder", "makeAxisModule", "getOppositePrefix", "colorScales", "getPhysicalGroupsForSemantics", "getRadiiForSemantic", "getTextConstraints", "wrapText", "userTextColors", "isThesisType", "arcTween", "makeRings", "isWhiteOutside", "makeArrowsModule", "arrowUtilities", "parseArrowConnections", "arrowConnections", "arrowOptions", "viewof clickedArrowInfo", "flowConnections", "flowArrowOptions", "makeStepMode", "initializeBuildSteps"], _chart);
  main.define("chart", ["Generators", "viewof chart"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("stepControls")).define("stepControls", ["html", "viewof chart"], _stepControls);
  main.variable(observer("focusedSlice")).define("focusedSlice", ["chart"], _focusedSlice);
  main.variable(observer("viewof arrowOptions")).define("viewof arrowOptions", ["Inputs", "htl"], _arrowOptions);
  main.define("arrowOptions", ["Generators", "viewof arrowOptions"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof flowArrowOptions")).define("viewof flowArrowOptions", ["Inputs", "htl"], _flowArrowOptions);
  main.define("flowArrowOptions", ["Generators", "viewof flowArrowOptions"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof clickedArrowInfo")).define("viewof clickedArrowInfo", ["htl"], _clickedArrowInfo);
  main.define("clickedArrowInfo", ["Generators", "viewof clickedArrowInfo"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer()).define(["chart"], _4);
  main.variable(observer("viewof sliceNumber")).define("viewof sliceNumber", ["Inputs", "viewof chart"], _sliceNumber);
  main.define("sliceNumber", ["Generators", "viewof sliceNumber"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer()).define(["viewof chart", "sliceNumber"], _5);
  main.variable(observer("clickedCellObject")).define("clickedCellObject", ["chart"], _clickedCellObject);
  main.variable(observer("clickedCellText")).define("clickedCellText", ["chart"], _clickedCellText);
  main.variable(observer("topSlice")).define("topSlice", ["chart", "dialecticalData"], _topSlice);
  main.variable(observer("topSliceTracker")).define("topSliceTracker", ["html", "chart", "dialecticalData"], _topSliceTracker);
  main.variable(observer("parseArrowConnections")).define("parseArrowConnections", _parseArrowConnections);
  main.variable(observer("dotScriptEditor")).define("dotScriptEditor", ["html", "dialecticalData", "arrowConnections", "viewof chart", "parseArrowConnections"], _dotScriptEditor);
  main.variable(observer("arrowConnections")).define("arrowConnections", ["dialecticalData"], _arrowConnections);
  main.variable(observer("flowConnections")).define("flowConnections", ["dialecticalData"], _flowConnections);
  main.variable(observer("contraConnections")).define("contraConnections", ["dialecticalData"], _contraConnections);
  main.variable(observer("parseArrowConnectionsAsSourceTarget")).define("parseArrowConnectionsAsSourceTarget", _parseArrowConnectionsAsSourceTarget);
  main.variable(observer()).define(_6);
  main.variable(observer("transformToNestedPieData")).define("transformToNestedPieData", ["whitesOnly"], _transformToNestedPieData);
  main.variable(observer("wrapText")).define("wrapText", ["getRingOrder", "styles", "tryWrapWithLineBreaks", "truncateWithEllipses"], _wrapText);
  main.variable(observer("tryWrapWithLineBreaks")).define("tryWrapWithLineBreaks", _tryWrapWithLineBreaks);
  main.variable(observer("truncateWithEllipses")).define("truncateWithEllipses", _truncateWithEllipses);
  main.variable(observer("getTextConstraints")).define("getTextConstraints", ["getRingOrder", "styles"], _getTextConstraints);
  main.variable(observer("arrowUtilities")).define("arrowUtilities", ["isThesisType"], _arrowUtilities);
  main.variable(observer("getPointAlongQuadraticCurve")).define("getPointAlongQuadraticCurve", ["arrowUtilities"], _getPointAlongQuadraticCurve);
  main.variable(observer("initializeBuildSteps")).define("initializeBuildSteps", ["getOppositePrefix", "isThesisType"], _initializeBuildSteps);
  main.variable(observer("longPressUtilities")).define("longPressUtilities", ["d3"], _longPressUtilities);
  main.variable(observer("viewof selectedFont")).define("viewof selectedFont", ["Inputs"], _selectedFont);
  main.define("selectedFont", ["Generators", "viewof selectedFont"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("parseFont")).define("parseFont", ["selectedFont"], _parseFont);
  main.variable(observer("style")).define("style", ["html", "parseFont", "selectedFont"], _style);
  main.variable(observer("fontCDN")).define("fontCDN", ["parseFont"], _fontCDN);
  main.variable(observer("serialize")).define("serialize", ["NodeFilter"], _serialize);
  main.variable(observer("rasterize")).define("rasterize", ["DOM", "serialize"], _rasterize);
  main.variable(observer()).define(["DOM", "rasterize", "viewof chart"], _7);
  main.variable(observer("viewof fontsize")).define("viewof fontsize", ["Inputs"], _fontsize);
  main.define("fontsize", ["Generators", "viewof fontsize"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer("viewof rotationAngle")).define("viewof rotationAngle", ["Inputs"], _rotationAngle);
  main.define("rotationAngle", ["Generators", "viewof rotationAngle"], function (G, _) {
    return G.input(_);
  });
  main.variable(observer()).define(["rotationAngle"], _8);
  main.variable(observer("graph")).define("graph", ["componentOrder", "styles", "flowSuits", "contraSuits", "d3", "location", "drag", "fontsize", "selectedFont", "invalidation"], _graph);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("flowSuits")).define("flowSuits", ["parseArrowConnectionsAsSourceTarget", "flowConnections", "dialecticalData"], _flowSuits);
  main.variable(observer("contraSuits")).define("contraSuits", ["parseArrowConnectionsAsSourceTarget", "contraConnections", "dialecticalData"], _contraSuits);
  main.variable(observer("suits")).define("suits", ["flowSuits", "contraSuits"], _suits);
  var child1 = runtime.module(define1);
  main["import"]("Swatches", child1);
  main.variable(observer("getOppositePrefix")).define("getOppositePrefix", ["dialecticalData"], _getOppositePrefix);
  main.variable(observer("getUnitType")).define("getUnitType", _getUnitType);
  main.variable(observer("isThesisType")).define("isThesisType", _isThesisType);
  main.variable(observer("isAntithesisType")).define("isAntithesisType", _isAntithesisType);
  main.variable(observer("wisdomUnits")).define("wisdomUnits", _wisdomUnits);
  main.variable(observer("componentOrder")).define("componentOrder", _componentOrder);
  main.variable(observer("extractStatement")).define("extractStatement", _extractStatement);
  main.variable(observer("transformWisdomUnitsToDialecticalData")).define("transformWisdomUnitsToDialecticalData", ["extractStatement"], _transformWisdomUnitsToDialecticalData);
  main.variable(observer("mermaid_graph")).define("mermaid_graph", ["mermaid"], _mermaid_graph);
  main.variable(observer("mermaid_graph_from_suits")).define("mermaid_graph_from_suits", ["mermaid"], _mermaid_graph_from_suits);
  return main;
}

var DEFAULT_PREFERENCES = {
  whitesOnly: false,
  TsOnly: false,
  AsOnly: false,
  isWhiteOutside: false,
  showFlow: false,
  graphView: false
};
var DEFAULT_COLORS = {
  userRingColors: {
    negative: "#F9C6CC",
    // Red ring (semantic)
    neutral: "#ffffff",
    // White ring (semantic)
    positive: "#C6E5B3" // Green ring (semantic)
  },
  userTextColors: {
    negative: "#8b1538",
    // Red ring text (semantic)
    neutral: "#333",
    // White ring text (semantic)
    positive: "#2d5a2d",
    // Green ring text (semantic)
    coordinates: "#333"
  },
  userHubColor: "#ffff7a"
};
function DialecticalWheel(_ref) {
  var wisdomUnits = _ref.wisdomUnits,
    componentOrder = _ref.componentOrder,
    _ref$preferences = _ref.preferences,
    preferences = _ref$preferences === void 0 ? DEFAULT_PREFERENCES : _ref$preferences,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? DEFAULT_COLORS : _ref$colors,
    _ref$arrowConnections = _ref.arrowConnections,
    arrowConnections = _ref$arrowConnections === void 0 ? '' : _ref$arrowConnections,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    onChartReady = _ref.onChartReady,
    onTopSliceChange = _ref.onTopSliceChange,
    onFocusedSliceChange = _ref.onFocusedSliceChange,
    onClickedCellChange = _ref.onClickedCellChange,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
  var chartRef = react.useRef(null);
  var graphRef = react.useRef(null);
  var _useState = react.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    module = _useState2[0],
    setModule = _useState2[1];
  var _useState3 = react.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    chart = _useState4[0],
    setChart = _useState4[1];
  //const [runtime, setRuntime] = useState<any>(null);
  react.useEffect(function () {
    console.log('Loading Observable notebook from local npm package...');
    var runtime = new Runtime();
    //setRuntime(runtime);
    var main = runtime.module(define, function (name) {
      if (name === 'viewof chart') {
        // Only attach an Inspector when the chart container is mounted.
        // When graphView is true, chartRef.current will be null because the ref is assigned to graphRef instead.
        if (!chartRef.current) return undefined;
        return new (/*#__PURE__*/function (_Inspector) {
          function _class(node) {
            _classCallCheck(this, _class);
            return _callSuper(this, _class, [node]);
          }
          _inherits(_class, _Inspector);
          return _createClass(_class, [{
            key: "fulfilled",
            value: function fulfilled(value) {
              // The chart value IS the SVG node with methods attached
              setChart(value);
              if (onChartReady) onChartReady(value);
              return _superPropGet(_class, "fulfilled", this, 3)([value]);
            }
          }]);
        }(Inspector))(chartRef.current);
      }
      if (name === 'topSlice') {
        return {
          fulfilled: function fulfilled(value) {
            console.log('topSlice updated:', value);
            if (onTopSliceChange) onTopSliceChange(value);
          }
        };
      }
      if (name === 'focusedSlice') {
        return {
          fulfilled: function fulfilled(value) {
            console.log('focusedSlice updated:', value);
            if (onFocusedSliceChange) onFocusedSliceChange(value);
          }
        };
      }
      if (name === "clickedCellObject") {
        return {
          fulfilled: function fulfilled(value) {
            console.log('clickedCellObject updated:', value);
            if (onClickedCellChange) onClickedCellChange(value);
          }
        };
      }
      if (name === "graph") return graphRef.current ? new Inspector(graphRef.current) : undefined;
      /*if (name === "graph") {
        return new class extends Inspector {
          constructor(node: any) {
            super(node);
          }
          fulfilled(value: any) {
            console.log('graph updated:', value);
            return super.fulfilled(value);
          }
        }(graphRef.current);
      }*/
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });
    setModule(main);
    return function () {
      setModule(null);
      setChart(null);
      //setRuntime(null);
      runtime.dispose();
    };
  }, []);
  // Separate useEffect for redefining data - this follows the Observable examples pattern
  react.useEffect(function () {
    if (module) {
      try {
        //module.redefine('dialecticalData', dialecticalData);
        module.redefine('arrowConnections', arrowConnections);
        module.redefine('wisdomUnits', wisdomUnits);
        module.redefine('componentOrder', componentOrder);
        // Redefine the actual view cells so downstream `Generators.input(viewof ...)` works
        module.redefine('viewof whitesOnly', toggle({
          label: 'White cells only',
          value: preferences.whitesOnly
        }));
        module.redefine('viewof TsOnly', toggle({
          label: 'Ts only',
          value: preferences.TsOnly
        }));
        module.redefine('viewof AsOnly', toggle({
          label: 'As only',
          value: preferences.AsOnly
        }));
        module.redefine('viewof isWhiteOutside', toggle({
          label: 'Neutral outside',
          value: preferences.isWhiteOutside
        }));
        //module.redefine('viewof showFlow', toggle({label: 'Show sequential flow', value: preferences.showFlow}));
        module.redefine('userRingColors', colors.userRingColors);
        module.redefine('userTextColors', colors.userTextColors);
        module.redefine('userHubColor', colors.userHubColor);
      } catch (error) {
        console.warn('Could not redefine variables in notebook:', error);
      }
    }
  }, [wisdomUnits, componentOrder, preferences.whitesOnly, preferences.TsOnly, preferences.AsOnly, preferences.isWhiteOutside,
  //preferences.showFlow,
  preferences.graphView, colors.userRingColors, colors.userTextColors, colors.userHubColor, arrowConnections, module]);
  // Dynamic chart control useEffect - handles real-time flow toggling
  react.useEffect(function () {
    if (chart) {
      if (preferences.showFlow) {
        chart.toggleFlowArrows(true);
      } else {
        chart.toggleFlowArrows(false);
      }
    }
  }, [chart, preferences.showFlow]);
  return jsxRuntime.jsxs("div", {
    className: "dialectical-wheel-wrapper",
    children: [jsxRuntime.jsx("div", {
      ref: chartRef,
      className: "chart-container",
      style: _objectSpread2(_objectSpread2({
        borderRadius: '8px',
        background: 'white'
      }, style), {}, {
        display: preferences.graphView ? 'none' : 'block'
      })
    }), jsxRuntime.jsx("div", {
      ref: graphRef,
      className: "chart-container",
      style: _objectSpread2(_objectSpread2({
        borderRadius: '8px',
        background: 'white'
      }, style), {}, {
        display: preferences.graphView ? 'block' : 'none'
      })
    }), debug && jsxRuntime.jsxs("div", {
      style: {
        marginTop: '10px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      },
      children: ["Debug: ", wisdomUnits.length, " entries passed: ", componentOrder.join(', '), jsxRuntime.jsx("br", {}), "Using local notebook: src/notebook/dialectical-wheel.js"]
    })]
  });
}

exports.DialecticalWheel = DialecticalWheel;
exports.default = DialecticalWheel;
//# sourceMappingURL=index.js.map
