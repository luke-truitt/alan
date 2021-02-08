import add_icon from "../../images/add.svg";
import subtract_icon from "../../images/subtract.svg";
import multiply_icon from "../../images/multiply.svg";
import equal_icon from "../../images/equal.svg";
import { ThemeProvider, Link, Typography, Dialog, DialogTitle } from "@material-ui/core";
import { primaryTheme } from "./../../utils/constants";
import { useState } from "react";
import { taxable_income_description, tax_bill_description, net_refund_description, effective_tax_rate_description, withholdings_description, credits_description} from "../../utils/summaries";
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              className="refund-breakdown-row-amount"
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
        <Link
          variant="body1"
          color="secondary"
          className="refund-breakdown-row-label"
          onClick={()=> handleOpen()}
        >
          {props.label}
        </Link>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" style={{backgroundColor: "white", padding: "10px"}} open={open}>
        <Typography variant="body2"
              color="secondary"
              className="refund-breakdown-row-amount" id="simple-dialog-title" style={{marginLeft: "auto", padding: "10px"}}>{props.label}</Typography>
        <Typography
        variant="h6"
        className="onboard-complete-fee-text"
        color="secondary"
        style={{marginLeft: "auto", padding: "10px"}}
        >
        {props.description}
        </Typography>
      </Dialog>
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
