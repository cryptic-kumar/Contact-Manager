// src/App.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Outlet renders the matched route's component */}
        <Outlet />
      </Container>
    </>
  );
}

export default App;
