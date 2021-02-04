import "./landing-page.css";
import {
  ThemeProvider,
  Button,
  Typography,
  OutlinedInput,
} from "@material-ui/core/";
import { theme } from "./constants.js";
import { useHistory } from "react-router-dom";

function LandingPage(props) {
  const history = useHistory();
  const navTo = () => {history.push({pathname: '/calculate', state: {email: "yo"}}); }
  
  return (
    <div className="root">
      <ThemeProvider theme={theme}>
        <div className="outer-container">
          <div className="inner-container-left">
            <Typography variant="h1" color="text-primary">
              Get up to a <span className="underline-highlight">$5,000</span>{" "}
              tax refund in{" "}
              <span className="underline-highlight">10 minutes</span>.
            </Typography>
            <div class="embedded-field">
              <OutlinedInput
                className="embedded-field-input"
                label="Enter your email address"
                variant="outlined"
              />
              <div className="embedded-field-button-container">
                <Button
                  className="embedded-field-button"
                  variant="contained"
                  color="secondary"
                  onClick={navTo}
                >
                  Calculate my refund
                </Button>
              </div>
            </div>

            <Typography variant="h3" color="text-primary">
              Get what you’re owed. We are focused on helping you understand and
              quickly file for credits you’re uniquely qualified for.{" "}
            </Typography>
          </div>

          <div className="inner-container-left" />
        </div>
      </ThemeProvider>
    </div>
  );
}
export default LandingPage;
