import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Spacecraft } from '../../api/types';

export interface SelectedCardsState {
  value: Spacecraft[];
}

const initialState: SelectedCardsState = {
  value: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Spacecraft>) => {
      state.value.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<Spacecraft>) => {
      const filtered = state.value.filter(
        (item) => item.uid !== action.payload.uid
      );
      state.value = filtered;
    },
    removeAll: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { selectCard, removeCard, removeAll } = selectedCardsSlice.actions;

export const selectedCards = selectedCardsSlice.reducer;
