import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { authSlice } from "./features/auth/authSlice";

export const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },

    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({ serializableCheck: false }).concat(
        apiSlice.middleware
      ),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
