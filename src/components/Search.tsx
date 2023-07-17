import { useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';

export function Search() {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  return (
    <div>
      <SearchForm keyword={keyword} onChange={handleKeywordChange} />
      <SearchRecommend keyword={keyword} />
    </div>
  );
}
