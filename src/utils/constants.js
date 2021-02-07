import { createMuiTheme } from "@material-ui/core/";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

export const primaryTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#f6f6f6",
      dark: "#c3c3c3",
      contrastText: "#2d2d2d",
    },
    secondary: {
      light: "#7282d3",
      main: "#4056a1",
      dark: "#002e72",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2d2d2d",
      secondary: "#86868B",
    },
  },
  overrides: {
    body2: { color: "#6D6D6D" },
  },
  shape: { borderRadius: "0px" },
  typography: {
    fontFamily: ["-apple-system, BlinkMacSystemFont, sans-serif;"],
    h1: {
      fontSize: "3.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "2.25rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "1.375rem",
    },
    caption: {
      fontSize: "0.8rem",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "none",
      height: "60px",
      fontSize: "1rem",
    },
    input: {
      fontSize: ".5rem",
    },
  },
});
