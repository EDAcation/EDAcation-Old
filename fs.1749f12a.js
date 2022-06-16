(function () {
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
importScripts("./fs.704c3938.js");
var $a702660d3b3b7923$exports = {};

var $6vt9n = parcelRequire("6vt9n");

var $9dvvU = parcelRequire("9dvvU");

var $2xfx7 = parcelRequire("2xfx7");

var $1Nhm1 = parcelRequire("1Nhm1");

var $aghNo = parcelRequire("aghNo");

var $hq89M = parcelRequire("hq89M");

var $eAxv7 = parcelRequire("eAxv7");
var $a702660d3b3b7923$var$state;
var $a702660d3b3b7923$var$handleMessage = function() {
    var _ref = $6vt9n.asyncToGenerator((/*@__PURE__*/$parcel$interopDefault($9dvvU)).mark(function _callee(event) {
        var sharedBuffer, arrayUint8, arrayInt32, port, storage, _data, storageId, path, operation, storage1, result, entry, entries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry1;
        return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    console.log(event);
                    _ctx.t0 = event.data.type;
                    _ctx.next = _ctx.t0 === 'init' ? 4 : _ctx.t0 === 'worker' ? 9 : _ctx.t0 === 'storage' ? 15 : _ctx.t0 === 'call' ? 18 : 64;
                    break;
                case 4:
                    sharedBuffer = event.data.sharedBuffer;
                    arrayUint8 = new Uint8Array(sharedBuffer);
                    arrayInt32 = new Int32Array(sharedBuffer);
                    $a702660d3b3b7923$var$state = {
                        sharedBuffer: sharedBuffer,
                        arrayUint8: arrayUint8,
                        arrayInt32: arrayInt32,
                        lockFs: new $eAxv7.Mutex(arrayInt32, $aghNo.INDEX_FS_LOCK),
                        lockWorker: new $eAxv7.Mutex(arrayInt32, $aghNo.INDEX_WORKER_LOCK),
                        data: new $hq89M.Data(sharedBuffer, $aghNo.INDEX_DATA * 4),
                        ports: [],
                        storages: {}
                    };
                    return _ctx.abrupt("break", 64);
                case 9:
                    port = event.data.port;
                    port.addEventListener('message', $a702660d3b3b7923$var$handleMessage);
                    port.addEventListener('messageerror', $a702660d3b3b7923$var$handleMessageError);
                    port.start();
                    $a702660d3b3b7923$var$state.ports.push(port);
                    return _ctx.abrupt("break", 64);
                case 15:
                    storage = $2xfx7.deserializeState(event.data.storage);
                    $a702660d3b3b7923$var$state.storages[storage.getID()] = storage;
                    return _ctx.abrupt("break", 64);
                case 18:
                    _data = event.data, storageId = _data.storageId, path = _data.path, operation = _data.operation;
                    console.log('FS received request', storageId, path, operation);
                    storage1 = $a702660d3b3b7923$var$state.storages[storageId];
                    if (storage1) {
                        _ctx.next = 24;
                        break;
                    }
                    console.error('Unknown storage ID "'.concat(storageId, '"'));
                    return _ctx.abrupt("break", 64);
                case 24:
                    console.log('FS is waiting for FS lock...');
                    // Acquire FS lock
                    $a702660d3b3b7923$var$state.lockFs.acquire();
                    console.log('FS has FS lock');
                    result = [];
                    _ctx.t1 = operation;
                    _ctx.next = _ctx.t1 === 'readdir' ? 31 : 58;
                    break;
                case 31:
                    _ctx.next = 33;
                    return storage1.getEntry(path);
                case 33:
                    entry = _ctx.sent;
                    if (entry instanceof $1Nhm1.StorageDirectory) {
                        _ctx.next = 37;
                        break;
                    }
                    console.error('Storage entry is not a directory.');
                    return _ctx.abrupt("break", 58);
                case 37:
                    _ctx.next = 39;
                    return entry.getEntries(true);
                case 39:
                    entries = _ctx.sent;
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _ctx.prev = 41;
                    for(_iterator = entries[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        entry1 = _step.value;
                        result.push(entry1.getName());
                    }
                    _ctx.next = 49;
                    break;
                case 45:
                    _ctx.prev = 45;
                    _ctx.t2 = _ctx["catch"](41);
                    _didIteratorError = true;
                    _iteratorError = _ctx.t2;
                case 49:
                    _ctx.prev = 49;
                    _ctx.prev = 50;
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                case 52:
                    _ctx.prev = 52;
                    if (!_didIteratorError) {
                        _ctx.next = 55;
                        break;
                    }
                    throw _iteratorError;
                case 55:
                    return _ctx.finish(52);
                case 56:
                    return _ctx.finish(49);
                case 57:
                    return _ctx.abrupt("break", 58);
                case 58:
                    // Write response to data buffer
                    $a702660d3b3b7923$var$state.data.resetOffset();
                    $a702660d3b3b7923$var$state.data.writeStringArray(result);
                    // Notify worker
                    Atomics.notify($a702660d3b3b7923$var$state.arrayInt32, $aghNo.INDEX_WORKER_NOTIFY);
                    // Release FS lock
                    $a702660d3b3b7923$var$state.lockFs.release();
                    console.log('FS is done');
                    return _ctx.abrupt("break", 64);
                case 64:
                case "end":
                    return _ctx.stop();
            }
        }, _callee, null, [
            [
                41,
                45,
                49,
                57
            ],
            [
                50,
                ,
                52,
                56
            ]
        ]);
    }));
    return function $a702660d3b3b7923$var$handleMessage(event) {
        return _ref.apply(this, arguments);
    };
}();
var $a702660d3b3b7923$var$handleMessageError = function(event) {
    console.error('Failed to deserialize message.', event);
};
addEventListener('message', $a702660d3b3b7923$var$handleMessage);
addEventListener('messageerror', $a702660d3b3b7923$var$handleMessage);

})();
