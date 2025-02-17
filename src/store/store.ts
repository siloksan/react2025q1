import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cardDetailsSlice, cardsListSlice } from './features';
import { AppStore } from './store.types';

const rootReducer = combineReducers({
  [cardsListSlice.name]: cardsListSlice.reducer,
  [cardDetailsSlice.name]: cardDetailsSlice.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export const wrapper = createWrapper<AppStore>(makeStore);
