import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { store } from "../../../store";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/mocks";
import { MemoryRouter } from "react-router";

describe("ProjectDetail", () => {
  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <ProjectDetail />
      </Provider>
    );
  });

  it("should handle create notification button click", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId("createNotificationButton"));
    
  });

  it("should handle close multi step form button click", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProjectDetail />
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId("createNotificationButton"));
    userEvent.keyboard("{esc}");
  });

});
