import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchUsers,
  addRequest,
  updateRequest,
  deleteRequest,
} from "../thunks";

const initialState = {
  users: [],
  status: "idle",
  itemStatus: "idle",
  itemError: null,
  error: null,
};

const userListSlice = createSlice({
  name: "user-list",
  initialState,
  reducers: {
    setItemError: (state, action) => {
      state.itemError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.itemStatus = "succeeded";
        state.users.unshift(action.payload);
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const { id, newUser } = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
          state.users[userIndex] = newUser;
        }
        state.itemStatus = "succeeded";
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
        state.itemStatus = "succeeded";
      })
      .addMatcher(
        isAnyOf(
          addRequest.rejected,
          updateRequest.rejected,
          deleteRequest.rejected
        ),
        (state, action) => {
          state.itemStatus = "failed";
          state.itemError = action.error.message;
        }
      )
      .addMatcher(
        isAnyOf(
          addRequest.pending,
          updateRequest.pending,
          deleteRequest.pending
        ),
        (state) => {
          state.itemStatus = "loading";
        }
      );
  },
});

export const { setItemError } = userListSlice.actions;
export default userListSlice.reducer;
