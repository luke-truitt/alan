import {
  Card,
  CardContent,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import "./../../styles.css";
import "./process.css";
import { primaryTheme } from "../../utils/constants";
import {
  process_step_one_title,
process_step_one_subtext,
process_step_two_title,
process_step_two_subtext,
process_step_three_title,
process_step_three_subtext
} from "../../utils/summaries";
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
                      1. {process_step_one_title}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      {process_step_one_subtext}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      2. {process_step_two_title}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      {process_step_two_subtext}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      3. {process_step_three_title}
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      {process_step_three_subtext}
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
