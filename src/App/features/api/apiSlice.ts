import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: process.env.REACT_APP_URL + "/api",
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
