import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface TargetType {
  id: number;
  target_name: string;
  message_type: string;
  end_point: string;
}

export const fetchTargets = createAsyncThunk(
  "target/fetchTargets",
  async () => {
    const response = await axios.get<TargetType[]>("/api/target/");
    return response.data;
  }
);

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
export default TargetSlice.reducer;
