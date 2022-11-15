import { render } from "@testing-library/react";
import { EnumNotificationStatus } from "../../../Enums";
import { NotificationType } from "../../../types";
import Upcoming from "./Upcoming";

const fakeUpcomingNotifications: NotificationType[] = [
    {
        id: 1,
        message: "This is a test message",
        status: EnumNotificationStatus.SUCCESS,
        reservedAt: "2021-01-01",
        type: "Test Type",
      
    },
];

describe("Upcoming", () => {
  it("should render correctly", () => {
    const { container } = render(<Upcoming upcomingNotifications={[]} />);

    expect(container).toBeTruthy();
  });

  it("should render correctly with upcoming notifications", () => {
    const { container } = render(
      <Upcoming upcomingNotifications={fakeUpcomingNotifications} />
    );

    expect(container).toBeTruthy();
  });
});
