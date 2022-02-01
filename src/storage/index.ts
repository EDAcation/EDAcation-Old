import {StorageConstructor} from './Storage';
import {StorageType} from './StorageType';
import {StorageFSA} from './StorageFSA';

export const storageByType: Record<StorageType, StorageConstructor<unknown, unknown>> = {
    [StorageType.FILE_SYSTEM_ACCESS]: StorageFSA
};

export * from './Storage';
export * from './StorageType';
export * from './StorageFSA';
