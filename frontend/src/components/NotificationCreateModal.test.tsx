import {fireEvent, render} from "@testing-library/react";
import NotificationCreateModal from "./NotificationCreateModal";
import {Provider} from "react-redux";
import {store} from "../store";
import {screen} from "@testing-library/react";
import axios from "axios";
import {renderWithProviders} from "../test-utils/mocks";
import {EnumNotificationType} from "../Enums";
import preloadedState from "../test-utils/mock_state";

describe("NotificationCreateModal", () => {
  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <NotificationCreateModal open={true} handleClose={null}/>
      </Provider>
    );
  });

  it("should handle click confirm - no proejct selected", () => {
    render(
      <Provider store={store}>
        <NotificationCreateModal open={true} handleClose={null}/>
      </Provider>
    );
    const button = screen.getByText("Confirm");
    button.click();

  });

  it("should handle click confirm - project selected", () => {
    renderWithProviders(
      <NotificationCreateModal open={true} handleClose={()=>{}}/>,
        {preloadedState}
    );

    const notificationTypeInput = screen.getByTestId("notification-type-input");
    fireEvent.change(notificationTypeInput, {
        target: { value: EnumNotificationType.API },
    });
    const targetuserInput = screen.getByTestId("target-user-input");
    fireEvent.change(targetuserInput, {
        target: { value: 1 },
    })
    const messageInput = screen.getByTestId("message-input");
    fireEvent.change(messageInput, {
        target: { value: 1 },
    })

    const button = screen.getByTestId("confirm-button");
    button.click();

  });
});
