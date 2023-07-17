import { FaSearch } from 'react-icons/fa';

import { Button, Input, InputBase, InputWithIcon } from './SearchForm.style';

interface SearchFormProps {
  keyword: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}
export function SearchForm({ keyword, onChange, onFocus }: SearchFormProps) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <InputBase>
        <InputWithIcon>
          <FaSearch />
          <Input placeholder="질환명을 입력해주세요." value={keyword} onChange={onChange} onFocus={onFocus} />
        </InputWithIcon>
        <Button>검색</Button>
      </InputBase>
    </form>
  );
}
