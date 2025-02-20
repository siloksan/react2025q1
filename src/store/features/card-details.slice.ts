import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Spacecraft } from '../../api/types';

export interface CardDetailsState {
  value: Spacecraft | null;
}

const initialState: CardDetailsState = {
  value: null,
};

const cardDetailsSlice = createSlice({
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
});

export const { saveDetails, removeDetails } = cardDetailsSlice.actions;

export const cardDetails = cardDetailsSlice.reducer;
