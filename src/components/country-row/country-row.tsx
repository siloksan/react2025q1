import { Country } from '../types/countries';

export function CountryRow({ country }: { country: Country }) {
  const { name, population, region, flags } = country;
  const flagAlt = flags.alt ?? `Flag of ${name.common}`;

  return (
    <tr className="h-8 text-xs">
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
