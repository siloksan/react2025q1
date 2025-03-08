import { useEffect, useState } from 'react';
import { ControlBar } from './components/control-bar/control-bar';
import { CountryTable } from './components/country-table/country-table';
import { Country } from './components/types/countries';
import { getCountries } from './api/get-countries';
import { REGIONS, Regions } from './constants/regions';
import { getFilterCountries, getSearchCountries } from './utils.ts';

export function App() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState<Regions>(REGIONS.ALL);
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

  const foundedCountry = getSearchCountries(searchTerm, countries);

  const filteredCountries = getFilterCountries(region, foundedCountry);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white">
        <header className="flex min-h-20 items-center justify-center bg-emerald-200">
          <h2 className="text-center text-4xl font-semibold">
            React Performance
          </h2>
        </header>
        <ControlBar setRegion={setRegion} setSearchTerm={setSearchTerm} />
        <CountryTable countries={filteredCountries} loading={loading} />
      </div>
    </div>
  );
}
