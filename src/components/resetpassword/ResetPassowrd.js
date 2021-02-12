import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { primaryTheme, timelineData } from "../../utils/constants.js";
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
    <div className="column-container reset-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="reset-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="reset-timeline-step-text"
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
    <div className="row-container reset-timeline">
      <Typography variant="h5" color="primary" className="reset-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function ResetForm(props) {
  const history = useHistory();
  let location = useLocation();
  const [valid, setValid] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const redirectHome = () => {
    history.push({ pathname: "/" });
  };
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13) {
      //13 is the enter keycode
      sendResetEmail();
    }
  };

  const sendResetEmail = () => {
    setSending(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        navTo();
        setSending(false);
      })
      .catch(() => {
        setError("Error resetting password");
        setInvalid(true);
        setSending(false);
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
    <div className="reset-form row-container">
      <TextInput
        setValid={(val) => {
          setValid(val);
        }}
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        onKeyPress={(e, val) => keyDown(e, val)}
        stateName="email"
        helperText="Doesn't look like you have an account with us... Double check the email address or sign Up Below"
        value={email}
        invalid={invalid}
        placeholder="Enter Email"
        type="email"
      />
      <Button
        className="reset-button"
        variant="contained"
        color="secondary"
        style={{ marginTop: invalid ? "30px" : "" }}
        onClick={() => sendResetEmail()}
      >
        {sending ? <CircularProgress /> : "Reset Password"}
      </Button>
      <div className="reset-or-container column-container">
        <div className="reset-or-horizontal-line" />
        <Typography variant="caption" className="reset-or">
          OR
        </Typography>

        <div className="reset-or-horizontal-line" />
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
      <Header page={"ResetPassword"} />
      <div className="reset-page-c0 column-container">
        <div className="reset-page-c1-left-shadow" />
        <div className="reset-page-c1-left row-container">
          <JoinTimeline></JoinTimeline>
          <Typography
            variant="caption"
            color="primary"
            className="reset-disclaimer-text"
          >
            *Review process takes about 2-4 business days
          </Typography>
        </div>
        <div className="reset-page-c1-right row-container">
          <div className="reset-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="form-title pass-form-title"
            >
              <span className="teal-highlight">Reset Password</span>
            </Typography>
            <ResetForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
