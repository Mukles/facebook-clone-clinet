import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    add: build.mutation({
      query: (data) => ({
        url: "/post/add",
        method: "POST",
        body: data,
      }),
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
  }),
});

export const { useAddMutation, useGetPostsQuery, useDeltePostMutation } =
  postApi;
