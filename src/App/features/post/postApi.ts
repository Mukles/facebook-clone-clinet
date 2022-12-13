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
        dispatch(
          apiSlice.util.updateQueryData(
            "getPosts" as never,
            { userId: _id, email } as never,
            (draft) => {
              console.log(JSON.parse(JSON.stringify(draft)));
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
