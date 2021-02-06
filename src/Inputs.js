import React from "react";
import {
  ThemeProvider,
  Typography,
  FormControl,
  Select,
  Button,
  MenuItem,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { onboardingTheme } from "./constants.js";
import "./inputs.css";
import "./styles.css";

const InputTypes = {
  Dropdown,
  SingleSelect,
  DollarInput,
};

export const Input = (props) => {
  let SelectedInput = InputTypes[props.type];
  return <SelectedInput {...props} />;
};

export function Dropdown(props) {
  const items = props.options.map((option, index) => (
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
          variant="body2"
          color="textSecondary"
          className="form-item-description"
        >
          {props.description}
        </Typography>
        <FormControl variant="outlined">
          <Select>{items}</Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export function SingleSelect(props) {
  const buttons = props.options.map((option, index) => (
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
          variant="body2"
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

export function Form(props) {
  const inputs = props.formItems.map((formItem) => (
    <Input
      type={formItem.type}
      question={formItem.question}
      description={formItem.description}
      options={formItem.options}
    />
  ));
  return (
    <div className="form-container">
      <Typography variant="h4" color="textPrimary" className="form-title">
        <span className="word-highlight">{props.title}</span>
      </Typography>
      {inputs}
    </div>
  );
}
