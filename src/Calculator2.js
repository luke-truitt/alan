import "./calculator2.css";
import React, {useRef, useState, useEffect } from "react";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core/";
import { theme } from "./constants.js";
import { useHistory, useLocation } from "react-router-dom";
const { REACT_APP_API_BASE_URL, REACT_APP_WAITLIST_URL, REACT_APP_CALCULATOR_URL } = process.env;

function Calculator2(props) {
  let location = useLocation();
  let email = ''
  try {
    email = location.state['email']
  } catch {
    email = ''
  }
  const history = useHistory();
  const goHome = () => {
    history.push({ pathname: "/"});
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [taxableIncome, setTaxableIncome ] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [credits, setCredits ] = useState(0);
  const [taxBill, setTaxBill ] = useState(0);
  const [withholdings, setWithholdings] = useState(0);
  
  const axios = require('axios');
  useEffect(() => {
    if(step==3) {
      
      dedLabel.current.innerHTML = deductions;
      taxIncomeLabel.current.innerHTML = taxableIncome;
      taxBillLabel.current.innerHTML = taxBill;
    } else if(step == 4) {
      creditsLabel.current.innerHTML = credits;
    } 
    else if(step==5) {
      sendData();
    }
  });
  function getWithholdings() {
    const inc = formData['estimatedIncome'];
    if (inc < 9875) {
      setWithholdings(inc * 0.1);
    } else if (inc < 40125) {
      setWithholdings(987.5 + ((inc - 9875) * 0.12));
    } else if (inc < 85525) {
      setWithholdings(4617.5 + ((inc-40125) * 0.22));
    } else if (inc < 163301) {
      setWithholdings(14605.5 + ((inc-85525) * 0.24));
    } else if (inc < 207350) {
      setWithholdings(33271.5 + ((inc-163300) * 0.32));
    } else if (inc < 518400) {
      setWithholdings(47367.5 + ((inc-207350) * 0.35));
    } else {
      setWithholdings(156235 + ((inc-518400) * 0.37));
    }
  }
  function getTaxBill(taxIncome) {
    if (taxIncome < 0) {
      setTaxBill(0);
    } else if (taxIncome < 9875) {
      setTaxBill(taxIncome * 0.1);
    } else if (taxIncome < 40125) {
      setTaxBill(987.5 + ((taxIncome - 9875) * 0.12));
    } else if (taxIncome < 85525) {
      setTaxBill(4617.5 + ((taxIncome-40125) * 0.22));
    } else if (taxIncome < 163301) {
      setTaxBill(14605.5 + ((taxIncome-85525) * 0.24));
    } else if (taxIncome < 207350) {
      setTaxBill(33271.5 + ((taxIncome-163300) * 0.32));
    } else if (taxIncome < 518400) {
      setTaxBill(47367.5 + ((taxIncome-207350) * 0.35));
    } else {
      setTaxBill(156235 + ((taxIncome-518400) * 0.37));
    }
  }

  function detCredits() {
    setCredits(2500);

  }

  function getRefund() {
    const tempVal = Math.min((credits - taxBill), 1000);
    const refund = tempVal + withholdings;
    return refund;
  }

  function sendData() {
      axios.post(REACT_APP_API_BASE_URL + REACT_APP_CALCULATOR_URL, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormData(formData => ({...formData, [key]:value}));
    }
  };
  const backClick = () => {
    if(step <=1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };
  let estIncome, dependent, estimatedRefund, eduCredits, refund, firstName, lastName, phone, classYear, howFiled, international;

  const forwardClick = () => {
    if(step==1) {
      estIncome = incomeInput.current.value;
      dependent = depInput.current.value;
      estimatedRefund = refInput.current.value;
      incomeLabel.current.innerHTML = estIncome;
      const d = {'email': email, 'estimatedIncome': estIncome,'dependent': dependent,'estimatedRefund': estimatedRefund}
      updateDict(d);
    } else if (step==2) {
      getWithholdings();
      setDeductions(textInput2.current.value);
      setTaxableIncome(formData['estimatedIncome'] - textInput2.current.value - 12400);
      getTaxBill(formData['estimatedIncome'] - textInput2.current.value - 12400);
    } else if (step==3) {
      detCredits();
      eduCredits = eduCreditInput.current.value;
      updateDict({'taxCredits': eduCredits});
    } else if (step == 4) {
      refund = getRefund();
      refundLabel.current.innerHTML = refund;
      refundMainLabel.current.innerHTML = refund;
      firstName = firstInput.current.value;
      lastName = lastInput.current.value;
      phone = phoneInput.current.value;
      classYear = yearInput.current.value;
      howFiled = filedInput.current.value;
      international = intlInput.current.value;
      const dd = {'firstName': firstName, 'lastName': lastName, 'phone': phone,'classYear': classYear,'howFiled': howFiled,'international': international}
      updateDict(dd)
    }
    if(step >=5) {
      setStep(5)
    } else {
      setStep(step + 1)
    }
  };

  const incomeInput = useRef(null);
  const depInput = useRef(null);
  const refInput = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const eduCreditInput = useRef(null);
  const firstInput = useRef(null);
  const lastInput = useRef(null);
  const phoneInput = useRef(null);
  const yearInput = useRef(null);
  const filedInput = useRef(null);
  const intlInput = useRef(null);

  const incomeLabel = useRef(null);
  const dedLabel = useRef(null);
  const taxIncomeLabel = useRef(null);
  const taxBillLabel = useRef(null);
  const creditsLabel = useRef(null);
  const refundLabel = useRef(null);
  const refundMainLabel = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <div className="outer-container-calculator" id="outer-container-mobile">
        <div className="inner-container-left" id="inner-container-left-mobile">
          
          <Card className="income-card" id="income-card-mobile" style={{display: step==1 ? '' : 'none'}}>
          <Typography variant="h1">
            <span className="underline-highlight">Income</span>
          </Typography>
          <div>How much did you make last year? (Roughly)
            <input ref={incomeInput} type="number"/></div>
            <div>Are you a dependent?
            <input ref={depInput} type="text"/></div>
            <div>How big of a refund did you get last year?
            <input ref={refInput} type="number"/></div>
            </Card>
          <Card className="income-card" id="income-card-mobile" style={{display: step==2 ? '' : 'none'}}>
          <Typography variant="h1">
            <span className="underline-highlight">Deductions</span>
          </Typography>
          <div>How much are you?
            <input ref={textInput2} type="number"/></div>
          </Card>
          <Card className="income-card" id="income-card-mobile" style={{display: step==3 ? '' : 'none'}}>
          <Typography variant="h1">
            <span className="underline-highlight">Credits</span>
          </Typography>
          <div>How many are you?
            <input ref={textInput3} type="number"/></div>
            
            <div>Had you heard of educational tax creadts before this?
            <input ref={eduCreditInput} type="checkbox"/></div>
          </Card>
          <Card className="income-card" id="income-card-mobile" style={{display: step==4 ? '' : 'none'}}>
          <Typography variant="h1">
            <span className="underline-highlight">Personal</span>
          </Typography>
            <input ref={firstInput} type="text" placeholder="First Name"/>
            
            <input ref={lastInput} type="text" placeholder="Last Name"/>
            <input ref={phoneInput} type="tel" placeholder="Phone Number"/>
            <input ref={yearInput} type="number" placeholder="Grad Year"/>
            <div>How did you file for taxes last year?
              <input ref={filedInput} type="text"/></div>
            <div>International Student? 
              <input ref={intlInput} type="checkbox"/></div>
          </Card>
          <Card className="income-card" id="income-card-mobile" style={{display: step==5 ? '' : 'none'}}>
          <Typography variant="h1">
            <span className="underline-highlight">Done</span>
          </Typography>
          </Card>
          <div className="button-container" id="button-container-mobile">
            <Button color="secondary" variant="contained" onClick={backClick} style={{display: step<=1 ? 'none' : ''}}>
              Previous
            </Button>
            <Button color="secondary" variant="contained" onClick={forwardClick} style={{display: step>=5 ? 'none' : ''}}>
              Next
            </Button>
          </div>
        </div>
        <div
          className="inner-container-right"
          id="inner-container-right-mobile"
        >
          <Card className="refund-card" id="refund-card-mobile">
            <CardContent className="refund-card-content">
              <div className="refund-content">
                <Typography variant="h1" color="primary">
                  <span className="refund-amount" ref={refundMainLabel}>$3,000</span>
                </Typography>

                <Typography variant="h3" color="primary">
                  <span className="refund-label">Refund Amount</span>
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card className="calculator-card" id="calculator-card-mobile">
            <CardContent>Calculator Card</CardContent>
            <p ref={incomeLabel} style={{ display: step >= 2 ? "" : "none" }}>+ $X,TTT</p>
            <p ref={dedLabel} style={{ display: step >= 3 ? "" : "none" }}>+ $X,TTT</p>
            <p style={{ display: step >= 3 ? "" : "none" }}>+ $12,400</p>
            <p ref={taxIncomeLabel} style={{ display: step >= 3 ? "" : "none" }}>+ $X,TTT</p>
            <p ref={taxBillLabel} style={{ display: step >= 3 ? "" : "none" }}>+ $X,TTT</p>
            <p ref={creditsLabel} style={{ display: step >= 4 ? "" : "none" }}>+ $X,TTT</p>
            <p ref={refundLabel} style={{ display: step >= 5 ? "" : "none" }}>+ $X,TTT</p>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Calculator2;
