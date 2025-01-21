import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavourites: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload); // Додаємо ID в масив
      }
    },
    removeFromFavourites: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
