import Analytics from "./Analytics";
import { renderWithProviders } from "../../../test-utils/mocks";
import preloadedState from "../../../test-utils/mock_state";
import { BrowserRouter } from "react-router-dom";

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

});
