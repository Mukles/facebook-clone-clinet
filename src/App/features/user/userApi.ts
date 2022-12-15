import { RootState } from "../../store";
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
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        const { _id, email } = (getState() as RootState).auth.user || {};
        console.log(result);
        if (result.data) {
          const { converPicture } = result.data.user;
          dispatch(setPicture({ converPicture }));
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId: _id, email } as never,
              (draftPosts: any) => {
                draftPosts.unshift(result.data.post);
              }
            )
          );
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
