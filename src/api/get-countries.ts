export async function getCountries() {
  try {
    return await fetch('https://restcountries.com/v3.1/all').then((res) =>
      res.json()
    );
  } catch (error) {
    console.error(error);
  }
}
