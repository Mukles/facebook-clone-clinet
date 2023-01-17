import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation({
      query: ({ content, postId, userId, image }) => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("postId", postId);
        formData.append("userId", userId as string);
        formData.append("img", image);
        return {
          url: "/comment/",
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted({ postId, page }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data?._id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getCommentLists" as never,
                { postId } as never,
                (draftComments: any) => {
                  draftComments.comments.unshift(result.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    getCommentLists: build.query({
      query: ({ postId, page, skip }) => ({
        url: `/comment/${postId}`,
        method: "GET",
        params: { page, skip },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs, endpointDefinition }) => {
        const { postId } = queryArgs;
        return defaultSerializeQueryArgs({
          endpointName,
          queryArgs: { postId },
          endpointDefinition,
        });
      },

      merge: (currentCache, newItems) => {
        currentCache?.comments.push(...newItems.comments);
        currentCache.size = newItems.size;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg.page !== previousArg?.page;
      },
    }),
    replyComment: build.mutation({
      query: ({ content, userId, image, commentId }) => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("userId", userId as string);
        formData.append("img", image);
        return {
          url: `/comment/${commentId}`,
          method: "PATCH",
          body: formData,
        };
      },
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;
          if (result.data?._id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getCommentLists" as never,
                { postId } as never,
                (draftComments: any) => {
                  const singleComment = draftComments?.comments.find(
                    (comment: any) => comment._id === commentId
                  );
                  singleComment.replies = result.data.replies;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentListsQuery,
  useReplyCommentMutation,
} = commentApi;
