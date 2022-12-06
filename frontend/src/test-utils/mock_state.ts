import { RootState } from "../store";
import { EnumNotificationStatus } from "../Enums";

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
        // {
        //   id: 1,
        //   content: "test message",
        // },
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

export default preloadedState;
