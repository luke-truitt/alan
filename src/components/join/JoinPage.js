import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./join-form.css";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState, useContext } from "react";
import { AuthContext} from "../../providers/AuthProvider";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import joinTimeline1 from "./../../images/timeline/timeline-1.svg";
import joinTimeline2 from "./../../images/timeline/timeline-2.svg";
import joinTimeline3 from "./../../images/timeline/timeline-3.svg";
import joinTimeline4 from "./../../images/timeline/timeline-4.svg";
import joinTimeline5 from "./../../images/timeline/timeline-5-last.svg";
import { v4 as uuidv4 } from 'uuid';

const timelineNumbers = {
  1: joinTimeline1,
  2: joinTimeline2,
  3: joinTimeline3,
  4: joinTimeline4,
  5: joinTimeline5,
};

const timelineData = [
  { number: 1, text: "Join Us" },
  {
    number: 2,
    text:
      "Receive a link to file taxes after our team of tax experts reviews your info*",
  },
  {
    number: 3,
    text: "Upload relevant documents (W2s, etc.). We’ll help you locate them.",
  },
  {
    number: 4,
    text: "Submit! Refunds are typically processed within 3 weeks",
  },
  {
    number: 5,
    text: "We collect a flat $25 fee only if you receive a refund (Read why).",
  },
];

function JoinTimelineStep(props) {
  const isLast = props.number === 5;
  return (
    <div className="column-container join-timeline-step">
      <img
        src={timelineNumbers[props.number]}
        className="join-timeline-step-number"
      />
      <Typography
        variant="body2"
        color="primary"
        className="join-timeline-step-text"
      >
        {props.text}
      </Typography>
    </div>
  );
}

function JoinTimeline() {
  const timelineSteps = timelineData.map((data) => (
    <JoinTimelineStep number={data.number} text={data.text} />
  ));
  return (
    <div className="row-container join-timeline">
      <Typography variant="h5" color="primary" className="join-timeline-title">
        How does it work?
      </Typography>
      {timelineSteps}
    </div>
  );
}

function JoinForm(props) {
  const user = useContext(AuthContext);
  
  const history = useHistory();
  const location = useLocation();
  let referByIdDirect = "";
  const searchParams =
    location.search.split("?").length == 1
      ? []
      : location.search.split("?")[1].split("&");
  let i;
  for (i = 0; i < searchParams.length; i++) {
    const paramName = searchParams[i].split("=")[0];
    console.log(paramName);
    if (paramName == "referId") {
      referByIdDirect = searchParams[i].split("=")[1];
    }
  }
  
  const [email, setEmail] = useState(location.state == null ? "" : location.state["email"]);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [referToId, setReferToId] = useState(location.state == null ? "" : location.state["referToId"]);
  const [referById, setReferById] = useState(referByIdDirect != "" ? referByIdDirect : location.state == null ? "" : location.state["referById"]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const redirectHome = () => {
    history.push({ pathname: "/" });
  };
  

  const navTo = () => {
    history.push({
      pathname: "/account",
    });
  };
  
  const checkValid = (d) => {
    // TODO
  };
  const createUserWithEmailAndPasswordHandler = async (event) => {
    setLoading(true);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      if(referToId=="") {
        referToId = uuidv4();
      }
      console.log(referToId);
      generateUserDocument(user, { firstName, lastName, phone, referToId, referById });
      navTo();
      setLoading(false);
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } catch (error) {
      setLoading(false);
      setError("Error Signing up with email and password");
    }
  };

  const onChange = (e, val) => {
    if (val.stateName == "firstName") {
      setFirstName(e);
    } else if (val.stateName == "lastName") {
      setLastName(e);
    } else if (val.stateName == "phone") {
      setPhone(e);
    } else if (val.stateName == "email") {
      setEmail(e);
    } else if (val.stateName == "password") {
      setPassword(e);
    }
  };

  return (
    <div className="join-form row-container">
      <NameInput
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        fields={{ firstName: firstName, lastName: lastName }}
      />
      <PhoneNumberInput
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        placeholder="Enter Phone Number"
        fields={{ phone: phone }}
      />
      <Typography variant="caption" className="join-phone-explainer">
        So we can text you when the review is complete!
      </Typography>
      <TextInput
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        stateName="email"
        value={email}
        placeholder="Enter Email"
        type="email"
      />
      <TextInput
        validData={(d) => checkValid(d)}
        onChange={(e, val) => onChange(e, val)}
        stateName="password"
        value={password}
        placeholder="Enter Password"
        type="password"
      />

      <Button
        className="join-button"
        variant="contained"
        color="secondary"
        onClick={(e) => createUserWithEmailAndPasswordHandler(e)}
      >
        {loading ? <CircularProgress /> : "Join"}
      </Button>
      <div className="join-or-container column-container">
        <div className="join-or-horizontal-line" />
        <Typography variant="caption" className="join-or">
          OR
        </Typography>

        <div className="join-or-horizontal-line" />
      </div>
      <Button
        className="google-sign-button"
        variant="contained"
        color="primary"
        onClick={() => {
          try {
            setGoogleLoading(true);
            signInWithGoogle(referToId, referById).then(() => {
              navTo();
              setGoogleLoading(false);
            });
          } catch (error) {
            console.error("Error signing in with Google", error);
          }
        }}
      >
        {googleLoading ? <CircularProgress /> : "Sign in with Google"}
      </Button>
      <div className="join-or-horizontal-line" />
        <Typography variant="caption" className="join-or">
          Already have an Account?
        </Typography>

      <div className="join-or-horizontal-line" />
      <Button className="apple-sign-button" variant="contained" color="primary" onClick={() => {
        if(user.user) {
          history.push({pathname: "/account"});
        } else {
          history.push({pathname: "/signin"});
        }
      }}>
        Sign In
      </Button>
    </div>
  );
}

function JoinPage() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="join-page-c0 column-container">
        <div className="join-page-c1-left-shadow" />
        <div className="join-page-c1-left row-container">
          <JoinTimeline></JoinTimeline>
          <Typography
            variant="caption"
            color="primary"
            className="join-disclaimer-text"
          >
            *Review process takes about 2-4 business days
          </Typography>
        </div>
        <div className="join-page-c1-right row-container">
          <div className="join-page-c1-right-content row-container">
            <Typography
              color="textPrimary"
              variant="h2"
              className="join-page-title purple-highlight"
            >
              Join
            </Typography>
            <JoinForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default JoinPage;
