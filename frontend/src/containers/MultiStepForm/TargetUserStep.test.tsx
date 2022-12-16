import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import TargetUserStep from "./TargetUserStep";
import { renderWithProviders } from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";

describe("TargetUserStep", () => {
  it("should render correctly, and close", () => {
    renderWithProviders(
      <TargetUserStep
        notificationType="test"
        targetName="test"
        setTargetName={() => {}}
        endpoint="test"
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={() => {}}
        error=""
        setError={() => {}}
      />
    );

    userEvent.keyboard("{esc}");
  });

  it("should handle click confirm: existing", () => {
    const setTargetName = jest.fn();
    const setEndpoint = jest.fn();
    const setData = jest.fn();
    const setTargetUserIdNameList = jest.fn();
    const setError = jest.fn();
    renderWithProviders(
      <TargetUserStep
        notificationType="EMAIL"
        targetName="test"
        setTargetName={setTargetName}
        endpoint="test"
        setEndpoint={setEndpoint}
        data={{}}
        setData={setData}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={setTargetUserIdNameList}
        error=""
        setError={setError}
      />,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("test target"));
  });
  
  it("should handle click confirm: new target: SLACK", () => {
    const setTargetName = jest.fn();
    const setEndpoint = jest.fn();
    const setData = jest.fn();
    const setTargetUserIdNameList = jest.fn();
    const setError = jest.fn();

    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        data: {
          id: 2,
          name: "test",
          notification_type: "SLACK",
          endpoint: "test",
          data: { api_key: "test" },
        },
      })
    );
    renderWithProviders(
      <TargetUserStep
        notificationType="SLACK"
        targetName=""
        setTargetName={setTargetName}
        endpoint=""
        setEndpoint={setEndpoint}
        data={{}}
        setData={setData}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={setTargetUserIdNameList}
        error=""
        setError={setError}
      />,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.change(screen.getByTestId("target-input"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByTestId("api-token-input"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByText("Confirm"));
  });

  it("should handle click confirm: new target: EMAIL", () => {
    const setTargetName = jest.fn();
    const setEndpoint = jest.fn();
    const setData = jest.fn();
    const setTargetUserIdNameList = jest.fn();
    const setError = jest.fn();

    const mockPost = jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        data: {
          id: 2,
          name: "test",
          notification_type: "EMAIL",
          endpoint: "test",
          data: "test",
        },
      }));
    renderWithProviders(
      <TargetUserStep
        notificationType="EMAIL"
        targetName=""
        setTargetName={setTargetName}
        endpoint=""
        setEndpoint={setEndpoint}
        data={{}}
        setData={setData}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={setTargetUserIdNameList}
        error=""
        setError={setError}
      />,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.change(screen.getByTestId("target-input"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByTestId("email-address-input"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByText("Confirm"));
  });

  it("should handle click confirm: new target: SMS", () => {
    const setTargetName = jest.fn();
    const setEndpoint = jest.fn();
    const setData = jest.fn();
    const setTargetUserIdNameList = jest.fn();
    const setError = jest.fn();

    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        data: {
          id: 2,
          name: "test",
          notification_type: "EMAIL",
          endpoint: "test",
          data: { api_key: "test" },
        },
      })
    );
    renderWithProviders(
      <TargetUserStep
        notificationType="SMS"
        targetName=""
        setTargetName={setTargetName}
        endpoint=""
        setEndpoint={setEndpoint}
        data={{}}
        setData={setData}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={setTargetUserIdNameList}
        error=""
        setError={setError}
      />,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.change(screen.getByTestId("target-input"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByText("Confirm"));
  });

  it("should handle click confirm: new target -> close", () => {
    const setTargetName = jest.fn();
    const setEndpoint = jest.fn();
    const setData = jest.fn();
    const setTargetUserIdNameList = jest.fn();
    const setError = jest.fn();
    renderWithProviders(
      <TargetUserStep
        notificationType="EMAIL"
        targetName="test"
        setTargetName={setTargetName}
        endpoint="test"
        setEndpoint={setEndpoint}
        data={{}}
        setData={setData}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={setTargetUserIdNameList}
        error=""
        setError={setError}
      />,
      { preloadedState }
    );

    fireEvent.click(screen.getByText("Add User"));

    userEvent.keyboard("{esc}");
  });
});
