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
        const { _id, email } = (getState() as RootState).auth.user || {};
        const { post, user } = result.data || {};

        dispatch(
          apiSlice.util.updateQueryData(
            "getPosts" as never,
            { userId: _id, email } as never,
            (draftPosts: any) => {
              draftPosts.unshift({ ...post, user });
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
    }),

    deltePost: build.mutation({
      query: (data) => ({
        url: `/post/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        const result = await queryFulfilled;
        console.log("delted", args);
        const { _id, email } = (getState() as RootState).auth.user || {};
        if (result.data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId: _id, email } as never,
              (draftPosts: any) => {
                const filterdPost: any = draftPosts.filter(
                  (post: any) => post._id !== args.id
                );
                draftPosts = [...filterdPost];
                return draftPosts;
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
        const { _id, email } = (getState() as RootState).auth.user || {};
        const id: string = args.get("postId");

        if (result.data) {
          console.log(result);
          dispatch(
            apiSlice.util.updateQueryData(
              "getPosts" as never,
              { userId: _id, email } as never,
              (draftPosts: any) => {
                const index = draftPosts.findIndex(
                  (post: any) => post._id === id
                );
                draftPosts[index] = {
                  ...draftPosts[index],
                  ...result.data.post,
                };
              }
            )
          );
        }
      },
    }),
  }),
});

export const {
  useAddMutation,
  useGetPostsQuery,
  useEditPostMutation,
  useDeltePostMutation,
} = postApi;
