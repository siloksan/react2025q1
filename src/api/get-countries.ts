import { Country } from '../components/types/countries';

export async function getCountries(): Promise<Country[]> {
  try {
    return await fetch('https://restcountries.com/v3.1/all').then((res) =>
      res.json()
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
