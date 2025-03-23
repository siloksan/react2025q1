import { memo, useState } from 'react';
import { Country } from '../types/countries';

interface Props {
  country: Country;
  visitedCountries: Country['name']['common'][];
  setVisitedCountries: (string: Country['name']['common'][]) => void;
}

function CountryRow({ country, visitedCountries, setVisitedCountries }: Props) {
  const { name, population, region, flags } = country;
  const flagAlt = flags.alt ?? `Flag of ${name.common}`;
  const isChecked = visitedCountries?.includes(name.common) ?? false;

  const [checked, setChecked] = useState(isChecked);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (visitedCountries.includes(name.common)) {
      const newVisitedCountries = visitedCountries.filter(
        (country) => country !== name.common
      );

      setVisitedCountries(newVisitedCountries);
    } else {
      setVisitedCountries([...visitedCountries, name.common]);
    }
  };

  return (
    <tr className={`h-8 ${checked && 'bg-green-200'} text-xs`}>
      <td className="max-w-[100px] border border-gray-300 text-center align-middle">
        <input
          name={name.common}
          id={name.common}
          type="checkbox"
          onChange={handleCheckbox}
          checked={checked}
        />
      </td>
      <td className="border border-gray-300 text-center align-middle">
        <img
          src={flags.svg}
          alt={flagAlt}
          className="h-full max-h-6 w-full object-contain"
        />
      </td>
      <td className="max-w-[100px] border border-gray-300 text-center align-middle">
        {name.common}
      </td>
      <td className="border border-gray-300 text-center align-middle">
        {population}
      </td>
      <td className="border border-gray-300 text-center align-middle">
        {region}
      </td>
    </tr>
  );
}

export const MemoizedCountryRow = memo(CountryRow);
