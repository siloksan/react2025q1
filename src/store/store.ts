import { configureStore } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { cardDetailsSlice, cardsListSlice } from './features';
import { AppStore } from './store.types';

const rootReducer = {
  [cardsListSlice.name]: cardsListSlice.reducer,
  [cardDetailsSlice.name]: cardDetailsSlice.reducer,
};

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [`${cardsListSlice.name}`, `${cardDetailsSlice.name}`],
        })
      ),
  })
);

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
