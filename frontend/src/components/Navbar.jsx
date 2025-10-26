// src/components/Navbar.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { logout } from "../app/features/auth/authSlice";
import { resetContacts } from "../app/features/contacts/contactSlice";
import ContactsIcon from "@mui/icons-material/Contacts";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetContacts()); // Clear contact state on logout
    navigate("/login");
  };

  const authLinks = (
    <>
      <Button component={RouterLink} to="/" color="inherit">
        Dashboard
      </Button>
      <Button component={RouterLink} to="/contacts" color="inherit">
        Contacts
      </Button>
      <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
    </>
  );

  const guestLinks = (
    <>
      <Button component={RouterLink} to="/login" color="inherit">
        Login
      </Button>
      <Button component={RouterLink} to="/register" color="inherit">
        Register
      </Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <ContactsIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Contact Manager
        </Typography>
        <Box>{isAuthenticated ? authLinks : guestLinks}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
