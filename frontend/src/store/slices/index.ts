import { combineReducers, PreloadedState, configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project";
import notificationReducer from "./notifications";
import { RootState } from "../index";

const rootReducer = combineReducers({
    project: projectReducer,
    notification: notificationReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export default rootReducer;