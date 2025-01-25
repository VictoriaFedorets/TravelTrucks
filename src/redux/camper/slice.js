import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchByIdCamper } from "./operations";

const camperSlice = createSlice({
  name: "camper",
  initialState: {
    items: [],
    current: {},
    isLoading: true,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        state.items = [];
        state.current = {};
        state.isLoading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.items; // Беремо тільки масив items
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchByIdCamper.pending, (state, action) => {
        state.items = [];
        state.current = {};
        state.isLoading = true;
      })
      .addCase(fetchByIdCamper.fulfilled, (state, action) => {
        console.log("Payload", action.payload);
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
