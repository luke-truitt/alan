import {
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./../../styles.css";
import "./onboard-complete.css";
import RefundBreakdown from "./RefundBreakdown.js";
import whiteArrow from "./../../images/refund-page/arrow-white.svg";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function OnboardCompletePage(props) {
  let location = useLocation();
  const history = useHistory();

  let email = "";
  let referToId = "";
  let referById = "";
  try {
    email = location.state["email"];
    referToId = location.state["referToId"];
    referById = location.state["referById"];
  } catch {
    email = "";
    referToId = "";
    referById = "";
  }
  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  if(email=="") {
    redirectHome();
  }

  
  const navTo = () => {
    history.push({
      pathname: "/join",
      state: { email: email, referToId: referToId, referById: referById },
    });
  };
  try {
    props = location.state["breakdown"];
  } catch {
    redirectHome();
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="onboard-complete-c0-top row-container">
        {/* <div className="header" /> */}
        <div className="onboard-complete-help-button-container">
          <div
            className="onboard-complete-help-button row-container "
            onClick={navTo}
          >
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
