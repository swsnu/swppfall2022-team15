import { fireEvent, screen } from "@testing-library/react";
import { EnumProjectType } from "../../Enums";
import axios from "axios";
import { renderWithProviders } from "../../test-utils/mocks";
import ProjectCreateModal from "./ProjectCreateModal";

describe("<ProjectCreateModal />", () => {
  it("shoud render", async () => {
    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );
  });

  it("shoud handle click confirm", async () => {
    jest.spyOn(axios, "post").mockResolvedValue(
      Promise.resolve({
        data: {},
      })
    );

    renderWithProviders(
      <ProjectCreateModal open={true} handleClose={() => {}} />
    );
    const nameInput = screen.getByTestId("name-input");
    const typeInput = screen.getByTestId("type-input");
    const confirmButton = screen.getByTestId("confirm-button");
    fireEvent.click(confirmButton);
    fireEvent.change(nameInput, {
      target: { value: "proejct name" },
    });
    fireEvent.change(typeInput, {
      target: { value: EnumProjectType.ORGANIZATION },
    });
    fireEvent.click(confirmButton);
  });
});
