import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../api/api-root';
import { cardDetails, cardsList, selectedCards } from './features';

const rootReducer = combineReducers({
  selectedCards,
  cardDetails,
  cardsList,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApi.middleware),
    preloadedState,
  });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
