import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: "",
  isModalOpened: false,
};

const inputValidationSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      const { error, message, showModal } = action.payload;
      state.error = error;
      state.errorMessage = message;
      state.isModalOpened = showModal;
    },
  },
});

export const { setError } = inputValidationSlice.actions;
export default inputValidationSlice.reducer;
