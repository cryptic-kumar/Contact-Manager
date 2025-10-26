// src/pages/Dashboard.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnalytics } from "../app/features/dashboard/dashboardSlice";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ContactsByGroupChart from "../components/ContactsByGroupChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "User"}!
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* --- Total Contacts Card --- */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
            }}
          >
            <PeopleIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Total Contacts
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalContacts}
            </Typography>
          </Paper>
        </Grid>

        {/* --- Contacts by Group Chart --- */}
        <Grid item xs={12} md={8}>
          {stats.contactsByGroup.length > 0 ? (
            <ContactsByGroupChart data={stats.contactsByGroup} />
          ) : (
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 240,
              }}
            >
              <Typography>
                No group data to display. Add some contacts!
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
