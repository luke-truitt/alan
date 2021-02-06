import "./landing-page.css";
import "./styles.css";
import Lottie from "react-lottie";
import animationData from "./lotties/landing-page-animation.json";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
} from "@material-ui/core/";
import { EmbeddedEmailInput } from "./Inputs.js";
import { onboardingTheme } from "../../constants.js";

import { useHistory } from "react-router-dom";
import React, {useRef, useState, useEffect} from "react";
import {PageView, initGA, Event} from '../tracking/Tracking';
const trackingId = 'UA-189058741-1';
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function LandingPage(props) {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const keyDown = (e) => {
    var code = e.keyCode || e.which;

    if (code === 13 || code === 32 || code === 39) {
      //13 is the enter keycode
      navTo();
    }
  };
  useEffect(() => {
    initGA(trackingId);
    PageView();
  });
  const navTo = () => {
    Event("SIGNUP", "User Signed Up", "LANDING_PAGE");
    addEmail(email);
    history.push({ pathname: "/onboard", state: { email: email } });
  };
  const axios = require("axios");
  const emailInput = useRef(null);
  function addEmail(email) {
    axios
      .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
        email: email,
      })
      .then(function (response) {
        console.log(response);
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
    <ThemeProvider theme={onboardingTheme}>
      <div className="landing-c0 row-container">
        <div className="landing-c1 row-container">
          <Typography
            variant="h2"
            color="text-primary"
            className="landing-title"
          >
            Get up to a <span className="word-highlight">$5,000</span> tax
            refund in <span className="word-highlight">10 minutes</span>.
          </Typography>
          <EmbeddedEmailInput
            className="landing-input"
            emailValue={email}
            setEmail={setEmail}
            keyDown={keyDown}
          />

          <Typography
            variant="body2"
            color="text-secondary"
            className="landing-subtitle"
          >
            The government owes students money. Alan will find you the credits
            you qualify for, maximize your refund, explain why. All in under 10
            minutes.
          </Typography>
        </div>
        <div className="landing-animation-container">
          <Lottie isPaused="landing-animation" options={lottieOptions} />
        </div>
      </div>
    </ThemeProvider>
  );
}
export default LandingPage;
