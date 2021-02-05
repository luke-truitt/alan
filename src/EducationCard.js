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
import { useState, useEffect} from "react"
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
  question: "Were you at least a part-time student last year?",
  description: "",
};
let dataChange = false;

function EducationCard(props) {

  const [a1, setA1] = useState(0);
  const [a2, setA2] = useState(0);
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
      <Card className="income-card" id="income-card-mobile" style={{display: props.stepNum == 2 ? "" : "none"}}>
        <CardContent className="income-card-content">
          <DollarInput question={q1.question} description={q1.description} onChange={(e) => updateA1(e)}/>
          <DollarInput question={q2.question} description={q2.description} onChange={(e) => updateA2(e)}/>
          <YesNo question={q3.question} description={q3.description} onChange={(e) => updateA3(e)}/>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default EducationCard;
