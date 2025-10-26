// src/services/api.js

import axios from "axios";
import { store } from "../app/store"; // We'll use this to get the token

// Create a new Axios instance
const api = axios.create({
  baseURL: "/api", // This uses the proxy we set up in vite.config.js
  headers: {
    "Content-Type": "application/json",
  },
});

/*
  This is a 'request interceptor'. It's a piece of code that
  runs BEFORE every single request our 'api' instance makes.
*/
api.interceptors.request.use(
  (config) => {
    // Get the auth state from our Redux store
    const { token } = store.getState().auth;

    if (token) {
      // If the token exists, add it to the request headers
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
