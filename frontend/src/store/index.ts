import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project";
import notificationReducer from "./slices/notifications";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
