import {
  Container,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { onboardingTheme } from "./constants.js";
import "./onboarding.css";
import "./styles.css";
import { Form } from "./Inputs.js";
import snap from "./images/snap.svg";

import {
  income,
  dependence,
  educationCredits,
  taxMethod,
  refundSize,
  educationExpenses,
  studentLoans,
  studentStatus,
} from "./OnboardingQuestions.js";
import { useLocation } from "react-router-dom";
import {useState,useEffect} from "react"
const forms = [
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
];

function Onboarding(props) {

  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});

  const useEffect = () => {
    console.log(fields);
  }
  const onDataUpdate = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };
  /*
    Functions for controlling UI Elements and Interacting with DOM
  */

  // Logic for determining whether or not the "Next" button should be disabled
  // const nextDisabled = () => {
  //   console.log(step)
  //   if(step==1) {
  //     try {
  //       return (incomeFields['estimatedIncome'] == null || incomeFields['estimatedIncome'] == 0 || incomeFields['dependent']==null || incomeFields['dependent']=="")
  //     } catch {
  //       return true;
  //     }
  //   } else if (step==2) {
  //     try {
  //       return (educationFields['a1'] == null || educationFields['a1'] == 0 || educationFields['a2']==null || educationFields['a2'] == 0 ||educationFields['a3']==null || educationFields['a3'] == "")
  //     } catch {
  //       return true;
  //     }
  //   } else if (step==3) {
  //     try {
  //       console.log(historyFields);
  //       return (historyFields['a1'] == null || historyFields['a1']=="" || historyFields['a2']==null || historyFields['a2']=="" || historyFields['a3']==null || historyFields['a3']==0)
  //     } catch {
  //       return true;
  //     }
  //   } else if (step==4) {
  //     try {
  //       console.log(personalFields);
  //       return (personalFields['classYear'] == null || personalFields['classYear'] == "" || personalFields['firstName']==null || personalFields['firstName'] == "" || personalFields['lastName']==null || personalFields['lastName'] == "" || personalFields['phone']==null || personalFields['phone'] == "" ||personalFields['international']==null || personalFields['international'] == "")
  //     } catch {
  //       return true;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

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
    // if (step == 1) {
    //   const d = {
    //     email: email,
    //     estimatedIncome: incomeFields['estimatedIncome'],
    //     dependent: incomeFields['dependent'],
    //   };
    //   updateDict(d);
    // } else if (step == 2) {
    // //   getWithholdings();
    // //   setDeductions(textInput2.current.value);
    // //   setTaxableIncome(
    // //     formData["estimatedIncome"] - textInput2.current.value - 12400
    // //   );
    // //   getTaxBill(
    // //     formData["estimatedIncome"] - textInput2.current.value - 12400
    // //   );
    // }
    // else if (step == 3) {
    // //   detCredits();
    //   const ddd = {
    //     taxCredits: historyFields['eduCredits'],
    //     howFiled: historyFields['howFiled'],
    //     estimatedRefund: historyFields['estRefund'],
    //   }
    //   updateDict(ddd);
    // } else if (step == 4) {
    //   // refund = getRefund();
    //   // refundLabel.current.innerHTML = refund;
    //   // refundMainLabel.current.innerHTML = refund;
    //   // firstName = firstInput.current.value;
    //   // lastName = lastInput.current.value;
    //   // phone = phoneInput.current.value;
    //   // classYear = yearInput.current.value;
    //   // howFiled = filedInput.current.value;
    //   // international = intlInput.current.value;
    //   const dd = {
    //     firstName: personalFields["firstName"],
    //     lastName: personalFields["lastName"],
    //     phone: personalFields["phone"],
    //     classYear: personalFields["classYear"],
    //     international: personalFields["international"],
    //   };
    //   updateDict(dd);
    // }
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
  const [formData, setFormData] = useState({});
  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFormData((formData) => ({ ...formData, [key]: value }));
    }
  };

  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="onboarding-c0 column-container">
        <div className="onboarding-c1-left row-container">
          <div container className="onboarding-c1-left-div">
            <Typography variant="h3" className="onboarding-c1-left-title">
              A few clicks from a bigger refund
            </Typography>
            <Typography variant="body1" className="onboarding-c1-left-subtitle">
              File for your tax refund in minutes. Get back money and time.
            </Typography>
          </div>
          <img className="onboarding-c1-left-img" src={snap}></img>
        </div>
        <div className="onboarding-c1-right row-container">
          <div container className="onboarding-c1-right-div">
            <Form title={forms[step-1].title} formItems={forms[step-1].items} onUpdate={onDataUpdate}/>
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
