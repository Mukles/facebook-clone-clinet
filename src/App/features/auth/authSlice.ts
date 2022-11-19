import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    user: null,
    token: null,
    loading: true,
    formData: null,
  },
  reducers: {
    userLogin: (state, { payload }) => ({
      ...state,
      loading: payload.loading,
      user: payload.user,
      token: payload.token,
      error: payload.error,
    }),
    setFormData: (state, { payload }) => ({
      ...state,
      formData: { ...payload },
    }),
  },
});

export const { userLogin, setFormData } = authSlice.actions;
