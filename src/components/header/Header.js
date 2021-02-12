import { AppBar, ThemeProvider, Button, Typography } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./../../styles.css";
import "./header.css";
import { getUserDoc } from "../../firebase";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "./../../images/logo/white-tax.svg";

function Header(props) {
  const history = useHistory();
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [userData, setUserData] = useState({});
  const user = useContext(AuthContext);
  const onSignIn = () => {
    if (user.user) {
      history.push({ pathname: "/account" });
    } else {
      history.push({ pathname: "/signin" });
    }
  };
  const onSignUp = () => {
    props.signUp();
  };
  const onAccount = () => {
    if (user.user) {
      history.push({ pathname: "/account" });
    } else {
      history.push({ pathname: "/signin" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (user.user && loadAttempts < 2 && Object.keys(userData).length < 1) {
        setTimeout(() => {
          getUserDoc(user)
            .then((result) => {
              if (result == null) {
                return;
              }
              console.log(result);
              console.log(loadAttempts);
              setUserData(result);
            })
            .catch(() => console.log("ERROR GETTING USER"));
          setLoadAttempts(loadAttempts + 1);
        }, 500);
      } else {
        setLoadAttempts(loadAttempts + 1);
      }
    });
  });
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="header-c0 column-container">
        <Typography
          variant="h4"
          className="logo-text"
          onClick={() => history.push({ pathname: "/" })}
        >
          <img src={logo} className="header-logo" />
        </Typography>
        <div className="header-button-container">
          {Object.keys(userData).length > 0 ? (
            <Button onClick={onAccount} variant="outlined" color="primary">
              {userData["firstName"].toLowerCase().includes("wes")
                ? "Hola Wessisito"
                : `Hey   ${userData["firstName"]}`}
            </Button>
          ) : (
            <div>
              <Button onClick={onSignUp} variant="contained" color="primary">
                Sign Up
              </Button>
              <Button onClick={onSignIn} variant="outlined" color="primary">
                Sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
