import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import giftIcon from "./../../images/icons/gift-dark.svg";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ChipInput from "material-ui-chip-input";
import { isIOS, isAndroid, isSafari } from "react-device-detect";
import { useState } from "react";
import "./account-cards.css";
import * as emailjs from "emailjs-com";
import { EmailChipInput } from "./../inputs/Inputs";
import { Mixpanel } from "./../../mixpanel.js";

const USER_ID = "user_oxRU2E4xVKC6z7tq0Ee66";
const TEMPLATE_ID = "template_kwxoxb7";
const SERVICE_ID = "service_ah750kn";

const BASE_URL = "http://fromstandard.com";

export function PlaceholderFull() {
  return (
    <div className="placeholder-full">
      <Skeleton className="skeleton-full" variant="caption" />
      <Skeleton className="skeleton-full" variant="caption" />
    </div>
  );
}
export function PlaceholderHalf() {
  return (
    <div className="placeholder-half row-container">
      <Skeleton className="skeleton-half" variant="caption" />
      <Skeleton className="skeleton-half" variant="caption" />
      <Skeleton className="skeleton-half" variant="caption" />
      <Skeleton className="skeleton-half" variant="caption" />
      <Skeleton className="skeleton-half" variant="caption" />
      <Skeleton className="skeleton-half" variant="caption" />
    </div>
  );
}

export function DisabledCardFull(props) {
  return (
    <Card className="account-page-card disabled-card-full">
      <CardContent className="card-content column-container">
        <img src={props.icon} className="disabled-card-icon" />
        <PlaceholderFull />
      </CardContent>
    </Card>
  );
}

export function DisabledCardHalf(props) {
  return (
    <Card className="account-page-card disabled-card-full">
      <CardContent className="card-content">
        <Typography className="disabled-card-title" variant="body1">
          Track your refund
        </Typography>
        <div className="column-container">
          <img src={props.image} className="disabled-card-image" />
          <PlaceholderHalf />
        </div>
      </CardContent>
    </Card>
  );
}
function EmailChip(props) {
  const handleAdd = (chip) => {
    props.onAdd(chip);
  };

  const handleDelete = (deletedChip) => {
    props.onDelete(deletedChip);
  };

  const someProps = {
    flexFlow: "no wrap",
  };

  return (
    <ChipInput
      label="Enter Emails"
      alwaysShowPlaceholder="true"
      value={props.emails}
      style={{ overflow: "hidden" }}
      onAdd={(chip) => handleAdd(chip)}
      onDelete={(chip) => handleDelete(chip)}
      variant="outlined"
    />
  );
}
export function InviteCard(props) {
  Mixpanel.identify(props.referToId);
  const inviteCardTitle =
    "Invite friends to Standard and we'll file your taxes for free.";
  const inviteCardSubtitle =
    "Know someone who is missing out on free money? We'll waive the $25 fee for you when two friends file with Standard.";
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");

  const handleAdd = (chip) => {
    setEmails([...emails, chip]);
  };

  const handleDelete = (deletedChip) => {
    if (emails.length == 1) {
      setEmails([]);
    } else {
      setEmails([emails.filter((c) => c !== deletedChip)]);
    }
  };

  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13 || code === 32 || code === 39) {
      sendInvite();
    }
  };
  const sendInvite = () => {
    Mixpanel.track("referral", { type: "send" });
    const email_to = email;
    const templateParams = {
      from_name: props.username,
      send_to: email_to,
      refer_link: BASE_URL + "/?referId=" + props.referToId,
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
      function (response) {
        alert("Invites sent successfully!");
        setEmail("");
      },
      function (error) {
        Mixpanel.track("error_referral_send");
        setEmail("");
      }
    );
  };
  // const sendInvites = () => {
  //   let i;
  //   for (i = 0; i < emails.length; i++) {
  //     const email_to = emails[i];
  //     const templateParams = {
  //       from_name: props.username,
  //       send_to: email_to,
  //       refer_link: BASE_URL + "/?referId=" + props.referToId,
  //     };
  //     emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
  //       function (response) {
  //         alert("Invites sent successfully!");
  //         console.log(email_to, "SUCCESS!", response.status, response.text);
  //       },
  //       function (error) {
  //         console.log("FAILED...", error);
  //       }
  //     );
  //   }
  //   setEmails([]);
  // };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Standard Will Do Your Taxes",
          text: `Students lose out on thousands in their refund every year. You don't need to have even worked to get money back. Check it out -- `,
          url: "/",
        })
        .then(() => {
          Mixpanel.track("referral", { type: "share" });
          alert("Successfully shared!");
        })
        .catch((error) => {
          Mixpanel.track("error_share");
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  return (
    <Card className="invite-card account-page-card">
      <CardContent className="invite-card-content">
        <div className="invite-card-c0 column-container">
          <img src={giftIcon} className="invite-card-icon" />
          <div className="invite-card-c1 row-container">
            <Typography
              color="textPrimary"
              variant="h6"
              className="invite-card-title"
            >
              {inviteCardTitle}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
              className="invite-card-subtitle"
            >
              {inviteCardSubtitle}
            </Typography>
            <div className="invite-card-input-container column-container">
              <div className="invite-card-email-container column-container">
                <TextField
                  variant="outlined"
                  setValid={(val) => {}}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  stateName="email"
                  value={email}
                  invalid={false}
                  onKeyPress={(e, val) => keyDown(e, val)}
                  placeholder="Friend's email"
                  type="email"
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={sendInvite}
                >
                  Send invites
                </Button>
              </div>
              <div className="invite-card-button-container column-container">
                <Button
                  color="textPrimary"
                  variant="outlined"
                  onClick={() => {
                    Mixpanel.track("referral", { type: "copy" });
                    navigator.clipboard.writeText(
                      BASE_URL + "/?referId=" + props.referToId
                    );
                  }}
                >
                  <FileCopyRoundedIcon
                    className="invite-button-icon"
                    fontSize="small"
                  />
                  Link
                </Button>
                {(isSafari || isIOS || isAndroid) && (
                  <Button
                    color="textPrimary"
                    variant="outlined"
                    onClick={handleShareClick}
                  >
                    <SendRoundedIcon
                      className="invite-button-icon"
                      fontSize="small"
                    />{" "}
                    Share
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
