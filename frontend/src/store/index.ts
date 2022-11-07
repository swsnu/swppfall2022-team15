import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
