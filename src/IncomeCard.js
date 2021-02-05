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
import { Dropdown } from "./formConstants.js";

const q1 = {
  question: "How much money did you make last year?",
  description: "An estimate is fine.",
  options: [
    "$0-$5,000",
    "$5,000-$10,000",
    "$10,000-$20,000",
    "$20,000-$30,000",
    "$30,000-$40,000",
    "$40,000+",
  ],
};

const q2 = {
  question: "Can you be claimed as a dependent for 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)",
  options: ["Yes", "No", "I'm not sure"],
};

function IncomeCard(props) {
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile">
        <CardContent className="income-card-content">
          <Dropdown
            question={q1.question}
            description={q1.description}
            options={q1.options}
          />
          <Dropdown
            question={q2.question}
            description={q2.description}
            options={q2.options}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default IncomeCard;
