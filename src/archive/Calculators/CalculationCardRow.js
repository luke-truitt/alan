import { ThemeProvider, Typography, Link, Grid } from "@material-ui/core/";
import add_icon from "../../images/add.svg";
import subtract_icon from "../../images/subtract.svg";
import multiply_icon from "../../images/multiply.svg";
import equal_icon from "../../images/equal.svg";
import "./calculator_page.css";
import { themeColor } from "../../utils/constants.js";

const SYMBOLS = {
  add: add_icon,
  equal: equal_icon,
  multiply: multiply_icon,
  subtract: subtract_icon,
};
function CalculationCardRow(props) {
  return (
    <ThemeProvider theme={themeColor}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className="calculation-card-row"
      >
        <img src={SYMBOLS[props.type]}></img>
        <Typography className={"amount " + props.color} variant="h2">
          {props.amount}
        </Typography>

        <Link
          href="#"
          color="primary"
          className={"label " + props.color}
          underline="always"
        >
          {props.label}
        </Link>
      </Grid>
    </ThemeProvider>
  );
}
export default CalculationCardRow;
