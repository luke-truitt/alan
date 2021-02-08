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

import { useEffect } from "react";
import "./global.css";
import JoinPage from "./components/onboarding/JoinPage";
import OnboardCompletePage from "./components/completion/OnboardCompletePage.js";

import { PageView, initGA, Event } from "./components/tracking/Tracking";
const trackingId = "UA-189058741-1";
initGA(trackingId);

function App() {
  return (
    <div>
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
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <RouteChangeTracker />
      </Router>
    </div>
  );
}

export default App;
