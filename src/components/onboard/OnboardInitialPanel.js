import { Typography } from "@material-ui/core";
import snap from "./../../images/onboard/snap.svg";
import "./onboard.css";

function OnboardingInitialPanel(props) {
  return (
    <div className="onboard-c1-left row-container">
      <div container className="onboard-c1-left-div">
        <Typography
          variant="h3"
          color="primary"
          className="onboard-c1-left-title"
        >
          A few clicks from a bigger refund
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="onboard-c1-left-subtitle"
        >
          File for your tax refund in minutes. Get back money and time.
        </Typography>
      </div>

      <img className="onboard-c1-left-img" src={snap} />
    </div>
  );
}
export default OnboardingInitialPanel;
