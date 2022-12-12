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
    }),
  }),
});

export const {
  useAddMutation,
  useGetPostsQuery,
  useEditPostMutation,
  useDeltePostMutation,
} = postApi;
