import {
  Card,
  ThemeProvider,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Slide,
  Fade,
  Snackbar,
} from "@material-ui/core";
import { DisabledCardFull, DisabledCardHalf, InviteCard } from "./AccountCards";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  primaryTheme,
  slideDefault,
  fadeDefault,
  shortFade,
} from "./../../utils/constants";

import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState, Fragment } from "react";
import ChipInput from "material-ui-chip-input";
import { auth, getUserDoc } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { isIOS, isAndroid, isSafari } from "react-device-detect";
import "./../../styles.css";
import "./account-page.css";
import giftIcon from "./../../images/icons/gift-dark.svg";
import shareIcon from "./../../images/icons/share-dark.svg";
import copyIcon from "./../../images/icons/copy-dark.svg";
import reviewIcon from "./../../images/icons/review-dark.svg";
import placeholderText from "./../../images/account-page/placeholder-text.svg";
import uploadIcon from "./../../images/icons/upload-dark.svg";
import submitIcon from "./../../images/icons/review-dark.svg";
import investImg from "./../../images/account-page/invest-placeholder.svg";
import trackImg from "./../../images/account-page/track-placeholder.svg";
import placeholderBlock from "./../../images/account-page/placeholder-block.svg";
import accountTimeline1 from "./../../images/timeline/timeline-1.svg";
import accountTimeline2 from "./../../images/timeline/timeline-2-active.svg";
import accountTimeline3 from "./../../images/timeline/timeline-3.svg";
import accountTimeline4 from "./../../images/timeline/timeline-4.svg";
import accountTimeline5 from "./../../images/timeline/timeline-5-last.svg";
import { useLocation, useHistory } from "react-router-dom";
import Header from "./../header/Header.js";

const USER_ID = "user_oxRU2E4xVKC6z7tq0Ee66";
const TEMPLATE_ID = "template_kwxoxb7";
const SERVICE_ID = "service_784yhvi";

const timelineNumbers = {
  1: accountTimeline1,
  2: accountTimeline2,
  3: accountTimeline3,
  4: accountTimeline4,
  5: accountTimeline5,
};

const mockProps = {
  activeStep: 2,
};

const BASE_URL = "https://fromstandard.com";

const timelineData = [
  { number: 1, text: "Join Us" },
  { number: 2, text: "Review" },
  { number: 3, text: "Document Upload" },
  { number: 4, text: "Submit" },
  { number: 5, text: "Refund Time!" },
];

function AccountTimelineStep(props) {
  const stepProps = {
    className: "column-container account-timeline-step",
  };
  if (props.activeStep == props.number) {
    stepProps.id = "active-account-timeline-step";
  }
  return (
    <div {...stepProps}>
      <img
        src={timelineNumbers[props.number]}
        className="account-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="account-timeline-step-text"
      >
        {props.text}
      </Typography>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function AccountCard(props) {
  const classes = useStyles();
  let valid = props.firstName == "" || props.firstName == null;
  return (
    <div className="user-profile">
      {valid ? (
        <CircularProgress />
      ) : (
        <div className="avatar-container column-container">
          {props.photo == "" || props.photo == null ? (
            <Avatar
              alt={props.firstName}
              style={{
                backgroundColor: "white",
                color: "#283593",
                height: "2em",
                width: "2em",
              }}
            >
              {props.firstName.split("")[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              alt={props.firstName}
              src={props.photo}
              style={{ height: "2em", width: "2em" }}
            />
          )}
          <Typography
            variant="h6"
            color="primary"
            className="account-timeline-user-name"
          >
            Welcome {props.firstName}!
          </Typography>
        </div>
      )}
    </div>
  );
}
function AccountTimeline(props) {
  const timelineSteps = timelineData.map((data) => (
    <AccountTimelineStep
      activeStep={props.activeStep}
      number={data.number}
      text={data.text}
    />
  ));

  return (
    <div>
      <div className="row-container account-timeline">{timelineSteps}</div>
    </div>
  );
}
function numberWithCommas(x) {
  if (x == null) {
    return "";
  }
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts[1] && parts[1].length == 1) {
    parts[1] = parts[1] + "0";
  }
  return parts.join(".");
}
function ReviewCard(props) {
  let history = useHistory();
  let refundText;
  if (props.userData.refundBreakdown) {
    refundText = (
      <div>
        <Typography variant="body2" className="review-card-text">
          If you want to{" "}
          {props.userData.refundBreakdown.netRefund ? (
            <span>retake</span>
          ) : (
            <span>take</span>
          )}{" "}
          the calculator, you can do so{" "}
          <a
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => props.onCalculator()}
          >
            here
          </a>
          {". "}
          {props.userData.refundBreakdown.netRefund && (
            <span>
              Your initial estimate was $
              <a
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => history.push({ pathname: "/refund" })}
              >
                {numberWithCommas(props.userData.refundBreakdown.netRefund)}
              </a>
              .
            </span>
          )}
        </Typography>
      </div>
    );
  } else {
    refundText = (
      <div>
        <Typography variant="body2" className="review-card-text">
          Retake the calculator or haven't taken it yet, you can do so{" "}
          <a
            style={{ textDecoration: "underline" }}
            onClick={() => props.onCalculator()}
          >
            here
          </a>
          .
        </Typography>
      </div>
    );
  }

  return (
    <Card className="account-page-card review-card">
      <CardContent className="review-card-content column-container">
        <img src={reviewIcon} className="account-page-card-icon" />
        <Typography variant="body2" className="review-card-text">
          Our team is reviewing your initial information. We'll text and email
          you when it's time to finish filing. {refundText}
        </Typography>
      </CardContent>
    </Card>
  );
}

function AccountPage(props) {
  const user = useContext(AuthContext);

  const location = useLocation();
  const [openToast, setOpenToast] = useState(
    location.state ? location.state["accountNew"] : false
  );
  const history = useHistory();
  const [loadAttempts, setLoadAttempts] = useState(0);

  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);
  const [userData, setUserData] = useState(
    user.user && user.user.firstName != null && user.user.firstName != ""
      ? { firstName: user.user.firstName, photo: user.user.photoURL }
      : {}
  );
  const [dataLoaded, setDataLoaded] = useState(
    user.user && user.user.firstName != null && user.user.firstName != ""
      ? true
      : false
  );
  const [referToId, setReferToId] = useState(
    user.user && user.user.referToId != null && user.user.referToId != ""
      ? user.user.referToId
      : uuidv4()
  );
  const [referById, setReferById] = useState(
    user.user && user.user.referById != null && user.user.referById != ""
      ? user.user.referById
      : ""
  );
  setTimeout(() => {
    if (user.user && user.user.firstName != null && user.user.firstName != "") {
      setUserData({ firstName: user.user.firstName });
      setDataLoaded(true);
    }
  }, 1000);
  useEffect(() => {
    setTimeout(() => {
      if (!user.user && loadAttempts > 2) {
        console.log(user);
        history.push("/signin");
      } else {
        setLoadAttempts(loadAttempts + 1);
      }
    }, 500);
    if (user.user && !dataLoaded) {
      setTimeout(() => {
        getUserDoc(user)
          .then((result) => {
            if (result == null) {
              setDataLoaded(false);
              return;
            }
            setUserData(result);
            setDataLoaded(true);
          })
          .catch(() => console.log("ERROR GETTING USER"));
      }, 500);
    }
  });
  const handleClick = () => {
    setOpenToast(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  const onCalculator = () => {
    history.push({
      pathname: "/onboard",
      state: { email: userData["email"], referToId: referToId },
    });
  };

  const welcomeText = (
    <span>
      Welcome <span className="teal-highlight"> {userData.firstName}!</span>{" "}
    </span>
  );
  const MobileWelcome = () => (
    <Card className="account-page-card mobile-welcome-card row-container">
      <CardContent className="mobile-welcome-card-content">
        <Typography className="welcome-text" variant="h5" color="primary">
          Welcome {userData.firstName}!
        </Typography>
      </CardContent>
    </Card>
  );
  let valid = userData.firstName == "" || userData.firstName == null;
  props = mockProps;
  return (
    <ThemeProvider theme={primaryTheme}>
      <Header page={"Account"} />
      <Slide {...slideDefault} in direction="left">
        <div className="account-page-c0 column-container">
          <div className="account-page-c1-left-shadow" />
          <div className="account-page-c1-left row-container">
            <div className="account-page-c1-left-content row-container">
              <Typography className="welcome-text" variant="h3" color="primary">
                {valid ? (
                  <Skeleton />
                ) : (
                  <Fade in {...shortFade}>
                    {welcomeText}
                  </Fade>
                )}
              </Typography>
              <AccountTimeline
                activeStep={props.activeStep}
                firstName={
                  Object.keys(userData).length > 0 ? userData["firstName"] : ""
                }
                userPhoto={
                  Object.keys(userData).length > 0 ? userData["photo"] : ""
                }
              />
            </div>
            <Button
              className="sign-out-button"
              color="primary"
              onClick={() => {
                console.log("No dice");
                setLoading(true);
                auth
                  .signOut()
                  .then(() => 
                    
                    history.push({ pathname: "/join" });
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Sign Out
              <ExitToAppRoundedIcon className="button-icon" />
            </Button>
          </div>
          <div className="account-page-c1-right">
            <div className="account-page-c1-right-content row-container">
              {Object.keys(userData).length > 2 ? (
                <Fade in {...shortFade}>
                  <div>
                    <MobileWelcome />
                    <InviteCard />
                    <ReviewCard
                      userData={userData}
                      onCalculator={() => onCalculator()}
                    />
                    <DisabledCardFull icon={uploadIcon} />
                    <DisabledCardFull icon={submitIcon} />

                    <div className="account-page-c2 column-container">
                      <DisabledCardHalf image={trackImg} />
                      <DisabledCardHalf image={investImg} />
                    </div>
                  </div>
                </Fade>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={openToast}
            autoHideDuration={5000}
            onClose={handleClose}
            severity="success"
            message="Nice work! Glad to have you here."
          />
        </div>
      </Slide>
    </ThemeProvider>
  );
}

export default AccountPage;
