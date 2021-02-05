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
import { Dropdown, DollarInput } from "./formConstants.js";

const q1 = {
  question:
    "How much of your own money did you spend on educational expenses last year?",
  description:
    "This includes money spent on tuition, electronics, chargers, textbooks, and other supplies",
};

const q2 = {
  question: "Can you be claimed as a dependent for 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)",
  options: ["Yes", "No", "I'm not sure"],
};
let dataChange = false;

function EducationCard(props) {
  const [a1, setA1] = useState(0);
  useEffect(() => {
    if(dataChange) {
    const data = {'a1': a1}
    props.onUpdate(data);
    console.log("HEf")
    dataChange=false;
    }
  });
  const updateA1 = (e) => {
    setA1(e.target.value)
    dataChange=true;
  };
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile" style={{display: props.stepNum == 2 ? "" : "none"}}>
        <CardContent className="income-card-content">
          <DollarInput question={q1.question} description={q1.description} onChange={(e) => updateA1(e)}/>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default EducationCard;
