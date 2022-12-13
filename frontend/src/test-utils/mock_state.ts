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
        number_of_requests: 1,
        most_recently_sent_notification: "",
      },
      {
        id: 2,
        project_type: "ORGANIZATION",
        name: "test2",
        number_of_requests: 10,
        most_recently_sent_notification: "",
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
      },
    ],
    selectedNotification: null,
    notifications_selectedProject: null,
  },
  notificationConfig: {
    notificationConfigs: [],
    notificationConfigs_project: [],
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
          data: { channel: "test", message: "test" },
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
  analytics: {
    barLineData: {
      Success: {},
      Failure: {},
      Pending: {},
      Total: {},
    },
    barlineType: "daily",
  },
  today: {
    data: {
      Success: {},
      Failure: {},
      Pending: {},
      Total: {},
    },
    successTotal: 0,
    failureTotal: 0,
    mostActive: { time: -1, count: 0 },
  },
};

export default preloadedState;
