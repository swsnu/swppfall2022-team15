import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/project";
import targetReducer from "./slices/target";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    target: targetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
