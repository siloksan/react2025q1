import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SpacecraftsResponse } from '../../api/types';

export interface CardsList {
  value: SpacecraftsResponse;
}

const initialState: CardsList = {
  value: {
    page: { pageNumber: 0, pageSize: 0, totalElements: 0, totalPages: 0 },
    spacecrafts: [],
  },
};

const cardsListSlice = createSlice({
  name: 'cardsList',
  initialState,
  reducers: {
    setCardsList: (state, action: PayloadAction<SpacecraftsResponse>) => {
      state.value = action.payload;
    },
  },
});

export const { setCardsList } = cardsListSlice.actions;

export const cardsList = cardsListSlice.reducer;
