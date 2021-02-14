import {
  AppBar,
  ThemeProvider,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./../../styles.css";
import "./header.css";
import { getUserDoc, auth } from "../../firebase";
import { AuthContext } from "../../providers/AuthProvider";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import useWindowDimensions from "../onboard/useWindowDimensions";
import logo from "./../../images/logo/tax.svg";
import { Mixpanel } from "./../../mixpanel.js";

function Header(props) {
  const history = useHistory();
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(props.page);

  const user = useContext(AuthContext);

  const onSignIn = () => {
    if (user.user) {
      Mixpanel.identify(user.user.referToId);
      Mixpanel.track("visit_account", { source: "header" });

      history.push({ pathname: "/account" });
    } else {
      Mixpanel.track("visit_sign_in", { source: "header" });
      history.push({ pathname: "/signin" });
    }
  };
  const onSignUp = () => {
    props.signUp ? props.signUp() : history.push({ pathname: "/join" });
  };
  const onAccount = () => {
    if (user.user) {
      Mixpanel.identify(user.user.referToId);
      Mixpanel.track("visit_account", { source: "header" });
      history.push({ pathname: "/account" });
    } else {
      Mixpanel.track("visit_sign_in", { source: "header" });
      history.push({ pathname: "/signin" });
    }
  };
  const onSignOut = () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        Mixpanel.identify(user.user.referToId);
        Mixpanel.track("sign_out", { source: "header" });
        history.push({ pathname: "/join" });
        setUserData({});
        setLoading(false);
      })
      .catch((error) => {
        Mixpanel.track("error_sign_out");
      });
  };
  const onContact = () => {
    Mixpanel.track("visit_contact", { source: "header" });
    history.push({ pathname: "/contact" });
  };

  const onLogo = () => {
    if (user.user) {
      Mixpanel.identify(user.user.referToId);
    }
    history.push({ pathname: "/" });
  };
  const { width, height } = useWindowDimensions();
  const isMobile = width < 900;

  let isLoggedIn = user.user;
  let isHome = page == "Home";
  let isJoin = page == "Join";
  let isAccount = page == "Account";
  let isSignIn = page == "SignIn";
  let isResetPassword = page == "ResetPassword";
  let isOnboard = page == "Onboard";
  let isRefund = page == "Refund";
  let isContact = page == "Contact";

  let displayAccount = isLoggedIn && !(isMobile && isAccount);
  let displaySignOut = isLoggedIn && (isJoin || isHome || isAccount);
  let displaySignUp =
    !isLoggedIn &&
    ((isHome && !isMobile) || (isRefund && !isMobile) || isContact);
  let displaySignIn =
    !isLoggedIn && (isHome || isContact || (isRefund && !isMobile));
  let displayContact =
    !(isMobile && isOnboard) && !(isMobile && isRefund) && !isContact;
  let displayName =
    userData["firstName"] == undefined ? "" : `Hi ${userData["firstName"]}!`;
  let signOutName = loading ? <CircularProgress /> : <div>Sign Out</div>;

  useEffect(() => {
    setTimeout(() => {
      if (user.user && loadAttempts < 5 && Object.keys(userData).length < 1) {
        setTimeout(() => {
          getUserDoc(user)
            .then((result) => {
              if (result == null) {
                return;
              }
              setUserData(result);
            })
            .catch(() => {});
          setLoadAttempts(loadAttempts + 1);
        }, 1000);
      }
    });
  });
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="header-c0 column-container">
        <Typography
          variant="h4"
          className="logo-text"
          style={{ cursor: "pointer" }}
          onClick={() => onLogo()}
        >
          <img src={logo} className="header-logo" />
          {}
        </Typography>
        <div className="header-button-container">
          {displayAccount && (
            <Button
              onClick={onAccount}
              variant="outlined"
              color="primary"
              className="username-button"
            >
              {displayName}
            </Button>
          )}
          {displaySignOut && (
            <Button
              onClick={onSignOut}
              variant="contained"
              color="primary"
              className="header-sign-out-button"
            >
              {signOutName}
            </Button>
          )}
          {displaySignUp && (
            <Button onClick={onSignUp} variant="contained" color="primary">
              {" "}
              Sign Up{" "}
            </Button>
          )}
          {displaySignIn && (
            <Button onClick={onSignIn} variant="outlined" color="primary">
              {" "}
              Sign in{" "}
            </Button>
          )}
          {displayContact && (
            <Button
              onClick={onContact}
              variant="outlined"
              color="primary"
              className="contact-button"
            >
              {" "}
              Contact{" "}
            </Button>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
