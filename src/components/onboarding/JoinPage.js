import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants.js";
import "./join-form.css";

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
  return (
    <div className="column-container join-timeline-step">
      <Typography variant="h4" className="join-timeline-step-number">
        {props.number}
      </Typography>
      <Typography variant="body1" className="join-timeline-step-text">
        {props.text}
      </Typography>
    </div>
  );
}

function JoinTimeline() {
  return (
    <div className="row-container join-timeline">
      <Typography className="join-timeline-title">How does it work?</Typography>
      {timelineData.map((data) => (
        <JoinTimelineStep number={data.number} text={data.text} />
      ))}
    </div>
  );
}

function JoinForm() {
  return (
    <div className="join-form row-container">
      <TextField label="First Name" />
      <TextField label="Last Name" />
      <TextField label="Phone Number" />
      <Button>Join</Button>
      <Typography variant="caption">OR</Typography>
      <Button>Sign in with Google</Button>
      <Button>Sign in Apple</Button>
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
        </div>
        <div className="join-page-c1-right row-container">
          <div className="join-page-c1-right-content row-container">
            <Typography
              color="text-primary"
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
