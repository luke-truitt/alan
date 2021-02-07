import add_icon from "../../images/add.svg";
import subtract_icon from "../../images/subtract.svg";
import multiply_icon from "../../images/multiply.svg";
import equal_icon from "../../images/equal.svg";
import { ThemeProvider, Link, Typography } from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants";
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function RefundBreakdownRow(props) {
  const SYMBOLS = {
    add: add_icon,
    equal: equal_icon,
    multiply: multiply_icon,
    subtract: subtract_icon,
  };
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="refund-breakdown-row-c0 row-container">
        <div className="refund-breakdown-row-c1 column-container">
          <img
            src={SYMBOLS[props.symbol]}
            className="refund-breakdown-row-symbol"
          ></img>
          {
            props.type == "dollar" ? 
            <Typography
            variant="body2"
            color="secondary"
            className="refund-breakdown-row-amount"
            >
            ${numberWithCommas(props.amount)}
          </Typography>
          :
          <Typography
            variant="body2"
            color="secondary"
            className="refund-breakdown-row-amount"
            >
            {props.amount * 100}%
          </Typography>
          }
          
        </div>
        <Link
          variant="body1"
          color="secondary"
          className="refund-breakdown-row-label"
        >
          {props.label}
        </Link>
      </div>
    </ThemeProvider>
  );
}

function RefundBreakdown(props) {
  return (
    <div className="refund-breakdown-c0 row-container">
      <RefundBreakdownRow
        amount={props.breakdown.taxableIncome}
        type="dollar"
        label="Taxable Income"
      />
      <RefundBreakdownRow
        symbol="multiply"
        type="percent"
        amount={props.breakdown.taxRate}
        label="Effective Tax Rate"
      />{" "}
      <div className="refund-breakdown-highlight-red">
        <RefundBreakdownRow
          symbol="equal"
          type="dollar"
          amount={props.breakdown.taxBill}
          label="Tax Bill"
        />
      </div>
      <div className="refund-breakdown-highlight-green">
        <RefundBreakdownRow
          symbol="subtract"
          type="dollar"
          amount={props.breakdown.creditsAndWitholdings}
          label="Credits + Witholdings"
        />
      </div>
      <RefundBreakdownRow
        symbol="equal"
        type="dollar"
        amount={props.breakdown.netRefund}
        label="Net Refund"
      />
    </div>
  );
}

export default RefundBreakdown;
