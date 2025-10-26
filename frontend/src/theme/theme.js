// src/theme/theme.js

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6", // A nice blue
    },
    secondary: {
      main: "#19857b", // A teal color
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f4f4f4",
    },
  },
});

export default theme;
