import Home from "./Home";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";

import { BrowserRouter } from "react-router-dom";
import { fireEvent, screen, act, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Switch } from "@mui/material";

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

    const createProjectButton = screen.getByTestId("new-project-button");
    act(() => {
      createProjectButton.click();
    });
    userEvent.keyboard("{esc}");
  });

  it("should handle style change", () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      { preloadedState }
    );
        
      const switchButton = screen.getByTestId("switch");
      act(() => {
        switchButton.click();
        
      });


  });
});
