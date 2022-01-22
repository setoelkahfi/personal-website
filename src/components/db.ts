import Dexie, { Table } from 'dexie';
import { Mode } from './AudioPlayer';

export interface AudioFiles {
  id?: number;
  audioFileId: string,
  type: Mode,
  file: Blob
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  audioFiles!: Table<AudioFiles>; 

  constructor() {
    super('myDatabase');
    this.version(2).stores({
      audioFiles: '++id, [audioFileId+type]' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();