import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation({
      query: ({ content: comment, postId, userId, image }) => {
        const formData = new FormData();
        formData.append("content", comment);
        formData.append("postId", postId);
        formData.append("userId", userId as string);
        formData.append("userId", image);
        return {
          url: "/comment/",
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data?._id) {
            console.log({ result });
            dispatch(
              apiSlice.util.updateQueryData(
                "getCommentLists" as never,
                { postId } as never,
                (draftComments: any) => {
                  //draftComments.unshift({ ...result.data });
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    getCommentLists: build.query({
      query: ({ postId }) => ({
        url: `/comment/${postId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddCommentMutation, useGetCommentListsQuery } = commentApi;
