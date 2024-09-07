import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "testID",
      name: "Pedro",
      age: 20,
    },
    {
      id: "test2Id",
      name: "Pedro Pe",
      age: 21,
    },
    {
      id: "test3Id",
      name: "Pedro Pedro",
      age: 31,
    },
  ],
};

const userListSlice = createSlice({
  name: "user-list",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, newUser } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = newUser;
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, editUser, deleteUser } = userListSlice.actions;
export default userListSlice.reducer;
