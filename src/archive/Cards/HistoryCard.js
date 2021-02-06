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
import { useState, useEffect } from "react";
import { themeColor } from "../../utils/constants.js";
import "../Calculators/calculator_page.css";
import { DollarInput, YesNo, Dropdown } from "../formConstants.js";

const q1 = {
  question: "Have you ever claimed educational tax credits before?",
  description: "Most people haven't! That's why we made Alan.",
  options: {
    "Yes": "Yes",
    "No": "No",
    "Not Sure": "Not Sure"
  },
  placeholder: "Heard of tax credits?"
};

const q2 = {
  question: "How did you file your taxes last year?",
  description: "",
  options: {
    "I didn't file taxes.": "I didn't file taxes.",
    "My parents (or their tax person) filed for me.": "My parents (or their tax person) filed for me.",
    "I used TurboTax or another tax software.": "I used TurboTax or another tax software.",
    "I paid someone to file for me.": "I paid someone to file for me.",
    "I filed manually.": "I filed manually.",
    "I don't know.": "I don't know.",
  },
  placeholder: "How did you file?"
};
const q3 = {
  question: "Estimate the size of the tax refund you received last year.",
  description: ""
};
let dataChange = false;
function HistoryCard(props) {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState(0);

  useEffect(() => {
    if(dataChange) {
    const data = {'a1': a1, 'a2': a2, 'a3': a3};
    props.onUpdate(data);
    dataChange=false;
    }
  });
  const updateA1 = (e) => {
    setA1(e.target.value)
    dataChange=true;
  };
  const updateA2 = (e) => {
    setA2(e.target.value)
    dataChange=true;
  };
  const updateA3 = (e) => {
    setA3(e.target.value)
    dataChange=true;
  };
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile" style={{display: props.stepNum == 3 ? "" : "none"}}>
        <CardContent className="income-card-content">
          <Dropdown question={q1.question} description={q1.description} options={q1.options} placeholder={q1.placeholder} onChange={(e) => updateA1(e)}/>
          <Dropdown
            question={q2.question}
            description={q2.description}
            options={q2.options}
            placeholder={q2.placeholder} 
            onChange={(e) => updateA2(e)}
          />
          <DollarInput question={q3.question} description={q3.description} onChange={(e) => updateA3(e)} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default HistoryCard;
