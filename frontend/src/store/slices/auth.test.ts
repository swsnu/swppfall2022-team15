import {
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkMiddleware,
} from "@reduxjs/toolkit";
import axios from "axios";

import { AuthUser } from "../../types";
import reducer, { authenticate, getToken, setToken } from "./auth";

describe("auth reducer", () => {
  let store: EnhancedStore<
    {
      auth: { user: AuthUser | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          auth: {
            user: AuthUser | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeUser = {
    email: "test@test.com",
    username: "testuser",
  };

  beforeAll(() => {
    store = configureStore({ reducer: { auth: reducer } });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      user: null,
    });
  });

  it("should handle authentication success", async () => {
    setToken("token string");
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeUser,
      });
    });
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(fakeUser);
  });

  it("should handle authentication failure", async () => {
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(null);

    setToken("token string");
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      throw new Error("");
    });
    await store.dispatch(authenticate());
    expect(store.getState().auth.user).toEqual(null);
    expect(getToken()).toEqual(null);
  });

  // it("should handle fetch message", async () => {
  //   jest.spyOn(axios, "get").mockImplementation((url: string) => {
  //     return Promise.resolve({
  //       data: fakeMessages[0],
  //     });
  //   });
  //   await store.dispatch(fetchMessage(1));
  //   expect(store.getState().message.selectedMessage).toEqual(fakeMessages[0]);
  // });

  // it("should handle create message", async () => {
  //   jest.spyOn(axios, "post").mockResolvedValue({ data: fakeMessages[0] });

  //   await store.dispatch(
  //     createMessage({
  //       project: 1,
  //       content: "test content",
  //     })
  //   );
  //   expect(store.getState().message.selectedMessage).toEqual(fakeMessages[0]);
  // });

  // it("should handle fetch messages by project id", async () => {
  //   jest.spyOn(axios, "get").mockImplementation((url: string) => {
  //     return Promise.resolve({
  //       data: [fakeMessages[0]],
  //     });
  //   });
  //   await store.dispatch(fetchMessagesByProjectId(1));
  //   expect(store.getState().message.messages).toEqual([fakeMessages[0]]);
  // });
});
