import GridLayout from "./ProjectGridView";

import {renderWithProviders} from "../../../test-utils/mocks";
import {screen} from "@testing-library/react";
import preloadedState from "../../../test-utils/mock_state";
import {RootState} from "../../../store";


describe("<GridLayout />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render empty projects correctly", () => {
    renderWithProviders(<GridLayout/>, );

    expect(
      screen.getByText("No projects! Start by creating your first project!")
    ).toBeInTheDocument();
  });

  it("should render projects correctly", () => {
    const copiedObj: RootState = JSON.parse(JSON.stringify(preloadedState));
    copiedObj.project.projects = [
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

    renderWithProviders(<GridLayout/>, {preloadedState: copiedObj});

  });
});
