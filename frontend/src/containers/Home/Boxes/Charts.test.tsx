import { renderWithProviders } from "../../../test-utils/mocks";
import Charts from "./Charts";
import { screen } from "@testing-library/react";
import { EnumNotificationStatus } from "../../../Enums";

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
  });

  it("should handle getting notifications", () => {
    renderWithProviders(
      <Charts selectedTab={0} selectedProject={0} selectedType={0} />,
      {
        preloadedState: {
          notification: {
            notifications: [
              {
                id: 1,
                status: EnumNotificationStatus.SUCCESS,
                message: "test",
                reservedAt: "2022-12-01T00:00:00.000Z",
                type: "SLACK",
              },
              {
                id: 2,
                status: EnumNotificationStatus.FAILURE,
                message: "test",
                reservedAt: "2022-12-01T00:00:00.000Z",
                type: "SLACK",

              },
              {
                id: 3,
                status: EnumNotificationStatus.PENDING,
                message: "test",
                reservedAt: "2022-12-01T00:00:00.000Z",
                type: "SLACK",
              },
            ],
            selectedNotification: null,
          },
        },
      }
    );
  });
});
