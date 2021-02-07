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

import {useEffect} from 'react';
import "./global.css";
import OnboardCompletePage from "./components/onboarding/OnboardCompletePage.js";

import {PageView, initGA, Event} from './components/tracking/Tracking';
const trackingId = 'UA-189058741-1';
initGA(trackingId);

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/onboard">
            <Onboarding />
          </Route>
          <Route path="/onboard-done">
            <OnboardCompletePage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <RouteChangeTracker/>
      </Router>
    </div>
  );
}

export default App;
