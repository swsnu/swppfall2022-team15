import { renderWithProviders } from "../../test-utils/mocks";
import TargetCreateModal from "./TargetCreateModal";
import { fireEvent, screen } from "@testing-library/react";

describe("TargetCreateModal", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />
    );
  });

  it("should select notification type", () => {
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={() => {}} />
    );
    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "EMAIL" } });
  });

  it("should handle click: confirm", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );
    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });

  it("should handle click: with slack data", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TargetCreateModal open={true} handleClose={handleClick} />
    );
    
    const select = screen.getByTestId("type-input");
    fireEvent.change(select, { target: { value: "SLACK" } });

    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "test" } });

    const apiKeyInput = screen.getByTestId("api-token-input");
    fireEvent.change(apiKeyInput, { target: { value: "test" } });

    const confirmButton = screen.getByText("Confirm");
    confirmButton.click();
  });
});
