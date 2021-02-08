import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import LandingPage from "./components/landing-page/LandingPage";
import Onboarding from "./components/onboarding/Onboarding.js";
import ErrorPage from "./components/error/ErrorPage";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import PasswordReset from "./components/authentication/PasswordReset";
import ProfilePage from "./components/authentication/ProfilePage";
import { AuthProvider } from "./providers/AuthProvider";

import { useEffect } from "react";
import "./global.css";
import JoinPage from "./components/join/JoinPage";
import OnboardCompletePage from "./components/completion/OnboardCompletePage.js";
import AccountPage from "./components/account/AccountPage.js";

import firebase from "firebase";

import { PageView, initGA, Event } from "./components/tracking/Tracking";
const trackingId = "UA-189058741-1";
initGA(trackingId);

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/join">
              <JoinPage />
            </Route>
            <Route path="/onboard">
              <Onboarding />
            </Route>
            <Route path="/refund">
              <OnboardCompletePage />
            </Route>
            <Route path="/account">
              <AccountPage></AccountPage>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/resetpassword">
              <PasswordReset />
            </Route>
            <Route path="/userprofile">
              <ProfilePage />
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
