import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { TargetType } from "../../types";

export const fetchTargets = createAsyncThunk(
  "target/fetchTargets",
  async () => {
    const response = await axios.get<TargetType[]>("/api/targetuser/");
    return response.data;
  }
);

export const fetchTargetsByProjectId = createAsyncThunk(
  "target/fetchTargets",
  async (projectId:number) => {
    const response = await axios.get<TargetType[]>(`/api/targetuser/projectId=${projectId}`);
    return response.data;
  }
);

export const fetchTarget = createAsyncThunk(
  "target/fetchTarget",
  async (targetId: number) => {
    const response = await axios.get<TargetType>(`/api/targetuser/${targetId}/`);
    return response.data;
  }
);

export const createTarget = createAsyncThunk(
    "target/createTarget",
    async (target: {name: string, notification_type: string, endpoint: string }) => {
      const response = await axios.post<TargetType>("/api/targetuser/", target);
      return response.data;
    }
);


const initialState: {
  targets: TargetType[];
  selectedTarget: TargetType | null;
} = {
  targets: [],
  selectedTarget: null,
};

export const TargetSlice = createSlice({
  name: "target",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTargets.fulfilled, (state, action) => {
      state.targets = action.payload;
    });
    builder.addCase(fetchTarget.fulfilled, (state, action) => {
      state.selectedTarget = action.payload;
    });
  },
});

export const targetListSelector = (state: RootState) => state.target.targets;
export const targetSelect = (state: RootState) => state.target;
export default TargetSlice.reducer;
