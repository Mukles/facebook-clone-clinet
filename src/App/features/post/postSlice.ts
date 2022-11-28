import { createSlice } from "@reduxjs/toolkit";

interface types {
  caption: String;
  image: File | null;
}
const initialState: types = {
  caption: "",
  image: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setValues: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setValues } = postSlice.actions;
