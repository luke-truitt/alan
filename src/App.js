import logo from "./logo.svg";
import "antd";
import "./styles.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { Typography } from "antd";
import { Input, Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Calculator from "./components/Calculator/Calculator.js";
import Home from "./components/Home/Home.js";
import LandingPage from "./LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { Button } from "./constants.js";

function App() {
  return (
    <div> 
        <Router>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/calculate' component={Calculator}/>
        </Switch>
        </Router>
    </div>
    
  );
}

export default App;
