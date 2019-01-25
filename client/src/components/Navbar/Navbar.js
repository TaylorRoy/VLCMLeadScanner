import React, { Component } from "react";
import "./Navbar.css";
import Consumer from "../../GlobalState"
import API from "../../utils/API";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {

	signOut = (event) => {
		console.log("Signing Out....")
		event.preventDefault()

		this.props.global.logOut()
		
	}

	render() {
		return (

			<Consumer>
				{(global) => (

					
					<nav className="navbar navbar-expand-lg bg-dark justify-content-center" style={{textAlign: 'center'}}>
						{<h1>{global.state.vendor}</h1>}

						{<p className="logout" onClick={this.signOut}><i class="fas fa-sign-out-alt"></i></p>}

					</nav>
				)}
			</Consumer>
		);

	}
}
export default props => (
	<Consumer>
		{(global) => {
			return <Navbar {...props} global={global} />
		}}
	</Consumer>
)