import add_icon from "../../images/add.svg";
import subtract_icon from "../../images/subtract.svg";
import multiply_icon from "../../images/multiply.svg";
import equal_icon from "../../images/equal.svg";
import { ThemeProvider, Link, Typography } from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants";

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

          <Typography
            variant="body2"
            color="secondary"
            className="refund-breakdown-row-amount"
          >
            {props.amount}
          </Typography>
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
        label="Taxable Income"
      />
      <RefundBreakdownRow
        symbol="multiply"
        amount={props.breakdown.taxRate}
        label="Taxable Income"
      />{" "}
      <div className="refund-breakdown-highlight-red">
        <RefundBreakdownRow
          symbol="equal"
          amount={props.breakdown.taxBill}
          label="Tax Bill"
        />
      </div>
      <div className="refund-breakdown-highlight-green">
        <RefundBreakdownRow
          symbol="subtract"
          amount={props.breakdown.creditsAndWitholdings}
          label="Credits + Witholdings"
        />
      </div>
      <RefundBreakdownRow
        symbol="equal"
        amount={props.breakdown.netRefund}
        label="Net Refund"
      />
    </div>
  );
}

export default RefundBreakdown;
