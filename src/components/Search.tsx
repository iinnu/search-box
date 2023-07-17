import { useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';
import { getRecommendedKeywords } from '@/api/search';
import { Sick } from '@/types';

export function Search() {
  const [keyword, setKeyword] = useState('');
  const [recommend, setRecommend] = useState<Sick[]>([]);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    console.info('calling api');
    if (event.target.value === '') setRecommend([]);
    else getRecommendedKeywords(event.target.value).then((res) => setRecommend(res));
  };

  return (
    <div>
      <SearchForm keyword={keyword} onChange={handleKeywordChange} />
      <SearchRecommend recommend={recommend} />
    </div>
  );
}
