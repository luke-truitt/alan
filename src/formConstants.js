import {
  Card,
  Select,
  MenuItem,
  CardContent,
  Typography,
  ThemeProvider,
  OutlinedInput,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { themeColor } from "./constants.js";
import "./calculator_page.css";
export function Dropdown(props) {
  const items = Object.entries(props.options).map(([option, index]) => (
    <MenuItem value={index}>{option}</MenuItem>
  ));
  return (
    <div className="form-item">
      <Typography variant="h6" color="textPrimary" className="question-text">
        {props.question}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className="description-text"
      >
        {props.description}
      </Typography>
      <FormControl variant="outlined">
        <Select className="inout0container" onChange={props.onChange}>{items}</Select>
      </FormControl>
    </div>
  );
}

export function DollarInput(props) {
  return (
    <div className="form-item">
      <Typography variant="h6" color="textPrimary" className="question-text">
        {props.question}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className="description-text"
      >
        {props.description}
      </Typography>
      <FormControl variant="outlined" className="input-container">
        <OutlinedInput
          className="input-container"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          defaultValue="0"
          onChange={props.onChange}
        />
      </FormControl>
    </div>
  );
}

export function YesNo(props) {
  return (
    <div className="form-item">
      <Typography variant="h6" color="textPrimary" className="question-text">
        {props.question}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className="description-text"
      >
        {props.description}
      </Typography>
      <FormControl>
        <RadioGroup row onChange={props.onChange}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
