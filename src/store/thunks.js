import { createAsyncThunk } from "@reduxjs/toolkit";
import dataRequest from "../data/data";

const fetchUsers = createAsyncThunk("data/fetchUsers", async () => {
  return dataRequest(
    {
      url: "https://www.wixapis.com/wix-data/v2/items/query",
      body: {
        dataCollectionId: "Users",
      },
    },
    "FETCH"
  );
});
const addRequest = createAsyncThunk("data/addUser", async (data) => {
  return dataRequest(
    {
      url: "https://www.wixapis.com/wix-data/v2/items",
      body: {
        dataCollectionId: "Users",
        dataItem: {
          data: {
            userName: data.userName,
            userAge: data.userAge,
          },
        },
      },
    },
    "ADD"
  );
});
const updateRequest = createAsyncThunk("data/updateUser", async (data) => {
  return dataRequest(
    {
      url: `https://www.wixapis.com/wix-data/v2/items/${data.id}`,
      body: {
        dataCollectionId: "Users",
        dataItem: {
          id: data.id,
          data: {
            _id: data.id,
            userName: data.userName,
            userAge: data.userAge,
          },
        },
      },
    },
    "UPDATE"
  );
});
const deleteRequest = createAsyncThunk("data/deleteUser", async (id) => {
  return dataRequest(
    {
      url: `https://www.wixapis.com/wix-data/v2/items/${id}?dataCollectionId=Users`,
    },
    "DELETE"
  );
});

export { fetchUsers, addRequest, updateRequest, deleteRequest };
