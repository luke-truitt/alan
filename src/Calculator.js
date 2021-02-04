import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  withRouter
} from "react-router-dom";
import "./calculator.css";
import {Container, Row, Col, Card } from "react-bootstrap";

function Calculator(props) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});
    const base_url = "http://localhost:5000"
    const axios = require('axios');
    useEffect(() => {
      if(step==5) {
        sendData();
      }
    })
    function sendData() {
        axios.post(base_url + '/calculated', data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const updateDict = (d) => {
      for (const [key, value] of Object.entries(d)) {
        setData(data => ({...data, [key]:value}));
      }
    }
    const backClick = () => {
      if(step <=1) {
        setStep(1);
      } else {
        setStep(step - 1);
      }
    };
    let estIncome, dependent, estimatedRefund, deduction, taxableIncome, taxBill, credits, eduCredits, refund, firstName,  lastName, phone, classYear, howFiled, international;

    const forwardClick = () => {
      if(step==1) {
        estIncome = textInput.current.value;
        dependent = depInput.current.value;
        estimatedRefund = refInput.current.value;
        incomeLabel.current.innerHTML = estIncome;
        const d = {'email': 'ltruitt5@gmail.com', 'estimatedIncome': estIncome,'dependent': dependent,'estimatedRefund': estimatedRefund}
        updateDict(d);
      } else if (step==2) {
        deduction = textInput2.current.value;
        dedLabel.current.innerHTML = deduction;
        taxableIncome = estIncome - deduction - 12400;
        taxIncomeLabel.current.innerHTML = taxableIncome;
        const taxRate = 0.1;
        taxBill = taxRate * (taxableIncome);
        taxBillLabel.current.innerHTML = taxBill;
      } else if (step==3) {
        credits = textInput3.current.value;
        creditsLabel.current.innerHTML = credits;
        eduCredits = eduCreditInput.current.value;
        updateDict({'taxCredits': eduCredits});
      } else if (step == 4) {
        refund = credits - taxBill;
        refundLabel.current.innerHTML = refund;
        firstName = firstInput.current.value;
        lastName = lastInput.current.value;
        phone = phoneInput.current.value;
        classYear = yearInput.current.value;
        howFiled = filedInput.current.value;
        international = intlInput.current.value;
        const dd = {'firstName': firstName, 'lastName': lastName, 'phone': phone,'classYear': classYear,'howFiled': howFiled,'international': international}
        updateDict(dd)
        // sendData();
      }
      if(step >=5) {
        setStep(5)
      } else {
        setStep(step + 1)
      }
    };

    const textInput = useRef(null);
    const depInput = useRef(null);
    const refInput = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const eduCreditInput = useRef(null);
    const textInput4 = useRef(null);
    const firstInput = useRef(null);
    const lastInput = useRef(null);
    const phoneInput = useRef(null);
    const yearInput = useRef(null);
    const filedInput = useRef(null);
    const intlInput = useRef(null);

    const incomeLabel = useRef(null);
    const dedLabel = useRef(null);
    const taxIncomeLabel = useRef(null);
    const taxBillLabel = useRef(null);
    const creditsLabel = useRef(null);
    const refundLabel = useRef(null);
    return(
      <div className="calc-page">
        <Container className="calc-container">
        <Row type="flex" justify="center" align="middle"> 
          <Col>
          <Card style={{display: step==1 ? '' : 'none'}}>
            <Card.Title>Your Income</Card.Title>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How much did you make last year? (Roughly)</Col>
            <Col>
            <input ref={textInput} type="number"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>
            <Card.Body>This is some text within a card body.</Card.Body>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>Are you a dependent?</Col>
            <Col>
            <input ref={depInput} type="number"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How big of a refund did you get last year?</Col>
            <Col>
            <input ref={refInput} type="number"/>
            </Col>
            </Row>
          </Card>
          <Card style={{display: step==2 ? '' : 'none'}}>
            <Card.Title>Your Deductions</Card.Title>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How much are you?</Col>
            <Col>
            <input ref={textInput2} type="number"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>
            <Card.Body>This is some text within a card body.</Card.Body>
            </Col>
            </Row>
          </Card>
          <Card style={{display: step==3 ? '' : 'none'}}>
            <Card.Title>Your Credits</Card.Title>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How many are you?</Col>
            <Col>
            <input ref={textInput3} type="number"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>
            <Card.Body>This is some text within a card body.</Card.Body>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>Had you heard of educational tax creadts before this?</Col>
            <Col>
            <input ref={eduCreditInput} type="checkbox"/>
            </Col>
            </Row>
          </Card>
          <Card style={{display: step==4 ? '' : 'none'}}>
            <Card.Title>Your History</Card.Title>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How much did you make last year? (Roughly)</Col>
            <Col>
            <input ref={textInput4} type="number"/>
            </Col>
            </Row>
            
            <Row type="flex" justify="center" align="middle"> 
            <Col><input ref={firstInput} type="text" placeholder="First Name"/></Col>
            <Col>
            <input ref={lastInput} type="text" placeholder="Last Name"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col><input ref={phoneInput} type="tel" placeholder="Phone Number"/></Col>
            <Col>
            <input ref={yearInput} type="number" placeholder="Grad Year"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>How did you file for taxes last year?</Col>
            <Col>
              <input ref={filedInput} type="text"/>
            </Col>
            </Row>
            <Row type="flex" justify="center" align="middle"> 
            <Col>International Student?</Col>
            <Col>
              <input ref={intlInput} type="checkbox"/>
            </Col>
            </Row>
          </Card>
          <Card style={{display: step==5 ? '' : 'none'}}>
            <Card.Title>Your Summary</Card.Title>
            <Card.Body>You're on track for a dope refund</Card.Body>
          </Card>
          </Col>
          <Col >
          <Card>
          <Card.Title>Your Refund</Card.Title>
          <Card.Body><p ref={refundLabel}>+ $X,TTT</p></Card.Body>
          <hr/>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row">
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left" style={{display: step>=2 ? '' : 'none'}}>Your Income</Col>
            <Col className="balance-sheet-right" id="income-label"><p ref={incomeLabel}>+ $X,TTT</p></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=3 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Personal Deductions</Col>
            <Col className="balance-sheet-right" id="deductions-label"><p ref={dedLabel}>+ $X,TTT</p></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=3 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Standard Deduction</Col>
            <Col className="balance-sheet-right">- $12,400</Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=3 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Taxable Income</Col>
            <Col className="balance-sheet-right" id="tax-income-label"><p ref={taxIncomeLabel}>+ $X,TTT</p></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=3 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Tax Bill</Col>
            <Col className="balance-sheet-right" id="tax-bill"><p ref={taxBillLabel}>+ $X,TTT</p></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=4 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Credits and Withholdings</Col>
            <Col className="balance-sheet-right" id="credits-withholdings"><p ref={creditsLabel}>+ $X,TTT</p></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="balance-sheet-row" style={{display: step>=5 ? '' : 'none'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="balance-sheet-left">Your Estimated Refund</Col>
            <Col className="balance-sheet-right" id="estimated-refund"><p ref={refundLabel}>+ $X,TTT</p></Col>
          </Row>
          </Card>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col>
          <Row type="flex" justify="center" align="middle">
            <Col>
            <button className="calc-button back" onClick={() => backClick()} style={{display: step<=1 ? 'none' : ''}}>Back Up</button>
            </Col>
            <Col>

              <button className="calc-button" onClick={() => forwardClick()} >Keep Going</button>
            </Col>
          </Row>
          </Col>
          <Col>
          </Col>
        </Row>
        </Container>
      </div>
    )

}

export default Calculator;
