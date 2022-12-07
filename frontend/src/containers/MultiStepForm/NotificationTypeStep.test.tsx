import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import NotificationTypeStep from "./NotificationTypeStep";

describe("NotificationTypeStep", () => {
  it("should render correct: EMAIL", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
      />
    );
  });

  it("should render correct: SMS", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SMS"
        setNotificationType={() => {}}
      />
    );
  });

  it("should render correct: SLACK", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="SLACK"
        setNotificationType={() => {}}
      />
    );
  });

  it("should handle organization project type", () => {
    renderWithProviders(
      <NotificationTypeStep
        notificationType="EMAIL"
        setNotificationType={() => {}}
      />,
      {
        preloadedState: {
          project: {
            projects: [
              {
                id: 1,
                name: "test",
                project_type: "ORGANIZATION",
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
