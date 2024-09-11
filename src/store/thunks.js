import { createAsyncThunk } from "@reduxjs/toolkit";
import dataRequest from "../data/data";

const fetchUsers = createAsyncThunk("data/fetchUsers", async () => {
  try {
    const data = await dataRequest(
      {
        url: "https://www.wixapis.com/wix-data/v2/items/query",
        body: {
          dataCollectionId: "Users",
        },
      },
      "FETCH"
    );

    return data;
  } catch (e) {
    throw new Error(e.message);
  }
});
const addRequest = createAsyncThunk("data/updateUser", async () => {});
const updateRequest = createAsyncThunk("data/updateUser", async () => {});
const deleteRequest = createAsyncThunk("data/deleteUserIS ", async () => {});

export { fetchUsers, addRequest, updateRequest, deleteRequest };
