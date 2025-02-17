import { configureStore } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { cardsListSlice } from './features';
import { AppStore } from './store.types';

const rootReducer = {
  [cardsListSlice.name]: cardsListSlice.reducer,
};

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            // {
            //   subtree: `${cardsListSlice.name}.value`,
            //   cookieName: 'NEXT_LOCALE',
            //   serializationFunction: String,
            //   deserializationFunction: String,
            //   defaultState: cardsListSlice.getInitialState().value,
            // },
            // {
            //   subtree: `${cardsListSlice.name}.isLoading`,
            //   cookieName: 'NEXT_LOCALE',
            //   serializationFunction: String,
            //   deserializationFunction: String,
            //   defaultState: cardsListSlice.getInitialState().isLoading,
            // },
            `${cardsListSlice.name}`,
            // `${cardsListSlice.name}.isLoading`,
          ],
        })
      ),
  })
);

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
