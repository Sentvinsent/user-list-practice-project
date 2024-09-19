import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userListSlice";
import inputValidationReducer from "./Slices/inputValidationSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    input: inputValidationReducer,
  },
});

export default store;
