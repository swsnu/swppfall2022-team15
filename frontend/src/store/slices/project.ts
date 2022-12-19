import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface ProjectType {
  id: number;
  project_type: string;
  name: string;
}

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const response = await axios.get<ProjectType[]>("/api/project/");
    return response.data;
  }
);

const initialState: {
  projects: ProjectType[];
} = {
  projects: [],
};

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
  },
});

export const projectListSelector = (state: RootState) => state.project.projects;
export default ProjectSlice.reducer;
