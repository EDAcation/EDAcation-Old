export const BLOCK_SIZE = 16 * 1024;

export const INDEX_FS_LOCK = 0;
export const INDEX_WORKER_LOCK = 1;
export const INDEX_WORKER_NOTIFY = 2;
export const INDEX_DATA = 3;

// Shared buffer consists of three int32 lock fields and the data field.
// The data field consists of a uint8 status code and the data itself.
// The largest data transfered is the buffer for the read operation, which has a maxiumum length equal to the block size.
// The shared buffer is used by both uint8 and int32 typed arrays, so the length has to be a multiple of 4 (for int32).
export const SHARED_BUFFER_LENGTH = (INDEX_DATA + 1) * 4 + BLOCK_SIZE;

export type Operation = 'readdir'| 'mknod' | 'rmdir' | 'unlink' | 'stat' | 'read' | 'truncate' | 'write';
