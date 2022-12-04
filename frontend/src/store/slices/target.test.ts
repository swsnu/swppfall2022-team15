import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";

import { EnumNotificationType } from "../../Enums";
import { TargetType } from "../../types";
import reducer, { fetchTargets, fetchTarget, createTarget, fetchTargetsByProjectId } from "./target";

describe("target reducer", () => {
  let store: EnhancedStore<
    {
      target: { targets: TargetType[]; selectedTarget: TargetType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          target: { targets: TargetType[]; selectedTarget: TargetType | null };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeTargets: TargetType[] = [
    { id: 1, name: "testAPI", notification_type: EnumNotificationType.API, endpoint: "/", project: 1 },
    { id: 2, name: "testEMAIL", notification_type: EnumNotificationType.EMAIL, endpoint: "email@email.com", project: 2 },
    { id: 3, name: "testSMS", notification_type: EnumNotificationType.SMS, endpoint: "+82-10-0000-1111", project: 3 },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { target: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      targets: [],
      selectedTarget: null,
    });
  });

  it("should handle fetch targets", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets,
      });
    });
    await store.dispatch(fetchTargets());
    expect(store.getState().target.targets).toEqual(fakeTargets);
  });

  it("should handle fetch target", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeTargets[0],
      });
    });
    await store.dispatch(fetchTarget(1));
    expect(store.getState().target.selectedTarget).toEqual(fakeTargets[0]);
  });

  it("should handle create target", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: fakeTargets[0] });

    await store.dispatch(createTarget({ name: "test", notification_type: EnumNotificationType.API, endpoint: "/"}));
    expect(store.getState().target.selectedTarget).toEqual(fakeTargets[0]);
  });

  it("should handle fetch targets by project id", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: [fakeTargets[0]],
      });
    });
    await store.dispatch(fetchTargetsByProjectId(1));
    expect(store.getState().target.targets).toEqual( [fakeTargets[0]] );
  });

});
