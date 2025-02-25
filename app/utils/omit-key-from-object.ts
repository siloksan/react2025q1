/**
 * Omits a key from an object.
 *
 * @param key The key to omit.
 * @param object The object to omit the key from.
 * @returns The object without the specified key.
 */
export function omitKeyFromObject<
  K extends string,
  T extends Record<K | string, unknown>,
>(key: K, object: T) {
  const { [key]: _un, ...objectWithoutKey } = object;
  return objectWithoutKey;
}
