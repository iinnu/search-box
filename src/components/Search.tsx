import { useEffect, useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';
import { getRecommendedKeywords } from '@/api/search';
import { useDebounce } from '@/hooks/useDebounce';
import { Sick } from '@/types';

export function Search() {
  const [keyword, setKeyword] = useState('');
  const [recommend, setRecommend] = useState<Sick[]>([]);

  const fetchRecommend = async (value: string) => {
    if (!value) {
      setRecommend([]);
      return;
    }
    console.info('calling api');
    const response = await getRecommendedKeywords(value);
    setRecommend(response);
  };

  const debouncedFetch = useDebounce(fetchRecommend, 200);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  useEffect(() => {
    debouncedFetch(keyword);
  }, [keyword]);

  return (
    <div>
      <SearchForm keyword={keyword} onChange={handleKeywordChange} />
      <SearchRecommend recommend={recommend} />
    </div>
  );
}
