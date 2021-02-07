import {
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./../../styles.css";
import "./onboard-complete.css";
import RefundBreakdown from "./RefundBreakdown.js";

function OnboardCompletePage(props) {
  const fakeProps = {
    breakdown: {
      netRefund: "$4,443",
      taxableIncome: "$18,500",
      taxRate: "12.2%",
      taxBill: "$2,257",
      creditsAndWitholdings: "$6,600",
    },
  };
  props = fakeProps;
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="onboard-complete-c0">
        <div className="onboard-complete-c1 row-container">
          <Typography className="onboard-complete-title" variant="h6">
            Your estimated refund amount
          </Typography>
          <Typography className="refund-amount " variant="h1" color="secondary">
            {props.breakdown.netRefund}
          </Typography>
          <RefundBreakdown breakdown={props.breakdown}></RefundBreakdown>
          <Button variant="contained" className="onboard-complete-apply-button">
            Ready to file? Apply now
          </Button>
          <Typography className="onboard-complete-fee-text">
            We’ll only collect the $25 fee if you receive a $200 refund or more
            (read why). Invite 3 friends and we will waive the filing fee
          </Typography>
          <div className="column-container onboard-complete-card-container">
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content">
                Here's an interesting stat
              </CardContent>
            </Card>
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content">
                Here's an interesting stat
              </CardContent>
            </Card>
            <Card className="onboard-complete-card">
              <CardContent className="onboard-complete-card-content">
                Here's an interesting stat
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default OnboardCompletePage;
