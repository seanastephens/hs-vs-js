/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _list = __webpack_require__(1);

	var _integralMonoids = __webpack_require__(3);

	var _stdlib = __webpack_require__(2);

	/* Lets try it all out! */

	var xs = (0, _list.cons)(1, (0, _list.cons)(2));
	var ys = (0, _list.cons)(3, (0, _list.cons)(4));

	(0, _stdlib.show)('xs =', xs);
	(0, _stdlib.show)('ys =', ys);
	(0, _stdlib.show)();

	(0, _stdlib.show)('xs <> ys =', xs.mappend(ys));
	(0, _stdlib.show)('ys <> xs =', ys.mappend(xs));
	(0, _stdlib.show)();

	(0, _stdlib.show)('xs <> xs <> xs =', xs.mappend(xs).mappend(xs));
	(0, _stdlib.show)();

	(0, _stdlib.show)('len xs =', xs.length());
	(0, _stdlib.show)('len (xs <> xs) =', xs.mappend(xs).length());
	(0, _stdlib.show)('len [] =', _list.emptyList.length());
	(0, _stdlib.show)();

	(0, _stdlib.show)('head xs =', xs.head());
	(0, _stdlib.show)('tail xs =', xs.tail());
	(0, _stdlib.show)('head . tail $ xs =', xs.tail().head());
	(0, _stdlib.show)('tail . tail $ xs =', xs.tail().tail());
	(0, _stdlib.show)();

	(0, _stdlib.show)('mempty::Sum =', (0, _integralMonoids.Sum)().mempty());
	(0, _stdlib.show)('Sum 1 <> Sum 2 =', (0, _integralMonoids.Sum)(1).mappend((0, _integralMonoids.Sum)(2)));
	(0, _stdlib.show)('Sum 1 <> mempty::Sum =', (0, _integralMonoids.Sum)(1).mappend((0, _integralMonoids.Sum)().mempty()));
	(0, _stdlib.show)();
	(0, _stdlib.show)('mempty::Product =', (0, _integralMonoids.Product)().mempty());
	(0, _stdlib.show)('Product 1 <> Product 2 =', (0, _integralMonoids.Product)(1).mappend((0, _integralMonoids.Product)(2)));
	(0, _stdlib.show)('Product 1 <> mempty::Product =', (0, _integralMonoids.Product)(1).mappend((0, _integralMonoids.Product)().mempty()));
	(0, _stdlib.show)();

	/* 
	 * Well this is really awkward... 
	 * functions required by a type class definition are written as methods, 
	 * but other functions are regular, unattached functions.
	 *
	 * That said, this works.
	 */
	var mplus = function mplus(x, y) {
	  return x.mappend(y);
	};
	var mconcat = function mconcat(xss) {
	  return xss.foldr(mplus, xss.head().mempty());
	};

	var xss = (0, _list.cons)(xs, (0, _list.cons)(xs, _list.emptyList));
	(0, _stdlib.show)('xss =', xss);
	(0, _stdlib.show)('mconcat xss =', mconcat(xss));
	(0, _stdlib.show)();

	(0, _stdlib.show)('And on a second monoid!');
	(0, _stdlib.show)();

	var zs = (0, _list.cons)((0, _integralMonoids.Sum)(1), (0, _list.cons)((0, _integralMonoids.Sum)(2), (0, _list.cons)((0, _integralMonoids.Sum)(3))));
	(0, _stdlib.show)('zs =', zs);
	(0, _stdlib.show)('mconcat zs =', mconcat(zs));
	(0, _stdlib.show)();

	var ts = (0, _list.cons)((0, _list.cons)((0, _integralMonoids.Sum)(1)));
	(0, _stdlib.show)('ts =', ts);
	(0, _stdlib.show)('type ts =', ts.type());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _stdlib = __webpack_require__(2);

	var List = (0, _stdlib.NewType)().Monoid({
		mempty: function mempty() {
			return List(null);
		},
		mappend: function mappend(other) {
			if (!this.value) return other;
			return cons(this.value.head, this.value.tail.mappend(other));
		}
	}).Show({
		show: function show() {
			if (this.value === null) return '[]';
			return '(' + this.value.head.show() + '):' + this.value.tail.show();
		}
	}).Rest({
		head: function head() {
			return this.value.head;
		},
		tail: function tail() {
			return this.value.tail;
		},
		empty: function empty() {
			return this === emptyList;
		},
		length: function length() {
			return this === emptyList ? 0 : 1 + this.value.tail.length();
		},
		foldr: function foldr(f, x0) {
			return this.empty() ? x0 : f(this.head(), this.tail().foldr(f, x0));
		},
		type: function type() {
			return '[' + (this.empty() ? '?' : this.head().type()) + ']';
		}
	}).done();

	exports.List = List;
	var emptyList = List(null);
	exports.emptyList = emptyList;
	var cons = function cons(head, tail) {
		return List({ head: head, tail: tail || emptyList });
	};
	exports.cons = cons;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * Int and String are the 'primitive' values, and they need show and type so 
	 * our recursive methods (namely show and type) bottom out. Every other show
	 * and type should be recursive.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	Number.prototype.show = function () {
	  return this;
	};
	String.prototype.show = function () {
	  return this;
	};
	Number.prototype.type = function () {
	  return 'Int';
	};
	String.prototype.type = function () {
	  return 'String';
	};

	/* helpers */
	var merge = function merge(a, b) {
	  return Object.assign({}, a, b);
	};
	exports.merge = merge;
	var show = function show() {
	  for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
	    xs[_key] = arguments[_key];
	  }

	  return console.log.apply(console, _toConsumableArray(xs.map(function (x) {
	    return x.show();
	  })));
	};

	exports.show = show;
	/*
	 * Make a new typeclass named `name` and with required 
	 * definitions `requiredFuncs.` 
	 *
	 * NOTE: This should only be used inside this file, for now. You could
	 * make a mixin interface, probably.
	 */
	var typeclass = function typeclass(name, requiredFuncs) {
	  return function (funcs) {
	    var missingFuncs = requiredFuncs.filter(function (name) {
	      return !funcs[name];
	    });
	    if (missingFuncs.length) throw name + ' definition not satisfied: missing ' + missingFuncs;
	    this.funcs = merge(this.funcs, funcs);
	    return this;
	  };
	};

	/* All our typeclasses */
	var Monoid = typeclass('Monoid', ['mempty', 'mappend']);
	var Show = typeclass('Show', ['show']);
	var Rest = typeclass('rest', []);

	/* 
	 * Define a new type. If you simply use NewType().done()(x), you will get back 
	 *	{ value: x } 
	 * This is simply a wrapped type, a bit like `type ID = Int` in haskell. More 
	 * usefully, by chaining method calls you can make the type an instance of the 
	 * available typeclasses. The `rest` typeclass is a catchall for other methods 
	 * (think length on [])
	 */
	var NewType = function NewType(name) {
	  return {
	    funcs: {},
	    Monoid: Monoid,
	    Show: Show,
	    Rest: Rest,
	    done: function done() {
	      var _this = this;

	      return function (o) {
	        return merge({ value: o }, _this.funcs);
	      };
	    }
	  };
	};
	exports.NewType = NewType;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _stdlib = __webpack_require__(2);

	var Sum = (0, _stdlib.NewType)().Monoid({
		mempty: function mempty() {
			return Sum(0);
		},
		mappend: function mappend(other) {
			return Sum(this.value + other.value);
		}
	}).Show({
		show: function show() {
			return 'Sum ' + this.value;
		}
	}).Rest({
		type: function type() {
			return 'Sum Int';
		}
	}).done();

	exports.Sum = Sum;
	var Product = (0, _stdlib.NewType)().Monoid({
		mempty: function mempty() {
			return Product(1);
		},
		mappend: function mappend(other) {
			return Product(this.value * other.value);
		}
	}).Show({
		show: function show() {
			return 'Product ' + this.value;
		}
	}).Rest({
		type: function type() {
			return 'Sum Int';
		}
	}).done();
	exports.Product = Product;

/***/ }
/******/ ]);