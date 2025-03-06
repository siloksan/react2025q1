import { Show } from '../show/show';
import { Skeleton } from '../skeleton/skeleton';
import { Country } from '../types/countries';
import { CountryRow } from '../country-row/country-row';
import { ArrowButton } from '../arrow-button/arrow-button';
import { LOCALE_KEY, useLocalStorage } from '../../hooks';

interface Props {
  countries: Country[] | null;
  loading: boolean;
  sortCountries: (callback: (a: Country, b: Country) => number) => void;
}

export function CountryTable({ countries, loading, sortCountries }: Props) {
  const { storedValue, setStoredValue } = useLocalStorage<
    Country['name']['common'][]
  >(LOCALE_KEY.VISITED_COUNTRIES, []);

  const renderCountry = () => {
    if (countries) {
      return countries.map((country) => (
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

  const callbackSortByName = (a: Country, b: Country) => {
    return a.name.common.localeCompare(b.name.common);
  };

  const callbackSortByPopulation = (a: Country, b: Country) => {
    return a.population - b.population;
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
                  sortCountries={sortCountries}
                  sortCallback={callbackSortByName}
                />
              </div>
            </th>
            <th className="border border-gray-300">
              <div className="mx-auto">
                Population
                <ArrowButton
                  sortCountries={sortCountries}
                  sortCallback={callbackSortByPopulation}
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
