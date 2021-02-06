import {
  Container,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { onboardingTheme } from "./constants.js";
import "./onboarding.css";
import "./styles.css";
import { Form } from "./Inputs.js";
import snap from "./images/snap.svg";

import {
  income,
  dependence,
  educationCredits,
  taxMethod,
  refundSize,
  educationExpenses,
  studentLoans,
  studentStatus,
} from "./OnboardingQuestions.js";

const forms = [
  {
    title: "Income",
    items: [income, dependence],
  },
  {
    title: "History",
    items: [taxMethod, refundSize, educationCredits],
  },
  {
    title: "Education",
    items: [educationExpenses, studentLoans, studentStatus],
  },
];

function Onboarding(props) {
  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="onboarding-c0 column-container">
        <div className="onboarding-c1-left row-container">
          <div container className="onboarding-c1-left-div">
            <Typography variant="h3" className="onboarding-c1-left-title">
              A few clicks from a bigger refund
            </Typography>
            <Typography variant="body1" className="onboarding-c1-left-subtitle">
              File for your tax refund in minutes. Get back money and time.
            </Typography>
          </div>
          <img className="onboarding-c1-left-img" src={snap}></img>
        </div>
        <div className="onboarding-c1-right row-container">
          <div container className="onboarding-c1-right-div">
            <Form title={forms[1].title} formItems={forms[1].items} />
            <div className="onboarding-next-div">
              <Button
                variant="contained"
                color="secondary"
                className="onboarding-next"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Onboarding;
