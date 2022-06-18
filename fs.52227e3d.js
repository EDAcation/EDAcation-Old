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
importScripts("./fs.f00e6a63.js");
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
        var sharedBuffer, arrayUint8, arrayInt32, port, storage, _data, storageId, path, operation, storage1, entry, result, entries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry1;
        return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    console.log(event);
                    _ctx.t0 = event.data.type;
                    _ctx.next = _ctx.t0 === 'init' ? 4 : _ctx.t0 === 'worker' ? 9 : _ctx.t0 === 'storage' ? 15 : _ctx.t0 === 'call' ? 18 : 83;
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
                    return _ctx.abrupt("break", 83);
                case 9:
                    port = event.data.port;
                    port.addEventListener('message', $a702660d3b3b7923$var$handleMessage);
                    port.addEventListener('messageerror', $a702660d3b3b7923$var$handleMessageError);
                    port.start();
                    $a702660d3b3b7923$var$state.ports.push(port);
                    return _ctx.abrupt("break", 83);
                case 15:
                    storage = $2xfx7.deserializeState(event.data.storage);
                    $a702660d3b3b7923$var$state.storages[storage.getID()] = storage;
                    return _ctx.abrupt("break", 83);
                case 18:
                    _data = event.data, storageId = _data.storageId, path = _data.path, operation = _data.operation;
                    console.log('FS received request', storageId, path, operation);
                    storage1 = $a702660d3b3b7923$var$state.storages[storageId];
                    if (storage1) {
                        _ctx.next = 24;
                        break;
                    }
                    console.error('Unknown storage ID "'.concat(storageId, '"'));
                    return _ctx.abrupt("break", 83);
                case 24:
                    _ctx.next = 26;
                    return storage1.getEntry(path);
                case 26:
                    entry = _ctx.sent;
                    console.log('FS is waiting for FS lock...');
                    // Acquire FS lock
                    $a702660d3b3b7923$var$state.lockFs.acquire();
                    console.log('FS has FS lock');
                    _ctx.prev = 30;
                    result = [];
                    _ctx.t1 = operation;
                    _ctx.next = _ctx.t1 === 'readdir' ? 35 : _ctx.t1 === 'rmdir' ? 58 : _ctx.t1 === 'unlink' ? 63 : 68;
                    break;
                case 35:
                    if (entry instanceof $1Nhm1.StorageDirectory) {
                        _ctx.next = 37;
                        break;
                    }
                    throw new Error('Storage entry is not a directory.');
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
                    return _ctx.abrupt("break", 68);
                case 58:
                    if (entry instanceof $1Nhm1.StorageDirectory) {
                        _ctx.next = 60;
                        break;
                    }
                    throw new Error('Storage entry is not a directory.');
                case 60:
                    _ctx.next = 62;
                    return entry.delete();
                case 62:
                    return _ctx.abrupt("break", 68);
                case 63:
                    if (entry instanceof $1Nhm1.StorageFile) {
                        _ctx.next = 65;
                        break;
                    }
                    throw new Error('Storage entry is not a file.');
                case 65:
                    _ctx.next = 67;
                    return entry.delete();
                case 67:
                    return _ctx.abrupt("break", 68);
                case 68:
                    // Write success response to data buffer
                    $a702660d3b3b7923$var$state.data.resetOffset();
                    $a702660d3b3b7923$var$state.data.writeUint8(0);
                    $a702660d3b3b7923$var$state.data.writeStringArray(result);
                    _ctx.next = 79;
                    break;
                case 73:
                    _ctx.prev = 73;
                    _ctx.t3 = _ctx["catch"](30);
                    console.error(_ctx.t3);
                    // Write error response to data buffer
                    $a702660d3b3b7923$var$state.data.resetOffset();
                    $a702660d3b3b7923$var$state.data.writeUint8(1);
                    if (_ctx.t3 instanceof Error) $a702660d3b3b7923$var$state.data.writeString(_ctx.t3.message);
                    else $a702660d3b3b7923$var$state.data.writeString('Unknown error.');
                case 79:
                    // Notify worker
                    Atomics.notify($a702660d3b3b7923$var$state.arrayInt32, $aghNo.INDEX_WORKER_NOTIFY);
                    // Release FS lock
                    $a702660d3b3b7923$var$state.lockFs.release();
                    console.log('FS is done');
                    return _ctx.abrupt("break", 83);
                case 83:
                case "end":
                    return _ctx.stop();
            }
        }, _callee, null, [
            [
                30,
                73
            ],
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
