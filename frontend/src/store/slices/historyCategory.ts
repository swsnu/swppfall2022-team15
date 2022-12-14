import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: {
  project: string;
  type: string;
  target: string;
  status: string;
} = {
  project: "All",
  type: "All",
  target: "All",
  status: "All",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeProject: (state, action) => {
      state.project = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeTarget: (state, action) => {
      state.target = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
})

export const { changeProject, changeStatus, changeTarget, changeType } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;