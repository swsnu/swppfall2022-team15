import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { TargetType } from "../../types";

export const fetchTargets = createAsyncThunk(
  "target/fetchTargets",
  async () => {
    const response = await axios.get<TargetType[]>("/api/target/");
    return response.data;
  }
);

export const fetchTarget = createAsyncThunk(
  "project/fetchTarget",
  async (targetId: number) => {
    const response = await axios.get<TargetType>(`/api/target/${targetId}/`);
    return response.data;
  }
);

// 여기서 어떻게 구현하신건지?
const initialState: {
  targets: TargetType[];
} = {
  targets: [],
};

export const TargetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTargets.fulfilled, (state, action) => {
      state.targets = action.payload;
    });
  },
});

export const targetListSelector = (state: RootState) => state.target.targets;
export const targetSelect = (state: RootState) => state.target;
export default TargetSlice.reducer;
