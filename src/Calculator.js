import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./calculator.css";
import {} from ".";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Calculator(props) {
  const [step, setStep] = useState(1);
  const backClick = () => {
    if (step <= 1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };
  const forwardClick = () => {
    if (step == 1) {
      incomeLabel.current.innerHTML = textInput.current.value;
    } else if (step == 2) {
      dedLabel.current.innerHTML = textInput2.current.value;
      taxIncomeLabel.current.innerHTML =
        textInput.current.value - textInput2.current.value - 12400;
      taxBillLabel.current.innerHTML =
        0.1 * (textInput.current.value - textInput2.current.value - 12400);
    } else if (step == 3) {
      creditsLabel.current.innerHTML = textInput3.current.value;
    } else if (step == 4) {
      refundLabel.current.innerHTML =
        textInput3.current.value -
        0.1 * (textInput.current.value - textInput2.current.value - 12400);
    }
    if (step >= 5) {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };
  const textInput = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);
  const incomeLabel = useRef(null);
  const dedLabel = useRef(null);
  const taxIncomeLabel = useRef(null);
  const taxBillLabel = useRef(null);
  const creditsLabel = useRef(null);
  const refundLabel = useRef(null);
  return (
    <div className="calc-page">
      <Container className="calc-container">
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Card style={{ display: step == 1 ? "" : "none" }}>
              <Card.Title>Your Income</Card.Title>
              <Row type="flex" justify="center" align="middle">
                <Col>How much did you make last year? (Roughly)</Col>
                <Col>
                  <input ref={textInput} type="number" />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Col>
              </Row>
            </Card>
            <Card style={{ display: step == 2 ? "" : "none" }}>
              <Card.Title>Your Deductions</Card.Title>
              <Row type="flex" justify="center" align="middle">
                <Col>How much are you?</Col>
                <Col>
                  <input ref={textInput2} type="number" />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Col>
              </Row>
            </Card>
            <Card style={{ display: step == 3 ? "" : "none" }}>
              <Card.Title>Your Credits</Card.Title>
              <Row type="flex" justify="center" align="middle">
                <Col>How many are you?</Col>
                <Col>
                  <input ref={textInput3} type="number" />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Col>
              </Row>
            </Card>
            <Card style={{ display: step == 4 ? "" : "none" }}>
              <Card.Title>Your History</Card.Title>
              <Row type="flex" justify="center" align="middle">
                <Col>How much did you make last year? (Roughly)</Col>
                <Col>
                  <input ref={textInput4} type="number" />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Col>
              </Row>
            </Card>
            <Card style={{ display: step == 5 ? "" : "none" }}>
              <Card.Title>Your Summary</Card.Title>
              <Card.Body>You're on track for a dope refund</Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>Your Refund</Card.Title>
              <Card.Body>
                <p ref={refundLabel}>+ $X,TTT</p>
              </Card.Body>
              <hr />
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                  style={{ display: step >= 2 ? "" : "none" }}
                >
                  Your Income
                </Col>
                <Col className="balance-sheet-right" id="income-label">
                  <p ref={incomeLabel}>+ $X,TTT</p>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 3 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Personal Deductions
                </Col>
                <Col className="balance-sheet-right" id="deductions-label">
                  <p ref={dedLabel}>+ $X,TTT</p>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 3 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Standard Deduction
                </Col>
                <Col className="balance-sheet-right">- $12,400</Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 3 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Taxable Income
                </Col>
                <Col className="balance-sheet-right" id="tax-income-label">
                  <p ref={taxIncomeLabel}>+ $X,TTT</p>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 3 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Tax Bill
                </Col>
                <Col className="balance-sheet-right" id="tax-bill">
                  <p ref={taxBillLabel}>+ $X,TTT</p>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 4 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Credits and Withholdings
                </Col>
                <Col className="balance-sheet-right" id="credits-withholdings">
                  <p ref={creditsLabel}>+ $X,TTT</p>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="balance-sheet-row"
                style={{ display: step >= 5 ? "" : "none" }}
              >
                <Col
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  className="balance-sheet-left"
                >
                  Your Estimated Refund
                </Col>
                <Col className="balance-sheet-right" id="estimated-refund">
                  <p ref={refundLabel}>+ $X,TTT</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <button
                  className="calc-button back"
                  onClick={() => backClick()}
                  style={{ display: step <= 1 ? "none" : "" }}
                >
                  Back Up
                </button>
              </Col>
              <Col>
                <button
                  className="calc-button"
                  onClick={() => forwardClick()}
                  style={{ display: step >= 5 ? "none" : "" }}
                >
                  Keep Going
                </button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Calculator;
