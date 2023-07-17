import { Container, Inner, List, ListItem } from './SearchRecommend.style';
import { getRecommendedKeywords } from '@/api/search';
import { Text } from '@/components/common/Text';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useFetch } from '@/hooks/useFetch';
import { Sick } from '@/types';

export function SearchRecommend({ keyword }: { keyword: string }) {
  const defferedKeyword = useDebouncedValue(keyword, 300) ?? '';
  const { data } = useFetch<string, Sick[]>([], getRecommendedKeywords, defferedKeyword);

  return (
    <Container>
      <Inner>
        <Text color="gray" size="13px">
          추천 검색어
        </Text>
        <List>
          {data?.length === 0 && <Text color="gray">검색어 없음</Text>}
          {data?.map((item) => <ListItem key={item.sickCd}>{item.sickNm}</ListItem>)}
        </List>
      </Inner>
    </Container>
  );
}
