import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

import API from "../utils/API"


class Login extends React.Component {

	state = {
		username: '',
		password: ''
	}

	handleInputChange = (event) => {
		const { name, value } = event.target

		this.setState({[name]: value})
	} 

	verifyLogin = event => {
		event.preventDefault()

		API.login({
			username: this.state.username,
			password:this.state.password
		})
		.then(res => console.log(res))
		.catch(err => console.log(err.response))

	}


	render() {
		return (

			<div>
				<Hero backgroundImage="https://go.vlcmtech.com/hubfs/2.20.19%20UT%20IT%20Exchange/background.jpg">
					<div>
						<img className="banner" src="https://go.vlcmtech.com/hubfs/2.20.19%20UT%20IT%20Exchange/logo.png" alt="IT Exchange Logo" />
					</div>


					<Container style={{ marginTop: 30 }}>
						<form>
							<Row>
								<Col size="lg-12">
									<input 
									name="username"
									className="username" placeholder="username"
									value={this.state.username}
									onChange={this.handleInputChange}
									></input>
								</Col>
							</Row>
							<Row>
								<Col size="lg-12">
									<input 
									name="password"
									className="password" placeholder="password"
									value={this.state.password}
									onChange={this.handleInputChange}
									></input>
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
		)
	};
}
export default Login;
