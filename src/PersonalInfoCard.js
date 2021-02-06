import {
  Card,
  Select,
  MenuItem,
  CardContent,
  Typography,
  ThemeProvider,
  TextField,
  FormControl,
} from "@material-ui/core/";
import ReactPhoneInput from "react-phone-input-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { themeColor } from "./constants.js";
import "./calculator_page.css";
import { DollarInput, YesNo, Dropdown } from "./formConstants.js";
import { useState, useEffect } from "react";

const q1 = {
  question: "",
  description: "",
  options: {
    "Already graduated.": "Graduated",
    2021: "2021",
    2022: "2022",
    2023: "2023",
    2024: "2024",
  },
  placeholder: "Grad Year",
};
const q2 = {
  question: "Are you an international student?",
  description: "",
};
let dataChange = false;

function PersonalInfoCard(props) {
  useEffect(() => {
    if (dataChange) {
      const data = {
        a1: a1,
        a2: a2,
        firstName: first,
        lastName: last,
        phone: phone,
      };
      props.onUpdate(data);
      dataChange = false;
    }
  });
  const updateA1 = (e) => {
    setA1(e.target.value);
    dataChange = true;
  };
  const updateA2 = (e) => {
    setA2(e.target.value);
    dataChange = true;
  };
  const updateFirst = (e) => {
    setFirst(e.target.value);
    dataChange = true;
  };
  const updateLast = (e) => {
    setLast(e.target.value);
    dataChange = true;
  };
  const updatePhone = (e) => {
    setPhone(e);
    dataChange = true;
  };
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <ThemeProvider theme={themeColor}>
      <Card
        className="income-card"
        id="income-card-mobile"
        style={{ display: props.stepNum == 4 ? "" : "none" }}
      >
        <CardContent className="income-card-content">
          <div className="form-row form-item">
            <TextField
              required
              label="First Name"
              placeholder="Mary"
              variant="outlined"
              onChange={(e) => updateFirst(e)}
            />
            <TextField
              required
              label="Last Name"
              placeholder="Stewart"
              variant="outlined"
              onChange={(e) => updateLast(e)}
            />
          </div>
          <div className="form-item">
            {/* <TextField
              required
              label="Phone Number"
              placeholder="+1 (123) 069-0420"
              variant="outlined"
              className="form-item"
              error=
              onChange={(e) => updatePhone(e)}
            /> */}
            <ReactPhoneInput
              value={phone}
              // defaultCountry={'us'}
              onChange={(e) => updatePhone(e)}
              // inputClass={classes.field}
              // dropdownClass={classes.countryList}
              component={TextField}
            />
          </div>
          <Dropdown
            question={q1.question}
            description={q1.description}
            options={q1.options}
            placeholder={q1.placeholder}
            onChange={(e) => updateA1(e)}
          />
          <YesNo
            question={q2.question}
            description={q2.description}
            onChange={(e) => updateA2(e)}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default PersonalInfoCard;
