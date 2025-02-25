// import { useStorage } from './use-storage';

// interface NewQueries {
//   key: QueryKeys;
//   value: string;
// }

// export function useQueryState() {
//   const { setValueInStorage } = useStorage();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathName = usePathname();
//   const newSearchParams = new URLSearchParams(searchParams.toString());

//   function setQueryValue(newQueries: NewQueries[]) {
//     newQueries.forEach(({ key, value }) => {
//       if (value) {
//         newSearchParams.set(key, value);
//       } else {
//         newSearchParams.delete(key);
//       }

//       setValueInStorage(key, value);
//     });

//     router.push(`${pathName}?${newSearchParams.toString()}`);
//   }

//   function redirectWithQuery(newPathName: string) {
//     router.push(`${newPathName}?${newSearchParams.toString()}`);
//   }

//   return { searchParams: newSearchParams, setQueryValue, redirectWithQuery };
// }
