import "./calculator_page.css";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core/";
import { themeColor } from "./constants.js";
import { useHistory } from "react-router-dom";
import CalculationCard from "./CalculationCard.js";
import IncomeCard from "./IncomeCard.js";
function Calculator2(props) {
  const history = useHistory();
  const navTo = () => {
    history.push({ pathname: "/calculate", state: { email: "yo" } });
  };

  return (
    <ThemeProvider theme={themeColor}>
      <div className="root" className="container-0">
        <Typography variant="h1" className="left-title">
          <span className="underline-highlight">Income</span>
        </Typography>
        <div className="container-1">
          <div className="container-2-left">
            <IncomeCard />
            <div className="button-container" id="button-container-mobile">
              <Button
                color="primary"
                variant="contained"
                id="previous-button"
                style={{ boxShadow: "none" }}
              >
                Previous
              </Button>
              <Button
                color="secondary"
                style={{ boxShadow: "none" }}
                variant="contained"
              >
                Next
              </Button>
            </div>
          </div>
          <div className="container-2-right">
            <Card className="refund-card" id="refund-card-mobile">
              <CardContent className="refund-card-content"></CardContent>
            </Card>
            <CalculationCard />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Calculator2;
