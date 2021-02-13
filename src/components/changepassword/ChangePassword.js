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
import "./changepassword.css";
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
    <div className="column-container change-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="change-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="change-timeline-step-text"
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
    <div className="row-container change-timeline">
      <Typography variant="h5" color="primary" className="change-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function ChangeForm(props) {
  const history = useHistory();
  let location = useLocation();

  const getCode = () => {
    const params =
    location.search.split("?").length == 1
      ? [] : location.search.split("?")[1].split("&");
    console.log(location.search);
    console.log(params);
    let i;
    for (i = 0; i < params.length; i++) {
      const paramName = params[i].split("=")[0];
      if (paramName == "oobCode") {
        console.log('heeee')
        return params[i].split("=")[1];
      }
    }
    console.log('here')
    return '';
  }
  const [code, setCode] = useState(getCode());
  const [codeValid, setCodeValid] = useState(false);
  const [valid, setValid] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const redirectHome = () => {
    history.push({ pathname: "/" });
  };
  const keyDown = (e, val) => {
    var keyCode = e.keyCode || e.which;

    if (keyCode === 13) {
      //13 is the enter keycode
      onChangePassword();
    }
  };
  
  
  if(!codeValid) {
    console.log(code);
    auth.verifyPasswordResetCode(code)
      .then(function(email) {
        setCodeValid(true);
      })
      .catch(function(error) {
        alert("This code has expired, sending you to the Forgot Password Screen");
        history.push({pathname: 'resetpassword'})
      })
  }
    
  const onChangePassword = () => {
    console.log(code);
    auth.confirmPasswordReset(code, password)
    .then(function() {
      // Success message
      setOpen(true);
    })
    .catch(function(e) {
      // Invalid code message
      // if code invalid, send to forgot password screen
      if(e.t && e.t.code=="auth/invalid-action-code") {
        alert("This code has expired, sending you to the Forgot Password Screen");
        history.push({pathname: 'resetpassword'})
      } else {
        // else if the input password was bad prompt to reenter it
        setError("Incorrect Email or Password!");
        console.error("Error signing in with password and email", e);
        setInvalid(true);
        setSending(false);
      }
    })
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
    if (val.stateName == "password") {
      setPassword(e);
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
              Password Reset! Sign In Below
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
    <div className="change-form row-container">
      <TextInput
        setValid={(val) => {
          setValid(val);
        }}
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        onKeyPress={(e, val) => keyDown(e, val)}
        stateName="password"
        helperText="Make your password a bit stronger and don't reuse old ones"
        value={password}
        invalid={invalid}
        placeholder="Enter New Password"
        type="password"
      />
      <Button
        className="change-button"
        variant="contained"
        color="secondary"
        style={{ marginTop: invalid ? "30px" : "" }}
        onClick={() => onChangePassword()}
      >
        {sending ? <CircularProgress /> : "Change Password"}
      </Button>
      <div className="change-or-container column-container">
        <div className="change-or-horizontal-line" />
        <Typography variant="caption" className="change-or">
          OR
        </Typography>

        <div className="change-or-horizontal-line" />
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
      <AlertDialog open={open} handleClose={handleClose} />
    </div>
  );
}

function ChangePassword() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <Header page={"ChangePassword"} />
      <div className="change-page-c0 column-container">
        <div className="change-page-c1-right row-container">
          <div className="change-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="form-title pass-form-title"
            >
              <span className="teal-highlight">Change Password</span>
            </Typography>
            <ChangeForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChangePassword;
