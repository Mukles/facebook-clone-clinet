import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  initialState: "",
  name: "search",
  reducers: {
    setSearch: (state, { payload }) => (state = payload),
  },
});

export const { setSearch } = searchSlice.actions;
