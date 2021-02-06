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
  InputLabel,
} from "@material-ui/core";
import { onboardingTheme } from "./constants.js";
import "./inputs.css";
import "./styles.css";
import InputMask from "react-input-mask";
const InputTypes = {
  Dropdown,
  SingleSelect,
  DollarInput,
  NameInput,
  PhoneNumberInput,
};

export function PhoneNumberInput(props) {
  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="form-item-container column-container">
        <TextField
          className="form-item-phone-number"
          label="Phone Number"
          autoComplete
          variant="outlined"
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
  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="form-item-container column-container">
        <TextField label="First Name" autoComplete variant="outlined" />
        <TextField label="Last Name" autoComplete variant="outlined" />
      </div>
    </ThemeProvider>
  );
}

export function Dropdown(props) {
  const items = Object.entries(props.options).map(([option, index]) => (
    <MenuItem value={index}>{option}</MenuItem>
  ));
  return (
    <ThemeProvider theme={onboardingTheme}>
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
          <Select onChange={props.onChange}>{items}</Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export function SingleSelect(props) {
  const buttons = Object.entries(props.options).map(([option, index]) => (
    <Button variant="contained" value={index} className="single-select-button">
      {option}
    </Button>
  ));
  return (
    <ThemeProvider theme={onboardingTheme}>
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
  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="form-item-container row-container">
        <Typography
          variant="h6"
          color="textPrimary"
          className="form-item-question"
        >
          {props.question}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="form-item-description"
        >
          {props.description}
        </Typography>
        <FormControl variant="outlined">
          <OutlinedInput
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            defaultValue="0"
          />
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
let dataChange = false;
export function Form(props) {
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (dataChange) {
      props.onUpdate(fields);
      dataChange = false;
    }
  });

  const onChange = (e, formItem) => {
    const dic = { [formItem.stateName]: e.target.value };
    updateDict(dic);
    dataChange = true;
  };

  const updateDict = (d) => {
    for (const [key, value] of Object.entries(d)) {
      setFields((fields) => ({ ...fields, [key]: value }));
    }
  };

  const inputs = props.formItems.map((formItem) => (
    <Input
      type={formItem.type}
      question={formItem.question}
      description={formItem.description}
      options={formItem.options}
      onChange={(e) => onChange(e, formItem)}
    />
  ));

  return (
    <ThemeProvider theme={onboardingTheme}>
      <div className="form-container">
        <Typography variant="h4" color="textPrimary" className="form-title">
          <span className="word-highlight">{props.title}</span>
        </Typography>
        {inputs}
      </div>
    </ThemeProvider>
  );
}
