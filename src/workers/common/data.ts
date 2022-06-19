const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

export class Data {

    private readonly buffer: ArrayBuffer | SharedArrayBuffer;
    private readonly dataView: DataView;
    private arrayUint8: Uint8Array;
    private readonly originalOffset: number;
    private offset: number;

    constructor(buffer: ArrayBuffer | SharedArrayBuffer, offset: number = 0) {
        this.buffer = buffer;
        this.dataView = new DataView(buffer);
        this.arrayUint8 = new Uint8Array(this.buffer);
        this.originalOffset = offset;
        this.offset = offset;
    }

    getLength() {
        return this.buffer.byteLength - this.originalOffset;
    }

    getOffset() {
        return this.offset;
    }

    setOffset(offset: number) {
        this.offset = offset;
    }

    resetOffset() {
        this.offset = this.originalOffset;
    }

    readUint8() {
        const data = this.dataView.getUint8(this.offset);
        this.offset += 1;
        return data;
    }

    readInt8() {
        const data = this.dataView.getInt8(this.offset);
        this.offset += 1;
        return data;
    }

    readUint32() {
        const data = this.dataView.getUint32(this.offset);
        this.offset += 4;
        return data;
    }

    readInt32() {
        const data = this.dataView.getInt32(this.offset);
        this.offset += 4;
        return data;
    }

    readUint8Array() {
        const length = this.readUint32();

        const data = this.arrayUint8.slice(this.offset, this.offset + length);
        this.offset += length;
        return data;
    }

    readString() {
        const array = this.readUint8Array();
        return TEXT_DECODER.decode(array);
    }

    readStringArray() {
        const length = this.readUint32();

        const array = new Array<string>(length);
        for (let i = 0; i < length; i++) {
            array[i] = this.readString();
        }
        return array;
    }

    writeUint8(data: number) {
        this.dataView.setUint8(this.offset, data);
        this.offset += 1;
    }

    writeInt8(data: number) {
        this.dataView.setInt8(this.offset, data);
        this.offset += 1;
    }

    writeUint32(data: number) {
        this.dataView.setUint32(this.offset, data);
        this.offset += 4;
    }

    writeInt32(data: number) {
        this.dataView.setInt32(this.offset, data);
        this.offset += 4;
    }

    writeUint8Array(data: Uint8Array) {
        this.writeUint32(data.byteLength);

        this.arrayUint8.set(data, this.offset);
        this.offset += data.byteLength;
    }

    writeString(data: string) {
        const array = TEXT_ENCODER.encode(data);
        this.writeUint8Array(array);
    }

    writeStringArray(data: string[]) {
        this.writeUint32(data.length);
        for (let i = 0; i < data.length; i++) {
            this.writeString(data[i]);
        }
    }

    clear() {
        this.arrayUint8.set(new Uint8Array(), this.originalOffset);
        this.resetOffset();
    }
}
