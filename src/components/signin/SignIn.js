import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import {
  primaryTheme,
  slideDefault,
  timelineData,
} from "../../utils/constants.js";
import "./signin.css";
import "./../../styles.css";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import JoinTimeline from "./../join/JoinTimeline";
import "./../inputs/inputs.css";
import Header from "../header/Header";

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
        style={{ cursor: "pointer" }}
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
        Not a member?{" "}
        <span className="signin-sign-in-button" style={{ cursor: "pointer" }}>
          Sign Up
        </span>
      </Typography>
    </div>
  );
}

function SignIn() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <Header page={"SignIn"} />
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
                <span className="teal-highlight">Sign In</span>
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
