import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    add: build.mutation({
      query: (data) => ({
        url: "/post/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddMutation } = postApi;
