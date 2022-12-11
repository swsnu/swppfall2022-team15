import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { NotificationType } from "../../types";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async () => {
    const response = await axios.get<NotificationType[]>(`/api/notification/`);
    return response.data;
  }
);

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (projectId: number) => {
    const response = await axios.get<NotificationType[]>(`/api/project/${projectId}/notification/`);
    return response.data;
  }
);

const initialState: {
    notifications: NotificationType[];
    selectedNotification: NotificationType | null;
    notifications_selectedProject: NotificationType[] | null;
} = {
    notifications: [],
    selectedNotification: null,
    notifications_selectedProject: null,
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications_selectedProject = action.payload;
      });
      builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
    }
});

export const notificationListSelector = (state: RootState) => state.notification.notifications;
export const notificationSelect = (state: RootState) => state.notification;
export default notificationSlice.reducer;
