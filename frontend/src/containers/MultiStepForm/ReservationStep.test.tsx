import ReservationStep from "./ReservationStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";

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
      />
    );
  });

  it("renders", () => {
    renderWithProviders(reservationStep, { preloadedState });
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("renders without targets", () => {
    renderWithProviders(reservationStep);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });
});
