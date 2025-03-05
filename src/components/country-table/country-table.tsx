import { useEffect, useState } from 'react';
import { getCountries } from '../../api/get-countries';
import { Show } from '../show/show';
import { Skeleton } from '../skeleton/skeleton';
import { Country } from '../types/countries';
import { CountryRow } from '../country-row/country-row';

export function CountryTable() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await getCountries();
        setCountries(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const renderCountry = () => {
    if (countries) {
      return countries.map((country) => (
        <CountryRow key={country.name.common} country={country} />
      ));
    }

    return null;
  };

  return (
    <Show condition={loading} fallback={<Skeleton amountElements={10} />}>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-sky-100">
          <tr className="h-8 text-xs">
            <th className="border border-gray-300">Flag</th>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Population</th>
            <th className="border border-gray-300">Region</th>
          </tr>
        </thead>
        <tbody>{renderCountry()}</tbody>
      </table>
    </Show>
  );
}
