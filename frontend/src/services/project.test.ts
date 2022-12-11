import axios from "axios";
import { createProject, deleteProject } from "./project";

describe("projects", () => {
  it("should create project - success", () => {
    jest.spyOn(axios, "post")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    createProject("title", "type");
  });

  it("should create project - fail", () => {
    jest.spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    createProject("title", "type");
  });

  it("should delete project -success", () => {
    jest.spyOn(axios, "delete")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    deleteProject(1);
  });

  it("should delete project - failure", () => {
    jest.spyOn(axios, "delete")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { id: 1 } } })
      );
    deleteProject(1);
  });
});
