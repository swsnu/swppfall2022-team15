import GridLayout from "./ProjectGridView";

import { renderWithProviders } from "../../../test-utils/mocks";
import { ProjectType } from "../../../types";
import { screen } from "@testing-library/react";

const projects: ProjectType[] = [
    {
        id: 1,
        name: "Project 1",
        project_type: "ORGANIZATION",
    },
    {
        id: 2,
        name: "Project 2",
        project_type: "INDIVIDUAL",
    },
        
];

describe("<GridLayout />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render empty projects correctly", () => {
    renderWithProviders(<GridLayout/>);

    expect(
      screen.getByText("No projects! Start by creating your first project!")
    ).toBeInTheDocument();
  });

  it("should render projects correctly", () => {
    renderWithProviders(<GridLayout/>);

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });
});
