import add_icon from "../../images/icons/add-outline-white.svg";
import subtract_icon from "../../images/icons/subtract-outline-white.svg";
import multiply_icon from "../../images/icons/multiply-outline-dark.svg";
import equal_icon from "../../images/icons/equal-outline-purple.svg";
import { ThemeProvider, Typography, Tooltip } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Zoom from "@material-ui/core/Zoom";
import { useState } from "react";
import {
  taxable_income_description,
  tax_bill_description,
  net_refund_description,
  effective_tax_rate_description,
  withholdings_description,
  credits_description,
} from "../../utils/summaries";
function numberWithCommas(x) {
  if (x == null) {
    return "";
  }
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if(parts[1] && parts[1].length == 1) {
    parts[1] = parts[1] + "0";
  }
  return parts.join(".");
}

const Explanation = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f6f6f6",
    border: "1px solid #86868B",
    color: "#86868B",
    fontSize: ".75rem",
    fontWeight: 300,
    lineHeight: ".9rem",
    padding: ".5rem",
    width: "250px",
    disableTouchListener: true,
  },
}))(Tooltip);

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
          {props.type == "dollar" ? (
            <Typography
              variant="body2"
              color="secondary"
              className={
                props.label == "Net Refund"
                  ? "refund-label-row"
                  : "refund-breakdown-row-amount"
              }
            >
              ${numberWithCommas(props.amount)}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="secondary"
              className="refund-breakdown-row-amount"
            >
              {props.amount * 100}%
            </Typography>
          )}
        </div>
        <Explanation
          width={"00px"}
          placement="left-start"
          enterDelay={200}
          leaveDelay={500}
          TransitionComponent={Zoom}
          disableFocusListener
          title={props.description}
          className="refund-tooltip"
        >
          <Typography
            variant="body1"
            color="secondary"
            className="refund-breakdown-row-label"
            style={{ zIndex: 999, cursor: "pointer" }}
          >
            {props.label}
          </Typography>
        </Explanation>
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
        description={taxable_income_description}
      />
      <RefundBreakdownRow
        symbol="multiply"
        type="percent"
        amount={props.breakdown.taxRate}
        label="Effective Tax Rate"
        description={effective_tax_rate_description}
      />
      <div className="refund-breakdown-highlight-red">
        <RefundBreakdownRow
          symbol="equal"
          type="dollar"
          amount={props.breakdown.taxBill}
          label="Tax Bill"
          description={tax_bill_description}
        />
      </div>
      <div className="refund-breakdown-highlight-green">
        <RefundBreakdownRow
          symbol="subtract"
          type="dollar"
          amount={props.breakdown.creditsAndWitholdings}
          label="Credits + Witholdings"
          description={withholdings_description}
        />
      </div>
      <RefundBreakdownRow
        symbol="equal"
        type="dollar"
        amount={props.breakdown.netRefund}
        label="Net Refund"
        description={net_refund_description}
      />
    </div>
  );
}

export default RefundBreakdown;
