import {
  Card,
  Select,
  MenuItem,
  CardContent,
  Typography,
  ThemeProvider,
  TextField,
  FormControl,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { themeColor } from "./constants.js";
import "./calculator_page.css";
import { DollarInput, YesNo, Dropdown } from "./formConstants.js";

const q1 = {
  question: "",
  description: "",
  options: ["Already graduated.", "2021", "2022", "2023", "2024"],
};
const q2 = {
  question: "Are you an international student?",
  description: "",
};
function PersonalInfoCard(props) {
  return (
    <ThemeProvider theme={themeColor}>
      <Card className="income-card" id="income-card-mobile">
        <CardContent className="income-card-content">
          <div className="form-row form-item">
            <TextField
              required
              label="First Name"
              defaultValue="Mary"
              variant="outlined"
            />
            <TextField
              required
              label="Last Name"
              defaultValue="Mary"
              variant="outlined"
            />
          </div>
          <div className="form-item">
            <TextField
              required
              label="Email"
              defaultValue="Mary"
              variant="outlined"
            />
          </div>
          <div className="form-item">
            <TextField
              required
              label="PhoneNumber"
              defaultValue="Mary"
              variant="outlined"
              className="form-item"
            />
          </div>
          <Dropdown
            question={q1.question}
            description={q1.description}
            options={q1.options}
          />
          <YesNo question={q2.question} description={q2.description} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export default PersonalInfoCard;
