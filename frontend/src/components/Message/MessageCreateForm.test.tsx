import { renderWithProviders } from '../../test-utils/mocks';
import MessageCreateForm from './MessageCreateForm';
import { EnumNotificationType } from '../../Enums';
import { fireEvent, screen } from '@testing-library/react';
import { clear } from 'console';


describe("MessageCreateForm", () => {
  it("should render", () => {
    renderWithProviders(
      <MessageCreateForm
        notificationType={EnumNotificationType.SLACK}
        name=""
        setName={() => {}}
        data={{}}
        setData={() => {}}
        fieldErrors={{}}
        setFieldErrors={() => {}}
      />
    );
  });

  it("should handle text change", () => {
    const setName = jest.fn();
    const setData = jest.fn();
    const setFieldErrors = jest.fn();

    renderWithProviders(
      <MessageCreateForm
        notificationType={EnumNotificationType.SLACK}
        name=""
        setName={setName}
        data={{}}
        setData={setData}
        fieldErrors={{}}
        setFieldErrors={setFieldErrors}
      />
    );

    const nameInput = screen.getByTestId("message-input");
    fireEvent.change(nameInput, {
      target: { value: "name" },
    });

    const slackChannelInput = screen.getByTestId("slack-channel-input");
    fireEvent.change(slackChannelInput, {
      target: { value: "channel" },
    });

    const slackMessageInput = screen.getByTestId("slack-message-input");
    fireEvent.change(slackMessageInput, {
      target: { value: "message" },
    });
  });
});