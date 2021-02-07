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
import Autocomplete from '@material-ui/lab/Autocomplete';

import {schools} from "../../data/Schools.js";
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
  Refund
};

export function PhoneNumberInput(props) {
  const checkValid = (val, name) => {
    props.validData({[name]: (val.length > 9)});
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container">
        <TextField
          className="form-item-text-field"
          label="Phone Number"
          autoComplete
          variant="outlined"
          onChange={(e) => {props.onChange(e, {"stateName": "phone"}); checkValid(e.target.value, "phone");}}
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
    props.validData({[name]: (val.length > 0)});
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container">
        <TextField className="form-item-text-field" label="First Name" autoComplete variant="outlined" onChange={(e) => {props.onChange(e.target.value, {"stateName": "firstName"}); checkValid(e.target.value, "firstName");}}/>
        <TextField className="form-item-text-field" label="Last Name" autoComplete variant="outlined" onChange={(e) => {props.onChange(e.target.value, {"stateName": "lastName"}); checkValid(e.target.value, "lastName");}}/>
      </div>
    </ThemeProvider>
  );
}

export function SchoolInput(props) {

  const checkValid = (val, name) => {
    props.validData({[name]: val});
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-item-container column-container school-input">
        <Autocomplete
              id="combo-box-demo"
              className="form-item-text-field"
              options={schools}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {props.onChange(value.name, {"stateName": "school"}); checkValid(e.target.value, "classYear");}}
              renderInput={(params) => <TextField {...params} label="School" variant="outlined" />}
        />
        <TextField className="form-item-text-field" label="Graduation Year" variant="outlined" onChange={(e) => {props.onChange(e.target.value, {"stateName": "classYear"}); checkValid(e.target.value, "classYear");}}/>
      </div>
    </ThemeProvider>
  );
}

export function JobInput(props) {

  const checkValid = (val, name) => {
    props.validData({[name]: (val.length > 0)});
  }
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
        <TextField className="form-item-text-field" label="Company Name" autoComplete variant="outlined" onChange={(e) => {props.onChange(e.target.value, {"stateName": "companyName"}); checkValid(e.target.value, "companyName");}}/>
        <TextField className="form-item-text-field" label="Job Title" autoComplete variant="outlined" onChange={(e) => {props.onChange(e.target.value, {"stateName": "jobTitle"}); checkValid(e.target.value, "jobTitle");}}/>
      </div>
    </ThemeProvider>
  );
}

export function Dropdown(props) {
  const items = Object.entries(props.options).map(([option, index]) => (
    <MenuItem value={index}>{option}</MenuItem>
  ));

  const checkValid = (val) => {
    props.validData({[props.stateName]: (val.length > 0)});
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
          <Select onChange={(e) => {props.onChange(e.target.value, {"stateName": props.stateName});; checkValid(e.target.value);}}>{items}</Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export function SingleSelect(props) {
  const [selected, setSelected] = useState(-1);
  const checkValid = (index) => {
    props.validData({[props.stateName]: true})
  }
  const updateButtons = (index) => {
    setSelected(index);
    props.onChange(
      index,
      { stateName: props.stateName }
    );
  };
  const buttons = Object.entries(props.options).map(([option, index]) => (
    <Button
      variant="contained"
      value={index}
      onClick={() => {updateButtons(index); checkValid(index);}}
      className={
        selected == index
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
    props.validData({[props.stateName]: !isNaN(val)});
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
            placeholder="0" onChange={(e) => {props.onChange(parseInt(e.target.value), {"stateName": props.stateName}); checkValid(e.target.value);}}
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
      <div className="form-item-container row-container">
        {dataLabels}
      </div>
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
      props.validData(isValid);
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
  }

  const inputs = props.formItems.map((formItem) => (
    <Input
      type={formItem.type}
      question={formItem.question}
      description={formItem.description}
      options={formItem.options}
      stateName={formItem.stateName}
      value={props.fields[formItem.stateName]}
      data={props.data}
      validData={(item) => setValid(item)}
      onChange={(e, item) => onChange(e, item)}
    />
  ));

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="form-container">
        <Typography variant="h4" color="textPrimary" className="form-title">
          <span className="word-highlight">{props.title}</span>
        </Typography>
        {inputs}
      </div>
    </ThemeProvider>
  );
}

export function EmbeddedEmailInput(props) {
  const checkValid = (val) => {
    // TODO
  }

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="embedded-email-input-container form-item-container column-container">
        <TextField
          type="email"
          className="form-item-text-field embedded-email-input-field"
          variant="outlined"
          value={props.emailValue}
          onKeyDown={props.onKeyDown}
          InputProps={{ disableUnderline: true }}
          onChange={(e) => {props.setEmail(e.target.value); checkValid(e.target.value);}}
        />
        <Button
          className="embedded-email-input-button"
          variant="contained"
          color="secondary"
          onClick={props.navTo}
        >
          Calculate my refund
        </Button>
      </div>
    </ThemeProvider>
  );
}
