import { Show } from '../show/show';
import { Skeleton } from '../skeleton/skeleton';
import { Country } from '../types/countries';
import { CountryRow } from '../country-row/country-row';
import { ArrowButton } from '../arrow-button/arrow-button';
import { LOCALE_KEY, useLocalStorage } from '../../hooks';
import { useState } from 'react';
import {
  callbackSortByName,
  callbackSortByPopulation,
  getSortCountries,
  SortCallback,
} from '../../utils.ts';

interface Props {
  countries: Country[] | null;
  loading: boolean;
}

export function CountryTable({ countries, loading }: Props) {
  const { storedValue, setStoredValue } = useLocalStorage<
    Country['name']['common'][]
  >(LOCALE_KEY.VISITED_COUNTRIES, []);

  const [sortCallback, setSortCallback] = useState<SortCallback | null>(null);

  const sortedCountries = getSortCountries(sortCallback, countries);

  const renderCountry = () => {
    if (sortedCountries) {
      return sortedCountries.map((country) => (
        <CountryRow
          key={country.name.common}
          country={country}
          visitedCountries={storedValue}
          setVisitedCountries={setStoredValue}
        />
      ));
    }

    return null;
  };

  return (
    <Show condition={loading} fallback={<Skeleton amountElements={10} />}>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-sky-100">
          <tr className="h-8 text-xs">
            <th className="border border-gray-300">Visited</th>
            <th className="border border-gray-300">Flag</th>
            <th className="border border-gray-300">
              <div className="mx-auto">
                Name
                <ArrowButton
                  sortCallback={callbackSortByName}
                  setSortCallback={setSortCallback}
                />
              </div>
            </th>
            <th className="border border-gray-300">
              <div className="mx-auto">
                Population
                <ArrowButton
                  sortCallback={callbackSortByPopulation}
                  setSortCallback={setSortCallback}
                />
              </div>
            </th>
            <th className="border border-gray-300">Region</th>
          </tr>
        </thead>
        <tbody>{renderCountry()}</tbody>
      </table>
    </Show>
  );
}
