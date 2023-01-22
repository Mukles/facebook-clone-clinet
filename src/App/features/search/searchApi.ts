import { apiSlice } from "../api/apiSlice";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    searchByname: build.query({
      query: (search) => ({
        method: "GET",
        url: `/search/${search}`,
      }),
    }),

    addSearch: build.mutation({
      query: ({ userId, search }) => ({
        method: "POST",
        url: `/search/${userId}`,
        body: { search },
      }),
      async onQueryStarted({ userId, search }, { queryFulfilled, dispatch }) {
        const patchResult: any = dispatch(
          apiSlice.util.updateQueryData(
            "getSearch" as never,
            userId as never,
            (draft: string[]) => {
              draft.unshift(search);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    getSearch: build.query({
      query: (userId) => ({
        method: "GET",
        url: `/search/history/${userId}`,
      }),
    }),

    deleteSearch: build.mutation({
      query: ({ search, userId }) => ({
        method: "DELETE",
        url: `/search/${userId}`,
        body: { search },
      }),
      async onQueryStarted({ userId, search }, { queryFulfilled, dispatch }) {
        const patchResult: any = dispatch(
          apiSlice.util.updateQueryData(
            "getSearch" as never,
            userId as never,
            (draft: string[]) => {
              console.log(JSON.stringify(draft));
              return (draft = draft.filter((item: string) => item !== search));
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useSearchBynameQuery,
  useAddSearchMutation,
  useGetSearchQuery,
  useDeleteSearchMutation,
} = searchApi;
