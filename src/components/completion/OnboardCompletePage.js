import {
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./../../styles.css";
import "./onboard-complete.css";
import RefundBreakdown from "./RefundBreakdown.js";
import whiteArrow from "./../../images/white-arrow.svg";
import { useLocation } from "react-router-dom";
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function OnboardCompletePage(props) {
  let location = useLocation();

  try {
    props = location.state["breakdown"];
  } catch {
    props = {};
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="onboard-complete-c0-top">
        {/* <div className="header" /> */}
        <div className="onboard-complete-help-button-container">
          <div className="onboard-complete-help-button row-container ">
            <Typography variant="h6" className="onboard-complete-help-text">
              Help me file
            </Typography>
            <img src={whiteArrow} className="onboard-complete-help-arrow"></img>
          </div>
        </div>
        <div className="onboard-complete-c1">
          <div className="onboard-complete-c1-content">
            <Typography className="onboard-complete-title" variant="h6">
              Your estimated refund amount
            </Typography>
            <Typography
              className="refund-amount "
              variant="h1"
              color="secondary"
            >
              ${numberWithCommas(props.netRefund)}
            </Typography>
            <RefundBreakdown breakdown={props}></RefundBreakdown>

            {/* <div className="column-container onboard-complete-card-container">
              <Card className="onboard-complete-card">
                <CardContent className="onboard-complete-card-content"></CardContent>
              </Card>
              <Card className="onboard-complete-card">
                <CardContent className="onboard-complete-card-content"></CardContent>
              </Card>
              <Card className="onboard-complete-card">
                <CardContent className="onboard-complete-card-content"></CardContent>
              </Card>
            </div> */}
          </div>
        </div>
        <div className="onboard-complete-footer">
          <Button variant="contained" className="onboard-complete-apply-button">
            Ready to file? Apply now
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default OnboardCompletePage;
