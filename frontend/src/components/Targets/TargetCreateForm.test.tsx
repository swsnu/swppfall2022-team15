import { EnumNotificationType } from "../../Enums";
import { renderWithProviders } from "../../test-utils/mocks";
import { TargetCreateForm } from "./TargetCreateForm";
import { fireEvent, screen } from "@testing-library/react";

describe("TargetCreateForm", () => {
  it("should render email", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.EMAIL}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render slack", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.SLACK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render webhook", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should render sms", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.SMS}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
  });

  it("should handle change: slack api-key", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.SLACK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiKeyInput = screen.getByTestId("api-token-input");
    fireEvent.change(apiKeyInput, { target: { value: "test" } });
  });

  it("should handle change: webhook endpoint", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const endpointInput = screen.getByTestId("endpoint-input");
    fireEvent.change(endpointInput, { target: { value: "somethingelse" } });
  });

  it("should handle change: webhook api auth", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "somethingelse" } });
  });

  it("should handle apiAuth: basic", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "basic" } });
  });

  it("should handle apiAuth: basic, data change", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "basic" } });

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "newNAme" } });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "test" } });

  });

  it("should handle apiAuth: bearer", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "bearer" }
    });
  });

  it("should handle apiAuth: bearer, data change", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "bearer" } });

    const tokenInput = screen.getByTestId("username-input");
    fireEvent.change(tokenInput, { target: { value: "test" } });
  });

  it("should handle apiAuth: api_key", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "api_key" } });
  });

  it("should handle apiAuth: api_key, data change", async () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    
    const apiAuthInput = screen.getByTestId("type-input");
    fireEvent.change(apiAuthInput, { target: { value: "api_key" } });

    const tokenInput = screen.getByTestId("key-input");
    fireEvent.change(tokenInput, { target: { value: "test" } });

    const keyNameInput = screen.getByTestId("value-input");
    fireEvent.change(keyNameInput, { target: { value: "test" } });
  });

  it("should handle targetName change", () => {
    renderWithProviders(
      <TargetCreateForm
        notificationType={EnumNotificationType.WEBHOOK}
        targetName={"test"}
        setTargetName={() => {}}
        endpoint={"test"}
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
      />
    );
    const targetNameInput = screen.getByTestId("target-input");
    fireEvent.change(targetNameInput, { target: { value: "somethingelse" } });
  });
});
