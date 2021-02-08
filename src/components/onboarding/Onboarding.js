import {
  Container,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import "./onboarding.css";
import "../../styles.css";
import snap from "../../images/snap.svg";
import { withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import {
  income,
  dependence,
  educationCredits,
  taxMethod,
  refundSize,
  educationExpenses,
  studentLoans,
  studentStatus,
  name,
  school,
  phoneNumber,
  intlStudent,
  job,
  state,
  refund
} from "./OnboardingQuestions.js";
import { primaryTheme } from "../../utils/constants.js";
import { Form } from "../inputs/Inputs.js";

import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {PageView, initGA, Event} from '../tracking/Tracking';
const trackingId = 'UA-189058741-1';
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

const forms = [
  // { title: "Personal", items: [name, phoneNumber, school, intlStudent], formFields: ["firstName", "lastName", "phone", "school", "classYear", "international"] },
  {
    title: "Income",
    items: [income, state, dependence],
    formFields: ["estimatedIncome", "state", "dependent"]
  },
  // {
  //   title: "History",
  //   items: [taxMethod, refundSize, educationCredits],
  //   formFields: ["howFiled", "estimatedRefund", "taxCredits"]
  // },
  {
    title: "Education",
    items: [educationExpenses, studentLoans, studentStatus],
    formFields: ["educationExpenses", "loanPayments", "student"]
  },
  // {
  //   title: "Refund",
  //   items: [refund],
  //   formFields: []
  // },
];

const LinearProgressBar = withStyles((theme) => ({
  root: {
    height: 10,
  },
  colorPrimary: {
    backgroundColor: "#FFFFFF",
  },
  bar: {
    backgroundColor: "#00B32A",
  },
}))(LinearProgress);

function ProgressBar(props) {
  return <LinearProgressBar variant="determinate" value={props.value} />;
}

function Onboarding(props) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});
  const [formValid, setFormValid] = useState({});
  const history = useHistory();

  useEffect(() => {
    
  });

  const onDataUpdate = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };

  const checkValid = (d) => {
    const availableFields = forms[step-1].formFields;
    let validData = true;
    availableFields.map((field) => {
    try {
      if(d[field]==null || !d[field]) {
        validData = false;
      }
      } catch {
        validData = false;
      }
    });
    updateValid({[step]: validData});
  }
  const updateValid = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormValid((fields) => ({ ...fields, [key]: value }));
    }
  };

  const navToRefund = () => {
    
    const refund = getRefund();
    const taxableIncome = Number(getTaxableIncome().toFixed(2));
    let taxRate = 0;
    if(taxableIncome > 0) {
      console.log(taxableIncome);
      taxRate = Number((getTaxBill() / getTaxableIncome()).toFixed(2));
    }
    const taxBill = Number(getTaxBill().toFixed(2));
    const creditsAndWitholdings = Number((getCredits() + getWithholdings()).toFixed(2));
    const data = {
      netRefund: refund,
      taxableIncome: taxableIncome,
      taxRate: taxRate,
      taxBill: taxBill,
      creditsAndWitholdings: creditsAndWitholdings,
    }
    
    sendData();
    history.push({ pathname: "/refund", state: { breakdown: data } });
  }

  const axios = require("axios");
  
  function sendData() {
    axios
      .post(REACT_APP_API_BASE_URL + REACT_APP_CALCULATOR_URL, fields)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*
    Functions for controlling UI Elements and Interacting with DOM
  */
  // Logic for determining whether or not the "Next" button should be disabled
  const nextDisabled = () => {
    console.log("Step: " + String(step) + " State: " + String(formValid))
    console.log(formValid);
    console.log(!formValid[step])
    return !formValid[step];
  }

  // Click Back Logic
  const backClick = () => {
    if (step <= 1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  // Click Next Logic
  const forwardClick = () => {
    if (step == 1) {
      console.log(referToId);
      onDataUpdate({
        "email": email, "referToId": referToId
      });
    } 
    if (step >= 2) {
      navToRefund();
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  /*
    State control for managing data on this page
  */
  let location = useLocation();
  let email = "";
  let referToId = "";
  let referById = "";
  try {
    email = location.state["email"];
    referToId = location.state["referToId"];
    console.log(referToId);
  } catch {
    email = "";
    referToId = "";
  }

  // Data to be sent to server
  // const [calculatorItems, setCalculatorItems] = useState({});
  // const updateCalcData = (d) => {
  //   for (const [key, value] of Object.entries(d)) {
  //     setCalculatorItems((calculatorItems) => ({
  //       ...calculatorItems,
  //       [key]: value,
  //     }));
  //   }
  // };

  /*
    Finance Utilities
  */

  // Getting the estimated withholdings based on income input
  function getWithholdings() {
    const inc = fields["estimatedIncome"];
    let estWithholdings = 0;
    if (inc < 9875) {
      estWithholdings = inc * 0.1;
    } else if (inc < 40125) {
      estWithholdings = 987.5 + (inc - 9875) * 0.12;
    } else if (inc < 85525) {
      estWithholdings = 4617.5 + (inc - 40125) * 0.22;
    } else if (inc < 163301) {
      estWithholdings = 14605.5 + (inc - 85525) * 0.24;
    } else if (inc < 207350) {
      estWithholdings = 33271.5 + (inc - 163300) * 0.32;
    } else if (inc < 518400) {
      estWithholdings = 47367.5 + (inc - 207350) * 0.35;
    } else {
      estWithholdings = 156235 + (inc - 518400) * 0.37;
    }
    return estWithholdings;
  }

  function getDeductions() {
    return parseInt(fields["loanPayments"]);
  }

  function getTaxableIncome() {
    const income = fields["estimatedIncome"];
    const deductions = getDeductions();
    return Math.max(0, income - deductions - 12400);
  }

  // Getting the tax bill based on estimated taxable income
  function getTaxBill() {
    const income = getTaxableIncome();
    let bill = 0;
    if (income < 0) {
      bill = 0;
    } else if (income < 9875) {
      bill = income * 0.1;
    } else if (income < 40125) {
      bill = 987.5 + (income - 9875) * 0.12;
    } else if (income < 85525) {
      bill = 4617.5 + (income - 40125) * 0.22;
    } else if (income < 163301) {
      bill = 14605.5 + (income - 85525) * 0.24;
    } else if (income < 207350) {
      bill = 33271.5 + (income - 163300) * 0.32;
    } else if (income < 518400) {
      bill = 47367.5 + (income - 207350) * 0.35;
    } else {
      bill = 156235 + (income - 518400) * 0.37;
    }
    return bill;
  }

  // Getting the estimated credits based on their student status
  function getCredits() {
    if(fields["student"]=="No" || fields["student"] == "") {
      return 0;
    }
    return Math.min(2500, fields['educationExpenses']);
  }

  // Getting their refund based on all data
  function getRefund() {
    const credits = getCredits();
    const taxBill = getTaxBill();
    const tempVal = Math.min(credits - taxBill, 1000);
    const withholdings = getWithholdings();
    const refund = tempVal + withholdings;
    return refund;
  }

  return (
    <ThemeProvider theme={primaryTheme} className="onboarding">
      <div className="onboarding-c0 column-container">
        <div className="onboarding-c1-left row-container">
          <div container className="onboarding-c1-left-div">
            <Typography variant="h3" className="onboarding-c1-left-title">
              A few clicks from a bigger refund
            </Typography>
            <Typography variant="body2" className="onboarding-c1-left-subtitle">
              File for your tax refund in minutes. Get back money and time.
            </Typography>
          </div>
          <img className="onboarding-c1-left-img" src={snap}></img>
        </div>
        <div className="onboarding-c1-right row-container">
          <ProgressBar
            value={step * (100/forms.length)}
            className="onboarding-c1-right-progress-bar"
          />
          <div container className="onboarding-c1-right-div">
            <Form
              id="onboarding-c1-right-form"
              title={forms[step - 1].title}
              formItems={forms[step - 1].items}
              fields={fields}
              data={{}}
              validForm={(d) => checkValid(d)}
              onUpdate={onDataUpdate}
            />
            <div className="onboarding-button-div">
              <div className="onboarding-back-div">
                <Button
                  variant="contained"
                  color="primary"
                  className="onboarding-next"
                  onClick={backClick}
                >
                  Back
                </Button>
              </div>
              <div className="onboarding-next-div">
                <Button
                  variant="contained"
                  color="secondary"
                  className="onboarding-next"
                  disabled={nextDisabled()}
                  onClick={forwardClick}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Onboarding;
