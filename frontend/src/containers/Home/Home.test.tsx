import Home from "./Home";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";

import { BrowserRouter } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Home", () => {

  it("should render correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );
  });

  it("should handle create project modal", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );

    const createProjectButton = screen.getByText("New Project");
    createProjectButton.click();
  });

  it("should handle project style change", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );

    const projectStyleSwitch = screen.getByTestId("switch");
    projectStyleSwitch.click();


  });

  it("should handle close create project modal", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );

    const createProjectButton = screen.getByText("New Project");
    createProjectButton.click();

    fireEvent.click(document);
    
  });
});
