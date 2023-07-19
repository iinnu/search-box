# search-box
<!-- PROJECT LOGO -->
<div align="center">
    <img src="https://static.wanted.co.kr/images/wantedplus_event/preonboarding/infopage/intro.png" alt="Logo" width="300" height="200">

  <p align="center">
    <a href="https://clinicaltrialskorea.com/">한국임상정보</a> 메인페이지의 검색창을 클론하여 구현한 프로젝트입니다.  
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
<img src="https://github.com/iinnu/search-box/assets/55791128/13572bda-bc81-48a5-8bff-7857ccb44671" width="400px" />
<img src="https://github.com/iinnu/search-box/assets/55791128/040223c4-d21c-4b4b-8812-503dee481c2d" width="400px" />

- 입력한 키워드에 따라 추천 검색어를 확인할 수 있습니다.
- 추천 검색어를 키보드 위아래 방향키로 이동할 수 있습니다.

> 서버는 <a href="https://github.com/walking-sunset/assignment-api">assignment-api</a>에서 확인할 수 있습니다.


### Built With

![React][React.js]  
![Axios][Axios]  
![typescript][typescript]  
![styledcomponents][styledcomponents]


### Folder Distructure
<img width="296" alt="스크린샷 2023-07-13 오후 11 27 28" src="https://github.com/iinnu/search-box/assets/55791128/b9ed32bd-c71d-4320-8619-0768e617d43f">

<!-- GETTING STARTED -->
## Getting Started

### Installation and start
```
$ npm install
$ npm start
```

<!-- Detail -->
## Details

### API 호출 최적화
사용자가 검색어 입력이 끝난 시점에서 API 호출을 하는 것이 네트워크 비용을 줄일 수 있습니다.  
따라서 검색 키워드에 디바운스를 적용해서 API 호출을 최적화했습니다.
```tsx
// useDebouncedValue
export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
```
```tsx
// Search.tsx
const [keyword, setKeyword] = useState('');
const defferedKeyword = useDebouncedValue(keyword, 300) ?? '';
```

### 검색 결과 캐싱
API 요청을 보낸 적이 있는 검색 키워드에 대해서는 결과를 로컬에서 캐싱했습니다.  
- 다음과 같은 CacheMap 클래스를 작성
- `useFetch` 인자로 CacheMap 인스턴스를 받아 캐싱 적용
  - 검색어를 key로 하고 검색 결과를 value로 가짐
  - 캐싱하는 시점에서 만료 시간을 정하고 get할 때 만료 시간이 지났는지 검사해서 캐시에서 삭제
```tsx
type CacheMapKey = string;
type CacheMapData<T> = { data: T; validTime: number };

export class CacheMap<K> {
  private span = 60000;
  private cache: Map<CacheMapKey, CacheMapData<K>>;

  constructor(span?: number) {
    if (span) {
      this.span = span;
    }
    this.cache = new Map<CacheMapKey, CacheMapData<K>>();
  }

  private getValidTime() {
    return new Date().getTime() + this.span;
  }

  private isExpiredData(validTime: number) {
    return new Date().getTime() > validTime;
  }

  set(key: CacheMapKey, data: K) {
    this.cache.set(key, { data, validTime: this.getValidTime() });
  }

  get(key: CacheMapKey) {
    const data = this.cache.get(key);

    if (data && this.isExpiredData(data.validTime)) {
      this.remove(key);
    }

    return data;
  }

  remove(key: CacheMapKey) {
    this.cache.delete(key);
  }
}
```
### 키보드 이벤트
키보드 위아래 방향키를 누를 때마다 추천 검색어를 이동할 수 있도록 위해서 `useSelectWithArrowKey` 훅을 구현했습니다.  
Keydown 이벤트 객체의 key에 따라서 현재 선택된 인덱스르 조정하는 방식으로 구현했습니다.
```tsx
import { KeyboardEvent, useEffect, useState } from 'react';

export function useSelectWithArrowKey(
  maxLength: number | undefined,
): [selected: number, handler: (event: KeyboardEvent<HTMLElement>) => void] {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setSelected(-1);
  }, [maxLength]);

  const handler = (event: KeyboardEvent<HTMLElement>) => {
    if (!maxLength) return;
    if (event.nativeEvent.isComposing) return;

    if (event.key === 'ArrowUp') {
      if (selected <= 0) {
        setSelected(maxLength - 1);
      } else {
        setSelected((prev) => prev - 1);
      }
    } else if (event.key === 'ArrowDown') {
      if (selected === maxLength - 1) {
        setSelected(0);
      } else {
        setSelected((prev) => prev + 1);
      }
    }
  };

  return [selected, handler];
}
```


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Axios]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios&logoColor=#5A29E4
[reactrouter]: https://img.shields.io/badge/reactrouter-20232A?style=for-the-badge&logo=reactrouter&logoColor=CA4245
[typescript]: https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript&logoColor=3178C6
[styledcomponents]: https://img.shields.io/badge/styledcomponents-20232A?style=for-the-badge&logo=styledcomponents&logoColor=#DB7093

