(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! Kefir.js v3.8.0
 *  https://github.com/rpominov/kefir
 */

(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Kefir = global.Kefir || {})));
}(this, (function (exports) { 'use strict';

function createObj(proto) {
  var F = function () {};
  F.prototype = proto;
  return new F();
}

function extend(target /*, mixin1, mixin2...*/) {
  var length = arguments.length,
      i = void 0,
      prop = void 0;
  for (i = 1; i < length; i++) {
    for (prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}

function inherit(Child, Parent /*, mixin1, mixin2...*/) {
  var length = arguments.length,
      i = void 0;
  Child.prototype = createObj(Parent.prototype);
  Child.prototype.constructor = Child;
  for (i = 2; i < length; i++) {
    extend(Child.prototype, arguments[i]);
  }
  return Child;
}

var NOTHING = ['<nothing>'];
var END = 'end';
var VALUE = 'value';
var ERROR = 'error';
var ANY = 'any';

function concat(a, b) {
  var result = void 0,
      length = void 0,
      i = void 0,
      j = void 0;
  if (a.length === 0) {
    return b;
  }
  if (b.length === 0) {
    return a;
  }
  j = 0;
  result = new Array(a.length + b.length);
  length = a.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = a[i];
  }
  length = b.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = b[i];
  }
  return result;
}

function find(arr, value) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function findByPred(arr, pred) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
}

function cloneArray(input) {
  var length = input.length,
      result = new Array(length),
      i = void 0;
  for (i = 0; i < length; i++) {
    result[i] = input[i];
  }
  return result;
}

function remove(input, index) {
  var length = input.length,
      result = void 0,
      i = void 0,
      j = void 0;
  if (index >= 0 && index < length) {
    if (length === 1) {
      return [];
    } else {
      result = new Array(length - 1);
      for (i = 0, j = 0; i < length; i++) {
        if (i !== index) {
          result[j] = input[i];
          j++;
        }
      }
      return result;
    }
  } else {
    return input;
  }
}

function map(input, fn) {
  var length = input.length,
      result = new Array(length),
      i = void 0;
  for (i = 0; i < length; i++) {
    result[i] = fn(input[i]);
  }
  return result;
}

function forEach(arr, fn) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    fn(arr[i]);
  }
}

function fillArray(arr, value) {
  var length = arr.length,
      i = void 0;
  for (i = 0; i < length; i++) {
    arr[i] = value;
  }
}

function contains(arr, value) {
  return find(arr, value) !== -1;
}

function slide(cur, next, max) {
  var length = Math.min(max, cur.length + 1),
      offset = cur.length - length + 1,
      result = new Array(length),
      i = void 0;
  for (i = offset; i < length; i++) {
    result[i - offset] = cur[i];
  }
  result[length - 1] = next;
  return result;
}

function callSubscriber(type, fn, event) {
  if (type === ANY) {
    fn(event);
  } else if (type === event.type) {
    if (type === VALUE || type === ERROR) {
      fn(event.value);
    } else {
      fn();
    }
  }
}

function Dispatcher() {
  this._items = [];
  this._spies = [];
  this._inLoop = 0;
  this._removedItems = null;
}

extend(Dispatcher.prototype, {
  add: function (type, fn) {
    this._items = concat(this._items, [{ type: type, fn: fn }]);
    return this._items.length;
  },
  remove: function (type, fn) {
    var index = findByPred(this._items, function (x) {
      return x.type === type && x.fn === fn;
    });

    // if we're currently in a notification loop,
    // remember this subscriber was removed
    if (this._inLoop !== 0 && index !== -1) {
      if (this._removedItems === null) {
        this._removedItems = [];
      }
      this._removedItems.push(this._items[index]);
    }

    this._items = remove(this._items, index);
    return this._items.length;
  },
  addSpy: function (fn) {
    this._spies = concat(this._spies, [fn]);
    return this._spies.length;
  },


  // Because spies are only ever a function that perform logging as
  // their only side effect, we don't need the same complicated
  // removal logic like in remove()
  removeSpy: function (fn) {
    this._spies = remove(this._spies, this._spies.indexOf(fn));
    return this._spies.length;
  },
  dispatch: function (event) {
    this._inLoop++;
    for (var i = 0, spies = this._spies; this._spies !== null && i < spies.length; i++) {
      spies[i](event);
    }

    for (var _i = 0, items = this._items; _i < items.length; _i++) {
      // cleanup was called
      if (this._items === null) {
        break;
      }

      // this subscriber was removed
      if (this._removedItems !== null && contains(this._removedItems, items[_i])) {
        continue;
      }

      callSubscriber(items[_i].type, items[_i].fn, event);
    }
    this._inLoop--;
    if (this._inLoop === 0) {
      this._removedItems = null;
    }
  },
  cleanup: function () {
    this._items = null;
    this._spies = null;
  }
});

function Observable() {
  this._dispatcher = new Dispatcher();
  this._active = false;
  this._alive = true;
  this._activating = false;
  this._logHandlers = null;
  this._spyHandlers = null;
}

extend(Observable.prototype, {
  _name: 'observable',

  _onActivation: function () {},
  _onDeactivation: function () {},
  _setActive: function (active) {
    if (this._active !== active) {
      this._active = active;
      if (active) {
        this._activating = true;
        this._onActivation();
        this._activating = false;
      } else {
        this._onDeactivation();
      }
    }
  },
  _clear: function () {
    this._setActive(false);
    this._dispatcher.cleanup();
    this._dispatcher = null;
    this._logHandlers = null;
  },
  _emit: function (type, x) {
    switch (type) {
      case VALUE:
        return this._emitValue(x);
      case ERROR:
        return this._emitError(x);
      case END:
        return this._emitEnd();
    }
  },
  _emitValue: function (value) {
    if (this._alive) {
      this._dispatcher.dispatch({ type: VALUE, value: value });
    }
  },
  _emitError: function (value) {
    if (this._alive) {
      this._dispatcher.dispatch({ type: ERROR, value: value });
    }
  },
  _emitEnd: function () {
    if (this._alive) {
      this._alive = false;
      this._dispatcher.dispatch({ type: END });
      this._clear();
    }
  },
  _on: function (type, fn) {
    if (this._alive) {
      this._dispatcher.add(type, fn);
      this._setActive(true);
    } else {
      callSubscriber(type, fn, { type: END });
    }
    return this;
  },
  _off: function (type, fn) {
    if (this._alive) {
      var count = this._dispatcher.remove(type, fn);
      if (count === 0) {
        this._setActive(false);
      }
    }
    return this;
  },
  onValue: function (fn) {
    return this._on(VALUE, fn);
  },
  onError: function (fn) {
    return this._on(ERROR, fn);
  },
  onEnd: function (fn) {
    return this._on(END, fn);
  },
  onAny: function (fn) {
    return this._on(ANY, fn);
  },
  offValue: function (fn) {
    return this._off(VALUE, fn);
  },
  offError: function (fn) {
    return this._off(ERROR, fn);
  },
  offEnd: function (fn) {
    return this._off(END, fn);
  },
  offAny: function (fn) {
    return this._off(ANY, fn);
  },
  observe: function (observerOrOnValue, onError, onEnd) {
    var _this = this;
    var closed = false;

    var observer = !observerOrOnValue || typeof observerOrOnValue === 'function' ? { value: observerOrOnValue, error: onError, end: onEnd } : observerOrOnValue;

    var handler = function (event) {
      if (event.type === END) {
        closed = true;
      }
      if (event.type === VALUE && observer.value) {
        observer.value(event.value);
      } else if (event.type === ERROR && observer.error) {
        observer.error(event.value);
      } else if (event.type === END && observer.end) {
        observer.end(event.value);
      }
    };

    this.onAny(handler);

    return {
      unsubscribe: function () {
        if (!closed) {
          _this.offAny(handler);
          closed = true;
        }
      },

      get closed() {
        return closed;
      }
    };
  },


  // A and B must be subclasses of Stream and Property (order doesn't matter)
  _ofSameType: function (A, B) {
    return A.prototype.getType() === this.getType() ? A : B;
  },
  setName: function (sourceObs /* optional */, selfName) {
    this._name = selfName ? sourceObs._name + '.' + selfName : sourceObs;
    return this;
  },
  log: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    var isCurrent = void 0;
    var handler = function (event) {
      var type = '<' + event.type + (isCurrent ? ':current' : '') + '>';
      if (event.type === END) {
        console.log(name, type);
      } else {
        console.log(name, type, event.value);
      }
    };

    if (this._alive) {
      if (!this._logHandlers) {
        this._logHandlers = [];
      }
      this._logHandlers.push({ name: name, handler: handler });
    }

    isCurrent = true;
    this.onAny(handler);
    isCurrent = false;

    return this;
  },
  offLog: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    if (this._logHandlers) {
      var handlerIndex = findByPred(this._logHandlers, function (obj) {
        return obj.name === name;
      });
      if (handlerIndex !== -1) {
        this.offAny(this._logHandlers[handlerIndex].handler);
        this._logHandlers.splice(handlerIndex, 1);
      }
    }

    return this;
  },
  spy: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    var handler = function (event) {
      var type = '<' + event.type + '>';
      if (event.type === END) {
        console.log(name, type);
      } else {
        console.log(name, type, event.value);
      }
    };
    if (this._alive) {
      if (!this._spyHandlers) {
        this._spyHandlers = [];
      }
      this._spyHandlers.push({ name: name, handler: handler });
      this._dispatcher.addSpy(handler);
    }
    return this;
  },
  offSpy: function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.toString();

    if (this._spyHandlers) {
      var handlerIndex = findByPred(this._spyHandlers, function (obj) {
        return obj.name === name;
      });
      if (handlerIndex !== -1) {
        this._dispatcher.removeSpy(this._spyHandlers[handlerIndex].handler);
        this._spyHandlers.splice(handlerIndex, 1);
      }
    }
    return this;
  }
});

// extend() can't handle `toString` in IE8
Observable.prototype.toString = function () {
  return '[' + this._name + ']';
};

function Stream() {
  Observable.call(this);
}

inherit(Stream, Observable, {
  _name: 'stream',

  getType: function () {
    return 'stream';
  }
});

function Property() {
  Observable.call(this);
  this._currentEvent = null;
}

inherit(Property, Observable, {
  _name: 'property',

  _emitValue: function (value) {
    if (this._alive) {
      this._currentEvent = { type: VALUE, value: value };
      if (!this._activating) {
        this._dispatcher.dispatch({ type: VALUE, value: value });
      }
    }
  },
  _emitError: function (value) {
    if (this._alive) {
      this._currentEvent = { type: ERROR, value: value };
      if (!this._activating) {
        this._dispatcher.dispatch({ type: ERROR, value: value });
      }
    }
  },
  _emitEnd: function () {
    if (this._alive) {
      this._alive = false;
      if (!this._activating) {
        this._dispatcher.dispatch({ type: END });
      }
      this._clear();
    }
  },
  _on: function (type, fn) {
    if (this._alive) {
      this._dispatcher.add(type, fn);
      this._setActive(true);
    }
    if (this._currentEvent !== null) {
      callSubscriber(type, fn, this._currentEvent);
    }
    if (!this._alive) {
      callSubscriber(type, fn, { type: END });
    }
    return this;
  },
  getType: function () {
    return 'property';
  }
});

var neverS = new Stream();
neverS._emitEnd();
neverS._name = 'never';

function never() {
  return neverS;
}

function timeBased(mixin) {
  function AnonymousStream(wait, options) {
    var _this = this;

    Stream.call(this);
    this._wait = wait;
    this._intervalId = null;
    this._$onTick = function () {
      return _this._onTick();
    };
    this._init(options);
  }

  inherit(AnonymousStream, Stream, {
    _init: function () {},
    _free: function () {},
    _onTick: function () {},
    _onActivation: function () {
      this._intervalId = setInterval(this._$onTick, this._wait);
    },
    _onDeactivation: function () {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    },
    _clear: function () {
      Stream.prototype._clear.call(this);
      this._$onTick = null;
      this._free();
    }
  }, mixin);

  return AnonymousStream;
}

var S = timeBased({
  _name: 'later',

  _init: function (_ref) {
    var x = _ref.x;

    this._x = x;
  },
  _free: function () {
    this._x = null;
  },
  _onTick: function () {
    this._emitValue(this._x);
    this._emitEnd();
  }
});

function later(wait, x) {
  return new S(wait, { x: x });
}

var S$1 = timeBased({
  _name: 'interval',

  _init: function (_ref) {
    var x = _ref.x;

    this._x = x;
  },
  _free: function () {
    this._x = null;
  },
  _onTick: function () {
    this._emitValue(this._x);
  }
});

function interval(wait, x) {
  return new S$1(wait, { x: x });
}

var S$2 = timeBased({
  _name: 'sequentially',

  _init: function (_ref) {
    var xs = _ref.xs;

    this._xs = cloneArray(xs);
  },
  _free: function () {
    this._xs = null;
  },
  _onTick: function () {
    if (this._xs.length === 1) {
      this._emitValue(this._xs[0]);
      this._emitEnd();
    } else {
      this._emitValue(this._xs.shift());
    }
  }
});

function sequentially(wait, xs) {
  return xs.length === 0 ? never() : new S$2(wait, { xs: xs });
}

var S$3 = timeBased({
  _name: 'fromPoll',

  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _onTick: function () {
    var fn = this._fn;
    this._emitValue(fn());
  }
});

function fromPoll(wait, fn) {
  return new S$3(wait, { fn: fn });
}

function emitter(obs) {
  function value(x) {
    obs._emitValue(x);
    return obs._active;
  }

  function error(x) {
    obs._emitError(x);
    return obs._active;
  }

  function end() {
    obs._emitEnd();
    return obs._active;
  }

  function event(e) {
    obs._emit(e.type, e.value);
    return obs._active;
  }

  return {
    value: value,
    error: error,
    end: end,
    event: event,

    // legacy
    emit: value,
    emitEvent: event
  };
}

var S$4 = timeBased({
  _name: 'withInterval',

  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
    this._emitter = emitter(this);
  },
  _free: function () {
    this._fn = null;
    this._emitter = null;
  },
  _onTick: function () {
    var fn = this._fn;
    fn(this._emitter);
  }
});

function withInterval(wait, fn) {
  return new S$4(wait, { fn: fn });
}

function S$5(fn) {
  Stream.call(this);
  this._fn = fn;
  this._unsubscribe = null;
}

inherit(S$5, Stream, {
  _name: 'stream',

  _onActivation: function () {
    var fn = this._fn;
    var unsubscribe = fn(emitter(this));
    this._unsubscribe = typeof unsubscribe === 'function' ? unsubscribe : null;

    // fix https://github.com/rpominov/kefir/issues/35
    if (!this._active) {
      this._callUnsubscribe();
    }
  },
  _callUnsubscribe: function () {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  },
  _onDeactivation: function () {
    this._callUnsubscribe();
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._fn = null;
  }
});

function stream(fn) {
  return new S$5(fn);
}

function fromCallback(callbackConsumer) {
  var called = false;

  return stream(function (emitter) {
    if (!called) {
      callbackConsumer(function (x) {
        emitter.emit(x);
        emitter.end();
      });
      called = true;
    }
  }).setName('fromCallback');
}

function fromNodeCallback(callbackConsumer) {
  var called = false;

  return stream(function (emitter) {
    if (!called) {
      callbackConsumer(function (error, x) {
        if (error) {
          emitter.error(error);
        } else {
          emitter.emit(x);
        }
        emitter.end();
      });
      called = true;
    }
  }).setName('fromNodeCallback');
}

function spread(fn, length) {
  switch (length) {
    case 0:
      return function () {
        return fn();
      };
    case 1:
      return function (a) {
        return fn(a[0]);
      };
    case 2:
      return function (a) {
        return fn(a[0], a[1]);
      };
    case 3:
      return function (a) {
        return fn(a[0], a[1], a[2]);
      };
    case 4:
      return function (a) {
        return fn(a[0], a[1], a[2], a[3]);
      };
    default:
      return function (a) {
        return fn.apply(null, a);
      };
  }
}

function apply(fn, c, a) {
  var aLength = a ? a.length : 0;
  if (c == null) {
    switch (aLength) {
      case 0:
        return fn();
      case 1:
        return fn(a[0]);
      case 2:
        return fn(a[0], a[1]);
      case 3:
        return fn(a[0], a[1], a[2]);
      case 4:
        return fn(a[0], a[1], a[2], a[3]);
      default:
        return fn.apply(null, a);
    }
  } else {
    switch (aLength) {
      case 0:
        return fn.call(c);
      default:
        return fn.apply(c, a);
    }
  }
}

function fromSubUnsub(sub, unsub, transformer /* Function | falsey */) {
  return stream(function (emitter) {
    var handler = transformer ? function () {
      emitter.emit(apply(transformer, this, arguments));
    } : function (x) {
      emitter.emit(x);
    };

    sub(handler);
    return function () {
      return unsub(handler);
    };
  }).setName('fromSubUnsub');
}

var pairs = [['addEventListener', 'removeEventListener'], ['addListener', 'removeListener'], ['on', 'off']];

function fromEvents(target, eventName, transformer) {
  var sub = void 0,
      unsub = void 0;

  for (var i = 0; i < pairs.length; i++) {
    if (typeof target[pairs[i][0]] === 'function' && typeof target[pairs[i][1]] === 'function') {
      sub = pairs[i][0];
      unsub = pairs[i][1];
      break;
    }
  }

  if (sub === undefined) {
    throw new Error("target don't support any of " + 'addEventListener/removeEventListener, addListener/removeListener, on/off method pair');
  }

  return fromSubUnsub(function (handler) {
    return target[sub](eventName, handler);
  }, function (handler) {
    return target[unsub](eventName, handler);
  }, transformer).setName('fromEvents');
}

// HACK:
//   We don't call parent Class constructor, but instead putting all necessary
//   properties into prototype to simulate ended Property
//   (see Propperty and Observable classes).

function P(value) {
  this._currentEvent = { type: 'value', value: value, current: true };
}

inherit(P, Property, {
  _name: 'constant',
  _active: false,
  _activating: false,
  _alive: false,
  _dispatcher: null,
  _logHandlers: null
});

function constant(x) {
  return new P(x);
}

// HACK:
//   We don't call parent Class constructor, but instead putting all necessary
//   properties into prototype to simulate ended Property
//   (see Propperty and Observable classes).

function P$1(value) {
  this._currentEvent = { type: 'error', value: value, current: true };
}

inherit(P$1, Property, {
  _name: 'constantError',
  _active: false,
  _activating: false,
  _alive: false,
  _dispatcher: null,
  _logHandlers: null
});

function constantError(x) {
  return new P$1(x);
}

function createConstructor(BaseClass, name) {
  return function AnonymousObservable(source, options) {
    var _this = this;

    BaseClass.call(this);
    this._source = source;
    this._name = source._name + '.' + name;
    this._init(options);
    this._$handleAny = function (event) {
      return _this._handleAny(event);
    };
  };
}

function createClassMethods(BaseClass) {
  return {
    _init: function () {},
    _free: function () {},
    _handleValue: function (x) {
      this._emitValue(x);
    },
    _handleError: function (x) {
      this._emitError(x);
    },
    _handleEnd: function () {
      this._emitEnd();
    },
    _handleAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handleValue(event.value);
        case ERROR:
          return this._handleError(event.value);
        case END:
          return this._handleEnd();
      }
    },
    _onActivation: function () {
      this._source.onAny(this._$handleAny);
    },
    _onDeactivation: function () {
      this._source.offAny(this._$handleAny);
    },
    _clear: function () {
      BaseClass.prototype._clear.call(this);
      this._source = null;
      this._$handleAny = null;
      this._free();
    }
  };
}

function createStream(name, mixin) {
  var S = createConstructor(Stream, name);
  inherit(S, Stream, createClassMethods(Stream), mixin);
  return S;
}

function createProperty(name, mixin) {
  var P = createConstructor(Property, name);
  inherit(P, Property, createClassMethods(Property), mixin);
  return P;
}

var P$2 = createProperty('toProperty', {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._getInitialCurrent = fn;
  },
  _onActivation: function () {
    if (this._getInitialCurrent !== null) {
      var getInitial = this._getInitialCurrent;
      this._emitValue(getInitial());
    }
    this._source.onAny(this._$handleAny); // copied from patterns/one-source
  }
});

function toProperty(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (fn !== null && typeof fn !== 'function') {
    throw new Error('You should call toProperty() with a function or no arguments.');
  }
  return new P$2(obs, { fn: fn });
}

var S$6 = createStream('changes', {
  _handleValue: function (x) {
    if (!this._activating) {
      this._emitValue(x);
    }
  },
  _handleError: function (x) {
    if (!this._activating) {
      this._emitError(x);
    }
  }
});

function changes(obs) {
  return new S$6(obs);
}

function fromPromise(promise) {
  var called = false;

  var result = stream(function (emitter) {
    if (!called) {
      var onValue = function (x) {
        emitter.emit(x);
        emitter.end();
      };
      var onError = function (x) {
        emitter.error(x);
        emitter.end();
      };
      var _promise = promise.then(onValue, onError);

      // prevent libraries like 'Q' or 'when' from swallowing exceptions
      if (_promise && typeof _promise.done === 'function') {
        _promise.done();
      }

      called = true;
    }
  });

  return toProperty(result, null).setName('fromPromise');
}

function getGlodalPromise() {
  if (typeof Promise === 'function') {
    return Promise;
  } else {
    throw new Error("There isn't default Promise, use shim or parameter");
  }
}

var toPromise = function (obs) {
  var Promise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getGlodalPromise();

  var last = null;
  return new Promise(function (resolve, reject) {
    obs.onAny(function (event) {
      if (event.type === END && last !== null) {
        (last.type === VALUE ? resolve : reject)(last.value);
        last = null;
      } else {
        last = event;
      }
    });
  });
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ponyfill = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}
});

var index$1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _ponyfill2 = _interopRequireDefault(ponyfill);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var root; /* global window */

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  root = commonjsGlobal;
} else {
  root = module;
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
});

var index = index$1;

// this file contains some hot JS modules systems stuff

var $$observable = index.default ? index.default : index;

function fromESObservable(_observable) {
  var observable = _observable[$$observable] ? _observable[$$observable]() : _observable;
  return stream(function (emitter) {
    var unsub = observable.subscribe({
      error: function (error) {
        emitter.error(error);
        emitter.end();
      },
      next: function (value) {
        emitter.emit(value);
      },
      complete: function () {
        emitter.end();
      }
    });

    if (unsub.unsubscribe) {
      return function () {
        unsub.unsubscribe();
      };
    } else {
      return unsub;
    }
  }).setName('fromESObservable');
}

function ESObservable(observable) {
  this._observable = observable.takeErrors(1);
}

extend(ESObservable.prototype, {
  subscribe: function (observerOrOnNext, onError, onComplete) {
    var _this = this;

    var observer = typeof observerOrOnNext === 'function' ? { next: observerOrOnNext, error: onError, complete: onComplete } : observerOrOnNext;

    var fn = function (event) {
      if (event.type === END) {
        closed = true;
      }

      if (event.type === VALUE && observer.next) {
        observer.next(event.value);
      } else if (event.type === ERROR && observer.error) {
        observer.error(event.value);
      } else if (event.type === END && observer.complete) {
        observer.complete(event.value);
      }
    };

    this._observable.onAny(fn);
    var closed = false;

    var subscription = {
      unsubscribe: function () {
        closed = true;
        _this._observable.offAny(fn);
      },
      get closed() {
        return closed;
      }
    };
    return subscription;
  }
});

// Need to assign directly b/c Symbols aren't enumerable.
ESObservable.prototype[$$observable] = function () {
  return this;
};

function toESObservable() {
  return new ESObservable(this);
}

function collect(source, keys, values) {
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      keys.push(prop);
      values.push(source[prop]);
    }
  }
}

function defaultErrorsCombinator(errors) {
  var latestError = void 0;
  for (var i = 0; i < errors.length; i++) {
    if (errors[i] !== undefined) {
      if (latestError === undefined || latestError.index < errors[i].index) {
        latestError = errors[i];
      }
    }
  }
  return latestError.error;
}

function Combine(active, passive, combinator) {
  var _this = this;

  Stream.call(this);
  this._activeCount = active.length;
  this._sources = concat(active, passive);
  this._combinator = combinator;
  this._aliveCount = 0;
  this._latestValues = new Array(this._sources.length);
  this._latestErrors = new Array(this._sources.length);
  fillArray(this._latestValues, NOTHING);
  this._emitAfterActivation = false;
  this._endAfterActivation = false;
  this._latestErrorIndex = 0;

  this._$handlers = [];

  var _loop = function (i) {
    _this._$handlers.push(function (event) {
      return _this._handleAny(i, event);
    });
  };

  for (var i = 0; i < this._sources.length; i++) {
    _loop(i);
  }
}

inherit(Combine, Stream, {
  _name: 'combine',

  _onActivation: function () {
    this._aliveCount = this._activeCount;

    // we need to suscribe to _passive_ sources before _active_
    // (see https://github.com/rpominov/kefir/issues/98)
    for (var i = this._activeCount; i < this._sources.length; i++) {
      this._sources[i].onAny(this._$handlers[i]);
    }
    for (var _i = 0; _i < this._activeCount; _i++) {
      this._sources[_i].onAny(this._$handlers[_i]);
    }

    if (this._emitAfterActivation) {
      this._emitAfterActivation = false;
      this._emitIfFull();
    }
    if (this._endAfterActivation) {
      this._emitEnd();
    }
  },
  _onDeactivation: function () {
    var length = this._sources.length,
        i = void 0;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny(this._$handlers[i]);
    }
  },
  _emitIfFull: function () {
    var hasAllValues = true;
    var hasErrors = false;
    var length = this._latestValues.length;
    var valuesCopy = new Array(length);
    var errorsCopy = new Array(length);

    for (var i = 0; i < length; i++) {
      valuesCopy[i] = this._latestValues[i];
      errorsCopy[i] = this._latestErrors[i];

      if (valuesCopy[i] === NOTHING) {
        hasAllValues = false;
      }

      if (errorsCopy[i] !== undefined) {
        hasErrors = true;
      }
    }

    if (hasAllValues) {
      var combinator = this._combinator;
      this._emitValue(combinator(valuesCopy));
    }
    if (hasErrors) {
      this._emitError(defaultErrorsCombinator(errorsCopy));
    }
  },
  _handleAny: function (i, event) {
    if (event.type === VALUE || event.type === ERROR) {
      if (event.type === VALUE) {
        this._latestValues[i] = event.value;
        this._latestErrors[i] = undefined;
      }
      if (event.type === ERROR) {
        this._latestValues[i] = NOTHING;
        this._latestErrors[i] = {
          index: this._latestErrorIndex++,
          error: event.value
        };
      }

      if (i < this._activeCount) {
        if (this._activating) {
          this._emitAfterActivation = true;
        } else {
          this._emitIfFull();
        }
      }
    } else {
      // END

      if (i < this._activeCount) {
        this._aliveCount--;
        if (this._aliveCount === 0) {
          if (this._activating) {
            this._endAfterActivation = true;
          } else {
            this._emitEnd();
          }
        }
      }
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._sources = null;
    this._latestValues = null;
    this._latestErrors = null;
    this._combinator = null;
    this._$handlers = null;
  }
});

function combineAsArray(active) {
  var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var combinator = arguments[2];

  if (!Array.isArray(passive)) {
    throw new Error('Combine can only combine active and passive collections of the same type.');
  }

  combinator = combinator ? spread(combinator, active.length + passive.length) : function (x) {
    return x;
  };
  return active.length === 0 ? never() : new Combine(active, passive, combinator);
}

function combineAsObject(active) {
  var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var combinator = arguments[2];

  if (typeof passive !== 'object' || Array.isArray(passive)) {
    throw new Error('Combine can only combine active and passive collections of the same type.');
  }

  var keys = [],
      activeObservables = [],
      passiveObservables = [];

  collect(active, keys, activeObservables);
  collect(passive, keys, passiveObservables);

  var objectify = function (values) {
    var event = {};
    for (var i = values.length - 1; 0 <= i; i--) {
      event[keys[i]] = values[i];
    }
    return combinator ? combinator(event) : event;
  };

  return activeObservables.length === 0 ? never() : new Combine(activeObservables, passiveObservables, objectify);
}

function combine(active, passive, combinator) {
  if (typeof passive === 'function') {
    combinator = passive;
    passive = undefined;
  }

  return Array.isArray(active) ? combineAsArray(active, passive, combinator) : combineAsObject(active, passive, combinator);
}

var Observable$2 = {
  empty: function () {
    return never();
  },


  // Monoid based on merge() seems more useful than one based on concat().
  concat: function (a, b) {
    return a.merge(b);
  },
  of: function (x) {
    return constant(x);
  },
  map: function (fn, obs) {
    return obs.map(fn);
  },
  bimap: function (fnErr, fnVal, obs) {
    return obs.mapErrors(fnErr).map(fnVal);
  },


  // This ap strictly speaking incompatible with chain. If we derive ap from chain we get
  // different (not very useful) behavior. But spec requires that if method can be derived
  // it must have the same behavior as hand-written method. We intentionally violate the spec
  // in hope that it won't cause many troubles in practice. And in return we have more useful type.
  ap: function (obsFn, obsVal) {
    return combine([obsFn, obsVal], function (fn, val) {
      return fn(val);
    });
  },
  chain: function (fn, obs) {
    return obs.flatMap(fn);
  }
};



var staticLand = Object.freeze({
	Observable: Observable$2
});

var mixin = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    this._emitValue(fn(x));
  }
};

var S$7 = createStream('map', mixin);
var P$3 = createProperty('map', mixin);

var id = function (x) {
  return x;
};

function map$1(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;

  return new (obs._ofSameType(S$7, P$3))(obs, { fn: fn });
}

var mixin$1 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitValue(x);
    }
  }
};

var S$8 = createStream('filter', mixin$1);
var P$4 = createProperty('filter', mixin$1);

var id$1 = function (x) {
  return x;
};

function filter(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$1;

  return new (obs._ofSameType(S$8, P$4))(obs, { fn: fn });
}

var mixin$2 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = n;
    if (n <= 0) {
      this._emitEnd();
    }
  },
  _handleValue: function (x) {
    if (this._n === 0) {
      return;
    }
    this._n--;
    this._emitValue(x);
    if (this._n === 0) {
      this._emitEnd();
    }
  }
};

var S$9 = createStream('take', mixin$2);
var P$5 = createProperty('take', mixin$2);

function take(obs, n) {
  return new (obs._ofSameType(S$9, P$5))(obs, { n: n });
}

var mixin$3 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = n;
    if (n <= 0) {
      this._emitEnd();
    }
  },
  _handleError: function (x) {
    if (this._n === 0) {
      return;
    }
    this._n--;
    this._emitError(x);
    if (this._n === 0) {
      this._emitEnd();
    }
  }
};

var S$10 = createStream('takeErrors', mixin$3);
var P$6 = createProperty('takeErrors', mixin$3);

function takeErrors(obs, n) {
  return new (obs._ofSameType(S$10, P$6))(obs, { n: n });
}

var mixin$4 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitValue(x);
    } else {
      this._emitEnd();
    }
  }
};

var S$11 = createStream('takeWhile', mixin$4);
var P$7 = createProperty('takeWhile', mixin$4);

var id$2 = function (x) {
  return x;
};

function takeWhile(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$2;

  return new (obs._ofSameType(S$11, P$7))(obs, { fn: fn });
}

var mixin$5 = {
  _init: function () {
    this._lastValue = NOTHING;
  },
  _free: function () {
    this._lastValue = null;
  },
  _handleValue: function (x) {
    this._lastValue = x;
  },
  _handleEnd: function () {
    if (this._lastValue !== NOTHING) {
      this._emitValue(this._lastValue);
    }
    this._emitEnd();
  }
};

var S$12 = createStream('last', mixin$5);
var P$8 = createProperty('last', mixin$5);

function last(obs) {
  return new (obs._ofSameType(S$12, P$8))(obs);
}

var mixin$6 = {
  _init: function (_ref) {
    var n = _ref.n;

    this._n = Math.max(0, n);
  },
  _handleValue: function (x) {
    if (this._n === 0) {
      this._emitValue(x);
    } else {
      this._n--;
    }
  }
};

var S$13 = createStream('skip', mixin$6);
var P$9 = createProperty('skip', mixin$6);

function skip(obs, n) {
  return new (obs._ofSameType(S$13, P$9))(obs, { n: n });
}

var mixin$7 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._fn !== null && !fn(x)) {
      this._fn = null;
    }
    if (this._fn === null) {
      this._emitValue(x);
    }
  }
};

var S$14 = createStream('skipWhile', mixin$7);
var P$10 = createProperty('skipWhile', mixin$7);

var id$3 = function (x) {
  return x;
};

function skipWhile(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$3;

  return new (obs._ofSameType(S$14, P$10))(obs, { fn: fn });
}

var mixin$8 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
    this._prev = NOTHING;
  },
  _free: function () {
    this._fn = null;
    this._prev = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._prev === NOTHING || !fn(this._prev, x)) {
      this._prev = x;
      this._emitValue(x);
    }
  }
};

var S$15 = createStream('skipDuplicates', mixin$8);
var P$11 = createProperty('skipDuplicates', mixin$8);

var eq = function (a, b) {
  return a === b;
};

function skipDuplicates(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : eq;

  return new (obs._ofSameType(S$15, P$11))(obs, { fn: fn });
}

var mixin$9 = {
  _init: function (_ref) {
    var fn = _ref.fn,
        seed = _ref.seed;

    this._fn = fn;
    this._prev = seed;
  },
  _free: function () {
    this._prev = null;
    this._fn = null;
  },
  _handleValue: function (x) {
    if (this._prev !== NOTHING) {
      var fn = this._fn;
      this._emitValue(fn(this._prev, x));
    }
    this._prev = x;
  }
};

var S$16 = createStream('diff', mixin$9);
var P$12 = createProperty('diff', mixin$9);

function defaultFn(a, b) {
  return [a, b];
}

function diff(obs, fn) {
  var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOTHING;

  return new (obs._ofSameType(S$16, P$12))(obs, { fn: fn || defaultFn, seed: seed });
}

var P$13 = createProperty('scan', {
  _init: function (_ref) {
    var fn = _ref.fn,
        seed = _ref.seed;

    this._fn = fn;
    this._seed = seed;
    if (seed !== NOTHING) {
      this._emitValue(seed);
    }
  },
  _free: function () {
    this._fn = null;
    this._seed = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    if (this._currentEvent === null || this._currentEvent.type === ERROR) {
      this._emitValue(this._seed === NOTHING ? x : fn(this._seed, x));
    } else {
      this._emitValue(fn(this._currentEvent.value, x));
    }
  }
});

function scan(obs, fn) {
  var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOTHING;

  return new P$13(obs, { fn: fn, seed: seed });
}

var mixin$10 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    var xs = fn(x);
    for (var i = 0; i < xs.length; i++) {
      this._emitValue(xs[i]);
    }
  }
};

var S$17 = createStream('flatten', mixin$10);

var id$4 = function (x) {
  return x;
};

function flatten(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$4;

  return new S$17(obs, { fn: fn });
}

var END_MARKER = {};

var mixin$11 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait;

    this._wait = Math.max(0, wait);
    this._buff = [];
    this._$shiftBuff = function () {
      var value = _this._buff.shift();
      if (value === END_MARKER) {
        _this._emitEnd();
      } else {
        _this._emitValue(value);
      }
    };
  },
  _free: function () {
    this._buff = null;
    this._$shiftBuff = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      this._buff.push(x);
      setTimeout(this._$shiftBuff, this._wait);
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      this._buff.push(END_MARKER);
      setTimeout(this._$shiftBuff, this._wait);
    }
  }
};

var S$18 = createStream('delay', mixin$11);
var P$14 = createProperty('delay', mixin$11);

function delay(obs, wait) {
  return new (obs._ofSameType(S$18, P$14))(obs, { wait: wait });
}

var now = Date.now ? function () {
  return Date.now();
} : function () {
  return new Date().getTime();
};

var mixin$12 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        leading = _ref.leading,
        trailing = _ref.trailing;

    this._wait = Math.max(0, wait);
    this._leading = leading;
    this._trailing = trailing;
    this._trailingValue = null;
    this._timeoutId = null;
    this._endLater = false;
    this._lastCallTime = 0;
    this._$trailingCall = function () {
      return _this._trailingCall();
    };
  },
  _free: function () {
    this._trailingValue = null;
    this._$trailingCall = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      var curTime = now();
      if (this._lastCallTime === 0 && !this._leading) {
        this._lastCallTime = curTime;
      }
      var remaining = this._wait - (curTime - this._lastCallTime);
      if (remaining <= 0) {
        this._cancelTrailing();
        this._lastCallTime = curTime;
        this._emitValue(x);
      } else if (this._trailing) {
        this._cancelTrailing();
        this._trailingValue = x;
        this._timeoutId = setTimeout(this._$trailingCall, remaining);
      }
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      if (this._timeoutId) {
        this._endLater = true;
      } else {
        this._emitEnd();
      }
    }
  },
  _cancelTrailing: function () {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  },
  _trailingCall: function () {
    this._emitValue(this._trailingValue);
    this._timeoutId = null;
    this._trailingValue = null;
    this._lastCallTime = !this._leading ? 0 : now();
    if (this._endLater) {
      this._emitEnd();
    }
  }
};

var S$19 = createStream('throttle', mixin$12);
var P$15 = createProperty('throttle', mixin$12);

function throttle(obs, wait) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$leading = _ref2.leading,
      leading = _ref2$leading === undefined ? true : _ref2$leading,
      _ref2$trailing = _ref2.trailing,
      trailing = _ref2$trailing === undefined ? true : _ref2$trailing;

  return new (obs._ofSameType(S$19, P$15))(obs, { wait: wait, leading: leading, trailing: trailing });
}

var mixin$13 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        immediate = _ref.immediate;

    this._wait = Math.max(0, wait);
    this._immediate = immediate;
    this._lastAttempt = 0;
    this._timeoutId = null;
    this._laterValue = null;
    this._endLater = false;
    this._$later = function () {
      return _this._later();
    };
  },
  _free: function () {
    this._laterValue = null;
    this._$later = null;
  },
  _handleValue: function (x) {
    if (this._activating) {
      this._emitValue(x);
    } else {
      this._lastAttempt = now();
      if (this._immediate && !this._timeoutId) {
        this._emitValue(x);
      }
      if (!this._timeoutId) {
        this._timeoutId = setTimeout(this._$later, this._wait);
      }
      if (!this._immediate) {
        this._laterValue = x;
      }
    }
  },
  _handleEnd: function () {
    if (this._activating) {
      this._emitEnd();
    } else {
      if (this._timeoutId && !this._immediate) {
        this._endLater = true;
      } else {
        this._emitEnd();
      }
    }
  },
  _later: function () {
    var last = now() - this._lastAttempt;
    if (last < this._wait && last >= 0) {
      this._timeoutId = setTimeout(this._$later, this._wait - last);
    } else {
      this._timeoutId = null;
      if (!this._immediate) {
        this._emitValue(this._laterValue);
        this._laterValue = null;
      }
      if (this._endLater) {
        this._emitEnd();
      }
    }
  }
};

var S$20 = createStream('debounce', mixin$13);
var P$16 = createProperty('debounce', mixin$13);

function debounce(obs, wait) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$immediate = _ref2.immediate,
      immediate = _ref2$immediate === undefined ? false : _ref2$immediate;

  return new (obs._ofSameType(S$20, P$16))(obs, { wait: wait, immediate: immediate });
}

var mixin$14 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    this._emitError(fn(x));
  }
};

var S$21 = createStream('mapErrors', mixin$14);
var P$17 = createProperty('mapErrors', mixin$14);

var id$5 = function (x) {
  return x;
};

function mapErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$5;

  return new (obs._ofSameType(S$21, P$17))(obs, { fn: fn });
}

var mixin$15 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    if (fn(x)) {
      this._emitError(x);
    }
  }
};

var S$22 = createStream('filterErrors', mixin$15);
var P$18 = createProperty('filterErrors', mixin$15);

var id$6 = function (x) {
  return x;
};

function filterErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id$6;

  return new (obs._ofSameType(S$22, P$18))(obs, { fn: fn });
}

var mixin$16 = {
  _handleValue: function () {}
};

var S$23 = createStream('ignoreValues', mixin$16);
var P$19 = createProperty('ignoreValues', mixin$16);

function ignoreValues(obs) {
  return new (obs._ofSameType(S$23, P$19))(obs);
}

var mixin$17 = {
  _handleError: function () {}
};

var S$24 = createStream('ignoreErrors', mixin$17);
var P$20 = createProperty('ignoreErrors', mixin$17);

function ignoreErrors(obs) {
  return new (obs._ofSameType(S$24, P$20))(obs);
}

var mixin$18 = {
  _handleEnd: function () {}
};

var S$25 = createStream('ignoreEnd', mixin$18);
var P$21 = createProperty('ignoreEnd', mixin$18);

function ignoreEnd(obs) {
  return new (obs._ofSameType(S$25, P$21))(obs);
}

var mixin$19 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleEnd: function () {
    var fn = this._fn;
    this._emitValue(fn());
    this._emitEnd();
  }
};

var S$26 = createStream('beforeEnd', mixin$19);
var P$22 = createProperty('beforeEnd', mixin$19);

function beforeEnd(obs, fn) {
  return new (obs._ofSameType(S$26, P$22))(obs, { fn: fn });
}

var mixin$20 = {
  _init: function (_ref) {
    var min = _ref.min,
        max = _ref.max;

    this._max = max;
    this._min = min;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _handleValue: function (x) {
    this._buff = slide(this._buff, x, this._max);
    if (this._buff.length >= this._min) {
      this._emitValue(this._buff);
    }
  }
};

var S$27 = createStream('slidingWindow', mixin$20);
var P$23 = createProperty('slidingWindow', mixin$20);

function slidingWindow(obs, max) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return new (obs._ofSameType(S$27, P$23))(obs, { min: min, max: max });
}

var mixin$21 = {
  _init: function (_ref) {
    var fn = _ref.fn,
        flushOnEnd = _ref.flushOnEnd;

    this._fn = fn;
    this._flushOnEnd = flushOnEnd;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null && this._buff.length !== 0) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    var fn = this._fn;
    if (!fn(x)) {
      this._flush();
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  }
};

var S$28 = createStream('bufferWhile', mixin$21);
var P$24 = createProperty('bufferWhile', mixin$21);

var id$7 = function (x) {
  return x;
};

function bufferWhile(obs, fn) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$28, P$24))(obs, { fn: fn || id$7, flushOnEnd: flushOnEnd });
}

var mixin$22 = {
  _init: function (_ref) {
    var count = _ref.count,
        flushOnEnd = _ref.flushOnEnd;

    this._count = count;
    this._flushOnEnd = flushOnEnd;
    this._buff = [];
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null && this._buff.length !== 0) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    if (this._buff.length >= this._count) {
      this._flush();
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  }
};

var S$29 = createStream('bufferWithCount', mixin$22);
var P$25 = createProperty('bufferWithCount', mixin$22);

function bufferWhile$1(obs, count) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$29, P$25))(obs, { count: count, flushOnEnd: flushOnEnd });
}

var mixin$23 = {
  _init: function (_ref) {
    var _this = this;

    var wait = _ref.wait,
        count = _ref.count,
        flushOnEnd = _ref.flushOnEnd;

    this._wait = wait;
    this._count = count;
    this._flushOnEnd = flushOnEnd;
    this._intervalId = null;
    this._$onTick = function () {
      return _this._flush();
    };
    this._buff = [];
  },
  _free: function () {
    this._$onTick = null;
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handleValue: function (x) {
    this._buff.push(x);
    if (this._buff.length >= this._count) {
      clearInterval(this._intervalId);
      this._flush();
      this._intervalId = setInterval(this._$onTick, this._wait);
    }
  },
  _handleEnd: function () {
    if (this._flushOnEnd && this._buff.length !== 0) {
      this._flush();
    }
    this._emitEnd();
  },
  _onActivation: function () {
    this._intervalId = setInterval(this._$onTick, this._wait);
    this._source.onAny(this._$handleAny); // copied from patterns/one-source
  },
  _onDeactivation: function () {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this._source.offAny(this._$handleAny); // copied from patterns/one-source
  }
};

var S$30 = createStream('bufferWithTimeOrCount', mixin$23);
var P$26 = createProperty('bufferWithTimeOrCount', mixin$23);

function bufferWithTimeOrCount(obs, wait, count) {
  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref2$flushOnEnd = _ref2.flushOnEnd,
      flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;

  return new (obs._ofSameType(S$30, P$26))(obs, { wait: wait, count: count, flushOnEnd: flushOnEnd });
}

function xformForObs(obs) {
  return {
    '@@transducer/step': function (res, input) {
      obs._emitValue(input);
      return null;
    },
    '@@transducer/result': function () {
      obs._emitEnd();
      return null;
    }
  };
}

var mixin$24 = {
  _init: function (_ref) {
    var transducer = _ref.transducer;

    this._xform = transducer(xformForObs(this));
  },
  _free: function () {
    this._xform = null;
  },
  _handleValue: function (x) {
    if (this._xform['@@transducer/step'](null, x) !== null) {
      this._xform['@@transducer/result'](null);
    }
  },
  _handleEnd: function () {
    this._xform['@@transducer/result'](null);
  }
};

var S$31 = createStream('transduce', mixin$24);
var P$27 = createProperty('transduce', mixin$24);

function transduce(obs, transducer) {
  return new (obs._ofSameType(S$31, P$27))(obs, { transducer: transducer });
}

var mixin$25 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._handler = fn;
    this._emitter = emitter(this);
  },
  _free: function () {
    this._handler = null;
    this._emitter = null;
  },
  _handleAny: function (event) {
    this._handler(this._emitter, event);
  }
};

var S$32 = createStream('withHandler', mixin$25);
var P$28 = createProperty('withHandler', mixin$25);

function withHandler(obs, fn) {
  return new (obs._ofSameType(S$32, P$28))(obs, { fn: fn });
}

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function Zip(sources, combinator) {
  var _this = this;

  Stream.call(this);

  this._buffers = map(sources, function (source) {
    return isArray(source) ? cloneArray(source) : [];
  });
  this._sources = map(sources, function (source) {
    return isArray(source) ? never() : source;
  });

  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
    return x;
  };
  this._aliveCount = 0;

  this._$handlers = [];

  var _loop = function (i) {
    _this._$handlers.push(function (event) {
      return _this._handleAny(i, event);
    });
  };

  for (var i = 0; i < this._sources.length; i++) {
    _loop(i);
  }
}

inherit(Zip, Stream, {
  _name: 'zip',

  _onActivation: function () {
    // if all sources are arrays
    while (this._isFull()) {
      this._emit();
    }

    var length = this._sources.length;
    this._aliveCount = length;
    for (var i = 0; i < length && this._active; i++) {
      this._sources[i].onAny(this._$handlers[i]);
    }
  },
  _onDeactivation: function () {
    for (var i = 0; i < this._sources.length; i++) {
      this._sources[i].offAny(this._$handlers[i]);
    }
  },
  _emit: function () {
    var values = new Array(this._buffers.length);
    for (var i = 0; i < this._buffers.length; i++) {
      values[i] = this._buffers[i].shift();
    }
    var combinator = this._combinator;
    this._emitValue(combinator(values));
  },
  _isFull: function () {
    for (var i = 0; i < this._buffers.length; i++) {
      if (this._buffers[i].length === 0) {
        return false;
      }
    }
    return true;
  },
  _handleAny: function (i, event) {
    if (event.type === VALUE) {
      this._buffers[i].push(event.value);
      if (this._isFull()) {
        this._emit();
      }
    }
    if (event.type === ERROR) {
      this._emitError(event.value);
    }
    if (event.type === END) {
      this._aliveCount--;
      if (this._aliveCount === 0) {
        this._emitEnd();
      }
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._sources = null;
    this._buffers = null;
    this._combinator = null;
    this._$handlers = null;
  }
});

function zip(observables, combinator /* Function | falsey */) {
  return observables.length === 0 ? never() : new Zip(observables, combinator);
}

var id$8 = function (x) {
  return x;
};

function AbstractPool() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$queueLim = _ref.queueLim,
      queueLim = _ref$queueLim === undefined ? 0 : _ref$queueLim,
      _ref$concurLim = _ref.concurLim,
      concurLim = _ref$concurLim === undefined ? -1 : _ref$concurLim,
      _ref$drop = _ref.drop,
      drop = _ref$drop === undefined ? 'new' : _ref$drop;

  Stream.call(this);

  this._queueLim = queueLim < 0 ? -1 : queueLim;
  this._concurLim = concurLim < 0 ? -1 : concurLim;
  this._drop = drop;
  this._queue = [];
  this._curSources = [];
  this._$handleSubAny = function (event) {
    return _this._handleSubAny(event);
  };
  this._$endHandlers = [];
  this._currentlyAdding = null;

  if (this._concurLim === 0) {
    this._emitEnd();
  }
}

inherit(AbstractPool, Stream, {
  _name: 'abstractPool',

  _add: function (obj, toObs /* Function | falsey */) {
    toObs = toObs || id$8;
    if (this._concurLim === -1 || this._curSources.length < this._concurLim) {
      this._addToCur(toObs(obj));
    } else {
      if (this._queueLim === -1 || this._queue.length < this._queueLim) {
        this._addToQueue(toObs(obj));
      } else if (this._drop === 'old') {
        this._removeOldest();
        this._add(obj, toObs);
      }
    }
  },
  _addAll: function (obss) {
    var _this2 = this;

    forEach(obss, function (obs) {
      return _this2._add(obs);
    });
  },
  _remove: function (obs) {
    if (this._removeCur(obs) === -1) {
      this._removeQueue(obs);
    }
  },
  _addToQueue: function (obs) {
    this._queue = concat(this._queue, [obs]);
  },
  _addToCur: function (obs) {
    if (this._active) {
      // HACK:
      //
      // We have two optimizations for cases when `obs` is ended. We don't want
      // to add such observable to the list, but only want to emit events
      // from it (if it has some).
      //
      // Instead of this hacks, we could just did following,
      // but it would be 5-8 times slower:
      //
      //     this._curSources = concat(this._curSources, [obs]);
      //     this._subscribe(obs);
      //

      // #1
      // This one for cases when `obs` already ended
      // e.g., Kefir.constant() or Kefir.never()
      if (!obs._alive) {
        if (obs._currentEvent) {
          this._emit(obs._currentEvent.type, obs._currentEvent.value);
        }
        return;
      }

      // #2
      // This one is for cases when `obs` going to end synchronously on
      // first subscriber e.g., Kefir.stream(em => {em.emit(1); em.end()})
      this._currentlyAdding = obs;
      obs.onAny(this._$handleSubAny);
      this._currentlyAdding = null;
      if (obs._alive) {
        this._curSources = concat(this._curSources, [obs]);
        if (this._active) {
          this._subToEnd(obs);
        }
      }
    } else {
      this._curSources = concat(this._curSources, [obs]);
    }
  },
  _subToEnd: function (obs) {
    var _this3 = this;

    var onEnd = function () {
      return _this3._removeCur(obs);
    };
    this._$endHandlers.push({ obs: obs, handler: onEnd });
    obs.onEnd(onEnd);
  },
  _subscribe: function (obs) {
    obs.onAny(this._$handleSubAny);

    // it can become inactive in responce of subscribing to `obs.onAny` above
    if (this._active) {
      this._subToEnd(obs);
    }
  },
  _unsubscribe: function (obs) {
    obs.offAny(this._$handleSubAny);

    var onEndI = findByPred(this._$endHandlers, function (obj) {
      return obj.obs === obs;
    });
    if (onEndI !== -1) {
      obs.offEnd(this._$endHandlers[onEndI].handler);
      this._$endHandlers.splice(onEndI, 1);
    }
  },
  _handleSubAny: function (event) {
    if (event.type === VALUE) {
      this._emitValue(event.value);
    } else if (event.type === ERROR) {
      this._emitError(event.value);
    }
  },
  _removeQueue: function (obs) {
    var index = find(this._queue, obs);
    this._queue = remove(this._queue, index);
    return index;
  },
  _removeCur: function (obs) {
    if (this._active) {
      this._unsubscribe(obs);
    }
    var index = find(this._curSources, obs);
    this._curSources = remove(this._curSources, index);
    if (index !== -1) {
      if (this._queue.length !== 0) {
        this._pullQueue();
      } else if (this._curSources.length === 0) {
        this._onEmpty();
      }
    }
    return index;
  },
  _removeOldest: function () {
    this._removeCur(this._curSources[0]);
  },
  _pullQueue: function () {
    if (this._queue.length !== 0) {
      this._queue = cloneArray(this._queue);
      this._addToCur(this._queue.shift());
    }
  },
  _onActivation: function () {
    for (var i = 0, sources = this._curSources; i < sources.length && this._active; i++) {
      this._subscribe(sources[i]);
    }
  },
  _onDeactivation: function () {
    for (var i = 0, sources = this._curSources; i < sources.length; i++) {
      this._unsubscribe(sources[i]);
    }
    if (this._currentlyAdding !== null) {
      this._unsubscribe(this._currentlyAdding);
    }
  },
  _isEmpty: function () {
    return this._curSources.length === 0;
  },
  _onEmpty: function () {},
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._queue = null;
    this._curSources = null;
    this._$handleSubAny = null;
    this._$endHandlers = null;
  }
});

function Merge(sources) {
  AbstractPool.call(this);
  this._addAll(sources);
  this._initialised = true;
}

inherit(Merge, AbstractPool, {
  _name: 'merge',

  _onEmpty: function () {
    if (this._initialised) {
      this._emitEnd();
    }
  }
});

function merge(observables) {
  return observables.length === 0 ? never() : new Merge(observables);
}

function S$33(generator) {
  var _this = this;

  Stream.call(this);
  this._generator = generator;
  this._source = null;
  this._inLoop = false;
  this._iteration = 0;
  this._$handleAny = function (event) {
    return _this._handleAny(event);
  };
}

inherit(S$33, Stream, {
  _name: 'repeat',

  _handleAny: function (event) {
    if (event.type === END) {
      this._source = null;
      this._getSource();
    } else {
      this._emit(event.type, event.value);
    }
  },
  _getSource: function () {
    if (!this._inLoop) {
      this._inLoop = true;
      var generator = this._generator;
      while (this._source === null && this._alive && this._active) {
        this._source = generator(this._iteration++);
        if (this._source) {
          this._source.onAny(this._$handleAny);
        } else {
          this._emitEnd();
        }
      }
      this._inLoop = false;
    }
  },
  _onActivation: function () {
    if (this._source) {
      this._source.onAny(this._$handleAny);
    } else {
      this._getSource();
    }
  },
  _onDeactivation: function () {
    if (this._source) {
      this._source.offAny(this._$handleAny);
    }
  },
  _clear: function () {
    Stream.prototype._clear.call(this);
    this._generator = null;
    this._source = null;
    this._$handleAny = null;
  }
});

var repeat = function (generator) {
  return new S$33(generator);
};

function concat$1(observables) {
  return repeat(function (index) {
    return observables.length > index ? observables[index] : false;
  }).setName('concat');
}

function Pool() {
  AbstractPool.call(this);
}

inherit(Pool, AbstractPool, {
  _name: 'pool',

  plug: function (obs) {
    this._add(obs);
    return this;
  },
  unplug: function (obs) {
    this._remove(obs);
    return this;
  }
});

function FlatMap(source, fn, options) {
  var _this = this;

  AbstractPool.call(this, options);
  this._source = source;
  this._fn = fn;
  this._mainEnded = false;
  this._lastCurrent = null;
  this._$handleMain = function (event) {
    return _this._handleMain(event);
  };
}

inherit(FlatMap, AbstractPool, {
  _onActivation: function () {
    AbstractPool.prototype._onActivation.call(this);
    if (this._active) {
      this._source.onAny(this._$handleMain);
    }
  },
  _onDeactivation: function () {
    AbstractPool.prototype._onDeactivation.call(this);
    this._source.offAny(this._$handleMain);
    this._hadNoEvSinceDeact = true;
  },
  _handleMain: function (event) {
    if (event.type === VALUE) {
      // Is latest value before deactivation survived, and now is 'current' on this activation?
      // We don't want to handle such values, to prevent to constantly add
      // same observale on each activation/deactivation when our main source
      // is a `Kefir.conatant()` for example.
      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
      if (!sameCurr) {
        this._add(event.value, this._fn);
      }
      this._lastCurrent = event.value;
      this._hadNoEvSinceDeact = false;
    }

    if (event.type === ERROR) {
      this._emitError(event.value);
    }

    if (event.type === END) {
      if (this._isEmpty()) {
        this._emitEnd();
      } else {
        this._mainEnded = true;
      }
    }
  },
  _onEmpty: function () {
    if (this._mainEnded) {
      this._emitEnd();
    }
  },
  _clear: function () {
    AbstractPool.prototype._clear.call(this);
    this._source = null;
    this._lastCurrent = null;
    this._$handleMain = null;
  }
});

function FlatMapErrors(source, fn) {
  FlatMap.call(this, source, fn);
}

inherit(FlatMapErrors, FlatMap, {
  // Same as in FlatMap, only VALUE/ERROR flipped
  _handleMain: function (event) {
    if (event.type === ERROR) {
      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
      if (!sameCurr) {
        this._add(event.value, this._fn);
      }
      this._lastCurrent = event.value;
      this._hadNoEvSinceDeact = false;
    }

    if (event.type === VALUE) {
      this._emitValue(event.value);
    }

    if (event.type === END) {
      if (this._isEmpty()) {
        this._emitEnd();
      } else {
        this._mainEnded = true;
      }
    }
  }
});

function createConstructor$1(BaseClass, name) {
  return function AnonymousObservable(primary, secondary, options) {
    var _this = this;

    BaseClass.call(this);
    this._primary = primary;
    this._secondary = secondary;
    this._name = primary._name + '.' + name;
    this._lastSecondary = NOTHING;
    this._$handleSecondaryAny = function (event) {
      return _this._handleSecondaryAny(event);
    };
    this._$handlePrimaryAny = function (event) {
      return _this._handlePrimaryAny(event);
    };
    this._init(options);
  };
}

function createClassMethods$1(BaseClass) {
  return {
    _init: function () {},
    _free: function () {},
    _handlePrimaryValue: function (x) {
      this._emitValue(x);
    },
    _handlePrimaryError: function (x) {
      this._emitError(x);
    },
    _handlePrimaryEnd: function () {
      this._emitEnd();
    },
    _handleSecondaryValue: function (x) {
      this._lastSecondary = x;
    },
    _handleSecondaryError: function (x) {
      this._emitError(x);
    },
    _handleSecondaryEnd: function () {},
    _handlePrimaryAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handlePrimaryValue(event.value);
        case ERROR:
          return this._handlePrimaryError(event.value);
        case END:
          return this._handlePrimaryEnd(event.value);
      }
    },
    _handleSecondaryAny: function (event) {
      switch (event.type) {
        case VALUE:
          return this._handleSecondaryValue(event.value);
        case ERROR:
          return this._handleSecondaryError(event.value);
        case END:
          this._handleSecondaryEnd(event.value);
          this._removeSecondary();
      }
    },
    _removeSecondary: function () {
      if (this._secondary !== null) {
        this._secondary.offAny(this._$handleSecondaryAny);
        this._$handleSecondaryAny = null;
        this._secondary = null;
      }
    },
    _onActivation: function () {
      if (this._secondary !== null) {
        this._secondary.onAny(this._$handleSecondaryAny);
      }
      if (this._active) {
        this._primary.onAny(this._$handlePrimaryAny);
      }
    },
    _onDeactivation: function () {
      if (this._secondary !== null) {
        this._secondary.offAny(this._$handleSecondaryAny);
      }
      this._primary.offAny(this._$handlePrimaryAny);
    },
    _clear: function () {
      BaseClass.prototype._clear.call(this);
      this._primary = null;
      this._secondary = null;
      this._lastSecondary = null;
      this._$handleSecondaryAny = null;
      this._$handlePrimaryAny = null;
      this._free();
    }
  };
}

function createStream$1(name, mixin) {
  var S = createConstructor$1(Stream, name);
  inherit(S, Stream, createClassMethods$1(Stream), mixin);
  return S;
}

function createProperty$1(name, mixin) {
  var P = createConstructor$1(Property, name);
  inherit(P, Property, createClassMethods$1(Property), mixin);
  return P;
}

var mixin$26 = {
  _handlePrimaryValue: function (x) {
    if (this._lastSecondary !== NOTHING && this._lastSecondary) {
      this._emitValue(x);
    }
  },
  _handleSecondaryEnd: function () {
    if (this._lastSecondary === NOTHING || !this._lastSecondary) {
      this._emitEnd();
    }
  }
};

var S$34 = createStream$1('filterBy', mixin$26);
var P$29 = createProperty$1('filterBy', mixin$26);

function filterBy(primary, secondary) {
  return new (primary._ofSameType(S$34, P$29))(primary, secondary);
}

var id2 = function (_, x) {
  return x;
};

function sampledBy(passive, active, combinator) {
  var _combinator = combinator ? function (a, b) {
    return combinator(b, a);
  } : id2;
  return combine([active], [passive], _combinator).setName(passive, 'sampledBy');
}

var mixin$27 = {
  _handlePrimaryValue: function (x) {
    if (this._lastSecondary !== NOTHING) {
      this._emitValue(x);
    }
  },
  _handleSecondaryEnd: function () {
    if (this._lastSecondary === NOTHING) {
      this._emitEnd();
    }
  }
};

var S$35 = createStream$1('skipUntilBy', mixin$27);
var P$30 = createProperty$1('skipUntilBy', mixin$27);

function skipUntilBy(primary, secondary) {
  return new (primary._ofSameType(S$35, P$30))(primary, secondary);
}

var mixin$28 = {
  _handleSecondaryValue: function () {
    this._emitEnd();
  }
};

var S$36 = createStream$1('takeUntilBy', mixin$28);
var P$31 = createProperty$1('takeUntilBy', mixin$28);

function takeUntilBy(primary, secondary) {
  return new (primary._ofSameType(S$36, P$31))(primary, secondary);
}

var mixin$29 = {
  _init: function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$flushOnEnd = _ref.flushOnEnd,
        flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;

    this._buff = [];
    this._flushOnEnd = flushOnEnd;
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handlePrimaryEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  },
  _onActivation: function () {
    this._primary.onAny(this._$handlePrimaryAny);
    if (this._alive && this._secondary !== null) {
      this._secondary.onAny(this._$handleSecondaryAny);
    }
  },
  _handlePrimaryValue: function (x) {
    this._buff.push(x);
  },
  _handleSecondaryValue: function () {
    this._flush();
  },
  _handleSecondaryEnd: function () {
    if (!this._flushOnEnd) {
      this._emitEnd();
    }
  }
};

var S$37 = createStream$1('bufferBy', mixin$29);
var P$32 = createProperty$1('bufferBy', mixin$29);

function bufferBy(primary, secondary, options /* optional */) {
  return new (primary._ofSameType(S$37, P$32))(primary, secondary, options);
}

var mixin$30 = {
  _init: function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$flushOnEnd = _ref.flushOnEnd,
        flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd,
        _ref$flushOnChange = _ref.flushOnChange,
        flushOnChange = _ref$flushOnChange === undefined ? false : _ref$flushOnChange;

    this._buff = [];
    this._flushOnEnd = flushOnEnd;
    this._flushOnChange = flushOnChange;
  },
  _free: function () {
    this._buff = null;
  },
  _flush: function () {
    if (this._buff !== null) {
      this._emitValue(this._buff);
      this._buff = [];
    }
  },
  _handlePrimaryEnd: function () {
    if (this._flushOnEnd) {
      this._flush();
    }
    this._emitEnd();
  },
  _handlePrimaryValue: function (x) {
    this._buff.push(x);
    if (this._lastSecondary !== NOTHING && !this._lastSecondary) {
      this._flush();
    }
  },
  _handleSecondaryEnd: function () {
    if (!this._flushOnEnd && (this._lastSecondary === NOTHING || this._lastSecondary)) {
      this._emitEnd();
    }
  },
  _handleSecondaryValue: function (x) {
    if (this._flushOnChange && !x) {
      this._flush();
    }

    // from default _handleSecondaryValue
    this._lastSecondary = x;
  }
};

var S$38 = createStream$1('bufferWhileBy', mixin$30);
var P$33 = createProperty$1('bufferWhileBy', mixin$30);

function bufferWhileBy(primary, secondary, options /* optional */) {
  return new (primary._ofSameType(S$38, P$33))(primary, secondary, options);
}

var f = function () {
  return false;
};
var t = function () {
  return true;
};

function awaiting(a, b) {
  var result = merge([map$1(a, t), map$1(b, f)]);
  result = skipDuplicates(result);
  result = toProperty(result, f);
  return result.setName(a, 'awaiting');
}

var mixin$31 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleValue: function (x) {
    var fn = this._fn;
    var result = fn(x);
    if (result.convert) {
      this._emitError(result.error);
    } else {
      this._emitValue(x);
    }
  }
};

var S$39 = createStream('valuesToErrors', mixin$31);
var P$34 = createProperty('valuesToErrors', mixin$31);

var defFn = function (x) {
  return { convert: true, error: x };
};

function valuesToErrors(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defFn;

  return new (obs._ofSameType(S$39, P$34))(obs, { fn: fn });
}

var mixin$32 = {
  _init: function (_ref) {
    var fn = _ref.fn;

    this._fn = fn;
  },
  _free: function () {
    this._fn = null;
  },
  _handleError: function (x) {
    var fn = this._fn;
    var result = fn(x);
    if (result.convert) {
      this._emitValue(result.value);
    } else {
      this._emitError(x);
    }
  }
};

var S$40 = createStream('errorsToValues', mixin$32);
var P$35 = createProperty('errorsToValues', mixin$32);

var defFn$1 = function (x) {
  return { convert: true, value: x };
};

function errorsToValues(obs) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defFn$1;

  return new (obs._ofSameType(S$40, P$35))(obs, { fn: fn });
}

var mixin$33 = {
  _handleError: function (x) {
    this._emitError(x);
    this._emitEnd();
  }
};

var S$41 = createStream('endOnError', mixin$33);
var P$36 = createProperty('endOnError', mixin$33);

function endOnError(obs) {
  return new (obs._ofSameType(S$41, P$36))(obs);
}

// Create a stream
// -----------------------------------------------------------------------------

// () -> Stream
// (number, any) -> Stream
// (number, any) -> Stream
// (number, Array<any>) -> Stream
// (number, Function) -> Stream
// (number, Function) -> Stream
// (Function) -> Stream
// (Function) -> Stream
// Target = {addEventListener, removeEventListener}|{addListener, removeListener}|{on, off}
// (Target, string, Function|undefined) -> Stream
// (Function) -> Stream
// Create a property
// -----------------------------------------------------------------------------

// (any) -> Property
// (any) -> Property
// Convert observables
// -----------------------------------------------------------------------------

// (Stream|Property, Function|undefined) -> Property
Observable.prototype.toProperty = function (fn) {
  return toProperty(this, fn);
};

// (Stream|Property) -> Stream
Observable.prototype.changes = function () {
  return changes(this);
};

// Interoperation with other implimentations
// -----------------------------------------------------------------------------

// (Promise) -> Property
// (Stream|Property, Function|undefined) -> Promise
Observable.prototype.toPromise = function (Promise) {
  return toPromise(this, Promise);
};

// (ESObservable) -> Stream
// (Stream|Property) -> ES7 Observable
Observable.prototype.toESObservable = toESObservable;
Observable.prototype[$$observable] = toESObservable;

// Modify an observable
// -----------------------------------------------------------------------------

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.map = function (fn) {
  return map$1(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.filter = function (fn) {
  return filter(this, fn);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.take = function (n) {
  return take(this, n);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.takeErrors = function (n) {
  return takeErrors(this, n);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.takeWhile = function (fn) {
  return takeWhile(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.last = function () {
  return last(this);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.skip = function (n) {
  return skip(this, n);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.skipWhile = function (fn) {
  return skipWhile(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.skipDuplicates = function (fn) {
  return skipDuplicates(this, fn);
};

// (Stream, Function|falsey, any|undefined) -> Stream
// (Property, Function|falsey, any|undefined) -> Property
Observable.prototype.diff = function (fn, seed) {
  return diff(this, fn, seed);
};

// (Stream|Property, Function, any|undefined) -> Property
Observable.prototype.scan = function (fn, seed) {
  return scan(this, fn, seed);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.flatten = function (fn) {
  return flatten(this, fn);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.delay = function (wait) {
  return delay(this, wait);
};

// Options = {leading: boolean|undefined, trailing: boolean|undefined}
// (Stream, number, Options|undefined) -> Stream
// (Property, number, Options|undefined) -> Property
Observable.prototype.throttle = function (wait, options) {
  return throttle(this, wait, options);
};

// Options = {immediate: boolean|undefined}
// (Stream, number, Options|undefined) -> Stream
// (Property, number, Options|undefined) -> Property
Observable.prototype.debounce = function (wait, options) {
  return debounce(this, wait, options);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.mapErrors = function (fn) {
  return mapErrors(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.filterErrors = function (fn) {
  return filterErrors(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreValues = function () {
  return ignoreValues(this);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreErrors = function () {
  return ignoreErrors(this);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.ignoreEnd = function () {
  return ignoreEnd(this);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.beforeEnd = function (fn) {
  return beforeEnd(this, fn);
};

// (Stream, number, number|undefined) -> Stream
// (Property, number, number|undefined) -> Property
Observable.prototype.slidingWindow = function (max, min) {
  return slidingWindow(this, max, min);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Function|falsey, Options|undefined) -> Stream
// (Property, Function|falsey, Options|undefined) -> Property
Observable.prototype.bufferWhile = function (fn, options) {
  return bufferWhile(this, fn, options);
};

// (Stream, number) -> Stream
// (Property, number) -> Property
Observable.prototype.bufferWithCount = function (count, options) {
  return bufferWhile$1(this, count, options);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, number, number, Options|undefined) -> Stream
// (Property, number, number, Options|undefined) -> Property
Observable.prototype.bufferWithTimeOrCount = function (wait, count, options) {
  return bufferWithTimeOrCount(this, wait, count, options);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.transduce = function (transducer) {
  return transduce(this, transducer);
};

// (Stream, Function) -> Stream
// (Property, Function) -> Property
Observable.prototype.withHandler = function (fn) {
  return withHandler(this, fn);
};

// (Stream, Stream -> a) -> a
// (Property, Property -> a) -> a
Observable.prototype.thru = function (fn) {
  return fn(this);
};

// Combine observables
// -----------------------------------------------------------------------------

// (Array<Stream|Property>, Function|undefiend) -> Stream
// (Array<Stream|Property>, Array<Stream|Property>, Function|undefiend) -> Stream
Observable.prototype.combine = function (other, combinator) {
  return combine([this, other], combinator);
};

// (Array<Stream|Property>, Function|undefiend) -> Stream
Observable.prototype.zip = function (other, combinator) {
  return zip([this, other], combinator);
};

// (Array<Stream|Property>) -> Stream
Observable.prototype.merge = function (other) {
  return merge([this, other]);
};

// (Array<Stream|Property>) -> Stream
Observable.prototype.concat = function (other) {
  return concat$1([this, other]);
};

// () -> Pool
var pool = function () {
  return new Pool();
};

// (Function) -> Stream
// Options = {concurLim: number|undefined, queueLim: number|undefined, drop: 'old'|'new'|undefiend}
// (Stream|Property, Function|falsey, Options|undefined) -> Stream
Observable.prototype.flatMap = function (fn) {
  return new FlatMap(this, fn).setName(this, 'flatMap');
};
Observable.prototype.flatMapLatest = function (fn) {
  return new FlatMap(this, fn, { concurLim: 1, drop: 'old' }).setName(this, 'flatMapLatest');
};
Observable.prototype.flatMapFirst = function (fn) {
  return new FlatMap(this, fn, { concurLim: 1 }).setName(this, 'flatMapFirst');
};
Observable.prototype.flatMapConcat = function (fn) {
  return new FlatMap(this, fn, { queueLim: -1, concurLim: 1 }).setName(this, 'flatMapConcat');
};
Observable.prototype.flatMapConcurLimit = function (fn, limit) {
  return new FlatMap(this, fn, { queueLim: -1, concurLim: limit }).setName(this, 'flatMapConcurLimit');
};

// (Stream|Property, Function|falsey) -> Stream
Observable.prototype.flatMapErrors = function (fn) {
  return new FlatMapErrors(this, fn).setName(this, 'flatMapErrors');
};

// Combine two observables
// -----------------------------------------------------------------------------

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.filterBy = function (other) {
  return filterBy(this, other);
};

// (Stream, Stream|Property, Function|undefiend) -> Stream
// (Property, Stream|Property, Function|undefiend) -> Property
Observable.prototype.sampledBy = function (other, combinator) {
  return sampledBy(this, other, combinator);
};

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.skipUntilBy = function (other) {
  return skipUntilBy(this, other);
};

// (Stream, Stream|Property) -> Stream
// (Property, Stream|Property) -> Property
Observable.prototype.takeUntilBy = function (other) {
  return takeUntilBy(this, other);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Stream|Property, Options|undefined) -> Stream
// (Property, Stream|Property, Options|undefined) -> Property
Observable.prototype.bufferBy = function (other, options) {
  return bufferBy(this, other, options);
};

// Options = {flushOnEnd: boolean|undefined}
// (Stream, Stream|Property, Options|undefined) -> Stream
// (Property, Stream|Property, Options|undefined) -> Property
Observable.prototype.bufferWhileBy = function (other, options) {
  return bufferWhileBy(this, other, options);
};

// Deprecated
// -----------------------------------------------------------------------------

var DEPRECATION_WARNINGS = true;
function dissableDeprecationWarnings() {
  DEPRECATION_WARNINGS = false;
}

function warn(msg) {
  if (DEPRECATION_WARNINGS && console && typeof console.warn === 'function') {
    var msg2 = '\nHere is an Error object for you containing the call stack:';
    console.warn(msg, msg2, new Error());
  }
}

// (Stream|Property, Stream|Property) -> Property
Observable.prototype.awaiting = function (other) {
  warn('You are using deprecated .awaiting() method, see https://github.com/rpominov/kefir/issues/145');
  return awaiting(this, other);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.valuesToErrors = function (fn) {
  warn('You are using deprecated .valuesToErrors() method, see https://github.com/rpominov/kefir/issues/149');
  return valuesToErrors(this, fn);
};

// (Stream, Function|undefined) -> Stream
// (Property, Function|undefined) -> Property
Observable.prototype.errorsToValues = function (fn) {
  warn('You are using deprecated .errorsToValues() method, see https://github.com/rpominov/kefir/issues/149');
  return errorsToValues(this, fn);
};

// (Stream) -> Stream
// (Property) -> Property
Observable.prototype.endOnError = function () {
  warn('You are using deprecated .endOnError() method, see https://github.com/rpominov/kefir/issues/150');
  return endOnError(this);
};

// Exports
// --------------------------------------------------------------------------

var Kefir = {
  Observable: Observable,
  Stream: Stream,
  Property: Property,
  never: never,
  later: later,
  interval: interval,
  sequentially: sequentially,
  fromPoll: fromPoll,
  withInterval: withInterval,
  fromCallback: fromCallback,
  fromNodeCallback: fromNodeCallback,
  fromEvents: fromEvents,
  stream: stream,
  constant: constant,
  constantError: constantError,
  fromPromise: fromPromise,
  fromESObservable: fromESObservable,
  combine: combine,
  zip: zip,
  merge: merge,
  concat: concat$1,
  Pool: Pool,
  pool: pool,
  repeat: repeat,
  staticLand: staticLand
};

Kefir.Kefir = Kefir;

exports.dissableDeprecationWarnings = dissableDeprecationWarnings;
exports.Kefir = Kefir;
exports.Observable = Observable;
exports.Stream = Stream;
exports.Property = Property;
exports.never = never;
exports.later = later;
exports.interval = interval;
exports.sequentially = sequentially;
exports.fromPoll = fromPoll;
exports.withInterval = withInterval;
exports.fromCallback = fromCallback;
exports.fromNodeCallback = fromNodeCallback;
exports.fromEvents = fromEvents;
exports.stream = stream;
exports.constant = constant;
exports.constantError = constantError;
exports.fromPromise = fromPromise;
exports.fromESObservable = fromESObservable;
exports.combine = combine;
exports.zip = zip;
exports.merge = merge;
exports.concat = concat$1;
exports.Pool = Pool;
exports.pool = pool;
exports.repeat = repeat;
exports.staticLand = staticLand;
exports['default'] = Kefir;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kefir__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__raf__ = __webpack_require__(12);



const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

window.addEventListener('load', () => {
  document.body.style.margin = 0;
  document.body.appendChild(canvas);
});

canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.display = 'block';

const resize = Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'resize').map(getSize).toProperty(getSize);

resize.onValue(updateSize);

const instances = [];

let renderStream;

function updateSize(size) {
  canvas.width = size.width;
  canvas.height = size.height;
}

function getSize() {
  return {
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio
  };
}

function aspect() {
  const { width, height } = canvas;

  if (width < height) {
    context.scale(1, width / height);
  } else {
    context.scale(height / width, 1);
  }
}

function render(instances) {
  context.save();
  context.fillStyle = 'black';
  context.scale(canvas.width, canvas.height);
  context.fillRect(0, 0, 1, 1);
  context.lineWidth = 1 / Math.min(canvas.width, canvas.height);

  instances.forEach(instance => {
    context.save();
    instance.render(context, instance, aspect);
    context.restore();
  });

  context.restore();
}

function add(instance) {
  instances.push(instance);

  if (renderStream) {
    renderStream.offValue(render);
  }

  const kefirProperties = instances.map(instance => instance.kefirProperty);

  renderStream = Object(__WEBPACK_IMPORTED_MODULE_1__raf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["combine"])([resize, ...kefirProperties], (size, ...properties) => properties)).onValue(render);

  return instance;
}

/* harmony default export */ __webpack_exports__["a"] = (function ({ type, props, render }) {
  return function () {
    let emitter;

    const instanceProps = Object.assign({}, props);
    const instance = {};

    Object.keys(instanceProps).forEach(key => {
      Object.defineProperty(instance, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value(value) {
          instanceProps[key] = value;

          if (emitter) {
            emitter.emit(instanceProps);
          }

          return instance;
        }
      });
    });

    const kefirProperty = Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["stream"])(e => {
      emitter = e;
    }).toProperty(() => instanceProps);

    Object.defineProperty(instance, 'kefirProperty', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: kefirProperty
    });

    Object.defineProperty(instanceProps, 'render', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: render
    });

    return add(instance);
  };
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wobble__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kefir__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kefir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kefir__);



function ensureKefirStream(any) {
  return typeof any === 'number' ? Object(__WEBPACK_IMPORTED_MODULE_1_kefir__["constant"])(any) : any.kefirProperty;
}

const mathFunctions = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  pow: (a, b) => Math.pow(a, b),
  floor: a => Math.floor(a),
  ceil: a => Math.ceil(a)
};

function decorate(stream, name, value) {
  Object.defineProperty(stream, name, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: value
  });
}

function create(kefirStream, initial = 0) {
  const kefirProperty = kefirStream.toProperty(() => initial);

  const stream = {
    kefirProperty
  };

  Object.keys(mathFunctions).forEach(key => {
    decorate(stream, key, (...args) => create(Object(__WEBPACK_IMPORTED_MODULE_1_kefir__["combine"])([kefirProperty, ...args.map(arg => ensureKefirStream(arg))], mathFunctions[key])));
  });

  decorate(stream, 'connect', function (fn) {
    kefirProperty.onValue(fn);
    return this;
  });

  decorate(stream, 'log', function () {
    kefirProperty.log();
    return this;
  });

  decorate(stream, 'throttle', function (...args) {
    return create(kefirProperty.throttle(...args), 0);
  });

  decorate(stream, 'delay', function (...args) {
    return create(kefirProperty.delay(...args), 0);
  });

  decorate(stream, 'spring', function (options) {
    let emit;
    let running;

    const spring = new __WEBPACK_IMPORTED_MODULE_0_wobble__["a" /* Spring */](options);

    spring.onStart(() => {
      running = true;
    }).onUpdate(s => {
      if (emit) {
        emit(s.currentValue);
      }
    }).onStop(() => {
      running = false;
    });

    return create(kefirProperty.withHandler((emitter, event) => {
      emit = emitter.emit;

      if (event.type === 'value') {
        spring.updateConfig({
          toValue: event.value
        });

        if (!running) {
          spring.start();
        }
      }
    }));
  });

  return stream;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_mouse__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_touch__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_lfo__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__output_audio__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__output_visual_types_circle__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__output_visual_types_rectangle__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__output_visual_types_triangle__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__output_visual_types_line__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return __WEBPACK_IMPORTED_MODULE_0__input_mouse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return __WEBPACK_IMPORTED_MODULE_1__input_touch__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lfo", function() { return __WEBPACK_IMPORTED_MODULE_2__input_lfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "audio", function() { return __WEBPACK_IMPORTED_MODULE_3__output_audio__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "circle", function() { return __WEBPACK_IMPORTED_MODULE_4__output_visual_types_circle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "rectangle", function() { return __WEBPACK_IMPORTED_MODULE_5__output_visual_types_rectangle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "triangle", function() { return __WEBPACK_IMPORTED_MODULE_6__output_visual_types_triangle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return __WEBPACK_IMPORTED_MODULE_7__output_visual_types_line__["a"]; });











/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kefir__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stream__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = ({
  x: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mousemove').map(e => e.clientX / window.innerWidth).skipDuplicates(), 0),

  y: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mousemove').map(e => e.clientY / window.innerHeight).skipDuplicates(), 0),

  down: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["merge"])([Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mousedown').map(() => 1), Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mouseup').map(() => 0)]), 0),

  up: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["merge"])([Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mousedown').map(() => 0), Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(window, 'mouseup').map(() => 1)]), 0)
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spring; });
var __assign=Object.assign||function(t){for(var i,e=1,n=arguments.length;e<n;e++){i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t};function invariant(t,i){if(!t)throw new Error(i)}function withDefault(t,i){return void 0!==t&&null!==t?t:i}var Spring=function(){function t(t){void 0===t&&(t={}),this._listeners=[],this._currentAnimationStep=0,this._currentTime=0,this._springTime=0,this._currentValue=0,this._currentVelocity=0,this._isAnimating=!1,this._oscillationVelocityPairs=[],this._config={fromValue:withDefault(t.fromValue,0),toValue:withDefault(t.toValue,1),stiffness:withDefault(t.stiffness,100),damping:withDefault(t.damping,10),mass:withDefault(t.mass,1),initialVelocity:withDefault(t.initialVelocity,0),overshootClamping:withDefault(t.overshootClamping,!1),allowsOverdamping:withDefault(t.allowsOverdamping,!1),restVelocityThreshold:withDefault(t.restVelocityThreshold,.001),restDisplacementThreshold:withDefault(t.restDisplacementThreshold,.001)},this._currentValue=this._config.fromValue,this._currentVelocity=this._config.initialVelocity}return t.prototype.start=function(){var t=this,i=this._config,e=i.fromValue,n=i.toValue,r=i.initialVelocity;return e===n&&0===r||(this._reset(),this._isAnimating=!0,this._currentAnimationStep||(this._notifyListeners("onStart"),this._currentAnimationStep=requestAnimationFrame(function(i){t._step(Date.now())}))),this},t.prototype.stop=function(){return this._isAnimating?(this._isAnimating=!1,this._notifyListeners("onStop"),this._currentAnimationStep&&(cancelAnimationFrame(this._currentAnimationStep),this._currentAnimationStep=0),this):this},Object.defineProperty(t.prototype,"currentValue",{get:function(){return this._currentValue},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentVelocity",{get:function(){return this._currentVelocity},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAtRest",{get:function(){return this._isSpringAtRest()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAnimating",{get:function(){return this._isAnimating},enumerable:!0,configurable:!0}),t.prototype.updateConfig=function(t){this._advanceSpringToTime(Date.now());var i={fromValue:this._currentValue,initialVelocity:this._currentVelocity};return this._config=__assign({},this._config,i,t),this._reset(),this},t.prototype.onStart=function(t){return this._listeners.push({onStart:t}),this},t.prototype.onUpdate=function(t){return this._listeners.push({onUpdate:t}),this},t.prototype.onStop=function(t){return this._listeners.push({onStop:t}),this},t.prototype.removeListener=function(t){return this._listeners=this._listeners.reduce(function(i,e){return-1!==Object.values(e).indexOf(t)||i.push(e),i},[]),this},t.prototype.removeAllListeners=function(){return this._listeners=[],this},t.prototype._reset=function(){this._currentTime=Date.now(),this._springTime=0,this._currentValue=this._config.fromValue,this._currentVelocity=this._config.initialVelocity},t.prototype._notifyListeners=function(t){var i=this;this._listeners.forEach(function(e){var n=e[t];"function"==typeof n&&n(i)})},t.prototype._step=function(t){var i=this;this._advanceSpringToTime(t,!0),this._isAnimating&&(this._currentAnimationStep=requestAnimationFrame(function(t){return i._step(Date.now())}))},t.prototype._advanceSpringToTime=function(i,e){if(void 0===e&&(e=!1),this._isAnimating){var n=i-this._currentTime;n>t.MAX_DELTA_TIME_MS&&(n=t.MAX_DELTA_TIME_MS),this._springTime+=n;var r=this._config.damping,s=this._config.mass,o=this._config.stiffness,a=this._config.fromValue,h=this._config.toValue,u=-this._config.initialVelocity;invariant(s>0,"Mass value must be greater than 0"),invariant(o>0,"Stiffness value must be greater than 0"),invariant(r>0,"Damping value must be greater than 0");var c=r/(2*Math.sqrt(o*s)),l=Math.sqrt(o/s)/1e3,f=l*Math.sqrt(1-c*c),p=l*Math.sqrt(c*c-1),_=h-a;c>1&&!this._config.allowsOverdamping&&(c=1);var g=0,m=0,y=this._springTime;if(c<1)g=h-(V=Math.exp(-c*l*y))*((u+c*l*_)/f*Math.sin(f*y)+_*Math.cos(f*y)),m=c*l*V*(Math.sin(f*y)*(u+c*l*_)/f+_*Math.cos(f*y))-V*(Math.cos(f*y)*(u+c*l*_)-f*_*Math.sin(f*y));else if(1===c){g=h-(V=Math.exp(-l*y))*(_+(u+l*_)*y),m=V*(u*(y*l-1)+y*_*(l*l))}else{var V;g=h-(V=Math.exp(-c*l*y))*((u+c*l*_)*Math.sinh(p*y)+p*_*Math.cosh(p*y))/p,m=V*c*l*(Math.sinh(p*y)*(u+c*l*_)+_*p*Math.cosh(p*y))/p-V*(p*Math.cosh(p*y)*(u+c*l*_)+p*p*_*Math.sinh(p*y))/p}if(this._currentTime=i,this._currentValue=g,this._currentVelocity=m,e&&(this._notifyListeners("onUpdate"),this._isAnimating))return this._isSpringOvershooting()||this._isSpringAtRest()?(0!==o&&(this._currentValue=h,this._currentVelocity=0,this._notifyListeners("onUpdate")),void this.stop()):void 0}},t.prototype._isSpringOvershooting=function(){var t=this._config,i=t.stiffness,e=t.fromValue,n=t.toValue,r=!1;return t.overshootClamping&&0!==i&&(r=e<n?this._currentValue>n:this._currentValue<n),r},t.prototype._isSpringAtRest=function(){var t=this._config,i=t.stiffness,e=t.toValue,n=t.restDisplacementThreshold,r=t.restVelocityThreshold,s=Math.abs(this._currentVelocity)<=r;return 0!==i&&Math.abs(e-this._currentValue)<=n&&s},t.MAX_DELTA_TIME_MS=1/60*1e3*4,t}();
//# sourceMappingURL=wobble.es.js.map


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kefir__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stream__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);





const hammer = new __WEBPACK_IMPORTED_MODULE_2_hammerjs___default.a(document);

document.addEventListener('touchstart', e => {
  e.preventDefault();
}, {
  passive: false
});

/* harmony default export */ __webpack_exports__["a"] = ({
  tap: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["stream"])(emitter => {
    hammer.on('tap', e => {
      emitter.emit(1);
      setTimeout(() => {
        emitter.emit(0);
      }, e.deltaTime);
    });
  }), 0),

  swipe: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["stream"])(emitter => {
    hammer.on('swipe', e => {
      setTimeout(() => {
        emitter.emit(1);
        setTimeout(() => {
          emitter.emit(0);
        }, e.deltaTime);
      }, 100);
    });
  }), 0),

  down: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["merge"])([Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchstart').map(() => 1), Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchend').map(() => 0)]), 0),

  x: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["merge"])([Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchmove').map(e => e.changedTouches[0].clientX / window.innerWidth), Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchstart').map(e => e.changedTouches[0].clientX / window.innerWidth)])),

  y: Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["merge"])([Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchmove').map(e => e.changedTouches[0].clientY / window.innerHeight), Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["fromEvents"])(document, 'touchstart').map(e => e.changedTouches[0].clientY / window.innerHeight)]))
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kefir___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kefir__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stream__ = __webpack_require__(2);



const raf = Object(__WEBPACK_IMPORTED_MODULE_0_kefir__["stream"])(emitter => {
  function tick(time = 0) {
    emitter.emit(time);
    window.requestAnimationFrame(tick);
  }

  tick();
});

/* harmony default export */ __webpack_exports__["a"] = ({
  sine: (rate = 1000) => Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(raf.map(seconds => Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)),

  square: (rate = 1000) => Object(__WEBPACK_IMPORTED_MODULE_1__stream__["a" /* default */])(raf.map(seconds => Math.round(Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)).skipDuplicates())
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const context = new window.AudioContext();

/* harmony default export */ __webpack_exports__["a"] = (function () {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.frequency.setTargetAtTime(440, 0, 0);
  oscillator.start();
  oscillator.connect(gain);

  gain.connect(context.destination);
  gain.gain.setTargetAtTime(0, 0, 0);

  const transitionTimes = {
    gain: 0.005,
    frequency: 0.005
  };

  return {
    sine() {
      oscillator.type = 'sine';
      return this;
    },

    square() {
      oscillator.type = 'square';
      return this;
    },

    sawtooth() {
      oscillator.type = 'sawtooth';
      return this;
    },

    triangle() {
      oscillator.type = 'triangle';
      return this;
    },

    gainTransitionTime(value) {
      transitionTimes.gain = value;
      return this;
    },

    frequencyTransitionTime(value) {
      transitionTimes.frequency = value;
      return this;
    },

    gain(value) {
      gain.gain.setTargetAtTime(value, 0, transitionTimes.gain);
      return this;
    },

    frequency(value) {
      oscillator.frequency.setTargetAtTime(value, 0, transitionTimes.frequency);
      return this;
    }
  };
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_shape__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__render_shape__["a" /* default */])({
  type: 'circle',

  props: {
    x: 0,
    y: 0,
    radius: 0.5,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, radius, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.beginPath();
    context.arc(0, 0, Math.max(0, radius), 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}));

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (stream => {
  let value;
  let frame;

  return stream.withHandler((emitter, event) => {
    if (event.type === 'end') {
      emitter.end();
    }

    if (event.type === 'value') {
      value = event.value;

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = null;
          emitter.emit(value);
        });
      }
    }
  });
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_shape__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__render_shape__["a" /* default */])({
  type: 'rectangle',

  props: {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    rotation: 0,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, width, height, rotation, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.rotate(rotation * Math.PI / 180);
    context.translate(-width / 2, -height / 2);
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.fillRect(0, 0, width, height);
  }
}));

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_shape__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__render_shape__["a" /* default */])({
  type: 'triangle',

  props: {
    x: 0,
    y: 0,
    size: 1,
    rotation: 0,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, size, rotation, hue, saturation, lightness, alpha } = props;

    context.translate(x, y);
    aspect();
    context.rotate(rotation * Math.PI / 180);
    context.translate(-size / 2, -size / 2);
    context.beginPath();
    context.moveTo(size / 2, 0);
    context.lineTo(size, size);
    context.lineTo(0, size);
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.fill();
  }
}));

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_shape__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__render_shape__["a" /* default */])({
  type: 'line',

  props: {
    x1: 0,
    y1: 0,
    x2: 0.5,
    y2: 0.5,
    width: 0.01,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x1, y1, x2, y2, width, hue, saturation, lightness, alpha } = props;

    // aspect()
    context.beginPath();
    context.lineWidth = width;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
    context.stroke();
  }
}));

/***/ })
/******/ ])));
//# sourceMappingURL=avio.js.map