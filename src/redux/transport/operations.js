import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import toast from "react-hot-toast";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/";

export const fetchCampers = createAsyncThunk(
  "campers/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/campers");
      console.log("fetchCampers", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchByIdCamper = createAsyncThunk(
  "campers/getById",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/campers/${id}`);
      console.log("fetchByIdCamper", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
