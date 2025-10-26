// src/app/features/dashboard/dashboardService.js

import api from "../../../services/api";

// Get dashboard analytics
const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data;
};

const dashboardService = {
  getAnalytics,
};

export default dashboardService;
