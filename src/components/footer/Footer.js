import { AppBar, ThemeProvider, Button, Typography } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import "./../../styles.css";
import "./footer.css";
import { AuthContext} from "../../providers/AuthProvider";
  
function Footer(props) {
  const history = useHistory();
  const user = useContext(AuthContext);
  
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="footer-c0 column-container">
        
      </div>
    </ThemeProvider>
  );
}

export default Footer;
