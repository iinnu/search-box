import { useEffect, useState } from 'react';

import { CacheMap } from '@/utils/cache';

export function useFetch<K>(fetcher: () => Promise<K>, queryKey?: string, cache?: CacheMap<K>) {
  const [data, setData] = useState<K>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (cache && queryKey) {
      const cachedData = cache.get(queryKey);

      if (cachedData) {
        setData(cachedData.data);
        return;
      }
    }

    setIsFetching(true);
    fetcher()
      .then((res) => {
        setData(res);

        if (cache && queryKey) {
          cache.set(queryKey, res);
        }
      })
      .finally(() => setIsFetching(false));
  }, [fetcher, cache, queryKey]);

  return { data, isFetching };
}
