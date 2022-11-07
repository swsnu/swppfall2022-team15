import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

import { NotificationType } from "../../types";

export const fetchNotifcations = createAsyncThunk(
    "notifications/fetchNotifications",
    async (projectId: number) => {
        const response = await axios.get<NotificationType[]>(`/api/project/${projectId}notification/`);
        return response.data;
    }
);

const initialState: {
    notifications: NotificationType[];
} = {
    notifications: [],
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifcations.fulfilled, (state, action) => {
            state.notifications = action.payload;
        });
    }
});

export const notificationListSelector = (state: RootState) => state.notification.notifications;
export const notificaitonActions = notificationSlice.actions;

export default notificationSlice.reducer;
