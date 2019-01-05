import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";


const Login = () => (
	<div>
		<Hero backgroundImage="https://go.vlcmtech.com/hubfs/2.20.19%20UT%20IT%20Exchange/background.jpg">
			<div>
				<img className="banner" src="https://go.vlcmtech.com/hubfs/2.20.19%20UT%20IT%20Exchange/logo.png" alt="IT Exchange Logo" />
			</div>


			<Container style={{ marginTop: 30 }}>
<form>
				<Row>
					<Col size="lg-12">
						<input className="username" placeholder="username"></input>
					</Col>
				</Row>
				<Row>
					<Col size="lg-12">
						<input className="password" placeholder="password"></input>
					</Col>
				</Row>
				<Row>
					<Col size="lg-12">
						<button className="loginButton" placeholder="login">Login <i class="fas fa-angle-double-right"></i></button>

					</Col>
				</Row>
				</form>
			</Container>
		</Hero>
	</div>
);

export default Login;
