import { AppBar, ThemeProvider, Button, Typography, CircularProgress } from "@material-ui/core";
import { primaryTheme } from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./../../styles.css";
import "./header.css";
import { getUserDoc, auth } from "../../firebase";
import { AuthContext} from "../../providers/AuthProvider";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

  
function Header(props) {
  const history = useHistory();
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useContext(AuthContext);

  const onSignIn = () => { if(user.user){history.push({ pathname: "/account" })}else{history.push({ pathname: "/signin" })} };
  const onSignUp = () => {
    props.signUp ? props.signUp() : history.push({pathname: "/join"});
  }
  const onAccount = () => {
    if(user.user){history.push({ pathname: "/account" })}else{history.push({ pathname: "/signin" })}
  }

  useEffect(() => {
      setTimeout(() => {
      if (user.user && loadAttempts < 5 && Object.keys(userData).length < 1) {
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
            setLoadAttempts(loadAttempts+1);
        }, 1000);
      } 
    });
  });
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="header-c0 column-container">
        <Typography variant="h4" className="logo-text" onClick={() => history.push({pathname: "/"})}>
          ALAN
        </Typography>
        <div className={props.isHome ? "home-header" : "header-button-container"}>
          {Object.keys(userData).length > 0 ? <div><Button onClick={onAccount} variant="outlined" color="primary" className="username-button">{userData['firstName'].toLowerCase().includes('wes') ? "Hola Wessisito" : `Hi ${userData['firstName']}!`}</Button>
          <Button
              className="header-sign-out-button"
              color="primary"
              onClick={() => {
                console.log("No dice");
                setLoading(true);
                auth
                  .signOut()
                  .then(() => {
                    history.push({ pathname: "/join" });
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {loading ? <CircularProgress /> : <div>Sign Out</div>}
            </Button></div>:
          <div>
            <Button onClick={onSignUp} variant="contained" color="primary">
            Sign Up
          </Button>
          <Button onClick={onSignIn} variant="outlined" color="primary">
            Sign in
          </Button>
            </div>
        }
          
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Header;
