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

import "./global.css";
import OnboardCompletePage from "./components/onboarding/OnboardCompletePage.js";
import JoinPage from "./components/onboarding/JoinPage";

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
          <Route path="/onboard-done">
            <OnboardCompletePage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
