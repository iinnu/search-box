import { useEffect, useState } from 'react';

import { CacheMap } from '@/utils/cache';

export function useFetch<K>(fetcher: () => Promise<K>, queryKey: string, cache?: CacheMap<K>) {
  const [data, setData] = useState<K>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (cache) {
      const cachedData = cache.get(queryKey);

      if (cachedData) {
        console.info('key: ', queryKey, 'cache: ', cachedData);
        setData(cachedData.data);
        return;
      }
    }

    setIsFetching(true);
    fetcher()
      .then((res) => {
        setData(res);

        if (cache) {
          cache.set(queryKey, res);
        }
      })
      .finally(() => setIsFetching(false));
  }, [fetcher, cache]);

  return { data, isFetching };
}
