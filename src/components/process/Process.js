import {
  Card,
  CardContent,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import "./../../styles.css";
import "./process.css";
import { primaryTheme } from "../../utils/constants";

function Process(props) {
  return (
    <ThemeProvider theme={primaryTheme}>
      <div>
        <div className="process-c0 row-container">
          <div className="process-c1 row-container">
            <div className="process-c2-top row-container">
              <Typography
                className="process-subtitle"
                variant="caption"
                color="secondary"
              >
                <strong>HOW IT WORKS</strong>
              </Typography>
              <Typography
                className="process-title"
                variant="h2"
                color="secondary"
              >
                Once we do X, you get Y
              </Typography>
            </div>
            <Card className="process-card">
              <CardContent>
                <div className="process-card-content column-container">
                  <div className="process-card-graphic" />
                  <div className="process-card-text row-container">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      1. <i>You</i> Submit Tax Information
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      We'll walk you through what forms and information you need and why it's relevant, so you don't get in any trouble and get back what you deserve.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      2. <i>We</i> Maximize Your Return
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      Our software combined with our tax team use the information you submit to match you to as many credits and deductions you qualify for and file. Explaining all of it along the way.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      3. <i>You</i> Get a Refund
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      We'll help you track your refund, give you some cool options for what to do with it, and in case the government has questions on your return, we'll have your back. 
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Process;
