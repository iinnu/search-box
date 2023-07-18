type CacheMapKey = string;
type CacheMapData<T> = { data: T; validTime: number };

export class CacheMap<K> {
  private span = 60000;
  private cache: Map<CacheMapKey, CacheMapData<K>>;

  constructor(span?: number) {
    if (span) {
      this.span = span;
    }
    this.cache = new Map<CacheMapKey, CacheMapData<K>>();
  }

  private getValidTime() {
    return new Date().getTime() + this.span;
  }

  private isExpiredData(validTime: number) {
    return new Date().getTime() > validTime;
  }

  set(key: CacheMapKey, data: K) {
    this.cache.set(key, { data, validTime: this.getValidTime() });
  }

  get(key: CacheMapKey) {
    const data = this.cache.get(key);

    if (data && this.isExpiredData(data.validTime)) {
      this.remove(key);
    }

    return data;
  }

  remove(key: CacheMapKey) {
    this.cache.delete(key);
  }
}
