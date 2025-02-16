import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/";

export const fetchCampers = createAsyncThunk(
  "campers/getAll",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get("/campers", { params });
      return data;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchByIdCamper = createAsyncThunk(
  "campers/getById",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/campers/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
