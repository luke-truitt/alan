import { ThemeProvider, Grid, Card, CardContent } from "@material-ui/core/";
import CalculationCardRow from "./CalculationCardRow.js";
import { themeColor } from "./constants.js";
import "./calculator_page.css";

const props_template = [
  {
    type: "add",
    color: "light",
    amount: "$0",
    label: "Estimated Income",
  },
  {
    type: "subtract",
    color: "light",
    amount: "$0",
    label: "Student Loan Interest",
  },
  {
    type: "subtract",
    color: "light",
    amount: "$0",
    label: "Standard Deduction",
  },
];

function CalculationCard(props) {
  props = props_template;
  const rows = props.map((props_row) => (
    <CalculationCardRow
      label={props_row.label}
      amount={props_row.amount}
      color={props_row.color}
      type={props_row.type}
    />
  ));
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="calculation-card mobile">
        <CardContent className="calculation-card-content mobile">
          {rows}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default CalculationCard;
