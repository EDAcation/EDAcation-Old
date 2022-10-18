const DEBUG_NAMESPACES = {
    fs: true
};

export const debug = (namespace: string, ...args: unknown[]) => {
    if (DEBUG_NAMESPACES[namespace]) {
        console.debug(...args);
    }
};

export const addDebugLogging = (namespace: string, name: string, obj: object) => {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'function') {
            obj[key] = (...args: unknown[]) => {
                debug(namespace, `[${name}.${key} args]`, ...args);
                try {
                    const result = value(...args);
                    debug(namespace, `[${name}.${key} result]`, result);
                    return result;
                } catch (err) {
                    debug(namespace, `[${name}.${key} error]`, err);
                    throw err;
                }
            };
        } else if (typeof value === 'object' && value) {
            obj[key] = addDebugLogging(namespace, name, value);
        }
    }
    return obj;
};
