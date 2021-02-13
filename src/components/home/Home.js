import "./home.css";
import "../../styles.css";
import "../header/header.css";
import {
  ThemeProvider,
  AppBar,
  Zoom,
  Typography,
  Button,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core/";
import { EmbeddedEmailInput } from "../inputs/Inputs.js";
import { primaryTheme, fadeDefault } from "../../utils/constants.js";

import { findUserByEmail } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../header/Header";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { PageView, initGA, Event } from "../tracking/Tracking";
import ben from "./../../images/home/ben.png";
const trackingId = "UA-189058741-1";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function Home(props) {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const axios = require("axios");
  const emailInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleClickOpen = (old_user) => {
    setUser(old_user);
    setOpen(true);
  };
  console.log(props);
  const handleClose = (choice) => {
    if (choice == "no") {
      history.push({
        pathname: "/onboard",
        state: {
          email: user.email,
          referToId: user.referToId,
          referById: user.referById,
        },
      });
    } else {
      history.push({
        pathname: "/signin",
      });
    }
    setOpen(false);
  };

  let referById = "";

  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13 || code === 32 || code === 39) {
      if (!val) {
        invalidClick();
      } else {
        navTo();
      }
    }
  };
  const signUp = () => {
    if (email.includes("@") && email.length > 6) {
      navTo();
    } else {
      invalidClick();
    }
  };
  useEffect(() => {
    initGA(trackingId);
    PageView();
  });

  const navTo = () => {
    Event("SIGNUP", "User Signed Up", "LANDING_PAGE");
    setLoading(true);
    addEmail(email);
  };

  const invalidClick = () => {
    setInvalid(true);
  };

  const searchParams =
    location.search.split("?").length == 1
      ? []
      : location.search.split("?")[1].split("&");
  let i;
  for (i = 0; i < searchParams.length; i++) {
    const paramName = searchParams[i].split("=")[0];
    console.log(paramName);
    if (paramName == "referId") {
      referById = searchParams[i].split("=")[1];
    }
  }

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
              That email is already associated with an account, would you like
              to sign in?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose("no")} color="secondary">
              No Thanks
            </Button>
            <Button onClick={() => props.handleClose("yes")} color="secondary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const addEmail = async (email) => {
    const old_user = await findUserByEmail(email);
    console.log(props);
    console.log(old_user);
    if (old_user == null) {
      history.push({
        pathname: "/onboard",
        state: { email: email, referById: referById },
      });
      axios
        .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
          email: email,
        })
        .then(function (response) {
          const referToId = response.data.referId;
          props.setReferTo(referToId);
          console.log(response);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      handleClickOpen(old_user);
    }
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="page-root row-container">
        <Header signUp={signUp} page={"Home"} />
        <Fade in {...fadeDefault}>
          <div className="home-c0 column-container">
            <div className="home-c1 row-container">
              <Typography variant="h2" color="secondary" className="home-title">
                Get up to a <span className="teal-highlight">$5,000</span> tax
                refund in <span className="teal-highlight">10 minutes</span>.
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                className="home-subtitle-lower"
              >
                Students can qualify for thousands of dollars in special tax credits, we help you qualify for those and you'll get it back in cash within a month.
                <br />
                <br />
                We do the paper work, you get cash, and we'll explain why. If we
                can't get you a bigger refund, you pay $0.
              </Typography>
              <EmbeddedEmailInput
                className="home-input"
                emailValue={email}
                setEmail={setEmail}
                invalid={invalid}
                onKeyPress={(e, val) => keyDown(e, val)}
                navTo={navTo}
                invalidClick={invalidClick}
                loading={loading}
              />
              <Typography
                variant="caption"
                color="secondary"
                className="home-caption"
              >
                <strong>
                  We have a team of tax experts to make sure nothing is left on
                  the table.{" "}
                </strong>
              </Typography>
            </div>
            <img src={ben} className="home-ben"></img>
            <AlertDialog open={open} handleClose={handleClose} />
          </div>
        </Fade>
      </div>
    </ThemeProvider>
  );
}
export default Home;
