import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "@reduxjs/toolkit";

import { UserType } from "../../types";
import reducer from "./user";

describe("user reducer", () => {
  let store: EnhancedStore<
    {
      user: { selectedUser: UserType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          user: { selectedUser: UserType | null };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeUser: UserType = {
    id: 1,
    username: "test",
    email: "",
    password: "",
    is_active: true,
  };

  beforeAll(() => {
    store = configureStore({ reducer: { user: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      selectedUser: null,
    });
  });

  it("should handle login", async () => {
    store.dispatch({ type: "user/login", payload: fakeUser });
    expect(store.getState().user.selectedUser).toEqual(fakeUser);
  });
});
