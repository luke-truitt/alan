import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants.js";
import "./join-form.css";
import { NameInput, PhoneNumberInput } from "./../inputs/Inputs.js";
import joinTimeline1 from "./../../images/join-timeline/join-timeline-1.svg";
import joinTimeline2 from "./../../images/join-timeline/join-timeline-2.svg";
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
  fields: {
    phone: "",
    firstName: "",
    lastName: "",
  },
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
    <div className="column-container join-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="join-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="join-timeline-step-text"
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
    <div className="row-container join-timeline">
      <Typography variant="h5" color="primary" className="join-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function JoinForm(props) {
  props = mockProps;
  return (
    <div className="join-form row-container">
      <NameInput fields={props} />
      <PhoneNumberInput fields={props} />
      <Typography variant="caption" className="join-phone-explainer">
        So we can text you when the review is complete!
      </Typography>
      <Button className="join-button" variant="contained" color="secondary">
        Join
      </Button>
      <div className="join-or-container column-container">
        <div className="join-or-horizontal-line" />
        <Typography variant="caption" className="join-or">
          OR
        </Typography>

        <div className="join-or-horizontal-line" />
      </div>
      <Button
        className="google-sign-button"
        variant="contained"
        color="primary"
      >
        Sign in with Google
      </Button>
      <Button className="apple-sign-button" variant="contained" color="primary">
        Sign in Apple
      </Button>
    </div>
  );
}

function JoinPage() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="join-page-c0 column-container">
        <div className="join-page-c1-left-shadow" />
        <div className="join-page-c1-left row-container">
          <JoinTimeline></JoinTimeline>

          <Typography
            variant="caption"
            color="primary"
            className="join-disclaimer-text"
          >
            *Review process takes about 2-4 business days
          </Typography>
        </div>
        <div className="join-page-c1-right row-container">
          <div className="join-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="join-page-title purple-highlight"
            >
              Join
            </Typography>
            <JoinForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default JoinPage;
