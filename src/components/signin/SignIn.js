import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import { primaryTheme, slideDefault } from "../../utils/constants.js";
import "./signin.css";
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
import "./../inputs/inputs.css";
import Header from "../header/Header";

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
    <div className="column-container signin-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="signin-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="signin-timeline-step-text"
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
    <div className="row-container signin-timeline">
      <Typography variant="h5" color="primary" className="signin-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function SignInForm(props) {
  const history = useHistory();
  let location = useLocation();
  const [email, setEmail] = useState(
    location.state == null ? "" : location.state["email"]
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  const signInWithEmailAndPasswordHandler = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navTo();
        setLoading(false);
      })
      .catch((error) => {
        setError("Incorrect Email or Password!");
        console.error("Error signing in with password and email", error);
        setInvalid(true);
        setLoading(false);
      });
    console.log(auth);
  };
  const navTo = () => {
    history.push({
      pathname: "/account",
    });
  };
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13) {
      //13 is the enter keycode
      signInWithEmailAndPasswordHandler();
    }
  };

  const checkValid = (d) => {
    // TODO
  };

  const onChange = (e, val) => {
    if (val.stateName == "email") {
      setEmail(e);
    } else if (val.stateName == "password") {
      setPassword(e);
    }
  };

  return (
    
    <div className="signin-form row-container">
      <TextInput
        setValid={(val) => {
          setValid(val);
        }}
        onChange={(e, val) => onChange(e, val)}
        stateName="email"
        helperText=""
        value={email}
        invalid={invalid}
        onKeyPress={(e, val) => keyDown(e, val)}
        placeholder="Enter Email"
        type="email"
      />
      <TextInput
        setValid={(val) => {
          setValid(val);
        }}
        onChange={(e, val) => onChange(e, val)}
        stateName="password"
        helperText="Please enter a valid email and password."
        value={password}
        invalid={invalid}
        onKeyPress={(e, val) => keyDown(e, val)}
        placeholder="Enter Password"
        type="password"
      />
      <Typography
        variant="caption"
        className="sign-in-forgot-pass-text"
        onClick={() => history.push({ pathname: "/resetpassword" })}
        style={{cursor: "pointer"}}
      >
        Forgot your password?
      </Typography>

      <Button
        className="signin-button"
        variant="contained"
        color="secondary"
        onClick={() => signInWithEmailAndPasswordHandler()}
      >
        {loading ? <CircularProgress /> : "Sign In"}
      </Button>
      <div className="signin-or-container column-container">
        <div className="signin-or-horizontal-line" />
        <Typography variant="caption" className="signin-or">
          OR
        </Typography>

        <div className="signin-or-horizontal-line" />
      </div>
      <Button
        className="google-sign-button"
        variant="contained"
        color="primary"
        onClick={() => {
          try {
            setGoogleLoading(true);
            signInWithGoogle("", "").then(() => {
              navTo();
              setGoogleLoading(false);
            });
          } catch (error) {
            console.error("Error signing in with Google", error);
          }
        }}
      >
        {googleLoading ? <CircularProgress /> : "Sign in with Google"}
      </Button>
      <div className="signin-or-horizontal-line" />
      <Typography
        variant="body1"
        className="sign-in-sign-up-text"
        color="textSecondary"
        onClick={() => history.push({ pathname: "/join" })}
      >
        Not a member? <span className="signin-sign-in-button" style={{cursor: "pointer"}}>Sign Up</span>
      </Typography>
    </div>
  );
}

function SignIn() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <Header/>
      <Slide {...slideDefault} in direction="left">
        <div className="signin-page-c0 column-container">
          <div className="signin-page-c1-left-shadow" />
          <div className="signin-page-c1-left row-container">
            <JoinTimeline></JoinTimeline>
            <Typography
              variant="caption"
              color="primary"
              className="join-disclaimer-text"
            >
              *Review process takes about 2-4 business days
            </Typography>
          </div>
          <div className="signin-page-c1-right row-container">
            <div className="signin-page-c1-right-content row-container">
              <Typography
                color="textPrimary"
                variant="h2"
                className="form-title "
              >
                <span className="purple-highlight">Sign In</span>
              </Typography>
              <SignInForm />
            </div>
          </div>
        </div>
      </Slide>
    </ThemeProvider>
  );
}

export default SignIn;
