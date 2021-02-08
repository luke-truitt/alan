import step1Active from "./../../images/onboarding-page/timeline/1-active.svg";
import step2Active from "./../../images/onboarding-page/timeline/2-active.svg";
import step3Active from "./../../images/onboarding-page/timeline/3-active.svg";
import step4Active from "./../../images/onboarding-page/timeline/4-active.svg";
import step1Inactive from "./../../images/onboarding-page/timeline/1-inactive.svg";
import step2Inactive from "./../../images/onboarding-page/timeline/2-inactive.svg";
import step3Inactive from "./../../images/onboarding-page/timeline/3-inactive.svg";
import step4Inactive from "./../../images/onboarding-page/timeline/4-inactive.svg";

import "./../../styles.css";
import "./onboarding.css";

function OnboardingTimeline(props) {
  const step1 = props.activeStep == 1 ? step1Active : step1Inactive;
  const step2 = props.activeStep == 2 ? step2Active : step2Inactive;
  const step3 = props.activeStep == 3 ? step3Active : step3Inactive;
  const step4 = props.activeStep == 4 ? step4Active : step4Inactive;
  return (
    <div className="onboarding-c1-left row-container">
      <div className="onboarding-timeline row-container">
        <img src={step1} className="onboarding-timeline-step" />
        <img src={step2} className="onboarding-timeline-step" />
        <img src={step3} className="onboarding-timeline-step" />
        <img src={step4} className="onboarding-timeline-step" />
      </div>
    </div>
  );
}

export default OnboardingTimeline;
