import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/dist/query";
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
          const { _id } = (getState() as RootState).auth.user || {};
          const { post, user } = result.data || {};
          if (post) {
            const { converPicture } = result.data.user;
            dispatch(setPicture({ converPicture }));
            dispatch(
              apiSlice.util.updateQueryData(
                "getPosts" as never,
                { userId: _id } as never,
                (draftPosts: any) => {
                  draftPosts.size += 1;
                  draftPosts.posts.unshift({ ...post, user });
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
          const { _id } = (getState() as RootState).auth.user || {};
          if (result.data) {
            const { profilePicture } = result.data.user;
            dispatch(setPicture({ profilePicture }));
            dispatch(
              apiSlice.util.updateQueryData(
                "getPosts" as never,
                { userId: _id } as never,
                (draftPosts: any) => {
                  draftPosts.size += 1;
                  draftPosts.posts.unshift({
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
      async onQueryStarted({ friendId, userId }, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const { newRequest } = result.data;
        if (newRequest._id) {
          dispatch(
            apiSlice.util.updateQueryData(
              "checkRequestStatus" as never,
              { sender: userId, recipient: friendId } as never,
              (draftRequest: any) => {
                draftRequest[0] = newRequest;

                return draftRequest;
              }
            )
          );
        }
      },
    }),

    cancelFriendRequest: build.mutation({
      query: ({ requestId, userId }) => ({
        url: `/user/cancel/friend/${requestId}`,
        method: "PUT",
        body: { userId },
      }),

      async onQueryStarted({ userId, friendId }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.message) {
            dispatch(
              apiSlice.util.updateQueryData(
                "checkRequestStatus" as never,
                { sender: userId, recipient: friendId } as never,
                (draftRequest: any) => {
                  draftRequest = [];
                  return draftRequest;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    unFriendRequest: build.mutation({
      query: ({ requestId, userId, friendId }) => ({
        url: `/user/request/unfriend/${requestId}`,
        method: "DELETE",
        body: { userId, friendId },
      }),
      async onQueryStarted({ userId, friendId }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.message) {
            dispatch(
              apiSlice.util.updateQueryData(
                "checkRequestStatus" as never,
                { userId, friendId } as never,
                (draftStatus: any) => {
                  draftStatus = [];
                }
              )
            );
          }
        } catch (error) {}
      },
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
      async onQueryStarted({ friendId, userId }, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        if (result.data.message) {
          dispatch(
            apiSlice.util.updateQueryData(
              "checkRequestStatus" as never,
              { sender: userId, recipient: friendId } as never,
              (draftRequest: any) => {
                draftRequest[0].status = "accepted";
                return draftRequest;
              }
            )
          );
        }
      },
    }),

    deleteFriendRequest: build.mutation({
      query: ({ requestId, userId }) => ({
        url: `/user/request/delete/${requestId}`,
        method: "DELETE",
        body: { userId },
      }),
      async onQueryStarted({ friendId, userId }, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        if (result.data.message) {
          dispatch(
            apiSlice.util.updateQueryData(
              "checkRequestStatus" as never,
              { sender: userId, recipient: friendId } as never,
              (draftRequest: any) => {
                draftRequest = [];
                return draftRequest;
              }
            )
          );
        }
      },
    }),

    checkRequestStatus: build.query({
      query: ({ sender, recipient }) => ({
        url: "/user/request/status",
        method: "GET",
        params: { sender, recipient },
      }),

      async onQueryStarted(args) {},
    }),

    getNewsFeed: build.query({
      query: ({ userId, page, skip }) => ({
        url: `/user/newsfeed/${userId}`,
        method: "GET",
        params: { userId, page, skip },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs, endpointDefinition }) => {
        const { userId } = queryArgs;
        return defaultSerializeQueryArgs({
          endpointName,
          queryArgs: { userId },
          endpointDefinition,
        });
      },

      merge: (currentCache, newItems) => {
        currentCache?.posts.push(...newItems.posts);
        currentCache.size = newItems.size;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg.page !== previousArg?.page;
      },
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
          if (data) {
            dispatch(setDetails(data));
          }
        } catch (error) {}
      },
    }),

    getUploadedImages: build.query({
      query: ({ userId }) => ({
        url: `/user/uploads/${userId}`,
        method: "GET",
      }),
    }),

    getFriendList: build.query({
      query: (userId) => ({
        url: `/user/friend-list/${userId}`,
        method: "GET",
      }),
    }),

    getFriends: build.query({
      query: ({ userId }) => ({
        url: `/user/friends/${userId}`,
        method: "GET",
      }),
    }),

    getMutualFriends: build.query({
      query: ({ user1Id, user2Id }) => ({
        url: "/user/mutual/friends",
        params: { user1Id, user2Id },
        method: "GET",
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
  useDeleteFriendRequestMutation,
  useUnFriendRequestMutation,
  useCheckRequestStatusQuery,
  useGetFriendListQuery,
  useGetNewsFeedQuery,
  useUpdaterUserDetailsMutation,
  useUpdateBioMutation,
  useGetUploadedImagesQuery,
  useGetFriendsQuery,
  useGetMutualFriendsQuery,
} = userApi;
