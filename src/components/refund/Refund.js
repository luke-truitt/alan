import {
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
  Dialog,
  DialogTitle,
  Fade,
  Zoom,
  Slide,
  CircularProgress,
} from "@material-ui/core";
import {
  primaryTheme,
  slideDefault,
  shortFade,
} from "../../utils/constants.js";
import "./../../styles.css";
import "./refund.css";
import Header from "./../header/Header.js";
import RefundBreakdown from "./RefundBreakdown.js";
import { AuthContext } from "../../providers/AuthProvider";
import { useState, useContext, useEffect } from "react";
import useWindowDimensions from "../onboard/useWindowDimensions";
import { useLocation, useHistory } from "react-router-dom";
import { getUserDoc } from "../../firebase";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
function numberWithCommas(x) {
  if (x == null) {
    return "";
  }
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts[1] && parts[1].length == 1) {
    parts[1] = parts[1] + "0";
  }
  return parts.join(".");
}

function Refund(props) {
  let location = useLocation();
  const history = useHistory();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [email, setEmail] = useState(null);
  const [referToId, setReferToId] = useState(null);
  const [referById, setReferById] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const { width, height } = useWindowDimensions();
  const isMobile = width < 900;
  const user = useContext(AuthContext);
  const redirect = (path, state) => {
    history.push({ pathname: path, state: state });
  };
  const loadFromState = () => {
    let em = null;
    let rtid = null;
    let rbid = null;
    let bd = null;
    try {
      em = location.state["email"];
    } catch {
      em = null;
    }
    try {
      rtid = location.state["referToId"];
    } catch {
      rtid = null;
    }
    try {
      rbid = location.state["referById"];
    } catch {
      rbid = null;
    }
    try {
      bd = location.state["breakdown"];
    } catch {
      bd = null;
    }
    return [em, rtid, rbid, bd];
  };
  const loadFromUser = async () => {
    let em = null;
    let rtid = null;
    let rbid = null;
    let bd = null;
    if (user.user) {
      const userData = await getUserDoc(user);
      em = userData["email"];
      rtid = userData["referToId"];
      rbid = userData["referById"];
      bd = userData["refundBreakdown"];
    }
    return { email: em, referToId: rtid, referById: rbid, breakdown: bd };
  };
  let em, rtid, rbid, bd;
  useEffect(() =>
    setTimeout(() => {
      if (!user.user && !dataLoaded && loadAttempts > 2) {
        if (location.state == null) {
          redirect("/", null);
        }
        [em, rtid, rbid, bd] = loadFromState();
        if (bd == null) {
          redirect("/", null);
        }
        setEmail(em);
        setReferToId(rtid);
        setReferById(rbid);
        setBreakdown(bd);
        setDataLoaded(true);
      } else if (user.user && !dataLoaded) {
        loadFromUser().then((res) => {
          em = res.email;
          rtid = res.referToId;
          rbid = res.referById;
          bd = res.breakdown;
          if (em == null) {
            //users not logged in, some bug earlier
            redirect("/", null);
          } else if (bd == null) {
            // user hasn't taken calculator, send them to the start of the calculator
            redirect("/onboard", {
              email: em,
              referToId: rtid,
              referById: rbid,
            });
          }
          //otherwise they're gtg
          setEmail(em);
          setReferToId(rtid);
          setReferById(rbid);
          setBreakdown(bd);
          setDataLoaded(true);
        });
      } else if (!dataLoaded) {
        setLoadAttempts(loadAttempts + 1);
      }
    }, 500)
  );

  const navTo = () => {
    if (user.user) {
      history.push({
        pathname: "/account",
      });
    } else {
      history.push({
        pathname: "/join",
        state: {
          email: email,
          referToId: referToId,
          referById: referById,
          breakdown: breakdown,
        },
      });
    }
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <Header page={"Refund"} />
      <div className="onboard-complete-c0-top row-container">
        {!isMobile ? (
          <Slide in {...slideDefault} direction="up">
            <div className="onboard-complete-c1 column-container">
              <div className="onboard-complete-c1-content column-container">
                {dataLoaded ? (
                  <div className="onboard-complete-c1-breakdown">
                    <Zoom in timeout={{ enter: 500 }}>
                      <div>
                        <Typography
                          className="onboard-complete-title"
                          variant="h6"
                        >
                          You're owed
                        </Typography>
                        <Typography
                          className="refund-amount "
                          variant="h1"
                          color="secondary"
                        >
                          ${numberWithCommas(breakdown.netRefund)}
                        </Typography>{" "}
                        <RefundBreakdown
                          breakdown={breakdown}
                        ></RefundBreakdown>
                      </div>
                    </Zoom>
                    <Card className="onboard-complete-card-mobile">
                      <CardContent className="onboard-complete-card-2-content">
                        <div className="refund-card-text">
                          {" "}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            className="refund-card-title"
                          >
                            $2,342
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption"
                            className="refund-card-caption"
                          >
                            That's how much the average American college student
                            is owed in a refund.
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="onboard-complete-card-mobile">
                      <CardContent className="onboard-complete-card-3-content">
                        {" "}
                        <div className="refund-card-text row-container">
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            className="refund-card-title"
                          >
                            $473
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption"
                            className="refund-card-caption"
                            style={{ marginBottom: "70px" }}
                          >
                            That's how much the average college student actually
                            receives because of lack of reporting and
                            underutilization of credits.
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <CircularProgress />
                )}

                <div className="row-container onboard-complete-card-container">
                  <Card className="onboard-complete-card">
                    <CardContent
                      onClick={navTo}
                      className="onboard-complete-card-1-content"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row-container refund-card-button-content ">
                        <Typography
                          className="refund-card-button-text"
                          variant="h4"
                          color="primary"
                        >
                          Get Started{" "}
                          <ArrowForwardIosRoundedIcon className=" refund-card-button-icon" />
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          className="refund-card-button-subtext"
                        >
                          Free to sign up. We maximize state and federal refunds
                          and only charge a single fee of $25 if we find you
                          money.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="onboard-complete-card">
                    <CardContent className="onboard-complete-card-2-content">
                      <div className="refund-card-text">
                        {" "}
                        <Typography
                          color="textSecondary"
                          variant="h5"
                          className="refund-card-title"
                        >
                          $2,342
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          className="refund-card-caption"
                        >
                          That's how much the average American college student
                          is owed in a refund.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="onboard-complete-card">
                    <CardContent className="onboard-complete-card-3-content">
                      {" "}
                      <div className="refund-card-text row-container">
                        <Typography
                          color="textSecondary"
                          variant="h5"
                          className="refund-card-title"
                        >
                          $473
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          className="refund-card-caption"
                        >
                          That's how much the average college student actually
                          receives because of lack of reporting and
                          underutilization of credits.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Slide>
        ) : (
          <Slide in {...slideDefault} direction="up">
            <div className="onboard-complete-c1 column-container">
              <div className="onboard-complete-c1-content column-container">
                {dataLoaded ? (
                  <div className="onboard-complete-c1-breakdown">
                    <div>
                      <Typography
                        className="onboard-complete-title"
                        variant="h6"
                      >
                        You're owed
                      </Typography>
                      <Typography
                        className="refund-amount "
                        variant="h1"
                        color="secondary"
                      >
                        ${numberWithCommas(breakdown.netRefund)}
                      </Typography>{" "}
                      <Card className="onboard-complete-card-mobile">
                        <CardContent
                          onClick={navTo}
                          className="onboard-complete-card-1-content"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          <div className="row-container refund-card-button-content">
                            <Typography
                              className="refund-card-button-text"
                              variant="h4"
                              color="primary"
                            >
                              Get Started{" "}
                              <ArrowForwardIosRoundedIcon className=" refund-card-button-icon" />
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              className="refund-card-button-subtext"
                            >
                              Free to sign up. We maximize state and federal
                              refunds and only charge a single fee of $25 if we
                              find you money.
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className="refund-card-button-subtext-mobile"
                      >
                        Free to sign up. We maximize state and federal refunds
                        and only charge a single fee of $25 if we find you
                        money.
                      </Typography>
                      <RefundBreakdown breakdown={breakdown}></RefundBreakdown>
                    </div>
                    <Card className="onboard-complete-card-mobile">
                      <CardContent className="onboard-complete-card-2-content">
                        <div className="refund-card-text">
                          {" "}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            className="refund-card-title"
                          >
                            $2,342
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption"
                            className="refund-card-caption"
                          >
                            That's how much the average American college student
                            is owed in a refund.
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="onboard-complete-card-mobile">
                      <CardContent className="onboard-complete-card-3-content">
                        {" "}
                        <div className="refund-card-text row-container">
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            className="refund-card-title"
                          >
                            $473
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption"
                            className="refund-card-caption"
                            style={{ marginBottom: "70px" }}
                          >
                            That's how much the average college student actually
                            receives because of lack of reporting and
                            underutilization of credits.
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <CircularProgress />
                )}

                <div className="row-container onboard-complete-card-container">
                  <Card className="onboard-complete-card">
                    <CardContent
                      onClick={navTo}
                      className="onboard-complete-card-1-content refund-card-button-content "
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      <div className="row-container">
                        <Typography
                          className="refund-card-button-text"
                          variant="h4"
                          color="primary"
                        >
                          Get Started{" "}
                          <ArrowForwardIosRoundedIcon className=" refund-card-button-icon" />
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          className="refund-card-button-subtext"
                        >
                          Free to sign up. We maximize state and federal refunds
                          and only charge a single fee of $25 if we find you
                          money.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="onboard-complete-card">
                    <CardContent className="onboard-complete-card-2-content">
                      <div className="refund-card-text">
                        {" "}
                        <Typography
                          color="textSecondary"
                          variant="h5"
                          className="refund-card-title"
                        >
                          $2,342
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          className="refund-card-caption"
                        >
                          That's how much the average American college student
                          is owed in a refund.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="onboard-complete-card">
                    <CardContent className="onboard-complete-card-3-content">
                      {" "}
                      <div className="refund-card-text row-container">
                        <Typography
                          color="textSecondary"
                          variant="h5"
                          className="refund-card-title"
                        >
                          $473
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          className="refund-card-caption"
                        >
                          That's how much the average college student actually
                          receives because of lack of reporting and
                          underutilization of credits.
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Slide>
        )}

        <div className="onboard-complete-footer row-container">
          <Button
            variant="contained"
            className="onboard-complete-apply-button"
            onClick={navTo}
          >
            {user.user ? "Save This Refund Data" : "Get Started with Standard"}
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default Refund;
