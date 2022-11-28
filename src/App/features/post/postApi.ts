import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    add: build.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      }),
    }),
  }),
});

export const { useAddMutation } = postApi;
