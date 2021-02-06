import "./error-page.css";
import "../../global.css";
import {
  ThemeProvider,
  Button,
  Typography,
  TextField
} from "@material-ui/core/";

import { theme } from "../../utils/constants.js";
import { useHistory } from "react-router-dom";
import React, {useRef, useState} from "react";

function ErrorPage(props) {
  
  const history = useHistory();

  const goHome = () => {
    history.push({pathname: '/'}); 
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="outer-container outer-container-error" id="outer-container-mobile">
        <div className="inner-container-left" id="inner-container-left-mobile">
          <Typography variant="h1" color="text-primary" id="h1-mobile">
            Looks like you might be lost. This page doesn't exist...
          </Typography>
          <Button
              className="embedded-field-button"
              id="embedded-field-button-mobile"
              variant="contained"
              color="secondary"
              onClick={goHome}
            >
              Go Home
            </Button>
          <Typography variant="h3" color="text-primary" id="h3-mobile">
            Head back home to check out some S3XY tax returns... It does in fact blow our minds how much money is left on the table by college students.
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default ErrorPage;
