import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { authSlice } from "./features/auth/authSlice";

export const configStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },

    devTools: true,
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({ serializableCheck: false }).concat(
        apiSlice.middleware
      ),
  });

export const store = configStore();
export type AppStore = ReturnType<typeof configStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
