import React from 'react';
import PropTypes from 'prop-types';
import styles from './Calculator.module.css';
import {
  withRouter
} from "react-router-dom";
import {Container, Row, Col } from "react-bootstrap";

export class Calculator extends React.Component {

  render() {
    return(
      <Container style={{marginTop: "100px"}}>
        <Row type="flex" justify="center" align="middle">
          <Col>Hey</Col>
          <Col>M</Col>
        </Row>
        <Row type="flex" justify="center" align="middle"> 
          <Col>
          <div style={{width: "90%", height:"100px", backgroundColor: "black"}}>
            </div></Col>
          <Col ><div style={{width: "90%", height:"100px", backgroundColor: "black"}}>
            </div></Col>
        </Row>
      </Container>
    )
  }

}

export default Calculator;
