import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES, BASE_URL } from './api-routes';
import {
  SpacecraftResponse,
  SpaceCraftsRequestParams,
  SpaceCraftsRequestPayload,
  SpacecraftsResponse,
} from './types';
import { handleBody } from './utils';
import { CARDS_PER_PAGE } from '../components/cards-list/cards-list.constants';
import { RequestMethod } from './api-constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 7777,
});

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery,
  endpoints: (builder) => ({
    getCards: builder.query<SpacecraftsResponse, SpaceCraftsRequestParams>({
      query: ({ name, pageNumber }) => {
        const payload: SpaceCraftsRequestPayload = {
          name,
          registry: '',
          status: '',
        };
        const params = { pageNumber, pageSize: CARDS_PER_PAGE };

        return {
          url: API_ROUTES.STAR_SHIPS,
          body: handleBody(payload),
          params,
          method: RequestMethod.POST,
        };
      },
    }),
    getCardDetails: builder.query<SpacecraftResponse, string>({
      query: (uid) => ({
        url: API_ROUTES.STAR_SHIP,
        params: { uid },
        method: RequestMethod.GET,
      }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardDetailsQuery,
  useLazyGetCardsQuery,
} = rootApi;
