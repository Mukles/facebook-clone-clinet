import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    changeTheme: () => {},
  },
});

export const { changeTheme } = timeSlice.actions;
