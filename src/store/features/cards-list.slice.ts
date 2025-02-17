import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SpacecraftsResponse } from '../../api/types';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store.types';

interface CardsState {
  value: SpacecraftsResponse | null;
  isLoading: boolean;
}

const initialState: CardsState = {
  value: null,
  isLoading: false,
};

export const cardsListSlice = createSlice({
  name: 'cardsList',
  initialState,
  reducers: {
    setCardsList: (state, action: PayloadAction<SpacecraftsResponse>) => {
      state.value = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<AppState, typeof HYDRATE>>(
      HYDRATE,
      (_, { payload }) => payload.cardsList
    );
  },
});

export const { setCardsList, setLoading } = cardsListSlice.actions;
