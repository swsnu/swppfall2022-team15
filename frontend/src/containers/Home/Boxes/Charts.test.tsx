import { renderWithProviders } from "../../../test-utils/mocks";
import Charts from "./Charts";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Charts", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />
    );
  });

  it("should handle tabs correctly: 0", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Notification status");
  });

  it("should handle tabs correctly: 1", () => {
    renderWithProviders(
      <Charts selectedTab={1} selectedProject={0} selectedType={0} />
    );

    //screen.getByText("Notification status (Project 1)");
  });

  it("should handle tabs correctly: 2", () => {
    renderWithProviders(
      <Charts selectedTab={2} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Notification status (Slack)");
  });

  it("should shortenNumber correctly: M", () => {
    renderWithProviders(
      <Charts selectedTab={1} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Total notification requests: 361.3M");
  });

  it("should shortenNumber correctly: K", () => {
    renderWithProviders(
      <Charts selectedTab={2} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Total notification requests: 51.6K");
  });

  it("should shortenNumber correctly: normal", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />
    );

    screen.getByText("Total notification requests: 331");
  });
});
