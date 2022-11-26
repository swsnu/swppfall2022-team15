import ListLayout from "./ProjectListView";
import { renderWithProviders } from "../../../test-utils/mocks";
import preloadedState from "../../../test-utils/mock_state";
import { RootState } from "../../../store";
import { EnumNotificationStatus } from "../../../Enums";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));
describe("ProjectListView", () => {
  it("should render correctly - no projects", () => {
    renderWithProviders(<ListLayout />);
  });

  it("should render correctly", () => {
    const preloadedState: RootState = {
      project: {
        selectedProject: {
          id: 1,
          project_type: "ORGANIZATION",
          name: "test",
        },
        projects: [
          {
            id: 1,
            project_type: "ORGANIZATION",
            name: "test",
          },
          {
            id: 2,
            project_type: "INDIVIDUAL",
            name: "test-2",
          },
        ],
      },
      notification: {
        notifications: [
          {
            id: 1,
            status: EnumNotificationStatus.SUCCESS,
            message: "test",
            reservedAt: "2021-10-10T00:00:00Z",
            type: "test",
            history: [],
          },
        ],
        selectedNotification: null,
      },
      target: {
        targets: [
          {
            id: 1,
            name: "test target",
            notification_type: "EMAIL",
            endpoint: "email@email.com",
            project: 1,
          },
        ],
        selectedTarget: null,
      },
      message: {
        messages: {
          SLACK: [
            {
              id: 1,
              content: "test message",
            },
          ],
        },
        selectedMessage: null,
      },
      auth: {
        user: {
          email: "test@test.com",
          username: "test",
        },
      },
    };
    const view = renderWithProviders(<ListLayout />, { preloadedState });
  });

  it("should handle click row", () => {
    const view = renderWithProviders(<ListLayout />, { preloadedState });
    const row = view.getByTestId("project-row-label");

    act(() => {
      row.click();
      expect(mockNavigate).toHaveBeenCalledWith("/projects/1");
    });
  });

  it("should handle click project item button", () => {
    const view = renderWithProviders(<ListLayout />, { preloadedState });
    const row = view.getByTestId("project-item-button");

    act(() => {
      row.click();
      expect(mockNavigate).toHaveBeenCalledWith("/projects/1");
    });
  });

  it("should handle click new notification button", () => {
    const view = renderWithProviders(<ListLayout />, { preloadedState });
    const row = view.getByTestId("new-notification-button");

    act(() => {
      row.click();
      expect(mockNavigate).toHaveBeenCalledWith("/multistep");
    });
  });
});
