import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import Home from "./components/home/Home";
import Onboard from "./components/onboard/Onboard.js";
import ErrorPage from "./components/error/ErrorPage";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import SignIn from "./components/signin/SignIn";
import ResetPassword from "./components/resetpassword/ResetPassword";
import { AuthProvider } from "./providers/AuthProvider";

import { useEffect, useState } from "react";
import "./global.css";
import Join from "./components/join/Join";
import Refund from "./components/refund/Refund.js";
import AccountPage from "./components/account/AccountPage.js";

import { PageView, initGA, Event } from "./components/tracking/Tracking";
const trackingId = "UA-189058741-1";
initGA(trackingId);

function App() {
  const [referToId, setReferToId] = useState("");

  return (
    <div className="app-c0">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/join">
              <Join
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/onboard">
              <Onboard
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/refund">
              <Refund
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/account">
              <AccountPage
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/signin">
              <SignIn
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword
                referToId={referToId}
                setReferTo={(rid) => setReferToId(rid)}
              />
            </Route>

            <Route>
              <ErrorPage />
            </Route>
          </Switch>
          <RouteChangeTracker />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
