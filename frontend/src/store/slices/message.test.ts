import {
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkMiddleware,
} from "@reduxjs/toolkit";
import axios from "axios";

import { MessageType } from "../../types";
import reducer, {
  fetchMessage,
  fetchMessages,
  createMessage,
  fetchMessagesByProjectId,
} from "./message";

describe("message reducer", () => {
  let store: EnhancedStore<
    {
      message: { messages: MessageType[]; selectedMessage: MessageType | null };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          message: {
            messages: MessageType[];
            selectedMessage: MessageType | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeMessages: MessageType[] = [
    { id: 1, project: "1", content: "content1" },
    { id: 2, project: "2", content: "content2" },
    { id: 3, project: "3", content: "content3" },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { message: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      messages: [],
      selectedMessage: null,
    });
  });

  it("should handle fetch messages", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeMessages,
      });
    });
    await store.dispatch(fetchMessages());
    expect(store.getState().message.messages).toEqual(fakeMessages);
  });

  it("should handle fetch message", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: fakeMessages[0],
      });
    });
    await store.dispatch(fetchMessage(1));
    expect(store.getState().message.selectedMessage).toEqual(fakeMessages[0]);
  });

  it("should handle create message", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: fakeMessages[0] });

    await store.dispatch(
      createMessage({
        project: 1,
        content: "test content",
      })
    );
    expect(store.getState().message.selectedMessage).toEqual(fakeMessages[0]);
  });

  it("should handle fetch messages by project id", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: [fakeMessages[0]],
      });
    });
    await store.dispatch(fetchMessagesByProjectId(1));
    expect(store.getState().message.messages).toEqual([fakeMessages[0]]);
  });
});
