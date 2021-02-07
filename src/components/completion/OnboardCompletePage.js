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
import purpleArrow from "./../../images/purple-arrow.svg";
import {useLocation} from "react-router-dom";
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
      <div className="onboard-complete-c0">
        <div className="header" />
        <div className="onboard-complete-help-button-container">
          <div className="onboard-complete-help-button row-container">
            <Typography variant="h6" className="onboard-complete-help-text">
              Help me file
            </Typography>
            <img
              src={purpleArrow}
              className="onboard-complete-help-arrow"
            ></img>
          </div>
        </div>
        <div className="onboard-complete-c1 row-container">
          <Typography className="onboard-complete-title" variant="h6">
            Your estimated refund amount
          </Typography>
          <Typography className="refund-amount " variant="h1" color="secondary">
            ${numberWithCommas(props.netRefund)}
          </Typography>
          <RefundBreakdown breakdown={props}></RefundBreakdown>
          <Button variant="contained" className="onboard-complete-apply-button">
            Ready to file? Apply now
          </Button>
          <div className="onboard-complete-fee-text-container">
            <Typography
              variant="h6"
              className="onboard-complete-fee-text"
              color="secondary"
            >
              We’ll only collect the $25 fee if you receive a $200 refund or
              more (read why). Invite 3 friends and we will waive the filing fee
            </Typography>
          </div>
          <div className="column-container onboard-complete-card-container">
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content"></CardContent>
            </Card>
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content"></CardContent>
            </Card>
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default OnboardCompletePage;
