import { createContext, ReactNode } from 'react';

import { Sick } from '@/types';
import { CacheMap } from '@/utils/cache';

export const SearchContext = createContext<CacheMap<Sick[]> | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const cache = new CacheMap<Sick[]>();

  return <SearchContext.Provider value={cache}>{children}</SearchContext.Provider>;
}
