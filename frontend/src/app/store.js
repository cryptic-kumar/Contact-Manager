// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import contactReducer from "./features/contacts/contactSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
    dashboard: dashboardReducer,
  },
});
