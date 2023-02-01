import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") || "light",
  },
  reducers: {
    toggleTheme: (state, { payload }: PayloadAction<"dark" | "light">) => {
      state.mode = payload;
      localStorage.setItem("darkMode", JSON.stringify(payload));
    },
  },
});

export const { toggleTheme } = timeSlice.actions;
