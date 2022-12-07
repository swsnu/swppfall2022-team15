import ReservationStep from "./ReservationStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ReservationStep", () => {
  let reservationStep: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    // reservationStep = (
    //   <ReservationStep
    //     notificationType="test"
    //     message={{
    //       id: 1,
    //       name: "test",
    //       notification_type: "SLACK",
    //       data: {
    //         channel: "test",
    //         message: "test",
    //       },
    //     }}
    // // TODO 테스트 코드에서 에러가 발생하는 것 같습니다. 전달하는 매개변수 타입이 요구하는 타입과 다른 듯 합니다 (기태)
    //     target={{
    //       id: 1,
    //       name: "test",
    //       notification_type: "SLACK",
    //       data: {
    //         channel: "test",
    //         message: "test",
    //       },
    //       endpoint: "test",
    //     }}
    //     handleRecurrenceChange={(_: any) => {}}
    //   />
    // );
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
