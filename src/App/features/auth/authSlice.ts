import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/userTypes";

const user: IUser = {};

const initialState = {
  error: null,
  user,
  token: null,
  loading: true,
  formData: null,
  index: 1,
  direction: -1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
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

    setPicture: (state, { payload }) => ({
      ...state,
      user: { ...state.user, ...payload },
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

export const { userLogin, setFormData, setIndex, setDirection, setPicture } =
  authSlice.actions;
