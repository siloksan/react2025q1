import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedCardsSlice } from './features';

const rootReducer = combineReducers({
  [selectedCardsSlice.name]: selectedCardsSlice.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
