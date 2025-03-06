import { useState } from 'react';
import { Country } from '../types/countries';

interface Props {
  sortCountries: (callback: (a: Country, b: Country) => number) => void;
  sortCallback: (a: Country, b: Country) => number;
}
export function ArrowButton({ sortCountries, sortCallback }: Props) {
  const [rotated, setRotated] = useState(false);

  const handleArrowClick = () => {
    setRotated((prev) => !prev);

    if (rotated) {
      sortCountries(sortCallback);
    } else {
      sortCountries((a, b) => sortCallback(b, a));
    }
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
