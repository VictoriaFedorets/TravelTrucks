import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transportReducer from "./transport/slice.js";
// import filtersReducer from "./filtersSlice.js";
import favouritesReducer from "./favourites/slice.js";

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
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["favourites"], // Тільки favourites буде збережено
};

const rootReducer = combineReducers({
  transport: transportReducer,
  favourites: favouritesReducer,
  //   filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
