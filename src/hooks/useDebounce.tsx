/* eslint-disable */

import { useRef } from 'react';

export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const timerId = useRef<number | null>(null);

  const debounce = (...args: T) => {
    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      callback(...args);
      timerId.current = null;
    }, delay);
  };

  return debounce;
}
