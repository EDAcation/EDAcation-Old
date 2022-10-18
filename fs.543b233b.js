(function () {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequired8fe"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequired8fe"] = parcelRequire;
}
parcelRequire.register("6vt9n", function(module, exports) {

$parcel$export(module.exports, "assertThisInitialized", function () { return (parcelRequire("6PDVY")).default; });
$parcel$export(module.exports, "asyncIterator", function () { return (parcelRequire("lLct5")).default; });
$parcel$export(module.exports, "asyncToGenerator", function () { return (parcelRequire("gTmwS")).default; });
$parcel$export(module.exports, "classCallCheck", function () { return (parcelRequire("347Dd")).default; });
$parcel$export(module.exports, "createClass", function () { return (parcelRequire("bguNN")).default; });
$parcel$export(module.exports, "createSuper", function () { return (parcelRequire("eHKgn")).default; });
$parcel$export(module.exports, "defineProperty", function () { return (parcelRequire("gFyhy")).default; });
$parcel$export(module.exports, "get", function () { return (parcelRequire("iZhGW")).default; });
$parcel$export(module.exports, "getPrototypeOf", function () { return (parcelRequire("clec8")).default; });
$parcel$export(module.exports, "inherits", function () { return (parcelRequire("fBBi7")).default; });
$parcel$export(module.exports, "objectSpread", function () { return (parcelRequire("9v3E5")).default; });
$parcel$export(module.exports, "objectWithoutProperties", function () { return (parcelRequire("kpZXk")).default; });
$parcel$export(module.exports, "slicedToArray", function () { return (parcelRequire("Kg1DN")).default; });
$parcel$export(module.exports, "toConsumableArray", function () { return (parcelRequire("1Q8JB")).default; });
$parcel$export(module.exports, "typeOf", function () { return (parcelRequire("83MoV")).default; });
$parcel$export(module.exports, "wrapNativeSuper", function () { return (parcelRequire("kKnyI")).default; });





var $6PDVY = parcelRequire("6PDVY");



var $lLct5 = parcelRequire("lLct5");

var $gTmwS = parcelRequire("gTmwS");







var $347Dd = parcelRequire("347Dd");

















var $bguNN = parcelRequire("bguNN");

var $eHKgn = parcelRequire("eHKgn");




var $gFyhy = parcelRequire("gFyhy");


var $iZhGW = parcelRequire("iZhGW");

var $clec8 = parcelRequire("clec8");

var $fBBi7 = parcelRequire("fBBi7");
















var $9v3E5 = parcelRequire("9v3E5");


var $kpZXk = parcelRequire("kpZXk");







var $Kg1DN = parcelRequire("Kg1DN");







var $1Q8JB = parcelRequire("1Q8JB");



var $83MoV = parcelRequire("83MoV");



var $kKnyI = parcelRequire("kKnyI");


});
parcelRequire.register("6PDVY", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $4f967b8b49260b73$export$2e2bcd8739ae039; });
function $4f967b8b49260b73$export$2e2bcd8739ae039(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}

});

parcelRequire.register("lLct5", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $fd77a8b0e4ebe33a$export$2e2bcd8739ae039; });
function $fd77a8b0e4ebe33a$export$2e2bcd8739ae039(iterable) {
    var method;
    if (typeof Symbol === "function") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}

});

parcelRequire.register("gTmwS", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $c4c3424026577bc3$export$2e2bcd8739ae039; });
function $c4c3424026577bc3$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $c4c3424026577bc3$export$2e2bcd8739ae039(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $c4c3424026577bc3$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $c4c3424026577bc3$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

});

parcelRequire.register("347Dd", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $23b7aa4d824e08f4$export$2e2bcd8739ae039; });
function $23b7aa4d824e08f4$export$2e2bcd8739ae039(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

});

parcelRequire.register("bguNN", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $833915062990dfa9$export$2e2bcd8739ae039; });
function $833915062990dfa9$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $833915062990dfa9$export$2e2bcd8739ae039(Constructor, protoProps, staticProps) {
    if (protoProps) $833915062990dfa9$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $833915062990dfa9$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}

});

parcelRequire.register("eHKgn", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $ab48f7bbb03d31c4$export$2e2bcd8739ae039; });

var $uPsoW = parcelRequire("uPsoW");

var $clec8 = parcelRequire("clec8");

var $7I8c6 = parcelRequire("7I8c6");
function $ab48f7bbb03d31c4$export$2e2bcd8739ae039(Derived) {
    var hasNativeReflectConstruct = $uPsoW.default();
    return function _createSuperInternal() {
        var Super = $clec8.default(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $clec8.default(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $7I8c6.default(this, result);
    };
}

});
parcelRequire.register("uPsoW", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $05cab7c2f0fff33b$export$2e2bcd8739ae039; });
function $05cab7c2f0fff33b$export$2e2bcd8739ae039() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

});

parcelRequire.register("clec8", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $8fc274f4688cc357$export$2e2bcd8739ae039; });
function $8fc274f4688cc357$var$getPrototypeOf(o1) {
    $8fc274f4688cc357$var$getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $8fc274f4688cc357$var$getPrototypeOf(o1);
}
function $8fc274f4688cc357$export$2e2bcd8739ae039(o) {
    return $8fc274f4688cc357$var$getPrototypeOf(o);
}

});

parcelRequire.register("7I8c6", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $59d2ffacad084b35$export$2e2bcd8739ae039; });

var $6PDVY = parcelRequire("6PDVY");

var $83MoV = parcelRequire("83MoV");
function $59d2ffacad084b35$export$2e2bcd8739ae039(self, call) {
    if (call && ($83MoV.default(call) === "object" || typeof call === "function")) return call;
    return $6PDVY.default(self);
}

});
parcelRequire.register("83MoV", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $5de425fd05c83803$export$2e2bcd8739ae039; });
function $5de425fd05c83803$export$2e2bcd8739ae039(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}

});



parcelRequire.register("gFyhy", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $c22b11613519774c$export$2e2bcd8739ae039; });
function $c22b11613519774c$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

});

parcelRequire.register("iZhGW", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $dd2ba5aa2618a3b6$export$2e2bcd8739ae039; });

var $e9ppn = parcelRequire("e9ppn");
function $dd2ba5aa2618a3b6$var$get(target1, property1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.get) $dd2ba5aa2618a3b6$var$get = Reflect.get;
    else $dd2ba5aa2618a3b6$var$get = function get(target, property, receiver) {
        var base = $e9ppn.default(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver || target);
        return desc.value;
    };
    return $dd2ba5aa2618a3b6$var$get(target1, property1, receiver1);
}
function $dd2ba5aa2618a3b6$export$2e2bcd8739ae039(target, property, receiver) {
    return $dd2ba5aa2618a3b6$var$get(target, property, receiver);
}

});
parcelRequire.register("e9ppn", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $a4d59d882de08da2$export$2e2bcd8739ae039; });

var $clec8 = parcelRequire("clec8");
function $a4d59d882de08da2$export$2e2bcd8739ae039(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = $clec8.default(object);
        if (object === null) break;
    }
    return object;
}

});


parcelRequire.register("fBBi7", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $b5c73cf9ff8013ed$export$2e2bcd8739ae039; });

var $lnAcz = parcelRequire("lnAcz");
function $b5c73cf9ff8013ed$export$2e2bcd8739ae039(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $lnAcz.default(subClass, superClass);
}

});
parcelRequire.register("lnAcz", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $f907d3e39de2a7d6$export$2e2bcd8739ae039; });
function $f907d3e39de2a7d6$var$setPrototypeOf(o1, p1) {
    $f907d3e39de2a7d6$var$setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $f907d3e39de2a7d6$var$setPrototypeOf(o1, p1);
}
function $f907d3e39de2a7d6$export$2e2bcd8739ae039(o, p) {
    return $f907d3e39de2a7d6$var$setPrototypeOf(o, p);
}

});


parcelRequire.register("9v3E5", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $6ea9d6424c0286f8$export$2e2bcd8739ae039; });

var $gFyhy = parcelRequire("gFyhy");
function $6ea9d6424c0286f8$export$2e2bcd8739ae039(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            $gFyhy.default(target, key, source[key]);
        });
    }
    return target;
}

});

parcelRequire.register("kpZXk", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $edd6339f03a127f2$export$2e2bcd8739ae039; });

var $fWfym = parcelRequire("fWfym");
function $edd6339f03a127f2$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {};
    var target = $fWfym.default(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

});
parcelRequire.register("fWfym", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $b9a85655d0a3f495$export$2e2bcd8739ae039; });
function $b9a85655d0a3f495$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

});


parcelRequire.register("Kg1DN", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $08b0ba51066c9db5$export$2e2bcd8739ae039; });

var $1N4JP = parcelRequire("1N4JP");

var $jAwNj = parcelRequire("jAwNj");

var $lPmls = parcelRequire("lPmls");

var $234zt = parcelRequire("234zt");
function $08b0ba51066c9db5$export$2e2bcd8739ae039(arr, i) {
    return $1N4JP.default(arr) || $jAwNj.default(arr, i) || $234zt.default(arr, i) || $lPmls.default();
}

});
parcelRequire.register("1N4JP", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $14de0af28e3f77d6$export$2e2bcd8739ae039; });
function $14de0af28e3f77d6$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return arr;
}

});

parcelRequire.register("jAwNj", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $e42ad1683f01bbca$export$2e2bcd8739ae039; });
function $e42ad1683f01bbca$export$2e2bcd8739ae039(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

});

parcelRequire.register("lPmls", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $fe3fb1aeda91f4f3$export$2e2bcd8739ae039; });
function $fe3fb1aeda91f4f3$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

});

parcelRequire.register("234zt", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $17df6856a9111e17$export$2e2bcd8739ae039; });

var $PAxkN = parcelRequire("PAxkN");
function $17df6856a9111e17$export$2e2bcd8739ae039(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $PAxkN.default(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $PAxkN.default(o, minLen);
}

});
parcelRequire.register("PAxkN", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $09b11af3f0985fe1$export$2e2bcd8739ae039; });
function $09b11af3f0985fe1$export$2e2bcd8739ae039(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}

});



parcelRequire.register("1Q8JB", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $15716c3e9a1c3620$export$2e2bcd8739ae039; });

var $aAUlf = parcelRequire("aAUlf");

var $jAwNj = parcelRequire("jAwNj");

var $aSsnH = parcelRequire("aSsnH");

var $234zt = parcelRequire("234zt");
function $15716c3e9a1c3620$export$2e2bcd8739ae039(arr) {
    return $aAUlf.default(arr) || $jAwNj.default(arr) || $234zt.default(arr) || $aSsnH.default();
}

});
parcelRequire.register("aAUlf", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $7b68f874f49d29a7$export$2e2bcd8739ae039; });

var $PAxkN = parcelRequire("PAxkN");
function $7b68f874f49d29a7$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return $PAxkN.default(arr);
}

});

parcelRequire.register("aSsnH", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $7eb4f672844f1b99$export$2e2bcd8739ae039; });
function $7eb4f672844f1b99$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

});


parcelRequire.register("kKnyI", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $f1aa60d7b2140a12$export$2e2bcd8739ae039; });

var $tVzZk = parcelRequire("tVzZk");

var $4FG4b = parcelRequire("4FG4b");

var $clec8 = parcelRequire("clec8");

var $lnAcz = parcelRequire("lnAcz");
function $f1aa60d7b2140a12$var$wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    $f1aa60d7b2140a12$var$wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !$4FG4b.default(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return $tVzZk.default(Class, arguments, $clec8.default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return $lnAcz.default(Wrapper, Class);
    };
    return $f1aa60d7b2140a12$var$wrapNativeSuper(Class1);
}
function $f1aa60d7b2140a12$export$2e2bcd8739ae039(Class) {
    return $f1aa60d7b2140a12$var$wrapNativeSuper(Class);
}

});
parcelRequire.register("tVzZk", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $059f5fa0c6f284ff$export$2e2bcd8739ae039; });

var $lnAcz = parcelRequire("lnAcz");
function $059f5fa0c6f284ff$var$isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $059f5fa0c6f284ff$var$construct(Parent1, args1, Class1) {
    if ($059f5fa0c6f284ff$var$isNativeReflectConstruct()) $059f5fa0c6f284ff$var$construct = Reflect.construct;
    else $059f5fa0c6f284ff$var$construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) $lnAcz.default(instance, Class.prototype);
        return instance;
    };
    return $059f5fa0c6f284ff$var$construct.apply(null, arguments);
}
function $059f5fa0c6f284ff$export$2e2bcd8739ae039(Parent, args, Class) {
    return $059f5fa0c6f284ff$var$construct.apply(null, arguments);
}

});

parcelRequire.register("4FG4b", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $366b9f45248c4b49$export$2e2bcd8739ae039; });
function $366b9f45248c4b49$export$2e2bcd8739ae039(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

});



parcelRequire.register("9dvvU", function(module, exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $6b5dc5e751f62da0$var$runtime = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
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
    } catch (err1) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
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
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value1 = result.value;
                if (value1 && typeof value1 === "object" && hasOwn.call(value1, "__await")) return PromiseImpl.resolve(value1.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value1).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
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
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
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
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
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
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(object) {
        var keys = [];
        for(var key1 in object)keys.push(key1);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next1 = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next1.next = next1;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function stop() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
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
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(module.exports);
try {
    regeneratorRuntime = $6b5dc5e751f62da0$var$runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = $6b5dc5e751f62da0$var$runtime;
    else Function("r", "regeneratorRuntime = r")($6b5dc5e751f62da0$var$runtime);
}

});

parcelRequire.register("2xfx7", function(module, exports) {

$parcel$export(module.exports, "getSerialId", function () { return $914bba84f2c01919$export$768bdae9291ced9b; });
$parcel$export(module.exports, "serialize", function () { return $914bba84f2c01919$export$dfdc1655ccc5b9cb; });
$parcel$export(module.exports, "deserialize", function () { return $914bba84f2c01919$export$efcd34ab6248d3cd; });
$parcel$export(module.exports, "serializable", function () { return $914bba84f2c01919$export$c1faf8344a396331; });
$parcel$export(module.exports, "deserializeState", function () { return $914bba84f2c01919$export$7ca8667598519375; });
parcelRequire("6vt9n");
var $9v3E5 = parcelRequire("9v3E5");
var $Kg1DN = parcelRequire("Kg1DN");
var $kpZXk = parcelRequire("kpZXk");
var $914bba84f2c01919$export$768bdae9291ced9b = Symbol('getSerialId');
var $914bba84f2c01919$export$dfdc1655ccc5b9cb = Symbol('serialize');
var $914bba84f2c01919$export$efcd34ab6248d3cd = Symbol('deserialize');
var $914bba84f2c01919$var$serializables = {};
var $914bba84f2c01919$export$c1faf8344a396331 = function(identifier) {
    return function(target) {
        $914bba84f2c01919$var$serializables[identifier] = target;
    };
};
var $914bba84f2c01919$export$fe8d49dd66e9fe47 = function(object) {
    return typeof object[$914bba84f2c01919$export$dfdc1655ccc5b9cb] === 'function';
};
var $914bba84f2c01919$export$8414966dbdbfc8a3 = function(state) {
    if (Array.isArray(state)) return state.map(function(value) {
        return $914bba84f2c01919$export$8414966dbdbfc8a3(value);
    });
    else if (typeof state === 'object' && state !== null) {
        if ($914bba84f2c01919$export$fe8d49dd66e9fe47(state)) return $9v3E5.default({
            __serialId__: state[$914bba84f2c01919$export$768bdae9291ced9b]()
        }, state[$914bba84f2c01919$export$dfdc1655ccc5b9cb]());
        else {
            var data = {};
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.entries(state)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _value = $Kg1DN.default(_step.value, 2), key = _value[0], value1 = _value[1];
                    data[key] = $914bba84f2c01919$export$8414966dbdbfc8a3(value1);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return data;
        }
    } else return state;
};
var $914bba84f2c01919$export$7ca8667598519375 = function(data, partialState) {
    if (Array.isArray(data)) return data.map(function(value) {
        return $914bba84f2c01919$export$7ca8667598519375(value, partialState);
    });
    else if (typeof data === 'object' && data !== null) {
        if (typeof data.__serialId__ === 'string') {
            var id = data.__serialId__, serialized = $kpZXk.default(data, [
                "__serialId__"
            ]);
            var SerializableClass = $914bba84f2c01919$var$serializables[id];
            if (!SerializableClass) console.warn('Unknown seriazable ID "'.concat(id, '".'));
            var state = new SerializableClass();
            state[$914bba84f2c01919$export$efcd34ab6248d3cd](serialized, partialState);
            return state;
        } else {
            var state1 = {};
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.entries(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _value = $Kg1DN.default(_step.value, 2), key = _value[0], value2 = _value[1];
                    state1[key] = $914bba84f2c01919$export$7ca8667598519375(value2, partialState);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return state1;
        }
    } else return data;
};

});

parcelRequire.register("1Nhm1", function(module, exports) {
$parcel$export(module.exports, "StorageType", function () { return (parcelRequire("EstAn")).StorageType; });
$parcel$export(module.exports, "StorageFSA", function () { return (parcelRequire("7rfxJ")).StorageFSA; });
$parcel$export(module.exports, "StorageDirectory", function () { return (parcelRequire("9from")).StorageDirectory; });
$parcel$export(module.exports, "StorageFile", function () { return (parcelRequire("9from")).StorageFile; });
parcelRequire("6vt9n");
var $gFyhy = parcelRequire("gFyhy");

var $EstAn = parcelRequire("EstAn");

var $7rfxJ = parcelRequire("7rfxJ");
parcelRequire("9from");

var $EstAn = parcelRequire("EstAn");

var $7rfxJ = parcelRequire("7rfxJ");
var $5f10686625c465f0$export$ffbf50e09d99dcf1 = $gFyhy.default({}, $EstAn.StorageType.FILE_SYSTEM_ACCESS, $7rfxJ.StorageFSA);

});
parcelRequire.register("EstAn", function(module, exports) {

$parcel$export(module.exports, "StorageType", function () { return $70ca3b575a653bf1$export$d5f3ec63cad061d9; });
var $70ca3b575a653bf1$export$d5f3ec63cad061d9;
(function($70ca3b575a653bf1$export$d5f3ec63cad061d9) {
    $70ca3b575a653bf1$export$d5f3ec63cad061d9["FILE_SYSTEM_ACCESS"] = "FILE_SYSTEM_ACCESS";
})($70ca3b575a653bf1$export$d5f3ec63cad061d9 || ($70ca3b575a653bf1$export$d5f3ec63cad061d9 = {}));

});

parcelRequire.register("7rfxJ", function(module, exports) {

$parcel$export(module.exports, "StorageFSA", function () { return $9d72711aa666cc1d$export$e27fb04f1d186cc2; });
parcelRequire("6vt9n");
var $fBBi7 = parcelRequire("fBBi7");
var $eHKgn = parcelRequire("eHKgn");
var $347Dd = parcelRequire("347Dd");
var $bguNN = parcelRequire("bguNN");
var $gTmwS = parcelRequire("gTmwS");
var $lLct5 = parcelRequire("lLct5");
var $9v3E5 = parcelRequire("9v3E5");
var $iZhGW = parcelRequire("iZhGW");
var $clec8 = parcelRequire("clec8");
var $kKnyI = parcelRequire("kKnyI");
var $gFyhy = parcelRequire("gFyhy");

var $9dvvU = parcelRequire("9dvvU");

var $2xfx7 = parcelRequire("2xfx7");

var $9from = parcelRequire("9from");

var $EstAn = parcelRequire("EstAn");
var _getSerialId, _serialize, _deserialize;
var _StorageFSA;
var _class;
var $9d72711aa666cc1d$export$55792b1bf8a712b1 = /*#__PURE__*/ function(StorageDirectory) {
    "use strict";
    $fBBi7.default($9d72711aa666cc1d$export$55792b1bf8a712b1, StorageDirectory);
    var _super = $eHKgn.default($9d72711aa666cc1d$export$55792b1bf8a712b1);
    function $9d72711aa666cc1d$export$55792b1bf8a712b1(storage, parent, handle) {
        $347Dd.default(this, $9d72711aa666cc1d$export$55792b1bf8a712b1);
        return _super.call(this, storage, parent, handle);
    }
    $bguNN.default($9d72711aa666cc1d$export$55792b1bf8a712b1, [
        {
            key: "getName",
            value: function getName() {
                return this.handle.name;
            }
        },
        {
            key: "getEntries",
            value: function getEntries(force) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var entries, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, handle;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                if (!(!force && _this._entries)) {
                                    _ctx.next = 2;
                                    break;
                                }
                                return _ctx.abrupt("return", _this._entries);
                            case 2:
                                entries = [];
                                _iteratorAbruptCompletion = false, _didIteratorError = false;
                                _ctx.prev = 4;
                                _iterator = $lLct5.default(_this.handle.values());
                            case 6:
                                _ctx.next = 8;
                                return _iterator.next();
                            case 8:
                                if (!(_iteratorAbruptCompletion = !(_step = _ctx.sent).done)) {
                                    _ctx.next = 13;
                                    break;
                                }
                                {
                                    _value = _step.value;
                                    handle = _value;
                                    if (handle.kind === 'directory') entries.push(new $9d72711aa666cc1d$export$55792b1bf8a712b1(_this.storage, _this, handle));
                                    else entries.push(new $9d72711aa666cc1d$export$8281baebfbd31da5(_this.storage, _this, handle));
                                }
                            case 10:
                                _iteratorAbruptCompletion = false;
                                _ctx.next = 6;
                                break;
                            case 13:
                                _ctx.next = 19;
                                break;
                            case 15:
                                _ctx.prev = 15;
                                _ctx.t0 = _ctx["catch"](4);
                                _didIteratorError = true;
                                _iteratorError = _ctx.t0;
                            case 19:
                                _ctx.prev = 19;
                                _ctx.prev = 20;
                                if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                                    _ctx.next = 24;
                                    break;
                                }
                                _ctx.next = 24;
                                return _iteratorError.return();
                            case 24:
                                _ctx.prev = 24;
                                if (!_didIteratorError) {
                                    _ctx.next = 27;
                                    break;
                                }
                                throw _iteratorError;
                            case 27:
                                return _ctx.finish(24);
                            case 28:
                                return _ctx.finish(19);
                            case 29:
                                _this._entries = entries;
                                return _ctx.abrupt("return", entries);
                            case 31:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, null, [
                        [
                            4,
                            15,
                            19,
                            29
                        ],
                        [
                            20,
                            ,
                            24,
                            28
                        ]
                    ]);
                }))();
            }
        },
        {
            key: "getEntry",
            value: function getEntry(name, force) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var entries;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.getEntries(force);
                            case 2:
                                entries = _ctx.sent;
                                return _ctx.abrupt("return", entries.find(function(entry) {
                                    return entry.getName() === name;
                                }));
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "createDirectory",
            value: function createDirectory(name) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var handle;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.getDirectoryHandle(name, {
                                    create: true
                                });
                            case 2:
                                handle = _ctx.sent;
                                return _ctx.abrupt("return", new $9d72711aa666cc1d$export$55792b1bf8a712b1(_this.storage, _this, handle));
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "createFile",
            value: function createFile(name) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var handle;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.getFileHandle(name, {
                                    create: true
                                });
                            case 2:
                                handle = _ctx.sent;
                                return _ctx.abrupt("return", new $9d72711aa666cc1d$export$8281baebfbd31da5(_this.storage, _this, handle));
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "getSize",
            value: function getSize() {
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", 4096);
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "delete",
            value: function _delete(recursive) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                if (_this.parent) {
                                    _ctx.next = 2;
                                    break;
                                }
                                throw new $9from.StorageError('Can\'t delete root directory.');
                            case 2:
                                _ctx.next = 4;
                                return _this.parent.getHandle().removeEntry(_this.handle.name, {
                                    recursive: recursive
                                });
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return $9d72711aa666cc1d$export$55792b1bf8a712b1;
}($9from.StorageDirectory);
var $9d72711aa666cc1d$export$8281baebfbd31da5 = /*#__PURE__*/ function(StorageFile) {
    "use strict";
    $fBBi7.default($9d72711aa666cc1d$export$8281baebfbd31da5, StorageFile);
    var _super = $eHKgn.default($9d72711aa666cc1d$export$8281baebfbd31da5);
    function $9d72711aa666cc1d$export$8281baebfbd31da5(storage, parent, handle) {
        $347Dd.default(this, $9d72711aa666cc1d$export$8281baebfbd31da5);
        return _super.call(this, storage, parent, handle);
    }
    $bguNN.default($9d72711aa666cc1d$export$8281baebfbd31da5, [
        {
            key: "getName",
            value: function getName() {
                return this.handle.name;
            }
        },
        {
            key: "getSize",
            value: function getSize() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var file;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.getFile();
                            case 2:
                                file = _ctx.sent;
                                return _ctx.abrupt("return", file.size);
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "read",
            value: function read(start, end) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var file;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.getFile();
                            case 2:
                                file = _ctx.sent;
                                _ctx.next = 5;
                                return file.slice(start, end).arrayBuffer();
                            case 5:
                                return _ctx.abrupt("return", _ctx.sent);
                            case 6:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "readText",
            value: function readText(start, end) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var file;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.getFile();
                            case 2:
                                file = _ctx.sent;
                                _ctx.next = 5;
                                return file.slice(start, end).text();
                            case 5:
                                return _ctx.abrupt("return", _ctx.sent);
                            case 6:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "truncate",
            value: function truncate(size) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var writable;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.createWritable();
                            case 2:
                                writable = _ctx.sent;
                                _ctx.next = 5;
                                return writable.truncate(size);
                            case 5:
                                _ctx.next = 7;
                                return writable.close();
                            case 7:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "write",
            value: function write(buffer, start, end) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var writable;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.createWritable();
                            case 2:
                                writable = _ctx.sent;
                                if (start) {
                                    writable.seek(start);
                                    if (end) buffer = buffer.slice(0, end - start);
                                }
                                _ctx.next = 6;
                                return writable.write(buffer);
                            case 6:
                                _ctx.next = 8;
                                return writable.close();
                            case 8:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "writeText",
            value: function writeText(content, start) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var writable;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.handle.createWritable();
                            case 2:
                                writable = _ctx.sent;
                                if (start) writable.seek(start);
                                _ctx.next = 6;
                                return writable.write(content);
                            case 6:
                                _ctx.next = 8;
                                return writable.close();
                            case 8:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "delete",
            value: function _delete() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.parent.getHandle().removeEntry(_this.handle.name);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return $9d72711aa666cc1d$export$8281baebfbd31da5;
}($9from.StorageFile);
var $9d72711aa666cc1d$var$SERIAL_ID = 'StorageFSA';
var _dec = $2xfx7.serializable($9d72711aa666cc1d$var$SERIAL_ID);
var $9d72711aa666cc1d$export$e27fb04f1d186cc2 = _class = _dec(_class = (_getSerialId = $2xfx7.getSerialId, _serialize = $2xfx7.serialize, _deserialize = $2xfx7.deserialize, _StorageFSA = /*#__PURE__*/ function(Storage) {
    "use strict";
    $fBBi7.default($9d72711aa666cc1d$export$e27fb04f1d186cc2, Storage);
    var _super = $eHKgn.default($9d72711aa666cc1d$export$e27fb04f1d186cc2);
    function $9d72711aa666cc1d$export$e27fb04f1d186cc2() {
        $347Dd.default(this, $9d72711aa666cc1d$export$e27fb04f1d186cc2);
        return _super.apply(this, arguments);
    }
    $bguNN.default($9d72711aa666cc1d$export$e27fb04f1d186cc2, [
        {
            key: _getSerialId,
            value: function value() {
                return $9d72711aa666cc1d$var$SERIAL_ID;
            }
        },
        {
            key: _serialize,
            value: function value() {
                return $9v3E5.default({}, $iZhGW.default($clec8.default($9d72711aa666cc1d$export$e27fb04f1d186cc2.prototype), $2xfx7.serialize, this).call(this), {
                    handle: this.root.getHandle()
                });
            }
        },
        {
            key: _deserialize,
            value: function value(data) {
                $iZhGW.default($clec8.default($9d72711aa666cc1d$export$e27fb04f1d186cc2.prototype), $2xfx7.deserialize, this).call(this, data);
                this.root = new $9d72711aa666cc1d$export$55792b1bf8a712b1(this, null, data.handle);
            }
        },
        {
            key: "getRoot",
            value: function getRoot() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", _this.root);
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "hasPermission",
            value: function hasPermission() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.root.getHandle().queryPermission($9d72711aa666cc1d$export$e27fb04f1d186cc2.PERMISSION_OPTIONS);
                            case 2:
                                _ctx.t0 = _ctx.sent;
                                return _ctx.abrupt("return", _ctx.t0 === 'granted');
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "requestPermission",
            value: function requestPermission() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.root.getHandle().requestPermission($9d72711aa666cc1d$export$e27fb04f1d186cc2.PERMISSION_OPTIONS);
                            case 2:
                                _ctx.t0 = _ctx.sent;
                                return _ctx.abrupt("return", _ctx.t0 === 'granted');
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "add",
            value: function add() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.t0 = $9d72711aa666cc1d$export$55792b1bf8a712b1;
                                _ctx.t1 = _this;
                                _ctx.next = 4;
                                return window.showDirectoryPicker();
                            case 4:
                                _ctx.t2 = _ctx.sent;
                                _this.root = new _ctx.t0(_ctx.t1, null, _ctx.t2);
                                _ctx.next = 8;
                                return _this.hasPermission();
                            case 8:
                                if (_ctx.sent) {
                                    _ctx.next = 11;
                                    break;
                                }
                                _ctx.next = 11;
                                return _this.requestPermission();
                            case 11:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ], [
        {
            key: "getType",
            value: function getType() {
                return $EstAn.StorageType.FILE_SYSTEM_ACCESS;
            }
        },
        {
            key: "getName",
            value: function getName() {
                return 'File System Access';
            }
        },
        {
            key: "getAddText",
            value: function getAddText() {
                return 'Open local directory';
            }
        }
    ]);
    return $9d72711aa666cc1d$export$e27fb04f1d186cc2;
}($kKnyI.default($9from.Storage)), $gFyhy.default(_StorageFSA, "PERMISSION_OPTIONS", {
    mode: 'readwrite'
}), _StorageFSA)) || _class;

});
parcelRequire.register("9from", function(module, exports) {

$parcel$export(module.exports, "StorageError", function () { return $bf020c4ba4602f5e$export$697502632950e9d3; });
$parcel$export(module.exports, "StorageDirectory", function () { return $bf020c4ba4602f5e$export$d6925643f2f9f008; });
$parcel$export(module.exports, "Storage", function () { return $bf020c4ba4602f5e$export$bf2a15d34f3c441c; });
$parcel$export(module.exports, "StorageFile", function () { return $bf020c4ba4602f5e$export$5b52ad4b875197ac; });
parcelRequire("6vt9n");
var $fBBi7 = parcelRequire("fBBi7");
var $eHKgn = parcelRequire("eHKgn");
var $347Dd = parcelRequire("347Dd");
var $kKnyI = parcelRequire("kKnyI");
var $bguNN = parcelRequire("bguNN");
var $1Q8JB = parcelRequire("1Q8JB");
var $gTmwS = parcelRequire("gTmwS");

var $9dvvU = parcelRequire("9dvvU");

var $h2c7q = parcelRequire("h2c7q");

var $2xfx7 = parcelRequire("2xfx7");
var $bf020c4ba4602f5e$export$697502632950e9d3 = /*#__PURE__*/ function(Error) {
    "use strict";
    $fBBi7.default($bf020c4ba4602f5e$export$697502632950e9d3, Error);
    var _super = $eHKgn.default($bf020c4ba4602f5e$export$697502632950e9d3);
    function $bf020c4ba4602f5e$export$697502632950e9d3() {
        $347Dd.default(this, $bf020c4ba4602f5e$export$697502632950e9d3);
        return _super.apply(this, arguments);
    }
    return $bf020c4ba4602f5e$export$697502632950e9d3;
}($kKnyI.default(Error));
var $bf020c4ba4602f5e$export$e741e9ec924242dd;
(function($bf020c4ba4602f5e$export$e741e9ec924242dd) {
    $bf020c4ba4602f5e$export$e741e9ec924242dd["DIRECTORY"] = "DIRECTORY";
    $bf020c4ba4602f5e$export$e741e9ec924242dd["FILE"] = "FILE";
})($bf020c4ba4602f5e$export$e741e9ec924242dd || ($bf020c4ba4602f5e$export$e741e9ec924242dd = {}));
var $bf020c4ba4602f5e$export$1e78234312a5cf64 = /*#__PURE__*/ function() {
    "use strict";
    function $bf020c4ba4602f5e$export$1e78234312a5cf64(storage, parent, handle, type) {
        $347Dd.default(this, $bf020c4ba4602f5e$export$1e78234312a5cf64);
        this.storage = storage;
        this.parent = parent;
        this.handle = handle;
        this.type = type;
    }
    $bguNN.default($bf020c4ba4602f5e$export$1e78234312a5cf64, [
        {
            key: "getStorage",
            value: function getStorage() {
                return this.storage;
            }
        },
        {
            key: "getParent",
            value: function getParent() {
                return this.parent;
            }
        },
        {
            key: "getHandle",
            value: function getHandle() {
                return this.handle;
            }
        },
        {
            key: "getType",
            value: function getType() {
                return this.type;
            }
        },
        {
            key: "getNameWithoutExtension",
            value: function getNameWithoutExtension() {
                var name = this.getName();
                return name.includes('.') ? name.substring(0, name.indexOf('.')) : name;
            }
        },
        {
            key: "getExtension",
            value: function getExtension() {
                var name = this.getName();
                return name.includes('.') ? name.substring(name.indexOf('.') + 1, name.length) : '';
            }
        },
        {
            key: "getPath",
            value: function getPath() {
                if (!this.parent) return [];
                return this.parent.getParent() ? $1Q8JB.default(this.parent.getPath()).concat([
                    this.getName()
                ]) : [
                    this.getName()
                ];
            }
        },
        {
            key: "getFullPath",
            value: function getFullPath() {
                return [
                    this.getStorage().getID()
                ].concat(this.getPath()).join('/');
            }
        }
    ]);
    return $bf020c4ba4602f5e$export$1e78234312a5cf64;
}();
var $bf020c4ba4602f5e$export$d6925643f2f9f008 = /*#__PURE__*/ function($bf020c4ba4602f5e$export$1e78234312a5cf64) {
    "use strict";
    $fBBi7.default($bf020c4ba4602f5e$export$d6925643f2f9f008, $bf020c4ba4602f5e$export$1e78234312a5cf64);
    var _super = $eHKgn.default($bf020c4ba4602f5e$export$d6925643f2f9f008);
    function $bf020c4ba4602f5e$export$d6925643f2f9f008(storage, parent, handle) {
        $347Dd.default(this, $bf020c4ba4602f5e$export$d6925643f2f9f008);
        return _super.call(this, storage, parent, handle, $bf020c4ba4602f5e$export$e741e9ec924242dd.DIRECTORY);
    }
    $bguNN.default($bf020c4ba4602f5e$export$d6925643f2f9f008, [
        {
            key: "getHandle",
            value: function getHandle() {
                return this.handle;
            }
        },
        {
            key: "getEntryByPath",
            value: function getEntryByPath(path, force) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", $bf020c4ba4602f5e$export$bf2a15d34f3c441c.getEntryByPath(_this, path, force));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "print",
            value: function print() {
                var indent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                console.log("".concat(indent).concat(_this.getName(), " (").concat(_this.getType().substring(0, 1), ")"));
                                indent += '|  ';
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                _ctx.prev = 3;
                                _ctx.next = 6;
                                return _this.getEntries();
                            case 6:
                                _ctx.t0 = Symbol.iterator;
                                _iterator = _ctx.sent[_ctx.t0]();
                            case 8:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _ctx.next = 19;
                                    break;
                                }
                                entry = _step.value;
                                if (!(entry instanceof $bf020c4ba4602f5e$export$d6925643f2f9f008)) {
                                    _ctx.next = 15;
                                    break;
                                }
                                _ctx.next = 13;
                                return entry.print(indent);
                            case 13:
                                _ctx.next = 16;
                                break;
                            case 15:
                                console.log("".concat(indent).concat(entry.getName(), " (").concat(entry.getType().substring(0, 1), ")"));
                            case 16:
                                _iteratorNormalCompletion = true;
                                _ctx.next = 8;
                                break;
                            case 19:
                                _ctx.next = 25;
                                break;
                            case 21:
                                _ctx.prev = 21;
                                _ctx.t1 = _ctx["catch"](3);
                                _didIteratorError = true;
                                _iteratorError = _ctx.t1;
                            case 25:
                                _ctx.prev = 25;
                                _ctx.prev = 26;
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            case 28:
                                _ctx.prev = 28;
                                if (!_didIteratorError) {
                                    _ctx.next = 31;
                                    break;
                                }
                                throw _iteratorError;
                            case 31:
                                return _ctx.finish(28);
                            case 32:
                                return _ctx.finish(25);
                            case 33:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, null, [
                        [
                            3,
                            21,
                            25,
                            33
                        ],
                        [
                            26,
                            ,
                            28,
                            32
                        ]
                    ]);
                }))();
            }
        }
    ]);
    return $bf020c4ba4602f5e$export$d6925643f2f9f008;
}($bf020c4ba4602f5e$export$1e78234312a5cf64);
var $bf020c4ba4602f5e$export$5b52ad4b875197ac = /*#__PURE__*/ function($bf020c4ba4602f5e$export$1e78234312a5cf64) {
    "use strict";
    $fBBi7.default($bf020c4ba4602f5e$export$5b52ad4b875197ac, $bf020c4ba4602f5e$export$1e78234312a5cf64);
    var _super = $eHKgn.default($bf020c4ba4602f5e$export$5b52ad4b875197ac);
    function $bf020c4ba4602f5e$export$5b52ad4b875197ac(storage, parent, handle) {
        $347Dd.default(this, $bf020c4ba4602f5e$export$5b52ad4b875197ac);
        return _super.call(this, storage, parent, handle, $bf020c4ba4602f5e$export$e741e9ec924242dd.FILE);
    }
    $bguNN.default($bf020c4ba4602f5e$export$5b52ad4b875197ac, [
        {
            key: "getParent",
            value: function getParent() {
                return this.parent;
            }
        },
        {
            key: "getHandle",
            value: function getHandle() {
                return this.handle;
            }
        },
        {
            key: "readJSON",
            value: function readJSON() {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.t0 = JSON;
                                _ctx.next = 3;
                                return _this.readText();
                            case 3:
                                _ctx.t1 = _ctx.sent;
                                return _ctx.abrupt("return", _ctx.t0.parse.call(_ctx.t0, _ctx.t1));
                            case 5:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "writeJSON",
            value: function writeJSON(content) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.writeText(JSON.stringify(content));
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return $bf020c4ba4602f5e$export$5b52ad4b875197ac;
}($bf020c4ba4602f5e$export$1e78234312a5cf64);
var _serialize = $2xfx7.serialize, _deserialize = $2xfx7.deserialize;
var $bf020c4ba4602f5e$export$bf2a15d34f3c441c = /*#__PURE__*/ function() {
    "use strict";
    function $bf020c4ba4602f5e$export$bf2a15d34f3c441c(id) {
        $347Dd.default(this, $bf020c4ba4602f5e$export$bf2a15d34f3c441c);
        this.id = id || $h2c7q.default();
    }
    $bguNN.default($bf020c4ba4602f5e$export$bf2a15d34f3c441c, [
        {
            key: "getID",
            value: function getID() {
                return this.id;
            }
        },
        {
            key: "getType",
            value: function getType() {
                return this.constructor.getType();
            }
        },
        {
            key: "getName",
            value: function getName() {
                return this.constructor.getName();
            }
        },
        {
            key: _serialize,
            value: function value() {
                // @ts-expect-error: Technically a subclass could not override this method, which could cause type incompatibilities in the child,
                //                   but this should not happen in practice.
                return {
                    id: this.getID()
                };
            }
        },
        {
            key: _deserialize,
            value: function value(data) {
                this.id = data.id;
            }
        },
        {
            key: "getEntry",
            value: function getEntry(path) {
                var _this = this;
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.t0 = $bf020c4ba4602f5e$export$bf2a15d34f3c441c;
                                _ctx.next = 3;
                                return _this.getRoot();
                            case 3:
                                _ctx.t1 = _ctx.sent;
                                _ctx.t2 = path;
                                _ctx.next = 7;
                                return _ctx.t0.getEntryByPath.call(_ctx.t0, _ctx.t1, _ctx.t2);
                            case 7:
                                return _ctx.abrupt("return", _ctx.sent);
                            case 8:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ], [
        {
            key: "getType",
            value: function getType() {
                throw new Error('Not implemented.');
            }
        },
        {
            key: "getName",
            value: function getName() {
                return this.name.replace('Storage', '');
            }
        },
        {
            key: "getAddText",
            value: function getAddText() {
                return "Add ".concat(this.getName(), " storage");
            }
        },
        {
            key: "getEntryByPath",
            value: function getEntryByPath(directory, path, force) {
                return $gTmwS.default((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee() {
                    var current, i, entry;
                    return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                current = directory;
                                i = 0;
                            case 2:
                                if (!(i < path.length)) {
                                    _ctx.next = 17;
                                    break;
                                }
                                _ctx.next = 5;
                                return current.getEntry(path[i], force);
                            case 5:
                                entry = _ctx.sent;
                                if (entry) {
                                    _ctx.next = 8;
                                    break;
                                }
                                return _ctx.abrupt("return", undefined);
                            case 8:
                                if (!(i < path.length - 1)) {
                                    _ctx.next = 13;
                                    break;
                                }
                                if (entry instanceof $bf020c4ba4602f5e$export$d6925643f2f9f008) {
                                    _ctx.next = 11;
                                    break;
                                }
                                throw new $bf020c4ba4602f5e$export$697502632950e9d3('Entry "'.concat(path[i], '" in path "').concat(path.join('/'), '" is not a directory.'));
                            case 11:
                                current = entry;
                                return _ctx.abrupt("continue", 14);
                            case 13:
                                return _ctx.abrupt("return", entry);
                            case 14:
                                i++;
                                _ctx.next = 2;
                                break;
                            case 17:
                                return _ctx.abrupt("return", current);
                            case 18:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return $bf020c4ba4602f5e$export$bf2a15d34f3c441c;
}();

});
parcelRequire.register("h2c7q", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $c66c0618bbd40ef5$export$2e2bcd8739ae039; });

var $erPYR = parcelRequire("erPYR");

var $7kxg4 = parcelRequire("7kxg4");
function $c66c0618bbd40ef5$var$v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || $erPYR.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return $7kxg4.default(rnds);
}
var $c66c0618bbd40ef5$export$2e2bcd8739ae039 = $c66c0618bbd40ef5$var$v4;

});
parcelRequire.register("erPYR", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $a84be89732fe9e59$export$2e2bcd8739ae039; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var $a84be89732fe9e59$var$getRandomValues;
var $a84be89732fe9e59$var$rnds8 = new Uint8Array(16);
function $a84be89732fe9e59$export$2e2bcd8739ae039() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!$a84be89732fe9e59$var$getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        $a84be89732fe9e59$var$getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!$a84be89732fe9e59$var$getRandomValues) throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
    return $a84be89732fe9e59$var$getRandomValues($a84be89732fe9e59$var$rnds8);
}

});

parcelRequire.register("7kxg4", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $5564330eb0eab583$export$2e2bcd8739ae039; });

var $dufL0 = parcelRequire("dufL0");
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var $5564330eb0eab583$var$byteToHex = [];
for(var $5564330eb0eab583$var$i = 0; $5564330eb0eab583$var$i < 256; ++$5564330eb0eab583$var$i)$5564330eb0eab583$var$byteToHex.push(($5564330eb0eab583$var$i + 0x100).toString(16).substr(1));
function $5564330eb0eab583$var$stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = ($5564330eb0eab583$var$byteToHex[arr[offset + 0]] + $5564330eb0eab583$var$byteToHex[arr[offset + 1]] + $5564330eb0eab583$var$byteToHex[arr[offset + 2]] + $5564330eb0eab583$var$byteToHex[arr[offset + 3]] + '-' + $5564330eb0eab583$var$byteToHex[arr[offset + 4]] + $5564330eb0eab583$var$byteToHex[arr[offset + 5]] + '-' + $5564330eb0eab583$var$byteToHex[arr[offset + 6]] + $5564330eb0eab583$var$byteToHex[arr[offset + 7]] + '-' + $5564330eb0eab583$var$byteToHex[arr[offset + 8]] + $5564330eb0eab583$var$byteToHex[arr[offset + 9]] + '-' + $5564330eb0eab583$var$byteToHex[arr[offset + 10]] + $5564330eb0eab583$var$byteToHex[arr[offset + 11]] + $5564330eb0eab583$var$byteToHex[arr[offset + 12]] + $5564330eb0eab583$var$byteToHex[arr[offset + 13]] + $5564330eb0eab583$var$byteToHex[arr[offset + 14]] + $5564330eb0eab583$var$byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!$dufL0.default(uuid)) throw TypeError('Stringified UUID is invalid');
    return uuid;
}
var $5564330eb0eab583$export$2e2bcd8739ae039 = $5564330eb0eab583$var$stringify;

});
parcelRequire.register("dufL0", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $9d1a4cbb11e6d981$export$2e2bcd8739ae039; });

var $kKYHT = parcelRequire("kKYHT");
function $9d1a4cbb11e6d981$var$validate(uuid) {
    return typeof uuid === 'string' && $kKYHT.default.test(uuid);
}
var $9d1a4cbb11e6d981$export$2e2bcd8739ae039 = $9d1a4cbb11e6d981$var$validate;

});
parcelRequire.register("kKYHT", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $f1c731af45026d6b$export$2e2bcd8739ae039; });
var $f1c731af45026d6b$export$2e2bcd8739ae039 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

});








parcelRequire.register("1IjS8", function(module, exports) {

$parcel$export(module.exports, "debug", function () { return $6a8c19656f9b3ec4$export$1c9f709888824e05; });
$parcel$export(module.exports, "addDebugLogging", function () { return $6a8c19656f9b3ec4$export$b0b02e1603632d7; });
parcelRequire("6vt9n");
var $1Q8JB = parcelRequire("1Q8JB");
var $Kg1DN = parcelRequire("Kg1DN");
var $6a8c19656f9b3ec4$var$DEBUG_NAMESPACES = {
    fs: true
};
var $6a8c19656f9b3ec4$export$1c9f709888824e05 = function(namespace) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    var _console;
    if ($6a8c19656f9b3ec4$var$DEBUG_NAMESPACES[namespace]) (_console = console).debug.apply(_console, $1Q8JB.default(args));
};
var $6a8c19656f9b3ec4$export$b0b02e1603632d7 = function(namespace, name, obj) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function(_iterator, _step) {
            var _value = $Kg1DN.default(_step.value, 2), key = _value[0], value = _value[1];
            if (typeof value === 'function') obj[key] = function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                $6a8c19656f9b3ec4$export$1c9f709888824e05.apply(void 0, [
                    namespace,
                    "[".concat(name, ".").concat(key, " args]")
                ].concat($1Q8JB.default(args)));
                try {
                    var result = value.apply(void 0, $1Q8JB.default(args));
                    $6a8c19656f9b3ec4$export$1c9f709888824e05(namespace, "[".concat(name, ".").concat(key, " result]"), result);
                    return result;
                } catch (err) {
                    $6a8c19656f9b3ec4$export$1c9f709888824e05(namespace, "[".concat(name, ".").concat(key, " error]"), err);
                    throw err;
                }
            };
            else if (typeof value === 'object' && value) obj[key] = $6a8c19656f9b3ec4$export$b0b02e1603632d7(namespace, name, value);
        };
        for(var _iterator = Object.entries(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop(_iterator, _step);
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return obj;
};

});

parcelRequire.register("aghNo", function(module, exports) {

$parcel$export(module.exports, "BLOCK_SIZE", function () { return $110f2aec7afa7c04$export$b2e3d6d444266a5c; });
$parcel$export(module.exports, "INDEX_FS_LOCK", function () { return $110f2aec7afa7c04$export$184b6c1a2519928d; });
$parcel$export(module.exports, "INDEX_WORKER_LOCK", function () { return $110f2aec7afa7c04$export$38bceeeabd1235c5; });
$parcel$export(module.exports, "INDEX_WORKER_NOTIFY", function () { return $110f2aec7afa7c04$export$35bd0991cab0563e; });
$parcel$export(module.exports, "INDEX_DATA", function () { return $110f2aec7afa7c04$export$cc08ca8bb9c1d12a; });
var $110f2aec7afa7c04$export$b2e3d6d444266a5c = 16384;
var $110f2aec7afa7c04$export$184b6c1a2519928d = 0;
var $110f2aec7afa7c04$export$38bceeeabd1235c5 = 1;
var $110f2aec7afa7c04$export$35bd0991cab0563e = 2;
var $110f2aec7afa7c04$export$cc08ca8bb9c1d12a = 3;
var $110f2aec7afa7c04$export$191ce3c85debeef1 = ($110f2aec7afa7c04$export$cc08ca8bb9c1d12a + 1) * 4 + $110f2aec7afa7c04$export$b2e3d6d444266a5c;

});

parcelRequire.register("hq89M", function(module, exports) {

$parcel$export(module.exports, "Data", function () { return $f4d5475bdb18edf2$export$2d0294657ab35f1b; });
parcelRequire("6vt9n");
var $347Dd = parcelRequire("347Dd");
var $bguNN = parcelRequire("bguNN");
var $f4d5475bdb18edf2$var$TEXT_ENCODER = new TextEncoder();
var $f4d5475bdb18edf2$var$TEXT_DECODER = new TextDecoder();
var $f4d5475bdb18edf2$export$2d0294657ab35f1b = /*#__PURE__*/ function() {
    "use strict";
    function $f4d5475bdb18edf2$export$2d0294657ab35f1b(buffer) {
        var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        $347Dd.default(this, $f4d5475bdb18edf2$export$2d0294657ab35f1b);
        this.buffer = buffer;
        this.dataView = new DataView(buffer);
        this.arrayUint8 = new Uint8Array(this.buffer);
        this.originalOffset = offset;
        this.offset = offset;
    }
    $bguNN.default($f4d5475bdb18edf2$export$2d0294657ab35f1b, [
        {
            key: "getLength",
            value: function getLength() {
                return this.buffer.byteLength - this.originalOffset;
            }
        },
        {
            key: "getOffset",
            value: function getOffset() {
                return this.offset;
            }
        },
        {
            key: "setOffset",
            value: function setOffset(offset) {
                this.offset = offset;
            }
        },
        {
            key: "resetOffset",
            value: function resetOffset() {
                this.offset = this.originalOffset;
            }
        },
        {
            key: "readUint8",
            value: function readUint8() {
                var data = this.dataView.getUint8(this.offset);
                this.offset += 1;
                return data;
            }
        },
        {
            key: "readInt8",
            value: function readInt8() {
                var data = this.dataView.getInt8(this.offset);
                this.offset += 1;
                return data;
            }
        },
        {
            key: "readUint32",
            value: function readUint32() {
                var data = this.dataView.getUint32(this.offset);
                this.offset += 4;
                return data;
            }
        },
        {
            key: "readInt32",
            value: function readInt32() {
                var data = this.dataView.getInt32(this.offset);
                this.offset += 4;
                return data;
            }
        },
        {
            key: "readUint8Array",
            value: function readUint8Array() {
                var length = this.readUint32();
                var data = this.arrayUint8.slice(this.offset, this.offset + length);
                this.offset += length;
                return data;
            }
        },
        {
            key: "readString",
            value: function readString() {
                var array = this.readUint8Array();
                return $f4d5475bdb18edf2$var$TEXT_DECODER.decode(array);
            }
        },
        {
            key: "readStringArray",
            value: function readStringArray() {
                var length = this.readUint32();
                var array = new Array(length);
                for(var i = 0; i < length; i++)array[i] = this.readString();
                return array;
            }
        },
        {
            key: "writeUint8",
            value: function writeUint8(data) {
                this.dataView.setUint8(this.offset, data);
                this.offset += 1;
            }
        },
        {
            key: "writeInt8",
            value: function writeInt8(data) {
                this.dataView.setInt8(this.offset, data);
                this.offset += 1;
            }
        },
        {
            key: "writeUint32",
            value: function writeUint32(data) {
                this.dataView.setUint32(this.offset, data);
                this.offset += 4;
            }
        },
        {
            key: "writeInt32",
            value: function writeInt32(data) {
                this.dataView.setInt32(this.offset, data);
                this.offset += 4;
            }
        },
        {
            key: "writeUint8Array",
            value: function writeUint8Array(data) {
                this.writeUint32(data.byteLength);
                this.arrayUint8.set(data, this.offset);
                this.offset += data.byteLength;
            }
        },
        {
            key: "writeString",
            value: function writeString(data) {
                var array = $f4d5475bdb18edf2$var$TEXT_ENCODER.encode(data);
                this.writeUint8Array(array);
            }
        },
        {
            key: "writeStringArray",
            value: function writeStringArray(data) {
                this.writeUint32(data.length);
                for(var i = 0; i < data.length; i++)this.writeString(data[i]);
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.arrayUint8.set(new Uint8Array(), this.originalOffset);
                this.resetOffset();
            }
        }
    ]);
    return $f4d5475bdb18edf2$export$2d0294657ab35f1b;
}();

});

parcelRequire.register("eAxv7", function(module, exports) {

$parcel$export(module.exports, "Mutex", function () { return $6dabeb21012c0f3e$export$ca12f2943758ef55; });
parcelRequire("6vt9n");
var $347Dd = parcelRequire("347Dd");
var $bguNN = parcelRequire("bguNN");
var $6dabeb21012c0f3e$export$ca12f2943758ef55 = /*#__PURE__*/ function() {
    "use strict";
    function $6dabeb21012c0f3e$export$ca12f2943758ef55(array, index) {
        $347Dd.default(this, $6dabeb21012c0f3e$export$ca12f2943758ef55);
        this.array = array;
        this.index = index;
    }
    $bguNN.default($6dabeb21012c0f3e$export$ca12f2943758ef55, [
        {
            key: "acquire",
            value: function acquire() {
                var c;
                if ((c = Atomics.compareExchange(this.array, this.index, 0, 1)) !== 0) {
                    do if (c == 2 || Atomics.compareExchange(this.array, this.index, 1, 2) !== 0) Atomics.wait(this.array, this.index, 2);
                    while ((c = Atomics.compareExchange(this.array, this.index, 0, 2)) !== 0)
                }
            }
        },
        {
            key: "release",
            value: function release() {
                var value = Atomics.sub(this.array, this.index, 1);
                if (value !== 1) {
                    Atomics.store(this.array, this.index, 0);
                    Atomics.notify(this.array, this.index, 1);
                }
            }
        }
    ]);
    return $6dabeb21012c0f3e$export$ca12f2943758ef55;
}();

});

})();
