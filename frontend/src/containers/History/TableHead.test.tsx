import { renderWithProviders } from "../../test-utils/mocks";
import TableHead from "./TableHead";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preloadedState from "../../test-utils/mock_state";

describe("TableHead", () => {
  it("should render", () => {
    renderWithProviders(<TableHead />);
  });

  it("should handle project open and close", () => {
    renderWithProviders(<TableHead />);
    const projectButton = screen.getByTestId("click Project");
    fireEvent.click(projectButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle type open and close", () => {
    renderWithProviders(<TableHead />);
    const typeButton = screen.getByTestId("click Type");
    fireEvent.click(typeButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle target open and close", () => {
    renderWithProviders(<TableHead />);
    const targetButton = screen.getByTestId("click Target");
    fireEvent.click(targetButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle status open and close", () => {
    renderWithProviders(<TableHead />);
    const statusButton = screen.getByTestId("click Status");
    fireEvent.click(statusButton);
    userEvent.keyboard("{esc}");
  });

  it("should handle project click", () => {
    renderWithProviders(<TableHead />, { preloadedState });
    const projectButton = screen.getByTestId("click Project");
    fireEvent.click(projectButton);
    const projectCheckbox = screen.getByTestId("click Project test");
    fireEvent.click(projectCheckbox);
  });

  it("should handle type click", () => {
    renderWithProviders(<TableHead />, { preloadedState });
    const typeButton = screen.getByTestId("click Type");
    fireEvent.click(typeButton);
    const typeCheckbox = screen.getByTestId("click Type Slack");
    fireEvent.click(typeCheckbox);
  });

  it("should handle target click", () => {
    renderWithProviders(<TableHead />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test target",
              notification_type: "EMAIL",
              endpoint: "email@email.com",
              data: {},
            },
            {
              id: 2,
              name: "test target2",
              notification_type: "SMS",
              endpoint: "010-1234-5678",
              data: {},
            },
          ],
          selectedTarget: null,
        },
      },
    });
    const targetButton = screen.getByTestId("click Target");
    fireEvent.click(targetButton);
    const targetCheckbox = screen.getByTestId("click Target test target2");
    fireEvent.click(targetCheckbox);
  });

  it("should handle status click", () => {
    renderWithProviders(<TableHead />, { preloadedState });
    const statusButton = screen.getByTestId("click Status");
    fireEvent.click(statusButton);
    const statusCheckbox = screen.getByTestId("click Status Success");
    fireEvent.click(statusCheckbox);
  });

});
