import {
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
  Dialog,
  DialogTitle
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./../../styles.css";
import "./onboard-complete.css";
import RefundBreakdown from "./RefundBreakdown.js";
import whiteArrow from "./../../images/white-arrow.svg";
import {useState} from "react";
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

  if(email=="" || referToId=="") {
    redirectHome();
  }

  const redirectHome = () => {
    history.push({ pathname: "/"});
  }
  const navTo = () => {
    history.push({ pathname: "/join", state: { email: email, referToId: referToId, referById: referById } });
  }
  try {
    props = location.state["breakdown"];
  } catch {
    redirectHome();
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="onboard-complete-c0-top">
        <div className="header" />
        <div className="onboard-complete-help-button-container">
          <div className="onboard-complete-help-button row-container " onClick={navTo}>
            <Typography variant="h6" className="onboard-complete-help-text">
              Help me file
            </Typography>
            <img src={whiteArrow} className="onboard-complete-help-arrow"></img>
          </div>
        </div>
        <div className="onboard-complete-c1">
          <Typography className="onboard-complete-title" variant="h6">
            Your estimated refund amount
          </Typography>
          <Typography className="refund-amount " variant="h1" color="secondary">
            ${numberWithCommas(props.netRefund)}
          </Typography>
          
          <RefundBreakdown breakdown={props}></RefundBreakdown>
          <Button variant="contained" className="onboard-complete-apply-button" onClick={navTo}>
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
