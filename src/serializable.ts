export const getSerialId = Symbol('getSerialId');
export const serialize = Symbol('serialize');
export const deserialize = Symbol('deserialize');

export interface Serializable<Serialized> {
    [getSerialId]: () => string;
    [serialize]: () => Serialized;
    [deserialize]: (data: Serialized) => void;
}

const serializables: Record<string, new () => Serializable<unknown>> = {};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const serializable = (identifier: string) => (target: new () => Serializable<any>) => {
    serializables[identifier] = target;
};

export const isSerializable = (object: object) => {
    return typeof object[serialize] === 'function';
};

interface TestSerialized {
    test: number;
}

const SERIAL_ID_TEST = 'test';

@serializable(SERIAL_ID_TEST)
class Test implements Serializable<TestSerialized> {

    test: number;

    constructor(test: number = 0) {
        this.test = test;
    }

    [getSerialId]() {
        return SERIAL_ID_TEST;
    }

    [serialize](): TestSerialized {
        return {
            test: this.test
        };
    }

    [deserialize](data: TestSerialized) {
        this.test = data.test;
    }
}

const test = new Test(10);

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

export const deserializeState = <State>(data: any): State => {
    if (Array.isArray(data)) {
        return data.map((value) => deserializeState(value)) as any;
    } else if (typeof data === 'object' && data !== null) {
        if (typeof data.__serialId__ === 'string') {
            const {__serialId__: id, ...serialized} = data;

            const SerializableClass = serializables[id];
            if (!SerializableClass) {
                console.warn(`Unknown seriazable ID "${id}"`);
            }

            const state = new SerializableClass();
            state[deserialize](serialized);
            return state as any;
        } else {
            const state: any = {};
            for (const [key, value] of Object.entries(data)) {
                state[key] = deserializeState(value);
            }
            return state;
        }
    } else {
        return data as any;
    }
};

/* eslint-enable @typescript-eslint/no-explicit-any */

console.log(serializeState({q: test}), deserializeState(serializeState({q: test})));
