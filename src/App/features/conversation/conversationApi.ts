import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/dist/query";
import { IUser } from "../../../types/userTypes";
import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addConversation: build.mutation({
      query: ({ sender, recipient, message }) => ({
        url: "/conversation/add",
        method: "PATCH",
        body: { sender, recipient, message },
      }),
      async onQueryStarted(
        { sender, recipient },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;
          const { _id, messages, participants, lastMessage } =
            result.data || {};

          const senderInfo = participants.filter(
            (user: IUser) => user._id === sender
          );
          if (_id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessageList" as never,
                { sender, recipient } as never,
                (draftMessage: any) => {
                  draftMessage.messages.push({
                    ...messages[0],
                    sender: senderInfo,
                  });
                  draftMessage.count++;
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getConversationList" as never,
                { sender } as never,
                (draftConversation: any) => {
                  const conversation = draftConversation.find(
                    (x: any) =>
                      x.participants.includes(sender) &&
                      x.participants.includes(recipient)
                  );
                  console.log({conversation});
                  if (conversation?.lastMessage) {
                    conversation.lastMessage = lastMessage;
                  } else {
                    draftConversation.push({
                      _id,
                      lastMessage,
                      user: [...participants],
                      participants: [participants[0]._id, participants[1]._id],
                    });
                  }
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    getConversationList: build.query({
      query: ({ sender }) => ({
        url: "conversation/list",
        method: "GET",
        params: { sender },
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

    getMessageList: build.query({
      query: ({ sender, recipient, skip }) => ({
        method: "GET",
        url: "/conversation/messages",
        params: { sender, recipient, skip },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs, endpointDefinition }) => {
        const { sender, recipient } = queryArgs;
        return defaultSerializeQueryArgs({
          endpointName,
          queryArgs: { sender, recipient },
          endpointDefinition,
        });
      },

      merge: (currentCache, newItems) => {
        currentCache?.messages.push(...newItems.messages);
        currentCache.count = newItems.count;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg.skip !== previousArg?.skip;
      },
    }),
  }),
});

export const {
  useAddConversationMutation,
  useGetConversationListQuery,
  useGetMessageListQuery,
} = conversationApi;
