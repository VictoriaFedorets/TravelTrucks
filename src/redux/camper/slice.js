import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchByIdCamper } from "./operations";

const camperSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    current: {},
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.items;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchByIdCamper.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchByIdCamper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.current = action.payload;
      })
      .addCase(fetchByIdCamper.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default camperSlice.reducer;
