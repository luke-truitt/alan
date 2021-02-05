import {
  Card,
  Select,
  MenuItem,
  CardContent,
  Typography,
  ThemeProvider,
  FormControl,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { themeColor } from "./constants.js";
import "./calculator_page.css";
import { DollarInput, YesNo } from "./formConstants.js";

const q1 = {
  question:
    "How much of your own money did you spend on educational expenses last year?",
  description:
    "This includes money spent on tuition, electronics, chargers, textbooks, and other supplies",
};

const q2 = {
  question: "How much of your student loans did you pay off in 2020?",
  description:
    "Most students usually don't begin loan repayment until graduation.",
};
const q3 = {
  question: "Were you at least a full-time student last year?",
  description: "",
};

function EducationCard(props) {
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile">
        <CardContent className="income-card-content">
          <DollarInput question={q1.question} description={q1.description} />
          <DollarInput question={q2.question} description={q2.description} />
          <YesNo question={q3.question} description={q3.description} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default EducationCard;
