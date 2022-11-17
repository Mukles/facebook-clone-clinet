import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    user: null,
    token: null,
    loading: false,
  },
  reducers: {
    userLogin: (state, { payload }) => ({
      ...state,
      loading: payload.loading,
      user: payload.user,
      token: payload.token,
      error: payload.error,
    }),
  },
});

export const { userLogin } = authSlice.actions;
