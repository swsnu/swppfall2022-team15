import { renderWithProviders } from "../../test-utils/mocks";
import NotificationTypeStep from "./NotificationTypeStep";

describe("NotificationTypeStep", () => {
  it("should render correct: EMAIL", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should render correct: SMS", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SMS"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should render correct: SLACK", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SLACK"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />
    );
  });

  it("should handle organization project type", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
        error=""
        setError={() => {}}
      />,
      {
        preloadedState: {
          project: {
            projects: [
              {
                id: 1,
                name: "test",
                project_type: "ORGANIZATION",
                number_of_requests: 1,
                most_recently_sent_notification: "",
              },
            ],
            selectedProject: {
              id: 1,
              name: "test",
              project_type: "ORGANIZATION",
            },
          },
        },
      }
    );
  });
});
