import { Sick } from '@/types';

export function SearchRecommend({ recommend }: { recommend: Sick[] }) {
  return (
    <div>
      <div>최근 검색어</div>
      <div>
        {recommend.map((item) => (
          <div key={item.sickCd}>{item.sickNm}</div>
        ))}
      </div>
    </div>
  );
}
