import { Container, Inner, List, ListItem } from './SearchRecommend.style';
import { Text } from '@/components/common/Text';
import { Sick } from '@/types';

export function SearchRecommend({ recommend }: { recommend: Sick[] }) {
  return (
    <Container>
      <Inner>
        <Text color="gray" size="13px">
          추천 검색어
        </Text>
        <List>
          {recommend.map((item) => (
            <ListItem key={item.sickCd}>{item.sickNm}</ListItem>
          ))}
        </List>
      </Inner>
    </Container>
  );
}
