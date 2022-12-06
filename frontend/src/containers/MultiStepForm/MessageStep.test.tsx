import MessageStep from "./MessageStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";

describe("MessageStep", () => {
  it("should render correct: EMAIL", () => {
    renderWithProviders(
      <MessageStep
        notificationType="EMAIL"
        name=""
        setName={() => {}}
        data="test"
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={null}
        setMessage={() => {}}
      />
    );
  });

  it("should render corrent: SMS", () => {
    renderWithProviders(
      <MessageStep
        notificationType="SMS"
        name=""
        setName={() => {}}
        data="test"
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={null}
        setMessage={() => {}}
      />
    );
  });

  it("should handle click import button", () => {
    renderWithProviders(
      <MessageStep
        notificationType="SLACK"
        name="test"
        setName={() => {}}
        data={{
          channel: "test",
        }}
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={{
          id: 1,
          name: "test",
          notification_type: "SLACK",
          data: {
            channel: "test",
            message: "test",
          },
        }}
        setMessage={() => {}}
      />,
      { preloadedState }
    );
    fireEvent.click(screen.getByTestId("importMessageButton"));
  });

  it("should handle errorfield", () => {
    renderWithProviders(
      <MessageStep
        notificationType="SLACK"
        name="test"
        setName={() => {}}
        data={{
          channel: "test",
        }}
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={{
          id: 1,
          name: "test",
          notification_type: "SLACK",
          data: {
            channel: "test",
            message: "test",
          },
        }}
        setMessage={() => {}}
      />,
      { preloadedState }
    );
    fireEvent.click(screen.getByTestId("confirm-button"));
  });
});
