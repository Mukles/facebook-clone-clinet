import { apiSlice } from "../api/apiSlice";
import { setPicture } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    coverChange: build.mutation({
      query: (data) => ({
        url: "/user/cover",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        if (result.data) {
          const { converPicture } = result.data.user;
          dispatch(setPicture({ converPicture }));
        }
      },
    }),

    profileChange: build.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        if (result.data) {
          const { profilePicture } = result.data.user;
          dispatch(setPicture({ profilePicture }));
        }
      },
    }),
  }),
});

export const { useCoverChangeMutation, useProfileChangeMutation } = userApi;
