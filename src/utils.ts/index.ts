import { Country } from '../components/types/countries';
import { REGIONS, Regions } from '../constants/regions';

export type SortCallback = (a: Country, b: Country) => number;

export function getSortCountries(
  callback: SortCallback | null,
  countries: Country[] | null
) {
  if (countries && callback) {
    return [...countries].sort(callback);
  }

  return countries;
}

export function getFilterCountries(
  region: Regions,
  initialCountries: Country[] | null
) {
  if (region === REGIONS.ALL) {
    return initialCountries;
  } else {
    return (
      initialCountries?.filter((country) => country.region === region) ?? null
    );
  }
}

export function getSearchCountries(
  searchTerm: string,
  initialCountries: Country[] | null
) {
  return (
    initialCountries?.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? null
  );
}

export function callbackSortByName(a: Country, b: Country) {
  return a.name.common.localeCompare(b.name.common);
}

export function callbackSortByPopulation(a: Country, b: Country) {
  return a.population - b.population;
}
