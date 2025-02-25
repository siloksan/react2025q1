// import { API_ROUTES } from '@/api/routes';
// import { SpaceCraftsRequestPayload, SpacecraftsResponse } from '@/api/types';
// import { requestHandler } from '@/api/utils';
// import { CARDS_PER_PAGE, PAGE_OFFSET } from '@/constants/view';
// import { QueryObject } from '@/utils';

// interface Args {
//   name: string;
//   page: number;
// }

// export async function getCards({ name, page }: Args) {
//   const payload: SpaceCraftsRequestPayload = {
//     name,
//     registry: '',
//     status: '',
//   };
//   const pageNumber = page - PAGE_OFFSET;
//   const query: QueryObject = { pageNumber, pageSize: CARDS_PER_PAGE };

//   return await requestHandler<SpacecraftsResponse>({
//     endpoint: API_ROUTES.CARDS,
//     payload,
//     query,
//   });
// }
