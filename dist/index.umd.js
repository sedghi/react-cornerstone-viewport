(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _typeof2 = unwrapExports(_typeof_1);

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopDefault(ex) {
	  return ex && _typeof2(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	var cornerstone = _interopDefault(require('cornerstone-core'));

	var cornerstoneWADOImageLoader = _interopDefault(require('cornerstone-wado-image-loader'));

	var dicomParser = _interopDefault(require('dicom-parser'));

	var React = require('react');

	var React__default = _interopDefault(React);

	var cornerstoneTools = _interopDefault(require('cornerstone-tools'));

	var reactDom = _interopDefault(require('react-dom'));

	var _cornerstoneWADOImage = cornerstoneWADOImageLoader.wadors.metaData,
	    getNumberValue = _cornerstoneWADOImage.getNumberValue,
	    getValue = _cornerstoneWADOImage.getValue;

	function wadoRsMetaDataProvider(type, imageId) {
	  var metaData = cornerstoneWADOImageLoader.wadors.metaDataManager.get(imageId);

	  if (!metaData) {
	    return;
	  }

	  if (metaData[type] !== undefined && metaData[type].Value !== undefined && metaData[type].Value.length) {
	    return metaData[type].Value[0];
	  }

	  var typeCleaned = type.replace('x', '');

	  if (metaData[typeCleaned] !== undefined && metaData[typeCleaned].Value !== undefined && metaData[typeCleaned].Value.length) {
	    return metaData[typeCleaned].Value[0];
	  }

	  if (type === 'generalImageModule') {
	    return {
	      sopInstanceUid: getValue(metaData['00080018']),
	      instanceNumber: getNumberValue(metaData['00200013']),
	      lossyImageCompression: getValue(metaData['00282110']),
	      lossyImageCompressionRatio: getValue(metaData['00282112']),
	      lossyImageCompressionMethod: getValue(metaData['00282114'])
	    };
	  }

	  if (type === 'patientModule') {
	    return {
	      patientName: getValue(metaData['00100010']),
	      patientId: getValue(metaData['00100020']),
	      patientSex: getValue(metaData['00100040']),
	      patientBirthDate: getValue(metaData['00100030'])
	    };
	  }

	  if (type === 'spacingBetweenSlices') {
	    return getValue(metaData['00180088']);
	  }

	  if (type === 'generalStudyModule') {
	    return {
	      studyDescription: getValue(metaData['00081030']),
	      studyDate: getValue(metaData['00080020']),
	      studyTime: getValue(metaData['00080030']),
	      accessionNumber: getValue(metaData['00080050'])
	    };
	  }

	  if (type === 'cineModule') {
	    return {
	      frameTime: getNumberValue(metaData['00181063'])
	    };
	  }
	}

	cornerstone.metaData.addProvider(wadoRsMetaDataProvider);

	function wadoUriMetaDataProvider(type, imageId) {
	  var _cornerstoneWADOImage2 = cornerstoneWADOImageLoader.wadouri,
	      parseImageId = _cornerstoneWADOImage2.parseImageId,
	      dataSetCacheManager = _cornerstoneWADOImage2.dataSetCacheManager;
	  var parsedImageId = parseImageId(imageId);
	  var dataSet = dataSetCacheManager.get(parsedImageId.url);

	  if (!dataSet) {
	    return;
	  }

	  if (type === 'generalImageModule') {
	    return {
	      sopInstanceUid: dataSet.string('x00080018'),
	      instanceNumber: dataSet.intString('x00200013'),
	      lossyImageCompression: dataSet.string('x00282110'),
	      lossyImageCompressionRatio: dataSet.string('x00282112'),
	      lossyImageCompressionMethod: dataSet.string('x00282114')
	    };
	  }

	  if (type === 'patientModule') {
	    return {
	      patientName: dataSet.string('x00100010'),
	      patientId: dataSet.string('x00100020')
	    };
	  }

	  if (type === 'generalStudyModule') {
	    return {
	      studyDescription: dataSet.string('x00081030'),
	      studyDate: dataSet.string('x00080020'),
	      studyTime: dataSet.string('x00080030')
	    };
	  }

	  if (type === 'cineModule') {
	    return {
	      frameTime: dataSet.float('x00181063')
	    };
	  }

	  if (dataSet.elements[type] !== undefined) {
	    var element = dataSet.elements[type];

	    if (!element.vr) {
	      return;
	    }

	    return dicomParser.explicitElementToString(dataSet, element);
	  }
	}

	cornerstone.metaData.addProvider(wadoUriMetaDataProvider);
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports$1(x) {
	  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule$1(fn, module) {
	  return module = {
	    exports: {}
	  }, fn(module, module.exports), module.exports;
	}

	var arrayLikeToArray = createCommonjsModule$1(function (module) {
	  function _arrayLikeToArray(arr, len) {
	    if (len == null || len > arr.length) len = arr.length;

	    for (var i = 0, arr2 = new Array(len); i < len; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }

	  module.exports = _arrayLikeToArray;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(arrayLikeToArray);
	var arrayWithoutHoles = createCommonjsModule$1(function (module) {
	  function _arrayWithoutHoles(arr) {
	    if (Array.isArray(arr)) return arrayLikeToArray(arr);
	  }

	  module.exports = _arrayWithoutHoles;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(arrayWithoutHoles);
	var iterableToArray = createCommonjsModule$1(function (module) {
	  function _iterableToArray(iter) {
	    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	  }

	  module.exports = _iterableToArray;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(iterableToArray);
	var unsupportedIterableToArray = createCommonjsModule$1(function (module) {
	  function _unsupportedIterableToArray(o, minLen) {
	    if (!o) return;
	    if (typeof o === "string") return arrayLikeToArray(o, minLen);
	    var n = Object.prototype.toString.call(o).slice(8, -1);
	    if (n === "Object" && o.constructor) n = o.constructor.name;
	    if (n === "Map" || n === "Set") return Array.from(o);
	    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	  }

	  module.exports = _unsupportedIterableToArray;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(unsupportedIterableToArray);
	var nonIterableSpread = createCommonjsModule$1(function (module) {
	  function _nonIterableSpread() {
	    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  module.exports = _nonIterableSpread;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(nonIterableSpread);
	var toConsumableArray = createCommonjsModule$1(function (module) {
	  function _toConsumableArray(arr) {
	    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	  }

	  module.exports = _toConsumableArray;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _toConsumableArray = unwrapExports$1(toConsumableArray);

	var asyncToGenerator = createCommonjsModule$1(function (module) {
	  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	    try {
	      var info = gen[key](arg);
	      var value = info.value;
	    } catch (error) {
	      reject(error);
	      return;
	    }

	    if (info.done) {
	      resolve(value);
	    } else {
	      Promise.resolve(value).then(_next, _throw);
	    }
	  }

	  function _asyncToGenerator(fn) {
	    return function () {
	      var self = this,
	          args = arguments;
	      return new Promise(function (resolve, reject) {
	        var gen = fn.apply(self, args);

	        function _next(value) {
	          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	        }

	        function _throw(err) {
	          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	        }

	        _next(undefined);
	      });
	    };
	  }

	  module.exports = _asyncToGenerator;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _asyncToGenerator = unwrapExports$1(asyncToGenerator);

	var classCallCheck = createCommonjsModule$1(function (module) {
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  module.exports = _classCallCheck;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _classCallCheck = unwrapExports$1(classCallCheck);

	var createClass = createCommonjsModule$1(function (module) {
	  function _defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties(Constructor, staticProps);
	    return Constructor;
	  }

	  module.exports = _createClass;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _createClass = unwrapExports$1(createClass);

	var assertThisInitialized = createCommonjsModule$1(function (module) {
	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  module.exports = _assertThisInitialized;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _assertThisInitialized = unwrapExports$1(assertThisInitialized);

	var setPrototypeOf = createCommonjsModule$1(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});
	unwrapExports$1(setPrototypeOf);
	var inherits = createCommonjsModule$1(function (module) {
	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) setPrototypeOf(subClass, superClass);
	  }

	  module.exports = _inherits;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _inherits = unwrapExports$1(inherits);

	var _typeof_1$1 = createCommonjsModule$1(function (module) {
	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return typeof obj;
	      };

	      module.exports["default"] = module.exports, module.exports.__esModule = true;
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };

	      module.exports["default"] = module.exports, module.exports.__esModule = true;
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports$1(_typeof_1$1);
	var possibleConstructorReturn = createCommonjsModule$1(function (module) {
	  var _typeof = _typeof_1$1["default"];

	  function _possibleConstructorReturn(self, call) {
	    if (call && (_typeof(call) === "object" || typeof call === "function")) {
	      return call;
	    }

	    return assertThisInitialized(self);
	  }

	  module.exports = _possibleConstructorReturn;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _possibleConstructorReturn = unwrapExports$1(possibleConstructorReturn);

	var getPrototypeOf = createCommonjsModule$1(function (module) {
	  function _getPrototypeOf(o) {
	    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	      return o.__proto__ || Object.getPrototypeOf(o);
	    };
	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	    return _getPrototypeOf(o);
	  }

	  module.exports = _getPrototypeOf;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _getPrototypeOf = unwrapExports$1(getPrototypeOf);

	var defineProperty = createCommonjsModule$1(function (module) {
	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  module.exports = _defineProperty;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _defineProperty = unwrapExports$1(defineProperty);

	var runtime_1 = createCommonjsModule$1(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {
	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function define(obj, key, value) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	      return obj[key];
	    }

	    try {
	      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	      define({}, "");
	    } catch (err) {
	      define = function define(obj, key, value) {
	        return obj[key] = value;
	      };
	    }

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        define(prototype, method, function (arg) {
	          return this._invoke(method, arg);
	        });
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;
	        define(genFun, toStringTagSymbol, "GeneratorFunction");
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator, PromiseImpl) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && _typeof2(value) === "object" && hasOwn.call(value, "__await")) {
	            return PromiseImpl.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return PromiseImpl.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	      if (PromiseImpl === void 0) PromiseImpl = Promise;
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function stop() {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports);

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});
	var regenerator = runtime_1;
	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var b = "function" === typeof Symbol && Symbol.for,
	    c = b ? Symbol.for("react.element") : 60103,
	    d = b ? Symbol.for("react.portal") : 60106,
	    e = b ? Symbol.for("react.fragment") : 60107,
	    f = b ? Symbol.for("react.strict_mode") : 60108,
	    g = b ? Symbol.for("react.profiler") : 60114,
	    h = b ? Symbol.for("react.provider") : 60109,
	    k = b ? Symbol.for("react.context") : 60110,
	    l = b ? Symbol.for("react.async_mode") : 60111,
	    m = b ? Symbol.for("react.concurrent_mode") : 60111,
	    n = b ? Symbol.for("react.forward_ref") : 60112,
	    p = b ? Symbol.for("react.suspense") : 60113,
	    q = b ? Symbol.for("react.suspense_list") : 60120,
	    r = b ? Symbol.for("react.memo") : 60115,
	    t = b ? Symbol.for("react.lazy") : 60116,
	    v = b ? Symbol.for("react.block") : 60121,
	    w = b ? Symbol.for("react.fundamental") : 60117,
	    x = b ? Symbol.for("react.responder") : 60118,
	    y = b ? Symbol.for("react.scope") : 60119;

	function z(a) {
	  if ("object" === _typeof2(a) && null !== a) {
	    var u = a.$$typeof;

	    switch (u) {
	      case c:
	        switch (a = a.type, a) {
	          case l:
	          case m:
	          case e:
	          case g:
	          case f:
	          case p:
	            return a;

	          default:
	            switch (a = a && a.$$typeof, a) {
	              case k:
	              case n:
	              case t:
	              case r:
	              case h:
	                return a;

	              default:
	                return u;
	            }

	        }

	      case d:
	        return u;
	    }
	  }
	}

	function A(a) {
	  return z(a) === m;
	}

	var AsyncMode = l;
	var ConcurrentMode = m;
	var ContextConsumer = k;
	var ContextProvider = h;
	var Element$1 = c;
	var ForwardRef = n;
	var Fragment = e;
	var Lazy = t;
	var Memo = r;
	var Portal = d;
	var Profiler = g;
	var StrictMode = f;
	var Suspense = p;

	var isAsyncMode = function isAsyncMode(a) {
	  return A(a) || z(a) === l;
	};

	var isConcurrentMode = A;

	var isContextConsumer = function isContextConsumer(a) {
	  return z(a) === k;
	};

	var isContextProvider = function isContextProvider(a) {
	  return z(a) === h;
	};

	var isElement = function isElement(a) {
	  return "object" === _typeof2(a) && null !== a && a.$$typeof === c;
	};

	var isForwardRef = function isForwardRef(a) {
	  return z(a) === n;
	};

	var isFragment = function isFragment(a) {
	  return z(a) === e;
	};

	var isLazy = function isLazy(a) {
	  return z(a) === t;
	};

	var isMemo = function isMemo(a) {
	  return z(a) === r;
	};

	var isPortal = function isPortal(a) {
	  return z(a) === d;
	};

	var isProfiler = function isProfiler(a) {
	  return z(a) === g;
	};

	var isStrictMode = function isStrictMode(a) {
	  return z(a) === f;
	};

	var isSuspense = function isSuspense(a) {
	  return z(a) === p;
	};

	var isValidElementType = function isValidElementType(a) {
	  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof2(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
	};

	var typeOf = z;
	var reactIs_production_min = {
	  AsyncMode: AsyncMode,
	  ConcurrentMode: ConcurrentMode,
	  ContextConsumer: ContextConsumer,
	  ContextProvider: ContextProvider,
	  Element: Element$1,
	  ForwardRef: ForwardRef,
	  Fragment: Fragment,
	  Lazy: Lazy,
	  Memo: Memo,
	  Portal: Portal,
	  Profiler: Profiler,
	  StrictMode: StrictMode,
	  Suspense: Suspense,
	  isAsyncMode: isAsyncMode,
	  isConcurrentMode: isConcurrentMode,
	  isContextConsumer: isContextConsumer,
	  isContextProvider: isContextProvider,
	  isElement: isElement,
	  isForwardRef: isForwardRef,
	  isFragment: isFragment,
	  isLazy: isLazy,
	  isMemo: isMemo,
	  isPortal: isPortal,
	  isProfiler: isProfiler,
	  isStrictMode: isStrictMode,
	  isSuspense: isSuspense,
	  isValidElementType: isValidElementType,
	  typeOf: typeOf
	};
	var reactIs_development = createCommonjsModule$1(function (module, exports) {
	  if (process.env.NODE_ENV !== "production") {
	    (function () {
	      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	      // nor polyfill, then a plain number is used for performance.
	      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	      // (unstable) APIs that have been removed. Can we remove the symbols?

	      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	      function isValidElementType(type) {
	        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	      }

	      function typeOf(object) {
	        if (_typeof2(object) === 'object' && object !== null) {
	          var $$typeof = object.$$typeof;

	          switch ($$typeof) {
	            case REACT_ELEMENT_TYPE:
	              var type = object.type;

	              switch (type) {
	                case REACT_ASYNC_MODE_TYPE:
	                case REACT_CONCURRENT_MODE_TYPE:
	                case REACT_FRAGMENT_TYPE:
	                case REACT_PROFILER_TYPE:
	                case REACT_STRICT_MODE_TYPE:
	                case REACT_SUSPENSE_TYPE:
	                  return type;

	                default:
	                  var $$typeofType = type && type.$$typeof;

	                  switch ($$typeofType) {
	                    case REACT_CONTEXT_TYPE:
	                    case REACT_FORWARD_REF_TYPE:
	                    case REACT_LAZY_TYPE:
	                    case REACT_MEMO_TYPE:
	                    case REACT_PROVIDER_TYPE:
	                      return $$typeofType;

	                    default:
	                      return $$typeof;
	                  }

	              }

	            case REACT_PORTAL_TYPE:
	              return $$typeof;
	          }
	        }

	        return undefined;
	      } // AsyncMode is deprecated along with isAsyncMode


	      var AsyncMode = REACT_ASYNC_MODE_TYPE;
	      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	      var ContextConsumer = REACT_CONTEXT_TYPE;
	      var ContextProvider = REACT_PROVIDER_TYPE;
	      var Element = REACT_ELEMENT_TYPE;
	      var ForwardRef = REACT_FORWARD_REF_TYPE;
	      var Fragment = REACT_FRAGMENT_TYPE;
	      var Lazy = REACT_LAZY_TYPE;
	      var Memo = REACT_MEMO_TYPE;
	      var Portal = REACT_PORTAL_TYPE;
	      var Profiler = REACT_PROFILER_TYPE;
	      var StrictMode = REACT_STRICT_MODE_TYPE;
	      var Suspense = REACT_SUSPENSE_TYPE;
	      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	      function isAsyncMode(object) {
	        {
	          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	            console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	          }
	        }
	        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	      }

	      function isConcurrentMode(object) {
	        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	      }

	      function isContextConsumer(object) {
	        return typeOf(object) === REACT_CONTEXT_TYPE;
	      }

	      function isContextProvider(object) {
	        return typeOf(object) === REACT_PROVIDER_TYPE;
	      }

	      function isElement(object) {
	        return _typeof2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	      }

	      function isForwardRef(object) {
	        return typeOf(object) === REACT_FORWARD_REF_TYPE;
	      }

	      function isFragment(object) {
	        return typeOf(object) === REACT_FRAGMENT_TYPE;
	      }

	      function isLazy(object) {
	        return typeOf(object) === REACT_LAZY_TYPE;
	      }

	      function isMemo(object) {
	        return typeOf(object) === REACT_MEMO_TYPE;
	      }

	      function isPortal(object) {
	        return typeOf(object) === REACT_PORTAL_TYPE;
	      }

	      function isProfiler(object) {
	        return typeOf(object) === REACT_PROFILER_TYPE;
	      }

	      function isStrictMode(object) {
	        return typeOf(object) === REACT_STRICT_MODE_TYPE;
	      }

	      function isSuspense(object) {
	        return typeOf(object) === REACT_SUSPENSE_TYPE;
	      }

	      exports.AsyncMode = AsyncMode;
	      exports.ConcurrentMode = ConcurrentMode;
	      exports.ContextConsumer = ContextConsumer;
	      exports.ContextProvider = ContextProvider;
	      exports.Element = Element;
	      exports.ForwardRef = ForwardRef;
	      exports.Fragment = Fragment;
	      exports.Lazy = Lazy;
	      exports.Memo = Memo;
	      exports.Portal = Portal;
	      exports.Profiler = Profiler;
	      exports.StrictMode = StrictMode;
	      exports.Suspense = Suspense;
	      exports.isAsyncMode = isAsyncMode;
	      exports.isConcurrentMode = isConcurrentMode;
	      exports.isContextConsumer = isContextConsumer;
	      exports.isContextProvider = isContextProvider;
	      exports.isElement = isElement;
	      exports.isForwardRef = isForwardRef;
	      exports.isFragment = isFragment;
	      exports.isLazy = isLazy;
	      exports.isMemo = isMemo;
	      exports.isPortal = isPortal;
	      exports.isProfiler = isProfiler;
	      exports.isStrictMode = isStrictMode;
	      exports.isSuspense = isSuspense;
	      exports.isValidElementType = isValidElementType;
	      exports.typeOf = typeOf;
	    })();
	  }
	});
	var reactIs_development_1 = reactIs_development.AsyncMode;
	var reactIs_development_2 = reactIs_development.ConcurrentMode;
	var reactIs_development_3 = reactIs_development.ContextConsumer;
	var reactIs_development_4 = reactIs_development.ContextProvider;
	var reactIs_development_5 = reactIs_development.Element;
	var reactIs_development_6 = reactIs_development.ForwardRef;
	var reactIs_development_7 = reactIs_development.Fragment;
	var reactIs_development_8 = reactIs_development.Lazy;
	var reactIs_development_9 = reactIs_development.Memo;
	var reactIs_development_10 = reactIs_development.Portal;
	var reactIs_development_11 = reactIs_development.Profiler;
	var reactIs_development_12 = reactIs_development.StrictMode;
	var reactIs_development_13 = reactIs_development.Suspense;
	var reactIs_development_14 = reactIs_development.isAsyncMode;
	var reactIs_development_15 = reactIs_development.isConcurrentMode;
	var reactIs_development_16 = reactIs_development.isContextConsumer;
	var reactIs_development_17 = reactIs_development.isContextProvider;
	var reactIs_development_18 = reactIs_development.isElement;
	var reactIs_development_19 = reactIs_development.isForwardRef;
	var reactIs_development_20 = reactIs_development.isFragment;
	var reactIs_development_21 = reactIs_development.isLazy;
	var reactIs_development_22 = reactIs_development.isMemo;
	var reactIs_development_23 = reactIs_development.isPortal;
	var reactIs_development_24 = reactIs_development.isProfiler;
	var reactIs_development_25 = reactIs_development.isStrictMode;
	var reactIs_development_26 = reactIs_development.isSuspense;
	var reactIs_development_27 = reactIs_development.isValidElementType;
	var reactIs_development_28 = reactIs_development.typeOf;
	var reactIs = createCommonjsModule$1(function (module) {
	  if (process.env.NODE_ENV === 'production') {
	    module.exports = reactIs_production_min;
	  } else {
	    module.exports = reactIs_development;
	  }
	});
	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
	  if (val === null || val === undefined) {
	    throw new TypeError('Object.assign cannot be called with null or undefined');
	  }

	  return Object(val);
	}

	function shouldUseNative() {
	  try {
	    if (!Object.assign) {
	      return false;
	    } // Detect buggy property enumeration order in older V8 versions.
	    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


	    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

	    test1[5] = 'de';

	    if (Object.getOwnPropertyNames(test1)[0] === '5') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test2 = {};

	    for (var i = 0; i < 10; i++) {
	      test2['_' + String.fromCharCode(i)] = i;
	    }

	    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
	      return test2[n];
	    });

	    if (order2.join('') !== '0123456789') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test3 = {};
	    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
	      test3[letter] = letter;
	    });

	    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
	      return false;
	    }

	    return true;
	  } catch (err) {
	    // We don't expect any of the above to throw, but better to be safe.
	    return false;
	  }
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	  var from;
	  var to = toObject(target);
	  var symbols;

	  for (var s = 1; s < arguments.length; s++) {
	    from = Object(arguments[s]);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }

	    if (getOwnPropertySymbols) {
	      symbols = getOwnPropertySymbols(from);

	      for (var i = 0; i < symbols.length; i++) {
	        if (propIsEnumerable.call(from, symbols[i])) {
	          to[symbols[i]] = from[symbols[i]];
	        }
	      }
	    }
	  }

	  return to;
	};
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	var printWarning = function printWarning() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function printWarning(text) {
	    var message = 'Warning: ' + text;

	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }

	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */


	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof2(typeSpecs[typeSpecName]) + '`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }

	        if (error && !(error instanceof Error)) {
	          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof2(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
	        }

	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	          var stack = getStack ? getStack() : '';
	          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
	        }
	      }
	    }
	  }
	}
	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */


	checkPropTypes.resetWarningCache = function () {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	var checkPropTypes_1 = checkPropTypes;
	var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

	var printWarning$1 = function printWarning$1() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning$1 = function printWarning$1(text) {
	    var message = 'Warning: ' + text;

	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }

	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */

	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */


	  var ANONYMOUS = '<<anonymous>>'; // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */

	  /*eslint-disable no-self-compare*/

	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */


	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  } // Make `instanceof Error` still work for returned errors.


	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }

	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;

	          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }

	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }

	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }

	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }

	      var propValue = props[propName];

	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }

	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

	        if (error instanceof Error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      if (!reactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
	        } else {
	          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }

	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);

	        if (type === 'symbol') {
	          return String(value);
	        }

	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }

	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }

	      for (var key in propValue) {
	        if (has$1(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];

	      if (typeof checker !== 'function') {
	        printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];

	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }

	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];

	        if (!checker) {
	          continue;
	        }

	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

	        if (error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      } // We need to check all keys in case some are required but missing from
	      // props.


	      var allKeys = objectAssign({}, props[propName], shapeTypes);

	      for (var key in allKeys) {
	        var checker = shapeTypes[key];

	        if (!checker) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	        }

	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

	        if (error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (_typeof2(propValue)) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;

	      case 'boolean':
	        return !propValue;

	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }

	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);

	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;

	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;

	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;

	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    } // falsy value can't be a Symbol


	    if (!propValue) {
	      return false;
	    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    } // Fallback for non-spec compliant Symbols which are polyfilled.


	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  } // Equivalent of `typeof` but with special handling for array and regexp.


	  function getPropType(propValue) {
	    var propType = _typeof2(propValue);

	    if (Array.isArray(propValue)) {
	      return 'array';
	    }

	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }

	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }

	    return propType;
	  } // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.


	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }

	    var propType = getPropType(propValue);

	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }

	    return propType;
	  } // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"


	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);

	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;

	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;

	      default:
	        return type;
	    }
	  } // Returns class name of the object, if any.


	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }

	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	  return ReactPropTypes;
	};

	function emptyFunction() {}

	function emptyFunctionWithReset() {}

	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	var factoryWithThrowingShims = function factoryWithThrowingShims() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret_1) {
	      // It is still safe when called from React.
	      return;
	    }

	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
	  }

	  shim.isRequired = shim;

	  function getShim() {
	    return shim;
	  } // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.


	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,
	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };
	  ReactPropTypes.PropTypes = ReactPropTypes;
	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule$1(function (module) {
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  if (process.env.NODE_ENV !== 'production') {
	    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
	    // http://fb.me/prop-types-in-prod

	    var throwOnDirectAccess = true;
	    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
	  } else {
	    // By explicitly using `prop-types` you are opting into new production behavior.
	    // http://fb.me/prop-types-in-prod
	    module.exports = factoryWithThrowingShims();
	  }
	});
	var classnames = createCommonjsModule$1(function (module) {
	  /*!
	    Copyright (c) 2017 Jed Watson.
	    Licensed under the MIT License (MIT), see
	    http://jedwatson.github.io/classnames
	  */

	  /* global define */
	  (function () {
	    var hasOwn = {}.hasOwnProperty;

	    function classNames() {
	      var classes = [];

	      for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (!arg) continue;

	        var argType = _typeof2(arg);

	        if (argType === 'string' || argType === 'number') {
	          classes.push(arg);
	        } else if (Array.isArray(arg) && arg.length) {
	          var inner = classNames.apply(null, arg);

	          if (inner) {
	            classes.push(inner);
	          }
	        } else if (argType === 'object') {
	          for (var key in arg) {
	            if (hasOwn.call(arg, key) && arg[key]) {
	              classes.push(key);
	            }
	          }
	        }
	      }

	      return classes.join(' ');
	    }

	    if (module.exports) {
	      classNames.default = classNames;
	      module.exports = classNames;
	    } else {
	      window.classNames = classNames;
	    }
	  })();
	});

	function styleInject(css, ref) {
	  if (ref === void 0) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') {
	    return;
	  }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = ".scroll {\n  height: 100%;\n  padding: 5px;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.scroll .scroll-holder {\n  height: calc(100% - 20px);\n  margin-top: 5px;\n  position: relative;\n  width: 12px;\n}\n.scroll .scroll-holder .imageSlider {\n  height: 12px;\n  left: 12px;\n  padding: 0;\n  position: absolute;\n  top: 0;\n  transform: rotate(90deg);\n  transform-origin: top left;\n  -webkit-appearance: none;\n  background-color: rgba(0, 0, 0, 0);\n}\n.scroll .scroll-holder .imageSlider:focus {\n  outline: none;\n}\n.scroll .scroll-holder .imageSlider::-moz-focus-outer {\n  border: none;\n}\n.scroll .scroll-holder .imageSlider::-webkit-slider-runnable-track {\n  background-color: rgba(0, 0, 0, 0);\n  border: none;\n  cursor: pointer;\n  height: 5px;\n  z-index: 6;\n}\n.scroll .scroll-holder .imageSlider::-moz-range-track {\n  background-color: rgba(0, 0, 0, 0);\n  border: none;\n  cursor: pointer;\n  height: 2px;\n  z-index: 6;\n}\n.scroll .scroll-holder .imageSlider::-ms-track {\n  animate: 0.2s;\n  background: transparent;\n  border: none;\n  border-width: 15px 0;\n  color: rgba(0, 0, 0, 0);\n  cursor: pointer;\n  height: 12px;\n  width: 100%;\n}\n.scroll .scroll-holder .imageSlider::-ms-fill-lower {\n  background: rgba(0, 0, 0, 0);\n}\n.scroll .scroll-holder .imageSlider::-ms-fill-upper {\n  background: rgba(0, 0, 0, 0);\n}\n.scroll .scroll-holder .imageSlider::-webkit-slider-thumb {\n  -webkit-appearance: none !important;\n  background-color: #163239;\n  border: none;\n  border-radius: 57px;\n  cursor: -webkit-grab;\n  height: 12px;\n  margin-top: -4px;\n  width: 39px;\n}\n.scroll .scroll-holder .imageSlider::-webkit-slider-thumb:active {\n  background-color: #20a5d6;\n  cursor: -webkit-grabbing;\n}\n.scroll .scroll-holder .imageSlider::-moz-range-thumb {\n  background-color: #163239;\n  border: none;\n  border-radius: 57px;\n  cursor: -moz-grab;\n  height: 12px;\n  width: 39px;\n  z-index: 7;\n}\n.scroll .scroll-holder .imageSlider::-moz-range-thumb:active {\n  background-color: #20a5d6;\n  cursor: -moz-grabbing;\n}\n.scroll .scroll-holder .imageSlider::-ms-thumb {\n  background-color: #163239;\n  border: none;\n  border-radius: 57px;\n  cursor: ns-resize;\n  height: 12px;\n  width: 39px;\n}\n.scroll .scroll-holder .imageSlider::-ms-thumb:active {\n  background-color: #20a5d6;\n}\n.scroll .scroll-holder .imageSlider::-ms-tooltip {\n  display: none;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .imageSlider {\n    left: 50px;\n  }\n}\n";
	styleInject(css_248z);

	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var ImageScrollbar = /*#__PURE__*/function (_PureComponent) {
	  _inherits(ImageScrollbar, _PureComponent);

	  var _super = _createSuper(ImageScrollbar);

	  function ImageScrollbar() {
	    var _this;

	    _classCallCheck(this, ImageScrollbar);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _super.call.apply(_super, [this].concat(args));

	    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
	      var intValue = parseInt(event.target.value, 10);

	      _this.props.onInputCallback(intValue);
	    });

	    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
	      // We don't allow direct keyboard up/down input on the
	      // image sliders since the natural direction is reversed (0 is at the top)
	      // Store the KeyCodes in an object for readability
	      var keys = {
	        DOWN: 40,
	        UP: 38
	      }; // TODO: Enable scroll down / scroll up without depending on ohif-core

	      if (event.which === keys.DOWN) {
	        //OHIF.commands.run('scrollDown');
	        event.preventDefault();
	      } else if (event.which === keys.UP) {
	        //OHIF.commands.run('scrollUp');
	        event.preventDefault();
	      }
	    });

	    return _this;
	  }

	  _createClass(ImageScrollbar, [{
	    key: "render",
	    value: function render() {
	      if (this.props.max === 0) {
	        return null;
	      }

	      this.style = {
	        width: "".concat(this.props.height)
	      };
	      return /*#__PURE__*/React__default.createElement("div", {
	        className: "scroll"
	      }, /*#__PURE__*/React__default.createElement("div", {
	        className: "scroll-holder"
	      }, /*#__PURE__*/React__default.createElement("input", {
	        className: "imageSlider",
	        style: this.style,
	        type: "range",
	        min: "0",
	        max: this.props.max,
	        step: "1",
	        value: this.props.value,
	        onChange: this.onChange,
	        onKeyDown: this.onKeyDown
	      })));
	    }
	  }]);

	  return ImageScrollbar;
	}(React.PureComponent);

	_defineProperty(ImageScrollbar, "propTypes", {
	  value: propTypes.number.isRequired,
	  max: propTypes.number.isRequired,
	  height: propTypes.string.isRequired,
	  onInputCallback: propTypes.func.isRequired
	});
	/**
	 * Formats a patient name for display purposes
	 */


	function formatPN(name) {
	  if (!name) {
	    return;
	  } // Convert the first ^ to a ', '. String.replace() only affects
	  // the first appearance of the character.


	  var commaBetweenFirstAndLast = name.replace('^', ', '); // Replace any remaining '^' characters with spaces

	  var cleaned = commaBetweenFirstAndLast.replace(/\^/g, ' '); // Trim any extraneous whitespace

	  return cleaned.trim();
	}

	function toInteger(dirtyNumber) {
	  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
	    return NaN;
	  }

	  var number = Number(dirtyNumber);

	  if (isNaN(number)) {
	    return number;
	  }

	  return number < 0 ? Math.ceil(number) : Math.floor(number);
	}

	function requiredArgs(required, args) {
	  if (args.length < required) {
	    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
	  }
	}
	/**
	 * @name toDate
	 * @category Common Helpers
	 * @summary Convert the given argument to an instance of Date.
	 *
	 * @description
	 * Convert the given argument to an instance of Date.
	 *
	 * If the argument is an instance of Date, the function returns its clone.
	 *
	 * If the argument is a number, it is treated as a timestamp.
	 *
	 * If the argument is none of the above, the function returns Invalid Date.
	 *
	 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	 *
	 * @param {Date|Number} argument - the value to convert
	 * @returns {Date} the parsed date in the local time zone
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Clone the date:
	 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
	 * //=> Tue Feb 11 2014 11:30:30
	 *
	 * @example
	 * // Convert the timestamp to date:
	 * const result = toDate(1392098430000)
	 * //=> Tue Feb 11 2014 11:30:30
	 */


	function toDate(argument) {
	  requiredArgs(1, arguments);
	  var argStr = Object.prototype.toString.call(argument); // Clone the date

	  if (argument instanceof Date || _typeof2(argument) === 'object' && argStr === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || argStr === '[object Number]') {
	    return new Date(argument);
	  } else {
	    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
	      // eslint-disable-next-line no-console
	      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

	      console.warn(new Error().stack);
	    }

	    return new Date(NaN);
	  }
	}
	/**
	 * @name addMilliseconds
	 * @category Millisecond Helpers
	 * @summary Add the specified number of milliseconds to the given date.
	 *
	 * @description
	 * Add the specified number of milliseconds to the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds added
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
	 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:30.750
	 */


	function addMilliseconds(dirtyDate, dirtyAmount) {
	  requiredArgs(2, arguments);
	  var timestamp = toDate(dirtyDate).getTime();
	  var amount = toInteger(dirtyAmount);
	  return new Date(timestamp + amount);
	}

	var MILLISECONDS_IN_MINUTE = 60000;

	function getDateMillisecondsPart(date) {
	  return date.getTime() % MILLISECONDS_IN_MINUTE;
	}
	/**
	 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
	 * They usually appear for dates that denote time before the timezones were introduced
	 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
	 * and GMT+01:00:00 after that date)
	 *
	 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
	 * which would lead to incorrect calculations.
	 *
	 * This function returns the timezone offset in milliseconds that takes seconds in account.
	 */


	function getTimezoneOffsetInMilliseconds(dirtyDate) {
	  var date = new Date(dirtyDate.getTime());
	  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
	  date.setSeconds(0, 0);
	  var hasNegativeUTCOffset = baseTimezoneOffset > 0;
	  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
	  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
	}
	/**
	 * @name isValid
	 * @category Common Helpers
	 * @summary Is the given date valid?
	 *
	 * @description
	 * Returns false if argument is Invalid Date and true otherwise.
	 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	 * Invalid Date is a Date, whose time value is NaN.
	 *
	 * Time value of Date: http://es5.github.io/#x15.9.1.1
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - Now `isValid` doesn't throw an exception
	 *   if the first argument is not an instance of Date.
	 *   Instead, argument is converted beforehand using `toDate`.
	 *
	 *   Examples:
	 *
	 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
	 *   |---------------------------|---------------|---------------|
	 *   | `new Date()`              | `true`        | `true`        |
	 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
	 *   | `new Date('')`            | `false`       | `false`       |
	 *   | `new Date(1488370835081)` | `true`        | `true`        |
	 *   | `new Date(NaN)`           | `false`       | `false`       |
	 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
	 *   | `''`                      | `TypeError`   | `false`       |
	 *   | `1488370835081`           | `TypeError`   | `true`        |
	 *   | `NaN`                     | `TypeError`   | `false`       |
	 *
	 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
	 *   that try to coerce arguments to the expected type
	 *   (which is also the case with other *date-fns* functions).
	 *
	 * @param {*} date - the date to check
	 * @returns {Boolean} the date is valid
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // For the valid date:
	 * var result = isValid(new Date(2014, 1, 31))
	 * //=> true
	 *
	 * @example
	 * // For the value, convertable into a date:
	 * var result = isValid(1393804800000)
	 * //=> true
	 *
	 * @example
	 * // For the invalid date:
	 * var result = isValid(new Date(''))
	 * //=> false
	 */


	function isValid(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  return !isNaN(date);
	}

	var formatDistanceLocale = {
	  lessThanXSeconds: {
	    one: 'less than a second',
	    other: 'less than {{count}} seconds'
	  },
	  xSeconds: {
	    one: '1 second',
	    other: '{{count}} seconds'
	  },
	  halfAMinute: 'half a minute',
	  lessThanXMinutes: {
	    one: 'less than a minute',
	    other: 'less than {{count}} minutes'
	  },
	  xMinutes: {
	    one: '1 minute',
	    other: '{{count}} minutes'
	  },
	  aboutXHours: {
	    one: 'about 1 hour',
	    other: 'about {{count}} hours'
	  },
	  xHours: {
	    one: '1 hour',
	    other: '{{count}} hours'
	  },
	  xDays: {
	    one: '1 day',
	    other: '{{count}} days'
	  },
	  aboutXWeeks: {
	    one: 'about 1 week',
	    other: 'about {{count}} weeks'
	  },
	  xWeeks: {
	    one: '1 week',
	    other: '{{count}} weeks'
	  },
	  aboutXMonths: {
	    one: 'about 1 month',
	    other: 'about {{count}} months'
	  },
	  xMonths: {
	    one: '1 month',
	    other: '{{count}} months'
	  },
	  aboutXYears: {
	    one: 'about 1 year',
	    other: 'about {{count}} years'
	  },
	  xYears: {
	    one: '1 year',
	    other: '{{count}} years'
	  },
	  overXYears: {
	    one: 'over 1 year',
	    other: 'over {{count}} years'
	  },
	  almostXYears: {
	    one: 'almost 1 year',
	    other: 'almost {{count}} years'
	  }
	};

	function formatDistance(token, count, options) {
	  options = options || {};
	  var result;

	  if (typeof formatDistanceLocale[token] === 'string') {
	    result = formatDistanceLocale[token];
	  } else if (count === 1) {
	    result = formatDistanceLocale[token].one;
	  } else {
	    result = formatDistanceLocale[token].other.replace('{{count}}', count);
	  }

	  if (options.addSuffix) {
	    if (options.comparison > 0) {
	      return 'in ' + result;
	    } else {
	      return result + ' ago';
	    }
	  }

	  return result;
	}

	function buildFormatLongFn(args) {
	  return function (dirtyOptions) {
	    var options = dirtyOptions || {};
	    var width = options.width ? String(options.width) : args.defaultWidth;
	    var format = args.formats[width] || args.formats[args.defaultWidth];
	    return format;
	  };
	}

	var dateFormats = {
	  full: 'EEEE, MMMM do, y',
	  long: 'MMMM do, y',
	  medium: 'MMM d, y',
	  short: 'MM/dd/yyyy'
	};
	var timeFormats = {
	  full: 'h:mm:ss a zzzz',
	  long: 'h:mm:ss a z',
	  medium: 'h:mm:ss a',
	  short: 'h:mm a'
	};
	var dateTimeFormats = {
	  full: "{{date}} 'at' {{time}}",
	  long: "{{date}} 'at' {{time}}",
	  medium: '{{date}}, {{time}}',
	  short: '{{date}}, {{time}}'
	};
	var formatLong = {
	  date: buildFormatLongFn({
	    formats: dateFormats,
	    defaultWidth: 'full'
	  }),
	  time: buildFormatLongFn({
	    formats: timeFormats,
	    defaultWidth: 'full'
	  }),
	  dateTime: buildFormatLongFn({
	    formats: dateTimeFormats,
	    defaultWidth: 'full'
	  })
	};
	var formatRelativeLocale = {
	  lastWeek: "'last' eeee 'at' p",
	  yesterday: "'yesterday at' p",
	  today: "'today at' p",
	  tomorrow: "'tomorrow at' p",
	  nextWeek: "eeee 'at' p",
	  other: 'P'
	};

	function formatRelative(token, _date, _baseDate, _options) {
	  return formatRelativeLocale[token];
	}

	function buildLocalizeFn(args) {
	  return function (dirtyIndex, dirtyOptions) {
	    var options = dirtyOptions || {};
	    var context = options.context ? String(options.context) : 'standalone';
	    var valuesArray;

	    if (context === 'formatting' && args.formattingValues) {
	      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
	      var width = options.width ? String(options.width) : defaultWidth;
	      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
	    } else {
	      var _defaultWidth = args.defaultWidth;

	      var _width = options.width ? String(options.width) : args.defaultWidth;

	      valuesArray = args.values[_width] || args.values[_defaultWidth];
	    }

	    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
	    return valuesArray[index];
	  };
	}

	var eraValues = {
	  narrow: ['B', 'A'],
	  abbreviated: ['BC', 'AD'],
	  wide: ['Before Christ', 'Anno Domini']
	};
	var quarterValues = {
	  narrow: ['1', '2', '3', '4'],
	  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
	  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
	  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
	  // Generally, formatted dates should look like they are in the middle of a sentence,
	  // e.g. in Spanish language the weekdays and months should be in the lowercase.

	};
	var monthValues = {
	  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
	  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	};
	var dayValues = {
	  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};
	var dayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  }
	};
	var formattingDayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  }
	};

	function ordinalNumber(dirtyNumber, _dirtyOptions) {
	  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
	  // if they are different for different grammatical genders,
	  // use `options.unit`:
	  //
	  //   var options = dirtyOptions || {}
	  //   var unit = String(options.unit)
	  //
	  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
	  // 'day', 'hour', 'minute', 'second'

	  var rem100 = number % 100;

	  if (rem100 > 20 || rem100 < 10) {
	    switch (rem100 % 10) {
	      case 1:
	        return number + 'st';

	      case 2:
	        return number + 'nd';

	      case 3:
	        return number + 'rd';
	    }
	  }

	  return number + 'th';
	}

	var localize = {
	  ordinalNumber: ordinalNumber,
	  era: buildLocalizeFn({
	    values: eraValues,
	    defaultWidth: 'wide'
	  }),
	  quarter: buildLocalizeFn({
	    values: quarterValues,
	    defaultWidth: 'wide',
	    argumentCallback: function argumentCallback(quarter) {
	      return Number(quarter) - 1;
	    }
	  }),
	  month: buildLocalizeFn({
	    values: monthValues,
	    defaultWidth: 'wide'
	  }),
	  day: buildLocalizeFn({
	    values: dayValues,
	    defaultWidth: 'wide'
	  }),
	  dayPeriod: buildLocalizeFn({
	    values: dayPeriodValues,
	    defaultWidth: 'wide',
	    formattingValues: formattingDayPeriodValues,
	    defaultFormattingWidth: 'wide'
	  })
	};

	function buildMatchPatternFn(args) {
	  return function (dirtyString, dirtyOptions) {
	    var string = String(dirtyString);
	    var options = dirtyOptions || {};
	    var matchResult = string.match(args.matchPattern);

	    if (!matchResult) {
	      return null;
	    }

	    var matchedString = matchResult[0];
	    var parseResult = string.match(args.parsePattern);

	    if (!parseResult) {
	      return null;
	    }

	    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    return {
	      value: value,
	      rest: string.slice(matchedString.length)
	    };
	  };
	}

	function buildMatchFn(args) {
	  return function (dirtyString, dirtyOptions) {
	    var string = String(dirtyString);
	    var options = dirtyOptions || {};
	    var width = options.width;
	    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
	    var matchResult = string.match(matchPattern);

	    if (!matchResult) {
	      return null;
	    }

	    var matchedString = matchResult[0];
	    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
	    var value;

	    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
	      value = findIndex(parsePatterns, function (pattern) {
	        return pattern.test(matchedString);
	      });
	    } else {
	      value = findKey(parsePatterns, function (pattern) {
	        return pattern.test(matchedString);
	      });
	    }

	    value = args.valueCallback ? args.valueCallback(value) : value;
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    return {
	      value: value,
	      rest: string.slice(matchedString.length)
	    };
	  };
	}

	function findKey(object, predicate) {
	  for (var key in object) {
	    if (object.hasOwnProperty(key) && predicate(object[key])) {
	      return key;
	    }
	  }
	}

	function findIndex(array, predicate) {
	  for (var key = 0; key < array.length; key++) {
	    if (predicate(array[key])) {
	      return key;
	    }
	  }
	}

	var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
	var parseOrdinalNumberPattern = /\d+/i;
	var matchEraPatterns = {
	  narrow: /^(b|a)/i,
	  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
	  wide: /^(before christ|before common era|anno domini|common era)/i
	};
	var parseEraPatterns = {
	  any: [/^b/i, /^(a|c)/i]
	};
	var matchQuarterPatterns = {
	  narrow: /^[1234]/i,
	  abbreviated: /^q[1234]/i,
	  wide: /^[1234](th|st|nd|rd)? quarter/i
	};
	var parseQuarterPatterns = {
	  any: [/1/i, /2/i, /3/i, /4/i]
	};
	var matchMonthPatterns = {
	  narrow: /^[jfmasond]/i,
	  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
	  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
	};
	var parseMonthPatterns = {
	  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
	  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
	};
	var matchDayPatterns = {
	  narrow: /^[smtwf]/i,
	  short: /^(su|mo|tu|we|th|fr|sa)/i,
	  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
	  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
	};
	var parseDayPatterns = {
	  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
	  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
	};
	var matchDayPeriodPatterns = {
	  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
	  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
	};
	var parseDayPeriodPatterns = {
	  any: {
	    am: /^a/i,
	    pm: /^p/i,
	    midnight: /^mi/i,
	    noon: /^no/i,
	    morning: /morning/i,
	    afternoon: /afternoon/i,
	    evening: /evening/i,
	    night: /night/i
	  }
	};
	var match = {
	  ordinalNumber: buildMatchPatternFn({
	    matchPattern: matchOrdinalNumberPattern,
	    parsePattern: parseOrdinalNumberPattern,
	    valueCallback: function valueCallback(value) {
	      return parseInt(value, 10);
	    }
	  }),
	  era: buildMatchFn({
	    matchPatterns: matchEraPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseEraPatterns,
	    defaultParseWidth: 'any'
	  }),
	  quarter: buildMatchFn({
	    matchPatterns: matchQuarterPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseQuarterPatterns,
	    defaultParseWidth: 'any',
	    valueCallback: function valueCallback(index) {
	      return index + 1;
	    }
	  }),
	  month: buildMatchFn({
	    matchPatterns: matchMonthPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseMonthPatterns,
	    defaultParseWidth: 'any'
	  }),
	  day: buildMatchFn({
	    matchPatterns: matchDayPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseDayPatterns,
	    defaultParseWidth: 'any'
	  }),
	  dayPeriod: buildMatchFn({
	    matchPatterns: matchDayPeriodPatterns,
	    defaultMatchWidth: 'any',
	    parsePatterns: parseDayPeriodPatterns,
	    defaultParseWidth: 'any'
	  })
	};
	/**
	 * @type {Locale}
	 * @category Locales
	 * @summary English locale (United States).
	 * @language English
	 * @iso-639-2 eng
	 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
	 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
	 */

	var locale = {
	  code: 'en-US',
	  formatDistance: formatDistance,
	  formatLong: formatLong,
	  formatRelative: formatRelative,
	  localize: localize,
	  match: match,
	  options: {
	    weekStartsOn: 0
	    /* Sunday */
	    ,
	    firstWeekContainsDate: 1
	  }
	};
	/**
	 * @name subMilliseconds
	 * @category Millisecond Helpers
	 * @summary Subtract the specified number of milliseconds from the given date.
	 *
	 * @description
	 * Subtract the specified number of milliseconds from the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds subtracted
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
	 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:29.250
	 */

	function subMilliseconds(dirtyDate, dirtyAmount) {
	  requiredArgs(2, arguments);
	  var amount = toInteger(dirtyAmount);
	  return addMilliseconds(dirtyDate, -amount);
	}

	function addLeadingZeros(number, targetLength) {
	  var sign = number < 0 ? '-' : '';
	  var output = Math.abs(number).toString();

	  while (output.length < targetLength) {
	    output = '0' + output;
	  }

	  return sign + output;
	}
	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* |                                |
	 * |  d  | Day of month                   |  D  |                                |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  y  | Year (abs)                     |  Y  |                                |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 */


	var formatters = {
	  // Year
	  y: function y(date, token) {
	    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
	    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
	    // |----------|-------|----|-------|-------|-------|
	    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
	    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
	    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
	    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
	    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
	    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	    var year = signedYear > 0 ? signedYear : 1 - signedYear;
	    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
	  },
	  // Month
	  M: function M(date, token) {
	    var month = date.getUTCMonth();
	    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
	  },
	  // Day of the month
	  d: function d(date, token) {
	    return addLeadingZeros(date.getUTCDate(), token.length);
	  },
	  // AM or PM
	  a: function a(date, token) {
	    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

	    switch (token) {
	      case 'a':
	      case 'aa':
	        return dayPeriodEnumValue.toUpperCase();

	      case 'aaa':
	        return dayPeriodEnumValue;

	      case 'aaaaa':
	        return dayPeriodEnumValue[0];

	      case 'aaaa':
	      default:
	        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
	    }
	  },
	  // Hour [1-12]
	  h: function h(date, token) {
	    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
	  },
	  // Hour [0-23]
	  H: function H(date, token) {
	    return addLeadingZeros(date.getUTCHours(), token.length);
	  },
	  // Minute
	  m: function m(date, token) {
	    return addLeadingZeros(date.getUTCMinutes(), token.length);
	  },
	  // Second
	  s: function s(date, token) {
	    return addLeadingZeros(date.getUTCSeconds(), token.length);
	  },
	  // Fraction of second
	  S: function S(date, token) {
	    var numberOfDigits = token.length;
	    var milliseconds = date.getUTCMilliseconds();
	    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
	    return addLeadingZeros(fractionalSeconds, token.length);
	  }
	};
	var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCDayOfYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var timestamp = date.getTime();
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	  var startOfYearTimestamp = date.getTime();
	  var difference = timestamp - startOfYearTimestamp;
	  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function startOfUTCISOWeek(dirtyDate) {
	  requiredArgs(1, arguments);
	  var weekStartsOn = 1;
	  var date = toDate(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function getUTCISOWeekYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var year = date.getUTCFullYear();
	  var fourthOfJanuaryOfNextYear = new Date(0);
	  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
	  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
	  var fourthOfJanuaryOfThisYear = new Date(0);
	  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
	  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function startOfUTCISOWeekYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var year = getUTCISOWeekYear(dirtyDate);
	  var fourthOfJanuary = new Date(0);
	  fourthOfJanuary.setUTCFullYear(year, 0, 4);
	  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
	  var date = startOfUTCISOWeek(fourthOfJanuary);
	  return date;
	}

	var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCISOWeek(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)

	  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function startOfUTCWeek(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  var date = toDate(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function getUTCWeekYear(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate, dirtyOptions);
	  var year = date.getUTCFullYear();
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var firstWeekOfNextYear = new Date(0);
	  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
	  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
	  var firstWeekOfThisYear = new Date(0);
	  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);

	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
	  var year = getUTCWeekYear(dirtyDate, dirtyOptions);
	  var firstWeek = new Date(0);
	  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeek.setUTCHours(0, 0, 0, 0);
	  var date = startOfUTCWeek(firstWeek, dirtyOptions);
	  return date;
	}

	var MILLISECONDS_IN_WEEK$1 = 604800000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCWeek(dirtyDate, options) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)

	  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
	}

	var dayPeriodEnum = {
	  am: 'am',
	  pm: 'pm',
	  midnight: 'midnight',
	  noon: 'noon',
	  morning: 'morning',
	  afternoon: 'afternoon',
	  evening: 'evening',
	  night: 'night'
	  /*
	   * |     | Unit                           |     | Unit                           |
	   * |-----|--------------------------------|-----|--------------------------------|
	   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
	   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
	   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
	   * |  d  | Day of month                   |  D  | Day of year                    |
	   * |  e  | Local day of week              |  E  | Day of week                    |
	   * |  f  |                                |  F* | Day of week in month           |
	   * |  g* | Modified Julian day            |  G  | Era                            |
	   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	   * |  i! | ISO day of week                |  I! | ISO week of year               |
	   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
	   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
	   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
	   * |  m  | Minute                         |  M  | Month                          |
	   * |  n  |                                |  N  |                                |
	   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
	   * |  p! | Long localized time            |  P! | Long localized date            |
	   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
	   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
	   * |  s  | Second                         |  S  | Fraction of second             |
	   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
	   * |  u  | Extended year                  |  U* | Cyclic year                    |
	   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
	   * |  w  | Local week of year             |  W* | Week of month                  |
	   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
	   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
	   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
	   *
	   * Letters marked by * are not implemented but reserved by Unicode standard.
	   *
	   * Letters marked by ! are non-standard, but implemented by date-fns:
	   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
	   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
	   *   i.e. 7 for Sunday, 1 for Monday, etc.
	   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
	   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
	   *   `R` is supposed to be used in conjunction with `I` and `i`
	   *   for universal ISO week-numbering date, whereas
	   *   `Y` is supposed to be used in conjunction with `w` and `e`
	   *   for week-numbering date specific to the locale.
	   * - `P` is long localized date format
	   * - `p` is long localized time format
	   */

	};
	var formatters$1 = {
	  // Era
	  G: function G(date, token, localize) {
	    var era = date.getUTCFullYear() > 0 ? 1 : 0;

	    switch (token) {
	      // AD, BC
	      case 'G':
	      case 'GG':
	      case 'GGG':
	        return localize.era(era, {
	          width: 'abbreviated'
	        });
	      // A, B

	      case 'GGGGG':
	        return localize.era(era, {
	          width: 'narrow'
	        });
	      // Anno Domini, Before Christ

	      case 'GGGG':
	      default:
	        return localize.era(era, {
	          width: 'wide'
	        });
	    }
	  },
	  // Year
	  y: function y(date, token, localize) {
	    // Ordinal number
	    if (token === 'yo') {
	      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	      var year = signedYear > 0 ? signedYear : 1 - signedYear;
	      return localize.ordinalNumber(year, {
	        unit: 'year'
	      });
	    }

	    return formatters.y(date, token);
	  },
	  // Local week-numbering year
	  Y: function Y(date, token, localize, options) {
	    var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

	    if (token === 'YY') {
	      var twoDigitYear = weekYear % 100;
	      return addLeadingZeros(twoDigitYear, 2);
	    } // Ordinal number


	    if (token === 'Yo') {
	      return localize.ordinalNumber(weekYear, {
	        unit: 'year'
	      });
	    } // Padding


	    return addLeadingZeros(weekYear, token.length);
	  },
	  // ISO week-numbering year
	  R: function R(date, token) {
	    var isoWeekYear = getUTCISOWeekYear(date); // Padding

	    return addLeadingZeros(isoWeekYear, token.length);
	  },
	  // Extended year. This is a single number designating the year of this calendar system.
	  // The main difference between `y` and `u` localizers are B.C. years:
	  // | Year | `y` | `u` |
	  // |------|-----|-----|
	  // | AC 1 |   1 |   1 |
	  // | BC 1 |   1 |   0 |
	  // | BC 2 |   2 |  -1 |
	  // Also `yy` always returns the last two digits of a year,
	  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
	  u: function u(date, token) {
	    var year = date.getUTCFullYear();
	    return addLeadingZeros(year, token.length);
	  },
	  // Quarter
	  Q: function Q(date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

	    switch (token) {
	      // 1, 2, 3, 4
	      case 'Q':
	        return String(quarter);
	      // 01, 02, 03, 04

	      case 'QQ':
	        return addLeadingZeros(quarter, 2);
	      // 1st, 2nd, 3rd, 4th

	      case 'Qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4

	      case 'QQQ':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	      case 'QQQQQ':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // 1st quarter, 2nd quarter, ...

	      case 'QQQQ':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone quarter
	  q: function q(date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

	    switch (token) {
	      // 1, 2, 3, 4
	      case 'q':
	        return String(quarter);
	      // 01, 02, 03, 04

	      case 'qq':
	        return addLeadingZeros(quarter, 2);
	      // 1st, 2nd, 3rd, 4th

	      case 'qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4

	      case 'qqq':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	      case 'qqqqq':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // 1st quarter, 2nd quarter, ...

	      case 'qqqq':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Month
	  M: function M(date, token, localize) {
	    var month = date.getUTCMonth();

	    switch (token) {
	      case 'M':
	      case 'MM':
	        return formatters.M(date, token);
	      // 1st, 2nd, ..., 12th

	      case 'Mo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec

	      case 'MMM':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // J, F, ..., D

	      case 'MMMMM':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // January, February, ..., December

	      case 'MMMM':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone month
	  L: function L(date, token, localize) {
	    var month = date.getUTCMonth();

	    switch (token) {
	      // 1, 2, ..., 12
	      case 'L':
	        return String(month + 1);
	      // 01, 02, ..., 12

	      case 'LL':
	        return addLeadingZeros(month + 1, 2);
	      // 1st, 2nd, ..., 12th

	      case 'Lo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec

	      case 'LLL':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // J, F, ..., D

	      case 'LLLLL':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // January, February, ..., December

	      case 'LLLL':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Local week of year
	  w: function w(date, token, localize, options) {
	    var week = getUTCWeek(date, options);

	    if (token === 'wo') {
	      return localize.ordinalNumber(week, {
	        unit: 'week'
	      });
	    }

	    return addLeadingZeros(week, token.length);
	  },
	  // ISO week of year
	  I: function I(date, token, localize) {
	    var isoWeek = getUTCISOWeek(date);

	    if (token === 'Io') {
	      return localize.ordinalNumber(isoWeek, {
	        unit: 'week'
	      });
	    }

	    return addLeadingZeros(isoWeek, token.length);
	  },
	  // Day of the month
	  d: function d(date, token, localize) {
	    if (token === 'do') {
	      return localize.ordinalNumber(date.getUTCDate(), {
	        unit: 'date'
	      });
	    }

	    return formatters.d(date, token);
	  },
	  // Day of year
	  D: function D(date, token, localize) {
	    var dayOfYear = getUTCDayOfYear(date);

	    if (token === 'Do') {
	      return localize.ordinalNumber(dayOfYear, {
	        unit: 'dayOfYear'
	      });
	    }

	    return addLeadingZeros(dayOfYear, token.length);
	  },
	  // Day of week
	  E: function E(date, token, localize) {
	    var dayOfWeek = date.getUTCDay();

	    switch (token) {
	      // Tue
	      case 'E':
	      case 'EE':
	      case 'EEE':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'EEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'EEEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'EEEE':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Local day of week
	  e: function e(date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

	    switch (token) {
	      // Numerical value (Nth day of week with current locale or weekStartsOn)
	      case 'e':
	        return String(localDayOfWeek);
	      // Padded numerical value

	      case 'ee':
	        return addLeadingZeros(localDayOfWeek, 2);
	      // 1st, 2nd, ..., 7th

	      case 'eo':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });

	      case 'eee':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'eeeee':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'eeeeee':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'eeee':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone local day of week
	  c: function c(date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

	    switch (token) {
	      // Numerical value (same as in `e`)
	      case 'c':
	        return String(localDayOfWeek);
	      // Padded numerical value

	      case 'cc':
	        return addLeadingZeros(localDayOfWeek, token.length);
	      // 1st, 2nd, ..., 7th

	      case 'co':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });

	      case 'ccc':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // T

	      case 'ccccc':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // Tu

	      case 'cccccc':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'standalone'
	        });
	      // Tuesday

	      case 'cccc':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // ISO day of week
	  i: function i(date, token, localize) {
	    var dayOfWeek = date.getUTCDay();
	    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

	    switch (token) {
	      // 2
	      case 'i':
	        return String(isoDayOfWeek);
	      // 02

	      case 'ii':
	        return addLeadingZeros(isoDayOfWeek, token.length);
	      // 2nd

	      case 'io':
	        return localize.ordinalNumber(isoDayOfWeek, {
	          unit: 'day'
	        });
	      // Tue

	      case 'iii':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'iiiii':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'iiiiii':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'iiii':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM or PM
	  a: function a(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

	    switch (token) {
	      case 'a':
	      case 'aa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'aaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();

	      case 'aaaaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'aaaa':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM, PM, midnight, noon
	  b: function b(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;

	    if (hours === 12) {
	      dayPeriodEnumValue = dayPeriodEnum.noon;
	    } else if (hours === 0) {
	      dayPeriodEnumValue = dayPeriodEnum.midnight;
	    } else {
	      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
	    }

	    switch (token) {
	      case 'b':
	      case 'bb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'bbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();

	      case 'bbbbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'bbbb':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // in the morning, in the afternoon, in the evening, at night
	  B: function B(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;

	    if (hours >= 17) {
	      dayPeriodEnumValue = dayPeriodEnum.evening;
	    } else if (hours >= 12) {
	      dayPeriodEnumValue = dayPeriodEnum.afternoon;
	    } else if (hours >= 4) {
	      dayPeriodEnumValue = dayPeriodEnum.morning;
	    } else {
	      dayPeriodEnumValue = dayPeriodEnum.night;
	    }

	    switch (token) {
	      case 'B':
	      case 'BB':
	      case 'BBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'BBBBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'BBBB':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Hour [1-12]
	  h: function h(date, token, localize) {
	    if (token === 'ho') {
	      var hours = date.getUTCHours() % 12;
	      if (hours === 0) hours = 12;
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return formatters.h(date, token);
	  },
	  // Hour [0-23]
	  H: function H(date, token, localize) {
	    if (token === 'Ho') {
	      return localize.ordinalNumber(date.getUTCHours(), {
	        unit: 'hour'
	      });
	    }

	    return formatters.H(date, token);
	  },
	  // Hour [0-11]
	  K: function K(date, token, localize) {
	    var hours = date.getUTCHours() % 12;

	    if (token === 'Ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return addLeadingZeros(hours, token.length);
	  },
	  // Hour [1-24]
	  k: function k(date, token, localize) {
	    var hours = date.getUTCHours();
	    if (hours === 0) hours = 24;

	    if (token === 'ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return addLeadingZeros(hours, token.length);
	  },
	  // Minute
	  m: function m(date, token, localize) {
	    if (token === 'mo') {
	      return localize.ordinalNumber(date.getUTCMinutes(), {
	        unit: 'minute'
	      });
	    }

	    return formatters.m(date, token);
	  },
	  // Second
	  s: function s(date, token, localize) {
	    if (token === 'so') {
	      return localize.ordinalNumber(date.getUTCSeconds(), {
	        unit: 'second'
	      });
	    }

	    return formatters.s(date, token);
	  },
	  // Fraction of second
	  S: function S(date, token) {
	    return formatters.S(date, token);
	  },
	  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
	  X: function X(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    if (timezoneOffset === 0) {
	      return 'Z';
	    }

	    switch (token) {
	      // Hours and optional minutes
	      case 'X':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XX`

	      case 'XXXX':
	      case 'XX':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XXX`

	      case 'XXXXX':
	      case 'XXX': // Hours and minutes with `:` delimiter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
	  x: function x(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Hours and optional minutes
	      case 'x':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xx`

	      case 'xxxx':
	      case 'xx':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xxx`

	      case 'xxxxx':
	      case 'xxx': // Hours and minutes with `:` delimiter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (GMT)
	  O: function O(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Short
	      case 'O':
	      case 'OO':
	      case 'OOO':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long

	      case 'OOOO':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (specific non-location)
	  z: function z(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Short
	      case 'z':
	      case 'zz':
	      case 'zzz':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long

	      case 'zzzz':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Seconds timestamp
	  t: function t(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = Math.floor(originalDate.getTime() / 1000);
	    return addLeadingZeros(timestamp, token.length);
	  },
	  // Milliseconds timestamp
	  T: function T(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = originalDate.getTime();
	    return addLeadingZeros(timestamp, token.length);
	  }
	};

	function formatTimezoneShort(offset, dirtyDelimiter) {
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = Math.floor(absOffset / 60);
	  var minutes = absOffset % 60;

	  if (minutes === 0) {
	    return sign + String(hours);
	  }

	  var delimiter = dirtyDelimiter || '';
	  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
	}

	function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
	  if (offset % 60 === 0) {
	    var sign = offset > 0 ? '-' : '+';
	    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
	  }

	  return formatTimezone(offset, dirtyDelimiter);
	}

	function formatTimezone(offset, dirtyDelimiter) {
	  var delimiter = dirtyDelimiter || '';
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
	  var minutes = addLeadingZeros(absOffset % 60, 2);
	  return sign + hours + delimiter + minutes;
	}

	function dateLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'P':
	      return formatLong.date({
	        width: 'short'
	      });

	    case 'PP':
	      return formatLong.date({
	        width: 'medium'
	      });

	    case 'PPP':
	      return formatLong.date({
	        width: 'long'
	      });

	    case 'PPPP':
	    default:
	      return formatLong.date({
	        width: 'full'
	      });
	  }
	}

	function timeLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'p':
	      return formatLong.time({
	        width: 'short'
	      });

	    case 'pp':
	      return formatLong.time({
	        width: 'medium'
	      });

	    case 'ppp':
	      return formatLong.time({
	        width: 'long'
	      });

	    case 'pppp':
	    default:
	      return formatLong.time({
	        width: 'full'
	      });
	  }
	}

	function dateTimeLongFormatter(pattern, formatLong) {
	  var matchResult = pattern.match(/(P+)(p+)?/);
	  var datePattern = matchResult[1];
	  var timePattern = matchResult[2];

	  if (!timePattern) {
	    return dateLongFormatter(pattern, formatLong);
	  }

	  var dateTimeFormat;

	  switch (datePattern) {
	    case 'P':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'short'
	      });
	      break;

	    case 'PP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'medium'
	      });
	      break;

	    case 'PPP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'long'
	      });
	      break;

	    case 'PPPP':
	    default:
	      dateTimeFormat = formatLong.dateTime({
	        width: 'full'
	      });
	      break;
	  }

	  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
	}

	var longFormatters = {
	  p: timeLongFormatter,
	  P: dateTimeLongFormatter
	};
	var protectedDayOfYearTokens = ['D', 'DD'];
	var protectedWeekYearTokens = ['YY', 'YYYY'];

	function isProtectedDayOfYearToken(token) {
	  return protectedDayOfYearTokens.indexOf(token) !== -1;
	}

	function isProtectedWeekYearToken(token) {
	  return protectedWeekYearTokens.indexOf(token) !== -1;
	}

	function throwProtectedError(token, format, input) {
	  if (token === 'YYYY') {
	    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'YY') {
	    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'D') {
	    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'DD') {
	    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  }
	} // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
	//   (one of the certain letters followed by `o`)
	// - (\w)\1* matches any sequences of the same letter
	// - '' matches two quote characters in a row
	// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
	//   except a single quote symbol, which ends the sequence.
	//   Two quote characters do not end the sequence.
	//   If there is no matching single quote
	//   then the sequence will continue until the end of the string.
	// - . matches any single character unmatched by previous parts of the RegExps


	var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
	// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

	var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	var escapedStringRegExp = /^'([^]*?)'?$/;
	var doubleQuoteRegExp = /''/g;
	var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
	/**
	 * @name format
	 * @category Common Helpers
	 * @summary Format the date.
	 *
	 * @description
	 * Return the formatted date string in the given format. The result may vary by locale.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://git.io/fxCyr
	 *
	 * The characters wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 * (see the last example)
	 *
	 * Format of the string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 7 below the table).
	 *
	 * Accepted patterns:
	 * | Unit                            | Pattern | Result examples                   | Notes |
	 * |---------------------------------|---------|-----------------------------------|-------|
	 * | Era                             | G..GGG  | AD, BC                            |       |
	 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 | GGGGG   | A, B                              |       |
	 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
	 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
	 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
	 * |                                 | yyyyy   | ...                               | 3,5   |
	 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
	 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
	 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
	 * |                                 | YYYYY   | ...                               | 3,5   |
	 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
	 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
	 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
	 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
	 * |                                 | RRRRR   | ...                               | 3,5,7 |
	 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
	 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
	 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
	 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
	 * |                                 | uuuuu   | ...                               | 3,5   |
	 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
	 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
	 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | qq      | 01, 02, 03, 04                    |       |
	 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
	 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
	 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | MM      | 01, 02, ..., 12                   |       |
	 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 | MMMM    | January, February, ..., December  | 2     |
	 * |                                 | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
	 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | LL      | 01, 02, ..., 12                   |       |
	 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 | LLLL    | January, February, ..., December  | 2     |
	 * |                                 | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
	 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
	 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | II      | 01, 02, ..., 53                   | 7     |
	 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
	 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
	 * |                                 | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
	 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
	 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
	 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 | DDDD    | ...                               | 3     |
	 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
	 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
	 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
	 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
	 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
	 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
	 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
	 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | ee      | 02, 03, ..., 01                   |       |
	 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | cc      | 02, 03, ..., 01                   |       |
	 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | AM, PM                          | a..aa   | AM, PM                            |       |
	 * |                                 | aaa     | am, pm                            |       |
	 * |                                 | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
	 * |                                 | bbb     | am, pm, noon, midnight            |       |
	 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
	 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
	 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
	 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
	 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
	 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          | m       | 0, 1, ..., 59                     |       |
	 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          | s       | 0, 1, ..., 59                     |       |
	 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | ss      | 00, 01, ..., 59                   |       |
	 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
	 * |                                 | SS      | 00, 01, ..., 99                   |       |
	 * |                                 | SSS     | 000, 0001, ..., 999               |       |
	 * |                                 | SSSS    | ...                               | 3     |
	 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
	 * |                                 | XX      | -0800, +0530, Z                   |       |
	 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
	 * |                                 | xx      | -0800, +0530, +0000               |       |
	 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
	 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
	 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
	 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
	 * | Seconds timestamp               | t       | 512969520                         | 7     |
	 * |                                 | tt      | ...                               | 3,7   |
	 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
	 * |                                 | TT      | ...                               | 3,7   |
	 * | Long localized date             | P       | 04/29/1453                        | 7     |
	 * |                                 | PP      | Apr 29, 1453                      | 7     |
	 * |                                 | PPP     | April 29th, 1453                  | 7     |
	 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
	 * | Long localized time             | p       | 12:00 AM                          | 7     |
	 * |                                 | pp      | 12:00:00 AM                       | 7     |
	 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
	 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
	 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
	 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
	 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
	 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
	 *    the output will be the same as default pattern for this unit, usually
	 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
	 *    are marked with "2" in the last column of the table.
	 *
	 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
	 *
	 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
	 *    The output will be padded with zeros to match the length of the pattern.
	 *
	 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
	 *
	 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 5. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` always returns the last two digits of a year,
	 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
	 *
	 *    | Year | `yy` | `uu` |
	 *    |------|------|------|
	 *    | 1    |   01 |   01 |
	 *    | 14   |   14 |   14 |
	 *    | 376  |   76 |  376 |
	 *    | 1453 |   53 | 1453 |
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
	 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
	 *
	 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
	 *    so right now these tokens fall back to GMT timezones.
	 *
	 * 7. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `t`: seconds timestamp
	 *    - `T`: milliseconds timestamp
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
	 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
	 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - The second argument is now required for the sake of explicitness.
	 *
	 *   ```javascript
	 *   // Before v2.0.0
	 *   format(new Date(2016, 0, 1))
	 *
	 *   // v2.0.0 onward
	 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
	 *   ```
	 *
	 * - New format string API for `format` function
	 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
	 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
	 *
	 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
	 *
	 * @param {Date|Number} date - the original date
	 * @param {String} format - the string of tokens
	 * @param {Object} [options] - an object with options.
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
	 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
	 *   see: https://git.io/fxCyr
	 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
	 *   see: https://git.io/fxCyr
	 * @returns {String} the formatted date string
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `date` must not be Invalid Date
	 * @throws {RangeError} `options.locale` must contain `localize` property
	 * @throws {RangeError} `options.locale` must contain `formatLong` property
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} format string contains an unescaped latin alphabet character
	 *
	 * @example
	 * // Represent 11 February 2014 in middle-endian format:
	 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
	 * //=> '02/11/2014'
	 *
	 * @example
	 * // Represent 2 July 2014 in Esperanto:
	 * import { eoLocale } from 'date-fns/locale/eo'
	 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
	 *   locale: eoLocale
	 * })
	 * //=> '2-a de julio 2014'
	 *
	 * @example
	 * // Escape string by single quote characters:
	 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
	 * //=> "3 o'clock"
	 */

	function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
	  requiredArgs(2, arguments);
	  var formatStr = String(dirtyFormatStr);
	  var options = dirtyOptions || {};
	  var locale$1 = options.locale || locale;
	  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  if (!locale$1.localize) {
	    throw new RangeError('locale must contain localize property');
	  }

	  if (!locale$1.formatLong) {
	    throw new RangeError('locale must contain formatLong property');
	  }

	  var originalDate = toDate(dirtyDate);

	  if (!isValid(originalDate)) {
	    throw new RangeError('Invalid time value');
	  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
	  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
	  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


	  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
	  var utcDate = subMilliseconds(originalDate, timezoneOffset);
	  var formatterOptions = {
	    firstWeekContainsDate: firstWeekContainsDate,
	    weekStartsOn: weekStartsOn,
	    locale: locale$1,
	    _originalDate: originalDate
	  };
	  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
	    var firstCharacter = substring[0];

	    if (firstCharacter === 'p' || firstCharacter === 'P') {
	      var longFormatter = longFormatters[firstCharacter];
	      return longFormatter(substring, locale$1.formatLong, formatterOptions);
	    }

	    return substring;
	  }).join('').match(formattingTokensRegExp).map(function (substring) {
	    // Replace two single quote characters with one single quote character
	    if (substring === "''") {
	      return "'";
	    }

	    var firstCharacter = substring[0];

	    if (firstCharacter === "'") {
	      return cleanEscapedString(substring);
	    }

	    var formatter = formatters$1[firstCharacter];

	    if (formatter) {
	      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
	        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
	      }

	      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
	        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
	      }

	      return formatter(utcDate, substring, locale$1.localize, formatterOptions);
	    }

	    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
	      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
	    }

	    return substring;
	  }).join('');
	  return result;
	}

	function cleanEscapedString(input) {
	  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
	}

	function assign(target, dirtyObject) {
	  if (target == null) {
	    throw new TypeError('assign requires that input parameter not be null or undefined');
	  }

	  dirtyObject = dirtyObject || {};

	  for (var property in dirtyObject) {
	    if (dirtyObject.hasOwnProperty(property)) {
	      target[property] = dirtyObject[property];
	    }
	  }

	  return target;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
	  requiredArgs(2, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  var date = toDate(dirtyDate);
	  var day = toInteger(dirtyDay);
	  var currentDay = date.getUTCDay();
	  var remainder = day % 7;
	  var dayIndex = (remainder + 7) % 7;
	  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
	  date.setUTCDate(date.getUTCDate() + diff);
	  return date;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function setUTCISODay(dirtyDate, dirtyDay) {
	  requiredArgs(2, arguments);
	  var day = toInteger(dirtyDay);

	  if (day % 7 === 0) {
	    day = day - 7;
	  }

	  var weekStartsOn = 1;
	  var date = toDate(dirtyDate);
	  var currentDay = date.getUTCDay();
	  var remainder = day % 7;
	  var dayIndex = (remainder + 7) % 7;
	  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
	  date.setUTCDate(date.getUTCDate() + diff);
	  return date;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
	  requiredArgs(2, arguments);
	  var date = toDate(dirtyDate);
	  var isoWeek = toInteger(dirtyISOWeek);
	  var diff = getUTCISOWeek(date) - isoWeek;
	  date.setUTCDate(date.getUTCDate() - diff * 7);
	  return date;
	} // See issue: https://github.com/date-fns/date-fns/issues/376


	function setUTCWeek(dirtyDate, dirtyWeek, options) {
	  requiredArgs(2, arguments);
	  var date = toDate(dirtyDate);
	  var week = toInteger(dirtyWeek);
	  var diff = getUTCWeek(date, options) - week;
	  date.setUTCDate(date.getUTCDate() - diff * 7);
	  return date;
	}

	var MILLISECONDS_IN_HOUR = 3600000;
	var MILLISECONDS_IN_MINUTE$1 = 60000;
	var MILLISECONDS_IN_SECOND = 1000;
	var numericPatterns = {
	  month: /^(1[0-2]|0?\d)/,
	  // 0 to 12
	  date: /^(3[0-1]|[0-2]?\d)/,
	  // 0 to 31
	  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
	  // 0 to 366
	  week: /^(5[0-3]|[0-4]?\d)/,
	  // 0 to 53
	  hour23h: /^(2[0-3]|[0-1]?\d)/,
	  // 0 to 23
	  hour24h: /^(2[0-4]|[0-1]?\d)/,
	  // 0 to 24
	  hour11h: /^(1[0-1]|0?\d)/,
	  // 0 to 11
	  hour12h: /^(1[0-2]|0?\d)/,
	  // 0 to 12
	  minute: /^[0-5]?\d/,
	  // 0 to 59
	  second: /^[0-5]?\d/,
	  // 0 to 59
	  singleDigit: /^\d/,
	  // 0 to 9
	  twoDigits: /^\d{1,2}/,
	  // 0 to 99
	  threeDigits: /^\d{1,3}/,
	  // 0 to 999
	  fourDigits: /^\d{1,4}/,
	  // 0 to 9999
	  anyDigitsSigned: /^-?\d+/,
	  singleDigitSigned: /^-?\d/,
	  // 0 to 9, -0 to -9
	  twoDigitsSigned: /^-?\d{1,2}/,
	  // 0 to 99, -0 to -99
	  threeDigitsSigned: /^-?\d{1,3}/,
	  // 0 to 999, -0 to -999
	  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999

	};
	var timezonePatterns = {
	  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
	  basic: /^([+-])(\d{2})(\d{2})|Z/,
	  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
	  extended: /^([+-])(\d{2}):(\d{2})|Z/,
	  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
	};

	function parseNumericPattern(pattern, string, valueCallback) {
	  var matchResult = string.match(pattern);

	  if (!matchResult) {
	    return null;
	  }

	  var value = parseInt(matchResult[0], 10);
	  return {
	    value: valueCallback ? valueCallback(value) : value,
	    rest: string.slice(matchResult[0].length)
	  };
	}

	function parseTimezonePattern(pattern, string) {
	  var matchResult = string.match(pattern);

	  if (!matchResult) {
	    return null;
	  } // Input is 'Z'


	  if (matchResult[0] === 'Z') {
	    return {
	      value: 0,
	      rest: string.slice(1)
	    };
	  }

	  var sign = matchResult[1] === '+' ? 1 : -1;
	  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
	  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
	  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
	  return {
	    value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE$1 + seconds * MILLISECONDS_IN_SECOND),
	    rest: string.slice(matchResult[0].length)
	  };
	}

	function parseAnyDigitsSigned(string, valueCallback) {
	  return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
	}

	function parseNDigits(n, string, valueCallback) {
	  switch (n) {
	    case 1:
	      return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);

	    case 2:
	      return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);

	    case 3:
	      return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);

	    case 4:
	      return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);

	    default:
	      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback);
	  }
	}

	function parseNDigitsSigned(n, string, valueCallback) {
	  switch (n) {
	    case 1:
	      return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);

	    case 2:
	      return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);

	    case 3:
	      return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);

	    case 4:
	      return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);

	    default:
	      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback);
	  }
	}

	function dayPeriodEnumToHours(enumValue) {
	  switch (enumValue) {
	    case 'morning':
	      return 4;

	    case 'evening':
	      return 17;

	    case 'pm':
	    case 'noon':
	    case 'afternoon':
	      return 12;

	    case 'am':
	    case 'midnight':
	    case 'night':
	    default:
	      return 0;
	  }
	}

	function normalizeTwoDigitYear(twoDigitYear, currentYear) {
	  var isCommonEra = currentYear > 0; // Absolute number of the current year:
	  // 1 -> 1 AC
	  // 0 -> 1 BC
	  // -1 -> 2 BC

	  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
	  var result;

	  if (absCurrentYear <= 50) {
	    result = twoDigitYear || 100;
	  } else {
	    var rangeEnd = absCurrentYear + 50;
	    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
	    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
	    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
	  }

	  return isCommonEra ? result : 1 - result;
	}

	var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // User for validation

	function isLeapYearIndex(year) {
	  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}
	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
	 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
	 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
	 * |  d  | Day of month                   |  D  | Day of year                    |
	 * |  e  | Local day of week              |  E  | Day of week                    |
	 * |  f  |                                |  F* | Day of week in month           |
	 * |  g* | Modified Julian day            |  G  | Era                            |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  i! | ISO day of week                |  I! | ISO week of year               |
	 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
	 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
	 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  n  |                                |  N  |                                |
	 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
	 * |  p  |                                |  P  |                                |
	 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
	 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
	 * |  u  | Extended year                  |  U* | Cyclic year                    |
	 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
	 * |  w  | Local week of year             |  W* | Week of month                  |
	 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
	 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
	 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 *
	 * Letters marked by ! are non-standard, but implemented by date-fns:
	 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
	 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
	 *   i.e. 7 for Sunday, 1 for Monday, etc.
	 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
	 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
	 *   `R` is supposed to be used in conjunction with `I` and `i`
	 *   for universal ISO week-numbering date, whereas
	 *   `Y` is supposed to be used in conjunction with `w` and `e`
	 *   for week-numbering date specific to the locale.
	 */


	var parsers = {
	  // Era
	  G: {
	    priority: 140,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        // AD, BC
	        case 'G':
	        case 'GG':
	        case 'GGG':
	          return match.era(string, {
	            width: 'abbreviated'
	          }) || match.era(string, {
	            width: 'narrow'
	          });
	        // A, B

	        case 'GGGGG':
	          return match.era(string, {
	            width: 'narrow'
	          });
	        // Anno Domini, Before Christ

	        case 'GGGG':
	        default:
	          return match.era(string, {
	            width: 'wide'
	          }) || match.era(string, {
	            width: 'abbreviated'
	          }) || match.era(string, {
	            width: 'narrow'
	          });
	      }
	    },
	    set: function set(date, flags, value, _options) {
	      flags.era = value;
	      date.setUTCFullYear(value, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['R', 'u', 't', 'T']
	  },
	  // Year
	  y: {
	    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
	    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
	    // |----------|-------|----|-------|-------|-------|
	    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
	    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
	    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
	    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
	    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
	    priority: 130,
	    parse: function parse(string, token, match, _options) {
	      var valueCallback = function valueCallback(year) {
	        return {
	          year: year,
	          isTwoDigitYear: token === 'yy'
	        };
	      };

	      switch (token) {
	        case 'y':
	          return parseNDigits(4, string, valueCallback);

	        case 'yo':
	          return match.ordinalNumber(string, {
	            unit: 'year',
	            valueCallback: valueCallback
	          });

	        default:
	          return parseNDigits(token.length, string, valueCallback);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value.isTwoDigitYear || value.year > 0;
	    },
	    set: function set(date, flags, value, _options) {
	      var currentYear = date.getUTCFullYear();

	      if (value.isTwoDigitYear) {
	        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
	        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
	        date.setUTCHours(0, 0, 0, 0);
	        return date;
	      }

	      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
	      date.setUTCFullYear(year, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local week-numbering year
	  Y: {
	    priority: 130,
	    parse: function parse(string, token, match, _options) {
	      var valueCallback = function valueCallback(year) {
	        return {
	          year: year,
	          isTwoDigitYear: token === 'YY'
	        };
	      };

	      switch (token) {
	        case 'Y':
	          return parseNDigits(4, string, valueCallback);

	        case 'Yo':
	          return match.ordinalNumber(string, {
	            unit: 'year',
	            valueCallback: valueCallback
	          });

	        default:
	          return parseNDigits(token.length, string, valueCallback);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value.isTwoDigitYear || value.year > 0;
	    },
	    set: function set(date, flags, value, options) {
	      var currentYear = getUTCWeekYear(date, options);

	      if (value.isTwoDigitYear) {
	        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
	        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
	        date.setUTCHours(0, 0, 0, 0);
	        return startOfUTCWeek(date, options);
	      }

	      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
	      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
	      date.setUTCHours(0, 0, 0, 0);
	      return startOfUTCWeek(date, options);
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
	  },
	  // ISO week-numbering year
	  R: {
	    priority: 130,
	    parse: function parse(string, token, _match, _options) {
	      if (token === 'R') {
	        return parseNDigitsSigned(4, string);
	      }

	      return parseNDigitsSigned(token.length, string);
	    },
	    set: function set(_date, _flags, value, _options) {
	      var firstWeekOfYear = new Date(0);
	      firstWeekOfYear.setUTCFullYear(value, 0, 4);
	      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
	      return startOfUTCISOWeek(firstWeekOfYear);
	    },
	    incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
	  },
	  // Extended year
	  u: {
	    priority: 130,
	    parse: function parse(string, token, _match, _options) {
	      if (token === 'u') {
	        return parseNDigitsSigned(4, string);
	      }

	      return parseNDigitsSigned(token.length, string);
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCFullYear(value, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
	  },
	  // Quarter
	  Q: {
	    priority: 120,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        // 1, 2, 3, 4
	        case 'Q':
	        case 'QQ':
	          // 01, 02, 03, 04
	          return parseNDigits(token.length, string);
	        // 1st, 2nd, 3rd, 4th

	        case 'Qo':
	          return match.ordinalNumber(string, {
	            unit: 'quarter'
	          });
	        // Q1, Q2, Q3, Q4

	        case 'QQQ':
	          return match.quarter(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	        case 'QQQQQ':
	          return match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // 1st quarter, 2nd quarter, ...

	        case 'QQQQ':
	        default:
	          return match.quarter(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 4;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMonth((value - 1) * 3, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Stand-alone quarter
	  q: {
	    priority: 120,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        // 1, 2, 3, 4
	        case 'q':
	        case 'qq':
	          // 01, 02, 03, 04
	          return parseNDigits(token.length, string);
	        // 1st, 2nd, 3rd, 4th

	        case 'qo':
	          return match.ordinalNumber(string, {
	            unit: 'quarter'
	          });
	        // Q1, Q2, Q3, Q4

	        case 'qqq':
	          return match.quarter(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	        case 'qqqqq':
	          return match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // 1st quarter, 2nd quarter, ...

	        case 'qqqq':
	        default:
	          return match.quarter(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 4;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMonth((value - 1) * 3, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Month
	  M: {
	    priority: 110,
	    parse: function parse(string, token, match, _options) {
	      var valueCallback = function valueCallback(value) {
	        return value - 1;
	      };

	      switch (token) {
	        // 1, 2, ..., 12
	        case 'M':
	          return parseNumericPattern(numericPatterns.month, string, valueCallback);
	        // 01, 02, ..., 12

	        case 'MM':
	          return parseNDigits(2, string, valueCallback);
	        // 1st, 2nd, ..., 12th

	        case 'Mo':
	          return match.ordinalNumber(string, {
	            unit: 'month',
	            valueCallback: valueCallback
	          });
	        // Jan, Feb, ..., Dec

	        case 'MMM':
	          return match.month(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // J, F, ..., D

	        case 'MMMMM':
	          return match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // January, February, ..., December

	        case 'MMMM':
	        default:
	          return match.month(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMonth(value, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Stand-alone month
	  L: {
	    priority: 110,
	    parse: function parse(string, token, match, _options) {
	      var valueCallback = function valueCallback(value) {
	        return value - 1;
	      };

	      switch (token) {
	        // 1, 2, ..., 12
	        case 'L':
	          return parseNumericPattern(numericPatterns.month, string, valueCallback);
	        // 01, 02, ..., 12

	        case 'LL':
	          return parseNDigits(2, string, valueCallback);
	        // 1st, 2nd, ..., 12th

	        case 'Lo':
	          return match.ordinalNumber(string, {
	            unit: 'month',
	            valueCallback: valueCallback
	          });
	        // Jan, Feb, ..., Dec

	        case 'LLL':
	          return match.month(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // J, F, ..., D

	        case 'LLLLL':
	          return match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // January, February, ..., December

	        case 'LLLL':
	        default:
	          return match.month(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMonth(value, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local week of year
	  w: {
	    priority: 100,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'w':
	          return parseNumericPattern(numericPatterns.week, string);

	        case 'wo':
	          return match.ordinalNumber(string, {
	            unit: 'week'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 53;
	    },
	    set: function set(date, _flags, value, options) {
	      return startOfUTCWeek(setUTCWeek(date, value, options), options);
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
	  },
	  // ISO week of year
	  I: {
	    priority: 100,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'I':
	          return parseNumericPattern(numericPatterns.week, string);

	        case 'Io':
	          return match.ordinalNumber(string, {
	            unit: 'week'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 53;
	    },
	    set: function set(date, _flags, value, options) {
	      return startOfUTCISOWeek(setUTCISOWeek(date, value, options), options);
	    },
	    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
	  },
	  // Day of the month
	  d: {
	    priority: 90,
	    subPriority: 1,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'd':
	          return parseNumericPattern(numericPatterns.date, string);

	        case 'do':
	          return match.ordinalNumber(string, {
	            unit: 'date'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(date, value, _options) {
	      var year = date.getUTCFullYear();
	      var isLeapYear = isLeapYearIndex(year);
	      var month = date.getUTCMonth();

	      if (isLeapYear) {
	        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
	      } else {
	        return value >= 1 && value <= DAYS_IN_MONTH[month];
	      }
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCDate(value);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Day of year
	  D: {
	    priority: 90,
	    subPriority: 1,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'D':
	        case 'DD':
	          return parseNumericPattern(numericPatterns.dayOfYear, string);

	        case 'Do':
	          return match.ordinalNumber(string, {
	            unit: 'date'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(date, value, _options) {
	      var year = date.getUTCFullYear();
	      var isLeapYear = isLeapYearIndex(year);

	      if (isLeapYear) {
	        return value >= 1 && value <= 366;
	      } else {
	        return value >= 1 && value <= 365;
	      }
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMonth(0, value);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
	  },
	  // Day of week
	  E: {
	    priority: 90,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        // Tue
	        case 'E':
	        case 'EE':
	        case 'EEE':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // T

	        case 'EEEEE':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tu

	        case 'EEEEEE':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tuesday

	        case 'EEEE':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function set(date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local day of week
	  e: {
	    priority: 90,
	    parse: function parse(string, token, match, options) {
	      var valueCallback = function valueCallback(value) {
	        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
	        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
	      };

	      switch (token) {
	        // 3
	        case 'e':
	        case 'ee':
	          // 03
	          return parseNDigits(token.length, string, valueCallback);
	        // 3rd

	        case 'eo':
	          return match.ordinalNumber(string, {
	            unit: 'day',
	            valueCallback: valueCallback
	          });
	        // Tue

	        case 'eee':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // T

	        case 'eeeee':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tu

	        case 'eeeeee':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tuesday

	        case 'eeee':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function set(date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
	  },
	  // Stand-alone local day of week
	  c: {
	    priority: 90,
	    parse: function parse(string, token, match, options) {
	      var valueCallback = function valueCallback(value) {
	        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
	        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
	      };

	      switch (token) {
	        // 3
	        case 'c':
	        case 'cc':
	          // 03
	          return parseNDigits(token.length, string, valueCallback);
	        // 3rd

	        case 'co':
	          return match.ordinalNumber(string, {
	            unit: 'day',
	            valueCallback: valueCallback
	          });
	        // Tue

	        case 'ccc':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // T

	        case 'ccccc':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // Tu

	        case 'cccccc':
	          return match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // Tuesday

	        case 'cccc':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function set(date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
	  },
	  // ISO day of week
	  i: {
	    priority: 90,
	    parse: function parse(string, token, match, _options) {
	      var valueCallback = function valueCallback(value) {
	        if (value === 0) {
	          return 7;
	        }

	        return value;
	      };

	      switch (token) {
	        // 2
	        case 'i':
	        case 'ii':
	          // 02
	          return parseNDigits(token.length, string);
	        // 2nd

	        case 'io':
	          return match.ordinalNumber(string, {
	            unit: 'day'
	          });
	        // Tue

	        case 'iii':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // T

	        case 'iiiii':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // Tu

	        case 'iiiiii':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // Tuesday

	        case 'iiii':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 7;
	    },
	    set: function set(date, _flags, value, options) {
	      date = setUTCISODay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
	  },
	  // AM or PM
	  a: {
	    priority: 80,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'a':
	        case 'aa':
	        case 'aaa':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'aaaaa':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'aaaa':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T']
	  },
	  // AM, PM, midnight
	  b: {
	    priority: 80,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'b':
	        case 'bb':
	        case 'bbb':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'bbbbb':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'bbbb':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T']
	  },
	  // in the morning, in the afternoon, in the evening, at night
	  B: {
	    priority: 80,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'B':
	        case 'BB':
	        case 'BBB':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'BBBBB':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'BBBB':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 't', 'T']
	  },
	  // Hour [1-12]
	  h: {
	    priority: 70,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'h':
	          return parseNumericPattern(numericPatterns.hour12h, string);

	        case 'ho':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 12;
	    },
	    set: function set(date, _flags, value, _options) {
	      var isPM = date.getUTCHours() >= 12;

	      if (isPM && value < 12) {
	        date.setUTCHours(value + 12, 0, 0, 0);
	      } else if (!isPM && value === 12) {
	        date.setUTCHours(0, 0, 0, 0);
	      } else {
	        date.setUTCHours(value, 0, 0, 0);
	      }

	      return date;
	    },
	    incompatibleTokens: ['H', 'K', 'k', 't', 'T']
	  },
	  // Hour [0-23]
	  H: {
	    priority: 70,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'H':
	          return parseNumericPattern(numericPatterns.hour23h, string);

	        case 'Ho':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 23;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCHours(value, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T']
	  },
	  // Hour [0-11]
	  K: {
	    priority: 70,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'K':
	          return parseNumericPattern(numericPatterns.hour11h, string);

	        case 'Ko':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function set(date, _flags, value, _options) {
	      var isPM = date.getUTCHours() >= 12;

	      if (isPM && value < 12) {
	        date.setUTCHours(value + 12, 0, 0, 0);
	      } else {
	        date.setUTCHours(value, 0, 0, 0);
	      }

	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T']
	  },
	  // Hour [1-24]
	  k: {
	    priority: 70,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'k':
	          return parseNumericPattern(numericPatterns.hour24h, string);

	        case 'ko':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 1 && value <= 24;
	    },
	    set: function set(date, _flags, value, _options) {
	      var hours = value <= 24 ? value % 24 : value;
	      date.setUTCHours(hours, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T']
	  },
	  // Minute
	  m: {
	    priority: 60,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 'm':
	          return parseNumericPattern(numericPatterns.minute, string);

	        case 'mo':
	          return match.ordinalNumber(string, {
	            unit: 'minute'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 59;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMinutes(value, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Second
	  s: {
	    priority: 50,
	    parse: function parse(string, token, match, _options) {
	      switch (token) {
	        case 's':
	          return parseNumericPattern(numericPatterns.second, string);

	        case 'so':
	          return match.ordinalNumber(string, {
	            unit: 'second'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function validate(_date, value, _options) {
	      return value >= 0 && value <= 59;
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCSeconds(value, 0);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Fraction of second
	  S: {
	    priority: 30,
	    parse: function parse(string, token, _match, _options) {
	      var valueCallback = function valueCallback(value) {
	        return Math.floor(value * Math.pow(10, -token.length + 3));
	      };

	      return parseNDigits(token.length, string, valueCallback);
	    },
	    set: function set(date, _flags, value, _options) {
	      date.setUTCMilliseconds(value);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Timezone (ISO-8601. +00:00 is `'Z'`)
	  X: {
	    priority: 10,
	    parse: function parse(string, token, _match, _options) {
	      switch (token) {
	        case 'X':
	          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

	        case 'XX':
	          return parseTimezonePattern(timezonePatterns.basic, string);

	        case 'XXXX':
	          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

	        case 'XXXXX':
	          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

	        case 'XXX':
	        default:
	          return parseTimezonePattern(timezonePatterns.extended, string);
	      }
	    },
	    set: function set(date, flags, value, _options) {
	      if (flags.timestampIsSet) {
	        return date;
	      }

	      return new Date(date.getTime() - value);
	    },
	    incompatibleTokens: ['t', 'T', 'x']
	  },
	  // Timezone (ISO-8601)
	  x: {
	    priority: 10,
	    parse: function parse(string, token, _match, _options) {
	      switch (token) {
	        case 'x':
	          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

	        case 'xx':
	          return parseTimezonePattern(timezonePatterns.basic, string);

	        case 'xxxx':
	          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

	        case 'xxxxx':
	          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

	        case 'xxx':
	        default:
	          return parseTimezonePattern(timezonePatterns.extended, string);
	      }
	    },
	    set: function set(date, flags, value, _options) {
	      if (flags.timestampIsSet) {
	        return date;
	      }

	      return new Date(date.getTime() - value);
	    },
	    incompatibleTokens: ['t', 'T', 'X']
	  },
	  // Seconds timestamp
	  t: {
	    priority: 40,
	    parse: function parse(string, _token, _match, _options) {
	      return parseAnyDigitsSigned(string);
	    },
	    set: function set(_date, _flags, value, _options) {
	      return [new Date(value * 1000), {
	        timestampIsSet: true
	      }];
	    },
	    incompatibleTokens: '*'
	  },
	  // Milliseconds timestamp
	  T: {
	    priority: 20,
	    parse: function parse(string, _token, _match, _options) {
	      return parseAnyDigitsSigned(string);
	    },
	    set: function set(_date, _flags, value, _options) {
	      return [new Date(value), {
	        timestampIsSet: true
	      }];
	    },
	    incompatibleTokens: '*'
	  }
	};
	var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
	// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
	//   (one of the certain letters followed by `o`)
	// - (\w)\1* matches any sequences of the same letter
	// - '' matches two quote characters in a row
	// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
	//   except a single quote symbol, which ends the sequence.
	//   Two quote characters do not end the sequence.
	//   If there is no matching single quote
	//   then the sequence will continue until the end of the string.
	// - . matches any single character unmatched by previous parts of the RegExps

	var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
	// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

	var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	var escapedStringRegExp$1 = /^'([^]*?)'?$/;
	var doubleQuoteRegExp$1 = /''/g;
	var notWhitespaceRegExp = /\S/;
	var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
	/**
	 * @name parse
	 * @category Common Helpers
	 * @summary Parse the date.
	 *
	 * @description
	 * Return the date parsed from string using the given format string.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://git.io/fxCyr
	 *
	 * The characters in the format string wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 *
	 * Format of the format string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 5 below the table).
	 *
	 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
	 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
	 *
	 * ```javascript
	 * parse('23 AM', 'HH a', new Date())
	 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
	 * ```
	 *
	 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
	 *
	 * Accepted format string patterns:
	 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
	 * |---------------------------------|-----|---------|-----------------------------------|-------|
	 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
	 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 |     | GGGGG   | A, B                              |       |
	 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
	 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
	 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
	 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
	 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
	 * |                                 |     | yyyyy   | ...                               | 2,4   |
	 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
	 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
	 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
	 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
	 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
	 * |                                 |     | YYYYY   | ...                               | 2,4   |
	 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
	 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
	 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
	 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
	 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
	 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
	 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
	 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
	 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
	 * |                                 |     | uuuuu   | ...                               | 2,4   |
	 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
	 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
	 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
	 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
	 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
	 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
	 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
	 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
	 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
	 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
	 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
	 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
	 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
	 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
	 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
	 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
	 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
	 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
	 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
	 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
	 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
	 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
	 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
	 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
	 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 |     | DDDD    | ...                               | 2     |
	 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
	 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
	 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
	 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
	 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
	 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
	 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
	 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
	 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
	 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
	 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
	 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
	 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 |     | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
	 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
	 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
	 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
	 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
	 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
	 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
	 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
	 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
	 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
	 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
	 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
	 * |                                 |     | tt      | ...                               | 2     |
	 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
	 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
	 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
	 * |                                 |     | SSSS    | ...                               | 2     |
	 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
	 * |                                 |     | TT      | ...                               | 2     |
	 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
	 * |                                 |     | XX      | -0800, +0530, Z                   |       |
	 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
	 * |                                 |     | xx      | -0800, +0530, +0000               |       |
	 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
	 * |                                 |     | PP      | May 29, 1453                      |       |
	 * |                                 |     | PPP     | May 29th, 1453                    |       |
	 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
	 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
	 * |                                 |     | pp      | 12:00:00 AM                       |       |
	 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
	 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
	 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
	 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular.
	 *    In `format` function, they will produce different result:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 *    `parse` will try to match both formatting and stand-alone units interchangably.
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table:
	 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
	 *      as wide as the sequence
	 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
	 *      These variations are marked with "2" in the last column of the table.
	 *
	 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 4. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
	 *
	 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
	 *
	 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
	 *
	 *    while `uu` will just assign the year as is:
	 *
	 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
	 *
	 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
	 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
	 *
	 * 5. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
	 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
	 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
	 *    on the given locale.
	 *
	 *    using `en-US` locale: `P` => `MM/dd/yyyy`
	 *    using `en-US` locale: `p` => `hh:mm a`
	 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
	 *    using `pt-BR` locale: `p` => `HH:mm`
	 *
	 * Values will be assigned to the date in the descending order of its unit's priority.
	 * Units of an equal priority overwrite each other in the order of appearance.
	 *
	 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
	 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
	 *
	 * `referenceDate` must be passed for correct work of the function.
	 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
	 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
	 * In this case parsing will be done in the context of the current date.
	 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
	 * then `Invalid Date` will be returned.
	 *
	 * The result may vary by locale.
	 *
	 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
	 *
	 * If parsing failed, `Invalid Date` will be returned.
	 * Invalid Date is a Date, whose time value is NaN.
	 * Time value of Date: http://es5.github.io/#x15.9.1.1
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - Old `parse` was renamed to `toDate`.
	 *   Now `parse` is a new function which parses a string using a provided format.
	 *
	 *   ```javascript
	 *   // Before v2.0.0
	 *   parse('2016-01-01')
	 *
	 *   // v2.0.0 onward (toDate no longer accepts a string)
	 *   toDate(1392098430000) // Unix to timestamp
	 *   toDate(new Date(2014, 1, 11, 11, 30, 30)) // Cloning the date
	 *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
	 *   ```
	 *
	 * @param {String} dateString - the string to parse
	 * @param {String} formatString - the string of tokens
	 * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
	 * @param {Object} [options] - an object with options.
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
	 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
	 *   see: https://git.io/fxCyr
	 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
	 *   see: https://git.io/fxCyr
	 * @returns {Date} the parsed date
	 * @throws {TypeError} 3 arguments required
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} `options.locale` must contain `match` property
	 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} format string contains an unescaped latin alphabet character
	 *
	 * @example
	 * // Parse 11 February 2014 from middle-endian format:
	 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
	 * //=> Tue Feb 11 2014 00:00:00
	 *
	 * @example
	 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
	 * import eo from 'date-fns/locale/eo'
	 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
	 *   locale: eo
	 * })
	 * //=> Sun Feb 28 2010 00:00:00
	 */

	function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
	  requiredArgs(3, arguments);
	  var dateString = String(dirtyDateString);
	  var formatString = String(dirtyFormatString);
	  var options = dirtyOptions || {};
	  var locale$1 = options.locale || locale;

	  if (!locale$1.match) {
	    throw new RangeError('locale must contain match property');
	  }

	  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  if (formatString === '') {
	    if (dateString === '') {
	      return toDate(dirtyReferenceDate);
	    } else {
	      return new Date(NaN);
	    }
	  }

	  var subFnOptions = {
	    firstWeekContainsDate: firstWeekContainsDate,
	    weekStartsOn: weekStartsOn,
	    locale: locale$1 // If timezone isn't specified, it will be set to the system timezone

	  };
	  var setters = [{
	    priority: TIMEZONE_UNIT_PRIORITY,
	    subPriority: -1,
	    set: dateToSystemTimezone,
	    index: 0
	  }];
	  var i;
	  var tokens = formatString.match(longFormattingTokensRegExp$1).map(function (substring) {
	    var firstCharacter = substring[0];

	    if (firstCharacter === 'p' || firstCharacter === 'P') {
	      var longFormatter = longFormatters[firstCharacter];
	      return longFormatter(substring, locale$1.formatLong, subFnOptions);
	    }

	    return substring;
	  }).join('').match(formattingTokensRegExp$1);
	  var usedTokens = [];

	  for (i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
	      throwProtectedError(token, formatString, dirtyDateString);
	    }

	    if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
	      throwProtectedError(token, formatString, dirtyDateString);
	    }

	    var firstCharacter = token[0];
	    var parser = parsers[firstCharacter];

	    if (parser) {
	      var incompatibleTokens = parser.incompatibleTokens;

	      if (Array.isArray(incompatibleTokens)) {
	        var incompatibleToken = void 0;

	        for (var _i = 0; _i < usedTokens.length; _i++) {
	          var usedToken = usedTokens[_i].token;

	          if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
	            incompatibleToken = usedTokens[_i];
	            break;
	          }
	        }

	        if (incompatibleToken) {
	          throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
	        }
	      } else if (parser.incompatibleTokens === '*' && usedTokens.length) {
	        throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
	      }

	      usedTokens.push({
	        token: firstCharacter,
	        fullToken: token
	      });
	      var parseResult = parser.parse(dateString, token, locale$1.match, subFnOptions);

	      if (!parseResult) {
	        return new Date(NaN);
	      }

	      setters.push({
	        priority: parser.priority,
	        subPriority: parser.subPriority || 0,
	        set: parser.set,
	        validate: parser.validate,
	        value: parseResult.value,
	        index: setters.length
	      });
	      dateString = parseResult.rest;
	    } else {
	      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
	        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
	      } // Replace two single quote characters with one single quote character


	      if (token === "''") {
	        token = "'";
	      } else if (firstCharacter === "'") {
	        token = cleanEscapedString$1(token);
	      } // Cut token from string, or, if string doesn't match the token, return Invalid Date


	      if (dateString.indexOf(token) === 0) {
	        dateString = dateString.slice(token.length);
	      } else {
	        return new Date(NaN);
	      }
	    }
	  } // Check if the remaining input contains something other than whitespace


	  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
	    return new Date(NaN);
	  }

	  var uniquePrioritySetters = setters.map(function (setter) {
	    return setter.priority;
	  }).sort(function (a, b) {
	    return b - a;
	  }).filter(function (priority, index, array) {
	    return array.indexOf(priority) === index;
	  }).map(function (priority) {
	    return setters.filter(function (setter) {
	      return setter.priority === priority;
	    }).sort(function (a, b) {
	      return b.subPriority - a.subPriority;
	    });
	  }).map(function (setterArray) {
	    return setterArray[0];
	  });
	  var date = toDate(dirtyReferenceDate);

	  if (isNaN(date)) {
	    return new Date(NaN);
	  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
	  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
	  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37


	  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
	  var flags = {};

	  for (i = 0; i < uniquePrioritySetters.length; i++) {
	    var setter = uniquePrioritySetters[i];

	    if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
	      return new Date(NaN);
	    }

	    var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

	    if (result[0]) {
	      utcDate = result[0];
	      assign(flags, result[1]); // Result is date
	    } else {
	      utcDate = result;
	    }
	  }

	  return utcDate;
	}

	function dateToSystemTimezone(date, flags) {
	  if (flags.timestampIsSet) {
	    return date;
	  }

	  var convertedDate = new Date(0);
	  convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	  convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
	  return convertedDate;
	}

	function cleanEscapedString$1(input) {
	  return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
	}

	function formatDA(date) {
	  var strFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM d, yyyy';

	  if (!date) {
	    return;
	  } // Goal: 'Apr 5, 1999'


	  try {
	    var parsedDateTime = parse(date, 'yyyyMMdd', new Date());
	    var formattedDateTime = format(parsedDateTime, strFormat);
	    return formattedDateTime;
	  } catch (err) {// swallow?
	  }

	  return;
	}

	function formatTM(time) {
	  var strFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';

	  if (!time) {
	    return;
	  } // DICOM Time is stored as HHmmss.SSS, where:
	  //      HH 24 hour time:
	  //      m mm    0..59   Minutes
	  //      s ss    0..59   Seconds
	  //      S SS SSS    0..999  Fractional seconds
	  //
	  // Goal: '24:12:12'


	  try {
	    var inputFormat = 'HHmmss.SSS';
	    var strTime = time.toString().substring(0, inputFormat.length);
	    var parsedDateTime = parse(strTime, 'HHmmss.SSS', new Date(0));
	    var formattedDateTime = format(parsedDateTime, strFormat);
	    return formattedDateTime;
	  } catch (err) {// swallow?
	  }

	  return;
	}

	function formatNumberPrecision(number, precision) {
	  if (number !== null) {
	    return parseFloat(number).toFixed(precision);
	  }
	}

	function isValidNumber(value) {
	  return typeof value === 'number' && !isNaN(value);
	}

	var helpers = {
	  formatPN: formatPN,
	  formatDA: formatDA,
	  formatTM: formatTM,
	  formatNumberPrecision: formatNumberPrecision,
	  isValidNumber: isValidNumber
	};
	var css_248z$1 = ".imageViewerViewport.empty ~ .ViewportOverlay {\n  display: none;\n}\n.ViewportOverlay {\n  color: #9ccef9;\n}\n.ViewportOverlay .overlay-element {\n  position: absolute;\n  font-weight: 400;\n  text-shadow: 1px 1px #000;\n  pointer-events: none;\n}\n.ViewportOverlay .top-left {\n  top: 20px;\n  left: 20px;\n}\n.ViewportOverlay .top-center {\n  top: 20px;\n  padding-top: 20px;\n  width: 100%;\n  text-align: center;\n}\n.ViewportOverlay .top-right {\n  top: 20px;\n  right: 20px;\n  text-align: right;\n}\n.ViewportOverlay .bottom-left {\n  bottom: 20px;\n  left: 20px;\n}\n.ViewportOverlay .bottom-right {\n  bottom: 20px;\n  right: 20px;\n  text-align: right;\n}\n.ViewportOverlay.controlsVisible .topright,\n.ViewportOverlay.controlsVisible .bottomright {\n  right: calc(20px + 19px);\n}\n.ViewportOverlay svg {\n  color: #9ccef9;\n  fill: #9ccef9;\n  stroke: #9ccef9;\n  background-color: transparent;\n  margin: 2px;\n  width: 18px;\n  height: 18px;\n}\n";
	styleInject(css_248z$1);

	function _createSuper$1(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _isNativeReflectConstruct$1() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var formatPN$1 = helpers.formatPN,
	    formatDA$1 = helpers.formatDA,
	    formatNumberPrecision$1 = helpers.formatNumberPrecision,
	    formatTM$1 = helpers.formatTM,
	    isValidNumber$1 = helpers.isValidNumber;

	function getCompression(imageId) {
	  var generalImageModule = cornerstone.metaData.get('generalImageModule', imageId) || {};
	  var lossyImageCompression = generalImageModule.lossyImageCompression,
	      lossyImageCompressionRatio = generalImageModule.lossyImageCompressionRatio,
	      lossyImageCompressionMethod = generalImageModule.lossyImageCompressionMethod;

	  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
	    var compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
	    var compressionRatio = formatNumberPrecision$1(lossyImageCompressionRatio, 2);
	    return compressionMethod + compressionRatio + ' : 1';
	  }

	  return 'Lossless / Uncompressed';
	}

	var ViewportOverlay = /*#__PURE__*/function (_PureComponent) {
	  _inherits(ViewportOverlay, _PureComponent);

	  var _super = _createSuper$1(ViewportOverlay);

	  function ViewportOverlay() {
	    _classCallCheck(this, ViewportOverlay);

	    return _super.apply(this, arguments);
	  }

	  _createClass(ViewportOverlay, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          imageId = _this$props.imageId,
	          scale = _this$props.scale,
	          windowWidth = _this$props.windowWidth,
	          windowCenter = _this$props.windowCenter;

	      if (!imageId) {
	        return null;
	      }

	      var zoomPercentage = formatNumberPrecision$1(scale * 100, 0);
	      var seriesMetadata = cornerstone.metaData.get('generalSeriesModule', imageId) || {};
	      var imagePlaneModule = cornerstone.metaData.get('imagePlaneModule', imageId) || {};
	      var rows = imagePlaneModule.rows,
	          columns = imagePlaneModule.columns,
	          sliceThickness = imagePlaneModule.sliceThickness,
	          sliceLocation = imagePlaneModule.sliceLocation;
	      var seriesNumber = seriesMetadata.seriesNumber,
	          seriesDescription = seriesMetadata.seriesDescription;
	      var generalStudyModule = cornerstone.metaData.get('generalStudyModule', imageId) || {};
	      var studyDate = generalStudyModule.studyDate,
	          studyTime = generalStudyModule.studyTime,
	          studyDescription = generalStudyModule.studyDescription;
	      var patientModule = cornerstone.metaData.get('patientModule', imageId) || {};
	      var patientId = patientModule.patientId,
	          patientName = patientModule.patientName;
	      var generalImageModule = cornerstone.metaData.get('generalImageModule', imageId) || {};
	      var instanceNumber = generalImageModule.instanceNumber;
	      var cineModule = cornerstone.metaData.get('cineModule', imageId) || {};
	      var frameTime = cineModule.frameTime;
	      var frameRate = formatNumberPrecision$1(1000 / frameTime, 1);
	      var compression = getCompression(imageId);
	      var wwwc = "W: ".concat(windowWidth.toFixed(0), " L: ").concat(windowCenter.toFixed(0));
	      var imageDimensions = "".concat(columns, " x ").concat(rows);
	      var _this$props2 = this.props,
	          imageIndex = _this$props2.imageIndex,
	          stackSize = _this$props2.stackSize;
	      var normal = /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
	        className: "top-left overlay-element"
	      }, /*#__PURE__*/React__default.createElement("div", null, formatPN$1(patientName)), /*#__PURE__*/React__default.createElement("div", null, patientId)), /*#__PURE__*/React__default.createElement("div", {
	        className: "top-right overlay-element"
	      }, /*#__PURE__*/React__default.createElement("div", null, studyDescription), /*#__PURE__*/React__default.createElement("div", null, formatDA$1(studyDate), " ", formatTM$1(studyTime))), /*#__PURE__*/React__default.createElement("div", {
	        className: "bottom-right overlay-element"
	      }, /*#__PURE__*/React__default.createElement("div", null, "Zoom: ", zoomPercentage, "%"), /*#__PURE__*/React__default.createElement("div", null, wwwc), /*#__PURE__*/React__default.createElement("div", {
	        className: "compressionIndicator"
	      }, compression)), /*#__PURE__*/React__default.createElement("div", {
	        className: "bottom-left overlay-element"
	      }, /*#__PURE__*/React__default.createElement("div", null, seriesNumber >= 0 ? "Ser: ".concat(seriesNumber) : ''), /*#__PURE__*/React__default.createElement("div", null, stackSize > 1 ? "Img: ".concat(instanceNumber, " ").concat(imageIndex, "/").concat(stackSize) : ''), /*#__PURE__*/React__default.createElement("div", null, frameRate >= 0 ? "".concat(formatNumberPrecision$1(frameRate, 2), " FPS") : '', /*#__PURE__*/React__default.createElement("div", null, imageDimensions), /*#__PURE__*/React__default.createElement("div", null, isValidNumber$1(sliceLocation) ? "Loc: ".concat(formatNumberPrecision$1(sliceLocation, 2), " mm ") : '', sliceThickness ? "Thick: ".concat(formatNumberPrecision$1(sliceThickness, 2), " mm") : ''), /*#__PURE__*/React__default.createElement("div", null, seriesDescription))));
	      return /*#__PURE__*/React__default.createElement("div", {
	        className: "ViewportOverlay"
	      }, normal);
	    }
	  }]);

	  return ViewportOverlay;
	}(React.PureComponent);

	_defineProperty(ViewportOverlay, "propTypes", {
	  scale: propTypes.number.isRequired,
	  windowWidth: propTypes.number.isRequired,
	  windowCenter: propTypes.number.isRequired,
	  imageId: propTypes.string.isRequired,
	  imageIndex: propTypes.number.isRequired,
	  stackSize: propTypes.number.isRequired
	});

	var css_248z$2 = ".imageViewerLoadingIndicator {\n  color: #91b9cd;\n}\n\n.faded {\n  opacity: 0.5;\n}\n\n.imageViewerErrorLoadingIndicator {\n  color: #e29e4a;\n}\n\n.imageViewerErrorLoadingIndicator p,\n.imageViewerErrorLoadingIndicator h4 {\n  padding: 4px 0;\n  text-align: center;\n  word-wrap: break-word;\n}\n\n.imageViewerErrorLoadingIndicator p {\n  font-size: 11pt;\n}\n\n.loadingIndicator {\n  background-color: rgba(0, 0, 0, 0.75);\n  font-size: 18px;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n}\n\n.loadingIndicator .indicatorContents {\n  font-weight: 300;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 100%;\n}\n";
	styleInject(css_248z$2);

	function _createSuper$2(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _isNativeReflectConstruct$2() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var LoadingIndicator = /*#__PURE__*/function (_PureComponent) {
	  _inherits(LoadingIndicator, _PureComponent);

	  var _super = _createSuper$2(LoadingIndicator);

	  function LoadingIndicator() {
	    _classCallCheck(this, LoadingIndicator);

	    return _super.apply(this, arguments);
	  }

	  _createClass(LoadingIndicator, [{
	    key: "render",
	    value: function render() {
	      var pc = this.props.percentComplete;
	      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, this.props.error ? /*#__PURE__*/React__default.createElement("div", {
	        className: "imageViewerErrorLoadingIndicator loadingIndicator"
	      }, /*#__PURE__*/React__default.createElement("div", {
	        className: "indicatorContents"
	      }, /*#__PURE__*/React__default.createElement("h4", null, "Error Loading Image"), /*#__PURE__*/React__default.createElement("p", {
	        className: "description"
	      }, "An error has occurred."), /*#__PURE__*/React__default.createElement("p", {
	        className: "details"
	      }, this.props.error.message))) : /*#__PURE__*/React__default.createElement("div", {
	        className: "imageViewerLoadingIndicator loadingIndicator"
	      }, /*#__PURE__*/React__default.createElement("div", {
	        className: "indicatorContents"
	      }, /*#__PURE__*/React__default.createElement("h2", null, pc < 100 ? 'Loading...' : 'Loaded -', /*#__PURE__*/React__default.createElement("i", {
	        className: "fa fa-spin fa-circle-o-notch fa-fw"
	      }), ' '), pc === 100 && /*#__PURE__*/React__default.createElement("p", null, "Processing..."))));
	    }
	  }]);

	  return LoadingIndicator;
	}(React.PureComponent);

	_defineProperty(LoadingIndicator, "propTypes", {
	  percentComplete: propTypes.number.isRequired,
	  error: propTypes.object
	});

	_defineProperty(LoadingIndicator, "defaultProps", {
	  percentComplete: 0,
	  error: null
	});

	var css_248z$3 = ".ViewportOrientationMarkers {\n  pointer-events: none;\n  font-size: 15px;\n  color: #ccc;\n  line-height: 18px;\n}\n.ViewportOrientationMarkers .orientation-marker {\n  position: absolute;\n}\n.ViewportOrientationMarkers .top-mid {\n  top: 5px;\n  left: 50%;\n}\n.ViewportOrientationMarkers .left-mid {\n  top: 47%;\n  left: 5px;\n}\n";
	styleInject(css_248z$3);

	function _createSuper$3(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _isNativeReflectConstruct$3() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}
	/**
	 *
	 * Computes the orientation labels on a Cornerstone-enabled Viewport element
	 * when the viewport settings change (e.g. when a horizontal flip or a rotation occurs)
	 *
	 * @param {*} rowCosines
	 * @param {*} columnCosines
	 * @param {*} rotationDegrees
	 * @param {*} isFlippedVertically
	 * @param {*} isFlippedHorizontally
	 * @returns
	 */


	function getOrientationMarkers(rowCosines, columnCosines, rotationDegrees, isFlippedVertically, isFlippedHorizontally) {
	  var _cornerstoneTools$ori = cornerstoneTools.orientation,
	      getOrientationString = _cornerstoneTools$ori.getOrientationString,
	      invertOrientationString = _cornerstoneTools$ori.invertOrientationString;
	  var rowString = getOrientationString(rowCosines);
	  var columnString = getOrientationString(columnCosines);
	  var oppositeRowString = invertOrientationString(rowString);
	  var oppositeColumnString = invertOrientationString(columnString);
	  var markers = {
	    top: oppositeColumnString,
	    left: oppositeRowString
	  }; // If any vertical or horizontal flips are applied, change the orientation strings ahead of
	  // the rotation applications

	  if (isFlippedVertically) {
	    markers.top = invertOrientationString(markers.top);
	  }

	  if (isFlippedHorizontally) {
	    markers.left = invertOrientationString(markers.left);
	  } // Swap the labels accordingly if the viewport has been rotated
	  // This could be done in a more complex way for intermediate rotation values (e.g. 45 degrees)


	  if (rotationDegrees === 90 || rotationDegrees === -270) {
	    return {
	      top: markers.left,
	      left: invertOrientationString(markers.top)
	    };
	  } else if (rotationDegrees === -90 || rotationDegrees === 270) {
	    return {
	      top: invertOrientationString(markers.left),
	      left: markers.top
	    };
	  } else if (rotationDegrees === 180 || rotationDegrees === -180) {
	    return {
	      top: invertOrientationString(markers.top),
	      left: invertOrientationString(markers.left)
	    };
	  }

	  return markers;
	}

	var ViewportOrientationMarkers = /*#__PURE__*/function (_PureComponent) {
	  _inherits(ViewportOrientationMarkers, _PureComponent);

	  var _super = _createSuper$3(ViewportOrientationMarkers);

	  function ViewportOrientationMarkers() {
	    _classCallCheck(this, ViewportOrientationMarkers);

	    return _super.apply(this, arguments);
	  }

	  _createClass(ViewportOrientationMarkers, [{
	    key: "render",
	    value: function render() {
	      var _this$props = this.props,
	          rowCosines = _this$props.rowCosines,
	          columnCosines = _this$props.columnCosines,
	          rotationDegrees = _this$props.rotationDegrees,
	          isFlippedVertically = _this$props.isFlippedVertically,
	          isFlippedHorizontally = _this$props.isFlippedHorizontally;

	      if (!rowCosines || !columnCosines) {
	        return '';
	      }

	      var markers = getOrientationMarkers(rowCosines, columnCosines, rotationDegrees, isFlippedVertically, isFlippedHorizontally);
	      return /*#__PURE__*/React__default.createElement("div", {
	        className: "ViewportOrientationMarkers noselect"
	      }, /*#__PURE__*/React__default.createElement("div", {
	        className: "top-mid orientation-marker"
	      }, markers.top), /*#__PURE__*/React__default.createElement("div", {
	        className: "left-mid orientation-marker"
	      }, markers.left));
	    }
	  }]);

	  return ViewportOrientationMarkers;
	}(React.PureComponent);

	_defineProperty(ViewportOrientationMarkers, "propTypes", {
	  rowCosines: propTypes.array.isRequired,
	  columnCosines: propTypes.array.isRequired,
	  rotationDegrees: propTypes.number.isRequired,
	  isFlippedVertically: propTypes.bool.isRequired,
	  isFlippedHorizontally: propTypes.bool.isRequired
	});
	/**
	 * A collection of shims that provide minimal functionality of the ES6 collections.
	 *
	 * These implementations are not meant to be used outside of the ResizeObserver
	 * modules as they cover only a limited range of use cases.
	 */

	/* eslint-disable require-jsdoc, valid-jsdoc */


	var MapShim = function () {
	  if (typeof Map !== 'undefined') {
	    return Map;
	  }
	  /**
	   * Returns index in provided array that matches the specified key.
	   *
	   * @param {Array<Array>} arr
	   * @param {*} key
	   * @returns {number}
	   */


	  function getIndex(arr, key) {
	    var result = -1;
	    arr.some(function (entry, index) {
	      if (entry[0] === key) {
	        result = index;
	        return true;
	      }

	      return false;
	    });
	    return result;
	  }

	  return (
	    /** @class */
	    function () {
	      function class_1() {
	        this.__entries__ = [];
	      }

	      Object.defineProperty(class_1.prototype, "size", {
	        /**
	         * @returns {boolean}
	         */
	        get: function get() {
	          return this.__entries__.length;
	        },
	        enumerable: true,
	        configurable: true
	      });
	      /**
	       * @param {*} key
	       * @returns {*}
	       */

	      class_1.prototype.get = function (key) {
	        var index = getIndex(this.__entries__, key);
	        var entry = this.__entries__[index];
	        return entry && entry[1];
	      };
	      /**
	       * @param {*} key
	       * @param {*} value
	       * @returns {void}
	       */


	      class_1.prototype.set = function (key, value) {
	        var index = getIndex(this.__entries__, key);

	        if (~index) {
	          this.__entries__[index][1] = value;
	        } else {
	          this.__entries__.push([key, value]);
	        }
	      };
	      /**
	       * @param {*} key
	       * @returns {void}
	       */


	      class_1.prototype.delete = function (key) {
	        var entries = this.__entries__;
	        var index = getIndex(entries, key);

	        if (~index) {
	          entries.splice(index, 1);
	        }
	      };
	      /**
	       * @param {*} key
	       * @returns {void}
	       */


	      class_1.prototype.has = function (key) {
	        return !!~getIndex(this.__entries__, key);
	      };
	      /**
	       * @returns {void}
	       */


	      class_1.prototype.clear = function () {
	        this.__entries__.splice(0);
	      };
	      /**
	       * @param {Function} callback
	       * @param {*} [ctx=null]
	       * @returns {void}
	       */


	      class_1.prototype.forEach = function (callback, ctx) {
	        if (ctx === void 0) {
	          ctx = null;
	        }

	        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
	          var entry = _a[_i];
	          callback.call(ctx, entry[1], entry[0]);
	        }
	      };

	      return class_1;
	    }()
	  );
	}();
	/**
	 * Detects whether window and document objects are available in current environment.
	 */


	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

	var global$1 = function () {
	  if (typeof global !== 'undefined' && global.Math === Math) {
	    return global;
	  }

	  if (typeof self !== 'undefined' && self.Math === Math) {
	    return self;
	  }

	  if (typeof window !== 'undefined' && window.Math === Math) {
	    return window;
	  } // eslint-disable-next-line no-new-func


	  return Function('return this')();
	}();
	/**
	 * A shim for the requestAnimationFrame which falls back to the setTimeout if
	 * first one is not supported.
	 *
	 * @returns {number} Requests' identifier.
	 */


	var requestAnimationFrame$1 = function () {
	  if (typeof requestAnimationFrame === 'function') {
	    // It's required to use a bounded function because IE sometimes throws
	    // an "Invalid calling object" error if rAF is invoked without the global
	    // object on the left hand side.
	    return requestAnimationFrame.bind(global$1);
	  }

	  return function (callback) {
	    return setTimeout(function () {
	      return callback(Date.now());
	    }, 1000 / 60);
	  };
	}(); // Defines minimum timeout before adding a trailing call.


	var trailingTimeout = 2;
	/**
	 * Creates a wrapper function which ensures that provided callback will be
	 * invoked only once during the specified delay period.
	 *
	 * @param {Function} callback - Function to be invoked after the delay period.
	 * @param {number} delay - Delay after which to invoke callback.
	 * @returns {Function}
	 */

	function throttle(callback, delay) {
	  var leadingCall = false,
	      trailingCall = false,
	      lastCallTime = 0;
	  /**
	   * Invokes the original callback function and schedules new invocation if
	   * the "proxy" was called during current request.
	   *
	   * @returns {void}
	   */

	  function resolvePending() {
	    if (leadingCall) {
	      leadingCall = false;
	      callback();
	    }

	    if (trailingCall) {
	      proxy();
	    }
	  }
	  /**
	   * Callback invoked after the specified delay. It will further postpone
	   * invocation of the original function delegating it to the
	   * requestAnimationFrame.
	   *
	   * @returns {void}
	   */


	  function timeoutCallback() {
	    requestAnimationFrame$1(resolvePending);
	  }
	  /**
	   * Schedules invocation of the original function.
	   *
	   * @returns {void}
	   */


	  function proxy() {
	    var timeStamp = Date.now();

	    if (leadingCall) {
	      // Reject immediately following calls.
	      if (timeStamp - lastCallTime < trailingTimeout) {
	        return;
	      } // Schedule new call to be in invoked when the pending one is resolved.
	      // This is important for "transitions" which never actually start
	      // immediately so there is a chance that we might miss one if change
	      // happens amids the pending invocation.


	      trailingCall = true;
	    } else {
	      leadingCall = true;
	      trailingCall = false;
	      setTimeout(timeoutCallback, delay);
	    }

	    lastCallTime = timeStamp;
	  }

	  return proxy;
	} // Minimum delay before invoking the update of observers.


	var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
	// might affect dimensions of observed elements.

	var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

	var mutationObserverSupported = typeof MutationObserver !== 'undefined';
	/**
	 * Singleton controller class which handles updates of ResizeObserver instances.
	 */

	var ResizeObserverController =
	/** @class */
	function () {
	  /**
	   * Creates a new instance of ResizeObserverController.
	   *
	   * @private
	   */
	  function ResizeObserverController() {
	    /**
	     * Indicates whether DOM listeners have been added.
	     *
	     * @private {boolean}
	     */
	    this.connected_ = false;
	    /**
	     * Tells that controller has subscribed for Mutation Events.
	     *
	     * @private {boolean}
	     */

	    this.mutationEventsAdded_ = false;
	    /**
	     * Keeps reference to the instance of MutationObserver.
	     *
	     * @private {MutationObserver}
	     */

	    this.mutationsObserver_ = null;
	    /**
	     * A list of connected observers.
	     *
	     * @private {Array<ResizeObserverSPI>}
	     */

	    this.observers_ = [];
	    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
	    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
	  }
	  /**
	   * Adds observer to observers list.
	   *
	   * @param {ResizeObserverSPI} observer - Observer to be added.
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.addObserver = function (observer) {
	    if (!~this.observers_.indexOf(observer)) {
	      this.observers_.push(observer);
	    } // Add listeners if they haven't been added yet.


	    if (!this.connected_) {
	      this.connect_();
	    }
	  };
	  /**
	   * Removes observer from observers list.
	   *
	   * @param {ResizeObserverSPI} observer - Observer to be removed.
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.removeObserver = function (observer) {
	    var observers = this.observers_;
	    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

	    if (~index) {
	      observers.splice(index, 1);
	    } // Remove listeners if controller has no connected observers.


	    if (!observers.length && this.connected_) {
	      this.disconnect_();
	    }
	  };
	  /**
	   * Invokes the update of observers. It will continue running updates insofar
	   * it detects changes.
	   *
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.refresh = function () {
	    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
	    // be future ones caused by CSS transitions.

	    if (changesDetected) {
	      this.refresh();
	    }
	  };
	  /**
	   * Updates every observer from observers list and notifies them of queued
	   * entries.
	   *
	   * @private
	   * @returns {boolean} Returns "true" if any observer has detected changes in
	   *      dimensions of it's elements.
	   */


	  ResizeObserverController.prototype.updateObservers_ = function () {
	    // Collect observers that have active observations.
	    var activeObservers = this.observers_.filter(function (observer) {
	      return observer.gatherActive(), observer.hasActive();
	    }); // Deliver notifications in a separate cycle in order to avoid any
	    // collisions between observers, e.g. when multiple instances of
	    // ResizeObserver are tracking the same element and the callback of one
	    // of them changes content dimensions of the observed target. Sometimes
	    // this may result in notifications being blocked for the rest of observers.

	    activeObservers.forEach(function (observer) {
	      return observer.broadcastActive();
	    });
	    return activeObservers.length > 0;
	  };
	  /**
	   * Initializes DOM listeners.
	   *
	   * @private
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.connect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already added.
	    if (!isBrowser || this.connected_) {
	      return;
	    } // Subscription to the "Transitionend" event is used as a workaround for
	    // delayed transitions. This way it's possible to capture at least the
	    // final state of an element.


	    document.addEventListener('transitionend', this.onTransitionEnd_);
	    window.addEventListener('resize', this.refresh);

	    if (mutationObserverSupported) {
	      this.mutationsObserver_ = new MutationObserver(this.refresh);
	      this.mutationsObserver_.observe(document, {
	        attributes: true,
	        childList: true,
	        characterData: true,
	        subtree: true
	      });
	    } else {
	      document.addEventListener('DOMSubtreeModified', this.refresh);
	      this.mutationEventsAdded_ = true;
	    }

	    this.connected_ = true;
	  };
	  /**
	   * Removes DOM listeners.
	   *
	   * @private
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.disconnect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already removed.
	    if (!isBrowser || !this.connected_) {
	      return;
	    }

	    document.removeEventListener('transitionend', this.onTransitionEnd_);
	    window.removeEventListener('resize', this.refresh);

	    if (this.mutationsObserver_) {
	      this.mutationsObserver_.disconnect();
	    }

	    if (this.mutationEventsAdded_) {
	      document.removeEventListener('DOMSubtreeModified', this.refresh);
	    }

	    this.mutationsObserver_ = null;
	    this.mutationEventsAdded_ = false;
	    this.connected_ = false;
	  };
	  /**
	   * "Transitionend" event handler.
	   *
	   * @private
	   * @param {TransitionEvent} event
	   * @returns {void}
	   */


	  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
	    var _b = _a.propertyName,
	        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

	    var isReflowProperty = transitionKeys.some(function (key) {
	      return !!~propertyName.indexOf(key);
	    });

	    if (isReflowProperty) {
	      this.refresh();
	    }
	  };
	  /**
	   * Returns instance of the ResizeObserverController.
	   *
	   * @returns {ResizeObserverController}
	   */


	  ResizeObserverController.getInstance = function () {
	    if (!this.instance_) {
	      this.instance_ = new ResizeObserverController();
	    }

	    return this.instance_;
	  };
	  /**
	   * Holds reference to the controller's instance.
	   *
	   * @private {ResizeObserverController}
	   */


	  ResizeObserverController.instance_ = null;
	  return ResizeObserverController;
	}();
	/**
	 * Defines non-writable/enumerable properties of the provided target object.
	 *
	 * @param {Object} target - Object for which to define properties.
	 * @param {Object} props - Properties to be defined.
	 * @returns {Object} Target object.
	 */


	var defineConfigurable = function defineConfigurable(target, props) {
	  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
	    var key = _a[_i];
	    Object.defineProperty(target, key, {
	      value: props[key],
	      enumerable: false,
	      writable: false,
	      configurable: true
	    });
	  }

	  return target;
	};
	/**
	 * Returns the global object associated with provided element.
	 *
	 * @param {Object} target
	 * @returns {Object}
	 */


	var getWindowOf = function getWindowOf(target) {
	  // Assume that the element is an instance of Node, which means that it
	  // has the "ownerDocument" property from which we can retrieve a
	  // corresponding global object.
	  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
	  // provided element.

	  return ownerGlobal || global$1;
	}; // Placeholder of an empty content rectangle.


	var emptyRect = createRectInit(0, 0, 0, 0);
	/**
	 * Converts provided string to a number.
	 *
	 * @param {number|string} value
	 * @returns {number}
	 */

	function toFloat(value) {
	  return parseFloat(value) || 0;
	}
	/**
	 * Extracts borders size from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @param {...string} positions - Borders positions (top, right, ...)
	 * @returns {number}
	 */


	function getBordersSize(styles) {
	  var positions = [];

	  for (var _i = 1; _i < arguments.length; _i++) {
	    positions[_i - 1] = arguments[_i];
	  }

	  return positions.reduce(function (size, position) {
	    var value = styles['border-' + position + '-width'];
	    return size + toFloat(value);
	  }, 0);
	}
	/**
	 * Extracts paddings sizes from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @returns {Object} Paddings box.
	 */


	function getPaddings(styles) {
	  var positions = ['top', 'right', 'bottom', 'left'];
	  var paddings = {};

	  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
	    var position = positions_1[_i];
	    var value = styles['padding-' + position];
	    paddings[position] = toFloat(value);
	  }

	  return paddings;
	}
	/**
	 * Calculates content rectangle of provided SVG element.
	 *
	 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
	 *      to be calculated.
	 * @returns {DOMRectInit}
	 */


	function getSVGContentRect(target) {
	  var bbox = target.getBBox();
	  return createRectInit(0, 0, bbox.width, bbox.height);
	}
	/**
	 * Calculates content rectangle of provided HTMLElement.
	 *
	 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
	 * @returns {DOMRectInit}
	 */


	function getHTMLElementContentRect(target) {
	  // Client width & height properties can't be
	  // used exclusively as they provide rounded values.
	  var clientWidth = target.clientWidth,
	      clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
	  // detached elements. Though elements with width & height properties less
	  // than 0.5 will be discarded as well.
	  //
	  // Without it we would need to implement separate methods for each of
	  // those cases and it's not possible to perform a precise and performance
	  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
	  // gives wrong results for elements with width & height less than 0.5.

	  if (!clientWidth && !clientHeight) {
	    return emptyRect;
	  }

	  var styles = getWindowOf(target).getComputedStyle(target);
	  var paddings = getPaddings(styles);
	  var horizPad = paddings.left + paddings.right;
	  var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
	  // only dimensions available to JS that contain non-rounded values. It could
	  // be possible to utilize the getBoundingClientRect if only it's data wasn't
	  // affected by CSS transformations let alone paddings, borders and scroll bars.

	  var width = toFloat(styles.width),
	      height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
	  // model is applied (except for IE).

	  if (styles.boxSizing === 'border-box') {
	    // Following conditions are required to handle Internet Explorer which
	    // doesn't include paddings and borders to computed CSS dimensions.
	    //
	    // We can say that if CSS dimensions + paddings are equal to the "client"
	    // properties then it's either IE, and thus we don't need to subtract
	    // anything, or an element merely doesn't have paddings/borders styles.
	    if (Math.round(width + horizPad) !== clientWidth) {
	      width -= getBordersSize(styles, 'left', 'right') + horizPad;
	    }

	    if (Math.round(height + vertPad) !== clientHeight) {
	      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
	    }
	  } // Following steps can't be applied to the document's root element as its
	  // client[Width/Height] properties represent viewport area of the window.
	  // Besides, it's as well not necessary as the <html> itself neither has
	  // rendered scroll bars nor it can be clipped.


	  if (!isDocumentElement(target)) {
	    // In some browsers (only in Firefox, actually) CSS width & height
	    // include scroll bars size which can be removed at this step as scroll
	    // bars are the only difference between rounded dimensions + paddings
	    // and "client" properties, though that is not always true in Chrome.
	    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
	    var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
	    // E.g. for an element with content width of 314.2px it sometimes gives
	    // the client width of 315px and for the width of 314.7px it may give
	    // 314px. And it doesn't happen all the time. So just ignore this delta
	    // as a non-relevant.

	    if (Math.abs(vertScrollbar) !== 1) {
	      width -= vertScrollbar;
	    }

	    if (Math.abs(horizScrollbar) !== 1) {
	      height -= horizScrollbar;
	    }
	  }

	  return createRectInit(paddings.left, paddings.top, width, height);
	}
	/**
	 * Checks whether provided element is an instance of the SVGGraphicsElement.
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */


	var isSVGGraphicsElement = function () {
	  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
	  // interface.
	  if (typeof SVGGraphicsElement !== 'undefined') {
	    return function (target) {
	      return target instanceof getWindowOf(target).SVGGraphicsElement;
	    };
	  } // If it's so, then check that element is at least an instance of the
	  // SVGElement and that it has the "getBBox" method.
	  // eslint-disable-next-line no-extra-parens


	  return function (target) {
	    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
	  };
	}();
	/**
	 * Checks whether provided element is a document element (<html>).
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */


	function isDocumentElement(target) {
	  return target === getWindowOf(target).document.documentElement;
	}
	/**
	 * Calculates an appropriate content rectangle for provided html or svg element.
	 *
	 * @param {Element} target - Element content rectangle of which needs to be calculated.
	 * @returns {DOMRectInit}
	 */


	function getContentRect(target) {
	  if (!isBrowser) {
	    return emptyRect;
	  }

	  if (isSVGGraphicsElement(target)) {
	    return getSVGContentRect(target);
	  }

	  return getHTMLElementContentRect(target);
	}
	/**
	 * Creates rectangle with an interface of the DOMRectReadOnly.
	 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
	 *
	 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
	 * @returns {DOMRectReadOnly}
	 */


	function createReadOnlyRect(_a) {
	  var x = _a.x,
	      y = _a.y,
	      width = _a.width,
	      height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

	  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
	  var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

	  defineConfigurable(rect, {
	    x: x,
	    y: y,
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: height + y,
	    left: x
	  });
	  return rect;
	}
	/**
	 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
	 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 * @param {number} width - Rectangle's width.
	 * @param {number} height - Rectangle's height.
	 * @returns {DOMRectInit}
	 */


	function createRectInit(x, y, width, height) {
	  return {
	    x: x,
	    y: y,
	    width: width,
	    height: height
	  };
	}
	/**
	 * Class that is responsible for computations of the content rectangle of
	 * provided DOM element and for keeping track of it's changes.
	 */


	var ResizeObservation =
	/** @class */
	function () {
	  /**
	   * Creates an instance of ResizeObservation.
	   *
	   * @param {Element} target - Element to be observed.
	   */
	  function ResizeObservation(target) {
	    /**
	     * Broadcasted width of content rectangle.
	     *
	     * @type {number}
	     */
	    this.broadcastWidth = 0;
	    /**
	     * Broadcasted height of content rectangle.
	     *
	     * @type {number}
	     */

	    this.broadcastHeight = 0;
	    /**
	     * Reference to the last observed content rectangle.
	     *
	     * @private {DOMRectInit}
	     */

	    this.contentRect_ = createRectInit(0, 0, 0, 0);
	    this.target = target;
	  }
	  /**
	   * Updates content rectangle and tells whether it's width or height properties
	   * have changed since the last broadcast.
	   *
	   * @returns {boolean}
	   */


	  ResizeObservation.prototype.isActive = function () {
	    var rect = getContentRect(this.target);
	    this.contentRect_ = rect;
	    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
	  };
	  /**
	   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
	   * from the corresponding properties of the last observed content rectangle.
	   *
	   * @returns {DOMRectInit} Last observed content rectangle.
	   */


	  ResizeObservation.prototype.broadcastRect = function () {
	    var rect = this.contentRect_;
	    this.broadcastWidth = rect.width;
	    this.broadcastHeight = rect.height;
	    return rect;
	  };

	  return ResizeObservation;
	}();

	var ResizeObserverEntry =
	/** @class */
	function () {
	  /**
	   * Creates an instance of ResizeObserverEntry.
	   *
	   * @param {Element} target - Element that is being observed.
	   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
	   */
	  function ResizeObserverEntry(target, rectInit) {
	    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
	    // and are also not enumerable in the native implementation.
	    //
	    // Property accessors are not being used as they'd require to define a
	    // private WeakMap storage which may cause memory leaks in browsers that
	    // don't support this type of collections.

	    defineConfigurable(this, {
	      target: target,
	      contentRect: contentRect
	    });
	  }

	  return ResizeObserverEntry;
	}();

	var ResizeObserverSPI =
	/** @class */
	function () {
	  /**
	   * Creates a new instance of ResizeObserver.
	   *
	   * @param {ResizeObserverCallback} callback - Callback function that is invoked
	   *      when one of the observed elements changes it's content dimensions.
	   * @param {ResizeObserverController} controller - Controller instance which
	   *      is responsible for the updates of observer.
	   * @param {ResizeObserver} callbackCtx - Reference to the public
	   *      ResizeObserver instance which will be passed to callback function.
	   */
	  function ResizeObserverSPI(callback, controller, callbackCtx) {
	    /**
	     * Collection of resize observations that have detected changes in dimensions
	     * of elements.
	     *
	     * @private {Array<ResizeObservation>}
	     */
	    this.activeObservations_ = [];
	    /**
	     * Registry of the ResizeObservation instances.
	     *
	     * @private {Map<Element, ResizeObservation>}
	     */

	    this.observations_ = new MapShim();

	    if (typeof callback !== 'function') {
	      throw new TypeError('The callback provided as parameter 1 is not a function.');
	    }

	    this.callback_ = callback;
	    this.controller_ = controller;
	    this.callbackCtx_ = callbackCtx;
	  }
	  /**
	   * Starts observing provided element.
	   *
	   * @param {Element} target - Element to be observed.
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.observe = function (target) {
	    if (!arguments.length) {
	      throw new TypeError('1 argument required, but only 0 present.');
	    } // Do nothing if current environment doesn't have the Element interface.


	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	      return;
	    }

	    if (!(target instanceof getWindowOf(target).Element)) {
	      throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_; // Do nothing if element is already being observed.

	    if (observations.has(target)) {
	      return;
	    }

	    observations.set(target, new ResizeObservation(target));
	    this.controller_.addObserver(this); // Force the update of observations.

	    this.controller_.refresh();
	  };
	  /**
	   * Stops observing provided element.
	   *
	   * @param {Element} target - Element to stop observing.
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.unobserve = function (target) {
	    if (!arguments.length) {
	      throw new TypeError('1 argument required, but only 0 present.');
	    } // Do nothing if current environment doesn't have the Element interface.


	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	      return;
	    }

	    if (!(target instanceof getWindowOf(target).Element)) {
	      throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_; // Do nothing if element is not being observed.

	    if (!observations.has(target)) {
	      return;
	    }

	    observations.delete(target);

	    if (!observations.size) {
	      this.controller_.removeObserver(this);
	    }
	  };
	  /**
	   * Stops observing all elements.
	   *
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.disconnect = function () {
	    this.clearActive();
	    this.observations_.clear();
	    this.controller_.removeObserver(this);
	  };
	  /**
	   * Collects observation instances the associated element of which has changed
	   * it's content rectangle.
	   *
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.gatherActive = function () {
	    var _this = this;

	    this.clearActive();
	    this.observations_.forEach(function (observation) {
	      if (observation.isActive()) {
	        _this.activeObservations_.push(observation);
	      }
	    });
	  };
	  /**
	   * Invokes initial callback function with a list of ResizeObserverEntry
	   * instances collected from active resize observations.
	   *
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.broadcastActive = function () {
	    // Do nothing if observer doesn't have active observations.
	    if (!this.hasActive()) {
	      return;
	    }

	    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

	    var entries = this.activeObservations_.map(function (observation) {
	      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
	    });
	    this.callback_.call(ctx, entries, ctx);
	    this.clearActive();
	  };
	  /**
	   * Clears the collection of active observations.
	   *
	   * @returns {void}
	   */


	  ResizeObserverSPI.prototype.clearActive = function () {
	    this.activeObservations_.splice(0);
	  };
	  /**
	   * Tells whether observer has active observations.
	   *
	   * @returns {boolean}
	   */


	  ResizeObserverSPI.prototype.hasActive = function () {
	    return this.activeObservations_.length > 0;
	  };

	  return ResizeObserverSPI;
	}(); // Registry of internal observers. If WeakMap is not available use current shim
	// for the Map collection as it has all required methods and because WeakMap
	// can't be fully polyfilled anyway.


	var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
	/**
	 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
	 * exposing only those methods and properties that are defined in the spec.
	 */

	var ResizeObserver =
	/** @class */
	function () {
	  /**
	   * Creates a new instance of ResizeObserver.
	   *
	   * @param {ResizeObserverCallback} callback - Callback that is invoked when
	   *      dimensions of the observed elements change.
	   */
	  function ResizeObserver(callback) {
	    if (!(this instanceof ResizeObserver)) {
	      throw new TypeError('Cannot call a class as a function.');
	    }

	    if (!arguments.length) {
	      throw new TypeError('1 argument required, but only 0 present.');
	    }

	    var controller = ResizeObserverController.getInstance();
	    var observer = new ResizeObserverSPI(callback, controller, this);
	    observers.set(this, observer);
	  }

	  return ResizeObserver;
	}(); // Expose public methods of ResizeObserver.


	['observe', 'unobserve', 'disconnect'].forEach(function (method) {
	  ResizeObserver.prototype[method] = function () {
	    var _a;

	    return (_a = observers.get(this))[method].apply(_a, arguments);
	  };
	});

	var index = function () {
	  // Export existing implementation if available.
	  if (typeof global$1.ResizeObserver !== 'undefined') {
	    return global$1.ResizeObserver;
	  }

	  return ResizeObserver;
	}();

	var rafSchd = function rafSchd(fn) {
	  var lastArgs = [];
	  var frameId = null;

	  var wrapperFn = function wrapperFn() {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    lastArgs = args;

	    if (frameId) {
	      return;
	    }

	    frameId = requestAnimationFrame(function () {
	      frameId = null;
	      fn.apply(void 0, lastArgs);
	    });
	  };

	  wrapperFn.cancel = function () {
	    if (!frameId) {
	      return;
	    }

	    cancelAnimationFrame(frameId);
	    frameId = null;
	  };

	  return wrapperFn;
	};
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */


	function isObject(value) {
	  var type = _typeof2(value);

	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;
	/** Detect free variable `global` from Node.js. */

	var freeGlobal = _typeof2(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal;
	/** Detect free variable `self`. */

	var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof2(self)) == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root = _freeGlobal || freeSelf || Function('return this')();
	var _root = root;
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now = function now() {
	  return _root.Date.now();
	};

	var now_1 = now;
	/** Used to match a single whitespace character. */

	var reWhitespace = /\s/;
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */

	function trimmedEndIndex(string) {
	  var index = string.length;

	  while (index-- && reWhitespace.test(string.charAt(index))) {}

	  return index;
	}

	var _trimmedEndIndex = trimmedEndIndex;
	/** Used to match leading whitespace. */

	var reTrimStart = /^\s+/;
	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */

	function baseTrim(string) {
	  return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
	}

	var _baseTrim = baseTrim;
	/** Built-in value references. */

	var Symbol$1 = _root.Symbol;
	var _Symbol = Symbol$1;
	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto.toString;
	/** Built-in value references. */

	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag;
	/** Used for built-in method references. */

	var objectProto$1 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$1.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;
	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike(value) {
	  return value != null && _typeof2(value) == 'object';
	}

	var isObjectLike_1 = isObjectLike;
	/** `Object#toString` result references. */

	var symbolTag = '[object Symbol]';
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */

	function isSymbol(value) {
	  return _typeof2(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
	}

	var isSymbol_1 = isSymbol;
	/** Used as references for various `Number` constants. */

	var NAN = 0 / 0;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt = parseInt;
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */

	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol_1(value)) {
	    return NAN;
	  }

	  if (isObject_1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject_1(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = _baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	var toNumber_1 = toNumber;
	/** Error message constants. */

	var FUNC_ERROR_TEXT = 'Expected a function';
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax = Math.max,
	    nativeMin = Math.min;
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */

	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  wait = toNumber_1(wait) || 0;

	  if (isObject_1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now_1();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now_1());
	  }

	  function debounced() {
	    var time = now_1(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	var debounce_1 = debounce;
	/** Error message constants. */

	var FUNC_ERROR_TEXT$1 = 'Expected a function';
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */

	function throttle$1(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }

	  if (isObject_1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  return debounce_1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	var throttle_1 = throttle$1;
	var utils = createCommonjsModule$1(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.isDOMElement = exports.isSSR = exports.isFunction = exports.getHandle = exports.listHandle = void 0;

	  var _debounce = _interopRequireDefault(debounce_1);

	  var _throttle = _interopRequireDefault(throttle_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  var listHandle = {
	    debounce: _debounce["default"],
	    throttle: _throttle["default"]
	  };
	  exports.listHandle = listHandle;

	  var getHandle = function getHandle(type) {
	    return listHandle[type];
	  };

	  exports.getHandle = getHandle;

	  var isFunction = function isFunction(fn) {
	    return typeof fn === 'function';
	  };

	  exports.isFunction = isFunction;

	  var isSSR = function isSSR() {
	    return typeof window === 'undefined';
	  };

	  exports.isSSR = isSSR;

	  var isDOMElement = function isDOMElement(element) {
	    return element instanceof Element || element instanceof HTMLDocument;
	  };

	  exports.isDOMElement = isDOMElement;
	});
	unwrapExports$1(utils);
	var utils_1 = utils.isDOMElement;
	var utils_2 = utils.isSSR;
	var utils_3 = utils.isFunction;
	var utils_4 = utils.getHandle;
	var utils_5 = utils.listHandle;
	var ChildWrapper_1 = createCommonjsModule$1(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties(Constructor, staticProps);
	    return Constructor;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) _setPrototypeOf(subClass, superClass);
	  }

	  function _setPrototypeOf(o, p) {
	    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  function _createSuper(Derived) {
	    return function () {
	      var Super = _getPrototypeOf(Derived),
	          result;

	      if (_isNativeReflectConstruct()) {
	        var NewTarget = _getPrototypeOf(this).constructor;

	        result = Reflect.construct(Super, arguments, NewTarget);
	      } else {
	        result = Super.apply(this, arguments);
	      }

	      return _possibleConstructorReturn(this, result);
	    };
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (call && (_typeof(call) === "object" || typeof call === "function")) {
	      return call;
	    }

	    return _assertThisInitialized(self);
	  }

	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  function _isNativeReflectConstruct() {
	    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	    if (Reflect.construct.sham) return false;
	    if (typeof Proxy === "function") return true;

	    try {
	      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  function _getPrototypeOf(o) {
	    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	      return o.__proto__ || Object.getPrototypeOf(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  var ChildWrapper = /*#__PURE__*/function (_PureComponent) {
	    _inherits(ChildWrapper, _PureComponent);

	    var _super = _createSuper(ChildWrapper);

	    function ChildWrapper() {
	      _classCallCheck(this, ChildWrapper);

	      return _super.apply(this, arguments);
	    }

	    _createClass(ChildWrapper, [{
	      key: "render",
	      value: function render() {
	        // eslint-disable-next-line react/prop-types
	        return this.props.children;
	      }
	    }]);

	    return ChildWrapper;
	  }(React__default.PureComponent);

	  var _default = ChildWrapper;
	  exports["default"] = _default;
	});
	unwrapExports$1(ChildWrapper_1);
	var ResizeDetector_1 = createCommonjsModule$1(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  var _react = _interopRequireWildcard(React__default);

	  var _resizeObserverPolyfill = _interopRequireDefault(index);

	  var _rafSchd = _interopRequireDefault(rafSchd);

	  var _ChildWrapper = _interopRequireDefault(ChildWrapper_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  function _getRequireWildcardCache() {
	    if (typeof WeakMap !== "function") return null;
	    var cache = new WeakMap();

	    _getRequireWildcardCache = function _getRequireWildcardCache() {
	      return cache;
	    };

	    return cache;
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    }

	    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
	      return {
	        "default": obj
	      };
	    }

	    var cache = _getRequireWildcardCache();

	    if (cache && cache.has(obj)) {
	      return cache.get(obj);
	    }

	    var newObj = {};
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	        if (desc && (desc.get || desc.set)) {
	          Object.defineProperty(newObj, key, desc);
	        } else {
	          newObj[key] = obj[key];
	        }
	      }
	    }

	    newObj["default"] = obj;

	    if (cache) {
	      cache.set(obj, newObj);
	    }

	    return newObj;
	  }

	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties(Constructor, staticProps);
	    return Constructor;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) _setPrototypeOf(subClass, superClass);
	  }

	  function _setPrototypeOf(o, p) {
	    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  function _createSuper(Derived) {
	    return function () {
	      var Super = _getPrototypeOf(Derived),
	          result;

	      if (_isNativeReflectConstruct()) {
	        var NewTarget = _getPrototypeOf(this).constructor;

	        result = Reflect.construct(Super, arguments, NewTarget);
	      } else {
	        result = Super.apply(this, arguments);
	      }

	      return _possibleConstructorReturn(this, result);
	    };
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (call && (_typeof(call) === "object" || typeof call === "function")) {
	      return call;
	    }

	    return _assertThisInitialized(self);
	  }

	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  function _isNativeReflectConstruct() {
	    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	    if (Reflect.construct.sham) return false;
	    if (typeof Proxy === "function") return true;

	    try {
	      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  function _getPrototypeOf(o) {
	    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	      return o.__proto__ || Object.getPrototypeOf(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  var ResizeDetector = /*#__PURE__*/function (_PureComponent) {
	    _inherits(ResizeDetector, _PureComponent);

	    var _super = _createSuper(ResizeDetector);

	    function ResizeDetector(props) {
	      var _this;

	      _classCallCheck(this, ResizeDetector);

	      _this = _super.call(this, props);

	      _defineProperty(_assertThisInitialized(_this), "cancelHandler", function () {
	        if (_this.resizeHandler && _this.resizeHandler.cancel) {
	          // cancel debounced handler
	          _this.resizeHandler.cancel();

	          _this.resizeHandler = null;
	        }
	      });

	      _defineProperty(_assertThisInitialized(_this), "rafClean", function () {
	        if (_this.raf && _this.raf.cancel) {
	          _this.raf.cancel();

	          _this.raf = null;
	        }
	      });

	      _defineProperty(_assertThisInitialized(_this), "toggleObserver", function (type) {
	        var element = _this.getElement();

	        if (!element || !_this.resizeObserver[type]) return;

	        _this.resizeObserver[type](element);
	      });

	      _defineProperty(_assertThisInitialized(_this), "getElement", function () {
	        var _this$props = _this.props,
	            querySelector = _this$props.querySelector,
	            targetDomEl = _this$props.targetDomEl;
	        if ((0, utils.isSSR)()) return undefined;
	        if (querySelector) return document.querySelector(querySelector);
	        if (targetDomEl && (0, utils.isDOMElement)(targetDomEl)) return targetDomEl; // eslint-disable-next-line react/no-find-dom-node

	        var currentElement = _this.element && (0, reactDom.findDOMNode)(_this.element);
	        if (!currentElement) return undefined;
	        return currentElement.parentElement;
	      });

	      _defineProperty(_assertThisInitialized(_this), "createUpdater", function () {
	        _this.rafClean();

	        _this.raf = (0, _rafSchd["default"])(function (_ref) {
	          var width = _ref.width,
	              height = _ref.height;
	          var onResize = _this.props.onResize;

	          if ((0, utils.isFunction)(onResize)) {
	            onResize(width, height);
	          }

	          _this.setState({
	            width: width,
	            height: height
	          });
	        });
	        return _this.raf;
	      });

	      _defineProperty(_assertThisInitialized(_this), "createResizeHandler", function (entries) {
	        var _this$state = _this.state,
	            widthCurrent = _this$state.width,
	            heightCurrent = _this$state.height;
	        var _this$props2 = _this.props,
	            handleWidth = _this$props2.handleWidth,
	            handleHeight = _this$props2.handleHeight;
	        if (!handleWidth && !handleHeight) return;

	        var updater = _this.createUpdater();

	        entries.forEach(function (entry) {
	          var _ref2 = entry && entry.contentRect || {},
	              width = _ref2.width,
	              height = _ref2.height;

	          var isWidthChanged = handleWidth && widthCurrent !== width;
	          var isHeightChanged = handleHeight && heightCurrent !== height;
	          var isSizeChanged = isWidthChanged || isHeightChanged;
	          var shouldSetSize = !_this.skipOnMount && isSizeChanged && !(0, utils.isSSR)();

	          if (shouldSetSize) {
	            updater({
	              width: width,
	              height: height
	            });
	          }

	          _this.skipOnMount = false;
	        });
	      });

	      _defineProperty(_assertThisInitialized(_this), "onRef", function (el) {
	        _this.element = el;
	      });

	      _defineProperty(_assertThisInitialized(_this), "getRenderType", function () {
	        var _this$props3 = _this.props,
	            render = _this$props3.render,
	            children = _this$props3.children;

	        if ((0, utils.isFunction)(render)) {
	          return 'renderProp';
	        }

	        if ((0, utils.isFunction)(children)) {
	          return 'childFunction';
	        }

	        if ((0, _react.isValidElement)(children)) {
	          return 'child';
	        }

	        if (Array.isArray(children)) {
	          return 'childArray';
	        }

	        return 'parent';
	      });

	      _defineProperty(_assertThisInitialized(_this), "getTargetComponent", function () {
	        var _this$props4 = _this.props,
	            render = _this$props4.render,
	            children = _this$props4.children,
	            nodeType = _this$props4.nodeType;
	        var _this$state2 = _this.state,
	            width = _this$state2.width,
	            height = _this$state2.height;
	        var childProps = {
	          width: width,
	          height: height
	        };

	        var renderType = _this.getRenderType();

	        switch (renderType) {
	          case 'renderProp':
	            return (0, _react.cloneElement)(render(childProps), {
	              key: 'resize-detector'
	            });

	          case 'childFunction':
	            return (0, _react.cloneElement)(children(childProps));

	          case 'child':
	            return (0, _react.cloneElement)(children, childProps);

	          case 'childArray':
	            return children.map(function (el) {
	              return !!el && (0, _react.cloneElement)(el, childProps);
	            });

	          default:
	            return (0, _react.createElement)(nodeType);
	        }
	      });

	      var skipOnMount = props.skipOnMount,
	          refreshMode = props.refreshMode,
	          refreshRate = props.refreshRate,
	          refreshOptions = props.refreshOptions;
	      _this.state = {
	        width: undefined,
	        height: undefined
	      };
	      _this.skipOnMount = skipOnMount;
	      _this.raf = null;
	      _this.element = null;
	      _this.unmounted = false;
	      var handle = (0, utils.getHandle)(refreshMode);
	      _this.resizeHandler = handle ? handle(_this.createResizeHandler, refreshRate, refreshOptions) : _this.createResizeHandler;
	      _this.resizeObserver = new _resizeObserverPolyfill["default"](_this.resizeHandler);
	      return _this;
	    }

	    _createClass(ResizeDetector, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        this.toggleObserver('observe');
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        this.toggleObserver('unobserve');
	        this.rafClean();
	        this.cancelHandler();
	        this.unmounted = true;
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        return /*#__PURE__*/_react["default"].createElement(_ChildWrapper["default"], {
	          ref: this.onRef
	        }, this.getTargetComponent());
	      }
	    }]);

	    return ResizeDetector;
	  }(_react.PureComponent);

	  ResizeDetector.propTypes = {
	    handleWidth: propTypes.bool,
	    handleHeight: propTypes.bool,
	    skipOnMount: propTypes.bool,
	    refreshRate: propTypes.number,
	    refreshMode: propTypes.string,
	    refreshOptions: (0, propTypes.shape)({
	      leading: propTypes.bool,
	      trailing: propTypes.bool
	    }),
	    querySelector: propTypes.string,
	    targetDomEl: propTypes.any,
	    // eslint-disable-line react/forbid-prop-types
	    onResize: propTypes.func,
	    render: propTypes.func,
	    children: propTypes.any,
	    // eslint-disable-line react/forbid-prop-types
	    nodeType: propTypes.node
	  };
	  ResizeDetector.defaultProps = {
	    handleWidth: false,
	    handleHeight: false,
	    skipOnMount: false,
	    refreshRate: 1000,
	    refreshMode: undefined,
	    refreshOptions: undefined,
	    querySelector: null,
	    targetDomEl: null,
	    onResize: null,
	    render: undefined,
	    children: null,
	    nodeType: 'div'
	  };
	  var _default = ResizeDetector;
	  exports["default"] = _default;
	});
	unwrapExports$1(ResizeDetector_1);
	var withResizeDetector_1 = createCommonjsModule$1(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  var _react = _interopRequireWildcard(React__default);

	  var _ResizeDetector = _interopRequireDefault(ResizeDetector_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  function _getRequireWildcardCache() {
	    if (typeof WeakMap !== "function") return null;
	    var cache = new WeakMap();

	    _getRequireWildcardCache = function _getRequireWildcardCache() {
	      return cache;
	    };

	    return cache;
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    }

	    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
	      return {
	        "default": obj
	      };
	    }

	    var cache = _getRequireWildcardCache();

	    if (cache && cache.has(obj)) {
	      return cache.get(obj);
	    }

	    var newObj = {};
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	        if (desc && (desc.get || desc.set)) {
	          Object.defineProperty(newObj, key, desc);
	        } else {
	          newObj[key] = obj[key];
	        }
	      }
	    }

	    newObj["default"] = obj;

	    if (cache) {
	      cache.set(obj, newObj);
	    }

	    return newObj;
	  }

	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties(Constructor, staticProps);
	    return Constructor;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) _setPrototypeOf(subClass, superClass);
	  }

	  function _setPrototypeOf(o, p) {
	    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  function _createSuper(Derived) {
	    return function () {
	      var Super = _getPrototypeOf(Derived),
	          result;

	      if (_isNativeReflectConstruct()) {
	        var NewTarget = _getPrototypeOf(this).constructor;

	        result = Reflect.construct(Super, arguments, NewTarget);
	      } else {
	        result = Super.apply(this, arguments);
	      }

	      return _possibleConstructorReturn(this, result);
	    };
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (call && (_typeof(call) === "object" || typeof call === "function")) {
	      return call;
	    }

	    return _assertThisInitialized(self);
	  }

	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  function _isNativeReflectConstruct() {
	    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	    if (Reflect.construct.sham) return false;
	    if (typeof Proxy === "function") return true;

	    try {
	      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  function _getPrototypeOf(o) {
	    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	      return o.__proto__ || Object.getPrototypeOf(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  var withResizeDetector = function withResizeDetector(WrappedComponent) {
	    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	      handleWidth: true,
	      handleHeight: true
	    };
	    return (
	      /*#__PURE__*/
	      // eslint-disable-next-line
	      function (_Component) {
	        _inherits(ResizeDetectorHOC, _Component);

	        var _super = _createSuper(ResizeDetectorHOC);

	        function ResizeDetectorHOC() {
	          _classCallCheck(this, ResizeDetectorHOC);

	          return _super.apply(this, arguments);
	        }

	        _createClass(ResizeDetectorHOC, [{
	          key: "render",
	          value: function render() {
	            return /*#__PURE__*/_react["default"].createElement(_ResizeDetector["default"], props, /*#__PURE__*/_react["default"].createElement(WrappedComponent, this.props));
	          }
	        }]);

	        return ResizeDetectorHOC;
	      }(_react.Component)
	    );
	  };

	  var _default = withResizeDetector;
	  exports["default"] = _default;
	});
	unwrapExports$1(withResizeDetector_1);
	var lib = createCommonjsModule$1(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  Object.defineProperty(exports, "withResizeDetector", {
	    enumerable: true,
	    get: function get() {
	      return _withResizeDetector["default"];
	    }
	  });
	  exports["default"] = void 0;

	  var _ResizeDetector = _interopRequireDefault(ResizeDetector_1);

	  var _withResizeDetector = _interopRequireDefault(withResizeDetector_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  var _default = _ResizeDetector["default"];
	  exports["default"] = _default;
	});
	var ReactResizeDetector = unwrapExports$1(lib);
	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */

	var FUNC_ERROR_TEXT$2 = 'Expected a function';
	/** Used as references for various `Number` constants. */

	var NAN$1 = 0 / 0;
	/** `Object#toString` result references. */

	var symbolTag$1 = '[object Symbol]';
	/** Used to match leading and trailing whitespace. */

	var reTrim = /^\s+|\s+$/g;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary$1 = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal$1 = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt$1 = parseInt;
	/** Detect free variable `global` from Node.js. */

	var freeGlobal$1 = _typeof2(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	/** Detect free variable `self`. */

	var freeSelf$1 = (typeof self === "undefined" ? "undefined" : _typeof2(self)) == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();
	/** Used for built-in method references. */

	var objectProto$2 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var objectToString$1 = objectProto$2.toString;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax$1 = Math.max,
	    nativeMin$1 = Math.min;
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now$1 = function now$1() {
	  return root$1.Date.now();
	};
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */


	function debounce$1(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$2);
	  }

	  wait = toNumber$1(wait) || 0;

	  if (isObject$1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now$1();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now$1());
	  }

	  function debounced() {
	    var time = now$1(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */


	function isObject$1(value) {
	  var type = _typeof2(value);

	  return !!value && (type == 'object' || type == 'function');
	}
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */


	function isObjectLike$1(value) {
	  return !!value && _typeof2(value) == 'object';
	}
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */


	function isSymbol$1(value) {
	  return _typeof2(value) == 'symbol' || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1;
	}
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */


	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol$1(value)) {
	    return NAN$1;
	  }

	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary$1.test(value);
	  return isBinary || reIsOctal$1.test(value) ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8) : reIsBadHex$1.test(value) ? NAN$1 : +value;
	}

	var lodash_debounce = debounce$1;
	/**
	 * Compare equality of two string arrays.
	 *
	 * @param {string[]} [arr1] - String array #1
	 * @param {string[]} [arr2] - String array #2
	 * @returns {boolean}
	 */

	function areStringArraysEqual(arr1, arr2) {
	  if (arr1 === arr2) return true; // Identity

	  if (!arr1 || !arr2) return false; // One is undef/null

	  if (arr1.length !== arr2.length) return false; // Diff length

	  for (var i = 0; i < arr1.length; i++) {
	    if (arr1[i] !== arr2[i]) return false;
	  }

	  return true;
	}

	var css_248z$4 = ".viewport-wrapper {\n  width: 100%;\n  height: 100%; /* MUST have `height` to prevent resize infinite loop */\n  position: relative;\n}\n\n.viewport-element {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background-color: black;\n\n  /* Prevent the blue outline in Chrome when a viewport is selected */\n  outline: 0 !important;\n\n  /* Prevents the entire page from getting larger\n     when the magnify tool is near the sides/corners of the page */\n  overflow: hidden;\n}\n";
	styleInject(css_248z$4);

	function _createSuper$4(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct$4();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _isNativeReflectConstruct$4() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var scrollToIndex = cornerstoneTools.importInternal('util/scrollToIndex');
	var loadHandlerManager = cornerstoneTools.loadHandlerManager;

	var CornerstoneViewport = /*#__PURE__*/function (_Component) {
	  _inherits(CornerstoneViewport, _Component);

	  var _super = _createSuper$4(CornerstoneViewport);

	  function CornerstoneViewport(props) {
	    var _this;

	    _classCallCheck(this, CornerstoneViewport);

	    _this = _super.call(this, props);

	    _defineProperty(_assertThisInitialized(_this), "_handleOnElementEnabledEvent", function () {
	      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var handler = function handler(evt) {
	        var elementThatWasEnabled = evt.detail.element;

	        if (elementThatWasEnabled === _this.element) {
	          // Pass Event
	          _this.props.onElementEnabled(evt);
	        }
	      }; // Start Listening


	      if (_this.props.onElementEnabled && !clear) {
	        cornerstone.events.addEventListener(cornerstone.EVENTS.ELEMENT_ENABLED, handler);
	      } // Stop Listening


	      if (clear) {
	        cornerstone.events.removeEventListener(cornerstone.EVENTS.ELEMENT_ENABLED, handler);
	      }
	    });

	    _defineProperty(_assertThisInitialized(_this), "onImageRendered", function (event) {
	      var viewport = event.detail.viewport;

	      _this.setState({
	        scale: viewport.scale,
	        windowCenter: viewport.voi.windowCenter,
	        windowWidth: viewport.voi.windowWidth,
	        rotationDegrees: viewport.rotation,
	        isFlippedVertically: viewport.vflip,
	        isFlippedHorizontally: viewport.hflip
	      });
	    });

	    _defineProperty(_assertThisInitialized(_this), "onNewImageHandler", function (event, callback) {
	      var imageId = event.detail.image.imageId;

	      var _ref = cornerstone.metaData.get('generalImageModule', imageId) || {},
	          sopInstanceUid = _ref.sopInstanceUid;

	      var currentImageIdIndex = _this.props.imageIds.indexOf(imageId); // TODO: Should we grab and set some imageId specific metadata here?
	      // Could prevent cornerstone dependencies in child components.


	      _this.setState({
	        imageIdIndex: currentImageIdIndex
	      });

	      if (callback) {
	        callback({
	          currentImageIdIndex: currentImageIdIndex,
	          sopInstanceUid: sopInstanceUid
	        });
	      }
	    });

	    _defineProperty(_assertThisInitialized(_this), "onNewImage", function (event) {
	      return _this.onNewImageHandler(event, _this.props.onNewImage);
	    });

	    _defineProperty(_assertThisInitialized(_this), "onNewImageDebounced", lodash_debounce(function (event) {
	      _this.onNewImageHandler(event, _this.props.onNewImageDebounced);
	    }, _this.props.onNewImageDebounceTime));

	    _defineProperty(_assertThisInitialized(_this), "onImageLoaded", function () {
	      // TODO: This is not necessarily true :thinking:
	      // We need better cache reporting a layer up
	      _this.numImagesLoaded++;
	    });

	    _defineProperty(_assertThisInitialized(_this), "onImageProgress", function (e) {
	      _this.setState({
	        imageProgress: e.detail.percentComplete
	      });
	    });

	    _defineProperty(_assertThisInitialized(_this), "imageSliderOnInputCallback", function (value) {
	      _this.setViewportActive();

	      scrollToIndex(_this.element, value);
	    });

	    _defineProperty(_assertThisInitialized(_this), "setViewportActive", function () {
	      if (_this.props.setViewportActive) {
	        _this.props.setViewportActive(); // TODO: should take viewport index/ident?

	      }
	    });

	    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
	      cornerstone.resize(_this.element);
	    });

	    var imageIdIndex = props.imageIdIndex;
	    var _imageId = props.imageIds[imageIdIndex];
	    var isOverlayVisible = props.isOverlayVisible;
	    _this.state = {
	      // Used for metadata lookup (imagePlane, orientation markers)
	      // We can probs grab this once and hold on to? (updated on newImage)
	      imageId: _imageId,
	      imageIdIndex: imageIdIndex,
	      // Maybe
	      imageProgress: 0,
	      isLoading: true,
	      error: null,
	      // Overlay
	      scale: undefined,
	      windowWidth: undefined,
	      windowCenter: undefined,
	      isOverlayVisible: isOverlayVisible,
	      // Orientation Markers
	      rotationDegrees: undefined,
	      isFlippedVertically: undefined,
	      isFlippedHorizontally: undefined
	    };

	    _this._validateExternalEventsListeners(); // TODO: Deep Copy? How does that work w/ handlers?
	    // Save a copy. Props could change before `willUnmount`


	    _this.startLoadHandler = _this.props.startLoadHandler;
	    _this.endLoadHandler = _this.props.endLoadHandler;
	    _this.loadHandlerTimeout = undefined; // "Loading..." timer

	    _this.numImagesLoaded = 0;
	    return _this;
	  } // ~~ LIFECYCLE


	  _createClass(CornerstoneViewport, [{
	    key: "componentDidMount",
	    value: function () {
	      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        var _this$props, tools, isStackPrefetchEnabled, cornerstoneOptions, imageIds, isPlaying, frameRate, initialViewport, imageIdIndex, imageId, image, validFrameRate;

	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _this$props = this.props, tools = _this$props.tools, isStackPrefetchEnabled = _this$props.isStackPrefetchEnabled, cornerstoneOptions = _this$props.cornerstoneOptions, imageIds = _this$props.imageIds, isPlaying = _this$props.isPlaying, frameRate = _this$props.frameRate, initialViewport = _this$props.initialViewport;
	                imageIdIndex = this.state.imageIdIndex;
	                imageId = imageIds[imageIdIndex]; // ~~ EVENTS: CORNERSTONE

	                this._handleOnElementEnabledEvent();

	                this._bindInternalCornerstoneEventListeners();

	                this._bindExternalEventListeners('cornerstone');

	                cornerstone.enable(this.element, cornerstoneOptions); // ~~ EVENTS: ELEMENT

	                this._bindInternalElementEventListeners();

	                this._bindExternalEventListeners('element'); // Only after `uuid` is set for enabledElement


	                this._setupLoadHandlers();

	                _context.prev = 10; // Setup "Stack State"

	                cornerstoneTools.clearToolState(this.element, 'stack');
	                cornerstoneTools.addStackStateManager(this.element, ['stack', 'playClip', 'referenceLines']);
	                cornerstoneTools.addToolState(this.element, 'stack', {
	                  imageIds: _toConsumableArray(imageIds),
	                  currentImageIdIndex: imageIdIndex
	                }); // Load first image in stack

	                _context.next = 16;
	                return cornerstone.loadAndCacheImage(imageId);

	              case 16:
	                image = _context.sent; // Display

	                cornerstone.displayImage(this.element, image, initialViewport);

	                if (isStackPrefetchEnabled) {
	                  cornerstoneTools.stackPrefetch.enable(this.element);
	                }

	                if (isPlaying) {
	                  validFrameRate = Math.max(frameRate, 1);
	                  cornerstoneTools.playClip(this.element, validFrameRate);
	                }

	                _addAndConfigureInitialToolsForElement(tools, this.element);

	                _trySetActiveTool(this.element, this.props.activeTool);

	                this.setState({
	                  isLoading: false
	                });
	                _context.next = 28;
	                break;

	              case 25:
	                _context.prev = 25;
	                _context.t0 = _context["catch"](10);
	                this.setState({
	                  error: _context.t0,
	                  isLoading: false
	                });

	              case 28:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[10, 25]]);
	      }));

	      function componentDidMount() {
	        return _componentDidMount.apply(this, arguments);
	      }

	      return componentDidMount;
	    }()
	  }, {
	    key: "componentDidUpdate",
	    value: function () {
	      var _componentDidUpdate = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(prevProps, prevState) {
	        var _this$props2, stack, imageIndex, isStackPrefetchEnabled, initialViewport, stageChanged, prevStack, prevImageIndex, prevIsStackPrefetchEnabled, hasStackChanged, hasImageIndexChanged, updatedState, imageId, image, shouldStopStartStackPrefetch, activeTool, prevActiveTool, hasActiveToolChanges, _this$props3, frameRate, isPlaying, isOverlayVisible, prevFrameRate, prevIsPlaying, prevIsOverlayVisible, validFrameRate, shouldStart, shouldPause, hasFrameRateChanged;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                // ~~ STACK/IMAGE
	                _this$props2 = this.props, stack = _this$props2.imageIds, imageIndex = _this$props2.imageIdIndex, isStackPrefetchEnabled = _this$props2.isStackPrefetchEnabled, initialViewport = _this$props2.initialViewport, stageChanged = _this$props2.stageChanged;
	                prevStack = prevProps.imageIds, prevImageIndex = prevProps.imageIdIndex, prevIsStackPrefetchEnabled = prevProps.isStackPrefetchEnabled;
	                hasStackChanged = !areStringArraysEqual(prevStack, stack);
	                hasImageIndexChanged = imageIndex != null && imageIndex !== prevImageIndex;
	                updatedState = {};

	                if (!hasStackChanged) {
	                  _context2.next = 29;
	                  break;
	                }

	                if (!stageChanged) {
	                  _context2.next = 10;
	                  break;
	                }

	                this.componentWillUnmount();
	                _context2.next = 10;
	                return this.componentDidMount();

	              case 10:
	                // update stack toolstate
	                cornerstoneTools.clearToolState(this.element, 'stack');
	                cornerstoneTools.addToolState(this.element, 'stack', {
	                  imageIds: _toConsumableArray(stack),
	                  currentImageIdIndex: imageIndex || 0
	                }); // New stack; reset counter

	                updatedState['numImagesLoaded'] = 0;
	                updatedState['error'] = null; // Reset error on new stack

	                _context2.prev = 14; // load + display image

	                imageId = stack[imageIndex || 0];
	                cornerstoneTools.stopClip(this.element);
	                _context2.next = 19;
	                return cornerstone.loadAndCacheImage(imageId);

	              case 19:
	                image = _context2.sent;
	                cornerstone.displayImage(this.element, image, initialViewport);
	                cornerstone.reset(this.element);

	                if (initialViewport) {
	                  // If we have initial viewport we need to apply it again for
	                  // the new image stack
	                  cornerstone.displayImage(this.element, image, initialViewport);
	                }

	                _context2.next = 27;
	                break;

	              case 25:
	                _context2.prev = 25;
	                _context2.t0 = _context2["catch"](14);

	              case 27:
	                _context2.next = 30;
	                break;

	              case 29:
	                if (!hasStackChanged && hasImageIndexChanged) {
	                  scrollToIndex(this.element, imageIndex);
	                }

	              case 30:
	                shouldStopStartStackPrefetch = isStackPrefetchEnabled && hasStackChanged || !prevIsStackPrefetchEnabled && isStackPrefetchEnabled === true; // Need to stop/start to pickup stack changes in prefetcher

	                if (shouldStopStartStackPrefetch) {
	                  cornerstoneTools.stackPrefetch.enable(this.element);
	                } // ~~ ACTIVE TOOL


	                activeTool = this.props.activeTool;
	                prevActiveTool = prevProps.activeTool;
	                hasActiveToolChanges = activeTool !== prevActiveTool;

	                if (hasActiveToolChanges) {
	                  _trySetActiveTool(this.element, activeTool);
	                } // ~~ CINE


	                _this$props3 = this.props, frameRate = _this$props3.frameRate, isPlaying = _this$props3.isPlaying, isOverlayVisible = _this$props3.isOverlayVisible;
	                prevFrameRate = prevProps.frameRate, prevIsPlaying = prevProps.isPlaying, prevIsOverlayVisible = prevProps.isOverlayVisible;
	                validFrameRate = Math.max(frameRate, 1);
	                shouldStart = isPlaying !== prevIsPlaying && isPlaying || isPlaying && hasStackChanged;
	                shouldPause = isPlaying !== prevIsPlaying && !isPlaying;
	                hasFrameRateChanged = isPlaying && frameRate !== prevFrameRate;

	                if (shouldStart || hasFrameRateChanged) {
	                  cornerstoneTools.playClip(this.element, validFrameRate);
	                } else if (shouldPause) {
	                  cornerstoneTools.stopClip(this.element);
	                } // ~~ OVERLAY


	                if (isOverlayVisible !== prevIsOverlayVisible) updatedState.isOverlayVisible = isOverlayVisible; // ~~ STATE: Update aggregated state changes

	                if (Object.keys(updatedState).length > 0) {
	                  this.setState(updatedState);
	                }

	                this._validateExternalEventsListeners();

	              case 46:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this, [[14, 25]]);
	      }));

	      function componentDidUpdate(_x, _x2) {
	        return _componentDidUpdate.apply(this, arguments);
	      }

	      return componentDidUpdate;
	    }()
	    /**
	     * Tear down any listeners/handlers, and stop any asynchronous/queued operations
	     * that could fire after Unmount and cause errors.
	     *
	     * @memberof CornerstoneViewport
	     * @returns {undefined}
	     */

	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var clear = true;

	      this._handleOnElementEnabledEvent(clear);

	      this._bindInternalCornerstoneEventListeners(clear);

	      this._bindInternalElementEventListeners(clear);

	      this._bindExternalEventListeners('cornerstone', clear);

	      this._bindExternalEventListeners('element', clear);

	      this._setupLoadHandlers(clear);

	      if (this.props.isStackPrefetchEnabled) {
	        cornerstoneTools.stackPrefetch.disable(this.element);
	      }

	      cornerstoneTools.clearToolState(this.element, 'stackPrefetch');
	      cornerstoneTools.stopClip(this.element);
	      cornerstone.disable(this.element);
	    }
	    /**
	     * @returns Component
	     * @memberof CornerstoneViewport
	     */

	  }, {
	    key: "getLoadingIndicator",
	    value: function getLoadingIndicator() {
	      var Component = this.props.loadingIndicatorComponent;
	      var _this$state = this.state,
	          error = _this$state.error,
	          imageProgress = _this$state.imageProgress;
	      return /*#__PURE__*/React__default.createElement(Component, {
	        error: error,
	        percentComplete: imageProgress
	      });
	    }
	    /**
	     *
	     *
	     * @returns
	     * @memberof CornerstoneViewport
	     */

	  }, {
	    key: "getOverlay",
	    value: function getOverlay() {
	      var _this$props4 = this.props,
	          Component = _this$props4.viewportOverlayComponent,
	          imageIds = _this$props4.imageIds;
	      var _this$state2 = this.state,
	          imageIdIndex = _this$state2.imageIdIndex,
	          scale = _this$state2.scale,
	          windowWidth = _this$state2.windowWidth,
	          windowCenter = _this$state2.windowCenter,
	          isOverlayVisible = _this$state2.isOverlayVisible;
	      var imageId = imageIds[imageIdIndex];
	      return imageId && windowWidth && isOverlayVisible && /*#__PURE__*/React__default.createElement(Component, {
	        imageIndex: imageIdIndex + 1,
	        stackSize: imageIds.length,
	        scale: scale,
	        windowWidth: windowWidth,
	        windowCenter: windowCenter,
	        imageId: imageId
	      });
	    }
	    /**
	     *
	     *
	     * @returns
	     * @memberof CornerstoneViewport
	     */

	  }, {
	    key: "getOrientationMarkersOverlay",
	    value: function getOrientationMarkersOverlay() {
	      var imageIds = this.props.imageIds;
	      var _this$state3 = this.state,
	          imageIdIndex = _this$state3.imageIdIndex,
	          rotationDegrees = _this$state3.rotationDegrees,
	          isFlippedVertically = _this$state3.isFlippedVertically,
	          isFlippedHorizontally = _this$state3.isFlippedHorizontally;
	      var imageId = imageIds[imageIdIndex]; // Workaround for below TODO stub

	      if (!imageId) {
	        return false;
	      } // TODO: This is throwing an error with an undefined `imageId`, and it shouldn't be


	      var _ref2 = cornerstone.metaData.get('imagePlaneModule', imageId) || {},
	          rowCosines = _ref2.rowCosines,
	          columnCosines = _ref2.columnCosines;

	      if (!rowCosines || !columnCosines || rotationDegrees === undefined) {
	        return false;
	      }

	      return /*#__PURE__*/React__default.createElement(ViewportOrientationMarkers, {
	        rowCosines: rowCosines,
	        columnCosines: columnCosines,
	        rotationDegrees: rotationDegrees,
	        isFlippedVertically: isFlippedVertically,
	        isFlippedHorizontally: isFlippedHorizontally
	      });
	    }
	    /**
	     *
	     *
	     * @param {boolean} [clear=false] - True to clear event listeners
	     * @memberof CornerstoneViewport
	     * @returns {undefined}
	     */

	  }, {
	    key: "_bindInternalCornerstoneEventListeners",
	    value: function _bindInternalCornerstoneEventListeners() {
	      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var addOrRemoveEventListener = clear ? 'removeEventListener' : 'addEventListener'; // Update image load progress

	      cornerstone.events[addOrRemoveEventListener]('cornerstoneimageloadprogress', this.onImageProgress); // Update number of images loaded

	      cornerstone.events[addOrRemoveEventListener](cornerstone.EVENTS.IMAGE_LOADED, this.onImageLoaded);
	    }
	    /**
	     *
	     *
	     * @param {boolean} [clear=false] - True to clear event listeners
	     * @memberof CornerstoneViewport
	     * @returns {undefined}
	     */

	  }, {
	    key: "_bindInternalElementEventListeners",
	    value: function _bindInternalElementEventListeners() {
	      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var addOrRemoveEventListener = clear ? 'removeEventListener' : 'addEventListener'; // Updates state's imageId, and imageIndex

	      this.element[addOrRemoveEventListener](cornerstone.EVENTS.NEW_IMAGE, this.onNewImage); // Updates state's imageId, and imageIndex

	      this.element[addOrRemoveEventListener](cornerstone.EVENTS.NEW_IMAGE, this.onNewImageDebounced); // Updates state's viewport

	      this.element[addOrRemoveEventListener](cornerstone.EVENTS.IMAGE_RENDERED, this.onImageRendered); // Set Viewport Active

	      this.element[addOrRemoveEventListener](cornerstoneTools.EVENTS.MOUSE_CLICK, this.setViewportActive);
	      this.element[addOrRemoveEventListener](cornerstoneTools.EVENTS.MOUSE_DOWN, this.setViewportActive);
	      this.element[addOrRemoveEventListener](cornerstoneTools.EVENTS.TOUCH_PRESS, this.setViewportActive);
	      this.element[addOrRemoveEventListener](cornerstoneTools.EVENTS.TOUCH_START, this.setViewportActive);
	      this.element[addOrRemoveEventListener](cornerstoneTools.EVENTS.STACK_SCROLL, this.setViewportActive);
	    }
	    /**
	     * TODO: The ordering here will cause ELEMENT_ENABLED and ELEMENT_DISABLED
	     *       events to never fire. We should have explicit callbacks for these,
	     *       and warn appropriately if user attempts to use them with this prop.
	     *
	     *
	     * Listens out for all events and then defers handling to a single listener to
	     * act on them
	     *
	     * @param {string} target - "cornerstone" || "element"
	     * @param {boolean} [clear=false] - True to clear event listeners
	     * @returns {undefined}
	     */

	  }, {
	    key: "_bindExternalEventListeners",
	    value: function _bindExternalEventListeners(targetType) {
	      var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var addOrRemoveEventListener = clear ? 'removeEventListener' : 'addEventListener'; // Unique list of event names

	      var cornerstoneEvents = Object.values(cornerstone.EVENTS);
	      var cornerstoneToolsEvents = Object.values(cornerstoneTools.EVENTS);
	      var csEventNames = cornerstoneEvents.concat(cornerstoneToolsEvents);
	      var targetElementOrCornerstone = targetType === 'element' ? this.element : cornerstone.events;

	      var boundMethod = this._handleExternalEventListeners.bind(this); // Bind our single handler to every cornerstone event


	      for (var i = 0; i < csEventNames.length; i++) {
	        targetElementOrCornerstone[addOrRemoveEventListener](csEventNames[i], boundMethod);
	      }
	    }
	    /**
	     * Called to validate that events passed into the event listeners prop are valid
	     *
	     * @returns {undefined}
	     */

	  }, {
	    key: "_validateExternalEventsListeners",
	    value: function _validateExternalEventsListeners() {
	      if (!this.props.eventListeners) return;
	      var cornerstoneEvents = Object.values(cornerstone.EVENTS);
	      var cornerstoneToolsEvents = Object.values(cornerstoneTools.EVENTS);

	      for (var i = 0; i < this.props.eventListeners.length; i++) {
	        var _this$props$eventList = this.props.eventListeners[i],
	            targetType = _this$props$eventList.target,
	            eventName = _this$props$eventList.eventName,
	            handler = _this$props$eventList.handler;

	        if (!cornerstoneEvents.includes(eventName) && !cornerstoneToolsEvents.includes(eventName)) {
	          console.warn("No cornerstone or cornerstone-tools event exists for event name: ".concat(eventName));
	          continue;
	        }
	      }
	    }
	    /**
	     * Handles delegating of events from cornerstone back to the defined
	     * external events handlers
	     *
	     * @param {event}
	     * @returns {undefined}
	     */

	  }, {
	    key: "_handleExternalEventListeners",
	    value: function _handleExternalEventListeners(event) {
	      if (!this.props.eventListeners) {
	        return;
	      }

	      for (var i = 0; i < this.props.eventListeners.length; i++) {
	        var _this$props$eventList2 = this.props.eventListeners[i],
	            eventName = _this$props$eventList2.eventName,
	            handler = _this$props$eventList2.handler;

	        if (event.type === eventName) {
	          handler(event);
	        }
	      }
	    }
	    /**
	     * Convenience handler to pass the "Element Enabled" event back up to the
	     * parent via a callback. Can be used as an escape hatch for more advanced
	     * cornerstone fucntionality.
	     *
	     * @memberof CornerstoneViewport
	     * @returns {undefined}
	     */

	  }, {
	    key: "_setupLoadHandlers",
	    value:
	    /**
	     * There is a "GLOBAL/DEFAULT" load handler for start/end/error,
	     * and one that can be defined per element. We use start/end handlers in this
	     * component to show the "Loading..." indicator if a loading request is taking
	     * longer than expected.
	     *
	     * Because we're using the "per element" handler, we need to call the user's
	     * handler within our own (if it's set). Load Handlers are not well documented,
	     * but you can find [their source here]{@link https://github.com/cornerstonejs/cornerstoneTools/blob/master/src/stateManagement/loadHandlerManager.js}
	     *
	     * @param {boolean} [clear=false] - true to remove previously set load handlers
	     * @memberof CornerstoneViewport
	     * @returns {undefined}
	     */
	    function _setupLoadHandlers() {
	      var _this2 = this;

	      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (clear) {
	        loadHandlerManager.removeHandlers(this.element);
	        return;
	      } // We use this to "flip" `isLoading` to true, if our startLoading request
	      // takes longer than our "loadIndicatorDelay"


	      var startLoadHandler = function startLoadHandler(element) {
	        clearTimeout(_this2.loadHandlerTimeout); // Call user defined loadHandler

	        if (_this2.startLoadHandler) {
	          _this2.startLoadHandler(element);
	        } // We're taking too long. Indicate that we're "Loading".


	        _this2.loadHandlerTimeout = setTimeout(function () {
	          _this2.setState({
	            isLoading: true
	          });
	        }, _this2.props.loadIndicatorDelay);
	      };

	      var endLoadHandler = function endLoadHandler(element, image) {
	        clearTimeout(_this2.loadHandlerTimeout); // Call user defined loadHandler

	        if (_this2.endLoadHandler) {
	          _this2.endLoadHandler(element, image);
	        }

	        if (_this2.state.isLoading) {
	          _this2.setState({
	            isLoading: false
	          });
	        }
	      };

	      loadHandlerManager.setStartLoadHandler(startLoadHandler, this.element);
	      loadHandlerManager.setEndLoadHandler(endLoadHandler, this.element);
	    } // TODO: May need to throttle?

	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;

	      var isLoading = this.state.isLoading;
	      var displayLoadingIndicator = isLoading || this.state.error;
	      var scrollbarMax = this.props.imageIds.length - 1;
	      var scrollbarHeight = this.element ? "".concat(this.element.clientHeight - 20, "px") : '100px';
	      return /*#__PURE__*/React__default.createElement("div", {
	        style: this.props.style,
	        className: classnames('viewport-wrapper', this.props.className)
	      }, this.props.enableResizeDetector && /*#__PURE__*/React__default.createElement(ReactResizeDetector, {
	        handleWidth: true,
	        handleHeight: true,
	        skipOnMount: true,
	        refreshMode: this.props.resizeRefreshMode,
	        refreshRate: this.props.resizeRefreshRateMs,
	        onResize: this.onResize
	      }), /*#__PURE__*/React__default.createElement("div", {
	        className: "viewport-element",
	        onContextMenu: function onContextMenu(e) {
	          return e.preventDefault();
	        },
	        onMouseDown: function onMouseDown(e) {
	          return e.preventDefault();
	        },
	        ref: function ref(input) {
	          _this3.element = input;
	        }
	      }, displayLoadingIndicator && this.getLoadingIndicator(), /*#__PURE__*/React__default.createElement("canvas", {
	        className: "cornerstone-canvas"
	      }), this.getOverlay(), this.getOrientationMarkersOverlay()), /*#__PURE__*/React__default.createElement(ImageScrollbar, {
	        onInputCallback: this.imageSliderOnInputCallback,
	        max: scrollbarMax,
	        height: scrollbarHeight,
	        value: this.state.imageIdIndex
	      }), this.props.children);
	    }
	  }]);

	  return CornerstoneViewport;
	}(React.Component);
	/**
	 *
	 *
	 * @param {HTMLElement} element
	 * @param {string} activeToolName
	 * @returns
	 */


	_defineProperty(CornerstoneViewport, "propTypes", {
	  imageIds: propTypes.arrayOf(propTypes.string).isRequired,
	  imageIdIndex: propTypes.number,
	  // Controlled
	  activeTool: propTypes.string,
	  tools: propTypes.arrayOf(propTypes.oneOfType([// String
	  propTypes.string, // Object
	  propTypes.shape({
	    name: propTypes.string,
	    // Tool Name
	    toolClass: propTypes.func,
	    // Custom (ToolClass)
	    props: propTypes.Object,
	    // Props to Pass to `addTool`
	    mode: propTypes.string,
	    // Initial mode, if one other than default
	    modeOptions: propTypes.Object // { mouseButtonMask: [int] }

	  })])),
	  // Optional
	  // isActive ?? classname -> active
	  children: propTypes.node,
	  cornerstoneOptions: propTypes.object,
	  // cornerstone.enable options
	  isStackPrefetchEnabled: propTypes.bool,
	  // should prefetch?
	  // CINE
	  isPlaying: propTypes.bool,
	  frameRate: propTypes.number,
	  // Between 1 and ?
	  //
	  initialViewport: propTypes.object,
	  // Called when viewport should be set to active?
	  stageChanged: propTypes.bool,
	  setViewportActive: propTypes.func,
	  // Called when viewport should be set to active?
	  onNewImage: propTypes.func,
	  onNewImageDebounced: propTypes.func,
	  onNewImageDebounceTime: propTypes.number,
	  viewportOverlayComponent: propTypes.oneOfType([propTypes.string, propTypes.func]),
	  // Cornerstone Events
	  onElementEnabled: propTypes.func,
	  // Escape hatch
	  eventListeners: propTypes.arrayOf(propTypes.shape({
	    target: propTypes.oneOf(['element', 'cornerstone']).isRequired,
	    eventName: propTypes.string.isRequired,
	    handler: propTypes.func.isRequired
	  })),
	  startLoadHandler: propTypes.func,
	  endLoadHandler: propTypes.func,
	  loadIndicatorDelay: propTypes.number,
	  loadingIndicatorComponent: propTypes.oneOfType([propTypes.element, propTypes.func]),

	  /** false to enable automatic viewport resizing */
	  enableResizeDetector: propTypes.bool,

	  /** rate at witch to apply resize mode's logic */
	  resizeRefreshRateMs: propTypes.number,

	  /** whether resize refresh behavior is exhibited as throttle or debounce */
	  resizeRefreshMode: propTypes.oneOf(['throttle', 'debounce']),
	  //
	  style: propTypes.object,
	  className: propTypes.string,
	  isOverlayVisible: propTypes.bool
	});

	_defineProperty(CornerstoneViewport, "defaultProps", {
	  // Watch
	  imageIdIndex: 0,
	  isPlaying: false,
	  cineFrameRate: 24,
	  viewportOverlayComponent: ViewportOverlay,
	  imageIds: ['no-id://'],
	  initialViewport: {},
	  stageChanged: false,
	  // Init
	  cornerstoneOptions: {},
	  isStackPrefetchEnabled: false,
	  isOverlayVisible: true,
	  loadIndicatorDelay: 45,
	  loadingIndicatorComponent: LoadingIndicator,
	  enableResizeDetector: true,
	  resizeRefreshRateMs: 200,
	  resizeRefreshMode: 'debounce',
	  tools: [],
	  onNewImageDebounceTime: 0
	});

	function _trySetActiveTool(element, activeToolName) {
	  if (!element || !activeToolName) {
	    return;
	  }

	  var validTools = cornerstoneTools.store.state.tools.filter(function (tool) {
	    return tool.element === element;
	  });
	  var validToolNames = validTools.map(function (tool) {
	    return tool.name;
	  });

	  if (!validToolNames.includes(activeToolName)) {
	    console.warn("Trying to set a tool active that is not \"added\". Available tools include: ".concat(validToolNames.join(', ')));
	  }

	  cornerstoneTools.setToolActiveForElement(element, activeToolName, {
	    mouseButtonMask: 1
	  });
	}
	/**
	 * Iterate over the provided tools; Add each tool to the target element
	 *
	 * @param {string[]|object[]} tools
	 * @param {HTMLElement} element
	 */


	function _addAndConfigureInitialToolsForElement(tools, element) {
	  for (var i = 0; i < tools.length; i++) {
	    var tool = typeof tools[i] === 'string' ? {
	      name: tools[i]
	    } : Object.assign({}, tools[i]);
	    var toolName = "".concat(tool.name, "Tool"); // Top level CornerstoneTools follow this pattern

	    tool.toolClass = tool.toolClass || cornerstoneTools[toolName];

	    if (!tool.toolClass) {
	      console.warn("Unable to add tool with name '".concat(tool.name, "'."));
	      continue;
	    }

	    cornerstoneTools.addToolForElement(element, tool.toolClass, tool.props || {});
	    var hasInitialMode = tool.mode && AVAILABLE_TOOL_MODES.includes(tool.mode);

	    if (hasInitialMode) {
	      // TODO: We may need to check `tool.props` and the tool class's prototype
	      // to determine the name it registered with cornerstone. `tool.name` is not
	      // reliable.
	      var setToolModeFn = TOOL_MODE_FUNCTIONS[tool.mode];
	      setToolModeFn(element, tool.name, tool.modeOptions || {});
	    }
	  }
	}

	var AVAILABLE_TOOL_MODES = ['active', 'passive', 'enabled', 'disabled'];
	var TOOL_MODE_FUNCTIONS = {
	  active: cornerstoneTools.setToolActiveForElement,
	  passive: cornerstoneTools.setToolPassiveForElement,
	  enabled: cornerstoneTools.setToolEnabledForElement,
	  disabled: cornerstoneTools.setToolDisabledForElement
	};
	exports.ViewportOverlay = ViewportOverlay;
	exports.default = CornerstoneViewport;

})));
//# sourceMappingURL=index.umd.js.map
