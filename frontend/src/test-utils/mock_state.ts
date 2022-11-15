import {RootState} from "../store";

const preloadedState:  RootState = {
    project: {
        selectedProject: {
            id: 1,
            project_type: "ORGANIZATION",
            name: "test",
        },
        projects: [],
    },
    notification: {
        notifications: [],
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
            }
        ],
        selectedTarget: null,
    },
    message: {
        messages: [
            {
                id: 1,
                project: "1",
                content: "test message"

            }
        ],
        selectedMessage: null,
    },
};

export default preloadedState;