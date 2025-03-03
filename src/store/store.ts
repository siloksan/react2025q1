import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersDataReducer } from './users-data-slice';
import { countriesReducer } from './country-slice';

const rootReducer = combineReducers({ countriesReducer, usersDataReducer });

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
