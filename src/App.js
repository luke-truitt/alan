import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import Home from "./components/home/Home";
import Onboard from "./components/onboard/Onboard.js";
import ErrorPage from "./components/error/ErrorPage";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/signin/SignIn";
import ResetPassowrd from "./components/resetpassword/ResetPassowrd";
import ProfilePage from "./components/authentication/ProfilePage";
import { AuthProvider } from "./providers/AuthProvider";

import { useEffect, useState } from "react";
import "./global.css";
import JoinPage from "./components/join/JoinPage";
import OnboardCompletePage from "./components/completion/OnboardCompletePage.js";
import AccountPage from "./components/account/AccountPage.js";

import firebase from "firebase";
import Header from "./components/home/Header";
import { Fade } from "@material-ui/core";
import { PageView, initGA, Event } from "./components/tracking/Tracking";
const trackingId = "UA-189058741-1";
initGA(trackingId);

function App() {
  const [referToId, setReferToId] = useState("");

  return (
    <div className="app-c0">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/join">
              <JoinPage
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/onboard">
              <Onboard
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/refund">
              <OnboardCompletePage
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/account">
              <AccountPage
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/signup">
              <SignUp
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/signin">
              <SignIn
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/resetpassword">
              <ResetPassowrd
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/userprofile">
              <ProfilePage
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
          <RouteChangeTracker />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
