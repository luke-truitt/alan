
import React, { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core/";

import { themeColor } from "./constants.js";
import "./calculator_page.css";

import CalculationCard from "./CalculationCard.js";
import IncomeCard from "./IncomeCard.js";
import EducationCard from "./EducationCard.js";
import HistoryCard from "./HistoryCard.js";
import PersonalInfoCard from "./PersonalInfoCard.js";

const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function Calculator2({props}) {

  /*
    Form control, 4 sets of state variables for form control
  */

  /*
    incomeFields:
      'estimatedIncome': int, one of a set of options found in IncomeCard
      'dependent': string, "Yes", "No", or "IDK"
  */
  const [incomeFields, setIncomeFields] = useState({});
  const handleIncomeChange = (data) => {
    let newFields = { ...incomeFields };
    newFields['estimatedIncome'] = data['a1'];
    newFields['dependent'] = data['a2'];
    setIncomeFields(newFields);
  }

  /*
    educationFields:
      'eduCost': int, how much they've paid for education expenses - deduction
      'loans': int, how much they have paid in student loans early - deduction
      'student': string, "Yes", "No", or "IDK" - Student for 5+ months
  */
  const [educationFields, setEducationFields] = useState({});
  const handleEducationChange = (data) => {
    let newFields = { ...educationFields };
    newFields['eduCost'] = data['a1'];
    newFields['loans'] = data['a2'];
    newFields['student'] = data['a3'];
    setEducationFields(newFields);
  }

  /*
    historyFields:
      'eduCredits': string, if they've heard of the education tax credits AOTC or LLC
      'howFiled': string, how they filed taxes last year
      'estRefund': int, how much they got last year for refund
  */
  const [historyFields, setHistoryFields] = useState({});
  const handleHistoryChange = (data) => {
    let newFields = { ...historyFields };
    newFields['eduCredits'] = data['a1'];
    newFields['howFiled'] = data['a2'];
    newFields['estRefund'] = data['a3'];
    setHistoryFields(newFields);
  }

  /*
    personalFields:
      'classYear': string, year in school
      'firstName': string
      'lastName': string
      'international': string, whether or not they're international students
      'phone': string
  */
  const [personalFields, setPersonalFields] = useState({});
  const handlePersonalChange = (data) => {
    let newFields = { ...personalFields };
    newFields['classYear'] = data['a1'];
    newFields['international'] = data['a2'];
    newFields['firstName'] = data['firstName'];
    newFields['lastName'] = data['firstName'];
    newFields['phone'] = data['phone'];
    setPersonalFields(newFields);
  }

  
  /*
    Functions for controlling UI Elements and Interacting with DOM
  */

  // Logic for determining whether or not the "Next" button should be disabled
  const nextDisabled = () => {
    console.log(step)
    if(step==1) {
      try {
        return (incomeFields['estimatedIncome'] == null || incomeFields['estimatedIncome'] == 0 || incomeFields['dependent']==null || incomeFields['dependent']=="")
      } catch {
        return true;
      }
    } else if (step==2) {
      try {
        return (educationFields['a1'] == null || educationFields['a1'] == 0 || educationFields['a2']==null || educationFields['a2'] == 0 ||educationFields['a3']==null || educationFields['a3'] == "")
      } catch {
        return true;
      }
    } else if (step==3) {
      try {
        console.log(historyFields);
        return (historyFields['a1'] == null || historyFields['a1']=="" || historyFields['a2']==null || historyFields['a2']=="" || historyFields['a3']==null || historyFields['a3']==0)
      } catch {
        return true;
      }
    } else if (step==4) {
      try {
        console.log(personalFields);
        return (personalFields['classYear'] == null || personalFields['classYear'] == "" || personalFields['firstName']==null || personalFields['firstName'] == "" || personalFields['lastName']==null || personalFields['lastName'] == "" || personalFields['phone']==null || personalFields['phone'] == "" ||personalFields['international']==null || personalFields['international'] == "")
      } catch {
        return true;
      }
    } else {
      return true;
    }
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
      const d = {
        email: email,
        estimatedIncome: incomeFields['estimatedIncome'],
        dependent: incomeFields['dependent'],
      };
      updateDict(d);
    } else if (step == 2) {
    //   getWithholdings();
    //   setDeductions(textInput2.current.value);
    //   setTaxableIncome(
    //     formData["estimatedIncome"] - textInput2.current.value - 12400
    //   );
    //   getTaxBill(
    //     formData["estimatedIncome"] - textInput2.current.value - 12400
    //   );
    }
    else if (step == 3) {
    //   detCredits();
      const ddd = {
        taxCredits: historyFields['eduCredits'],
        howFiled: historyFields['howFiled'],
        estimatedRefund: historyFields['estRefund'],
      }
      updateDict(ddd);
    } else if (step == 4) {
      // refund = getRefund();
      // refundLabel.current.innerHTML = refund;
      // refundMainLabel.current.innerHTML = refund;
      // firstName = firstInput.current.value;
      // lastName = lastInput.current.value;
      // phone = phoneInput.current.value;
      // classYear = yearInput.current.value;
      // howFiled = filedInput.current.value;
      // international = intlInput.current.value;
      const dd = {
        firstName: personalFields["firstName"],
        lastName: personalFields["lastName"],
        phone: personalFields["phone"],
        classYear: personalFields["classYear"],
        international: personalFields["international"],
      };
      updateDict(dd);
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

  // Step Number
  const [step, setStep] = useState(1);

  // Data to be sent to server
  const [formData, setFormData] = useState({});
  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormData((formData) => ({ ...formData, [key]: value }));
    }
  };

  // Variables for use through page
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [credits, setCredits] = useState(0);
  const [taxBill, setTaxBill] = useState(0);
  const [withholdings, setWithholdings] = useState(0);

  /*
    Server interaction
  */
  const axios = require("axios");
  function sendData() {
    axios
      .post(REACT_APP_API_BASE_URL + REACT_APP_CALCULATOR_URL, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /*
    React Built-Ins
  */

  // useEffect, each time the page renders this runs, use it for once setState is done
  useEffect(() => {
    if (step == 3) {
      // dedLabel.current.innerHTML = deductions;
      // taxIncomeLabel.current.innerHTML = taxableIncome;
      // taxBillLabel.current.innerHTML = taxBill;
    } else if (step == 4) {
      // creditsLabel.current.innerHTML = credits;
    } else if (step == 5) {
      sendData();
    }
  }); 

  /*
    Finance Utilities
  */

  // Getting the estimated withholdings based on income input
  function getWithholdings() {
    const inc = formData["estimatedIncome"];
    if (inc < 9875) {
      setWithholdings(inc * 0.1);
    } else if (inc < 40125) {
      setWithholdings(987.5 + (inc - 9875) * 0.12);
    } else if (inc < 85525) {
      setWithholdings(4617.5 + (inc - 40125) * 0.22);
    } else if (inc < 163301) {
      setWithholdings(14605.5 + (inc - 85525) * 0.24);
    } else if (inc < 207350) {
      setWithholdings(33271.5 + (inc - 163300) * 0.32);
    } else if (inc < 518400) {
      setWithholdings(47367.5 + (inc - 207350) * 0.35);
    } else {
      setWithholdings(156235 + (inc - 518400) * 0.37);
    }
  }

  // Getting the tax bill based on estimated taxable income
  function getTaxBill(income) {
    if (income < 0) {
      setTaxBill(0);
    } else if (income < 9875) {
      setTaxBill(income * 0.1);
    } else if (income < 40125) {
      setTaxBill(987.5 + (income - 9875) * 0.12);
    } else if (income < 85525) {
      setTaxBill(4617.5 + (income - 40125) * 0.22);
    } else if (income < 163301) {
      setTaxBill(14605.5 + (income - 85525) * 0.24);
    } else if (income < 207350) {
      setTaxBill(33271.5 + (income - 163300) * 0.32);
    } else if (income < 518400) {
      setTaxBill(47367.5 + (income - 207350) * 0.35);
    } else {
      setTaxBill(156235 + (income - 518400) * 0.37);
    }
  }

  // Getting the estimated credits based on their student status
  function detCredits() {
    setCredits(2500);
  }

  // Getting their refund based on all data
  function getRefund() {
    const tempVal = Math.min(credits - taxBill, 1000);
    const refund = tempVal + withholdings;
    return refund;
  }


  /*
    UI
  */
  return (
    <ThemeProvider theme={themeColor}>
      <div className="root calc-root" className="container-0" tabIndex={0} style={{outline: "none"}}>
        <Typography variant="h1" className="left-title">
          <span className="underline-highlight" style={{display: step<=1 ? "" : "none"}}>Income</span>
          <span className="underline-highlight" style={{display: step==2 ? "" : "none"}}>Deductions</span>
          <span className="underline-highlight" style={{display: step==3 ? "" : "none"}}>Credits</span>
          <span className="underline-highlight" style={{display: step==4 ? "" : "none"}}>Personal Info</span>
          <span className="underline-highlight" style={{display: step>=5 ? "" : "none"}}>Your Refund</span>
        </Typography>
        <div className="container-1">
          <div className="container-2-left">
            <IncomeCard stepNum={step} onUpdate={handleIncomeChange} ></IncomeCard>
            <EducationCard stepNum={step} onUpdate={handleEducationChange} ></EducationCard>
            <HistoryCard stepNum={step} onUpdate={handleHistoryChange} ></HistoryCard>
            <PersonalInfoCard stepNum={step} onUpdate={handlePersonalChange} ></PersonalInfoCard>
            <div className="button-container" id="button-container-mobile">
              <Button
                color="primary"
                variant="contained"
                id="previous-button"
                onClick={backClick}
                style={{ boxShadow: "none", display: step>=2 ? "" : "none", float: "left" }}
              >
                Previous
              </Button>
              <Button
                color="secondary"
                style={{ boxShadow: "none", display: step<=4 ? "" : "none", float: "right" }}
                variant="contained"
                disabled={nextDisabled()}
                onClick={forwardClick}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="container-2-right">
            <Card className="refund-card" id="refund-card-mobile">
              <CardContent className="refund-card-content"></CardContent>
            </Card>
            <CalculationCard />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default Calculator2;
