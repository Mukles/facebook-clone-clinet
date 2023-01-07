import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
