// src/components/ContactsByGroupChart.jsx

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography, Paper } from "@mui/material";

// We must register the components we're using
ChartJS.register(ArcElement, Tooltip, Legend);

// 'data' will be our 'contactsByGroup' array
const ContactsByGroupChart = ({ data }) => {
  // Format the data for Chart.js
  const chartData = {
    labels: data.map((group) => group._id), // e.g., ['Work', 'Personal']
    datasets: [
      {
        label: "# of Contacts",
        data: data.map((group) => group.count), // e.g., [3, 2]
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Contacts by Group",
      },
    },
  };

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Analytics
      </Typography>
      {/* We set a max height for the chart container */}
      <Box sx={{ maxHeight: "400px" }}>
        <Doughnut data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default ContactsByGroupChart;
