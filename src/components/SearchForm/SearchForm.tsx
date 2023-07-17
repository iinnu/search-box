import { FaSearch } from 'react-icons/fa';

import { Button, Input, InputBase, InputWithIcon } from './SearchForm.style';

interface SearchFormProps {
  keyword: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function SearchForm({ keyword, onChange }: SearchFormProps) {
  return (
    <form>
      <InputBase>
        <InputWithIcon>
          <FaSearch />
          <Input placeholder="질환명을 입력해주세요." value={keyword} onChange={onChange} />
        </InputWithIcon>
        <Button>검색</Button>
      </InputBase>
    </form>
  );
}
