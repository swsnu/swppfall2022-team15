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
  fetchSlackMessages,
} from "./message";

describe("message reducer", () => {
  let store: EnhancedStore<
    {
      message: {
        messages: { [key: string]: MessageType[] };
        selectedMessage: MessageType | null;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          message: {
            messages: { [key: string]: MessageType[] };
            selectedMessage: MessageType | null;
          };
        },
        AnyAction,
        undefined
      >
    ]
  >;

  const fakeMessages = [
    { id: 1, content: {} },
    { id: 2, content: {} },
    { id: 3, content: {} },
  ];

  beforeAll(() => {
    store = configureStore({ reducer: { message: reducer } });
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      messages: {},
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

  it("should handle fetchSlackMessages", async () => {
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
      return Promise.resolve({
        data: [fakeMessages[0]],
      });
    }
    );
    await store.dispatch(fetchSlackMessages());
    expect(store.getState().message.messages).toEqual([fakeMessages[0]]);
  });
});
