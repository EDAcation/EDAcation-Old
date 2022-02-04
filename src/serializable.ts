export const getSerialId = Symbol('getSerialId');
export const serialize = Symbol('serialize');
export const deserialize = Symbol('deserialize');

export interface Serializable<Serialized> {
    [getSerialId]: () => string;
    [serialize]: () => Serialized;
    [deserialize]: (data: Serialized, partialState: Record<string, unknown>) => void;
}

const serializables: Record<string, new () => Serializable<unknown>> = {};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const serializable = (identifier: string) => (target: new () => Serializable<any>) => {
    serializables[identifier] = target;
};

export const isSerializable = (object: Record<string | number | symbol, unknown>) => {
    return typeof object[serialize] === 'function';
};

// NOTE: It is basically impossible to keep proper typing inside these function, but the input and output state types should be correct.
/* eslint-disable @typescript-eslint/no-explicit-any */

export const serializeState = <State>(state: State): any => {
    if (Array.isArray(state)) {
        return state.map((value) => serializeState(value)) as any;
    } else if (typeof state === 'object' && state !== null) {
        if (isSerializable(state as any)) {
            return {
                __serialId__: state[getSerialId](),
                ...state[serialize]()
            } as any;
        } else {
            const data: any = {};
            for (const [key, value] of Object.entries(state)) {
                data[key] = serializeState(value);
            }
            return data;
        }
    } else {
        return state as any;
    }
};

export const deserializeState = <State>(data: any, partialState: State): State => {
    if (Array.isArray(data)) {
        return data.map((value) => deserializeState(value, partialState)) as any;
    } else if (typeof data === 'object' && data !== null) {
        if (typeof data.__serialId__ === 'string') {
            const {__serialId__: id, ...serialized} = data;

            const SerializableClass = serializables[id];
            if (!SerializableClass) {
                console.warn(`Unknown seriazable ID "${id}".`);
            }

            const state = new SerializableClass();
            state[deserialize](serialized, partialState as any);
            return state as any;
        } else {
            const state: any = {};
            for (const [key, value] of Object.entries(data)) {
                state[key] = deserializeState(value, partialState);
            }
            return state;
        }
    } else {
        return data as any;
    }
};

/* eslint-enable @typescript-eslint/no-explicit-any */
