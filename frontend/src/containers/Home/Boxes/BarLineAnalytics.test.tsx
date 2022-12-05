import { renderWithProviders } from "../../../test-utils/mocks";
import BarLineAnalytics from "./BarLineAnalytics";
import { screen } from "@testing-library/react";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("BarLineAnalytics", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <BarLineAnalytics title="test" subtitle="test_subtitle" />
    );
  });

  it("should handle button click", () => {
    renderWithProviders(
      <BarLineAnalytics title="test" subtitle="test_subtitle" />
    );

    const button = screen.getByTestId("button");
    button.click();
  });

});
