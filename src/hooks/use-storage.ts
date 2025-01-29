// import { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router';
// import { LOCALE_STORAGE_KEYS } from '../constants/storage-keys';

// const initialQueryParamsString = new URLSearchParams(window.location.search);

// export default function useStorage() {
//   const [searchTerm, setSearchTerm] = useState<string>(
//     localStorage.getItem(LOCALE_STORAGE_KEYS.SEARCH_TERM) ?? ''
//   );

//   const [queryParams, setQueryParams] = useState<string>(
//     localStorage.getItem(LOCALE_STORAGE_KEYS.QUERY_PARAMS) ?? ''
//   );

//   const [storageData, setStorageData] = useState<string>(
//     storageService.getData('searchParams') || ''
//   );
//   const [searchParams, setSearchParams] = useSearchParams();

//   const firstLoad = () => {
//     if (searchParams.size > 0) {
//       const paramsString = searchParams.toString();
//       setStorageData(paramsString);
//       storageService.setData('searchParams', paramsString);
//     } else if (storageData) {
//       const params = new URLSearchParams(storageData);
//       setSearchParams(params);
//     }
//   };

//   const savedCallback = useRef(firstLoad);

//   useEffect(() => {
//     savedCallback.current();
//   }, []);

//   const setKeyAndValue = (key: string, value: string) => {
//     if (value) {
//       searchParams.set(key, value);
//     } else {
//       searchParams.delete(key);
//     }
//     setSearchParams(searchParams);
//     setStorageData(searchParams.toString());
//     storageService.setData('searchParams', searchParams.toString());
//   };

//   return { searchParams, setKeyAndValue };
// }
