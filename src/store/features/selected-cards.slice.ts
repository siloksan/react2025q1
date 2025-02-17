import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Spacecraft } from '../../api/types';

export interface SelectedCardsState {
  value: Spacecraft[];
}

const initialState: SelectedCardsState = {
  value: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Spacecraft>) => {
      state.value.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<Spacecraft['uid']>) => {
      const filtered = state.value.filter(
        (item) => item.uid !== action.payload
      );
      state.value = filtered;
    },
    removeAll: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { selectCard, removeCard, removeAll } = selectedCardsSlice.actions;
