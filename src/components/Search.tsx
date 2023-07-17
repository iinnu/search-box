import { useRef, useState } from 'react';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchRecommend } from './SearchRecommend/SearchRecommend';
import { useClickOutside } from '@/hooks/useClickOutside';

export function Search() {
  const ref = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [isRecommendVisible, setIsRecommendVisible] = useState(false);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const toggleRecommendVisible = () => setIsRecommendVisible(true);

  useClickOutside(ref, () => {
    setIsRecommendVisible(false);
  });

  return (
    <div ref={ref}>
      <SearchForm keyword={keyword} onChange={handleKeywordChange} onFocus={toggleRecommendVisible} />
      {isRecommendVisible && <SearchRecommend keyword={keyword} />}
    </div>
  );
}
