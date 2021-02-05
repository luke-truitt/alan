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
import { DollarInput, YesNo, Dropdown } from "./formConstants.js";

const q1 = {
  question: "Have you ever claimed educational tax credits before?",
  description: "Most people haven't! That's why we made Alan.",
};

const q2 = {
  question: "How did you file your taxes last year?",
  description: "",
  options: [
    "I didn't file taxes.",
    "My parents (or their tax person) filed for me.",
    "I used TurboTax or another tax software.",
    "I paid someone to file for me.",
    "I filed manually.",
    "I don't know.",
  ],
};
const q3 = {
  question: "Estimate the size of the tax refund you received last year.",
  description: "",
};

function HistoryCard(props) {
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile">
        <CardContent className="income-card-content">
          <YesNo question={q1.question} description={q1.description} />
          <Dropdown
            question={q2.question}
            description={q2.description}
            options={q2.options}
          />
          <DollarInput question={q3.question} description={q3.description} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default HistoryCard;
