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
  gradYear,
  phoneNumber,
  intlStudent,
  refund
} from "./OnboardingQuestions.js";
import { onboardingTheme, ProgressBar } from "../../utils/constants.js";
import { Form } from "../inputs/Inputs.js";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {PageView, initGA, Event} from '../tracking/Tracking';
const trackingId = 'UA-189058741-1';

const forms = [
  { title: "Personal", items: [name, phoneNumber, gradYear, intlStudent] },
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
  {
    title: "Refund",
    items: [refund],
  },
];

function Onboarding(props) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});
  
  useEffect(() => {
    console.log(calculatorItems);
  });

  const onDataUpdate = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };

  /*
    Functions for controlling UI Elements and Interacting with DOM
  */

  // Logic for determining whether or not the "Next" button should be disabled
  const nextDisabled = () => {
    let res = false;
    Object.entries(forms[step-1].items).map((item) => {
        if(item[1].stateName=="name") {
          const first = fields['firstName'];
          const last = fields['lastName'];
          if(first == '' || first == null || last == '' || last == null) {
            res = true;
          }
        } else {
          const fieldVal = fields[item[1].stateName];
          if(fieldVal == '' || fieldVal == 0 || fieldVal == null) {
            res = true;
          }
        }
    });
    return res;
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
      console.log(fields);
      console.log(calculatorItems);
      onDataUpdate({
        "email": email
      })
    } else if (step == 3) {
      const data = {"withholdings": getWithholdings(), "deductions": getDeductions()};
      updateCalcData(data);
      console.log(fields);
      console.log(calculatorItems);
    }
    else if (step == 4) {
      const data = {"credits": getCredits(), "taxableIncome": getTaxableIncome(), "taxBill": getTaxBill(), "refund": getRefund()}
      updateCalcData(data);
      console.log(fields);
      console.log(calculatorItems);
    } else if (step == 5) {
      console.log(fields);
      console.log(calculatorItems);
    }
    if (step >= 5) {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  /*
    State control for managing data on this page
  */
 let location = useLocation();
 let email = "";
 try {
   email = location.state["email"];
 } catch {
   email = "";
 }

  // Data to be sent to server
  const [calculatorItems, setCalculatorItems] = useState({});
  const updateCalcData = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setCalculatorItems((calculatorItems) => ({ ...calculatorItems, [key]: value }));
    }
  };

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
      estWithholdings = (987.5 + (inc - 9875) * 0.12);
    } else if (inc < 85525) {
      estWithholdings = (4617.5 + (inc - 40125) * 0.22);
    } else if (inc < 163301) {
      estWithholdings = (14605.5 + (inc - 85525) * 0.24);
    } else if (inc < 207350) {
      estWithholdings = (33271.5 + (inc - 163300) * 0.32);
    } else if (inc < 518400) {
      estWithholdings = (47367.5 + (inc - 207350) * 0.35);
    } else {
      estWithholdings = (156235 + (inc - 518400) * 0.37);
    }
    return estWithholdings;
  }

  function getDeductions() {
    return 0;
  }
  function getTaxableIncome() {
    const income = fields['estimatedIncome'];
    console.log(income);
    const deductions = calculatorItems['deductions'];
    console.log(deductions);
    return income - deductions - 12400;
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
      bill = (987.5 + (income - 9875) * 0.12);
    } else if (income < 85525) {
      bill = (4617.5 + (income - 40125) * 0.22);
    } else if (income < 163301) {
      bill = (14605.5 + (income - 85525) * 0.24);
    } else if (income < 207350) {
      bill = (33271.5 + (income - 163300) * 0.32);
    } else if (income < 518400) {
      bill = (47367.5 + (income - 207350) * 0.35);
    } else {
      bill = (156235 + (income - 518400) * 0.37);
    }
    return bill;
  }

  // Getting the estimated credits based on their student status
  function getCredits() {
    return 2500;
  }

  // Getting their refund based on all data
  function getRefund() {
    const credits = getCredits();
    const taxBill = getTaxBill();
    const tempVal = Math.min(credits - taxBill, 1000);
    const withholdings = calculatorItems['withholdings'];
    const refund = tempVal + withholdings;
    return refund;
  }

  return (
    <ThemeProvider theme={onboardingTheme} className="onboarding">
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
            value={step * 20}
            className="onboarding-c1-right-progress-bar"
          />
          <div container className="onboarding-c1-right-div">
            <Form
              id="onboarding-c1-right-form"
              title={forms[step - 1].title}
              formItems={forms[step - 1].items}
              data={calculatorItems}
              onUpdate={onDataUpdate}
            />
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
    </ThemeProvider>
  );
}

export default Onboarding;
