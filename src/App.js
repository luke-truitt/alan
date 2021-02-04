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
<<<<<<< HEAD
    <div> 
        <Router>
          <Switch>
            <Route exact path='/'><LandingPage /></Route>
            <Route path='/calculate'><Calculator/></Route>
          </Switch>
        </Router>
=======
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
>>>>>>> 09f78fe4441e0ece6f996c8aa7151140b552a04c
    </div>
  );
}

export default App;
