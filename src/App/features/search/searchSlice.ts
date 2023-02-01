import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  initialState: {
    value: "",
  },
  name: "search",
  reducers: {
    setSearch: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
