import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    user: null,
    token: null,
    loading: true,
    formData: null,
    index: 1,
    direction: -1,
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

    setIndex: (state, { payload }) => {
      let prev = state.index;
      let direction = prev > payload ? -1 : 1;
      return {
        ...state,
        prev,
        direction,
        index: payload,
      };
    },
    setDirection: (state, { payload }) => ({ ...state, direction: payload }),
  },
});

export const { userLogin, setFormData, setIndex, setDirection } =
  authSlice.actions;
