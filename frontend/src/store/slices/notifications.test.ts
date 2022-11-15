import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";

import reducer, { fetchNotifcations, } from "./notifications";
import {NotificationType} from "../../types";
import preloadedState from "../../test-utils/mock_state";

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

  const fakeNotifications: NotificationType[] = preloadedState.notification.notifications;

  beforeAll(() => {
    store = configureStore({ reducer: { notification: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      notifications: [],
      selectedNotification: null,
    });
  });

  it("should handle create notification", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: fakeNotifications[0] });
    await store.dispatch(
      fetchNotifcations(1)
    );
    expect(store.getState().notification.notifications).toEqual([fakeNotifications[0]]);
  });

  it("should handle fetch notifications", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeNotifications,
      });
    });
    await store.dispatch(fetchNotifcations(1));
    expect(store.getState().notification.notifications).toEqual(fakeNotifications);
  });

});
