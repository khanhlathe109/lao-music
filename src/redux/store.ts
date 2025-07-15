import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import GlobalSettingSlice from "./slices/GlobalSettingSlice";
import audioPlayerSlice from "./slices/audioPlayerSlice";
import UserSlice from "./slices/UserSlice"; // Nếu bạn có quản lý user

import Config from "../config";

// --------------------------
// STORAGE CONFIG
// --------------------------
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// --------------------------
// PERSIST CONFIG
// --------------------------
const persistConfig = {
  key: Config.STORE_NAME,
  version: 1,
  storage,
  blacklist: ["modal", "player"],
};

const settingsPersistConfig = {
  key: "settings",
  storage,
  blacklist: [],
};

// --------------------------
// COMBINED REDUCERS
// --------------------------
const rootReducers = combineReducers({
  settings: persistReducer(settingsPersistConfig, GlobalSettingSlice),
  audioPlayer: audioPlayerSlice,
  user: UserSlice, // Nếu không dùng thì xóa dòng này đi
});

// --------------------------
// PERSISTED REDUCER
// --------------------------
const persistedReducer = persistReducer(persistConfig, rootReducers);

// --------------------------
// STORE
// --------------------------
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// --------------------------
// EXPORTS
// --------------------------
export const persistor = persistStore(store);
export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
