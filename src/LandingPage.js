import "./landing-page.css";
import "./global.css";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
} from "@material-ui/core/";
import { theme } from "./constants.js";
import { useHistory } from "react-router-dom";
import React, {useRef, useState} from "react";
const { REACT_APP_API_BASE_URL, REACT_APP_WAITLIST_URL, REACT_APP_CALCULATOR_URL } = process.env;

function LandingPage(props) {
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();
  const navTo = () => {

    if(!emailInput.current.validity.valid) {
      setInvalid(true);
      return;
    }
    const email = emailInput.current.value; 
    // console.log(email); 
    addEmail(email);
    setInvalid(false);
    history.push({pathname: '/calculate', state: {email: email}}); 
  }
  const axios = require('axios');
  const emailInput = useRef(null);
  function addEmail(email) {
      axios.post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
        email: email
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
            <input
              id="embedded-field-input-mobile"
              className="embedded-field-input"
              placeholder="What's your email?"
              type="email"
              ref = {emailInput}
            />
            <Button
              className="embedded-field-button"
              id="embedded-field-button-mobile"
              variant="contained"
              color="secondary"
              onClick={navTo}
            >
              Calculate my refund
            </Button>

          </div>
          <div style={{display: invalid ? "" : "none" }}>
            <p>
              Please use a valid email
            </p>
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
