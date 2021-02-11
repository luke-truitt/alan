import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./resetpassword.css";
import "./../../styles.css";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import joinTimeline1 from "./../../images/timeline/timeline-1.svg";
import joinTimeline2 from "./../../images/timeline/timeline-2.svg";
import joinTimeline3 from "./../../images/timeline/timeline-3.svg";
import joinTimeline4 from "./../../images/timeline/timeline-4.svg";
import joinTimeline5 from "./../../images/timeline/timeline-5-last.svg";

const timelineNumbers = {
  1: joinTimeline1,
  2: joinTimeline2,
  3: joinTimeline3,
  4: joinTimeline4,
  5: joinTimeline5,
};

const timelineData = [
  { number: 1, text: "Join Us" },
  {
    number: 2,
    text:
      "Receive a link to file taxes after our team of tax experts reviews your info*",
  },
  {
    number: 3,
    text: "Upload relevant documents (W2s, etc.). We’ll help you locate them.",
  },
  {
    number: 4,
    text: "Submit! Refunds are typically processed within 3 weeks",
  },
  {
    number: 5,
    text: "We collect a flat $25 fee only if you receive a refund (Read why).",
  },
];

function JoinTimelineStep(props) {
  const isLast = props.number === 5;
  return (
    <div className="column-container join-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="join-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="join-timeline-step-text"
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
    <div className="row-container join-timeline">
      <Typography variant="h5" color="primary" className="join-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function ResetForm(props) {
  const history = useHistory();
  let location = useLocation();
  const [email, setEmail] = useState(
    location.state == null ? "" : location.state["email"]
  );
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    setSending(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        navTo();
        setSending(false);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  const navTo = () => {
    history.push({
      pathname: "/signin",
    });
  };

  const checkValid = (d) => {
    // TODO
  };

  const onChange = (e, val) => {
    if (val.stateName == "email") {
      setEmail(e);
    }
  };

  return (
    <div className="join-form row-container">
      {error !== null && (
        <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
          {error}
        </div>
      )}
      <TextInput
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        stateName="email"
        value={email}
        placeholder="Enter Email"
        type="email"
      />
      <Button
        className="join-button"
        variant="contained"
        color="secondary"
        onClick={(e) => sendResetEmail(e)}
      >
        {sending ? <CircularProgress /> : "Reset Password"}
      </Button>
      <div className="join-or-container column-container">
        <div className="join-or-horizontal-line" />
        <Typography variant="caption" className="join-or">
          OR
        </Typography>

        <div className="join-or-horizontal-line" />
      </div>
      <Button
        className="apple-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/signin" })}
      >
        Sign In
      </Button>
      <Button
        className="apple-sign-button"
        variant="contained"
        color="primary"
        onClick={() => history.push({ pathname: "/join" })}
      >
        Set Up Account
      </Button>
    </div>
  );
}

function ResetPassword() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="join-page-c0 column-container">
        <div className="join-page-c1-left-shadow" />
        <div className="join-page-c1-left row-container">
          <JoinTimeline></JoinTimeline>
          <Typography
            variant="caption"
            color="primary"
            className="join-disclaimer-text"
          >
            *Review process takes about 2-4 business days
          </Typography>
        </div>
        <div className="join-page-c1-right row-container">
          <div className="join-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="form-title pass-form-title"
            >
              <span className="purple-highlight">Reset Password</span>
            </Typography>
            <ResetForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
