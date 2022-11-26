import { renderWithProviders } from "../../test-utils/mocks";
import MessageListTable from "./MessageList";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("MessageList", () => {
  it("should  render correct", () => {
    renderWithProviders(<MessageListTable />);
  });

  it("tab", () => {
    renderWithProviders(<MessageListTable />);
    const tabButton = screen.getByTestId("tab-1");
    fireEvent.click(tabButton);
  });

  it("should handle click create button", () => {
    renderWithProviders(<MessageListTable />);
    const createButton = screen.getByTestId("create-button");
    act(() => {
      fireEvent.click(createButton);
    });
    userEvent.keyboard("{esc}");
  });

  it("should handle click open menu", () => {
    renderWithProviders(<MessageListTable />, {
      preloadedState,
    });
    const openMenuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(openMenuButton);
  });

  it("should handle delete button", () => {
    jest.spyOn(axios, "delete").mockImplementation((url: string) => {
      return Promise.resolve();
    });

    renderWithProviders(<MessageListTable />, {
      preloadedState,
    });
    const openMenuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(openMenuButton);
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
  });
});
