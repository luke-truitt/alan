import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Calculator from "./Calculator.js";
import LandingPage from "./LandingPage";
import "./App.css";

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
            <Calculator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
