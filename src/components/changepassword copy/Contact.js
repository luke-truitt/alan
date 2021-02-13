import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { primaryTheme, timelineData } from "../../utils/constants.js";
import "./contact.css";
import "./../../styles.css";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState, forwardRef, useEffect } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import joinTimeline1 from "./../../images/timeline/timeline-1.svg";
import joinTimeline2 from "./../../images/timeline/timeline-2.svg";
import joinTimeline3 from "./../../images/timeline/timeline-3.svg";
import joinTimeline4 from "./../../images/timeline/timeline-4.svg";
import joinTimeline5 from "./../../images/timeline/timeline-5-last.svg";
import Header from "../header/Header";

const timelineNumbers = {
  1: joinTimeline1,
  2: joinTimeline2,
  3: joinTimeline3,
  4: joinTimeline4,
  5: joinTimeline5,
};

function JoinTimelineStep(props) {
  const isLast = props.number === 5;
  return (
    <div className="column-container contact-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="contact-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="contact-timeline-step-text"
      >
        {props.text}
      </Typography>
    </div>
  );
}

function JoinTimeline() {
  const timelineSteps = timelineData.map((data) => (
    <JoinTimelineStep number={data.number} text={data.text} />
  ));
  return (
    <div className="row-container contact-timeline">
      <Typography variant="h5" color="primary" className="contact-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function ContactInfo(props) {
  const history = useHistory();
  let location = useLocation();

  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  const navTo = (path) => {
    history.push({
      pathname: path,
    });
  };
  
  return (
    <div className="contact-form row-container">
        <Typography variant="body1" className="contact-or">
          Email Us: <a href="mailto:hello@fromstandard.com">hello@fromstandard.com</a>
        </Typography>
        <Typography variant="body1" className="contact-or">
          Call or Text Us: <a href="tel:+17208072551">+1 (720) 807 - 2551</a>
        </Typography>
        <Typography variant="body1" className="contact-or">
          Our Address: 1801 California Street Floor 24, Denver, CO 80202
        </Typography>
      <div className="contact-or-horizontal-line" style={{marginTop: "5vh", marginBottom: "5vh"}} />
      <Button
        className="contact-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/" })}
      >
        Go Home
      </Button>
      <Button
        className="contact-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/" })}
      >
        Estimate your Refund
      </Button>
      <Button
        className="contact-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/signin" })}
      >
        Sign In
      </Button>
      <Button
        className="contact-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/join" })}
      >
        Set Up Account
      </Button>
    </div>
  );
}

function Contact() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <Header page={"Contact"} />
      <div className="contact-page-c0 column-container">
        <div className="contact-page-c1-right row-container">
          <div className="contact-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="form-title pass-form-title"
            >
              <span className="teal-highlight">Contact Us</span>
            </Typography>
            <ContactInfo />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Contact;
