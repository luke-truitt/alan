import "./calculator_page.css";
import React, { useRef, useState, useEffect } from "react";
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
import CalculationCard from "./CalculationCard.js";
import IncomeCard from "./IncomeCard.js";
import EducationCard from "./EducationCard.js";
import HistoryCard from "./HistoryCard.js";
import PersonalInfoCard from "./PersonalInfoCard.js";

import { useHistory, useLocation } from "react-router-dom";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function Calculator2({props}) {
  const [incomeFields, setIncomeFields] = useState({});
  const [deductionFields, setDeductionFields] = useState({});
  const [creditsFields, setCreditsFields] = useState({});
  const [personalFields, setPersonalFields] = useState({});

  const handleIncomeChange = (data) => {
    let newFields = { ...incomeFields };
    newFields['a1'] = data['a1'];
    newFields['a2'] = data['a2'];
    setIncomeFields(newFields);
  }
  const handleDeductionsChange = (data) => {
    let newFields = { ...deductionFields };
    newFields['a1'] = data['a1'];
    newFields['a2'] = data['a2'];
    newFields['a3'] = data['a3'];
    setDeductionFields(newFields);
    console.log(newFields);
  }
  const handleHistoryChange = (data) => {
    let newFields = { ...creditsFields };
    newFields['a1'] = data['a1'];
    newFields['a2'] = data['a2'];
    newFields['a3'] = data['a3'];
    setCreditsFields(newFields);
    console.log(newFields);
  }
  const handlePersonalChange = (data) => {
    let newFields = { ...personalFields };
    newFields['a1'] = data['a1'];
    newFields['a2'] = data['a2'];
    newFields['a3'] = data['a3'];
    setPersonalFields(newFields);
    console.log(newFields);
  }
  let location = useLocation();
  let email = "";
  try {
    email = location.state["email"];
  } catch {
    email = "";
  }

  const history = useHistory();
  const goHome = () => {
    history.push({ pathname: "/" });
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [credits, setCredits] = useState(0);
  const [taxBill, setTaxBill] = useState(0);
  const [withholdings, setWithholdings] = useState(0);

  const axios = require("axios");
  useEffect(() => {
    if (step == 3) {
      // dedLabel.current.innerHTML = deductions;
      // taxIncomeLabel.current.innerHTML = taxableIncome;
      // taxBillLabel.current.innerHTML = taxBill;
    } else if (step == 4) {
      // creditsLabel.current.innerHTML = credits;
    } else if (step == 5) {
      // sendData();
    }
  });
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
  function getTaxBill(taxIncome) {
    if (taxIncome < 0) {
      setTaxBill(0);
    } else if (taxIncome < 9875) {
      setTaxBill(taxIncome * 0.1);
    } else if (taxIncome < 40125) {
      setTaxBill(987.5 + (taxIncome - 9875) * 0.12);
    } else if (taxIncome < 85525) {
      setTaxBill(4617.5 + (taxIncome - 40125) * 0.22);
    } else if (taxIncome < 163301) {
      setTaxBill(14605.5 + (taxIncome - 85525) * 0.24);
    } else if (taxIncome < 207350) {
      setTaxBill(33271.5 + (taxIncome - 163300) * 0.32);
    } else if (taxIncome < 518400) {
      setTaxBill(47367.5 + (taxIncome - 207350) * 0.35);
    } else {
      setTaxBill(156235 + (taxIncome - 518400) * 0.37);
    }
  }

  function detCredits() {
    setCredits(2500);
  }

  function getRefund() {
    const tempVal = Math.min(credits - taxBill, 1000);
    const refund = tempVal + withholdings;
    return refund;
  }

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
  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormData((formData) => ({ ...formData, [key]: value }));
    }
  };
  const backClick = () => {
    if (step <= 1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };


  const forwardClick = () => {
    if (step == 1) {
      // estIncome = incomeInput.current.value;
      // dependent = depInput.current.value;
      // estimatedRefund = refInput.current.value;
      // incomeLabel.current.innerHTML = estIncome;
      
      // const d = {
      //   email: email,
      //   estimatedIncome: estIncome,
      //   dependent: dependent,
      //   estimatedRefund: estimatedRefund,
      // };
      // updateDict(d);
    } else if (step == 2) {
    //   getWithholdings();
    //   setDeductions(textInput2.current.value);
    //   setTaxableIncome(
    //     formData["estimatedIncome"] - textInput2.current.value - 12400
    //   );
    //   getTaxBill(
    //     formData["estimatedIncome"] - textInput2.current.value - 12400
    //   );
    // } else if (step == 3) {
    //   detCredits();
    //   eduCredits = eduCreditInput.current.value;
    //   updateDict({ taxCredits: eduCredits });
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
      // const dd = {
      //   firstName: firstName,
      //   lastName: lastName,
      //   phone: phone,
      //   classYear: classYear,
      //   howFiled: howFiled,
      //   international: international,
      // };
      // updateDict(dd);
    }
    if (step >= 5) {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <ThemeProvider theme={themeColor}>
      <div className="root" className="container-0">
        <Typography variant="h1" className="left-title">
          <span className="underline-highlight" style={{display: step<=1 ? "" : "none"}}>Income</span>
          <span className="underline-highlight" style={{display: step==2 ? "" : "none"}}>Deductions</span>
          <span className="underline-highlight" style={{display: step==3 ? "" : "none"}}>Credits</span>
          <span className="underline-highlight" style={{display: step==4 ? "" : "none"}}>Personal Info</span>
          <span className="underline-highlight" style={{display: step>=5 ? "" : "none"}}>Your Refund</span>
        </Typography>
        <div className="container-1">
          <div className="container-2-left">
            <IncomeCard stepNum={step} onUpdate={handleIncomeChange}></IncomeCard>
            <EducationCard stepNum={step} onUpdate={handleDeductionsChange}></EducationCard>
            <HistoryCard stepNum={step} onUpdate={handleHistoryChange}></HistoryCard>
            <PersonalInfoCard stepNum={step} onUpdate={handleHistoryChange}></PersonalInfoCard>
            <div className="button-container" id="button-container-mobile">
              <Button
                color="primary"
                variant="contained"
                id="previous-button"
                onClick={backClick}
                style={{ boxShadow: "none", display: step>=2 ? "" : "none"  }}
              >
                Previous
              </Button>
              <Button
                color="secondary"
                style={{ boxShadow: "none", display: step<=4 ? "" : "none" }}
                variant="contained"
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
