import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, addRequest, updateRequest, deleteRequest } from "./thunks";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userListSlice = createSlice({
  name: "user-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
    // .addCase(updateRequest.fulfilled, (state, action) => {
    //   const { id, newUser } = action.payload;
    //   const userIndex = state.users.findIndex((user) => user.id === id);
    //   if (userIndex !== -1) {
    //     state.users[userIndex] = newUser;
    //   }
    // })
    // .addCase(deleteRequest.fulfilled, (state, action) => {
    //   const id = action.payload;
    //   state.users = state.users.filter((user) => user.id !== id);
    // });
  },
});

// export const { addUser, editUser, removeUser } = userListSlice.actions;
export default userListSlice.reducer;
