import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { EnumProjectType } from "../../Enums";
import { renderWithProviders } from "../../test-utils/mocks";
import ProjectList from "./ProjectList";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("<ProjectList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            { name: "name", project_type: EnumProjectType.INDIVIDUAL, id: 1 },
            { name: "name", project_type: EnumProjectType.ORGANIZATION, id: 2 },
          ],
          selectedProject: null,
        },
      },
    });
  });

  it("should handle click icon", async () => {
    jest.spyOn(axios, "delete").mockImplementation((url: string) => {
      return Promise.resolve();
    });
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            { name: "name", project_type: EnumProjectType.INDIVIDUAL, id: 1 },
          ],
          selectedProject: null,
        },
      },
    });
    const iconButton = screen.getByTestId("icon-button");
    fireEvent.click(iconButton);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
  });

  it("should handle click create button", () => {
    renderWithProviders(<ProjectList />);

    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);

    userEvent.keyboard("{esc}");
  });

  it("should handle click row", () => {
    renderWithProviders(<ProjectList />, {
      preloadedState: {
        project: {
          projects: [
            { name: "name", project_type: EnumProjectType.INDIVIDUAL, id: 1 },
          ],
          selectedProject: null,
        },
      },
    });

    const row = screen.getByText("name");
    fireEvent.click(row);
  });

  
});
