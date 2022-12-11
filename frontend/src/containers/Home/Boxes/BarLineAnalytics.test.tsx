import { renderWithProviders } from "../../../test-utils/mocks";
import BarLineAnalytics from "./BarLineAnalytics";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

describe("BarLineAnalytics", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-12-08T00:00:00Z").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render correctly", () => {
    renderWithProviders(
      <BarLineAnalytics title="test" subtitle="test_subtitle" type={0} noti_type={"SLACK"} />
    );
  });

});
