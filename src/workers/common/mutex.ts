// Mutex based on https://github.com/tc39/proposal-ecmascript-sharedmem/blob/main/test-html/sharedMemSimpleMutex.js

export class Mutex {
    private readonly array: Int32Array;
    private readonly index: number;

    constructor(array: Int32Array, index: number) {
        this.array = array;
        this.index = index;
    }

    acquire() {
        let c: number;
        if ((c = Atomics.compareExchange(this.array, this.index, 0, 1)) !== 0) {
            do {
                if (c == 2 || Atomics.compareExchange(this.array, this.index, 1, 2) !== 0) {
                    Atomics.wait(this.array, this.index, 2);
                }
            } while ((c = Atomics.compareExchange(this.array, this.index, 0, 2)) !== 0);
        }
    }

    release() {
        const value = Atomics.sub(this.array, this.index, 1);
        if (value !== 1) {
            Atomics.store(this.array, this.index, 0);
            Atomics.notify(this.array, this.index, 1);
        }
    }
}
