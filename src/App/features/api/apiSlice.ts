import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: "http://localhost:8080" + "/api",
    prepareHeaders: async (header, { getState, endpoint }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        header.set("Authorization", `bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({}),
});
