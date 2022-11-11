import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../types';

const initialState: {
  selectedUser: UserType | null;
} = {
  selectedUser: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      state.selectedUser = action.payload;
    }
  },
  
});

export default UserSlice.reducer;