import {
  Card,
  ThemeProvider,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Avatar
} from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Skeleton from "@material-ui/lab/Skeleton";

import { primaryTheme } from "./../../utils/constants";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
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
import * as emailjs from "emailjs-com";

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

const BASE_URL = "http://localhost:3000";

const timelineData = [
  { number: 1, text: "Join Us" },
  { number: 2, text: "Info Review" },
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

function AccountTimeline(props) {
  const timelineSteps = timelineData.map((data) => (
    <AccountTimelineStep
      activeStep={props.activeStep}
      number={data.number}
      text={data.text}
    />
  ));
  let valid = props.firstName == "" || props.firstName == null;

  return (
    <div className="row-container account-timeline">
      <Typography
        variant="h4"
        color="primary"
        className="account-timeline-title"
      >
        {valid ? "" : `Welcome ${props.firstName}!`}
      </Typography>
      {timelineSteps}
    </div>
  );
}

function EmailChip(props) {
  const handleAdd = (chip) => {
    props.onAdd(chip);
  };

  const handleDelete = (deletedChip) => {
    props.onDelete(deletedChip);
  };

  return (
    <ChipInput
      label="Enter Emails"
      alwaysShowPlaceholder="true"
      fullWidth="true"
      style={{ overflowY: "scroll", height: "120%" }}
      value={props.emails}
      onAdd={(chip) => handleAdd(chip)}
      onDelete={(chip) => handleDelete(chip)}
      variant="outlined"
    />
  );
}

function ReferralCard(props) {
  const [emails, setEmails] = useState([]);

  const handleAdd = (chip) => {
    setEmails([...emails, chip]);
  };

  const handleDelete = (deletedChip) => {
    if (emails.length == 1) {
      setEmails([]);
    } else {
      setEmails([emails.filter((c) => c !== deletedChip)]);
    }
  };
  const sendInvites = () => {
    let i;
    for (i = 0; i < emails.length; i++) {
      const email_to = emails[i];

      const templateParams = {
        from_name: props.username,
        send_to: email_to,
      };
      //     emailjs.send(
      //       SERVICE_ID,
      //       TEMPLATE_ID,
      //       templateParams,
      //       USER_ID
      //  ).then(function(response) {
      //   console.log(email_to, 'SUCCESS!', response.status, response.text);
      // }, function(error) {
      //   console.log('FAILED...', error);
      // });
    }
    alert("Emails sent successfully!");
    setEmails([]);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Alan Will Do Your Taxes",
          text: `Students lose out on thousands in their refund every year. You don't need to have even worked to get money back. Check it out -- `,
          url: "/",
        })
        .then(() => {
          console.log("Successfully shared");
          alert("Successfully shared!");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  return (
    <Card className="account-page-card referral-card">
      <CardContent className="referral-card-content column-container">
        <img className="account-page-card-icon" src={giftIcon}></img>
        <div className="referral-card-content-text row-container">
          <Typography variant="h6" color="textPrimary">
            Invite a friend to Alan and we'll file both of your taxes for free.
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Know someone missing out on free government $$? We'll waive the $25
            filing fee for both of you when they file with Alan!
          </Typography>
          <div className="referral-card-btn-container column-container">
            <div className="referral-card-email-container column-container">
              <EmailChip
                onAdd={(email) => handleAdd(email)}
                onDelete={(email) => handleDelete(email)}
                emails={emails}
              />
              <Button
                className="send-invites-button"
                variant="contained"
                color="secondary"
                onClick={sendInvites}
              >
                Send invites
              </Button>
            </div>
            <div className="referral-card-btns-right column-container">
              <Button
                className="referral-button"
                variant="container"
                color="primary"
                onClick={() =>
                  navigator.clipboard.writeText(
                    BASE_URL + "/?referId=" + props.referToId
                  )
                }
              >
                <img src={copyIcon} className="copy-button-icon" />
                Link
              </Button>
              {(isSafari || isIOS || isAndroid) && (
                <Button
                  className="referral-button"
                  variant="container"
                  color="primary"
                  onClick={handleShareClick}
                >
                  <img src={shareIcon} className="share-button-icon" />
                  Share
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewCard(props) {
  return (
    <Card className="account-page-card review-card">
      <CardContent className="review-card-content column-container">
        <img src={reviewIcon} className="account-page-card-icon" />
        <Typography variant="body2" className="review-card-text">
          Our team is reviewing your initial information. We’ll be sure to text
          and email you once they’re done!
        </Typography>
      </CardContent>
    </Card>
  );
}

function UploadCard(props) {
  return (
    <Card className="account-page-card upload-card">
      <CardContent className="column-container">
        <img src={uploadIcon} className="account-page-card-icon" />
        <Skeleton variant="text" style={{ width: "100%" }} />
      </CardContent>
    </Card>
  );
}
function SubmitCard(props) {
  return (
    <Card className="account-page-card submit-card">
      {" "}
      <CardContent className="disabled-card-content column-container">
        <img src={submitIcon} className="account-page-card-icon" />
        <img src={placeholderText} className="placeholder-text" />
      </CardContent>
    </Card>
  );
}
function TrackCard(props) {
  return (
    <Card className="account-page-card track-card">
      <CardContent className="disabled-card-content">
        <Typography className="disabled-card-title" variant="body1">
          Track your refund
        </Typography>
        <div className="column-container">
          <img src={trackImg} className="disabled-card-img" />

          <img src={placeholderBlock} className="placeholder-block" />
        </div>
      </CardContent>
    </Card>
  );
}
function InvestCard(props) {
  return (
    <Card className="account-page-card invest-card">
      <CardContent className="disabled-card-content">
        <Typography className="disabled-card-title" variant="body1">
          Invest your refund
        </Typography>

        <div className="column-container">
          <img src={investImg} className="disabled-card-img" />

          <img src={placeholderBlock} className="placeholder-block" />
        </div>
      </CardContent>
    </Card>
  );
}
function AccountPage(props) {
  const user = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);
  const [userData, setUserData] = useState(
    user.user && user.user.firstName != null && user.user.firstName != ""
      ? { firstName: user.user.firstName }
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
      }, 1000);
    }
  });

  props = mockProps;
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="account-page-c0 column-container">
        <div className="account-page-c1-left-shadow" />
        <div className="account-page-c1-left row-container">
          <div className="account-page-c1-left-content row=container">
            <AccountTimeline
              activeStep={props.activeStep}
              firstName={
                Object.keys(userData).length > 0 ? userData["firstName"] : ""
              }
            />
            <Button
              className="sign-out-button"
              color="primary"
              onClick={() => {
                console.log("No dice");
                setLoading(true);
                auth
                  .signOut()
                  .then(() => {
                    history.push({ pathname: "/join" });
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Sign Out
              <ExitToAppRoundedIcon />
            </Button>
          </div>
        </div>
        <div className="account-page-c1-right">
          <div className="account-page-c1-right-content row-container">
            <Typography color="secondary" className="account-title">
              Welcome {props.firstName}
            </Typography>
            <ReferralCard
              referToId={referToId}
              username={userData["firstName"]}
            />
            <ReviewCard />
            <UploadCard />
            <SubmitCard />
            <div className="account-page-c2 column-container">
              <TrackCard />
              <InvestCard />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AccountPage;
