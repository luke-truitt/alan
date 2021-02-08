import {
  Card,
  ThemeProvider,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants";
import "./../../styles.css";
import "./account-page.css";
import giftIcon from "./../../images/account/gift-icon.svg";
import shareIcon from "./../../images/account/share-icon.svg";
import copyIcon from "./../../images/account/copy-icon.svg";
import joinTimeline1 from "./../../images/join-timeline/join-timeline-1.svg";
import joinTimeline2 from "./../../images/account/account-timeline-2.svg";
import joinTimeline3 from "./../../images/join-timeline/join-timeline-3.svg";
import joinTimeline4 from "./../../images/join-timeline/join-timeline-4.svg";
import joinTimeline5 from "./../../images/join-timeline/join-timeline-5.svg";

const timelineNumbers = {
  1: joinTimeline1,
  2: joinTimeline2,
  3: joinTimeline3,
  4: joinTimeline4,
  5: joinTimeline5,
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
        <img className="referral-card-content-icon" src={giftIcon}></img>
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
                className="copy-link-button"
                variant="container"
                color="primary"
              >
                <img src={copyIcon} className="copy-button-icon" />
                Link
              </Button>
              <Button
                className="share-button"
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
    <Card className="account-page-card status-card">
      <CardContent className="status-card-content">Review Card</CardContent>
    </Card>
  );
}

function UploadCard(props) {
  return (
    <Card className="account-page-card upload-card">
      <CardContent className="upload-card-content">Upload Card</CardContent>
    </Card>
  );
}
function SubmitCard(props) {
  return (
    <Card className="account-page-card submit-card">
      <CardContent className="submit-card-content">Submit Card</CardContent>
    </Card>
  );
}
function TrackCard(props) {
  return (
    <Card className="account-page-card track-card">
      <CardContent className="track-card-content">Track Card</CardContent>
    </Card>
  );
}
function InvestCard(props) {
  return (
    <Card className="account-page-card invest-card">
      <CardContent className="submit-card-content">Invest Card</CardContent>
    </Card>
  );
}
function AccountPage(props) {
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
