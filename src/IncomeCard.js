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
import {useState, useEffect} from "react";
import { themeColor } from "./constants.js";
import "./calculator_page.css";
import { Dropdown } from "./formConstants.js";

const one_opts = {"$0-$5,000": 5000, "$5,000-$10,000": 10000, "$10,000-$20,000": 20000, "$20,000-$30,000": 30000, "$30,000-$40,000": 40000, "$40,000+": 50000}
const q1 = {
  question: "About how much money did you make last year?",
  description: "Don't worry if you don't quite remember!",
  options: {"$0-$5,000": 5000, "$5,000-$10,000": 10000, "$10,000-$20,000": 20000, "$20,000-$30,000": 30000, "$30,000-$40,000": 40000, "$40,000+": 50000},
  placeholder: "$5000"
};

const q2 = {
  question: "Can you be claimed as a dependent for 2020?",
  description:
    "Did your parents pay for most of your expenses (i.e. rent, food)",
  options: {"Yes": "Yes", "No": "No", "I'm not sure": "idk"},
  placeholder: "Were you a dependent?"
};
let dataChange = false;
function IncomeCard(props) {
  useEffect(() => {
    if(dataChange) {
    const data = {'a1': a1, 'a2': a2}
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
  const [a1, setA1] = useState(0);
  const [a2, setA2] = useState("");
  return (
    <ThemeProvider theme={themeColor} >
      <Card className="income-card" id="income-card-mobile" style={{display: props.stepNum <= 1 ? "" : "none"}} >
        <CardContent className="income-card-content">
          <Dropdown
            question={q1.question}
            description={q1.description}
            options={q1.options}
            placeholder={q1.placeholder}
            value={a1}
            onChange={(e) => updateA1(e)}
            onKeyDown={props.onKeyDown}
          />
          <Dropdown
            question={q2.question}
            description={q2.description}
            options={q2.options}
            placeholder={q2.placeholder}
            value={a2}
            onChange={(e) => {updateA2(e);}}
            onKeyDown={props.onKeyDown}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default IncomeCard;
