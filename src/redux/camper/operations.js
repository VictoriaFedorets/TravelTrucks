import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import toast from "react-hot-toast";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/";

export const fetchCampers = createAsyncThunk(
  "campers/getAll",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get("/campers", { params });
      // console.log("fetchCampers", data);
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
      // console.log("Fetching camper with ID:", id); // Лог перед запросом
      const { data } = await axios.get(`/campers/${id}`);
      // console.log("fetchByIdCamper response:", data); // Лог успешного ответа
      return data;
    } catch (error) {
      // console.error("Error fetching camper by ID:", error.message); // Лог ошибки
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
