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
import "./refund.css";
import RefundBreakdown from "./RefundBreakdown.js";
import { AuthContext } from "../../providers/AuthProvider";
import { useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function Refund(props) {
  let location = useLocation();
  const history = useHistory();
  const user = useContext(AuthContext);

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

  if (email == "") {
    redirectHome();
  }

  try {
    props = location.state["breakdown"];
  } catch {
    redirectHome();
  }

  const navTo = () => {
    if (user) {
      history.push({
        pathname: "/account",
      });
    } else {
      history.push({
        pathname: "/join",
        state: {
          email: email,
          referToId: referToId,
          referById: referById,
          breakdown: props,
        },
      });
    }
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="onboard-complete-c0-top row-container">
        {/* <div className="header" /> */}
        {/* <div className="onboard-complete-help-button-container">
          <div
            className="onboard-complete-help-button row-container "
            onClick={navTo}
          >
            <Typography variant="h6" className="onboard-complete-help-text">
              Help me file
            </Typography>
            <img src={whiteArrow} className="onboard-complete-help-arrow"></img>
          </div>
        </div> */}
        <div className="onboard-complete-c1 column-container">
          <div className="onboard-complete-c1-content column-container">
          
            <div className="onboard-complete-c1-breakdown">
            <Card className="onboard-complete-card-mobile">
                <CardContent
                  onClick={navTo}
                  className="onboard-complete-card-1-content"
                  style={{cursor: "pointer"}}
                >
                  <Typography
                    className="refund-card-button-text"
                    variant="h4"
                    color="primary"
                  >
                    Help me file my taxes  ->
                  </Typography>
                </CardContent>
              </Card>
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
              <Card className="onboard-complete-card-mobile">
                <CardContent className="onboard-complete-card-2-content">
                  <div className="refund-card-text">
                    {" "}
                    <Typography
                      color="textSecondary"
                      variant="h5"
                      className="refund-card-title"
                    >
                      $XXX
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      className="refund-card-caption"
                    >
                      That's how much you lose fucker.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <Card className="onboard-complete-card-mobile">
                <CardContent className="onboard-complete-card-3-content">
                  {" "}
                  <div className="refund-card-text row-container">
                    <Typography
                      color="textSecondary"
                      variant="h5"
                      className="refund-card-title"
                    >
                      $XXX
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      className="refund-card-caption"
                    >
                      That's how much you lose fucker.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="row-container onboard-complete-card-container">
              <Card className="onboard-complete-card">
                <CardContent
                  onClick={navTo}
                  className="onboard-complete-card-1-content"
                  style={{cursor: "pointer"}}
                >
                  <Typography
                    className="refund-card-button-text"
                    variant="h4"
                    color="primary"
                  >
                    Help me file my taxes <ArrowForwardIosRoundedIcon />
                  </Typography>
                </CardContent>
              </Card>
              <Card className="onboard-complete-card">
                <CardContent className="onboard-complete-card-2-content">
                  <div className="refund-card-text">
                    {" "}
                    <Typography
                      color="textSecondary"
                      variant="h5"
                      className="refund-card-title"
                    >
                      $XXX
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      className="refund-card-caption"
                    >
                      That's how much you lose fucker.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <Card className="onboard-complete-card">
                <CardContent className="onboard-complete-card-3-content">
                  {" "}
                  <div className="refund-card-text row-container">
                    <Typography
                      color="textSecondary"
                      variant="h5"
                      className="refund-card-title"
                    >
                      $XXX
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      className="refund-card-caption"
                    >
                      That's how much you lose fucker.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="onboard-complete-footer">
          <Button
            variant="contained"
            className="onboard-complete-apply-button"
            onClick={navTo}
          >
            {user ? "Save This Refund Data" : "Ready to file? Apply now"}
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default Refund;
