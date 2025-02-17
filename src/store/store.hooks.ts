import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, AppState, AppStore } from './store.types';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>();
