import { createMuiTheme } from "@material-ui/core/";

export const theme = createMuiTheme({
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
      primary: "#2D2D2D",
      secondary: "ffffff",
    },
  },
  shape: {
    borderRadius: "0px",
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "600",
      lineHeight: "4.2rem",
    },
    h3: {
      fontSize: "1.2rem",
    },
    fontFamily: ["-apple-system, BlinkMacSystemFont, sans-serif;"],
    fontSize: 14,
    input: {
      borderRadius: "0px",
      fontSize: "1rem",
      margin: 0,
    },
    button: {
      fontSize: "1rem",
      margin: 0,
      height: "",
      fontWeight: "semi-bold",
      borderRadius: "0px",
      boxShadow: "none",
    },
  },
});

export const themeColor = createMuiTheme({
  typography: {
    fontFamily: ["-apple-system, BlinkMacSystemFont, sans-serif;"],
    fontSize: 12,
    h1: {
      fontSize: "52px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "26px",
      fontWeight: "bold",
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "16px",
    },
    body1: {
      fontSize: "18px",
      lineHeight: "20px",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      fontSize: "14px",
      width: "40%",
      boxShadow: "none",
    },
  },
  shape: {
    borderRadius: 0,
  },
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
      primary: "#2D2D2D",
      secondary: "#86868B",
    },
  },
});
