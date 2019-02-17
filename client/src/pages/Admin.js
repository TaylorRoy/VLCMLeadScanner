import React, { Component} from "react";
import { Link } from 'react-router-dom'
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

						<div className="justify-content-center text-center" style={{margin:'30px 0'}}>
							<button className="btn btn-lg sameDayBtn" onClick={this.sameDay}>SAMEDAY</button>
	
							<button className="btn btn-lg bulkBadgeBtn"onClick={this.badgePage}>BADGES</button>
							<br></br>
						</div>
						{/* <div className="row justify-content-center text-center col-md-6 viewLeads">
							<button className="btn-block btn-lg btn viewAllLeads">VIEW ALL LEADS</button> 
						</div> */}
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
