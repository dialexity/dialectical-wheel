'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var runtime = require('@observablehq/runtime');
var React = require('react');
var reactRedux = require('react-redux');
var toolkit = require('@reduxjs/toolkit');
var notebook = require('@dialexity/dialectical-wheel');

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

var useAppDispatch = function useAppDispatch() {
  return reactRedux.useDispatch();
};
var useAppSelector = reactRedux.useSelector;

var initialData = {
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
};
var initialState = {
  data: initialData,
  stepMode: {
    isActive: false,
    currentStep: 0,
    totalSteps: 0
  },
  arrows: {
    visible: true,
    connections: "# Basic dialectical connections\nT1 -> A1\nT2 -> A2  \nT3 -> A3\nT4 -> A4\n\n# Opposition arrows (thesis to antithesis)\nT1 -> T2\nA1 -> A2\n\n# Ring-specific connections (examples)\nT1+ -> A1-\nT2- -> A2+"
  },
  rotation: 0,
  history: [initialData],
  historyIndex: 0
};
var dialecticalSlice = toolkit.createSlice({
  name: 'dialectical',
  initialState: initialState,
  reducers: {
    // Data management
    updateEntry: function updateEntry(state, action) {
      var _action$payload = action.payload,
        id = _action$payload.id,
        entry = _action$payload.entry;
      state.data[id] = entry;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(_objectSpread2({}, state.data));
      state.historyIndex = state.history.length - 1;
    },
    addEntry: function addEntry(state, action) {
      var _action$payload2 = action.payload,
        id = _action$payload2.id,
        entry = _action$payload2.entry;
      state.data[id] = entry;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(_objectSpread2({}, state.data));
      state.historyIndex = state.history.length - 1;
    },
    removeEntry: function removeEntry(state, action) {
      var id = action.payload;
      delete state.data[id];
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(_objectSpread2({}, state.data));
      state.historyIndex = state.history.length - 1;
    },
    // History management
    undo: function undo(state) {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.data = _objectSpread2({}, state.history[state.historyIndex]);
      }
    },
    redo: function redo(state) {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.data = _objectSpread2({}, state.history[state.historyIndex]);
      }
    },
    // Step mode management
    setStepMode: function setStepMode(state, action) {
      var _action$payload3 = action.payload,
        isActive = _action$payload3.isActive,
        currentStep = _action$payload3.currentStep,
        totalSteps = _action$payload3.totalSteps;
      state.stepMode.isActive = isActive;
      if (currentStep !== undefined) state.stepMode.currentStep = currentStep;
      if (totalSteps !== undefined) state.stepMode.totalSteps = totalSteps;
    },
    stepForward: function stepForward(state) {
      if (state.stepMode.currentStep < state.stepMode.totalSteps) {
        state.stepMode.currentStep++;
      }
    },
    stepBackward: function stepBackward(state) {
      if (state.stepMode.currentStep > 0) {
        state.stepMode.currentStep--;
      }
    },
    // Arrow management
    setArrowsVisible: function setArrowsVisible(state, action) {
      state.arrows.visible = action.payload;
    },
    updateArrowConnections: function updateArrowConnections(state, action) {
      state.arrows.connections = action.payload;
    },
    // Rotation management
    setRotation: function setRotation(state, action) {
      state.rotation = action.payload;
    },
    // Bulk data replacement
    setDialecticalData: function setDialecticalData(state, action) {
      state.data = action.payload;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(_objectSpread2({}, state.data));
      state.historyIndex = state.history.length - 1;
    },
    // Reorder entries
    reorderEntries: function reorderEntries(state, action) {
      var newOrder = action.payload;
      var newData = {};
      // Rebuild data object in the new order
      newOrder.forEach(function (key) {
        if (state.data[key]) {
          newData[key] = state.data[key];
        }
      });
      // Add any entries that weren't in the new order (shouldn't happen, but safety)
      Object.keys(state.data).forEach(function (key) {
        if (!newData[key]) {
          newData[key] = state.data[key];
        }
      });
      state.data = newData;
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(_objectSpread2({}, state.data));
      state.historyIndex = state.history.length - 1;
    }
  }
});
var _dialecticalSlice$act = dialecticalSlice.actions,
  updateEntry = _dialecticalSlice$act.updateEntry,
  addEntry = _dialecticalSlice$act.addEntry,
  removeEntry = _dialecticalSlice$act.removeEntry,
  undo = _dialecticalSlice$act.undo,
  redo = _dialecticalSlice$act.redo,
  setStepMode = _dialecticalSlice$act.setStepMode;
  _dialecticalSlice$act.stepForward;
  _dialecticalSlice$act.stepBackward;
  var setArrowsVisible = _dialecticalSlice$act.setArrowsVisible,
  updateArrowConnections = _dialecticalSlice$act.updateArrowConnections,
  setRotation = _dialecticalSlice$act.setRotation;
  _dialecticalSlice$act.setDialecticalData;
  var reorderEntries = _dialecticalSlice$act.reorderEntries;
var dialecticalReducer = dialecticalSlice.reducer;

function StepControls(_ref) {
  var chart = _ref.chart;
  var dispatch = useAppDispatch();
  var stepMode = useAppSelector(function (state) {
    return state.dialectical.stepMode;
  });
  var rotation = useAppSelector(function (state) {
    return state.dialectical.rotation;
  });
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
          dispatch(setStepMode({
            isActive: true,
            currentStep: info.current,
            totalSteps: info.total
          }));
        } else {
          dispatch(setStepMode({
            isActive: false
          }));
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
    dispatch(setRotation(degrees));
    if (chart && chart.rotate) {
      try {
        chart.rotate(radians);
      } catch (error) {
        console.error('Error rotating:', error);
      }
    }
  };
  var handleRotationReset = function handleRotationReset() {
    dispatch(setRotation(0));
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
  var chart = _ref.chart;
  var dispatch = useAppDispatch();
  var dialecticalData = useAppSelector(function (state) {
    return state.dialectical.data;
  });
  var arrowsVisible = useAppSelector(function (state) {
    return state.dialectical.arrows.visible;
  });
  var arrowConnections = useAppSelector(function (state) {
    return state.dialectical.arrows.connections;
  });
  // Step-by-step arrow state (matching Observable notebook)
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    arrowStepMode = _useState2[0],
    setArrowStepMode = _useState2[1];
  var _useState3 = React.useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    currentArrowStep = _useState4[0],
    setCurrentArrowStep = _useState4[1];
  var _useState5 = React.useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    parsedArrowConnections = _useState6[0],
    setParsedArrowConnections = _useState6[1];
  var _useState7 = React.useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    currentArrowInfo = _useState8[0];
    _useState8[1];
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
    dispatch(setArrowsVisible(false));
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
    dispatch(setArrowsVisible(true));
    updateArrowStepUI();
  };
  // Toggle arrows (matching Observable notebook)
  var handleToggleArrows = function handleToggleArrows() {
    if (!chart) return;
    if (arrowsVisible) {
      if (chart.clearArrows) {
        chart.clearArrows();
      }
      dispatch(setArrowsVisible(false));
    } else {
      if (arrowStepMode) {
        drawArrowsUpToStep(currentArrowStep);
      } else {
        // Use our custom function instead of chart.drawAllArrows
        drawAllCurrentArrows();
      }
      dispatch(setArrowsVisible(true));
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
  };
  var handleConnectionsChange = function handleConnectionsChange(e) {
    dispatch(updateArrowConnections(e.target.value));
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
        onChange: handleConnectionsChange,
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

function DialecticalWheel() {
  var chartRef = React.useRef(null);
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    module = _useState2[0],
    setModule = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    chart = _useState4[0],
    setChart = _useState4[1];
  var _useState5 = React.useState(null),
    _useState6 = _slicedToArray(_useState5, 2);
    _useState6[0];
    var setRuntime = _useState6[1];
  // Get dialectical data from Redux store
  var dialecticalData = useAppSelector(function (state) {
    return state.dialectical.data;
  });
  React.useEffect(function () {
    console.log('Loading Observable notebook from local npm package...');
    var runtime$1 = new runtime.Runtime();
    setRuntime(runtime$1);
    var main = runtime$1.module(notebook, function (name) {
      if (name === 'chart') {
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
              return _superPropGet(_class, "fulfilled", this)([value]);
            }
          }]);
        }(runtime.Inspector))(chartRef.current);
      }
      // Don't render the Observable controls - we'll use React components instead
      return undefined;
    });
    setModule(main);
    return function () {
      setModule(null);
      setChart(null);
      setRuntime(null);
      runtime$1.dispose();
    };
  }, []);
  // Separate useEffect for redefining data - this follows the Observable examples pattern
  React.useEffect(function () {
    if (module && dialecticalData) {
      console.log('Redefining dialecticalData in Observable notebook');
      try {
        module.redefine("dialecticalData", dialecticalData);
        console.log('Successfully redefined dialecticalData from local npm package');
      } catch (error) {
        console.warn('Could not redefine dialecticalData:', error);
      }
    }
  }, [dialecticalData, module]);
  return jsxRuntime.jsxs("div", {
    className: "dialectical-wheel-wrapper",
    children: [jsxRuntime.jsx("div", {
      ref: chartRef,
      className: "chart-container",
      style: {
        width: '800px',
        height: '800px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: 'white'
      }
    }), jsxRuntime.jsx(StepControls, {
      chart: chart
    }), jsxRuntime.jsx(ArrowControls, {
      chart: chart
    }), jsxRuntime.jsxs("div", {
      style: {
        marginTop: '10px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      },
      children: ["Debug: ", Object.keys(dialecticalData).length, " entries in Redux store: ", Object.keys(dialecticalData).join(', '), jsxRuntime.jsx("br", {}), "Using local npm package: @dialexity/dialectical-wheel"]
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

function DataEditor() {
  var _dialecticalData$T;
  var dispatch = useAppDispatch();
  var dialecticalData = useAppSelector(function (state) {
    return state.dialectical.data;
  });
  var history = useAppSelector(function (state) {
    return state.dialectical.history;
  });
  var historyIndex = useAppSelector(function (state) {
    return state.dialectical.historyIndex;
  });
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    draggedItem = _useState2[0],
    setDraggedItem = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    dragOverItem = _useState4[0],
    setDragOverItem = _useState4[1];
  var canUndo = historyIndex > 0;
  var canRedo = historyIndex < history.length - 1;
  var dataEntries = Object.entries(dialecticalData);
  // Test function to update T4 statement
  var updateT4Statement = function updateT4Statement() {
    dispatch(updateEntry({
      id: 'T4',
      entry: {
        statement: "Remote work revolutionizes global collaboration",
        positive: "Connects talent across geographical boundaries",
        negative: "Creates digital divide and timezone conflicts"
      }
    }));
  };
  // Test function to add new dialectical pair
  var addNewDialecticalPair = function addNewDialecticalPair() {
    var newPairNumber = Object.keys(dialecticalData).filter(function (key) {
      return key.startsWith('T');
    }).length + 1;
    dispatch(addEntry({
      id: "T".concat(newPairNumber),
      entry: {
        statement: "Climate change drives innovation",
        positive: "Forces development of sustainable technologies",
        negative: "Creates economic disruption and uncertainty"
      }
    }));
    dispatch(addEntry({
      id: "A".concat(newPairNumber),
      entry: {
        statement: "Economic stability preserves environment",
        positive: "Steady growth enables green investments",
        negative: "Short-term profits ignore long-term costs"
      }
    }));
  };
  var handleUndo = function handleUndo() {
    dispatch(undo());
  };
  var handleRedo = function handleRedo() {
    dispatch(redo());
  };
  var handleRemoveEntry = function handleRemoveEntry(id) {
    if (window.confirm("Are you sure you want to remove ".concat(id, "?"))) {
      dispatch(removeEntry(id));
    }
  };
  // Drag and Drop handlers
  var handleDragStart = function handleDragStart(e, id) {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id);
  };
  var handleDragOver = function handleDragOver(e, id) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(id);
  };
  var handleDragLeave = function handleDragLeave() {
    setDragOverItem(null);
  };
  var handleDrop = function handleDrop(e, targetId) {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }
    var currentOrder = Object.keys(dialecticalData);
    var draggedIndex = currentOrder.indexOf(draggedItem);
    var targetIndex = currentOrder.indexOf(targetId);
    if (draggedIndex !== -1 && targetIndex !== -1) {
      var newOrder = [].concat(currentOrder);
      // Remove dragged item from its current position
      newOrder.splice(draggedIndex, 1);
      // Insert dragged item at target position
      newOrder.splice(targetIndex, 0, draggedItem);
      dispatch(reorderEntries(newOrder));
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };
  var handleDragEnd = function handleDragEnd() {
    setDraggedItem(null);
    setDragOverItem(null);
  };
  return jsxRuntime.jsxs("div", {
    style: {
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: 'white'
    },
    children: [jsxRuntime.jsx("h3", {
      children: "Data Editor"
    }), jsxRuntime.jsxs("div", {
      style: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
        alignItems: 'center'
      },
      children: [jsxRuntime.jsx("button", {
        onClick: handleUndo,
        disabled: !canUndo,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: !canUndo ? '#e9ecef' : '#6c757d',
          color: !canUndo ? '#6c757d' : 'white',
          cursor: !canUndo ? 'not-allowed' : 'pointer'
        },
        children: "\u21B6 Undo"
      }), jsxRuntime.jsx("button", {
        onClick: handleRedo,
        disabled: !canRedo,
        style: {
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: !canRedo ? '#e9ecef' : '#6c757d',
          color: !canRedo ? '#6c757d' : 'white',
          cursor: !canRedo ? 'not-allowed' : 'pointer'
        },
        children: "\u21B7 Redo"
      }), jsxRuntime.jsxs("span", {
        style: {
          marginLeft: '10px',
          fontSize: '12px',
          color: '#666'
        },
        children: ["History: ", historyIndex + 1, " / ", history.length]
      })]
    }), jsxRuntime.jsxs("div", {
      style: {
        margin: '15px 0',
        padding: '15px',
        border: '2px solid #007bff',
        borderRadius: '8px',
        background: '#f8f9ff'
      },
      children: [jsxRuntime.jsx("h4", {
        children: "Test Data Flow"
      }), jsxRuntime.jsxs("p", {
        children: ["Current T4 statement: ", jsxRuntime.jsx("strong", {
          children: ((_dialecticalData$T = dialecticalData.T4) === null || _dialecticalData$T === void 0 ? void 0 : _dialecticalData$T.statement) || 'N/A'
        })]
      }), jsxRuntime.jsxs("div", {
        style: {
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        },
        children: [jsxRuntime.jsx("button", {
          onClick: updateT4Statement,
          style: {
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          },
          children: "Update T4 Statement"
        }), jsxRuntime.jsx("button", {
          onClick: addNewDialecticalPair,
          style: {
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          },
          children: "Add New Pair"
        })]
      }), jsxRuntime.jsxs("p", {
        style: {
          fontSize: '12px',
          color: '#666',
          marginTop: '10px'
        },
        children: ["Current entries: ", Object.keys(dialecticalData).length, " total"]
      })]
    }), jsxRuntime.jsxs("div", {
      style: {
        marginTop: '15px'
      },
      children: [jsxRuntime.jsxs("h4", {
        children: ["Current Dialectical Data: ", jsxRuntime.jsx("span", {
          style: {
            fontSize: '12px',
            color: '#666'
          },
          children: "(Drag to reorder)"
        })]
      }), jsxRuntime.jsx("div", {
        style: {
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px'
        },
        children: dataEntries.map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            entry = _ref2[1];
          return jsxRuntime.jsxs("div", {
            draggable: true,
            onDragStart: function onDragStart(e) {
              return handleDragStart(e, id);
            },
            onDragOver: function onDragOver(e) {
              return handleDragOver(e, id);
            },
            onDragLeave: handleDragLeave,
            onDrop: function onDrop(e) {
              return handleDrop(e, id);
            },
            onDragEnd: handleDragEnd,
            style: {
              marginBottom: '10px',
              padding: '10px',
              background: draggedItem === id ? '#e3f2fd' : dragOverItem === id ? '#f3e5f5' : '#f8f9fa',
              borderRadius: '4px',
              border: dragOverItem === id ? '2px dashed #9c27b0' : '1px solid #e9ecef',
              cursor: 'move',
              transition: 'all 0.2s ease',
              transform: draggedItem === id ? 'rotate(2deg) scale(1.02)' : 'none',
              opacity: draggedItem === id ? 0.8 : 1
            },
            children: [jsxRuntime.jsxs("div", {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
              },
              children: [jsxRuntime.jsxs("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                children: [jsxRuntime.jsx("span", {
                  style: {
                    fontSize: '16px',
                    color: '#666',
                    cursor: 'grab'
                  },
                  children: "\u22EE\u22EE"
                }), jsxRuntime.jsx("strong", {
                  children: id
                })]
              }), jsxRuntime.jsx("button", {
                onClick: function onClick() {
                  return handleRemoveEntry(id);
                },
                style: {
                  padding: '2px 6px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                },
                children: "Remove"
              })]
            }), jsxRuntime.jsxs("div", {
              style: {
                fontSize: '14px'
              },
              children: [jsxRuntime.jsxs("div", {
                children: [jsxRuntime.jsx("strong", {
                  children: "Statement:"
                }), " ", entry.statement]
              }), jsxRuntime.jsxs("div", {
                children: [jsxRuntime.jsx("strong", {
                  children: "Positive:"
                }), " ", entry.positive]
              }), jsxRuntime.jsxs("div", {
                children: [jsxRuntime.jsx("strong", {
                  children: "Negative:"
                }), " ", entry.negative]
              })]
            })]
          }, id);
        })
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

toolkit.configureStore({
  reducer: {
    dialectical: dialecticalReducer
  },
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    });
  }
});

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

exports.DataEditor = DataEditor;
exports.DialecticalWheel = DialecticalWheel;
exports.ExploreComponent = ExploreComponent;
exports.SliceAtAngle = SliceAtAngle;
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
