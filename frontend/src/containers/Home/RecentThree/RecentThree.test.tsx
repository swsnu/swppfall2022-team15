import { render } from "@testing-library/react";
import { EnumNotificationStatus } from "../../../Enums";
import { NotificationType } from "../../../types";

import RecentThree from "./RecentThree";

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
    status: EnumNotificationStatus.FAILURE,
    reservedAt: "2021-01-01",
    type: "Test Type",
  },

  {
    id: 3,
    message: "This is a test message",
    status: EnumNotificationStatus.SUCCESS,
    reservedAt: "2021-01-01",
    type: "Test Type",
  },
];

const green = "#E3FCEC";
const red = "#FEE2E2";

describe("RecentThree", () => {
  it("should render correctly", () => {
    const { container } = render(<RecentThree notifications={[]} />);

    expect(container).toBeTruthy();
  });

  it("should render correctly with notifications", () => {
    const { container } = render(
      <RecentThree notifications={fakeNotifications} />
    );

    expect(container).toBeTruthy();

    expect(container.querySelectorAll("tr").length).toBe(4);
  });

  it("should have green background for success notification", () => {
    
    const { container } = render(
      <RecentThree notifications={fakeNotifications} />
    );

    expect(container).toBeTruthy();

    expect(container.querySelectorAll("tr")[1]).toHaveStyle(
      "background-color: " + green
    );
  });

  it("should have red background for failure notification", () => {
    const { container } = render(
      <RecentThree notifications={fakeNotifications} />
    );
    

    expect(container).toBeTruthy();
    expect(container.querySelectorAll("tr")[2]).toHaveStyle(
      "background-color: " + red
    );
  });


});
