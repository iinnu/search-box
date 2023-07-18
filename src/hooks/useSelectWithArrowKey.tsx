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
