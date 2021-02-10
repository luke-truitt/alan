import { AppBar, ThemeProvider, Button, Typography } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";

import "./../../styles.css";
import "./header.css";

function Header(props) {
  const history = useHistory();
  const onSignIn = () => history.push({ pathname: "/signin" });

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="header-c0 column-container">
        <Typography variant="h4" className="logo-text">
          ALAN
        </Typography>
        <div className="header-button-container">
          <Button onClick={onSignIn} variant="outlined" color="primary">
            Sign in
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
