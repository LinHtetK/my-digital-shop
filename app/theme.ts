"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": { fontSize: "2.5rem" },
    },
    h2: {
      fontSize: "1.75rem",
      "@media (min-width:600px)": { fontSize: "2rem" },
    },
    body1: {
      fontSize: "0.9rem",
      "@media (min-width:600px)": { fontSize: "1rem" },
    },
  },
});

export default theme;
