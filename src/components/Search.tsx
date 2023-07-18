import { useCallback, useRef, useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';
import { getRecommendedKeywords } from '@/api/search';
import { useSearchContext } from '@/context/useSearchContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useFetch } from '@/hooks/useFetch';
import { useSelectWithArrowKey } from '@/hooks/useSelectWithArrowKey';
import { Sick } from '@/types';

export function Search() {
  /* common */
  const [isRecommendVisible, setIsRecommendVisible] = useState(false);

  const toggleRecommendVisible = (value: boolean) => setIsRecommendVisible(value);

  /* SearchForm */
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  /* SearchRecommend */
  const cache = useSearchContext();
  const defferedKeyword = useDebouncedValue(keyword, 300) ?? '';
  const executeFetch = useCallback(() => getRecommendedKeywords(defferedKeyword), [defferedKeyword]);
  const { data } = useFetch<Sick[]>(executeFetch, defferedKeyword, cache);
  const [selected, handleKeydown] = useSelectWithArrowKey(data?.length);

  /* click outside of Search */
  const ref = useRef(null);
  useClickOutside(ref, () => toggleRecommendVisible(false));

  return (
    <div ref={ref}>
      <SearchForm
        keyword={keyword}
        onChange={handleKeywordChange}
        onFocus={toggleRecommendVisible}
        onKeyDown={handleKeydown}
      />
      {isRecommendVisible && <SearchRecommend data={data ?? []} selected={selected} />}
    </div>
  );
}
