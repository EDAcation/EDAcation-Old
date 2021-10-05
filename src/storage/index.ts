import {Storage} from './Storage';
import {StorageFSA} from './StorageFSA';

export * from './Storage';
export * from './StorageFSA';

export enum StorageType {
    FILE_SYSTEM_ACCESS = 'FILE_SYSTEM_ACCESS'
}

export const storageByType: Record<StorageType, new () => Storage<unknown, unknown>> = {
    [StorageType.FILE_SYSTEM_ACCESS]: StorageFSA
};

export const storageTypeByClass = Object.entries(storageByType).reduce((prev, [key, value]) => {
    prev[key] = value;
    return prev;
}, {});
