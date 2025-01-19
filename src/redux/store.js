import { configureStore } from "@reduxjs/toolkit";
import { transportReducer } from "../redux/transport/transportSlice.js";
import { favouritesReducer } from "./favourites/favouritesSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: {
    transport: transportReducer,
    favorites: favouritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
