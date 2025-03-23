import { useState } from 'react';
import { Country } from '../types/countries';
import { SortCallback } from '../../utils.ts';

interface Props {
  sortCallback: (a: Country, b: Country) => number;
  setSortCallback: React.Dispatch<React.SetStateAction<SortCallback | null>>;
}
export function ArrowButton({ setSortCallback, sortCallback }: Props) {
  const [rotated, setRotated] = useState(false);

  const handleArrowClick = () => {
    setRotated((prev) => !prev);
    setSortCallback((prevCallback: SortCallback | null) => {
      if (!prevCallback) return sortCallback;
      return (a: Country, b: Country) => prevCallback(b, a);
    });
  };

  return (
    <button type="button" className="ml-2" onClick={handleArrowClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ease-in-out ${rotated ? 'rotate-180' : ''}`}
      >
        <path
          d="M12 20V4M5 11L12 4L19 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
