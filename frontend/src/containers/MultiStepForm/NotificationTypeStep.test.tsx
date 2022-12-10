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
