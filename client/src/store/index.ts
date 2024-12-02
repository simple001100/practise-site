import { createWrapper } from "next-redux-wrapper";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice/projectsSlice";
import authReducer from "./slices/authSlice/authSlice";
import practiceApplicationReducer from "./slices/practiceApplicationSlice/practiceApplicationSlice";
import projectApplicationReducer from "./slices/projectApplicationSlice/projectApplicationSlice";
import errorReducer from "./slices/errorSlice/errorSlice";
import adminReducer from "./slices/adminSlice/adminSlice";

const rootReducer = combineReducers({
    authReducer,
    projectsReducer,
    practiceApplicationReducer,
    projectApplicationReducer,
    errorReducer,
    adminReducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(setupStore);
