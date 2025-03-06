import { useEffect, useRef, useState } from 'react';
import { ControlBar } from './components/control-bar/control-bar';
import { CountryTable } from './components/country-table/country-table';
import { Country } from './components/types/countries';
import { getCountries } from './api/get-countries';
import { REGIONS, Regions } from './constants/regions';

export function App() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);
  const initialCountries = useRef<Country[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await getCountries();
        initialCountries.current = response;
        setCountries(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleRegionChange = (region: Regions) => {
    if (region === REGIONS.ALL) {
      setCountries(initialCountries.current);
    } else {
      const filteredCountries =
        initialCountries.current?.filter(
          (country) => country.region === region
        ) ?? null;

      setCountries(filteredCountries);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filteredCountries =
      initialCountries.current?.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? null;

    setCountries(filteredCountries);
  };

  const sortCountries = (callback: (a: Country, b: Country) => number) => {
    const sortedCountries = countries ? [...countries].sort(callback) : null;

    setCountries(sortedCountries);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white">
        <header className="flex min-h-20 items-center justify-center bg-emerald-200">
          <h2 className="text-center text-4xl font-semibold">
            React Performance
          </h2>
        </header>
        <ControlBar
          handleRegionChange={handleRegionChange}
          handleSearch={handleSearch}
        />
        <CountryTable
          countries={countries}
          loading={loading}
          sortCountries={sortCountries}
        />
      </div>
    </div>
  );
}
