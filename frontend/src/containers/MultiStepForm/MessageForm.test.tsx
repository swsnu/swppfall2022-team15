import MessageForm from "./MessageForm";
import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";

describe("MessageForm", () => {
  it("should render", () => {
    renderWithProviders(<MessageForm />);
  });

  it("should handle confirm button correctly", () => {
    const { getByTestId } = renderWithProviders(<MessageForm />, {
      preloadedState,
    });

    const projectId = screen.getByTestId("project-id");
    fireEvent.change(projectId, { target: { value: "name" } });

    const contentInput = screen.getByTestId("content-input");
    fireEvent.change(contentInput, { target: { value: "content" } });

    const button = getByTestId("confirm-button");
    fireEvent.click(button);
  });
});
