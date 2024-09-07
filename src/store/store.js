import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userListSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
