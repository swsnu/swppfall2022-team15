import ReservationStep from "./ReservationStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ReservationStep", () => {
  let reservationStep: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    reservationStep = (
      <ReservationStep
        notificationType="test"
        message={{
          id: 1,
          name: "test",
          notification_type: "SLACK",
          data: {
            channel: "test",
            message: "test",
          },
        }}
        targetUserIds={[
          {
            value: 1,
            label: "test",
          },
        ]}
        handleRecurrenceChange={(_: any) => {}}
      />
    );
  });

  it("renders", () => {
    renderWithProviders(reservationStep);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("should handle recurrence open", () => {
    renderWithProviders(reservationStep);
    const recurrenceButton = screen.getByText("Fire Immediately");
    //fireEvent.click(recurrenceButton);
  });
});
