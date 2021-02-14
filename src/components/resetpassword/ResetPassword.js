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
  DialogActions,
} from "@material-ui/core";
import { Mixpanel } from "./../../mixpanel.js";

import { primaryTheme } from "../../utils/constants.js";
import "./resetpassword.css";
import "./../../styles.css";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState, forwardRef } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../header/Header";

import JoinTimeline from "./../join/JoinTimeline";

function ResetForm(props) {
  const history = useHistory();
  let location = useLocation();
  const [valid, setValid] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
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
        setOpen(true);
        setSending(false);
      })
      .catch(() => {
        setError("Error resetting password");
        setInvalid(true);
        setSending(false);
      });
  };

  const navTo = () => {
    Mixpanel.track("visit_sign_in", { source: "reset_pass" });
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navTo();
  };
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function AlertDialog(props) {
    return (
      <div>
        <Dialog
          open={props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Account Found</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Password Reset Email Sent! Check your email to reset your password
              and sign in.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose()} color="secondary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
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
        onClick={() => {
          Mixpanel.track("passowrd_reset");
          sendResetEmail();
        }}
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
        onClick={() => {
          Mixpanel.track("visit_sign_in", { source: "reset_pass" });
          history.push({ pathname: "/signin" });
        }}
      >
        Sign In
      </Button>
      <Button
        className="apple-sign-button"
        variant="contained"
        color="primary"
        onClick={() => {
          Mixpanel.track("visit_join", { source: "reset_pass" });
          history.push({ pathname: "/join" });
        }}
      >
        Set Up Account
      </Button>
      <AlertDialog open={open} handleClose={handleClose} />
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
