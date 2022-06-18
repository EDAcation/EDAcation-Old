export const addDebugLogging = (name: string, obj: object) => {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'function') {
            obj[key] = (...args: unknown[]) => {
                console.debug(`[${name}.${key} args]`, ...args);
                try {
                    const result = value(...args);
                    console.debug(`[${name}.${key} result]`, result);
                    return result;
                } catch (err) {
                    console.debug(`[${name}.${key} error]`, err);
                    throw err;
                }
            };
        } else if (typeof value === 'object' && value) {
            obj[key] = addDebugLogging(name, value);
        }
    }
    return obj;
};
