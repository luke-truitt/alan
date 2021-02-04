import "./calculator2.css";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core/";
import { theme } from "./constants.js";
import { useHistory } from "react-router-dom";

function Calculator2(props) {
  const history = useHistory();
  const navTo = () => {
    history.push({ pathname: "/calculate", state: { email: "yo" } });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="outer-container-calculator" id="outer-container-mobile">
        <div className="inner-container-left" id="inner-container-left-mobile">
          <Typography variant="h1">
            <span className="underline-highlight">Income</span>
          </Typography>
          <Card className="income-card" id="income-card-mobile">
            <CardContent>Income Card</CardContent>
          </Card>
          <div className="button-container" id="button-container-mobile">
            <Button color="secondary" variant="contained">
              Previous
            </Button>
            <Button color="secondary" variant="contained">
              Next
            </Button>
          </div>
        </div>
        <div
          className="inner-container-right"
          id="inner-container-right-mobile"
        >
          <Card className="refund-card" id="refund-card-mobile">
            <CardContent className="refund-card-content">
              <div className="refund-content">
                <Typography variant="h1" color="primary">
                  <span className="refund-amount">$3,000</span>
                </Typography>

                <Typography variant="h3" color="primary">
                  <span className="refund-label">Refund Amount</span>
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card className="calculator-card" id="calculator-card-mobile">
            <CardContent>Calculator Card</CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Calculator2;
