import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Hash {
  [key: string]: boolean;
}

const initialState: {
  //projectFilters: string[];
  typeFilters: Hash;
  //targetFilters: string[];
  statusFilters: Hash;
} = {
  //projectFilters: [],
  typeFilters: {
    "Email": true,
    "SMS": true,
    "Webhook": true,
    "Slack": true,
  },
  //targetFilters: [],
  statusFilters: {
    "Success": true,
    "Failure": true,
    "Pending": true,
  }
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addStatusFilter: (state, action) => {
      state.statusFilters[action.payload] = true;
    },
    removeStatusFilter: (state, action) => {
      state.statusFilters[action.payload] = false;
    },
    addTypeFilter: (state, action) => {
      state.typeFilters[action.payload] = true;
    },
    removeTypeFilter: (state, action) => {
      state.typeFilters[action.payload] = false;
    },
  },
})

export const { addStatusFilter, removeStatusFilter, addTypeFilter, removeTypeFilter } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;