import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../types';

const initialState: UserType = {
  id: -1,
  username: "",
  email: "",
  password: "",
  is_active: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
