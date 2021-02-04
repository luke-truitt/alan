import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Calculator2 from "./Calculator2.js";
import LandingPage from "./LandingPage";
import "./global.css";

function App() {
  return (
    <div className="root">
      <div className="header" />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/calculate">
            <Calculator2 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
