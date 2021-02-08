import {
  Card,
  ThemeProvider,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

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

const timelineNumbers = {
  1: accountTimeline1,
  2: accountTimeline2,
  3: accountTimeline3,
  4: accountTimeline4,
  5: accountTimeline5,
};

const mockProps = {
  firstName: "Mary",
  activeStep: 2,
};

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
  return (
    <div className="row-container account-timeline">
      <Typography
        variant="h4"
        color="primary"
        className="account-timeline-title"
      >
        Welcome {props.firstName}! Nice work.
      </Typography>
      {timelineSteps}
    </div>
  );
}

function ReferralCard(props) {
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
              <TextField
                className="referral-card-email-field"
                label="Enter email addresses"
                variant="outlined"
              ></TextField>
              <Button
                className="send-invites-button"
                variant="contained"
                color="secondary"
              >
                Send invites
              </Button>
            </div>
            <div className="referral-card-btns-right column-container">
              <Button
                className="referral-button"
                variant="container"
                color="primary"
              >
                <img src={copyIcon} className="copy-button-icon" />
                Link
              </Button>
              <Button
                className="referral-button"
                variant="container"
                color="primary"
              >
                <img src={shareIcon} className="share-button-icon" />
                Share
              </Button>
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
      <CardContent className="disabled-card-content column-container">
        <img src={uploadIcon} className="account-page-card-icon" />
        <img src={placeholderText} className="placeholder-text" />
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
  props = mockProps;
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="account-page-c0 column-container">
        <div className="account-page-c1-left-shadow" />
        <div className="account-page-c1-left row-container">
          <div className="account-page-c1-left-content">
            <AccountTimeline
              activeStep={props.activeStep}
              firstName={props.firstName}
            />
          </div>
        </div>
        <div className="account-page-c1-right">
          <div className="account-page-c1-right-content row-container">
            <ReferralCard />
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
