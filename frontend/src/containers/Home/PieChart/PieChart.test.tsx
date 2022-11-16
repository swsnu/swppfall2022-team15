import { render } from "@testing-library/react";
import { EnumNotificationStatus } from "../../../Enums";
import { NotificationType } from "../../../types";

import NotiPieChart from "./PieChart";

const fakeNotifications: NotificationType[] = [
  {
    id: 1,
    message: "This is a test message",
    status: EnumNotificationStatus.SUCCESS,
    reservedAt: "2021-01-01",
    type: "Test Type",
  },

  {
    id: 2,
    message: "This is a test message",
    status: EnumNotificationStatus.SUCCESS,
    reservedAt: "2021-01-01",
    type: "Test Type",
  },

  {
    id: 3,
    message: "This is a test message",
    status: EnumNotificationStatus.FAILURE,
    reservedAt: "2021-01-01",
    type: "Test Type",
  },
];

jest.mock("react-apexcharts", () => ({
    __esModule: true,
    default: () => <div/>,
}));

describe("PieChart", () => {
  it("should render correctly", () => {
    const { container } = render(<NotiPieChart notifications={[]} />);

    expect(container).toBeTruthy();
  });

  it("should render correctly with notifications", () => {
    const { container } = render(
      <NotiPieChart notifications={fakeNotifications} />
    );

    expect(container).toBeTruthy();
  });
});
