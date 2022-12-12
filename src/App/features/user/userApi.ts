import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    coverChange: build.mutation({
      query: (data) => ({
        url: "/user/cover",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { getState, queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        console.log(result);
        if (result.data) {
        }
      },
    }),
  }),
});

export const { useCoverChangeMutation } = userApi;
