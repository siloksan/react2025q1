import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFormData } from '../validators/schema';

export type SerializeUserData = Omit<UserFormData, 'image'> & {
  image: string;
  id: number;
};

const initialState: SerializeUserData[] = [];

export const usersData = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<SerializeUserData>) => {
      state.unshift(action.payload);
    },
  },
});

export const { submitForm } = usersData.actions;

export const { reducer: usersDataReducer } = usersData;
