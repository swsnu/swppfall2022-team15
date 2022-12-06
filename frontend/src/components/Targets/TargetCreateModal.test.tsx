import { renderWithProviders } from "../../test-utils/mocks";
import TargetCreateModal from "./TargetCreateModal";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import { EnumNotificationType } from "../../Enums";

describe("TargetCreateModal", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />
    );
  });

  it("should handle confirm create", () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />,
      { preloadedState }
    );

    const targetInput = screen.getByTestId("target-input");
    fireEvent.change(targetInput, { target: { value: "target" } });

    const projectType = screen.getByTestId("project-type");
    fireEvent.change(projectType, {
      target: { value: EnumNotificationType.WEBHOOK },
    });

    const endpointInput = screen.getByTestId("endpoint-input");
    fireEvent.change(endpointInput, { target: { value: "https://end.point" } });

    const projectId = screen.getByTestId("project-id");
    fireEvent.change(projectId, { target: { value: 1 } });

    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);
  });
});
