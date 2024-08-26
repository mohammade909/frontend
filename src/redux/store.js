// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import packageReducer from "./packageSlice";
import platformReducer from "./platformSlice";
import brokerReducer from "./brokerSlice";
import riskruleReducer from "./riskruleSlice";
import accountReducer from "./accountSlice";
import walletReducer from "./walletSlice";
import notificationReducer from "./notificationSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,// Add any other reducers here.
  packages: packageReducer,// Add any other reducers here.
  platforms: platformReducer,// Add any other reducers here.
  brokers: brokerReducer,// Add any other reducers here.
  riskrules: riskruleReducer,// Add any other reducers here.
  accounts: accountReducer,// Add any other reducers here.
  wallet: walletReducer,// Add any other reducers here.
  notifications: notificationReducer,// Add any other reducers here.
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [],
  debug: true,
  timeout: 0,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
