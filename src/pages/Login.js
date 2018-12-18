import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

const Login = () => (
  <div>
    <Hero backgroundImage="https://i.imgur.com/qkdpN.jpg">
      <h1>Valcom Tech Event</h1>
      <h2>Company Motto</h2>
    </Hero>
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-12">
          <h1>Welcome To the event!  Please Login.</h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <input className="username" placeholder = "username"></input>
          <input className="password" placeholder = "password"></input>
          <button className="loginButton" placeholder="login">Login</button>
  
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
