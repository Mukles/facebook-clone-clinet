import { userInputTypes } from "../../../types/registerTypes";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    regster: build.mutation({
      query: (data: userInputTypes) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    login: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    signInAndSignUp: build.mutation({
      query: (data: any) => {
        return {
          url: `auth/signInAndSignUp/${data.user.email}`,
          method: "PUT",
          body: data,
          headers: { Authorization: `Bearer ${data.token}` },
        };
      },
    }),
  }),
});

export const { useRegsterMutation } = authApi;
