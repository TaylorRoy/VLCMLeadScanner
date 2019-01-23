import React, { Component} from "react";
import { Link } from 'react-router-dom'

class Admin extends Component {
  render() {
		return (
			<div>
					 <div className="row justify-content-center text-center">
				<Link to="/sameday"><button className="btn btn-lg sameDayBtn ">SAMEDAY</button></Link>
				<Link to="/badge"><button className="btn btn-lg bulkBadgeBtn">BADGES</button></Link>
				<br></br>
				</div>
			
			</div>

		
			
		)
	}
}

export default Admin;
