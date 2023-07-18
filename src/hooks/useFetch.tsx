import { useEffect, useState } from 'react';

export function useFetch<T, K>(initialState: K, fetcher: (args: T) => Promise<K>, args: T) {
  const [data, setData] = useState<K>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!args) {
      setData(initialState);
      return;
    }

    setIsFetching(true);
    fetcher(args)
      .then((res) => setData(res))
      .finally(() => setIsFetching(false));
  }, [args, fetcher]);

  return { data, isFetching };
}
