// src/app/features/auth/authService.js

import api from "../../../services/api";

// Register user
const register = async (userData) => {
  const response = await api.post("/users", userData);

  if (response.data) {
    // Store the token (which is in response.data)
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post("/auth", userData);

  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Load user (Get user data)
// Note: The token is automatically sent by our 'api' interceptor
const loadUser = async () => {
  const response = await api.get("/auth");
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  loadUser,
  logout,
};

export default authService;
