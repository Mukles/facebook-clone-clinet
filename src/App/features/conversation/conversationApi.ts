import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addConversation: build.mutation({
      query: ({ sender, recipient, message }) => ({
        url: "/conversation/add",
        method: "PATCH",
        body: { sender, recipient, message },
      }),
    }),
    getConversationList: build.query({
      query: ({ sender, recipient }) => ({
        url: "conversation/",
        method: "GET",
        params: { sender, recipient },
      }),
    }),
  }),
});

export const { useAddConversationMutation, useGetConversationListQuery } = conversationApi;
