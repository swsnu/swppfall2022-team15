import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import { EnumNotificationStatus } from "../../Enums";
import { NotificationType } from "../../types";
import reducer, { fetchNotifications, fetchAllNotifications, createNotification } from "./notifications";

describe("notification reducer", () => {
  let store: EnhancedStore<
    {
      notification: { notifications: NotificationType[]; selectedNotification: NotificationType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          notification: {
            notifications: NotificationType[];
            selectedNotification: NotificationType | null;
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
      type: "API",
    },
    {
      id: 2,
      status: EnumNotificationStatus.FAILURE,
      message: "test",
      reservedAt: "2021-01-01",
      type: "API",
    },
    {
      id: 3,
      status: EnumNotificationStatus.PARTIAL_SUCCESS,
      message: "test",
      reservedAt: "2021-01-01",
      type: "API",
    },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { notification: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      notifications: [],
      selectedNotification: null,
    });
  });


  it("should handle fetch notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications,
      });
    });
    await store.dispatch(fetchNotifications(1));
  });

  it("should handle fetch all notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications,
      });
    });
    await store.dispatch(fetchAllNotifications());
  });

  it("should handle create notification", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: fakeNotifications[0] });

    await store.dispatch(
      createNotification({
        id: 1,
        status: EnumNotificationStatus.SUCCESS,
        message: "test",
        reservedAt: "2021-01-01",
        type: "API",
      })
    );
    expect(store.getState().notification.notifications[0]).toEqual(
      fakeNotifications[0]
    );
  });

});
