import { useState } from 'react';

import { getRecommendedKeywords } from './api/search';
import { Sick } from './types';

function App() {
  const [keyword, setKeyword] = useState('');
  const [recommended, setRecommended] = useState<Sick[]>([]);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    console.info('calling api');
    getRecommendedKeywords(event.target.value).then((res) => setRecommended(res));
  };

  return (
    <div>
      <form>
        <input placeholder="병명 검색" value={keyword} onChange={handleKeywordChange} />
      </form>
      <div>최근 검색어</div>
      <div>
        {recommended.map((item) => (
          <div key={item.sickCd}>{item.sickNm}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
