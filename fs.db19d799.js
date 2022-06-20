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
importScripts("./fs.8ea661d5.js");
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
        var sharedBuffer, arrayUint8, arrayInt32, port, storage, _data, storageId, path, operation, args, storage1, entry1, entries, type, size, result, resultArray;
        return (/*@__PURE__*/$parcel$interopDefault($9dvvU)).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    console.log(event);
                    _ctx.t0 = event.data.type;
                    _ctx.next = _ctx.t0 === 'init' ? 4 : _ctx.t0 === 'worker' ? 9 : _ctx.t0 === 'storage' ? 15 : _ctx.t0 === 'call' ? 18 : 87;
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
                    return _ctx.abrupt("break", 87);
                case 9:
                    port = event.data.port;
                    port.addEventListener('message', $a702660d3b3b7923$var$handleMessage);
                    port.addEventListener('messageerror', $a702660d3b3b7923$var$handleMessageError);
                    port.start();
                    $a702660d3b3b7923$var$state.ports.push(port);
                    return _ctx.abrupt("break", 87);
                case 15:
                    storage = $2xfx7.deserializeState(event.data.storage);
                    $a702660d3b3b7923$var$state.storages[storage.getID()] = storage;
                    return _ctx.abrupt("break", 87);
                case 18:
                    _data = event.data, storageId = _data.storageId, path = _data.path, operation = _data.operation, args = $6vt9n.objectWithoutProperties(_data, [
                        "storageId",
                        "path",
                        "operation"
                    ]);
                    console.log('FS received request', storageId, path, operation);
                    storage1 = $a702660d3b3b7923$var$state.storages[storageId];
                    if (storage1) {
                        _ctx.next = 24;
                        break;
                    }
                    console.error('Unknown storage ID "'.concat(storageId, '"'));
                    return _ctx.abrupt("break", 87);
                case 24:
                    _ctx.next = 26;
                    return storage1.getEntry(path);
                case 26:
                    entry1 = _ctx.sent;
                    console.log('FS is waiting for FS lock...');
                    // Acquire FS lock
                    $a702660d3b3b7923$var$state.lockFs.acquire();
                    console.log('FS has FS lock');
                    _ctx.prev = 30;
                    // Write success response to data buffer (overriden in case of an error)
                    $a702660d3b3b7923$var$state.data.resetOffset();
                    $a702660d3b3b7923$var$state.data.writeUint8(0);
                    _ctx.t1 = operation;
                    _ctx.next = _ctx.t1 === 'readdir' ? 36 : _ctx.t1 === 'rmdir' ? 43 : _ctx.t1 === 'unlink' ? 48 : _ctx.t1 === 'stat' ? 53 : _ctx.t1 === 'read' ? 66 : _ctx.t1 === 'write' ? 74 : 75;
                    break;
                case 36:
                    if (entry1 instanceof $1Nhm1.StorageDirectory) {
                        _ctx.next = 38;
                        break;
                    }
                    throw new Error('Storage entry is not a directory.');
                case 38:
                    _ctx.next = 40;
                    return entry1.getEntries(true);
                case 40:
                    entries = _ctx.sent;
                    // Write response to data buffer
                    $a702660d3b3b7923$var$state.data.writeStringArray(entries.map(function(entry) {
                        return entry.getName();
                    }));
                    return _ctx.abrupt("break", 75);
                case 43:
                    if (entry1 instanceof $1Nhm1.StorageDirectory) {
                        _ctx.next = 45;
                        break;
                    }
                    throw new Error('Storage entry is not a directory.');
                case 45:
                    _ctx.next = 47;
                    return entry1.delete();
                case 47:
                    return _ctx.abrupt("break", 75);
                case 48:
                    if (entry1 instanceof $1Nhm1.StorageFile) {
                        _ctx.next = 50;
                        break;
                    }
                    throw new Error('Storage entry is not a file.');
                case 50:
                    _ctx.next = 52;
                    return entry1.delete();
                case 52:
                    return _ctx.abrupt("break", 75);
                case 53:
                    type = 0;
                    if (entry1 instanceof $1Nhm1.StorageDirectory) type = 1;
                    else if (entry1 instanceof $1Nhm1.StorageFile) type = 2;
                    if (!entry1) {
                        _ctx.next = 61;
                        break;
                    }
                    _ctx.next = 58;
                    return entry1.getSize();
                case 58:
                    _ctx.t2 = _ctx.sent;
                    _ctx.next = 62;
                    break;
                case 61:
                    _ctx.t2 = 0;
                case 62:
                    size = _ctx.t2;
                    // Write response to data buffer
                    $a702660d3b3b7923$var$state.data.writeUint8(type);
                    $a702660d3b3b7923$var$state.data.writeUint32(size);
                    return _ctx.abrupt("break", 75);
                case 66:
                    if (entry1 instanceof $1Nhm1.StorageFile) {
                        _ctx.next = 68;
                        break;
                    }
                    throw new Error('Storage entry is not a file.');
                case 68:
                    _ctx.next = 70;
                    return entry1.read(args.start, args.end);
                case 70:
                    result = _ctx.sent;
                    resultArray = new Uint8Array(result);
                    // Write response to data buffer
                    $a702660d3b3b7923$var$state.data.writeUint8Array(resultArray);
                    return _ctx.abrupt("break", 75);
                case 74:
                    throw new Error('Not implemented');
                case 75:
                    _ctx.next = 83;
                    break;
                case 77:
                    _ctx.prev = 77;
                    _ctx.t3 = _ctx["catch"](30);
                    console.error(_ctx.t3);
                    // Write error response to data buffer
                    $a702660d3b3b7923$var$state.data.clear();
                    $a702660d3b3b7923$var$state.data.writeUint8(1);
                    if (_ctx.t3 instanceof Error) $a702660d3b3b7923$var$state.data.writeString(_ctx.t3.message);
                    else $a702660d3b3b7923$var$state.data.writeString('Unknown error.');
                case 83:
                    // Notify worker
                    Atomics.notify($a702660d3b3b7923$var$state.arrayInt32, $aghNo.INDEX_WORKER_NOTIFY);
                    // Release FS lock
                    $a702660d3b3b7923$var$state.lockFs.release();
                    console.log('FS is done');
                    return _ctx.abrupt("break", 87);
                case 87:
                case "end":
                    return _ctx.stop();
            }
        }, _callee, null, [
            [
                30,
                77
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
