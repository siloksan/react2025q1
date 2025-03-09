import { useCallback } from 'react';

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBox({ setSearchTerm }: Props) {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const searchTerm = formData.get('country_name');

      if (typeof searchTerm === 'string') {
        setSearchTerm(searchTerm);
      }
    },
    [setSearchTerm]
  );

  return (
    <div className="flex items-center gap-5">
      <label
        htmlFor="country_name"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Country
      </label>
      <form
        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-500"
        onSubmit={handleSubmit}
      >
        <input
          id="country_name"
          name="country_name"
          type="text"
          placeholder="country"
          className="min-w-[200px] grow text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
          autoComplete="on"
        />
        <button
          type="submit"
          className="h-8 rounded-r-md border-l-2 border-gray-300 px-3 text-[14px] text-gray-900 hover:bg-gray-300"
        >
          Search
        </button>
      </form>
    </div>
  );
}
