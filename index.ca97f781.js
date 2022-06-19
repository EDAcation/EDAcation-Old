(function () {
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

var $iP2qK = parcelRequire("iP2qK");
/*! coi-serviceworker v0.1.6 - Guido Zuidhof, licensed under MIT */ if (typeof window === 'undefined') {
    self.addEventListener("install", function() {
        return self.skipWaiting();
    });
    self.addEventListener("activate", function(event) {
        return event.waitUntil(self.clients.claim());
    });
    self.addEventListener("message", function(ev) {
        if (ev.data && ev.data.type === "deregister") self.registration.unregister().then(function() {
            return self.clients.matchAll();
        }).then(function(clients) {
            clients.forEach(function(client) {
                return client.navigate(client.url);
            });
        });
    });
    self.addEventListener("fetch", function(event) {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;
        event.respondWith(fetch(event.request).then(function(response) {
            if (response.status === 0) return response;
            var newHeaders = new Headers(response.headers);
            newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
            newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
            });
        }).catch(function(e) {
            return console.error(e);
        }));
    });
} else (function() {
    // You can customize the behavior of this script through a global `coi` variable.
    var coi = $iP2qK.objectSpread({
        shouldRegister: function() {
            return true;
        },
        shouldDeregister: function() {
            return false;
        },
        doReload: function() {
            return window.location.reload();
        },
        quiet: false
    }, window.coi);
    var n = navigator;
    if (coi.shouldDeregister() && n.serviceWorker && n.serviceWorker.controller) n.serviceWorker.controller.postMessage({
        type: "deregister"
    });
    // If we're already coi: do nothing. Perhaps it's due to this script doing its job, or COOP/COEP are
    // already set from the origin server. Also if the browser has no notion of crossOriginIsolated, just give up here.
    if (window.crossOriginIsolated !== false || !coi.shouldRegister()) return;
    if (!window.isSecureContext) {
        !coi.quiet && console.log("COOP/COEP Service Worker not registered, a secure context is required.");
        return;
    }
    // In some environments (e.g. Chrome incognito mode) this won't be available
    if (n.serviceWorker) n.serviceWorker.register(window.document.currentScript.src).then(function(registration) {
        coi.quiet, console.log("COOP/COEP Service Worker registered", registration.scope);
        registration.addEventListener("updatefound", function() {
            !coi.quiet && console.log("Reloading page to make use of updated COOP/COEP Service Worker.");
            coi.doReload();
        });
        // If the registration is active, but it's not controlling the page
        if (registration.active && !n.serviceWorker.controller) {
            !coi.quiet && console.log("Reloading page to make use of COOP/COEP Service Worker.");
            coi.doReload();
        }
    }, function(err) {
        !coi.quiet && console.error("COOP/COEP Service Worker failed to register:", err);
    });
})();

})();
