import "./join-timeline.css";
import { Typography } from "@material-ui/core";

import joinTimeline1 from "./../../images/timeline/timeline-1.svg";
import joinTimeline2 from "./../../images/timeline/timeline-2.svg";
import joinTimeline3 from "./../../images/timeline/timeline-3.svg";
import joinTimeline4 from "./../../images/timeline/timeline-4.svg";
import joinTimeline5 from "./../../images/timeline/timeline-5-last.svg";
import { timelineData } from "../../utils/constants.js";

const timelineNumbers = {
  1: joinTimeline1,
  2: joinTimeline2,
  3: joinTimeline3,
  4: joinTimeline4,
  5: joinTimeline5,
};

function JoinTimeline() {
  return (
    <div className="row-container join-timeline">
      <Typography variant="h5" color="primary" className="join-timeline-title ">
        How does it work?
      </Typography>
      <div className="column-container join-timeline-content">
        <div className="row-container join-timeline-number-container">
          {timelineData.map((data) => (
            <img
              src={timelineNumbers[data.number]}
              className="join-timeline-step-number"
            />
          ))}
        </div>
        <div className="row-container join-timeline-text-container">
          {timelineData.map((data) => (
            <div className="join-timeline-step-text-div">
              <Typography
                variant="body2"
                color="primary"
                className="join-timeline-step-text"
              >
                {data.text}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JoinTimeline;
