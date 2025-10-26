// src/app/features/dashboard/dashboardSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

const initialState = {
  stats: {
    totalContacts: 0,
    contactsByGroup: [],
  },
  isLoading: false,
  error: null,
};

// Async Thunk for getting analytics
export const getAnalytics = createAsyncThunk(
  "dashboard/getAnalytics",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getAnalytics();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetAnalytics: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAnalytics } = dashboardSlice.actions;
export default dashboardSlice.reducer;
