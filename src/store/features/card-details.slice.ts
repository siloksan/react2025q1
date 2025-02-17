import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Spacecraft } from '../../api/types';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store.types';

export interface CardDetailsState {
  value: Spacecraft | null;
}

const initialState: CardDetailsState = {
  value: null,
};

export const cardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    saveDetails: (state, action: PayloadAction<Spacecraft>) => {
      state.value = action.payload;
    },
    removeDetails: (state) => {
      state.value = null;
    },
  },

  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<AppState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({
        ...state,
        ...payload.cardDetails,
      })
    );
  },
});

export const { saveDetails, removeDetails } = cardDetailsSlice.actions;
