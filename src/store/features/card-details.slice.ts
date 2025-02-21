import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Spacecraft } from '../../api/types';

export interface CardDetailsState {
  value: Spacecraft | null;
  isLoading: boolean;
}

const initialState: CardDetailsState = {
  value: null,
  isLoading: false,
};

export const cardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    saveDetails: (state, action: PayloadAction<Spacecraft | null>) => {
      state.value = action.payload;
    },

    setDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { saveDetails, setDetailsLoading } = cardDetailsSlice.actions;
