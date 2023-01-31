import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { authSlice } from "./features/auth/authSlice";
import { searchSlice } from "./features/search/searchSlice";
import { timeSlice } from "./features/theme/themeSlice";
import { toastSlice } from "./features/toast/toastSlice";

export const configStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [toastSlice.name]: toastSlice.reducer,
      [searchSlice.name]: searchSlice.reducer,
      [timeSlice.name]: timeSlice.reducer,
    },

    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(apiSlice.middleware),
  });

export const store = configStore();
export type AppStore = ReturnType<typeof configStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
