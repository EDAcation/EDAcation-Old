const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

        next();

        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    });

    app.use(createProxyMiddleware("/graphvizlib.wasm", {
        target: "https://unpkg.com",
        changeOrigin: true,
        pathRewrite: {
            "^/graphvizlib.wasm": "/@hpcc-js/wasm@1.12.8/dist/graphvizlib.wasm",
        },
    }));

    app.use(createProxyMiddleware("/graphviz/@hpcc-js/wasm", {
        target: "https://unpkg.com",
        changeOrigin: true,
        pathRewrite: {
            "^/graphviz/@hpcc-js/wasm": "/@hpcc-js/wasm@1.12.8/dist",
        },
    }));
};
