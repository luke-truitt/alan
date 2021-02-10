import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Typography,
  FormControl,
  Select,
  Button,
  MenuItem,
  TextField,
  InputAdornment,
  OutlinedInput,
  Slide,
  NativeSelect,
  CircularProgress,
  InputLabel,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { schools } from "../../data/Schools.js";
import { primaryTheme } from "../../utils/constants.js";
import "./inputs.css";
import "../../styles.css";

const InputTypes = {
  Dropdown,
  SingleSelect,
  DollarInput,
  NameInput,
  PhoneNumberInput,
  SchoolInput,
  JobInput,
  Refund,
};

export function PhoneNumberInput(props) {
  const checkValid = (val, name) => {
    props.validData({ [name]: val.length > 9 });
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container">
        <TextField
          className="form-item-text-field"
          label="Phone Number"
          autoComplete
          variant="outlined"
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          placeholder={props.placeholder}
          value={props.fields["phone"]}
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "phone" });
            checkValid(e.target.value, "phone");
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export const Input = (props) => {
  let SelectedInput = InputTypes[props.type];
  return <SelectedInput {...props} />;
};

export function NameInput(props) {
  const checkValid = (val, name) => {
    props.validData({ [name]: val.length > 0 });
  };
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container">
        <TextField
          className="form-item-text-field"
          label="First Name"
          value={props.fields["firstName"]}
          autoComplete
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          variant="outlined"
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "firstName" });
            checkValid(e.target.value, "firstName");
          }}
        />
        <TextField
          className="form-item-text-field"
          label="Last Name"
          value={props.fields["lastName"]}
          autoComplete
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          variant="outlined"
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "lastName" });
            checkValid(e.target.value, "lastName");
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export function SchoolInput(props) {
  const checkValid = (value, name) => {
    let res = "";
    if (value == null) {
      res = "";
    } else {
      res = value.name;
    }
    props.validData({ [name]: res.length > 0 });
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container school-input">
        <Autocomplete
          id="combo-box-demo"
          className="form-item-text-field"
          options={schools}
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          getOptionLabel={(option) => option.name}
          // inputValue = {props.fields["school"]}
          onChange={(e, value) => {
            props.onChange(value, { stateName: "school" });
            checkValid(value, "school");
          }}
          renderInput={(params) => (
            <TextField {...params} label="School" variant="outlined" />
          )}
        />
        <TextField
          className="form-item-text-field"
          label="Graduation Year"
          value={props.fields["classYear"]}
          variant="outlined"
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "classYear" });
            checkValid({ name: e.target.value }, "classYear");
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export function JobInput(props) {
  const checkValid = (val, name) => {
    props.validData({ [name]: val.length > 0 });
  };
  return (
    <ThemeProvider theme={primaryTheme}>
      <Typography
        variant="h6"
        color="textPrimary"
        className="form-item-question"
      >
        {props.question}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        className="form-item-description"
      >
        {props.description}
      </Typography>
      <div className="form-item-container column-container">
        <TextField
          className="form-item-text-field"
          label="Company Name"
          value={props.fields["companyName"]}
          autoComplete
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          variant="outlined"
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "companyName" });
            checkValid(e.target.value, "companyName");
          }}
        />
        <TextField
          className="form-item-text-field"
          label="Job Title"
          value={props.fields["jobTitle"]}
          autoComplete
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          variant="outlined"
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: "jobTitle" });
            checkValid(e.target.value, "jobTitle");
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export function Dropdown(props) {
  const items = Object.entries(props.options).map(([option, index]) => (
    <MenuItem value={index}>{option}</MenuItem>
  ));

  const checkValid = (val) => {
    props.validData({ [props.stateName]: val.length > 0 });
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container row-container">
        <Typography
          variant="h6"
          color="textPrimary"
          className="form-item-question"
        >
          {props.question}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className="form-item-description"
        >
          {props.description}
        </Typography>
        <FormControl variant="outlined">
          <Select
            onKeyPress={(e, val) => props.onKeyPress(e, val)}
            value={props.fields[props.stateName]}
            onChange={(e) => {
              props.onChange(e.target.value, { stateName: props.stateName });
              checkValid(e.target.value);
            }}
          >
            {items}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export function SingleSelect(props) {
  const checkValid = (index) => {
    props.validData({ [props.stateName]: true });
  };
  const updateButtons = (index) => {
    props.onChange(index, { stateName: props.stateName });
  };
  const buttons = Object.entries(props.options).map(([option, index]) => (
    <Button
      variant="contained"
      onClick={() => {
        updateButtons(index);
        checkValid(index);
      }}
      className={
        props.fields[props.stateName] == index
          ? "single-select-button selected"
          : "single-select-button"
      }
    >
      {option}
    </Button>
  ));
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container row-container">
        <Typography
          variant="h6"
          color="textPrimary"
          className="form-item-question"
        >
          {props.question}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className="form-item-description"
        >
          {props.description}
        </Typography>

        <FormControl variant="outlined">
          <div className="single-select-button-container column container ">
            {buttons}
          </div>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export function DollarInput(props) {
  const checkValid = (val) => {
    props.validData({ [props.stateName]: !isNaN(val) });
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container row-container">
        <Typography
          variant="h6"
          color="textPrimary"
          className="form-item-question"
        >
          {props.question}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className="form-item-description"
        >
          {props.description}
        </Typography>
        <FormControl variant="outlined">
          <OutlinedInput
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            placeholder="0"
            onKeyPress={(e, val) => props.onKeyPress(e, val)}
            value={
              isNaN(props.fields[props.stateName])
                ? ""
                : props.fields[props.stateName]
            }
            onChange={(e) => {
              props.onChange(parseInt(e.target.value), {
                stateName: props.stateName,
              });
              checkValid(e.target.value);
            }}
          />
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
export function Refund(props) {
  const dataLabels = Object.entries(props.data).map(([name, value]) => (
    <div>
      <Typography
        variant="h6"
        color="textPrimary"
        className="form-item-question"
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className="form-item-description"
      >
        {value}
      </Typography>
    </div>
  ));
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container row-container">{dataLabels}</div>
    </ThemeProvider>
  );
}
let dataChange = false;
export function Form(props) {
  const [fields, setFields] = useState({});
  const [isValid, setIsValid] = useState({});

  useEffect(() => {
    if (dataChange) {
      props.onUpdate(fields);
      props.validForm(isValid);
      dataChange = false;
    }
  });

  const onChange = (e, formItem) => {
    const dic = { [formItem.stateName]: e };
    updateDict(dic);
    dataChange = true;
  };

  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };

  const setValid = (item) => {
    for (const [key, value] of Object.entries(item)) {
      setIsValid((isValid) => ({ ...isValid, [key]: value }));
    }
  };

  const inputs = props.formItems.map((formItem) => (
    <Input
      type={formItem.type}
      question={formItem.question}
      description={formItem.description}
      options={formItem.options}
      stateName={formItem.stateName}
      fields={props.fields}
      onKeyPress={(e, val) => props.onKeyPress(e, val)}
      data={props.data}
      validData={(item) => setValid(item)}
      onChange={(e, item) => onChange(e, item)}
    />
  ));
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-container">
        <Typography variant="h4" color="textPrimary" className="form-title">
          <span className="purple-highlight">{props.title}</span>
        </Typography>
        <div className="form-inputs">{inputs}</div>
      </div>
    </ThemeProvider>
  );
}
export function TextInput(props) {
  const [valid, setValid] = useState(false);

  const checkValid = (val) => {
    if (val.length > 0) {
      console.log("Good");
      setValid(true);
    } else {
      console.log("Bad");
      setValid(false);
    }
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="embedded-email-input-container form-item-container column-container">
        <TextField
          type={props.type}
          className="form-item-text-field embedded-email-input-field"
          variant={props.invalid ? "standard" : "outlined"}
          value={props.value}
          placeholder={props.placeholder}
          style={{
            borderColor: "red",
            borderWidth: props.invalid ? "1px" : "0px",
            borderStyle: "solid",
            borderRadius: "2px",
            paddingLeft: "3px",
          }}
          onKeyPress={(e, val) => props.onKeyPress(e, val)}
          InputProps={{ disableUnderline: true }}
          onChange={(e) => {
            props.onChange(e.target.value, { stateName: props.stateName });
            checkValid(e.target.value);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
export function EmbeddedEmailInput(props) {
  const [valid, setValid] = useState(false);

  const checkValid = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      console.log("Good");
      setValid(true);
    } else {
      console.log("Bad");
      setValid(false);
    }
  };

  const ButtonText = (
    <span className="home-button-text">
      {" "}
      <span className="home-mobile-button-text"> Calculate </span>
      <span className="home-web-button-text"> Calculate my refund</span>
    </span>
  );

  const ValidationTextField = props.invalid ? (
    <TextField
      error
      helperText="Please enter a valid email."
      type="email"
      label="Enter email"
      className="form-item-text-field embedded-email-input-field"
      variant="outlined"
      value={props.emailValue}
      onKeyPress={(e) => props.onKeyPress(e, valid)}
      InputProps={{ disableUnderline: true }}
      onChange={(e) => {
        props.setEmail(e.target.value);
        checkValid(e.target.value);
      }}
    />
  ) : (
    <TextField
      type="email"
      label="Enter email"
      className="form-item-text-field embedded-email-input-field"
      variant="outlined"
      value={props.emailValue}
      onKeyPress={(e) => props.onKeyPress(e, valid)}
      InputProps={{ disableUnderline: true }}
      onChange={(e) => {
        props.setEmail(e.target.value);
        checkValid(e.target.value);
      }}
    />
  );
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="embedded-email-input-container form-item-container column-container">
        {ValidationTextField}
        <Button
          className="embedded-email-input-button"
          variant="contained"
          color="secondary"
          onClick={valid ? props.navTo : props.invalidClick}
        >
          {props.loading ? <CircularProgress /> : ButtonText}
        </Button>
      </div>
    </ThemeProvider>
  );
}
