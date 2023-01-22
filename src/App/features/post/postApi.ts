import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../store";
import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    add: build.mutation({
      query: (data) => {
        return {
          url: "/post/add",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        console.log({ result });
        const { _id } = (getState() as RootState).auth.user || {};
        const { post, user } = result.data || {};

        dispatch(
          apiSlice.util.updateQueryData(
            "getPosts" as never,
            { userId: _id } as never,
            (draftPosts: any) => {
              draftPosts.posts.unshift({ ...post, user });
              draftPosts.size += 1;
            }
          )
        );
      },
    }),

    getPosts: build.query({
      query: (data) => ({
        url: "/post",
        method: "GET",
        params: data,
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

    deltePost: build.mutation({
      query: (data) => ({
        url: `/post/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      async onQueryStarted(
        { id: postId },
        { dispatch, queryFulfilled, getState }
      ) {
        const result = await queryFulfilled;
        const { _id: userId } = (getState() as RootState).auth.user || {};
        if (result.data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId } as never,
              (draftPosts: any) => {
                console.log(JSON.stringify(draftPosts));
                draftPosts.size -= 1;
                const filterdPost: any = draftPosts.posts.filter(
                  (post: any) => post._id !== postId
                );
                draftPosts.posts = filterdPost;
              }
            )
          );
        }
      },
    }),

    editPost: build.mutation({
      query: (formData: any) => {
        const id: string = formData.get("postId");
        const img = formData.get("img");
        const method = !img?.type ? "PUT" : "PATCH";
        return {
          url: `post/${id}`,
          method,
          body: formData,
        };
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const result = await queryFulfilled;
        const id: string = args.get("postId");

        if (result.data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { postId: id } as never,
              (draftPosts: any) => {
                const index = draftPosts.posts.findIndex(
                  (post: any) => post._id === id
                );
                draftPosts.posts[index] = {
                  ...draftPosts[index],
                  ...result.data.post,
                };
              }
            )
          );
        }
      },
    }),

    toogleReactPost: build.mutation({
      query: ({ postId, react, userId }) => ({
        method: "PUT",
        url: `/post/${postId}/react`,
        body: { userId, react },
      }),
    }),
  }),
});

export const {
  useAddMutation,
  useGetPostsQuery,
  useEditPostMutation,
  useDeltePostMutation,
  useToogleReactPostMutation,
} = postApi;
