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
                      1. Do the first thing
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      Here's this easy thing you do like give us your data.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      2. Get the next thing.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      Maybe some money if you're lucky or smart.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      className="process-card-text-step"
                    >
                      3. Get the best thing.
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      className="process-card-text-description"
                    >
                      Maybe we will make you rich as fuck but we will see.
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
