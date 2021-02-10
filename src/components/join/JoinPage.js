import {
  ThemeProvider,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { primaryTheme } from "../../utils/constants.js";
import "./join-form.css";
import "./../../styles.css";
import Typist from "react-typist";
import Lottie from "react-lottie";
import { NameInput, PhoneNumberInput, TextInput } from "../inputs/Inputs.js";
import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { useHistory, useLocation } from "react-router-dom";
import loadingAnimation from "./../../lotties/coin-loading.json";
import joinTimeline1 from "./../../images/timeline/timeline-1.svg";
import joinTimeline2 from "./../../images/timeline/timeline-2.svg";
import joinTimeline3 from "./../../images/timeline/timeline-3.svg";
import joinTimeline4 from "./../../images/timeline/timeline-4.svg";
import joinTimeline5 from "./../../images/timeline/timeline-5-last.svg";
import { v4 as uuidv4 } from "uuid";
import * as emailjs from "emailjs-com";

const USER_ID = "user_oxRU2E4xVKC6z7tq0Ee66";
const TEMPLATE_ID = "template_b3u2bhe";
const SERVICE_ID = "service_784yhvi";
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

  const [email, setEmail] = useState(
    location.state == null ? "" : location.state["email"]
  );
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [referById, setReferById] = useState(
    referByIdDirect != ""
      ? referByIdDirect
      : location.state == null
      ? ""
      : location.state["referById"]
  );
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const redirectHome = () => {
    history.push({ pathname: "/" });
  };

  const sendWelcomeEmail = () => {
    const templateParams = {
      to_name: firstName,
      to_email: email,
    };
    //     emailjs.send(
    //       SERVICE_ID,
    //       TEMPLATE_ID,
    //       templateParams,
    //       USER_ID
    //  ).then(function(response) {
    //   console.log(email, 'SUCCESS!', response.status, response.text);
    // }, function(error) {
    //   console.log('FAILED...', error);
    // });
  };

  const navTo = () => {
    setLoading(false);
    sendWelcomeEmail();
    history.push({
      pathname: "/account",
    });
  };

  const checkValid = (d) => {
    // TODO
  };
  const createUserWithEmailAndPasswordHandler = async (event) => {
    console.log("loading");
    setLoading(true);

    try {
      if (props.referToId == null || props.referToId == "") {
        console.log("IDK");
        props.setReferTo(uuidv4());
        setTimeout(() => {}, 200);
      }
      const referToId = props.referToId;
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      generateUserDocument(user, {
        firstName,
        lastName,
        phone,
        referToId,
        referById,
      }).then((res) => {
        console.log(res);
        setTimeout(navTo, 3000);
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
      });
    } catch (error) {
      console.log("error ", error);
      if (error.message) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong creating your account, try a different password... If you've already created an account with us, sign in."
        );
      }
      setLoading(false);
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
  const loadingText = [
    "Yes we're using this animation again",
    "Cuz it's cool",
    "Ok, we're ready.",
  ];
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13) {
      //13 is the enter keycode
      navTo();
    }
  };
  function Loading() {
    const defaultOptions = {
      loop: 1,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="onboard-loading-container row-container">
        <Typography
          className="onboard-loading-title"
          variant="h4"
          color="textPrimary"
        >
          Setting Up Your New Account
        </Typography>
        <Lottie
          className="onboard-loading-lottie"
          width={100}
          height={100}
          options={defaultOptions}
        />
        <Typist className="onboard-loading-subtitle" avgTypingDelay={50}>
          {" "}
          <span>{loadingText[0]}</span>
          <Typist.Backspace count={loadingText[0].length} delay={200} />
          <span>{loadingText[1]}</span>
          <Typist.Backspace count={loadingText[1].length} delay={200} />
          <span>{loadingText[2]}</span>
        </Typist>
      </div>
    );
  }

  return (
    <div>
      {" "}
      {googleLoading || loading ? (
        <Loading />
      ) : (
        <div
          className="join-form row-container"
          tabIndex={-1}
          onKeyPress={(e, val) => keyDown(e, val)}
        >
          {error != "" && (
            <Typography
              style={{ color: "red", marginBottom: "20px" }}
              variant="caption"
              className="join-or"
            >
              {error}
            </Typography>
          )}
          <NameInput
            validData={(d) => checkValid(d)}
            onChange={(e, val) => onChange(e, val)}
            onKeyPress={(e, val) => keyDown(e, val)}
            fields={{ firstName: firstName, lastName: lastName }}
          />
          <PhoneNumberInput
            validData={(d) => checkValid(d)}
            onChange={(e, val) => onChange(e, val)}
            onKeyPress={(e, val) => keyDown(e, val)}
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
            onKeyPress={(e, val) => keyDown(e, val)}
            placeholder="Enter Email"
            type="email"
          />
          <TextInput
            validData={(d) => checkValid(d)}
            onChange={(e, val) => onChange(e, val)}
            stateName="password"
            value={password}
            onKeyPress={(e, val) => keyDown(e, val)}
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
                signInWithGoogle(props.referToId, referById).then(() => {
                  navTo();
                  setGoogleLoading(false);
                });
              } catch (error) {
                setError(error.message);
                console.error("Error signing in with Google", error);
              }
            }}
          >
            {googleLoading ? <CircularProgress /> : "Sign in with Google"}
          </Button>
          <div className="join-or-horizontal-line" />
          <Typography
            variant="body1"
            className="join-sign-in-text"
            color="textSecondary"
            onClick={() => {
              if (user.user) {
                history.push({ pathname: "/account" });
              } else {
                history.push({ pathname: "/signin" });
              }
            }}
          >
            Already have an Account?{" "}
            <span className="join-sign-in-button">Sign In</span>
          </Typography>
        </div>
      )}
    </div>
  );
}

function JoinPage(props) {
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
            <Typography color="textPrimary" variant="h2" className="form-title">
              <span className=" purple-highlight">Join</span>
            </Typography>
            <JoinForm
              referToId={props.referToId}
              setReferTo={(rid) => props.setReferTo(rid)}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default JoinPage;
