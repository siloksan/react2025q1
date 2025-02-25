// import { useStorage } from './use-storage';
// import { useQueryState } from './use-query-state';
// import { Mock } from 'vitest';
// import { renderHook, act } from '@testing-library/react';
// import { QUERY_KEYS } from '../constants/query-keys';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn(),
//   usePathname: vi.fn(),
//   useSearchParams: vi.fn(),
// }));

// vi.mock('./use-storage', () => ({
//   useStorage: vi.fn(),
// }));

// describe('useQueryState', () => {
//   const setValueInStorage = vi.fn();
//   const push = vi.fn();
//   const queryValue = 'test';
//   const query = { [QUERY_KEYS.NAME]: queryValue };
//   const pathName = vi.fn();

//   beforeEach(() => {
//     (useStorage as Mock).mockReturnValue({
//       setValueInStorage,
//     });

//     (useRouter as Mock).mockReturnValue({
//       push,
//     });

//     (usePathname as Mock).mockReturnValue(pathName);

//     (useSearchParams as Mock).mockReturnValue(new URLSearchParams(query));
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should initialize with searchParams and setQueryValue', () => {
//     const { result } = renderHook(() => useQueryState());

//     expect(result.current.searchParams.get(QUERY_KEYS.NAME)).toBe(queryValue);
//   });

//   it('should set query value and update local storage', () => {
//     const { result } = renderHook(() => useQueryState());
//     const queryValue = 'test';

//     act(() => {
//       result.current.setQueryValue([
//         { key: QUERY_KEYS.NAME, value: queryValue },
//       ]);
//     });

//     expect(setValueInStorage).toHaveBeenCalledWith(QUERY_KEYS.NAME, queryValue);
//   });

//   it('should remove query value and update local storage', () => {
//     const { result } = renderHook(() => useQueryState());

//     act(() => {
//       result.current.setQueryValue([{ key: QUERY_KEYS.NAME, value: '' }]);
//     });

//     expect(setValueInStorage).toHaveBeenCalledWith(QUERY_KEYS.NAME, '');
//   });

//   it('should redirect with new path and query', () => {
//     const { result } = renderHook(() => useQueryState());
//     const newPathName = '/new-path';

//     act(() => {
//       result.current.redirectWithQuery(newPathName);
//     });

//     expect(push).toHaveBeenCalledWith(
//       `${newPathName}?${new URLSearchParams(query).toString()}`
//     );
//   });
// });
