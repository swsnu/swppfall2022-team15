import Analytics from "./Analytics";
import { renderWithProviders } from "../../../test-utils/mocks";
import preloadedState from "../../../test-utils/mock_state";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Analytics", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );
  });

  it("should handle tabs correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("By Project"));

    fireEvent.click(screen.getByText("By Type"));
    
  });

  it("should handle projectTabs correctly", () => {
    renderWithProviders(<Analytics />, { preloadedState });

    fireEvent.click(screen.getByText("By Project"));
    fireEvent.click(screen.getByText("test"));
  });

  it("should handle typeTabs correctly", () => {
    renderWithProviders(<Analytics />, { preloadedState });

    fireEvent.click(screen.getByText("By Type"));
    fireEvent.click(screen.getByText("Slack"));

    fireEvent.click(screen.getByText("HTTP"));
  });

});
