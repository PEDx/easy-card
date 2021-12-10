
export class Storage {
  _storage: globalThis.Storage;
  constructor() {
    this._storage = window.localStorage;
  }
  set<T>(key: string, data: T) {
    this._storage.setItem(key, JSON.stringify(data));
  }
  get<T>(key: string): T {
    const str = this._storage.getItem(key) || '""';
    return JSON.parse(str) as T;
  }
}
