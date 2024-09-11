import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.hasError = false;
      state.errorMessage = "";
    },
  },
});

export const { addUser, editUser, deleteUser } = userListSlice.actions;
export default userListSlice.reducer;
