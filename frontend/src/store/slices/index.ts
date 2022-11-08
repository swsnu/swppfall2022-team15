import {
  combineReducers,
  PreloadedState,
  configureStore,
} from "@reduxjs/toolkit";

import projectReducer from "./project";
import notificationReducer from "./notifications";
import targetReducer from "./target";
import { RootState } from "../index";

const rootReducer = combineReducers({
  project: projectReducer,
  notification: notificationReducer,
  target: targetReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default rootReducer;
