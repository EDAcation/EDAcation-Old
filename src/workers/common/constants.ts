export const BLOCK_SIZE = 4096;

export const INDEX_FS_LOCK = 0;
export const INDEX_WORKER_LOCK = 1;
export const INDEX_WORKER_NOTIFY = 2;
export const INDEX_DATA = 3;

export const SHARED_BUFFER_LENGTH = INDEX_DATA * 4 + BLOCK_SIZE;

export type Operation = 'readdir'| 'rmdir' | 'unlink' | 'stat' | 'read' | 'write';
