import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import NotiSidebar from "./NotiSidebar";
import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router";
import React from "react";
import preloadedState from "../../test-utils/mock_state";

describe("Sidebar Testing", () => {
  let sidebar: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    sidebar = (
      <MemoryRouter initialEntries={["/home"]}>
        <NotiSidebar />
      </MemoryRouter>
    );
  });

  it("should render correctly", () => {
    const { container } = renderWithProviders(sidebar);
    expect(container).toBeTruthy();

    screen.getByText("Home");
    screen.getByText("Projects");
    screen.getByText("Targets");
    screen.getByText("Messages");
    screen.getByText("Templates");
    screen.getByText("History");
  });

  it("should render user state correctly", () => {
    renderWithProviders(sidebar, {preloadedState});
  });

  it("should handle buttons", async () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    renderWithProviders(sidebar);

    const homeButton = screen.getByTestId("homeButton");
    fireEvent.click(homeButton);

    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("home");
    // });

    const projectsButton = screen.getByTestId("projectsButton");
    fireEvent.click(projectsButton);

    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("projects");
    // });

    const targetsButton = screen.getByTestId("targetsButton");
    fireEvent.click(targetsButton);
    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("targets");
    // }
    // );
    
    const messagesButton = screen.getByTestId("messagesButton");
    fireEvent.click(messagesButton);
    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("messages");
    // }
    // );

    const templatesButton = screen.getByTestId("templatesButton");
    fireEvent.click(templatesButton);
    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("templates");
    // }
    // );

    const historyButton = screen.getByTestId("historyButton");
    fireEvent.click(historyButton);
    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("history");
    // }
    // );
  });

  it("should handle logout", async () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    renderWithProviders(sidebar);

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    // await waitFor(() => {
    //   expect(setStateMock).toHaveBeenCalledWith("logout");
    // });
  });
});
