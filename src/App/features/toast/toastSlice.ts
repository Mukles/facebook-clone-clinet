import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IToast } from "../../../types/toastTypes";

export const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Array<IToast>,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Omit<IToast, "id">>) => {
      state.unshift({
        ...payload,
        id: uuidv4(),
        timeout: payload.timeout || 5000,
      });
    },

    removeToast: (state, { payload: id }: PayloadAction<string>) =>
      (state = state.filter((_todo) => _todo.id !== id)),

    moveToast: (state) => {
      const toast = state.shift();
      state.push(toast as IToast);
    },
  },
});

export const { addToast, removeToast, moveToast } = toastSlice.actions;
