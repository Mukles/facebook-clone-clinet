import { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";
import { setBio, setDetails, setPicture, userLogin } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    coverChange: build.mutation({
      query: (data) => ({
        url: "/user/cover",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
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
        } catch (error) {}
      },
    }),

    profileChange: build.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
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
        } catch (error) {}
      },
    }),

    updateUser: build.mutation({
      query: (data) => {
        return {
          url: `/user/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      async onQueryStarted(args, { queryFulfilled, getState, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(userLogin({ user: result.data.user, loading: false }));
          }
        } catch (error) {}
      },
    }),

    updateBio: build.mutation({
      query: (data) => {
        return {
          url: `/user/bio/${data.userId}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const bio = result.data?.bio;
        console.log({ bio });

        if (bio) {
          dispatch(setBio(bio));
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
      query: ({ requestId, userId }) => ({
        url: `/user/cancel/friend/${requestId}`,
        method: "PUT",
        body: { userId },
      }),
    }),

    getFriendRequestList: build.query({
      query: (currentUserId) => ({
        url: `/user/requestlist/${currentUserId}`,
        method: "GET",
      }),
    }),

    accpetFriendRequest: build.mutation({
      query: ({ userId, requestId }) => ({
        url: `/user/request/accept/${requestId}`,
        method: "PUT",
        body: { userId },
      }),
    }),

    deleteFriendRequest: build.mutation({
      query: ({ requestId, userId }) => ({
        url: `/user/request/delete/${requestId}`,
        method: "DELETE",
        body: { userId },
      }),
    }),

    checkRequestStatus: build.query({
      query: ({ sender, recipient }) => ({
        url: "/user/request/status",
        method: "GET",
        params: { sender, recipient },
      }),
    }),

    getFriendList: build.query({
      query: (userId) => ({
        url: `/user/friend-list/${userId}`,
        method: "GET",
      }),
    }),

    getNewsFeed: build.query({
      query: (userId) => ({
        url: `/user/newsfeed/${userId}`,
        method: "GET",
      }),
    }),

    updaterUserDetails: build.mutation({
      query: ({ userId, data }) => {
        return {
          method: "PATCH",
          url: `/user/about/${userId}`,
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
          const { data } = result || {};
          console.log(data);
          if (data) {
            dispatch(setDetails(data));
          }
        } catch (error) {}
      },
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
  useDeleteFriendRequestMutation,
  useCheckRequestStatusQuery,
  useGetFriendListQuery,
  useGetNewsFeedQuery,
  useUpdaterUserDetailsMutation,
  useUpdateBioMutation,
} = userApi;
