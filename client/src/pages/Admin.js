import React, { Component} from "react";
import { Link } from 'react-router-dom'
import API from "../utils/API";
import Navbar from "../components/Navbar";
import Consumer from './../GlobalState'


class Admin extends Component {

	sameDay = (event) => {
		console.log("Redirect to Sameday page")
		event.preventDefault()

		this.props.global.setPage("/sameday")

	}

	badgePage = (event) => {
		console.log("Redirect to Sameday page")
		event.preventDefault()

		this.props.global.setPage("/badge")

	}

	render() {
		return (

			<Consumer>
				{(global) => (
					<div>

						<div className="row justify-content-center text-center">
							<button className="btn btn-lg sameDayBtn col-md-3" onClick={this.sameDay}>SAMEDAY</button>
							<button className="btn btn-lg bulkBadgeBtn col-md-3"onClick={this.badgePage}>BADGES</button>
							<br></br>
						</div>
						<div className="row justify-content-center text-center col-md-6 viewLeads">
							<button className="btn-block btn-lg btn viewAllLeads">VIEW ALL LEADS</button>
						</div>
					</div>
				)}

			</Consumer>


		)
	}
}

export default props => (
	<Consumer>
		{(global) => {
			return <Admin {...props} global={global} />
		}}
	</Consumer>
)

// <View className="inputsContainer">
//      <TouchableHighlight className="fullWidthButton">
//         <div className="fullWidthButtonText">Submit</div>
//      </TouchableHighlight>
// </View>
