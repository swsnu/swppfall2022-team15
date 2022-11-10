import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { EnumProjectType } from "../../Enums";
import projectService from "../../services/project";
import { renderWithProviders } from "../../test-utils/mocks";
import ProjectCreateModal from "./ProjectCreateModal";

describe("<ProjectCreateModal />", () => {
  it("shoud render", async () => {
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );
  });

  it("shoud handle click confirm", async () => {
    jest
      .spyOn(projectService, "createProject")
      .mockImplementation((projectName: string, projectType: string) => {
        return Promise.resolve();
      });
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );
    const nameInput = screen.getByTestId("name-input");
    const typeInput = screen.getByTestId("type-input");
    const confirmButton = screen.getByTestId("confirm-button");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(projectService.createProject).toHaveBeenCalledTimes(0);
    fireEvent.change(nameInput, {
      target: { value: "proejct name" },
    });
    fireEvent.change(typeInput, {
      target: { value: EnumProjectType.ORGANIZATION },
    });
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(projectService.createProject).toHaveBeenCalled();
  });
});
