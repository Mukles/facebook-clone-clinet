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
      query: ({ sender }) => ({
        url: "conversation/list",
        method: "GET",
        params: { sender },
      }),
    }),

    getMessageList: build.query({
      query: ({ sender, recipient }) => ({
        method: "GET",
        url: "/conversation/messages",
        params: { sender, recipient },
      }),
    }),
  }),
});

export const {
  useAddConversationMutation,
  useGetConversationListQuery,
  useGetMessageListQuery,
} = conversationApi;
