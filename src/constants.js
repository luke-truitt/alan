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
      lineHeight: "4rem",
    },
    h3: {
      fontSize: "1rem",
    },
    fontFamily: ["-apple-system"],
    fontSize: "12px",
    input: {
      borderRadius: "0px",
    },
    button: {
      fontSize: "1rem",
      margin: "auto",
      fontWeight: "semi-bold",
      borderRadius: "0px",
    },
  },
});
