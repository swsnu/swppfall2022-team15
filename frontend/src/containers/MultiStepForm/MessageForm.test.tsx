// import MessageStep from "./MessageStep";
// import { renderWithProviders } from "../../test-utils/mocks";
// import { fireEvent, screen } from "@testing-library/react";
// import preloadedState from "../../test-utils/mock_state";
//
// describe("MessageStep", () => {
//   it("should render", () => {
//     renderWithProviders(<MessageStep />);
//   });
//
//   it("should handle confirm button correctly", () => {
//     const { getByTestId } = renderWithProviders(<MessageStep />, {
//       preloadedState,
//     });
//
//     const projectId = screen.getByTestId("project-id");
//     fireEvent.change(projectId, { target: { value: "name" } });
//
//     const contentInput = screen.getByTestId("content-input");
//     fireEvent.change(contentInput, { target: { value: "content" } });
//
//     const button = getByTestId("confirm-button");
//     fireEvent.click(button);
//   });
// });
export {}