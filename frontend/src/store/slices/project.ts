import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { EnumProjectType } from "../../enums";

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

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (projectId: number) => {
    const response = await axios.get<ProjectType>(`/api/project/${projectId}/`);
    return response.data;
  }
);

const initialState: {
  selectedProject: ProjectType | null;
  projects: ProjectType[];
} = {
  selectedProject: {
    id: 1,
    project_type: EnumProjectType.ORGANIZATION,
    name: "Project 1",
  },
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
export const projectSelect = (state: RootState) => state.project;
export default ProjectSlice.reducer;
