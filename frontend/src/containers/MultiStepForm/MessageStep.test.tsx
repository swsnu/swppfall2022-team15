import MessageStep from "./MessageStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import userEvent from "@testing-library/user-event";

describe("MessageStep", () => {
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

  it("should render EMAIL", () => {
    renderWithProviders(
      <MessageStep
        notificationType="EMAIL"
        name="test"
        setName={() => {}}
        data={{
          title: "test",
        }}
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={{
          id: 1,
          name: "test",
          notification_type: "EMAIL",
          data: {
            title: "test",
            content: "test",
          },
        }}
        setMessage={() => {}}
      />,
      { preloadedState }
    );
  });

  it("should render SMS", () => {
    renderWithProviders(
      <MessageStep
        notificationType="SMS"
        name="test"
        setName={() => {}}
        data={{
          content: "test",
        }}
        setData={() => {}}
        fieldErrors="test"
        setFieldErrors={() => {}}
        message={{
          id: 1,
          name: "test",
          notification_type: "SMS",
          data: {
            content: "test",
          },
        }}
        setMessage={() => {}}
      />,
      { preloadedState }
    );
  });

  it("should render SLACK", () => {
    renderWithProviders(
      <MessageStep
        notificationType="SLACK"
        name="test"
        setName={() => {}}
        data={{
          channel: "test",
          message: "test",
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
  });

  it("should handle import mode", async () => {
    renderWithProviders(
      <MessageStep
        notificationType="SLACK"
        name="test"
        setName={() => {}}
        data={{
          channel: "test",
          message: "test",
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
    fireEvent.click(screen.getByLabelText("Import"));

    fireEvent.click(screen.getByTestId("importMessageButton"));
    userEvent.keyboard("{esc}");
    fireEvent.click(screen.getByTestId("importMessageButton"));
    fireEvent.click(screen.getByText("Close"))
  });

  it("should handle create mode", async () => {
    renderWithProviders(
      <MessageStep
        notificationType="SLACK"
        name="test"
        setName={() => {}}
        data={{
          channel: "test",
          message: "test",
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
    fireEvent.click(screen.getByText("Create"));



  });

  

});
