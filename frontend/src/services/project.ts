import axios from "axios";

export async function createProject(projectName: string, projectType: string) {
  try {
    const resp = await axios.post("/api/project/", {
      name: projectName,
      project_type: projectType,
    });
    return resp.data.id;
  } catch (e: any) {
    console.log(e.response);
    return null;
  }
}

export async function deleteProject(projectId: number) {
  try {
    return await axios.delete(`/api/project/${projectId}`);
  } catch (e: any) {
    console.log(e.response);
  }
}

export default {
  createProject,
  deleteProject,
};
