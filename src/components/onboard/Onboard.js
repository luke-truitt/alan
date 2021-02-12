import {
  Container,
  Typography,
  Select,
  FormControl,
  Fade,
  MenuItem,
  Slide,
  Button,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import "./onboard.css";
import { AuthContext } from "../../providers/AuthProvider";
import Header from "./../header/Header";
import "../../styles.css";
import snap from "../../images/onboard/snap.svg";
import { withStyles } from "@material-ui/core/styles";
import Typist from "react-typist";
import LinearProgress from "@material-ui/core/LinearProgress";
import OnboardingInitialPanel from "./OnboardInitialPanel";
import useWindowDimensions from "./useWindowDimensions";
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
  refund,
  covidCredits,
} from "./OnboardQuestions.js";
import {
  primaryTheme,
  slideDefault,
  shortFade,
  fadeDefault,
} from "../../utils/constants.js";
import { Form } from "../inputs/Inputs.js";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/coin-loading.json";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, forwardRef, useContext } from "react";
import { PageView, initGA, Event } from "../tracking/Tracking";
import OnboardingTimeline from "./OnboardTimeline";
import { updateUser } from "../../firebase";
const trackingId = "UA-189058741-1";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;



const LinearProgressBar = withStyles((theme) => ({
  root: {
    height: "5px",
    width: "100vw",
  },
  colorPrimary: {
    backgroundColor: "#FFFFFF",
  },
  bar: {
    backgroundImage: "linear-gradient(to right, #744fc2, 60%, #002e72)",
  },
}))(LinearProgress);

function ProgressBar(props) {
  return <LinearProgressBar variant="determinate" value={props.value} />;
}

function Onboard(props) {
  const [step, setStep] = useState(1);
  const [panelActive, setPanelActive] = useState(false);
  const [fields, setFields] = useState({});
  const [formValid, setFormValid] = useState({});
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useContext(AuthContext);

  const history = useHistory();
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13) {
      //13 is the enter keycode
      if (formValid[step]) {
        forwardClick();
      }
    }
  };

  setTimeout(() => {
    setPanelActive(true);
  }, 3000);

  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  const onDataUpdate = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };

  const { width, height } = useWindowDimensions();
  const isMobile = width < 900;
const forms = !isMobile ? [
  {
    title: "Income",
    items: [income, state, covidCredits],
    formFields: ["estimatedIncome", "state", "covidCredits"],
  },
  {
    title: "Your Life",
    items: [dependence, job, school],
    formFields: ["dependent", "school"],
  },
  {
    title: "Education",
    items: [educationExpenses, studentLoans, studentStatus],
    formFields: ["educationExpenses", "loanPayments", "student"],
  },
] : [
  {
    title: "Income",
    items: [income],
    formFields: ["estimatedIncome"],
  },
  {
    title: "State",
    items: [state],
    formFields: ["state"],
  },
  {
    title: "Covid Credits",
    items: [covidCredits],
    formFields: ["covidCredits"],
  },
  {
    title: "Dependence",
    items: [dependence],
    formFields: ["dependent"],
  },
  {
    title: "Work",
    items: [job],
    formFields: [],
  },
  {
    title: "School",
    items: [school],
    formFields: ["school"],
  },
  {
    title: "Education Expenses",
    items: [educationExpenses],
    formFields: ["educationExpenses"],
  },
  {
    title: "Student Loans",
    items: [studentLoans],
    formFields: ["loanPayments"],
  },
  {
    title: "Student Status",
    items: [studentStatus],
    formFields: ["student"],
  },
];
  const checkValid = (d) => {
    const availableFields = forms[step - 1].formFields;
    let validData = true;
    availableFields.map((field) => {
      try {
        if (d[field] == null || !d[field]) {
          validData = false;
        }
      } catch {
        validData = false;
      }
    });
    updateValid({ [step]: validData });
  };
  const updateValid = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormValid((fields) => ({ ...fields, [key]: value }));
    }
  };

  const navToRefund = () => {
    const refund = Number(getRefund().toFixed(2));
    const taxableIncome = Number(getTaxableIncome().toFixed(2));
    let taxRate = 0;
    if (taxableIncome > 0) {
      taxRate = Number((getTaxBill() / getTaxableIncome()).toFixed(2));
    }
    const taxBill = Number(getTaxBill().toFixed(2));
    const creditsAndWitholdings = Number(
      (getCredits() + getWithholdings()).toFixed(2)
    );
    const data = {
      netRefund: refund,
      taxableIncome: taxableIncome,
      taxRate: taxRate,
      taxBill: taxBill,
      creditsAndWitholdings: creditsAndWitholdings,
    };

    sendData();
    setLoadingScreen(true);
    if (user.user) {
      updateUser(user.user.uid, { refundBreakdown: data,  school: fields['school'], employer: fields['companyName'], jobTitle: fields['jobTitle']});
    } 
    history.push({
      pathname: "/refund",
      state: {
        email: email,
        referToId: props.referToId,
        referById: referById,
        breakdown: data,
      },
    });
  };

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
    return !formValid[step];
  };
  const handleClickOpen = () => {
    console.log("Hey");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      onDataUpdate({
        email: email,
        referById: referById,
        referToId: props.referToId,
      });
    }
    if (step >= forms.length) {
      console.log("loadingScreen");
      setLoadingScreen(false);
      setTimeout(navToRefund, 5000);
      setStep(forms.length);
    } else {
      setStep(step + 1);
    }
  };

  /*
    State control for managing data on this page
  */
  let location = useLocation();

  let email = "";
  let referById = "";
  try {
    email = location.state["email"];
    referById = location.state["referById"];
  } catch {
    email = "";
    referById = "";
  }
  if (email == "") {
    redirectHome();
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
    return getRefundableCredits() + getNonRefundableCredits();
  }

  function getNonRefundableCredits() {
    if (fields["student"] == "No" || fields["student"] == "") {
      return 0;
    }
    return Math.max(Math.min(2500, fields["educationExpenses"]) - 1000, 0);
  }

  function getRefundableCredits() {
    let creds = Math.max(1800 - fields["covidCredits"], 0);
    if (fields["student"] == "No" || fields["student"] == "") {
      return creds;
    }
    return creds + Math.min(1000, fields["educationExpenses"]);
  }

  // Getting their refund based on all data
  function getRefund() {
    const nonRefundable = getNonRefundableCredits();
    const refundableCredits = getRefundableCredits();
    const taxBill = getTaxBill();
    const tempVal = Math.min(nonRefundable - taxBill, 0);
    const withholdings = getWithholdings();
    const refund = tempVal + withholdings + refundableCredits;
    return refund;
  }

  const loadingText = [
    "Calculating witholdings",
    "Checking credit eligibility",
    "Refund found!",
  ];

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function AlertDialog() {
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Finish the Calculator
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              We need your basic tax info so we can make sure we can help you.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function Loading() {
    const defaultOptions = {
      loop: 1,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="onboard-loading-container row-container">
        <Typography
          className="onboard-loading-title"
          variant="h4"
          color="textPrimary"
        >
          Calculating your refund...
        </Typography>
        <Lottie
          className="onboard-loading-lottie"
          width={100}
          height={100}
          options={defaultOptions}
        />
        <Typist className="onboard-loading-subtitle" avgTypingDelay={50}>
          {" "}
          <span>{loadingText[0]}</span>
          <Typist.Backspace count={loadingText[0].length} delay={200} />
          <span>{loadingText[1]}</span>
          <Typist.Backspace count={loadingText[1].length} delay={200} />
          <span>{loadingText[2]}</span>
        </Typist>
      </div>
    );
  }

  return !isMobile ? (
    <ThemeProvider theme={primaryTheme} className="onboard">
      <Header page={"Onboard"} signUp={handleClickOpen}/>
      <Slide in {...slideDefault} direction="left">
        <div
          className="onboard-c0 column-container"
          tabIndex={-1}
          onKeyPress={(e, val) => keyDown(e, val)}
        >
          {panelActive ? (
            <OnboardingTimeline activeStep={step} />
          ) : (
            <OnboardingInitialPanel />
          )}
          <div className="onboard-c1-right row-container">
            {loadingScreen ? (
              <div>
                <div container className="onboard-c1-right-div row-container">
                  <div className="background-mobile">
                  <div className="form-div">
                    <Form
                      title={forms[step - 1].title}
                      formItems={forms[step - 1].items}
                      fields={fields}
                      data={{}}
                      validForm={(d) => checkValid(d)}
                      onUpdate={onDataUpdate}
                      onKeyPress={(e, val) => keyDown(e, val)}
                    />
                  </div>
                  <div className="onboard-button-div column-container">
                    <div className="onboard-button">
                      <Button color="secondary" onClick={backClick} style={{display: step==1 ? "none" : ""}}>
                        Previous
                      </Button>
                    </div>
                    <div className="onboard-button">
                      <Button
                        variant="contained"
                        color="secondary"
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
            ) : (
              <Loading />
            )}
          </div>
          <AlertDialog />
        </div>
      </Slide>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={primaryTheme}>
      <div container className="onboard-c1-right-div row-container">
        {loadingScreen ? (<div><ProgressBar value={(step * 100) / forms.length}></ProgressBar>
        <div className="another-div">
          <div className="form-div">
            <Form
              title={forms[step - 1].title}
              formItems={forms[step - 1].items}
              fields={fields}
              data={{}}
              validForm={(d) => checkValid(d)}
              onUpdate={onDataUpdate}
              onKeyPress={(e, val) => keyDown(e, val)}
            />
          </div>
          <div className="onboard-button-div column-container">
            <div className="onboard-button">
              <Button color="secondary" onClick={backClick}>
                Previous
              </Button>
            </div>
            <div className="onboard-button">
              <Button
                variant="contained"
                color="secondary"
                disabled={nextDisabled()}
                onClick={forwardClick}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        </div>)
          : (
            <Loading />
          )
        }
        
      </div>
    </ThemeProvider>
  );
}

export default Onboard;
