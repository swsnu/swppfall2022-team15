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
      {
        id: 2,
        project_type: "ORGANIZATION",
        name: "test2",
      }
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
  notificationConfig: {
    notificationConfigs: [
    ],
    selectedNotificationConfig: null,
  },
  target: {
    targets: [
      {
        id: 1,
        name: "test target",
        notification_type: "EMAIL",
        endpoint: "email@email.com",
        data: {},
      },
    ],
    selectedTarget: null,
  },
  message: {
    messages: {
      SLACK: [
        {
          id: 1,
          name: "test",
          notification_type: "SLACK",
          data: { channel: 'test', message: 'test' },
       },
      ],
      EMAIL: [],
      WEBHOOK: [],
      SMS: [],
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
