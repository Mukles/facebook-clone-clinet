import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "../../../types/toastTypes";

export const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Array<Toast>,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Toast>) => {
      state.push({ ...payload, timeout: payload.timeout || 5000 });
    },

    removeToast: (state, { payload: id }) => {
      state = state.filter((_todo) => _todo.id !== id);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
