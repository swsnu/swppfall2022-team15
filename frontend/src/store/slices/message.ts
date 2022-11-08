import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { MessageType } from "../../types";

export const fetchMessages = createAsyncThunk(
  "message/fetachMessages",
  async () => {
    const response = await axios.get<MessageType[]>("/api/message/");
    return response.data;
  }
);

export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (messageId: number) => {
    const response = await axios.get<MessageType>(`/api/message/${messageId}/`);
    return response.data;
  }
);

const initialState: {
  messages: MessageType[];
} = {
  messages: [],
};

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const messageListSelector = (state: RootState) => state.message.messages;
export const messageSelect = (state: RootState) => state.message;
export default MessageSlice.reducer;
