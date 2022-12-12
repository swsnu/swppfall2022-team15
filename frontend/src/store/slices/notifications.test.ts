import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import reducer, {
  fetchNotifications,
  fetchAllNotifications,
} from "./notifications";
import { EnumNotificationStatus } from "../../Enums";
import { NotificationType } from "../../types";

describe("notification reducer", () => {
  let store: EnhancedStore<
    {
      notification: {
        notifications: NotificationType[];
        selectedNotification: NotificationType | null;
        notifications_selectedProject: NotificationType[] | null;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          notification: {
            notifications: NotificationType[];
            selectedNotification: NotificationType | null;
            notifications_selectedProject: NotificationType[] | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeNotifications: NotificationType[] = [
    {
      id: 1,
      status: EnumNotificationStatus.SUCCESS,
      message: "test",
      reservedAt: "2021-01-01",
      type: "SLACK",
    },
    {
      id: 2,
      status: EnumNotificationStatus.FAILURE,
      message: "test",
      reservedAt: "2021-01-01",
      type: "SMS",
    },
    {
      id: 3,
      status: EnumNotificationStatus.PENDING,
      message: "test",
      reservedAt: "2021-01-01",
      type: "EMAIL",
    },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { notification: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      notifications: [],
      selectedNotification: null,
      notifications_selectedProject: null,
    });
  });

  it("should handle fetch notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications[0],
      });
    });
    await store.dispatch(fetchNotifications(1));
    expect(store.getState().notification.notifications_selectedProject).toEqual(
      fakeNotifications[0]
    );
  });

  it("should handle fetch all notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications,
      });
    });
    await store.dispatch(fetchAllNotifications());

    expect(store.getState().notification.notifications).toEqual(
      fakeNotifications
    );
  });
});
