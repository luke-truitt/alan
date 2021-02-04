import logo from "./logo.svg";
import React, {useState } from "react";
import "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Typography } from "antd";
import { Input, Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Calculator from "./Calculator.js";
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
            <Route exact path='/'><LandingPage /></Route>
            <Route path='/calculate'><Calculator/></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
