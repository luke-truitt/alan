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
import React, {useRef} from "react";

function LandingPage(props) {
  const base_url = "http://localhost:5000"
  const history = useHistory();
<<<<<<< HEAD
  const navTo = () => {const email = emailInput.current.value; history.push({pathname: '/calculate', state: {email: email}}); }
  const axios = require('axios');
  const emailInput = useRef(null);
  function addEmail(email) {
      axios.post(base_url + '/waitlist', {
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
              {/* <OutlinedInput
                className="embedded-field-input"
                label="Enter your email address"
                variant="outlined"
              /> */}
              <input className="embedded-field-input"
                label="Enter your email address"
                variant="outlined"
                ref={emailInput}/>
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
=======
  const navTo = () => {
    history.push({ pathname: "/calculate", state: { email: "yo" } });
  };
>>>>>>> 09f78fe4441e0ece6f996c8aa7151140b552a04c

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
