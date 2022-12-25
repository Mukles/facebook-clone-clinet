import { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";
import { setPicture, userLogin } from "../auth/authSlice";

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
        if (result.data) {
          const { converPicture } = result.data.user;
          dispatch(setPicture({ converPicture }));
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId: _id, email } as never,
              (draftPosts: any) => {
                draftPosts.unshift({
                  ...result.data.post,
                  user: { ...result.data.user },
                });
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
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        console.log(result);
        const { _id, email } = (getState() as RootState).auth.user || {};
        if (result.data) {
          const { profilePicture } = result.data.user;
          dispatch(setPicture({ profilePicture }));
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId: _id, email } as never,
              (draftPosts: any) => {
                draftPosts.unshift({
                  ...result.data.post,
                  user: { ...result.data.user },
                });
              }
            )
          );
        }
      },
    }),

    updateUser: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/user/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      async onQueryStarted(args, { queryFulfilled, getState, dispatch }) {
        const result = await queryFulfilled;
        if (result.data) {
          dispatch(userLogin({ user: result.data.user, loading: false }));
        }
      },
    }),

    getReqUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    getSuggestionFrieds: build.query({
      query: (userId) => ({
        url: "/user/suggestions",
        method: "GET",
        params: { userId },
      }),
    }),

    sentFriendRequest: build.mutation({
      query: ({ friendId, userId }) => ({
        url: `/user/request/friend/${friendId}`,
        method: "POST",
        body: { userId },
      }),
    }),

    cancelFriendRequest: build.mutation({
      query: (requestId) => ({
        url: `/user/cancel/friend/${requestId}`,
        method: "PUT",
      }),
    }),

    getFriendRequestList: build.query({
      query: (currentUserId) => ({
        url: `/user/requestlist/${currentUserId}`,
        method: "GET",
      }),
    }),

    accpetFriendRequest: build.mutation({
      query: (requestId) => ({
        url: `/user/request/accept/${requestId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCoverChangeMutation,
  useProfileChangeMutation,
  useUpdateUserMutation,
  useGetSuggestionFriedsQuery,
  useGetReqUserQuery,
  useSentFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendRequestListQuery,
  useAccpetFriendRequestMutation,
} = userApi;
