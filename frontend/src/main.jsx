// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./app/store";
import theme from "./theme/theme";
import App from "./App";
import "./index.css";

// --- Import all our pages and components ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- IMPORT
import { loadUser } from "./app/features/auth/authSlice"; // <-- IMPORT

// --- Dispatch loadUser if token exists ---
if (localStorage.token) {
  store.dispatch(loadUser());
}
// --- End new code ---

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* The App component is the layout */}
            <Route path="/" element={<App />}>
              {/* === Public Routes === */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* === Protected Routes === */}
              {/* All routes inside here will be protected */}
              <Route element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="contacts" element={<Contacts />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
