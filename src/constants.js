import { createMuiTheme } from "@material-ui/core/";

export const onboardingTheme = createMuiTheme({
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
  },
  shape: { borderRadius: "4px" },
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
      fontSize: "1.375rem",
    },
    body2: {
      fontSize: "1rem",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "none",
      height: "60px",
      fontSize: "1rem",
    },
  },
});

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
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "600",
      lineHeight: "4.2rem",
    },
    h3: {
      marginTop: "20px",
      fontSize: "14pt",
    },
    fontFamily: ["-apple-system, BlinkMacSystemFont, sans-serif;"],
    fontSize: 14,
    input: {
      fontSize: "1rem",
      borderBottom: "none",
      margin: 0,
    },
    button: {
      fontSize: "10pt",
      marginTop: "10px",
      marginLeft: "0px",
      marginBottom: "auto",
      marginRight: "auto",
      fontWeight: "semi-bold",
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
      fontSize: "16px",
      lineHeight: "18px",
    },
    body2: {
      fontSize: "12px",
      lineHeight: "14px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "18px",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      fontSize: "14px",
      width: "40%",
      boxShadow: "none",
    },
  },
  shape: {},
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
