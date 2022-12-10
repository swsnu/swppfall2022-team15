import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { EnumNotificationStatus } from "../../Enums";
import { NotificationType } from "../../types";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (projectId: number) => {
    const response = await axios.get<NotificationType[]>(`/api/project/${projectId}/notification/`);
    return response.data;
  }
);

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async () => {
    const response = await axios.get<NotificationType[]>(`/api/notification/`);
    console.log(response);
    return response.data;
  }
);

export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async(notification: {id: number, status: EnumNotificationStatus, message: string, reservedAt: string, type: string}) => {
    const response = await axios.post<NotificationType>("/api/notification/", notification);
    return response.data;
  }
);

const initialState: {
    notifications: NotificationType[];
    selectedNotification: NotificationType | null;
} = {
    notifications: [],
    selectedNotification: null,
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
    }
});

export const notificationListSelector = (state: RootState) => state.notification.notifications;
export const notificationSelect = (state: RootState) => state.notification;
export default notificationSlice.reducer;
