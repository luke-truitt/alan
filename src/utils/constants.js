import { createMuiTheme } from "@material-ui/core/";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./../styles.css";
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
  shadows: ["none"],
  overrides: {
    body2: { color: "#6D6D6D" },
    MuiInputBase: {
      root: {
        height: "50px",
      },
    },
    MuiTextField: {
      root: {
        height: "50px",
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#2d2d2d",
        },
      },
    },
  },
  shape: { borderRadius: "3px" },
  typography: {
    fontFamily: ["Lato", "sans-serif"],
    letterSpacing: "1rem",
    h2: {
      fontFamily: ["Crimson Text", "serif"],
    },
    button: {
      textTransform: "none",
      boxShadow: "none",
      height: "50px",
    },
  },
});

export const fadeDefault = {
  timeout: {
    enter: 2000,
  },
};

export const slideDefault = {
  timeout: {
    enter: 1000,
  },
};

export const shortFade = {
  timeout: {
    enter: 500,
  },
};
