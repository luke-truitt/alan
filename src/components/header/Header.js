import { AppBar, ThemeProvider, Button, Typography } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import "./../../styles.css";
import "./header.css";
import { AuthContext} from "../../providers/AuthProvider";
  
function Header(props) {
  const history = useHistory();

  const user = useContext(AuthContext);
  console.log(user);
  const onSignIn = () => { if(user.user){history.push({ pathname: "/account" })}else{history.push({ pathname: "/signin" })} };
  const onSignUp = () => {
    props.signUp();
  }
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="header-c0 column-container">
        <Typography variant="h4" className="logo-text" onClick={() => history.push({pathname: "/"})}>
          ALAN
        </Typography>
        <div className="header-button-container">
          <Button onClick={onSignUp} variant="contained" color="primary">
            Sign Up
          </Button>
          <Button onClick={onSignIn} variant="outlined" color="primary">
            Sign in
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
