import "./landing-page.css";
import "../../styles.css";
import animationData from "../../lotties/landing-page-animation.json";
import { ThemeProvider, Typography } from "@material-ui/core/";
import { EmbeddedEmailInput } from "../inputs/Inputs.js";
import { primaryTheme } from "../../utils/constants.js";

import { useHistory, useLocation } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { PageView, initGA, Event } from "../tracking/Tracking";
import ben from "./../../images/landing-page/ben.png";
const trackingId = "UA-189058741-1";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function LandingPage(props) {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13 || code === 32 || code === 39) {
      //13 is the enter keycode
      if (!val) {
        invalidClick();
      } else {
        navTo();
      }
    }
  };
  useEffect(() => {
    initGA(trackingId);
    PageView();
  });
  const navTo = () => {
    Event("SIGNUP", "User Signed Up", "LANDING_PAGE");
    setLoading(true);
    addEmail(email);
  };
  const invalidClick = () => {
    setInvalid(true);
  };

  const location = useLocation();
  let referById = "";
  const searchParams =
    location.search.split("?").length == 1
      ? []
      : location.search.split("?")[1].split("&");
  let i;
  for (i = 0; i < searchParams.length; i++) {
    const paramName = searchParams[i].split("=")[0];
    console.log(paramName);
    if (paramName == "referId") {
      referById = searchParams[i].split("=")[1];
    }
  }

  const axios = require("axios");
  const emailInput = useRef(null);
  function addEmail(email) {
    axios
      .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
        email: email,
      })
      .then(function (response) {
        const referToId = response.data.referId;
        history.push({
          pathname: "/onboard",
          state: { email: email, referToId: referToId, referById: referById },
        });
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="landing-c0-overlay">
        <div className="landing-c0">
          <div className="landing-c1 row-container">
            <Typography
              variant="h2"
              color="textPrimary"
              className="landing-title"
            >
              Get up to a <span className="word-highlight">$5,000</span> tax
              refund in <span className="word-highlight">10 minutes</span>.
            </Typography>
            <EmbeddedEmailInput
              className="landing-input"
              emailValue={email}
              setEmail={setEmail}
              invalid={invalid}
              onKeyPress={(e, val) => keyDown(e, val)}
              navTo={navTo}
              invalidClick={invalidClick}
              loading={loading}
            />
            <Typography
              variant="caption"
              className="email-validation-text"
              style={{ display: invalid ? "" : "none", color: "red" }}
            >
              Make sure you use a valid email!
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              className="landing-subtitle"
            >
              The government owes students money. Alan will find you the credits
              you qualify for, maximize your refund, explain why. All in under
              10 minutes.
            </Typography>
          </div>
        </div>
        <img src={ben} className="landing-ben"></img>
      </div>
    </ThemeProvider>
  );
}
export default LandingPage;
