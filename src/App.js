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
import CalculationCard from "./CalculationCard.js";

function App() {
  return (
    <div className="root">
      <Router>
        <Switch>
          <Route exact path="/">
            <Calculator2 />
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
