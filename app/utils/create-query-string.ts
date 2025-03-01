import { isNullable } from './validators';

export type QueryObject = Record<
  string,
  string | number | boolean | undefined | null
>;

/**
 * Constructs a query string from an object:
 *
 * ```ts
 * const query = createQueryString({ hello: world, age: 5, location: undefined })
 *
 * console.log(query) // ?hello=world&age=5
 * ```
 *
 * Nullish values (`null` & `undefined`) are omitted.
 *
 * Note: Returns an empty string for nullish argument.
 * Note: includes `?` symbol at the beginning.
 */
export function createQueryString(params?: QueryObject): string {
  if (isNullable(params)) {
    return '';
  }

  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (isNullable(value)) {
      continue;
    }

    query.set(key, value.toString());
  }

  const queryString = query.toString();

  return queryString.length > 0 ? `${queryString}` : '';
}
