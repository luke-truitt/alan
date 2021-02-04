import "./landing-page.css";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
} from "@material-ui/core/";
import { theme } from "./constants.js";
import { useHistory } from "react-router-dom";

function LandingPage(props) {
  const history = useHistory();
  const navTo = () => {
    history.push({ pathname: "/calculate", state: { email: "yo" } });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="outer-container" id="outer-container-mobile">
        <div className="inner-container-left" id="inner-container-left-mobile">
          <Typography variant="h1" color="text-primary" id="h1-mobile">
            Get up to a{" "}
            <span
              className="underline-highlight"
              id="underline-highlight-mobile"
            >
              $5,000
            </span>{" "}
            tax refund in{" "}
            <span
              className="underline-highlight"
              id="underline-highlight-mobile"
            >
              10 minutes
            </span>
            .
          </Typography>
          <div className="embedded-field" id="embedded-field-mobile">
            <TextField
              id="embedded-field-input-mobile"
              className="embedded-field-input"
              defaultValue="Enter your email address"
              variant="outlined"
              size="large"
            />
            <Button
              className="embedded-field-button"
              id="embedded-field-button-mobile"
              variant="contained"
              color="secondary"
              onClick={navTo}
              textAllCaps="false"
            >
              Calculate my refund
            </Button>
          </div>

          <Typography variant="h3" color="text-primary" id="h3-mobile">
            Get what you’re owed. We are focused on helping you understand and
            quickly file for credits you’re uniquely qualified for.{" "}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default LandingPage;
