import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import "./global.css";
import Onboarding from "./components/onboarding/Onboarding.js";

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
          <Route>
            <LandingPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
