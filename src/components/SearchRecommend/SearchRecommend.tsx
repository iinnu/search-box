import { Container, Inner, List, ListItem } from './SearchRecommend.style';
import { Text } from '@/components/common/Text';
import { Sick } from '@/types';

export function SearchRecommend({ data, selected }: { data: Sick[]; selected: number }) {
  return (
    <Container>
      <Inner>
        <Text color="gray" size="13px">
          추천 검색어
        </Text>
        <List>
          {data?.length === 0 && <Text color="gray">검색어 없음</Text>}
          {data?.map((item, index) => (
            <ListItem key={item.sickCd} $selected={selected === index}>
              {item.sickNm}
            </ListItem>
          ))}
        </List>
      </Inner>
    </Container>
  );
}
