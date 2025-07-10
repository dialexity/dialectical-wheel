'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

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
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
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
  return "function" == typeof p ? function (t) {
    return p.apply(e, t);
  } : p;
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

function formatDate$1(date) {
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
      if (value instanceof Date) { type = "date", value = formatDate$1(value); break; }
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

const html = template(function(string) {
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
    html: () => html,
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

function _1(md){return(
md`# Dialectical Wheel with Arrows
`
)}

function _dialecticalData(){return(
{
    T1: {
      statement: "AI will eliminate human jobs",
      positive: "AI frees humans from repetitive tasks",
      negative: "AI replaces human workers entirely"
    },
    T2: {
      statement: "Automation reduces labor costs",
      positive: "Lower costs benefit consumers",
      negative: "Cost savings don't reach workers"
    },
    T3: {
      statement: "AI improves workplace efficiency",
      positive: "Faster decision-making processes",
      negative: "Dehumanizes work environment"
    },
    // New entry for testing data flow
    T4: {
      statement: "Remote work transforms society",
      positive: "Greater work-life balance and flexibility",
      negative: "Social isolation and reduced collaboration"
    },
    A1: {
      statement: "Human creativity remains irreplaceable",
      positive: "AI enhances human creative potential",
      negative: "Over-reliance on AI reduces creativity"
    },
    A2: {
      statement: "Education adapts to AI integration",
      positive: "Skills training becomes more relevant",
      negative: "Educational systems lag behind technology"
    },
    A3: {
      statement: "AI democratizes access to information",
      positive: "Levels playing field for learning",
      negative: "Information overload reduces comprehension"
    },
    A4: {
      statement: "Physical presence builds stronger teams",
      positive: "Face-to-face interaction fosters trust",
      negative: "Rigid office culture stifles innovation"
    }
  }
)}

function _width(){return(
500
)}

function _styles(){return(
{
    // Dimensions
    width: 500,
    height: 500,
    radii: {
      outer: 220,
      middleOuter: 150,
      middleInner: 100,
      inner: 100,
      hub: 30,
      drag: 280,
    },
    // Colors
    colors: {
      hub: "#ffff7a", // Khaki
      rings: { outer: "#F9C6CC", middle: "#ffffff", inner: "#C6E5B3" },
      text: { outer: "#8b1538", middle: "#333", inner: "#2d5a2d", coordinates: "#333" },
      strokes: { default: "#000", middleRing: "#000", zoom: null },
      axis: {
        positive: { fill: "#C6E5B3", stroke: "#2d5a2d" },
        neutral:  { fill: "white",   stroke: "#333" },
        negative: { fill: "#F9C6CC", stroke: "#8b1538" }
      }
    },
    // Fonts
    fonts: {
      labels: {
        baseSize: { outer: 8, middle: 8, inner: 8 },
        weight: "600",
        zoomBaseSize: 8,
        zoomMinSize: 6,
        zoomMaxSize: 16
      },
      coordinates: { size: 12, weight: "bold" }
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
  }
)}

function _arrowControls(html,parseArrowConnections,arrowConnections,dialecticalData,$0,d3){return(
(() => {
  const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
    <div style="margin-bottom: 10px; font-weight: bold;">Arrow Connections</div>
    
    <!-- Basic Arrow Controls -->
    <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center;">
      <button id="toggle-arrows" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show Arrows</button>
      <button id="redraw-arrows" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Redraw Arrows</button>
    </div>
    
    <!-- Step-by-Step Arrow Drawing -->
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9;">
      <div style="font-weight: bold; margin-bottom: 10px;">Step-by-Step Arrow Drawing</div>
      <div style="display: flex; gap: 10px; margin-bottom: 10px; align-items: center;">
        <button id="start-arrow-steps" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #e7f3ff; cursor: pointer;">Start Step Mode</button>
        <button id="prev-arrow" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Previous</button>
        <span id="arrow-counter" style="margin: 0 10px; font-weight: bold; min-width: 120px;">Ready to start</span>
        <button id="next-arrow" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Next Arrow</button>
        <button id="show-all-arrows" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show All</button>
      </div>
      <div id="current-arrow-info" style="font-size: 12px; color: #666; min-height: 20px; font-style: italic;"></div>
    </div>
  </div>`;

  const toggleBtn = container.querySelector('#toggle-arrows');
  const redrawBtn = container.querySelector('#redraw-arrows');
  
  // Step-by-step controls
  const startStepsBtn = container.querySelector('#start-arrow-steps');
  const prevArrowBtn = container.querySelector('#prev-arrow');
  const nextArrowBtn = container.querySelector('#next-arrow');
  const showAllBtn = container.querySelector('#show-all-arrows');
  const arrowCounter = container.querySelector('#arrow-counter');
  const arrowInfo = container.querySelector('#current-arrow-info');
  
  let arrowsVisible = false;
  let arrowStepMode = false;
  let currentArrowStep = 0;
  let parsedArrowConnections = [];
  
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
    
    const totalArrows = parsedArrowConnections.length;
    arrowCounter.textContent = `Arrow ${currentArrowStep} of ${totalArrows}`;
    
    if (currentArrowStep === 0) {
      arrowInfo.textContent = "All arrows cleared. Click Next to draw first arrow.";
    } else if (currentArrowStep <= totalArrows) {
      const conn = parsedArrowConnections[currentArrowStep - 1];
      arrowInfo.textContent = `Current: ${conn.from}${conn.fromRing !== 'middle' ? (conn.fromRing === 'inner' ? '+' : '-') : ''} → ${conn.to}${conn.toRing !== 'middle' ? (conn.toRing === 'inner' ? '+' : '-') : ''}`;
    }
    
    startStepsBtn.disabled = true;
    prevArrowBtn.disabled = currentArrowStep <= 0;
    nextArrowBtn.disabled = currentArrowStep >= totalArrows;
    showAllBtn.disabled = false;
  }
  
  function drawArrowsUpToStep(step) {
    $0.clearArrows();
    if (step <= 0) return;
    
    for (let i = 0; i < Math.min(step, parsedArrowConnections.length); i++) {
      const conn = parsedArrowConnections[i];
      
      // Calculate color (same logic as drawAllArrows)
      let color = "#666";
      if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
        if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
            (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
          color = "#16a34a"; // Green for same polarity
        } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                   (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
          color = "#dc2626"; // Red for opposite polarity
        } else {
          color = "#8b5cf6"; // Purple for mixed connections
        }
      } else {
        const fromIsThesis = conn.from.startsWith('T');
        const toIsThesis = conn.to.startsWith('T');
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
    
    const conn = parsedArrowConnections[currentArrowStep];
    
    // Calculate color
    let color = "#666";
    if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
      if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
          (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
        color = "#16a34a"; // Green for same polarity
      } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                 (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
        color = "#dc2626"; // Red for opposite polarity
      } else {
        color = "#8b5cf6"; // Purple for mixed connections
      }
    } else {
      const fromIsThesis = conn.from.startsWith('T');
      const toIsThesis = conn.to.startsWith('T');
      if (fromIsThesis === toIsThesis) {
        color = "#2563eb"; // Blue for same type
      } else {
        color = "#dc2626"; // Red for opposition
      }
    }
    
    // Draw this arrow with animation
    $0.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, 0);
  }
  
  function drawStaticArrow(from, to, color = "#666", strokeWidth = 2, fromRing = 'middle', toRing = 'middle') {
    const fromPos = $0.getCellCentroid(from, fromRing);
    const toPos = $0.getCellCentroid(to, toRing);
    
    if (!fromPos || !toPos) return;
    
    // Get the appropriate arrowhead marker ID for this color
    function getArrowheadId(color) {
      switch(color) {
        case "#16a34a": return "arrowhead-green";
        case "#dc2626": return "arrowhead-red";
        case "#8b5cf6": return "arrowhead-purple";
        case "#2563eb": return "arrowhead-blue";
        default: return "arrowhead-gray";
      }
    }
    
    const arrowheadId = getArrowheadId(color);
    
    // Calculate arrow path (same as animated version but static)
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const shortenBy = 10;  // Use same shortened distance as main function
    const fromShortened = {
      x: fromPos.x + (dx / distance) * shortenBy,
      y: fromPos.y + (dy / distance) * shortenBy
    };
    const toShortened = {
      x: toPos.x - (dx / distance) * shortenBy,
      y: toPos.y - (dy / distance) * shortenBy
    };
    
    const midX = (fromShortened.x + toShortened.x) / 2;
    const midY = (fromShortened.y + toShortened.y) / 2;
    
    const perpX = -dy / distance;
    const perpY = dx / distance;
    const curvature = Math.min(distance * 0.2, 50);
    
    const controlX = midX + perpX * curvature;
    const controlY = midY + perpY * curvature;
    
    const path = `M ${fromShortened.x} ${fromShortened.y} Q ${controlX} ${controlY} ${toShortened.x} ${toShortened.y}`;
    
    // Get the arrows group from the chart
    const svg = d3.select($0);
    const arrowsGroup = svg.select('.arrows-group');
    
    // Draw static arrow (no animation)
    arrowsGroup.append("path")
      .attr("d", path)
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("fill", "none")
      .attr("marker-end", `url(#${arrowheadId})`)
      .attr("opacity", 0.7);
  }
  
  // Basic arrow controls
  toggleBtn.addEventListener('click', () => {
    if (arrowsVisible) {
      $0.clearArrows();
      toggleBtn.textContent = 'Show Arrows';
      arrowsVisible = false;
    } else {
      if (arrowStepMode) {
        drawArrowsUpToStep(currentArrowStep);
      } else {
        $0.drawAllArrows();
      }
      toggleBtn.textContent = 'Hide Arrows';
      arrowsVisible = true;
    }
  });
  
  redrawBtn.addEventListener('click', () => {
    if (arrowsVisible) {
      if (arrowStepMode) {
        drawArrowsUpToStep(currentArrowStep);
      } else {
        $0.drawAllArrows();
      }
    }
  });
  
  // Step-by-step arrow controls
  startStepsBtn.addEventListener('click', () => {
    updateArrowConnections();
    arrowStepMode = true;
    arrowsVisible = true;
    currentArrowStep = 0;
    if (arrowsVisible) {
      $0.clearArrows();
    }
    updateArrowStepUI();
  });
  
  prevArrowBtn.addEventListener('click', () => {
    if (currentArrowStep > 0) {
      currentArrowStep--;
      if (arrowsVisible) {
        drawArrowsUpToStep(currentArrowStep);
      }
      updateArrowStepUI();
    }
  });
  
  nextArrowBtn.addEventListener('click', () => {
    if (currentArrowStep < parsedArrowConnections.length) {
      if (arrowsVisible) {
        // Draw only the next arrow with animation
        drawNextArrow();
      }
      currentArrowStep++;
      updateArrowStepUI();
    }
  });
  
  showAllBtn.addEventListener('click', () => {
    arrowStepMode = false;
    currentArrowStep = 0;
    if (arrowsVisible) {
      $0.drawAllArrows();
    }
    updateArrowStepUI();
  });
  
  // Initialize
  updateArrowConnections();
  updateArrowStepUI();

  // Return the container
  container.value = "arrow-controls";
  return container;
})()
)}

function _chart(styles,d3,dialecticalData,transformToNestedPieData,getTextConstraints,wrapText,arrowUtilities,parseArrowConnections,arrowConnections,initializeBuildSteps){return(
(() => {
  
  let isTouchDragging = false;
  let touchDragStart = null;
  const TOUCH_DRAG_THRESHOLD = 8;

styles.height;
const outerRadius = styles.radii.outer;
const innerRadius = styles.radii.middleOuter; // Outer ring's inner radius
const middleRadius = styles.radii.middleOuter; // Middle ring's outer radius
const innerInnerRadius = styles.radii.middleInner; // Middle ring's inner radius
const centerRadius = styles.radii.inner; // Inner ring's outer radius

// Create SVG with centered viewBox
const svg = d3.create("svg")
  .attr("viewBox", [-styles.width/2, -styles.height/2, styles.width, styles.height])
  .style("max-width", "100%")
  .style("height", "auto");

// State variables
let focusedPair = null;
let clickedSlice = null;
let activeZoom = null;
let cellVisibility = {};

function updateChartValue() {
svg.node().value = {
  focusedPair,
  clickedSlice,
  currentRotation: getCurrentRotationFromDOM()
};
svg.node().dispatchEvent(new CustomEvent("input"));
}

// Double tap detection for zoom reset
let lastTapTime = 0;
const DOUBLE_TAP_DELAY = 300; // 300ms window for double tap

// Helper function to get current rotation from DOM (eliminates state tracking)
function getCurrentRotationFromDOM() {
  const transform = rotationGroup.attr("transform") || "";
  const rotateMatch = transform.match(/rotate\(([-\d.]+)\)/);
  if (rotateMatch) {
    return parseFloat(rotateMatch[1]) * Math.PI / 180; // Convert to radians
  }
  return 0;
}

// Helper function to set rotation directly on DOM (no state tracking)
function setRotationDirectly(radians) {
  const degrees = (radians * 180) / Math.PI;
  rotationGroup.attr("transform", `rotate(${degrees})`);
  // Update text positions immediately
  updateTextPositions(degrees);
  // Update chart value and dispatch event
  updateChartValue();
}

// Helper function to get rotated centroid using simple matrix transform
function getRotatedCentroid(rawCentroid, currentRotation) {
  // Simple rotation matrix: [x*cos - y*sin, x*sin + y*cos]
  const rotatedX = rawCentroid[0] * Math.cos(currentRotation) - rawCentroid[1] * Math.sin(currentRotation);
  const rotatedY = rawCentroid[0] * Math.sin(currentRotation) + rawCentroid[1] * Math.cos(currentRotation);
  
  return [rotatedX, rotatedY];
}

// Step-by-step animation state
let currentStep = 0;
let isStepMode = false;
let animationData = {};
let buildSteps = [];

// Initialize cell visibility
const cells = Object.keys(dialecticalData);
cells.forEach(cell => {
  cellVisibility[cell] = {
    outer: true,  // Start visible for normal mode
    middle: true,
    inner: true
  };
});

// Add background rectangle for reset clicks
svg.append("rect")
  .attr("class", "background")
  .attr("x", -styles.width/2)
  .attr("y", -styles.height/2)
  .attr("width", styles.width)
  .attr("height", styles.height)
  .style("fill", "none")
  .style("pointer-events", "all")
  .on("click", resetZoom);

// NEW TRANSFORM HIERARCHY:
// svg (D3 zoom applied here)
//   zoomGroup (zoom applied FIRST - D3 zoom controls this)
//     rotationGroup (rotation applied SECOND - rotates the zoomed content)
//       contentGroup (actual wheel content)
const zoomGroup = svg.append("g").attr("class", "zoom-group");
const rotationGroup = zoomGroup.append("g").attr("class", "rotation-group");
const contentGroup = rotationGroup.append("g").attr("class", "content-group");

// Add large invisible circle for better mobile touch target (in rotation group so it rotates with wheel)
const dragCircle = rotationGroup.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", styles.radii.drag) // Larger than outerRadius for easier touch
  .style("fill", "transparent")
  .style("pointer-events", "none") // FIXED: Don't block clicks - only handle drag
  .style("cursor", "grab");

// Create zoom behavior (disable panning, only allow programmatic zoom)
const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .filter(event => true) // Disable all zoom interactions
  .on("zoom", zoomed);

// FIXED: Bind zoom to svg - D3 zoom needs to control the main element
//zoomGroup.call(zoom);

// Drag behavior for rotation with mobile optimization
let dragStartAngle = 0;
let dragStartRotation = 0;

const drag = d3.drag()
  .filter(function(event) {
    // Allow drag on touch devices and mouse
    return !event.ctrlKey && !event.button;
  })
  .touchable(true)  // Explicitly enable touch support
  .on("start", dragStarted)
  .on("drag", dragged)
  .on("end", dragEnded);

// Apply mobile-friendly styles and drag behavior
svg.style("touch-action", "none")  // Prevent default touch behaviors
   .style("user-select", "none");   // Prevent text selection

// Track hover state on cells
function setHoveredCell(cell) {
}

// Add wheel event listener for scroll-to-zoom
svg.on('wheel', function(event) {

  //DISABLE SCROLL-TO-ZOOM
  return;
});

// FIXED: Apply drag behavior to the rotationGroup so it scales with zoom
rotationGroup.call(drag);

// ===== TOUCH BEHAVIOR: Focus + Zoom to Slice =====
// Touch events now simply focus the pair and zoom to the entire slice

// Create pie generator
const pie = d3.pie()
  .value(d => d.value)
  .sort(null);

// Create arc generators
const outerArc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

const middleArc = d3.arc()
  .innerRadius(innerInnerRadius)
  .outerRadius(middleRadius);

const innerArc = d3.arc()
  .innerRadius(styles.radii.hub)  // Add inner radius to make it a ring, not a pie
  .outerRadius(centerRadius);

// Simple Text Rotation and Flipping Logic
// Single function to calculate text orientation with consistent flipping
function calculateTextTransform(d, arcGenerator, currentRotationRadians = null) {
  const centroid = arcGenerator.centroid(d);
  
  // Get the slice middle angle in the original data
  const sliceMiddleAngle = (d.startAngle + d.endAngle) / 2;
  
  // PERFORMANCE: Use passed rotation or get from DOM only if needed
  const currentRotation = currentRotationRadians !== null ? 
    currentRotationRadians : 
    getCurrentRotationFromDOM();
  
  // Calculate the current visual angle (slice angle + wheel rotation)
  const currentVisualAngle = sliceMiddleAngle + currentRotation;
  
  // Normalize to [0, 2π] for consistent flipping logic
  const normalizedAngle = ((currentVisualAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  
  // Convert slice angle to degrees for text rotation
  let textRotationDegrees = (sliceMiddleAngle * 180) / Math.PI;
  
  // DISABLE text flipping when focused to avoid confusion
  // Only flip text if we're NOT in focus mode (focusedPair is null)
  if (normalizedAngle > Math.PI / 2 && normalizedAngle < 3 * Math.PI / 2) {
    textRotationDegrees += 180;
  }
  
  return `translate(${centroid[0]}, ${centroid[1]}) rotate(${textRotationDegrees})`;
}

// Reusable function to rotate wheel to center a slice at the top
function rotateToSlice(unitId, duration = styles.durations.stepRotation) {
  // Choose which data to use based on current mode
  const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
  
  // Calculate rotation needed to center the slice at the top
  const pieData = pie(dataToUse.middle);
  const targetSlice = pieData.find(d => d.data.unitId === unitId);
  
  if (!targetSlice) return;
  
  // Calculate the current angle of the slice center in the original data
  const sliceAngle = (targetSlice.startAngle + targetSlice.endAngle) / 2;
  
  // Simple calculation: to center this slice at the top, 
  // we need: sliceAngle + newRotation = 0
  // Therefore: newRotation = -sliceAngle
  const newRotation = -sliceAngle;
  
  // Get current rotation from DOM
  const startRotation = getCurrentRotationFromDOM();
  let rotationDelta = newRotation - startRotation;
  
  // Normalize rotation delta to always take the shortest path (-π to π)
  while (rotationDelta > Math.PI) rotationDelta -= 2 * Math.PI;
  while (rotationDelta < -Math.PI) rotationDelta += 2 * Math.PI;
  
  // Use D3 transition for smooth rotation
  const rotationTransition = d3.transition()
    .duration(duration)
    .ease(d3.easeCubicInOut);
    
  rotationTransition.tween("rotate", function() {
    return function(t) {
      const currentRotation = startRotation + rotationDelta * t;
      const degrees = (currentRotation * 180) / Math.PI;
      rotationGroup.attr("transform", `rotate(${degrees})`);
      // Update text positions during transition
      updateTextPositions(degrees);
    };
  }).on("end", updateChartValue);
}

// Create groups for each ring (in content group)
const outerGroup = contentGroup.append("g").attr("class", "outer-ring");
const middleGroup = contentGroup.append("g").attr("class", "middle-ring");
const innerGroup = contentGroup.append("g").attr("class", "inner-ring");

// Initialize data
const nestedData = transformToNestedPieData(dialecticalData);

// Create groups for labels (in content group)
const outerLabelsGroup = contentGroup.append("g").attr("class", "outer-labels");
const middleLabelsGroup = contentGroup.append("g").attr("class", "middle-labels");
const innerLabelsGroup = contentGroup.append("g").attr("class", "inner-labels");

// Add yellow center circle (axle/hub) (in content group)
contentGroup.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", styles.radii.hub)  // Same as inner radius of green ring
  .style("fill", styles.colors.hub);

// Add coordinate system BACK inside the content group so it gets rotation transforms
const coordinateGroup = contentGroup.append("g").attr("class", "coordinate-system");

// Add circumference numbers at slice centers
const numSlices = Object.keys(dialecticalData).length;
const angleStep = (2 * Math.PI) / numSlices;
const numberRadius = outerRadius + 15;

// Place numbers at the center of each slice, starting from top and going clockwise
for (let i = 0; i < numSlices; i++) {
  const angle = (i * angleStep) + (angleStep / 2) - Math.PI / 2; // Center of slice, start at top
  const x = numberRadius * Math.cos(angle);
  const y = numberRadius * Math.sin(angle);
  
  coordinateGroup.append("text")
    .attr("class", "coordinate-number")
    .attr("x", x)
    .attr("y", y)
    .attr("data-slice-index", i)
    .style("text-anchor", "middle")
    .style("dominant-baseline", "central")
    .style("font-family", styles.fonts.family)
    .style("font-size", `${styles.fonts.coordinates.size}px`)
    .style("font-weight", styles.fonts.coordinates.weight)
    .style("fill", styles.colors.text.coordinates)
    .text(i < numSlices / 2 ? (i + 1) : (i - numSlices / 2 + 1));
}

// Add axis symbols at the center of each ring layer
const ringRadii = [
  centerRadius,                // Inner ring center
  middleRadius,  // Middle ring center
  outerRadius        // Outer ring center
];

//const symbols = ["T+", "T", "T-"]; // Positive, neutral, negative
const axisColors = [styles.colors.axis.positive, styles.colors.axis.neutral, styles.colors.axis.negative];

function updateCoordinateNumbersOpacities() {
  // Update coordinate number opacities based on slice data
  const units = Object.keys(dialecticalData);
  const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
  const middleData = dataToUse.middle;
  
  coordinateGroup.selectAll("text.coordinate-number").each(function() {
    const sliceIndex = parseInt(d3.select(this).attr("data-slice-index"));
    const unitId = units[sliceIndex];
    
    if (unitId) {
      const sliceData = middleData.find(d => d.unitId === unitId);
      const opacity = sliceData ? sliceData.opacity : 1;
      
      d3.select(this)
        .transition()
        .duration(styles.durations.normal)
        .style("opacity", opacity);
    }
  });
}

// Function to update axis positions based on focus
function updateAxisPositions(focusedUnitId = null) {
  // If not focused, only update coordinate number opacities
  if (!focusedPair) {
    updateCoordinateNumbersOpacities();
    return;
  }
  
  let axisAngle;
  
  if (focusedUnitId) {
    // Remove existing axis elements
    coordinateGroup.selectAll(".coordinate-circle").remove();
    coordinateGroup.selectAll(".coordinate-symbol").remove();

    // When focused, position axis at the left edge of the focused slice
    // Choose which data to use based on current mode (same as other functions)
    const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
    const pieData = pie(dataToUse.middle);
    const focusedSlice = pieData.find(d => d.data.unitId === focusedUnitId);
    
    if (focusedSlice) {
      // Position axis at the start angle of the slice (left edge)
      axisAngle = focusedSlice.startAngle - Math.PI / 2;
    } else {
      // Fallback to default
      const units = Object.keys(dialecticalData);
      const numSlices = units.length;
      const angleStep = (2 * Math.PI) / numSlices;
      axisAngle = (numSlices / 2 * angleStep) - Math.PI / 2;
    }
  } else {
    updateCoordinateNumbersOpacities();
    return;
  }
  
  // Create axis on both sides of the wheel
  const axisAngles = [axisAngle, axisAngle + Math.PI]; // Both sides
  
  axisAngles.forEach((angle, sideIndex) => {
    ringRadii.forEach((radius, ringIndex) => {
      const angleOffset = 8 / radius; // 8px arc length at this radius
      const rotatedAngle = angle + angleOffset;
      const x = (radius-8) * Math.cos(rotatedAngle);
      const y = (radius-8) * Math.sin(rotatedAngle);
      
      // Choose symbols based on the focused unit ID
             const logos = [["T+", "T", "T-"], ["A+", "A", "A-"]];

      const symbols = focusedUnitId.startsWith('T') ? logos[sideIndex] : logos[1 - sideIndex];
      
      // Create a group for this axis element (circle + symbol)
      const axisGroup = coordinateGroup.append("g")
        .attr("class", "axis-element");
      
      // Create circle background within the group
      axisGroup.append("circle")
        .attr("class", "coordinate-circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 8)
        .style("fill", axisColors[ringIndex].fill)
        .style("opacity", 0);

      axisGroup.append("circle")
        .attr("class", "coordinate-circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 8)
        .style("fill", "#000")
        .style("opacity", 0.1);

      
      // Add symbol text within the same group, perfectly centered
      axisGroup.append("text")
        .attr("class", "coordinate-symbol")
        .attr("x", x)
        .attr("y", y)
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .style("font-family", styles.fonts.family)
        .style("font-size", "10px") // Slightly smaller for better fit in 8px radius circle
        .style("font-weight", styles.fonts.coordinates.weight)
        .style("fill", axisColors[ringIndex].stroke)
        .style("pointer-events", "none") // Prevent text from interfering with interactions
        .text(symbols[ringIndex]);
    });
  });
  
  updateCoordinateNumbersOpacities();
}

// Initialize axes
updateAxisPositions();

// Color scales
const outerColor = d3.scaleOrdinal()
  .domain(Object.keys(dialecticalData))
  .range(Object.keys(dialecticalData).map(() => styles.colors.rings.outer));

const middleColor = d3.scaleOrdinal()
  .domain(Object.keys(dialecticalData))
  .range(Object.keys(dialecticalData).map(() => styles.colors.rings.middle));

const innerColor = d3.scaleOrdinal()
  .domain(Object.keys(dialecticalData))
  .range(Object.keys(dialecticalData).map(() => styles.colors.rings.inner));

// Initialize data
//const nestedData = transformToNestedPieData(dialecticalData);

// Arc tween function
function arcTween(arcGenerator) {
  return function(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arcGenerator(i(t));
    };
  };
}

// Function to hide individual cell (sucking into inner ring)
function hideCell(unitId, ringType) {
  if (!cellVisibility[unitId] || !cellVisibility[unitId][ringType]) return;
  
  cellVisibility[unitId][ringType] = false;
  
  let group, labelsGroup, targetRadius;
  switch(ringType) {
    case "outer":
      group = outerGroup;
      labelsGroup = outerLabelsGroup;
      targetRadius = innerRadius;
      break;
    case "middle":
      group = middleGroup;
      labelsGroup = middleLabelsGroup;
      targetRadius = innerInnerRadius;
      break;
    case "inner":
      group = innerGroup;
      labelsGroup = innerLabelsGroup;
      targetRadius = 0;
      break;
  }
  
  // Hide cell with radius animation
  group.selectAll("path")
    .filter(d => d.data.unitId === unitId)
    .classed("hidden", true)
    .transition()
    .duration(styles.durations.stepRotation) // Mismatched name, but using for now
    .ease(d3.easeExpIn)
    .attrTween("d", function(d) {
      const currentData = d;
      
      return function(t) {
        let arcGen;
        if (ringType === "outer") {
          const newInnerRadius = d3.interpolate(innerRadius, targetRadius)(t);
          const newOuterRadius = d3.interpolate(outerRadius, targetRadius)(t);
          arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        } else if (ringType === "middle") {
          const newInnerRadius = d3.interpolate(innerInnerRadius, targetRadius)(t);
          const newOuterRadius = d3.interpolate(middleRadius, targetRadius)(t);
          arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        } else {
          const newInnerRadius = d3.interpolate(0, targetRadius)(t);
          const newOuterRadius = d3.interpolate(centerRadius, targetRadius)(t);
          arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        }
        return arcGen(currentData);
      };
    })
    .style("opacity", d3.interpolate(1, 0))
    .on("end", function(d) {
      // Restore data binding after hide animation
      this._current = d;
    });
  
  // Hide label
  labelsGroup.selectAll("text")
    .filter(d => d.data.unitId === unitId)
    .transition()
    .duration(styles.durations.stepRotation)
    .style("opacity", 0);
}

// Function to show individual cell (expanding from inner ring)
function showCell(unitId, ringType) {
  if (!cellVisibility[unitId] || cellVisibility[unitId][ringType]) return;
  
  cellVisibility[unitId][ringType] = true;
  
  let group, labelsGroup, startRadius, endInnerRadius, endOuterRadius;
  switch(ringType) {
    case "outer":
      group = outerGroup;
      labelsGroup = outerLabelsGroup;
      startRadius = innerRadius;
      endInnerRadius = innerRadius;
      endOuterRadius = outerRadius;
      break;
    case "middle":
      group = middleGroup;
      labelsGroup = middleLabelsGroup;
      startRadius = innerInnerRadius;
      endInnerRadius = innerInnerRadius;
      endOuterRadius = middleRadius;
      break;
    case "inner":
      group = innerGroup;
      labelsGroup = innerLabelsGroup;
      startRadius = 0;
      endInnerRadius = styles.radii.hub;
      endOuterRadius = centerRadius;
      break;
  }
  
  // Show cell with radius animation
  group.selectAll("path")
    .filter(d => d.data.unitId === unitId)
    .classed("hidden", false)
    .transition()
    .duration(styles.durations.stepRotation)
    .ease(d3.easeExpOut)
    .attrTween("d", function(d) {
      const currentData = d;
      
      return function(t) {
        const newInnerRadius = d3.interpolate(startRadius, endInnerRadius)(t);
        const newOuterRadius = d3.interpolate(startRadius, endOuterRadius)(t);
        const arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        return arcGen(currentData);
      };
    })
    .style("opacity", d3.interpolate(0, ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8))
    .on("end", function(d) {
      // After animation completes, ensure text content is properly wrapped with up-to-date arc data
      const textElement = d3.select(this);
      textElement.selectAll("tspan").remove();
      const text = d.data.fullText || d.data.name;
      let pieData;
      if (ringType === "outer") {
        pieData = pie(nestedData.outer);
        d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      } else if (ringType === "middle") {
        pieData = pie(nestedData.middle);
        d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
      } else {
        pieData = pie(nestedData.inner);
        d3.arc().innerRadius(30).outerRadius(centerRadius);
      }
      const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
      const constraints = getTextConstraints(ringType, arcDatum);
      wrapText(textElement, text, constraints);
    });
  
  // Show label with position animation
  labelsGroup.selectAll("text")
    .filter(d => d.data.unitId === unitId)
    .transition()
    .duration(styles.durations.stepRotation)
    .ease(d3.easeExpOut)
    .attrTween("transform", function(d) {
      const currentData = d;
      
      return function(t) {
        const newInnerRadius = d3.interpolate(startRadius, endInnerRadius)(t);
        const newOuterRadius = d3.interpolate(startRadius, endOuterRadius)(t);
        const arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
        
        // Use the simple text transform function
        return calculateTextTransform(currentData, arcGen);
      };
    })
    .style("opacity", 1)
    .on("end", function(d) {
      // After animation completes, ensure text content is properly wrapped with up-to-date arc data
      const textElement = d3.select(this);
      textElement.selectAll("tspan").remove();
      const text = d.data.fullText || d.data.name;
      let pieData;
      if (ringType === "outer") {
        pieData = pie(nestedData.outer);
        d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      } else if (ringType === "middle") {
        pieData = pie(nestedData.middle);
        d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
      } else {
        pieData = pie(nestedData.inner);
        d3.arc().innerRadius(30).outerRadius(centerRadius);
      }
      const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
      const constraints = getTextConstraints(ringType, arcDatum);
      wrapText(textElement, text, constraints);
    });
}

// Change data function for smooth value transitions
function changeData(ringType, newData, arcGenerator) {
  const group = ringType === "outer" ? outerGroup : 
               ringType === "middle" ? middleGroup : innerGroup;
  const labelsGroup = ringType === "outer" ? outerLabelsGroup :
                     ringType === "middle" ? middleLabelsGroup : innerLabelsGroup;
  
  const pieData = pie(newData);
  
  // Update paths with smooth transitions
  const paths = group.selectAll("path").data(pieData, d => d.data.name);
  
  paths.transition()
    .duration(styles.durations.normal)
    .attrTween("d", arcTween(arcGenerator))
    .style("opacity", d => {
      if (!cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      // Use data opacity combined with ring-specific opacity
      const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
      return d.data.opacity * baseOpacity;
    });
  
  // Update labels with opacity based on data value
  const labels = labelsGroup.selectAll("text").data(pieData, d => d.data.name);
  
  labels.transition()
    .duration(styles.durations.normal)
    .attr("transform", function(d) {
      // Use the simple text transform function
      return calculateTextTransform(d, arcGenerator);
    })
    .style("opacity", d => {
      // Hide if data value is 0 or if visibility is toggled off
      if (d.data.value === 0 || !cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      return d.data.opacity;
    });
  

}



// Focus pair function
function focusPair(clickedUnitId) {
  const isThesis = clickedUnitId.startsWith('T');
  const pairId = isThesis ? clickedUnitId.replace('T', 'A') : clickedUnitId.replace('A', 'T');
  const thesis = isThesis ? clickedUnitId : pairId;
  const antithesis = isThesis ? pairId : clickedUnitId;   
  
  const isAlreadyFocused = focusedPair && 
    focusedPair.thesis === thesis && 
    focusedPair.antithesis === antithesis;
  
  // Choose which data to modify
  const dataToModify = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
  
  if (isAlreadyFocused) {
    if(clickedUnitId != clickedSlice) {
      rotateToSlice(clickedUnitId);
      clickedSlice = clickedUnitId;
      updateChartValue();
      return;
    }
    focusedPair = null;
    clickedSlice = null;
    // Reset all opacities to 1
    ["outer", "middle", "inner"].forEach(ringType => {
      dataToModify[ringType].forEach(item => {
        item.opacity = 1;
      });
    });
    // Reset axes to default positions
    updateAxisPositions();
  } else {
    focusedPair = { thesis, antithesis };
    
    // Rotate to center the clicked slice at the top
    rotateToSlice(clickedUnitId, styles.durations.stepRotation);
    
    // Dim all cells first
    ["outer", "middle", "inner"].forEach(ringType => {
      dataToModify[ringType].forEach(item => {
        item.opacity = 0.3;
      });
    });
    // Highlight the focused pair
    ["outer", "middle", "inner"].forEach(ringType => {
      dataToModify[ringType].forEach(item => {
        if (item.unitId === thesis || item.unitId === antithesis) {
          item.opacity = 1;
        }
      });
    });
    // Update axes to focus on the pair
    updateAxisPositions(clickedUnitId);
  }
  
  // Re-render with updated opacity
  if (isStepMode && Object.keys(animationData).length > 0) {
    changeData("outer", animationData.outer, outerArc);
    changeData("middle", animationData.middle, middleArc);
    changeData("inner", animationData.inner, innerArc);
  } else {
    updateAllRings();
  }
  
  // --- MAKE CHART REACTIVE: update .value and dispatch input event ---
  clickedSlice = clickedUnitId; 
  updateChartValue();
}

// Zoom functions
function zoomToCell(event, d) {
  if (activeZoom === d) return resetZoom();
  
  zoomGroup.selectAll("path").style("stroke-width", null);
  
  activeZoom = d;
  d3.select(event.currentTarget)
    .style("stroke", styles.colors.strokes.zoom)
    .style("stroke-width", styles.strokes.zoomWidth);
  
  const parentClass = d3.select(event.currentTarget.parentNode).attr("class");
  let arcGenerator;
  
  if (parentClass.includes("outer-ring")) {
    arcGenerator = outerArc;
  } else if (parentClass.includes("middle-ring")) {
    arcGenerator = middleArc;
  } else if (parentClass.includes("inner-ring")) {
    arcGenerator = innerArc;
  } else {
    arcGenerator = middleArc;
  }
  
  // NEW: Get raw centroid and apply current rotation to it using DOM transforms
  const rawCentroid = arcGenerator.centroid(d);
  const currentRotation = getCurrentRotationFromDOM();
  
  // Use DOM transforms to get rotated centroid (more efficient than manual math)
  const rotatedCentroid = getRotatedCentroid(rawCentroid, currentRotation);
  
  const scale = 3;
  const translate = [-scale * rotatedCentroid[0], -scale * rotatedCentroid[1]];
  
  // Apply zoom transform to svg - D3 zoom controls the main element
  svg.transition()
    .duration(styles.durations.normal)
    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

// Function to zoom to entire slice (all three rings of a unitId)
function zoomToSlice(unitId) {
  // Choose which data to use based on current mode (same as other functions)
  const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
  
  // Use the middle ring to calculate the centroid for the entire slice
  const pieData = pie(dataToUse.middle);
  const sliceData = pieData.find(d => d.data.unitId === unitId);
  
  if (!sliceData) return;
  
  // Clear existing zoom styling
  zoomGroup.selectAll("path").style("stroke-width", null);
  
  // NEW: Get raw centroid and apply current rotation to it using DOM transforms
  const rawCentroid = middleArc.centroid(sliceData);
  const currentRotation = getCurrentRotationFromDOM();
  
  // Use DOM transforms to get rotated centroid (more efficient than manual math)
  const rotatedCentroid = getRotatedCentroid(rawCentroid, currentRotation);
  
  // Apply rotation to centroid: [x*cos - y*sin, x*sin + y*cos]
  //const rotatedCentroidX = rotatedCentroid[0] * Math.cos(currentRotation) - rotatedCentroid[1] * Math.sin(currentRotation);
  //const rotatedCentroidY = rotatedCentroid[0] * Math.sin(currentRotation) + rotatedCentroid[1] * Math.cos(currentRotation);
  
  // Set active zoom (use slice data for reference)
  activeZoom = sliceData;
  
  // Highlight all three rings of this slice
  [outerGroup, middleGroup, innerGroup].forEach(group => {
    group.selectAll("path")
      .filter(d => d.data.unitId === unitId)
      .style("stroke", styles.colors.strokes.zoom)
      .style("stroke-width", styles.strokes.zoomWidth);
  });
  
  const scale = 2.1;
  const translate = [-scale * rotatedCentroid[0], -scale * rotatedCentroid[1]];
  
  // Apply zoom transform to svg
  svg.transition()
    .duration(styles.durations.normal)
    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

function resetZoom() {
  zoomGroup.selectAll("path.cell")  // Only apply to pie chart cells, not arrows
    .style("stroke", function() {
      const ringType = d3.select(this.parentNode).attr("class");
      return ringType && ringType.includes("middle") ? styles.colors.strokes.middleRing : styles.colors.strokes.default;
    })
    .style("stroke-width", function() {
      const ringType = d3.select(this.parentNode).attr("class");
      return ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
    });
  activeZoom = null;
  
  // FIXED: Apply zoom reset to svg - D3 zoom controls the main element  
  svg.transition()
    .duration(styles.durations.normal)
    .call(zoom.transform, d3.zoomIdentity);
}

// ===== INITIALIZE LONG PRESS HANDLER =====
// Now that zoomToCell is defined, initialize the long press handler
// REMOVED: Long press not needed anymore - touch events do focus + zoom directly

// Drag functions for rotation
function dragStarted(event) {
  // Since drag is now attached to rotationGroup, coordinates are already in the rotated space
  // Just use the event coordinates directly (they're relative to the rotationGroup)
  dragStartAngle = Math.atan2(event.y, event.x);
  dragStartRotation = getCurrentRotationFromDOM();
  
  // Change cursor during drag
  dragCircle.style("cursor", "grabbing");
}

function dragged(event) {
  // Since drag is now attached to rotationGroup, coordinates are already in the rotated space
  // Just use the event coordinates directly
  const currentAngle = Math.atan2(event.y, event.x);
  
  // Calculate rotation delta using shortest angular distance
  let angleDelta = currentAngle - dragStartAngle;
  
  // Normalize angle delta to be between -π and π (shortest path)
  while (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
  while (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;
  
  // Calculate new rotation (no state tracking - just apply directly)
  const newRotation = dragStartRotation + angleDelta;
  
  // Apply rotation directly to DOM (no state tracking!)
  const rotationDegrees = (newRotation * 180) / Math.PI;
  rotationGroup.attr("transform", `rotate(${rotationDegrees})`);
  
  // PERFORMANCE FIX: Don't update text during drag!
  // Text positions will be updated once at the end of drag for much smoother rotation
  // The wheel geometry itself rotates smoothly without needing text recalculation
}

function dragEnded(event) {
  // Restore cursor
  dragCircle.style("cursor", "grab");
  
  // PERFORMANCE FIX: Single text update after drag ends
  // Get current rotation and update text positions once
  const currentRotation = getCurrentRotationFromDOM();
  const rotationDegrees = (currentRotation * 180) / Math.PI;
  updateTextPositions(rotationDegrees);
  // Update chart value and dispatch event
  updateChartValue();
}
let isUpdatingTransform = false;

function updateTextPositions(rotationDegrees) {
  isUpdatingTransform = true;
  
  // Convert degrees to radians once
  const currentRotationRadians = (rotationDegrees * Math.PI) / 180;
  
  // Use requestAnimationFrame for smoother updates
  requestAnimationFrame(() => {
    // PERFORMANCE: Update all cell text using the optimized transform function
    // Pass rotation to avoid repeated DOM queries
    const outerTexts = outerLabelsGroup.selectAll("text");
    const middleTexts = middleLabelsGroup.selectAll("text");
    const innerTexts = innerLabelsGroup.selectAll("text");
    
    outerTexts.attr("transform", function(d) {
      if (!d) return this.getAttribute("transform"); // Keep existing if no data
      return calculateTextTransform(d, outerArc, currentRotationRadians);
    });
    
    middleTexts.attr("transform", function(d) {
      if (!d) return this.getAttribute("transform"); // Keep existing if no data
      return calculateTextTransform(d, middleArc, currentRotationRadians);
    });
    
    innerTexts.attr("transform", function(d) {
      if (!d) return this.getAttribute("transform"); // Keep existing if no data
      return calculateTextTransform(d, innerArc, currentRotationRadians);
    });
    
    // PERFORMANCE: Optimize coordinate system counter-rotation
    const counterRotationDegrees = -rotationDegrees;
    
    // Update coordinate numbers (more efficient transform calculation)
    coordinateGroup.selectAll("text.coordinate-number").attr("transform", function() {
      const x = parseFloat(d3.select(this).attr("x"));
      const y = parseFloat(d3.select(this).attr("y"));
      return `translate(${x}, ${y}) rotate(${counterRotationDegrees}) translate(${-x}, ${-y})`;
    });
    
    // Update coordinate symbols (more efficient transform calculation)
    coordinateGroup.selectAll("text.coordinate-symbol").attr("transform", function() {
      const x = parseFloat(d3.select(this).attr("x"));
      const y = parseFloat(d3.select(this).attr("y"));
      return `translate(${x}, ${y}) rotate(${counterRotationDegrees}) translate(${-x}, ${-y})`;
    });
    
    isUpdatingTransform = false;
  });
}

function zoomed(event) {
  const { transform } = event;
  
  // NEW: Apply zoom transform to zoomGroup (zoom happens first in hierarchy)
  // D3 applies transform to SVG, we redirect it to zoomGroup
  zoomGroup.attr("transform", transform);
  
  // Update stroke widths to maintain visual consistency at different zoom levels
  zoomGroup.selectAll("path.cell")
    .style("stroke-width", function() {
      const ringType = d3.select(this.parentNode).attr("class");
      const baseWidth = ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
      return (baseWidth / transform.k) + "px";
    });
  
  // PERFORMANCE FIX: Don't rewrap text on every zoom event!
  // Text wrapping should only happen when content changes, not during zoom
  // The text bounds are handled by CSS and SVG scaling naturally
  
  // Only update font size if needed (commented out the expensive rewrapping)
  /*zoomGroup.selectAll("text.cell-label")
    .style("font-size", function() {
      const baseSize = styles.fonts.labels.zoomBaseSize;
      return baseSize + "px"; // Keep consistent size during zoom
    });*/
}

// Update ring function
function updateRing(group, labelsGroup, data, arcGenerator, ringType, colorScale) {
  const pieData = pie(data);
  
  const paths = group.selectAll("path")
    .data(pieData, d => d.data.name);

  const pathsEnter = paths.enter()
    .append("path")
    .attr("class", "cell")
    .attr("fill", d => colorScale(d.data.unitId))
    .attr("stroke", ringType === "middle" ? styles.colors.strokes.middleRing : styles.colors.strokes.default)
    .attr("stroke-width", ringType === "middle" ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth)
    .attr("stroke-dasharray", "1,3") // Dotted border
    .attr("stroke-linecap", "round")
    .attr("stroke-opacity", 0.3)
    .style("cursor", "pointer")
    .style("opacity", d => {
      if (!cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
      return d.data.opacity * baseOpacity;
    })
    .attr("d", arcGenerator)
    .each(function(d) { this._current = d; })
    .on("click", function(event, d) {
      if (event.metaKey || event.ctrlKey) {
        zoomToCell(event, d);
      } else {
        focusPair(d.data.unitId);
      }
    })
    .on("touchstart", function(event, d) {
      event.preventDefault();
      const touch = event.touches && event.touches[0];
      if (touch) {
        touchDragStart = { x: touch.clientX, y: touch.clientY };
      } else {
        touchDragStart = null;
      }
      isTouchDragging = false;
    })
    .on("touchmove", function(event, d) {
      if (!touchDragStart) return;
      const touch = event.touches && event.touches[0];
      if (touch) {
        const dx = touch.clientX - touchDragStart.x;
        const dy = touch.clientY - touchDragStart.y;
        if (Math.sqrt(dx*dx + dy*dy) > TOUCH_DRAG_THRESHOLD) {
          isTouchDragging = true;
        }
      }
    })
    .on("touchend", function(event, d) {
      event.preventDefault();
      if (isTouchDragging) {
        // It was a drag, not a tap—do nothing
        isTouchDragging = false;
        touchDragStart = null;
        return;
      }
      // ... existing tap/focus logic ...
      const currentTime = Date.now();
      const timeSinceLastTap = currentTime - lastTapTime;
      if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
        // Double tap detected - reset zoom
        //console.log('Double tap detected - resetting zoom');
        resetZoom();
      } else {
        focusPair(d.data.unitId);
      }
      lastTapTime = currentTime;
      isTouchDragging = false;
      touchDragStart = null;
    })
    .on("touchcancel", function(event, d) {
      // Just prevent default on cancel
      event.preventDefault();
    })
    .on("mouseenter", function(event, d) {
      // Set hovered cell for scroll-to-zoom
      const parentClass = d3.select(this.parentNode).attr("class");
      parentClass.includes("outer") ? "outer" : 
                      parentClass.includes("middle") ? "middle" : "inner";
      setHoveredCell({ unitId: d.data.unitId});
    })
    .on("mouseleave", function(event, d) {
    });

  pathsEnter.append("title")
    .text(d => d.data.fullText);

  paths.merge(pathsEnter)
    .transition()
    .duration(styles.durations.normal)
    .attrTween("d", arcTween(arcGenerator))
    .style("opacity", d => {
      if (!cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
      return d.data.opacity * baseOpacity;
    });

  paths.exit()
    .transition()
    .duration(styles.durations.normal)
    .style("opacity", 0)
    .remove();

  updateLabels(labelsGroup, pieData, arcGenerator, ringType);
}



function updateLabels(labelsGroup, pieData, arcGenerator, ringType) {
  const labels = labelsGroup.selectAll("text")
    .data(pieData, d => d.data.name);

  const labelsEnter = labels.enter()
    .append("text")
    .attr("class", "cell-label")
    .style("opacity", d => {
      if (d.data.value === 0 || !cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      return d.data.opacity;
    })
    .attr("transform", function(d) {
      // Use the simple text transform function
      return calculateTextTransform(d, arcGenerator);
    })
    .style("text-anchor", "middle")
    .style("dominant-baseline", "central")
    .style("font-family", styles.fonts.family)
    .style("font-size", function(d) {
      const baseSizes = styles.fonts.labels.baseSize;
      return `${ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`;
    })
    .style("font-weight", styles.fonts.labels.weight)
    .style("fill", function(d) {
      const textColors = styles.colors.text;
      if (ringType === "inner") return textColors.inner;
      if (ringType === "outer") return textColors.outer;
      return textColors.middle;
    })
    .style("pointer-events", "none")
    .each(function(d) {
      // Always apply text wrapping on create with up-to-date arc data
      const text = d.data.fullText || d.data.name;
      // Get latest arc data for this cell
      let pieData;
      const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
      if (ringType === "outer") {
        pieData = pie(dataToUse.outer);
        d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      } else if (ringType === "middle") {
        pieData = pie(dataToUse.middle);
        d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
      } else {
        pieData = pie(dataToUse.inner);
        d3.arc().innerRadius(30).outerRadius(centerRadius);
      }
      const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
      const constraints = getTextConstraints(ringType, arcDatum);
      wrapText(d3.select(this), text, constraints);
    });

  labels.merge(labelsEnter)
    .transition()
    .duration(styles.durations.normal)
    .attr("transform", function(d) {
      // Use the simple text transform function
      return calculateTextTransform(d, arcGenerator);
    })
    .style("opacity", d => {
      if (d.data.value === 0 || !cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
        return 0;
      }
      return d.data.opacity;
    })
    .on("end", function(d) {
      // Apply text wrapping after transition completes with up-to-date arc data
      if (d && d.data) {
        const text = d.data.fullText || d.data.name;
        let pieData;
        const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
        if (ringType === "outer") {
          pieData = pie(dataToUse.outer);
          d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        } else if (ringType === "middle") {
          pieData = pie(dataToUse.middle);
          d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
        } else {
          pieData = pie(dataToUse.inner);
          d3.arc().innerRadius(30).outerRadius(centerRadius);
        }
        const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
        const constraints = getTextConstraints(ringType, arcDatum);
        wrapText(d3.select(this), text, constraints);
      }
    });

  labels.exit()
    .transition()
    .duration(styles.durations.normal)
    .style("opacity", 0)
    .remove();
}

// Update all rings helper
function updateAllRings() {
  // Use animation data if in step mode, otherwise use regular data
  const dataToUse = isStepMode && Object.keys(animationData).length > 0 ? animationData : nestedData;
  
  updateRing(outerGroup, outerLabelsGroup, dataToUse.outer, outerArc, "outer", outerColor);
  updateRing(middleGroup, middleLabelsGroup, dataToUse.middle, middleArc, "middle", middleColor);
  updateRing(innerGroup, innerLabelsGroup, dataToUse.inner, innerArc, "inner", innerColor);
}

// ===== ARROW DRAWING FUNCTIONALITY =====

// Create arrow marker definition using utilities
const defs = svg.append("defs");

// Create arrowheads for all the colors we use
arrowUtilities.createArrowheadMarker(defs, "#666", "arrowhead-gray");
arrowUtilities.createArrowheadMarker(defs, "#16a34a", "arrowhead-green");
arrowUtilities.createArrowheadMarker(defs, "#dc2626", "arrowhead-red");
arrowUtilities.createArrowheadMarker(defs, "#8b5cf6", "arrowhead-purple");
arrowUtilities.createArrowheadMarker(defs, "#2563eb", "arrowhead-blue");

// Create arrow group
const arrowsGroup = contentGroup.append("g")
  .attr("class", "arrows-group")
  .style("pointer-events", "none");

// Arrow drawing functions
function getCellCentroid(unitId, ringType = 'middle') {
  // Always use the stable data and arc generators, not animated ones
  const dataToUse = nestedData; // Use stable data, not animationData
  let pieData, arcGenerator;
  
  switch(ringType) {
    case 'outer':
      pieData = pie(dataToUse.outer);
      // Create fresh arc generator with stable radii to avoid animation interference
      arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      break;
    case 'middle':
      pieData = pie(dataToUse.middle);
      // Create fresh arc generator with stable radii to avoid animation interference
      arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
      break;
    case 'inner':
      pieData = pie(dataToUse.inner);
      // Create fresh arc generator with stable radii to avoid animation interference
      arcGenerator = d3.arc().innerRadius(30).outerRadius(centerRadius);
      break;
    default:
      pieData = pie(dataToUse.middle);
      arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
  }
  
  // Find the specific cell data for this unitId
  const cellData = pieData.find(d => d.data.unitId === unitId);
  if (!cellData) return null;
  
  // Use D3's built-in centroid calculation with stable arc generator
  const centroid = arcGenerator.centroid(cellData);
  
  // Calculate the actual radius of the centroid for debugging
  Math.sqrt(centroid[0] * centroid[0] + centroid[1] * centroid[1]);
  

  
  return {
    x: centroid[0],
    y: centroid[1],
    angle: (cellData.startAngle + cellData.endAngle) / 2
  };
}

function drawArrow(from, to, color = "#666", strokeWidth = 2, fromRing = 'middle', toRing = 'middle', delay = 0) {
  const fromPos = getCellCentroid(from, fromRing);
  const toPos = getCellCentroid(to, toRing);
  
  if (!fromPos || !toPos) return;
  
  // Use arrow utilities to calculate path
  const arrowPath = arrowUtilities.calculateArrowPath(fromPos, toPos, 10);
  const arrowheadId = arrowUtilities.getArrowheadId(color);
  
  // Draw the static path (without arrowhead initially)
  const staticPath = arrowsGroup.append("path")
    .attr("d", arrowPath.path)
    .attr("stroke", color)
    .attr("stroke-width", strokeWidth)
    .attr("fill", "none")
    .attr("opacity", 0.3)
    .attr("stroke-dasharray", "3,3");
  
  // Create the animated arrowhead using SVG polygon for proper arrow shape
  const animatedArrowhead = arrowsGroup.append("polygon")
    .attr("points", "0,-3 8,0 0,3")  // Arrow shape pointing right
    .attr("fill", color)
    .attr("opacity", 0);
  
  // Animate the arrowhead along the path using the quadratic curve formula
  animatedArrowhead
    .transition()
    .delay(delay)
    .duration(1500)
    .ease(d3.easeQuadInOut)
    .attrTween("transform", function() {
      return function(t) {
        const point = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, t);
        
        // Calculate the angle for proper arrowhead orientation
        const nextT = Math.min(t + 0.01, 1);
        const nextPoint = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, nextT);
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        
        return `translate(${point.x}, ${point.y}) rotate(${angle})`;
      };
    })
    .attr("opacity", 1)
    .on("start", function() {
      // Make the static path more visible when animation starts
      staticPath.transition().duration(200).attr("opacity", 0.7);
    })
    .on("end", function() {
      // Replace animated arrowhead with final arrow marker
      animatedArrowhead.remove();
      staticPath
        .attr("marker-end", `url(#${arrowheadId})`)
        .attr("stroke-dasharray", "none")
        .transition()
        .duration(300)
        .attr("opacity", 0.7);
    });
}



function clearArrows() {
  arrowsGroup.selectAll("*").remove();
}

function drawAllArrows() {
  clearArrows();
  const connections = parseArrowConnections(arrowConnections, dialecticalData);
  
  connections.forEach((conn, index) => {
    // Use arrow utilities to calculate color
    const color = arrowUtilities.calculateArrowColor(conn.fromRing, conn.toRing, conn.from, conn.to);
    
    // Stagger arrow animations with 300ms delay between each
    const delay = index * 300;
    drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
  });
}

// Step-by-step animation functions
function initializeAnimationData() {
  // Use the same order as dialecticalData for consistent positioning
  const units = Object.keys(dialecticalData);
  animationData = {
    outer: units.map(unit => ({
      name: `${unit} -`,
      unitId: unit,
      value: 0, // Start with 0 for step mode
      opacity: 1,
      fullText: dialecticalData[unit].negative
    })),
    middle: units.map(unit => ({
      name: unit,
      unitId: unit,
      value: 0, // Start with 0 for step mode
      opacity: 1,
      fullText: dialecticalData[unit].statement
    })),
    inner: units.map(unit => ({
      name: `${unit} +`,
      unitId: unit,
      value: 0, // Start with 0 for step mode
      opacity: 1,
      fullText: dialecticalData[unit].positive
    }))
  };
}

// Initialize build steps (generalized for any number of thesis/antithesis pairs)
function initializeBuildStepsLocal() {
  buildSteps = initializeBuildSteps(dialecticalData);
  currentStep = 0;
}

// Reset build state (exact copy from HTML)
function resetBuildState() {
  // Reset all cells to visible in visibility state (for step mode)
  cells.forEach(cell => {
    cellVisibility[cell] = {
      outer: false,  // Red (negative) - hidden initially
      middle: true,  // White (parent) - visible  
      inner: false   // Green (positive) - hidden initially
    };
  });
  
  // Initialize with all values at 0
  initializeAnimationData();
  
  // Initial render with all zeros (will show nothing)
  updateAllRings();
}

// Execute a single build step (exact copy from HTML)
function executeStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= buildSteps.length) return;
  
  const step = buildSteps[stepIndex];
  
  switch (step.type) {
    case 'showWhite':
      // Determine pair ID and which one comes first in build sequence
      const isThesis = step.unitId.startsWith('T');
      const pairId = isThesis ? step.unitId.replace('T', 'A') : step.unitId.replace('A', 'T');
      
      // Find which cell appears first in the build sequence
      const currentCellFirstStep = buildSteps.findIndex(s => s.unitId === step.unitId && s.type === 'showWhite');
      const pairCellFirstStep = buildSteps.findIndex(s => s.unitId === pairId && s.type === 'showWhite');
      const isFirstOfPair = currentCellFirstStep < pairCellFirstStep;
      
      if (isFirstOfPair) {
        // FIRST OF PAIR: Set data for both cells, but hide the second one
        ["outer", "middle", "inner"].forEach(ringType => {
          const dataArray = animationData[ringType];
          // Set both cells' data values
          const currentData = dataArray.find(d => d.unitId === step.unitId);
          const pairData = dataArray.find(d => d.unitId === pairId);
          if (currentData) currentData.value = 1;
          if (pairData) pairData.value = 1;
        });
        
        // Set visibility for both (current visible, pair hidden)
        cellVisibility[step.unitId].outer = true;
        cellVisibility[step.unitId].inner = true;
        cellVisibility[step.unitId].middle = true;
        cellVisibility[pairId].outer = true;
        cellVisibility[pairId].inner = true;
        cellVisibility[pairId].middle = true;
        
        // NOW rotate to center this slice at the top (after data is set up)
        focusPair(step.unitId, styles.durations.stepRotation);
        
        // Update all rings with new data
        changeData("outer", animationData.outer, outerArc);
        changeData("middle", animationData.middle, middleArc);
        changeData("inner", animationData.inner, innerArc);
      
        
        // Hide the pair cells and labels (set data opacity to 0)
        setTimeout(() => {
          // Set pair opacity to 0 in data
          ["outer", "middle", "inner"].forEach(ringType => {
            const dataArray = animationData[ringType];
            const pairData = dataArray.find(d => d.unitId === pairId);
            if (pairData) pairData.opacity = 0;
          });
          
          // Update rings to reflect new opacity
          changeData("outer", animationData.outer, outerArc);
          changeData("middle", animationData.middle, middleArc);
          changeData("inner", animationData.inner, innerArc);
          
          // Hide current cell's green/red segments for later showCell animation
          hideCell(step.unitId, "outer");
          hideCell(step.unitId, "inner");
          
          // Set opacity to 1 after hiding so they're ready for showCell
          setTimeout(() => {
            outerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
            innerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
          }, styles.durations.stepRotation + 50);
        }, 100);
        
      } else {
        // SECOND OF PAIR: Just show the cells (data already set when first was shown)
        // Set opacity to 1 in data
        ["outer", "middle", "inner"].forEach(ringType => {
          const dataArray = animationData[ringType];
          const currentData = dataArray.find(d => d.unitId === step.unitId);
          if (currentData) currentData.opacity = 1;
        });
        
        // NOW rotate to center this slice at the top (after opacity is set)
        focusPair(step.unitId, styles.durations.stepRotation);
        
        // Update rings to reflect new opacity with smooth transition
        changeData("outer", animationData.outer, outerArc);
        changeData("middle", animationData.middle, middleArc);
        changeData("inner", animationData.inner, innerArc);
        
        // Hide green/red segments for later showCell animation
        setTimeout(() => {
          hideCell(step.unitId, "outer");
          hideCell(step.unitId, "inner");
          
          // Set opacity to 1 after hiding so they're ready for showCell
          setTimeout(() => {
            outerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
            innerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
          }, styles.durations.stepRotation + 50);
        }, 100);
      }
      // --- Ensure middle labels use fresh data and arc after step ---
      {
        const latestPieData = pie(animationData.middle);
        const latestArcGen = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
        const currentRotation = getCurrentRotationFromDOM();
        middleLabelsGroup.selectAll("text")
          .data(latestPieData, d => d.data.unitId)
          .attr("transform", function(d) {
            return calculateTextTransform(d, latestArcGen, currentRotation);
          });
      }
      break;
      
    case 'showGreen':
      // Show the inner cell (it should now expand from hidden state with full opacity)
      showCell(step.unitId, "inner");
      break;
      
    case 'showRed':
      // Show the outer cell (it should now expand from hidden state with full opacity)
      showCell(step.unitId, "outer");
      break;
  }
}

// Step animation functions (exact copy from HTML)
function startStepMode() {
  isStepMode = true;
  initializeBuildStepsLocal();
  resetBuildState();
  focusedPair = null;
  resetZoom();
  
  // Hide coordinate system during step mode
  coordinateGroup.style("display", "none");
}

function stepForward() {
  if (!isStepMode || currentStep >= buildSteps.length) return false;
  
  executeStep(currentStep);
  currentStep++;
  return true;
}

function stepBackward() {
  if (!isStepMode || currentStep <= 0) return false;
  
  currentStep--;
  
  // Reset and rebuild up to current step
  resetBuildState();
  for (let i = 0; i < currentStep; i++) {
    executeStep(i);
  }
  return true;
}

function resetToFull() {
  isStepMode = false;
  currentStep = 0;
  animationData = {}; // Clear animation data
  
  // Show all cells
  cells.forEach(cell => {
    cellVisibility[cell] = {
      outer: true,
      middle: true,
      inner: true
    };
  });
  
  // Reset focus and zoom
  focusedPair = null;
  resetZoom();
  
  // Reset wheel rotation to default position
  setRotationDirectly(0);
  
  // Reset opacities and update with full data
  ["outer", "middle", "inner"].forEach(ringType => {
    nestedData[ringType].forEach(item => {
      item.opacity = 1;
    });
  });
  
  updateAllRings();
  
  // Show coordinate system in full mode
  coordinateGroup.style("display", "block");
}

function getCurrentStepInfo() {
  if (!isStepMode) return null;
  
  const totalSteps = buildSteps.length;
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
  
  const step = buildSteps[currentStep - 1];
  const stepTypeMap = {
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

// Initialize - start in full mode
resetToFull();
rotateToSlice("T1");

// Draw initial arrows
//drawAllArrows();

// --- MAKE CHART REACTIVE INITIALLY ---
updateChartValue();

// Return the svg node with exposed methods (Observable pattern)
return Object.assign(svg.node(), {
  focusPair,
  get focusedPair() { return focusedPair; },
  cells,
  resetZoom,
  zoomToCell,
  zoomToSlice,
  rotateToSlice,
  rotate: (angle) => {
    setRotationDirectly(angle);
  },
  // Step animation methods
  startStepMode,
  stepForward,
  stepBackward,
  resetToFull,
  getCurrentStepInfo,
  // Arrow control methods
  drawAllArrows,
  clearArrows,
  drawArrow,
  getCellCentroid
});
})()
)}

function _stepControls(html,$0){return(
(() => {
  const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
    <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 15px; align-items: center;">
      <button id="start" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Start Step Mode</button>
      <button id="prev" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; display: none;" disabled>Previous</button>
      <span id="counter" style="margin: 0 10px; font-weight: bold;">Step 0 of 24</span>
      <button id="next" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Next</button>
      <button id="reset" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show All</button>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <label for="rotation-slider" style="font-weight: bold;">Rotation:</label>
      <input type="range" id="rotation-slider" min="0" max="360" value="0" step="1" 
             style="width: 200px; cursor: pointer;" />
      <span id="rotation-value" style="min-width: 40px; font-family: monospace;">0°</span>
      <button id="rotation-reset" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 12px;">Reset</button>
    </div>
  </div>`;

  const startBtn = container.querySelector('#start');
  // const prevBtn = container.querySelector('#prev'); // Hidden - commenting out
  const nextBtn = container.querySelector('#next');
  const resetBtn = container.querySelector('#reset');
  const counter = container.querySelector('#counter');
  const rotationSlider = container.querySelector('#rotation-slider');
  const rotationValue = container.querySelector('#rotation-value');
  const rotationResetBtn = container.querySelector('#rotation-reset');

  function updateUI() {
    const stepInfo = $0.getCurrentStepInfo();
    
    if (stepInfo) {
      // In step mode
      counter.textContent = `Step ${stepInfo.current} of ${stepInfo.total} (${stepInfo.unit} ${stepInfo.stepType})`;
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

  startBtn.addEventListener('click', () => {
    $0.startStepMode();
    updateUI();
  });

  // prevBtn.addEventListener('click', () => {
  //   viewof chart.stepBackward();
  //   updateUI();
  // }); // Hidden - commenting out

  nextBtn.addEventListener('click', () => {
    $0.stepForward();
    updateUI();
  });

  resetBtn.addEventListener('click', () => {
    $0.resetToFull();
    updateUI();
  });

  // Rotation slider event listeners
  rotationSlider.addEventListener('input', (e) => {
    const degrees = parseInt(e.target.value);
    const radians = (degrees * Math.PI) / 180;
    $0.rotate(radians);
    rotationValue.textContent = `${degrees}°`;
  });

  rotationResetBtn.addEventListener('click', () => {
    rotationSlider.value = 0;
    $0.rotate(0);
    rotationValue.textContent = '0°';
  });

  // Initialize UI
  updateUI();

  // Return the container with a value property for viewof
  container.value = "step-controls";
  return container;
})()
)}

function _focusedSlice(chart)
{ 
  //console.log(`focusedSlice at ntbk level: ${chart.clickedSlice}`); 
  
  return chart.clickedSlice; }


function _topSlice(chart,dialecticalData)
{// Get current rotation
    const currentRotation = chart.currentRotation;
    //console.log(`topSlice current rotation at ntbk level: ${currentRotation}`)
    
    // Calculate which slice is at the top (0 degrees)
    const units = Object.keys(dialecticalData);
    const numSlices = units.length;
    const angleStep = (2 * Math.PI) / numSlices;
    
    // The top position is at 0 degrees (top of wheel)
    // We need to find which slice contains this angle
    const topAngle = 0; // 0 degrees
    const adjustedAngle = topAngle - currentRotation;
    
    // Normalize angle to [0, 2π]
    let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // Find which slice this angle falls into
    const sliceIndex = Math.floor(normalizedAngle / angleStep);
    const topUnitId = units[sliceIndex];
    return topUnitId}


function _topSliceTracker(html,chart,dialecticalData){return(
(() => {
  const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
    <div style="margin-bottom: 10px; font-weight: bold;">Top Slice Tracker</div>
    
    <div id="top-slice-info" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #f9f9f9; min-width: 300px; max-width: 500px;">
      <div id="top-slice-status" style="font-weight: bold; color: #666; margin-bottom: 10px;">Calculating...</div>
      <div id="top-slice-details" style="font-size: 14px; line-height: 1.4; color: #333;"></div>
    </div>
    
    <div style="margin-top: 10px; font-size: 12px; color: #666;">
      Shows the slice currently at the top (0°) position
    </div>
  </div>`;

  const topSliceStatus = container.querySelector('#top-slice-status');
  const topSliceDetails = container.querySelector('#top-slice-details');
  
  function updateTopSliceDisplay() {
    // Get current rotation
    const currentRotation = chart.currentRotation;
    
    // Calculate which slice is at the top (0 degrees)
    const units = Object.keys(dialecticalData);
    const numSlices = units.length;
    const angleStep = (2 * Math.PI) / numSlices;
    
    // The top position is at 0 degrees (top of wheel)
    // We need to find which slice contains this angle
    const topAngle = 0; // 0 degrees
    const adjustedAngle = topAngle - currentRotation;
    
    // Normalize angle to [0, 2π]
    let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // Find which slice this angle falls into
    const sliceIndex = Math.floor(normalizedAngle / angleStep);
    const topUnitId = units[sliceIndex];
    
    if (topUnitId) {
      topSliceStatus.textContent = `Top Slice: ${topUnitId}`;
      topSliceStatus.style.color = '#007bff';
      
      // Get the data for this unit
      const unitData = dialecticalData[topUnitId];
      
      if (unitData) {
        const details = `
          <div style="margin-bottom: 10px;">
            <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${topUnitId}:</div>
            <div style="margin-left: 10px; margin-bottom: 8px;">
              <strong>Statement:</strong> ${unitData.statement}
            </div>
            <div style="margin-left: 10px; margin-bottom: 8px;">
              <strong>Positive:</strong> ${unitData.positive}
            </div>
            <div style="margin-left: 10px;">
              <strong>Negative:</strong> ${unitData.negative}
            </div>
          </div>
          <div style="font-size: 12px; color: #666; margin-top: 10px;">
            Rotation: ${(currentRotation * 180 / Math.PI).toFixed(1)}°
          </div>
        `;
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
  const originalUpdateTopSliceDisplay = updateTopSliceDisplay;
  updateTopSliceDisplay = function() {
    originalUpdateTopSliceDisplay();
    // Also update the exposed topUnitId
    const currentRotation = chart.currentRotation;
    const units = Object.keys(dialecticalData);
    const numSlices = units.length;
    const angleStep = (2 * Math.PI) / numSlices;
    const topAngle = 0;
    const adjustedAngle = topAngle - currentRotation;
    let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const sliceIndex = Math.floor(normalizedAngle / angleStep);
    container.topUnitId = units[sliceIndex] || null;
  };
  
  return container;
})()
)}

function _parseArrowConnections(){return(
(dotScript, dialecticalData) => {
  const connections = [];
  const lines = dotScript.split('\n');
  
  for (let line of lines) {
    // Remove comments and trim
    line = line.split('//')[0].trim();
    if (!line) continue;
    
    // Parse "A -> B" syntax, now supporting + and - suffixes
    const match = line.match(/(\w+[+-]?)\s*->\s*(\w+[+-]?)/);
    if (match) {
      const [, from, to] = match;
      
      // Extract unit ID and ring type
      const parseUnit = (unit) => {
        if (unit.endsWith('+')) {
          const unitId = unit.slice(0, -1);
          return dialecticalData[unitId] ? { unitId, ringType: 'inner' } : null;
        } else if (unit.endsWith('-')) {
          const unitId = unit.slice(0, -1);
          return dialecticalData[unitId] ? { unitId, ringType: 'outer' } : null;
        } else {
          return dialecticalData[unit] ? { unitId: unit, ringType: 'middle' } : null;
        }
      };
      
      const fromParsed = parseUnit(from);
      const toParsed = parseUnit(to);
      
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
  
  return connections;
}
)}

function _dotScriptEditor(html,dialecticalData,arrowConnections,$0,parseArrowConnections){return(
(() => {
  const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
    <div style="margin-bottom: 10px; font-weight: bold;">DOT Script Editor</div>
    
    <!-- DOT Script Editor -->
    <div style="margin-bottom: 10px;">
      <label for="connections-editor" style="font-weight: bold;">Edit Connections (DOT syntax):</label>
    </div>
    <textarea id="connections-editor" style="width: 400px; height: 150px; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;"></textarea>
    <div style="margin-top: 10px;">
      <button id="update-connections" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #007bff; color: white; cursor: pointer;">Update Arrows</button>
    </div>
    <div style="margin-top: 15px; font-size: 12px; color: #666; max-width: 400px;">
      <strong>Syntax:</strong> Use "A -> B" format. Available units: ${Object.keys(dialecticalData).join(', ')}<br/>
      <strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>
      <strong>Colors:</strong> 🔴Red for oppositions, 🔵Blue for same type, 🟢Green for same polarity, 🟣Purple for mixed
    </div>
  </div>`;

  const editor = container.querySelector('#connections-editor');
  const updateBtn = container.querySelector('#update-connections');
  
  // Initialize editor with current connections
  editor.value = arrowConnections;
  
  // Function to draw arrows from custom connections
  function drawCustomArrows(customConnections) {
    $0.clearArrows();
    const connections = parseArrowConnections(customConnections, dialecticalData);
    
    connections.forEach((conn, index) => {
      // Calculate color (same logic as drawAllArrows)
      let color = "#666";
      if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
        if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
            (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
          color = "#16a34a"; // Green for same polarity
        } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                   (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
          color = "#dc2626"; // Red for opposite polarity
        } else {
          color = "#8b5cf6"; // Purple for mixed connections
        }
      } else {
        const fromIsThesis = conn.from.startsWith('T');
        const toIsThesis = conn.to.startsWith('T');
        if (fromIsThesis === toIsThesis) {
          color = "#2563eb"; // Blue for same type
        } else {
          color = "#dc2626"; // Red for opposition
        }
      }
      
      const delay = index * 300;
      $0.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
    });
  }
  
  updateBtn.addEventListener('click', () => {
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
})()
)}

function _arrowConnections(){return(
`
  
  T3 -> T1  // Democratization enables job creation
  A3 -> A1  // Concentration leads to unemployment

  T2- -> T1+
  
  // Positive/Negative specific connections
  T1+ -> T2+  // Positive aspects reinforce each other
  T1- -> A1-  // Negative concerns align
  A3- -> T1-  // Concentration risks vs job creation risks
  T3+ -> A1+  // Democratization benefits vs unemployment benefits
`
)}

function _transformToNestedPieData(){return(
(dialecticalData) => {
  const units = Object.keys(dialecticalData);
  return {
    outer: units.map(unit => ({
      name: `${unit} -`,
      unitId: unit,
      value: 1,
      opacity: 1,
      fullText: dialecticalData[unit].negative
    })),
    middle: units.map(unit => ({
      name: unit,
      unitId: unit,
      value: 1,
      opacity: 1,
      fullText: dialecticalData[unit].statement
    })),
    inner: units.map(unit => ({
      name: `${unit} +`,
      unitId: unit,
      value: 1,
      opacity: 1,
      fullText: dialecticalData[unit].positive
    }))
  };
}
)}

function _wrapText(styles,tryWrapWithLineBreaks,truncateWithEllipses){return(
(textElement, text, constraints) => {
  const { midWidth, maxHeight, ringType, arcData } = constraints;
  // New: also get angle, innerRadius, outerRadius
  const angle = arcData.endAngle - arcData.startAngle;
  let innerRadius, outerRadius;
  if (ringType === "outer") {
    innerRadius = styles.radii.middleOuter;
    outerRadius = styles.radii.outer;
  } else if (ringType === "middle") {
    innerRadius = styles.radii.middleInner;
    outerRadius = styles.radii.middleOuter;
  } else {
    innerRadius = styles.radii.hub;
    outerRadius = styles.radii.middleInner;
  }

  // Clear any existing content
  textElement.selectAll("tspan").remove();
  textElement.text("");

  // Step 1: Try natural line breaks with original font size
  let result = tryWrapWithLineBreaks(
    textElement, text, maxHeight, angle, innerRadius, outerRadius
  );
  if (result.success) {
    return result;
  }

  // Step 2: Try font resizing (reduce font size progressively)
  const originalFontSize = parseFloat(textElement.style("font-size"));
  const minFontSize = Math.max(4, originalFontSize * 0.5); // Don't go below 4px or 50% of original
  for (let fontSize = originalFontSize * 0.9; fontSize >= minFontSize; fontSize -= 0.5) {
    textElement.style("font-size", fontSize + "px");
    textElement.selectAll("tspan").remove();
    textElement.text("");
    result = tryWrapWithLineBreaks(
      textElement, text, maxHeight, angle, innerRadius, outerRadius
    );
    if (result.success) {
      return result;
    }
  }

  // Step 3: Truncate with ellipses at minimum font size (fallback: use outermost arc length)
  textElement.style("font-size", minFontSize + "px");
  textElement.selectAll("tspan").remove();
  textElement.text("");
  const maxWidth = angle * ((innerRadius + outerRadius) / 2) * 0.85;
  return truncateWithEllipses(textElement, text, maxWidth, maxHeight, false);
}
)}

function _tryWrapWithLineBreaks(){return(
(textElement, text, maxHeight, angle, innerRadius, outerRadius) => {
  const fontSize = parseFloat(textElement.style("font-size"));
  const lineHeight = fontSize * 1.2;
  const maxLines = Math.floor(maxHeight / lineHeight);
  if (maxLines < 1) {
    return { success: false };
  }
  const words = text.split(/\s+/);
  let lines = [];
  let currentLine = [];
  // Create a temporary tspan to measure text
  const tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
  let lineIdx = 0;
  // Calculate margin factor proportional to inner/outer radius
  const margin = (innerRadius / outerRadius);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = [...currentLine, word];
    // Calculate the radius for this line (outermost for first line, then inward)
    let radius = outerRadius - (lineIdx + 0.5) * lineHeight;
    if (radius < innerRadius) radius = innerRadius;
    // Chord length at this radius
    const chordLen = 2 * radius * Math.sin(angle / 2) * margin;
    tempTspan.text(testLine.join(" "));
    if (tempTspan.node().getComputedTextLength() > chordLen && currentLine.length > 0) {
      // Current line is full, start a new line
      lines.push(currentLine.join(" "));
      currentLine = [word];
      lineIdx++;
      if (lines.length >= maxLines) {
        tempTspan.remove();
        return { success: false };
      }
    } else {
      currentLine.push(word);
    }
  }
  // Add the last line if there are remaining words
  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }
  tempTspan.remove();
  if (lines.length > maxLines) {
    return { success: false };
  }
  // Calculate total text height for centering
  const totalHeight = lines.length * lineHeight;
  const offsetY = -(totalHeight - lineHeight) / 2; // Center the text block
  // Create the actual tspans with proper centering and per-line width
  lines.forEach((line, index) => {
    textElement.append("tspan")
      .attr("x", 0)
      .attr("dy", index === 0 ? offsetY : lineHeight)
      .text(line);
    // Optionally, set a data attribute for debugging: tspan.attr("data-chordwidth", chordLen);
  });
  return { success: true, lines: lines.length, fontSize: fontSize, totalHeight: totalHeight };
}
)}

function _truncateWithEllipses(){return(
(textElement, text, maxWidth, maxHeight, isNarrowCell) => {
  const fontSize = parseFloat(textElement.style("font-size"));
  const lineHeight = fontSize * 1.2;
  const maxLines = Math.floor(maxHeight / lineHeight);
  
  if (maxLines < 1) {
    // If we can't fit even one line, just show the first few characters
    const tspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
    let truncated = "";
    for (let i = 0; i < text.length; i++) {
      const testText = text.substring(0, i + 1) + "...";
      tspan.text(testText);
      if (tspan.node().getComputedTextLength() > maxWidth) {
        break;
      }
      truncated = testText;
    }
    tspan.text(truncated || "...");
    return { success: true, truncated: true, totalHeight: fontSize * 1.2 };
  }
  
  const words = text.split(/\s+/);
  let lines = [];
  let currentLine = [];
  
  const tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = [...currentLine, word];
    const isLastPossibleLine = lines.length === maxLines - 1;
    const testText = isLastPossibleLine ? testLine.join(" ") + "..." : testLine.join(" ");
    
    tempTspan.text(testText);
    
    if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 0) {
      // Current line is full
      if (lines.length >= maxLines - 1) {
        // This is the last line we can fit, add ellipses
        const finalLine = currentLine.join(" ") + "...";
        tempTspan.text(finalLine);
        if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 1) {
          // Even with ellipses it's too long, remove words until it fits
          while (currentLine.length > 1) {
            currentLine.pop();
            const shorterLine = currentLine.join(" ") + "...";
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
  const totalHeight = lines.length * lineHeight;
  const offsetY = -(totalHeight - lineHeight) / 2; // Center the text block
  
  // Create the actual tspans with proper centering
  lines.forEach((line, index) => {
    textElement.append("tspan")
      .attr("x", 0)
      .attr("dy", index === 0 ? offsetY : lineHeight)
      .text(line);
  });
  
  return { success: true, lines: lines.length, truncated: lines.some(line => line.includes("...")), totalHeight: totalHeight };
}
)}

function _getTextConstraints(styles){return(
(ringType, arcData) => {
  const angle = arcData.endAngle - arcData.startAngle;
  
  // Calculate actual ring dimensions
  let innerRadius, outerRadius;
  if (ringType === "outer") {
    innerRadius = styles.radii.middleOuter; // innerRadius
    outerRadius = styles.radii.outer; // outerRadius
  } else if (ringType === "middle") {
    innerRadius = styles.radii.middleInner; // innerInnerRadius  
    outerRadius = styles.radii.middleOuter; // middleRadius
  } else { // inner
    innerRadius = styles.radii.hub;  // inner hole radius
    outerRadius = styles.radii.middleInner; // centerRadius
  }
  
  // Calculate available radial space (height)
  const radialSpace = outerRadius - innerRadius;
  const maxHeight = radialSpace * 0.8; // Use 80% of radial space for safety margin
  
  // Calculate available angular space (width) at the middle radius
  const middleRadius = (innerRadius + outerRadius) / 2;
  const arcLength = middleRadius * angle;
  const maxWidth = arcLength * 0.85; // Use 85% of arc length for safety margin
  
  // Ensure minimum readable dimensions
  const minWidth = 30;
  const minHeight = 20;
  
  return {
    maxWidth: Math.max(maxWidth, minWidth),
    maxHeight: Math.max(maxHeight, minHeight),
    ringType: ringType,
    arcData: arcData,
    // Additional info for debugging
    cellAngle: angle,
    cellAngleDegrees: (angle * 180) / Math.PI,
    radialSpace: radialSpace,
    arcLength: arcLength
  };
}
)}

function _arrowUtilities(){return(
(() => {
  // Quadratic curve point calculation
  function getPointAlongQuadraticCurve(start, control, end, t) {
    const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control.x + Math.pow(t, 2) * end.x;
    const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control.y + Math.pow(t, 2) * end.y;
    return { x, y };
  }
  
  // Create arrowhead marker for a specific color
  function createArrowheadMarker(defs, color, id) {
    defs.append("marker")
      .attr("id", id)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", color);
  }
  
  // Get the appropriate arrowhead marker ID for a color
  function getArrowheadId(color) {
    switch(color) {
      case "#16a34a": return "arrowhead-green";
      case "#dc2626": return "arrowhead-red";
      case "#8b5cf6": return "arrowhead-purple";
      case "#2563eb": return "arrowhead-blue";
      default: return "arrowhead-gray";
    }
  }
  
  // Calculate arrow color based on connection type
  function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
    let color = "#666"; // Default gray
    
    // Check if it's a ring-specific connection
    if (fromRing !== 'middle' || toRing !== 'middle') {
      // Ring-specific connections get special colors
      if ((fromRing === 'inner' && toRing === 'inner') || 
          (fromRing === 'outer' && toRing === 'outer')) {
        color = "#16a34a"; // Green for same polarity (+ to + or - to -)
      } else if ((fromRing === 'inner' && toRing === 'outer') || 
                 (fromRing === 'outer' && toRing === 'inner')) {
        color = "#dc2626"; // Red for opposite polarity (+ to - or - to +)
      } else {
        color = "#8b5cf6"; // Purple for mixed connections (statement to +/-)
      }
    } else {
      // Statement-level connections
      const fromIsThesis = fromUnitId.startsWith('T');
      const toIsThesis = toUnitId.startsWith('T');
      if (fromIsThesis === toIsThesis) {
        color = "#2563eb"; // Blue for same type (thesis-thesis or antithesis-antithesis)
      } else {
        color = "#dc2626"; // Red for opposition (thesis-antithesis)
      }
    }
    
    return color;
  }
  
  // Calculate shortened arrow positions to avoid overlap with cells
  function calculateArrowPath(fromPos, toPos, shortenBy = 10, curvature = null) {
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Shorten the arrow to not overlap with cells
    const fromShortened = {
      x: fromPos.x + (dx / distance) * shortenBy,
      y: fromPos.y + (dy / distance) * shortenBy
    };
    const toShortened = {
      x: toPos.x - (dx / distance) * shortenBy,
      y: toPos.y - (dy / distance) * shortenBy
    };
    
    // Create curved path for better visibility
    const midX = (fromShortened.x + toShortened.x) / 2;
    const midY = (fromShortened.y + toShortened.y) / 2;
    
    // Add curvature based on the perpendicular direction
    const perpX = -dy / distance;
    const perpY = dx / distance;
    const effectiveCurvature = curvature || Math.min(distance * 0.2, 50);
    
    const controlX = midX + perpX * effectiveCurvature;
    const controlY = midY + perpY * effectiveCurvature;
    
    return {
      path: `M ${fromShortened.x} ${fromShortened.y} Q ${controlX} ${controlY} ${toShortened.x} ${toShortened.y}`,
      start: fromShortened,
      control: { x: controlX, y: controlY },
      end: toShortened
    };
  }
  
  return {
    getPointAlongQuadraticCurve,
    createArrowheadMarker,
    getArrowheadId,
    calculateArrowColor,
    calculateArrowPath
  };
})()
)}

function _getPointAlongQuadraticCurve(arrowUtilities){return(
arrowUtilities.getPointAlongQuadraticCurve
)}

function _initializeBuildSteps(){return(
(dialecticalData) => {
  const buildSteps = [];
  
  // Dynamically generate build sequence based on dialecticalData
  const units = Object.keys(dialecticalData);
  const theses = units.filter(unit => unit.startsWith('T')).sort();
  const antitheses = units.filter(unit => unit.startsWith('A')).sort();
  
  // Create pairs by matching thesis/antithesis by number (T1↔A1, T2↔A2, etc.)
  const buildSequence = [];
  const numPairs = Math.min(theses.length, antitheses.length);
  
  for (let i = 0; i < numPairs; i++) {
    const thesis = theses[i];
    const antithesis = antitheses[i];
    buildSequence.push([thesis, antithesis]);
  }
  
  buildSequence.forEach(([thesis, antithesis]) => {
    // Show thesis (T)
    buildSteps.push({
      type: 'showWhite',
      unitId: thesis,
      description: `Show ${thesis} (${dialecticalData[thesis].statement.substring(0, 30)}...)`
    });
    buildSteps.push({
      type: 'showGreen',
      unitId: thesis,
      description: `Show ${thesis} + (${dialecticalData[thesis].positive.substring(0, 30)}...)`
    });
    buildSteps.push({
      type: 'showRed',
      unitId: thesis,
      description: `Show ${thesis} - (${dialecticalData[thesis].negative.substring(0, 30)}...)`
    });
    
    // Show antithesis (A)
    buildSteps.push({
      type: 'showWhite',
      unitId: antithesis,
      description: `Show ${antithesis} (${dialecticalData[antithesis].statement.substring(0, 30)}...)`
    });
    buildSteps.push({
      type: 'showGreen',
      unitId: antithesis,
      description: `Show ${antithesis} + (${dialecticalData[antithesis].positive.substring(0, 30)}...)`
    });
    buildSteps.push({
      type: 'showRed',
      unitId: antithesis,
      description: `Show ${antithesis} - (${dialecticalData[antithesis].negative.substring(0, 30)}...)`
    });
  });
  
  return buildSteps;
}
)}

function _longPressUtilities(d3){return(
(() => {
  // Long press configuration
  const LONG_PRESS_DURATION = 500; // 500ms for long press
  const LONG_PRESS_MOVE_THRESHOLD = 10; // pixels - cancel if finger moves more than this
  
  // Helper function to detect if device supports touch
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  // Create a long press handler factory
  function createLongPressHandler(zoomToCell) {
    // Long press state variables
    let longPressTimer = null;
    let longPressTarget = null;
    let longPressData = null;
    let longPressStartPos = null;
    let isLongPressing = false;
    
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
      d3.select(element)
        .style("stroke", "#ff6b35")
        .style("stroke-width", "3px")
        .style("opacity", "0.8");
      
      // Set timer for long press
      longPressTimer = setTimeout(() => {
        if (longPressTarget && longPressData) {
          console.log('Long press triggered for:', longPressData.data.unitId);
          isLongPressing = true;
          
          // Stronger visual feedback for successful long press
          d3.select(longPressTarget)
            .style("stroke", "#ff3300")
            .style("stroke-width", "4px")
            .transition()
            .duration(150)
            .style("transform", "scale(1.05)")
            .on("end", function() {
              // Trigger zoom after visual feedback
              const mockEvent = {
                stopPropagation: () => {},
                metaKey: true, // Simulate cmd+click for zoom
                currentTarget: longPressTarget
              };
              zoomToCell(mockEvent, longPressData);
              
              // Reset visual state
              d3.select(longPressTarget)
                .style("transform", null)
                .style("stroke", null)
                .style("stroke-width", null)
                .style("opacity", null);
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
        d3.select(longPressTarget)
          .style("stroke", null)
          .style("stroke-width", null)
          .style("opacity", null);
      }
      
      longPressTarget = null;
      longPressData = null;
      longPressStartPos = null;
      isLongPressing = false;
    }
    
    // Check if touch movement should cancel long press
    function checkTouchMovement(event) {
      if (longPressStartPos && event.touches && event.touches.length > 0) {
        const currentPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
        const distance = Math.sqrt(
          Math.pow(currentPos.x - longPressStartPos.x, 2) + 
          Math.pow(currentPos.y - longPressStartPos.y, 2)
        );
        
        // Return true if movement exceeds threshold (should cancel)
        return distance > LONG_PRESS_MOVE_THRESHOLD;
      }
      return true; // Cancel if no proper touch data
    }
    
    return {
      startLongPress,
      clearLongPress,
      checkTouchMovement,
      isTouchDevice,
      get isLongPressing() { return isLongPressing; },
      set isLongPressing(value) { isLongPressing = value; }
    };
  }
  
  return {
    createLongPressHandler,
    isTouchDevice,
    LONG_PRESS_DURATION,
    LONG_PRESS_MOVE_THRESHOLD
  };
})()
)}

function _selectedFont(Inputs){return(
Inputs.select(
  [
    "Source Serif Pro",
    "Source Sans Pro",
    "Alegreya",
    "Inter",
    "Lato",
    "Laila",
    "Merriweather",
    "PT Serif",
    "Roboto Slab",
    "Rubik",
    "Crimson Text",
    "Cascadia Mono",
    "Ubuntu Mono"
  ],
  {
    label: "Desired font",
    // options:,
    value: "Ubuntu Mono"
  }
)
)}

function _parseFont(selectedFont){return(
selectedFont.split(" ").join("+")
)}

function _style(html,parseFont,selectedFont){return(
html`
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${parseFont}:ital@0;1&display=swap">

<style>
  body, svg {
        font-family: '${selectedFont}', serif;
        /* font-size: 48px; */
 }
</style>
`
)}

function _fontCDN(parseFont){return(
`https://fonts.googleapis.com/css2?family=${parseFont}:ital@0;1&display=swap`
)}

function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("dialecticalData")).define("dialecticalData", _dialecticalData);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("styles")).define("styles", _styles);
  main.variable(observer("arrowControls")).define("arrowControls", ["html","parseArrowConnections","arrowConnections","dialecticalData","viewof chart","d3"], _arrowControls);
  main.variable(observer("viewof chart")).define("viewof chart", ["styles","d3","dialecticalData","transformToNestedPieData","getTextConstraints","wrapText","arrowUtilities","parseArrowConnections","arrowConnections","initializeBuildSteps"], _chart);
  main.variable(observer("chart")).define("chart", ["Generators", "viewof chart"], (G, _) => G.input(_));
  main.variable(observer("stepControls")).define("stepControls", ["html","viewof chart"], _stepControls);
  main.variable(observer("focusedSlice")).define("focusedSlice", ["chart"], _focusedSlice);
  main.variable(observer("topSlice")).define("topSlice", ["chart","dialecticalData"], _topSlice);
  main.variable(observer("topSliceTracker")).define("topSliceTracker", ["html","chart","dialecticalData"], _topSliceTracker);
  main.variable(observer("parseArrowConnections")).define("parseArrowConnections", _parseArrowConnections);
  main.variable(observer("dotScriptEditor")).define("dotScriptEditor", ["html","dialecticalData","arrowConnections","viewof chart","parseArrowConnections"], _dotScriptEditor);
  main.variable(observer("arrowConnections")).define("arrowConnections", _arrowConnections);
  main.variable(observer("transformToNestedPieData")).define("transformToNestedPieData", _transformToNestedPieData);
  main.variable(observer("wrapText")).define("wrapText", ["styles","tryWrapWithLineBreaks","truncateWithEllipses"], _wrapText);
  main.variable(observer("tryWrapWithLineBreaks")).define("tryWrapWithLineBreaks", _tryWrapWithLineBreaks);
  main.variable(observer("truncateWithEllipses")).define("truncateWithEllipses", _truncateWithEllipses);
  main.variable(observer("getTextConstraints")).define("getTextConstraints", ["styles"], _getTextConstraints);
  main.variable(observer("arrowUtilities")).define("arrowUtilities", _arrowUtilities);
  main.variable(observer("getPointAlongQuadraticCurve")).define("getPointAlongQuadraticCurve", ["arrowUtilities"], _getPointAlongQuadraticCurve);
  main.variable(observer("initializeBuildSteps")).define("initializeBuildSteps", _initializeBuildSteps);
  main.variable(observer("longPressUtilities")).define("longPressUtilities", ["d3"], _longPressUtilities);
  main.variable(observer("viewof selectedFont")).define("viewof selectedFont", ["Inputs"], _selectedFont);
  main.variable(observer("selectedFont")).define("selectedFont", ["Generators", "viewof selectedFont"], (G, _) => G.input(_));
  main.variable(observer("parseFont")).define("parseFont", ["selectedFont"], _parseFont);
  main.variable(observer("style")).define("style", ["html","parseFont","selectedFont"], _style);
  main.variable(observer("fontCDN")).define("fontCDN", ["parseFont"], _fontCDN);
  return main;
}

function DialecticalWheel(_ref) {
  var dialecticalData = _ref.dialecticalData,
    _ref$arrowConnections = _ref.arrowConnections,
    arrowConnections = _ref$arrowConnections === void 0 ? '' : _ref$arrowConnections,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    onChartReady = _ref.onChartReady,
    onTopSliceChange = _ref.onTopSliceChange,
    onFocusedSliceChange = _ref.onFocusedSliceChange,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug;
  var chartRef = React.useRef(null);
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    module = _useState2[0],
    setModule = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2);
    _useState4[0];
    var setChart = _useState4[1];
  var _useState5 = React.useState(null),
    _useState6 = _slicedToArray(_useState5, 2);
    _useState6[0];
    var setRuntime = _useState6[1];
  React.useEffect(function () {
    console.log('Loading Observable notebook from local npm package...');
    var runtime = new Runtime();
    setRuntime(runtime);
    var main = runtime.module(define, function (name) {
      if (name === 'viewof chart') {
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
              return _superPropGet(_class, "fulfilled", this)([value]);
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
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });
    setModule(main);
    return function () {
      setModule(null);
      setChart(null);
      setRuntime(null);
      runtime.dispose();
    };
  }, []);
  // Separate useEffect for redefining data - this follows the Observable examples pattern
  React.useEffect(function () {
    if (module) {
      try {
        module.redefine('dialecticalData', dialecticalData);
        module.redefine('arrowConnections', arrowConnections);
      } catch (error) {
        console.warn('Could not redefine variables in notebook:', error);
      }
    }
  }, [dialecticalData, arrowConnections, module]);
  return jsxRuntime.jsxs("div", {
    className: "dialectical-wheel-wrapper",
    children: [jsxRuntime.jsx("div", {
      ref: chartRef,
      className: "chart-container",
      style: _objectSpread2({
        borderRadius: '8px',
        background: 'white'
      }, style)
    }), debug && jsxRuntime.jsxs("div", {
      style: {
        marginTop: '10px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      },
      children: ["Debug: ", Object.keys(dialecticalData).length, " entries passed: ", Object.keys(dialecticalData).join(', '), jsxRuntime.jsx("br", {}), "Using local npm package: @dialexity/dialectical-wheel"]
    })]
  });
}

var ExploreComponent = function ExploreComponent(_ref) {
  var _currentApiCycle$rawS;
  var userMessage = _ref.userMessage,
    wisdomUnits = _ref.wisdomUnits,
    currentApiCycle = _ref.currentApiCycle,
    onEdit = _ref.onEdit;
  var _useState = React.useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    currentUnitIndex = _useState2[0],
    setCurrentUnitIndex = _useState2[1];
  var currentUnit = wisdomUnits[currentUnitIndex];
  var handlePrevious = function handlePrevious() {
    setCurrentUnitIndex(function (prev) {
      return prev > 0 ? prev - 1 : wisdomUnits.length - 1;
    });
  };
  var handleNext = function handleNext() {
    setCurrentUnitIndex(function (prev) {
      return prev < wisdomUnits.length - 1 ? prev + 1 : 0;
    });
  };
  var getComponentCards = function getComponentCards(unit) {
    var _unit$t, _unit$tPlus, _unit$tMinus, _unit$a, _unit$aPlus, _unit$aMinus;
    var cards = [];

    // THESIS components (green)

    if ((_unit$t = unit.t) !== null && _unit$t !== void 0 && _unit$t.statement) {
      cards.push({
        id: 't',
        text: unit.t.statement,
        label: 'THESIS',
        color: '#ffffff',
        textColor: '#155724',
        type: 'thesis'
      });
    }
    if ((_unit$tPlus = unit.tPlus) !== null && _unit$tPlus !== void 0 && _unit$tPlus.statement) {
      cards.push({
        id: 'tPlus',
        text: unit.tPlus.statement,
        label: 'GOAL',
        color: '#d4edda',
        textColor: '#155724',
        type: 'thesis'
      });
    }
    if ((_unit$tMinus = unit.tMinus) !== null && _unit$tMinus !== void 0 && _unit$tMinus.statement) {
      cards.push({
        id: 'tMinus',
        text: unit.tMinus.statement,
        label: 'RISK',
        color: '#f8d7da',
        textColor: '#721c24',
        type: 'thesis'
      });
    }

    // ANTITHESIS components (red/orange)

    if ((_unit$a = unit.a) !== null && _unit$a !== void 0 && _unit$a.statement) {
      cards.push({
        id: 'a',
        text: unit.a.statement,
        label: 'ANTITHESIS',
        color: '#ffffff',
        textColor: '#0c5460',
        type: 'antithesis'
      });
    }
    if ((_unit$aPlus = unit.aPlus) !== null && _unit$aPlus !== void 0 && _unit$aPlus.statement) {
      cards.push({
        id: 'aPlus',
        text: unit.aPlus.statement,
        label: 'DUTY',
        color: '#d4edda',
        textColor: '#0c5460',
        type: 'antithesis'
      });
    }
    if ((_unit$aMinus = unit.aMinus) !== null && _unit$aMinus !== void 0 && _unit$aMinus.statement) {
      cards.push({
        id: 'aMinus',
        text: unit.aMinus.statement,
        label: 'DANGER',
        color: '#f8d7da',
        textColor: '#721c24',
        type: 'antithesis'
      });
    }
    return cards;
  };
  if (!currentUnit || wisdomUnits.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '40px 20px',
        textAlign: 'center',
        color: '#6c757d'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '48px',
        marginBottom: '20px'
      }
    }, "\uD83E\uDD14"), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '0 0 10px 0',
        color: '#495057'
      }
    }, "No wisdom units found"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        lineHeight: '1.5'
      }
    }, "Try running a new analysis to explore solutions."));
  }
  var componentCards = getComponentCards(currentUnit);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      minHeight: 'calc(100vh - 80px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      flex: 1
    }
  }, userMessage || 'Exploring Solutions'), /*#__PURE__*/React.createElement("button", {
    onClick: onEdit,
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      padding: '5px',
      color: '#6c757d'
    }
  }, "\u270F\uFE0F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px',
      padding: '10px 15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '2px solid #e9ecef'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrevious,
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      color: '#6c757d',
      borderRadius: '50%'
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#495057',
      marginBottom: '2px'
    }
  }, "Perspective ", currentUnitIndex + 1, " of ", wisdomUnits.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#6c757d'
    }
  }, "Thesis vs Antithesis")), /*#__PURE__*/React.createElement("button", {
    onClick: handleNext,
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      color: '#6c757d',
      borderRadius: '50%'
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }
  }, componentCards.filter(function (card) {
    return card.type === 'thesis';
  }).map(function (card) {
    return /*#__PURE__*/React.createElement("div", {
      key: card.id,
      style: {
        backgroundColor: card.color,
        borderRadius: '8px',
        padding: '15px 20px',
        border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '16px',
        fontWeight: '500',
        color: card.textColor,
        flex: 1,
        lineHeight: '1.4'
      }
    }, card.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '12px',
        fontWeight: '700',
        color: card.textColor,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: '4px 8px',
        borderRadius: '4px',
        marginLeft: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }
    }, card.label));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
      gap: '15px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: '2px',
      background: 'linear-gradient(to right, transparent, #e9ecef, transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#6c757d',
      backgroundColor: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      border: '2px solid #e9ecef'
    }
  }, "VS"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: '2px',
      background: 'linear-gradient(to left, transparent, #e9ecef, transparent)'
    }
  })), componentCards.filter(function (card) {
    return card.type === 'antithesis';
  }).map(function (card) {
    return /*#__PURE__*/React.createElement("div", {
      key: card.id,
      style: {
        backgroundColor: card.color,
        borderRadius: '8px',
        padding: '15px 20px',
        border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '16px',
        fontWeight: '500',
        color: card.textColor,
        flex: 1,
        lineHeight: '1.4'
      }
    }, card.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '12px',
        fontWeight: '700',
        color: card.textColor,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: '4px 8px',
        borderRadius: '4px',
        marginLeft: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }
    }, card.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '30px',
      padding: '20px 0'
    }
  }, wisdomUnits.map(function (_, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      onClick: function onClick() {
        return setCurrentUnitIndex(index);
      },
      style: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: index === currentUnitIndex ? '#17a2b8' : '#e9ecef',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }
    });
  })), currentApiCycle && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #e9ecef'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '8px'
    }
  }, "Optimal Sequence: ", (_currentApiCycle$rawS = currentApiCycle.rawSequence) === null || _currentApiCycle$rawS === void 0 ? void 0 : _currentApiCycle$rawS.join(' → ')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#495057'
    }
  }, "Confidence: ", currentApiCycle ? (currentApiCycle.probability * 100).toFixed(0) + '%' : 'N/A')));
};

// Arrow parsing function (from Observable notebook)
function parseArrowConnections(dotScript, dialecticalData) {
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
      // Parse "A -> B" syntax, supporting + and - suffixes
      var match = line.match(/(\w+[+-]?)\s*->\s*(\w+[+-]?)/);
      if (match) {
        var _match = _slicedToArray(match, 3),
          from = _match[1],
          to = _match[2];
        // Extract unit ID and ring type
        var parseUnit = function parseUnit(unit) {
          if (unit.endsWith('+')) {
            var unitId = unit.slice(0, -1);
            return dialecticalData[unitId] ? {
              unitId: unitId,
              ringType: 'inner'
            } : null;
          } else if (unit.endsWith('-')) {
            var _unitId = unit.slice(0, -1);
            return dialecticalData[_unitId] ? {
              unitId: _unitId,
              ringType: 'outer'
            } : null;
          } else {
            return dialecticalData[unit] ? {
              unitId: unit,
              ringType: 'middle'
            } : null;
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
}
function ArrowControls(_ref) {
  var chart = _ref.chart,
    dialecticalData = _ref.dialecticalData,
    arrowConnections = _ref.arrowConnections,
    setArrowConnections = _ref.setArrowConnections;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    arrowsVisible = _useState2[0],
    setArrowsVisibleState = _useState2[1];
  // Step-by-step arrow state (matching Observable notebook)
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    arrowStepMode = _useState4[0],
    setArrowStepMode = _useState4[1];
  var _useState5 = React.useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    currentArrowStep = _useState6[0],
    setCurrentArrowStep = _useState6[1];
  var _useState7 = React.useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    parsedArrowConnections = _useState8[0],
    setParsedArrowConnections = _useState8[1];
  var _useState9 = React.useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    currentArrowInfo = _useState0[0];
    _useState0[1];
  // Parse connections whenever they change
  React.useEffect(function () {
    if (chart && arrowConnections) {
      var parsed = parseArrowConnections(arrowConnections, dialecticalData);
      setParsedArrowConnections(parsed);
      console.log('Parsed arrow connections:', parsed);
    }
  }, [arrowConnections, dialecticalData, chart]);
  // Update arrow step UI (matching Observable notebook)
  var updateArrowStepUI = function updateArrowStepUI() {
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    var totalArrows = connections.length;
    if (arrowStepMode) {
      console.log("Arrow step ".concat(currentArrowStep, " of ").concat(totalArrows));
    } else {
      console.log("Showing all ".concat(totalArrows, " arrows"));
    }
  };
  React.useEffect(function () {
    updateArrowStepUI();
  }, [arrowStepMode, currentArrowStep, parsedArrowConnections]);
  // Helper function to calculate arrow color based on connection
  var getArrowColor = function getArrowColor(conn) {
    var color = "#666"; // Default gray
    // Check if either endpoint is NOT middle ring (inner/outer ring connections)
    if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
      if (conn.fromRing === 'inner' && conn.toRing === 'inner' || conn.fromRing === 'outer' && conn.toRing === 'outer') {
        color = "#16a34a"; // Green for same polarity
      } else if (conn.fromRing === 'inner' && conn.toRing === 'outer' || conn.fromRing === 'outer' && conn.toRing === 'inner') {
        color = "#dc2626"; // Red for opposite polarity
      } else {
        color = "#8b5cf6"; // Purple for mixed connections (middle to inner/outer)
      }
    } else {
      // Both are middle ring - check thesis vs antithesis
      var fromIsThesis = conn.from.startsWith('T');
      var toIsThesis = conn.to.startsWith('T');
      if (fromIsThesis === toIsThesis) {
        color = "#2563eb"; // Blue for same type (T->T or A->A)
      } else {
        color = "#dc2626"; // Red for opposition (T->A or A->T)
      }
    }
    return color;
  };
  // Draw arrows up to specific step (matching Observable notebook)
  var drawArrowsUpToStep = function drawArrowsUpToStep(step) {
    if (!chart || !chart.clearArrows || !chart.drawArrow) return;
    chart.clearArrows();
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    var connectionsToShow = connections.slice(0, step);
    connectionsToShow.forEach(function (conn, index) {
      var color = getArrowColor(conn);
      var delay = index * 200;
      chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
    });
  };
  // Draw next arrow (matching Observable notebook)
  var drawNextArrow = function drawNextArrow() {
    if (!chart || !chart.drawArrow) return false;
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    if (currentArrowStep >= connections.length) {
      return false; // No more arrows to draw
    }
    var conn = connections[currentArrowStep];
    var color = getArrowColor(conn);
    chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, 0);
    return true;
  };
  // Custom function to draw all arrows based on current connections (replaces chart.drawAllArrows)
  var drawAllCurrentArrows = function drawAllCurrentArrows() {
    if (!chart || !chart.clearArrows || !chart.drawArrow) return;
    chart.clearArrows();
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    console.log('Drawing all current arrows:', connections);
    connections.forEach(function (conn, index) {
      var color = getArrowColor(conn);
      var delay = index * 300;
      chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, delay);
    });
  };
  // Start arrow step mode (matching Observable notebook)
  var handleStartArrowStepMode = function handleStartArrowStepMode() {
    var parsed = parseArrowConnections(arrowConnections, dialecticalData);
    setParsedArrowConnections(parsed);
    setArrowStepMode(true);
    setCurrentArrowStep(0);
    if (chart && chart.clearArrows) {
      chart.clearArrows();
    }
    setArrowsVisibleState(false);
    updateArrowStepUI();
  };
  // Step forward (matching Observable notebook)
  var handleStepForward = function handleStepForward() {
    if (!arrowStepMode) return;
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    if (currentArrowStep < connections.length) {
      var success = drawNextArrow();
      if (success) {
        setCurrentArrowStep(function (prev) {
          return prev + 1;
        });
        updateArrowStepUI();
      }
    }
  };
  // Step backward (matching Observable notebook)
  var handleStepBackward = function handleStepBackward() {
    if (!arrowStepMode) return;
    if (currentArrowStep > 0) {
      var newStep = currentArrowStep - 1;
      setCurrentArrowStep(newStep);
      drawArrowsUpToStep(newStep);
      updateArrowStepUI();
    }
  };
  // Show all arrows (exit step mode)
  var handleShowAllArrows = function handleShowAllArrows() {
    setArrowStepMode(false);
    setCurrentArrowStep(0);
    // Use our custom function instead of chart.drawAllArrows
    drawAllCurrentArrows();
    setArrowsVisibleState(true);
    updateArrowStepUI();
  };
  // Toggle arrows (matching Observable notebook)
  var handleToggleArrows = function handleToggleArrows() {
    if (!chart) return;
    if (arrowsVisible) {
      if (chart.clearArrows) {
        chart.clearArrows();
      }
      setArrowsVisibleState(false);
    } else {
      if (arrowStepMode) {
        drawArrowsUpToStep(currentArrowStep);
      } else {
        // Use our custom function instead of chart.drawAllArrows
        drawAllCurrentArrows();
      }
      setArrowsVisibleState(true);
    }
  };
  // Redraw arrows
  var handleRedrawArrows = function handleRedrawArrows() {
    if (!chart || !arrowsVisible) return;
    if (arrowStepMode) {
      drawArrowsUpToStep(currentArrowStep);
    } else {
      // Use our custom function instead of chart.drawAllArrows
      drawAllCurrentArrows();
    }
  };
  // Update connections (matching Observable notebook)
  var handleUpdateConnections = function handleUpdateConnections() {
    console.log('Update button clicked');
    console.log('Editor value:', arrowConnections);
    // Parse the new connections
    var connections = parseArrowConnections(arrowConnections, dialecticalData);
    setParsedArrowConnections(connections);
    console.log('Parsed connections:', connections);
    if (arrowStepMode) {
      setCurrentArrowStep(0);
      updateArrowStepUI();
      if (arrowsVisible && chart && chart.clearArrows) {
        chart.clearArrows();
      }
    } else {
      // In normal mode, redraw all arrows using the new connections
      if (arrowsVisible) {
        drawAllCurrentArrows();
      }
    }
    setArrowConnections(arrowConnections);
  };
  var getArrowCounterText = function getArrowCounterText() {
    if (arrowStepMode) {
      return "Arrow ".concat(currentArrowStep, " of ").concat(parsedArrowConnections.length);
    }
    return arrowsVisible ? "All Arrows Visible" : "Ready to start";
  };
  return jsxRuntime.jsxs("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: 'white'
    },
    children: [jsxRuntime.jsx("div", {
      style: {
        marginBottom: '10px',
        fontWeight: 'bold'
      },
      children: "Arrow Connections"
    }), jsxRuntime.jsxs("div", {
      style: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
        alignItems: 'center'
      },
      children: [jsxRuntime.jsx("button", {
        onClick: handleToggleArrows,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f8f9fa',
          cursor: 'pointer'
        },
        children: arrowsVisible ? 'Hide Arrows' : 'Show Arrows'
      }), jsxRuntime.jsx("button", {
        onClick: handleRedrawArrows,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f8f9fa',
          cursor: 'pointer'
        },
        children: "Redraw Arrows"
      })]
    }), jsxRuntime.jsxs("div", {
      style: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        background: '#f9f9f9',
        width: '100%',
        maxWidth: '500px'
      },
      children: [jsxRuntime.jsx("div", {
        style: {
          fontWeight: 'bold',
          marginBottom: '10px'
        },
        children: "Step-by-Step Arrow Drawing"
      }), jsxRuntime.jsxs("div", {
        style: {
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        },
        children: [jsxRuntime.jsx("button", {
          onClick: handleStartArrowStepMode,
          disabled: arrowStepMode,
          style: {
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: arrowStepMode ? '#e9ecef' : '#e7f3ff',
            cursor: arrowStepMode ? 'not-allowed' : 'pointer'
          },
          children: "Start Step Mode"
        }), jsxRuntime.jsx("button", {
          onClick: handleStepBackward,
          disabled: !arrowStepMode || currentArrowStep <= 0,
          style: {
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: !arrowStepMode || currentArrowStep <= 0 ? '#e9ecef' : '#f8f9fa',
            cursor: !arrowStepMode || currentArrowStep <= 0 ? 'not-allowed' : 'pointer'
          },
          children: "Previous"
        }), jsxRuntime.jsx("span", {
          style: {
            margin: '0 10px',
            fontWeight: 'bold',
            minWidth: '120px',
            textAlign: 'center'
          },
          children: getArrowCounterText()
        }), jsxRuntime.jsx("button", {
          onClick: handleStepForward,
          disabled: !arrowStepMode || currentArrowStep >= parseArrowConnections(arrowConnections, dialecticalData).length,
          style: {
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: !arrowStepMode || currentArrowStep >= parsedArrowConnections.length ? '#e9ecef' : '#f8f9fa',
            cursor: !arrowStepMode || currentArrowStep >= parsedArrowConnections.length ? 'not-allowed' : 'pointer'
          },
          children: "Next Arrow"
        }), jsxRuntime.jsx("button", {
          onClick: handleShowAllArrows,
          style: {
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#f8f9fa',
            cursor: 'pointer'
          },
          children: "Show All"
        })]
      }), jsxRuntime.jsx("div", {
        style: {
          fontSize: '12px',
          color: '#666',
          minHeight: '20px',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        children: currentArrowInfo
      })]
    }), jsxRuntime.jsxs("div", {
      style: {
        width: '100%',
        maxWidth: '500px'
      },
      children: [jsxRuntime.jsx("div", {
        style: {
          marginBottom: '10px'
        },
        children: jsxRuntime.jsx("label", {
          htmlFor: "connections-editor",
          style: {
            fontWeight: 'bold'
          },
          children: "Edit Connections (DOT syntax):"
        })
      }), jsxRuntime.jsx("textarea", {
        id: "connections-editor",
        value: arrowConnections,
        onChange: function onChange(e) {
          return setArrowConnections(e.target.value);
        },
        style: {
          width: '100%',
          height: '150px',
          fontFamily: 'monospace',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          resize: 'vertical'
        }
      }), jsxRuntime.jsx("div", {
        style: {
          marginTop: '10px'
        },
        children: jsxRuntime.jsx("button", {
          onClick: handleUpdateConnections,
          style: {
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer'
          },
          children: "Update Arrows"
        })
      }), jsxRuntime.jsxs("div", {
        style: {
          marginTop: '15px',
          fontSize: '12px',
          color: '#666',
          maxWidth: '500px'
        },
        children: [jsxRuntime.jsx("strong", {
          children: "Syntax:"
        }), " Use \"A \u2192 B\" format. Available units: ", Object.keys(dialecticalData).join(', '), jsxRuntime.jsx("br", {}), jsxRuntime.jsx("strong", {
          children: "Ring-specific:"
        }), " Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)", jsxRuntime.jsx("br", {}), jsxRuntime.jsx("strong", {
          children: "Colors:"
        }), " \uD83D\uDD34Red for oppositions, \uD83D\uDD35Blue for same type, \uD83D\uDFE2Green for same polarity, \uD83D\uDFE3Purple for mixed"]
      })]
    })]
  });
}

function StepControls(_ref) {
  var chart = _ref.chart;
  var _useState = React.useState({
      isActive: false,
      currentStep: 0,
      totalSteps: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    stepMode = _useState2[0],
    setStepModeState = _useState2[1];
  var _useState3 = React.useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    rotation = _useState4[0],
    setRotationState = _useState4[1];
  React.useEffect(function () {
    if (chart) {
      // Update step info initially
      updateStepInfo();
    }
  }, [chart]);
  var updateStepInfo = function updateStepInfo() {
    if (chart && chart.getCurrentStepInfo) {
      try {
        var info = chart.getCurrentStepInfo();
        if (info) {
          setStepModeState({
            isActive: true,
            currentStep: info.current,
            totalSteps: info.total
          });
        } else {
          setStepModeState({
            isActive: false,
            currentStep: 0,
            totalSteps: 0
          });
        }
      } catch (error) {
        console.error('Error getting step info:', error);
      }
    }
  };
  var handleStartStepMode = function handleStartStepMode() {
    if (chart && chart.startStepMode) {
      try {
        chart.startStepMode();
        updateStepInfo();
      } catch (error) {
        console.error('Error starting step mode:', error);
      }
    }
  };
  var handleStepForward = function handleStepForward() {
    if (chart && chart.stepForward) {
      try {
        chart.stepForward();
        updateStepInfo();
      } catch (error) {
        console.error('Error stepping forward:', error);
      }
    }
  };
  var handleResetToFull = function handleResetToFull() {
    if (chart && chart.resetToFull) {
      try {
        chart.resetToFull();
        updateStepInfo();
      } catch (error) {
        console.error('Error resetting to full:', error);
      }
    }
  };
  var handleRotationChange = function handleRotationChange(e) {
    var degrees = parseInt(e.target.value);
    var radians = degrees * Math.PI / 180;
    setRotationState(degrees);
    if (chart && chart.rotate) {
      try {
        chart.rotate(radians);
      } catch (error) {
        console.error('Error rotating:', error);
      }
    }
  };
  var handleRotationReset = function handleRotationReset() {
    setRotationState(0);
    if (chart && chart.rotate) {
      try {
        chart.rotate(0);
      } catch (error) {
        console.error('Error resetting rotation:', error);
      }
    }
  };
  var getCounterText = function getCounterText() {
    if (stepMode.isActive) {
      return "Step ".concat(stepMode.currentStep, " of ").concat(stepMode.totalSteps);
    }
    return "Full View";
  };
  return jsxRuntime.jsxs("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: 'white'
    },
    children: [jsxRuntime.jsx("h3", {
      style: {
        marginTop: 0
      },
      children: "Step Controls"
    }), jsxRuntime.jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '15px',
        alignItems: 'center'
      },
      children: [jsxRuntime.jsx("button", {
        onClick: handleStartStepMode,
        disabled: stepMode.isActive,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: stepMode.isActive ? '#e9ecef' : '#007bff',
          color: stepMode.isActive ? '#6c757d' : 'white',
          cursor: stepMode.isActive ? 'not-allowed' : 'pointer'
        },
        children: "Start Step Mode"
      }), jsxRuntime.jsx("span", {
        style: {
          margin: '0 10px',
          fontWeight: 'bold'
        },
        children: getCounterText()
      }), jsxRuntime.jsx("button", {
        onClick: handleStepForward,
        disabled: !stepMode.isActive || stepMode.currentStep >= stepMode.totalSteps,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: !stepMode.isActive || stepMode.currentStep >= stepMode.totalSteps ? '#e9ecef' : '#28a745',
          color: !stepMode.isActive || stepMode.currentStep >= stepMode.totalSteps ? '#6c757d' : 'white',
          cursor: !stepMode.isActive || stepMode.currentStep >= stepMode.totalSteps ? 'not-allowed' : 'pointer'
        },
        children: "Next"
      }), jsxRuntime.jsx("button", {
        onClick: handleResetToFull,
        disabled: !stepMode.isActive,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: !stepMode.isActive ? '#e9ecef' : '#dc3545',
          color: !stepMode.isActive ? '#6c757d' : 'white',
          cursor: !stepMode.isActive ? 'not-allowed' : 'pointer'
        },
        children: "Show All"
      })]
    }), jsxRuntime.jsxs("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      },
      children: [jsxRuntime.jsx("label", {
        htmlFor: "rotation-slider",
        style: {
          fontWeight: 'bold'
        },
        children: "Rotation:"
      }), jsxRuntime.jsx("input", {
        type: "range",
        id: "rotation-slider",
        min: "0",
        max: "360",
        value: rotation,
        step: "1",
        onChange: handleRotationChange,
        style: {
          width: '200px',
          cursor: 'pointer'
        }
      }), jsxRuntime.jsxs("span", {
        style: {
          minWidth: '40px',
          fontFamily: 'monospace'
        },
        children: [rotation, "\xB0"]
      }), jsxRuntime.jsx("button", {
        onClick: handleRotationReset,
        style: {
          padding: '4px 8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f8f9fa',
          cursor: 'pointer',
          fontSize: '12px'
        },
        children: "Reset"
      })]
    })]
  });
}

var WHEEL_CONFIG = {
  // Core wheel dimensions
  DIMENSIONS: {
    CENTER_X: 200,
    CENTER_Y: 200,
    RADIUS: 150,
    SLICE_INNER_RADIUS_RATIO: 0.3,
    // Inner radius is 30% of total radius
    SLICE_OUTER_RADIUS_RATIO: 1.0 // Outer radius is 100% of total radius
  },
  // Colors
  COLORS: {
    // Red for antithesis
    // Layer colors (from inner to outer)
    LAYER_COLORS: ['#C6E5B3', '#FFFFFF', '#F9C6CC'],
    // Yellow/gold
    BOUNDARY_LINES: '#888'},
  // Typography
  TYPOGRAPHY: {
    SLICE_LAYERS: [8, 10, 14]},
  // Slice configuration
  SLICES: {
    DEFAULT_ANGLE: 120},
  // Stroke and line properties
  STROKES: {
    BOUNDARY_WIDTH: 1}};
// Export individual sections for convenience
var DIMENSIONS = WHEEL_CONFIG.DIMENSIONS,
  COLORS = WHEEL_CONFIG.COLORS,
  TYPOGRAPHY = WHEEL_CONFIG.TYPOGRAPHY,
  SLICES = WHEEL_CONFIG.SLICES,
  STROKES = WHEEL_CONFIG.STROKES;

// Utility functions
var wrapTextForArc = function wrapTextForArc(text, arcLength, fontSize) {
  if (!text) return [''];
  var avgCharWidth = fontSize * 0.6;
  var maxCharsPerLine = Math.floor(arcLength / avgCharWidth);
  if (text.length <= maxCharsPerLine) {
    return [text];
  }
  var words = text.split(' ');
  var lines = [];
  var currentLine = '';
  var _iterator = _createForOfIteratorHelper(words),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;
      var testLine = currentLine + (currentLine ? ' ' : '') + word;
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word.substring(0, maxCharsPerLine));
          currentLine = word.substring(maxCharsPerLine);
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
  return lines.slice(0, 3); // Max 3 lines
};
var calculateOptimalFontSize = function calculateOptimalFontSize(text, arcLength, maxFontSize) {
  var minFontSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
  if (!text) return maxFontSize;
  var fontSize = maxFontSize;
  while (fontSize >= minFontSize) {
    var avgCharWidth = fontSize * 0.6;
    var maxCharsPerLine = Math.floor(arcLength / avgCharWidth);
    var lines = wrapTextForArc(text, arcLength, fontSize);
    var longestLine = Math.max.apply(Math, _toConsumableArray(lines.map(function (line) {
      return line.length;
    })));
    if (longestLine <= maxCharsPerLine) {
      return fontSize;
    }
    fontSize -= 0.5;
  }
  return minFontSize;
};
var toRadians = function toRadians(deg) {
  return deg * Math.PI / 180;
};
// React component for slice at a specific angle
var SliceAtAngle = function SliceAtAngle(_ref) {
  var sliceData = _ref.sliceData,
    sliceId = _ref.sliceId,
    _ref$angle = _ref.angle,
    angle = _ref$angle === void 0 ? 0 : _ref$angle,
    _ref$cx = _ref.cx,
    cx = _ref$cx === void 0 ? DIMENSIONS.CENTER_X : _ref$cx,
    _ref$cy = _ref.cy,
    cy = _ref$cy === void 0 ? DIMENSIONS.CENTER_Y : _ref$cy,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? DIMENSIONS.RADIUS : _ref$radius,
    _ref$sliceAngle = _ref.sliceAngle,
    sliceAngle = _ref$sliceAngle === void 0 ? SLICES.DEFAULT_ANGLE : _ref$sliceAngle,
    _ref$layerColors = _ref.layerColors,
    layerColors = _ref$layerColors === void 0 ? null : _ref$layerColors,
    _ref$fontSizes = _ref.fontSizes,
    fontSizes = _ref$fontSizes === void 0 ? null : _ref$fontSizes,
    _ref$showBoundaries = _ref.showBoundaries,
    showBoundaries = _ref$showBoundaries === void 0 ? true : _ref$showBoundaries,
    _ref$pairIndex = _ref.pairIndex,
    pairIndex = _ref$pairIndex === void 0 ? null : _ref$pairIndex,
    _ref$sliceType = _ref.sliceType,
    sliceType = _ref$sliceType === void 0 ? null : _ref$sliceType;
    _ref.originalSliceIndex;
  var labels = sliceData.labels;
  var nLabels = labels.length;
  var colors = layerColors || COLORS.LAYER_COLORS;
  var fonts = fontSizes || TYPOGRAPHY.SLICE_LAYERS;
  var halfAngle = sliceAngle / 2;
  // Generate layer elements (rings)
  var layerElements = [];
  for (var layer = 0; layer < nLabels; layer++) {
    var innerRadius = radius * (DIMENSIONS.SLICE_INNER_RADIUS_RATIO + (DIMENSIONS.SLICE_OUTER_RADIUS_RATIO - DIMENSIONS.SLICE_INNER_RADIUS_RATIO) * layer / nLabels);
    var outerRadius = radius * (DIMENSIONS.SLICE_INNER_RADIUS_RATIO + (DIMENSIONS.SLICE_OUTER_RADIUS_RATIO - DIMENSIONS.SLICE_INNER_RADIUS_RATIO) * (layer + 1) / nLabels);
    var color = colors[layer % colors.length];
    var startAngleRad = toRadians(angle - halfAngle);
    var endAngleRad = toRadians(angle + halfAngle);
    var innerX1 = cx + innerRadius * Math.cos(startAngleRad);
    var innerY1 = cy + innerRadius * Math.sin(startAngleRad);
    var innerX2 = cx + innerRadius * Math.cos(endAngleRad);
    var innerY2 = cy + innerRadius * Math.sin(endAngleRad);
    var outerX1 = cx + outerRadius * Math.cos(startAngleRad);
    var outerY1 = cy + outerRadius * Math.sin(startAngleRad);
    var outerX2 = cx + outerRadius * Math.cos(endAngleRad);
    var outerY2 = cy + outerRadius * Math.sin(endAngleRad);
    var largeArc = sliceAngle > 180 ? 1 : 0;
    var pathD = "M ".concat(outerX1, ",").concat(outerY1, " \n                   A ").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArc, ",1 ").concat(outerX2, ",").concat(outerY2, " \n                   L ").concat(innerX2, ",").concat(innerY2, " \n                   A ").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArc, ",0 ").concat(innerX1, ",").concat(innerY1, " Z");
    // Generate node attributes for data
    var layerType = layer === 0 ? 'green' : layer === 1 ? 'white' : 'pink';
    var nodeId = "".concat(sliceId, "-layer-").concat(layer);
    layerElements.push(jsxRuntime.jsx("path", {
      d: pathD,
      fill: color,
      className: "layer-node",
      "data-node-id": nodeId,
      "data-slice-id": sliceId,
      "data-pair-index": pairIndex !== null && pairIndex !== void 0 ? pairIndex : undefined,
      "data-slice-type": sliceType !== null && sliceType !== void 0 ? sliceType : undefined,
      "data-layer-index": layer,
      "data-layer-type": layerType
    }, "".concat(sliceId, "-layer-").concat(layer)));
  }
  // Generate text elements
  var textElements = [];
  var _loop = function _loop(j) {
    var _labels$j = _slicedToArray(labels[j], 2),
      label = _labels$j[0],
      color = _labels$j[1];
    // Calculate radius for this layer with better clearance from edges
    var innerRadius = radius * (0.3 + 0.7 * j / nLabels);
    var outerRadius = radius * (0.3 + 0.7 * (j + 1) / nLabels);
    // Use weighted average closer to inner edge for outer layers to avoid edge proximity
    var clearanceFactor = j === nLabels - 1 ? 0.3 : 0.5; // 30% from inner for outermost, 50% for others
    var textRadius = innerRadius + (outerRadius - innerRadius) * clearanceFactor;
    var maxFontSize = fonts[j % fonts.length];
    // Calculate arc length for this text layer
    var arcLengthRadians = sliceAngle * Math.PI / 180;
    var arcLength = textRadius * arcLengthRadians;
    // Calculate optimal font size
    var optimalFontSize = calculateOptimalFontSize(label, arcLength, maxFontSize);
    // Wrap text if needed
    var wrappedLines = wrapTextForArc(label, arcLength, optimalFontSize);
    // Create arc path for text
    var startAngleRad = toRadians(angle - halfAngle);
    var endAngleRad = toRadians(angle + halfAngle);
    // For multiple lines, adjust radius for each line
    var lineSpacing = optimalFontSize * 1.2;
    var totalHeight = (wrappedLines.length - 1) * lineSpacing;
    var startRadius = textRadius - totalHeight / 2;
    wrappedLines.forEach(function (line, lineIndex) {
      // Reverse line order: first line gets largest radius (farthest from center)
      var currentRadius = startRadius + (wrappedLines.length - 1 - lineIndex) * lineSpacing;
      // Skip if radius is out of bounds
      if (currentRadius < radius * 0.3 || currentRadius > radius) {
        return;
      }
      var arcStartX = cx + currentRadius * Math.cos(startAngleRad);
      var arcStartY = cy + currentRadius * Math.sin(startAngleRad);
      var arcEndX = cx + currentRadius * Math.cos(endAngleRad);
      var arcEndY = cy + currentRadius * Math.sin(endAngleRad);
      var arcId = "".concat(sliceId, "-arc-").concat(j, "-line-").concat(lineIndex);
      var largeArc = sliceAngle > 180 ? 1 : 0;
      var arcPath = "M ".concat(arcStartX, ",").concat(arcStartY, " A ").concat(currentRadius, ",").concat(currentRadius, " 0 ").concat(largeArc, ",1 ").concat(arcEndX, ",").concat(arcEndY);
      textElements.push(jsxRuntime.jsx("defs", {
        children: jsxRuntime.jsx("path", {
          id: arcId,
          d: arcPath,
          fill: "none"
        })
      }, "".concat(arcId, "-def")));
      textElements.push(jsxRuntime.jsx("text", {
        fontSize: optimalFontSize,
        fill: color,
        children: jsxRuntime.jsx("textPath", {
          href: "#".concat(arcId),
          startOffset: "50%",
          textAnchor: "middle",
          children: line
        })
      }, "".concat(arcId, "-text")));
    });
  };
  for (var j = 0; j < labels.length; j++) {
    _loop(j);
  }
  // Generate boundary lines
  var boundaryElements = [];
  if (showBoundaries) {
    var _startAngleRad = toRadians(angle - halfAngle);
    var _endAngleRad = toRadians(angle + halfAngle);
    var boundaryX1 = cx + radius * Math.cos(_startAngleRad);
    var boundaryY1 = cy + radius * Math.sin(_startAngleRad);
    var boundaryX2 = cx + radius * Math.cos(_endAngleRad);
    var boundaryY2 = cy + radius * Math.sin(_endAngleRad);
    boundaryElements.push(jsxRuntime.jsx("line", {
      x1: cx,
      y1: cy,
      x2: boundaryX1,
      y2: boundaryY1,
      stroke: COLORS.BOUNDARY_LINES,
      strokeWidth: STROKES.BOUNDARY_WIDTH
    }, "".concat(sliceId, "-boundary-1")), jsxRuntime.jsx("line", {
      x1: cx,
      y1: cy,
      x2: boundaryX2,
      y2: boundaryY2,
      stroke: COLORS.BOUNDARY_LINES,
      strokeWidth: STROKES.BOUNDARY_WIDTH
    }, "".concat(sliceId, "-boundary-2")));
  }
  return jsxRuntime.jsxs("g", {
    children: [layerElements, boundaryElements, textElements]
  });
};
// Function to generate pair texts from WisdomUnits (for compatibility with existing code)
var generatePairTextsFromWisdomUnits = function generatePairTextsFromWisdomUnits(wisdomUnits) {
  var pairTexts = {};
  wisdomUnits.forEach(function (wu, index) {
    // Generate thesis labels
    var thesisLabels = [];
    if (wu.tPlus && wu.tPlus.statement) thesisLabels.push([wu.tPlus.statement, 'green']);
    if (wu.t && wu.t.statement) thesisLabels.push([wu.t.statement, 'black']);
    if (wu.tMinus && wu.tMinus.statement) thesisLabels.push([wu.tMinus.statement, 'red']);
    // Generate antithesis labels
    var antithesisLabels = [];
    if (wu.aPlus && wu.aPlus.statement) antithesisLabels.push([wu.aPlus.statement, 'green']);
    if (wu.a && wu.a.statement) antithesisLabels.push([wu.a.statement, 'black']);
    if (wu.aMinus && wu.aMinus.statement) antithesisLabels.push([wu.aMinus.statement, 'red']);
    // Only add if we have both sides
    if (thesisLabels.length > 0 && antithesisLabels.length > 0) {
      pairTexts[index] = {
        thesis: thesisLabels,
        antithesis: antithesisLabels
      };
    }
  });
  return pairTexts;
};
// Default pair texts data (moved here to avoid circular dependencies)
var defaultPairTexts = {
  0: {
    thesis: [['Strategic power projection', 'green'], ['Putin initiates war', 'black'], ['Destructive aggression', 'red']],
    antithesis: [['Mutual understanding', 'green'], ['Peace negotiations', 'black'], ['Passive submission', 'red']]
  },
  1: {
    thesis: [['Liberation and sovereignty protected', 'green'], ['Ukraine resists invasion', 'black'], ['Endless conflict and destruction', 'red']],
    antithesis: [['Immediate peace achieved', 'green'], ['Ukraine surrenders to invasion', 'black'], ['Freedom and independence lost', 'red']]
  },
  2: {
    thesis: [['Ukrainian victory approaches', 'green'], ['Russian offensive weakens', 'black'], ['Military resources drain rapidly', 'red']],
    antithesis: [['Strategic military strength maintained', 'green'], ['Russian military dominance persists', 'black'], ['Total defeat inevitable', 'red']]
  },
  3: {
    thesis: [['Freedom restored', 'green'], ['Ukrainian victory approaches', 'black'], ['Vengeance intensifies', 'red']],
    antithesis: [['Stability maintained', 'green'], ['Russian dominance persists', 'black'], ['Oppression deepens', 'red']]
  }
};

// API service for the dialectical wheel API
var WisdomService = /*#__PURE__*/function () {
  function WisdomService() {
    _classCallCheck(this, WisdomService);
  }
  return _createClass(WisdomService, null, [{
    key: "createSession",
    value: // 1. Create a session
    function () {
      var _createSession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userMessage) {
        var baseUrl,
          response,
          data,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              baseUrl = _args.length > 1 && _args[1] !== undefined ? _args[1] : '/api';
              _context.p = 1;
              _context.n = 2;
              return fetch("".concat(baseUrl, "/session"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user_message: userMessage
                })
              });
            case 2:
              response = _context.v;
              if (response.ok) {
                _context.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context.n = 4;
              return response.json();
            case 4:
              data = _context.v;
              console.log('Session created:', data);
              return _context.a(2, data);
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error('Error creating session:', _t);
              throw _t;
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[1, 5]]);
      }));
      function createSession(_x) {
        return _createSession.apply(this, arguments);
      }
      return createSession;
    }() // 2A. Auto-build a wheel
  }, {
    key: "autoBuildWheel",
    value: function () {
      var _autoBuildWheel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sessionId) {
        var numberOfThoughts,
          componentLength,
          baseUrl,
          response,
          data,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              numberOfThoughts = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 3;
              componentLength = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 7;
              baseUrl = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : '/api';
              _context2.p = 1;
              _context2.n = 2;
              return fetch("".concat(baseUrl, "/session/").concat(sessionId, "/wheel/auto"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  number_of_thoughts: numberOfThoughts,
                  component_length: componentLength
                })
              });
            case 2:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context2.n = 4;
              return response.json();
            case 4:
              data = _context2.v;
              console.log('Auto-built wheel:', data);
              return _context2.a(2, data);
            case 5:
              _context2.p = 5;
              _t2 = _context2.v;
              console.error('Error auto-building wheel:', _t2);
              throw _t2;
            case 6:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 5]]);
      }));
      function autoBuildWheel(_x2) {
        return _autoBuildWheel.apply(this, arguments);
      }
      return autoBuildWheel;
    }() // 2B. Manually create a wheel
  }, {
    key: "createWheel",
    value: function () {
      var _createWheel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(sessionId, wisdomUnitsData) {
        var baseUrl,
          response,
          data,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              baseUrl = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '/api';
              _context3.p = 1;
              _context3.n = 2;
              return fetch("".concat(baseUrl, "/session/").concat(sessionId, "/wheel"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  wisdom_units: wisdomUnitsData
                })
              });
            case 2:
              response = _context3.v;
              if (response.ok) {
                _context3.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context3.n = 4;
              return response.json();
            case 4:
              data = _context3.v;
              console.log('Created wheel:', data);
              return _context3.a(2, data);
            case 5:
              _context3.p = 5;
              _t3 = _context3.v;
              console.error('Error creating wheel:', _t3);
              throw _t3;
            case 6:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 5]]);
      }));
      function createWheel(_x3, _x4) {
        return _createWheel.apply(this, arguments);
      }
      return createWheel;
    }() // 3. Get wisdom units of a specific wheel
  }, {
    key: "getWisdomUnits",
    value: function () {
      var _getWisdomUnits = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(sessionId, wheelId) {
        var baseUrl,
          response,
          data,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              baseUrl = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : '/api';
              _context4.p = 1;
              _context4.n = 2;
              return fetch("".concat(baseUrl, "/session/").concat(sessionId, "/wheel/").concat(wheelId, "/wisdom-units"));
            case 2:
              response = _context4.v;
              if (response.ok) {
                _context4.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context4.n = 4;
              return response.json();
            case 4:
              data = _context4.v;
              console.log('Retrieved wisdom units:', data);
              return _context4.a(2, data);
            case 5:
              _context4.p = 5;
              _t4 = _context4.v;
              console.error('Error getting wisdom units:', _t4);
              throw _t4;
            case 6:
              return _context4.a(2);
          }
        }, _callee4, null, [[1, 5]]);
      }));
      function getWisdomUnits(_x5, _x6) {
        return _getWisdomUnits.apply(this, arguments);
      }
      return getWisdomUnits;
    }() // 4. Get wheel cycles with sequences
  }, {
    key: "getWheelCycles",
    value: function () {
      var _getWheelCycles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(sessionId) {
        var baseUrl,
          response,
          data,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              baseUrl = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '/api';
              _context5.p = 1;
              _context5.n = 2;
              return fetch("".concat(baseUrl, "/session/").concat(sessionId, "/wheels/cycles/structured"));
            case 2:
              response = _context5.v;
              if (response.ok) {
                _context5.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context5.n = 4;
              return response.json();
            case 4:
              data = _context5.v;
              console.log('Retrieved wheel cycles:', data);
              return _context5.a(2, data);
            case 5:
              _context5.p = 5;
              _t5 = _context5.v;
              console.error('Error getting wheel cycles:', _t5);
              throw _t5;
            case 6:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 5]]);
      }));
      function getWheelCycles(_x7) {
        return _getWheelCycles.apply(this, arguments);
      }
      return getWheelCycles;
    }() // 5. Get session data directly
  }, {
    key: "getSessionData",
    value: function () {
      var _getSessionData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(sessionId) {
        var baseUrl,
          response,
          data,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              baseUrl = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : '/api';
              _context6.p = 1;
              _context6.n = 2;
              return fetch("".concat(baseUrl, "/session/").concat(sessionId));
            case 2:
              response = _context6.v;
              if (response.ok) {
                _context6.n = 3;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 3:
              _context6.n = 4;
              return response.json();
            case 4:
              data = _context6.v;
              console.log('Retrieved session data:', data);
              return _context6.a(2, data);
            case 5:
              _context6.p = 5;
              _t6 = _context6.v;
              console.error('Error getting session data:', _t6);
              throw _t6;
            case 6:
              return _context6.a(2);
          }
        }, _callee6, null, [[1, 5]]);
      }));
      function getSessionData(_x8) {
        return _getSessionData.apply(this, arguments);
      }
      return getSessionData;
    }() // Convert API sequence format to our slice sequence format
  }, {
    key: "convertSequenceToSliceSequence",
    value: function convertSequenceToSliceSequence(apiSequence) {
      // API provides first half of sequence like ["T1", "A2", "T3"] 
      // DialecticalWheel will auto-generate opposites: ["A1", "T2", "A3"]

      return apiSequence.map(function (item) {
        var type = item.startsWith('T') ? 'thesis' : 'antithesis';
        var pairNumber = parseInt(item.slice(1)) - 1; // Convert T1->0, T2->1, A1->0, etc.

        return {
          pair: pairNumber,
          type: type
        };
      });
    }

    // Get the highest probability cycle sequence
  }, {
    key: "getBestCycleSequence",
    value: function getBestCycleSequence(cyclesData) {
      if (!cyclesData.cycles || cyclesData.cycles.length === 0) {
        return null;
      }

      // Find cycle with highest probability
      var bestCycle = cyclesData.cycles.reduce(function (best, current) {
        return current.probability > best.probability ? current : best;
      });

      // Extract first half from the complete sequence
      // If API gives ["T1", "A2", "T3", "A1", "T2", "A3"], take first 3: ["T1", "A2", "T3"]
      var firstHalf = bestCycle.sequence.slice(0, bestCycle.sequence.length / 2);
      return {
        sequence: this.convertSequenceToSliceSequence(firstHalf),
        probability: bestCycle.probability,
        causality_direction: bestCycle.causality_direction,
        reasoning: bestCycle.reasoning,
        argumentation: bestCycle.argumentation,
        concepts: bestCycle.concepts,
        rawSequence: bestCycle.sequence,
        // Keep full sequence for display
        firstHalf: firstHalf // Keep first half for debugging
      };
    }

    /**
     * Transform API wisdom units to our internal format
     * Now properly handles flipped wisdom units based on alias patterns
     */
  }, {
    key: "transformApiWisdomUnits",
    value: function transformApiWisdomUnits(apiWisdomUnits) {
      return apiWisdomUnits.map(function (unit, index) {
        // Detect if this wisdom unit is flipped by checking aliases
        // Normal: t_minus has T alias, a_minus has A alias
        // Flipped: t_minus has A alias, a_minus has T alias
        var isFlipped = unit.t_minus.alias && unit.t_minus.alias.startsWith('A');
        if (isFlipped) {
          // Wisdom unit is flipped - thesis and antithesis are swapped
          return {
            tPlus: {
              statement: unit.a_plus.statement
            },
            t: {
              statement: unit.a.statement
            },
            tMinus: {
              statement: unit.a_minus.statement
            },
            aPlus: {
              statement: unit.t_plus.statement
            },
            a: {
              statement: unit.t.statement
            },
            aMinus: {
              statement: unit.t_minus.statement
            }
          };
        } else {
          // Normal wisdom unit orientation
          return {
            tPlus: {
              statement: unit.t_plus.statement
            },
            t: {
              statement: unit.t.statement
            },
            tMinus: {
              statement: unit.t_minus.statement
            },
            aPlus: {
              statement: unit.a_plus.statement
            },
            a: {
              statement: unit.a.statement
            },
            aMinus: {
              statement: unit.a_minus.statement
            }
          };
        }
      });
    }

    // Complete workflow: Create session + auto-build wheel + get wisdom units
  }, {
    key: "createSessionAndAutoBuildWheel",
    value: function () {
      var _createSessionAndAutoBuildWheel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userMessage) {
        var _this = this;
        var numberOfThoughts,
          componentLength,
          baseUrl,
          _wheelData$wheels,
          sessionData,
          sessionId,
          wheelData,
          allWheels,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              numberOfThoughts = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 3;
              componentLength = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 7;
              baseUrl = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : '/api';
              _context7.p = 1;
              _context7.n = 2;
              return this.createSession(userMessage, baseUrl);
            case 2:
              sessionData = _context7.v;
              sessionId = sessionData.session_id; // Step 2: Auto-build wheel
              _context7.n = 3;
              return this.autoBuildWheel(sessionId, numberOfThoughts, componentLength, baseUrl);
            case 3:
              wheelData = _context7.v;
              console.log('DEBUG: Raw wheel data received:', wheelData);
              console.log('DEBUG: Number of wheels in response:', ((_wheelData$wheels = wheelData.wheels) === null || _wheelData$wheels === void 0 ? void 0 : _wheelData$wheels.length) || 0);

              // Return all wheels instead of just the first one
              if (!(wheelData.wheels && wheelData.wheels.length > 0)) {
                _context7.n = 4;
                break;
              }
              allWheels = wheelData.wheels.map(function (wheel, index) {
                console.log("DEBUG: Processing wheel ".concat(index + 1, ":"), wheel);
                var transformedUnits = _this.transformApiWisdomUnits(wheel.wisdom_units);
                console.log("DEBUG: Transformed wisdom units for wheel ".concat(index + 1, ":"), transformedUnits);
                return {
                  wheelId: index,
                  wisdomUnits: transformedUnits,
                  rawWisdomUnits: wheel.wisdom_units
                };
              });
              console.log('DEBUG: All processed wheels:', allWheels);
              return _context7.a(2, {
                sessionId: sessionId,
                wheels: allWheels,
                selectedWheelIndex: 0,
                // Default to first wheel
                rawData: wheelData
              });
            case 4:
              throw new Error('No wheels returned from auto-build');
            case 5:
              _context7.n = 7;
              break;
            case 6:
              _context7.p = 6;
              _t7 = _context7.v;
              console.error('Error in complete workflow:', _t7);
              throw _t7;
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 6]]);
      }));
      function createSessionAndAutoBuildWheel(_x9) {
        return _createSessionAndAutoBuildWheel.apply(this, arguments);
      }
      return createSessionAndAutoBuildWheel;
    }() // Complete workflow with cycles: Create session + auto-build wheel + get wisdom units + get cycles
  }, {
    key: "createSessionAndAutoBuildWheelWithCycles",
    value: function () {
      var _createSessionAndAutoBuildWheelWithCycles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userMessage) {
        var _this2 = this;
        var numberOfThoughts,
          componentLength,
          baseUrl,
          sessionData,
          sessionId,
          wheelData,
          cyclesData,
          bestCycle,
          allWheels,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              numberOfThoughts = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 3;
              componentLength = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 7;
              baseUrl = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : '/api';
              _context8.p = 1;
              _context8.n = 2;
              return this.createSession(userMessage, baseUrl);
            case 2:
              sessionData = _context8.v;
              sessionId = sessionData.session_id; // Step 2: Auto-build wheel
              _context8.n = 3;
              return this.autoBuildWheel(sessionId, numberOfThoughts, componentLength, baseUrl);
            case 3:
              wheelData = _context8.v;
              _context8.n = 4;
              return this.getWheelCycles(sessionId, baseUrl);
            case 4:
              cyclesData = _context8.v;
              bestCycle = this.getBestCycleSequence(cyclesData); // Return all wheels instead of just the first one
              if (!(wheelData.wheels && wheelData.wheels.length > 0)) {
                _context8.n = 5;
                break;
              }
              allWheels = wheelData.wheels.map(function (wheel, index) {
                return {
                  wheelId: index,
                  wisdomUnits: _this2.transformApiWisdomUnits(wheel.wisdom_units),
                  rawWisdomUnits: wheel.wisdom_units
                };
              });
              return _context8.a(2, {
                sessionId: sessionId,
                wheels: allWheels,
                selectedWheelIndex: 0,
                // Default to first wheel
                sliceSequence: (bestCycle === null || bestCycle === void 0 ? void 0 : bestCycle.sequence) || null,
                cycles: cyclesData,
                bestCycle: bestCycle,
                rawData: wheelData
              });
            case 5:
              throw new Error('No wheels returned from auto-build');
            case 6:
              _context8.n = 8;
              break;
            case 7:
              _context8.p = 7;
              _t8 = _context8.v;
              console.error('Error in complete workflow with cycles:', _t8);
              throw _t8;
            case 8:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 7]]);
      }));
      function createSessionAndAutoBuildWheelWithCycles(_x0) {
        return _createSessionAndAutoBuildWheelWithCycles.apply(this, arguments);
      }
      return createSessionAndAutoBuildWheelWithCycles;
    }() // Generate slice sequence from wisdom units order (the order IS the sequence)
  }, {
    key: "generateSequenceFromWisdomUnitsOrder",
    value: function generateSequenceFromWisdomUnitsOrder(wisdomUnits) {
      // The order of wisdom units in the array determines the sequence
      // If we have [WU_A, WU_B, WU_C], that means sequence [T1, T2, T3]
      return wisdomUnits.map(function (_, index) {
        return {
          pair: index,
          type: 'thesis' // First half is always thesis, wheel will auto-generate antithesis
        };
      });
    }

    // Get pair texts for React component compatibility
  }, {
    key: "getPairTextsFromWisdomUnits",
    value: function getPairTextsFromWisdomUnits(wisdomUnits) {
      return generatePairTextsFromWisdomUnits(wisdomUnits);
    }

    // Cheaper workflow: Just get existing data from a session (no expensive creation)
  }, {
    key: "getExistingSessionData",
    value: function () {
      var _getExistingSessionData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(sessionId) {
        var _this3 = this;
        var baseUrl,
          _bestCycle,
          sessionData,
          allWheels,
          cycles,
          bestCycle,
          _cycles,
          _args9 = arguments,
          _t9,
          _t0;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              baseUrl = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : '/api';
              _context9.p = 1;
              console.log('DEBUG: Getting existing data for session:', sessionId);

              // Single GET call to retrieve all session data
              _context9.n = 2;
              return this.getSessionData(sessionId, baseUrl);
            case 2:
              sessionData = _context9.v;
              if (!(!sessionData.wheels || sessionData.wheels.length === 0)) {
                _context9.n = 3;
                break;
              }
              throw new Error('No wheels found in session data');
            case 3:
              allWheels = sessionData.wheels.map(function (wheel, index) {
                return {
                  wheelId: index,
                  wisdomUnits: _this3.transformApiWisdomUnits(wheel.wisdom_units),
                  rawWisdomUnits: wheel.wisdom_units
                };
              });
              console.log("DEBUG: Found ".concat(allWheels.length, " wheels from session data"));

              // Always fetch cycles explicitly to ensure we have the full data
              cycles = null;
              bestCycle = null;
              _context9.p = 4;
              console.log('DEBUG: Fetching cycles data explicitly for session:', sessionId);
              _context9.n = 5;
              return this.getWheelCycles(sessionId, baseUrl);
            case 5:
              cycles = _context9.v;
              bestCycle = this.getBestCycleSequence(cycles);
              console.log('DEBUG: Successfully retrieved cycles:', ((_cycles = cycles) === null || _cycles === void 0 || (_cycles = _cycles.cycles) === null || _cycles === void 0 ? void 0 : _cycles.length) || 0);
              _context9.n = 7;
              break;
            case 6:
              _context9.p = 6;
              _t9 = _context9.v;
              console.error('Failed to retrieve cycles data:', _t9);
              // Fallback to session data if available
              if (sessionData.cycles) {
                console.log('DEBUG: Using cycles from session data as fallback');
                cycles = sessionData.cycles;
                bestCycle = this.getBestCycleSequence(sessionData.cycles);
              }
            case 7:
              return _context9.a(2, {
                sessionId: sessionId,
                wheels: allWheels,
                selectedWheelIndex: 0,
                sliceSequence: ((_bestCycle = bestCycle) === null || _bestCycle === void 0 ? void 0 : _bestCycle.sequence) || null,
                cycles: cycles,
                bestCycle: bestCycle,
                rawData: {
                  wheels: sessionData.wheels
                }
              });
            case 8:
              _context9.p = 8;
              _t0 = _context9.v;
              console.error('Error getting existing session data:', _t0);
              throw _t0;
            case 9:
              return _context9.a(2);
          }
        }, _callee9, this, [[4, 6], [1, 8]]);
      }));
      function getExistingSessionData(_x1) {
        return _getExistingSessionData.apply(this, arguments);
      }
      return getExistingSessionData;
    }()
  }]);
}();

// React hook for the complete API workflow
function useDialecticalWheel(userMessage) {
  var numberOfThoughts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var componentLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  var baseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/api';
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sessionId = _React$useState2[0],
    setSessionId = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    wheels = _React$useState4[0],
    setWheels = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectedWheelIndex = _React$useState6[0],
    setSelectedWheelIndex = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    loading = _React$useState8[0],
    setLoading = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    error = _React$useState0[0],
    setError = _React$useState0[1];
  var _React$useState1 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    rawData = _React$useState10[0],
    setRawData = _React$useState10[1];
  var createAndBuildWheel = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
    var result, _t1;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          if (userMessage) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2);
        case 1:
          setLoading(true);
          setError(null);
          _context0.p = 2;
          _context0.n = 3;
          return WisdomService.createSessionAndAutoBuildWheel(userMessage, numberOfThoughts, componentLength, baseUrl);
        case 3:
          result = _context0.v;
          setSessionId(result.sessionId);
          setWheels(result.wheels);
          setSelectedWheelIndex(result.selectedWheelIndex);
          setRawData(result.rawData);
          console.log('DEBUG: useDialecticalWheel - wheels set to:', result.wheels);
          console.log('DEBUG: useDialecticalWheel - wheels length:', result.wheels.length);
          _context0.n = 5;
          break;
        case 4:
          _context0.p = 4;
          _t1 = _context0.v;
          setError(_t1.message);
        case 5:
          _context0.p = 5;
          setLoading(false);
          return _context0.f(5);
        case 6:
          return _context0.a(2);
      }
    }, _callee0, null, [[2, 4, 5, 6]]);
  })), [userMessage, numberOfThoughts, componentLength, baseUrl]);

  // Get current wheel data
  var currentWheel = wheels[selectedWheelIndex] || null;
  var wisdomUnits = (currentWheel === null || currentWheel === void 0 ? void 0 : currentWheel.wisdomUnits) || [];
  var pairTexts = currentWheel ? WisdomService.getPairTextsFromWisdomUnits(currentWheel.wisdomUnits) : {};
  return {
    sessionId: sessionId,
    wheels: wheels,
    selectedWheelIndex: selectedWheelIndex,
    setSelectedWheelIndex: setSelectedWheelIndex,
    currentWheel: currentWheel,
    wisdomUnits: wisdomUnits,
    pairTexts: pairTexts,
    loading: loading,
    error: error,
    rawData: rawData,
    refetch: createAndBuildWheel
  };
}

// React hook for the complete API workflow with cycles
function useDialecticalWheelWithCycles(userMessage) {
  var numberOfThoughts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var componentLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  var baseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/api';
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    sessionId = _React$useState12[0],
    setSessionId = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    wheels = _React$useState14[0],
    setWheels = _React$useState14[1];
  var _React$useState15 = React.useState(0),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    selectedWheelIndex = _React$useState16[0],
    setSelectedWheelIndex = _React$useState16[1];
  var _React$useState17 = React.useState(null),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    sliceSequence = _React$useState18[0],
    setSliceSequence = _React$useState18[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    cycles = _React$useState20[0],
    setCycles = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    bestCycle = _React$useState22[0],
    setBestCycle = _React$useState22[1];
  var _React$useState23 = React.useState(false),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    loading = _React$useState24[0],
    setLoading = _React$useState24[1];
  var _React$useState25 = React.useState(null),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    error = _React$useState26[0],
    setError = _React$useState26[1];
  var _React$useState27 = React.useState(null),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    rawData = _React$useState28[0],
    setRawData = _React$useState28[1];
  var createAndBuildWheelWithCycles = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
    var result, _t10;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          if (userMessage) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2);
        case 1:
          setLoading(true);
          setError(null);
          _context1.p = 2;
          _context1.n = 3;
          return WisdomService.createSessionAndAutoBuildWheelWithCycles(userMessage, numberOfThoughts, componentLength, baseUrl);
        case 3:
          result = _context1.v;
          setSessionId(result.sessionId);
          setWheels(result.wheels);
          setSelectedWheelIndex(result.selectedWheelIndex);
          setSliceSequence(result.sliceSequence);
          setCycles(result.cycles);
          setBestCycle(result.bestCycle);
          setRawData(result.rawData);
          console.log('DEBUG: useDialecticalWheelWithCycles - wheels set to:', result.wheels);
          console.log('DEBUG: useDialecticalWheelWithCycles - wheels length:', result.wheels.length);
          _context1.n = 5;
          break;
        case 4:
          _context1.p = 4;
          _t10 = _context1.v;
          setError(_t10.message);
        case 5:
          _context1.p = 5;
          setLoading(false);
          return _context1.f(5);
        case 6:
          return _context1.a(2);
      }
    }, _callee1, null, [[2, 4, 5, 6]]);
  })), [userMessage, numberOfThoughts, componentLength, baseUrl]);
  var getExistingData = React.useCallback(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(existingSessionId) {
      var result, _t11;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            if (existingSessionId) {
              _context10.n = 1;
              break;
            }
            return _context10.a(2);
          case 1:
            setLoading(true);
            setError(null);
            _context10.p = 2;
            _context10.n = 3;
            return WisdomService.getExistingSessionData(existingSessionId, baseUrl);
          case 3:
            result = _context10.v;
            setSessionId(result.sessionId);
            setWheels(result.wheels);
            setSelectedWheelIndex(result.selectedWheelIndex);
            setSliceSequence(result.sliceSequence);
            setCycles(result.cycles);
            setBestCycle(result.bestCycle);
            setRawData(result.rawData);
            console.log('DEBUG: Retrieved existing data - wheels:', result.wheels.length);
            _context10.n = 5;
            break;
          case 4:
            _context10.p = 4;
            _t11 = _context10.v;
            setError(_t11.message);
          case 5:
            _context10.p = 5;
            setLoading(false);
            return _context10.f(5);
          case 6:
            return _context10.a(2);
        }
      }, _callee10, null, [[2, 4, 5, 6]]);
    }));
    return function (_x10) {
      return _ref3.apply(this, arguments);
    };
  }(), [baseUrl]);
  var clearSession = React.useCallback(function () {
    setSessionId(null);
    setWheels([]);
    setSelectedWheelIndex(0);
    setSliceSequence(null);
    setCycles(null);
    setBestCycle(null);
    setRawData(null);
    setError(null);
  }, []);

  // Get current wheel data
  var currentWheel = wheels[selectedWheelIndex] || null;
  var wisdomUnits = (currentWheel === null || currentWheel === void 0 ? void 0 : currentWheel.wisdomUnits) || [];
  var pairTexts = currentWheel ? WisdomService.getPairTextsFromWisdomUnits(currentWheel.wisdomUnits) : {};
  return {
    sessionId: sessionId,
    wheels: wheels,
    selectedWheelIndex: selectedWheelIndex,
    setSelectedWheelIndex: setSelectedWheelIndex,
    currentWheel: currentWheel,
    wisdomUnits: wisdomUnits,
    pairTexts: pairTexts,
    sliceSequence: sliceSequence,
    cycles: cycles,
    bestCycle: bestCycle,
    loading: loading,
    error: error,
    rawData: rawData,
    createNew: createAndBuildWheelWithCycles,
    getExisting: getExistingData,
    clearSession: clearSession
  };
}

// React hook for manual wheel creation
function useManualWheel(sessionId, wisdomUnitsData) {
  var baseUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/api';
  var _React$useState29 = React.useState(null),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    wheelData = _React$useState30[0],
    setWheelData = _React$useState30[1];
  var _React$useState31 = React.useState(false),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    loading = _React$useState32[0],
    setLoading = _React$useState32[1];
  var _React$useState33 = React.useState(null),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    error = _React$useState34[0],
    setError = _React$useState34[1];
  var createWheel = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
    var result, _t12;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          if (!(!sessionId || !wisdomUnitsData)) {
            _context11.n = 1;
            break;
          }
          return _context11.a(2);
        case 1:
          setLoading(true);
          setError(null);
          _context11.p = 2;
          _context11.n = 3;
          return WisdomService.createWheel(sessionId, wisdomUnitsData, baseUrl);
        case 3:
          result = _context11.v;
          setWheelData(result);
          _context11.n = 5;
          break;
        case 4:
          _context11.p = 4;
          _t12 = _context11.v;
          setError(_t12.message);
        case 5:
          _context11.p = 5;
          setLoading(false);
          return _context11.f(5);
        case 6:
          return _context11.a(2);
      }
    }, _callee11, null, [[2, 4, 5, 6]]);
  })), [sessionId, wisdomUnitsData, baseUrl]);
  return {
    wheelData: wheelData,
    loading: loading,
    error: error,
    createWheel: createWheel
  };
}

var useNodeConnections = function useNodeConnections(dynamicSlices, title, recordRef) {
  var _useState = React.useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    showArrows = _useState2[0],
    setShowArrows = _useState2[1];
  var _useState3 = React.useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    demoConnections = _useState4[0],
    setDemoConnections = _useState4[1];
  // Helper functions for layer node management and arrow connections
  var getAllLayerNodes = React.useCallback(function () {
    return document.querySelectorAll('.layer-node');
  }, []);
  var getLayerNodeById = React.useCallback(function (nodeId) {
    return document.querySelector("[data-node-id=\"".concat(nodeId, "\"]"));
  }, []);
  var getLayerNodesForPair = React.useCallback(function (pairIndex) {
    return document.querySelectorAll("[data-pair-index=\"".concat(pairIndex, "\"].layer-node"));
  }, []);
  var getLayerNodesByType = React.useCallback(function (layerType) {
    return document.querySelectorAll("[data-layer-type=\"".concat(layerType, "\"].layer-node"));
  }, []);
  var getLayerNodeInfo = React.useCallback(function (nodeElement) {
    if (!nodeElement || !nodeElement.dataset) return null;
    return {
      nodeId: nodeElement.dataset.nodeId,
      sliceId: nodeElement.dataset.sliceId,
      pairIndex: parseInt(nodeElement.dataset.pairIndex),
      sliceType: nodeElement.dataset.sliceType,
      // thesis or antithesis
      layerIndex: parseInt(nodeElement.dataset.layerIndex),
      layerType: nodeElement.dataset.layerType // green, white, or pink
    };
  }, []);
  var getNodeCenter = React.useCallback(function (nodeElement) {
    if (!nodeElement) return null;
    // Get the node's data attributes to calculate position geometrically
    var nodeId = nodeElement.dataset.nodeId;
    var sliceId = nodeElement.dataset.sliceId;
    var layerIndex = parseInt(nodeElement.dataset.layerIndex || '0');
    // Validate required data attributes
    if (!nodeId || !sliceId || isNaN(layerIndex)) {
      console.warn('Missing or invalid data attributes on node:', nodeElement);
      return null;
    }
    // Find the corresponding slice to get its angle
    var slice = dynamicSlices.find(function (s) {
      return s.id === sliceId;
    });
    if (!slice) {
      console.warn('Could not find slice for node:', nodeId);
      return null;
    }
    // Validate layer index
    if (isNaN(layerIndex) || layerIndex < 0 || layerIndex > 2) {
      console.warn('Invalid layer index:', layerIndex);
      return null;
    }
    // Calculate the center based on the slice geometry
    var cx = 200,
      cy = 200,
      radius = 150;
    var layerRadii = [radius * (0.3 + 0.7 * 0.5 / 3),
    // Green layer center
    radius * (0.3 + 0.7 * 1.5 / 3),
    // White layer center  
    radius * (0.3 + 0.7 * 2.5 / 3) // Pink layer center
    ];
    var layerRadius = layerRadii[layerIndex];
    var angleRad = slice.angle * Math.PI / 180;
    return {
      x: cx + layerRadius * Math.cos(angleRad),
      y: cy + layerRadius * Math.sin(angleRad)
    };
  }, [dynamicSlices]);
  // Function to connect two nodes
  var connectNodes = React.useCallback(function (fromId, toId) {
    var _recordRef$current;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#0074d9';
    var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var fromNode = getLayerNodeById(fromId);
    var toNode = getLayerNodeById(toId);
    if (!fromNode || !toNode) {
      console.warn("Cannot connect nodes: ".concat(fromId, " or ").concat(toId, " not found"));
      return null;
    }
    var fromCenter = getNodeCenter(fromNode);
    var toCenter = getNodeCenter(toNode);
    // Check if centers were calculated successfully
    if (!fromCenter || !toCenter) {
      console.warn("Cannot calculate centers for nodes: ".concat(fromId, " -> ").concat(toId));
      return null;
    }
    // Calculate control point for a curved arrow
    var midX = (fromCenter.x + toCenter.x) / 2;
    var midY = (fromCenter.y + toCenter.y) / 2;
    // Calculate the center of the wheel and distance from it
    var wheelCenterX = 200;
    var wheelCenterY = 200;
    var distanceFromCenter = Math.sqrt(Math.pow(midX - wheelCenterX, 2) + Math.pow(midY - wheelCenterY, 2));
    // Create control point that curves away from the center
    var curveFactor = 0.3; // Adjust this to control curve intensity
    var curveDirection = distanceFromCenter < 100 ? 1 : -1; // Curve outward if close to center, inward if far
    // Calculate perpendicular vector for the curve
    var dx = toCenter.x - fromCenter.x;
    var dy = toCenter.y - fromCenter.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return null; // Same point
    // Perpendicular vector (rotated 90 degrees)
    var perpX = -dy / length;
    var perpY = dx / length;
    // Control point offset from midpoint
    var curveOffset = length * curveFactor * curveDirection;
    var controlX = midX + perpX * curveOffset;
    var controlY = midY + perpY * curveOffset;
    // Create curved arrow path using quadratic Bezier curve
    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var pathD = "M ".concat(fromCenter.x, ",").concat(fromCenter.y, " Q ").concat(controlX, ",").concat(controlY, " ").concat(toCenter.x, ",").concat(toCenter.y);
    arrow.setAttribute('d', pathD);
    arrow.setAttribute('stroke', color);
    arrow.setAttribute('stroke-width', strokeWidth.toString());
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke-dasharray', '4 3'); // Dotted line pattern
    arrow.setAttribute('stroke-linecap', 'round'); // Rounded line caps for better dotted appearance
    // Select appropriate arrow marker based on color
    var markerUrl = 'url(#arrowhead)'; // default blue
    if (color === '#FF6B35') markerUrl = 'url(#arrowhead-orange)';else if (color === '#2196F3') markerUrl = 'url(#arrowhead-blue)';else if (color === '#9C27B0') markerUrl = 'url(#arrowhead-purple)';else if (color === '#4CAF50') markerUrl = 'url(#arrowhead-green)';
    arrow.setAttribute('marker-end', markerUrl);
    arrow.classList.add('node-connection');
    // Add to SVG
    (_recordRef$current = recordRef.current) === null || _recordRef$current === void 0 || _recordRef$current.appendChild(arrow);
    return arrow;
  }, [getLayerNodeById, getNodeCenter, recordRef]);
  // Function to toggle arrow visibility
  var toggleArrows = React.useCallback(function () {
    setShowArrows(!showArrows);
    // If hiding arrows, remove all existing connections immediately
    if (showArrows) {
      var existingConnections = document.querySelectorAll('.demo-connection, .node-connection');
      existingConnections.forEach(function (conn) {
        return conn.remove();
      });
    }
  }, [showArrows]);
  // Demo function to create sample arrow connections
  var createDemoConnections = React.useCallback(function () {
    // Give the DOM a moment to render the nodes
    setTimeout(function () {
      if (!title.includes("Node System Demo")) return; // Only for demo wheel
      // Clear any existing demo connections
      var existingConnections = document.querySelectorAll('.demo-connection');
      existingConnections.forEach(function (conn) {
        return conn.remove();
      });
      // Don't create arrows if they should be hidden
      if (!showArrows) return;
      console.log('Creating demo arrow connections...');
      console.log('Current dynamicSlices:', dynamicSlices);
      // Get all available nodes first
      var allNodes = getAllLayerNodes();
      console.log('Available nodes:', Array.from(allNodes).map(function (n) {
        return {
          id: n.getAttribute('data-node-id'),
          sliceId: n.getAttribute('data-slice-id'),
          layerType: n.getAttribute('data-layer-type'),
          layerIndex: n.getAttribute('data-layer-index')
        };
      }));
      if (allNodes.length === 0) {
        console.warn('No layer nodes found for demo connections');
        return;
      }
      // If we have stored demo connections, recreate them
      if (demoConnections.length > 0) {
        console.log('Recreating stored demo connections:', demoConnections);
        demoConnections.forEach(function (conn) {
          var arrow = connectNodes(conn.fromId, conn.toId, conn.color, conn.strokeWidth);
          if (arrow) {
            arrow.classList.add('demo-connection');
            arrow.setAttribute('data-demo-label', conn.label);
            console.log("Recreated connection: ".concat(conn.label));
          } else {
            console.warn("Failed to recreate connection: ".concat(conn.label));
          }
        });
        return;
      }
      // Create initial demo connections and store them
      var newDemoConnections = [];
      var nodeArray = Array.from(allNodes);
      // Example 1: Connect first green layer to first pink layer if they exist
      var greenNodes = nodeArray.filter(function (n) {
        return n.getAttribute('data-layer-type') === 'green';
      });
      var pinkNodes = nodeArray.filter(function (n) {
        return n.getAttribute('data-layer-type') === 'pink';
      });
      console.log('Green nodes found:', greenNodes.length);
      console.log('Pink nodes found:', pinkNodes.length);
      if (greenNodes.length > 0 && pinkNodes.length > 0) {
        var fromId = greenNodes[0].getAttribute('data-node-id');
        var toId = pinkNodes[0].getAttribute('data-node-id');
        console.log('Attempting to connect:', fromId, 'to', toId);
        var connection1 = connectNodes(fromId, toId, '#FF6B35', 3);
        if (connection1) {
          connection1.classList.add('demo-connection');
          connection1.setAttribute('data-demo-label', 'Green → Pink Layer');
          newDemoConnections.push({
            fromId: fromId,
            toId: toId,
            color: '#FF6B35',
            strokeWidth: 3,
            label: 'Green → Pink Layer'
          });
          console.log('Successfully created connection 1');
        } else {
          console.warn('Failed to create connection 1');
        }
      }
      // Example 2: Connect white layers if multiple exist
      var whiteNodes = nodeArray.filter(function (n) {
        return n.getAttribute('data-layer-type') === 'white';
      });
      console.log('White nodes found:', whiteNodes.length);
      if (whiteNodes.length >= 2) {
        var _fromId = whiteNodes[0].getAttribute('data-node-id');
        var _toId = whiteNodes[1].getAttribute('data-node-id');
        console.log('Attempting to connect white nodes:', _fromId, 'to', _toId);
        var connection2 = connectNodes(_fromId, _toId, '#2196F3', 2);
        if (connection2) {
          connection2.classList.add('demo-connection');
          connection2.setAttribute('data-demo-label', 'White → White Cross-Connection');
          newDemoConnections.push({
            fromId: _fromId,
            toId: _toId,
            color: '#2196F3',
            strokeWidth: 2,
            label: 'White → White Cross-Connection'
          });
          console.log('Successfully created connection 2');
        } else {
          console.warn('Failed to create connection 2');
        }
      }
      // Example 3: Connect thesis to antithesis if both exist
      var thesisNodes = nodeArray.filter(function (n) {
        return n.getAttribute('data-slice-type') === 'thesis';
      });
      var antithesisNodes = nodeArray.filter(function (n) {
        return n.getAttribute('data-slice-type') === 'antithesis';
      });
      console.log('Thesis nodes found:', thesisNodes.length);
      console.log('Antithesis nodes found:', antithesisNodes.length);
      if (thesisNodes.length > 0 && antithesisNodes.length > 0) {
        // Connect pink layer of thesis to green layer of antithesis
        var thesisPink = thesisNodes.find(function (n) {
          return n.getAttribute('data-layer-type') === 'pink';
        });
        var antithesisGreen = antithesisNodes.find(function (n) {
          return n.getAttribute('data-layer-type') === 'green';
        });
        if (thesisPink && antithesisGreen) {
          var _fromId2 = thesisPink.getAttribute('data-node-id');
          var _toId2 = antithesisGreen.getAttribute('data-node-id');
          console.log('Attempting to connect thesis pink to antithesis green:', _fromId2, 'to', _toId2);
          var connection3 = connectNodes(_fromId2, _toId2, '#9C27B0', 2);
          if (connection3) {
            connection3.classList.add('demo-connection');
            connection3.setAttribute('data-demo-label', 'Thesis Pink → Antithesis Green');
            newDemoConnections.push({
              fromId: _fromId2,
              toId: _toId2,
              color: '#9C27B0',
              strokeWidth: 2,
              label: 'Thesis Pink → Antithesis Green'
            });
            console.log('Successfully created connection 3');
          } else {
            console.warn('Failed to create connection 3');
          }
        }
      }
      // Store the demo connections for recreation later
      setDemoConnections(newDemoConnections);
      console.log('Demo connections creation completed');
      // Log some example node information
      if (nodeArray.length > 0) {
        var sampleNode = nodeArray[0];
        console.log('Sample node info:', getLayerNodeInfo(sampleNode));
        console.log('Sample node center:', getNodeCenter(sampleNode));
      }
    }, 2000); // Wait even longer for rendering
  }, [title, showArrows, dynamicSlices, demoConnections, getAllLayerNodes, connectNodes, getLayerNodeInfo, getNodeCenter]);
  // Create demo connections when component mounts or when slices change
  React.useEffect(function () {
    createDemoConnections();
  }, [createDemoConnections]);
  // NEW: Slice layer mapping functions
  var parseSliceLayerCode = React.useCallback(function (code) {
    // Examples: "T1" -> Thesis pair 1, green layer
    //          "T1+" -> Thesis pair 1, pink layer  
    //          "T1-" -> Thesis pair 1, white layer
    //          "A2" -> Antithesis pair 2, green layer
    //          "A2+" -> Antithesis pair 2, pink layer
    //          "A2-" -> Antithesis pair 2, white layer
    var match = code.match(/^([TA])(\d+)([+\-]?)$/);
    if (!match) {
      console.warn("Invalid slice layer code: ".concat(code));
      return null;
    }
    var _match = _slicedToArray(match, 4),
      typeChar = _match[1],
      pairNum = _match[2],
      modifier = _match[3];
    var sliceType = typeChar === 'T' ? 'thesis' : 'antithesis';
    var pairIndex = parseInt(pairNum) - 1; // Convert 1-based to 0-based indexing
    // Determine layer type and index based on modifier
    var layerType;
    var layerIndex;
    if (modifier === '+') {
      layerType = 'green';
      layerIndex = 0;
    } else if (modifier === '-') {
      layerType = 'pink';
      layerIndex = 2;
    } else {
      layerType = 'white';
      layerIndex = 1;
    }
    return {
      pairIndex: pairIndex,
      sliceType: sliceType,
      layerType: layerType,
      layerIndex: layerIndex
    };
  }, []);
  var getNodeIdFromSliceLayerCode = React.useCallback(function (code) {
    var mapping = parseSliceLayerCode(code);
    if (!mapping) return null;
    // Find the slice that matches the pair and type
    var slice = dynamicSlices.find(function (s) {
      return s.pair === mapping.pairIndex && s.type === mapping.sliceType;
    });
    if (!slice) {
      console.warn("No slice found for pair ".concat(mapping.pairIndex, " type ").concat(mapping.sliceType));
      return null;
    }
    // Construct the node ID based on the slice ID and layer index
    // Format: slice-{originalIndex}-layer-{layerIndex} or {sliceId}-layer-{layerIndex}
    var baseId = slice.originalIndex !== undefined ? "slice-".concat(slice.originalIndex) : slice.id;
    return "".concat(baseId, "-layer-").concat(mapping.layerIndex);
  }, [dynamicSlices, parseSliceLayerCode]);
  var connectNodesBySliceLayerCode = React.useCallback(function (fromCode, toCode) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#0074d9';
    var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var fromNodeId = getNodeIdFromSliceLayerCode(fromCode);
    var toNodeId = getNodeIdFromSliceLayerCode(toCode);
    if (!fromNodeId || !toNodeId) {
      console.warn("Cannot create connection ".concat(fromCode, " -> ").concat(toCode, ": node IDs not found"));
      console.warn("From: ".concat(fromCode, " -> ").concat(fromNodeId, ", To: ").concat(toCode, " -> ").concat(toNodeId));
      return null;
    }
    console.log("Creating connection: ".concat(fromCode, " (").concat(fromNodeId, ") -> ").concat(toCode, " (").concat(toNodeId, ")"));
    return connectNodes(fromNodeId, toNodeId, color, strokeWidth);
  }, [getNodeIdFromSliceLayerCode, connectNodes]);
  var getAvailableSliceLayerCodes = React.useCallback(function () {
    var codes = [];
    // Group slices by pair to ensure we have complete pairs
    var pairGroups = {};
    dynamicSlices.forEach(function (slice) {
      if (!pairGroups[slice.pair]) {
        pairGroups[slice.pair] = {};
      }
      pairGroups[slice.pair][slice.type] = slice;
    });
    // Generate codes for each complete pair
    Object.entries(pairGroups).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        pairIndexStr = _ref2[0],
        pair = _ref2[1];
      var pairIndex = parseInt(pairIndexStr);
      var pairNumber = pairIndex + 1; // Convert to 1-based for codes
      if (pair.thesis) {
        codes.push("T".concat(pairNumber)); // White layer
        codes.push("T".concat(pairNumber, "+")); // Green layer
        codes.push("T".concat(pairNumber, "-")); // Pink layer
      }
      if (pair.antithesis) {
        codes.push("A".concat(pairNumber)); // White layer
        codes.push("A".concat(pairNumber, "+")); // Green layer
        codes.push("A".concat(pairNumber, "-")); // Pink layer
      }
    });
    return codes.sort();
  }, [dynamicSlices]);
  // NEW: DOT Script parsing and execution
  var parseDotScript = React.useCallback(function (dotScript) {
    var edges = [];
    var errors = [];
    // Remove comments and clean up the script
    var cleanScript = dotScript.split('\n').map(function (line) {
      return line.replace(/\/\/.*$/, '').trim();
    }) // Remove // comments
    .filter(function (line) {
      return line.length > 0;
    }) // Remove empty lines
    .join('\n');
    // Regex to match edge definitions: nodeA -> nodeB [attributes]
    var edgeRegex = /([A-Z]\d+[+\-]?)\s*->\s*([A-Z]\d+[+\-]?)(?:\s*\[(.*?)\])?/g;
    var match;
    while ((match = edgeRegex.exec(cleanScript)) !== null) {
      var _match2 = match,
        _match3 = _slicedToArray(_match2, 4),
        fromNode = _match3[1],
        toNode = _match3[2],
        attributesStr = _match3[3];
      // Validate node codes
      var fromMapping = parseSliceLayerCode(fromNode);
      var toMapping = parseSliceLayerCode(toNode);
      if (!fromMapping) {
        errors.push("Invalid from node: ".concat(fromNode));
        continue;
      }
      if (!toMapping) {
        errors.push("Invalid to node: ".concat(toNode));
        continue;
      }
      // Parse attributes
      var attributes = {};
      if (attributesStr) {
        // Parse attribute string: color=red, weight=3, label="my label"
        var attrRegex = /(\w+)\s*=\s*([^,]+)/g;
        var attrMatch = void 0;
        while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
          var _attrMatch = attrMatch,
            _attrMatch2 = _slicedToArray(_attrMatch, 3),
            key = _attrMatch2[1],
            value = _attrMatch2[2];
          var cleanValue = value.replace(/["']/g, '').trim();
          switch (key.toLowerCase()) {
            case 'color':
              attributes.color = cleanValue;
              break;
            case 'weight':
            case 'strokewidth':
              attributes.strokeWidth = parseInt(cleanValue) || 2;
              break;
            case 'label':
              attributes.label = cleanValue;
              break;
            case 'style':
              if (['solid', 'dashed', 'dotted'].includes(cleanValue)) {
                attributes.style = cleanValue;
              }
              break;
            default:
              console.warn("Unknown attribute: ".concat(key));
          }
        }
      }
      edges.push({
        from: fromNode,
        to: toNode,
        attributes: attributes
      });
    }
    return {
      edges: edges,
      errors: errors
    };
  }, [parseSliceLayerCode]);
  var executeDotScript = React.useCallback(function (dotScript) {
    var clearExisting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    console.log('=== Executing DOT Script ===');
    console.log('Script:', dotScript);
    // Parse the script
    var parseResult = parseDotScript(dotScript);
    if (parseResult.errors.length > 0) {
      console.error('Parse errors:', parseResult.errors);
      return {
        success: false,
        created: 0,
        errors: parseResult.errors
      };
    }
    // Clear existing script-generated connections if requested
    if (clearExisting) {
      var existingConnections = document.querySelectorAll('.dot-script-connection');
      existingConnections.forEach(function (conn) {
        return conn.remove();
      });
    }
    var availableCodes = getAvailableSliceLayerCodes();
    var createdCount = 0;
    var executionErrors = [];
    // Execute each edge
    parseResult.edges.forEach(function (edge, index) {
      // Check if nodes are available
      if (!availableCodes.includes(edge.from)) {
        executionErrors.push("Node not available: ".concat(edge.from));
        return;
      }
      if (!availableCodes.includes(edge.to)) {
        executionErrors.push("Node not available: ".concat(edge.to));
        return;
      }
      // Set default color based on edge index if not specified
      var color = edge.attributes.color || ['#FF6B35', '#2196F3', '#9C27B0', '#4CAF50', '#FF9800', '#E91E63'][index % 6];
      var strokeWidth = edge.attributes.strokeWidth || 2;
      // Create the connection
      var arrow = connectNodesBySliceLayerCode(edge.from, edge.to, color, strokeWidth);
      if (arrow) {
        arrow.classList.add('dot-script-connection');
        // Apply style attributes
        if (edge.attributes.style === 'dashed') {
          arrow.setAttribute('stroke-dasharray', '8 4');
        } else if (edge.attributes.style === 'dotted') {
          arrow.setAttribute('stroke-dasharray', '2 3');
        } else {
          arrow.setAttribute('stroke-dasharray', '4 3'); // default dotted
        }
        if (edge.attributes.label) {
          arrow.setAttribute('data-dot-label', edge.attributes.label);
        }
        createdCount++;
        console.log("\u2705 Created edge: ".concat(edge.from, " -> ").concat(edge.to), edge.attributes);
      } else {
        executionErrors.push("Failed to create edge: ".concat(edge.from, " -> ").concat(edge.to));
      }
    });
    console.log("=== DOT Script Complete: ".concat(createdCount, " edges created ==="));
    return {
      success: executionErrors.length === 0,
      created: createdCount,
      errors: executionErrors
    };
  }, [parseDotScript, getAvailableSliceLayerCodes, connectNodesBySliceLayerCode]);
  // Demo function to show slice layer mapping in action
  var createSliceLayerMappingDemo = React.useCallback(function () {
    // Give the DOM a moment to render the nodes
    setTimeout(function () {
      console.log('=== Slice Layer Mapping Demo ===');
      var availableCodes = getAvailableSliceLayerCodes();
      console.log('Available slice layer codes:', availableCodes);
      // Example connections using the new mapping system
      var exampleConnections = [{
        from: 'T1',
        to: 'A1+',
        color: '#FF6B35',
        label: 'T1 Green → A1 Pink'
      }, {
        from: 'T1-',
        to: 'T2',
        color: '#2196F3',
        label: 'T1 White → T2 Green'
      }, {
        from: 'A1',
        to: 'T2+',
        color: '#9C27B0',
        label: 'A1 Green → T2 Pink'
      }];
      // Clear existing demo connections
      var existingConnections = document.querySelectorAll('.slice-layer-demo-connection');
      existingConnections.forEach(function (conn) {
        return conn.remove();
      });
      // Create example connections
      exampleConnections.forEach(function (conn) {
        if (availableCodes.includes(conn.from) && availableCodes.includes(conn.to)) {
          var arrow = connectNodesBySliceLayerCode(conn.from, conn.to, conn.color, 2);
          if (arrow) {
            arrow.classList.add('slice-layer-demo-connection');
            arrow.setAttribute('data-demo-label', conn.label);
            console.log("\u2705 Created: ".concat(conn.label));
          } else {
            console.warn("\u274C Failed to create: ".concat(conn.label));
          }
        } else {
          console.warn("\u274C Skipped ".concat(conn.label, ": codes not available"));
        }
      });
      console.log('=== Demo Complete ===');
    }, 1000);
  }, [getAvailableSliceLayerCodes, connectNodesBySliceLayerCode]);
  // Demo function to show DOT script in action
  var createDotScriptDemo = React.useCallback(function () {
    setTimeout(function () {
      var sampleDotScript = "\n        // Dialectical flow example\n        T1 -> A1+ [color=#FF6B35, label=\"thesis to antithesis\"]\n        T1- -> T2 [color=#2196F3, weight=3]\n        A1 -> T2+ [color=#9C27B0, style=dashed]\n        \n        // Cross connections\n        T2 -> A2- [color=#4CAF50]\n        A2 -> T1+ [color=#FF9800, style=dotted]\n      ";
      executeDotScript(sampleDotScript);
    }, 1500);
  }, [executeDotScript]);
  // Expose helper functions for external use (if needed)
  var nodeAPI = {
    getAllLayerNodes: getAllLayerNodes,
    getLayerNodeById: getLayerNodeById,
    getLayerNodesForPair: getLayerNodesForPair,
    getLayerNodesByType: getLayerNodesByType,
    getLayerNodeInfo: getLayerNodeInfo,
    getNodeCenter: getNodeCenter,
    connectNodes: connectNodes
  };
  return {
    // State
    showArrows: showArrows,
    demoConnections: demoConnections,
    // Functions
    toggleArrows: toggleArrows,
    createDemoConnections: createDemoConnections,
    // Node API
    nodeAPI: nodeAPI,
    // NEW: Slice layer mapping API
    sliceLayerAPI: {
      parseSliceLayerCode: parseSliceLayerCode,
      getNodeIdFromSliceLayerCode: getNodeIdFromSliceLayerCode,
      connectNodesBySliceLayerCode: connectNodesBySliceLayerCode,
      getAvailableSliceLayerCodes: getAvailableSliceLayerCodes,
      createSliceLayerMappingDemo: createSliceLayerMappingDemo
    },
    // NEW: DOT Script API
    dotScriptAPI: {
      parseDotScript: parseDotScript,
      executeDotScript: executeDotScript,
      createDotScriptDemo: createDotScriptDemo
    }
  };
};

var useWheelSlices = function useWheelSlices(sequenceWithLabels, normalSliceAngle, focusedSliceAngle, unfocusedSliceAngle, rotation, setRotation) {
  var pairTexts = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var detailedSlices = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    focusedPair = _useState2[0],
    setFocusedPair = _useState2[1];
  var _useState3 = React.useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    dynamicSlices = _useState4[0],
    setDynamicSlices = _useState4[1];
  // Create slice layers (the expensive part) - memoized separately
  var createSliceLayers = React.useCallback(function (sliceWidth) {
    var cx = 200,
      cy = 200,
      radius = 150;
    var halfAngle = sliceWidth / 2;
    var toRadians = function toRadians(deg) {
      return deg * Math.PI / 180;
    };
    // Create layered rings like detailed slices
    var layerColors = ["#C6E5B3", "#FFFFFF", "#F9C6CC"]; // green, white, pink
    var layers = [];
    // Create three concentric ring layers at angle 0 (will be rotated later)
    for (var layer = 0; layer < 3; layer++) {
      var innerRadius = radius * (0.3 + 0.7 * layer / 3);
      var outerRadius = radius * (0.3 + 0.7 * (layer + 1) / 3);
      var startAngleRad = toRadians(-halfAngle);
      var endAngleRad = toRadians(halfAngle);
      var innerX1 = cx + innerRadius * Math.cos(startAngleRad);
      var innerY1 = cy + innerRadius * Math.sin(startAngleRad);
      var innerX2 = cx + innerRadius * Math.cos(endAngleRad);
      var innerY2 = cy + innerRadius * Math.sin(endAngleRad);
      var outerX1 = cx + outerRadius * Math.cos(startAngleRad);
      var outerY1 = cy + outerRadius * Math.sin(startAngleRad);
      var outerX2 = cx + outerRadius * Math.cos(endAngleRad);
      var outerY2 = cy + outerRadius * Math.sin(endAngleRad);
      var largeArc = sliceWidth > 180 ? 1 : 0;
      var pathD = "M ".concat(outerX1, ",").concat(outerY1, " \n                     A ").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArc, ",1 ").concat(outerX2, ",").concat(outerY2, " \n                     L ").concat(innerX2, ",").concat(innerY2, " \n                     A ").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArc, ",0 ").concat(innerX1, ",").concat(innerY1, " Z");
      layers.push({
        pathD: pathD,
        fill: layerColors[layer]
      });
    }
    return layers;
  }, []);
  // Create clickable slice function (matches the JavaScript createClickableSlice)
  React.useCallback(function (centerAngle, sliceWidth, label, pairIndex, sliceType) {
    console.log("\uD83D\uDD25 EXPENSIVE: createClickableSlice called for ".concat(label, " (angle: ").concat(centerAngle, "\xB0)"));
    var cx = 200,
      cy = 200,
      radius = 150;
    // Get cached layers or create new ones
    var layers = createSliceLayers(sliceWidth);
    // Calculate text position (center of the layered slice)
    var textRadius = (radius * 0.3 + radius) / 2;
    var textAngle = centerAngle * Math.PI / 180;
    var textX = cx + textRadius * Math.cos(textAngle);
    var textY = cy + textRadius * Math.sin(textAngle);
    // Dynamic font sizing
    var fontSize = sliceWidth >= normalSliceAngle ? Math.min(20, sliceWidth / 3) : Math.min(14, sliceWidth / 2);
    return {
      layers: layers,
      textX: textX,
      textY: textY,
      fontSize: fontSize,
      label: label,
      pairIndex: pairIndex,
      sliceType: sliceType
    };
  }, [normalSliceAngle, createSliceLayers]);
  // Persistent cache for slice layers (the expensive computation)
  var sliceLayersCacheRef = React.useRef(new Map());
  // Memoize slice layers
  var memoizedCreateSliceLayers = React.useCallback(function (sliceWidth) {
    var cache = sliceLayersCacheRef.current;
    if (cache.has(sliceWidth)) {
      return cache.get(sliceWidth);
    }
    console.log("\uD83D\uDD25 EXPENSIVE: Computing slice layers for width ".concat(sliceWidth, "\xB0"));
    var layers = createSliceLayers(sliceWidth);
    cache.set(sliceWidth, layers);
    return layers;
  }, [createSliceLayers]);
  // Memoize slice data with intelligent caching
  var memoizedSliceData = React.useMemo(function () {
    console.log("\uD83D\uDE80 MEMOIZATION: Processing ".concat(dynamicSlices.length, " slices"));
    var sliceDataMap = new Map();
    var layerCacheHits = 0;
    var layerCacheMisses = 0;
    dynamicSlices.forEach(function (slice) {
      if (!slice.detailed) {
        // Get cached layers or create new ones
        var layersWereCached = sliceLayersCacheRef.current.has(slice.width);
        var layers = memoizedCreateSliceLayers(slice.width);
        if (layersWereCached) {
          layerCacheHits++;
        } else {
          layerCacheMisses++;
        }
        // Calculate position-dependent properties
        var cx = 200,
          cy = 200,
          radius = 150;
        var textRadius = (radius * 0.3 + radius) / 2;
        var textAngle = slice.angle * Math.PI / 180;
        var textX = cx + textRadius * Math.cos(textAngle);
        var textY = cy + textRadius * Math.sin(textAngle);
        // Dynamic font sizing
        var fontSize = slice.width >= normalSliceAngle ? Math.min(20, slice.width / 3) : Math.min(14, slice.width / 2);
        sliceDataMap.set(slice.id, {
          layers: layers,
          textX: textX,
          textY: textY,
          fontSize: fontSize,
          label: slice.label,
          pairIndex: slice.pair,
          sliceType: slice.type
        });
      }
    });
    console.log("\u2705 MEMOIZATION: Layer cache hits: ".concat(layerCacheHits, ", misses: ").concat(layerCacheMisses, ", total layer cache: ").concat(sliceLayersCacheRef.current.size));
    return sliceDataMap;
  }, [dynamicSlices, memoizedCreateSliceLayers, normalSliceAngle]);
  // Create equal slices function (matches the JavaScript createEqualSlices)
  var createEqualSlices = React.useCallback(function () {
    var slices = [];
    sequenceWithLabels.forEach(function (slice, index) {
      var angle = index * normalSliceAngle;
      slices.push({
        id: "slice-".concat(index),
        angle: angle,
        width: normalSliceAngle,
        label: slice.label,
        pair: slice.pair,
        type: slice.type
      });
    });
    setDynamicSlices(slices);
  }, [sequenceWithLabels, normalSliceAngle]);
  // Focus on pair function (simplified version of the JavaScript focusOnPair)
  var focusOnPair = React.useCallback(function (pairIndex) {
    var clickedSliceType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var targetVisualAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setFocusedPair(pairIndex);
    // Find the thesis index - needed throughout the function
    var focusedThesisIndex = sequenceWithLabels.findIndex(function (s) {
      return s.pair === pairIndex && s.type === 'thesis';
    });
    // Calculate rotation to position the clicked slice at the same visual angle
    if (clickedSliceType && targetVisualAngle !== null) {
      // Determine where the clicked slice will be positioned in the focused layout  
      var focusedPosition;
      if (clickedSliceType === 'thesis') {
        focusedPosition = 0; // Thesis goes to 0° in focused layout
      } else {
        focusedPosition = 180; // Antithesis goes to 180° in focused layout
      }
      // We want: focusedPosition + newRotation = targetVisualAngle
      // Therefore: newRotation = targetVisualAngle - focusedPosition
      var newRotation = (targetVisualAngle - focusedPosition + 360) % 360;
      console.log("Setting rotation to ".concat(newRotation, "\xB0 to keep ").concat(clickedSliceType, " at visual angle ").concat(targetVisualAngle, "\xB0"));
      setRotation(newRotation);
    } else {
      // Fallback to old behavior
      var originalThesisAngle = focusedThesisIndex * normalSliceAngle;
      setRotation(rotation + originalThesisAngle);
    }
    // Calculate gap positions for unfocused slices
    var halfFocused = focusedSliceAngle / 2;
    var gap1Start = halfFocused;
    var gap1End = 180 - halfFocused;
    var gap1Size = gap1End - gap1Start;
    var gap2Start = 180 + halfFocused;
    var gap2End = 360 - halfFocused;
    var gap2Size = gap2End - gap2Start;
    var numUnfocused = 2 * sequenceWithLabels.length / 2 - 2;
    var slicesPerGap = Math.floor(numUnfocused / 2);
    var extraSlices = numUnfocused % 2;
    var positions = [];
    // Distribute slices in gap 1
    for (var i = 0; i < slicesPerGap + extraSlices; i++) {
      var position = gap1Start + gap1Size / (slicesPerGap + extraSlices) * (i + 0.5);
      positions.push(position);
    }
    // Distribute slices in gap 2
    for (var _i = 0; _i < slicesPerGap; _i++) {
      var _position = gap2Start + gap2Size / slicesPerGap * (_i + 0.5);
      positions.push(_position);
    }
    // Create new slice configuration
    var newSlices = [];
    // Find the antithesis index (needed for unfocused slices logic)
    var focusedAntithesisIndex = sequenceWithLabels.findIndex(function (s) {
      return s.pair === pairIndex && s.type === 'antithesis';
    });
    // Always generate detailed slices when focusing (using defaultPairTexts)
    var usePairTexts = pairTexts || defaultPairTexts;
    // Only use provided detailed slices if they exist for this specific pair
    var hasProvidedDetailedSlices = detailedSlices[pairIndex] && detailedSlices[pairIndex].thesis && detailedSlices[pairIndex].antithesis;
    if (hasProvidedDetailedSlices) {
      // Use provided detailed slices (SVG strings from prop)
      console.log('Using provided detailed slices for pair', pairIndex);
      // Add logic here if needed for provided detailed slices
    } else if (usePairTexts[pairIndex]) {
      // Generate detailed slices using defaultPairTexts and React components
      console.log('Generating detailed slices for pair', pairIndex, 'using defaultPairTexts');
      // Find the original slice IDs to preserve identity
      var originalThesisSlice = sequenceWithLabels[focusedThesisIndex];
      var originalAntithesisSlice = sequenceWithLabels[focusedAntithesisIndex];
      var originalThesisSliceId = "slice-".concat(focusedThesisIndex);
      var originalAntithesisSliceId = "slice-".concat(focusedAntithesisIndex);
      // Use detailed slices at 0° and 180° to match original HTML pattern
      newSlices.push({
        id: originalThesisSliceId,
        // Preserve original ID
        angle: 0,
        width: focusedSliceAngle,
        label: originalThesisSlice.label,
        pair: pairIndex,
        type: 'thesis',
        focused: true,
        detailed: true,
        originalIndex: focusedThesisIndex // Track original position
        // No more svgContent - we'll use React component directly
      });
      newSlices.push({
        id: originalAntithesisSliceId,
        // Preserve original ID
        angle: 180,
        width: focusedSliceAngle,
        label: originalAntithesisSlice.label,
        pair: pairIndex,
        type: 'antithesis',
        focused: true,
        detailed: true,
        originalIndex: focusedAntithesisIndex // Track original position
        // No more svgContent - we'll use React component directly
      });
      console.log('Created detailed slices for pair', pairIndex, ':', newSlices.filter(function (s) {
        return s.detailed;
      }));
    } else {
      // Fallback to simple focused slices if no text data available
      console.log('No text data available for pair', pairIndex, ', using simple slices');
      sequenceWithLabels.forEach(function (slice, index) {
        if (slice.pair === pairIndex) {
          var originalSliceId = "slice-".concat(index);
          if (slice.type === 'thesis') {
            newSlices.push({
              id: originalSliceId,
              // Preserve original ID
              angle: 0,
              width: focusedSliceAngle,
              label: slice.label,
              pair: slice.pair,
              type: slice.type,
              focused: true,
              originalIndex: index
            });
          } else {
            newSlices.push({
              id: originalSliceId,
              // Preserve original ID
              angle: 180,
              width: focusedSliceAngle,
              label: slice.label,
              pair: slice.pair,
              type: slice.type,
              focused: true,
              originalIndex: index
            });
          }
        }
      });
    }
    // Add unfocused slices maintaining sequence order (like HTML version)
    var currentGapIndex = 0;
    // Walk around the circle starting from the focused thesis
    for (var offset = 1; offset < sequenceWithLabels.length && currentGapIndex < positions.length; offset++) {
      var checkIndex = (focusedThesisIndex + offset) % sequenceWithLabels.length;
      // Skip the focused antithesis
      if (checkIndex === focusedAntithesisIndex) continue;
      // Place this unfocused slice maintaining original sequence order
      var slice = sequenceWithLabels[checkIndex];
      var _position2 = positions[currentGapIndex];
      var originalSliceId = "slice-".concat(checkIndex); // Preserve original ID
      newSlices.push({
        id: originalSliceId,
        // Use original slice ID
        angle: _position2,
        width: unfocusedSliceAngle,
        label: slice.label,
        pair: slice.pair,
        type: slice.type,
        focused: false,
        originalIndex: checkIndex // Track original position
      });
      currentGapIndex++;
    }
    console.log('Final dynamic slices:', newSlices);
    setDynamicSlices(newSlices);
  }, [sequenceWithLabels, focusedSliceAngle, unfocusedSliceAngle, normalSliceAngle, rotation, setRotation, pairTexts, detailedSlices]);
  // Handle slice click (matches the JavaScript click handlers)
  var handleSliceClick = React.useCallback(function (pairIndex) {
    console.log("Clicked pair ".concat(pairIndex));
    if (focusedPair === pairIndex) {
      // Unfocus: find the clicked focused slice and preserve its visual position
      var clickedFocusedSlice = dynamicSlices.find(function (s) {
        return s.pair === pairIndex;
      });
      if (clickedFocusedSlice) {
        // Current visual angle where the focused slice appears
        var currentVisualAngle = (clickedFocusedSlice.angle + rotation) % 360;
        console.log("Unfocusing slice at visual angle: ".concat(currentVisualAngle, "\xB0"));
        // Reset to equal slices first
        setFocusedPair(null);
        createEqualSlices();
        // Calculate where this slice will be in the equal layout
        var sliceInEqualLayout = sequenceWithLabels.find(function (s) {
          return s.pair === pairIndex && s.type === clickedFocusedSlice.type;
        });
        if (sliceInEqualLayout) {
          var sliceIndexInEqual = sequenceWithLabels.indexOf(sliceInEqualLayout);
          var equalLayoutAngle = sliceIndexInEqual * normalSliceAngle;
          // Calculate rotation to put the equal slice at the same visual angle
          // We want: equalLayoutAngle + newRotation = currentVisualAngle
          var newRotation = (currentVisualAngle - equalLayoutAngle + 360) % 360;
          console.log("Setting rotation to ".concat(newRotation, "\xB0 to keep slice at visual angle ").concat(currentVisualAngle, "\xB0"));
          setRotation(newRotation);
        }
      } else {
        // Fallback to simple unfocus
        setFocusedPair(null);
        createEqualSlices();
      }
    } else {
      // Find any slice from this pair to get its current visual position
      var pairSlice = dynamicSlices.find(function (s) {
        return s.pair === pairIndex;
      });
      if (pairSlice) {
        // Current visual angle where the slice appears (this is what we want to preserve)
        var clickedVisualAngle = (pairSlice.angle + rotation) % 360;
        console.log("Slice clicked at visual angle: ".concat(clickedVisualAngle, "\xB0"));
        // Focus on clicked pair, positioning it at the same visual angle
        focusOnPair(pairIndex, pairSlice.type, clickedVisualAngle);
      } else {
        // Fallback to old behavior if slice not found
        focusOnPair(pairIndex);
      }
    }
  }, [focusedPair, dynamicSlices, rotation, createEqualSlices, sequenceWithLabels, normalSliceAngle, setRotation, focusOnPair]);
  // Touch handlers for slice clicks
  var handleSliceTouchStart = React.useCallback(function (e, pairIndex) {
    e.stopPropagation();
    var touch = e.touches[0];
    var touchStartTime = Date.now();
    var touchStartPos = {
      x: touch.clientX,
      y: touch.clientY
    };
    // Store touch data on the target element for tracking
    e.target._touchData = {
      startTime: touchStartTime,
      startPos: touchStartPos,
      pairIndex: pairIndex
    };
  }, []);
  var handleSliceTouchEnd = React.useCallback(function (e, pairIndex) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target._touchData) return;
    var touchDuration = Date.now() - e.target._touchData.startTime;
    var touch = e.changedTouches[0];
    var touchEndPos = {
      x: touch.clientX,
      y: touch.clientY
    };
    var distance = Math.sqrt(Math.pow(touchEndPos.x - e.target._touchData.startPos.x, 2) + Math.pow(touchEndPos.y - e.target._touchData.startPos.y, 2));
    // If it's a quick tap with minimal movement, treat as click
    if (touchDuration < 300 && distance < 20) {
      console.log("Touch clicked ".concat(e.target._touchData.pairIndex));
      handleSliceClick(e.target._touchData.pairIndex);
    }
    delete e.target._touchData;
  }, [handleSliceClick]);
  // Initialize with equal slices
  React.useEffect(function () {
    createEqualSlices();
  }, [createEqualSlices]);
  // Reset focused pair when wheel data changes (different wheel selected)
  React.useEffect(function () {
    setFocusedPair(null);
  }, [sequenceWithLabels, pairTexts]);
  var reset = React.useCallback(function () {
    setFocusedPair(null);
    createEqualSlices();
  }, [createEqualSlices]);
  return {
    // State
    focusedPair: focusedPair,
    dynamicSlices: dynamicSlices,
    memoizedSliceData: memoizedSliceData,
    // Functions
    handleSliceClick: handleSliceClick,
    handleSliceTouchStart: handleSliceTouchStart,
    handleSliceTouchEnd: handleSliceTouchEnd,
    createEqualSlices: createEqualSlices,
    focusOnPair: focusOnPair,
    reset: reset
  };
};

exports.ArrowControls = ArrowControls;
exports.DialecticalWheel = DialecticalWheel;
exports.ExploreComponent = ExploreComponent;
exports.SliceAtAngle = SliceAtAngle;
exports.StepControls = StepControls;
exports.WisdomService = WisdomService;
exports.default = DialecticalWheel;
exports.defaultPairTexts = defaultPairTexts;
exports.generatePairTextsFromWisdomUnits = generatePairTextsFromWisdomUnits;
exports.useDialecticalWheel = useDialecticalWheel;
exports.useDialecticalWheelWithCycles = useDialecticalWheelWithCycles;
exports.useManualWheel = useManualWheel;
exports.useNodeConnections = useNodeConnections;
exports.useWheelSlices = useWheelSlices;
//# sourceMappingURL=index.js.map
