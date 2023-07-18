import { useRef, useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';
import { getRecommendedKeywords } from '@/api/search';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useFetch } from '@/hooks/useFetch';
import { useSelectWithArrowKey } from '@/hooks/useSelectWithArrowKey';
import { Sick } from '@/types';

export function Search() {
  /* SearchForm */
  const [keyword, setKeyword] = useState('');
  const [isRecommendVisible, setIsRecommendVisible] = useState(false);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  /* SearchRecommend */
  const defferedKeyword = useDebouncedValue(keyword, 300) ?? '';
  const { data } = useFetch<string, Sick[]>([], getRecommendedKeywords, defferedKeyword);
  const [selected, handleKeydown] = useSelectWithArrowKey(data?.length);

  /* common */
  const toggleRecommendVisible = (value: boolean) => setIsRecommendVisible(value);

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
