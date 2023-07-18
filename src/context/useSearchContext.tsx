import { useContext } from 'react';

import { SearchContext } from './SearchContext';

export function useSearchContext() {
  const value = useContext(SearchContext);

  if (!value) throw Error('context cannot be null!!');

  return value;
}
