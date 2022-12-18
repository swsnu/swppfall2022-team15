import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";
import ProjectCreateModal from "./ProjectCreateModal";
import userEvent from "@testing-library/user-event";

describe("<ProjectCreateModal />", () => {
  it("should render", async () => {
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );

    userEvent.keyboard("{esc}");
  });

  it("should handle click confirm", async () => {
    jest.spyOn(axios, "post").mockResolvedValue(
      Promise.resolve({
        data: {},
      })
    );

    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );
    const nameInput = screen.getByTestId("name-input");
    const confirmButton = screen.getByTestId("confirm-button");
    fireEvent.click(confirmButton);
    fireEvent.change(nameInput, {
      target: { value: "proejct name" },
    });
    fireEvent.click(confirmButton);
  });

  it("should render edit project", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(
      Promise.resolve({
        data: {
          name: "project name",
        },
      }));
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} projectid={1} />, { preloadedState }
    );

    userEvent.keyboard("{esc}");
  });

  it("should edit project", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue(
      Promise.resolve({
        data: {
          name: "test",
        },
      })
    );
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} projectid={1} />,
      { preloadedState }
    );

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("confirm-button"));
  });
});
