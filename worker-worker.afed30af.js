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
var $8d293c17402dd8d3$exports = {};

var $iP2qK = parcelRequire("iP2qK");

var $iof2y = parcelRequire("iof2y");

var $3AHlh = parcelRequire("3AHlh");

var $5zqQv = parcelRequire("5zqQv");
var $8d293c17402dd8d3$var$specialGates = new Set([
    'Subcircuit',
    'Input',
    'Output',
    'Button',
    'Lamp',
    'NumEntry',
    'NumDisplay'
]);
var $8d293c17402dd8d3$var$Link = function $8d293c17402dd8d3$var$Link(source, target) {
    "use strict";
    $iP2qK.classCallCheck(this, $8d293c17402dd8d3$var$Link);
    this.source = source;
    this.target = target;
};
var $8d293c17402dd8d3$var$Gate = /*#__PURE__*/ function() {
    "use strict";
    function $8d293c17402dd8d3$var$Gate(id, graph, gateParams, ports, inputSignals, outputSignals) {
        $iP2qK.classCallCheck(this, $8d293c17402dd8d3$var$Gate);
        this.id = id;
        this.graph = graph;
        this.special = $8d293c17402dd8d3$var$specialGates.has(gateParams.type);
        this.isSubcircuit = gateParams.type == 'Subcircuit';
        this.isOutput = gateParams.type == 'Output';
        var cell = $iof2y[gateParams.type].prototype;
        this.operation = cell.operation;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = cell._operationHelpers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var helper = _step.value;
                this[helper] = cell[helper];
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
        this.links = new Set();
        this._links_to = Object.create(null);
        this._params = gateParams;
        this._params.inputSignals = Object.create(null);
        this._params.outputSignals = Object.create(null);
        this._presentationParams = cell._presentationParams;
        this._presentationParamChanged = Object.create(null);
        this._monitors = Object.create(null);
        this._ports = Object.create(null);
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = ports[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var port = _step1.value;
                this._ports[port.id] = port;
                this._monitors[port.id] = new Set();
                if (port.dir == "in") this._params.inputSignals[port.id] = $5zqQv.Vector3vl.fromClonable(inputSignals[port.id]);
                if (port.dir == "out") {
                    this._params.outputSignals[port.id] = $5zqQv.Vector3vl.fromClonable(outputSignals[port.id]);
                    this._links_to[port.id] = new Set();
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        cell.prepare.call(this);
    }
    $iP2qK.createClass($8d293c17402dd8d3$var$Gate, [
        {
            key: "get",
            value: function get(name) {
                return this._params[name];
            }
        },
        {
            key: "set",
            value: function set(name, value) {
                this._params[name] = value;
                if (this._presentationParams.includes(name)) $8d293c17402dd8d3$var$worker._markPresentationParam(this, name);
            }
        },
        {
            key: "addLinkTo",
            value: function addLinkTo(port, target) {
                this._links_to[port].add(target);
            }
        },
        {
            key: "removeLinkTo",
            value: function removeLinkTo(port, target) {
                this._links_to[port].delete(target);
            }
        },
        {
            key: "addLink",
            value: function addLink(linkId) {
                this.links.add(linkId);
            }
        },
        {
            key: "removeLink",
            value: function removeLink(linkId) {
                this.links.delete(linkId);
            }
        },
        {
            key: "targets",
            value: function targets(port) {
                return this._links_to[port];
            }
        },
        {
            key: "getPort",
            value: function getPort(port) {
                return this._ports[port];
            }
        },
        {
            key: "getPorts",
            value: function getPorts() {
                return Object.values(this._ports);
            }
        },
        {
            key: "trigger",
            value: function trigger(event) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                postMessage({
                    type: 'gateTrigger',
                    args: [
                        this.graph.id,
                        this.id,
                        event,
                        args
                    ]
                });
            }
        },
        {
            key: "monitor",
            value: function monitor(port, monitorId) {
                this._monitors[port].add(monitorId);
            }
        },
        {
            key: "unmonitor",
            value: function unmonitor(port, monitorId) {
                this._monitors[port].delete(Number(monitorId));
            }
        },
        {
            key: "getMonitors",
            value: function getMonitors(port) {
                return this._monitors[port];
            }
        }
    ]);
    return $8d293c17402dd8d3$var$Gate;
}();
var $8d293c17402dd8d3$var$Graph = /*#__PURE__*/ function() {
    "use strict";
    function $8d293c17402dd8d3$var$Graph(id) {
        $iP2qK.classCallCheck(this, $8d293c17402dd8d3$var$Graph);
        this.id = id;
        this._gates = {};
        this._links = {};
        this._observed = false;
        this._subcircuit = null;
    }
    $iP2qK.createClass($8d293c17402dd8d3$var$Graph, [
        {
            key: "addLink",
            value: function addLink(linkId, source, target) {
                this._links[linkId] = new $8d293c17402dd8d3$var$Link(source, target);
                this._gates[source.id].addLinkTo(source.port, target);
                this._gates[source.id].addLink(linkId);
                this._gates[target.id].addLink(linkId);
            }
        },
        {
            key: "addGate",
            value: function addGate(gateId, gateParams, ports, inputSignals, outputSignals) {
                this._gates[gateId] = new $8d293c17402dd8d3$var$Gate(gateId, this, gateParams, ports, inputSignals, outputSignals);
            }
        },
        {
            key: "removeLink",
            value: function removeLink(linkId) {
                var link = this._links[linkId];
                this._gates[link.source.id].removeLinkTo(link.source.port, link.target);
                this._gates[link.source.id].removeLink(linkId);
                this._gates[link.target.id].removeLink(linkId);
                delete this._links[linkId];
            }
        },
        {
            key: "removeGate",
            value: function removeGate(gateId) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._gates[gateId].links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var linkId = _step.value;
                        this.removeLink(linkId);
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
                this._gates[gateId].graph = null;
                delete this._gates[gateId];
            }
        },
        {
            key: "getGate",
            value: function getGate(gateId) {
                return this._gates[gateId];
            }
        },
        {
            key: "getLink",
            value: function getLink(linkId) {
                return this._links[linkId];
            }
        },
        {
            key: "getGates",
            value: function getGates() {
                return Object.values(this._gates);
            }
        },
        {
            key: "observe",
            value: function observe() {
                this._observed = true;
            }
        },
        {
            key: "unobserve",
            value: function unobserve() {
                this._observed = false;
            }
        },
        {
            key: "observed",
            get: function get() {
                return this._observed;
            }
        },
        {
            key: "setSubcircuit",
            value: function setSubcircuit(gate) {
                this._subcircuit = gate;
            }
        },
        {
            key: "subcircuit",
            get: function get() {
                return this._subcircuit;
            }
        }
    ]);
    return $8d293c17402dd8d3$var$Graph;
}();
var $8d293c17402dd8d3$var$WorkerEngineWorker = /*#__PURE__*/ function() {
    "use strict";
    function $8d293c17402dd8d3$var$WorkerEngineWorker() {
        var _this = this;
        $iP2qK.classCallCheck(this, $8d293c17402dd8d3$var$WorkerEngineWorker);
        this._interval = 10;
        this._graphs = Object.create(null);
        this._monitors = Object.create(null);
        this._monitorChecks = Object.create(null);
        this._alarms = Object.create(null);
        this._alarmQueue = new Map();
        this._queue = new Map();
        this._pq = new (/*@__PURE__*/$parcel$interopDefault($3AHlh))();
        this._toUpdate = new Map();
        this._toUpdateParam = new Map();
        this._tick = 0;
        this._sender = setInterval(function() {
            _this._sendUpdates();
        }, 25);
        this._updater = null;
    }
    $iP2qK.createClass($8d293c17402dd8d3$var$WorkerEngineWorker, [
        {
            key: "interval",
            value: function interval(ms) {
                this._interval = ms;
            }
        },
        {
            key: "updateGates",
            value: function updateGates(reqid, sendUpdates) {
                var count = this._updateGates();
                if (sendUpdates) this._sendUpdates();
                this._postMonitors();
                this._sendAck(reqid, count);
            }
        },
        {
            key: "_updateGates",
            value: function _updateGates() {
                if (this._pq.peek() == this._tick) return this._updateGatesNext();
                else {
                    var k = this._tick | 0;
                    this._tick = k + 1 | 0;
                    return 0;
                }
            }
        },
        {
            key: "updateGatesNext",
            value: function updateGatesNext(reqid, sendUpdates) {
                var count = this._updateGatesNext();
                if (sendUpdates) this._sendUpdates();
                this._postMonitors();
                this._sendAck(reqid, count);
            }
        },
        {
            key: "_updateGatesNext",
            value: function _updateGatesNext() {
                var k = this._pq.poll() | 0;
                console.assert(k >= this._tick);
                this._tick = k;
                var q = this._queue.get(k);
                var count = 0;
                while(q.size){
                    var _value = $iP2qK.slicedToArray(q.entries().next().value, 2), gate = _value[0], args = _value[1];
                    q.delete(gate);
                    if (gate.special) continue;
                    var graph = gate.graph;
                    if (!graph) continue;
                    var newOutputs = gate.operation(args);
                    if ('_clock_hack' in newOutputs) {
                        delete newOutputs['_clock_hack'];
                        this._enqueue(gate);
                    }
                    this._setGateOutputSignals(gate, newOutputs);
                    count++;
                }
                this._queue.delete(k);
                this._tick = k + 1 | 0;
                return count;
            }
        },
        {
            key: "ping",
            value: function ping(reqid, sendUpdates) {
                if (sendUpdates) this._sendUpdates();
                this._sendAck(reqid);
            }
        },
        {
            key: "start",
            value: function start() {
                var _this = this;
                this._stop();
                this._updater = setInterval(function() {
                    _this._updateGates();
                    _this._postMonitors();
                }, this._interval);
            }
        },
        {
            key: "startFast",
            value: function startFast() {
                var _this = this;
                this._stop();
                this._updater = setInterval(function() {
                    var startTime = Date.now();
                    while(Date.now() - startTime < 10 && _this._hasPendingEvents() && _this._updater){
                        _this._updateGatesNext();
                        _this._postMonitors();
                    }
                }, 10);
            }
        },
        {
            key: "stop",
            value: function stop(reqid, sendUpdates) {
                this._stop();
                if (sendUpdates) this._sendUpdates();
                this._sendAck(reqid);
            }
        },
        {
            key: "_stop",
            value: function _stop() {
                if (this._updater) {
                    clearInterval(this._updater);
                    this._updater = null;
                }
            }
        },
        {
            key: "addGraph",
            value: function addGraph(graphId) {
                console.assert(!(graphId in this._graphs));
                this._graphs[graphId] = new $8d293c17402dd8d3$var$Graph(graphId);
            }
        },
        {
            key: "addLink",
            value: function addLink(graphId, linkId, source, target) {
                var graph = this._graphs[graphId];
                graph.addLink(linkId, source, target);
                var sourceGate = graph.getGate(source.id);
                var targetGate = graph.getGate(target.id);
                var sig = sourceGate.get('outputSignals')[source.port];
                this._setGateInputSignal(targetGate, target.port, sig);
            }
        },
        {
            key: "addGate",
            value: function addGate(graphId, gateId, gateParams, ports, inputSignals, outputSignals) {
                var graph = this._graphs[graphId];
                graph.addGate(gateId, gateParams, ports, inputSignals, outputSignals);
                this._enqueue(graph.getGate(gateId));
            }
        },
        {
            key: "addSubcircuit",
            value: function addSubcircuit(graphId, gateId, subgraphId, IOmap) {
                var graph = this._graphs[graphId];
                var gate = graph.getGate(gateId);
                var subgraph = this._graphs[subgraphId];
                gate.set('subgraph', subgraph);
                gate.set('circuitIOmap', IOmap);
                subgraph.setSubcircuit(gate);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.entries(IOmap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _value = $iP2qK.slicedToArray(_step.value, 2), port = _value[0], ioId = _value[1];
                        var io = subgraph.getGate(ioId);
                        if (gate.getPort(port).dir == 'in') this._setGateOutputSignal(io, 'out', gate.get('inputSignals')[port]);
                        if (gate.getPort(port).dir == 'out') this._setGateOutputSignal(gate, port, io.get('inputSignals').in);
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
            }
        },
        {
            key: "removeLink",
            value: function removeLink(graphId, linkId) {
                var graph = this._graphs[graphId];
                var link = graph.getLink(linkId);
                graph.removeLink(linkId);
                var targetGate = graph.getGate(link.target.id);
                var sig = $5zqQv.Vector3vl.xes(targetGate.getPort(link.target.port).bits);
                this._setGateInputSignal(targetGate, link.target.port, sig);
            }
        },
        {
            key: "removeGate",
            value: function removeGate(graphId, gateId) {
                this._graphs[graphId].removeGate(gateId);
            }
        },
        {
            key: "observeGraph",
            value: function observeGraph(graphId) {
                var graph = this._graphs[graphId];
                graph.observe();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined, _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                try {
                    for(var _iterator = graph.getGates()[Symbol.iterator](), _step; !(_iteratorNormalCompletion2 = (_step = _iterator.next()).done); _iteratorNormalCompletion2 = true){
                        var gate = _step.value;
                        try {
                            for(var _iterator2 = gate.getPorts()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion = true){
                                var port = _step2.value;
                                if (port.dir == 'out') this._markUpdate(gate, port.id);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator2.return != null) {
                                    _iterator2.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        },
        {
            key: "unobserveGraph",
            value: function unobserveGraph(graphId) {
                this._graphs[graphId].unobserve();
            }
        },
        {
            key: "changeInput",
            value: function changeInput(graphId, gateId, sig) {
                var gate = this._graphs[graphId].getGate(gateId);
                this._setGateOutputSignals(gate, {
                    out: $5zqQv.Vector3vl.fromClonable(sig)
                });
            }
        },
        {
            key: "changeParam",
            value: function changeParam(graphId, gateId, paramName, val) {
                var gate = this._graphs[graphId].getGate(gateId);
                gate.set(paramName, val);
            }
        },
        {
            key: "manualMemChange",
            value: function manualMemChange(graphId, gateId, addr, data) {
                var gate = this._graphs[graphId].getGate(gateId);
                gate.memdata.set(addr, $5zqQv.Vector3vl.fromClonable(data));
                this._enqueue(gate);
            }
        },
        {
            key: "monitor",
            value: function monitor(graphId, gateId, port, monitorId, param) {
                var triggerValues = param.triggerValues, stopOnTrigger = param.stopOnTrigger, oneShot = param.oneShot, synchronous = param.synchronous;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                if (triggerValues != undefined) try {
                    for(var _iterator = triggerValues.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var k = _step.value;
                        triggerValues[k] = $5zqQv.Vector3vl.fromClonable(triggerValues[k]);
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
                var gate = this._graphs[graphId].getGate(gateId);
                this._monitors[monitorId] = {
                    gate: gate,
                    port: port,
                    triggerValues: triggerValues,
                    stopOnTrigger: stopOnTrigger,
                    oneShot: oneShot,
                    synchronous: synchronous
                };
                gate.monitor(port, monitorId);
                if (triggerValues == undefined) postMessage({
                    type: 'monitorValue',
                    args: [
                        monitorId,
                        this._tick,
                        gate.get('outputSignals')[port]
                    ]
                });
            }
        },
        {
            key: "unmonitor",
            value: function unmonitor(monitorId) {
                var monitor = this._monitors[monitorId];
                if (monitor == undefined) return;
                monitor.gate.unmonitor(monitor.port, monitorId);
                delete this._monitors[monitorId];
                delete this._monitorChecks[monitorId];
            }
        },
        {
            key: "alarm",
            value: function alarm(tick, alarmId, param) {
                var stopOnAlarm = param.stopOnAlarm, synchronous = param.synchronous;
                if (tick <= this._tick) return;
                this._alarms[alarmId] = {
                    tick: tick,
                    stopOnAlarm: stopOnAlarm,
                    synchronous: synchronous
                };
                if (!this._alarmQueue.has(tick)) this._alarmQueue.set(tick, new Set());
                this._alarmQueue.get(tick).add(alarmId);
                this._pq.add(tick - 1);
                if (!this._queue.has(tick - 1)) this._queue.set(tick - 1, new Map());
            }
        },
        {
            key: "unalarm",
            value: function unalarm(alarmId) {
                var alarm = this._alarms[alarmId];
                if (alarm == undefined) return;
                var tick = alarm.tick;
                this._alarmQueue.get(tick).delete(alarmId);
                if (this._alarmQueue.get(tick).size == 0) this._alarmQueue.delete(tick);
                delete this._alarms[alarmId];
            }
        },
        {
            key: "_enqueue",
            value: function _enqueue(gate) {
                var _this = this;
                var k = this._tick + gate.get('propagation') | 0;
                var sq = function() {
                    var q = _this._queue.get(k);
                    if (q !== undefined) return q;
                    var q1 = new Map();
                    _this._queue.set(k, q1);
                    _this._pq.add(k);
                    return q1;
                }();
                sq.set(gate, Object.assign({}, gate.get('inputSignals')));
            }
        },
        {
            key: "_postMonitors",
            value: function _postMonitors() {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    var _this = this, _loop = function(_iterator, _step) {
                        var _value = $iP2qK.slicedToArray(_step.value, 2), monitorId = _value[0], sig = _value[1];
                        var _monitorId = _this._monitors[monitorId], triggerValues = _monitorId.triggerValues, stopOnTrigger = _monitorId.stopOnTrigger, oneShot = _monitorId.oneShot, synchronous = _monitorId.synchronous;
                        var triggered = true;
                        if (triggerValues) triggered = triggerValues.some(function(triggerValue) {
                            return sig.eq(triggerValue);
                        });
                        if (triggered) {
                            if (oneShot) _this.unmonitor(monitorId);
                            if (synchronous) _this._sendUpdates();
                            postMessage({
                                type: 'monitorValue',
                                args: [
                                    monitorId,
                                    _this._tick,
                                    sig,
                                    stopOnTrigger,
                                    oneShot
                                ]
                            });
                            if (stopOnTrigger) _this._stop();
                        }
                    };
                    for(var _iterator = Object.entries(this._monitorChecks)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop(_iterator, _step);
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
                this._monitorChecks = Object.create(null);
                if (this._alarmQueue.get(this._tick)) {
                    var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                    try {
                        for(var _iterator3 = this._alarmQueue.get(this._tick)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                            var alarmId = _step3.value;
                            var _alarmId = this._alarms[alarmId], stopOnAlarm = _alarmId.stopOnAlarm, synchronous1 = _alarmId.synchronous;
                            if (synchronous1) this._sendUpdates();
                            delete this._alarms[alarmId];
                            postMessage({
                                type: 'alarmReached',
                                args: [
                                    alarmId,
                                    this._tick,
                                    stopOnAlarm
                                ]
                            });
                            if (stopOnAlarm) this._stop();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                _iterator3.return();
                            }
                        } finally{
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                    this._alarmQueue.delete(this._tick);
                }
            }
        },
        {
            key: "_setGateOutputSignals",
            value: function _setGateOutputSignals(gate, newOutputs) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.entries(newOutputs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _value = $iP2qK.slicedToArray(_step.value, 2), port = _value[0], sig = _value[1];
                        this._setGateOutputSignal(gate, port, sig);
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
            }
        },
        {
            key: "_setGateOutputSignal",
            value: function _setGateOutputSignal(gate, port, sig) {
                var outputs = gate.get('outputSignals');
                var oldOutput = outputs[port];
                if (sig.eq(oldOutput)) return;
                outputs[port] = sig;
                this._markUpdate(gate, port);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = gate.targets(port)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var target = _step.value;
                        var targetGate = gate.graph.getGate(target.id);
                        this._setGateInputSignal(targetGate, target.port, sig);
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
                var monitors = gate.getMonitors(port);
                var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
                try {
                    for(var _iterator4 = monitors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                        var monitorId = _step4.value;
                        this._monitorChecks[monitorId] = sig;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                            _iterator4.return();
                        }
                    } finally{
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        },
        {
            key: "_setGateInputSignal",
            value: function _setGateInputSignal(targetGate, port, sig) {
                var inputs = targetGate.get('inputSignals');
                var oldInput = inputs[port];
                if (sig.eq(oldInput)) return;
                inputs[port] = sig;
                if (targetGate.isSubcircuit) {
                    var subgraph = targetGate.get('subgraph');
                    if (!subgraph) return;
                    var iomap = targetGate.get('circuitIOmap');
                    var gate = subgraph.getGate(iomap[port]);
                    if (!gate) return;
                    this._setGateOutputSignals(gate, {
                        out: sig
                    });
                } else if (targetGate.isOutput) {
                    var subcir = targetGate.graph.subcircuit;
                    if (!subcir) return;
                    var subcirPort = targetGate.get('net');
                    this._setGateOutputSignal(subcir, subcirPort, sig);
                } else this._enqueue(targetGate);
            }
        },
        {
            key: "_markUpdate",
            value: function _markUpdate(gate, port) {
                var _this = this;
                if (!gate.graph.observed) return;
                var s = function() {
                    var v = _this._toUpdate.get(gate);
                    if (v !== undefined) return v;
                    var r = new Set();
                    _this._toUpdate.set(gate, r);
                    return r;
                }();
                s.add(port);
            }
        },
        {
            key: "_markPresentationParam",
            value: function _markPresentationParam(gate, param) {
                var _this = this;
                if (!gate.graph.observed) return;
                var s = function() {
                    var v = _this._toUpdateParam.get(gate);
                    if (v !== undefined) return v;
                    var r = new Set();
                    _this._toUpdateParam.set(gate, r);
                    return r;
                }();
                s.add(param);
            }
        },
        {
            key: "_sendUpdates",
            value: function _sendUpdates() {
                var updates = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._toUpdate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _value = $iP2qK.slicedToArray(_step.value, 2), gate = _value[0], ports = _value[1];
                        var outputSignals = gate.get('outputSignals');
                        var outputs = {};
                        var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
                        try {
                            for(var _iterator5 = ports[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                                var port = _step5.value;
                                outputs[port] = outputSignals[port];
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                                    _iterator5.return();
                                }
                            } finally{
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                        updates.push([
                            gate.graph.id,
                            gate.id,
                            outputs
                        ]);
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
                this._toUpdate = new Map();
                var pendingEvents = this._hasPendingEvents();
                postMessage({
                    type: 'update',
                    args: [
                        this._tick,
                        pendingEvents,
                        updates
                    ]
                });
                if (this._toUpdateParam.size > 0) {
                    var _iteratorNormalCompletion6 = true, _didIteratorError6 = false, _iteratorError6 = undefined, _iteratorNormalCompletion7 = true, _didIteratorError7 = false, _iteratorError7 = undefined;
                    try {
                        for(var _iterator6 = this._toUpdateParam[Symbol.iterator](), _step6; !(_iteratorNormalCompletion7 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion7 = true){
                            var _value1 = $iP2qK.slicedToArray(_step6.value, 2), gate1 = _value1[0], params = _value1[1];
                            try {
                                for(var _iterator7 = params[Symbol.iterator](), _step7; !(_iteratorNormalCompletion6 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion6 = true){
                                    var param = _step7.value;
                                    postMessage({
                                        type: 'gateSet',
                                        args: [
                                            gate1.graph.id,
                                            gate1.id,
                                            param,
                                            gate1.get(param)
                                        ]
                                    });
                                }
                            } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion6 && _iterator7.return != null) {
                                        _iterator7.return();
                                    }
                                } finally{
                                    if (_didIteratorError6) {
                                        throw _iteratorError6;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator6.return != null) {
                                _iterator6.return();
                            }
                        } finally{
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }
                    this._toUpdateParam = new Map();
                }
            }
        },
        {
            key: "_sendAck",
            value: function _sendAck(reqid, response) {
                postMessage({
                    type: 'ack',
                    args: [
                        reqid,
                        response
                    ]
                });
            }
        },
        {
            key: "_hasPendingEvents",
            value: function _hasPendingEvents() {
                return this._queue.size > 0;
            }
        }
    ]);
    return $8d293c17402dd8d3$var$WorkerEngineWorker;
}();
var $8d293c17402dd8d3$var$worker = new $8d293c17402dd8d3$var$WorkerEngineWorker();
self.onmessage = function(e) {
    var msg = e.data;
    if ('arg' in msg) $8d293c17402dd8d3$var$worker[msg.type](msg.arg);
    else if ('args' in msg) $8d293c17402dd8d3$var$worker[msg.type].apply($8d293c17402dd8d3$var$worker, msg.args);
    else $8d293c17402dd8d3$var$worker[msg.type]();
};

})();
